const express = require('express');
const router = express.Router();
const { getProgress, updateProgress } = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/progress/:domainId
// @desc    Get user progress for a specific domain
// @access  Private
router.get('/:domainId', authMiddleware, getProgress);

// @route   POST api/progress/:domainId
// @desc    Update user progress for a specific domain
// @access  Private
router.post('/:domainId', authMiddleware, updateProgress);

module.exports = router;
