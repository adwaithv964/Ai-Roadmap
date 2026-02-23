const mongoose = require('mongoose');

// Subdocument schema for a single step's progress
const stepProgressSchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: String, // Storing as 'YYYY-MM-DD' for heatmap
    default: null,
  }
}, { _id: false });

// Subdocument schema for notifications
const notificationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  icon: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

// Subdocument schema for XP history entries
const xpHistorySchema = new mongoose.Schema({
  date: { type: String, required: true },   // 'YYYY-MM-DD'
  xpEarned: { type: Number, required: true },
  reason: { type: String, default: '' },
}, { _id: false });


const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'super_admin', 'domain_expert', 'support'],
    default: 'user'
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  // Progress is now embedded within the user document for efficiency
  // Structure: { "frontend": { "html-b-1": { completed: true, ... } } }
  progress: {
    type: Map,
    of: {
      type: Map,
      of: stepProgressSchema,
    },
    default: {}
  },
  // ── Adaptive Roadmap Engine Fields ─────────────────────────
  timeSpent: {
    type: Map,
    of: {
      type: Map,
      of: Number, // seconds spent per module
    },
    default: {}
  },
  quizScores: {
    type: Map,
    of: {
      type: Map,
      of: Number, // percentage score per module
    },
    default: {}
  },
  roadmapAdaptations: {
    type: Map,
    of: {
      addedModules: { type: Array, default: [] },
      skippedSteps: { type: Array, default: [] }
    },
    default: {}
  },
  // ───────────────────────────────────────────────────────────
  notifications: {
    type: [notificationSchema],
    default: []
  },
  // ── Gamification fields ───────────────────────────────
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },
  // Date of last XP-earning activity (YYYY-MM-DD)
  lastActivityDate: {
    type: String,
    default: null,
  },
  // Capped at last 30 entries
  xpHistory: {
    type: [xpHistorySchema],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);