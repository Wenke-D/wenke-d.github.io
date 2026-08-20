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

All the text lives in `src/content/` — Markdown for prose, YAML for lists. No
TypeScript involved, and no CSS classes to remember: links written as
`[text](https://…)` pick up the site accent color automatically.

| What | File |
| --- | --- |
| Name, role, affiliation, bio | `src/content/profile/en.md`, `zh.md` |
| News items | `src/content/news/<lang>/*.md` — one file per item |
| Publications | `src/content/publications.yaml` |
| Email, external links | `src/content/site.yaml` |
| Interface labels ("News", "All →") | `src/content/ui.yaml` |
| Layout / `<head>` / footer | `src/layouts/Layout.astro` |
| Theme colors & font | `src/styles/global.css` |

`src/content.config.ts` declares the shape of each file. If a required field is
missing or misspelled, the build fails with the file name and the field — the
site never deploys half-empty.

**Add a news item:** drop a file in `src/content/news/en/` (and the matching one
in `zh/`). The file name is yours to pick; the list is ordered by `date`, newest
first, and the date shown on the page is formatted per language.

```md
---
date: 2026-11-20
---

Gave a talk at [SC26](https://sc26.supercomputing.org/). 🎉
```

**Add a publication:** append an entry to `src/content/publications.yaml`.
`selected: true` also puts it on the homepage; `**double asterisks**` bold your
own name in the author list.

Drop a `cv.pdf` (and any images) into `public/` to serve them at the site root.

## Deploying to GitHub Pages

1. In `astro.config.mjs`, set `site` (and `base`, if this is a *project* repo — see the comment in that file).
2. Push to a GitHub repo's `main` branch.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push.

For a custom domain, add it under Settings → Pages and put a `CNAME` file in `public/`.
