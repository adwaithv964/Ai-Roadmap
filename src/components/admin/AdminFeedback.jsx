import React from 'react';

const AdminFeedback = ({ feedbacks, onDeleteFeedback, onViewFeedback }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">User Feedback</h2>
                <div className="text-sm text-gray-400">Total: {feedbacks.length}</div>
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-white uppercase text-sm">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Feedback</th>
                            <th className="p-4">Email</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(item => (
                            <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="p-4 whitespace-nowrap text-sm text-gray-400">
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
                                <td className="p-4 max-w-md truncate" title={item.feedback}>
                                    {item.feedback}
                                </td>
                                <td className="p-4 text-sm text-gray-400">
                                    {item.email || '-'}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => onViewFeedback(item)}
                                        className="text-blue-400 hover:text-blue-300 font-medium text-sm border border-blue-500/50 px-3 py-1 rounded hover:bg-blue-500/10 transition-colors"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => onDeleteFeedback(item._id)}
                                        className="text-red-400 hover:text-red-300 font-medium text-sm border border-red-500/50 px-3 py-1 rounded hover:bg-red-500/10 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {feedbacks.length === 0 && <p className="p-8 text-center text-gray-500">No feedback found.</p>}
            </div>
        </div>
    );
};

export default AdminFeedback;
