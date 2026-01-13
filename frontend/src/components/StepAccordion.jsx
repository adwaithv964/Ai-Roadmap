import React, { useState } from 'react';

const StepAccordion = ({ step, isCompleted, onToggle, onAskTutor }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`rounded-lg transition-all duration-300 ${isCompleted ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
            <div className="p-3 flex items-center justify-between group">
                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onToggle(step)}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 border-2 flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-400 group-hover:border-blue-500'}`}>
                        {isCompleted && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`transition-colors ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>{step.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => onAskTutor(`Can you explain "${step.title}"?`)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" title="Ask AI Tutor">💬</button>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-600/50">
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    {step.example && (
                        <div className="mt-3">
                            <h5 className="text-sm font-bold mb-1">Example:</h5>
                            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto">
                                <code>{step.example}</code>
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default StepAccordion;
