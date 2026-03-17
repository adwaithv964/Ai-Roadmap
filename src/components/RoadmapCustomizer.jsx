import React, { useState } from 'react';
import { roadmaps } from '../data/roadmaps';

const RoadmapCustomizer = ({ domainId, onGenerateRoadmap, onBack }) => {
    const domainData = roadmaps[domainId] || { title: 'Unknown', stages: [] };
    const [level, setLevel] = useState('beginner');
    // const [selectedSpecs, setSelectedSpecs] = useState([]); // This state is available for future feature expansion

    const handleGenerate = () => {
        // NOTE: Customization logic based on 'level' is not implemented yet.
        // This function currently generates the default roadmap for the selected domain.
        const generatedRoadmap = {
            title: domainData.title,
            stages: [...(domainData.stages || [])]
        };
        onGenerateRoadmap(generatedRoadmap);
    }

    return (
        <div className="p-4 sm:p-8 max-w-3xl mx-auto">
            {onBack && (
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Domains
                </button>
            )}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4">What's your experience level?</h3>
                <div className="flex space-x-4">
                    <button onClick={() => setLevel('beginner')} className={`px-4 py-2 rounded-full font-semibold w-full transition-colors ${level === 'beginner' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        🌱 I'm a Beginner
                    </button>
                    <button onClick={() => setLevel('intermediate')} className={`px-4 py-2 rounded-full font-semibold w-full transition-colors ${level === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        🚀 I have some experience
                    </button>
                </div>
            </div>
            <button onClick={handleGenerate} className="w-full bg-green-500 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors">
                Generate My Personalized Roadmap
            </button>
        </div>
    );
};

export default RoadmapCustomizer;
