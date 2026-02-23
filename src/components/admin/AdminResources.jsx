import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';

const AdminResources = () => {
    const [queue, setQueue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAPI = async (endpoint, options = {}) => {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        let idToken = '';
        if (auth.currentUser) idToken = await auth.currentUser.getIdToken();

        return fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${idToken}`
            }
        });
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            const res = await fetchAPI('/api/admin/resources/pending');
            if (res.ok) setQueue(await res.json());
        } catch (e) {
            console.error("Failed to fetch resource queue", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            await fetchAPI(`/api/admin/resources/${id}/${action}`, { method: 'PUT' });
            // Remove from local queue
            setQueue(q => q.filter(r => r._id !== id));
        } catch (e) {
            console.error(`Failed to ${action} resource`, e);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">Resource Intelligence Hub</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">AI Suggestion Queue</h3>
                    <span className="bg-blue-900/50 border border-blue-900 text-blue-300 text-xs px-3 py-1 rounded font-bold">
                        {queue.length} Pending
                    </span>
                </div>

                {isLoading ? (
                    <p className="text-gray-400 text-center py-4">Loading queue...</p>
                ) : queue.length === 0 ? (
                    <div className="text-center p-8 border border-dashed border-gray-600 rounded bg-gray-900/30">
                        <span className="text-4xl mb-4 block">🎉</span>
                        <p className="text-gray-400">The queue is empty. All resources are approved.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {queue.map(resource => (
                            <div key={resource._id} className="bg-gray-900 border border-gray-700 p-4 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors">
                                <div>
                                    <h4 className="text-white font-bold">{resource.title}</h4>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline break-all">
                                        {resource.url}
                                    </a>
                                    <div className="flex space-x-2 mt-2">
                                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded capitalize">{resource.type}</span>
                                        <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded border border-purple-900/50">Topic: {resource.topic}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 ml-4">
                                    <button
                                        onClick={() => handleAction(resource._id, 'approve')}
                                        className="bg-green-600 border border-green-500 hover:bg-green-500 text-white px-4 py-1.5 rounded text-sm font-bold transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(resource._id, 'reject')}
                                        className="bg-red-600/20 border border-red-600/40 hover:bg-red-600/40 text-red-400 px-4 py-1.5 rounded text-sm font-bold transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg mt-6">
                <h3 className="text-xl font-bold text-white mb-4">API Configuration</h3>
                <div className="space-y-4 max-w-xl">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1 font-bold">YouTube Data API Key</label>
                        <input type="password" value="************************" disabled className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-gray-500 cursor-not-allowed" />
                    </div>
                    <button className="bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm font-bold mt-2">Update Keys</button>
                </div>
            </div>
        </div>
    );
};

export default AdminResources;
