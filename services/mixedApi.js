import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import Category from '@/models/Category';
import { 
  getArticles as getDevArticles, 
  getTopArticles as getDevTopArticles, 
  getArticleBySlug as getDevArticleBySlug, 
  getTags as getDevTags,
  getArticlesByTag as getDevArticlesByTag
} from './devApi';

// Normalize DB blog to match DEV.to format
function normalizeDbBlog(blog) {
  return {
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    featuredImage: blog.featuredImage,
    author: {
      name: blog.author?.name || 'Admin',
      username: blog.author?.name?.toLowerCase().replace(/\s+/g, '-') || 'admin',
      avatar: blog.author?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      bio: '',
    },
    category: blog.category?.name || 'General',
    tags: blog.category?.name ? [blog.category.name] : [],
    createdAt: blog.createdAt,
    readTime: '3 min read', // Simple estimate
    views: blog.views || 0,
    commentsCount: 0,
    content: blog.content,
    isLocal: true, // Flag to identify our own blogs
  };
}

export async function getMixedArticles({ page = 1, perPage = 9, tag = '', state = '' } = {}) {
  await connectDB();
  
  // Fetch DB blogs
  let dbQuery = { status: 'published' };
  if (tag) {
    const category = await Category.findOne({ name: { $regex: new RegExp(`^${tag}$`, 'i') } });
    if (category) {
      dbQuery.category = category._id;
    } else {
      dbQuery = null; 
    }
  }

  let dbBlogs = [];
  if (dbQuery) {
    const rawDbBlogs = await Blog.find(dbQuery)
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(perPage);
    dbBlogs = rawDbBlogs.map(normalizeDbBlog);
  }

  // Fetch DEV blogs
  const devBlogs = await getDevArticles({ page, perPage, tag, state });

  // Merge and sort by date descending
  const mixed = [...dbBlogs, ...devBlogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return mixed.slice(0, perPage);
}

export async function getMixedTopArticles({ perPage = 5, top = 7 } = {}) {
  await connectDB();
  const rawDbBlogs = await Blog.find({ status: 'published' })
    .populate('author', 'name avatar')
    .populate('category', 'name slug')
    .sort({ views: -1, createdAt: -1 })
    .limit(perPage);
  
  const dbBlogs = rawDbBlogs.map(normalizeDbBlog);
  const devBlogs = await getDevTopArticles({ perPage, top });
  
  const mixed = [...dbBlogs, ...devBlogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return mixed.slice(0, perPage);
}

export async function getMixedArticleBySlug(slug) {
  await connectDB();
  
  // First check our DB
  const rawDbBlog = await Blog.findOne({ slug })
    .populate('author', 'name avatar bio')
    .populate('category', 'name slug');
    
  if (rawDbBlog) {
    return normalizeDbBlog(rawDbBlog);
  }
  
  // Fallback to DEV.to
  return await getDevArticleBySlug(slug);
}

export async function getMixedTags({ perPage = 20 } = {}) {
  await connectDB();
  const dbCategories = await Category.find().limit(perPage);
  const normalizedDbTags = dbCategories.map(c => ({
    id: c._id.toString(),
    name: c.name,
    isLocal: true,
  }));
  
  const devTags = await getDevTags({ perPage });
  
  const mixed = [...normalizedDbTags, ...devTags];
  const uniqueNames = new Set();
  const uniqueTags = [];
  
  for (const tag of mixed) {
    const lowerName = tag.name.toLowerCase();
    if (!uniqueNames.has(lowerName)) {
      uniqueNames.add(lowerName);
      uniqueTags.push(tag);
    }
  }
  
  return uniqueTags.slice(0, perPage);
}

export async function getMixedArticlesByTag(tag, { page = 1, perPage = 9 } = {}) {
  return getMixedArticles({ tag, page, perPage });
}
