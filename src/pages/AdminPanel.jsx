import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; // Ensure you have access to firebase auth if needed
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

    const [selectedFeedback, setSelectedFeedback] = useState(null); // For modal
    const [editingRoadmap, setEditingRoadmap] = useState(null); // For Add/Edit modal
    const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);

    const role = localStorage.getItem('adminRole') || 'support';
    const token = localStorage.getItem('adminAuthenticated') // For simplicity, though normally real JWT

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

    // Helper for API calls to add auth header
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

    // Fetch initial data
    useEffect(() => {
        fetchStats();
        if (hasAccess('users')) fetchUsers();
        if (hasAccess('feedback')) fetchFeedbacks();
        if (hasAccess('roadmaps')) fetchRoadmaps();
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

    const handleBanUser = async (userId, currentStatus) => {
        try {
            await fetchAPI(`/api/admin/users/${userId}`, {
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
            await fetchAPI(`/api/admin/users/${userId}`, { method: 'DELETE' });
            fetchUsers(); // Refresh
        } catch (e) { console.error("Failed to delete user", e); }
    };

    const handleDeleteFeedback = async (id) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return;
        try {
            await fetchAPI(`/api/admin/feedbacks/${id}`, { method: 'DELETE' });
            fetchFeedbacks();
            setSelectedFeedback(null);
        } catch (e) { console.error("Failed to delete feedback", e); }
    };

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
            return <div className="text-red-500 text-center text-xl mt-20">Access Denied</div>;
        }

        switch (activeTab) {
            case 'dashboard': return <AdminDashboard stats={stats} />;
            case 'users': return <AdminUsers users={users} onBanUser={handleBanUser} onDeleteUser={handleDeleteUser} />;
            case 'feedback': return <AdminFeedback feedbacks={feedbacks} onDeleteFeedback={handleDeleteFeedback} onViewFeedback={setSelectedFeedback} />;
            case 'roadmaps': return <AdminRoadmaps roadmaps={roadmaps} onOpenModal={openRoadmapModal} onOpenBuilder={(r) => { setEditingRoadmap(r); setIsBuilderOpen(true); }} onDelete={handleDeleteRoadmap} />;
            case 'resources': return <AdminResources />;
            case 'analytics': return <AdminAnalytics fetchAPI={fetchAPI} />;
            case 'notifications': return <AdminNotifications />;
            case 'settings': return <AdminSettings />;
            default: return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Admin Panel</h1>
                    <span className="text-xs uppercase bg-gray-700 px-2 py-1 rounded text-gray-300 tracking-widest mt-2 inline-block">{role.replace('_', ' ')}</span>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {hasAccess('dashboard') && <SidebarItem id="dashboard" icon="📊" label="Dashboard" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('users') && <SidebarItem id="users" icon="👥" label="User Management" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('feedback') && <SidebarItem id="feedback" icon="💬" label="Feedback" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('roadmaps') && <SidebarItem id="roadmaps" icon="🗺️" label="Roadmap Control" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('resources') && <SidebarItem id="resources" icon="🧠" label="AI Resources" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('analytics') && <SidebarItem id="analytics" icon="📈" label="Analytics & AI" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('notifications') && <SidebarItem id="notifications" icon="🔔" label="Notifications" active={activeTab} onClick={setActiveTab} />}
                    {hasAccess('settings') && <SidebarItem id="settings" icon="⚙️" label="Settings" active={activeTab} onClick={setActiveTab} />}
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

            {/* Modals */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Feedback Details</h3>
                            </div>
                            <button onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="bg-gray-900/50 p-6 rounded-lg text-lg text-gray-200 leading-relaxed border border-gray-700 whitespace-pre-wrap">
                                {selectedFeedback.feedback}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Roadmap Info Editor Modal */}
            {isRoadmapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">{editingRoadmap ? 'Edit Domain Info' : 'Add Domain'}</h3>
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
                            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded mt-4">
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
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active === id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
    >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{label}</span>
    </button>
);

export default AdminPanel;
