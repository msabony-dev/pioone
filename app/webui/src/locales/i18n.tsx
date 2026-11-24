import React,{createContext,useContext,useState} from 'react';
import de from './de.json';
import en from './en.json';
export type Language='de'|'en';
// The legacy catalog maps English UI keys to German labels. Newer screens also
// pass German source labels. Translate in both directions, with explicit overrides
// for product terminology and intentionally non-bijective translations.
const deLabels:Record<string,string>=de;
const enLabels:Record<string,string>=en;
const englishByGerman:Record<string,string>=Object.fromEntries(
 Object.entries(deLabels).filter(([key,value])=>key!==value).map(([key,value])=>[value,key])
);
const directDE:Record<string,string>={
 'Active':'Aktiv','Deactivated':'Deaktiviert','Activate':'Aktivieren','Deactivate':'Deaktivieren',
 'Run':'Ausführen','Edit':'Bearbeiten','Save changes':'Änderungen speichern','Edit digital worker':'Digitalen Mitarbeiter bearbeiten',
 'Digital worker':'Digitaler Mitarbeiter','Digital worker profiles':'Digitale-Mitarbeiter-Profile',
 'DW runtime bindings':'DW-Worker-Verbindungen','Connected worker':'Verbundener Worker',
 'Runtime state':'Laufzeitstatus','Endpoint configured':'Endpunkt konfiguriert',
 'No published endpoint':'Kein veröffentlichter Endpunkt','All categories':'Alle Kategorien','Category':'Kategorie',
 'Custom':'Benutzerdefiniert','Name':'Name','Description':'Beschreibung',
 'Core & Executive':'Leitung & Verwaltung','Human Resources':'Personalwesen',
 'Sales & CRM':'Vertrieb & CRM','Finance & Procurement':'Finanzen & Einkauf',
 'Operations & IT':'Betrieb & IT','Industry Specialists':'Branchenspezialisten',
 'A catalog of enterprise digital workers. My Assistant is your first worker and has its own sidebar entry.':'Katalog digitaler Mitarbeiter für Unternehmensprozesse. My Assistant ist der erste Worker und besitzt einen eigenen Menüpunkt.',
 'Status and assignments are saved locally for this UI prototype. Run requires a connected and authorized worker runtime.':'Status und Zuordnungen werden in diesem UI-Prototyp lokal gespeichert. Ausführen benötigt eine verbundene und autorisierte Worker-Laufzeit.',
 'Demo only: No production worker runtime is connected. No job was executed.':'Nur Demo: Es ist keine produktive Worker-Laufzeit verbunden. Es wurde kein Auftrag ausgeführt.',
 'Activate the digital worker before running it.':'Aktivieren Sie den digitalen Mitarbeiter vor dem Ausführen.',
 'Select an available worker implementation for each digital worker role. My Assistant remains in its own sidebar section.':'Wählen Sie für jede DW-Rolle einen verfügbaren Worker aus. My Assistant bleibt ein eigener Sidebar-Bereich.',
 'Demo configuration only. Connecting a runtime does not start or deploy it. Secrets belong in a server-side vault.':'Nur Demo-Konfiguration. Eine Zuordnung startet oder veröffentlicht keinen Worker. Zugangsdaten gehören in einen serverseitigen Tresor.',

 'DWs':'Digitale Mitarbeiter','DW Organisations':'DW-Organisation','DW Settings':'DW-Einstellungen',
 'My Assistant':'My Assistant','Digital Workers (DW)':'Digitale Mitarbeiter (DW)',
 'Dateien & DMS':'Dateien & DMS','Worker Factory':'Worker Factory',
 'Worker bindings':'Worker-Zuordnungen','Digital positions':'Digitale Stellen',
 'Database & Backup':'Datenbank & Backup','Database':'Datenbank','Backup':'Backup',
 'AI-Native Enterprise Operating System':'KI-natives Unternehmensbetriebssystem',
 'Digital Workers':'Digitale Mitarbeiter', 'Settings':'Einstellungen',
 'Overview':'Übersicht','PioBrain':'PioBrain', 'Home':'Startseite',
 'Create worker':'Worker erstellen','Create a worker':'Worker erstellen',
 'Worker assignments':'Worker-Zuordnungen','Assigned application':'Zugeordnete Anwendung',
 'Assigned version':'Zugeordnete Version','Not assigned':'Nicht zugeordnet',
 'No worker selected':'Kein Worker ausgewählt','Save assignments':'Zuordnungen speichern',
 'Personal overview':'Persönliche Übersicht','Daily briefing':'Tagesbriefing',
 'My tasks':'Meine Aufgaben','Activities':'Aktivitäten','Approvals':'Freigaben',
 'Communication':'Kommunikation','Email':'E-Mail','Calendar':'Kalender',
 'Meetings':'Besprechungen','Chat':'Chat','Calls':'Anrufe',
 'Channels':'Kanäle','Contacts':'Kontakte','Digital post':'Digitale Post',
 'Worker directory':'Worker-Verzeichnis','Search workers':'Worker suchen',
 'Versions':'Versionen','Assignments':'Zuordnungen','All workers':'Alle Worker',
 'Database connection':'Datenbankverbindung','Backup configuration':'Backup-Konfiguration',
 'Connection status':'Verbindungsstatus','Not connected':'Nicht verbunden',
 'Storage location':'Speicherort','Server':'Server','Port':'Port',
 'Database name':'Datenbankname','Connection method':'Verbindungsmethode',
 'Backup provider':'Backup-Anbieter','Backup schedule':'Backup-Zeitplan',
 'Retention (days)':'Aufbewahrung (Tage)','Encryption':'Verschlüsselung',
 'Test connection':'Verbindung testen','Save local configuration':'Lokale Konfiguration speichern',
 'This is a UI preview. No live database or backup connection is established.':'Dies ist eine UI-Vorschau. Es besteht keine echte Datenbank- oder Backup-Verbindung.',
 'Local demo settings only; credentials must be stored in a server-side secrets manager.':'Nur lokale Demo-Einstellungen; Zugangsdaten gehören in eine serverseitige Secret-Verwaltung.',
 'PostgreSQL (recommended)':'PostgreSQL (empfohlen)',
 'S3-compatible storage':'S3-kompatibler Speicher',
 'Local / on-premises':'Lokal / On-Premises',
 'Daily':'Täglich','Weekly':'Wöchentlich','Manual':'Manuell',
 'Select an application for each digital worker. This does not deploy or execute a worker.':'Ordnen Sie jedem digitalen Mitarbeiter eine Anwendung zu. Dies startet keinen Worker.',
 'Only administrators can change worker assignments.':'Nur Administratoren können Worker-Zuordnungen ändern.',
 'No digital workers available. Create one in Worker Factory.':'Keine digitalen Mitarbeiter vorhanden. Erstellen Sie einen in Worker Factory.',
 'Release':'Version','Application':'Anwendung','Unassigned':'Nicht zugeordnet',
 'Organization & access':'Organisation & Zugriff','Platform':'Plattform',
 'Digital workforce':'Digitale Belegschaft','Advanced settings':'Erweiterte Einstellungen',
 'Open Worker Factory':'Worker Factory öffnen',
};
const directEN:Record<string,string>={
 'Übersicht':'Overview','Tagesbriefing':'Daily briefing','Meine Aufgaben':'My tasks',
 'Freigaben':'Approvals','Aktivitäten':'Activities',
 'Dateien & DMS':'Files & DMS','Digitale Mitarbeiter (DW)':'Digital Workers (DW)',
 'Digital Workers (DW)':'Digital Workers (DW)',
 'Unternehmensbetriebssystem':'Enterprise Operating System',
 'KI-natives Unternehmensbetriebssystem':'AI-Native Enterprise Operating System',
 'Suche in My Assistant':'Search in My Assistant',
 'Worker erstellen':'Create worker','Alle Worker':'All workers',
 'Worker-Verzeichnis':'Worker directory','Worker suchen...':'Search workers...',
 'Versionen:':'Versions:','Versionen':'Versions','Modulzuordnungen':'Assignments',
 'Konfiguration ausstehend':'Configuration pending',
 'Beispielprofil – noch kein Backend verbunden.':'Example profile – backend not connected yet.',
 'Deine digitale Belegschaft – Aufgaben, Versionen und Modulzuordnungen im Überblick.':'Your digital workforce – tasks, versions and application assignments at a glance.',
 'Worker Factory verwaltet Worker-Definitionen und Versionen.':'Worker Factory manages worker definitions and versions.',
 'Dies ist eine lokale Demo, keine produktive Worker-Ausführung.':'This is a local demo, not production worker execution.',
 'Erweiterte Einstellungen':'Advanced settings','Organisation & Zugriff':'Organization & access',
};
const translate=(value:string,language:Language):string=>{
 if(language==='de')return directDE[value]||deLabels[value]||value;
 return directEN[value]||englishByGerman[value]||enLabels[value]||value;
};
const Context=createContext<{language:Language;setLanguage:(l:Language)=>void;t:(s:string)=>string}>({language:'en',setLanguage:()=>{},t:s=>s});
export function LanguageProvider({children}:{children:React.ReactNode}){const [language,S]=useState<Language>(()=>localStorage.getItem('pio19-language')==='de'?'de':'en');const setLanguage=(l:Language)=>{S(l);localStorage.setItem('pio19-language',l);document.documentElement.lang=l};React.useEffect(()=>{document.documentElement.lang=language},[language]);return <Context.Provider value={{language,setLanguage,t:s=>s.includes('/')?s.split('/').map(x=>translate(x,language)).join('/'):translate(s,language)}}>{children}</Context.Provider>}
export const useLanguage=()=>useContext(Context);
export function LanguageSwitch(){const {language,setLanguage}=useLanguage();return <select aria-label="Language / Sprache" value={language} onChange={e=>setLanguage(e.target.value as Language)}><option value="de">DE</option><option value="en">EN</option></select>}
