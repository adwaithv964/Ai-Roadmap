import React, { useState } from 'react';
import NotificationCenter from './NotificationCenter';

const Header = ({ darkMode, toggleDarkMode, onBack, notifications, onClearNotifications, onLogout, onOpenSkillGap, onOpenCommunity }) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    return (
        <>
            <header className={`p - 2 sm: p - 4 flex justify - between items - center sticky top - 0 z - 40
bg - white / 80 dark: bg - gray - 900 / 80
backdrop - blur - lg border - b border - gray - 200 dark: border - white / 10 shadow - lg text - gray - 900 dark: text - white`}>
                <div className="flex items-center">
                    {onBack && (
                        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-black/20 transition-colors duration-300" title="Back to Home">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>
                        </button>
                    )}
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        🎓 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
                            AI Learning Roadmap
                        </span>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
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
                    {onOpenCommunity && (
                        <button
                            onClick={onOpenCommunity}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
                            title="Community Hub — share, learn, connect"
                        >
                            🌐 Community
                        </button>
                    )}
                    {onOpenCommunity && (
                        <button
                            onClick={onOpenCommunity}
                            className="sm:hidden p-2 rounded-full hover:bg-black/20 transition-colors duration-300"
                            title="Community Hub"
                        >
                            🌐
                        </button>
                    )}
                    {onOpenSkillGap && (
                        <button
                            onClick={onOpenSkillGap}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-100"
                            title="Analyze your skill gap for a target job"
                        >
                            🎯 Skill Gap
                        </button>
                    )}
                    {onOpenSkillGap && (
                        <button
                            onClick={onOpenSkillGap}
                            className="sm:hidden p-2 rounded-full hover:bg-black/20 transition-colors duration-300"
                            title="Skill Gap Analyzer"
                        >
                            🎯
                        </button>
                    )}
                    <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-black/20 transition-colors duration-300">
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    {onLogout && (
                        <>
                            {/* Desktop/Tablet Sign Out */}
                            <button
                                onClick={onLogout}
                                className="hidden sm:block ml-2 px-3 py-1.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                                title="Sign Out"
                            >
                                Sign Out
                            </button>
                            {/* Mobile Sign Out (icon only) */}
                            <button
                                onClick={onLogout}
                                className="sm:hidden ml-2 p-2 rounded-full hover:bg-black/20 transition-colors duration-300"
                                title="Sign Out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
