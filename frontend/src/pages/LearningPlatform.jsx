import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import DomainSelector from '../components/DomainSelector';
import RoadmapCustomizer from '../components/RoadmapCustomizer';
import RoadmapView from '../components/RoadmapView';
import DashboardView from '../components/DashboardView';
import AIResourceRecommender from '../components/AIResourceRecommender';
import AIChatbot from '../components/AIChatbot';
import AIQuizGenerator from '../components/AIQuizGenerator';
import { motivationalAlerts, domains } from '../data/constants';

const LearningPlatform = ({ onBackToHome }) => {
    const [appView, setAppView] = useState('domainSelector');
    const [darkMode, setDarkMode] = useState(true);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
    const [progress, setProgress] = useState({});
    const [activeToasts, setActiveToasts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRecommender, setShowRecommender] = useState(false);
    const [recommenderTopic, setRecommenderTopic] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInitialMessage, setChatInitialMessage] = useState('');
    const [quizModule, setQuizModule] = useState(null);

    // --- Side Effects ---
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        if (selectedDomain) {
            try {
                const savedProgress = localStorage.getItem(`progress_${selectedDomain}`);
                const savedNotifications = localStorage.getItem(`notifications_${selectedDomain}`);
                if (savedProgress) setProgress(JSON.parse(savedProgress));
                else setProgress({});
                if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
                else setNotifications([]);
            } catch (error) {
                console.error("Failed to load data from localStorage:", error);
                setProgress({});
                setNotifications([]);
            }
        }
    }, [selectedDomain]);

    useEffect(() => {
        if (selectedDomain) {
            try {
                if (Object.keys(progress).length > 0) localStorage.setItem(`progress_${selectedDomain}`, JSON.stringify(progress));
                if (notifications.length > 0) localStorage.setItem(`notifications_${selectedDomain}`, JSON.stringify(notifications));
            } catch (error) {
                console.error("Failed to save data to localStorage:", error);
            }
        }
    }, [progress, notifications, selectedDomain]);

    // --- Handler Functions ---
    const handleSelectDomain = (domainId) => {
        setSelectedDomain(domainId);
        setAppView('customizer');
    };

    const handleGenerateRoadmap = (roadmapData) => {
        setGeneratedRoadmap(roadmapData);

        const initialProgress = {};
        roadmapData.stages.forEach(stage => {
            stage.modules.forEach(module => {
                module.steps.forEach(step => {
                    initialProgress[step.id] = { completed: false, skills: [] };
                });
            });
        });

        try {
            const savedProgress = localStorage.getItem(`progress_${selectedDomain}`);
            if (savedProgress) {
                const parsedSaved = JSON.parse(savedProgress);
                Object.keys(initialProgress).forEach(stepId => {
                    if (parsedSaved[stepId]) {
                        initialProgress[stepId] = parsedSaved[stepId];
                    }
                });
            }
        } catch (e) { console.error("Could not merge progress", e) }

        setProgress(initialProgress);
        setAppView('roadmap');
    };

    const showToast = (title, message, type = 'general') => {
        const id = Date.now() + Math.random();
        const icons = {
            general: '👍', milestone: '🏆', streak: '🔥', first_step: '🎉', stage_complete: '🚀'
        };
        const newToast = { id, title, message, icon: icons[type] || '🔔' };
        setActiveToasts(prev => [...prev, newToast]);

        if (['milestone', 'first_step', 'stage_complete', 'streak'].includes(type)) {
            setNotifications(prev => [newToast, ...prev].slice(0, 20)); // Keep notifications list from growing too large
        }

        setTimeout(() => {
            setActiveToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    };

    const handleToggleStep = (step, moduleTitle) => {
        const wasCompleted = progress[step.id]?.completed;
        const isNowCompleted = !wasCompleted;

        const totalSteps = generatedRoadmap.stages.reduce((acc, stage) => acc + stage.modules.reduce((modAcc, mod) => modAcc + mod.steps.length, 0), 0);
        const completedCountBefore = Object.values(progress).filter(p => p.completed).length;

        const newState = {
            ...progress,
            [step.id]: {
                ...progress[step.id],
                completed: isNowCompleted,
                completedDate: isNowCompleted ? new Date().toISOString().split('T')[0] : null
            }
        };
        setProgress(newState);

        if (!isNowCompleted) return; // Only show toasts for completions

        const completedCountAfter = completedCountBefore + 1;
        const progressPercentBefore = Math.round((completedCountBefore / totalSteps) * 100);
        const progressPercentAfter = Math.round((completedCountAfter / totalSteps) * 100);

        const milestones = [25, 50, 75];
        milestones.forEach(ms => {
            if (progressPercentBefore < ms && progressPercentAfter >= ms) {
                const message = motivationalAlerts.milestone[Math.floor(Math.random() * motivationalAlerts.milestone.length)];
                showToast(`Reached ${ms}% Progress!`, message, 'milestone');
            }
        });

        if (completedCountAfter === 1) {
            const message = motivationalAlerts.first_step[Math.floor(Math.random() * motivationalAlerts.first_step.length)];
            showToast("First Step Taken!", message, 'first_step');
            return;
        }

        const module = generatedRoadmap.stages.flatMap(s => s.modules).find(m => m.title === moduleTitle);
        if (module) {
            const allModuleStepsCompleted = module.steps.every(s => newState[s.id]?.completed);
            if (allModuleStepsCompleted) {
                const message = motivationalAlerts.stage_complete[Math.floor(Math.random() * motivationalAlerts.stage_complete.length)];
                showToast(`Module "${module.title}" Complete!`, message, 'stage_complete');
                return;
            }
        }

        const message = motivationalAlerts.general[Math.floor(Math.random() * motivationalAlerts.general.length)];
        showToast("Step Completed!", message, 'general');
    };

    const handleShowResources = (topicTitle) => { setShowRecommender(true); setRecommenderTopic(topicTitle); };
    const handleCloseResources = () => setShowRecommender(false);
    const handleAskTutor = (initialQuestion = '') => { setChatInitialMessage(initialQuestion); setIsChatOpen(true); };
    const handleClearNotifications = () => { setNotifications([]); if (selectedDomain) localStorage.removeItem(`notifications_${selectedDomain}`); };
    const handleGenerateQuiz = (module) => setQuizModule(module);

    const pageHeaderContent = useMemo(() => {
        switch (appView) {
            case 'domainSelector': {
                return {
                    title: 'Choose Your Career Path',
                    subtitle: 'Select a domain to generate your personalized learning roadmap.'
                };
            }
            case 'customizer': {
                const domainTitle = domains.find(d => d.id === selectedDomain)?.title || '';
                return {
                    title: 'Personalize Your Roadmap',
                    subtitle: `Tailor your learning path for ${domainTitle}.`
                };
            }
            case 'roadmap': {
                return {
                    title: generatedRoadmap?.title || 'Your Roadmap',
                    subtitle: 'Your personalized learning path. Check off steps as you complete them.'
                };
            }
            case 'dashboard': {
                return {
                    title: 'Learning Dashboard',
                    subtitle: `An overview of your progress on the ${generatedRoadmap?.title || 'roadmap'}.`
                };
            }
            default: {
                return {
                    title: 'Welcome',
                    subtitle: 'Begin your learning journey.'
                };
            }
        }
    }, [appView, generatedRoadmap, selectedDomain]);


    return (
        <div className={`min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
            <Header
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode(!darkMode)}
                onBack={appView === 'domainSelector' ? onBackToHome : () => setAppView('domainSelector')}
                notifications={notifications}
                onClearNotifications={handleClearNotifications}
            />

            <PageHeader title={pageHeaderContent.title} subtitle={pageHeaderContent.subtitle} />

            <main>
                {appView === 'domainSelector' && <DomainSelector onSelectDomain={handleSelectDomain} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                {appView === 'customizer' && <RoadmapCustomizer domainId={selectedDomain} onGenerateRoadmap={handleGenerateRoadmap} />}
                {appView === 'roadmap' && generatedRoadmap && (
                    <RoadmapView
                        roadmapData={generatedRoadmap}
                        progress={progress}
                        onToggleStep={handleToggleStep}
                        onGoToDashboard={() => setAppView('dashboard')}
                        onShowResources={handleShowResources}
                        onAskTutor={handleAskTutor}
                        onGenerateQuiz={handleGenerateQuiz}
                    />
                )}
                {appView === 'dashboard' && generatedRoadmap && (
                    <DashboardView
                        roadmapData={generatedRoadmap}
                        progress={progress}
                        onBackToRoadmap={() => setAppView('roadmap')}
                    />
                )}
            </main>

            <div className="fixed top-24 right-5 z-50 space-y-3 w-80">
                {activeToasts.map(toast => (
                    <div key={toast.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in-right border dark:border-gray-700">
                        <span className="text-2xl">{toast.icon}</span>
                        <div className="flex-1">
                            <p className="font-bold">{toast.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{toast.message}</p>
                        </div>
                        <button onClick={() => setActiveToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">&times;</button>
                    </div>
                ))}
            </div>

            {showRecommender && <AIResourceRecommender topicTitle={recommenderTopic} onClose={handleCloseResources} />}
            {quizModule && <AIQuizGenerator module={quizModule} onClose={() => setQuizModule(null)} />}

            {!isChatOpen && appView !== 'domainSelector' && appView !== 'customizer' && (
                <div className="fixed bottom-5 right-5 z-40">
                    <button onClick={() => handleAskTutor('')} className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-3xl hover:bg-purple-700 transition-all duration-300 hover:scale-110">
                        💬
                    </button>
                </div>
            )}

            {isChatOpen && (
                <AIChatbot
                    roadmapTitle={generatedRoadmap?.title || "your selected topic"}
                    initialMessage={chatInitialMessage}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </div>
    );
};

export default LearningPlatform;
