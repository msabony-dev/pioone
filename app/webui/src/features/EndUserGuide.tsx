import React from 'react';
import {BookOpen,ArrowUpRight,BrainCircuit,Mail,FolderOpen,Layers3,Workflow,ShieldCheck} from 'lucide-react';
export function EndUserGuide({language}:{language:'de'|'en'}){const de=language==='de';const t=(a:string,b:string)=>de?a:b;return (
    <section className="lp-end-user-guide" id="end-user-guide" aria-labelledby="lp-end-user-heading">
      <div className="lp-section-top"><span className="lp-index">{t('PIOONE FÜR ANWENDER','PIOONE FOR END USERS')}</span><span className="lp-section-line"/></div>
      <div className="lp-eu-heading">
        <div>
          <span className="lp-eu-kicker"><BookOpen size={16}/> {t('PRODUKT- UND FUNKTIONSÜBERSICHT','PRODUCT & FEATURE OVERVIEW')}</span>
          <h2 id="lp-end-user-heading">{t('Dein digitaler Arbeitsplatz.','Your digital workspace.')} <em>{t('Alles an einem Ort.','Everything in one place.')}</em></h2>
          <p>{t('PioOne verbindet Kommunikation, persönliche Dateien, Unternehmensanwendungen und digitale Mitarbeiter. Entdecke, wie du deinen Tag von einem Workspace aus organisieren kannst.','PioOne connects communication, personal files, enterprise applications and digital employees. Discover how to organize your workday from one workspace.')}</p>
        </div>
        <div className="lp-eu-actions">
          <a className="lp-eu-primary" href={de?'/guides/PIOONE-END-USER-SPECIFICATION-DE.html':'/guides/PIOONE-END-USER-SPECIFICATION-EN.html'} target="_blank" rel="noopener noreferrer"><BookOpen size={18}/> {t('Vollständige Beschreibung lesen','Read the full specification')} <ArrowUpRight size={16}/></a>
          <a className="lp-eu-secondary" href={de?'/guides/PIOONE-END-USER-SPECIFICATION-EN.html':'/guides/PIOONE-END-USER-SPECIFICATION-DE.html'} target="_blank" rel="noopener noreferrer">{t('English version','Deutsche Version')} <ArrowUpRight size={15}/></a>
        </div>
      </div>
      <div className="lp-eu-grid">
        {[
          {icon:<BrainCircuit size={24}/>,name:t('Mein Assistent','My Assistant'),body:t('Tagesbriefings, Aufgaben, Prioritäten und freigegebene KI-Unterstützung.','Daily briefings, tasks, priorities and authorized AI assistance.')},
          {icon:<Mail size={24}/>,name:t('Kommunikation','Communication'),body:t('E-Mail, Kalender, Meetings und Zusammenarbeit in einem Arbeitsbereich.','Email, calendar, meetings and collaboration in one workspace.')},
          {icon:<FolderOpen size={24}/>,name:t('Dateien & DMS','Files & DMS'),body:t('Privates Laufwerk, Teamordner, Unternehmensakten und verbundene Speicher.','Private drive, team folders, enterprise records and connected storage.')},
          {icon:<Layers3 size={24}/>,name:'CRM',body:t('Kunden, Kontakte, Leads, Verkaufschancen und Angebote verfolgen.','Track customers, contacts, leads, opportunities and quotations.')},
          {icon:<Layers3 size={24}/>,name:'ERP',body:t('Aufträge, Einkauf, Rechnungen, Finanzen und Geschäftsprozesse.','Orders, purchasing, invoicing, finance and business operations.')},
          {icon:<Workflow size={24}/>,name:t('Digitale Mitarbeiter','Digital Workers'),body:t('Aufgaben und Workflows unterstützen – mit Berechtigungen und menschlicher Freigabe.','Assist with tasks and workflows under permissions and human approval.')}
        ].map(card=><article className="lp-eu-card" key={card.name}><div className="lp-eu-icon">{card.icon}</div><h3>{card.name}</h3><p>{card.body}</p></article>)}
      </div>
      <div className="lp-eu-day">
        <div><span className="lp-eu-step-label">{t('DEIN TAGESABLAUF','YOUR DAILY FLOW')}</span><h3>{t('Anmelden. Überblick gewinnen. Zusammenarbeiten.','Sign in. Get organized. Work together.')}</h3></div>
        <ol><li>{t('Tagesbriefing und Aufgaben prüfen','Review your daily briefing and tasks')}</li><li>{t('E-Mails, Dateien und Geschäftsvorgänge öffnen','Open email, files and business records')}</li><li>{t('Assistenten für Entwürfe und Vorschläge nutzen','Use assistants for drafts and suggestions')}</li><li>{t('Freigaben entscheiden und Ergebnisse prüfen','Approve actions and verify results')}</li></ol>
      </div>
      <p className="lp-eu-notice"><ShieldCheck size={18}/>{t('Versionshinweis: V42 ist ein Frontend-Prototyp mit Demo-Daten. Produktive CRM-/ERP-Vorgänge, Dateisynchronisierung, Worker-Ausführung und Datenbankdienste benötigen Backend-Integration.','Version notice: V42 is a frontend prototype with demo data. Live CRM/ERP transactions, file synchronization, worker execution and database services require backend integration.')}</p>
    </section>

);}
