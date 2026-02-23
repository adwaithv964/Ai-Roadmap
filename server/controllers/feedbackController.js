const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
    try {
        const { rating, category, feedback, email } = req.body;

        // Basic validation
        if (!rating || !category || !feedback) {
            return res.status(400).json({ message: 'Please provide rating, category, and feedback content.' });
        }

        const newFeedback = new Feedback({
            rating,
            category,
            feedback,
            email
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully',
            data: savedFeedback
        });
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: 'Server error while submitting feedback.' });
    }
};
