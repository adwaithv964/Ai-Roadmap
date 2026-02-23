import { useState, useEffect, useCallback, useRef } from 'react';
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
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// ─── Level table (mirrored from backend) ──────────────────────────────────────
export const LEVELS = [
    { level: 1, xpRequired: 0, title: 'Rookie', color: 'from-gray-400 to-gray-500', emoji: '🌱' },
    { level: 2, xpRequired: 100, title: 'Explorer', color: 'from-green-400 to-emerald-500', emoji: '🗺️' },
    { level: 3, xpRequired: 250, title: 'Learner', color: 'from-blue-400 to-cyan-500', emoji: '📖' },
    { level: 4, xpRequired: 500, title: 'Scholar', color: 'from-indigo-400 to-blue-600', emoji: '🎓' },
    { level: 5, xpRequired: 900, title: 'Expert', color: 'from-violet-500 to-purple-600', emoji: '⭐' },
    { level: 6, xpRequired: 1400, title: 'Master', color: 'from-purple-500 to-pink-600', emoji: '💡' },
    { level: 7, xpRequired: 2000, title: 'Grandmaster', color: 'from-pink-500 to-rose-600', emoji: '🔥' },
    { level: 8, xpRequired: 2800, title: 'Legend', color: 'from-orange-400 to-amber-500', emoji: '⚡' },
    { level: 9, xpRequired: 3800, title: 'Elite', color: 'from-yellow-400 to-orange-500', emoji: '💎' },
    { level: 10, xpRequired: 5000, title: 'Champion', color: 'from-yellow-300 to-yellow-500', emoji: '👑' },
];

export function getLevelData(totalXP) {
    let current = LEVELS[0];
    let next = LEVELS[1];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVELS[i].xpRequired) {
            current = LEVELS[i];
            next = LEVELS[i + 1] || null;
            break;
        }
    }
    const progressPercent = next
        ? Math.min(100, Math.round(((totalXP - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100))
        : 100;
    return { current, next, progressPercent };
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useGamification() {
    const [stats, setStats] = useState({
        xp: 0, level: 1, streak: 0, progressPercent: 0,
        xpForCurrentLevel: 0, xpForNextLevel: 100, xpHistory: [],
    });
    const [loading, setLoading] = useState(true);
    const initialized = useRef(false);

    // Load stats from backend on mount
    useEffect(() => {
        const load = async () => {
            try {
                const data = await apiCall('/api/gamification/stats');
                setStats(data);
            } catch (err) {
                console.warn('Gamification load failed:', err.message);
            } finally {
                setLoading(false);
                initialized.current = true;
            }
        };
        // Wait briefly for Firebase auth to settle
        const timer = setTimeout(load, 800);
        return () => clearTimeout(timer);
    }, []);

    /**
     * Award XP and handle optimistic + server updates.
     * Returns { leveledUp, newLevel, newLevelTitle, xpAwarded }
     */
    const awardXP = useCallback(async (amount, reason = 'Step completed') => {
        const today = new Date().toISOString().split('T')[0];
        try {
            const result = await apiCall('/api/gamification/award-xp', {
                method: 'POST',
                body: JSON.stringify({ amount, reason, today }),
            });
            setStats(prev => ({
                ...prev,
                xp: result.xp,
                level: result.newLevel,
                streak: result.streak,
                progressPercent: result.progressPercent,
                xpForCurrentLevel: result.xpForCurrentLevel,
                xpForNextLevel: result.xpForNextLevel,
            }));
            return result;
        } catch (err) {
            console.warn('awardXP failed:', err.message);
            // Optimistic fallback (offline)
            setStats(prev => ({ ...prev, xp: prev.xp + amount }));
            return { leveledUp: false, xpAwarded: amount };
        }
    }, []);

    const levelData = getLevelData(stats.xp);

    return { stats, loading, awardXP, levelData };
}
