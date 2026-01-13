const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// @desc    Get AI-powered resource recommendations
// @route   POST /api/gemini/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
    const { topicTitle } = req.body;

    if (!topicTitle) {
        return res.status(400).json({ msg: 'Topic title is required' });
    }

    try {
        const systemPrompt = "You are an expert learning assistant... (rest of your prompt)";
        const userQuery = `Find the 5 best learning resources for the topic: "${topicTitle}"... (rest of your prompt)`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: userQuery }] }],
            systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
        });
        
        const responseText = result.response.text();
        res.status(200).send(responseText); // Send the raw JSON string from the API
    } catch (error) {
        console.error('Gemini API Error (Recommendations):', error);
        res.status(500).json({ msg: "Error communicating with AI service." });
    }
};

// @desc    Handle AI chat conversations
// @route   POST /api/gemini/chat
// @access  Private
exports.getChatResponse = async (req, res) => {
    const { conversationHistory, currentMessage, roadmapTitle } = req.body;
    
    if (!conversationHistory || !currentMessage || !roadmapTitle) {
        return res.status(400).json({ msg: 'Missing required chat fields.' });
    }

    try {
        const systemPrompt = `You are an expert AI Learning Tutor... (rest of your prompt)`;

        const chat = model.startChat({
            history: conversationHistory,
            systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
        });

        const result = await chat.sendMessage(currentMessage);
        const modelResponse = result.response.text();
        
        res.json({ text: modelResponse });
    } catch (error) {
        console.error("Gemini API Error (Chat):", error);
        res.status(500).json({ msg: "Error communicating with AI service." });
    }
};// @desc    Get AI-powered resource recommendations