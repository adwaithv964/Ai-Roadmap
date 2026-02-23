import React, { useEffect, useRef } from 'react';

/**
 * XPToast — animated "+N XP" floating toast.
 * Props: amount (number), reason (string), onDone (callback after animation)
 */
const XPToast = ({ amount, reason, onDone }) => {
    const ref = useRef(null);
    const isDeduction = reason === 'unchecked';

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const t = setTimeout(() => { onDone?.(); }, 1600);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div
            ref={ref}
            className="pointer-events-none flex flex-col items-center"
            style={{ animation: 'xpFlyUp 1.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
        >
            <div className={`flex items-center gap-1.5 font-extrabold text-sm px-4 py-1.5 rounded-full shadow-xl border ${isDeduction
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400 shadow-red-500/30'
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 border-yellow-300 shadow-yellow-500/30'
                }`}>
                <span className="text-base">{isDeduction ? '💔' : '⚡'}</span>
                <span>{isDeduction ? `-${amount} XP` : `+${amount} XP`}</span>
            </div>
            {!isDeduction && reason && (
                <span className="mt-1 text-[10px] font-semibold text-yellow-300/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {reason}
                </span>
            )}
            {isDeduction && (
                <span className="mt-1 text-[10px] font-semibold text-red-300/80 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Step unchecked
                </span>
            )}
            <style>{`
                @keyframes xpFlyUp {
                    0%   { opacity: 0; transform: translateY(0) scale(0.8); }
                    15%  { opacity: 1; transform: translateY(-8px) scale(1.1); }
                    70%  { opacity: 1; transform: translateY(-48px) scale(1); }
                    100% { opacity: 0; transform: translateY(-72px) scale(0.9); }
                }
            `}</style>
        </div>
    );
};

/**
 * XPToastContainer — manages a stack of XP toasts.
 * Place once in the app, controls via `toasts` prop: [{ id, amount, reason }]
 */
export const XPToastContainer = ({ toasts, onRemove }) => {
    if (!toasts.length) return null;
    return (
        <div className="fixed bottom-32 right-6 z-[180] flex flex-col-reverse gap-2 items-end pointer-events-none">
            {toasts.map(t => (
                <XPToast
                    key={t.id}
                    amount={t.amount}
                    reason={t.reason}
                    onDone={() => onRemove(t.id)}
                />
            ))}
        </div>
    );
};

export default XPToast;
