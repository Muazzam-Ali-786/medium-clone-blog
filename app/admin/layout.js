import Link from 'next/link';

export default function AdminLayout({ children }) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/blogs', label: 'Blog Management', icon: '📝' },
    { href: '/admin/blogs/create', label: 'Create Blog', icon: '✏️' },
    { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="font-bold text-xl text-gray-900">
            ← Back to Site
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-medium text-sm"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-gray-900">Admin Panel</span>
        <div className="flex gap-4 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs text-gray-500 whitespace-nowrap hover:text-indigo-600">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 md:pt-8 pt-20 overflow-auto">
        {children}
      </main>
    </div>
  );
}
