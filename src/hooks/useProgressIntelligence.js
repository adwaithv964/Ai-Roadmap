import { useMemo } from 'react';

/**
 * useProgressIntelligence
 * Pure analytics engine — computes all intelligence metrics from existing
 * progress data (step completion timestamps). No external API required.
 *
 * @param {object} progress     - { [stepId]: { completed, completedDate } }
 * @param {object} roadmapData  - { title, stages: [{ modules: [{ id, title, steps }] }] }
 * @param {string} targetDate   - ISO date string of user-set goal (nullable)
 * @returns {object} intelligence metrics + alerts
 */
export function useProgressIntelligence(progress, roadmapData, targetDate) {
    return useMemo(() => {
        if (!progress || !roadmapData) return getEmptyIntelligence();

        // ── 1. Basic counts ────────────────────────────────────────────────
        const allSteps = roadmapData.stages.flatMap(s => s.modules.flatMap(m => m.steps));
        const totalSteps = allSteps.length;
        const completedEntries = Object.values(progress).filter(p => p.completed && p.completedDate);
        const completedCount = completedEntries.length;

        // ── 2. Completion timeline: { 'YYYY-MM-DD': count } ───────────────
        const timeline = {};
        completedEntries.forEach(p => {
            timeline[p.completedDate] = (timeline[p.completedDate] || 0) + 1;
        });
        const activeDates = Object.keys(timeline).sort(); // ascending

        // ── 3. Streak ──────────────────────────────────────────────────────
        const today = todayStr();
        const yesterday = offsetDate(today, -1);
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        let prevDate = null;

        activeDates.forEach(d => {
            if (!prevDate) {
                tempStreak = 1;
            } else {
                const diff = daysBetween(prevDate, d);
                tempStreak = diff === 1 ? tempStreak + 1 : 1;
            }
            longestStreak = Math.max(longestStreak, tempStreak);
            prevDate = d;
        });

        const lastActiveDate = activeDates[activeDates.length - 1];
        if (lastActiveDate === today || lastActiveDate === yesterday) {
            currentStreak = tempStreak;
        }

        // ── 4. Days since last activity ────────────────────────────────────
        const daysSinceActivity = lastActiveDate ? daysBetween(lastActiveDate, today) : 999;

        // ── 5. Learning Speed (7-day rolling average) ─────────────────────
        const last7Days = Array.from({ length: 7 }, (_, i) => offsetDate(today, -i));
        const stepsLast7 = last7Days.reduce((sum, d) => sum + (timeline[d] || 0), 0);
        const speedLast7 = +(stepsLast7 / 7).toFixed(2); // steps/day

        // 30-day speed for charts
        const speedByWeek = [];
        for (let w = 5; w >= 0; w--) {
            const weekStart = offsetDate(today, -(w * 7 + 6));
            const weekEnd = offsetDate(today, -w * 7);
            let count = 0;
            activeDates.forEach(d => { if (d >= weekStart && d <= weekEnd) count += timeline[d]; });
            speedByWeek.push({ label: `W-${w === 0 ? 'now' : w}`, steps: count });
        }

        // ── 6. Consistency score (active days / 14) ────────────────────────
        const last14 = Array.from({ length: 14 }, (_, i) => offsetDate(today, -i));
        const activeLast14 = last14.filter(d => timeline[d] > 0).length;
        const consistencyScore = Math.round((activeLast14 / 14) * 100);

        // ── 7. Peak learning day ───────────────────────────────────────────
        const dayTotals = [0, 0, 0, 0, 0, 0, 0]; // Sun=0
        activeDates.forEach(d => {
            const dow = new Date(d + 'T00:00:00').getDay();
            dayTotals[dow] += timeline[d];
        });
        const peakDayIdx = dayTotals.indexOf(Math.max(...dayTotals));
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const peakLearningDay = dayNames[peakDayIdx];
        const todayDow = new Date().getDay();
        const daysUntilPeak = (peakDayIdx - todayDow + 7) % 7;

        // ── 8. Projected completion date ───────────────────────────────────
        const remainingSteps = totalSteps - completedCount;
        let projectedDate = null;
        if (speedLast7 > 0 && remainingSteps > 0) {
            const daysNeeded = Math.ceil(remainingSteps / speedLast7);
            projectedDate = offsetDate(today, daysNeeded);
        }

        // ── 9. Ahead / behind target ───────────────────────────────────────
        let behindDays = null;
        let aheadDays = null;
        if (targetDate && projectedDate) {
            const diff = daysBetween(projectedDate, targetDate);
            if (diff > 0) aheadDays = diff;
            else behindDays = Math.abs(diff);
        }

        // ── 10. Drop-off detection ─────────────────────────────────────────
        const dropOffPoints = [];
        roadmapData.stages.forEach(stage => {
            stage.modules.forEach(module => {
                if (!module.steps.length) return;
                const total = module.steps.length;
                const done = module.steps.filter(s => progress[s.id]?.completed).length;
                if (done === 0 || done === total) return; // untouched or complete — skip
                const pct = Math.round((done / total) * 100);

                // Find when it was last touched
                const completedDates = module.steps
                    .filter(s => progress[s.id]?.completedDate)
                    .map(s => progress[s.id].completedDate)
                    .sort();
                const lastTouched = completedDates[completedDates.length - 1] || null;
                const staleDays = lastTouched ? daysBetween(lastTouched, today) : 999;

                if (staleDays >= 4 && pct < 80) {
                    dropOffPoints.push({
                        moduleId: module.id,
                        moduleTitle: module.title,
                        stageTitle: stage.title,
                        completedPct: pct,
                        done,
                        total,
                        staleDays,
                    });
                }
            });
        });
        // Sort by most stale
        dropOffPoints.sort((a, b) => b.staleDays - a.staleDays);

        // ── 11. Generate alerts ────────────────────────────────────────────
        const alerts = [];
        const dismissed = getDismissedAlerts();

        // No activity alerts
        if (completedCount > 0 && daysSinceActivity >= 3 && !dismissed['falling_behind']) {
            alerts.push({
                id: 'falling_behind',
                type: 'danger',
                icon: '🚨',
                title: "You're Falling Behind!",
                message: `No learning activity in ${daysSinceActivity} days. Consistency is key to retention.`,
                strategy: 'Try the "2-minute rule" — open the app and complete just ONE step right now. Momentum builds momentum.',
                severity: 3,
            });
        }

        if (completedCount > 5 && speedLast7 < 0.5 && daysSinceActivity < 3 && !dismissed['slow_pace']) {
            alerts.push({
                id: 'slow_pace',
                type: 'warning',
                icon: '🐢',
                title: 'Learning Pace Has Slowed',
                message: `You're averaging ${speedLast7} steps/day (last 7 days). At this pace, progress is slower than optimal.`,
                strategy: 'Schedule two 20-minute focused sessions per day. Even 1-2 steps per session builds powerful momentum over time.',
                severity: 2,
            });
        }

        if (aheadDays !== null && aheadDays >= 2 && !dismissed['ahead_of_schedule']) {
            alerts.push({
                id: 'ahead_of_schedule',
                type: 'success',
                icon: '🚀',
                title: `${aheadDays} Days Ahead of Schedule!`,
                message: `At your current pace of ${speedLast7} steps/day, you'll finish ${aheadDays} days before your target date.`,
                strategy: 'Use the extra time to revisit earlier modules, build a project, or start an adjacent skill to deepen understanding.',
                severity: 0,
            });
        }

        if (behindDays !== null && behindDays >= 3 && !dismissed['behind_schedule']) {
            alerts.push({
                id: 'behind_schedule',
                type: 'danger',
                icon: '⏰',
                title: `${behindDays} Days Behind Your Target`,
                message: `You need to increase your pace to meet your goal. Currently at ${speedLast7} steps/day.`,
                strategy: `To reach your target on time, aim for ${Math.ceil(remainingSteps / Math.max(1, daysBetween(today, targetDate)))} steps/day. Block 30 min daily in your calendar.`,
                severity: 3,
            });
        }

        if (dropOffPoints.length > 0 && !dismissed['drop_off_' + dropOffPoints[0].moduleId]) {
            const m = dropOffPoints[0];
            alerts.push({
                id: 'drop_off_' + m.moduleId,
                type: 'info',
                icon: '📍',
                title: `Stalled on "${m.moduleTitle}"`,
                message: `You're ${m.completedPct}% through this module but haven't returned in ${m.staleDays} days.`,
                strategy: 'When you get stuck, try: (1) Watch a YouTube video on the topic, (2) Ask the AI Tutor a specific question, (3) Try to build something small with what you know so far.',
                severity: 1,
            });
        }

        if (currentStreak > 0 && [3, 7, 14, 30].includes(currentStreak) && !dismissed['streak_' + currentStreak]) {
            alerts.push({
                id: 'streak_' + currentStreak,
                type: 'success',
                icon: '🔥',
                title: `${currentStreak}-Day Streak!`,
                message: `Incredible consistency! You've learned something every day for ${currentStreak} days straight.`,
                strategy: 'Science shows habits formed over 21+ days become automatic. You\'re building a powerful learning habit — protect your streak!',
                severity: 0,
            });
        }

        if (completedCount === 0 || (lastActiveDate && daysSinceActivity < 1 && completedCount > 2)) {
            // If today is not a peak day and it's upcoming soon
            if (daysUntilPeak > 0 && daysUntilPeak <= 2 && !dismissed['peak_day']) {
                alerts.push({
                    id: 'peak_day',
                    type: 'info',
                    icon: '⭐',
                    title: `${peakLearningDay} Is Your Power Day`,
                    message: `Your data shows you learn most on ${peakLearningDay}s. It's coming up in ${daysUntilPeak} day(s)!`,
                    strategy: `Plan a longer learning session for ${peakLearningDay}. Block out your best energy window and tackle the toughest module topics.`,
                    severity: 0,
                });
            }
        }

        alerts.sort((a, b) => b.severity - a.severity);

        // ── 12. Stage-level progress breakdown ────────────────────────────
        const stageBreakdown = roadmapData.stages.map(stage => {
            const stageTotal = stage.modules.reduce((sum, m) => sum + m.steps.length, 0);
            const stageDone = stage.modules.reduce((sum, m) =>
                sum + m.steps.filter(s => progress[s.id]?.completed).length, 0);
            return {
                title: stage.title,
                total: stageTotal,
                done: stageDone,
                pct: stageTotal > 0 ? Math.round((stageDone / stageTotal) * 100) : 0,
            };
        });

        return {
            // Basic
            totalSteps,
            completedCount,
            progressPct: totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0,
            // Activity
            timeline,
            activeDates,
            daysSinceActivity,
            lastActiveDate,
            // Speed
            speedLast7,
            speedByWeek,
            // Streak & Consistency
            currentStreak,
            longestStreak,
            consistencyScore,
            peakLearningDay,
            daysUntilPeak,
            // Projection
            projectedDate,
            aheadDays,
            behindDays,
            remainingSteps,
            // Drop-offs
            dropOffPoints,
            // Stage breakdown
            stageBreakdown,
            // Alerts
            alerts,
        };
    }, [progress, roadmapData, targetDate]);
}

