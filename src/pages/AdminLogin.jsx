import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const AdminLogin = ({ onLoginSuccess, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 1. Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            // 2. Verify admin status with Backend
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE}/api/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            // 3. Store authentication state
            localStorage.setItem('adminAuthenticated', 'true');
            localStorage.setItem('adminRole', data.role);

            onLoginSuccess();
        } catch (err) {
            console.error('Admin Login Error:', err);
            setError(err.message || 'Invalid credentials or unauthorized');
            // Clean up if Firebase succeeded but backend failed
            auth.signOut();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
            {/* Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50 z-0"
                style={{ backgroundImage: `url('https://placehold.co/1920x1080/1a1a1a/ffffff?text=Admin+Access')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl animate-fade-in-up">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Admin Access</h1>
                    <p className="text-gray-400 text-sm mt-2">Restricted Area. Authorized Personnel Only.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Admin Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-600 transition-all"
                            placeholder="admin@example.com"
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2">Access Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-600 transition-all"
                            placeholder="Enter system password..."
                            required
                        />
                        {error && <p className="text-red-500 text-xs mt-2 animate-pulse">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Authenticating...' : 'Authenticate'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button onClick={onBackToHome} className="text-gray-500 hover:text-white text-sm transition-colors">
                        Return to Platform
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
