require('dotenv').config({ path: __dirname + '/../.env' });
const fs = require('fs');

const run = async () => {
    try {
        const initializeFirebase = require('../config/firebase');
        initializeFirebase();
        const admin = require('firebase-admin');

        let output = '';
        try {
            const user = await admin.auth().getUserByEmail('admin@ai-roadmap.com');
            output += `Found user: ${user.uid}\n`;
        } catch (e) {
            output += `Error finding user: ${e.code}\n`;
            if (e.code === 'auth/user-not-found') {
                const newUser = await admin.auth().createUser({
                    email: 'admin@ai-roadmap.com',
                    password: 'admin123',
                    displayName: 'System Admin'
                });
                output += `Created user: ${newUser.uid}\n`;
            }
        }

        fs.writeFileSync(__dirname + '/testOutput.txt', output);
        console.log('Done!');
        process.exit(0);
    } catch (err) {
        fs.writeFileSync(__dirname + '/testOutput.txt', 'ERR: ' + err.message);
        process.exit(1);
    }
};

run();
