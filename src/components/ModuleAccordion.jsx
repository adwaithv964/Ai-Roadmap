import React, { useState } from 'react';
import StepAccordion from './StepAccordion';

const ModuleAccordion = ({ module, progress, onToggleStep, onShowResources, onAskTutor, onGenerateQuiz, onTimeSpent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openTime, setOpenTime] = useState(null);
    const totalSteps = module.steps.length;
    const completedSteps = module.steps.filter(step => progress[step.id]?.completed).length;

    const handleToggle = () => {
        if (!isOpen) {
            // Opening: start timer
            setOpenTime(Date.now());
        } else {
            // Closing: calculate time spent and emit
            if (openTime && onTimeSpent) {
                const timeSpentSeconds = Math.round((Date.now() - openTime) / 1000);
                onTimeSpent(module.id, timeSpentSeconds);
            }
            setOpenTime(null);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
            <div className="p-4 flex items-center justify-between">
                <div className="flex-1 cursor-pointer" onClick={handleToggle}>
                    <h4 className="font-bold text-lg">{module.title}</h4>
                </div>
                <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                    {!module.steps[0]?.isSkipped && onGenerateQuiz && (
                        <button
                            onClick={() => onGenerateQuiz(module)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-bold text-blue-500"
                            title={`Take Quiz for ${module.title}`}
                        >
                            🧠 Quiz
                        </button>
                    )}
                    <button
                        onClick={() => onShowResources(module.title)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        title={`AI Recommendations for ${module.title}`}
                    >
                        🤖
                    </button>
                    <span className="hidden sm:inline text-sm text-gray-500 whitespace-nowrap">{completedSteps} / {totalSteps} steps</span>
                    <button onClick={handleToggle} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="border-t dark:border-gray-700 p-4 space-y-2">
                    {module.steps.map((step) => (
                        <StepAccordion
                            key={step.id}
                            step={step}
                            isCompleted={progress[step.id]?.completed}
                            onToggle={() => onToggleStep(step, module.title)}
                            onAskTutor={onAskTutor}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default ModuleAccordion;
