const mongoose = require('mongoose');

const suggestedResourceSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['video', 'article', 'course', 'documentation'],
        default: 'video'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    suggestedByAI: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SuggestedResource', suggestedResourceSchema);
