export default function sitemap() {
  const baseUrl = 'https://mediumclone.com';

  // Static pages
  const staticPages = ['', '/blog', '/categories', '/about', '/contact'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  // In production: fetch dynamic blog slugs and category slugs from DB
  // const blogs = await fetchPublishedBlogSlugs();
  // const dynamicBlogPages = blogs.map(slug => ({ url: `${baseUrl}/blog/${slug}`, ... }));

  return [...staticPages];
}
