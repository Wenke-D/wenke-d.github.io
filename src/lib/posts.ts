import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/**
 * Posts, newest first. Drafts are visible while running
 * `npm run dev` so you can preview them, and dropped from the built site.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    "posts",
    (p) => import.meta.env.DEV || !p.data.draft,
  );
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** A post's file name is also its URL slug. */
export function slugOf(post: Post): string {
  return post.id;
}
