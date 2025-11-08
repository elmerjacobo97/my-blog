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
      <div tw="flex w-full h-full bg-[#0A0520]">
        <div tw="flex flex-col w-full p-[60px_70px]">
          {/* Top gradient border */}
          <div tw="flex w-full h-1 bg-gradient-to-r from-[#3206A4] to-[#6B2AE8] mb-12" />

          {/* Badge */}
          <div tw="flex justify-center mb-10">
            <div tw="flex items-center gap-3 px-6 py-3 bg-[rgba(107,42,232,0.1)] border border-[rgba(107,42,232,0.3)] rounded-full">
              <div tw="flex w-2 h-2 rounded-full bg-gradient-to-br from-[#3206A4] to-[#6B2AE8]" />
              <div tw="flex text-lg font-bold text-[#A78BFA] tracking-widest">FULL STACK DEVELOPER</div>
            </div>
          </div>

          {/* Main content */}
          <div tw="flex flex-col flex-1 items-center text-center">
            {/* Title */}
            <div tw="flex text-8xl font-black text-white mb-6 leading-none">Sobre mí</div>

            {/* Subtitle */}
            <div tw="flex text-3xl text-[#A1A1AA] mb-10 max-w-[800px]">
              Desarrollador full-stack apasionado por compartir conocimiento
            </div>

            {/* Tech stack */}
            <div tw="flex flex-wrap justify-center max-w-[700px]">
              {['React', 'React Native', 'Next.js', 'TypeScript', 'Node.js', 'Laravel'].map((tech) => (
                <div
                  key={tech}
                  tw="flex px-5 py-2 m-1.5 bg-[rgba(107,42,232,0.12)] border border-[rgba(107,42,232,0.3)] rounded-2xl text-lg text-[#A78BFA] font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div tw="flex justify-center pt-6 border-t border-[rgba(107,42,232,0.2)]">
            <div tw="flex text-xl text-[#6B2AE8] font-semibold">blog.elmerjacobo.dev</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
