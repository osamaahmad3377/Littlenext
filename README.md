# Littlenext

Website for **Littlenext** — a parent company in international import & export (commodities, textiles, baby products).

Built with [Next.js](https://nextjs.org) 16, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`

## Editing content

Almost all text lives in **`lib/site.ts`**:

- `site.contact` — email, phone, WhatsApp, office address, hours (**replace the placeholders before launch**)
- `site.url` — your live domain (used for SEO, sitemap and social previews)
- `divisions` — the division cards and their example products
- `services`, `steps`, `values` — the "What we do", "How it works" and "Why Littlenext" sections

## Project structure

```
app/            layout, page, global styles, favicon, robots & sitemap
components/     Header, Hero, Sections (About, Divisions, Services, Process, Why us), Contact, Footer
public/images/  photography
lib/site.ts     company details and copy
```

## Images

Photos in `public/images/` are from [Unsplash](https://unsplash.com) (free for commercial use under the Unsplash License).
Swap in your own product, warehouse or team photos any time — keep the same file names, or update the paths in
`lib/site.ts` (division photos) and the components.

## Contact form

The enquiry form currently opens the visitor's email app with the message pre-filled (no server needed).
It can be switched to a hosted form service (e.g. Formspree) or an email API later.

## Deploy

The easiest option is [Vercel](https://vercel.com/new): import this GitHub repository and click **Deploy** — no configuration needed.
