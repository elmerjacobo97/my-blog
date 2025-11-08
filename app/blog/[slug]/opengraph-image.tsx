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
        <div tw="flex w-full h-full items-center justify-center bg-[#0A0520]">
          <div tw="flex text-5xl text-[#F5F5F8]">Post no encontrado</div>
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
      <div tw="flex w-full h-full bg-[#0A0520]">
        <div tw="flex flex-col w-full p-[60px_70px]">
          {/* Top gradient border */}
          <div tw="flex w-full h-1 bg-gradient-to-r from-[#3206A4] to-[#6B2AE8] mb-10" />

          {/* Blog badge and tags container */}
          <div tw="flex flex-col mb-10">
            {/* Blog badge */}
            <div tw="flex items-center mb-5">
              <div tw="flex w-1.5 h-1.5 rounded-full bg-[#6B2AE8] mr-3" />
              <div tw="flex text-xl font-bold text-[#6B2AE8]">BLOG</div>
            </div>

            {/* Tags */}
            <div tw="flex flex-wrap">
              {displayTags.map((tag, i) => (
                <div
                  key={i}
                  tw="flex px-3.5 py-1.5 mr-2 mb-2 bg-[rgba(107,42,232,0.12)] border border-[rgba(107,42,232,0.3)] rounded-2xl text-sm text-[#A78BFA]"
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
            <div tw="flex text-xl text-[#A1A1AA] leading-relaxed">{summary}</div>
          </div>

          {/* Footer */}
          <div tw="flex justify-between items-center pt-6 border-t border-[rgba(107,42,232,0.2)] mt-10">
            <div tw="flex flex-col">
              <div tw="flex text-lg font-semibold text-[#E4E4E7] mb-1">Elmer Jacobo</div>
              <div tw="flex text-sm text-[#71717A]">
                {formattedDate} • {post.readingTime}
              </div>
            </div>
            <div tw="flex text-base text-[#6B2AE8] font-semibold">blog.elmerjacobo.dev</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
