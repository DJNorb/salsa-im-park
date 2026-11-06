# Anleitung: Website mit Claude bearbeiten

Du brauchst keine HTML- oder CSS-Kenntnisse. Gib Claude einfach eine Anweisung in normaler Sprache. Claude ändert dann die passende Datei in `src/inhalte/`.

## Beispiele für Anweisungen

**Termine**
- „Der Termin am 4. Juni findet statt.“ → Status wird `findet statt`
- „Der Termin am 21. Mai ist wegen Regen abgesagt.“ → Status `abgesagt` (es gilt automatisch der Ausweichtermin)
- „Der Termin im August fällt komplett aus, auch der Ausweichtermin.“ → Status `fällt aus`
- „Verschiebe den Juli-Termin auf den 16. Juli.“
- „Trage die Termine für 2028 ein: …“
- „Ändere die Uhrzeit auf 19 bis 23 Uhr.“

**Texte**
- „Ändere den Wetterhinweis auf: …“
- „Ändere die Überschrift der Bilder-Seite.“
- „Ändere die Beschreibung für Google.“

**Bilder**
- „Lege eine neue Fotoserie vom 21. Mai 2027 an.“ – dann die Bilder in den neuen Ordner legen (oder hochladen und Claude bitten, sie einzusortieren).
- „Lösche Foto 012 aus der Serie vom 31. Juli 2019.“
- „Blende die Serie von 2018 aus.“
- „Ersetze das Banner auf der Startseite durch dieses Bild.“
- „Ersetze den Flyer-Platzhalter durch dieses Bild.“

**Partner, Location, DJ**
- „Ergänze einen neuen Partner: Name, Logo, Link.“
- „Ändere die Adresse der Location.“

**Seiten & Recht**
- „Erstelle eine neue Unterseite ‚Anfahrt‘ und nimm sie ins Menü auf.“
- „Aktualisiere das Impressum: neue Telefonnummer …“

## So funktionieren die Fotoserien

Jede Serie ist ein eigener Ordner in `src/inhalte/galerien/`, z. B.:

```
src/inhalte/galerien/2027-05-21/
  galerie.json   ← Titel, Datum, Beschreibung, sichtbar ja/nein
  001.jpg
  002.jpg
  …
```

- **Neue Serie:** Ordner anlegen, `galerie.json` aus einer anderen Serie kopieren und anpassen, Bilder hineinlegen. Fertig.
- **Bilder austauschen:** Dateien im Ordner ersetzen, löschen oder hinzufügen. Die Reihenfolge richtet sich nach dem Dateinamen.
- **Bildgröße:** egal – die Website verkleinert und optimiert die Fotos automatisch (WebP, mehrere Größen).
- **Serie ausblenden:** in `galerie.json` `"sichtbar": false` setzen.
- Die neueste Serie (nach Datum) erscheint automatisch zuerst und als Vorschau auf der Startseite.

## Termin-Status

| Wert in `termine.json` | Anzeige auf der Website |
|---|---|
| `geplant` | grau „geplant“ |
| `findet statt` | grün „findet statt“ |
| `abgesagt` | Bis einschließlich Folgetag des abgesagten Termins roter Hinweis: „Der Termin am … ist abgesagt. Stattdessen findet die Veranstaltung am Ausweichtermin, …, statt.“ Danach nur noch der Ausweichtermin als nächster Termin. |
| `fällt aus` | Bis zum Folgetag Hinweis „Der Termin am … fällt leider aus.“, danach der nächste Monatstermin. |

Der „nächste Termin“ wird täglich automatisch im Browser ermittelt: Ein normaler Termin bleibt bis einschließlich Veranstaltungstag stehen, danach erscheint der Folgetermin. Vergangene Termine werden in der Liste ausgegraut. Nach einer Statusänderung: `npm run ftp` und hochladen.

## Regeln für Claude

Siehe `CLAUDE.md`.
