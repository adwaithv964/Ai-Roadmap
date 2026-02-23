const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// @route   POST /api/feedback
// @desc    Submit new feedback
// @access  Public
router.post('/', feedbackController.createFeedback);

module.exports = router;
