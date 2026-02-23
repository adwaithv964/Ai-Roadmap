const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// ─── XP / Level constants ────────────────────────────────────────────────────
const LEVELS = [
    { level: 1, xpRequired: 0, title: 'Rookie' },
    { level: 2, xpRequired: 100, title: 'Explorer' },
    { level: 3, xpRequired: 250, title: 'Learner' },
    { level: 4, xpRequired: 500, title: 'Scholar' },
    { level: 5, xpRequired: 900, title: 'Expert' },
    { level: 6, xpRequired: 1400, title: 'Master' },
    { level: 7, xpRequired: 2000, title: 'Grandmaster' },
    { level: 8, xpRequired: 2800, title: 'Legend' },
    { level: 9, xpRequired: 3800, title: 'Elite' },
    { level: 10, xpRequired: 5000, title: 'Champion' },
];

function getLevelInfo(totalXP) {
    let current = LEVELS[0];
    let next = LEVELS[1];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVELS[i].xpRequired) {
            current = LEVELS[i];
            next = LEVELS[i + 1] || null;
            break;
        }
    }
    const xpForCurrentLevel = current.xpRequired;
    const xpForNextLevel = next ? next.xpRequired : null;
    const progressPercent = xpForNextLevel
        ? Math.min(100, Math.round(((totalXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100))
        : 100;
    return { level: current.level, title: current.title, xpForCurrentLevel, xpForNextLevel, progressPercent, nextTitle: next?.title || null };
}

// ─── GET /api/gamification/stats ─────────────────────────────────────────────
router.get('/stats', async (req, res) => {
    try {
        const user = req.user;
        const info = getLevelInfo(user.xp || 0);
        res.json({
            xp: user.xp || 0,
            streak: user.streak || 0,
            lastActivityDate: user.lastActivityDate || null,
            xpHistory: (user.xpHistory || []).slice(-30),
            ...info,
        });
    } catch (err) {
        console.error('GET /gamification/stats error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── POST /api/gamification/award-xp ─────────────────────────────────────────
// Body: { amount: number, reason: string, today: 'YYYY-MM-DD' }
// Returns updated gamification stats + leveledUp flag
router.post('/award-xp', async (req, res) => {
    try {
        const { amount, reason = 'Step completed', today } = req.body;
        if (!amount || typeof amount !== 'number' || amount === 0) {
            return res.status(400).json({ message: 'amount must be a non-zero number' });
        }

        const user = req.user;
        const todayStr = today || new Date().toISOString().split('T')[0];
        const prevXP = user.xp || 0;
        const prevLevel = user.level || 1;
        const isDeduction = amount < 0;

        // ── Streak logic (only on positive awards) ────────────────────────────────
        let streak = user.streak || 0;
        if (!isDeduction) {
            const last = user.lastActivityDate;
            if (!last) {
                streak = 1;
            } else if (last === todayStr) {
                // Same day — no change
            } else {
                const diffDays = Math.round((new Date(todayStr) - new Date(last)) / (1000 * 60 * 60 * 24));
                streak = diffDays === 1 ? streak + 1 : 1;
            }
            // Streak bonus: +10 XP when streak >= 3 (once per day)
            if (streak >= 3 && user.lastActivityDate !== todayStr) {
                user.xp = Math.max(0, prevXP + amount + 10);
            } else {
                user.xp = Math.max(0, prevXP + amount);
            }
            user.streak = streak;
            if (user.lastActivityDate !== todayStr) {
                user.lastActivityDate = todayStr;
            }
        } else {
            // Deduction — just subtract, floor at 0, don't touch streak
            user.xp = Math.max(0, prevXP + amount); // amount is negative here
            streak = user.streak || 0;
        }

        const totalAward = user.xp - prevXP; // actual delta (may differ due to floor/bonus)

        // ── XP History ────────────────────────────────────────────────────────────
        if (!isDeduction) {
            const historyEntry = { date: todayStr, xpEarned: totalAward, reason };
            user.xpHistory = [...(user.xpHistory || []).slice(-29), historyEntry];
        }

        // ── Level recalculation (can go DOWN) ─────────────────────────────────────
        const newInfo = getLevelInfo(user.xp);
        const prevInfo = getLevelInfo(prevXP);
        const leveledUp = newInfo.level > prevLevel;
        const leveledDown = newInfo.level < prevLevel;
        user.level = newInfo.level;

        user.markModified('xpHistory');
        await user.save();

        res.json({
            xp: user.xp,
            streak: user.streak,
            xpAwarded: totalAward,
            leveledUp,
            leveledDown,
            newLevel: newInfo.level,
            newLevelTitle: newInfo.title,
            ...newInfo,
        });
    } catch (err) {
        console.error('POST /gamification/award-xp error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
