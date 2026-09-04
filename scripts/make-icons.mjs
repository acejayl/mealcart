import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url));
const out = [
  ['public/pwa-192.png', 192],
  ['public/pwa-512.png', 512],
  ['public/apple-touch-icon.png', 180],
];
for (const [file, size] of out) {
  await sharp(svg).resize(size, size).png().toFile(file);
  console.log('wrote', file);
}

// Maskable variant: Android crops the icon to whatever shape the launcher uses, so the artwork
// has to sit inside the inner 80% "safe zone" with the brand colour bleeding to every edge.
const MASKABLE = 512;
const SAFE = Math.round(MASKABLE * 0.8);
const inner = await sharp(svg).resize(SAFE, SAFE).png().toBuffer();
await sharp({
  create: { width: MASKABLE, height: MASKABLE, channels: 4, background: '#2f7d4a' },
})
  .composite([{ input: inner, left: (MASKABLE - SAFE) / 2, top: (MASKABLE - SAFE) / 2 }])
  .flatten({ background: '#2f7d4a' })
  .png()
  .toFile('public/pwa-512-maskable.png');
console.log('wrote public/pwa-512-maskable.png');
