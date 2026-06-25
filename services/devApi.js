/**
 * DEV.to / Forem API service layer
 * Base URL: https://dev.to/api
 * Docs: https://developers.forem.com/api
 * No API key required for public read endpoints.
 */

const BASE_URL = 'https://dev.to/api';
const HEADERS = {
  Accept: 'application/vnd.forem.api-v1+json',
};

// ─── Helper ────────────────────────────────────────────────────────────────

function readTime(minutes) {
  return `${minutes || 1} min read`;
}

/**
 * Normalise a raw DEV article into our internal blog shape.
 */
export function normaliseArticle(a) {
  return {
    id: a.id,
    title: a.title,
    // Append the numeric ID to the slug so we can reliably fetch it later
    slug: `${a.slug}-${a.id}`,
    excerpt: a.description || '',
    featuredImage:
      a.cover_image ||
      a.social_image ||
      `https://picsum.photos/seed/${a.id}/800/450`,
    author: {
      name: a.user?.name || 'Unknown',
      username: a.user?.username || '',
      avatar:
        a.user?.profile_image_90 ||
        a.user?.profile_image ||
        'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
    category: a.tag_list?.[0] || 'General',
    tags: a.tag_list || [],
    createdAt: a.published_at || a.created_at,
    readTime: readTime(a.reading_time_minutes),
    views: a.public_reactions_count || 0,
    commentsCount: a.comments_count || 0,
    url: a.url,
    canonicalUrl: a.canonical_url,
  };
}

// ─── Articles ───────────────────────────────────────────────────────────────

/**
 * Fetch a paginated list of articles.
 * @param {Object} opts
 * @param {number} opts.page  - page number (1-based)
 * @param {number} opts.perPage - results per page
 * @param {string} opts.tag   - filter by tag
 * @param {string} opts.state - 'fresh' | 'rising' | 'all' (default)
 */
export async function getArticles({ page = 1, perPage = 9, tag = '', state = '' } = {}) {
  const params = new URLSearchParams({ page, per_page: perPage });
  if (tag) params.set('tag', tag.toLowerCase().replace(/\s+/g, ''));
  if (state) params.set('state', state);

  const res = await fetch(`${BASE_URL}/articles?${params}`, {
    headers: HEADERS,
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });

  if (!res.ok) throw new Error(`DEV API error: ${res.status}`);
  const data = await res.json();
  return data.map(normaliseArticle);
}

/**
 * Fetch top/trending articles.
 */
export async function getTopArticles({ perPage = 5, top = 7 } = {}) {
  const params = new URLSearchParams({ per_page: perPage, top });
  const res = await fetch(`${BASE_URL}/articles?${params}`, {
    headers: HEADERS,
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`DEV API error: ${res.status}`);
  const data = await res.json();
  return data.map(normaliseArticle);
}

/**
 * Fetch a single article by its DEV.to slug.
 * DEV.to slugs include the username prefix, e.g. "username/article-slug-abc123"
 * We use the articles?path= lookup or directly GET /articles/{id}.
 */
export async function getArticleBySlug(slug) {
  // Extract the numeric ID from the end of our custom slug format (e.g., "article-title-hash-123456")
  const idMatch = slug.match(/-(\d+)$/);
  const id = idMatch ? idMatch[1] : slug;

  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;

  const a = await res.json();
  return {
    ...normaliseArticle(a),
    content: a.body_html || '',
    bodyMarkdown: a.body_markdown || '',
  };
}

/**
 * Fetch article by numeric ID.
 */
export async function getArticleById(id) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const a = await res.json();
  return {
    ...normaliseArticle(a),
    content: a.body_html || '',
    bodyMarkdown: a.body_markdown || '',
  };
}

/**
 * Fetch articles for a specific username (author profile).
 */
export async function getArticlesByUsername(username, { page = 1, perPage = 9 } = {}) {
  const params = new URLSearchParams({ username, page, per_page: perPage });
  const res = await fetch(`${BASE_URL}/articles?${params}`, {
    headers: HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normaliseArticle);
}

/**
 * Search articles using DEV search endpoint.
 */
export async function searchArticles(query, { page = 1, perPage = 9 } = {}) {
  if (!query) return [];
  const params = new URLSearchParams({ q: query, page, per_page: perPage });
  const res = await fetch(`https://dev.to/search/feed_content?${params}`, {
    headers: HEADERS,
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    // Fallback: tag search
    return getArticles({ tag: query, page, perPage });
  }
  const data = await res.json();
  const results = data.result || data.articles || [];
  return results.map((a) => normaliseArticle({ ...a, tag_list: a.tags || [] }));
}

// ─── Tags / Categories ───────────────────────────────────────────────────────

/**
 * Fetch popular tags.
 */
export async function getTags({ perPage = 20 } = {}) {
  const params = new URLSearchParams({ per_page: perPage });
  const res = await fetch(`${BASE_URL}/tags?${params}`, {
    headers: HEADERS,
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  if (!res.ok) return [];
  return res.json(); // [{ id, name, bg_color_hex, text_color_hex }]
}

/**
 * Fetch articles by tag (category).
 */
export async function getArticlesByTag(tag, { page = 1, perPage = 9 } = {}) {
  return getArticles({ tag, page, perPage });
}

// ─── User / Author ───────────────────────────────────────────────────────────

/**
 * Fetch a DEV user by username.
 */
export async function getUserByUsername(username) {
  const res = await fetch(`${BASE_URL}/users/by_username?url=${username}`, {
    headers: HEADERS,
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  return res.json();
}
