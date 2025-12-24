import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { Callout } from '@/components/mdx/callout';
import { PostReactions } from '@/components/post-reactions';
import { Comments } from '@/components/comments';
import { ShareButtons } from '@/components/share-buttons';
import { ViewCounter } from '@/components/view-counter';
import 'highlight.js/styles/github-dark.css';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post no encontrado' };
  }

  const url = `https://blog.elmerjacobo.dev/blog/${slug}`;

  return {
    title: `${post.title} | Blog - Elmer Jacobo`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: 'Blog - Elmer Jacobo',
      locale: 'es_PE',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Elmer Jacobo'],
      tags: post.tags,
      images: [
        {
          url: `https://blog.elmerjacobo.dev/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      creator: '@elmerjacobo',
      images: [`https://blog.elmerjacobo.dev/blog/${slug}/opengraph-image`],
    },
  };
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-4 scroll-mt-24" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 scroll-mt-24 pb-2 border-b border-border" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 scroll-mt-24" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold mt-6 mb-2 scroll-mt-24" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-7 text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc mb-5 space-y-2 ml-6 marker:text-primary" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal mb-5 space-y-2 ml-6 marker:text-primary" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-7 pl-1" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const hasClassName = 'className' in props && props.className;
    if (hasClassName) {
      return (
        <code
          className="block bg-card border border-border rounded-lg p-4 overflow-x-auto text-sm font-mono mb-5"
          {...props}
        />
      );
    }
    return <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-6 -mx-4 sm:mx-0" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary bg-muted/50 pl-4 pr-4 py-3 my-6 rounded-r-lg italic text-muted-foreground"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="text-primary font-medium hover:underline underline-offset-4"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="bg-muted" {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-border last:border-0" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-sm" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-3 text-sm" {...props} />,
  hr: () => <hr className="my-8 border-border" />,
  Callout,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const postUrl = `https://blog.elmerjacobo.dev/blog/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: `https://blog.elmerjacobo.dev/blog/${slug}/opengraph-image`,
    author: { '@type': 'Person', name: 'Elmer Jacobo', url: 'https://elmerjacobo.dev' },
    publisher: { '@type': 'Person', name: 'Elmer Jacobo', url: 'https://elmerjacobo.dev' },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    keywords: post.tags.join(', '),
    url: postUrl,
    articleSection: 'Technology',
    inLanguage: 'es-PE',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://blog.elmerjacobo.dev' },
      { '@type': 'ListItem', position: 2, name: post.title, item: postUrl },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 animate-fade-in">
          <Link href="/" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10 animate-fade-in">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
            <ViewCounter slug={slug} />
          </div>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 py-1">
            {post.summary}
          </p>

          {/* Share */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              Compartir:
            </span>
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        <hr className="border-border mb-10" />

        {/* Content */}
        <div>
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
              },
            }}
          />
        </div>

        <hr className="border-border my-10" />

        {/* Reactions */}
        <PostReactions postSlug={slug} />

        {/* Comments */}
        <div className="mt-10">
          <Comments />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold mb-6">Artículos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover-lift border-border/50">
                  <CardContent className="p-4">
                    <Link href={`/blog/${relatedPost.slug}`} className="block group">
                      <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-2 text-sm">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{relatedPost.readingTime}</p>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-14 pt-6 border-t border-border">
          <Link href="/">
            <Button variant="ghost" className="gap-2 -ml-3">
              <ArrowLeft className="w-4 h-4" />
              Todos los artículos
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
