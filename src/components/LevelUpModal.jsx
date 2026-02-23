import React, { useState } from 'react';
import { getLevelData, LEVELS } from '../hooks/useGamification';

// ─── Confetti particle (CSS-only) ─────────────────────────────────────────────
const COLORS = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6', '#f97316', '#a855f7', '#22c55e'];

const Confetti = () => {
    const particles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${1.5 + Math.random() * 2}s`,
        size: `${6 + Math.random() * 8}px`,
        rotate: `${Math.random() * 720}deg`,
        shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle',
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: p.left,
                        top: '-10px',
                        width: p.size,
                        height: p.size,
                        background: p.shape === 'triangle' ? 'transparent' : p.color,
                        borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
                        borderLeft: p.shape === 'triangle' ? `${parseInt(p.size) / 2}px solid transparent` : 'none',
                        borderRight: p.shape === 'triangle' ? `${parseInt(p.size) / 2}px solid transparent` : 'none',
                        borderBottom: p.shape === 'triangle' ? `${parseInt(p.size)}px solid ${p.color}` : 'none',
                        animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confettiFall {
                    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
                    80%  { opacity: 1; }
                    100% { transform: translateY(100vh) rotate(var(--rot, 360deg)); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

// ─── Level Up Badge Animation ─────────────────────────────────────────────────
const LevelBadge = ({ levelInfo }) => (
    <div className="relative flex flex-col items-center">
        <div
            className={`w-36 h-36 rounded-full bg-gradient-to-br ${levelInfo.color} flex flex-col items-center justify-center shadow-2xl`}
            style={{ animation: 'levelBadgePop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
        >
            <span className="text-5xl">{levelInfo.emoji}</span>
        </div>
        {/* Glow rings */}
        <div className={`absolute w-36 h-36 rounded-full bg-gradient-to-br ${levelInfo.color} opacity-30`}
            style={{ animation: 'pingOnce 1s 0.4s ease-out forwards', transform: 'scale(1)' }} />
        <div className={`absolute w-36 h-36 rounded-full bg-gradient-to-br ${levelInfo.color} opacity-20`}
            style={{ animation: 'pingOnce 1s 0.7s ease-out forwards', transform: 'scale(1)' }} />
        <style>{`
            @keyframes levelBadgePop {
                0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
                70%  { transform: scale(1.15) rotate(5deg); opacity: 1; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            @keyframes pingOnce {
                0%   { transform: scale(1); opacity: 0.3; }
                100% { transform: scale(2.5); opacity: 0; }
            }
        `}</style>
    </div>
);

// ─── Perks unlocked at each level ────────────────────────────────────────────
const LEVEL_PERKS = {
    2: ['🗺️ Access to all learning domains', '📊 Progress dashboard unlocked'],
    3: ['📖 AI Tutor chat enabled', '🎯 Weekly Planner access'],
    4: ['🎓 Skill Gap Analyzer unlocked', '💬 Community Feed access'],
    5: ['⭐ Smart Resource Ranking enabled', '👥 Can create Study Groups'],
    6: ['💡 AI Quiz Generator unlocked', '📄 Resume Generator access'],
    7: ['🔥 Streak Bonus XP doubled', '🏆 Leaderboard ranking featured'],
    8: ['⚡ Priority AI responses', '🌟 Elite community badge'],
    9: ['💎 Custom roadmap themes', '🎖️ Legend badge on all posts'],
    10: ['👑 Champion title forever', '🏅 Hall of Fame listing'],
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LevelUpModal = ({ newLevel, newLevelTitle, onClose }) => {
    const [dismissed, setDismissed] = useState(false);
    const levelInfo = LEVELS.find(l => l.level === newLevel) || LEVELS[0];
    const perks = LEVEL_PERKS[newLevel] || [];

    const handleClose = () => { setDismissed(true); setTimeout(onClose, 300); };

    // Auto-dismiss after 7s
    React.useEffect(() => {
        const t = setTimeout(handleClose, 7000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-300 ${dismissed ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
            onClick={handleClose}
        >
            <Confetti />

            <div
                className="relative bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center"
                style={{ animation: 'modalSlideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Glow background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${levelInfo.color} opacity-10`} />

                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">🎉 Level Up!</p>

                <LevelBadge levelInfo={levelInfo} />

                <h2
                    className={`text-4xl font-black mt-6 mb-1 bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}
                    style={{ animation: 'fadeInUp 0.5s 0.4s ease both' }}
                >
                    Level {newLevel}
                </h2>
                <p
                    className="text-xl font-bold text-white mb-6"
                    style={{ animation: 'fadeInUp 0.5s 0.55s ease both' }}
                >
                    {levelInfo.emoji} {newLevelTitle}
                </p>

                {perks.length > 0 && (
                    <div
                        className="w-full bg-white/5 rounded-2xl p-4 mb-6 text-left"
                        style={{ animation: 'fadeInUp 0.5s 0.7s ease both' }}
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">🔓 Newly Unlocked</p>
                        <ul className="space-y-2">
                            {perks.map((p, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                                    <span className="text-green-400 font-bold">✓</span> {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={handleClose}
                    className={`w-full py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r ${levelInfo.color} shadow-lg hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-100`}
                    style={{ animation: 'fadeInUp 0.5s 0.85s ease both' }}
                >
                    Let's Keep Going! 🚀
                </button>

                <p className="text-xs text-gray-600 mt-3">Auto-closes in a few seconds</p>
            </div>
            <style>{`
                @keyframes modalSlideUp {
                    0%   { transform: translateY(60px) scale(0.9); opacity: 0; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes fadeInUp {
                    0%   { opacity: 0; transform: translateY(16px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default LevelUpModal;
