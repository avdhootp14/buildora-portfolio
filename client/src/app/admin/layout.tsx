"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, MessageSquare, Calendar, LogOut, Users, Menu, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const isAuthPage = pathname === '/admin/login' || 
                     pathname === '/admin/register' || 
                     pathname === '/admin/forgot-password' || 
                     pathname.startsWith('/admin/reset-password') || 
                     pathname.startsWith('/admin/verify') ||
                     pathname.startsWith('/admin/setup-account');

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-bold text-white drop-shadow-md tracking-tight" onClick={() => setMobileMenuOpen(false)}>
          Admin Portal
        </Link>
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-3 mt-4 overflow-y-auto">
        <Link 
          href="/admin" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname === '/admin' ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <LayoutDashboard size={20} className={pathname === '/admin' ? 'text-accent' : ''} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link 
          href="/admin/projects" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/projects') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <FolderKanban size={20} className={pathname.startsWith('/admin/projects') ? 'text-accent' : ''} />
          <span className="font-medium">Projects</span>
        </Link>
        <Link 
          href="/admin/contacts" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/contacts') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <MessageSquare size={20} className={pathname.startsWith('/admin/contacts') ? 'text-accent' : ''} />
          <span className="font-medium">Contacts</span>
        </Link>
        <Link 
          href="/admin/meetings" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/meetings') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <Calendar size={20} className={pathname.startsWith('/admin/meetings') ? 'text-accent' : ''} />
          <span className="font-medium">Meetings</span>
        </Link>
        <Link 
          href="/admin/team" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/team') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <Users size={20} className={pathname.startsWith('/admin/team') ? 'text-accent' : ''} />
          <span className="font-medium">Team</span>
        </Link>
        <Link 
          href="/admin/reviews" 
          onClick={() => setMobileMenuOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/reviews') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
        >
          <Star size={20} className={pathname.startsWith('/admin/reviews') ? 'text-accent' : ''} />
          <span className="font-medium">Reviews</span>
        </Link>
      </nav>
      <div className="p-6 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300 font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0f] to-black text-white selection:bg-accent/30 selection:text-white">
      
      {/* Mobile Top Bar */}
      {!isAuthPage && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-30">
          <Link href="/admin" className="text-xl font-bold text-white tracking-tight">Admin Portal</Link>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white/70 hover:text-white bg-white/5 rounded-lg border border-white/10">
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isAuthPage && (
        <aside className="hidden md:flex w-64 bg-white/[0.02] backdrop-blur-xl flex-col border-r border-white/10 shrink-0 shadow-2xl relative z-20">
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {!isAuthPage && mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-[#0a0a0f] border-r border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full relative z-10">
        {children}
      </main>
    </div>
  );
}
