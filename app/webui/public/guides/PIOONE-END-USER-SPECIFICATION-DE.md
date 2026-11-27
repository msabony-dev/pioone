# PioOne – Produktspezifikation für Endanwender (Deutsch)

**Produkt:** PioOne von PioVation
**Versionsbasis:** V42
**Zielgruppe:** Beschäftigte, Teamleitungen, Führungskräfte und Administratoren
**Dokumenttyp:** Produkt- und Funktionsbeschreibung für Endanwender
**Wichtig:** Die im Repository veröffentlichte Version V42 ist ein **Frontend-Prototyp** mit Demo-Daten und simulierten Abläufen. Die nachfolgende Beschreibung trennt bereits demonstrierte Bedienoberflächen von geplanten produktiven Funktionen. Sie ist keine Zusage, dass alle Backend-Dienste bereits funktionieren.

## 1. PioOne auf einen Blick

**PioOne ist der KI-native Unternehmensarbeitsplatz für die tägliche Arbeit.** Hier kommen Menschen, digitale Mitarbeiter, Kommunikation, persönliche Dateien, Unternehmensanwendungen und Geschäftsprozesse zusammen. Anwender sollen nicht ständig zwischen verschiedenen Programmen wechseln müssen, um E-Mails zu lesen, Dokumente zu prüfen, Kunden zu betreuen oder Freigaben zu erteilen.

Zwei Belegschaften arbeiten zusammen: Menschen behalten Verantwortung und Entscheidungsbefugnis, während digitale Mitarbeiter Informationen aufbereiten, Vorgänge koordinieren und freigegebene Aufgaben unterstützen.

## 2. Für wen ist PioOne gedacht?

| Anwenderrolle | Ziel im Alltag | Typische Tätigkeiten |
|---|---|---|
| Beschäftigte | Aufgaben im Blick behalten | Tagesbriefing, E-Mail, Dateien, Termine, Fachanwendungen |
| Teamleitung | Zusammenarbeit koordinieren | Aufgaben verteilen, Freigaben prüfen, Workflows verfolgen |
| Abteilungsleitung | Fachbereich steuern | Dashboards, Servicefälle, Budgets, digitale Mitarbeiter |
| Unternehmensadministration | Plattform verwalten | Organisation, Rollen, Module, Speicher und Worker-Zuweisungen |
| Digitaler Mitarbeiter | Unterstützen unter Aufsicht | Freigegebene Informationen abrufen, Entwürfe erstellen, Workflows unterstützen |

Welche Funktionen tatsächlich zur Verfügung stehen, hängt von der Organisation, den Berechtigungen, der Bereitstellung und dem jeweiligen Entwicklungsstand ab.

## 3. Die wichtigsten Arbeitsbereiche

### Startseite und Mein Assistent (DCOS)

Der persönliche Einstieg in den Arbeitstag. Das Zielbild umfasst Tagesbriefings, wichtige E-Mails, eingehende digitale Post, CRM-Aktivitäten, ERP-Hinweise, Termine, Aufgaben, Freigaben und empfohlene nächste Schritte. Mein Assistent kann Fragen zu berechtigten Quellen beantworten und Aktionen zur Prüfung vorbereiten.

**Wichtig:** Der Assistent erhält nicht automatisch Zugriff auf alle privaten Dateien und führt keine rechtlich bindenden Aktionen ohne passende Freigabe aus.

### Kommunikation und Zusammenarbeit

E-Mail, Kalender, Meetings, Telefonie, Chat, Kontakte und Aufgaben werden in einer gemeinsamen Arbeitsumgebung zusammengeführt, soweit die jeweiligen Anbieter und Verbindungen integriert sind.

### Dateien & DMS

Ein zentraler Dateiexplorer mit vier Bereichen:

- **Mein Laufwerk:** Privater Speicher für PDFs, Fotos, Präsentationen und andere zugelassene Dateien – auch ohne Verbindung zu CRM, ERP oder anderen Fachanwendungen.
- **Team-Laufwerke:** Gemeinsam genutzte Ordner von Teams, Abteilungen und Projekten.
- **Unternehmensdokumente:** Dokumente und Akten mit Bezug zu CRM, ERP, HR, Travel, PioPakt und weiteren Anwendungen.
- **Verbundene Laufwerke:** Vorgesehene Verbindungen zu OneDrive, SharePoint und Netzwerk- oder Cloud-Speichern.

