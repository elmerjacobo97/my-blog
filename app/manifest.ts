import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Blog - Elmer Jacobo',
    short_name: 'Blog Elmer',
    description:
      'Blog de desarrollo Full Stack. Tutoriales, guías y soluciones sobre React Native, Expo, Next.js, TypeScript, desarrollo móvil y web.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0520',
    theme_color: '#6B2AE8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
