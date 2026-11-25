# Lhenkhar Valley Retreat: hotel website demo

A fast, mobile-friendly website for a fictional 3-star hotel in Damphu, Tsirang, Bhutan.
Built with **Astro** and **Tailwind CSS**. The output is fully static: no database, no server and no paid services.

Pages: Home, Rooms, Dining, Experiences, Gallery (with lightbox), Contact & Booking (Formspree form + Google Map).

## Quick start

Requires Node.js 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. To produce the production build in `dist/` and preview it:

```bash
npm run build
```

```bash
npm run preview
```

## Project structure

```
src/
  data/
    hotel.ts        ← ALL text content: name, contact, rooms, menu, reviews, experiences, SEO, colours
    images.ts       ← ALL image paths and alt text
  assets/photos/    ← put real hotel photos here
  components/       ← header, footer, divider, WhatsApp button, etc.
  layouts/          ← BaseLayout: <head>, SEO tags, Open Graph, JSON-LD
  pages/            ← one file per page, plus robots.txt
  scripts/
    animations/     ← ALL motion code (GSAP, ScrollTrigger, SplitText, Lenis)
      config.ts     ← timings, easing, distances: tweak animations here
    booking-form.ts ← contact form behaviour
  styles/global.css ← fonts and Tailwind design tokens
public/             ← favicon, _headers (cache rules for Netlify/Cloudflare)
```

## 1. Change the hotel details (rebranding)

Open **`src/data/hotel.ts`**. Everything a visitor reads comes from this file:

| Section | What it controls |
| --- | --- |
| `hotel` | Name, tagline, address, map location, phone, WhatsApp, email, check-in/out times, social links, Formspree ID, payment badge |
| `hotel.theme` | Brand colours (`primary`, `accent`, `cream` background, `ink` text). Changing these recolours the whole site |
| `seo` | Meta title and description for each page |
| `home` | Hero text, welcome text, key facts, the 3 highlight cards, call-to-action banner |
| `rooms` / `roomPolicies` | Room cards: size, bed, max guests, amenities, price "from USD X / night" |
| `dining` / `menu` | Restaurant intro, opening hours and menu items (with vegetarian/spicy tags) |
| `experiences` | Activity cards |
| `reviews` | Guest reviews on the home page |
| `contactPage` | Contact intro, "Getting here" notes, country suggestions in the form |

To pitch another hotel, copy this project, edit `hotel.ts` and `images.ts`, then rebuild. The structured data (JSON-LD), page titles, footer, WhatsApp link and booking form all update automatically.

> Phone number: set `MY_NUMBER` near the top of `hotel.ts` (digits only, without +975). It feeds the displayed phone number, the tap-to-call links, the WhatsApp button and the demo banner.

### Demo banner

A slim strip at the top of every page says "Sample website designed by Pema Dhendup · Want one for your hotel? Chat on WhatsApp" and opens WhatsApp. It's configured in `demoBanner` in `hotel.ts`. Set `enabled: false` when you hand the site to a real hotel, and the header moves back up automatically.

## 2. Replace the images

All images are listed in **`src/data/images.ts`**. They are currently placeholder photos from picsum.photos with fixed seeds, so they don't change on reload. They are random stock photos and don't match their alt text, so replace them before going live.

**Recommended: use local photos.** Astro then resizes and converts them to WebP automatically.

1. Copy the photos into `src/assets/photos/` (JPG or PNG, ideally at least 2000 px wide for hero images).
2. Import each photo at the top of `images.ts` and use it in place of `pic(...)`:

```ts
import heroPhoto from '../assets/photos/hero.jpg';

export const images = {
  homeHero: { src: heroPhoto, alt: 'Lhenkhar Valley Retreat at sunrise with the valley behind' },
  // ...
};
```

Write a short, accurate `alt` for every photo. It matters for accessibility and SEO.

**Using remote URLs instead:** give `src`, `width` and `height`, and add the image host to `image.domains` in `astro.config.mjs`. Remote images are downloaded and optimised at build time.

The gallery shows everything in `images.gallery`. Add or remove entries as needed.

## 3. Connect the booking form to Formspree (free)

1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID, which is the part after `/f/` in the endpoint (for example `https://formspree.io/f/xyzabcd` has the ID `xyzabcd`).
3. In `src/data/hotel.ts`, set:

```ts
formspreeId: 'xyzabcd',
```

4. Rebuild and deploy. Enquiries now arrive in the hotel's inbox.

