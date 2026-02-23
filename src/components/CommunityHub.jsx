import React, { useState, useEffect, useCallback, useRef } from 'react';
import { auth } from '../config/firebase';

// ─── API helpers ──────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function apiCall(path, options = {}) {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
    }
    return res.json();
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const getAvatarLetter = (email = '') => email[0]?.toUpperCase() || '?';
const avatarColors = [
    'from-violet-500 to-purple-600', 'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-600', 'from-orange-500 to-amber-500',
    'from-pink-500 to-rose-600', 'from-teal-500 to-cyan-600',
];
const getAvatarColor = (email = '') => avatarColors[email.charCodeAt(0) % avatarColors.length];

const timeAgo = (dateStr) => {
    const d = new Date(dateStr);
    const diff = (Date.now() - d) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const DOMAIN_COLORS = {
    'frontend': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'fullstack': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'datascience': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'cybersecurity': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    'devops': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'android': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    'ios': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
};
const getDomainColor = (id = '') => DOMAIN_COLORS[id] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';

// ─── ProgressRing ─────────────────────────────────────────────────────────────
const ProgressRing = ({ percent, size = 52, stroke = 5 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const fill = ((percent || 0) / 100) * circ;
    const color = percent >= 75 ? '#22c55e' : percent >= 40 ? '#f59e0b' : '#6366f1';
    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} className="dark:stroke-gray-700" />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                    strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.8s ease' }} />
            </svg>
            <span className="absolute text-[11px] font-extrabold" style={{ color }}>{percent ?? '?'}%</span>
        </div>
    );
};

