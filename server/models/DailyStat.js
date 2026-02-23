const mongoose = require('mongoose');

const DailyStatSchema = new mongoose.Schema({
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true,
        unique: true
    },
    newUsers: {
        type: Number,
        default: 0
    },
    activeUsers: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('DailyStat', DailyStatSchema);
