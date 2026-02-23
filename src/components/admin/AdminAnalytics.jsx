import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminAnalytics = ({ fetchAPI }) => {
    const [dropoffs, setDropoffs] = useState([]);
    const [failures, setFailures] = useState([]);
    const [thresholds, setThresholds] = useState({ remedial: 40, fastTrack: 90 });

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

    const handleThresholdChange = (e) => {
        setThresholds({ ...thresholds, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">User Analytics & AI Logic</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Logic Configuration */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Adaptivity Logic Thresholds</h3>
                    <p className="text-sm text-gray-400 mb-6">Configure how the AI adapts difficulty based on quiz scores.</p>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-gray-300 mb-2">
                                <span>Trigger Remedial Mode (&lt; {thresholds.remedial}%)</span>
                            </div>
                            <input
                                type="range"
                                name="remedial"
                                min="10" max="60"
                                value={thresholds.remedial}
                                onChange={handleThresholdChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">Provides extra foundational resources if score drops below threshold.</p>
                        </div>

                        <div>
                            <div className="flex justify-between text-gray-300 mb-2">
                                <span>Trigger Fast Track (&gt; {thresholds.fastTrack}%)</span>
                            </div>
                            <input
                                type="range"
                                name="fastTrack"
                                min="70" max="100"
                                value={thresholds.fastTrack}
                                onChange={handleThresholdChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">Allows skipping basic modules if score exceeds threshold.</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors">Apply Thresholds</button>
                </div>

                {/* Drop-off Heatmap */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
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
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Failure Detection Log ("At Risk" Users)</h3>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm text-white">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-white text-sm">
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
                                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="p-3 font-medium text-white">{user.user}</td>
                                    <td className="p-3"><span className="bg-gray-900 border border-gray-600 px-2 py-1 rounded text-xs">{user.topic}</span></td>
                                    <td className="p-3 font-mono text-red-400">{user.score}%</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.risk === 'High' ? 'bg-red-900/50 text-red-500 border border-red-900' : 'bg-yellow-900/50 text-yellow-500 border border-yellow-900'}`}>
                                            {user.risk}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <button className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-medium">Intervene (Email)</button>
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
