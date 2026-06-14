import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import { VitePWA } from 'vite-plugin-pwa';

// Relative base so the built site works from any sub-path or from disk.
export default defineConfig({
  base: './',
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], providerImportSource: '@mdx-js/react' }) },
    react({ include: /\.(jsx|js|mdx|md)$/ }),
    VitePWA({
      // we register the service worker ourselves, from the "Save offline" button
      injectRegister: null,
      registerType: 'autoUpdate',
      workbox: {
        // precache the whole built site so every lesson works offline
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,avif,woff2,json}'],
        navigateFallback: 'index.html',
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024
      },
      manifest: {
        name: 'Netcentric Academy',
        short_name: 'Academy',
        description: 'Interactive front-end & AEM learning tracks.',
        theme_color: '#6b2fb3',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: './'
      }
    })
  ]
});
