import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminAnalytics = ({ fetchAPI }) => {
    const [dropoffs, setDropoffs] = useState([]);
    const [failures, setFailures] = useState([]);
    const [thresholds, setThresholds] = useState({ remedial: 40, fastTrack: 90 });
    const [thresholdStatus, setThresholdStatus] = useState(null); // { ok, msg }
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const resDrop = await fetchAPI('/api/admin/analytics/dropoffs');
                if (resDrop.ok) setDropoffs(await resDrop.json());

                const resFail = await fetchAPI('/api/admin/analytics/failures');
                if (resFail.ok) setFailures(await resFail.json());
            } catch (e) {
                console.error("Failed to load analytics", e);
            }
        };
        fetchAnalytics();
    }, []);

    const handleThresholdChange = e => {
        setThresholds({ ...thresholds, [e.target.name]: Number(e.target.value) });
    };

    const handleApplyThresholds = async () => {
        setIsSaving(true);
        setThresholdStatus(null);
        try {
            const res = await fetchAPI('/api/admin/analytics/thresholds', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ remedial: thresholds.remedial, fastTrack: thresholds.fastTrack })
            });
            if (res.ok) {
                setThresholdStatus({ ok: true, msg: '✅ Thresholds saved successfully!' });
            } else {
                const d = await res.json();
                setThresholdStatus({ ok: false, msg: `❌ ${d.message}` });
            }
        } catch {
            setThresholdStatus({ ok: false, msg: '❌ Network error. Please try again.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setThresholdStatus(null), 4000);
        }
    };

    const handleExportCSV = () => {
        if (!failures.length) return;
        const header = ['User', 'Topic', 'Score (%)', 'Risk Level'];
        const rows = failures.map(u => [u.user, u.topic, u.score, u.risk]);
        const csv = [header, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `at-risk-users-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">User Analytics & AI Logic</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Logic Configuration */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Adaptivity Logic Thresholds</h3>
                        <p className="text-sm text-gray-400 mt-1">Configure how the AI adapts difficulty based on quiz scores.</p>
                    </div>

                    {thresholdStatus && (
                        <div className={`p-3 rounded-lg text-sm font-medium ${thresholdStatus.ok
                                ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                                : 'bg-red-900/40 text-red-300 border border-red-700/50'
                            }`}>
                            {thresholdStatus.msg}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-gray-300 mb-2 text-sm">
                                <span>Trigger Remedial Mode</span>
                                <span className="font-mono text-red-400 font-bold">&lt; {thresholds.remedial}%</span>
                            </div>
                            <input
                                type="range" name="remedial"
                                min="10" max="60" value={thresholds.remedial}
                                onChange={handleThresholdChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Provides extra foundational resources if score drops below threshold.</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-gray-300 mb-2 text-sm">
                                <span>Trigger Fast Track</span>
                                <span className="font-mono text-green-400 font-bold">&gt; {thresholds.fastTrack}%</span>
                            </div>
                            <input
                                type="range" name="fastTrack"
                                min="70" max="100" value={thresholds.fastTrack}
                                onChange={handleThresholdChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Allows skipping basic modules if score exceeds threshold.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleApplyThresholds}
                        disabled={isSaving}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg font-bold transition-colors text-sm"
                    >
                        {isSaving ? 'Saving…' : 'Apply & Save Thresholds'}
                    </button>
                </div>

                {/* Drop-off Heatmap */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Drop-off Heatmap</h3>
                    <div className="h-64 w-full">
                        {dropoffs.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dropoffs} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorDropoff" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="module" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} />
                                    <Area type="monotone" dataKey="count" stroke="#EF4444" fillOpacity={1} fill="url(#colorDropoff)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">No drop-off data yet</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Failure Log Table */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Failure Detection Log <span className="text-sm font-normal text-gray-400">("At Risk" Users)</span></h3>
                    <button
                        onClick={handleExportCSV}
                        disabled={failures.length === 0}
                        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 px-3 py-1.5 rounded-lg text-sm text-white border border-gray-600 transition-colors font-medium"
                    >
                        ⬇ Export CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300 text-sm">
                        <thead className="bg-gray-700/80 text-white text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-3">User</th>
                                <th className="p-3">Struggling Topic</th>
                                <th className="p-3">Recent Score</th>
                                <th className="p-3">Risk Level</th>
                                <th className="p-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {failures.map(user => (
                                <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                    <td className="p-3 font-medium text-white">{user.user}</td>
                                    <td className="p-3">
                                        <span className="bg-gray-900 border border-gray-600 px-2 py-1 rounded text-xs">{user.topic}</span>
                                    </td>
                                    <td className="p-3 font-mono text-red-400 font-bold">{user.score}%</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.risk === 'High'
                                                ? 'bg-red-900/50 text-red-400 border border-red-900'
                                                : 'bg-yellow-900/50 text-yellow-400 border border-yellow-900'
                                            }`}>
                                            {user.risk}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <a
                                            href={`mailto:${user.user}?subject=Your AI Roadmap Progress&body=Hi,%0D%0A%0D%0AWe noticed you're struggling with ${user.topic}. Let us help!`}
                                            className="text-blue-400 hover:text-blue-300 hover:underline text-xs font-medium border border-blue-500/40 px-3 py-1.5 rounded hover:bg-blue-500/10 transition-colors"
                                        >
                                            ✉ Intervene
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {failures.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">No at-risk users detected.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
