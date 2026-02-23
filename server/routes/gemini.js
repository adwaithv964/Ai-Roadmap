const express = require('express');
const router = express.Router();
const { getRecommendations, getChatResponse, getSmartResources, getSkillGapAnalysis, getAIMiniTasks, generateResume } = require('../controllers/geminiController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/gemini/recommendations
// @desc    Proxy for Gemini AI Resource Recommender
// @access  Private
router.post('/recommendations', getRecommendations);

// @route   POST api/gemini/smart-resources
// @desc    Ranked, difficulty-aware resource recommendations
// @access  Private
router.post('/smart-resources', getSmartResources);

// @route   POST api/gemini/chat
// @desc    Proxy for Gemini AI Chatbot
// @access  Private
router.post('/chat', getChatResponse);

// @route   POST api/gemini/skill-gap
// @desc    AI skill gap analysis for a target role
// @access  Private
router.post('/skill-gap', getSkillGapAnalysis);

// @route   POST api/gemini/mini-tasks
// @desc    AI-enhanced mini tasks for weekly planner
// @access  Private
router.post('/mini-tasks', getAIMiniTasks);

// @route   POST api/gemini/resume-generate
// @desc    Generate resume + portfolio project suggestions
// @access  Private
router.post('/resume-generate', generateResume);

module.exports = router;
