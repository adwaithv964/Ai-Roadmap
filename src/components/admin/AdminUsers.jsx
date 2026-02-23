import React from 'react';

const AdminUsers = ({ users, onBanUser, onDeleteUser }) => {
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">User Management</h2>
                <input type="text" placeholder="Search users..." className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none w-64" />
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-white text-sm">
                        <tr>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className={`border-b border-gray-700 hover:bg-gray-700/50 ${user.isBanned ? 'bg-red-900/20' : ''}`}>
                                <td className="p-4 font-medium text-white">
                                    {user.email}
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded bg-gray-700 text-xs text-gray-300 font-mono tracking-wider">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {user.isBanned ?
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-red-600/20 text-red-400 border border-red-600/30">BANNED</span> :
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-green-600/20 text-green-400 border border-green-600/30">ACTIVE</span>
                                    }
                                </td>
                                <td className="p-4 text-sm text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => onBanUser(user._id, user.isBanned)}
                                        className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${user.isBanned ? 'text-green-400 border-green-500/50 hover:bg-green-500/10' : 'text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10'}`}
                                    >
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </button>
                                    <button
                                        onClick={() => onDeleteUser(user._id)}
                                        className="px-3 py-1 rounded text-sm font-medium text-red-400 border border-red-500/50 hover:bg-red-500/10 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="p-8 text-center text-gray-500">No users found.</p>}
            </div>
        </div>
    );
};

export default AdminUsers;
