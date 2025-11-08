import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://blog.elmerjacobo.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://blog.elmerjacobo.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://blog.elmerjacobo.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogPosts,
  ];
}
