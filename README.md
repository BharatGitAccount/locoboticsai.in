# Locobotics AI website

A responsive, futuristic, dependency-free website for Locobotics AI.

## Run locally

1. Install Node.js 20 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

The project has no third-party runtime or build dependencies. You can also open `index.html` directly for a quick preview.

## Production build

Run `npm run build`. The deployable site will be created in the `dist` folder.

## Deploy to Vercel

Push this folder to GitHub and import the repository in Vercel. The included configuration uses `npm run build` and publishes the `dist` directory automatically.

## Main files

- `index.html` — content and page structure
- `privacy.html` and `terms.html` — website legal pages
- `styles.css` — responsive visual design and animation
- `script.js` — menu, reveal motion and pointer effects
- `robots.txt` and `sitemap.xml` — search-engine crawl controls
- `og-image.png` — social sharing image
- `logo-512.png` — structured-data organization logo

Before launch, confirm the public contact email in `index.html` and replace it if needed.
