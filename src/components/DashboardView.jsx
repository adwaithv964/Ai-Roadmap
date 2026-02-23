import React, { useState, useCallback } from 'react';
import ActivityHeatmap from './ActivityHeatmap';
import { useProgressIntelligence, dismissAlert } from '../hooks/useProgressIntelligence';

// ─────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────

const StatCard = ({ title, value, sub, color, icon }) => (
    <div className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow border-l-4 ${color}`}>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">{title}</p>
                <p className="text-3xl font-extrabold dark:text-white mt-2">{value}</p>
                {sub && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub}</p>}
            </div>
            <span className="text-3xl opacity-80">{icon}</span>
        </div>
    </div>
);

const AlertCard = ({ alert, onDismiss }) => {
    const styles = {
        danger: { border: 'border-red-400 dark:border-red-600', bg: 'bg-red-50 dark:bg-red-900/20', bar: 'bg-red-400', text: 'text-red-800 dark:text-red-300', sub: 'text-red-700 dark:text-red-400' },
        warning: { border: 'border-yellow-400 dark:border-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', bar: 'bg-yellow-400', text: 'text-yellow-800 dark:text-yellow-300', sub: 'text-yellow-700 dark:text-yellow-400' },
        success: { border: 'border-green-400 dark:border-green-600', bg: 'bg-green-50 dark:bg-green-900/20', bar: 'bg-green-400', text: 'text-green-800 dark:text-green-300', sub: 'text-green-700 dark:text-green-400' },
        info: { border: 'border-blue-400 dark:border-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', bar: 'bg-blue-400', text: 'text-blue-800 dark:text-blue-300', sub: 'text-blue-700 dark:text-blue-400' },
    };
    const s = styles[alert.type] || styles.info;

    return (
        <div className={`relative rounded-xl border ${s.border} ${s.bg} p-4 flex gap-3 overflow-hidden transition-all duration-300 group`}>
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar} rounded-l-xl`} />
            <span className="text-2xl flex-shrink-0 pl-1">{alert.icon}</span>
            <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${s.text}`}>{alert.title}</p>
                <p className={`text-xs mt-0.5 leading-relaxed ${s.sub}`}>{alert.message}</p>
                {alert.strategy && (
                    <div className="mt-2 pt-2 border-t border-current/20">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-0.5">💡 Optimization Strategy</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{alert.strategy}</p>
                    </div>
                )}
            </div>
            <button
                onClick={() => onDismiss(alert.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none self-start mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Dismiss"
            >
                ×
            </button>
        </div>
    );
};

// Sparkline / Mini bar chart
const SpeedChart = ({ speedByWeek }) => {
    if (!speedByWeek.length) return null;
    const max = Math.max(...speedByWeek.map(w => w.steps), 1);
    return (
        <div className="flex items-end gap-1.5 h-16">
            {speedByWeek.map((w, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-1">
                    <div
                        className={`rounded-t-md transition-all duration-500 w-full ${i === speedByWeek.length - 1 ? 'bg-blue-500' : 'bg-blue-300 dark:bg-blue-700'}`}
                        style={{ height: `${Math.max(4, (w.steps / max) * 52)}px` }}
                        title={`${w.steps} steps`}
                    />
                    <span className="text-[9px] text-gray-400 truncate w-full text-center">{w.label}</span>
                </div>
            ))}
        </div>
    );
};

// Stage progress bar
const StageBar = ({ stage }) => (
    <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 dark:text-gray-400 w-36 truncate flex-shrink-0">{stage.title}</span>
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
                className={`h-2 rounded-full transition-all duration-700 ${stage.pct === 100 ? 'bg-green-500' : stage.pct > 0 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                style={{ width: `${stage.pct}%` }}
            />
        </div>
        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-10 text-right">{stage.pct}%</span>
    </div>
);

// Consistency ring
const ConsistencyRing = ({ score }) => {
    const r = 28;
    const circ = 2 * Math.PI * r;
    const fill = (score / 100) * circ;
    const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
    return (
        <div className="relative flex items-center justify-center w-20 h-20">
            <svg width="80" height="80" className="-rotate-90">
                <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-gray-100 dark:text-gray-700" />
                <circle
                    cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7"
                    strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s ease' }}
                />
            </svg>
            <span className="absolute text-sm font-extrabold" style={{ color }}>{score}%</span>
        </div>
    );
};

