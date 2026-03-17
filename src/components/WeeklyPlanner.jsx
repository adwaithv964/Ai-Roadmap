import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { auth } from '../config/firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─────────────────────────────────────────────────────────
// Constants & helpers
// ─────────────────────────────────────────────────────────

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const STUDY_PRESETS = [
    { label: '30 min', minutes: 30, stepsPerDay: 1 },
    { label: '1 hr', minutes: 60, stepsPerDay: 2 },
    { label: '2 hrs', minutes: 120, stepsPerDay: 4 },
    { label: '3+ hrs', minutes: 180, stepsPerDay: 6 },
];

const DAY_TYPE_LABELS = {
    theory: { label: '📖 Theory', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300 dark:border-blue-700', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    practice: { label: '🔨 Practice', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-300 dark:border-orange-700', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' },
    project: { label: '🚀 Mini-Project', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-300 dark:border-purple-700', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
    review: { label: '🔁 Review Day', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-300 dark:border-green-700', badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
};

function todayISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
function addDays(dateStr, n) {
    const [y, mo, d] = dateStr.split('-').map(Number);
    const date = new Date(y, mo - 1, d + n);
    const yr = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${yr}-${month}-${day}`;
}
function formatDate(dateStr) {
    const [y, mo, d] = dateStr.split('-').map(Number);
    const date = new Date(y, mo - 1, d);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}
function isToday(dateStr) { return dateStr === todayISO(); }
function isPast(dateStr) { return dateStr < todayISO(); }

// ─────────────────────────────────────────────────────────
// Plan generation (pure client-side)
// ─────────────────────────────────────────────────────────

function generatePlan({ roadmapData, progress, startDate, activeDays, stepsPerDay }) {
    // 1. Collect all incomplete steps in order
    const pendingSteps = [];
    roadmapData.stages.forEach(stage => {
        stage.modules.forEach(module => {
            module.steps.forEach(step => {
                if (!progress[step.id]?.completed) {
                    pendingSteps.push({
                        stepId: step.id,
                        title: step.title,
                        moduleTitle: module.title,
                        stageTitle: stage.title,
                        stageProject: stage.project || null,
                        estimatedMin: 20,
                    });
                }
            });
        });
    });

    if (pendingSteps.length === 0) return [];

    // 2. Walk calendar, assign steps to active days
    const days = [];
    let stepIdx = 0;
    let cursor = startDate;
    let dayCount = 0;     // sequential active-day index (for mini-project/review spacing)
    let weekBucket = [];  // steps covered this "week" for review day

    while (stepIdx < pendingSteps.length) {
        const dow = new Date(cursor + 'T00:00:00').getDay();
        if (!activeDays.includes(dow)) {
            cursor = addDays(cursor, 1);
            continue;
        }

        dayCount++;
        const isReviewDay = dayCount % 7 === 0;
        const isMiniProject = !isReviewDay && dayCount % 3 === 0;

        if (isReviewDay) {
            // Review day: no new steps, recap recent topics
            days.push({
                date: cursor,
                dayNumber: dayCount,
                type: 'review',
                steps: [],
                reviewTopics: weekBucket.slice(-6).map(s => s.title),
                miniTask: null,
            });
            weekBucket = [];
            cursor = addDays(cursor, 1);
            continue;
        }

        // Assign steps to this day
        const daySteps = pendingSteps.slice(stepIdx, stepIdx + stepsPerDay);
        stepIdx += stepsPerDay;
        weekBucket.push(...daySteps);

        // Mini-task text
        let miniTask = null;
        if (isMiniProject) {
            const stageProject = daySteps[0]?.stageProject;
            const module = daySteps[0]?.moduleTitle || '';
            miniTask = stageProject
                ? stageProject
                : `Practice task: Build a small project applying everything you've learned in "${module}".`;
        }

        days.push({
            date: cursor,
            dayNumber: dayCount,
            type: isMiniProject ? 'project' : dayCount % 2 === 0 ? 'practice' : 'theory',
            steps: daySteps,
            miniTask,
            reviewTopics: null,
        });

        cursor = addDays(cursor, 1);
    }

    return days;
}

// Group days into weeks
function groupByWeek(days) {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }
    return weeks;
}

