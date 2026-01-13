const admin = require('firebase-admin');

const initializeFirebase = () => {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase Admin SDK Initialized...');
        }
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
        process.exit(1);
    }
};

module.exports = initializeFirebase;
