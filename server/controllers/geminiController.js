const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client dynamically to ensure env vars are loaded
const getModel = () => {
    if (!process.env.GEMINI_API_KEY) {
        console.error('CRITICAL: GEMINI_API_KEY is not set in the environment variables.');
        throw new Error('GEMINI_API_KEY is missing');
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
};

// ─── Smart Resource Recommender ───────────────────────────────────────────────
//
// @desc    Get AI-powered, difficulty-aware, ranked resource recommendations
// @route   POST /api/gemini/smart-resources
// @access  Private
exports.getSmartResources = async (req, res) => {
    const { topicTitle, difficulty = 'Any', formats = [] } = req.body;

    if (!topicTitle) {
        return res.status(400).json({ msg: 'topicTitle is required' });
    }

    const difficultyClause = difficulty === 'Any'
        ? 'Mix of difficulty levels (Beginner through Advanced).'
        : `Target primarily ${difficulty}-level learners.`;

    const formatClause = formats.length > 0
        ? `Prioritise these formats: ${formats.join(', ')}. Always include at least one popular YouTube video regardless.`
        : 'Include every format type listed below.';

    const systemPrompt = `You are an expert learning curator. Your sole output must be a valid JSON array — no markdown wrapper, no explanation, no extra keys. Every element must be a real, freely accessible, high-quality resource.`;

    const userQuery = `Find exactly 8 top-tier FREE learning resources for the topic: "${topicTitle}".

${difficultyClause}
${formatClause}

MANDATORY DIVERSITY — you MUST include at least one resource of EACH of these types:
1. "Video" — a wildly popular YouTube video or playlist (millions of views). Use the real YouTube URL. In the description mention the approximate view count or why it's popular (e.g. "Over 5M views on YouTube, by Traversy Media").
2. "Article" — a highly regarded blog post or written tutorial (e.g. freeCodeCamp, CSS-Tricks, dev.to, Smashing Magazine).
3. "Documentation" — official or canonical reference documentation (e.g. MDN, official language docs, W3Schools for basics).
4. "Interactive" — a hands-on coding playground or browser-based interactive lesson (e.g. Codecademy, Scrimba, Khan Academy, The Odin Project, VisuAlgo, CSS Diner).
5. "GitHub" — a highly-starred GitHub repository with examples, projects, or learning resources.
6. "Course" — a complete structured course (e.g. freeCodeCamp curriculum, Google's web.dev, Microsoft Learn, CS50, Coursera free audit).

The remaining 2 resources can be any type that best fits "${topicTitle}".

Each JSON object must have EXACTLY these keys:
- "title": string — clear resource title
- "description": string — 1–2 sentences on what the learner will gain; for Video include approximate view count or channel reputation
- "link": string — CRITICAL RULE: For EVERY Article, Documentation, GitHub, and Course, you MUST provide a Google Search URL instead of a direct link, because direct links often 404. Format: "https://www.google.com/search?q=[Specific+Resource+Name]". Only use direct URLs for YouTube Video links (https://www.youtube.com/watch?v=...) if you are 100% sure they exist.
- "source": string — platform name (e.g. "YouTube", "MDN Web Docs", "freeCodeCamp", "GitHub")
- "type": string — one of: "Video", "Article", "Documentation", "Interactive", "GitHub", "Course"
- "difficulty": string — one of: "Beginner", "Intermediate", "Advanced"
- "qualityScore": number — 1–10 reflecting real-world quality, popularity, and trustworthiness
- "estimatedTime": string — e.g. "45 minutes", "3 hours", "Self-paced"
- "whyRecommended": string — one sentence explaining why this resource is exceptional for this topic

Sort the array from highest qualityScore to lowest. Return ONLY the JSON array, nothing else.`;

    try {
        const model = getModel();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.3,
            },
        });

        const responseText = result.response.text();

        // Extra safety: strip any accidental markdown fences
        const cleaned = responseText.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '');
        const parsed = JSON.parse(cleaned);

        res.status(200).json(parsed);
    } catch (error) {
        console.error('Gemini Smart Resources Error:', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};

// ─── Legacy Recommendations (kept for compatibility) ──────────────────────────
//
// @desc    Get AI-powered resource recommendations (original, kept for backward compat)
// @route   POST /api/gemini/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
    const { topicTitle } = req.body;
    if (!topicTitle) return res.status(400).json({ msg: 'Topic title is required' });

    const systemPrompt = 'You are an expert learning assistant. Return a JSON array of objects with keys: title, description, link, type, source. No other text. CRITICAL: DO NOT hallucinate URLs. If you are not 100% certain of the exact URL, provide a search link instead (e.g. https://www.google.com/search?q=...)';
    const userQuery = `Find the 6 best learning resources for: "${topicTitle}". Include official docs, a YouTube video, an article, and an interactive tutorial if possible.`;

    try {
        const model = getModel();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: 'application/json' },
        });
        res.status(200).send(result.response.text());
    } catch (error) {
        console.error('Gemini API Error (Recommendations):', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};

// ─── AI Chat ──────────────────────────────────────────────────────────────────
//
// @desc    Handle AI chat conversations
// @route   POST /api/gemini/chat
// @access  Private
exports.getChatResponse = async (req, res) => {
    const { conversationHistory, currentMessage, roadmapTitle } = req.body;
    if (!conversationHistory || !currentMessage || !roadmapTitle) {
        return res.status(400).json({ msg: 'Missing required chat fields.' });
    }

    const systemPrompt = `You are an expert AI Learning Tutor specialising in ${roadmapTitle}. Be concise, helpful, and encouraging. Use markdown for code snippets.`;

    try {
        const model = getModel();
        const chat = model.startChat({
            history: conversationHistory,
            systemInstruction: { parts: [{ text: systemPrompt }] },
        });
        const result = await chat.sendMessage(currentMessage);
        res.json({ text: result.response.text() });
    } catch (error) {
        console.error('Gemini API Error (Chat):', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};

// ─── Skill Gap Analyzer ───────────────────────────────────────────────────────
exports.getSkillGapAnalysis = async (req, res) => {
    const { domainTitle, currentSkills } = req.body;
    if (!domainTitle || !currentSkills?.length)
        return res.status(400).json({ msg: 'domainTitle and currentSkills are required.' });

    const systemPrompt = `You are an expert career advisor and tech recruiter.
When given a target job role and the user's current skills, produce a detailed skill gap analysis.
IMPORTANT: Respond ONLY with a valid JSON object — no markdown, no extra text.
The JSON must have exactly these keys:
- "matchedSkills": array of objects { "skill": string, "relevance": string }
- "missingSkills": array of objects { "skill": string, "priority": number (1=critical,2=important,3=nice-to-have), "reason": string, "estimatedHours": number, "resources": string }
- "readinessScore": number (0-100)
- "summary": string (2-3 sentences)
Order "missingSkills" by priority (1 first).`;

    const userQuery = `Target job role: ${domainTitle}
Current skills I have: ${currentSkills.join(', ')}
Analyze my skill gap for this role. Be realistic and specific.`;

    try {
        const model = getModel(); // Initialize model here
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userQuery }] }],
            systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
        });
        const text = result.response.text().replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
        const parsed = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
        res.status(200).json(parsed);
    } catch (error) {
        console.error('Gemini Skill Gap Error:', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};

// ─── Weekly Planner AI Mini-Tasks ─────────────────────────────────────────────
exports.getAIMiniTasks = async (req, res) => {
    const { roadmapTitle, days } = req.body; // days: [{ date, steps: [{ title }] }]
    if (!roadmapTitle || !days?.length)
        return res.status(400).json({ msg: 'roadmapTitle and days are required.' });

    const prompt = `You are a ${roadmapTitle} coding mentor creating hands-on daily exercises.
For each day below, write a SHORT, specific, actionable mini-task (1-2 sentences max) the learner can BUILD or DO that day.
Respond ONLY with a JSON array: [{"date":"YYYY-MM-DD","miniTask":"..."}]
No markdown, no explanation.

Days:
${days.map(d => `${d.date}: Topics — ${d.steps.map(s => s.title).join(', ')}`).join('\n')}`;

    try {
        const model = getModel();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.5 },
        });
        const text = result.response.text().replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
        const parsed = JSON.parse(text);
        res.status(200).json(parsed);
    } catch (error) {
        console.error('Gemini Mini-Tasks Error:', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};

// ─── Resume & Portfolio Generator ─────────────────────────────────────────────
exports.generateResume = async (req, res) => {
    const { roadmapTitle, learnedSkills, completedModules, progressPct, userInfo } = req.body;
    if (!roadmapTitle || !learnedSkills?.length)
        return res.status(400).json({ msg: 'roadmapTitle and learnedSkills are required.' });

    const skillNames = learnedSkills.map(s => `${s.name} (${s.level})`).join(', ');
    const modulesList = (completedModules || []).map(m => m.title).join(', ') || 'Various topics';

    const prompt = `You are an expert tech recruiter and resume writer.
Generate a professional resume JSON AND portfolio project suggestions for a ${roadmapTitle} learner.

Candidate info:
- Name: ${userInfo?.name || 'Candidate'}
- Target role: ${roadmapTitle.replace(' Roadmap', '')}
- Years of experience: ${userInfo?.yearsExp || '0'}
- Learned skills: ${skillNames}
- Completed modules: ${modulesList}
- Overall progress: ${progressPct}% of the full roadmap completed

RESPOND ONLY with a single valid JSON object (no markdown) with this exact structure:
{
  "resume": {
    "jobTitle": "string",
    "summary": "string - 3-sentence professional summary",
    "skills": [{ "category": "Core", "items": ["skill1"] }],
    "projects": [{ "name": "string", "tech": ["tech1"], "description": "string" }],
    "education": true,
    "courseworkSummary": "string",
    "certifications": ["string"]
  },
  "portfolioProjects": [{
    "name": "string", "description": "string",
    "techStack": ["string"], "difficulty": "Beginner|Intermediate|Advanced",
    "githubTips": "string"
  }]
}
Generate 3 resume projects and 6 portfolio project ideas.`;

    try {
        const model = getModel();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.6 },
        });
        const text = result.response.text().replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
        const parsed = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
        res.status(200).json(parsed);
    } catch (error) {
        console.error('Gemini Resume Generator Error:', error);
        res.status(500).json({ msg: 'Error communicating with AI service.' });
    }
};