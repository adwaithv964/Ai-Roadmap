import React, { useState, useEffect, useMemo } from 'react';
import { GEMINI_API_KEY } from '../data/constants';

const SkeletonCard = () => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mt-2"></div>
            </div>
        </div>
    </div>
);

const ResourceCard = ({ resource, icon }) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
            <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">{icon}</div>
                <div className="flex-1">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{resource.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{resource.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono">{resource.source}</p>
                </div>
            </div>
        </a>
        <div className="flex justify-end items-center mt-2 -mb-2 -mr-2">
            <button className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800 text-sm" title="Helpful">👍</button>
            <button className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800 text-sm" title="Not Helpful">👎</button>
        </div>
    </div>
);

const AIResourceRecommender = ({ topicTitle, onClose }) => {
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [resources, setResources] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');

    const resourceTypes = useMemo(() => {
        if (!resources) return ['All'];
        const types = new Set(resources.map(r => r.type));
        return ['All', ...Array.from(types)];
    }, [resources]);

    const filteredResources = useMemo(() => {
        if (activeFilter === 'All') return resources;
        return resources.filter(r => r.type === activeFilter);
    }, [activeFilter, resources]);

    useEffect(() => {
        if (GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
            setStatus('error');
            return;
        }

        const fetchAIResources = async () => {
            setStatus('loading');

            const cacheKey = `resources_${topicTitle.replace(/\s+/g, '_')}`;
            try {
                const cachedData = sessionStorage.getItem(cacheKey);
                if (cachedData) {
                    setResources(JSON.parse(cachedData));
                    setStatus('success');
                    return;
                }
            } catch (e) { console.error("Cache read failed:", e); }

            const apiKey = GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const systemPrompt = "You are an expert learning assistant. Your goal is to find the best, free, high-quality learning resources on the web for a given topic. You must return your findings as a structured JSON array of objects. Do not include any text outside of the JSON array. Each object must have the keys 'title', 'description', 'link', 'type', and 'source'.";
            const userQuery = `Find the 5 best learning resources for the topic module: "${topicTitle}". The resources should be diverse. Include links to official documentation, a high-quality YouTube video playlist or channel, a well-regarded article or blog post, and if possible, an interactive tutorial or a GitHub repository.`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
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
                } catch (error) {
                    console.error(`Attempt ${i + 1} failed:`, error);
                }

                // Exponential backoff
                await new Promise(res => setTimeout(res, Math.pow(2, i) * 1000));
            }


            if (!success || !response) {
                setStatus('error');
                return;
            }

            try {
                const result = await response.json();
                let jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (jsonText) {
                    // Clean the response to ensure it's valid JSON
                    const startIndex = jsonText.indexOf('[');
                    const endIndex = jsonText.lastIndexOf(']');
                    if (startIndex !== -1 && endIndex !== -1) {
                        jsonText = jsonText.substring(startIndex, endIndex + 1);
                    }

                    const parsedJson = JSON.parse(jsonText);
                    setResources(parsedJson);
                    setStatus('success');
                    sessionStorage.setItem(cacheKey, JSON.stringify(parsedJson));
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Failed to parse AI response:", error);
                setStatus('error');
            }
        };

        fetchAIResources();
    }, [topicTitle]);

    const getIconForType = (type) => {
        switch (type.toLowerCase()) {
            case 'video': return '▶️';
            case 'article': return '📄';
            case 'documentation': return '📚';
            case 'interactive tutorial': return '🎮';
            case 'github': return '💻';
            default: return '🔗';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold">🤖 AI Recommendations</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Showing top resources for: "{topicTitle}"</p>
                    </div>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl leading-none">&times;</button>
                </div>

                <>
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold mr-2">Filter by type:</span>
                        {resourceTypes.map(type => (
                            <button key={type} onClick={() => setActiveFilter(type)} className={`px-3 py-1 text-sm rounded-full ${activeFilter === type ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{type}</button>
                        ))}
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto pr-2">
                        {status === 'loading' && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

                        {status === 'error' && (
                            <div className="text-center py-10">
                                {GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE" ? (
                                    <>
                                        <p className="text-orange-500 font-semibold">⚠️ AI Features Disabled</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">To enable AI Recommendations, please add your Google Gemini API key to the `GEMINI_API_KEY` constant at the top of `src/App.jsx`.</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-red-500">❌ Oops! The AI couldn't fetch resources.</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">This might be due to an invalid API key or a network issue. Please try again later.</p>
                                    </>
                                )}
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="space-y-4">
                                {filteredResources.map((res, index) => (
                                    <ResourceCard key={index} resource={res} icon={getIconForType(res.type)} />
                                ))}
                                {filteredResources.length === 0 && <p className="text-center py-10">No resources found for this filter.</p>}
                            </div>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
};

export default AIResourceRecommender;
