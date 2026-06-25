import Link from 'next/link';
import { searchArticles } from '@/services/devApi';

export const metadata = {
  title: 'Search | MediumClone',
  description: 'Search for articles on MediumClone.',
};

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = q || '';

  const results = query ? await searchArticles(query, { perPage: 24 }) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          {query ? `Results for "${query}"` : 'Search Articles'}
        </h1>
        <form method="GET" action="/search" className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for articles, topics, or authors..."
            className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {query ? (
        <>
          <p className="text-gray-500 mb-8">{results.length} results found</p>
          {results.length === 0 ? (
             <div className="text-center py-10 text-gray-400">
               <p>No results found for "{query}". Try a different keyword.</p>
             </div>
          ) : (
            <div className="space-y-8">
              {results.map((blog) => (
                <article key={blog.id} className="flex gap-6 group pb-8 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <img src={blog.author.avatar} alt={blog.author.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                      <span className="font-medium text-gray-800 truncate">{blog.author.name}</span>
                      <span>·</span>
                      <Link href={`/categories/${blog.category?.toLowerCase()}`} className="text-indigo-600 hover:underline flex-shrink-0">
                        {blog.category}
                      </Link>
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 mb-3">{blog.excerpt}</p>
                    </Link>
                    <div className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {blog.readTime}
                    </div>
                  </div>
                  <div className="hidden sm:block w-32 h-24 flex-shrink-0">
                    <Link href={`/blog/${blog.slug}`}>
                       <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover rounded-lg card-hover" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-xl">Start searching for articles</p>
        </div>
      )}
    </div>
  );
}
