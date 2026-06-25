import Link from 'next/link';

const BLOGS = [
  { id: 1, slug: 'future-web-dev', title: 'The Future of Web Development', author: 'John Doe', category: 'Technology', status: 'published', views: 1247, date: '2026-06-23' },
  { id: 2, slug: 'server-components', title: 'Understanding Server Components', author: 'Jane Smith', category: 'Programming', status: 'draft', views: 0, date: '2026-06-22' },
  { id: 3, slug: 'css-grid-mastery', title: 'CSS Grid Mastery in 2026', author: 'Bob Lee', category: 'Programming', status: 'published', views: 892, date: '2026-06-21' },
  { id: 4, slug: 'ai-code-review', title: 'AI-Assisted Code Review', author: 'Alice Wong', category: 'Technology', status: 'published', views: 2103, date: '2026-06-20' },
  { id: 5, slug: 'pwa-nextjs', title: 'Building a PWA with Next.js', author: 'John Doe', category: 'Programming', status: 'draft', views: 0, date: '2026-06-19' },
];

export const metadata = { title: 'Blog Management | Admin' };

export default function AdminBlogs() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Blog Management</h1>
          <p className="text-gray-500 mt-1">{BLOGS.length} total articles</p>
        </div>
        <Link href="/admin/blogs/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors text-sm shadow-sm">
          + New Blog
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['All', 'Published', 'Draft'].map((f) => (
          <button key={f} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${f === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <input type="text" placeholder="Search blogs..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-48" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BLOGS.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{blog.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/blog/${blog.slug}`} className="text-gray-500 hover:text-gray-700 text-sm" target="_blank">View</Link>
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
