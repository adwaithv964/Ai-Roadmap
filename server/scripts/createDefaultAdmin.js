console.log('--- Starting Admin Script ---');
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const User = require('../models/User');

const initializeFirebase = require('../config/firebase');

initializeFirebase();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@ai-roadmap.com';
        const password = 'admin123';

        let firebaseUser;
        try {
            firebaseUser = await admin.auth().getUserByEmail(email);
            console.log('Firebase user already exists:', firebaseUser.uid);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                firebaseUser = await admin.auth().createUser({
                    email: email,
                    password: password,
                    displayName: 'System Admin',
                });
                console.log('Created Firebase user:', firebaseUser.uid);
            } else {
                throw error;
            }
        }

        const user = await User.findOneAndUpdate(
            { firebaseUid: firebaseUser.uid },
            {
                firebaseUid: firebaseUser.uid,
                email: email,
                role: 'super_admin',
                isBanned: false
            },
            { new: true, upsert: true }
        );

        console.log('Default Admin configured in MongoDB:', user.email, 'Role:', user.role);
    } catch (err) {
        console.error('Error creating admin:', err);
    }
};

module.exports = createAdmin;
