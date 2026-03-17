import React, { useState, useEffect } from 'react';

const Toggle = ({ checked, onChange, disabled }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-green-500' : 'bg-gray-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
        <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? 'left-7' : 'left-1'
                }`}
        />
    </button>
);

const AdminSettings = ({ fetchAPI, initialSettings }) => {
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        allowRegistrations: true,
        xpMultiplier: 1.0,
        streakDecayDays: 2,
        ...initialSettings
    });
    const [saveStatus, setSaveStatus] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [purgeStatus, setPurgeStatus] = useState(null);
    const [isPurging, setIsPurging] = useState(false);

    // Sync when parent passes updated initialSettings
    useEffect(() => {
        if (initialSettings) {
            setSettings(prev => ({ ...prev, ...initialSettings }));
        }
    }, [initialSettings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus(null);
        try {
            const res = await fetchAPI('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (res.ok) {
                setSaveStatus({ ok: true, msg: '✅ Settings saved successfully!' });
            } else {
                setSaveStatus({ ok: false, msg: `❌ ${data.message}` });
            }
        } catch {
            setSaveStatus({ ok: false, msg: '❌ Network error. Please try again.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveStatus(null), 5000);
        }
    };

    const handlePurgeCache = async () => {
        if (!confirm('Are you sure you want to purge the server cache?')) return;
        setIsPurging(true);
        setPurgeStatus(null);
        try {
            const res = await fetchAPI('/api/admin/cache', { method: 'DELETE' });
            const data = await res.json();
            if (res.ok) {
                setPurgeStatus({ ok: true, msg: '✅ Cache purged successfully!' });
            } else {
                setPurgeStatus({ ok: false, msg: `❌ ${data.message}` });
            }
        } catch {
            setPurgeStatus({ ok: false, msg: '❌ Network error. Please try again.' });
        } finally {
            setIsPurging(false);
            setTimeout(() => setPurgeStatus(null), 5000);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">System Settings</h2>

            {/* Platform Toggles */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-4">
                <h3 className="text-lg font-bold text-white">Platform Controls</h3>

                <div className="flex justify-between items-center bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                    <div>
                        <span className="text-white font-semibold block">Maintenance Mode</span>
                        <span className="text-gray-400 text-sm">Prevents non-admins from accessing the platform</span>
                    </div>
                    <Toggle
                        checked={settings.maintenanceMode}
                        onChange={v => updateSetting('maintenanceMode', v)}
                    />
                </div>

                <div className="flex justify-between items-center bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                    <div>
                        <span className="text-white font-semibold block">Allow New Registrations</span>
                        <span className="text-gray-400 text-sm">Enable or disable public signups</span>
                    </div>
                    <Toggle
                        checked={settings.allowRegistrations}
                        onChange={v => updateSetting('allowRegistrations', v)}
                    />
                </div>
            </div>

            {/* Gamification Tuning */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">Gamification Tuning</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                        <div>
                            <span className="text-white font-semibold block">Global XP Multiplier</span>
                            <span className="text-gray-400 text-sm">Boost XP for events (Default: 1.0×)</span>
                        </div>
                        <input
                            type="number" step="0.1" min="1.0" max="5.0"
                            value={settings.xpMultiplier}
                            onChange={e => updateSetting('xpMultiplier', parseFloat(e.target.value))}
                            className="w-20 p-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-center focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
                        <div>
                            <span className="text-white font-semibold block">Streak Decay Rate</span>
                            <span className="text-gray-400 text-sm">Days of inactivity before streak resets</span>
                        </div>
                        <input
                            type="number" min="1" max="7"
                            value={settings.streakDecayDays}
                            onChange={e => updateSetting('streakDecayDays', parseInt(e.target.value))}
                            className="w-20 p-2 rounded-lg bg-gray-800 border border-gray-600 text-white text-center focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {saveStatus && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${saveStatus.ok
                            ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                            : 'bg-red-900/40 text-red-300 border border-red-700/50'
                        }`}>
                        {saveStatus.msg}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg transition-colors font-bold text-sm flex items-center space-x-2"
                >
                    {isSaving
                        ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div><span>Saving…</span></>
                        : <span>Save All Settings</span>
                    }
                </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <h3 className="text-lg font-bold text-red-500 mb-4">⚠️ Danger Zone</h3>

                {purgeStatus && (
                    <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${purgeStatus.ok
                            ? 'bg-green-900/40 text-green-300 border border-green-700/50'
                            : 'bg-red-900/40 text-red-300 border border-red-700/50'
                        }`}>
                        {purgeStatus.msg}
                    </div>
                )}

                <div className="border border-red-900/50 bg-red-900/10 p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <span className="text-white font-semibold block">Purge Server Cache</span>
                        <span className="text-gray-400 text-sm">Clear AI response cache & resource data</span>
                    </div>
                    <button
                        onClick={handlePurgeCache}
                        disabled={isPurging}
                        className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors font-bold text-sm"
                    >
                        {isPurging ? 'Purging…' : 'Purge'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
