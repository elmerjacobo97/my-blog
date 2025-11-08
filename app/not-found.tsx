'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center px-4 bg-linear-to-br from-background via-background to-muted">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold gradient-primary bg-clip-text text-transparent">404</h1>
          <div className="absolute inset-0 blur-3xl opacity-20 gradient-primary" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Página no encontrada</h2>
          <p className="text-muted-foreground">Lo siento, la página que buscas no existe o ha sido movida.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Ir al inicio
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </Button>
        </div>

        {/* Suggestions */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-3">¿Buscabas algo de esto?</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/" className="text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 transition-colors">
              Blog
            </Link>
            <Link
              href="/about"
              className="text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            >
              Sobre mí
            </Link>
            <a
              href="https://elmerjacobo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            >
              Portafolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
