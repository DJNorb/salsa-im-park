# Offene Punkte & Abweichungen zur alten Website

## Noch offen

1. **Flyer 2027:** Platzhalter `public/_Media/flyer-2027-platzhalter.svg` ist eingebaut. Finales Bild in `public/_Media/` legen und in `startseite.json` → `flyer.bild` eintragen.
2. **Fotoserie 2018** (ab `salsa_im_park_180704_7794`): Import-Skript holt sie über die Weiter-Kette – Ergebnis prüfen.

## Erledigt

- Hosting-Anbieter ALL-INKL.COM in der Datenschutzerklärung eingetragen
- USt-IdNr. DE213573936 eingetragen
- Favicon eingebaut
- Jahr der Serien „2907“ und „2207“ = 2019
- Termine 2027 eingetragen, Absage-Logik mit Hinweis bis zum Folgetag
- FTP-Export (`npm run ftp` → Ordner `FTP-Upload/`)

## Bewusste Änderungen gegenüber der alten Website

| Bereich | Alt | Neu | Grund |
|---|---|---|---|
| Darstellung | fest 769 px breit | responsiv (Handy, Tablet, Desktop) | Auftrag |
| Navigation | nur Textlinks | Menü, auf dem Handy aufklappbar | Bedienbarkeit |
| Termine | Text + Flyer-Bild, 2026 | Terminliste 2027 mit Status & Ausweichtermin | Auftrag |
| Facebook-„Gefällt mir“ | auf /Pictures/ | entfernt | Auftrag, Datenschutz |
| Impressum | TMG, zwei Anschriften, keine E-Mail | DDG/MStV, Anschrift Kitzingen, E-Mail | Auftrag |
| Datenschutz | Teil des Impressums, nannte nicht genutzte Dienste | eigene Seite `/datenschutz.html`, nur tatsächlich genutzte Verarbeitung | Auftrag |
| Galerie | eine lange Liste + 136+ Einzelseiten | Serienübersicht, je Serie eine Seite mit Vollbildansicht | Austauschbarkeit |
| Alte Foto-Einzelseiten | eigene URLs | 301-Weiterleitung auf die Serie | URL-Erhalt |
| Location | nur Adresse | Adresse + Link zum Routenplaner (OpenStreetMap) | Bedienbarkeit, ohne Datenübertragung |
| Copyright | 2022 / 2026 gemischt | automatisch aktuelles Jahr | Einheitlichkeit |
| Kopfzeile | „Norbert Klein“ | „Salsa im Park“ | Wiedererkennung, SEO. Rückgängig: `website.json` → `name` |

## Prüfliste nach dem Bilder-Import

- [ ] Alle Serien unter `/Pictures/` vorhanden, Fotoanzahl stimmt (28.08.2019: 24, 31.07.2019: 50, 29.07.2019: 30, 22.07.2019: 32, 2018: ?)
- [ ] Alte Adresse z. B. `/Pictures/salsa_im_park_fuerth_dj-83.html` leitet weiter
- [ ] Banner, Partnerlogo, DJ-Foto, Ornament-Linien sichtbar
- [ ] E-Mail-Link öffnet Mailprogramm mit Betreff „Salsa im Park Anfrage“
- [ ] Impressum- und Datenschutz-Links in der Fußzeile jeder Seite
- [ ] `.htaccess` hochgeladen, http:// leitet auf https:// um
- [ ] Favicon im Browser-Tab sichtbar
- [ ] Darstellung auf dem Handy geprüft
