import React from 'react';

const ActivityHeatmap = ({ activityData }) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 364);

    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const getColor = (count) => {
        if (count > 4) return 'bg-green-700';
        if (count > 2) return 'bg-green-600';
        if (count > 0) return 'bg-green-500';
        return 'bg-gray-200 dark:bg-gray-700';
    };

    return (
        <div className="grid grid-rows-7 grid-flow-col gap-1">
            {dates.map((date, index) => {
                const dateString = date.toISOString().split('T')[0];
                const count = activityData[dateString] || 0;
                return <div key={index} className={`w-3 h-3 rounded-sm ${getColor(count)}`} title={`${count} steps on ${date.toDateString()}`}></div>
            })}
        </div>
    );
};

export default ActivityHeatmap;