// ─────────────────────────────────────────────────────────
// Gemini enhancement: per-day mini tasks
// ─────────────────────────────────────────────────────────
async function fetchAIMiniTasks(plan, roadmapTitle, token) {
    if (!plan.length) return null;

    const enhanceDays = plan
        .filter(d => d.type === 'project' || d.type === 'practice')
        .slice(0, 12)
        .map(d => ({ date: d.date, steps: d.steps }));

    if (!enhanceDays.length) return null;

    try {
        const res = await fetch(`${API_BASE}/api/gemini/mini-tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ roadmapTitle, days: enhanceDays }),
        });
        if (!res.ok) return null;
        return await res.json();
    } catch { return null; }
}

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────

const DayCard = ({ day, completedDays, onCheckDay, onAskTutor }) => {
    const isChecked = completedDays.includes(day.date);
    const past = isPast(day.date);
    const today = isToday(day.date);
    const meta = DAY_TYPE_LABELS[day.type] || DAY_TYPE_LABELS.theory;

    return (
        <div className={`rounded-xl border-2 p-4 transition-all duration-300 ${isChecked ? 'opacity-60 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40' : `${meta.bg} ${meta.border}`} ${today ? 'ring-2 ring-blue-400 dark:ring-blue-500 ring-offset-1' : ''}`}>
            {/* Day header */}
            <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>{meta.label}</span>
                        {today && <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">TODAY</span>}
                        {past && !today && !isChecked && <span className="text-[10px] text-gray-400">past</span>}
                    </div>
                    <p className="text-sm font-bold mt-1 dark:text-white">{formatDate(day.date)}</p>
                    {day.steps[0] && (
                        <p className="text-[10px] text-gray-400 mt-0.5">{day.steps[0].stageTitle}</p>
                    )}
                </div>
                <button
                    onClick={() => onCheckDay(day)}
                    title={isChecked ? 'Mark incomplete' : 'Mark day complete'}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                >
                    {isChecked ? '✓' : ''}
                </button>
            </div>

            {/* Review day */}
            {day.type === 'review' && (
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Review these topics:</p>
                    {(day.reviewTopics || []).map((t, i) => (
                        <p key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                            <span className="text-green-500">↩</span> {t}
                        </p>
                    ))}
                </div>
            )}

            {/* Steps */}
            {day.steps.length > 0 && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                    {day.steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-2 py-1 px-2 rounded-lg ${isChecked ? '' : 'hover:bg-black/5 dark:hover:bg-white/5'} transition-colors`}>
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-500">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold truncate dark:text-white ${isChecked ? 'line-through text-gray-400' : ''}`}>{step.title}</p>
                                <p className="text-[10px] text-gray-400 truncate">{step.moduleTitle}</p>
                            </div>
                            <span className="flex-shrink-0 text-[10px] text-gray-400 whitespace-nowrap">~{step.estimatedMin}m</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Mini task */}
            {day.miniTask && !isChecked && (
                <div className="mt-3 pt-2.5 border-t border-current/10">
                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">🔨 Today's Build Challenge</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{day.miniTask}</p>
                </div>
            )}

            {/* Ask tutor */}
            {!isChecked && day.steps.length > 0 && onAskTutor && (
                <button
                    onClick={() => onAskTutor(`Today I'm studying: ${day.steps.map(s => s.title).join(', ')}. Give me a 3-step action plan and one hands-on exercise for these topics.`)}
                    className="mt-3 w-full text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                    💬 Get AI coaching for today →
                </button>
            )}
        </div>
    );
};

// Week progress summary
const WeekSummary = ({ days, completedDays }) => {
    const activeDaysList = days.filter(d => d.steps.length > 0); // review days have no steps
    const total = activeDaysList.length;
    const done = activeDaysList.filter(d => completedDays.includes(d.date)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
                {days.map((d, i) => (
                    <div key={i} title={formatDate(d.date)}
                        className={`w-3 h-3 rounded-sm ${completedDays.includes(d.date) ? 'bg-green-500' : isToday(d.date) ? 'bg-blue-400' : isPast(d.date) ? 'bg-red-300 dark:bg-red-700' : 'bg-gray-200 dark:bg-gray-700'}`}
                    />
                ))}
            </div>
            <span className="text-xs font-bold text-gray-500">{done}/{total} days done</span>
            {pct === 100 && <span className="text-xs font-bold text-green-600 dark:text-green-400">🎉 Week complete!</span>}
        </div>
    );
};

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────

