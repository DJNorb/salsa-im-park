import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { existsSync, readFileSync } from 'node:fs';

// Alte Foto-Detailseiten (z. B. /Pictures/salsa_im_park_fuerth_dj-83.html) leiten auf die neue Serienseite weiter.
// Die Liste wird von "npm run bilder-import" erzeugt.
const datei = './src/inhalte/weiterleitungen.json';
const redirects = existsSync(datei) ? JSON.parse(readFileSync(datei, 'utf8')) : {};

export default defineConfig({
  site: 'https://www.salsa-im-park.de',
  // "preserve" erhält die alten Adressen: impressum--disclaimer.astro -> /impressum--disclaimer.html, Pictures/index.astro -> /Pictures/
  build: { format: 'preserve' },
  redirects,
  integrations: [sitemap({ filter: (url) => !url.includes('/404') })],
});
