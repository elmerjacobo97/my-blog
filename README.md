# 📝 Blog — Elmer Jacobo

Welcome to my personal blog! This is a modern, high-performance blog where I share guides, tutorials, and solutions about Full Stack development, React Native, Next.js, TypeScript, and mobile & web development.

🔗 **Live Website:** https://blog.elmerjacobo.dev

## ✨ Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **MDX Support**: Write content with markdown and React components
- **SEO Optimized**: Dynamic Open Graph images, structured data, RSS feed
- **Dark Mode**: System-aware theme with custom purple palette
- **Performance**: Optimized with Vercel Analytics and Speed Insights
- **Interactive**: Comments (Giscus), reactions, and social sharing
- **Syntax Highlighting**: Beautiful code blocks with Highlight.js
- **Responsive Design**: Fully optimized for all screen sizes

## 🛠️ Tech Stack

| Category          | Technologies                           |
| ----------------- | -------------------------------------- |
| Framework         | Next.js 16 (App Router)                |
| Frontend          | React 19, TypeScript, Tailwind CSS 4   |
| Content           | MDX, Gray Matter, Reading Time         |
| Styling           | Tailwind CSS 4, Radix UI, Lucide Icons |
| Code Highlighting | Highlight.js, Rehype Plugins           |
| Comments          | Giscus (GitHub Discussions)            |
| Analytics         | Vercel Analytics, Speed Insights       |
| Deployment        | Vercel                                 |

## 📥 Getting Started

### ✅ Requirements

- Node.js v20 or later
- npm (or pnpm/yarn)

### 🔧 Installation

```bash
git clone https://github.com/elmerjacobo97/my-blog.git
cd my-blog
pnpm install
pnpm run dev
```

### 🚀 Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

### 🏗️ Production Build

```bash
pnpm run build
pnpm start
```

## 📂 Project Structure

```
my-blog/
├── app/                      # Next.js App Router
│   ├── (main)/              # Main layout group
│   │   ├── blog/[slug]/     # Individual blog posts
│   │   └── about/           # About page
│   ├── opengraph-image.tsx  # Dynamic OG image
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── content/blog/            # MDX blog posts
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   └── mdx/                 # MDX custom components
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## ✍️ Writing Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: 'Your Post Title'
date: '2025-01-08'
summary: 'A brief description of your post'
tags: ['react', 'nextjs', 'typescript']
---

Your content here...
```

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- Email: [contacto@elmerjacobo.dev](mailto:contacto@elmerjacobo.dev)
- LinkedIn: [LinkedIn](https://linkedin.com/in/elmerjacobo97)
- GitHub: [@elmerjacobo97](https://github.com/elmerjacobo97)
