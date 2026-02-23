require('dotenv').config({ path: './.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        console.log("Testing chat response format...");
        const chat = model.startChat({
            history: [],
            systemInstruction: { parts: [{ text: "You are a test." }] },
        });

        const result = await chat.sendMessage("Testing");
        console.log("Chat Response:", result.response.text());

        console.log("\nTesting skill gap format...");
        const result2 = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: "Hello" }] }],
            systemInstruction: { parts: [{ text: "Respond in JSON." }] },
            generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
        });
        console.log("Generate Content Response:", result2.response.text());

    } catch (err) {
        console.error("GEMINI TEST FAILED:", err);
    }
}

testGemini();
