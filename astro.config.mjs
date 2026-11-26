import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deployment configuration
 *
 * User site (this repository):
 *   site: https://bcila.github.io
 *   base: /
 *
 * Project site (e.g. https://bcila.github.io/portfolio):
 *   SITE_URL=https://bcila.github.io BASE_PATH=/portfolio npm run build
 *
 * The two values can be overridden by environment variables, so the same
 * source tree works for both deployment models without editing components.
 */
const site = process.env.SITE_URL || 'https://bcila.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      namespaces: { news: false, video: false, xhtml: false },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: false,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
