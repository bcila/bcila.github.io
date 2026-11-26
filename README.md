# Burak Anıl Cila — Developer Portfolio

A fast, accessible, statically generated developer portfolio built with Astro 7, Tailwind CSS v4, MDX content collections, and Shiki — designed for GitHub Pages.

- **Dark by default**, with a persisted light theme
- **Content lives in data files**, never in components
- **Base-path safe** throughout, so the same code deploys to a user site (`user.github.io`) or a project site (`user.github.io/repo/`)
- **Lighthouse: 100** on Accessibility, Best Practices, and SEO
- No UI framework, no client-side router, no animation library

---

## Quick start

Requirements: **Node.js 22.12+** (Node 24 is used in CI) and npm.

```bash
npm install
npm run dev       # http://localhost:4321
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run check` | Astro + TypeScript diagnostics (strict) |
| `npm run check:links` | Verify every internal link in `dist/` resolves |

Before shipping any change:

```bash
npm run check && npm run build && npm run check:links
```

---

## Make it yours

All personal content is separated from the UI. You will only need these files:

### 1. `src/data/profile.ts`

The single source of truth for identity:

```ts
{
  name: 'Your Name',
  shortName: 'Your Name',
  initials: 'YN',
  title: 'Software Engineer',
  location: 'City, Country',
  timezone: 'UTC+1',
  email: 'you@example.com',
  bio: '…',
  hero: { eyebrow, headline, intro },
  about: […],
  availability: { available, label, detail },
  avatar: '/images/profile.svg',
  resumeUrl: '/resume/your-cv.pdf',
  github: 'https://github.com/you',
  linkedin: 'https://linkedin.com/in/you',
  socials: […],
  site: { url, title, description, locale },
}
```

### 2. `src/data/projects.ts`

Each project supports:

| Field | Notes |
| --- | --- |
| `slug` | URL segment for `/projects/<slug>/` |
| `title`, `tagline` | Card heading and one-line summary |
| `description` | Array of paragraphs for the detail page |
| `highlights` | Bullet list of what you worked on |
| `technologies` | Tags shown on cards and detail pages |
| `category` | Used by the filter bar — add new values to `projectCategories` |
| `featured` | Featured projects appear first on the home page |
| `sample` | `true` shows a "Sample" badge (starter content) |
| `cover`, `coverAlt` | Image path under `public/` and alt text |
| `date` | Optional ISO date (`YYYY-MM-DD`) |
| `status`, `role`, `github`, `demo` | Optional metadata and links |

> The repository ships with **one real project** (MachineMakesMoney, from the CV) and **three entries marked `sample: true`**. Replace or delete the sample entries before publishing — nothing in the UI will break if the list length changes.

### 3. `src/data/experience.ts`

`experience`, `education`, and `certifications` arrays. Employment type, location, responsibilities, achievements, and technologies are all optional except the core fields.

### 4. `src/data/skills.ts`

Six categories with a title, description, Lucide icon key, and a flat list of skills. There are intentionally **no proficiency percentages or progress bars**.

### 5. Images and files

Replace these files in `public/` (keep the paths, or update the data files):

| File | Used for |
| --- | --- |
| `public/images/profile.svg` | Hero portrait (replace with a JPG/PNG/WebP photo and update `profile.avatar`) |
| `public/images/projects/*.svg` | Project covers (`1200×750` recommended) |
| `public/images/blog/*.svg` | Blog covers (`1200×630`) |
| `public/resume/burak-anil-cila-2026.pdf` | Downloadable résumé |
| `public/favicon.svg`, `icon-192.png`, `icon-512.png` | Favicons and PWA icons |
| `public/og.png` | Default social share image (`1200×630`) |

`public/og.svg` is the editable source for `public/og.png`.

---

## Writing blog posts

Posts are MDX files in `src/content/blog/`. The filename becomes the slug, so `my-post.mdx` is served at `/blog/my-post/`.

```mdx
---
title: 'A clear, specific title'
description: 'One or two sentences used for cards and meta description (max ~155 chars).'
pubDate: 2026-11-01
updatedDate: 2026-11-12      # optional
category: 'Backend'
tags: ['Python', 'FastAPI']
cover: '/images/blog/my-post.svg'
coverAlt: 'Describe the image for screen readers'
author: 'Your Name'          # optional, defaults to you
draft: false                 # drafts appear in dev, never in a production build
sample: false                # true marks the article as starter content
---

Your content. Use `## Heading` for sections that should appear in the
table of contents, and fenced code blocks for Shiki highlighting.
```

The reading time is computed from the body. Related articles are picked by shared tags and category, with a recency fallback.

Two sample articles are included and marked `sample: true`; a third (about deploying Astro to GitHub Pages) is written to be genuinely useful and is not marked as a sample.

---

## Contact form (optional)

GitHub Pages is static, so the site ships with a real `mailto:` link, a copy-email button, and GitHub/LinkedIn links. No fake form is rendered by default.

To enable a form, set a real endpoint from a provider such as Formspree or Basin:

```bash
# .env
PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

