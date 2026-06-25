'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function BlogListingClient({ initialBlogs, tags }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  // Add 'All' to the front of our category list
  const CATEGORIES = ['All', ...tags.map(t => t.name)];

  const filtered = initialBlogs.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category?.toLowerCase() === activeCategory?.toLowerCase();
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Category Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === activeCategory
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog List */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">No articles found.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {paginated.map((blog) => (
                <article key={blog.id} className="flex flex-col sm:flex-row gap-6 group pb-10 border-b border-gray-100 last:border-b-0">
                  <div className="sm:w-2/3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-medium text-gray-800">{blog.author.name}</span>
                      <span>·</span>
                      <button
                        onClick={() => { setActiveCategory(blog.category); setPage(1); }}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {blog.category}
                      </button>
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="sm:w-1/3">
                    <Link href={`/blog/${blog.slug}`}>
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-48 sm:h-full object-cover rounded-lg shadow-sm"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                    p === page ? 'bg-indigo-600 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="md:w-1/3 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
          <div className="sticky top-24 space-y-10">
            {/* Search */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="px-3 py-2 text-gray-400 hover:text-gray-700 border border-gray-300 rounded-lg text-sm">
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <span key={tag.id}
                    onClick={() => { setSearch(tag.name); setPage(1); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full cursor-pointer transition-colors">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get the best stories delivered to your inbox weekly.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input type="email" placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                <button type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors text-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
