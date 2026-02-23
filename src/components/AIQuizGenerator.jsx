import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

const AIQuizGenerator = ({ module, onClose, onQuizComplete }) => {
    const [status, setStatus] = useState('intro'); // intro, loading, question, result
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);

    const handleStartQuiz = async () => {
        setStatus('loading');
        setError(null);
        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/adaptive/generate-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ module })
            });

            if (!res.ok) {
                throw new Error("Failed to generate quiz");
            }

            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                setQuestions(data);
                setStatus('question');
            } else {
                throw new Error("Invalid format received from AI");
            }

        } catch (err) {
            console.error(err);
            setError("Oops, we couldn't generate a quiz right now. Please try again later.");
            setStatus('intro'); // Go back to intro so they can try again or close
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Calculate Score
            let correctCount = 0;
            questions.forEach((q, index) => {
                if (Number(userAnswers[index]) === Number(q.correctIndex)) {
                    correctCount++;
                }
            });
            const finalScore = Math.round((correctCount / questions.length) * 100);
            setScore(finalScore);
            setStatus('result');
        }
    };

    const handleFinish = () => {
        if (onQuizComplete && score !== null) {
            onQuizComplete(module.id, score);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" style={{ opacity: 1, transform: 'scale(1)' }}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">🧠 Quiz for {module.title}</h3>
                    <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl leading-none">&times;</button>
                </div>

                <div className="py-6">
                    {/* INTRO */}
                    {status === 'intro' && (
                        <div className="text-center">
                            {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-300 mb-4">{error}</div>}
                            <p className="text-2xl mb-4">Test Your Knowledge!</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">Take a quick AI-generated quiz to solidify your understanding of this module.</p>
                            <button onClick={handleStartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                                Generate & Start Quiz
                            </button>
                        </div>
                    )}

                    {/* LOADING */}
                    {status === 'loading' && (
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">AI is analyzing the module and carefully crafting questions...</p>
                        </div>
                    )}

                    {/* QUESTION */}
                    {status === 'question' && questions.length > 0 && (
                        <div>
                            <div className="mb-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <div className="w-1/2 bg-gray-200 dark:bg-gray-700 h-2 rounded-full ml-4">
                                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
                                </div>
                            </div>

                            <h4 className="text-lg font-semibold mb-6">
                                {questions[currentQuestionIndex].question}
                            </h4>

                            <div className="space-y-3">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all ${userAnswers[currentQuestionIndex] === index
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500/50'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-start">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${userAnswers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {userAnswers[currentQuestionIndex] === index && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={userAnswers[currentQuestionIndex] === undefined}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* RESULT */}
                    {status === 'result' && (
                        <div className="text-center">
                            <p className="text-3xl font-bold mb-2">Quiz Complete!</p>
                            <div className="mb-6 relative inline-block">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200 dark:text-gray-700" />
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent"
                                        strokeDasharray={2 * Math.PI * 56}
                                        strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)}
                                        className={`transition-all duration-1000 ${score >= 80 ? 'text-green-500' : score < 60 ? 'text-red-500' : 'text-yellow-500'}`}
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className={`text-4xl font-extrabold ${score >= 80 ? 'text-green-500' : score < 60 ? 'text-red-500' : 'text-yellow-500'}`}>{score}%</span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                {score >= 80 ? "Excellent work! You've mastered this topic." : score < 60 ? "Looks like you might need to review this material. We'll adjust your roadmap to help!" : "Good job! A little more practice and you'll be an expert."}
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700 mb-8 text-left max-h-60 overflow-y-auto">
                                <h4 className="font-bold mb-4 text-center">Review Answers</h4>
                                {questions.map((q, idx) => {
                                    const isCorrect = userAnswers[idx] === q.correctIndex;
                                    return (
                                        <div key={idx} className="mb-4 pb-4 border-b dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                                            <p className="font-medium text-sm mb-2">{idx + 1}. {q.question}</p>
                                            <div className="flex gap-2 items-start mt-1">
                                                <span className="mt-0.5">{isCorrect ? '✅' : '❌'}</span>
                                                <p className={`text-sm ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    Your answer: {q.options[userAnswers[idx]]}
                                                </p>
                                            </div>
                                            {!isCorrect && (
                                                <div className="flex gap-2 items-start mt-1">
                                                    <span className="mt-0.5">💡</span>
                                                    <p className="text-sm text-green-600 dark:text-green-400">
                                                        Correct: {q.options[q.correctIndex]}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500 mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                                <strong>Explanation: </strong>{q.explanation}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                            <button onClick={handleFinish} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto">
                                Apply Score & Return to Roadmap
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIQuizGenerator;
