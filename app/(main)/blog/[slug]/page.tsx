import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
import 'highlight.js/styles/github-dark.css';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  const url = `https://blog.elmerjacobo.dev/blog/${slug}`;

  return {
    title: `${post.title} | Blog - Elmer Jacobo`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: url,
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
    <h1 className="text-4xl font-bold mt-8 mb-4 scroll-mt-20" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 scroll-mt-20" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 scroll-mt-20" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4 leading-7" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-7" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const hasClassName = 'className' in props && props.className;
    if (hasClassName) {
      return (
        <code
          className="block bg-card border rounded-lg p-4 overflow-x-auto text-sm font-mono mb-4 max-w-full"
          {...props}
        />
      );
    }
    return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono break-words" {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-card border rounded-lg p-4 overflow-x-auto mb-6 max-w-full -mx-4 md:mx-0" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="text-primary hover:underline font-medium"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse border border-border" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead className="bg-muted" {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr className="border-b border-border" {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-sm" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-3 text-sm" {...props} />,
  Callout,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Obtener posts relacionados
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const postUrl = `https://blog.elmerjacobo.dev/blog/${slug}`;

  // JSON-LD Structured Data para SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: `https://blog.elmerjacobo.dev/blog/${slug}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: 'Elmer Jacobo',
      url: 'https://elmerjacobo.dev',
    },
    publisher: {
      '@type': 'Person',
      name: 'Elmer Jacobo',
      url: 'https://elmerjacobo.dev',
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    url: postUrl,
    articleSection: 'Technology',
    inLanguage: 'es-PE',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://blog.elmerjacobo.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://blog.elmerjacobo.dev',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="overflow-x-hidden">
        {/* Header */}
        <header className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4" /> Todos los artículos
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="mb-6" />

          <p className="text-xl leading-relaxed text-muted-foreground">{post.summary}</p>

          <div className="mt-6">
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </header>

        <Separator className="my-8" />

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
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

        <Separator className="my-12" />

        {/* Reactions */}
        <PostReactions postSlug={slug} />

        {/* Comments */}
        <Comments />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover:border-primary/50 transition-colors">
                  <CardContent>
                    <Link href={`/blog/${relatedPost.slug}`} className="block group">
                      <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{relatedPost.readingTime}</p>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
