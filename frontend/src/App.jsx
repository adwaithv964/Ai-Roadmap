import React, { useState } from 'react';
import StarryCursor from './components/StarryCursor';
import LandingPage from './pages/LandingPage';
import LearningPlatform from './pages/LearningPlatform';
import FeaturesPage from './features_page';
import AboutPage from './about';
import FeedbackPage from './feedback';

// --- Main App Component (Acts as a Router) ---
export default function App() {
    const [view, setView] = useState('landing'); // 'landing', 'app', 'features', 'about'

    const handleNavigate = (targetView) => {
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

    return (
        <>
            <StarryCursor />
            {view === 'landing' && (
                <LandingPage
                    onStart={() => handleNavigate('app')}
                    onGoToFeatures={() => handleNavigate('features')}
                    onGoToAbout={() => handleNavigate('about')}
                    onGoToFeedback={() => handleNavigate('feedback')}
                />
            )}
            {view === 'app' && <LearningPlatform onBackToHome={() => handleNavigate('landing')} />}
            {view === 'features' && <FeaturesPage onBackToHome={() => handleNavigate('landing')} />}
            {view === 'about' && <AboutPage onBackToHome={() => handleNavigate('landing')} />}
            {view === 'feedback' && <FeedbackPage onBackToHome={() => handleNavigate('landing')} />}
        </>
    );
};
