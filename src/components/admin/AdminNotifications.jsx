import React, { useState, useEffect } from 'react';

const AdminNotifications = ({ fetchAPI }) => {
    const [status, setStatus] = useState(null); // { ok, msg }
    const [isSending, setIsSending] = useState(false);
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await fetchAPI('/api/admin/notifications/history');
            if (res.ok) setHistory(await res.json());
        } catch {
            // non-critical
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleSendNotification = async e => {
        e.preventDefault();
        const title = e.target.title.value.trim();
        const message = e.target.message.value.trim();
        if (!title || !message) return;

        setIsSending(true);
        setStatus(null);
        try {
            const res = await fetchAPI('/api/admin/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, message })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus({ ok: true, msg: '✅ Notification broadcast to all users!' });
                e.target.reset();
                // Prepend to local history
                if (data.notification) {
                    setHistory(prev => [data.notification, ...prev].slice(0, 20));
                }
            } else {
                setStatus({ ok: false, msg: `❌ ${data.message || 'Failed to send'}` });
            }
        } catch {
            setStatus({ ok: false, msg: '❌ Network error. Please try again.' });
        } finally {
            setIsSending(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">Notification Manager</h2>

            {/* Broadcast Form */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">📢 Broadcast to All Users</h3>

                {status && (
                    <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${status.ok
                            ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                            : 'bg-red-900/40 text-red-300 border border-red-700/50'
                        }`}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSendNotification} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">Notification Title *</label>
                        <input
                            name="title" type="text"
                            placeholder="e.g. New Feature Released!"
                            required
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs mb-1 font-semibold uppercase tracking-wider">Message *</label>
                        <textarea
                            name="message"
                            placeholder="Write your announcement here…"
                            rows="4"
                            required
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-blue-500 outline-none text-sm resize-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-bold transition-all text-sm flex items-center space-x-2"
                    >
                        {isSending
                            ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div><span>Sending…</span></>
                            : <span>Broadcast to All Users</span>
                        }
                    </button>
                </form>
            </div>

            {/* Notification History */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Broadcast History</h3>
                    <button
                        onClick={fetchHistory}
                        className="text-gray-400 hover:text-white text-xs border border-gray-600 px-2 py-1 rounded hover:border-gray-500 transition-colors"
                    >
                        ↻ Refresh
                    </button>
                </div>

                {loadingHistory ? (
                    <div className="flex items-center space-x-3 text-gray-400 py-2">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                        <span className="text-sm">Loading history…</span>
                    </div>
                ) : history.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4 text-center border border-dashed border-gray-600 rounded-xl">
                        No broadcasts sent yet.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {history.map((n, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-2xl">📢</span>
                                        <div>
                                            <p className="text-white font-bold text-sm">{n.title}</p>
                                            <p className="text-gray-400 text-sm mt-1">{n.message}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                        {new Date(n.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNotifications;
