# PioOne V29.1 – Datenbank und Dokumente

## Änderung
- Das bisherige Modul **Documents / Dokumente** wird im UI als **Database / Datenbank** bezeichnet.
- Datenbank enthält unverändert persönliche Dateien, Teamordner, Enterprise-DMS, Capture/Scan, PioPost und Dokumentenverarbeitung.
- Neues eigenständiges Hauptmodul **Documentation / Dokumente**: PioOne Produkt- und Benutzerdokumentation, Funktionsbeschreibungen, Benutzerhandbücher, Erste Schritte und FAQ.
- Dokumente bietet jetzt durchsuchbare, klickbare Beispielartikel (Deutsch und Englisch).
- Desktop-Navigation, mobile Navigation, modulare Seitenleiste und Schnellleiste angepasst.
- Keine Datenmigration: bestehende interne Route `#/Documents/Documents%20overview` und Browserdaten bleiben erhalten. Nur Anzeige- und Dokumentationsstruktur ändert sich.

## Umsetzung / Einschränkungen
- Frontend-Prototyp; Artikel sind statische Startinhalte in `src/features/DocumentationWorkspace.tsx`. Kein Dokumentations-CMS, Autorenfreigabe, Versionierung oder serverseitige Suche.
- Das bisherige DMS ist weiterhin ein Demo-File-Explorer und keine produktionsreife GoBD-konforme Archivierung.
- TypeScript/TSX-Syntaxprüfung aller 68 Quelldateien erfolgreich; vollständiger Vite-Build derzeit nicht ausgeführt, da Node-Pakete im Offline-Cache fehlen.
- Produktversion 29.1.0.

## Installation
```bash
cd app/webui
npm install
npm run build
npm run dev
```
