import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  // BASE_URL already includes the deployment base path (e.g. "/portfolio/").
  const base = import.meta.env.BASE_URL;
  const sitemapUrl = new URL(`${base}sitemap-index.xml`, site ?? 'https://bcila.github.io');

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl.href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
