# Little Next

Website for **Little Next**, an Australian-based parent company in international import & export (commodities, textiles, baby products).

Built with [Next.js](https://nextjs.org) 16, React 19, TypeScript and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build: `npm run build && npm start`

## Brand colours

Orange `#FF8F4E`, black and white. The palette lives in the `@theme` block of `app/globals.css`: `night-*` are the blacks,
`electric-*` is the orange scale (500 is `#FF8F4E`; use 700 for orange text on white so it stays readable), and light sections use
Tailwind's `neutral-*` greys. Text on orange is black for contrast.

## Logo

The brand logo (LN mark) was prepared from the supplied `LN logo.png` into `public/images/logo-mark.png` / `logo-mark-dark.png`
(mark only, for light / dark backgrounds) and `logo-full.png` / `logo-full-dark.png` (mark plus "Little Next"). The dark versions
turn the black parts white so the logo stays visible on black. `app/icon.png`, `app/apple-icon.png` and `app/opengraph-image.png`
(favicon, home-screen icon and link-preview image) are generated from the same file. To swap the logo, replace those files
(a transparent SVG or a larger PNG will look sharper than the current 500px source).

## Editing content

Almost all text lives in **`lib/site.ts`**:

- `site.contact`: email, phone, WhatsApp, office address, hours (**replace the placeholders before launch**)
- `site.url`: your live domain (used for SEO, sitemap and social previews)
- `divisions`: the division cards and their example products
- `services`, `steps`, `values`: the "Services", "Process" and "Why Littlenext" sections
- `regions`: markets on the network map; the entry marked `hq: true` (Australia) is headquarters and gets a trade lane to every other region
- `site.founder`: founder name and role on the Our story page (`/about`); add `photo` (e.g. `/images/imran-ahmad.jpg`) and an optional `message` and they appear automatically
- `heroSlides`: hero slideshow; each slide pairs the headline word with its background photo

## Project structure

```
app/            layout, home page, `about/` (Our story page), global styles, icons, robots & sitemap
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
`commodities-pulses.jpg` (and its `-portrait` crop for phones) is a composite of three public-domain (CC0) photos:
chickpeas (rawpixel.com/image/5913543), red kidney beans (rawpixel.com/image/5913548) and green lentils
(Wikimedia Commons, "Lentil seeds", curid 67840432). No attribution is required.
`hero-pulses.jpg` (and `-portrait`) is a high-resolution composite for the hero, using Wikimedia Commons CC0 photos
"Red kidney beans" and "Chickpeas🫘" plus the same lentils photo.

Swap in your own product, warehouse or team photos any time. Keep the same file names, or update the paths in
`lib/site.ts` (division photos) and the components.

## Contact form

The 3-step enquiry form (and the hero "Instant enquiry" widget that pre-fills it) posts to `/api/enquiry`, which emails the
enquiry to `info@littlenext.com.au` through [Resend](https://resend.com). The visitor's address is set as **Reply-To**, so
replying in your inbox answers them directly. Spam is filtered with a hidden honeypot field and a per-IP rate limit.

**Setup (one time, in Vercel → Project → Settings → Environment Variables):**

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com (required) |
| `CONTACT_TO_EMAIL` | where enquiries go (default: `info@littlenext.com.au`) |
| `CONTACT_FROM_EMAIL` | sender, e.g. `Little Next <enquiries@littlenext.com.au>` (needs a verified domain in Resend) |

Until the domain is verified in Resend, leave `CONTACT_FROM_EMAIL` empty: Resend then sends from `onboarding@resend.dev`,
which can only deliver to the email address the Resend account was created with. Create the account with
`info@littlenext.com.au` (or verify `littlenext.com.au` in Resend) and redeploy after saving the variables.

If `RESEND_API_KEY` is missing or sending fails, the form falls back to opening the visitor's email app, so no enquiry is lost.
For local testing copy `.env.example` to `.env.local`.

## Deploy

The easiest option is [Vercel](https://vercel.com/new): import this GitHub repository and click **Deploy**.
`vercel.json` pins the framework to Next.js, so Vercel builds it correctly even if the project was created before the code was pushed.

If a deployment shows `404 NOT_FOUND`, check in Vercel → Project → Settings → Build and Deployment that
**Framework Preset** is *Next.js*, **Root Directory** is empty, and **Output Directory** is not overridden; then redeploy.
