# Personal Academic Website

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Static, fast, free to host on GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

## Editing content

| What | File |
| --- | --- |
| Name, role, links, bio | `src/data/site.ts` |
| Publications | `src/data/publications.ts` |
| News items | `src/pages/index.astro` (the `news` array) |
| Layout / `<head>` / footer | `src/layouts/Layout.astro` |
| Theme colors & font | `src/styles/global.css` |

Drop a `cv.pdf` (and any images) into `public/` to serve them at the site root.

## Deploying to GitHub Pages

1. In `astro.config.mjs`, set `site` (and `base`, if this is a *project* repo — see the comment in that file).
2. Push to a GitHub repo's `main` branch.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push.

For a custom domain, add it under Settings → Pages and put a `CNAME` file in `public/`.
