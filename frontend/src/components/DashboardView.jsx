import React, { useMemo } from 'react';
import ActivityHeatmap from './ActivityHeatmap';

const DashboardView = ({ roadmapData, progress, onBackToRoadmap }) => {
    const totalSteps = useMemo(() => roadmapData.stages.reduce((acc, stage) => acc + stage.modules.reduce((modAcc, mod) => modAcc + mod.steps.length, 0), 0), [roadmapData]);
    const completedSteps = Object.values(progress).filter(p => p.completed).length;
    const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    const activityData = useMemo(() => {
        const data = {};
        Object.values(progress).forEach(p => {
            if (p.completed && p.completedDate) {
                data[p.completedDate] = (data[p.completedDate] || 0) + 1;
            }
        });
        return data;
    }, [progress]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                <button onClick={onBackToRoadmap} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Roadmap
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold">Total Progress</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">{Math.round(progressPercentage)}%</p>
                    <p className="text-sm text-gray-500 mt-1">{completedSteps} of {totalSteps} steps completed</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold">Current Streak</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">🔥 3 Days</p>
                    <p className="text-sm text-gray-500 mt-1">Keep it up!</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-l-4 border-purple-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase font-bold">Badges Earned</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">🏆 5</p>
                    <p className="text-sm text-gray-500 mt-1">Latest: "HTML Hero"</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Your Learning Activity</h3>
                <p className="text-sm text-gray-500 mb-4">Activity from the last year.</p>
                <div className="overflow-x-auto">
                    <ActivityHeatmap activityData={activityData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
