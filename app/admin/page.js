import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | MediumClone',
};

const STATS = [
  { label: 'Total Blogs', value: '247', icon: '📝', change: '+12 this month', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { label: 'Total Users', value: '10,842', icon: '👥', change: '+324 this month', color: 'bg-green-50 text-green-600 border-green-100' },
  { label: 'Total Categories', value: '18', icon: '🏷️', change: '+2 this month', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { label: 'Total Views', value: '1.2M', icon: '👁️', change: '+80k this month', color: 'bg-orange-50 text-orange-600 border-orange-100' },
];

const RECENT_BLOGS = [
  { id: 1, title: 'The Future of Web Development', author: 'John Doe', status: 'published', views: 1247, date: '2026-06-23' },
  { id: 2, title: 'Understanding Server Components', author: 'Jane Smith', status: 'draft', views: 0, date: '2026-06-22' },
  { id: 3, title: 'CSS Grid Mastery in 2026', author: 'Bob Lee', status: 'published', views: 892, date: '2026-06-21' },
  { id: 4, title: 'AI-Assisted Code Review', author: 'Alice Wong', status: 'published', views: 2103, date: '2026-06-20' },
  { id: 5, title: 'Building a PWA with Next.js', author: 'John Doe', status: 'draft', views: 0, date: '2026-06-19' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors text-sm shadow-sm"
        >
          + New Blog
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat) => (
          <div key={stat.label} className={`bg-white border rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Blogs</h2>
          <Link href="/admin/blogs" className="text-sm text-indigo-600 hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_BLOGS.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/admin/blogs/${blog.id}/edit`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</Link>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
