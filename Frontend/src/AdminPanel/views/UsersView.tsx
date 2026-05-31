import { useEffect, useState } from 'react';
import { SectionTitle, StatusPill, ActionBtn } from '../components';

const API_URL = 'https://finalyearak-1.onrender.com/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface LoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: string;
}

export const UsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const [usersRes, loginRes] = await Promise.all([
          fetch(`${API_URL}/admin/users`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/login-attempts`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const usersData = await usersRes.json();
        const loginData = await loginRes.json();

        if (usersData.success) setUsers(usersData.data);
        if (loginData.success) setLoginAttempts(loginData.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user account?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.filter(u => u.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <SectionTitle title="User Accounts" subtitle="Manage users table — students and admins" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-slate-600">All Users</p>
              <div className="relative group">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search user..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-[11px] w-48 shadow-inner"
                />
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-6 py-2 rounded-xl btn-premium shadow-lg">
              <i className="ri-user-add-line" /> Add Admin
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</th>
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Created</th>
                  <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(u => 
                    u.username.toLowerCase().includes(search.toLowerCase()) || 
                    u.email.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(u => (
                  <tr key={u.id} className="border-t border-slate-50 hover:bg-amber-50/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{u.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{u.username}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{u.email}</td>
                    <td className="px-5 py-3.5"><StatusPill status={u.role} /></td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{u.createdAt}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <ActionBtn icon="ri-lock-password-line" label="Reset Password" color="blue" />
                        <ActionBtn icon="ri-delete-bin-line" label="Delete" color="red" onClick={() => handleDeleteUser(u.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <p className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <i className="ri-shield-flash-line text-amber-500" /> Security Monitor
            </p>
            <div className="space-y-3">
              {loginAttempts.map((l, i) => (
                <div key={i} className={`p-3 rounded-xl border ${l.attempts >= 4 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-slate-700 truncate max-w-160px">{l.email}</p>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${l.attempts >= 4 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                      {l.attempts}x
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">{l.lastAttempt}</p>
                  {l.attempts >= 4 && (
                    <button className="mt-2 text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors">
                      Block IP →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <p className="text-sm font-bold text-slate-700 mb-4">Password Reset Tokens</p>
            <div className="text-center py-6 text-slate-400">
              <i className="ri-lock-2-line text-3xl mb-2 block" />
              <p className="text-xs">No active reset tokens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};