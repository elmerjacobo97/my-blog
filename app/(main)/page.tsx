import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SearchClient } from '@/components/search-client';

export const metadata: Metadata = {
  title: 'Blog - Elmer Jacobo | Full Stack Developer',
  description:
    'Blog de desarrollo Full Stack. Tutoriales, guías y soluciones sobre React Native, Expo, Next.js, TypeScript, desarrollo móvil y web. Aprende con ejemplos prácticos y casos reales.',
  alternates: {
    canonical: 'https://blog.elmerjacobo.dev',
  },
  openGraph: {
    title: 'Blog - Elmer Jacobo | Full Stack Developer',
    description: 'Tutoriales y guías prácticas sobre desarrollo Full Stack, React Native, Next.js, TypeScript y desarrollo web moderno',
    url: 'https://blog.elmerjacobo.dev',
    siteName: 'Blog - Elmer Jacobo',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://blog.elmerjacobo.dev/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Blog - Elmer Jacobo | Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Elmer Jacobo | Full Stack Developer',
    description: 'Tutoriales y guías sobre desarrollo Full Stack, React Native, Next.js y desarrollo web',
    creator: '@elmerjacobo',
    images: ['https://blog.elmerjacobo.dev/opengraph-image'],
  },
};

export default function BlogHome() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SearchClient posts={posts} />
    </div>
  );
}
