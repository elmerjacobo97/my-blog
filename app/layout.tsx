import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Blog - Elmer Jacobo | Desarrollo Web',
    template: '%s | Blog - Elmer Jacobo',
  },
  description:
    'Blog técnico sobre desarrollo web, React, Next.js, TypeScript y buenas prácticas. Guías, tutoriales y soluciones a problemas reales.',
  keywords: [
    'desarrollo web',
    'react',
    'nextjs',
    'typescript',
    'javascript',
    'tailwind',
    'frontend',
    'backend',
    'blog técnico',
    'programación',
  ],
  authors: [{ name: 'Elmer Jacobo' }],
  creator: 'Elmer Jacobo',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://blog.elmerjacobo.dev',
    title: 'Blog - Elmer Jacobo',
    description: 'Blog técnico sobre desarrollo web, React, Next.js y TypeScript.',
    siteName: 'Blog - Elmer Jacobo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Elmer Jacobo',
    description: 'Blog técnico sobre desarrollo web, React, Next.js y TypeScript.',
    creator: '@elmerjacobo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
