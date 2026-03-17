import React, { useState, useEffect, useCallback } from 'react';
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

// ── View ↔ URL path mapping ─────────────────────────────────────────────────
const VIEW_TO_PATH = {
    landing: '/',
    auth: '/auth',
    app: '/app',
    features: '/features',
    about: '/about',
    feedback: '/feedback',
    'admin-login': '/admin-login',
    admin: '/admin',
};

const PATH_TO_VIEW = Object.fromEntries(
    Object.entries(VIEW_TO_PATH).map(([v, p]) => [p, v])
);

function pathToView(pathname) {
    return PATH_TO_VIEW[pathname] ?? 'landing';
}

// ──────────────────────────────────────────────────────────────────────────────
export default function App() {
    const [view, setView] = useState(() => pathToView(window.location.pathname));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // ── Sync state → URL (only when state changes, not on popstate) ───────────
    const navigateTo = useCallback((targetView, replace = false) => {
        const path = VIEW_TO_PATH[targetView] ?? '/';
        if (replace) {
            window.history.replaceState({ view: targetView }, '', path);
        } else {
            window.history.pushState({ view: targetView }, '', path);
        }
        setView(targetView);
    }, []);

    // ── Browser back / forward ─────────────────────────────────────────────────
    useEffect(() => {
        const handlePopState = (e) => {
            const restoredView = e.state?.view ?? pathToView(window.location.pathname);
            setView(restoredView);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // ── Ensure initial URL is in history so back works from first page ─────────
    useEffect(() => {
        const initialView = pathToView(window.location.pathname);
        window.history.replaceState({ view: initialView }, '', VIEW_TO_PATH[initialView] ?? '/');
    }, []);

    // ── Firebase Auth listener ────────────────────────────────────────────────
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                if (view === 'landing' || view === 'auth') {
                    navigateTo('app', true);
                }
            } else {
                setIsAuthenticated(false);
                const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';
                if (!isAdmin && view === 'app') {
                    navigateTo('landing', true);
                }
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    // ── Admin path bootstrap ──────────────────────────────────────────────────
    useEffect(() => {
        if (window.location.pathname === '/admin') {
            if (localStorage.getItem('adminAuthenticated') === 'true') {
                setView('admin');
            } else {
                setView('admin-login');
            }
        }
    }, []);

    // ── Page transition helper (wraps navigateTo) ─────────────────────────────
    const handleNavigate = useCallback((targetView) => {
        if (targetView === 'admin' && localStorage.getItem('adminAuthenticated') !== 'true') {
            navigateTo('admin-login');
            return;
        }

        const overlay = document.getElementById('page-transition-overlay');
        if (!overlay) {
            navigateTo(targetView);
            return;
        }
        overlay.style.visibility = 'visible';
        overlay.classList.add('animate-page-fade');
        overlay.onanimationend = () => {
            overlay.classList.remove('animate-page-fade');
            overlay.style.visibility = 'hidden';
            navigateTo(targetView);
            overlay.onanimationend = null;
        };
    }, [navigateTo]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsAuthenticated(false);
            handleNavigate('landing');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

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
                    onLoginSuccess={() => { setIsAuthenticated(true); navigateTo('admin'); }}
                    onBackToHome={() => handleNavigate('landing')}
                />
            )}
            {view === 'admin' && <AdminPanel onBackToHome={() => handleNavigate('landing')} />}
        </>
    );
};
