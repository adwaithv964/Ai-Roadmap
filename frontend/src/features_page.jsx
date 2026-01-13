import React from 'react';

const FeaturesPage = ({ onBackToHome }) => {
    const features = {
        core: [
            { name: "Domain Selection & Roadmap Generation", description: "Personalized learning path generation." },
            { name: "Search & Filters", description: "Locate topics efficiently." },
            { name: "Progress Management", description: "Check/mark completion and save state." },
            { name: "Export as PDF", description: "Offline sharing and saving." },
            { name: "Visual Progress Bar", description: "Shows learning advancement clearly." },
        ],
        aiDriven: [
            { name: "AI Resource Recommender", description: "Suggests best free tutorials, docs, and videos per topic." },
            { name: "AI Chatbot Tutor", description: "Offers contextual learning support and instant explanations." },
        ],
        ui: [
            { name: "Dark/Light Mode", description: "Improves accessibility and user comfort." },
            { name: "Notifications & Popups", description: "Encourages consistency through milestone alerts." },
            { name: "Personal Learning Dashboard", description: "Displays analytics like daily activity, course completion, etc." },
        ],
        career: [
            { name: "Mini-Project Suggestions", description: "Real-world project ideas for each skill level." },
            { name: "Job Skill Tagging", description: "Tags each completed topic with relevant job skills." },
        ]
    };

    const FeatureSection = ({ title, number, items }) => (
        <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b border-yellow-400/30 pb-3">{number}. {title}</h2>
            <div className="space-y-6">
                {items.map(item => (
                    <div key={item.name} className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="font-bold text-lg text-yellow-400">{item.name}</h3>
                        <p className="text-gray-300">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );


    return (
        <div className="relative w-screen min-h-screen overflow-y-auto text-white bg-gray-900">
            {/* Animated Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat opacity-100 z-10"
                style={{
                    backgroundImage: `url('https://placehold.co/1920x1080/2d2d2d/ffffff?text=Features')`,
                    backgroundSize: '150%',
                    backgroundPosition: 'center -30%'
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 w-full min-h-screen p-8 md:p-16 flex flex-col">
                <header className="flex justify-between items-center animate-fade-in-up mb-12">
                    <a href="#root" className="text-2xl font-bold transition-colors hover:text-yellow-400">AI Learning Roadmap</a>
                    <button onClick={onBackToHome} className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">
                        Back to Home
                    </button>
                </header>

                <main className="flex-grow flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <FeatureSection title="Core Features" number={1} items={features.core} />
                        <FeatureSection title="AI-Driven Features" number={2} items={features.aiDriven} />
                        <FeatureSection title="User Engagement & Interface" number={3} items={features.ui} />
                        <FeatureSection title="Practical Applications & Career Focus" number={4} items={features.career} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeaturesPage;

