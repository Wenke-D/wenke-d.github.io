/**
 * Markdown turns a line break inside a paragraph into a space. Between Latin
 * words that is what you want; between Chinese characters it shows up as a
 * visible gap, so a hard-wrapped Chinese paragraph renders with holes in it.
 *
 * This drops the break when both sides are CJK, and keeps it — as a space —
 * when either side is not, which is the spacing Chinese text wants around
 * Latin words anyway (`用 npm 定义`).
 */
const CJK =
  /[⺀-〿぀-ヿ㐀-䶿一-鿿豈-﫿︰-﹏＀-￯]/;

export function remarkCjkLineBreaks() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (node.type === "text" && typeof node.value === "string" && node.value.includes("\n")) {
    node.value = node.value.replace(/(.)\n(.)/gs, (match, before, after) =>
      CJK.test(before) && CJK.test(after) ? before + after : match,
    );
  }
  for (const child of node.children ?? []) walk(child);
}