Ein produktives DMS soll Ordnerhierarchien, Hoch- und Herunterladen, Vorschau, Versionen, Freigaben, Berechtigungen, Speicherkontingente, Suche, Aufbewahrung und Wiederherstellung bieten. Die Berechtigungen gelten auch für digitale Mitarbeiter.

### CRM – Kundenbeziehungen

Leads, Unternehmen, Kontaktpersonen, Verkaufschancen, Aktivitäten, Angebote, Wiedervorlagen und Kundenservice organisieren. Mein Assistent kann offene Aufgaben und wichtige Verkaufschancen hervorheben. Bestätigte Geschäftsvorgänge werden über definierte Prozesse an ERP übergeben.

### ERP – Geschäftsprozesse und Finanzen

Je nach freigeschaltetem Modul: Aufträge, Einkauf, Lieferanten, Rechnungen, Forderungen, Verbindlichkeiten, Finanzbuchhaltung, Budgets, Lager und Zahlungen. Rechnungsbuchungen und Bankzahlungen müssen von produktiven ERP-Diensten geprüft und gemäß Unternehmensregeln freigegeben werden.

### Weitere Unternehmensanwendungen

Das Zielbild umfasst außerdem HR, Projekte, Reisen, PioPakt-Vertragsmanagement, PioPost-Post- und Rechnungseingang, Governance, IT-/Servicemanagement und Auswertungen. Funktionsumfang und Reifegrad unterscheiden sich je Modul.

### Digitale Mitarbeiter und Workflows

Digitale Mitarbeiter besitzen definierte Aufgaben, Berechtigungen, Werkzeuge, Fachanwendungen und einen menschlichen Verantwortlichen. Geplante End-to-End-Prozesse sind unter anderem Lead-to-Cash, Procure-to-Pay, Hire-to-Retire und Request-to-Resolution. Aktionen und menschliche Freigaben müssen nachvollziehbar sein.

### V42-Navigation und Workflow Digital Workers

Mein Assistent behält persönliche Briefings, PioBrain, Kommunikation, Aufgaben und Freigaben. Prozessorientierte Rollen stehen unter **Digital Workers (DW) > DWs > Workflows**: zwölf Workflow-Vorlagen sowie **DW-Workflow-Automation**. Alle Workflow-Rollen beginnen mit DW-, etwa DW-Lead-to-Cash und DW-Procure-to-Pay.

**DW Organisations** zeigt digitale Positionen und Verantwortlichkeiten. **Worker Factory** ist ein eigener Tab unter Digital Workers für Definitionen und Versionen. Unter **DW Settings** steuert Worker assignments Rollenstatus und Laufzeitzuordnungen; Digital positions verwaltet Verantwortlichkeiten. **Settings > Database & Backup** enthält lokale Vorschauen für Datenbank- und Backup-Einstellungen.

Unter **Dateien & DMS** bietet **Lokaler Computer** die Auswahl eines lokalen Ordners mit Lesezugriff, Dateinamensuche, Vorschau und Download. Nach einem Neuladen muss der Ordner erneut ausgewählt werden. Lokale Dateien werden nicht automatisch hochgeladen, synchronisiert, indexiert oder für KI-Worker freigegeben. Die lokale Explorer-Ansicht verwendet derzeit deutsche Beschriftungen.

Active/Deactivated, Run, Edit und Settings sind Demo-Bedienelemente. Run zeigt einen lokalen Vorschauhinweis und führt keinen produktiven Workflow aus. Vorhandene Worker-Versionen und Zuordnungen bleiben im gemeinsamen lokalen Browser-Register erhalten.

### PioBrain – Unternehmenswissen

PioBrain dient dazu, berechtigte Dokumente und Wissensquellen mit nachvollziehbaren Quellenangaben auszuwerten. Private Dateien dürfen nur nach zulässiger Berechtigungs- oder Freigabegrundlage indexiert beziehungsweise abgerufen werden. KI-Antworten ersetzen keine verbindlichen Geschäftsdaten.

## 4. Ein typischer Arbeitstag mit PioOne

