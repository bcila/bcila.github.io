import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 220;

export function readingTime(body: string | undefined): number {
  if (!body) return 1;

  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getCategories(posts: BlogPost[]): string[] {
  return [...new Set(posts.map((post) => post.data.category))].sort();
}

export function getTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort();
}

export function getRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit = 2): BlogPost[] {
  const scored = allPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.filter((tag) => post.data.tags.includes(tag)).length;
      const sameCategory = candidate.data.category === post.data.category ? 1 : 0;
      return { candidate, score: sharedTags * 2 + sameCategory };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.data.pubDate.valueOf() - a.candidate.data.pubDate.valueOf());

  if (scored.length >= limit) {
    return scored.slice(0, limit).map(({ candidate }) => candidate);
  }

  const fallback = allPosts
    .filter((candidate) => candidate.id !== post.id)
    .filter((candidate) => !scored.some(({ candidate: picked }) => picked.id === candidate.id))
    .slice(0, limit - scored.length);

  return [...scored.map(({ candidate }) => candidate), ...fallback];
}
