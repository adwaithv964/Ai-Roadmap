const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Beta', 'Deprecated', 'Coming Soon'],
        default: 'Active'
    },
    graphData: {
        type: Object, // Store react flow { nodes: [], edges: [] }
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
