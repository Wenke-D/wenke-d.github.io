// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { rehypeExternalLinks } from './src/lib/rehype-external-links.mjs';
import { remarkCjkLineBreaks } from './src/lib/remark-cjk-line-breaks.mjs';

// https://astro.build/config
export default defineConfig({
  // User page served from the domain root, so no `base` is needed.
  site: 'https://wenke-d.github.io',
  markdown: {
    // A wrapped Chinese paragraph should not render with spaces in it.
    remarkPlugins: [remarkCjkLineBreaks],
    // Links written in Markdown leave the site the same way component links do.
    rehypePlugins: [rehypeExternalLinks],
    // Two code themes; the CSS in src/styles/global.css picks one per OS theme.
    shikiConfig: {
      // A warm dark theme, to match the night palette rather than fight it.
      themes: { light: 'github-light', dark: 'vitesse-dark' },
      // Emit both themes as CSS variables; global.css picks between them.
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    // English stays at "/", Chinese at "/zh/".
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
