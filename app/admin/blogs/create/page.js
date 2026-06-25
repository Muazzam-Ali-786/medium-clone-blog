'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Technology', 'Programming', 'Science', 'Self Improvement', 'Data Science', 'Writing', 'Design', 'Business'];

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function CreateBlog() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'title') {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app: await fetch('/api/blogs', { method: 'POST', body: JSON.stringify(form) })
      setMessage('Blog saved successfully!');
      setTimeout(() => router.push('/admin/blogs'), 1500);
    } catch {
      setMessage('Error saving blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Create New Blog</h1>
        <p className="text-gray-500 mt-1">Fill out the form below to create a new article.</p>
      </div>

      {message && (
        <div className="mb-6 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title *</label>
              <input
                name="title" type="text" required value={form.title} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-medium"
                placeholder="Enter a compelling title..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (auto-generated)</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">/blog/</span>
                <input
                  name="slug" type="text" value={form.slug} onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
              <textarea
                name="excerpt" rows={3} required value={form.excerpt} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                placeholder="A short summary of the article (max 300 characters)..."
                maxLength={300}
              />
              <p className="text-xs text-gray-400 mt-1">{form.excerpt.length}/300 characters</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Content *</label>
                {form.content && (
                  <span className="text-xs text-gray-400">{estimateReadTime(form.content)}</span>
                )}
              </div>
              <textarea
                name="content" rows={20} required value={form.content} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono resize-y"
                placeholder="Write your article content here (HTML supported)..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Tip: You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, etc.
              </p>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
                <input type="text" defaultValue={form.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="SEO title (leave blank to use blog title)" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                <textarea rows={2} defaultValue={form.excerpt}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                  placeholder="SEO description (leave blank to use excerpt)" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Canonical URL</label>
                <input type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="https://example.com/blog/original-article" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Meta) */}
        <div className="space-y-6">
          {/* Publish Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Publish</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select name="status" value={form.status} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="pt-2 flex flex-col gap-3">
                <button type="submit" disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors disabled:bg-indigo-400">
                  {loading ? 'Saving...' : form.status === 'published' ? '🚀 Publish Blog' : '💾 Save Draft'}
                </button>
                <button type="button" onClick={() => router.back()}
                  className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Category Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Category *</h2>
            <select name="category" required value={form.category} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
              <option value="">Select a category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Image</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Image URL</label>
              <input name="featuredImage" type="url" value={form.featuredImage} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="https://..." />
            </div>
            {form.featuredImage && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                <img src={form.featuredImage} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
