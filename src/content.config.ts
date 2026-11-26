import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(100),
    description: z.string().max(220),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string(),
    coverAlt: z.string(),
    author: z.string().default('Burak Anıl Cila'),
    draft: z.boolean().default(false),
    /** Starter content that should be replaced before publishing. */
    sample: z.boolean().default(false),
  }),
});

export const collections = { blog };
