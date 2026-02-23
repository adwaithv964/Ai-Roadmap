import React from 'react';

const AdminRoadmaps = ({ roadmaps, onOpenModal, onDelete }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Roadmap Control</h2>
                <div className="space-x-4">
                    <button onClick={() => onOpenModal(null)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors">+ Add Domain</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmaps.map(rmap => (
                    <div key={rmap._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex justify-between items-center group hover:border-blue-500 transition-colors shadow-md">
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl">{rmap.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-white">{rmap.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-1">{rmap.description}</p>
                                <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${rmap.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-900' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-900'}`}>
                                    {rmap.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onOpenBuilder(rmap)} className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm transition-colors border border-purple-500">Builder</button>
                            <button onClick={() => onOpenModal(rmap)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors border border-gray-600">Info</button>
                            <button onClick={() => onDelete(rmap._id)} className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/30 rounded text-sm transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRoadmaps;
