// Zusätzliche Unterseiten: jede .md-Datei in src/inhalte/seiten/ wird automatisch eine Seite.
// Adresse = Dateiname, z. B. seiten/anfahrt.md -> /anfahrt.html
const dateien = import.meta.glob('../inhalte/seiten/*.md', { eager: true });

export function zusatzSeiten() {
  return Object.entries(dateien).map(([pfad, modul]) => {
    const slug = pfad.split('/').at(-1).replace(/\.md$/, '');
    return { slug, link: `/${slug}.html`, ...modul.frontmatter, Inhalt: modul.Content };
  }).filter((s) => !s.slug.startsWith('_'));
}
