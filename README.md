# roxana-web

Portfolio site for **Roxana Fadanelli**, Art Director & UI/UX.

Built with React, Vite and Tailwind CSS. Set in Inter (Display optical size for headings) with Chivo Mono for small labels. The hero is a wordmark over an endless ticker of tall cards cropped from the book (`public/work/tall`).

The contact form uses Netlify Forms; submissions show up under Forms in the Netlify dashboard.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Hosted on Netlify. `netlify.toml` sets the build command (`npm run build`) and publish folder (`dist`).

## Editing content

- Projects, experience, services, FAQ: `src/data/content.ts`
- Page layout: `src/App.tsx`
- Theme colours and fonts: `src/index.css`, `tailwind.config.js`
- Images (pages of the book): `public/work/lg` and `public/work/sm`
