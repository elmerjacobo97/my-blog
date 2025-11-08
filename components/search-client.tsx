'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, CircleXIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { PostData } from '@/lib/posts';

interface SearchClientProps {
  posts: PostData[];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('es-PE', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function PostCard({ post }: { post: PostData }) {
  return (
    <Card className="w-full hover:shadow-lg hover:border-primary/50 transition-all">
      <CardHeader>
        <CardTitle className="text-lg hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{post.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(post.date)}</span>
            <Link href={`/blog/${post.slug}`} passHref>
              <Button size="sm" variant="ghost" className="gap-1">
                Leer <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SearchClient({ posts }: SearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar posts por búsqueda
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Obtener todos los tags únicos
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <>
      {/* Header */}
      <header className="mb-12 ">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Blog de Desarrollo</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Artículos sobre desarrollo web y móvil. Especializado en React Native, Next.js, TypeScript y buenas
            prácticas. Comparto lo que aprendo construyendo aplicaciones multiplataforma.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              placeholder="Buscar artículos..."
              className="pl-10 pe-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                aria-label="Limpiar búsqueda"
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-6 flex gap-2 items-center flex-wrap">
          <span className="text-sm text-muted-foreground">Tags populares:</span>
          {allTags.slice(0, 6).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSearchQuery(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Posts List */}
        <section className="md:col-span-2 space-y-4">
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-4">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'} para &quot;
              {searchQuery}&quot;
            </p>
          )}

          {filteredPosts.length > 0 ? (
            filteredPosts.map((p) => <PostCard key={p.slug} post={p} />)
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No se encontraron artículos para &quot;{searchQuery}&quot;</p>
            </Card>
          )}
        </section>

        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg">Sobre este blog</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground mb-4">
                Soy desarrollador full-stack. Aquí comparto guías prácticas, soluciones a bugs y mi proceso al construir
                aplicaciones web.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="https://elmerjacobo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Ver mi portafolio
                </a>
                <Link href="/about" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Más sobre mí
                </Link>
                <a
                  href="https://github.com/elmerjacobo97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg">Todos los tags</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={searchQuery === tag ? 'default' : 'secondary'}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-gradient-card border-primary/20">
            <CardContent className="p-0">
              <p className="text-sm font-medium mb-2">¿Te gustó el contenido?</p>
              <p className="text-xs text-muted-foreground mb-4">Sígueme en GitHub para más proyectos y código.</p>
              <a href="https://github.com/elmerjacobo97" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full">
                  Seguir en GitHub
                </Button>
              </a>
            </CardContent>
          </Card>
        </aside>
      </main>
    </>
  );
}
