const express = require('express');
const router = express.Router();
const CommunityPost = require('../models/CommunityPost');
const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// All community routes require authentication
router.use(authMiddleware);

// ─── FEED ───────────────────────────────────────────────────────────────────

// GET /api/community/feed?page=1&limit=20
router.get('/feed', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await CommunityPost.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await CommunityPost.countDocuments();

        res.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        console.error('feed error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── POSTS ───────────────────────────────────────────────────────────────────

// POST /api/community/posts — create a post/share
router.post('/posts', async (req, res) => {
    try {
        const { type, content, domainId, domainTitle, roadmapTitle, progressPercent, completedSteps, totalSteps } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const post = await CommunityPost.create({
            authorUid: req.user.firebaseUid,
            authorEmail: req.user.email,
            type: type || 'post',
            content: content.trim(),
            domainId, domainTitle, roadmapTitle,
            progressPercent, completedSteps, totalSteps
        });

        res.status(201).json(post);
    } catch (err) {
        console.error('create post error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/community/posts/:id/like — toggle like
router.post('/posts/:id/like', async (req, res) => {
    try {
        const uid = req.user.firebaseUid;
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const idx = post.likes.indexOf(uid);
        if (idx === -1) {
            post.likes.push(uid);
        } else {
            post.likes.splice(idx, 1);
        }
        await post.save();
        res.json({ likes: post.likes, liked: idx === -1 });
    } catch (err) {
        console.error('like error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/community/posts/:id/comment
router.post('/posts/:id/comment', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) return res.status(400).json({ message: 'Comment text is required' });

        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = {
            uid: req.user.firebaseUid,
            email: req.user.email,
            text: text.trim().slice(0, 500),
        };
        post.comments.push(comment);
        await post.save();

        res.status(201).json(post.comments[post.comments.length - 1]);
    } catch (err) {
        console.error('comment error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/community/posts/:id
router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.authorUid !== req.user.firebaseUid && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await CommunityPost.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error('delete post error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── STUDY GROUPS ────────────────────────────────────────────────────────────

// GET /api/community/groups
router.get('/groups', async (req, res) => {
    try {
        const groups = await StudyGroup.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .lean();
        res.json(groups);
    } catch (err) {
        console.error('groups list error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/community/groups — create a group
router.post('/groups', async (req, res) => {
    try {
        const { name, description, domainId, domainTitle, maxMembers, isPublic, tags } = req.body;
        if (!name || !description || !domainId || !domainTitle) {
            return res.status(400).json({ message: 'name, description, domainId, domainTitle are required' });
        }

        const group = await StudyGroup.create({
            name: name.trim(),
            description: description.trim(),
            domainId, domainTitle,
            createdByUid: req.user.firebaseUid,
            createdByEmail: req.user.email,
            members: [{ uid: req.user.firebaseUid, email: req.user.email }],
            maxMembers: maxMembers || 20,
            isPublic: isPublic !== false,
            tags: tags || []
        });

        res.status(201).json(group);
    } catch (err) {
        console.error('create group error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/community/groups/:id/join
router.post('/groups/:id/join', async (req, res) => {
    try {
        const group = await StudyGroup.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const alreadyMember = group.members.some(m => m.uid === req.user.firebaseUid);
        if (alreadyMember) return res.status(400).json({ message: 'Already a member' });

        if (group.members.length >= group.maxMembers) {
            return res.status(400).json({ message: 'Group is full' });
        }

        group.members.push({ uid: req.user.firebaseUid, email: req.user.email });
        await group.save();
        res.json(group);
    } catch (err) {
        console.error('join group error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/community/groups/:id/leave
router.post('/groups/:id/leave', async (req, res) => {
    try {
        const group = await StudyGroup.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const idx = group.members.findIndex(m => m.uid === req.user.firebaseUid);
        if (idx === -1) return res.status(400).json({ message: 'Not a member' });

        group.members.splice(idx, 1);
        await group.save();
        res.json(group);
    } catch (err) {
        console.error('leave group error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────

// GET /api/community/leaderboard
// Derives leaderboard from CommunityPost shares (aggregated progress data)
router.get('/leaderboard', async (req, res) => {
    try {
        // Get the latest shared_roadmap post per user (best progress)
        const pipeline = [
            { $match: { type: 'shared_roadmap', progressPercent: { $ne: null } } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: '$authorUid',
                    email: { $first: '$authorEmail' },
                    domainTitle: { $first: '$domainTitle' },
                    progressPercent: { $max: '$progressPercent' },
                    completedSteps: { $max: '$completedSteps' },
                }
            },
            { $sort: { completedSteps: -1, progressPercent: -1 } },
            { $limit: 50 }
        ];

        const leaderboard = await CommunityPost.aggregate(pipeline);
        res.json(leaderboard);
    } catch (err) {
        console.error('leaderboard error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
