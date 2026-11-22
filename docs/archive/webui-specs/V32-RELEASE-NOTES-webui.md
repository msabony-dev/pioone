# PioOne V32.0.0 — Release Notes

Basis: vollständiger Quellstand V31.1. V32 erweitert die UI um eine neue interaktive Workspace-Startseite und einen Landingpage-Katalog mit Menschen und digitalen Mitarbeitern.

## Neu
- Workspace mit App-Kacheln, Suche, Favoriten und individuell sortierbarer Reihenfolge.
- Gemeinsamer Demo-Aufgaben- und Freigabeposteingang.
- Digital-Worker-Profile mit editierbarer App-Zuordnung, verantwortlichem Menschen und Demo-Aktivierung.
- Marketplace mit lokaler Demo-Aktivierungsvormerkung.
- Menschliche und digitale Belegschaft in einer gemeinsamen Teamansicht.
- Öffentliche Landingpage mit zwölf App-Kacheln und zwei Belegschaften.
- Sichtbarer Begriff „Mein Assistent“ / „My Assistant“ statt DCOS. Interne IDs unverändert.
- Dokumentationskatalog zeigt nur die aktuelle Spezifikation V32; historische Dateien verbleiben gegebenenfalls im Quellcode.

## Unverändert
- Landingpage-Hero und Architekturdiagramm V31.1
- Demo-E-Mail-Einstieg sowie Keycloak OIDC Sign-in und Sign-up
- Dateien & DMS, Dokumentationsbibliothek, KMU-Matrix
- Sieben V31 KMU-Prozess-Demo-Vorlagen und ältere UI-Module

## Wichtige Beschränkungen
Alle neu hinzugefügten Workflow- und Marketplace-Aktionen sind lokal simuliert. Kein produktiver Worker, keine realen Mandantendaten, keine Finanztransaktionen. Keycloak und Backend-Autorisierung müssen in einer produktiven Deployment-Umgebung konfiguriert und getestet werden.
