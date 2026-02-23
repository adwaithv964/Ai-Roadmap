import React from 'react';

const PageHeader = ({ title, subtitle }) => (
    <div className="bg-white dark:bg-gray-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
    </div>
);

export default PageHeader;
