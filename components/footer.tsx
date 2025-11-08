'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Elmer Jacobo — Hecho con Next.js 16 + shadcn/ui
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a
              href="https://elmerjacobo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Portafolio
            </a>
            <a
              href="https://github.com/elmerjacobo97"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/elmerjacobo97"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sobre mí
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
