import React, { useState, useEffect, useRef } from 'react';
import { GEMINI_API_KEY } from '../data/constants';

const AIChatbot = ({ roadmapTitle, initialMessage, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const firstMessage = `Hello! I'm your AI tutor. I see you're working on the ${roadmapTitle} roadmap. How can I help you learn today?`;
        setMessages([{ role: 'model', text: firstMessage }]);

        if (initialMessage) {
            setInput(initialMessage);
        }
    }, [roadmapTitle, initialMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        setError(null);

        if (GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
            setError("API Key is missing. Please add it to enable the chatbot.");
            setIsLoading(false);
            return;
        }

        const conversationHistory = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const apiKey = GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const systemPrompt = `You are an expert AI Learning Tutor. Your user is currently studying "${roadmapTitle}". Your goal is to provide clear, concise, and encouraging explanations. When asked for code, provide well-commented examples. Always use Markdown for formatting, especially for code blocks. Your answers must be grounded in real-time web information.`;

        const payload = {
            contents: [...conversationHistory, { role: 'user', parts: [{ text: currentInput }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        let response;
        let success = false;
        for (let i = 0; i < 5; i++) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    success = true;
                    break;
                }
            } catch { /* Will retry */ }
            await new Promise(res => setTimeout(res, Math.pow(2, i) * 1000));
        }

        setIsLoading(false);
        if (!success || !response) {
            setError("Sorry, I'm having trouble connecting. Please try again later.");
            return;
        }

        try {
            const result = await response.json();
            const modelResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (modelResponse) {
                setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
            } else {
                setError("I received an empty response. Could you try rephrasing your question?");
            }
        } catch (error) {
            console.error("Failed to parse AI response:", error);
            setError("Sorry, I encountered an error processing the response.");
        }
    };

    // Simple Markdown to HTML renderer for code blocks
    const renderMessageContent = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```')) {
                const code = part.replace(/```(\w*\n)?/g, '').trim();
                return (
                    <pre key={index} className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 my-2 overflow-x-auto">
                        <code className="text-sm font-mono">{code}</code>
                    </pre>
                );
            }
            return <p key={index} className="whitespace-pre-wrap">{part}</p>;
        });
    };


    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-[calc(100vw-40px)] max-w-md h-[70vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg">💬 AI Chatbot Tutor</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-xl leading-none">&times;</button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {renderMessageContent(msg.text)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <footer className="p-4 border-t dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={"Ask me anything..."}
                            className="w-full p-2 border rounded-lg bg-transparent dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50" disabled={isLoading || !input.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default AIChatbot;
