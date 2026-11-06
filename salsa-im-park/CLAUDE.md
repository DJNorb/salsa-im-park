# Regeln für Claude bei Änderungen an dieser Website

- Inhalte ausschließlich in `src/inhalte/` ändern. Komponenten, Layouts und CSS nur anfassen, wenn ausdrücklich eine Design- oder Funktionsänderung gewünscht ist.
- Jede Information steht an genau einer Stelle. Nichts doppelt anlegen.
- Datumsformat in JSON: `JJJJ-MM-TT`. Erlaubte Termin-Status: `geplant`, `findet statt`, `abgesagt` (= Ausweichtermin gilt), `fällt aus` (= beide entfallen).
- Bei einer Absage nur `status` (und ggf. `hinweis`) ändern, nicht das Datum. Anzeige-Logik: `src/lib/termine.js` → `aktuelleLage`.
- Keine Inhalte erfinden: keine Termine, Partner, Texte oder Bilder ohne Anweisung des Betreibers.
- Rechtstexte (`src/inhalte/recht/`) nur auf ausdrückliche Anweisung ändern. Wird ein externer Dienst hinzugefügt (Karte, Video, Formular, Statistik), muss die Datenschutzerklärung angepasst werden. Darauf hinweisen.
- Keine Tracking-, Analyse- oder Social-Media-Einbindungen ohne Rückfrage.
- Neue Fotoserie = neuer Ordner `src/inhalte/galerien/JJJJ-MM-TT[-zusatz]/` mit `galerie.json` und Bildern `001.jpg`, `002.jpg`, …
- Neue Unterseite = neue Datei `src/inhalte/seiten/<name>.md` mit Frontmatter `titel`, `beschreibung`, `imMenue`.
- Jedes neue Bild braucht einen beschreibenden Alt-Text.
- Veröffentlichung läuft automatisch über GitHub Actions (`.github/workflows/veroeffentlichen.yml`) bei jedem Commit auf `main`. Änderungen daher direkt auf `main` committen und danach auf den grünen Haken unter „Actions“ hinweisen.
- `.htaccess` liegt als `server/htaccess` im Projekt und wird beim Build kopiert (`scripts/nach-build.mjs`).
- Ausführliche Anleitung: `ANLEITUNG-CLAUDE.md`. Dateiübersicht: `README.md`. Offene Punkte: `FEHLENDE-INHALTE.md`.