const WeeklyPlanner = ({ roadmapData, progress, onClose, onToggleStep, onAskTutor }) => {
    const domainId = roadmapData?.title?.toLowerCase().replace(/\s+/g, '_') || 'domain';
    const storageKey = `weeklyPlan_${domainId}`;
    const completedKey = `weeklyPlanCompleted_${domainId}`;

    // ── Config state
    const [startDate, setStartDate] = useState(todayISO());
    const [presetIdx, setPresetIdx] = useState(1); // default 1hr
    const [activeDays, setActiveDays] = useState([1, 2, 3, 4, 5]); // Mon-Fri

    // ── Plan state
    const [plan, setPlan] = useState(null); // array of day objects
    const [completedDays, setCompletedDays] = useState(() => {
        try { return JSON.parse(localStorage.getItem(completedKey) || '[]'); } catch { return []; }
    });
    const [phase, setPhase] = useState('configure'); // 'configure' | 'plan'
    const [aiEnhancing, setAiEnhancing] = useState(false);
    const [expandedWeeks, setExpandedWeeks] = useState({ 0: true });

    // Load saved plan on mount
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey));
            if (saved && saved.length > 0) {
                setPlan(saved);
                setPhase('plan');
                setExpandedWeeks({ 0: true });
            }
        } catch { /* ignore */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const preset = STUDY_PRESETS[presetIdx];

    // ── Stats
    const totalSteps = roadmapData ? roadmapData.stages.reduce((sum, s) => sum + s.modules.reduce((sm, m) => sm + m.steps.length, 0), 0) : 0;
    const completedCount = Object.values(progress).filter(p => p.completed).length;
    const remainingSteps = totalSteps - completedCount;

    // Estimated weeks
    const estDays = useMemo(() => {
        if (!preset.stepsPerDay) return '—';
        const activePerWeek = activeDays.length;
        if (!activePerWeek) return '—';
        const days = Math.ceil(remainingSteps / preset.stepsPerDay);
        const weeks = Math.ceil(days / activePerWeek);
        return `~${weeks} week${weeks !== 1 ? 's' : ''}`;
    }, [remainingSteps, preset.stepsPerDay, activeDays]);

    // ── Toggle active day
    const toggleDay = (dow) => {
        setActiveDays(prev =>
            prev.includes(dow) ? prev.filter(d => d !== dow) : [...prev, dow].sort((a, b) => a - b)
        );
    };

    // ── Generate plan
    const handleGenerate = useCallback(async () => {
        if (activeDays.length === 0) return;
        const newPlan = generatePlan({
            roadmapData, progress, startDate,
            activeDays, stepsPerDay: preset.stepsPerDay,
        });

        setPlan(newPlan);
        setPhase('plan');
        setExpandedWeeks({ 0: true });

        // Persist base plan
        try { localStorage.setItem(storageKey, JSON.stringify(newPlan)); } catch { /* ignore */ }

        // AI enhance mini tasks
        setAiEnhancing(true);
        try {
            const token = await auth.currentUser?.getIdToken();
            const aiTasks = await fetchAIMiniTasks(newPlan, roadmapData.title, token);
            if (aiTasks && aiTasks.length > 0) {
                const map = {};
                aiTasks.forEach(t => { map[t.date] = t.miniTask; });
                const enhanced = newPlan.map(d => map[d.date] ? { ...d, miniTask: map[d.date] } : d);
                setPlan(enhanced);
                try { localStorage.setItem(storageKey, JSON.stringify(enhanced)); } catch { /* ignore */ }
            }
        } catch { /* ignore */ }
        setAiEnhancing(false);
    }, [roadmapData, progress, startDate, activeDays, preset, storageKey]);

    // ── Check off a day
    const handleCheckDay = useCallback((day) => {
        const date = day.date;
        const alreadyDone = completedDays.includes(date);

        let newCompleted;
        if (alreadyDone) {
            newCompleted = completedDays.filter(d => d !== date);
        } else {
            newCompleted = [...completedDays, date];
            // Mark all day's steps as complete in roadmap
            if (onToggleStep && day.steps.length > 0) {
                day.steps.forEach(step => {
                    if (!progress[step.stepId]?.completed) {
                        onToggleStep(step.stepId);
                    }
                });
            }
        }

        setCompletedDays(newCompleted);
        try { localStorage.setItem(completedKey, JSON.stringify(newCompleted)); } catch { /* ignore */ }
    }, [completedDays, completedKey, onToggleStep, progress]);

    const weeks = plan ? groupByWeek(plan) : [];

    // ── Total plan stats
    const planStats = useMemo(() => {
        if (!plan) return null;
        const activeDaysList = plan.filter(d => d.steps.length > 0);
        const done = activeDaysList.filter(d => completedDays.includes(d.date)).length;
        const total = activeDaysList.length;
        return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0, weeks: weeks.length };
    }, [plan, completedDays, weeks.length]);

    // ─────────────────────────────────────────────────────
    // Render: Configure phase
    // ─────────────────────────────────────────────────────
    const renderConfigure = () => (
        <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="text-center">
                <div className="text-5xl mb-2">📅</div>
                <h3 className="text-xl font-bold dark:text-white">Build Your Study Schedule</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {remainingSteps > 0 ? `${remainingSteps} steps remaining — let's map them into daily sessions.` : 'All steps complete! Regenerate to refresh your plan.'}
                </p>
            </div>

            {/* Start date */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">📆 Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    min={todayISO()}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>

            {/* Study time */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">⏱ Daily Study Time</label>
                <div className="grid grid-cols-4 gap-2">
                    {STUDY_PRESETS.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setPresetIdx(i)}
                            className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${i === presetIdx ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 dark:text-white'}`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                <p className="mt-2 text-xs text-gray-400 text-center">
                    ≈ {preset.stepsPerDay} step{preset.stepsPerDay !== 1 ? 's' : ''}/day · estimated finish: <strong>{estDays}</strong>
                </p>
            </div>

            {/* Active days */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">📅 Study Days</label>
                <div className="flex gap-2 flex-wrap">
                    {DAY_NAMES.map((name, dow) => (
                        <button
                            key={dow}
                            onClick={() => toggleDay(dow)}
                            className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${activeDays.includes(dow) ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-300'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">{activeDays.length} day{activeDays.length !== 1 ? 's' : ''}/week selected</p>
            </div>

            <button
                onClick={handleGenerate}
                disabled={activeDays.length === 0}
                className="w-full py-3.5 rounded-xl font-bold text-white text-base bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100"
            >
                ✨ Generate My Weekly Plan
            </button>
        </div>
    );

    // ─────────────────────────────────────────────────────
    // Render: Plan phase
    // ─────────────────────────────────────────────────────
    const renderPlan = () => (
        <div className="flex flex-col gap-4">
            {/* Plan header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 className="font-bold text-base dark:text-white flex items-center gap-2">
                        📅 Your Study Plan
                        {aiEnhancing && (
                            <span className="flex items-center gap-1 text-xs font-normal text-blue-500">
                                <span className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                AI enhancing...
                            </span>
                        )}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {roadmapData.title} · {planStats?.weeks} weeks · {planStats?.total} active days
                    </p>
                </div>
                <button
                    onClick={() => setPhase('configure')}
                    className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-800 border border-purple-200 dark:border-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                    ⚙ Reconfigure
                </button>
            </div>

            {/* Overall plan progress */}
            {planStats && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Plan Progress</span>
                        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{planStats.done}/{planStats.total} days · {planStats.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                            style={{ width: `${planStats.pct}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(DAY_TYPE_LABELS).map(([type, meta]) => (
                    <span key={type} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>{meta.label}</span>
                ))}
            </div>

            {/* Weeks */}
            <div className="flex flex-col gap-4">
                {weeks.map((weekDays, wi) => (
                    <div key={wi} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                        {/* Week header */}
                        <button
                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setExpandedWeeks(prev => ({ ...prev, [wi]: !prev[wi] }))}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-sm dark:text-white">Week {wi + 1}</span>
                                <WeekSummary days={weekDays} completedDays={completedDays} />
                            </div>
                            <span className="text-gray-400 text-sm">{expandedWeeks[wi] ? '▲' : '▼'}</span>
                        </button>

                        {/* Week days grid */}
                        {expandedWeeks[wi] && (
                            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white dark:bg-gray-900">
                                {weekDays.map((day, di) => (
                                    <DayCard
                                        key={di}
                                        day={day}
                                        completedDays={completedDays}
                                        onCheckDay={handleCheckDay}
                                        onAskTutor={onAskTutor}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // ─────────────────────────────────────────────────────
    // Root render
    // ─────────────────────────────────────────────────────
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[92vh] overflow-hidden">

                {/* Modal header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
                                📅 AI Weekly Planner
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {roadmapData.title} · Turn your roadmap into daily actions
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mt-1 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >×</button>
                    </div>

                    {/* Phase tabs */}
                    <div className="flex gap-1 mt-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
                        {[['configure', '⚙ Configure'], ['plan', '📋 My Plan']].map(([p, label]) => (
                            <button
                                key={p}
                                onClick={() => { if (p === 'plan' && !plan) return; setPhase(p); }}
                                disabled={p === 'plan' && !plan}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${phase === p ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modal body */}
                <div className="px-6 py-5 overflow-y-auto flex-1">
                    {phase === 'configure' ? renderConfigure() : renderPlan()}
                </div>
            </div>
        </div>
    );
};

export default WeeklyPlanner;
