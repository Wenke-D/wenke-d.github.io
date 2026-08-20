// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User page served from the domain root, so no `base` is needed.
  site: 'https://wenke-d.github.io',
  markdown: {
    // Two code themes; the CSS in src/styles/global.css picks one per OS theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
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
