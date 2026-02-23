import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { auth } from '../config/firebase';

// ─── API base ─────────────────────────────────────────────────────────────────
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
        const e = await res.json().catch(() => ({}));
        throw new Error(e.msg || e.message || `HTTP ${res.status}`);
    }
    return res.json();
}

// ─── Scoring engine ───────────────────────────────────────────────────────────
// Returns a score 0–100 plus a breakdown for displaying to the user.
function computeRankScore(resource, userDifficulty, userFormats, communityData) {
    const qScore = Math.min(10, Math.max(0, resource.qualityScore || 5));
    // AI quality: 0-40
    const aiPts = qScore * 4;

    // Community success rate: 0-30
    const voteInfo = communityData[resource.link];
    let communityPts = 0;
    let successRate = null;
    let totalVotes = 0;
    if (voteInfo && voteInfo.totalVotes > 0) {
        successRate = voteInfo.successRate;
        totalVotes = voteInfo.totalVotes;
        // Bayesian shrinkage: weight toward 0.5 until we have ≥20 votes
        const weight = Math.min(1, totalVotes / 20);
        communityPts = Math.round((successRate * weight + 0.5 * (1 - weight)) * 30);
    } else {
        communityPts = 15; // neutral prior
    }

    // Difficulty match: 0-20
    let difficultyPts = 10; // neutral
    const d = resource.difficulty;
    if (userDifficulty !== 'Any') {
        if (d === userDifficulty) difficultyPts = 20;
        else if ((userDifficulty === 'Intermediate' && d !== 'Advanced') || (userDifficulty === 'Beginner' && d === 'Intermediate')) difficultyPts = 10;
        else difficultyPts = 0;
    }

    // Format preference: 0-10
    let formatPts = 5; // neutral
    if (userFormats.length > 0) {
        const t = (resource.type || '').toLowerCase();
        const match = userFormats.some(f => f.toLowerCase() === t || t.includes(f.toLowerCase()));
        formatPts = match ? 10 : 0;
    }

    const total = Math.round(aiPts + communityPts + difficultyPts + formatPts);
    return {
        total,
        breakdown: { aiPts, communityPts, difficultyPts, formatPts },
        successRate, totalVotes,
        userVote: voteInfo?.userVote || null,
    };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DIFFICULTY_OPTIONS = ['Any', 'Beginner', 'Intermediate', 'Advanced'];
const FORMAT_OPTIONS = [
    { id: 'Video', icon: '📹' },
    { id: 'Article', icon: '📄' },
    { id: 'Documentation', icon: '📚' },
    { id: 'Interactive', icon: '🎮' },
    { id: 'GitHub', icon: '💻' },
    { id: 'Course', icon: '🎓' },
];
const SORT_OPTIONS = ['Best Match', 'Highest Rated', 'Easiest First', 'Hardest First', 'Most Votes'];
const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };
const DIFFICULTY_COLORS = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};
const TYPE_ICONS = {
    video: '📹', article: '📄', documentation: '📚', interactive: '🎮',
    github: '💻', course: '🎓', book: '📖', default: '🔗',
};
const getTypeIcon = (type = '') => TYPE_ICONS[type.toLowerCase()] || '🔗';

// ─── Small reusable UI ────────────────────────────────────────────────────────
const ScoreBar = ({ label, value, max, colorClass, total }) => {
    const pct = Math.round((value / max) * 100);
    return (
        <div className="flex items-center gap-2 text-[11px]">
            <span className="text-gray-400 dark:text-gray-500 w-24 flex-shrink-0">{label}</span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full transition-all duration-700 ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-gray-500 dark:text-gray-400 w-12 text-right">{total ?? `${value}/${max}`}</span>
        </div>
    );
};

const RankBadge = ({ rank }) => {
    const medals = ['🥇', '🥈', '🥉'];
    if (rank <= 3) return <span className="text-lg leading-none">{medals[rank - 1]}</span>;
    return (
        <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-extrabold text-gray-500 dark:text-gray-400">
            #{rank}
        </div>
    );
};

