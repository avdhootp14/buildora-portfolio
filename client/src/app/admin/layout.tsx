"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderKanban, MessageSquare, Calendar, LogOut, Users } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0f] to-black text-white selection:bg-accent/30 selection:text-white">
      {/* Sidebar - Hide on auth pages */}
      {!isAuthPage && (
        <aside className="w-64 bg-white/[0.02] backdrop-blur-xl flex flex-col border-r border-white/10 shrink-0 shadow-2xl relative z-20">
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="text-2xl font-bold text-white drop-shadow-md tracking-tight">
              Admin Portal
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-3 mt-4">
            <Link 
              href="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname === '/admin' ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
            >
              <LayoutDashboard size={20} className={pathname === '/admin' ? 'text-accent' : ''} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link 
              href="/admin/projects" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/projects') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
            >
              <FolderKanban size={20} className={pathname.startsWith('/admin/projects') ? 'text-accent' : ''} />
              <span className="font-medium">Projects</span>
            </Link>
            <Link 
              href="/admin/contacts" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/contacts') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
            >
              <MessageSquare size={20} className={pathname.startsWith('/admin/contacts') ? 'text-accent' : ''} />
              <span className="font-medium">Contacts</span>
            </Link>
            <Link 
              href="/admin/meetings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/meetings') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
            >
              <Calendar size={20} className={pathname.startsWith('/admin/meetings') ? 'text-accent' : ''} />
              <span className="font-medium">Meetings</span>
            </Link>
            <Link 
              href="/admin/team" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname.startsWith('/admin/team') ? 'bg-gradient-to-r from-accent/20 to-transparent border-l-4 border-accent text-white shadow-lg shadow-accent/10' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}`}
            >
              <Users size={20} className={pathname.startsWith('/admin/team') ? 'text-accent' : ''} />
              <span className="font-medium">Team</span>
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
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto w-full relative z-10">
        {children}
      </main>
    </div>
  );
}
