/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/mealcart/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'MealCart',
        short_name: 'MealCart',
        description: 'Plan a week of meals around your grocery store and budget.',
        theme_color: '#2f7d4a',
        background_color: '#fbfaf7',
        display: 'standalone',
        start_url: '/mealcart/',
        scope: '/mealcart/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // Purpose-built: artwork inside the 80% safe zone on a full-bleed brand square, so
          // launcher masks cannot crop into it.
          { src: 'pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,woff2}'] },
    }),
  ],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
