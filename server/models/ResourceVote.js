const mongoose = require('mongoose');

const resourceVoteSchema = new mongoose.Schema({
    // Slugified topic title — groups votes by topic
    topicKey: {
        type: String,
        required: true,
        index: true,
    },
    // The resource URL is the unique identifier for a resource within a topic
    resourceUrl: {
        type: String,
        required: true,
    },
    resourceTitle: {
        type: String,
        default: '',
    },
    helpful: {
        type: Number,
        default: 0,
    },
    notHelpful: {
        type: Number,
        default: 0,
    },
    // Map of firebaseUid → 'up' | 'down' — prevents double-voting
    voterUids: {
        type: Map,
        of: String, // 'up' or 'down'
        default: {},
    },
}, { timestamps: true });

// Compound unique index: one vote-document per url per topic
resourceVoteSchema.index({ topicKey: 1, resourceUrl: 1 }, { unique: true });

// Virtual: success rate (0-1)
resourceVoteSchema.virtual('successRate').get(function () {
    const total = this.helpful + this.notHelpful;
    return total === 0 ? null : this.helpful / total;
});

resourceVoteSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ResourceVote', resourceVoteSchema);