// ─── "Why ranked here?" Tooltip ───────────────────────────────────────────────
const WhyTooltip = ({ breakdown, whyRecommended, score }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <button
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={e => { e.preventDefault(); setShow(s => !s); }}
                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline decoration-dotted cursor-help transition-colors"
            >
                Why #{Math.round(score)}pts?
            </button>
            {show && (
                <div className="absolute bottom-full mb-2 left-0 w-64 bg-gray-900 dark:bg-gray-950 text-white text-xs rounded-xl p-3 shadow-xl z-50 leading-relaxed pointer-events-none">
                    <p className="font-bold mb-2 text-indigo-300">📊 Rank Score Breakdown</p>
                    <div className="space-y-1 mb-2">
                        <div className="flex justify-between"><span className="text-gray-300">🤖 AI Quality</span><span className="font-bold text-emerald-400">{breakdown.aiPts}/40</span></div>
                        <div className="flex justify-between"><span className="text-gray-300">👥 Community</span><span className="font-bold text-blue-400">{breakdown.communityPts}/30</span></div>
                        <div className="flex justify-between"><span className="text-gray-300">🎯 Difficulty fit</span><span className="font-bold text-yellow-400">{breakdown.difficultyPts}/20</span></div>
                        <div className="flex justify-between"><span className="text-gray-300">📋 Format fit</span><span className="font-bold text-pink-400">{breakdown.formatPts}/10</span></div>
                    </div>
                    {whyRecommended && <p className="text-gray-300 border-t border-gray-700 pt-2 italic">&ldquo;{whyRecommended}&rdquo;</p>}
                </div>
            )}
        </div>
    );
};

// ─── Resource Card ────────────────────────────────────────────────────────────
const ResourceCard = ({ resource, rank, scoreData, topicTitle, onVote }) => {
    const { total, breakdown, successRate, totalVotes, userVote } = scoreData;
    const [localVote, setLocalVote] = useState(userVote);
    const [localHelpful, setLocalHelpful] = useState(0);
    const [localNotHelpful, setLocalNotHelpful] = useState(0);
    const [voting, setVoting] = useState(false);

    useEffect(() => {
        setLocalVote(userVote);
    }, [userVote]);

    const handleVote = async (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        if (voting) return;
        setVoting(true);
        try {
            const result = await onVote(resource.link, resource.title, direction);
            setLocalVote(result.userVote);
            setLocalHelpful(result.helpful);
            setLocalNotHelpful(result.notHelpful);
        } catch (_) { /* ignore */ }
        finally { setVoting(false); }
    };

    const displayHelpful = localHelpful || (successRate !== null ? Math.round(successRate * (totalVotes || 0)) : 0);
    const displayTotal = localHelpful + localNotHelpful || totalVotes || 0;
    const displayRate = displayTotal > 0 ? displayHelpful / displayTotal : null;

    return (
        <article className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 overflow-hidden group hover:shadow-lg
            ${rank <= 3 ? 'border-yellow-200 dark:border-yellow-700/50 shadow-sm' : 'border-gray-100 dark:border-gray-700'}`}>

            {/* Rank ribbon for top 3 */}
            {rank <= 3 && (
                <div className={`h-1 w-full ${rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : rank === 2 ? 'bg-gradient-to-r from-gray-300 to-slate-400' : 'bg-gradient-to-r from-orange-400 to-amber-600'}`} />
            )}

            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block p-4">
                <div className="flex items-start gap-3">
                    {/* Rank badge */}
                    <div className="flex-shrink-0 mt-0.5">
                        <RankBadge rank={rank} />
                    </div>

                    {/* Type icon */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700/60 flex items-center justify-center text-xl border border-gray-100 dark:border-gray-600">
                        {getTypeIcon(resource.type)}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                            <p className="font-bold text-sm text-blue-600 dark:text-blue-400 group-hover:underline leading-tight">{resource.title}</p>
                        </div>

                        {/* Badges row */}
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                            {resource.difficulty && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[resource.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                                    {resource.difficulty}
                                </span>
                            )}
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {resource.type}
                            </span>
                            {/* YouTube popularity badge */}
                            {resource.type === 'Video' && resource.source?.toLowerCase().includes('youtube') && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 flex items-center gap-0.5">
                                    ▶ YouTube
                                </span>
                            )}
                            {/* Popular indicator from description */}
                            {resource.type === 'Video' && /\d[Mm]/.test(resource.description || '') && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300">
                                    🔥 Popular
                                </span>
                            )}
                            {resource.estimatedTime && (
                                <span className="text-[10px] text-gray-400">⏱ {resource.estimatedTime}</span>
                            )}
                            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{resource.source}</span>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{resource.description}</p>

                        {/* Score bars */}
                        <div className="space-y-1.5 mb-2">
                            <ScoreBar
                                label="🤖 AI Quality"
                                value={resource.qualityScore || 5}
                                max={10}
                                colorClass="bg-gradient-to-r from-indigo-400 to-purple-500"
                                total={`${resource.qualityScore || '?'}/10`}
                            />
                            <ScoreBar
                                label="👥 Community"
                                value={displayRate !== null ? Math.round(displayRate * 100) : 50}
                                max={100}
                                colorClass={displayRate === null ? 'bg-gray-300 dark:bg-gray-600' : displayRate >= 0.7 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : displayRate >= 0.4 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}
                                total={displayRate !== null ? `${Math.round(displayRate * 100)}% (${displayTotal})` : 'No votes yet'}
                            />
                        </div>

                        {/* Why ranked tooltip */}
                        <WhyTooltip breakdown={breakdown} whyRecommended={resource.whyRecommended} score={total} />
                    </div>
                </div>
            </a>

            {/* Vote bar */}
            <div className="px-4 py-2.5 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                    <button
                        onClick={e => handleVote(e, 'up')}
                        disabled={voting}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${localVote === 'up'
                            ? 'bg-green-500 text-white shadow-sm scale-105'
                            : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 border border-gray-200 dark:border-gray-600'}`}
                        title="Mark as helpful"
                    >
                        👍 Helpful
                    </button>
                    <button
                        onClick={e => handleVote(e, 'down')}
                        disabled={voting}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${localVote === 'down'
                            ? 'bg-red-500 text-white shadow-sm scale-105'
                            : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 border border-gray-200 dark:border-gray-600'}`}
                        title="Mark as not helpful"
                    >
                        👎 Not Helpful
                    </button>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-lg">
                    ⚡ Score: {total}/100
                </div>
            </div>
        </article>
    );
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 animate-pulse">
        <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="flex gap-1.5">
                    <div className="h-3.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="h-3.5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="space-y-1.5 mt-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
            </div>
        </div>
    </div>
);

