/**
 * URL helpers that respect Astro's configured `base` path.
 *
 * Never hardcode a root-relative path in a component. Use `withBase()` so the
 * site keeps working when deployed to https://user.github.io/repository/.
 */
const base = import.meta.env.BASE_URL;

export function withBase(path = '/'): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }

  if (path.startsWith('#')) {
    return path;
  }

  const normalizedBase = base === '/' ? '' : base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}` || '/';
}

/** Absolute URL for canonical and social metadata. */
export function absoluteUrl(path: string): string {
  return new URL(path, import.meta.env.SITE).href;
}

/** Path without the deployment base, for active-navigation checks. */
export function stripBase(pathname: string): string {
  const normalizedBase = base === '/' ? '' : base.replace(/\/+$/, '');

  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    const stripped = pathname.slice(normalizedBase.length);
    return stripped === '' ? '/' : stripped;
  }

  return pathname;
}
