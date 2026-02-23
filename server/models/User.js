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
    enum: ['user', 'admin'],
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
  notifications: {
    type: [notificationSchema],
    default: []
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);