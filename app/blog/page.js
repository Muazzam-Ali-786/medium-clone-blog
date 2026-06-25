import BlogListingClient from './BlogListingClient';
import { getArticles, getTags } from '@/services/devApi';

export const metadata = {
  title: 'Articles | MediumClone',
  description: 'Browse all articles on MediumClone. Discover stories, thinking, and expertise.',
};

export const revalidate = 300;

export default async function BlogListing() {
  const [blogs, tags] = await Promise.all([
    getArticles({ perPage: 30 }), // Fetch more for listing
    getTags({ perPage: 20 }),
  ]);

  return <BlogListingClient initialBlogs={blogs} tags={tags} />;
}
