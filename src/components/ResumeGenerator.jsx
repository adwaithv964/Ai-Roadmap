import React, { useState, useMemo, useCallback, useRef } from 'react';
import { auth } from '../config/firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─────────────────────────────────────────────────────────
// Helpers — extract learnable skills from progress
// ─────────────────────────────────────────────────────────

function extractLearnedSkills(roadmapData, progress) {
    const skills = new Set();
    if (!roadmapData || !progress) return [];
    roadmapData.stages.forEach(stage => {
        stage.modules.forEach(module => {
            const done = module.steps.filter(s => progress[s.id]?.completed).length;
            const total = module.steps.length;
            if (done > 0) {
                // Module title → clean skill name
                const skill = module.title.replace(/\s*\(.*?\)/g, '').trim();
                skills.add({ name: skill, level: done === total ? 'Proficient' : 'Familiar', pct: Math.round((done / total) * 100) });
            }
        });
    });
    return Array.from(skills);
}

function extractCompletedModules(roadmapData, progress) {
    const modules = [];
    if (!roadmapData || !progress) return [];
    roadmapData.stages.forEach(stage => {
        stage.modules.forEach(module => {
            const done = module.steps.filter(s => progress[s.id]?.completed).length;
            if (done === module.steps.length && module.steps.length > 0) {
                modules.push({ title: module.title, stage: stage.title });
            }
        });
    });
    return modules;
}

// ─────────────────────────────────────────────────────────
// UI Sub-components
// ─────────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">{children}</p>
);

const SkeletonLine = ({ w = 'w-full' }) => (
    <div className={`h-3 ${w} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`} />
);

