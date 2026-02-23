const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
}, { _id: true });

const communityPostSchema = new mongoose.Schema({
    authorUid: { type: String, required: true, index: true },
    authorEmail: { type: String, required: true },
    type: {
        type: String,
        enum: ['shared_roadmap', 'post'],
        default: 'post'
    },
    // Roadmap snapshot (only for type = shared_roadmap)
    domainId: { type: String, default: null },
    domainTitle: { type: String, default: null },
    roadmapTitle: { type: String, default: null },
    progressPercent: { type: Number, min: 0, max: 100, default: null },
    completedSteps: { type: Number, default: null },
    totalSteps: { type: Number, default: null },

    // Main post content
    content: { type: String, required: true, maxlength: 1000 },

    // Social interactions
    likes: { type: [String], default: [] }, // array of UIDs who liked
    comments: { type: [commentSchema], default: [] },
}, { timestamps: true });

// Index for feed retrieval (newest first)
communityPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('CommunityPost', communityPostSchema);
