// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';


// https://astro.build/config
export default defineConfig({
  site: 'https://mathiasd.de',
  integrations: [
    sitemap(),
    react(),
    mermaid({
      theme: 'forest',
      autoTheme: true
    })
  ]
});