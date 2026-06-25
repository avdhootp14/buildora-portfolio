import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <Link href="/admin" className="text-2xl font-bold text-accent">Admin Portal</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">Dashboard</Link>
          <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">Projects</Link>
          <Link href="/admin/contacts" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">Contacts</Link>
          <Link href="/admin/meetings" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">Meetings</Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded transition-colors">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
