// Liest automatisch alle Fotoserien aus src/inhalte/galerien/<ordner>/.
// Jeder Ordner = eine Serie. Bilder (jpg, jpeg, png, webp) werden alphabetisch sortiert.
// Die Datei galerie.json im Ordner enthält Titel, Datum und optional Beschreibung.

const infos = import.meta.glob('../inhalte/galerien/*/galerie.json', { eager: true, import: 'default' });
const bilder = import.meta.glob('../inhalte/galerien/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', { eager: true, import: 'default' });

const ordnerVon = (pfad) => pfad.split('/').at(-2);

export function alleGalerien() {
  const serien = Object.entries(infos).map(([pfad, info]) => {
    const ordner = ordnerVon(pfad);
    const fotos = Object.entries(bilder)
      .filter(([p]) => ordnerVon(p) === ordner)
      .sort(([a], [b]) => a.localeCompare(b, 'de', { numeric: true }))
      .map(([p, bild], i) => ({
        bild,
        datei: p.split('/').at(-1),
        alt: `${info.titel} – Foto ${i + 1}`,
      }));
    return { ordner, slug: ordner, ...info, fotos };
  });
  return serien
    .filter((s) => s.sichtbar !== false && s.fotos.length > 0)
    .sort((a, b) => (b.datum ?? '').localeCompare(a.datum ?? ''));
}
