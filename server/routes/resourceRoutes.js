const express = require('express');
const router = express.Router();
const ResourceVote = require('../models/ResourceVote');
const authMiddleware = require('../middleware/authMiddleware');

// Helper: slugify topic key
const toKey = (title) => title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

// All routes require auth
router.use(authMiddleware);

// ─── GET /api/resources/votes?topic=<topicTitle> ──────────────────────────────
// Returns vote counts for every resource URL under a topic.
// Response: [ { resourceUrl, resourceTitle, helpful, notHelpful, successRate, userVote } ]
router.get('/votes', async (req, res) => {
    try {
        const { topic } = req.query;
        if (!topic) return res.status(400).json({ message: 'topic query param required' });

        const topicKey = toKey(topic);
        const uid = req.user.firebaseUid;

        const docs = await ResourceVote.find({ topicKey }).lean({ virtuals: true });

        const result = docs.map(doc => {
            const total = doc.helpful + doc.notHelpful;
            return {
                resourceUrl: doc.resourceUrl,
                resourceTitle: doc.resourceTitle,
                helpful: doc.helpful,
                notHelpful: doc.notHelpful,
                successRate: total === 0 ? null : doc.helpful / total,
                totalVotes: total,
                userVote: doc.voterUids?.[uid] || null, // 'up' | 'down' | null
            };
        });

        res.json(result);
    } catch (err) {
        console.error('GET /votes error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── POST /api/resources/vote ─────────────────────────────────────────────────
// Body: { topic, resourceUrl, resourceTitle, vote: 'up' | 'down' }
// If the user already cast the same vote → removes it (toggle off).
// If they cast the opposite vote → switches it.
router.post('/vote', async (req, res) => {
    try {
        const { topic, resourceUrl, resourceTitle, vote } = req.body;
        if (!topic || !resourceUrl || !['up', 'down'].includes(vote)) {
            return res.status(400).json({ message: 'topic, resourceUrl, and vote (up|down) are required' });
        }

        const topicKey = toKey(topic);
        const uid = req.user.firebaseUid;

        // Upsert the vote document for this (topic, url)
        let doc = await ResourceVote.findOne({ topicKey, resourceUrl });
        if (!doc) {
            doc = new ResourceVote({ topicKey, resourceUrl, resourceTitle: resourceTitle || '' });
        }

        const previousVote = doc.voterUids.get(uid) || null;

        if (previousVote === vote) {
            // Toggle OFF — remove vote
            doc.voterUids.delete(uid);
            if (vote === 'up') doc.helpful = Math.max(0, doc.helpful - 1);
            else doc.notHelpful = Math.max(0, doc.notHelpful - 1);
        } else {
            // Undo old vote if exists
            if (previousVote === 'up') doc.helpful = Math.max(0, doc.helpful - 1);
            if (previousVote === 'down') doc.notHelpful = Math.max(0, doc.notHelpful - 1);

            // Apply new vote
            doc.voterUids.set(uid, vote);
            if (vote === 'up') doc.helpful += 1;
            else doc.notHelpful += 1;
        }

        await doc.save();

        const total = doc.helpful + doc.notHelpful;
        res.json({
            resourceUrl,
            helpful: doc.helpful,
            notHelpful: doc.notHelpful,
            successRate: total === 0 ? null : doc.helpful / total,
            totalVotes: total,
            userVote: doc.voterUids.get(uid) || null,
        });
    } catch (err) {
        console.error('POST /vote error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
