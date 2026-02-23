require('dotenv').config({ path: '../Backend_test/.env' });
const mongoose = require('mongoose');
const Roadmap = require('../Backend_test/models/Roadmap');

async function check() {
    try {
        console.log('Connecting...');
        await mongoose.connect(process.env.MONGO_URI);

        const count = await Roadmap.countDocuments();
        console.log(`Total Roadmaps: ${count}`);

        const sample = await Roadmap.findOne({ slug: 'frontend' });
        console.log('Sample (Frontend):', sample ? 'Found' : 'Not Found');
        if (sample) {
            console.log(' - Slug:', sample.slug);
            console.log(' - Category:', sample.category);
            console.log(' - Title:', sample.title);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

check();
