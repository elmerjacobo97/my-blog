import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Blog - Elmer Jacobo | React Native & Desarrollo Web',
    template: '%s | Blog - Elmer Jacobo',
  },
  description:
    'Blog especializado en React Native y desarrollo web. Guías, tutoriales y soluciones sobre React Native, Expo, Next.js, TypeScript y desarrollo móvil multiplataforma.',
  keywords: [
    'react native',
    'desarrollo móvil',
    'expo',
    'react',
    'nextjs',
    'typescript',
    'javascript',
    'desarrollo web',
    'aplicaciones móviles',
    'ios',
    'android',
    'frontend',
    'tailwind',
    'blog técnico',
    'programación',
  ],
  authors: [{ name: 'Elmer Jacobo' }],
  creator: 'Elmer Jacobo',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://blog.elmerjacobo.dev',
    title: 'Blog - Elmer Jacobo | React Native & Desarrollo Web',
    description: 'Blog especializado en React Native, Expo, Next.js y desarrollo móvil multiplataforma.',
    siteName: 'Blog - Elmer Jacobo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Elmer Jacobo | React Native & Desarrollo Web',
    description: 'Blog especializado en React Native, Expo, Next.js y desarrollo móvil multiplataforma.',
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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-primary-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
