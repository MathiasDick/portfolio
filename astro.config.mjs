// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';


// https://astro.build/config
export default defineConfig({
  site: 'https://mathiasd.de',
  redirects: {
    '/de': '/',
    '/de/work': '/work',
    '/de/about': '/about',
    '/de/mechanic': '/mechanic',
    '/de/electronics': '/electronics',
    '/de/software': '/software',
    '/de/impressum': '/impressum',
    '/de/datenschutz': '/datenschutz'
  },
  integrations: [
    sitemap(),
    react(),
    mermaid()
  ]
});