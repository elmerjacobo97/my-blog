import { ImageResponse } from 'next/og';

export const alt = 'Blog - Elmer Jacobo | Full Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Main Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3206A4 0%, #6B2AE8 100%)', // Tu paleta púrpura
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Blog - Elmer Jacobo
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: '#8E84A8', // --muted-foreground dark theme
              marginBottom: 48,
              maxWidth: 800,
            }}
          >
            Full Stack Developer
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['React Native', 'Expo', 'Next.js', 'TypeScript'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'rgba(107, 42, 232, 0.15)',
                  border: '1px solid rgba(107, 42, 232, 0.4)',
                  borderRadius: 8,
                  fontSize: 20,
                  color: '#8E84A8',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Website */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 24,
              color: '#6B6287',
            }}
          >
            blog.elmerjacobo.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
