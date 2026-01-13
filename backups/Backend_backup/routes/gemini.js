const express = require('express');
const router = express.Router();
const { getRecommendations, getChatResponse } = require('../controllers/geminiController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/gemini/recommendations
// @desc    Proxy for Gemini AI Resource Recommender
// @access  Private
router.post('/recommendations', authMiddleware, getRecommendations);

// @route   POST api/gemi   ni/chat
// @desc    Proxy for Gemini AI Chatbot
// @access  Private
router.post('/chat', authMiddleware, getChatResponse);

module.exports = router;
