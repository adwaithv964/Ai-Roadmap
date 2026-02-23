import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { domainCategories } from '../data/constants';

const AdminPanel = ({ onBackToHome }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null); // For modal
    const [roadmaps, setRoadmaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingRoadmap, setEditingRoadmap] = useState(null); // For Add/Edit modal
    const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        onBackToHome();
    };

    // Fetch initial data
    useEffect(() => {
        fetchStats();
        fetchUsers();
        fetchFeedbacks();
        fetchRoadmaps();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/stats');
            if (res.ok) setStats(await res.json());
        } catch (e) { console.error("Failed to fetch stats", e); }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/users');
            if (res.ok) setUsers(await res.json());
        } catch (e) { console.error("Failed to fetch users", e); }
    };

    const fetchFeedbacks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/feedbacks');
            if (res.ok) setFeedbacks(await res.json());
        } catch (e) { console.error("Failed to fetch feedbacks", e); }
    };

    const fetchRoadmaps = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/roadmaps');
            if (res.ok) setRoadmaps(await res.json());
            setIsLoading(false);
        } catch (e) { console.error("Failed to fetch roadmaps", e); setIsLoading(false); }
    };



    const handleBanUser = async (userId, currentStatus) => {
        try {
            await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isBanned: !currentStatus })
            });
            fetchUsers(); // Refresh
        } catch (e) { console.error("Failed to ban user", e); }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: 'DELETE'
            });
            fetchUsers(); // Refresh
        } catch (e) { console.error("Failed to delete user", e); }
    };

    const handleDeleteFeedback = async (id) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;
        try {
            await fetch(`http://localhost:5000/api/admin/feedbacks/${id}`, { method: 'DELETE' });
            fetchFeedbacks();
            setSelectedFeedback(null);
        } catch (e) { console.error("Failed to delete feedback", e); }
    };

    const handleSendNotification = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const message = e.target.message.value;

        try {
            await fetch('http://localhost:5000/api/admin/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, message })
            });
            alert('Notification Sent!');
            e.target.reset();
        } catch (err) { console.error(err); alert('Failed to send'); }
    }

    const handleSaveRoadmap = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const method = editingRoadmap ? 'PUT' : 'POST';
        const url = editingRoadmap
            ? `http://localhost:5000/api/admin/roadmaps/${editingRoadmap._id}`
            : 'http://localhost:5000/api/admin/roadmaps';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            fetchRoadmaps();
            setIsRoadmapModalOpen(false);
            setEditingRoadmap(null);
        } catch (e) { console.error("Failed to save roadmap", e); }
    };

    const handleDeleteRoadmap = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:5000/api/admin/roadmaps/${id}`, { method: 'DELETE' });
            fetchRoadmaps();
        } catch (e) { console.error("Failed to delete roadmap", e); }
    };

    const openRoadmapModal = (roadmap = null) => {
        setEditingRoadmap(roadmap);
        setIsRoadmapModalOpen(true);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
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
            case 'users':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-white">User Management</h2>
                            <input type="text" placeholder="Search users..." className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none" />
                        </div>
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <table className="w-full text-left text-gray-300">
                                <thead className="bg-gray-700 text-white text-sm">
                                    <tr>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Joined</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id} className={`border-b border-gray-700 hover:bg-gray-700/50 ${user.isBanned ? 'bg-red-900/20' : ''}`}>
                                            <td className="p-4 font-medium text-white">
                                                {user.email} <span className="text-xs text-gray-500 block">{user.role}</span>
                                            </td>
                                            <td className="p-4">
                                                {user.isBanned ?
                                                    <span className="px-2 py-1 rounded text-xs font-bold bg-red-600 text-white">BANNED</span> :
                                                    <span className="px-2 py-1 rounded text-xs font-bold bg-green-600 text-white">ACTIVE</span>
                                                }
                                            </td>
                                            <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => handleBanUser(user._id, user.isBanned)}
                                                    className={`hover:underline ${user.isBanned ? 'text-green-400' : 'text-yellow-400'}`}
                                                >
                                                    {user.isBanned ? 'Unban' : 'Ban'}
                                                </button>
                                                <button onClick={() => handleDeleteUser(user._id)} className="text-red-400 hover:text-red-300">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {users.length === 0 && <p className="p-8 text-center text-gray-500">No users found.</p>}
                        </div>
                    </div>
                );
            case 'feedback':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-white">User Feedback</h2>
                            <div className="text-sm text-gray-400">Total: {feedbacks.length}</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                            <table className="w-full text-left text-gray-300">
                                <thead className="bg-gray-700 text-white uppercase text-sm">
                                    <tr>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Rating</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Feedback</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbacks.map(item => (
                                        <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="p-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span className={`font-bold ${item.rating >= 4 ? 'text-green-400' : item.rating >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {item.rating} ★
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 rounded text-xs bg-gray-600 uppercase tracking-wider text-white">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-4 max-w-md truncate" title={item.feedback}>
                                                {item.feedback}
                                            </td>
                                            <td className="p-4 text-sm text-gray-400">
                                                {item.email || '-'}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => setSelectedFeedback(item)}
                                                    className="text-blue-400 hover:text-blue-300 font-medium text-sm border border-blue-500/50 px-3 py-1 rounded hover:bg-blue-500/10 transition-colors"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFeedback(item._id)}
                                                    className="text-red-400 hover:text-red-300 font-medium text-sm border border-red-500/50 px-3 py-1 rounded hover:bg-red-500/10 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {feedbacks.length === 0 && <p className="p-8 text-center text-gray-500">No feedback found.</p>}
                        </div>
                    </div>
                );
            case 'roadmaps':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-white">Roadmap Control</h2>
                            <button onClick={() => openRoadmapModal()} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">+ Add Domain</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roadmaps.map(rmap => (
                                <div key={rmap._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex justify-between items-center group hover:border-blue-500 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-3xl">{rmap.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{rmap.title}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-1">{rmap.description}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${rmap.status === 'Active' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                                {rmap.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openRoadmapModal(rmap)} className="text-blue-400 hover:underline">Edit</button>
                                        <button onClick={() => handleDeleteRoadmap(rmap._id)} className="text-red-400 hover:underline">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'resources':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white">AI Resource Manager</h2>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">API Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-1">Gemini API Key</label>
                                    <input type="password" value="************************" disabled className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-gray-500" />
                                </div>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Update Keys</button>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white">Notification Manager</h2>
                        <form onSubmit={handleSendNotification} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4">Send Push Notification</h3>
                            <input name="title" type="text" placeholder="Title" required className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                            <textarea name="message" placeholder="Message" rows="3" required className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"></textarea>
                            <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold transition-all transform hover:scale-105">
                                Broadcast to All Users
                            </button>
                        </form>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white">System Settings</h2>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-white">Maintenance Mode</span>
                                <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white">Allow New Registrations</span>
                                <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem id="dashboard" icon="📊" label="Dashboard" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="users" icon="👥" label="User Management" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="feedback" icon="💬" label="Feedback" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="roadmaps" icon="🗺️" label="Roadmap Control" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="resources" icon="🧠" label="AI Resources" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="notifications" icon="🔔" label="Notifications" active={activeTab} onClick={setActiveTab} />
                    <SidebarItem id="settings" icon="⚙️" label="Settings" active={activeTab} onClick={setActiveTab} />
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors w-full">
                        <span>⬅️</span><span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>

            {/* Feedback Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Feedback Details</h3>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-400">{new Date(selectedFeedback.createdAt).toLocaleString()}</span>
                                    <span className="bg-blue-900/50 text-blue-300 px-2 rounded">{selectedFeedback.category}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 uppercase text-xs font-bold tracking-wider">Rating</span>
                                <div className="flex text-2xl text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < selectedFeedback.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="block text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">Message</span>
                                <div className="bg-gray-900/50 p-6 rounded-lg text-lg text-gray-200 leading-relaxed border border-gray-700 whitespace-pre-wrap">
                                    {selectedFeedback.feedback}
                                </div>
                            </div>

                            <div>
                                <span className="block text-gray-400 uppercase text-xs font-bold tracking-wider mb-1">Contact Email</span>
                                <div className="text-white font-mono">{selectedFeedback.email || 'Anonymous'}</div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-between">
                            <button
                                onClick={() => handleDeleteFeedback(selectedFeedback._id)}
                                className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors font-medium border border-red-600/30"
                            >
                                Delete
                            </button>
                            <button onClick={() => setSelectedFeedback(null)} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Roadmap Modal */}
            {isRoadmapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">{editingRoadmap ? 'Edit Domain' : 'Add Domain'}</h3>
                            <button onClick={() => setIsRoadmapModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSaveRoadmap} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Title</label>
                                <input name="title" defaultValue={editingRoadmap?.title} required className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description</label>
                                <textarea name="description" defaultValue={editingRoadmap?.description} required rows="3" className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Icon (Emoji)</label>
                                    <input name="icon" defaultValue={editingRoadmap?.icon} required className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Status</label>
                                    <select name="status" defaultValue={editingRoadmap?.status || 'Active'} className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none">
                                        <option value="Active">Active</option>
                                        <option value="Beta">Beta</option>
                                        <option value="Deprecated">Deprecated</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Slug (Unique ID)</label>
                                    <input name="slug" defaultValue={editingRoadmap?.slug} required className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" placeholder="e.g., frontend" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Category</label>
                                    <select name="category" defaultValue={editingRoadmap?.category || 'dev'} className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none">
                                        {domainCategories.filter(c => c.id !== 'all').map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded mt-4">
                                {editingRoadmap ? 'Update Domain' : 'Create Domain'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const SidebarItem = ({ id, icon, label, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active === id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
    >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>
);

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

export default AdminPanel;
