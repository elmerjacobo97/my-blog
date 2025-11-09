import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div tw="flex w-full h-full items-center justify-center" style={{ backgroundColor: '#0A0520' }}>
          <div tw="flex text-5xl" style={{ color: '#F5F5F8' }}>
            Post no encontrado
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const title = post.title.length > 80 ? post.title.slice(0, 80) + '...' : post.title;
  const summary = post.summary.length > 140 ? post.summary.slice(0, 140) + '...' : post.summary;
  const displayTags = post.tags.slice(0, 3);

  return new ImageResponse(
    (
      <div tw="flex w-full h-full" style={{ backgroundColor: '#0A0520' }}>
        <div tw="flex flex-col w-full" style={{ padding: '60px 70px' }}>
          {/* Top gradient border */}
          <div
            tw="flex w-full mb-10"
            style={{
              height: 4,
              background: 'linear-gradient(90deg, #3206A4 0%, #6B2AE8 100%)',
            }}
          />

          {/* Blog badge and tags container */}
          <div tw="flex flex-col mb-10">
            {/* Blog badge */}
            <div tw="flex items-center mb-5">
              <div tw="flex rounded-full" style={{ width: 6, height: 6, backgroundColor: '#6B2AE8', marginRight: 12 }} />
              <div tw="flex text-xl font-bold" style={{ color: '#6B2AE8' }}>
                BLOG
              </div>
            </div>

            {/* Tags */}
            <div tw="flex flex-wrap">
              {displayTags.map((tag, i) => (
                <div
                  key={i}
                  tw="flex px-3.5 py-1.5 rounded-2xl text-sm"
                  style={{
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: 'rgba(107, 42, 232, 0.12)',
                    border: '1px solid rgba(107, 42, 232, 0.3)',
                    color: '#A78BFA',
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div tw="flex flex-col flex-1">
            {/* Title */}
            <div tw="flex text-5xl font-black text-white leading-tight mb-5">{title}</div>

            {/* Summary */}
            <div tw="flex text-xl leading-relaxed" style={{ color: '#A1A1AA' }}>
              {summary}
            </div>
          </div>

          {/* Footer */}
          <div tw="flex justify-between items-center pt-6 mt-10" style={{ borderTop: '1px solid rgba(107, 42, 232, 0.2)' }}>
            <div tw="flex flex-col">
              <div tw="flex text-lg font-semibold mb-1" style={{ color: '#E4E4E7' }}>
                Elmer Jacobo
              </div>
              <div tw="flex text-sm" style={{ color: '#71717A' }}>
                {formattedDate} • {post.readingTime}
              </div>
            </div>
            <div tw="flex text-base font-semibold" style={{ color: '#6B2AE8' }}>
              blog.elmerjacobo.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
