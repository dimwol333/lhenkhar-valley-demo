// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public URL of the site. Used for the sitemap, robots.txt, canonical URLs,
// Open Graph tags and JSON-LD. Fixed on purpose: Netlify's automatic deploy URLs
// (random-name-123.netlify.app) must never end up in the sitemap or share links.
const site = 'https://lhenkhar-valley-demo.netlify.app';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: {
    // Allow optimising remote placeholder photos. Add your own image host here if you use one.
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
