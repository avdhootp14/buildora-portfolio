"use client";
import { API_URL } from '@/utils/api';

import { useState, useEffect } from 'react';

type Meeting = {
  _id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  topic: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
};

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const res = await fetch(API_URL + '/meetings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setMeetings(data);
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/meetings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setMeetings(meetings.map(m => m._id === id ? { ...m, status: newStatus as Meeting['status'] } : m));
      }
    } catch (error) {
      console.error('Error updating meeting status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
          Scheduled Meetings
        </h1>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-5 font-semibold">Scheduled For</th>
                <th className="px-6 py-5 font-semibold">Client Info</th>
                <th className="px-6 py-5 font-semibold">Topic</th>
                <th className="px-6 py-5 font-semibold">Status</th>
                <th className="px-6 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {meetings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No meetings scheduled.</td>
                </tr>
              ) : meetings.map((m) => (
                <tr key={m._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-medium text-white">{new Date(m.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-400 mt-1">{m.time}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-white">{m.name}</div>
                    <div className="text-sm text-blue-400 hover:text-blue-300 mt-1 transition-colors"><a href={`mailto:${m.email}`}>{m.email}</a></div>
                  </td>
                  <td className="px-6 py-5 text-gray-300">
                    {m.topic}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border shadow-sm capitalize ${getStatusColor(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {m.status !== 'confirmed' && (
                        <button 
                          onClick={() => updateStatus(m._id, 'confirmed')}
                          className="text-xs font-medium px-4 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-all border border-emerald-500/20"
                        >
                          Confirm
                        </button>
                      )}
                      {m.status !== 'cancelled' && (
                        <button 
                          onClick={() => updateStatus(m._id, 'cancelled')}
                          className="text-xs font-medium px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all border border-red-500/20"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}

