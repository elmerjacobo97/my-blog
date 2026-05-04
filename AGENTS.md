# AGENTS.md

## Commands

- `pnpm dev` — dev server (http://localhost:3000)
- `pnpm build` — production build (runs Next.js build + MDX compilation)
- `pnpm lint` — ESLint (flat config, eslint-config-next core-web-vitals + typescript)

No test runner is configured. No `typecheck` script — type checking runs through `next build` or editor integration.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · pnpm
- MDX content via `next-mdx-remote` + `gray-matter` + `reading-time`
- shadcn/ui (new-york style, RSC mode) — components go in `@/components/ui`
- Radix UI primitives · Lucide icons · highlight.js + rehype plugins
- Comments: Giscus (GitHub Discussions)
- Analytics: Vercel Analytics + Speed Insights
- Deployed on Vercel

## Architecture

```
app/
  (main)/          # Route group: Header + Footer wrapper
  (main)/about/
  (main)/blog/     # Blog listing (uses lib/posts.ts — server-only)
  blog/[slug]/     # Dynamic route for individual posts (opengraph-image.tsx only)
  rss.xml/         # RSS feed route
  layout.tsx        # Root: Inter font, ThemeProvider, Analytics, SpeedInsights
  globals.css       # Tailwind 4 + custom purple oklch palette + dark mode
  robots.ts / sitemap.ts / manifest.ts

content/blog/       # MDX posts (frontmatter: title, date, summary, tags)
components/
  ui/              # shadcn/ui primitives (button, card, sheet, etc.)
  mdx/             # Custom MDX renderers (callout, code-block, pre)
  *.tsx            # App components (header, footer, comments, toc, etc.)

lib/
  posts.ts         # Server-only: fs + gray-matter + reading-time — DO NOT import in client components
  utils.ts         # cn() utility (clsx + tailwind-merge)
```

## Key Conventions

- **Path alias**: `@/*` maps to project root (`tsconfig.json`)
- **Language**: Blog content is in Spanish; UI code and comments in English
- **MDX frontmatter**: requires `title`, `date` (YYYY-MM-DD), `summary`, `tags` (string array)
- **`lib/posts.ts`** uses Node `fs` — server-only, never import in `'use client'` files
- **Tailwind CSS 4** — config lives in `globals.css` via `@theme` directive, not in a separate config file
- **Dark mode**: `@custom-variant dark (&:is(.dark *))` — requires `suppressHydrationWarning` on `<html>` (already set)
- **Custom color palette**: Purple oklch-based theme (hue 280). Design tokens in `:root` / `.dark` CSS vars
- **shadcn/ui** style: new-york, RSC-enabled. Add components via `npx shadcn@latest add <component>`

## Gotchas

- No standalone `typecheck` script — use `pnpm build` or `npx tsc --noEmit` for type checking
- Posts are sorted by date descending in `getAllPosts()` — new posts appear first
- `getPostBySlug()` returns `null` on missing files, not an error — handle accordingly
- The `(main)` route group is for layout only; the `blog/[slug]` route is outside it (no shared header/footer unless explicitly included)