const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// Middleware to check if user is admin (Mock for now, normally would check JWT)
const isAdmin = async (req, res, next) => {
    // For prototype, we might skip actual auth or assume a header 'x-admin-secret'
    // In a real app: check req.user.role === 'admin'
    // const user = await User.findOne({ firebaseUid: req.headers.uid });
    // if (user && user.role === 'admin') next();
    next();
};

// --- Dashboard Stats ---
router.get('/stats', isAdmin, async (req, res) => {
    try {
        const admin = require('firebase-admin');
        const DailyStat = require('../models/DailyStat');

        // Fetch all users from Firebase (max 1000 for this implementation)
        // For production with >1000 users, we'd need pagination
        const listUsersResult = await admin.auth().listUsers(1000);
        const users = listUsersResult.users;

        const totalUsers = users.length;

        // Active Users: Logged in within last 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const activeUsersCount = users.filter(user => {
            const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
            return lastSignIn > thirtyDaysAgo;
        }).length;

        const totalFeedbacks = await Feedback.countDocuments();

        // Engagement: New users in last 30 days
        const daysToTrack = 30; // Changed from 7 to 30 per user request
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysToTrack);
        startDate.setHours(0, 0, 0, 0);

        // Initialize last 30 days map
        const dailyCounts = {};
        for (let i = 0; i < daysToTrack; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            dailyCounts[key] = { date: d, count: 0 };
        }

        // Process users for "New Users" count
        users.forEach(user => {
            const creationTime = new Date(user.metadata.creationTime);
            if (creationTime >= startDate) {
                const key = creationTime.toISOString().split('T')[0];
                if (dailyCounts[key]) {
                    dailyCounts[key].count++;
                }
            }
        });

        // Persist/Update DailyStats in MongoDB
        const bulkOps = Object.keys(dailyCounts).map(dateKey => ({
            updateOne: {
                filter: { date: dateKey },
                update: { $set: { newUsers: dailyCounts[dateKey].count } },
                upsert: true
            }
        }));

        if (bulkOps.length > 0) {
            await DailyStat.bulkWrite(bulkOps);
        }

        // Convert to array and sort by date for response
        const engagement = Object.values(dailyCounts)
            .sort((a, b) => a.date - b.date)
            .map(item => ({
                name: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // e.g. "Jan 15"
                users: item.count
            }));

        res.json({
            totalUsers,
            activeUsers: activeUsersCount,
            totalFeedbacks,
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
        const users = await User.find({}, '-progress -notifications').sort({ createdAt: -1 }).limit(50);
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
router.post('/notifications', isAdmin, async (req, res) => {
    try {
        const { title, message } = req.body;
        if (!title || !message) return res.status(400).json({ message: 'Title and message required' });

        const newNotification = {
            id: Date.now(), // Simple ID
            title,
            message,
            icon: '📢', // Default icon for admin announcements
            timestamp: new Date()
        };

        // Push to ALL users
        await User.updateMany({}, { $push: { notifications: newNotification } });

        res.json({ message: 'Notification sent to all users' });
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

const Roadmap = require('../models/Roadmap');

// --- Roadmap Control ---
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

module.exports = router;
