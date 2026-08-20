/**
 * Author lists are written with the author's own name wrapped in **double
 * asterisks** (src/content/publications.yaml). Render that as an underline
 * rather than bold: it marks the name without making the line shout.
 */
export function renderAuthors(authors: string): string {
  return authors.replace(
    /\*\*(.+?)\*\*/g,
    '<span class="underline decoration-zinc-400 underline-offset-2">$1</span>',
  );
}
