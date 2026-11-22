# PioOne V29.2 – Modularchitektur

## Benutzeroberfläche
- DCOS: Tagesbriefing, Aufgaben, Freigaben, Aktivitäten
- Assistant: Assistenten und Workflow-Assistent
- Datenbank: persönlicher Speicher, Dateien, Teamordner, DMS, PioPost
- Dokumente: Produktdokumentationsbibliothek, KMU-Matrix, Benutzerhandbuch, Spezifikationen, Bilder, Produktbriefe

## Systemgrenzen
PioOne dient als zentrale Oberfläche mit Anwendungen und Rollen. PioAgent orchestriert digitale Mitarbeiter. PioBrain liefert kontrollierten Wissensabruf. PioSphere COS / PioLiance stellen die Betriebsplattform bereit. Fachsysteme (z. B. DATEV, ERP, HR) werden über Konnektoren integriert.

## Aktueller Implementierungsstand
Die neue Dokumentationsbibliothek wird über statische Dateien im React-Frontend ausgeliefert. Die KMU-Matrix enthält konservative Klassifizierungen aus dem Masterplan. Die Produktivsetzung verlangt Backend, Zugriffsschutz, Auditierung und aktualisierte Dokumentfreigaben.