While the ID is still `YOUR_FORM_ID`, the form runs in **demo mode**: it validates normally and shows a notice instead of sending. The form sends via JavaScript and shows an inline thank-you message. It includes a spam honeypot and checks that the check-out date is after the check-in date.

## 4. Deploy to Netlify

**Option A: from Git (recommended)**

1. Push this project to GitHub, GitLab or Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, then pick the repository.
3. Netlify reads `netlify.toml` (build command `npm run build`, publish directory `dist`). Click **Deploy**.

**Option B: drag and drop**

Run `npm run build`, then drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

**Site URL:** the site's public address is set in `astro.config.mjs` (`https://lhenkhar-valley-demo.netlify.app`). The sitemap, robots.txt, canonical links, Open Graph tags and JSON-LD all use it, and every link inside the site is relative. If you move to another domain, change that one line. In Netlify, set the site name to `lhenkhar-valley-demo` (**Site configuration → Change site name**) so the address matches.

**Cloudflare Pages** works the same way: build command `npm run build`, output directory `dist`, and set `SITE_URL` and `NODE_VERSION=22` as environment variables.

## Animations and motion

All motion code lives in `src/scripts/animations/`, one file per feature, each with comments at the top. **To change speeds, delays or distances, edit `config.ts`.**

| File | What it does |
| --- | --- |
| `config.ts` | Durations, easing, distances, mobile settings, smooth-scroll strength |
| `index.ts` | Starts everything on each page and cleans it up before the next page (View Transitions) |
| `preloader.ts` | First-visit logo drawing and upward wipe (max 1.5 s, once per browser session) |
| `hero.ts` | Ken Burns zoom, letter-by-letter title, tagline fade, parallax, scroll indicator |
| `reveals.ts` | Masked heading reveals, image curtain reveals, parallax, card fade-ups, gold lines, number counters |
| `horizontal-scroll.ts` | Pinned sideways scrolling on the Experiences page (desktop only) |
| `marquee.ts` | Endless word strip (speeds up when you scroll fast) |
| `interactions.ts` | 3D card tilt and magnetic buttons (mouse only) |
| `cursor.ts` | Custom dot + ring cursor ("View" over gallery photos) |
| `header.ts` | Hide-on-scroll header, glass background, full-screen mobile menu |
| `lightbox.ts` | Gallery lightbox that grows out of the clicked thumbnail |
| `smooth-scroll.ts` | Lenis smooth scrolling connected to ScrollTrigger |

Add animations to new content with HTML attributes, no JavaScript needed:

- `data-split` on a **heading**: words slide up from behind a mask
- `data-fade` on any block: fades up when scrolled into view (siblings are staggered)
- `<RevealImage image={...} />`: image with curtain reveal and parallax
- `data-tilt`: 3D tilt on hover
- `<GoldLine />`: thin gold line that draws in

**Accessibility:** visitors with "reduce motion" turned on in their device settings get no smooth scroll, parallax, preloader or large movements, only gentle fades. Touch devices get no custom cursor, tilt or magnetic effects. Content is never left hidden if JavaScript fails: a safety timer reveals everything after 4 seconds.

**Preview the preloader again:** it only shows once per browser session. Open the site in a new private window to see it again.

## What's included

- **Performance:** static HTML, self-hosted and preloaded fonts, a preloaded hero image, responsive WebP images through Astro's `<Image>` with lazy loading, and animations that move only `transform` and `opacity`. The animation JavaScript is about 64 KB gzipped (GSAP, ScrollTrigger, SplitText, Lenis and the page router). Long-term caching for hashed assets is set in `public/_headers`.
- **SEO:** a meta title and description on each page, a canonical URL, Open Graph and Twitter cards with a 1200×630 share image, `sitemap-index.xml`, `robots.txt`, and schema.org `Hotel` JSON-LD (address, coordinates, star rating, rooms with prices, amenities, check-in/out).
- **Accessibility:** a skip link, one `h1` per page, a correct heading order, alt text, visible focus rings, accessible labels for the menu and lightbox, `aria-live` form status, AA colour contrast and full support for reduced motion.
- **Features:** a header that hides on scroll, a full-screen mobile menu, a floating WhatsApp button, a payment badge in the footer, a "Check availability" link on each room that preselects that room in the form, and a lightbox with keyboard and swipe navigation.

Lighthouse (mobile, local production build, first visit including the preloader): Performance 93–97, Accessibility 100, Best Practices 100, SEO 100 on every page. Layout shift is 0.
