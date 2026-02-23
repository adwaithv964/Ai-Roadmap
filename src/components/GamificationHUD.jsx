import React, { useState } from 'react';
import { LEVELS } from '../hooks/useGamification';

// ─── Tiny animated flame ──────────────────────────────────────────────────────
const Flame = ({ active }) => (
    <span
        className={`text-xl leading-none transition-all duration-300 ${active ? 'drop-shadow-[0_0_6px_rgba(251,146,60,0.9)]' : 'opacity-40 grayscale'}`}
        style={active ? { animation: 'flamePulse 1.2s ease-in-out infinite alternate' } : {}}
    >
        🔥
        <style>{`
            @keyframes flamePulse {
                0%   { transform: scale(1)   rotate(-3deg); }
                100% { transform: scale(1.2) rotate(4deg);  }
            }
        `}</style>
    </span>
);

// ─── XP Ring progress bar ─────────────────────────────────────────────────────
const XPRing = ({ percent, color, size = 56, stroke = 5 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const fill = (percent / 100) * circ;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={stroke}
                strokeDasharray={`${fill} ${circ}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}
            />
        </svg>
    );
};

// ─── Main HUD ─────────────────────────────────────────────────────────────────
const GamificationHUD = ({ stats, levelData }) => {
    const [expanded, setExpanded] = useState(false);
    const { current: levelInfo, next, progressPercent } = levelData;

    // Ring color based on level gradient start
    const ringColors = {
        1: '#9ca3af', 2: '#34d399', 3: '#60a5fa', 4: '#818cf8',
        5: '#a78bfa', 6: '#c084fc', 7: '#f472b6', 8: '#fb923c',
        9: '#fbbf24', 10: '#facc15',
    };
    const ringColor = ringColors[levelInfo.level] || '#6366f1';

    const xpToNext = next ? next.xpRequired - stats.xp : 0;

    return (
        <div className="fixed bottom-24 left-4 z-[100]">
            {/* Collapsed pill */}
            {!expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-br ${levelInfo.color} shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 text-white`}
                    title="View Gamification Stats"
                    style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.4)` }}
                >
                    <span className="text-lg leading-none">{levelInfo.emoji}</span>
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold opacity-80 leading-none">Lv.{levelInfo.level} {levelInfo.title}</span>
                        <span className="text-[11px] font-extrabold leading-none">{stats.xp.toLocaleString()} XP</span>
                    </div>
                    <Flame active={stats.streak >= 1} />
                    {stats.streak > 0 && (
                        <span className="text-xs font-extrabold tabular-nums">{stats.streak}</span>
                    )}
                </button>
            )}

            {/* Expanded panel */}
            {expanded && (
                <div
                    className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-4 w-64"
                    style={{ animation: 'hudSlideIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
                >
                    <style>{`
                        @keyframes hudSlideIn {
                            0%   { transform: scale(0.85) translateY(10px); opacity: 0; }
                            100% { transform: scale(1) translateY(0); opacity: 1; }
                        }
                    `}</style>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Progress</span>
                        <button onClick={() => setExpanded(false)} className="text-gray-500 hover:text-gray-300 text-base leading-none transition-colors">✕</button>
                    </div>

                    {/* Level ring + info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative flex-shrink-0">
                            <XPRing percent={progressPercent} color={ringColor} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">{levelInfo.emoji}</span>
                            </div>
                        </div>
                        <div>
                            <div className={`text-lg font-extrabold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent leading-tight`}>
                                Level {levelInfo.level}
                            </div>
                            <div className="text-sm font-bold text-white">{levelInfo.title}</div>
                            <div className="text-xs text-gray-400">{stats.xp.toLocaleString()} XP total</div>
                        </div>
                    </div>

                    {/* XP progress bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                            <span>Progress to Lv.{next ? next.level : levelInfo.level}</span>
                            <span className="font-bold">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-2 rounded-full bg-gradient-to-r ${levelInfo.color} transition-all duration-700`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        {next && (
                            <p className="text-[11px] text-gray-500 mt-1 text-right">
                                {xpToNext.toLocaleString()} XP to <span className="text-gray-300 font-semibold">{next.title}</span>
                            </p>
                        )}
                    </div>

                    {/* Streak */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2.5 mb-4">
                        <div className="flex items-center gap-2">
                            <Flame active={stats.streak >= 1} />
                            <div>
                                <p className="text-xs text-gray-400 leading-none">Daily Streak</p>
                                <p className="text-base font-extrabold text-white leading-tight">{stats.streak} {stats.streak === 1 ? 'day' : 'days'}</p>
                            </div>
                        </div>
                        {stats.streak >= 3 && (
                            <span className="text-[10px] font-bold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">+10 XP/day</span>
                        )}
                    </div>

                    {/* Mini level roadmap */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Level Road</p>
                        <div className="flex items-center gap-px overflow-hidden">
                            {LEVELS.map((l, i) => {
                                const done = l.level < levelInfo.level;
                                const active = l.level === levelInfo.level;
                                return (
                                    <div key={l.level} title={`Lv.${l.level} ${l.title}`}
                                        className="flex flex-col items-center flex-1">
                                        <div className={`w-full h-1.5 rounded-full transition-all duration-300 ${done ? `bg-gradient-to-r ${l.color}` : active ? `bg-gradient-to-r ${l.color} opacity-70` : 'bg-white/10'}`} />
                                        {(i === 0 || i === 4 || i === 9) && (
                                            <span className="text-[8px] text-gray-600 mt-0.5">{l.level}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamificationHUD;
