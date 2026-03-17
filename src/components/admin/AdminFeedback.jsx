import React, { useState } from 'react';

const RATING_FILTERS = [
    { label: 'All', fn: () => true },
    { label: '⭐ 1–2', fn: r => r.rating <= 2 },
    { label: '⭐⭐⭐ 3', fn: r => r.rating === 3 },
    { label: '⭐⭐⭐⭐ 4–5', fn: r => r.rating >= 4 },
];

const AdminFeedback = ({ feedbacks, onDeleteFeedback, onViewFeedback }) => {
    const [ratingFilter, setRatingFilter] = useState(0); // index into RATING_FILTERS

    const filtered = feedbacks.filter(RATING_FILTERS[ratingFilter].fn);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-3xl font-bold text-white">User Feedback</h2>
                <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400">Filter by rating:</span>
                    <div className="flex rounded-lg overflow-hidden border border-gray-600">
                        {RATING_FILTERS.map((f, i) => (
                            <button
                                key={i}
                                onClick={() => setRatingFilter(i)}
                                className={`px-3 py-1.5 text-xs font-medium transition-colors ${ratingFilter === i
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <span className="text-sm text-gray-400">{filtered.length} shown</span>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300 text-sm">
                        <thead className="bg-gray-700/80 text-white text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Feedback</th>
                                <th className="p-4">Email</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => (
                                <tr key={item._id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4 whitespace-nowrap text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`font-bold ${item.rating >= 4 ? 'text-green-400' : item.rating >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {item.rating} ★
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded text-xs bg-gray-600 uppercase tracking-wider text-white">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="p-4 max-w-xs truncate text-gray-300" title={item.feedback}>
                                        {item.feedback}
                                    </td>
                                    <td className="p-4 text-xs text-gray-400">{item.email || '—'}</td>
                                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => onViewFeedback(item)}
                                            className="text-blue-400 hover:text-blue-300 font-medium text-xs border border-blue-500/50 px-3 py-1.5 rounded hover:bg-blue-500/10 transition-colors"
                                        >
                                            View
                                        </button>
                                        {item.email && (
                                            <a
                                                href={`mailto:${item.email}?subject=Re: Your Feedback on AI Roadmap&body=Hi,%0D%0A%0D%0AThank you for your feedback!%0D%0A%0D%0AYou wrote: "${item.feedback}"`}
                                                className="inline-block text-green-400 hover:text-green-300 font-medium text-xs border border-green-500/50 px-3 py-1.5 rounded hover:bg-green-500/10 transition-colors"
                                            >
                                                Reply
                                            </a>
                                        )}
                                        <button
                                            onClick={() => onDeleteFeedback(item._id)}
                                            className="text-red-400 hover:text-red-300 font-medium text-xs border border-red-500/50 px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p className="p-8 text-center text-gray-500">No feedback found for the selected filter.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFeedback;
