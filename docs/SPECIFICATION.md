# PioOne V32 — Aktuelle Produkt- und UI-Spezifikation

**Stand:** 21. November 2026 · **Version:** 32.0.0 · **Typ:** Interaktive React-Demo, nicht produktionsreifes Unternehmenssystem

## Produktpositionierung

**BY PIOVATION — PioOne**  
**The AI-Native Enterprise Workspace**  
**One Workspace. One Workforce. One Enterprise.**  
Bringing people, AI workers, applications and business processes together.

PioOne bildet eine gemeinsame Arbeitsumgebung für menschliche und digitale Mitarbeiter, Anwendungen, Daten und Geschäftsprozesse. Es ist nicht als vollständiger Ersatz sämtlicher Fachsoftware zu verstehen.

## Neue Funktionen V32

1. **Landingpage**: 12 repräsentative Anwendungskacheln und getrennte Präsentation der menschlichen und digitalen Belegschaft; eingebettetes Plattformdiagramm aus V31.1.
2. **Mein Assistent**: Benutzeroberfläche ersetzt die technische Bezeichnung DCOS; interne Service-, Routing- und Daten-IDs bleiben kompatibel.
3. **App Launcher**: App-Katalog mit lokalen Favoriten, Sortierung und Schnellzugriff.
4. **Gemeinsamer Demo-Posteingang**: Aufgaben und menschliche Freigabeentscheidungen mit lokalem Status; keine echten Zahlungs- oder Buchungsaktionen.
5. **Digital-Worker-Profile**: Rolle, App-Bindung, verantwortlicher Mensch und Demo-Status bearbeitbar; keine Verbindung zum produktiven PioAgent-Backend.
6. **Globale Demo-Suche**: Sucht in App-Namen, Beispielaufgaben und Demo-Worker-Profilen. Keine echte Volltext- oder mandantenübergreifende Suche.
7. **Anpassbarer Workspace**: Favoriten und App-Reihenfolge im lokalen Browser.
8. **App Marketplace**: Demo-Aktivierungsvormerkung ohne Änderung serverseitiger Modulberechtigungen.
9. **Team- und Worker-Übersicht**: Menschliche Teams, Worker und offene Vorgänge gemeinsam dargestellt.
10. **Mobile UI**: Responsive Kacheln, Tab-Navigation und Listen.

## Bestehende Funktionen

- Öffentliche Landingpage mit Plattformdiagramm und Produktbotschaft.
- Demo-Modus mit E-Mail-Eingabe ohne Passwort; **keine echte Anmeldung oder echte Unternehmensdaten**.
- Keycloak Login / Registrierung über OIDC Authorization Code + PKCE, konfigurierbar durch `.env.example`. Keycloak-Realm und Backend-Rechteprüfung vor Produktivsetzung notwendig.
- Dokumentation als separates Top-Level-Angebot, „Dateien & DMS“ als Arbeitsmodul.
- KMU-Funktionsmatrix, User Guides, Architektur, Bilder und Produktbriefe.
- V31 KMU Process Engine: sieben Prozesse als Demo mit lokalen Freigaben.

## Technische Grenzen und Sicherheitsanforderungen

- Demo-Daten, Favoriten, Inbox und Worker-Bindungen werden browserseitig gespeichert und sind **nicht** vertrauenswürdige oder dauerhafte Unternehmensdatensätze.
- Rechte müssen über produktive Keycloak-Sitzungen, mandantenspezifische Backend-Autorisierung, Audit-Logging und Freigabe-Gates serverseitig geprüft werden.
- Marketplace-Berechtigungen, Worker-Ausführung, globale Unternehmenssuche, echte Dokumentenablage und ERP-/DATEV-Integrationen erfordern separate Backend-Implementierung.
- Keine Passwort-Eingabe in PioOne; die Anmeldung erfolgt beim Identity Provider.

## Lokale Entwicklung

```bash
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Die Entwicklungs-URL lautet `http://localhost:5220`. Lokale Demo unter `/demo`; Keycloak-Anmeldung unter `/login` und `/register`.
