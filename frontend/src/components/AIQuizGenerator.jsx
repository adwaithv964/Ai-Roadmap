import React from 'react';

const AIQuizGenerator = ({ module, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">🧠 Quiz for {module.title}</h3>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl leading-none">&times;</button>
                </div>
                <div className="text-center py-10">
                    <p className="text-2xl mb-4">Coming Soon!</p>
                    <p className="text-gray-600 dark:text-gray-400">AI-powered quizzes to test your knowledge are on the way. Stay tuned!</p>
                </div>
            </div>
        </div>
    );
};

export default AIQuizGenerator;
