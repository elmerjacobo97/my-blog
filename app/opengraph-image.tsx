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
      <div tw="flex w-full h-full" style={{ backgroundColor: '#0A0520' }}>
        <div tw="flex flex-col w-full" style={{ padding: '60px 70px' }}>
          {/* Top gradient border */}
          <div
            tw="flex w-full mb-12"
            style={{
              height: 4,
              background: 'linear-gradient(90deg, #3206A4 0%, #6B2AE8 100%)',
            }}
          />

          {/* Badge */}
          <div tw="flex justify-center mb-10">
            <div
              tw="flex items-center px-6 py-3 rounded-full"
              style={{
                gap: 12,
                backgroundColor: 'rgba(107, 42, 232, 0.1)',
                border: '1px solid rgba(107, 42, 232, 0.3)',
              }}
            >
              <div
                tw="flex rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: 'linear-gradient(135deg, #3206A4 0%, #6B2AE8 100%)',
                }}
              />
              <div tw="flex text-lg font-bold tracking-widest" style={{ color: '#A78BFA' }}>
                FULL STACK DEVELOPER
              </div>
            </div>
          </div>

          {/* Main content */}
          <div tw="flex flex-col flex-1 items-center text-center">
            {/* Title */}
            <div tw="flex text-8xl font-black text-white mb-6 leading-none tracking-tight">Elmer Jacobo</div>

            {/* Subtitle */}
            <div tw="flex text-3xl mb-10" style={{ color: '#A1A1AA', maxWidth: 800 }}>
              Blog sobre desarrollo web, móvil y buenas prácticas
            </div>

            {/* Tech stack */}
            <div tw="flex flex-wrap justify-center" style={{ maxWidth: 700 }}>
              {['React Native', 'Expo', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => (
                <div
                  key={tech}
                  tw="flex px-5 py-2 rounded-2xl text-lg font-medium"
                  style={{
                    margin: 6,
                    backgroundColor: 'rgba(107, 42, 232, 0.12)',
                    border: '1px solid rgba(107, 42, 232, 0.3)',
                    color: '#A78BFA',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div tw="flex justify-center pt-6" style={{ borderTop: '1px solid rgba(107, 42, 232, 0.2)' }}>
            <div tw="flex text-xl font-semibold" style={{ color: '#6B2AE8' }}>
              blog.elmerjacobo.dev
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
