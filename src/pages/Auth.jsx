import React, { useState, useMemo } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

// ── helpers ─────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) =>
    open ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
    );

const CheckIcon = ({ ok }) => (
    <span className={`text-xs font-medium ${ok ? 'text-green-400' : 'text-gray-500'}`}>
        {ok ? '✓' : '✗'}
    </span>
);

function getPasswordStrength(pw) {
    let score = 0;
    const checks = {
        length: pw.length >= 8,
        upper: /[A-Z]/.test(pw),
        number: /[0-9]/.test(pw),
        symbol: /[^A-Za-z0-9]/.test(pw),
    };
    score = Object.values(checks).filter(Boolean).length;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-400', 'bg-green-500'];
    return { score, checks, label: labels[score] || '', color: colors[score] || '' };
}

function cleanFirebaseError(msg) {
    if (!msg) return '';
    if (msg.includes('email-already-in-use')) return 'An account with this email already exists.';
    if (msg.includes('wrong-password') || msg.includes('invalid-credential')) return 'Incorrect email or password.';
    if (msg.includes('user-not-found')) return 'No account found with this email.';
    if (msg.includes('too-many-requests')) return 'Too many attempts. Please try again later.';
    if (msg.includes('unauthorized-domain')) return 'This domain is not authorised. Please use the official app URL.';
    if (msg.includes('weak-password')) return 'Password must be at least 6 characters.';
    return msg.replace('Firebase: ', '').replace(/ \(auth\/.*\)\.?/, '');
}

// ── component ────────────────────────────────────────────────────────────
const Auth = ({ onLoginSuccess, onBackToHome }) => {
    const [isLogin, setIsLogin] = useState(true);

    // fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // ui state
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const strength = useMemo(() => getPasswordStrength(password), [password]);
    const passwordsMatch = confirmPassword === '' ? null : password === confirmPassword;

    const syncUserToBackend = async (user) => {
        try {
            await fetch('/api/auth/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firebaseUid: user.uid, email: user.email })
            });
        } catch (e) {
            console.error('Failed to sync user to backend', e);
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
            setError(cleanFirebaseError(err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');

        // ── sign-up validation ──────────────────────────────────────────
        if (!isLogin) {
            if (!name.trim()) return setError('Please enter your full name.');
            if (name.trim().split(' ').length < 2) return setError('Please enter your first and last name.');
            if (password !== confirmPassword) return setError('Passwords do not match.');
            const allChecksPassed = Object.values(strength.checks).every(Boolean);
            if (!allChecksPassed) return setError('Password must have 8+ characters, an uppercase letter, a number, and a symbol.');
        }

        setLoading(true);
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Save display name to Firebase profile
                await updateProfile(userCredential.user, { displayName: name.trim() });
            }
            await syncUserToBackend(userCredential.user);
            onLoginSuccess();
        } catch (err) {
            setError(cleanFirebaseError(err.message));
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setName('');
        setPassword('');
        setConfirmPassword('');
    };

    // ── render ──────────────────────────────────────────────────────────
    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-blue-900 opacity-80" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-up overflow-y-auto max-h-[95vh]">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
                        {isLogin ? 'Welcome Back' : 'Join the Future'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'Continue your journey to mastery.' : 'Start building your AI career today.'}
                    </p>
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-3 bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 mb-5"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span>{loading ? 'Processing…' : 'Continue with Google'}</span>
                </button>

                <div className="relative flex py-2 items-center mb-5">
                    <div className="flex-grow border-t border-gray-600" />
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or with email</span>
                    <div className="flex-grow border-t border-gray-600" />
                </div>

                {/* Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">

                    {/* Full Name — signup only */}
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                placeholder=" Enter Your Name"
                                autoComplete="name"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                            placeholder="name@example.com"
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pr-11 bg-gray-900/50 border border-gray-600 rounded-lg outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="••••••••"
                                autoComplete={isLogin ? 'current-password' : 'new-password'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <EyeIcon open={showPw} />
                            </button>
                        </div>

                        {/* Strength meter — signup only */}
                        {!isLogin && password.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {/* bar */}
                                <div className="flex gap-1 h-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-gray-700'}`}
                                        />
                                    ))}
                                </div>
                                <p className={`text-xs ml-1 ${strength.color.replace('bg-', 'text-')}`}>
                                    {strength.label}
                                </p>
                                {/* checklist */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1 ml-1">
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><CheckIcon ok={strength.checks.length} /> 8+ characters</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><CheckIcon ok={strength.checks.upper} /> Uppercase letter</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><CheckIcon ok={strength.checks.number} /> Number</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><CheckIcon ok={strength.checks.symbol} /> Symbol (!@#…)</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password — signup only */}
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-400 text-xs font-bold mb-1 ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full p-3 pr-11 bg-gray-900/50 border rounded-lg outline-none text-white placeholder-gray-500 transition-colors
                                        ${passwordsMatch === false ? 'border-red-500 focus:border-red-500' :
                                            passwordsMatch === true ? 'border-green-500 focus:border-green-500' :
                                                'border-gray-600 focus:border-blue-500'}`}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <EyeIcon open={showConfirm} />
                                </button>
                            </div>
                            {passwordsMatch === false && (
                                <p className="text-red-400 text-xs mt-1 ml-1">Passwords do not match.</p>
                            )}
                            {passwordsMatch === true && (
                                <p className="text-green-400 text-xs mt-1 ml-1">✓ Passwords match.</p>
                            )}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">
                            <span className="text-red-400 text-xs leading-relaxed">{error}</span>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || (!isLogin && !Object.values(strength.checks).every(Boolean))}
                        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all mt-2
                        ${(!isLogin && !Object.values(strength.checks).every(Boolean))
                                ? 'opacity-40 cursor-not-allowed'
                                : 'hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95'
                            }`}
                    >
                        {loading ? 'Processing…' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={switchMode}
                            className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                    <button onClick={onBackToHome} className="mt-3 text-gray-600 hover:text-gray-400 text-xs transition-colors">
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
