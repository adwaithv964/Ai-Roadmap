import React, { useState } from 'react';

const ROLES = ['user', 'support', 'domain_expert', 'super_admin'];

const AdminUsers = ({ users, onBanUser, onDeleteUser, onRoleChange }) => {
    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-3xl font-bold text-white">User Management</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{filtered.length} / {users.length} users</span>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by email…"
                        className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none w-64 text-sm"
                    />
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300 text-sm">
                        <thead className="bg-gray-700/80 text-white text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(user => (
                                <tr
                                    key={user._id}
                                    className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${user.isBanned ? 'bg-red-900/10' : ''}`}
                                >
                                    <td className="p-4 font-medium text-white">{user.email}</td>

                                    {/* Role Change Dropdown */}
                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={e => onRoleChange(user._id, e.target.value)}
                                            className="bg-gray-700 border border-gray-600 text-gray-200 text-xs rounded px-2 py-1 focus:border-blue-500 outline-none cursor-pointer"
                                        >
                                            {ROLES.map(r => (
                                                <option key={r} value={r}>{r.replace('_', ' ')}</option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="p-4">
                                        {user.isBanned ? (
                                            <span className="px-2 py-1 rounded text-xs font-bold bg-red-600/20 text-red-400 border border-red-600/30">BANNED</span>
                                        ) : (
                                            <span className="px-2 py-1 rounded text-xs font-bold bg-green-600/20 text-green-400 border border-green-600/30">ACTIVE</span>
                                        )}
                                    </td>

                                    <td className="p-4 text-xs text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => onBanUser(user._id, user.isBanned)}
                                            className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${user.isBanned
                                                    ? 'text-green-400 border-green-500/50 hover:bg-green-500/10'
                                                    : 'text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10'
                                                }`}
                                        >
                                            {user.isBanned ? 'Unban' : 'Ban'}
                                        </button>
                                        <button
                                            onClick={() => onDeleteUser(user._id)}
                                            className="px-3 py-1 rounded text-xs font-medium text-red-400 border border-red-500/50 hover:bg-red-500/10 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p className="p-8 text-center text-gray-500">
                            {search ? 'No users match your search.' : 'No users found.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
