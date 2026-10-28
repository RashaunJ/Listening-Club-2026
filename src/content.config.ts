import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/reviews',
  }),
  schema: z.object({
    artist: z.string(),
    title: z.string(),
    score: z.number().min(0).max(10),
    reviewed_on: z.coerce.date(),
    week: z.number().int().positive().nullish(),
    genres: z.array(z.string()).default([]),
    standout_tracks: z.array(z.string()).default([]),
    status: z.string().default('published'),
    cover: z.string().optional(),
    year_rank: z.number().int().positive().nullish()
  }),
});

export const collections = { reviews };
