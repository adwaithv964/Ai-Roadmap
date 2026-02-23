import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = ({ onLoginSuccess, onBackToHome }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const syncUserToBackend = async (user) => {
        try {
            await fetch('http://localhost:5000/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firebaseUid: user.uid,
                    email: user.email
                })
            });
        } catch (error) {
            console.error("Failed to sync user to backend", error);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await syncUserToBackend(result.user);
            onLoginSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            await syncUserToBackend(userCredential.user);
            onLoginSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden font-sans">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900 opacity-80"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        {isLogin ? 'Welcome Back' : 'Join the Future'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'Continue your journey to mastery.' : 'Start building your AI career today.'}
                    </p>
                </div>

                {/* Social Login */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 mb-6"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span>{loading ? 'Processing...' : 'Continue with Google'}</span>
                </button>

                <div className="relative flex py-2 items-center mb-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or with email</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 mt-4"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm">
                    <p className="text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                    <button onClick={onBackToHome} className="mt-4 text-gray-600 hover:text-gray-400 text-xs transition-colors">
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
