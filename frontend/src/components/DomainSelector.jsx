import React, { useState, useMemo } from 'react';
import { domainCategories, domains } from '../data/constants';

const DomainSelector = ({ onSelectDomain, searchTerm, setSearchTerm }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const activeCategoryTitle = useMemo(() => {
        if (activeCategory === 'all') {
            return 'All Domains';
        }
        const category = domainCategories.find(cat => cat.id === activeCategory);
        return category ? category.title : 'All Domains';
    }, [activeCategory]);

    const filteredDomains = useMemo(() => {
        return domains.filter(domain =>
            domain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            domain.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const domainsByCategory = useMemo(() => {
        if (activeCategory === 'all') return { all: filteredDomains };
        const grouped = {};
        filteredDomains.forEach(domain => {
            if (!grouped[domain.categoryId]) {
                grouped[domain.categoryId] = [];
            }
            grouped[domain.categoryId].push(domain);
        });
        return grouped;
    }, [filteredDomains, activeCategory]);

    const domainsToShow = activeCategory === 'all' ? filteredDomains : (domainsByCategory[activeCategory] || []);

    const backgroundImageUrl = `https://placehold.co/1920x1080/2d2d2d/ffffff?text=${encodeURIComponent(activeCategoryTitle)}`;

    return (
        <div className="relative w-full min-h-screen text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-all duration-500" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>

            <div className="relative z-10 p-8">
                <div className="text-center my-8 animate-fade-in-up">
                    <h1 className="text-5xl font-bold">Choose Your Path</h1>
                    <p className="text-lg text-gray-300 mt-2">Select a domain to generate your personalized learning roadmap.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <input
                            type="text"
                            placeholder="Search domains like 'Frontend', 'Data Science'..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 pl-10 border rounded-full bg-gray-800 bg-opacity-70 backdrop-blur-sm border-gray-600 focus:ring-2 focus:ring-yellow-400 outline-none text-white placeholder-gray-400"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex justify-center space-x-2 mb-12 flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {domainCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeCategory === cat.id ? 'bg-yellow-400 text-black' : 'bg-gray-700 bg-opacity-50 hover:bg-gray-600/50'}`}
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
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300 hover:border-yellow-400"
                        >
                            <div className="text-4xl mb-4">{domain.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-yellow-400">{domain.title}</h3>
                            <p className="text-gray-300">{domain.description}</p>
                        </div>
                    ))}
                </div>
                {domainsToShow.length === 0 && <p className="text-center col-span-full mt-8 text-gray-400">No domains found for "{searchTerm}".</p>}
            </div>
        </div>
    );
};

export default DomainSelector;
