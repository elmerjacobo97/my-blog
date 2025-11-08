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
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0520',
          }}
        >
          <div style={{ fontSize: 48, color: '#F5F5F8' }}>Post no encontrado</div>
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
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0A0520',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '60px 70px',
          }}
        >
          {/* Top gradient border */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 4,
              background: 'linear-gradient(90deg, #3206A4 0%, #6B2AE8 100%)',
              marginBottom: 40,
            }}
          />

          {/* Blog badge and tags container */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
            {/* Blog badge */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#6B2AE8',
                  marginRight: 12,
                }}
              />
              <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#6B2AE8' }}>BLOG</div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {displayTags.map((tag, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(107, 42, 232, 0.12)',
                    border: '1px solid rgba(107, 42, 232, 0.3)',
                    borderRadius: 20,
                    fontSize: 14,
                    color: '#A78BFA',
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Title */}
            <div
              style={{
                display: 'flex',
                fontSize: 52,
                fontWeight: 900,
                color: '#FAFAFA',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              {title}
            </div>

            {/* Summary */}
            <div
              style={{
                display: 'flex',
                fontSize: 20,
                color: '#A1A1AA',
                lineHeight: 1.4,
              }}
            >
              {summary}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 24,
              borderTop: '1px solid rgba(107, 42, 232, 0.2)',
              marginTop: 40,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 17, fontWeight: 600, color: '#E4E4E7', marginBottom: 4 }}>
                Elmer Jacobo
              </div>
              <div style={{ display: 'flex', fontSize: 14, color: '#71717A' }}>
                {formattedDate} • {post.readingTime}
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: 16, color: '#6B2AE8', fontWeight: 600 }}>
              blog.elmerjacobo.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
