// Einmaliger Import aller Bilder von der alten Website.
// Aufruf:  npm run bilder-import
// Ergebnis:
//   public/_Media/…                         Grafiken der Startseite (alte Adressen bleiben gültig)
//   src/inhalte/galerien/<serie>/001.jpg…   eine Ordner pro Fotoserie + galerie.json
//   src/inhalte/weiterleitungen.json        alte Foto-Detailseiten -> neue Serienseite
//   server/htaccess                         dieselben Weiterleitungen als 301 (wird beim Build zu .htaccess)
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ALT = 'https://www.salsa-im-park.de';
const STATISCH = [
  'salsa_im_park_fuerth_backgr_med-2_2026.png', 'pasted-file_med-3.png', 'linie_med.png',
  'Salsaflyer_Park_2026_Flyer_01_uebersicht', 'sip_fuerth_salsa_collage2.gif', 'stadtpark-logo4_med.png',
  'salsa_cubana_new_york_style_med.png', 'DJ-Norb_2026.jpg', 'salsa_im_park_bachata_fuert_med.jpeg',
];
const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

const text = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.text(); };
const laden = async (url, ziel) => {
  if (existsSync(ziel)) return;
  const r = await fetch(url); if (!r.ok) { console.warn('  ! fehlt:', url); return; }
  await writeFile(ziel, Buffer.from(await r.arrayBuffer()));
};
const abs = (href, basis) => new URL(href, basis).href;

// 1. Grafiken der Startseite
await mkdir('public/_Media', { recursive: true });
for (const f of STATISCH) { console.log('Grafik', f); await laden(`${ALT}/_Media/${f}`, `public/_Media/${f}`); }

// 2. Galerie-Übersicht lesen: Detailseite + Titel + große Bildversion
const index = await text(`${ALT}/Pictures/`);
const eintraege = [];
const re = /href="([^"]+?\.html)"[^>]*title="([^"]+)"|href="([^"]*_Media\/[^"]+\.(?:jpe?g|png))"/gi;
for (let m; (m = re.exec(index));) {
  if (m[1]) eintraege.push({ seite: abs(m[1], `${ALT}/Pictures/`), titel: m[2], gross: null });
  else if (eintraege.length && !eintraege.at(-1).gross) eintraege.at(-1).gross = abs(m[3], `${ALT}/Pictures/`);
}

// 3. Zusätzlich die Weiter-Kette der Detailseiten abgehen (findet auch Fotos, die nicht in der Übersicht stehen)
const bekannt = new Set(eintraege.map((e) => e.seite));
let naechste = eintraege[0]?.seite;
const besucht = new Set();
while (naechste && !besucht.has(naechste)) {
  besucht.add(naechste);
  const html = await text(naechste).catch(() => '');
  if (!bekannt.has(naechste)) {
    const titel = (html.match(/<title>([^|<]+)/) || [])[1]?.trim() ?? naechste;
    const med = (html.match(/src="([^"]*_Media\/[^"]+_med[^"]*\.(?:jpe?g|png))"/i) || [])[1];
    eintraege.push({ seite: naechste, titel, gross: med ? abs(med, naechste) : null });
    bekannt.add(naechste);
    console.log('  + aus Weiter-Kette:', titel);
  }
  const w = html.match(/href="([^"#]+?\.html)#previous-photo"[^>]*>\s*Weiter/i) || html.match(/href="([^"#]+?\.html)[^"]*"[^>]*>\s*Weiter/i);
  naechste = w ? abs(w[1], naechste) : null;
}
console.log(`${eintraege.length} Fotos gefunden.`);

// 4. In Serien gruppieren (Titel ohne laufende Nummer am Ende)
const datumAus = (name) => {
  const m6 = name.match(/_(\d{2})(\d{2})(\d{2})(?:_|$)/);
  if (m6) { const [, a, b, c] = m6; return +c >= 17 && +c <= 30 && +a <= 31 ? `20${c}-${b}-${a}` : `20${a}-${b}-${c}`; }
  const m4 = name.match(/_(\d{2})(\d{2})(?:_|$)/);
  if (m4) return `2019-${m4[2]}-${m4[1]}`; // Jahr unbekannt – bitte prüfen
  return '';
};
const serien = new Map();
for (const e of eintraege) {
  const gruppe = e.titel.replace(/_\d+$/, '');
  if (!serien.has(gruppe)) serien.set(gruppe, []);
  serien.get(gruppe).push(e);
}

const weiterleitungen = {};
for (const [gruppe, fotos] of serien) {
  const datum = datumAus(gruppe);
  const zusatz = gruppe.replace(/^Salsa_im_Park_(Fuerth_)?(Nuernberg_)?(DJ-Norb_)?/i, '').replace(/_?\d{4,6}$/, '').replace(/_/g, '-').toLowerCase();
  const ordner = [datum, zusatz].filter(Boolean).join('-') || gruppe.toLowerCase();
  const pfad = `src/inhalte/galerien/${ordner}`;
  await mkdir(pfad, { recursive: true });
  const [j, mo, t] = datum.split('-');
  const titel = datum ? `Salsa im Park ${+t}. ${MONATE[+mo - 1]} ${j}` : 'Salsa im Park';
  if (!existsSync(`${pfad}/galerie.json`)) {
    await writeFile(`${pfad}/galerie.json`, JSON.stringify({ titel, datum, beschreibung: '', sichtbar: true, quelle: gruppe }, null, 2) + '\n');
  }
  console.log(`Serie ${ordner}: ${fotos.length} Fotos`);
  let n = 0;
  for (const f of fotos) {
    n++;
    if (!f.gross) { console.warn('  ! kein Bild für', f.seite); continue; }
    const endung = f.gross.split('.').at(-1).toLowerCase().replace('jpeg', 'jpg');
    await laden(f.gross, `${pfad}/${String(n).padStart(3, '0')}.${endung}`);
    weiterleitungen[new URL(f.seite).pathname] = `/Pictures/${ordner}/`;
  }
}

// 5. Weiterleitungen speichern
await writeFile('src/inhalte/weiterleitungen.json', JSON.stringify(weiterleitungen, null, 2) + '\n');
const htaccess = existsSync('server/htaccess') ? await readFile('server/htaccess', 'utf8') : '';
const block = ['# BEGIN alte-fotoseiten', ...Object.entries(weiterleitungen).map(([a, n]) => `Redirect 301 ${a} ${n}`), '# END alte-fotoseiten'].join('\n');
await writeFile('server/htaccess', htaccess.replace(/# BEGIN alte-fotoseiten[\s\S]*# END alte-fotoseiten/, '').trim() + '\n\n' + block + '\n');
console.log(`Fertig. ${Object.keys(weiterleitungen).length} Weiterleitungen angelegt.`);
