'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, X, Calendar, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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

function PostCard({ post, featured = false }: { post: PostData; featured?: boolean }) {
  return (
    <Card
      className={cn('group hover-lift border-border/50 overflow-hidden', featured && 'md:col-span-2 border-primary/20')}
    >
      <CardContent className="p-0">
        <Link href={`/blog/${post.slug}`} className="block p-5 sm:p-6">
          <div className="space-y-3">
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {featured && (
                <Badge variant="default" className="text-xs gap-1">
                  <Sparkles className="w-3 h-3" />
                  Destacado
                </Badge>
              )}
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3
              className={cn(
                'font-bold group-hover:text-primary transition-colors line-clamp-2',
                featured ? 'text-xl sm:text-2xl' : 'text-lg'
              )}
            >
              {post.title}
            </h3>

            {/* Summary */}
            <p className={cn('text-muted-foreground line-clamp-2', featured ? 'text-base' : 'text-sm')}>
              {post.summary}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export function SearchClient({ posts }: SearchClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar posts
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Tags únicos con conteo
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  const hasFilters = searchQuery || selectedTag;

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <header className="space-y-6 animate-fade-in">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Blog de{' '}
            <span className="gradient-text bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Desarrollo
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Artículos sobre desarrollo web y móvil. React Native, Next.js, TypeScript y buenas prácticas. Comparto lo
            que aprendo construyendo aplicaciones.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              ref={inputRef}
              placeholder="Buscar artículos..."
              className="pl-10 pr-10 h-11 bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5 mr-1">
            <TrendingUp className="w-4 h-4" />
            Tags:
          </span>
          {sortedTags.slice(0, 8).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
              <span className="ml-1 opacity-60">({tagCounts[tag]})</span>
            </Badge>
          ))}
        </div>
      </header>

      {/* Results info */}
      {hasFilters && (
        <div className="flex items-center justify-between animate-fade-in">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
            {searchQuery && <> para &quot;{searchQuery}&quot;</>}
            {selectedTag && (
              <>
                {' '}
                en{' '}
                <Badge variant="secondary" className="ml-1">
                  {selectedTag}
                </Badge>
              </>
            )}
          </p>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Posts Grid */}
      <main>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} featured={index === 0 && !hasFilters} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-3">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50" />
              <p className="text-muted-foreground">
                No se encontraron artículos
                {searchQuery && <> para &quot;{searchQuery}&quot;</>}
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Ver todos los artículos
              </Button>
            </div>
          </Card>
        )}
      </main>

      {/* Sidebar Cards - Now below on mobile, side on desktop */}
      <aside className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* About Card */}
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold mb-2">Sobre este blog</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Soy desarrollador full-stack. Comparto guías prácticas, soluciones a bugs y mi proceso construyendo apps.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="text-sm text-primary hover:underline flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" />
              Más sobre mí
            </Link>
            <a
              href="https://elmerjacobo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Ver portafolio
            </a>
          </div>
        </Card>

        {/* All Tags Card */}
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold mb-3">Todos los tags</h3>
          <div className="flex flex-wrap gap-1.5">
            {sortedTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'secondary'}
                className="cursor-pointer text-xs transition-all hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* CTA Card */}
        <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="font-semibold mb-2">¿Te gusta el contenido?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sígueme en GitHub para más proyectos y código open source.
          </p>
          <a href="https://github.com/elmerjacobo97" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="w-full">
              Seguir en GitHub
            </Button>
          </a>
        </Card>
      </aside>
    </div>
  );
}
