import React, { useState } from 'react';
import NotificationCenter from './NotificationCenter';

const Header = ({ darkMode, toggleDarkMode, onBack, notifications, onClearNotifications }) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    return (
        <>
            <style>{`
                @keyframes gradient-move {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-slow {
                    animation: gradient-move 10s ease infinite;
                }
            `}</style>
            <header className={`p-4 flex justify-between items-center sticky top-0 z-40 text-white
                                bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
                                bg-[length:200%_auto] animate-gradient-slow
                                backdrop-blur-lg border-b border-white/10 shadow-lg`}>
                <div className="flex items-center">
                    {onBack && (
                        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-black/20 transition-colors duration-300" title="Back to Home">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>
                        </button>
                    )}
                    <h1 className="text-2xl font-bold">🎓 AI Learning Roadmap</h1>
                </div>
                <div className="flex items-center gap-2 text-white">
                    <div className="relative">
                        <button onClick={() => setIsNotifOpen(prev => !prev)} className="p-2 rounded-full hover:bg-black/20 transition-colors duration-300 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            {notifications.length > 0 && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>}
                        </button>
                        <NotificationCenter
                            isOpen={isNotifOpen}
                            notifications={notifications}
                            onClose={() => setIsNotifOpen(false)}
                            onClear={onClearNotifications}
                        />
                    </div>
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-black/20 transition-colors duration-300">
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
