// Schemas for everything under src/content/. Astro validates the files against
// these at build time, so a typo in a field name fails the build instead of
// silently blanking part of a page.
import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// Name, role and the homepage bio — one Markdown file per language.
// The body of the file is the bio; Markdown links and emphasis work there.
const profile = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/profile" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    affiliation: z.string(),
    summary: z.string(),
  }),
});

// One Markdown file per news item, filed under its language: news/en/*.md.
// The file name is yours to choose; ordering comes from `date`.
const news = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/news" }),
  schema: z.object({
    date: z.coerce.date(),
  }),
});

// Interface labels, keyed by language code.
const ui = defineCollection({
  loader: file("src/content/ui.yaml"),
  schema: z.object({
    label: z.string(),
    nav: z.object({ thesis: z.string() }),
    newsHeading: z.string(),
    selectedHeading: z.string(),
    allLink: z.string(),
    pubsTitle: z.string(),
    backHome: z.string(),
  }),
});

const publications = defineCollection({
  loader: file("src/content/publications.yaml"),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number().int(),
    selected: z.boolean().default(false),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),
  }),
});

const site = defineCollection({
  loader: file("src/content/site.yaml"),
  schema: z.object({
    email: z.string().email(),
    thesis: z.string().url(),
  }),
});

export const collections = { profile, news, ui, publications, site };
