import React, { useMemo } from 'react';
import ModuleAccordion from './ModuleAccordion';

const RoadmapView = ({ roadmapData, progress, onToggleStep, onGoToDashboard, onShowResources, onAskTutor, onOpenPlanner }) => {
    const totalSteps = useMemo(() => roadmapData.stages.reduce((acc, stage) => acc + stage.modules.reduce((modAcc, mod) => modAcc + mod.steps.length, 0), 0), [roadmapData]);
    const completedSteps = Object.values(progress).filter(p => p.completed).length;
    const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <div className="flex gap-2">
                    <button onClick={onGoToDashboard} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Dashboard
                    </button>
                    {onOpenPlanner && (
                        <button
                            onClick={onOpenPlanner}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:scale-105 active:scale-100 font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Weekly Plan
                        </button>
                    )}
                    <button onClick={() => alert("PDF export is a feature coming soon!")} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Your Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="text-right mt-1 text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</p>
            </div>

            {roadmapData.stages.map((stage, stageIndex) => (
                <div key={stageIndex} className="mb-8 relative pl-8">
                    <div className="absolute left-0 h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="absolute left-[-9px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">{stage.title}</h3>
                    <div className="space-y-3">
                        {stage.modules.map((module) => (
                            <ModuleAccordion
                                key={module.id}
                                module={module}
                                progress={progress}
                                onToggleStep={onToggleStep}
                                onShowResources={onShowResources}
                                onAskTutor={onAskTutor}
                            />
                        ))}
                    </div>
                    {stage.project && (
                        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 rounded-r-lg text-yellow-800 dark:text-yellow-200">
                            <p className="font-bold">💡 Mini-Project Suggestion:</p>
                            <p>{stage.project}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoadmapView;
