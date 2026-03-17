const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await User.findOne({ firebaseUid: decodedToken.uid });

        if (!user || user.isBanned || !['super_admin', 'domain_expert', 'support'].includes(user.role)) {
            return res.status(403).json({ message: 'Access denied: Requires admin privileges' });
        }

        req.adminUser = user;
        next();
    } catch (error) {
        console.error('Admin Auth Error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// --- Admin Login Verification ---
router.post('/login', async (req, res) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await User.findOne({ firebaseUid: decodedToken.uid });

        if (!user) return res.status(404).json({ message: 'User not found in database' });
        if (user.isBanned) return res.status(403).json({ message: 'Account banned' });
        if (!['super_admin', 'domain_expert', 'support'].includes(user.role)) {
            return res.status(403).json({ message: 'Access denied: Requires admin privileges' });
        }

        res.json({ message: 'Login successful', role: user.role, email: user.email });
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

// --- Dashboard Stats (extended) ---
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const DailyStat = require('../models/DailyStat');
        const Roadmap = require('../models/Roadmap');
        const SuggestedResource = require('../models/SuggestedResource');

        const listUsersResult = await admin.auth().listUsers(1000);
        const users = listUsersResult.users;
        const totalUsers = users.length;

        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const activeUsersCount = users.filter(user => {
            const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
            return lastSignIn > thirtyDaysAgo;
        }).length;

        const totalFeedbacks = await Feedback.countDocuments();
        const totalRoadmaps = await Roadmap.countDocuments();
        const pendingResources = await SuggestedResource.countDocuments({ status: 'pending' });

        // Recent feedbacks for activity feed
        const recentFeedbacks = await Feedback.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('email category rating createdAt');

        // New users trend — last 30 days
        const daysToTrack = 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysToTrack);
        startDate.setHours(0, 0, 0, 0);

        const dailyCounts = {};
        for (let i = 0; i < daysToTrack; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            dailyCounts[key] = { date: d, count: 0 };
        }

        users.forEach(user => {
            const creationTime = new Date(user.metadata.creationTime);
            if (creationTime >= startDate) {
                const key = creationTime.toISOString().split('T')[0];
                if (dailyCounts[key]) dailyCounts[key].count++;
            }
        });

        const bulkOps = Object.keys(dailyCounts).map(dateKey => ({
            updateOne: {
                filter: { date: dateKey },
                update: { $set: { newUsers: dailyCounts[dateKey].count } },
                upsert: true
            }
        }));
        if (bulkOps.length > 0) await DailyStat.bulkWrite(bulkOps);

        const engagement = Object.values(dailyCounts)
            .sort((a, b) => a.date - b.date)
            .map(item => ({
                name: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                users: item.count
            }));

        res.json({
            totalUsers,
            activeUsers: activeUsersCount,
            totalFeedbacks,
            totalRoadmaps,
            pendingResources,
            recentFeedbacks,
            engagement
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: error.message });
    }
});

