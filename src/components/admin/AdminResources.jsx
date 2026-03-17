import React, { useState, useEffect } from 'react';

const AdminResources = ({ fetchAPI }) => {
    const [queue, setQueue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [form, setForm] = useState({ title: '', url: '', type: 'article', topic: '' });
    const [formStatus, setFormStatus] = useState(null); // { ok, msg }
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        setIsLoading(true);
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
            setQueue(q => q.filter(r => r._id !== id));
        } catch (e) {
            console.error(`Failed to ${action} resource`, e);
        }
    };

    const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAddResource = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);
        try {
            const res = await fetchAPI('/api/admin/resources/manual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setFormStatus({ ok: true, msg: `✅ Resource "${data.title}" added successfully!` });
                setForm({ title: '', url: '', type: 'article', topic: '' });
                setShowAddForm(false);
            } else {
                setFormStatus({ ok: false, msg: `❌ ${data.message}` });
            }
        } catch (e) {
            setFormStatus({ ok: false, msg: '❌ Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Resource Intelligence Hub</h2>
                <button
                    onClick={() => setShowAddForm(v => !v)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${showAddForm
                            ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                >
                    {showAddForm ? '✕ Cancel' : '+ Add Resource'}
                </button>
            </div>

            {/* Manual Add Form */}
            {showAddForm && (
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-500/30 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4">Add Resource Manually</h3>
                    {formStatus && (
                        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${formStatus.ok ? 'bg-green-900/40 text-green-300 border border-green-700/50' : 'bg-red-900/40 text-red-300 border border-red-700/50'
                            }`}>
                            {formStatus.msg}
                        </div>
                    )}
                    <form onSubmit={handleAddResource} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">Title *</label>
                            <input
                                name="title" value={form.title} onChange={handleFormChange} required
                                placeholder="e.g. Advanced CSS Grid Tutorial"
                                className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">URL *</label>
                            <input
                                name="url" value={form.url} onChange={handleFormChange} required type="url"
                                placeholder="https://..."
                                className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">Topic *</label>
                            <input
                                name="topic" value={form.topic} onChange={handleFormChange} required
                                placeholder="e.g. CSS Grid"
                                className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">Type</label>
                            <select
                                name="type" value={form.type} onChange={handleFormChange}
                                className="w-full p-2.5 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm"
                            >
                                <option value="article">Article</option>
                                <option value="video">Video</option>
                                <option value="course">Course</option>
                                <option value="documentation">Documentation</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit" disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors"
                            >
                                {isSubmitting ? 'Adding…' : 'Add Resource (Approved)'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* AI Suggestion Queue */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">AI Suggestion Queue</h3>
                    <div className="flex items-center space-x-3">
                        <span className="bg-blue-900/50 border border-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full font-bold">
                            {queue.length} Pending
                        </span>
                        <button
                            onClick={fetchQueue}
                            className="text-gray-400 hover:text-white text-xs border border-gray-600 px-2 py-1 rounded hover:border-gray-500 transition-colors"
                        >
                            ↻ Refresh
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center space-x-3 text-gray-400 py-4">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                        <span>Loading queue…</span>
                    </div>
                ) : queue.length === 0 ? (
                    <div className="text-center p-8 border border-dashed border-gray-600 rounded-xl bg-gray-900/30">
                        <span className="text-4xl mb-4 block">🎉</span>
                        <p className="text-gray-400">The queue is empty. All resources are approved.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {queue.map(resource => (
                            <div key={resource._id} className="bg-gray-900 border border-gray-700 p-4 rounded-xl flex items-start justify-between hover:border-blue-500/50 transition-colors gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-bold text-sm">{resource.title}</h4>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer"
                                        className="text-blue-400 text-xs hover:underline break-all block mt-1">
                                        {resource.url}
                                    </a>
                                    <div className="flex space-x-2 mt-2">
                                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded capitalize">{resource.type}</span>
                                        <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded border border-purple-900/50">
                                            Topic: {resource.topic}
                                        </span>
                                        {resource.suggestedByAI && (
                                            <span className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-0.5 rounded border border-cyan-900/50">AI</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 shrink-0">
                                    <button
                                        onClick={() => handleAction(resource._id, 'approve')}
                                        className="bg-green-600 border border-green-500 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        ✓ Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(resource._id, 'reject')}
                                        className="bg-red-600/20 border border-red-600/40 hover:bg-red-600/40 text-red-400 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        ✕ Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminResources;
