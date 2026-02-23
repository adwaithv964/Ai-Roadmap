import React, { useState } from 'react';

const AdminNotifications = () => {
    const handleSendNotification = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const message = e.target.message.value;

        // Uses a generic API approach; for fully integrated we could pass a fetcher function 
        // that automatically appends the Firebase token
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        try {
            await fetch(`${API_BASE}/api/admin/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}` // Assume token is stored or pass authenticated fetch function
                },
                body: JSON.stringify({ title, message })
            });
            alert('Notification Sent!');
            e.target.reset();
        } catch (err) { console.error(err); alert('Failed to send'); }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">Notification Manager</h2>
            <form onSubmit={handleSendNotification} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Send Push Notification</h3>
                <input name="title" type="text" placeholder="Title" required className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                <textarea name="message" placeholder="Message" rows="3" required className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"></textarea>
                <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold transition-all transform hover:scale-105">
                    Broadcast to All Users
                </button>
            </form>
        </div>
    );
};

export default AdminNotifications;
