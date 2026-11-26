import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const dist = resolve('dist');

/**
 * Detect the deployment base path from the built HTML so this script works
 * after any build, with or without BASE_PATH set in the environment.
 */
async function detectBase() {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH === '/' ? '' : process.env.BASE_PATH.replace(/\/+$/, '');
  }

  try {
    const html = await readFile(join(dist, 'index.html'), 'utf8');
    const match = html.match(/(?:href|src)="([^"]*\/_astro\/[^"]+)"/);
    if (!match) return '';
    const path = match[1];
    const idx = path.indexOf('/_astro/');
    return idx > 0 ? path.slice(0, idx) : '';
  } catch {
    return '';
  }
}

const base = await detectBase();

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const pages = await walk(dist);
const internal = new Map();
const external = new Set();
const broken = [];

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url || url === '#' || url.startsWith('mailto:') || url.startsWith('tel:')) continue;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      external.add(url);
      continue;
    }
    if (url.startsWith('data:')) continue;

    const [pathPart] = url.split('#');
    if (!pathPart) continue;

    // Strip the deployed base path before resolving inside dist/.
    let localPath = pathPart;
    if (base && localPath.startsWith(base)) localPath = localPath.slice(base.length) || '/';

    const target = localPath.startsWith('/')
      ? join(dist, localPath)
      : resolve(dirname(page), localPath);

    const candidates = [
      target,
      join(target, 'index.html'),
      `${target}.html`,
    ];

    let ok = false;
    for (const candidate of candidates) {
      if (await exists(candidate)) {
        ok = true;
        break;
      }
    }

    const key = `${url}`;
    internal.set(key, (internal.get(key) ?? 0) + 1);
    if (!ok) broken.push({ page: page.replace(dist, ''), url });
  }
}

const hosts = new Map();
for (const url of external) {
  const host = new URL(url).hostname;
  hosts.set(host, (hosts.get(host) ?? 0) + 1);
}

console.log('pages:', pages.length);
console.log('internal link targets:', internal.size);
console.log('external links:', external.size);
console.log('external hosts:', [...hosts.entries()].map(([h, n]) => `${h} (${n})`).join(', '));
console.log('broken internal:', broken.length);
if (broken.length) console.log(JSON.stringify(broken, null, 2));
