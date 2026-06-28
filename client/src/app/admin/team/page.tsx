"use client";
import { API_URL } from '@/utils/api';

import { useEffect, useState } from 'react';
import { Mail, Trash2, UserPlus, ShieldCheck, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TeamPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteError, setInviteError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
      const [teamRes, meRes] = await Promise.all([
        fetch(API_URL + '/team', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(API_URL + '/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (teamRes.ok) {
        const data = await teamRes.json();
        setAdmins(data);
      }
      if (meRes.ok) {
        const user = await meRes.json();
        setCurrentUser(user);
      }
    } catch (err) {
      console.error('Error fetching admins:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteMessage('');
    setInviteError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_URL + '/auth/invite', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: inviteEmail })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setInviteMessage('Invitation sent successfully!');
        setInviteEmail('');
        fetchAdmins(); // Refresh the list
      } else {
        setInviteError(data.message || 'Failed to send invitation');
      }
    } catch (err) {
      setInviteError('Network error occurred');
    } finally {
      setInviteLoading(false);
    }
  };

  const executeDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        setAdmins(admins.filter(admin => admin._id !== id));
        toast.success('Admin removed successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to remove admin');
      }
    } catch (err) {
      console.error('Error deleting admin:', err);
      toast.error('Network error occurred');
    }
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="font-semibold text-white">Are you sure you want to remove this admin?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => toast.dismiss(t.id)} className="px-4 py-1.5 bg-gray-700 text-sm font-medium rounded-lg text-white hover:bg-gray-600 transition-colors">Cancel</button>
          <button onClick={() => {
            toast.dismiss(t.id);
            executeDelete(id);
          }} className="px-4 py-1.5 bg-red-600 text-sm font-medium rounded-lg text-white hover:bg-red-500 transition-colors">Remove Admin</button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleChangeRole = async (id: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/team/${id}/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setAdmins(admins.map(a => a._id === id ? { ...a, role: newRole } : a));
        toast.success('Role updated successfully');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to change role');
      }
    } catch (err) {
      console.error('Error changing role:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Team Management</h1>
        <p className="text-gray-400">Manage agency administrators and send secure invitations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Invite Form */}
        <div className="lg:col-span-1">
          {currentUser?.role === 'owner' ? (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <UserPlus className="text-accent" size={20} />
                Invite New Admin
              </h2>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="colleague@agency.com"
                  />
                </div>
              </div>
              
              {inviteMessage && <p className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">{inviteMessage}</p>}
              {inviteError && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{inviteError}</p>}
              
              <button 
                type="submit" 
                disabled={inviteLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {inviteLoading ? 'Sending Invite...' : 'Send Invitation'}
              </button>
            </form>
          </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md text-center">
              <ShieldCheck className="text-gray-500 mx-auto mb-4" size={32} />
              <h2 className="text-lg font-semibold text-white mb-2">Restricted Access</h2>
              <p className="text-gray-400 text-sm">Only Owners can invite new administrators to the agency dashboard.</p>
            </div>
          )}
        </div>

        {/* Right Column: Admins List */}
        <div className="lg:col-span-2">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={20} />
                Active Administrators
              </h2>
              <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full font-medium border border-accent/30">
                {admins.length} Admins
              </span>
            </div>
            
            {loading ? (
              <div className="p-8 flex justify-center">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {admins.map((admin) => (
                  <div key={admin._id} className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-inner">
                        {(admin.email || admin.username || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1 flex items-center gap-2">
                          {admin.email || admin.username || 'Legacy Admin'}
                          {admin.role === 'owner' ? (
                            <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-wider font-bold">Owner</span>
                          ) : (
                            <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30 uppercase tracking-wider font-bold">Admin</span>
                          )}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          {admin.isVerified ? (
                            <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 flex items-center gap-1">
                              <ShieldCheck size={12} /> Verified & Active
                            </span>
                          ) : (
                            <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                              <Clock size={12} /> Pending Setup
                            </span>
                          )}
                          <span className="text-gray-500">
                            Joined {new Date(admin.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {currentUser?.role === 'owner' && admin._id !== currentUser._id && (
                      <div className="flex items-center gap-3 transition-all self-end md:self-auto">
                        {admin.role === 'admin' ? (
                          <button 
                            onClick={() => handleChangeRole(admin._id, 'owner')}
                            className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all uppercase tracking-wider"
                          >
                            Promote to Owner
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleChangeRole(admin._id, 'admin')}
                            className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all uppercase tracking-wider"
                          >
                            Demote to Admin
                          </button>
                        )}
                        {admin.role !== 'owner' && (
                          <button 
                            onClick={() => handleDelete(admin._id)}
                            className="text-gray-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-all"
                            title="Remove Admin"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {admins.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">No administrators found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

