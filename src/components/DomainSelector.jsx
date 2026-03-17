import React, { useState, useMemo } from 'react';
import { domainCategories, domains as localDomains } from '../data/constants';

const DomainSelector = ({ onSelectDomain, searchTerm, setSearchTerm }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    // Use local domains directly
    const domains = localDomains;

    const activeCategoryTitle = useMemo(() => {
        if (activeCategory === 'all') {
            return 'All Domains';
        }
        const category = domainCategories.find(cat => cat.id === activeCategory);
        return category ? category.title : 'All Domains';
    }, [activeCategory]);

    const domainsToShow = useMemo(() => {
        let result = domains;

        // 1. Filter by Category
        if (activeCategory !== 'all') {
            result = result.filter(domain => domain.categoryId === activeCategory);
        }

        // 2. Filter by Search Term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(domain =>
                domain.title.toLowerCase().includes(term) ||
                domain.description.toLowerCase().includes(term)
            );
        }

        return result;
    }, [domains, activeCategory, searchTerm]);

    const backgroundImageUrl = `https://placehold.co/1920x1080/2d2d2d/ffffff?text=${encodeURIComponent(activeCategoryTitle)}`;

    return (
        <div className="relative w-full min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-all duration-500" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 transition-colors duration-300"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-8">
                <div className="text-center my-8 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
                            Your Journey Starts Here
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2">Pick a specialization to begin your personalized learning adventure.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <input
                            type="text"
                            placeholder="Search domains like 'Frontend', 'Data Science'..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 pl-10 border rounded-full bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex justify-center space-x-2 mb-12 flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {domainCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${activeCategory === cat.id
                                    ? 'bg-blue-600 text-white dark:bg-yellow-400 dark:text-black'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50'
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    {domainsToShow.map(domain => (
                        <div
                            key={domain.id}
                            onClick={() => onSelectDomain(domain.id)}
                            className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300 hover:border-blue-400 dark:hover:border-yellow-400"
                        >
                            <div className="text-4xl mb-4">{domain.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-yellow-400">{domain.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{domain.description}</p>
                            {/* Removed 'Coming Soon' check as we are using static data now */}
                        </div>
                    ))}
                </div>
                {domainsToShow.length === 0 && <p className="text-center col-span-full mt-8 text-gray-500 dark:text-gray-400">No domains found for "{searchTerm}".</p>}
            </div>
        </div>
    );
};

export default DomainSelector;