const ProjectCard = ({ project, index }) => {
    const diffColors = { Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300', Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300', Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' };
    const diff = project.difficulty || 'Intermediate';
    return (
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-lg">
                        {['🌐', '📱', '🤖', '🎮', '📊', '🔐', '☁️', '⚡'][index % 8]}
                    </span>
                    <h4 className="font-bold text-sm dark:text-white">{project.name}</h4>
                </div>
                <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${diffColors[diff] || diffColors.Intermediate}`}>{diff}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
                {(project.techStack || []).map((t, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">{t}</span>
                ))}
            </div>
            {project.githubTips && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 italic">💡 {project.githubTips}</p>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────
// Resume Preview component
// ─────────────────────────────────────────────────────────
const ResumePreview = ({ resume, userInfo }) => {
    if (!resume) return null;
    return (
        <div id="resume-preview" className="bg-white text-gray-900 p-8 rounded-xl text-sm leading-relaxed font-sans shadow-inner border border-gray-200" style={{ minHeight: '600px' }}>
            {/* Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-5">
                <h1 className="text-2xl font-extrabold tracking-tight">{userInfo.name || 'Your Name'}</h1>
                <p className="text-base font-semibold text-gray-600 mt-0.5">{resume.jobTitle}</p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    {userInfo.email && <span>✉ {userInfo.email}</span>}
                    {userInfo.phone && <span>📞 {userInfo.phone}</span>}
                    {userInfo.location && <span>📍 {userInfo.location}</span>}
                    {userInfo.linkedin && <span>🔗 {userInfo.linkedin}</span>}
                    {userInfo.github && <span>⚡ github.com/{userInfo.github}</span>}
                </div>
            </div>

            {/* Summary */}
            {resume.summary && (
                <section className="mb-5">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                    <p className="text-xs text-gray-700 leading-relaxed">{resume.summary}</p>
                </section>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">Technical Skills</h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {resume.skills.map((cat, i) => (
                            <div key={i}>
                                <span className="font-bold text-xs text-gray-700">{cat.category}: </span>
                                <span className="text-xs text-gray-600">{(cat.items || []).join(', ')}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">Projects</h2>
                    {resume.projects.map((proj, i) => (
                        <div key={i} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <span className="font-bold text-xs">{proj.name}</span>
                                <span className="text-[10px] text-gray-500 italic">{(proj.tech || []).join(' · ')}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {resume.education && (
                <section className="mb-5">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
                    {userInfo.degree && (
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold text-xs">{userInfo.degree}</p>
                                <p className="text-xs text-gray-500">{userInfo.university}</p>
                            </div>
                            <p className="text-xs text-gray-500">{userInfo.gradYear}</p>
                        </div>
                    )}
                    <div className="mt-2">
                        <p className="text-xs text-gray-600 font-semibold">Self-Directed Learning — AI Roadmap Platform</p>
                        <p className="text-xs text-gray-500">{resume.courseworkSummary}</p>
                    </div>
                </section>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
                <section>
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">Certifications & Achievements</h2>
                    {resume.certifications.map((c, i) => (
                        <p key={i} className="text-xs text-gray-600">• {c}</p>
                    ))}
                </section>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────

const ResumeGenerator = ({ roadmapData, progress, onClose }) => {
    const [activeTab, setActiveTab] = useState('setup'); // 'setup' | 'resume' | 'portfolio'
    const [userInfo, setUserInfo] = useState({
        name: '', email: '', phone: '', location: '', linkedin: '', github: '',
        degree: '', university: '', gradYear: '', yearsExp: '0',
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [resume, setResume] = useState(null);
    const [projects, setProjects] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [copied, setCopied] = useState(false);
    const resumeRef = useRef(null);

    // Derived skill data
    const learnedSkills = useMemo(() => extractLearnedSkills(roadmapData, progress), [roadmapData, progress]);
    const completedModules = useMemo(() => extractCompletedModules(roadmapData, progress), [roadmapData, progress]);
    const completedCount = Object.values(progress || {}).filter(p => p.completed).length;
    const totalCount = roadmapData ? roadmapData.stages.reduce((s, st) => s + st.modules.reduce((ms, m) => ms + m.steps.length, 0), 0) : 0;
    const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // ── Gemini API call
    const generateAll = useCallback(async () => {
        if (learnedSkills.length === 0) return;
        setStatus('loading');
        setActiveTab('resume');

        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await fetch(`${API_BASE}/api/gemini/resume-generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ roadmapTitle: roadmapData.title, learnedSkills, completedModules, progressPct, userInfo }),
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const parsed = await res.json();
            setResume(parsed.resume);
            setProjects(parsed.portfolioProjects || []);
            setStatus('success');
        } catch (err) {
            console.error('Resume generator error:', err);
            setErrorMsg('Failed to generate. Please ensure you are signed in and try again.');
            setStatus('error');
            setActiveTab('setup');
        }
    }, [learnedSkills, completedModules, progressPct, roadmapData, userInfo]);

    // ── Copy resume text
    const copyResumeText = useCallback(() => {
        if (!resume) return;
        const lines = [
            (userInfo.name || 'Your Name').toUpperCase(),
            resume.jobTitle,
            [userInfo.email, userInfo.phone, userInfo.location].filter(Boolean).join(' | '),
            '',
            'PROFESSIONAL SUMMARY',
            resume.summary,
            '',
            'TECHNICAL SKILLS',
            ...(resume.skills || []).map(s => `${s.category}: ${(s.items || []).join(', ')}`),
            '',
            'PROJECTS',
            ...(resume.projects || []).flatMap(p => [`${p.name} | ${(p.tech || []).join(', ')}`, p.description, '']),
            'EDUCATION',
            userInfo.degree ? `${userInfo.degree} — ${userInfo.university} (${userInfo.gradYear})` : '',
            `Self-Directed Learning — AI Roadmap: ${resume.courseworkSummary}`,
        ].join('\n');

        navigator.clipboard.writeText(lines).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    }, [resume, userInfo]);

    // ── Download resume as plain text
    const downloadResume = useCallback(() => {
        if (!resume) return;
        const lines = [
            (userInfo.name || 'Your Name').toUpperCase(),
            resume.jobTitle,
            [userInfo.email, userInfo.phone, userInfo.location].filter(Boolean).join(' | '),
            '',
            'PROFESSIONAL SUMMARY',
            resume.summary,
            '',
            'TECHNICAL SKILLS',
            ...(resume.skills || []).map(s => `${s.category}: ${(s.items || []).join(', ')}`),
            '',
            'PROJECTS',
            ...(resume.projects || []).flatMap(p => [`${p.name} | ${(p.tech || []).join(', ')}`, p.description, '']),
            'EDUCATION',
            userInfo.degree ? `${userInfo.degree} — ${userInfo.university} (${userInfo.gradYear})` : '',
            `Self-Directed Learning — AI Roadmap: ${resume.courseworkSummary}`,
        ].join('\n');

        const blob = new Blob([lines], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(userInfo.name || 'resume').replace(/\s+/g, '_')}_resume.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }, [resume, userInfo]);

    // ─────────────────────────────────────────────────────
    // Render: Setup tab
    // ─────────────────────────────────────────────────────
    const renderSetup = () => (
        <div className="flex flex-col gap-5">
            {/* Skill snapshot */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="font-extrabold text-base">Your Skill Profile</p>
                        <p className="text-blue-100 text-xs">{roadmapData.title}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-extrabold">{progressPct}%</p>
                        <p className="text-blue-100 text-xs">roadmap done</p>
                    </div>
                </div>
                {learnedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {learnedSkills.slice(0, 12).map((s, i) => (
                            <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.level === 'Proficient' ? 'bg-white/30 text-white' : 'bg-white/15 text-blue-100'}`}>
                                {s.name} {s.level === 'Proficient' ? '✓' : ''}
                            </span>
                        ))}
                        {learnedSkills.length > 12 && <span className="text-xs text-blue-100">+{learnedSkills.length - 12} more</span>}
                    </div>
                ) : (
                    <p className="text-blue-100 text-xs">Complete some roadmap steps to unlock skill-based resume generation.</p>
                )}
            </div>

            {learnedSkills.length === 0 && (
                <div className="p-4 rounded-xl border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 text-center">
                    <p className="text-yellow-700 dark:text-yellow-400 font-bold text-sm mb-1">No skills yet!</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500">Complete at least a few roadmap steps, then come back to generate your resume.</p>
                </div>
            )}

            {/* Personal info form */}
            <div>
                <SectionLabel>Personal Information</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { key: 'name', label: 'Full Name', placeholder: 'Adwaith Vijay', required: true },
                        { key: 'email', label: 'Email', placeholder: 'you@email.com' },
                        { key: 'phone', label: 'Phone', placeholder: '+91 XXXXXXXXXX' },
                        { key: 'location', label: 'Location', placeholder: 'Bangalore, India' },
                        { key: 'linkedin', label: 'LinkedIn URL (optional)', placeholder: 'linkedin.com/in/you' },
                        { key: 'github', label: 'GitHub username', placeholder: 'yourusername' },
                    ].map(f => (
                        <div key={f.key}>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{f.label}{f.required ? ' *' : ''}</label>
                            <input
                                value={userInfo[f.key]}
                                onChange={e => setUserInfo(prev => ({ ...prev, [f.key]: e.target.value }))}
                                placeholder={f.placeholder}
                                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div>
                <SectionLabel>Education (Optional)</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { key: 'degree', label: 'Degree', placeholder: 'B.Tech Computer Science' },
                        { key: 'university', label: 'University', placeholder: 'VIT University' },
                        { key: 'gradYear', label: 'Year', placeholder: '2025' },
                    ].map(f => (
                        <div key={f.key}>
                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
                            <input
                                value={userInfo[f.key]}
                                onChange={e => setUserInfo(prev => ({ ...prev, [f.key]: e.target.value }))}
                                placeholder={f.placeholder}
                                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience level */}
            <div>
                <SectionLabel>Experience Level</SectionLabel>
                <div className="flex gap-2 flex-wrap">
                    {['0', '1', '2', '3+'].map(y => (
                        <button
                            key={y}
                            onClick={() => setUserInfo(prev => ({ ...prev, yearsExp: y }))}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${userInfo.yearsExp === y ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-300'}`}
                        >
                            {y === '0' ? 'Fresher' : `${y} yr${y !== '1' ? 's' : ''}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Generate button */}
            <button
                onClick={generateAll}
                disabled={learnedSkills.length === 0 || status === 'loading'}
                className="w-full py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating with AI...
                    </>
                ) : '✨ Generate Resume & Portfolio'}
            </button>

            {status === 'error' && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center font-semibold">{errorMsg}</p>
            )}
        </div>
    );

    // ─────────────────────────────────────────────────────
    // Render: Resume tab
    // ─────────────────────────────────────────────────────
    const renderResume = () => (
        <div className="flex flex-col gap-4">
            {status === 'loading' && (
                <div className="flex flex-col gap-3 p-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <span className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">AI is crafting your resume and portfolio suggestions...</p>
                    </div>
                    <div className="space-y-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        {[...Array(12)].map((_, i) => (
                            <SkeletonLine key={i} w={['w-1/2', 'w-full', 'w-3/4', 'w-2/3', 'w-full', 'w-5/6', 'w-1/3', 'w-full', 'w-4/5', 'w-full', 'w-2/5', 'w-3/4'][i]} />
                        ))}
                    </div>
                </div>
            )}

            {status === 'success' && resume && (
                <>
                    {/* Action bar */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={copyResumeText}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {copied ? '✅ Copied!' : '📋 Copy Text'}
                        </button>
                        <button
                            onClick={downloadResume}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            ⬇ Download .txt
                        </button>
                        <button
                            onClick={() => { setStatus('idle'); setActiveTab('setup'); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
                        >
                            🔄 Regenerate
                        </button>
                    </div>

                    {/* Resume preview */}
                    <div ref={resumeRef} className="overflow-y-auto max-h-[58vh] rounded-xl">
                        <ResumePreview resume={resume} userInfo={userInfo} />
                    </div>

                    <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                        💡 Paste this into a Google Doc and customize the formatting before sending to employers.
                    </p>
                </>
            )}
        </div>
    );

    // ─────────────────────────────────────────────────────
    // Render: Portfolio tab
    // ─────────────────────────────────────────────────────
    const renderPortfolio = () => (
        <div className="flex flex-col gap-4">
            {status === 'loading' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <span className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-700 dark:text-blue-300 text-sm">Generating portfolio ideas...</p>
                </div>
            )}

            {status === 'success' && projects.length > 0 && (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold dark:text-white">📁 Suggested GitHub Projects</p>
                            <p className="text-xs text-gray-400">Build these to impress recruiters — sorted beginner to advanced</p>
                        </div>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold px-2.5 py-1 rounded-full">{projects.length} ideas</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[60vh] pr-0.5">
                        {projects.map((p, i) => (
                            <ProjectCard key={i} project={p} index={i} />
                        ))}
                    </div>
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700">
                        <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1">🚀 GitHub Profile Tips</p>
                        <div className="text-xs text-green-700 dark:text-green-400 space-y-0.5">
                            <p>• Pin your top 3 projects and add detailed READMEs with screenshots</p>
                            <p>• Write a profile README that highlights your learning journey</p>
                            <p>• Add deployment links (Vercel/Netlify) so recruiters can see it live</p>
                            <p>• Commit regularly — a green activity graph signals active learning</p>
                        </div>
                    </div>
                </>
            )}

            {(status === 'idle' || status === 'error') && (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                    <p className="text-4xl mb-3">📁</p>
                    <p className="font-semibold">Generate your resume first</p>
                    <p className="text-xs mt-1">Portfolio suggestions appear here after generation.</p>
                    <button onClick={() => setActiveTab('setup')} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                        Go to Setup →
                    </button>
                </div>
            )}
        </div>
    );

    // ─────────────────────────────────────────────────────
    // Root
    // ─────────────────────────────────────────────────────
    const tabs = [
        { id: 'setup', label: '⚙ Setup' },
        { id: 'resume', label: '📄 Resume', disabled: false },
        { id: 'portfolio', label: '📁 Portfolio', disabled: false },
    ];

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[92vh] overflow-hidden">

                {/* Modal header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
                                📄 Resume & Portfolio Generator
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {roadmapData.title} · {completedCount} skills learned → ready to impress employers
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mt-1 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >×</button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5 overflow-y-auto flex-1">
                    {activeTab === 'setup' && renderSetup()}
                    {activeTab === 'resume' && renderResume()}
                    {activeTab === 'portfolio' && renderPortfolio()}
                </div>
            </div>
        </div>
    );
};

export default ResumeGenerator;
