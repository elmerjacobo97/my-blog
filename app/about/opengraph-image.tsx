import { ImageResponse } from 'next/og';

export const alt = 'Sobre mí - Elmer Jacobo';
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
              marginBottom: 50,
            }}
          />

          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 24px',
                backgroundColor: 'rgba(107, 42, 232, 0.1)',
                border: '1px solid rgba(107, 42, 232, 0.3)',
                borderRadius: 50,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3206A4 0%, #6B2AE8 100%)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#A78BFA',
                  letterSpacing: '0.1em',
                }}
              >
                FULL STACK DEVELOPER
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center' }}>
            {/* Title */}
            <div
              style={{
                display: 'flex',
                fontSize: 80,
                fontWeight: 900,
                color: '#FAFAFA',
                marginBottom: 24,
                lineHeight: 1,
              }}
            >
              Sobre mí
            </div>

            {/* Subtitle */}
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                color: '#A1A1AA',
                marginBottom: 40,
                maxWidth: 800,
              }}
            >
              Desarrollador full-stack apasionado por compartir conocimiento
            </div>

            {/* Tech stack */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: 700,
              }}
            >
              {['React', 'React Native', 'Next.js', 'TypeScript', 'Node.js', 'Laravel'].map((tech, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    padding: '8px 18px',
                    backgroundColor: 'rgba(107, 42, 232, 0.12)',
                    border: '1px solid rgba(107, 42, 232, 0.3)',
                    borderRadius: 20,
                    fontSize: 17,
                    color: '#A78BFA',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 24,
              borderTop: '1px solid rgba(107, 42, 232, 0.2)',
            }}
          >
            <div style={{ display: 'flex', fontSize: 20, color: '#6B2AE8', fontWeight: 600 }}>
              blog.elmerjacobo.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
