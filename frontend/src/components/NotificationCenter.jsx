import React, { useEffect, useRef } from 'react';

const NotificationCenter = ({ notifications, isOpen, onClear, onClose }) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose && onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, isOpen, onClose]);


    if (!isOpen) return null;
    return (
        <div ref={ref} className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-700 z-50">
            <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                <h4 className="font-bold">Notifications</h4>
                <button onClick={onClear} className="text-sm text-blue-500 hover:underline">Clear All</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif.id} className="p-3 border-b dark:border-gray-700/50">
                            <p className="font-semibold text-sm">{notif.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{notif.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-sm text-gray-500">No new notifications.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationCenter;
