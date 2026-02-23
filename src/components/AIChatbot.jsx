import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';

const AIChatbot = ({ roadmapTitle, initialMessage, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const firstMessage = `Hello! I'm your AI tutor. I see you're working on the **${roadmapTitle}** roadmap. How can I help you learn today?`;
        setMessages([{ role: 'model', text: firstMessage }]);
        if (initialMessage) setInput(initialMessage);
    }, [roadmapTitle, initialMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', text: input };
        const currentInput = input;
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            // Get the Firebase auth token to authenticate with the backend
            const token = await auth.currentUser?.getIdToken();
            if (!token) throw new Error('Not authenticated. Please sign in again.');

            // Build conversation history in Gemini format (exclude the first bot greeting)
            const conversationHistory = messages
                .filter((_, i) => i > 0) // skip the initial greeting
                .map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                }));

            // Call OUR backend — the Gemini key stays safely on the server
            const res = await fetch('/api/gemini/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    roadmapTitle,
                    currentMessage: currentInput,
                    conversationHistory,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.msg || `Server error (${res.status})`);
            }

            const data = await res.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: 'model', text: data.text }]);
            } else {
                setError('Received an empty response. Please try rephrasing your question.');
            }
        } catch (err) {
            console.error('Chat error:', err);
            setError(err.message || 'Sorry, something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Simple Markdown renderer for code blocks and bold text
    const renderMessageContent = (text) => {
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```')) {
                const code = part.replace(/```(\w*\n)?/g, '').trim();
                return (
                    <pre key={index} className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 my-2 overflow-x-auto text-left">
                        <code className="text-sm font-mono">{code}</code>
                    </pre>
                );
            }
            // Render **bold** inline
            const boldParts = part.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={index} className="whitespace-pre-wrap">
                    {boldParts.map((bp, i) =>
                        bp.startsWith('**') && bp.endsWith('**')
                            ? <strong key={i}>{bp.slice(2, -2)}</strong>
                            : bp
                    )}
                </p>
            );
        });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-[calc(100vw-40px)] max-w-md h-[70vh] flex flex-col transform transition-all duration-300 animate-fade-in-scale">

                {/* Header */}
                <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h3 className="font-bold text-lg">💬 AI Tutor</h3>
                        <p className="text-xs text-gray-500 truncate max-w-[260px]">{roadmapTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-xl leading-none"
                    >
                        &times;
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${msg.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}>
                                    {renderMessageContent(msg.text)}
                                </div>
                            </div>
                        ))}

                        {/* Loading dots */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm">
                                    <p>⚠️ {error}</p>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <footer className="p-4 border-t dark:border-gray-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything…"
                            className="w-full p-2 border rounded-lg bg-transparent dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 flex-shrink-0 hover:bg-blue-600 transition-colors"
                            disabled={isLoading || !input.trim()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default AIChatbot;
