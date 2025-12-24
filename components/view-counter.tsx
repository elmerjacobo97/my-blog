'use client';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const badgeUrl = `https://visitor-badge.laobi.icu/badge?page_id=elmerjacobo.blog.${slug}&left_color=%23555&right_color=%236B2AE8&left_text=`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={badgeUrl} alt="Vistas" className="h-5" loading="lazy" />
  );
}
