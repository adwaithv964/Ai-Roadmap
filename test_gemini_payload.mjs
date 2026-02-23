import fetch from 'node-fetch';

const API_KEY = "AIzaSyAsEC6YxkGbQPsTKg-d7ydohNKA9RJ5OjE"; // From user logs

async function testGemini(modelName, firstRole) {
    console.log(`\nTesting Model: ${modelName}, First Role: ${firstRole}`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

    const history = [];
    if (firstRole === 'model') {
        history.push({ role: 'model', parts: [{ text: "Hello, I am a bot." }] });
    }

    const payload = {
        contents: [...history, { role: 'user', parts: [{ text: "Hello" }] }],
        systemInstruction: { parts: [{ text: "You are a helpful assistant." }] },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ Success!");
            const data = await response.json();
            // console.log(JSON.stringify(data, null, 2));
        } else {
            console.log(`❌ Failed with Status: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.log("Error Body:", errorText);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

// Node 18+ has global fetch. If older, this might fail, but let's try.
(async () => {
    // Test 1: gemini-1.5-flash with Model-first (Current Bug)
    await testGemini('gemini-1.5-flash', 'model');

    // Test 2: gemini-1.5-flash with User-first (Fix)
    await testGemini('gemini-1.5-flash', 'user');

    // Test 3: gemini-2.5-flash with User-first (Requested Model)
    await testGemini('gemini-2.5-flash', 'user');
})();
