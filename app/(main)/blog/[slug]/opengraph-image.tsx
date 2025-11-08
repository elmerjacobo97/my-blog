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
    // Fallback si no se encuentra el post
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
          }}
        >
          <div style={{ fontSize: 48, color: '#fff' }}>Post no encontrado</div>
        </div>
      ),
      { ...size }
    );
  }

  // Formatear la fecha
  const formattedDate = new Date(post.date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0520', // --background dark theme
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #120931 2%, transparent 0%), radial-gradient(circle at 75px 75px, #120931 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(50, 6, 164, 0.15) 0%, rgba(107, 42, 232, 0.15) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '80px',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'auto',
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3206A4 0%, #6B2AE8 100%)', // Tu paleta púrpura
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Blog - Elmer Jacobo
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              marginBottom: 'auto',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: '#F5F5F8', // --foreground dark theme
                lineHeight: 1.2,
                maxWidth: 1000,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.title}
            </div>

            {/* Summary */}
            <div
              style={{
                fontSize: 24,
                color: '#8E84A8', // --muted-foreground dark theme
                lineHeight: 1.5,
                maxWidth: 900,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.summary}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {post.tags.slice(0, 4).map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: 'rgba(107, 42, 232, 0.15)',
                      border: '1px solid rgba(107, 42, 232, 0.4)',
                      borderRadius: 6,
                      fontSize: 18,
                      color: '#8E84A8',
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 32,
              borderTop: '1px solid #221652', // --border dark theme
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: '#8E84A8', // --muted-foreground
              }}
            >
              {formattedDate} • {post.readingTime}
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#6B6287',
              }}
            >
              blog.elmerjacobo.dev
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
