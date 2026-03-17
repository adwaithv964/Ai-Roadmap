import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { auth } from '../config/firebase';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import DomainSelector from '../components/DomainSelector';
import RoadmapCustomizer from '../components/RoadmapCustomizer';
import RoadmapView from '../components/RoadmapView';
import DashboardView from '../components/DashboardView';
import AIResourceRecommender from '../components/AIResourceRecommender';
import AIChatbot from '../components/AIChatbot';
import AIQuizGenerator from '../components/AIQuizGenerator';
import SkillGapAnalyzer from '../components/SkillGapAnalyzer';
import WeeklyPlanner from '../components/WeeklyPlanner';
import ResumeGenerator from '../components/ResumeGenerator';
import CommunityHub from '../components/CommunityHub';
import GamificationHUD from '../components/GamificationHUD';
import LevelUpModal from '../components/LevelUpModal';
import { XPToastContainer } from '../components/XPToast';
import { useGamification } from '../hooks/useGamification';
import { useProgressIntelligence } from '../hooks/useProgressIntelligence';
import { motivationalAlerts, domains } from '../data/constants';

const LearningPlatform = ({ onBackToHome, onLogout }) => {
    const [appView, setAppView] = useState(() => {
        // Restore inner view from hash on first load
        const hash = window.location.hash.slice(1);
        if (['domainSelector', 'customizer', 'roadmap', 'dashboard'].includes(hash)) return hash;
        return 'domainSelector';
    });
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
    const [showSkillGap, setShowSkillGap] = useState(false);
    const [showWeeklyPlanner, setShowWeeklyPlanner] = useState(false);
    const [showResumeGenerator, setShowResumeGenerator] = useState(false);
    const [showCommunity, setShowCommunity] = useState(false);

    // ── Hash-based inner view navigation (enables browser back/forward) ────────
    const navigateAppView = useCallback((newView, options = {}) => {
        const { replace = false, domainId = null } = options;
        const hash = `#${newView}`;
        const state = { appView: newView, domainId: domainId ?? selectedDomain };
        if (replace) {
            window.history.replaceState(state, '', hash);
        } else {
            window.history.pushState(state, '', hash);
        }
        setAppView(newView);
    }, [selectedDomain]);

    // Handle browser back / forward within the platform
    useEffect(() => {
        const handlePopState = (e) => {
            const restoredView = e.state?.appView;
            if (restoredView && ['domainSelector', 'customizer', 'roadmap', 'dashboard'].includes(restoredView)) {
                setAppView(restoredView);
                // If popping back to domainSelector from within, clear roadmap state
                if (restoredView === 'domainSelector') {
                    setSelectedDomain(null);
                    setGeneratedRoadmap(null);
                }
            } else {
                // No inner state — user popped out to the top-level app routing
                // Let App.jsx handle it via its own popstate listener
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Set initial hash state so the very first back press works
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (!hash || !['domainSelector', 'customizer', 'roadmap', 'dashboard'].includes(hash)) {
            window.history.replaceState({ appView: 'domainSelector' }, '', '#domainSelector');
        }
    }, []);


    const { stats: gamStats, awardXP, levelData } = useGamification();
    const [xpToasts, setXpToasts] = useState([]);
    const [levelUpEvent, setLevelUpEvent] = useState(null); // { newLevel, newLevelTitle }

    const pushXPToast = useCallback((amount, reason) => {
        const id = Date.now() + Math.random();
        setXpToasts(prev => [...prev, { id, amount, reason }]);
    }, []);

    const removeXPToast = useCallback((id) => {
        setXpToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Intelligence hook — runs on every progress change
    const targetDate = (() => { try { return localStorage.getItem('learningTargetDate') || ''; } catch { return ''; } })();
    const intel = useProgressIntelligence(progress, generatedRoadmap, targetDate);
    const lastAlertIdsRef = useRef(new Set());

    // Surface new high-severity intelligence alerts as toasts
    useEffect(() => {
        if (!intel || !intel.alerts) return;
        intel.alerts.forEach(alert => {
            if (alert.severity >= 2 && !lastAlertIdsRef.current.has(alert.id)) {
                lastAlertIdsRef.current.add(alert.id);
                const id = Date.now() + Math.random();
                const newToast = { id, title: alert.title, message: alert.message, icon: alert.icon };
                setActiveToasts(prev => [...prev, newToast]);
                setNotifications(prev => [newToast, ...prev].slice(0, 20));
                setTimeout(() => setActiveToasts(prev => prev.filter(t => t.id !== id)), 7000);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intel.alerts]);

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
        navigateAppView('customizer', { domainId });
    };

    const handleGenerateRoadmap = async (roadmapData) => {
        // Create a deep copy so we can mutate it with adaptations
        let adaptedRoadmap = JSON.parse(JSON.stringify(roadmapData));

        // 1. Fetch adaptations and progress from backend
        let adaptations = { addedModules: [], skippedSteps: [] };
        let backendProgress = {};
        let timeSpent = {};
        let quizScores = {};

        try {
            const token = await auth.currentUser?.getIdToken();
            if (token) {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/progress/${selectedDomain}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    backendProgress = data.progress || {};
                    timeSpent = data.timeSpent || {};
                    quizScores = data.quizScores || {};
                    adaptations = data.adaptations || { addedModules: [], skippedSteps: [] };
                }
            }
        } catch (e) {
            console.error("Failed to fetch adaptations from backend", e);
        }

        // 2. Apply Skipped Steps
        if (adaptations.skippedSteps && adaptations.skippedSteps.length > 0) {
            adaptedRoadmap.stages.forEach(stage => {
                stage.modules.forEach(module => {
                    module.steps = module.steps.map(step => {
                        if (adaptations.skippedSteps.includes(step.id)) {
                            return { ...step, title: `⏭️ [Skipped] ${step.title}`, isSkipped: true };
                        }
                        return step;
                    });
                });
            });
        }

        // 3. Apply Added Modules
        if (adaptations.addedModules && adaptations.addedModules.length > 0) {
            adaptations.addedModules.forEach(adaptation => {
                const { afterModuleId, module: newModule } = adaptation;
                adaptedRoadmap.stages.forEach(stage => {
                    const targetIndex = stage.modules.findIndex(m => m.id === afterModuleId);
                    if (targetIndex !== -1) {
                        // Check if it's already added to prevent duplicates on re-renders
                        if (!stage.modules.find(m => m.id === newModule.id)) {
                            stage.modules.splice(targetIndex + 1, 0, newModule);
                        }
                    }
                });
            });
        }

        setGeneratedRoadmap(adaptedRoadmap);

        // 4. Merge Progress
        const initialProgress = {};
        adaptedRoadmap.stages.forEach(stage => {
            stage.modules.forEach(module => {
                module.steps.forEach(step => {
                    // Auto-complete skipped steps
                    initialProgress[step.id] = { completed: !!step.isSkipped, skills: [] };
                });
            });
        });

        // Merge backend progress
        Object.keys(backendProgress).forEach(stepId => {
            if (initialProgress[stepId]) {
                initialProgress[stepId] = { ...initialProgress[stepId], ...backendProgress[stepId] };
            }
        });

        // Fallback to local storage if backend is empty/failed
        if (Object.keys(backendProgress).length === 0) {
            try {
                const savedProgress = localStorage.getItem(`progress_${selectedDomain}`);
                if (savedProgress) {
                    const parsedSaved = JSON.parse(savedProgress);
                    Object.keys(initialProgress).forEach(stepId => {
                        if (parsedSaved[stepId]) {
                            initialProgress[stepId] = { ...initialProgress[stepId], ...parsedSaved[stepId] };
                        }
                    });
                }
            } catch (e) { console.error("Could not merge progress", e) }
        }

        setProgress(initialProgress);
        navigateAppView('roadmap', { replace: false });
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

    const handleToggleStep = async (step, moduleTitle) => {
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

        // ── XP deduction on UNTICK ──────────────────────────────────
        if (!isNowCompleted) {
            awardXP(-20, `Step unchecked: ${step.title || step.id}`).then(r => {
                pushXPToast(Math.abs(r.xpAwarded || 20), 'unchecked');
            });
            return;
        }

        const completedCountAfter = completedCountBefore + 1;
        const progressPercentBefore = Math.round((completedCountBefore / totalSteps) * 100);
        const progressPercentAfter = Math.round((completedCountAfter / totalSteps) * 100);

        // ── Milestone toasts ─────────────────────────────────────────────────
        const milestones = [25, 50, 75];
        let hitMilestone = false;
        milestones.forEach(ms => {
            if (progressPercentBefore < ms && progressPercentAfter >= ms) {
                hitMilestone = true;
                const message = motivationalAlerts.milestone[Math.floor(Math.random() * motivationalAlerts.milestone.length)];
                showToast(`Reached ${ms}% Progress!`, message, 'milestone');
                // Award milestone XP
                awardXP(100, `${ms}% milestone reached!`).then(r => {
                    pushXPToast(r.xpAwarded || 100, `🎯 ${ms}% Milestone!`);
                    if (r.leveledUp) setLevelUpEvent({ newLevel: r.newLevel, newLevelTitle: r.newLevelTitle });
                });
            }
        });

        if (completedCountAfter === 1) {
            const message = motivationalAlerts.first_step[Math.floor(Math.random() * motivationalAlerts.first_step.length)];
            showToast('First Step Taken!', message, 'first_step');
            awardXP(20, 'First step!').then(r => {
                pushXPToast(r.xpAwarded || 20, '🎉 First Step!');
                if (r.leveledUp) setLevelUpEvent({ newLevel: r.newLevel, newLevelTitle: r.newLevelTitle });
            });
            return;
        }

        // ── Module complete ──────────────────────────────────────────────────
        const module = generatedRoadmap.stages.flatMap(s => s.modules).find(m => m.title === moduleTitle);
        if (module) {
            const allModuleStepsCompleted = module.steps.every(s => newState[s.id]?.completed);
            if (allModuleStepsCompleted) {
                const message = motivationalAlerts.stage_complete[Math.floor(Math.random() * motivationalAlerts.stage_complete.length)];
                showToast(`Module "${module.title}" Complete!`, message, 'stage_complete');
                awardXP(50, `Module complete: ${module.title}`).then(r => {
                    pushXPToast(r.xpAwarded || 50, `📦 Module Done!`);
                    if (r.leveledUp) setLevelUpEvent({ newLevel: r.newLevel, newLevelTitle: r.newLevelTitle });
                });
                return;
            }
        }

        // ── Regular step XP ──────────────────────────────────────────────────
        if (!hitMilestone) {
            const message = motivationalAlerts.general[Math.floor(Math.random() * motivationalAlerts.general.length)];
            showToast('Step Completed!', message, 'general');
            awardXP(20, `Step: ${step.title || step.id}`).then(r => {
                pushXPToast(r.xpAwarded || 20, '✅ Step Done');
                if (r.leveledUp) setLevelUpEvent({ newLevel: r.newLevel, newLevelTitle: r.newLevelTitle });
            });
        }
    };

    const handleTimeSpent = async (moduleId, timeSpentSeconds) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            if (token && selectedDomain) {
                await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/progress/${selectedDomain}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ moduleId, timeSpent: timeSpentSeconds })
                });
            }
        } catch (e) { console.error("Time tracking error", e) }
    };

    const handleQuizComplete = async (moduleId, score) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            if (token && selectedDomain) {
                // 1. Save Score
                await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/progress/${selectedDomain}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ moduleId, quizScore: score })
                });

                // 2. Trigger AI Engine
                const aiRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/adaptive/trigger`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ domainId: selectedDomain })
                });

                if (aiRes.ok) {
                    const data = await aiRes.json();
                    if (data.adaptations && (data.adaptations.addedModules.length > 0 || data.adaptations.skippedSteps.length > 0)) {
                        showToast("Roadmap Adapted!", "The AI has analyzed your performance and adjusted your learning path.", "milestone");
                        // Refresh the roadmap display by re-running the generator with the base static data
                        const baseDomain = domains.find(d => d.id === selectedDomain);
                        if (baseDomain) {
                            // We need to re-fetch the static roadmap data for this domain.
                            // For simplicity here, we assume if we just trigger a 'customizer' view -> 'generate' again, it works.
                            // A cleaner way is to keep base unadapted roadmap in state, but we'll cheat a bit by re-generating.
                            handleSelectDomain(selectedDomain);
                        }
                    }
                }
            }
        } catch (e) { console.error("Quiz tracking error", e) }
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
                    title: 'Architect Your Future',
                    subtitle: 'Master the technologies shaping the world of tomorrow.'
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
                onLogout={onLogout}
                onOpenSkillGap={() => setShowSkillGap(true)}
                onOpenCommunity={() => setShowCommunity(true)}
            />

            <PageHeader title={pageHeaderContent.title} subtitle={pageHeaderContent.subtitle} />

            <main>
                {appView === 'domainSelector' && <DomainSelector onSelectDomain={handleSelectDomain} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
                {appView === 'customizer' && <RoadmapCustomizer domainId={selectedDomain} onGenerateRoadmap={handleGenerateRoadmap} onBack={() => navigateAppView('domainSelector')} />}
                {appView === 'roadmap' && generatedRoadmap && (
                    <RoadmapView
                        roadmapData={generatedRoadmap}
                        progress={progress}
                        onToggleStep={handleToggleStep}
                        onGoToDashboard={() => navigateAppView('dashboard')}
                        onShowResources={handleShowResources}
                        onAskTutor={handleAskTutor}
                        onGenerateQuiz={handleGenerateQuiz}
                        onOpenPlanner={() => setShowWeeklyPlanner(true)}
                        onOpenResume={() => setShowResumeGenerator(true)}
                        onTimeSpent={handleTimeSpent}
                    />
                )}
                {appView === 'dashboard' && generatedRoadmap && (
                    <DashboardView
                        roadmapData={generatedRoadmap}
                        progress={progress}
                        onBackToRoadmap={() => navigateAppView('roadmap')}
                    />
                )}
            </main>

            <div className="fixed top-24 right-3 z-50 space-y-3 w-72 max-w-[calc(100vw-1.5rem)]">
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
            {quizModule && <AIQuizGenerator module={quizModule} onClose={() => setQuizModule(null)} onQuizComplete={handleQuizComplete} />}
            {showSkillGap && (
                <SkillGapAnalyzer
                    onClose={() => setShowSkillGap(false)}
                    onSelectDomain={(domainId) => {
                        setShowSkillGap(false);
                        handleSelectDomain(domainId);
                    }}
                />
            )}
            {showWeeklyPlanner && generatedRoadmap && (
                <WeeklyPlanner
                    roadmapData={generatedRoadmap}
                    progress={progress}
                    onClose={() => setShowWeeklyPlanner(false)}
                    onToggleStep={handleToggleStep}
                    onAskTutor={(msg) => { setShowWeeklyPlanner(false); handleAskTutor(msg); }}
                />
            )}
            {showResumeGenerator && generatedRoadmap && (
                <ResumeGenerator
                    roadmapData={generatedRoadmap}
                    progress={progress}
                    onClose={() => setShowResumeGenerator(false)}
                />
            )}
            {showCommunity && (
                <CommunityHub
                    onClose={() => setShowCommunity(false)}
                    roadmapData={generatedRoadmap}
                    progress={progress}
                    domains={domains}
                />
            )}

            {/* ── Gamification overlays ────────────────────────────── */}
            {levelUpEvent && (
                <LevelUpModal
                    newLevel={levelUpEvent.newLevel}
                    newLevelTitle={levelUpEvent.newLevelTitle}
                    onClose={() => setLevelUpEvent(null)}
                />
            )}
            <XPToastContainer toasts={xpToasts} onRemove={removeXPToast} />
            {appView !== 'domainSelector' && appView !== 'customizer' && (
                <GamificationHUD stats={gamStats} levelData={levelData} />
            )}

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
