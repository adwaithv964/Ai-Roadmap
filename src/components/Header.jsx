import React, { useState } from 'react';
import NotificationCenter from './NotificationCenter';

const Header = ({ darkMode, toggleDarkMode, onBack, notifications, onClearNotifications, onLogout, onOpenSkillGap, onOpenCommunity }) => {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    return (
        <>
            <header className="px-3 py-2 sm:px-4 sm:py-3 flex justify-between items-center sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md text-gray-900 dark:text-white">
                <div className="flex items-center min-w-0">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mr-2 sm:mr-3 flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300 flex-shrink-0"
                            title="Go Back"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-semibold hidden sm:inline">Back</span>
                        </button>
                    )}
                    <h1 className="text-base sm:text-xl font-extrabold tracking-tight leading-tight truncate">
                        🎓 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
                            AI Learning Roadmap
                        </span>
                    </h1>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Notification bell */}
                    <div className="relative">
                        <button
                            onClick={() => setIsNotifOpen(prev => !prev)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
                            title="Notifications"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {notifications.length > 0 && (
                                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                            )}
                        </button>
                        <NotificationCenter
                            isOpen={isNotifOpen}
                            notifications={notifications}
                            onClose={() => setIsNotifOpen(false)}
                            onClear={onClearNotifications}
                        />
                    </div>

                    {/* Community — text on sm+, icon on mobile */}
                    {onOpenCommunity && (
                        <button
                            onClick={onOpenCommunity}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                            title="Community Hub"
                        >
                            🌐 Community
                        </button>
                    )}
                    {onOpenCommunity && (
                        <button
                            onClick={onOpenCommunity}
                            className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            title="Community Hub"
                        >
                            🌐
                        </button>
                    )}

                    {/* Skill Gap — text on sm+, icon on mobile */}
                    {onOpenSkillGap && (
                        <button
                            onClick={onOpenSkillGap}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm"
                            title="Skill Gap Analyzer"
                        >
                            🎯 Skill Gap
                        </button>
                    )}
                    {onOpenSkillGap && (
                        <button
                            onClick={onOpenSkillGap}
                            className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            title="Skill Gap Analyzer"
                        >
                            🎯
                        </button>
                    )}

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        title={darkMode ? 'Light mode' : 'Dark mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Sign Out — icon on mobile, icon+text on sm+ */}
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-1 ml-1 px-2 py-1.5 sm:px-3 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                            title="Sign Out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
