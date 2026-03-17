const mongoose = require('mongoose');

const platformSettingsSchema = new mongoose.Schema({
    // Singleton key so we always find/update the same document
    _id: { type: String, default: 'singleton' },
    maintenanceMode: { type: Boolean, default: false },
    allowRegistrations: { type: Boolean, default: true },
    xpMultiplier: { type: Number, default: 1.0, min: 1.0, max: 5.0 },
    streakDecayDays: { type: Number, default: 2, min: 1, max: 7 },
    // Adaptive thresholds
    remedialThreshold: { type: Number, default: 40 },
    fastTrackThreshold: { type: Number, default: 90 },
}, { timestamps: true });

module.exports = mongoose.model('PlatformSettings', platformSettingsSchema);
