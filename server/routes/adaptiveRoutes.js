const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const axios = require('axios');
const User = require('../models/User');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// @route   POST api/adaptive/trigger
// @desc    Analyze user performance and generate roadmap adaptations
// @access  Private
router.post('/trigger', authMiddleware, async (req, res) => {
    try {
        const { domainId } = req.body;
        const user = req.user;

        if (!domainId) {
            return res.status(400).json({ msg: 'Domain ID is required' });
        }

        // 1. Gather User's Performance Data
        const timeSpent = user.timeSpent?.get(domainId) ? Object.fromEntries(user.timeSpent.get(domainId)) : {};
        const quizScores = user.quizScores?.get(domainId) ? Object.fromEntries(user.quizScores.get(domainId)) : {};

        if (Object.keys(quizScores).length === 0) {
            return res.status(200).json({ msg: 'Not enough data to adapt roadmap yet.', adaptations: { addedModules: [], skippedSteps: [] } });
        }

        // 2. Prepare prompt for Gemini
        const prompt = `
            You are an AI Pedagogical Engine optimizing a learning roadmap.
            The user is learning the domain: ${domainId}.

            Here is their recent performance data:
            - Time Spent (in seconds) per module: ${JSON.stringify(timeSpent)}
            - Quiz Scores (out of 100) per module: ${JSON.stringify(quizScores)}

            Rules for adaptation:
            1. If a user scores < 60 on a module's quiz, they need a remedial module added immediately after it.
               Added modules should have the format: { "afterModuleId": "failed-module-id", "module": { "id": "remedial-...", "title": "Review: [Topic]", "description": "...", "steps": [{ "id": "...", "title": "..." }] } }
            2. If a user scores > 90 on a module AND spent very little time (< 120 seconds), they might already know the basics. You should suggest skipping the next logical basic step if one exists.
               Skipped steps should be an array of step IDs: { "skippedSteps": ["step-id-to-skip"] }

            Respond ONLY with a valid JSON object matching this schema:
            {
                "addedModules": [], 
                "skippedSteps": []
            }
            Do not include markdown formatting or extra text.
        `;

        // 3. Call Gemini
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    response_mime_type: "application/json",
                }
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const aiResponseText = response.data.candidates[0].content.parts[0].text;

        let adaptations;
        try {
            adaptations = JSON.parse(aiResponseText);
        } catch (e) {
            console.error("Failed to parse Gemini JSON output:", aiResponseText);
            return res.status(500).json({ msg: "AI response parsing failed" });
        }

        // 4. Save to User Model
        if (!user.roadmapAdaptations) user.roadmapAdaptations = new Map();

        // Merge with existing adaptations for this domain
        const existing = user.roadmapAdaptations.get(domainId) || { addedModules: [], skippedSteps: [] };

        // Ensure arrays exist
        if (!existing.addedModules) existing.addedModules = [];
        if (!existing.skippedSteps) existing.skippedSteps = [];
        if (!adaptations.addedModules) adaptations.addedModules = [];
        if (!adaptations.skippedSteps) adaptations.skippedSteps = [];

        // Simple merge (prevent exact duplicates could be added here later if needed)
        const mergedAdaptations = {
            addedModules: [...existing.addedModules, ...adaptations.addedModules],
            skippedSteps: [...new Set([...existing.skippedSteps, ...adaptations.skippedSteps])]
        };

        user.roadmapAdaptations.set(domainId, mergedAdaptations);
        user.markModified('roadmapAdaptations');
        await user.save();

        res.status(200).json({
            msg: 'Adaptations generated successfully',
            adaptations: mergedAdaptations
        });

    } catch (error) {
        console.error('Adaptive Engine Error:', error?.response?.data || error.message);
        res.status(500).json({ msg: 'Server Error in Adaptive Engine' });
    }
});

// @route   POST api/adaptive/generate-quiz
// @desc    Generate 3 multiple-choice questions for a specific module
// @access  Private
router.post('/generate-quiz', authMiddleware, async (req, res) => {
    try {
        const { module } = req.body;

        if (!module || !module.title) {
            return res.status(400).json({ msg: 'Module data is required' });
        }

        const stepTitles = module.steps ? module.steps.map(s => s.title).join(", ") : "general concepts";

        const prompt = `
            Generate exactly 3 multiple-choice questions to test the user's knowledge on the topic of "${module.title}".
            The questions should focus on the following sub-topics: ${stepTitles}.
            
            Format the response strictly as a JSON array of objects. Do not include any markdown formatting like \`\`\`json.
            Each object must match this exact structure:
            {
                "question": "The question text",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctIndex": 0, // The 0-based index of the correct option in the options array
                "explanation": "A short explanation of why this is the correct answer."
            }
        `;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.3, // Slightly higher for variation, but low enough for factual accuracy
                    response_mime_type: "application/json",
                }
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const aiResponseText = response.data.candidates[0].content.parts[0].text;

        let questions;
        try {
            questions = JSON.parse(aiResponseText);
        } catch (e) {
            console.error("Failed to parse Gemini Quiz JSON output:", aiResponseText);
            return res.status(500).json({ msg: "Failed to generate valid quiz questions." });
        }

        res.status(200).json(questions);

    } catch (error) {
        console.error('Quiz Generation Error:', error?.response?.data || error.message);
        res.status(500).json({ msg: 'Server Error during quiz generation' });
    }
});

module.exports = router;
