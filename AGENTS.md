# AGENTS.md — my-blog

## Commands

- Run commands from `my-blog/`: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`.
- No test runner is configured.
- No `typecheck` script exists; use `pnpm exec tsc --noEmit` for focused type checking.
- ESLint is flat config via `eslint.config.mjs` with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.

## Stack And Conventions

- Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS 4 + pnpm.
- `@/*` maps to the `my-blog/` project root.
- Tailwind config lives in `app/globals.css` through `@theme`; there is no `tailwind.config.*`.
- Dark mode uses `next-themes` with `attribute="class"` and `@custom-variant dark (&:is(.dark *))`; keep `suppressHydrationWarning` on `<html>`.
- Palette is purple OKLCH hue 280 in `app/globals.css`.
- shadcn/ui is `new-york`, RSC enabled, `baseColor: neutral`, icon library `lucide`; UI primitives go in `@/components/ui`.
- Use `cn()` from `@/lib/utils` for class merging.
- Blog content is Spanish; code and comments are English.

## Content And Routing

- MDX posts live in `content/blog/*.mdx` with frontmatter `title`, `date`, `summary`, and `tags`.
- `lib/posts.ts` uses Node `fs`, `gray-matter`, and `reading-time`; keep it server-only and never import it from `'use client'` components.
- `getPostBySlug()` returns `null` for missing files; route code calls `notFound()` after checking.
- `getAllPosts()` sorts posts by date descending.
- `app/(main)/layout.tsx` wraps pages with Header + Footer, including `app/(main)/blog/[slug]/page.tsx`.
- Post Open Graph images are under `app/blog/[slug]/opengraph-image.tsx`, separate from the page route group.
- MDX rendering is in `app/(main)/blog/[slug]/page.tsx` via `next-mdx-remote/rsc`, `remark-gfm`, `rehype-highlight`, `rehype-slug`, and `rehype-autolink-headings`.
