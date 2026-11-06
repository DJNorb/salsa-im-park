# Schritt für Schritt: Website veröffentlichen (ALL-INKL.COM, FTP)

## A) Einmalige Vorbereitung

**1. Projekt herunterladen**
Den Ordner `salsa-im-park` als ZIP herunterladen und z. B. nach `Dokumente/salsa-im-park` entpacken.

**2. Node.js installieren**
Auf [nodejs.org](https://nodejs.org) die Version **„LTS“** herunterladen und mit den Standard-Einstellungen installieren.

**3. FileZilla installieren**
Auf [filezilla-project.org](https://filezilla-project.org) den **FileZilla Client** herunterladen und installieren.

**4. FTP-Zugangsdaten bei ALL-INKL besorgen**
- Im **KAS** (kas.all-inkl.com) anmelden.
- Links auf **„FTP“** klicken. Dort stehen **Server**, **Benutzername** und das Passwort (oder lege einen neuen FTP-Zugang an).
- Unter **„Domain“** nachsehen, in welchen **Ordner** die Domain salsa-im-park.de zeigt (Spalte „Pfad“, z. B. `/salsa-im-park.de/`). Dorthin wird später hochgeladen.

**5. Terminal im Projektordner öffnen**
- **Windows:** Ordner `salsa-im-park` im Explorer öffnen → oben in die Adresszeile klicken → `cmd` eintippen → Enter.
- **Mac:** Programm „Terminal“ öffnen → `cd ` tippen (mit Leerzeichen) → den Ordner `salsa-im-park` ins Fenster ziehen → Enter.

**6. Programmbausteine installieren** (dauert 1–2 Minuten)
```
npm install
```

**7. Bilder von der alten Website übernehmen** (einmalig, dauert einige Minuten)
```
npm run bilder-import
```
Am Ende steht „Fertig. … Weiterleitungen angelegt.“

## B) Website erstellen und prüfen

**8. Vorschau auf dem eigenen Rechner (optional, empfohlen)**
```
npm run dev
```
Im Browser `http://localhost:4321` öffnen und alles durchklicken. Beenden mit `Strg + C`.

**9. Upload-Ordner erzeugen**
```
npm run ftp
```
Danach gibt es im Projekt den Ordner **`FTP-Upload`**. Das ist die fertige Website.

## C) Hochladen mit FileZilla

**10. Verbinden**
FileZilla öffnen → oben eintragen: **Server**, **Benutzername**, **Passwort** (aus Schritt 4), Port leer lassen → **„Verbinden“**.
Die Frage nach dem Zertifikat mit **„OK“** (Haken „Immer vertrauen“) bestätigen.

**11. Versteckte Dateien einblenden**
Menü **Server → „Anzeige versteckter Dateien erzwingen“** anklicken. Nur so wird die wichtige Datei `.htaccess` mit hochgeladen.

**12. Alte Website sichern (nur beim ersten Mal)**
Rechts in den Domain-Ordner aus Schritt 4 wechseln → alles markieren → Rechtsklick → **„Herunterladen“** in einen Ordner wie `Sicherung-alte-Website`.

**13. Neue Website hochladen**
- **Links** (eigener Rechner) den Ordner `FTP-Upload` **öffnen** (Doppelklick, sodass dessen Inhalt zu sehen ist: `index.html`, `Pictures`, `_astro`, `_Media`, `.htaccess` …).
- **Rechts** im Domain-Ordner sein.
- Links **alles markieren** (`Strg + A` bzw. `Cmd + A`) → Rechtsklick → **„Hochladen“**.
- Bei der Frage „Zieldatei existiert bereits“: **„Überschreiben“** wählen und Haken bei **„Immer diese Aktion verwenden“** setzen.
- Warten, bis unten „Zu übertragende Dateien“ leer ist.

**14. SSL prüfen (nur beim ersten Mal)**
Im KAS unter **Domain → salsa-im-park.de bearbeiten → SSL-Schutz** ein **Let's-Encrypt-Zertifikat** aktivieren, falls noch nicht vorhanden.

**15. Kontrolle**
`https://www.salsa-im-park.de` im Browser öffnen (ggf. mit `Strg + F5` neu laden) und die Prüfliste in `FEHLENDE-INHALTE.md` durchgehen.

## D) Später: Änderungen veröffentlichen

1. Claude die Änderung beschreiben (z. B. „Termin am 21. Mai ist abgesagt“).
2. Terminal im Projektordner öffnen → `npm run ftp`.
3. FileZilla → Inhalt von `FTP-Upload` erneut hochladen → „Überschreiben“.

Die Schritte 2–7 und 12 und 14 sind nur beim ersten Mal nötig.

## Hilfe bei Problemen

| Problem | Lösung |
|---|---|
| `npm` wird nicht erkannt | Node.js neu installieren, Terminal schließen und neu öffnen |
| Seite zeigt noch die alte Version | Browser mit `Strg + F5` neu laden |
| Fehler 500 nach Upload | `.htaccess` vorübergehend umbenennen und Claude den Fehler zeigen |
| Bilder fehlen | `npm run bilder-import` erneut ausführen, dann `npm run ftp` |
