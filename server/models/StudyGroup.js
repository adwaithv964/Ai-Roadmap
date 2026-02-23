const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const studyGroupSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 80, trim: true },
    description: { type: String, required: true, maxlength: 500, trim: true },
    domainId: { type: String, required: true },
    domainTitle: { type: String, required: true },
    createdByUid: { type: String, required: true },
    createdByEmail: { type: String, required: true },
    members: { type: [memberSchema], default: [] },
    maxMembers: { type: Number, default: 20, min: 2, max: 100 },
    isPublic: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
}, { timestamps: true });

studyGroupSchema.index({ domainId: 1 });
studyGroupSchema.index({ createdAt: -1 });

module.exports = mongoose.model('StudyGroup', studyGroupSchema);
