import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog - Elmer Jacobo</title>
    <link>https://blog.elmerjacobo.dev</link>
    <description>Blog técnico sobre desarrollo web, React, Next.js, TypeScript y buenas prácticas.</description>
    <language>es</language>
    <atom:link href="https://blog.elmerjacobo.dev/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://blog.elmerjacobo.dev/blog/${post.slug}</link>
      <description>${post.summary}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>https://blog.elmerjacobo.dev/blog/${post.slug}</guid>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
