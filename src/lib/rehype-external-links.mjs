/**
 * Markdown links can't carry component props, so links written in src/content/
 * get the same treatment as <ExternalLink>: anything pointing off-site opens in
 * a new tab. The arrow icon is added by CSS (`a[target="_blank"]::after` in
 * src/styles/global.css) so this stays a two-property change.
 */
export function rehypeExternalLinks() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (node.type === "element" && node.tagName === "a") {
    const href = node.properties?.href;
    if (typeof href === "string" && /^https?:\/\//i.test(href)) {
      node.properties.target = "_blank";
      node.properties.rel = ["noopener", "noreferrer"];
    }
  }
  for (const child of node.children ?? []) walk(child);
}
