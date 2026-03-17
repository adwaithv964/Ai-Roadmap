import React from 'react';

const PageHeader = ({ title, subtitle }) => (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug">{title}</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
    </div>
);

export default PageHeader;