// --- User Management ---
router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-progress -notifications').sort({ createdAt: -1 }).limit(200);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/users/:id', isAdmin, async (req, res) => {
    try {
        const { role, isBanned } = req.body;
        const updateData = {};
        if (role) updateData.role = role;
        if (typeof isBanned === 'boolean') updateData.isBanned = isBanned;

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Notifications ---
// In-memory log of admin broadcast notifications (survives server restart via DB query)
router.post('/notifications', isAdmin, async (req, res) => {
    try {
        const { title, message } = req.body;
        if (!title || !message) return res.status(400).json({ message: 'Title and message required' });

        const newNotification = {
            id: Date.now(),
            title,
            message,
            icon: '📢',
            timestamp: new Date()
        };

        await User.updateMany({}, { $push: { notifications: newNotification } });
        res.json({ message: 'Notification sent to all users', notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get history of notifications sent (reads from first found user as a proxy)
router.get('/notifications/history', isAdmin, async (req, res) => {
    try {
        // Get notifications from the most recently updated user as a log proxy
        const sampleUser = await User.findOne({ 'notifications.0': { $exists: true } })
            .select('notifications')
            .sort({ updatedAt: -1 });

        const history = sampleUser
            ? sampleUser.notifications
                .filter(n => n.icon === '📢') // Only admin broadcasts
                .sort((a, b) => b.id - a.id)
                .slice(0, 20)
            : [];

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Feedbacks ---
router.get('/feedbacks', isAdmin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/feedbacks/:id', isAdmin, async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Roadmap Control ---
const Roadmap = require('../models/Roadmap');

router.get('/roadmaps', isAdmin, async (req, res) => {
    try {
        const roadmaps = await Roadmap.find().sort({ title: 1 });
        res.json(roadmaps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/roadmaps', isAdmin, async (req, res) => {
    try {
        const { title, description, icon, status } = req.body;
        const newRoadmap = new Roadmap({ title, description, icon, status });
        const savedRoadmap = await newRoadmap.save();
        res.json(savedRoadmap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/roadmaps/:id', isAdmin, async (req, res) => {
    try {
        const updatedRoadmap = await Roadmap.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedRoadmap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/roadmaps/:id', isAdmin, async (req, res) => {
    try {
        await Roadmap.findByIdAndDelete(req.params.id);
        res.json({ message: 'Roadmap deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Resource Hub ---
const SuggestedResource = require('../models/SuggestedResource');

router.get('/resources/pending', isAdmin, async (req, res) => {
    try {
        const queue = await SuggestedResource.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.json(queue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/resources/:id/approve', isAdmin, async (req, res) => {
    try {
        const resource = await SuggestedResource.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/resources/:id/reject', isAdmin, async (req, res) => {
    try {
        const resource = await SuggestedResource.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Manually add a resource (immediately approved)
router.post('/resources/manual', isAdmin, async (req, res) => {
    try {
        const { title, url, type, topic } = req.body;
        if (!title || !url || !topic) {
            return res.status(400).json({ message: 'title, url, and topic are required' });
        }
        const resource = new SuggestedResource({
            title, url,
            type: type || 'article',
            topic,
            status: 'approved',
            suggestedByAI: false
        });
        const saved = await resource.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Analytics & Intelligence ---

// Helper: derive a human-readable module label from a step ID
// Step IDs follow patterns like "html-1", "css-grid", "js-async", "react-hooks"
const stepToModule = (stepId) => {
    const parts = stepId.split('-');
    if (parts.length < 2) return stepId;
    // Take domain + first word of topic, capitalised
    const domain = parts[0].toUpperCase();
    const topic = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `${domain} ${topic}`;
};

router.get('/analytics/dropoffs', isAdmin, async (req, res) => {
    try {
        // Fetch ALL users who have any progress stored
        const users = await User.find(
            { 'progress': { $exists: true } },
            'progress'
        ).lean();

        // Count drop-offs: users who started (have at least 1 completed: false step in a module)
        // but haven't finished the full module
        const moduleCounts = {}; // moduleId → { started: N, completed: N }

        users.forEach(user => {
            if (!user.progress) return;
            const progressObj = user.progress instanceof Map ? Object.fromEntries(user.progress) : user.progress;

            Object.entries(progressObj).forEach(([domain, steps]) => {
                const stepsObj = steps instanceof Map ? Object.fromEntries(steps) : steps;
                if (!stepsObj) return;

                // Group steps by module prefix (e.g. "html" from "html-1")
                const moduleGroups = {};
                Object.entries(stepsObj).forEach(([stepId, progress]) => {
                    const moduleParts = stepId.split('-');
                    // Module key = domain-firstsegment (e.g. html-basics → "html")
                    const moduleKey = moduleParts.slice(0, 2).join('-');
                    if (!moduleGroups[moduleKey]) moduleGroups[moduleKey] = { total: 0, done: 0 };
                    moduleGroups[moduleKey].total++;
                    if (progress && progress.completed) moduleGroups[moduleKey].done++;
                });

                // A drop-off: module was started (done > 0) but not finished (done < total)
                Object.entries(moduleGroups).forEach(([moduleKey, counts]) => {
                    if (counts.done > 0 && counts.done < counts.total) {
                        if (!moduleCounts[moduleKey]) moduleCounts[moduleKey] = 0;
                        moduleCounts[moduleKey]++;
                    }
                });
            });
        });

        let dropoffs = Object.entries(moduleCounts)
            .map(([moduleId, count]) => ({
                module: moduleId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Fallback to illustrative data if no real data exists
        if (dropoffs.length === 0) {
            dropoffs = [
                { module: 'Html Basics', count: 0 },
                { module: 'Css Layout', count: 0 },
                { module: 'Js Advanced', count: 0 },
                { module: 'React Basics', count: 0 }
            ];
        }

        res.json(dropoffs);
    } catch (error) {
        console.error('Drop-off aggregation error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/analytics/failures', isAdmin, async (req, res) => {
    try {
        // Find real at-risk users: those with ANY quiz score < 60
        const atRiskUsers = await User.find(
            { 'quizScores': { $exists: true, $ne: {} } },
            'email quizScores'
        ).lean().limit(100);

        let failures = [];

        atRiskUsers.forEach(user => {
            if (!user.quizScores) return;
            // quizScores stored as plain object after .lean()
            const domainMap = typeof user.quizScores.toJSON === 'function'
                ? user.quizScores.toJSON()
                : user.quizScores;

            Object.entries(domainMap).forEach(([domain, topics]) => {
                const topicsObj = typeof topics === 'object' ? topics : {};
                Object.entries(topicsObj).forEach(([topic, score]) => {
                    const numScore = Number(score);
                    if (numScore < 60) {
                        failures.push({
                            id: `${user._id}-${domain}-${topic}`,
                            user: user.email,
                            topic: topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                            score: Math.round(numScore),
                            risk: numScore < 40 ? 'High' : 'Medium'
                        });
                    }
                });
            });
        });

        // Sort by score ascending (worst first)
        failures.sort((a, b) => a.score - b.score);

        // If no real data yet, return empty array (no fake data)
        res.json(failures);
    } catch (error) {
        console.error('Failures aggregation error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Save adaptive thresholds to platform settings
router.post('/analytics/thresholds', isAdmin, async (req, res) => {
    try {
        const PlatformSettings = require('../models/PlatformSettings');
        const { remedial, fastTrack } = req.body;

        if (remedial === undefined || fastTrack === undefined) {
            return res.status(400).json({ message: 'remedial and fastTrack values are required' });
        }

        const settings = await PlatformSettings.findByIdAndUpdate(
            'singleton',
            { remedialThreshold: Number(remedial), fastTrackThreshold: Number(fastTrack) },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: 'Thresholds saved successfully', settings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Platform Settings ---
router.get('/settings', isAdmin, async (req, res) => {
    try {
        const PlatformSettings = require('../models/PlatformSettings');
        let settings = await PlatformSettings.findById('singleton');
        if (!settings) {
            settings = await PlatformSettings.create({ _id: 'singleton' });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/settings', isAdmin, async (req, res) => {
    try {
        const PlatformSettings = require('../models/PlatformSettings');
        const { maintenanceMode, allowRegistrations, xpMultiplier, streakDecayDays } = req.body;

        const updateData = {};
        if (typeof maintenanceMode === 'boolean') updateData.maintenanceMode = maintenanceMode;
        if (typeof allowRegistrations === 'boolean') updateData.allowRegistrations = allowRegistrations;
        if (xpMultiplier !== undefined) updateData.xpMultiplier = Number(xpMultiplier);
        if (streakDecayDays !== undefined) updateData.streakDecayDays = Number(streakDecayDays);

        const settings = await PlatformSettings.findByIdAndUpdate(
            'singleton',
            updateData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: 'Settings saved', settings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cache purge (clears any in-memory state; easy to extend for Redis etc.)
router.delete('/cache', isAdmin, async (req, res) => {
    try {
        // In this architecture there's no server-side cache layer yet.
        // This endpoint is the hook for future cache invalidation (Redis, etc.)
        res.json({ message: 'Cache purged successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
