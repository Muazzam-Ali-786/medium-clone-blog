import Link from 'next/link';
import { getMixedArticlesByTag } from '@/services/mixedApi';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug} Category | MediumClone`,
    description: `Browse articles about ${slug}`,
  };
}

export default async function CategoryDetail({ params }) {
  const { slug } = await params;
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const blogs = await getMixedArticlesByTag(slug, { perPage: 30 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-gray-100">
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-indigo-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">#{categoryName}</h1>
        <p className="text-gray-500">{blogs.length} articles found</p>
      </div>

      {/* Articles Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${blog.slug}`}>
                <img src={blog.featuredImage} alt={blog.title} className="w-full h-48 object-cover card-hover" />
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-medium text-gray-800">{blog.author.name}</span>
                  <span>·</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                </Link>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
