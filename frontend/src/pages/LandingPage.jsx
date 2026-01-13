import React, { useState, useEffect } from 'react';
import { landingCategories } from '../data/constants';

const LandingPage = ({ onStart, onGoToFeatures, onGoToAbout, onGoToFeedback }) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                handleNextCategory();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [activeCategoryIndex, isAnimating]);

    const handleNextCategory = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setActiveCategoryIndex((prev) => (prev + 1) % landingCategories.length);
            setIsAnimating(false);
        }, 500);
    };

    const activeCategory = landingCategories[activeCategoryIndex];

    return (
        <div className="relative w-screen h-screen overflow-hidden text-white">
            {/* Background Image with Overlay */}
            <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out ${isAnimating ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
                style={{ backgroundImage: `url('${activeCategory.image}')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-16">

                {/* Header */}
                <header className="flex justify-between items-center animate-fade-in-up">
                    <div className="text-2xl font-bold tracking-wider uppercase">Ai Roadmap</div>
                    <nav className="hidden md:flex space-x-8">
                        <button onClick={onGoToFeatures} className="hover:text-yellow-400 transition-colors">Features</button>
                        <button onClick={onGoToAbout} className="hover:text-yellow-400 transition-colors">About</button>
                        <button onClick={onGoToFeedback} className="hover:text-yellow-400 transition-colors">Feedback</button>
                    </nav>
                </header>

                {/* Main Hero Content */}
                <div className="flex flex-col items-start max-w-4xl mt-10">
                    <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                        <h2 className="text-yellow-400 font-bold text-xl md:text-2xl mb-2 uppercase tracking-widest">{activeCategory.title}</h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">The Future</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                            {activeCategory.description}
                        </p>
                        <button
                            onClick={onStart}
                            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Learning Now</span>
                            <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                        </button>
                    </div>
                </div>

                {/* Footer / Category Indicators */}
                <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    {landingCategories.map((cat, index) => (
                        <div
                            key={cat.id}
                            className={`h-1 rounded-full transition-all duration-500 ${index === activeCategoryIndex ? 'w-16 bg-yellow-400' : 'w-4 bg-gray-600'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-400 ml-4">{activeCategoryIndex + 1} / {landingCategories.length}</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