1. **PioOne öffnen:** Mit dem konfigurierten Identitätsanbieter anmelden oder die Demo starten.
2. **Startseite und Mein Assistent prüfen:** Tagesplan, Aufgaben, Termine, Hinweise und Briefing sichten.
3. **Ursprung öffnen:** Etwa die zugehörige E-Mail, PioPost-Sendung, CRM-Chance, ERP-Rechnung oder DMS-Datei.
4. **Dateien bearbeiten:** Im eigenen Laufwerk, Teamordner, Unternehmens-DMS oder angebundenen Speicher arbeiten.
5. **Assistenten nutzen:** Zusammenfassungen, Entwürfe, Checklisten oder nächste Schritte aus berechtigten Quellen erstellen lassen.
6. **Freigaben durchführen:** Sensible Aktionen nur nach Prüfung durch die zuständige Person bestätigen.
7. **Ergebnisse kontrollieren:** Prüfen, ob die zuständige Geschäftsanwendung den Vorgang tatsächlich abgeschlossen hat.

### Beispiel: Kundenanfrage

Eingehende Nachricht → CRM-Lead → Qualifizierung und Wiedervorlage → Angebot → Freigabe und Annahme → ERP-Auftrag → Rechnung und Zahlung. Jede Anwendung bleibt verantwortlich für ihre verbindlichen Daten.

### Beispiel: Eingangsrechnung

PioPost-Scan oder Dateiupload → Texterkennung/Klassifizierung → DMS-Version → ERP-Rechnungsentwurf → sachliche und finanzielle Prüfung → menschliche Freigabe → Buchung → genehmigte Zahlung und Bankabgleich.

## 5. Datenschutz, Rechte und Sicherheit

- Zugriffe hängen von Organisation, Rolle, Team, Dokument und einzelnen Berechtigungen ab.
- Das persönliche Laufwerk ist grundsätzlich privat; Teilen und KI-Zugriff brauchen eine zulässige Freigabe.
- Digitale Mitarbeiter arbeiten mit festgelegten Handlungsspielräumen und gegebenenfalls menschlichen Freigaben.
- Wo Daten gespeichert und von KI verarbeitet werden, richtet sich nach Cloud-, Hybrid- oder On-Prem-Konfiguration.
- Backup, Versionierung, Aufbewahrung und Disaster Recovery erfordern produktiv betriebene Backend-Dienste.

## 6. Geräte und Sprachen

PioOne ist für Desktop, Tablet und Smartphone konzipiert und bietet die Oberflächensprachen **Deutsch und Englisch**. Die vollständige Übersetzung und mobile Eignung müssen für jede Veröffentlichung getestet werden.

## 7. Welche Funktionen sind in V42 tatsächlich verfügbar?

**Im Repository belegt:** React/Vite-Frontend-Prototyp, PioVation-Branding, öffentliche Landingpage, simulierte Workflows, konfigurierbare Keycloak/OIDC-Anmeldeoberfläche und lokale Demo-Daten. Laut Repository-README gibt es **noch kein vollständiges produktives Backend** mit PostgreSQL-APIs, Object Storage, verbindlicher Connector-Autorisierung, vollständiger serverseitiger Zugriffskontrolle, echtem RAG-Indexing und betriebsfähigem Backup/Restore.

**Geplant:** Dauerhafte Mehrbenutzerdaten, Dateisynchronisierung, produktive CRM-/ERP-Vorgänge, PioWorker-Ausführung, Audit und Freigaben, Knowledge Retrieval sowie Daten- und Systemwiederherstellung.

Ein Demo-Klick ist kein Nachweis einer tatsächlichen Buchung, Zahlung, rechtswirksamen Freigabe oder Datensicherung.

## 8. Erste Schritte

Über **Demo ausprobieren** kann der PioOne-Arbeitsplatz besichtigt werden. Über **Anmelden** oder **Registrieren** ist die Anmeldung möglich, wenn ein Identitätsanbieter korrekt konfiguriert ist. Die Sprache lässt sich auf der Landingpage zwischen **DE** und **EN** wechseln.

Technische Datenmodelle, Schnittstellen und Backend-Entwürfe stehen in der versionierten GitHub-Dokumentation unter `docs/implementation/v32.5/`. Dieses Dokument richtet sich ausdrücklich an Endanwender.

© PioVation. Produkt- und Funktionsbeschreibung für Endanwender.
