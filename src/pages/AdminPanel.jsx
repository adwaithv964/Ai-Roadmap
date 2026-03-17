import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminUsers from '../components/admin/AdminUsers';
import AdminFeedback from '../components/admin/AdminFeedback';
import AdminRoadmaps from '../components/admin/AdminRoadmaps';
import AdminResources from '../components/admin/AdminResources';
import AdminNotifications from '../components/admin/AdminNotifications';
import AdminSettings from '../components/admin/AdminSettings';
import RoadmapBuilder from '../components/admin/RoadmapBuilder';
import AdminAnalytics from '../components/admin/AdminAnalytics';

const AdminPanel = ({ onBackToHome }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [roadmaps, setRoadmaps] = useState([]);
    const [platformSettings, setPlatformSettings] = useState(null);

    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [editingRoadmap, setEditingRoadmap] = useState(null);
    const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);

    const role = localStorage.getItem('adminRole') || 'support';

    const hasAccess = (tab) => {
        if (role === 'super_admin') return true;
        const expertTabs = ['dashboard', 'roadmaps', 'resources', 'feedback', 'analytics'];
        const supportTabs = ['dashboard', 'users', 'feedback', 'notifications'];
        switch (role) {
            case 'domain_expert': return expertTabs.includes(tab);
            case 'support': return supportTabs.includes(tab);
            default: return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminRole');
        onBackToHome();
    };

    // Central authenticated API caller
    const fetchAPI = async (endpoint, options = {}) => {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        let idToken = '';
        if (auth.currentUser) {
            idToken = await auth.currentUser.getIdToken();
        }
        return fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${idToken}`
            }
        });
    };

    // Fetch initial data on mount
    useEffect(() => {
        fetchStats();
        if (hasAccess('users')) fetchUsers();
        if (hasAccess('feedback')) fetchFeedbacks();
        if (hasAccess('roadmaps')) fetchRoadmaps();
        if (hasAccess('settings')) fetchSettings();
    }, [role]);

    const fetchStats = async () => {
        try {
            const res = await fetchAPI('/api/admin/stats');
            if (res.ok) setStats(await res.json());
        } catch (e) { console.error("Failed to fetch stats", e); }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetchAPI('/api/admin/users');
            if (res.ok) setUsers(await res.json());
        } catch (e) { console.error("Failed to fetch users", e); }
    };

    const fetchFeedbacks = async () => {
        try {
            const res = await fetchAPI('/api/admin/feedbacks');
            if (res.ok) setFeedbacks(await res.json());
        } catch (e) { console.error("Failed to fetch feedbacks", e); }
    };

    const fetchRoadmaps = async () => {
        try {
            const res = await fetchAPI('/api/admin/roadmaps');
            if (res.ok) setRoadmaps(await res.json());
        } catch (e) { console.error("Failed to fetch roadmaps", e); }
    };

    const fetchSettings = async () => {
        try {
            const res = await fetchAPI('/api/admin/settings');
            if (res.ok) setPlatformSettings(await res.json());
        } catch (e) { console.error("Failed to fetch settings", e); }
    };

    // --- User Handlers ---
    const handleBanUser = async (userId, currentStatus) => {
        try {
            await fetchAPI(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isBanned: !currentStatus })
            });
            fetchUsers();
        } catch (e) { console.error("Failed to ban user", e); }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetchAPI(`/api/admin/users/${userId}`, { method: 'DELETE' });
            fetchUsers();
        } catch (e) { console.error("Failed to delete user", e); }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await fetchAPI(`/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            fetchUsers();
        } catch (e) { console.error("Failed to change role", e); }
    };

    // --- Feedback Handlers ---
    const handleDeleteFeedback = async (id) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;
        try {
            await fetchAPI(`/api/admin/feedbacks/${id}`, { method: 'DELETE' });
            fetchFeedbacks();
            setSelectedFeedback(null);
        } catch (e) { console.error("Failed to delete feedback", e); }
    };

    // --- Roadmap Handlers ---
    const handleDeleteRoadmap = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetchAPI(`/api/admin/roadmaps/${id}`, { method: 'DELETE' });
            fetchRoadmaps();
        } catch (e) { console.error("Failed to delete roadmap", e); }
    };

    const openRoadmapModal = (roadmap = null) => {
        setEditingRoadmap(roadmap);
        setIsRoadmapModalOpen(true);
    };

    const handleSaveRoadmap = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const method = editingRoadmap ? 'PUT' : 'POST';
        const url = editingRoadmap
            ? `/api/admin/roadmaps/${editingRoadmap._id}`
            : '/api/admin/roadmaps';

        try {
            await fetchAPI(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            fetchRoadmaps();
            setIsRoadmapModalOpen(false);
            setEditingRoadmap(null);
        } catch (e) { console.error("Failed to save roadmap info", e); }
    };

    const renderContent = () => {
        if (!hasAccess(activeTab)) {
            return (
                <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                    <span className="text-5xl">🔒</span>
                    <p className="text-red-400 text-xl font-semibold">Access Denied</p>
                    <p className="text-gray-500 text-sm">Your role ({role.replace('_', ' ')}) does not have permission to view this section.</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard stats={stats} />;
            case 'users':
                return <AdminUsers users={users} onBanUser={handleBanUser} onDeleteUser={handleDeleteUser} onRoleChange={handleRoleChange} />;
            case 'feedback':
                return <AdminFeedback feedbacks={feedbacks} onDeleteFeedback={handleDeleteFeedback} onViewFeedback={setSelectedFeedback} />;
            case 'roadmaps':
                return (
                    <AdminRoadmaps
                        roadmaps={roadmaps}
                        onOpenModal={openRoadmapModal}
                        onOpenBuilder={(r) => { setEditingRoadmap(r); setIsBuilderOpen(true); }}
                        onDelete={handleDeleteRoadmap}
                    />
                );
            case 'resources':
                return <AdminResources fetchAPI={fetchAPI} />;
            case 'analytics':
                return <AdminAnalytics fetchAPI={fetchAPI} />;
            case 'notifications':
                return <AdminNotifications fetchAPI={fetchAPI} />;
            case 'settings':
                return <AdminSettings fetchAPI={fetchAPI} initialSettings={platformSettings} />;
            default:
                return null;
        }
    };

    const NAV_ITEMS = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'users', icon: '👥', label: 'User Management' },
        { id: 'feedback', icon: '💬', label: 'Feedback' },
        { id: 'roadmaps', icon: '🗺️', label: 'Roadmap Control' },
        { id: 'resources', icon: '🧠', label: 'AI Resources' },
        { id: 'analytics', icon: '📈', label: 'Analytics & AI' },
        { id: 'notifications', icon: '🔔', label: 'Notifications' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col shrink-0">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Admin Panel
                    </h1>
                    <span className="text-xs uppercase bg-gray-700 px-2 py-1 rounded text-gray-300 tracking-widest mt-2 inline-block">
                        {role.replace('_', ' ')}
                    </span>
                </div>
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.filter(item => hasAccess(item.id)).map(item => (
                        <SidebarItem
                            key={item.id}
                            id={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab}
                            onClick={setActiveTab}
                        />
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        <span>⬅️</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>

            {/* Feedback Detail Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Feedback Details</h3>
                                <div className="flex items-center space-x-3 mt-2">
                                    <span className={`text-sm font-bold ${selectedFeedback.rating >= 4 ? 'text-green-400' : selectedFeedback.rating >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {selectedFeedback.rating} ★
                                    </span>
                                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded uppercase tracking-wider">
                                        {selectedFeedback.category}
                                    </span>
                                    {selectedFeedback.email && (
                                        <span className="text-xs text-gray-400">{selectedFeedback.email}</span>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="bg-gray-900/50 p-6 rounded-xl text-gray-200 leading-relaxed border border-gray-700 whitespace-pre-wrap">
                                {selectedFeedback.feedback}
                            </div>
                            {selectedFeedback.email && (
                                <a
                                    href={`mailto:${selectedFeedback.email}?subject=Re: Your Feedback on AI Roadmap`}
                                    className="inline-block mt-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                >
                                    ✉ Reply via Email
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Roadmap Info Editor Modal */}
            {isRoadmapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">{editingRoadmap ? 'Edit Domain Info' : 'Add Domain'}</h3>
                            <button onClick={() => setIsRoadmapModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                        </div>
                        <form onSubmit={handleSaveRoadmap} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Title</label>
                                <input name="title" defaultValue={editingRoadmap?.title} required className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description</label>
                                <textarea name="description" defaultValue={editingRoadmap?.description} required rows="3" className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Icon (Emoji)</label>
                                    <input name="icon" defaultValue={editingRoadmap?.icon} required className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Status</label>
                                    <select name="status" defaultValue={editingRoadmap?.status || 'Active'} className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none">
                                        <option value="Active">Active</option>
                                        <option value="Beta">Beta</option>
                                        <option value="Deprecated">Deprecated</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg mt-4 transition-colors">
                                {editingRoadmap ? 'Update Info' : 'Create Domain'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Visual React Flow Builder Overlay */}
            {isBuilderOpen && editingRoadmap && (
                <RoadmapBuilder roadmap={editingRoadmap} onClose={() => setIsBuilderOpen(false)} fetchAPI={fetchAPI} />
            )}
        </div>
    );
};

const SidebarItem = ({ id, icon, label, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${active === id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
    >
        <span className="text-xl">{icon}</span>
        <span className="font-medium text-sm">{label}</span>
    </button>
);

export default AdminPanel;
