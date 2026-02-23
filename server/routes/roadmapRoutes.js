const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// --- Public Routes ---

// GET /api/roadmaps - Fetch all roadmaps
router.get('/', async (req, res) => {
    try {
        const roadmaps = await Roadmap.find().sort({ title: 1 });
        res.json(roadmaps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
