require('dotenv').config({ path: '../Backend_test/.env' });
const mongoose = require('mongoose');
const Roadmap = require('../Backend_test/models/Roadmap');

async function check() {
    try {
        console.log('Connecting...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const count = await Roadmap.countDocuments();
        console.log(`Roadmap Count: ${count}`);

        await mongoose.disconnect();
        console.log('Disconnected.');
    } catch (error) {
        console.error('Check error:', error);
    }
}

check();
