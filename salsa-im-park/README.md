# Salsa im Park – Website

Neuaufbau von www.salsa-im-park.de mit [Astro](https://astro.build). Alle Inhalte liegen in **`src/inhalte/`** – Design und Technik sind davon getrennt.

## Welche Datei ist wofür zuständig?

| Inhalt | Datei |
|---|---|
| Termine, Ausweichtermine, Status, Uhrzeit | `src/inhalte/termine.json` |
| Startseite: Überschrift, Banner, Wetterhinweis, Flyer | `src/inhalte/startseite.json` |
| Location / Anfahrt | `src/inhalte/location.json` |
| Partner | `src/inhalte/partner.json` |
| DJ Norb | `src/inhalte/dj.json` |
| E-Mail, Betreff, Copyright | `src/inhalte/kontakt.json` |
| Menü und Fußzeilen-Links | `src/inhalte/navigation.json` |
| Seitentitel & Beschreibung für Google | `src/inhalte/website.json` |
| Fotoserien | `src/inhalte/galerien/<ordner>/` (Bilder + `galerie.json`) |
| Impressum | `src/inhalte/recht/impressum.md` |
| Datenschutz | `src/inhalte/recht/datenschutz.md` |
| Neue Unterseiten | `src/inhalte/seiten/<name>.md` (Vorlage: `_vorlage.md`) |
| Grafiken (Banner, Logos, Linien) | `public/_Media/` |

Nur bei Designänderungen nötig: `src/komponenten/`, `src/layouts/`, `src/pages/`, `src/styles/global.css`.

## Adressen (URLs)

| Seite | Adresse | Status |
|---|---|---|
| Startseite | `/` | wie bisher |
| Bilder | `/Pictures/` | wie bisher |
| Fotoserie | `/Pictures/<ordner>/` | neu |
| Alte Foto-Detailseiten | `/Pictures/….html` | 301-Weiterleitung auf die Serie |
| Bilderübersicht | `/bilderubersicht.html` | wie bisher |
| Impressum | `/impressum--disclaimer.html` | wie bisher |
| Datenschutz | `/datenschutz.html` | neu (bisher Teil des Impressums) |

## Einrichtung (einmalig)

Voraussetzung: [Node.js](https://nodejs.org) ab Version 18.

```bash
npm install            # Programmbausteine installieren
npm run bilder-import  # alle Bilder von der alten Website übernehmen
npm run dev            # Vorschau unter http://localhost:4321
```

## Veröffentlichen per FTP (dein Webspace)

**Empfohlen – automatisch über GitHub:** Bei jeder Änderung baut GitHub die Website und lädt sie per FTP zu ALL-INKL hoch (Steuerdateien in `.github/workflows/`, Anleitung „Anleitung GitHub“). Benötigte Secrets: `FTP_SERVER`, `FTP_BENUTZER`, `FTP_PASSWORT`, `FTP_ORDNER`.

**Von Hand per FTP:** Schritt-für-Schritt-Anleitung in `ANLEITUNG-VEROEFFENTLICHEN.md`.

```bash
npm run ftp            # erzeugt den fertigen Ordner FTP-Upload/
```

1. **Alte Website sichern:** Mit FileZilla alle Dateien vom Webspace auf deinen Rechner herunterladen.
2. **Ordner `FTP-Upload/` öffnen** und den gesamten **Inhalt** (nicht den Ordner selbst) ins Hauptverzeichnis des Webspace hochladen, Überschreiben bestätigen.
3. **Wichtig:** Die Datei `.htaccess` ist unsichtbar. In FileZilla: *Server → Anzeige versteckter Dateien erzwingen*. Sie muss mit hochgeladen werden (HTTPS, Weiterleitungen, Fehlerseite).
4. Alte Sandvox-Dateien erst löschen, wenn die neue Seite geprüft ist. Den Ordner `_Media/` nicht löschen – er wird von der neuen Seite weiterverwendet.
5. SSL-Zertifikat (meist kostenloses „Let's Encrypt“) im Kundenmenü des Hosters aktivieren, falls noch nicht geschehen.

**Termine aktualisieren sich selbst:** „Nächster Termin“ und Absage-Hinweise werden im Browser des Besuchers anhand des heutigen Datums berechnet. Nach einem Termin musst du nichts neu hochladen. Nur bei Änderungen an Inhaltsdateien (z. B. Status „abgesagt“) erneut `npm run ftp` ausführen und hochladen – bei einer reinen Statusänderung genügen `index.html` und der Ordner `_astro/`.

**Alternative ohne FTP:** Netlify oder Cloudflare Pages (kostenlos) – Projekt über GitHub verbinden, Build-Befehl `npm run build`, Ausgabeordner `dist`.
