// Liest alle Fotoserien aus src/inhalte/galerien/<ordner>/.
// galerie.json enthält Titel, Sortierdatum, Beschreibung, sichtbar und die Liste "fotos" (Reihenfolge = Anzeige).
// Fehlt die Liste, werden alle Bilder im Ordner alphabetisch angezeigt.
const infos = import.meta.glob('../inhalte/galerien/*/galerie.json', { eager: true, import: 'default' });
const bilder = import.meta.glob('../inhalte/galerien/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', { eager: true, import: 'default' });
const ordnerVon = (p) => p.split('/').at(-2);
const name = (p) => String(p).split('/').at(-1);

export function alleGalerien() {
  return Object.entries(infos).map(([pfad, info]) => {
    const ordner = ordnerVon(pfad);
    const imOrdner = Object.entries(bilder).filter(([p]) => ordnerVon(p) === ordner)
      .sort(([a], [b]) => a.localeCompare(b, 'de', { numeric: true }));
    const nachName = new Map(imOrdner.map(([p, b]) => [name(p), b]));
    const liste = Array.isArray(info.fotos) && info.fotos.length
      ? info.fotos.map((f) => name(typeof f === 'string' ? f : f?.bild)).filter((n) => nachName.has(n))
      : imOrdner.map(([p]) => name(p));
    const fotos = liste.map((n, i) => ({ bild: nachName.get(n), datei: n, alt: `${info.titel} – Foto ${i + 1}` }));
    return { ordner, slug: ordner, ...info, fotos };
  })
    .filter((s) => s.sichtbar !== false && s.fotos.length > 0)
    .sort((a, b) => (b.datum ?? '').localeCompare(a.datum ?? ''));
}
