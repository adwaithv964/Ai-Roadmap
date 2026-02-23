require('dotenv').config({ path: '../Backend_test/.env' });
const mongoose = require('mongoose');
const User = require('../Backend_test/models/User');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const testUser = {
            firebaseUid: 'test-user-' + Date.now(),
            email: 'testuser@example.com',
            role: 'user',
            isBanned: false,
            createdAt: new Date()
        };

        await User.create(testUser);
        console.log('Test user created:', testUser.email);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