The form posts the fields directly to that endpoint and reports the real result. Nothing is stored on the site. If the request fails, the status message tells the visitor to email you instead.

---

## Deploying to GitHub Pages

### 1. Choose your URL shape

| Model | URL | `site` | `base` |
| --- | --- | --- | --- |
| **User site** (repo named `username.github.io`) | `https://username.github.io/` | `https://username.github.io` | `/` |
| **Project site** | `https://username.github.io/repo/` | `https://username.github.io` | `/repo` |

`astro.config.mjs` reads both from environment variables and defaults to this repository's user site (`https://bcila.github.io`, base `/`).

### 2. Enable GitHub Actions as the Pages source

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).

No `gh-pages` branch is needed.

### 3. The workflow

`.github/workflows/deploy.yml` runs on:

- every push to `main`
- manual dispatch (`workflow_dispatch`)

It uses the official Astro action and GitHub's Pages deploy action:

- `actions/checkout@v7`
- `withastro/action@v6` (installs, builds, uploads the artifact; Node 24)
- `actions/deploy-pages@v5`

Permissions are limited to `contents: read`, `pages: write`, and `id-token: write`, with a `pages` concurrency group so deployments never overlap.

### 4. Deploying a project site

The workflow passes optional repository variables. Create them under **Settings → Secrets and variables → Actions → Variables**:

| Variable | Example |
| --- | --- |
| `SITE_URL` | `https://username.github.io` |
| `BASE_PATH` | `/my-repo` |

Then every internal link, asset, canonical URL, sitemap entry, and the manifest resolves under `/my-repo/`.

### 5. Verify the base path locally

Always test a project-site build before deploying one:

```bash
SITE_URL=https://example.com BASE_PATH=/my-repo npm run build
BASE_PATH=/my-repo npm run check:links
npx astro preview
```

Then confirm:

- assets load from `/my-repo/_astro/…`
- navigation and card links include `/my-repo/`
- project and blog detail pages resolve
- the résumé PDF and images load
- `/404.html` links stay inside the base path

`src/utils/url.ts` provides `withBase()` for every internal path. Never hardcode a root-relative `href="/..."` or `src="/..."` in a component.

### 6. Custom domain

1. Add `public/CNAME` containing your domain, e.g. `burakcila.dev`.
2. Set `SITE_URL=https://burakcila.dev` and `BASE_PATH=/` as repository variables.
3. Configure DNS as described in GitHub's custom domain documentation.

---

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        Static assets, résumé, icons, social image
scripts/check-links.mjs        Internal link verification for the built site
src/
  components/
    BaseHead.astro             Meta, Open Graph, Twitter, canonical, theme bootstrap
    Header.astro               Responsive navigation with accessible mobile menu
    Footer.astro
    Hero.astro
    ProjectCard.astro
    ExperienceTimeline.astro
    SkillCategory.astro
    BlogCard.astro
    ContactSection.astro       Email, copy button, socials, optional form
    ContactForm.astro          Rendered only when an endpoint is configured
    ShareLinks.astro
    SocialLinks.astro
    SocialIcon.astro
    SectionHeading.astro
    ThemeToggle.astro
  content.config.ts            Blog collection schema (Zod)
  content/blog/*.mdx           Articles
  data/
    profile.ts                 Personal information
    projects.ts                Project entries
    experience.ts              Work, education, certifications
    skills.ts                  Skill categories
  layouts/
    MainLayout.astro           Page shell, metadata, reveal animations
    BlogLayout.astro           Article page with TOC, author card, related posts
  pages/
    index.astro
    projects/index.astro
    projects/[slug].astro
    experience.astro
    skills.astro
    blog/index.astro
    blog/[...slug].astro
    404.astro
    robots.txt.ts              Generated from the configured site URL
  styles/global.css            Design tokens, components, theme, prose
  utils/
    url.ts                     withBase(), absoluteUrl(), stripBase()
    blog.ts                    Sorting, reading time, tags, related posts
    date.ts                    Date formatting
    clipboard.ts               Clipboard with a graceful fallback
```

---

## Design system notes

- **Tokens** live at the top of `src/styles/global.css` under `:root` / `[data-theme='light']`. Change `--accent` to re-skin the site.
- **Type**: Geist and Geist Mono, self-hosted via Fontsource — no external font requests.
- **Theming**: an inline script in `BaseHead.astro` applies the stored theme before first paint, so there is no flash.
- **Motion**: CSS transitions only, gated behind `prefers-reduced-motion`.
- **Accessibility**: skip link, visible focus rings, semantic landmarks, labelled controls, `aria-current` navigation, inert mobile menu, and AA-contrast text in both themes.

---

## License

Source code is free to adapt for your own portfolio. Replace all sample and placeholder content before publishing.
