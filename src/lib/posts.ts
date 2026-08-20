import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type Post = CollectionEntry<"posts">;

/**
 * Posts for one language, newest first. Drafts are visible while running
 * `npm run dev` so you can preview them, and dropped from the built site.
 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection(
    "posts",
    (p) => p.id.startsWith(`${lang}/`) && (import.meta.env.DEV || !p.data.draft),
  );
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** "en/why-i-write" -> "why-i-write" */
export function slugOf(post: Post): string {
  return post.id.split("/").slice(1).join("/");
}