// ─────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────

const DashboardView = ({ roadmapData, progress, onBackToRoadmap }) => {
    const [targetDate, setTargetDate] = useState(() => {
        try { return localStorage.getItem('learningTargetDate') || ''; } catch { return ''; }
    });
    const [dismissedIds, setDismissedIds] = useState([]);

    const intel = useProgressIntelligence(progress, roadmapData, targetDate);

    const handleSetTargetDate = (val) => {
        setTargetDate(val);
        try { localStorage.setItem('learningTargetDate', val); } catch { /* ignore */ }
    };

    const handleDismiss = useCallback((id) => {
        dismissAlert(id);
        setDismissedIds(prev => [...prev, id]);
    }, []);

    const visibleAlerts = intel.alerts.filter(a => !dismissedIds.includes(a.id));

    const activityData = (() => {
        const data = {};
        Object.values(progress).forEach(p => {
            if (p.completed && p.completedDate) {
                data[p.completedDate] = (data[p.completedDate] || 0) + 1;
            }
        });
        return data;
    })();

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const speedLabel = () => {
        if (intel.speedLast7 === 0) return '0 steps/day';
        if (intel.speedLast7 < 1) return `${intel.speedLast7} steps/day`;
        return `${intel.speedLast7} steps/day`;
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">

            {/* Back Button */}
            <button
                onClick={onBackToRoadmap}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Roadmap
            </button>

            {/* ── ALERTS ─────────────────────────────────────────────────── */}
            {visibleAlerts.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                        <span>⚡ Live Intelligence Alerts</span>
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{visibleAlerts.length}</span>
                    </h2>
                    <div className="flex flex-col gap-3">
                        {visibleAlerts.map(alert => (
                            <AlertCard key={alert.id} alert={alert} onDismiss={handleDismiss} />
                        ))}
                    </div>
                </section>
            )}

            {/* No alerts / complete state */}
            {visibleAlerts.length === 0 && intel.completedCount > 0 && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
                    <span className="text-2xl">✅</span>
                    <p className="text-green-800 dark:text-green-300 font-semibold text-sm">All clear! No alerts right now. Keep up the great work.</p>
                </div>
            )}

            {/* ── STAT CARDS ─────────────────────────────────────────────── */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Progress"
                    value={`${intel.progressPct}%`}
                    sub={`${intel.completedCount} / ${intel.totalSteps} steps`}
                    color="border-blue-500"
                    icon="📚"
                />
                <StatCard
                    title="Current Streak"
                    value={intel.currentStreak > 0 ? `🔥 ${intel.currentStreak}d` : '0 days'}
                    sub={`Best: ${intel.longestStreak} days`}
                    color="border-orange-500"
                    icon="⚡"
                />
                <StatCard
                    title="Learning Speed"
                    value={speedLabel()}
                    sub="7-day rolling average"
                    color="border-purple-500"
                    icon="🚀"
                />
                <StatCard
                    title="Last Active"
                    value={intel.daysSinceActivity === 0 ? 'Today' : intel.daysSinceActivity === 1 ? 'Yesterday' : `${intel.daysSinceActivity}d ago`}
                    sub={intel.lastActiveDate ? formatDate(intel.lastActiveDate) : 'No activity yet'}
                    color={intel.daysSinceActivity >= 3 ? 'border-red-500' : 'border-green-500'}
                    icon="📅"
                />
            </section>

            {/* ── SPEED CHART + CONSISTENCY ──────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Speed over time */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                    <h3 className="font-bold text-sm mb-1 dark:text-white">📊 Weekly Learning Velocity</h3>
                    <p className="text-xs text-gray-400 mb-4">Steps completed per week (last 6 weeks)</p>
                    <SpeedChart speedByWeek={intel.speedByWeek} />
                    {intel.speedLast7 === 0 && (
                        <p className="text-xs text-gray-400 text-center mt-2">No activity in the last 7 days. Time to get back on track!</p>
                    )}
                </div>

                {/* Consistency ring + peak day */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex flex-col gap-3">
                    <div>
                        <h3 className="font-bold text-sm dark:text-white">🎯 Consistency Score</h3>
                        <p className="text-xs text-gray-400">Active days in the past 14 days</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <ConsistencyRing score={intel.consistencyScore} />
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">Best Streak</span>
                                <span className="font-bold dark:text-white">{intel.longestStreak} days</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">Peak Day</span>
                                <span className="font-bold dark:text-white">{intel.peakLearningDay}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">Total Active Days</span>
                                <span className="font-bold dark:text-white">{intel.activeDates.length}</span>
                            </div>
                        </div>
                    </div>
                    {intel.consistencyScore < 50 && intel.completedCount > 0 && (
                        <p className="text-[11px] text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-3 py-2">
                            💡 Tip: Daily 15-minute sessions beat weekend cramming. Aim for 5+ active days/week.
                        </p>
                    )}
                </div>
            </section>

            {/* ── STAGE BREAKDOWN ────────────────────────────────────────── */}
            <section className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="font-bold text-sm mb-4 dark:text-white">📋 Stage-by-Stage Breakdown</h3>
                <div className="space-y-3">
                    {intel.stageBreakdown.map((stage, i) => (
                        <StageBar key={i} stage={stage} />
                    ))}
                </div>
            </section>

            {/* ── DROP-OFF POINTS ────────────────────────────────────────── */}
            {intel.dropOffPoints.length > 0 && (
                <section className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                    <h3 className="font-bold text-sm mb-1 dark:text-white flex items-center gap-2">
                        <span>📍 Drop-Off Points Detected</span>
                        <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {intel.dropOffPoints.length} module{intel.dropOffPoints.length > 1 ? 's' : ''}
                        </span>
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">Modules you started but haven't returned to recently.</p>
                    <div className="space-y-3">
                        {intel.dropOffPoints.map((m, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-200 dark:bg-orange-800 flex items-center justify-center">
                                    <span className="text-sm font-extrabold text-orange-700 dark:text-orange-300">{m.completedPct}%</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{m.moduleTitle}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.stageTitle} · {m.done}/{m.total} steps</p>
                                </div>
                                <span className="flex-shrink-0 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded-full whitespace-nowrap">
                                    {m.staleDays === 999 ? 'Never returned' : `${m.staleDays}d inactive`}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── PROJECTION & TARGET DATE ───────────────────────────────── */}
            <section className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="font-bold text-sm mb-4 dark:text-white">🗓 Goal & Projection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Projection */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">AI-Projected Completion</p>
                        {intel.projectedDate ? (
                            <>
                                <p className="text-2xl font-extrabold dark:text-white">{formatDate(intel.projectedDate)}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    At your current pace of <strong>{intel.speedLast7} steps/day</strong> with <strong>{intel.remainingSteps} steps</strong> remaining
                                </p>
                                {intel.aheadDays !== null && (
                                    <p className="text-xs font-bold text-green-600 dark:text-green-400">
                                        🟢 {intel.aheadDays} days ahead of your target!
                                    </p>
                                )}
                                {intel.behindDays !== null && (
                                    <p className="text-xs font-bold text-red-500 dark:text-red-400">
                                        🔴 {intel.behindDays} days behind your target
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-400 text-sm">Complete a few steps to see your projection.</p>
                        )}
                    </div>

                    {/* Target date setter */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Set Your Target Completion Date</p>
                        <input
                            type="date"
                            value={targetDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => handleSetTargetDate(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        />
                        {targetDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Goal: <strong>{formatDate(targetDate)}</strong>
                                {intel.projectedDate && (() => {
                                    const d = Math.trunc((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
                                    return d > 0 ? ` · ${d} days from now` : '';
                                })()}
                            </p>
                        )}
                        {!targetDate && (
                            <p className="text-xs text-gray-400">Setting a goal date enables the ahead/behind tracker.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* ── ACTIVITY HEATMAP ───────────────────────────────────────── */}
            <section className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="font-bold text-sm mb-1 dark:text-white">🟩 Activity Heatmap</h3>
                <p className="text-xs text-gray-400 mb-4">Your learning streaks over the past year</p>
                <div className="overflow-x-auto">
                    <ActivityHeatmap activityData={activityData} />
                </div>
                <div className="flex items-center gap-1.5 mt-3 justify-end">
                    <span className="text-[10px] text-gray-400">Less</span>
                    {['bg-gray-200 dark:bg-gray-700', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700'].map((c, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                    ))}
                    <span className="text-[10px] text-gray-400">More</span>
                </div>
            </section>
        </div>
    );
};

export default DashboardView;
