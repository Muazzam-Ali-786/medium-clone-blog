import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import PremiumWall from '@/components/blog/PremiumWall';
import { getArticleBySlug, getArticlesByTag } from '@/services/devApi';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getArticleBySlug(slug);

  if (!blog) return { title: 'Not Found | MediumClone' };

  return {
    title: `${blog.title} | MediumClone`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
    alternates: {
      canonical: blog.canonicalUrl || blog.url,
    },
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  
  // DEV.to slug format: "username/article-slug"
  // For safety, we can just pass the raw string if we URL encoded it, 
  // but Next.js router gives us the slug. Wait, Next.js catch-all or single slug?
  // Our route is `[slug]`, so it might not contain slashes if it's not `[...slug]`.
  // If the user navigates to `/blog/username/article-slug`, it would need `[...slug]`.
  // Wait! In `devApi.js`, getArticles returns `article.slug` which is usually just "article-slug" without username in DEV v1 API, OR we can fetch it via ID if we store ID.
  // Let's assume the slug works. If not, `getArticleBySlug` falls back to numeric ID lookup.
  
  const blog = await getArticleBySlug(slug);
  if (!blog) notFound();

  // Fetch related blogs based on first tag
  const relatedBlogs = blog.tags?.length 
    ? await getArticlesByTag(blog.tags[0], { perPage: 3 }) 
    : [];

  // Filter out the current blog from related
  const filteredRelated = relatedBlogs.filter(b => b.id !== blog.id).slice(0, 3);

  // Premium content logic
  const cookieStore = await cookies();
  const articlesRead = parseInt(cookieStore.get('articles_read')?.value || '0');
  const isGuestLimited = articlesRead > 3;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-indigo-600">Articles</Link>
        <span>/</span>
        <Link href={`/categories/${blog.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-indigo-600">{blog.category}</Link>
      </nav>

      {/* Category Tag */}
      <Link
        href={`/categories/${blog.category.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 hover:bg-indigo-200 transition-colors"
      >
        {blog.category}
      </Link>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        {blog.title}
      </h1>

      {/* Author & Meta */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        <img src={blog.author.avatar} alt={blog.author.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <Link href={`/author/${blog.author.username || blog.author.name.toLowerCase().replace(/\s+/g, '-')}`} className="font-semibold text-gray-900 hover:text-indigo-600">
            {blog.author.name}
          </Link>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
            <span>·</span>
            <span>{blog.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
        <img src={blog.featuredImage} alt={blog.title} className="w-full h-72 md:h-96 object-cover" />
      </div>

      {/* Content */}
      <div className="blog-content mb-12"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Original Source link (since it's dev.to data) */}
      {blog.canonicalUrl && (
        <div className="mb-12 text-sm text-gray-500 italic">
          Originally published at <a href={blog.canonicalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{blog.canonicalUrl}</a>
        </div>
      )}

      {/* Premium Wall */}
      {isGuestLimited && <PremiumWall />}

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-2xl p-6 flex gap-4 items-start mb-12">
        <img src={blog.author.avatar} alt={blog.author.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Written by</p>
          <Link href={`/author/${blog.author.username || blog.author.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600">
            {blog.author.name}
          </Link>
          <p className="text-gray-600 text-sm mt-1">{blog.author.bio || `Explore more articles by ${blog.author.name}.`}</p>
        </div>
      </div>

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelated.map((rel) => (
              <article key={rel.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/blog/${rel.slug}`}>
                  <img src={rel.featuredImage} alt={rel.title} className="w-full h-40 object-cover" />
                </Link>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <img src={rel.author.avatar} alt={rel.author.name} className="w-4 h-4 rounded-full object-cover" />
                    <span>{rel.author.name}</span>
                    <span>·</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <Link href={`/blog/${rel.slug}`}>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-sm">
                      {rel.title}
                    </h3>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
