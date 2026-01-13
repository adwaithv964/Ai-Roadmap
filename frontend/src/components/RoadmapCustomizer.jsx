import React, { useState } from 'react';
import { roadmaps } from '../data/roadmaps';

const RoadmapCustomizer = ({ domainId, onGenerateRoadmap }) => {
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
        <div className="p-8 max-w-3xl mx-auto">
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
