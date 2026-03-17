import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsCard = ({ title, value, icon, colorClass }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorClass} bg-opacity-20`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value ?? '—'}</h3>
        </div>
    </div>
);

const AdminDashboard = ({ stats }) => {
    return (
        <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">System Overview</h2>

            {stats ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" colorClass="bg-blue-600" />
                    <StatsCard title="Active Users (30d)" value={stats.activeUsers} icon="🔥" colorClass="bg-green-600" />
                    <StatsCard title="Total Feedback" value={stats.totalFeedbacks} icon="💬" colorClass="bg-yellow-600" />
                    <StatsCard title="Total Roadmaps" value={stats.totalRoadmaps} icon="🗺️" colorClass="bg-purple-600" />
                    <StatsCard title="Pending Resources" value={stats.pendingResources} icon="⏳" colorClass="bg-orange-600" />
                </div>
            ) : (
                <div className="flex items-center space-x-3 text-gray-400">
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    <span>Loading stats...</span>
                </div>
            )}

            {/* New User Trend Chart */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">New User Trends (Last 30 Days)</h3>
                <div className="h-64 w-full">
                    {stats?.engagement?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.engagement}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#9CA3AF" allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#fff' }}
                                    cursor={{ fill: '#374151', opacity: 0.5 }}
                                />
                                <Bar dataKey="users" fill="#2563EB" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 flex items-center justify-center h-full">No data available</p>
                    )}
                </div>
            </div>

            {/* Recent Activity Feed */}
            {stats?.recentFeedbacks?.length > 0 && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Recent Feedback Activity</h3>
                    <div className="space-y-3">
                        {stats.recentFeedbacks.map((fb, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <span className={`text-sm font-bold ${fb.rating >= 4 ? 'text-green-400' : fb.rating >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {fb.rating}★
                                    </span>
                                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded uppercase tracking-wider">
                                        {fb.category}
                                    </span>
                                    <span className="text-gray-400 text-sm">{fb.email || 'Anonymous'}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(fb.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
