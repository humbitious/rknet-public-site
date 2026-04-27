# RKNET Production Site — Cloudflare Pages Deployment

## Structure

```
site/
├── index.html                  ← / (experts variant)
├── for-companies/
│   └── index.html              ← /for-companies/ (companies variant)
├── assets/
│   ├── shared.css              ← shared stylesheet
│   ├── shared.jsx              ← shared React components
│   ├── hero-slider.jsx         ← ownership slider
│   ├── ticker.jsx              ← earnings ticker
│   ├── new-sections.jsx        ← platform strip, super-agents, cleanroom
│   ├── variant-a.jsx           ← experts page
│   ├── variant-b.jsx           ← companies page
│   └── app.jsx                 ← production app entry
├── og-experts.png              ← OG image for / (1200×630)
├── og-companies.png            ← OG image for /for-companies/ (1200×630)
└── og-default.png              ← fallback OG image (1200×630)
```

## Deploy to Cloudflare Pages

### Option 1: Direct upload (quickest)

1. Go to https://dash.cloudflare.com → Pages → Create a project → Direct upload
2. Upload the entire `site/` folder
3. Set project name (e.g. `residualknowledge`)
4. Deploy

### Option 2: GitHub + Cloudflare Pages

1. Push the `site/` folder to a GitHub repo
2. In Cloudflare Pages, connect the repo
3. Build settings:
   - Build command: (leave empty — no build step needed)
   - Build output directory: `site`
4. Deploy

### Custom domain

After deploying:
1. In Cloudflare Pages → your project → Custom domains
2. Add `residualknowledge.net`
3. If DNS is already on Cloudflare, it auto-configures
4. If not, add the CNAME record Cloudflare provides

### OG image URLs

The OG tags use root-relative paths (`/og-experts.png`). Once deployed with a custom domain, update these to full URLs for best compatibility:

```html
<meta property="og:image" content="https://residualknowledge.net/og-experts.png" />
```

## Notes

- **No build step.** Babel runs in-browser. For production performance, consider precompiling JSX to JS — but for an MVP landing page the current approach is fine.
- **React production build.** The production HTML uses `react.production.min.js` (not development).
- **Two entry points.** Each HTML file sets `window.__RKNET_VARIANT` before the app script loads, which determines which variant renders.
- **Nav cross-links.** "For companies" / "For experts" links in the nav do full page navigations between the two HTML files.
- **All CTAs** link to the Google Form: https://forms.gle/K3DgLqJTF8Si1wBdA