// ─── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ email, size = 'md' }) => {
    const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' };
    return (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${getAvatarColor(email)} flex items-center justify-center font-bold text-white flex-shrink-0 shadow`}>
            {getAvatarLetter(email)}
        </div>
    );
};

// ─── PostCard ─────────────────────────────────────────────────────────────────
const PostCard = ({ post, currentUid, onLike, onComment, onDelete }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const liked = post.likes.includes(currentUid);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setSubmitting(true);
        await onComment(post._id, commentText);
        setCommentText('');
        setSubmitting(false);
        setShowComments(true);
    };

    return (
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Card header */}
            <div className="p-4 flex items-start gap-3">
                <Avatar email={post.authorEmail} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-gray-900 dark:text-white truncate">{post.authorEmail.split('@')[0]}</span>
                        {post.domainTitle && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getDomainColor(post.domainId)}`}>
                                {post.domainTitle}
                            </span>
                        )}
                        {post.type === 'shared_roadmap' && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                🗺️ Shared Roadmap
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(post.createdAt)}</p>
                </div>
                {post.authorUid === currentUid && (
                    <button onClick={() => onDelete(post._id)} className="text-gray-300 hover:text-red-400 transition-colors ml-auto flex-shrink-0" title="Delete post">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                )}
            </div>

            {/* Progress row for shared roadmaps */}
            {post.type === 'shared_roadmap' && post.progressPercent !== null && (
                <div className="mx-4 mb-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-100 dark:border-indigo-700 flex items-center gap-4">
                    <ProgressRing percent={post.progressPercent} />
                    <div>
                        <p className="font-bold text-sm text-gray-800 dark:text-white">{post.roadmapTitle}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.completedSteps} / {post.totalSteps} steps completed</p>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="px-4 pb-3">
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Action bar */}
            <div className="px-4 py-2 border-t border-gray-50 dark:border-gray-700 flex items-center gap-4">
                <button
                    onClick={() => onLike(post._id)}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:scale-110 ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                >
                    {liked ? '❤️' : '🤍'} <span>{post.likes.length}</span>
                </button>
                <button
                    onClick={() => setShowComments(prev => !prev)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-blue-400 transition-colors"
                >
                    💬 <span>{post.comments.length}</span>
                </button>
            </div>

            {/* Comments section */}
            {showComments && (
                <div className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-700 px-4 py-3 space-y-3">
                    {post.comments.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-1">No comments yet. Be the first!</p>
                    )}
                    {post.comments.map(c => (
                        <div key={c._id} className="flex items-start gap-2">
                            <Avatar email={c.email} size="sm" />
                            <div className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 text-xs flex-1 border border-gray-100 dark:border-gray-700">
                                <span className="font-bold text-gray-800 dark:text-white mr-2">{c.email.split('@')[0]}</span>
                                <span className="text-gray-600 dark:text-gray-300">{c.text}</span>
                            </div>
                        </div>
                    ))}
                    <form onSubmit={handleComment} className="flex gap-2 pt-1">
                        <input
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Write a comment…"
                            maxLength={500}
                            className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={submitting || !commentText.trim()}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg disabled:opacity-50 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
};

// ─── GroupCard ────────────────────────────────────────────────────────────────
const GroupCard = ({ group, currentUid, onJoin, onLeave, onClick }) => {
    const isMember = group.members.some(m => m.uid === currentUid);
    const isFull = group.members.length >= group.maxMembers;
    const isOwner = group.createdByUid === currentUid;
    const fillPct = Math.round((group.members.length / group.maxMembers) * 100);

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 group"
            onClick={() => onClick(group)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{group.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{group.description}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${getDomainColor(group.domainId)}`}>
                    {group.domainTitle}
                </span>
            </div>

            {/* Members bar */}
            <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>👥 {group.members.length}/{group.maxMembers} members</span>
                    <span>{fillPct}% full</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${fillPct >= 90 ? 'bg-red-500' : fillPct >= 60 ? 'bg-orange-500' : 'bg-green-500'}`}
                        style={{ width: `${fillPct}%` }}
                    />
                </div>
            </div>

            {/* Member avatars preview */}
            <div className="flex items-center gap-1 mb-3">
                {group.members.slice(0, 5).map((m, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarColor(m.email)} flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-gray-800`}
                        style={{ marginLeft: i > 0 ? '-6px' : 0 }} title={m.email}>
                        {getAvatarLetter(m.email)}
                    </div>
                ))}
                {group.members.length > 5 && <span className="text-xs text-gray-400 ml-2">+{group.members.length - 5} more</span>}
            </div>

            {/* Join/Leave button */}
            <button
                onClick={e => { e.stopPropagation(); isMember ? onLeave(group._id) : onJoin(group._id); }}
                disabled={!isMember && isFull}
                className={`w-full py-2 rounded-xl text-sm font-bold transition-all duration-200 ${isMember
                    ? isOwner ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
                    : isFull ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-100 shadow-sm'}`}
            >
                {isMember ? (isOwner ? '👑 Owner' : '✓ Leave') : isFull ? '🔒 Full' : '+ Join Group'}
            </button>
        </div>
    );
};

// ─── GroupDetailPanel ─────────────────────────────────────────────────────────
const GroupDetailPanel = ({ group, onClose }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{group.name}</h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getDomainColor(group.domainId)}`}>{group.domainTitle}</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">{group.description}</p>
            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-3">👥 Members ({group.members.length}/{group.maxMembers})</h3>
            <div className="space-y-2">
                {group.members.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Avatar email={m.email} size="sm" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">{m.email.split('@')[0]}</p>
                            <p className="text-xs text-gray-400">{m.email}</p>
                        </div>
                        {m.uid === group.createdByUid && (
                            <span className="ml-auto text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full font-bold">Owner</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ─── CreateGroupForm ──────────────────────────────────────────────────────────
const CreateGroupForm = ({ domains, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState({ name: '', description: '', domainId: '', maxMembers: 20 });
    const selectedDomain = domains.find(d => d.id === form.domainId);

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.name.trim() || !form.description.trim() || !form.domainId) return;
        onSubmit({ ...form, domainTitle: selectedDomain?.title || form.domainId });
    };
    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">🎓 Create a Study Group</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input value={form.name} onChange={set('name')} placeholder="Group name *" maxLength={80}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
                <textarea value={form.description} onChange={set('description')} placeholder="Describe your group *" maxLength={500} rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" required />
                <select value={form.domainId} onChange={set('domainId')} required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="">Select a domain *</option>
                    {domains.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                </select>
                <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">Max Members:</label>
                    <input type="number" min={2} max={100} value={form.maxMembers} onChange={set('maxMembers')}
                        className="w-24 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="flex gap-3 pt-1">
                    <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                    <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors disabled:opacity-50 shadow-sm">
                        {loading ? 'Creating…' : 'Create Group'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── SharePostForm ────────────────────────────────────────────────────────────
const SharePostForm = ({ roadmapData, progress, onSubmit, onCancel, loading }) => {
    const [form, setForm] = useState({ type: roadmapData ? 'shared_roadmap' : 'post', content: '' });

    const totalSteps = roadmapData
        ? roadmapData.stages.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.steps.length, 0), 0)
        : 0;
    const completedSteps = roadmapData ? Object.values(progress).filter(p => p.completed).length : 0;
    const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.content.trim()) return;
        const payload = { type: form.type, content: form.content.trim() };
        if (form.type === 'shared_roadmap' && roadmapData) {
            Object.assign(payload, {
                domainId: roadmapData.domainId || '',
                domainTitle: roadmapData.domainTitle || roadmapData.title,
                roadmapTitle: roadmapData.title,
                progressPercent,
                completedSteps,
                totalSteps,
            });
        }
        onSubmit(payload);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm mb-6">
            <div className="flex gap-2 mb-4">
                {roadmapData && (
                    <button onClick={() => setForm(f => ({ ...f, type: 'shared_roadmap' }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${form.type === 'shared_roadmap' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                        🗺️ Share Roadmap
                    </button>
                )}
                <button onClick={() => setForm(f => ({ ...f, type: 'post' }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${form.type === 'post' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                    ✍️ General Post
                </button>
            </div>

            {form.type === 'shared_roadmap' && roadmapData && (
                <div className="mb-3 flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-700">
                    <ProgressRing percent={progressPercent} size={48} />
                    <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{roadmapData.title}</p>
                        <p className="text-xs text-gray-500">{completedSteps}/{totalSteps} steps</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <textarea
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    placeholder={form.type === 'shared_roadmap' ? 'Share a note about your progress, what you learned, or your experience…' : 'Share a tip, insight, or question with the community…'}
                    maxLength={1000}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-3"
                    required
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{form.content.length}/1000</span>
                    <div className="flex gap-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                        <button type="submit" disabled={loading || !form.content.trim()}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors disabled:opacity-50 shadow-sm">
                            {loading ? 'Posting…' : 'Post'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
    { id: 'feed', label: 'Feed', icon: '📣' },
    { id: 'groups', label: 'Study Groups', icon: '👥' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
];

// ─── Main CommunityHub ────────────────────────────────────────────────────────
const CommunityHub = ({ onClose, roadmapData, progress, domains }) => {
    const [activeTab, setActiveTab] = useState('feed');
    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
    const [error, setError] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postingLoading, setPostingLoading] = useState(false);
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [groupSearch, setGroupSearch] = useState('');
    const [groupDomainFilter, setGroupDomainFilter] = useState('all');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [currentUid, setCurrentUid] = useState(null);
    const [currentEmail, setCurrentEmail] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const contentRef = useRef(null);

    // Get current user
    useEffect(() => {
        const user = auth.currentUser;
        if (user) { setCurrentUid(user.uid); setCurrentEmail(user.email); }
    }, []);

    // Fetch feed
    const fetchFeed = useCallback(async (p = 1) => {
        setLoadingPosts(true);
        setError(null);
        try {
            const data = await apiCall(`/api/community/feed?page=${p}&limit=10`);
            if (p === 1) setPosts(data.posts);
            else setPosts(prev => [...prev, ...data.posts]);
            setPage(p);
            setTotalPages(data.totalPages);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoadingPosts(false);
        }
    }, []);

    // Fetch groups
    const fetchGroups = useCallback(async () => {
        setLoadingGroups(true);
        try {
            const data = await apiCall('/api/community/groups');
            setGroups(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoadingGroups(false);
        }
    }, []);

    // Fetch leaderboard
    const fetchLeaderboard = useCallback(async () => {
        setLoadingLeaderboard(true);
        try {
            const data = await apiCall('/api/community/leaderboard');
            setLeaderboard(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoadingLeaderboard(false);
        }
    }, []);

    useEffect(() => { fetchFeed(1); }, [fetchFeed]);
    useEffect(() => { if (activeTab === 'groups') fetchGroups(); }, [activeTab, fetchGroups]);
    useEffect(() => { if (activeTab === 'leaderboard') fetchLeaderboard(); }, [activeTab, fetchLeaderboard]);

    const handlePost = async (payload) => {
        setPostingLoading(true);
        try {
            const newPost = await apiCall('/api/community/posts', { method: 'POST', body: JSON.stringify(payload) });
            setPosts(prev => [newPost, ...prev]);
            setShowPostForm(false);
        } catch (e) { setError(e.message); }
        finally { setPostingLoading(false); }
    };

    const handleLike = async (postId) => {
        try {
            const { likes } = await apiCall(`/api/community/posts/${postId}/like`, { method: 'POST' });
            setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes } : p));
        } catch (e) { setError(e.message); }
    };

    const handleComment = async (postId, text) => {
        try {
            const comment = await apiCall(`/api/community/posts/${postId}/comment`, { method: 'POST', body: JSON.stringify({ text }) });
            setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...p.comments, comment] } : p));
        } catch (e) { setError(e.message); }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Delete this post?')) return;
        try {
            await apiCall(`/api/community/posts/${postId}`, { method: 'DELETE' });
            setPosts(prev => prev.filter(p => p._id !== postId));
        } catch (e) { setError(e.message); }
    };

    const handleCreateGroup = async (payload) => {
        setPostingLoading(true);
        try {
            const newGroup = await apiCall('/api/community/groups', { method: 'POST', body: JSON.stringify(payload) });
            setGroups(prev => [newGroup, ...prev]);
            setShowGroupForm(false);
        } catch (e) { setError(e.message); }
        finally { setPostingLoading(false); }
    };

    const handleJoin = async (groupId) => {
        try {
            const updated = await apiCall(`/api/community/groups/${groupId}/join`, { method: 'POST' });
            setGroups(prev => prev.map(g => g._id === groupId ? updated : g));
        } catch (e) { setError(e.message); }
    };

    const handleLeave = async (groupId) => {
        if (!window.confirm('Leave this study group?')) return;
        try {
            const updated = await apiCall(`/api/community/groups/${groupId}/leave`, { method: 'POST' });
            setGroups(prev => prev.map(g => g._id === groupId ? updated : g));
        } catch (e) { setError(e.message); }
    };

    const filteredGroups = groups.filter(g => {
        const matchSearch = g.name.toLowerCase().includes(groupSearch.toLowerCase()) || g.description.toLowerCase().includes(groupSearch.toLowerCase());
        const matchDomain = groupDomainFilter === 'all' || g.domainId === groupDomainFilter;
        return matchSearch && matchDomain;
    });

    const myGroups = filteredGroups.filter(g => g.members.some(m => m.uid === currentUid));
    const otherGroups = filteredGroups.filter(g => !g.members.some(m => m.uid === currentUid));

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 md:px-8 py-4 flex items-center gap-4 flex-shrink-0">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">🌐 Community Hub</h1>
                    <p className="text-xs text-gray-400">Share progress, join study groups & see how you compare</p>
                </div>

                {/* Tab bar - desktop inline */}
                <div className="hidden md:flex items-center gap-1 ml-auto bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile tab bar */}
            <div className="md:hidden flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 text-xs font-bold transition-all ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                        {tab.icon}<br />{tab.label}
                    </button>
                ))}
            </div>

            {/* Error banner */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-700 px-4 py-2 text-red-700 dark:text-red-300 text-sm flex items-center justify-between flex-shrink-0">
                    <span>⚠️ {error}</span>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 font-bold ml-4">×</button>
                </div>
            )}

            {/* Content area */}
            <div className="flex-1 overflow-y-auto" ref={contentRef}>
                <div className="max-w-3xl mx-auto px-4 py-6">

                    {/* ── FEED TAB ─────────────────────────────────────── */}
                    {activeTab === 'feed' && (
                        <div>
                            {!showPostForm && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-600 p-4 mb-6 flex items-center gap-3 cursor-pointer hover:border-indigo-500 transition-colors group" onClick={() => setShowPostForm(true)}>
                                    <Avatar email={currentEmail} />
                                    <span className="flex-1 text-sm text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">Share your progress or a tip with the community…</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">+ Post</span>
                                </div>
                            )}

                            {showPostForm && (
                                <SharePostForm
                                    roadmapData={roadmapData}
                                    progress={progress}
                                    onSubmit={handlePost}
                                    onCancel={() => setShowPostForm(false)}
                                    loading={postingLoading}
                                />
                            )}

                            {loadingPosts && posts.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin border-[3px]" />
                                    <p className="text-gray-400 text-sm">Loading community posts…</p>
                                </div>
                            )}

                            {!loadingPosts && posts.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="text-5xl mb-4">📣</div>
                                    <p className="font-bold text-gray-600 dark:text-gray-300">No posts yet!</p>
                                    <p className="text-sm text-gray-400 mt-1">Be the first to share your progress.</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {posts.map(post => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        currentUid={currentUid}
                                        onLike={handleLike}
                                        onComment={handleComment}
                                        onDelete={handleDeletePost}
                                    />
                                ))}
                            </div>

                            {page < totalPages && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => fetchFeed(page + 1)}
                                        disabled={loadingPosts}
                                        className="px-6 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 shadow-sm">
                                        {loadingPosts ? 'Loading…' : 'Load More Posts'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── STUDY GROUPS TAB ─────────────────────────────── */}
                    {activeTab === 'groups' && (
                        <div>
                            {/* Controls */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <input
                                    value={groupSearch}
                                    onChange={e => setGroupSearch(e.target.value)}
                                    placeholder="🔍 Search groups…"
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                                <select value={groupDomainFilter} onChange={e => setGroupDomainFilter(e.target.value)}
                                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="all">All Domains</option>
                                    {domains.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                                </select>
                                <button
                                    onClick={() => setShowGroupForm(prev => !prev)}
                                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors shadow-sm whitespace-nowrap">
                                    {showGroupForm ? '✕ Cancel' : '+ Create Group'}
                                </button>
                            </div>

                            {showGroupForm && (
                                <div className="mb-6">
                                    <CreateGroupForm
                                        domains={domains}
                                        onSubmit={handleCreateGroup}
                                        onCancel={() => setShowGroupForm(false)}
                                        loading={postingLoading}
                                    />
                                </div>
                            )}

                            {loadingGroups && (
                                <div className="flex justify-center py-16">
                                    <div className="w-10 h-10 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}

                            {!loadingGroups && groups.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="text-5xl mb-4">👥</div>
                                    <p className="font-bold text-gray-600 dark:text-gray-300">No study groups yet!</p>
                                    <p className="text-sm text-gray-400 mt-1">Create the first one and start learning together.</p>
                                </div>
                            )}

                            {myGroups.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">My Groups</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {myGroups.map(g => (
                                            <GroupCard key={g._id} group={g} currentUid={currentUid} onJoin={handleJoin} onLeave={handleLeave} onClick={setSelectedGroup} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {otherGroups.length > 0 && (
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Discover Groups</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {otherGroups.map(g => (
                                            <GroupCard key={g._id} group={g} currentUid={currentUid} onJoin={handleJoin} onLeave={handleLeave} onClick={setSelectedGroup} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── LEADERBOARD TAB ──────────────────────────────── */}
                    {activeTab === 'leaderboard' && (
                        <div>
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 mb-6 text-white shadow-xl">
                                <h2 className="text-lg font-extrabold">🏆 Global Leaderboard</h2>
                                <p className="text-indigo-200 text-sm mt-1">Ranked by steps completed across all roadmaps</p>
                            </div>

                            {loadingLeaderboard && (
                                <div className="flex justify-center py-16">
                                    <div className="w-10 h-10 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}

                            {!loadingLeaderboard && leaderboard.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="text-5xl mb-4">🏆</div>
                                    <p className="font-bold text-gray-600 dark:text-gray-300">Leaderboard is empty</p>
                                    <p className="text-sm text-gray-400 mt-1">Share your roadmap progress to appear here!</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {leaderboard.map((entry, i) => {
                                    const isMe = entry._id === currentUid;
                                    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
                                    return (
                                        <div
                                            key={entry._id}
                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isMe
                                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-600 shadow-md'
                                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
                                        >
                                            {/* Rank */}
                                            <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-extrabold text-sm ${i < 3 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                                {medal || `#${i + 1}`}
                                            </div>

                                            <Avatar email={entry.email} />

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-bold text-sm truncate ${isMe ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>
                                                        {entry.email.split('@')[0]}
                                                        {isMe && <span className="ml-1 text-xs font-bold text-indigo-500">(You)</span>}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">{entry.domainTitle}</p>
                                            </div>

                                            <div className="text-right flex-shrink-0">
                                                <p className={`text-lg font-extrabold ${isMe ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-white'}`}>
                                                    {entry.completedSteps ?? 0}
                                                </p>
                                                <p className="text-xs text-gray-400">steps</p>
                                            </div>

                                            <ProgressRing percent={Math.round(entry.progressPercent)} size={44} stroke={4} />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-700 text-center">
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                    💡 Share your roadmap progress in the Feed tab to appear on the leaderboard!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Group detail panel */}
            {selectedGroup && (
                <GroupDetailPanel group={selectedGroup} onClose={() => setSelectedGroup(null)} />
            )}
        </div>
    );
};

export default CommunityHub;
