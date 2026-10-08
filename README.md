# Littlenext

Website for **Littlenext**, an Australian-based parent company in international import & export (commodities, textiles, baby products).

Built with [Next.js](https://nextjs.org) 16, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`

## Editing content

Almost all text lives in **`lib/site.ts`**:

- `site.contact`: email, phone, WhatsApp, office address, hours (**replace the placeholders before launch**)
- `site.url`: your live domain (used for SEO, sitemap and social previews)
- `divisions`: the division cards and their example products
- `services`, `steps`, `values`: the "Services", "Process" and "Why Littlenext" sections
- `regions`: markets on the network map; the entry marked `hq: true` (Australia) is headquarters and gets a trade lane to every other region
- `heroSlides`: hero slideshow; each slide pairs the headline word with its background photo

## Project structure

```
app/            layout, page, global styles, favicon, robots & sitemap
components/     one file per section (Hero, Intro, Divisions, Services, Network, Process, WhyUs, Contact, Footer)
                plus Showcase (scroll-expanding photo), QuickQuote (hero widget), Globe3D (mobile globe),
                SmoothScroll (Lenis), Magnetic (cursor-follow buttons), WhatsAppChat (floating chat), BgIcon (card background icons,
                Phosphor icons), fx (scroll effects), ui (section headings)
lib/site.ts     company details, copy and map regions
lib/worldDots.ts  pre-generated dotted world map, Pacific-centred (desktop network map)
lib/globeDots.ts  evenly spaced land dots for the interactive 3D globe (phones and tablets)
public/images/  photography
```

## Images

Photos in `public/images/` are from [Unsplash](https://unsplash.com) (free for commercial use under the Unsplash License).
Swap in your own product, warehouse or team photos any time. Keep the same file names, or update the paths in
`lib/site.ts` (division photos) and the components.

## Contact form

The hero "Instant enquiry" widget pre-fills the 3-step enquiry form (requirement → details → review).
On submit, the form currently opens the visitor's email app with the message pre-filled (no server needed).
It can be switched to a hosted form service (e.g. Formspree) or an email API later.

## Deploy

The easiest option is [Vercel](https://vercel.com/new): import this GitHub repository and click **Deploy**.
`vercel.json` pins the framework to Next.js, so Vercel builds it correctly even if the project was created before the code was pushed.

If a deployment shows `404 NOT_FOUND`, check in Vercel → Project → Settings → Build and Deployment that
**Framework Preset** is *Next.js*, **Root Directory** is empty, and **Output Directory** is not overridden; then redeploy.
