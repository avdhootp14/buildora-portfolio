"use client";

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, contacts: 0, meetings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch these from the backend API
    // Example: fetch('http://localhost:5000/api/stats', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
    // For now, we simulate a loading state
    setTimeout(() => {
      setStats({ projects: 5, contacts: 12, meetings: 3 });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading Dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Projects Stat Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-gray-400 font-medium mb-2">Total Projects</h2>
          <p className="text-4xl font-bold text-white">{stats.projects}</p>
        </div>

        {/* Contacts Stat Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-gray-400 font-medium mb-2">Unread Contacts</h2>
          <p className="text-4xl font-bold text-blue-400">{stats.contacts}</p>
        </div>

        {/* Meetings Stat Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-gray-400 font-medium mb-2">Upcoming Meetings</h2>
          <p className="text-4xl font-bold text-green-400">{stats.meetings}</p>
        </div>
      </div>
    </div>
  );
}
