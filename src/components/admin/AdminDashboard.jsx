import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsCard = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${color} bg-opacity-20 text-white`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    </div>
);

const AdminDashboard = ({ stats }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-6">System Overview</h2>
            {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" color="bg-blue-600" />
                    <StatsCard title="Active Users (30d)" value={stats.activeUsers} icon="🔥" color="bg-green-600" />
                    <StatsCard title="Total Feedback" value={stats.totalFeedbacks} icon="💬" color="bg-yellow-600" />
                </div>
            ) : <p className="text-gray-400">Loading stats...</p>}

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">New User Trends (Last 30 Days)</h3>
                <div className="h-64 w-full">
                    {stats?.engagement ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.engagement}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
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
        </div>
    );
};

export default AdminDashboard;
