const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sync user from Firebase to MongoDB
router.post('/sync', async (req, res) => {
    try {
        const { firebaseUid, email } = req.body;

        if (!firebaseUid || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Upsert user: create if not exists, update if exists
        const user = await User.findOneAndUpdate(
            { firebaseUid },
            {
                firebaseUid,
                email,
                // Only set default role if document is new
                $setOnInsert: { role: 'user', isBanned: false }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(user);
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
