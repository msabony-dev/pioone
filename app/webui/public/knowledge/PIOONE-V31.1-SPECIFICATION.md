# PioOne V31.1 – Aktuelle Produktspezifikation

**Status:** React/TypeScript UI-Prototyp, kein produktionsreifes ERP oder DMS.

## Produktpositionierung

PioOne – The AI-Native Enterprise Workspace.

One Workspace. One Workforce. One Enterprise.

Bringing people, AI workers, applications and business processes together.

PioOne verbindet Menschen, Digitale Mitarbeiter, Unternehmensanwendungen, Daten und Geschäftsprozesse.

## Öffentliche Landingpage

- Offizieller Hero mit dem festgelegten Markentext.
- Deutsche Benennungen „Digitale Mitarbeiter“ und „Digitale Belegschaft“.
- Plattformdiagramm mit sechs Schichten: PioVation Cloud – München, Daten, PioOne Plattform, Enterprise-Anwendungen, Digitale Mitarbeiter und Anwender.
- Dokumentation als oberer Navigationspunkt / Landingpage-Bereich. Interne Dokumentation bleibt im angemeldeten Workspace.
- Zwei Zugänge: Demo nur mit E-Mail (lokale Browser-Vorschau ohne echte Authentifizierung); Sign in/Sign up via Keycloak OIDC Authorization Code + PKCE nach Konfiguration.

## Workspace / Module

- DCOS: Tagesbriefing, Aufgaben, Freigaben, Aktivitäten.
- Assistant: Assistenten, Workflow-Assistent und KMU Process Engine mit sieben demonstrativen End-to-End-Prozessen.
- Dateien & DMS: persönliche Dateien, Teamdateien, Erfassen, PioPost (Demo / spezifizierte Zielarchitektur).
- Dokumentation: aktuelle Spezifikation, Architektur, Handbücher, Produktbriefe, Bilder, KMU-Matrix und DMS-Anforderungen.
- Organisation: Menschen, Teams, digitale Mitarbeiter und Modulzuordnungen als UI-Prototyp.

## Architekturrichtung

React Frontend → Keycloak/OIDC und gesichertes Backend Gateway → Go/gRPC Fachdienste, PioAgent, PioBrain → PostgreSQL, S3-kompatibler Dateispeicher, autorisierte externe Integrationen.

## Grenzen

Die aktuellen UI-Demos simulieren viele Abläufe im Browser. Für den produktiven Einsatz fehlen insbesondere durchgängige Backend-Services, serverseitige Autorisierung und Mandantentrennung, S3/DB-Persistenz, verifizierte Worker-Ausführung, Compliance-Archivierung, Backup/Restore und reale ERP/DATEV-Integrationen. Im Demo-Modus werden keine echten Unternehmensdaten autorisiert verarbeitet.

**Versionsregel:** In der Dokumentationsbibliothek wird in der Kategorie Spezifikationen ausschließlich diese aktuellste Version angeboten. Historische Dateien können zur Nachvollziehbarkeit separat im Quellcode verbleiben, gelten aber nicht als aktuelle Produktspezifikation.