// ── Helpers ────────────────────────────────────────────────────────────────

function todayStr() {
    return new Date().toISOString().split('T')[0];
}

function offsetDate(dateStr, days) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function daysBetween(a, b) {
    const ms = new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00');
    return Math.round(ms / (1000 * 60 * 60 * 24));
}

function getDismissedAlerts() {
    try {
        return JSON.parse(localStorage.getItem('dismissedAlerts') || '{}');
    } catch { return {}; }
}

export function dismissAlert(id) {
    try {
        const current = JSON.parse(localStorage.getItem('dismissedAlerts') || '{}');
        current[id] = true;
        localStorage.setItem('dismissedAlerts', JSON.stringify(current));
    } catch { /* ignore */ }
}

function getEmptyIntelligence() {
    return {
        totalSteps: 0, completedCount: 0, progressPct: 0,
        timeline: {}, activeDates: [], daysSinceActivity: 999, lastActiveDate: null,
        speedLast7: 0, speedByWeek: [],
        currentStreak: 0, longestStreak: 0, consistencyScore: 0, peakLearningDay: 'Monday', daysUntilPeak: 0,
        projectedDate: null, aheadDays: null, behindDays: null, remainingSteps: 0,
        dropOffPoints: [], stageBreakdown: [], alerts: [],
    };
}
