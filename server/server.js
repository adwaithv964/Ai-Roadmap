require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const initializeFirebase = require('./config/firebase');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Initialize Firebase Admin SDK
initializeFirebase();

// Core Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing

// --- API Routes ---
app.get('/api', (req, res) => res.send('API is running...')); // Health check route
app.use('/api/progress', require('./routes/progress'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/gemini', require('./routes/gemini'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/roadmaps', require('./routes/roadmapRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// --- Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));