// ─── Preference Panel ─────────────────────────────────────────────────────────
const PreferencePanel = ({ difficulty, setDifficulty, formats, toggleFormat, onFetch, loading }) => (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-700 p-5 mb-5">
        <h4 className="font-bold text-sm text-gray-800 dark:text-white mb-3">🎯 Personalize Results</h4>

        {/* Difficulty */}
        <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Difficulty Level</p>
            <div className="flex flex-wrap gap-2">
                {DIFFICULTY_OPTIONS.map(d => (
                    <button key={d} onClick={() => setDifficulty(d)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${difficulty === d
                            ? 'bg-indigo-600 text-white shadow-sm scale-105'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'}`}>
                        {d === 'Beginner' ? '🌱' : d === 'Intermediate' ? '🌿' : d === 'Advanced' ? '🌳' : '✨'} {d}
                    </button>
                ))}
            </div>
        </div>

        {/* Format */}
        <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Preferred Formats <span className="normal-case font-normal">(optional, multi-select)</span></p>
            <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map(f => {
                    const active = formats.includes(f.id);
                    return (
                        <button key={f.id} onClick={() => toggleFormat(f.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${active
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'}`}>
                            {f.icon} {f.id}
                            {active && <span className="ml-0.5 text-[9px]">✓</span>}
                        </button>
                    );
                })}
            </div>
        </div>

        <button onClick={onFetch} disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-100 flex items-center justify-center gap-2">
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Finding best resources…
                </>
            ) : '🔍 Find & Rank Resources'}
        </button>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AIResourceRecommender = ({ topicTitle, onClose }) => {
    const [phase, setPhase] = useState('prefs'); // 'prefs' | 'loading' | 'results' | 'error'
    const [resources, setResources] = useState([]);
    const [communityData, setCommunityData] = useState({}); // url → {helpful, notHelpful, successRate, totalVotes, userVote}
    const [difficulty, setDifficulty] = useState('Any');
    const [formats, setFormats] = useState([]);
    const [sortBy, setSortBy] = useState('Best Match');
    const [errorMsg, setErrorMsg] = useState('');
    const hasFetched = useRef(false);

    const toggleFormat = (f) => setFormats(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

    // Load community votes
    const loadVotes = useCallback(async () => {
        try {
            const votes = await apiCall(`/api/resources/votes?topic=${encodeURIComponent(topicTitle)}`);
            const map = {};
            votes.forEach(v => { map[v.resourceUrl] = v; });
            setCommunityData(map);
        } catch (_) { /* non-fatal */ }
    }, [topicTitle]);

    // Fetch ranked resources from Gemini via backend
    const fetchResources = useCallback(async (forceRefresh = false) => {
        setPhase('loading');
        setErrorMsg('');

        // Try cache first (keyed by topic + difficulty + formats + version)
        const cacheKey = `smart_resources_v3_${topicTitle}_${difficulty}_${formats.join(',')}`;

        if (!forceRefresh) {
            try {
                const cached = sessionStorage.getItem(cacheKey);
                if (cached) {
                    setResources(JSON.parse(cached));
                    hasFetched.current = true;
                    await loadVotes();
                    setPhase('results');
                    return;
                }
            } catch (_) { /* ignore */ }
        }

        try {
            const data = await apiCall('/api/gemini/smart-resources', {
                method: 'POST',
                body: JSON.stringify({ topicTitle, difficulty, formats }),
            });

            if (!Array.isArray(data) || data.length === 0) throw new Error('No resources returned');

            setResources(data);
            hasFetched.current = true;
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
            await loadVotes();
            setPhase('results');
        } catch (err) {
            setErrorMsg(err.message || 'Failed to fetch resources');
            setPhase('error');
        }
    }, [topicTitle, difficulty, formats, loadVotes]);

    // Compute scored + sorted list
    const rankedResources = useMemo(() => {
        if (!resources.length) return [];

        const scored = resources.map(r => ({
            ...r,
            _scoreData: computeRankScore(r, difficulty, formats, communityData),
        }));

        return [...scored].sort((a, b) => {
            switch (sortBy) {
                case 'Highest Rated': return (b._scoreData.successRate ?? -1) - (a._scoreData.successRate ?? -1);
                case 'Easiest First': return (DIFFICULTY_ORDER[a.difficulty] ?? 1) - (DIFFICULTY_ORDER[b.difficulty] ?? 1);
                case 'Hardest First': return (DIFFICULTY_ORDER[b.difficulty] ?? 1) - (DIFFICULTY_ORDER[a.difficulty] ?? 1);
                case 'Most Votes': return (b._scoreData.totalVotes ?? 0) - (a._scoreData.totalVotes ?? 0);
                default: return b._scoreData.total - a._scoreData.total; // Best Match
            }
        });
    }, [resources, communityData, difficulty, formats, sortBy]);

    // Handle voting
    const handleVote = useCallback(async (resourceUrl, resourceTitle, vote) => {
        const result = await apiCall('/api/resources/vote', {
            method: 'POST',
            body: JSON.stringify({ topic: topicTitle, resourceUrl, resourceTitle, vote }),
        });
        setCommunityData(prev => ({ ...prev, [resourceUrl]: result }));
        return result;
    }, [topicTitle]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                            ⚡ Smart Resource Ranking
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Ranked by AI quality · community success rate · your preferences
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Topic: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{topicTitle}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 -mt-1 -mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 text-xl leading-none transition-colors">&times;</button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">

                    {/* ── Phase: preferences ─── */}
                    {(phase === 'prefs' || phase === 'error') && (
                        <>
                            <PreferencePanel
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                                formats={formats}
                                toggleFormat={toggleFormat}
                                onFetch={fetchResources}
                                loading={phase === 'loading'}
                            />
                            {phase === 'error' && (
                                <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 text-center">
                                    <p className="font-bold text-red-600 dark:text-red-400 text-sm">❌ {errorMsg}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Check your API key or network connection and try again.</p>
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Phase: loading ─── */}
                    {phase === 'loading' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-700 mb-2">
                                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                                <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                                    AI is fetching, rating, and ranking the best resources for you…
                                </p>
                            </div>
                            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {/* ── Phase: results ─── */}
                    {phase === 'results' && (
                        <>
                            {/* Sort controls */}
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Sort:</span>
                                {SORT_OPTIONS.map(s => (
                                    <button key={s} onClick={() => setSortBy(s)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${sortBy === s
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600'}`}>
                                        {s}
                                    </button>
                                ))}

                                <button
                                    onClick={() => fetchResources(true)}
                                    className="ml-auto mr-3 text-xs text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 font-semibold underline decoration-dotted transition-colors">
                                    ✨ Refresh Resources
                                </button>
                                <button
                                    onClick={() => { setPhase('prefs'); setResources([]); }}
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 font-semibold underline decoration-dotted transition-colors">
                                    ↺ Change Preferences
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 mb-4 text-[10px] text-gray-400 flex-wrap gap-y-1">
                                <span><strong className="text-indigo-600 dark:text-indigo-400">⚡ Score</strong> = AI quality (40) + community (30) + difficulty fit (20) + format fit (10)</span>
                            </div>

                            {/* Cards */}
                            <div className="space-y-3">
                                {rankedResources.map((r, i) => (
                                    <ResourceCard
                                        key={r.link}
                                        resource={r}
                                        rank={i + 1}
                                        scoreData={r._scoreData}
                                        topicTitle={topicTitle}
                                        onVote={handleVote}
                                    />
                                ))}
                            </div>

                            <p className="text-center text-xs text-gray-400 mt-5">
                                Rankings update as more learners vote · Your votes persist across sessions
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIResourceRecommender;
