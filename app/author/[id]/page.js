import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserByUsername, getArticlesByUsername } from '@/services/devApi';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { id } = await params; // This is the username in DEV
  const user = await getUserByUsername(id);
  
  if (!user) return { title: 'Author Not Found | MediumClone' };
  
  return {
    title: `${user.name} | MediumClone`,
    description: user.summary || `Read articles by ${user.name} on MediumClone.`,
  };
}

export default async function AuthorProfile({ params }) {
  const { id } = await params;
  
  const [user, blogs] = await Promise.all([
    getUserByUsername(id),
    getArticlesByUsername(id, { perPage: 24 })
  ]);

  if (!user) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 pb-10 border-b border-gray-100">
        <img 
          src={user.profile_image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
          alt={user.name} 
          className="w-24 h-24 rounded-full ring-4 ring-indigo-100 object-cover flex-shrink-0" 
        />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{user.name}</h1>
          {user.summary && <p className="text-gray-600 mb-4 max-w-xl">{user.summary}</p>}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{blogs.length}</span>
              <span>Articles Listed</span>
            </div>
            {user.location && (
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-gray-900">{user.location}</span>
                <span>Location</span>
              </div>
            )}
            {user.joined_at && (
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-gray-900">{new Date(user.joined_at).getFullYear()}</span>
                <span>Joined</span>
              </div>
            )}
          </div>
        </div>
        <a 
          href={`https://dev.to/${user.username}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex-shrink-0"
        >
          View DEV Profile
        </a>
      </div>

      {/* Articles Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles</h2>
      {blogs.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p>No articles found for this author.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="group flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <img src={blog.featuredImage} alt={blog.title} className="w-28 h-24 object-cover rounded-lg flex-shrink-0" />
              <div className="flex flex-col justify-between min-w-0">
                <div>
                  <Link href={`/categories/${blog.category?.toLowerCase()}`} className="text-xs font-semibold text-indigo-600 mb-1 block">
                    {blog.category}
                  </Link>
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-sm mb-1">{blog.title}</h3>
                  </Link>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                  <span>·</span>
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
