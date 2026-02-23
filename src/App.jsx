import React, { useState, useEffect } from 'react';
import StarryCursor from './components/StarryCursor';
import LandingPage from './pages/LandingPage';
import LearningPlatform from './pages/LearningPlatform';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/About';
import FeedbackPage from './pages/Feedback';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Auth from './pages/Auth';
import { auth } from './config/firebase';
import { onAuthStateChanged } from "firebase/auth";

// --- Main App Component (Acts as a Router) ---
export default function App() {
    const [view, setView] = useState('landing'); // 'landing', 'app', 'features', 'about', 'feedback', 'admin', 'admin-login'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Auth Check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                // If on landing or auth page, redirect to app
                if (view === 'landing' || view === 'auth') {
                    setView('app');
                }
            } else {
                setIsAuthenticated(false);
                // Keep Admin Auth separate for now via localStorage
                const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
                if (!isAdmin && view === 'app') {
                    setView('landing');
                }
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [view]);

    // Handle Admin Route separate logic
    useEffect(() => {
        if (window.location.pathname === '/admin') {
            if (localStorage.getItem('adminAuthenticated') === 'true') {
                setView('admin');
            } else {
                setView('admin-login');
            }
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handleNavigate = (targetView) => {
        // Guard Admin Route
        if (targetView === 'admin' && localStorage.getItem('adminAuthenticated') !== 'true') {
            setView('admin-login');
            return;
        }

        const overlay = document.getElementById('page-transition-overlay');
        if (!overlay) {
            setView(targetView);
            return;
        }
        overlay.style.visibility = 'visible';
        overlay.classList.add('animate-page-fade');
        overlay.onanimationend = () => {
            overlay.classList.remove('animate-page-fade');
            overlay.style.visibility = 'hidden';
            setView(targetView);
            overlay.onanimationend = null;
        };
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsAuthenticated(false); // Note: mixing admin/user auth state here for prototype simplicity
            handleNavigate('landing');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <>
            <StarryCursor />
            {view === 'landing' && (
                <LandingPage
                    onStart={() => handleNavigate('auth')}
                    onGoToFeatures={() => handleNavigate('features')}
                    onGoToAbout={() => handleNavigate('about')}
                    onGoToFeedback={() => handleNavigate('feedback')}
                    onGoToAdmin={() => handleNavigate('admin')}
                />
            )}
            {view === 'auth' && (
                <Auth
                    onLoginSuccess={() => { setIsAuthenticated(true); handleNavigate('app'); }}
                    onBackToHome={() => handleNavigate('landing')}
                />
            )}
            {view === 'app' && <LearningPlatform onBackToHome={() => handleNavigate('landing')} onLogout={handleLogout} />}
            {view === 'features' && <FeaturesPage onBackToHome={() => handleNavigate('landing')} />}
            {view === 'about' && <AboutPage onBackToHome={() => handleNavigate('landing')} />}
            {view === 'feedback' && <FeedbackPage onBackToHome={() => handleNavigate('landing')} />}
            {view === 'admin-login' && (
                <AdminLogin
                    onLoginSuccess={() => { setIsAuthenticated(true); setView('admin'); }}
                    onBackToHome={() => handleNavigate('landing')}
                />
            )}
            {view === 'admin' && <AdminPanel onBackToHome={() => handleNavigate('landing')} />}
        </>
    );
};
