// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mermaid from 'astro-mermaid';


// https://astro.build/config
export default defineConfig({
  site: 'https://mathiasd.de', // Replace with your actual domain
  integrations: [
    react(),
    mermaid({
      theme: 'forest',
      autoTheme: true
    })
  ]
});