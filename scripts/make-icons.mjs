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
