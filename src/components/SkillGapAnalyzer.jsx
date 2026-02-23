import React, { useState, useRef, useCallback } from 'react';
import { domains } from '../data/constants';
import { auth } from '../config/firebase';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const SkillChip = ({ skill, onRemove }) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium
                     bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300
                     border border-blue-300 dark:border-blue-700 group">
        {skill}
        {onRemove && (
            <button
                onClick={() => onRemove(skill)}
                className="ml-0.5 text-blue-500 hover:text-red-500 dark:text-blue-400 dark:hover:text-red-400 transition-colors leading-none font-bold text-base"
                aria-label={`Remove ${skill}`}
            >
                ×
            </button>
        )}
    </span>
);

const SkeletonRow = () => (
    <div className="h-14 bg-gray-100 dark:bg-gray-700/50 rounded-xl animate-pulse" />
);

const ReadinessBar = ({ score }) => {
    const color = score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${color}`}
                style={{ width: `${score}%` }}
            />
        </div>
    );
};

// Priority badge colors
const priorityColors = {
    1: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-300 dark:border-red-700',
    2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 border-orange-300 dark:border-orange-700',
    3: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
};
const getPriorityColor = (p) => priorityColors[p] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600';

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const SkillGapAnalyzer = ({ onClose, onSelectDomain }) => {
    const [step, setStep] = useState(1); // 1: select role, 2: add skills, 3: results
    const [selectedDomainId, setSelectedDomainId] = useState('');
    const [currentSkills, setCurrentSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [analysis, setAnalysis] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const inputRef = useRef(null);

    const selectedDomain = domains.find(d => d.id === selectedDomainId);

    // Add skill chip
    const addSkill = useCallback(() => {
        const trimmed = inputValue.trim();
        if (trimmed && !currentSkills.includes(trimmed)) {
            setCurrentSkills(prev => [...prev, trimmed]);
        }
        setInputValue('');
        inputRef.current?.focus();
    }, [inputValue, currentSkills]);

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addSkill();
        } else if (e.key === 'Backspace' && inputValue === '' && currentSkills.length > 0) {
            setCurrentSkills(prev => prev.slice(0, -1));
        }
    };

    const removeSkill = (skill) => setCurrentSkills(prev => prev.filter(s => s !== skill));

    // -----------------------------------------------------------------------
    // Gemini API call
    // -----------------------------------------------------------------------
    const runAnalysis = async () => {
        if (!selectedDomain || currentSkills.length === 0) return;

        // Cache check
        const cacheKey = `skillgap_${selectedDomainId}_${currentSkills.sort().join('|')}`;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                setAnalysis(JSON.parse(cached));
                setStatus('success');
                setStep(3);
                return;
            }
        } catch (_) { /* ignore */ }

        setStatus('loading');
        setStep(3);

        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await fetch('/api/gemini/skill-gap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ domainTitle: selectedDomain.title, currentSkills }),
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const parsed = await res.json();
            setAnalysis(parsed);
            setStatus('success');
            sessionStorage.setItem(cacheKey, JSON.stringify(parsed));
        } catch (err) {
            console.error('Skill Gap analysis failed:', err);
            setErrorMsg('Failed to connect to the AI service. Please try again.');
            setStatus('error');
        }
    };

    const resetAnalysis = () => {
        setStep(2);
        setStatus('idle');
        setAnalysis(null);
        setErrorMsg('');
    };

    // -----------------------------------------------------------------------
    // Render helpers
    // -----------------------------------------------------------------------

    const renderStep1 = () => (
        <div className="flex flex-col items-center gap-6 py-4 animate-fade-in-up">
            <div className="text-center">
                <div className="text-6xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold mb-1">Select Your Target Role</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Which career are you aiming for?</p>
            </div>
            <div className="w-full max-w-md">
                <select
                    value={selectedDomainId}
                    onChange={e => setSelectedDomainId(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-base"
                >
                    <option value="">-- Choose a job role --</option>
                    {domains.map(d => (
                        <option key={d.id} value={d.id}>{d.icon} {d.title}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={() => setStep(2)}
                disabled={!selectedDomainId}
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 text-lg"
            >
                Next: Add My Skills →
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="flex flex-col gap-5 animate-fade-in-up">
            <div className="text-center">
                <div className="text-5xl mb-2">{selectedDomain?.icon}</div>
                <h3 className="text-xl font-bold">{selectedDomain?.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Type your skills and press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">Enter</kbd> to add each one
                </p>
            </div>

            {/* Skill input area */}
            <div
                onClick={() => inputRef.current?.focus()}
                className="min-h-[100px] w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-all cursor-text flex flex-wrap gap-2 items-start"
            >
                {currentSkills.map(s => (
                    <SkillChip key={s} skill={s} onRemove={removeSkill} />
                ))}
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    onBlur={() => { if (inputValue.trim()) addSkill(); }}
                    placeholder={currentSkills.length === 0 ? 'e.g. HTML, CSS, JavaScript...' : 'Add more...'}
                    className="flex-1 min-w-[150px] bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm py-1"
                />
            </div>

            {/* Quick add suggestions */}
            <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                    {getQuickSuggestions(selectedDomainId)
                        .filter(s => !currentSkills.includes(s))
                        .slice(0, 8)
                        .map(s => (
                            <button
                                key={s}
                                onClick={() => setCurrentSkills(prev => prev.includes(s) ? prev : [...prev, s])}
                                className="px-2.5 py-1 text-xs rounded-full border border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                + {s}
                            </button>
                        ))}
                </div>
            </div>

            <div className="flex gap-3 justify-between pt-2">
                <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    ← Back
                </button>
                <button
                    onClick={runAnalysis}
                    disabled={currentSkills.length === 0}
                    className="flex-1 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
                >
                    🔍 Analyze My Skills
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="flex flex-col gap-5 animate-fade-in-up">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">{selectedDomain?.icon} {selectedDomain?.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Skills analyzed: {currentSkills.join(', ')}</p>
                </div>
                <button
                    onClick={resetAnalysis}
                    className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                    ← Edit
                </button>
            </div>

            {/* Loading state */}
            {status === 'loading' && (
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">AI is analyzing your skill profile...</p>
                    </div>
                    {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
                </div>
            )}

            {/* Error state */}
            {status === 'error' && (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="text-5xl">😕</div>
                    <p className="text-red-500 font-semibold">Analysis Failed</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{errorMsg}</p>
                    <button
                        onClick={runAnalysis}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Success state */}
            {status === 'success' && analysis && (
                <div className="flex flex-col gap-5 overflow-y-auto max-h-[62vh] pr-1">

                    {/* Readiness Score */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/60 border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-sm">📊 Career Readiness Score</span>
                            <span className={`text-2xl font-extrabold ${analysis.readinessScore >= 70 ? 'text-green-500' : analysis.readinessScore >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {analysis.readinessScore}%
                            </span>
                        </div>
                        <ReadinessBar score={analysis.readinessScore} />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed">{analysis.summary}</p>
                    </div>

                    {/* Matched Skills */}
                    {analysis.matchedSkills?.length > 0 && (
                        <div>
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <span className="text-green-500">✅</span> Skills You Already Have
                                <span className="text-xs font-normal text-gray-400">({analysis.matchedSkills.length})</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis.matchedSkills.map((item, i) => (
                                    <span
                                        key={i}
                                        title={item.relevance}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border border-green-300 dark:border-green-700"
                                    >
                                        ✓ {item.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Missing Skills */}
                    {analysis.missingSkills?.length > 0 && (
                        <div>
                            <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                                <span>🎯</span> Missing Skills — Priority Order
                                <span className="text-xs font-normal text-gray-400">({analysis.missingSkills.length} skills)</span>
                            </h4>
                            <div className="flex flex-col gap-3">
                                {analysis.missingSkills.map((item, i) => (
                                    <div
                                        key={i}
                                        className="p-3.5 rounded-xl border bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold flex items-center justify-center text-gray-600 dark:text-gray-300 mt-0.5">
                                                    {i + 1}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <span className="font-bold text-gray-900 dark:text-white">{item.skill}</span>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(item.priority)}`}>
                                                            {item.priority === 1 ? '🔴 Critical' : item.priority === 2 ? '🟠 Important' : '🟡 Nice-to-have'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.reason}</p>
                                                    {item.resources && (
                                                        <p className="text-xs text-blue-500 dark:text-blue-400 mt-1 italic">💡 {item.resources}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400">{item.estimatedHours}h</div>
                                                <div className="text-[10px] text-gray-400">est. time</div>
                                                {item.estimatedHours >= 40 && (
                                                    <div className="text-[10px] text-gray-400">~{Math.round(item.estimatedHours / 40)}w</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Total time estimate */}
                    {analysis.missingSkills?.length > 0 && (
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-sm text-purple-800 dark:text-purple-300">⏱ Total Learning Investment</p>
                                <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">To fill all identified skill gaps</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">
                                    {analysis.missingSkills.reduce((sum, s) => sum + (s.estimatedHours || 0), 0)}h
                                </p>
                                <p className="text-xs text-purple-500 dark:text-purple-400">
                                    ≈ {Math.ceil(analysis.missingSkills.reduce((sum, s) => sum + (s.estimatedHours || 0), 0) / 40)} weeks
                                </p>
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {onSelectDomain && (
                        <button
                            onClick={() => { onClose(); onSelectDomain(selectedDomainId); }}
                            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
                        >
                            🚀 Start Learning {selectedDomain?.title}
                        </button>
                    )}
                </div>
            )}
        </div>
    );

    // -----------------------------------------------------------------------
    // Step indicator
    // -----------------------------------------------------------------------
    const steps = [
        { n: 1, label: 'Target Role' },
        { n: 2, label: 'Your Skills' },
        { n: 3, label: 'Analysis' },
    ];

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Modal header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-extrabold flex items-center gap-2">
                                🎯 Skill Gap Analyzer
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                Discover what you need to learn for your dream role
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mt-1 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>

                    {/* Step indicator */}
                    <div className="flex items-center gap-0 mt-4">
                        {steps.map((s, i) => (
                            <React.Fragment key={s.n}>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                                        ${step >= s.n
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30'
                                            : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
                                        }`}>
                                        {step > s.n ? '✓' : s.n}
                                    </div>
                                    <span className={`text-xs font-medium hidden sm:inline ${step >= s.n ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${step > s.n ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Modal body */}
                <div className="px-6 py-5 overflow-y-auto flex-1">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Quick suggestion skill sets per domain
// ---------------------------------------------------------------------------
function getQuickSuggestions(domainId) {
    const map = {
        frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Tailwind CSS', 'REST APIs', 'Figma', 'Testing'],
        backend: ['Node.js', 'Python', 'SQL', 'REST APIs', 'Git', 'Docker', 'MongoDB', 'Express.js', 'Authentication', 'Linux'],
        fullstack: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'REST APIs', 'TypeScript'],
        datascience: ['Python', 'SQL', 'Excel', 'Statistics', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization', 'Jupyter', 'Git'],
        machinelearning: ['Python', 'Mathematics', 'Statistics', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Linear Algebra', 'Git', 'SQL'],
        devops: ['Linux', 'Git', 'Docker', 'CI/CD', 'AWS', 'Bash', 'Kubernetes', 'Terraform', 'Monitoring', 'Networking'],
        cybersecurity: ['Networking', 'Linux', 'Python', 'Security Fundamentals', 'Cryptography', 'Firewalls', 'Vulnerability Assessment', 'Git', 'Bash', 'SQL'],
        ios: ['Swift', 'Xcode', 'OOP', 'Git', 'REST APIs', 'JSON', 'UI Design', 'App Store Guidelines', 'Testing', 'Debugging'],
        android: ['Kotlin', 'Android Studio', 'OOP', 'Git', 'REST APIs', 'JSON', 'Material Design', 'SQL', 'Testing', 'Gradle'],
        uidesign: ['Figma', 'Design Principles', 'Wireframing', 'Prototyping', 'Color Theory', 'Typography', 'User Research', 'Adobe XD', 'Accessibility', 'Responsive Design'],
        cloudengineering: ['Linux', 'Networking', 'AWS', 'Git', 'Docker', 'Python', 'Terraform', 'Kubernetes', 'CI/CD', 'Security'],
        default: ['Communication', 'Problem Solving', 'Git', 'English', 'Microsoft Office', 'Project Management', 'Teamwork', 'Critical Thinking'],
    };
    return map[domainId] || map.default;
}

export default SkillGapAnalyzer;
