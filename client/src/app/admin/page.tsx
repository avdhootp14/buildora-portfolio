"use client";
import { API_URL } from '@/utils/api';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, MessageSquare, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, contacts: 0, meetings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/admin/login';
          return;
        }

        const res = await fetch(API_URL + '/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setStats({ projects: data.projects, contacts: data.contacts, meetings: data.meetings });
        } else if (res.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400 font-medium tracking-wide">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Welcome back to your command center.</p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Projects Stat Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative overflow-hidden bg-white/[0.03] p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl group cursor-default"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-semibold tracking-wide uppercase text-sm">Total Projects</h2>
            <div className="p-3 bg-accent/20 rounded-xl text-accent">
              <FolderKanban size={24} />
            </div>
          </div>
          <p className="relative z-10 text-5xl font-black text-white tracking-tighter drop-shadow-sm">
            {stats.projects}
          </p>
        </motion.div>

        {/* Contacts Stat Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative overflow-hidden bg-white/[0.03] p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl group cursor-default"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-semibold tracking-wide uppercase text-sm">Unread Contacts</h2>
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <MessageSquare size={24} />
            </div>
          </div>
          <p className="relative z-10 text-5xl font-black text-white tracking-tighter drop-shadow-sm">
            {stats.contacts}
          </p>
        </motion.div>

        {/* Meetings Stat Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative overflow-hidden bg-white/[0.03] p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl group cursor-default"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-semibold tracking-wide uppercase text-sm">Upcoming Meetings</h2>
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
              <Calendar size={24} />
            </div>
          </div>
          <p className="relative z-10 text-5xl font-black text-white tracking-tighter drop-shadow-sm">
            {stats.meetings}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

