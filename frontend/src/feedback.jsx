import React, { useState } from 'react';


const FeedbackPage = ({ onBackToHome }) => {
    const [rating, setRating] = useState(0);
    const [category, setCategory] = useState('general');
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this data to a server
        console.log({ rating, category, feedback, email });
        setSubmitted(true);
    };

    return (
        <div className="relative w-screen min-h-screen overflow-y-auto text-white bg-gray-900">
            {/* Animated Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100 z-10"
                style={{ backgroundImage: `url('https://placehold.co/1920x1080/383838/ffffff?text=Feedback')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 w-full min-h-screen p-8 md:p-16 flex flex-col">
                <header className="flex justify-between items-center animate-fade-in-up mb-12">
                    <h1 className="text-2xl font-bold transition-colors hover:text-yellow-400">AI Learning Roadmap</h1>
                    <button onClick={onBackToHome} className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
                        Back to Home
                    </button>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
                        {submitted ? (
                            <div className="text-center animate-fade-in-up">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-4">Thank You!</h2>
                                <p className="text-gray-300">Your feedback has been received. We appreciate you taking the time to help us improve.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-6 bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                                <h2 className="text-3xl font-bold text-center mb-6">Share Your Feedback</h2>
                                <div>
                                    <label className="block text-gray-300 mb-2">How would you rate your experience?</label>
                                    <div className="flex justify-center text-3xl cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-300'}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-gray-300 mb-2">Category</label>
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="general">General Feedback</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="ui">UI/UX Suggestion</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="feedback" className="block text-gray-300 mb-2">Your Feedback</label>
                                    <textarea
                                        id="feedback"
                                        rows="4"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Tell us what you think or how we can improve..."
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-2">Email (Optional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors disabled:opacity-50"
                                    //disabled={!feedback || rating === 0}
                                >
                                    Submit Feedback
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeedbackPage;
