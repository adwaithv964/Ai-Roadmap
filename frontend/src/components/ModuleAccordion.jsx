import React, { useState } from 'react';
import StepAccordion from './StepAccordion';

const ModuleAccordion = ({ module, progress, onToggleStep, onShowResources, onAskTutor, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const totalSteps = module.steps.length;
    const completedSteps = module.steps.filter(step => progress[step.id]?.completed).length;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
            <div className="p-4 flex items-center justify-between">
                <div className="flex-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <h4 className="font-bold text-lg">{module.title}</h4>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onShowResources(module.title)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                        title={`AI Recommendations for ${module.title}`}
                    >
                        🤖
                    </button>
                    <span className="text-sm text-gray-500">{completedSteps} / {totalSteps} steps</span>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
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
