import Link from 'next/link';
import { getMixedArticles, getMixedTopArticles, getMixedTags } from '@/services/mixedApi';

export const revalidate = 300; // revalidate every 5 minutes

export default async function Home() {
  const [latestArticles, popularArticles, tags] = await Promise.all([
    getMixedArticles({ perPage: 6 }),
    getMixedTopArticles({ perPage: 4, top: 7 }),
    getMixedTags({ perPage: 12 }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Stay curious.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Discover stories, thinking, and expertise from writers on any topic. A place to read, write, and deepen your understanding.
        </p>
        <Link 
          href="/blog" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Start reading
        </Link>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-12">
        
        {/* Main Content (Latest Articles) */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Latest Articles</h2>
          <div className="space-y-12">
            {latestArticles.map((article) => (
              <article key={article.id} className="flex flex-col md:flex-row gap-6 group cursor-pointer">
                <div className="md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-medium text-gray-900 hover:underline">{article.author.name}</span>
                    <span>in</span>
                    <Link href={`/categories/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-gray-900 hover:underline">
                      {article.category}
                    </Link>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm text-gray-500 flex items-center space-x-4">
                      <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                      {article.tags[0] && (
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{article.tags[0]}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 h-48 md:h-auto hidden md:block">
                  <Link href={`/blog/${article.slug}`}>
                    <img 
                      src={article.featuredImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover rounded-md shadow-sm card-hover"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar (Popular Articles & Categories) */}
        <aside className="md:w-1/3 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
          <div className="sticky top-24">
            
            {/* Discover more of what matters to you */}
            <h2 className="text-xl font-bold text-gray-900 mb-6">Discover more</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {tags.map((tag) => (
                <Link 
                  key={tag.id} 
                  href={`/categories/${tag.name.toLowerCase()}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 px-4 rounded-full transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Popular Articles */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-t pt-8">Popular on DEV</h2>
            <div className="space-y-6">
              {popularArticles.map((article, index) => (
                <article key={article.id} className="flex gap-4 group cursor-pointer">
                  <div className="text-3xl font-bold text-gray-200">0{index + 1}</div>
                  <div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                      <img src={article.author.avatar} alt={article.author.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="font-medium text-gray-900">{article.author.name}</span>
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {article.readTime}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="mt-12 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest articles delivered straight to your inbox.</p>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors"
                >
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
