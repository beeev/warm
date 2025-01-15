// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://yourwebsite.com', // Replace with your actual site URL
    integrations: [
        react(),
        mdx(),
        sitemap(),
        tailwind({
            applyBaseStyles: false // Set to true if you want Tailwind's base styles
        })
    ]
});
