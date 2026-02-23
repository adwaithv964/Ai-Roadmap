import React from 'react';

const AdminSettings = () => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">System Settings</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
                <div className="flex justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded">
                    <div>
                        <span className="text-white font-bold block">Maintenance Mode</span>
                        <span className="text-gray-400 text-sm">Prevents non-admins from logging in</span>
                    </div>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer transition-colors"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div></div>
                </div>
                <div className="flex justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded">
                    <div>
                        <span className="text-white font-bold block">Allow New Registrations</span>
                        <span className="text-gray-400 text-sm">Enable or disable public signups</span>
                    </div>
                    <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer transition-colors"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div></div>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Gamification Tuning</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded">
                        <div>
                            <span className="text-white font-bold block">Global XP Multiplier</span>
                            <span className="text-gray-400 text-sm">Boost XP for weekend events (Default: 1.0x)</span>
                        </div>
                        <input type="number" step="0.1" min="1.0" max="5.0" defaultValue="1.0" className="w-20 p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex justify-between items-center bg-gray-900 border border-gray-700 p-4 rounded">
                        <div>
                            <span className="text-white font-bold block">Streak Decay Rate</span>
                            <span className="text-gray-400 text-sm">Days before streak resets to zero</span>
                        </div>
                        <input type="number" min="1" max="7" defaultValue="2" className="w-20 p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors font-medium mt-2">Save Tuning Options</button>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6 md:mt-8">
                <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
                <div className="border border-red-900 bg-red-900/10 p-4 rounded flex justify-between items-center">
                    <div>
                        <span className="text-white font-bold block">Purge Cache</span>
                        <span className="text-gray-400 text-sm">Clear server-side caching (AI responses & Resources)</span>
                    </div>
                    <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition-colors font-medium">Purge</button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
