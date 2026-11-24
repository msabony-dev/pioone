import React,{useState} from 'react';
import {ArrowUpRight,ArrowRight,BrainCircuit,ShieldCheck,Layers3,Workflow,FolderOpen,UsersRound,Check,Menu,X,BookOpen,Mail,CalendarDays,Sparkles,LockKeyhole,Globe2,ChevronDown,Play} from 'lucide-react';
import {configured} from '../auth/keycloak';
import './landing.css';
type Props={onDemo:()=>void;onLogin:()=>void;onRegister:()=>void};
export function LandingPage({onDemo,onLogin,onRegister}:Props){
 const [language,setLanguage]=useState<'de'|'en'>(() => {
  try { return localStorage.getItem('pio19-language') === 'en' ? 'en' : 'de'; }
  catch { return 'de'; }
 });
 const [mobile,setMobile]=useState(false);
 const changeLandingLanguage = (next:'de'|'en') => {
  setLanguage(next);
  try { localStorage.setItem('pio19-language',next); } catch { /* storage can be disabled */ }
  document.documentElement.lang = next;
 };
 const de=language==='de';
 const t=(a:string,b:string)=>de?a:b;

 const features=[{icon:<BrainCircuit/>,title:t('Mein Assistent','My Assistant'),desc:t('Dein KI-Koordinator für Briefings, Aufgaben und Entscheidungen.','Your AI coordinator for briefings, tasks and decisions.')},{icon:<Workflow/>,title:'Assistant & Workflows',desc:t('Digitale Mitarbeiter orchestrieren Aufgaben, Workflows und Freigaben.','Digital workers orchestrate tasks, workflows and approvals.')},{icon:<FolderOpen/>,title:t('Dateien & DMS','Files & DMS'),desc:t('Persönliche Dateien, Teamordner, PioPost und intelligente Dokumentenprozesse.','Personal files, team folders, PioPost and intelligent document processes.')},{icon:<UsersRound/>,title:t('Organisation & Teams','Organization & teams'),desc:t('Menschen und digitale Kollegen arbeiten im gleichen Workspace.','Human teams and digital coworkers in one workspace.')},{icon:<Layers3/>,title:t('Geschäftsanwendungen','Business applications'),desc:t('CRM, Projekte und Fachsoftware in einer einheitlichen Oberfläche.','CRM, projects and business systems in one unified interface.')},{icon:<ShieldCheck/>,title:t('Souverän & kontrollierbar','Sovereign & governed'),desc:t('Rollen, Freigaben und nachvollziehbare Aktionen als Architekturprinzip.','Roles, approvals and traceable actions by design.')}];
 return <div className="pio-landing" id="top">
   <div className="lp-glow lp-glow-a"/><div className="lp-glow lp-glow-b"/>
   <nav className="lp-nav" aria-label="Website"><a className="lp-logo lp-official-brand" href="#top" aria-label="PioVation – PioOne"><img src="/logo.png" alt="PioVation" className="lp-official-logo"/><span className="lp-product-name">PioOne</span></a>
    <div className={'lp-links '+(mobile?'lp-links-open':'')}><a onClick={()=>setMobile(false)} href="#platform">{t('Vorteile','Benefits')}</a><a onClick={()=>setMobile(false)} href="#workspace-apps">{t('Anwendungen','Applications')}</a><a onClick={()=>setMobile(false)} href="#how">{t('So funktioniert’s','How it works')}</a><a onClick={()=>setMobile(false)} href="#digital-workforce">{t('Digitale Belegschaft','Digital Workforce')}</a><a onClick={()=>setMobile(false)} href="#end-user-guide">{t('Für Anwender','For users')}</a><a onClick={()=>setMobile(false)} href="#documentation">{t('Dokumentation','Documentation')}</a><a onClick={()=>setMobile(false)} href="#security">{t('Sicherheit','Security')}</a><a onClick={()=>setMobile(false)} href="#contact">{t('Kontakt','Contact')}</a></div>
    <div className="lp-nav-actions"><button className="lp-language" onClick={()=>changeLandingLanguage(de?'en':'de')} aria-label="Switch language"><Globe2 size={15}/>{language.toUpperCase()}</button><button className="lp-signin" onClick={onLogin}>{t('Anmelden','Sign in')} <ArrowUpRight size={16}/></button><button className="lp-hamburger" onClick={()=>setMobile(!mobile)} aria-label="Toggle menu">{mobile?<X/>:<Menu/>}</button></div>
   </nav>
   <main>
    <section className="lp-hero"><div className="lp-hero-copy"><div className="lp-eyebrow"><span className="lp-pulse"/> BY PIOVATION</div>
     <h1 className="lp-v30-title lp-v324-title">The AI-Native<br/><span>Enterprise Workspace</span><span className="lp-v324-title-sub"> {t('mit digitaler Belegschaft.','with a Digital Workforce.')}</span></h1>
     <p className="lp-lead lp-v30-lead">{t('Ein KI-nativer Arbeitsplatz, an dem Menschen und digitale Mitarbeiter gemeinsam Anwendungen, Daten und Geschäftsprozesse steuern.','One AI-native workspace where people and digital employees work together across applications, data and business processes.')}</p>
     <div className="lp-hero-actions lp-hero-actions-v30"><button className="lp-cta" onClick={onDemo}>{t('Kostenlose Demo starten','Try the demo')} <ArrowUpRight size={19}/></button><button className="lp-secondary lp-hero-signup" onClick={onRegister}>{t('Registrieren','Sign up')} <ArrowRight size={18}/></button><button className="lp-secondary lp-hero-signin" onClick={onLogin}>{t('Anmelden','Sign in')}</button></div>
     {!configured&&<div className="lp-setup-note"><LockKeyhole size={15}/> {t('Keycloak-Zugang muss vor dem produktiven Betrieb eingerichtet werden. Die Demo kann sofort getestet werden.','Configure Keycloak for real accounts. The demo is available now.')}</div>}
     <div className="lp-hero-footer"><span className="lp-small-dash"/>{t('ENTWICKELT FÜR EINE NEUE ART ZU ARBEITEN','BUILT FOR A NEW WAY OF WORKING')}</div>
    </div>
    <div className="lp-visual" aria-label="PioOne Workspace preview">
      <div className="lp-window">
        <div className="lp-window-top"><div className="lp-window-dots"><i/><i/><i/></div><span>workspace.pioone</span><span className="lp-visual-signal">● {t('ÜBERSICHT','OVERVIEW')}</span></div>
        <div className="lp-window-body">
        <aside className="lp-mini-sidebar">
        <div className="lp-mini-logo lp-mini-text-brand">PioOne</div>
        <div className="lp-mini-selected"><Layers3 size={17}/></div><BrainCircuit size={17}/><FolderOpen size={17}/><CalendarDays size={17}/><Mail size={17}/>
        <div className="lp-mini-avatar">P</div></aside>
        <div className="lp-mini-main">
        <div className="lp-mini-heading"><span>{t('Guten Morgen!','Good morning!')}</span>
        <div className="lp-mini-status"><span className="lp-status-dot"/>{t('Alles im Blick','All on track')}</div></div><p>{t('Dein Arbeitstag, intelligent organisiert.','Your workday, intelligently organized.')}</p>
        <div className="lp-mini-stat-row">
        <div className="lp-mini-stat"><small>{t('Offene Aufgaben','Open tasks')}</small><strong>08</strong><span>↘ 12%</span></div>
        <div className="lp-mini-stat"><small>{t('Digitale Mitarbeiter','Digital workers')}</small><strong>12</strong><span>{t('Aktiv','Active')}</span></div>
        <div className="lp-mini-stat"><small>{t('Freigaben','Approvals')}</small><strong>03</strong><span>{t('Prüfen','Review')}</span></div></div>
        <div className="lp-mini-columns">
        <div className="lp-mini-card">
        <div className="lp-mini-card-header"><b><Sparkles size={15}/> Mein Assistent · Briefing</b><span>•••</span></div>
        <div className="lp-mini-work"><span className="lp-work-circle"><Check size={14}/></span><div><strong>{t('Rechnungen vorbereitet','Invoices prepared')}</strong><small>PioPost · 4 {t('Dokumente','documents')}</small></div></div>
        <div className="lp-mini-work"><span className="lp-work-circle purple"><BrainCircuit size={14}/></span><div><strong>{t('Angebote zur Prüfung','Quotes awaiting review')}</strong><small>Sales Worker · 2 {t('Freigaben','approvals')}</small></div></div>
        <div className="lp-mini-work"><span className="lp-work-circle blue"><CalendarDays size={14}/></span><div><strong>{t('Meeting-Briefing erstellt','Meeting briefing ready')}</strong><small>Meeting Worker · 09:30</small></div></div></div>
        <div className="lp-mini-card lp-mini-team">
        <div className="lp-mini-card-header"><b>{t('Dein Team','Your team')}</b><span>↗</span></div><div className="lp-digital-avatar"><Sparkles size={18}/></div><strong>{t('Digitale Belegschaft','Digital workforce')}</strong><small>{t('Arbeitet mit deinem Team','Working alongside your team')}</small>
        <div className="lp-mini-online"><span/> 12 {t('digitale Mitarbeiter bereit','workers ready')}</div></div></div></div></div></div><div className="lp-float lp-float-one"><span className="lp-float-icon"><Check size={19}/></span><div><strong>{t('Automatisch erledigt','Completed automatically')}</strong><small>{t('Dokument klassifiziert','Document classified')}</small></div></div><div className="lp-float lp-float-two"><span className="lp-float-icon purple"><BrainCircuit size={19}/></span><div><strong>{t('Mein Assistent','My Assistant')}</strong><small>{t('Dein persönlicher KI-Koordinator','Your personal AI coordinator')}</small></div></div></div></section>
    <section className="lp-proof"><span>{t('EINE PLATTFORM FÜR','ONE PLATFORM FOR')}</span><div><b>{t('MENSCHEN','PEOPLE')}</b><span>✳</span><b>{t('DIGITALE MITARBEITER','DIGITAL WORKERS')}</b><span>✳</span><b>{t('ANWENDUNGEN','APPLICATIONS')}</b><span>✳</span><b>{t('DATEN','DATA')}</b></div></section>
    <section className="lp-section" id="platform"><div className="lp-section-top"><span className="lp-index">01 / {t('DEINE VORTEILE','YOUR BENEFITS')}</span><span className="lp-section-line"/></div><div className="lp-section-heading"><h2>{t('Die Vorteile einer digitalen Belegschaft.','The advantages of a digital workforce.')}<br/><em>{t('Einfach. Vernetzt. Intelligent.','Simple. Connected. Intelligent.')}</em></h2><p>{t('Weniger Wechsel zwischen Tools, schnellere Abläufe und klare Verantwortung – Menschen und digitale Mitarbeiter arbeiten Hand in Hand.','Fewer tool switches, faster workflows and clear responsibility – people and digital employees work side by side.')}</p></div><div className="lp-feature-grid">{features.map((f,i)=><article className="lp-feature" key={f.title}><span className="lp-feature-number">0{i+1}</span><div className="lp-feature-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p><span className="lp-feature-arrow"><ArrowUpRight size={18}/></span></article>)}</div></section>
    <section className="lp-v32-apps" id="workspace-apps" aria-label={t('Workspace Anwendungen','Workspace applications')}>
      <div className="lp-v32-apps-heading"><span className="lp-index">02 / PIOONE WORKSPACE</span><h2>{t('Ein Workspace. Alle Anwendungen.','One workspace. Every application.')}</h2><p>{t('Von Kommunikation und DMS bis CRM, Projekte und Finanzen: Alle Anwendungen an einem Ort. Einige Funktionen sind derzeit Demo oder geplant.','Explore applications for people and digital employees. These tiles represent product areas; some are demos or planned.')}</p></div>
      <div className="lp-v32-app-grid lp-v32-app-grid-featured">
        <button type="button" className="lp-v32-app-tile lp-v32-assistant-tile" onClick={onDemo} title={t('Mein Assistent in der Demo öffnen','Open My Assistant in demo')}>
          <span className="lp-v32-assistant-title"><span aria-hidden="true">✦</span><b>{t('Mein Assistent','My Assistant')}</b></span>
          <span className="lp-v32-assistant-description">{t('Dein persönlicher Einstieg in den Arbeitstag','Your personal starting point for the workday')}</span>
          <span className="lp-v32-assistant-functions"><span>{t('Tagesbriefing','Daily briefing')}</span><span>{t('Meine Aufgaben','My tasks')}</span><span>{t('Freigaben','Approvals')}</span><span>{t('Aktivitäten','Activities')}</span></span>
        </button>
        <button type="button" className="lp-v32-app-tile lp-v32-dms-tile" onClick={onDemo} title={t('Dateien & DMS in Demo öffnen','Open Files & DMS in demo')}>
          <span aria-hidden="true">▤</span><b>{t('Dateien & DMS','Files & DMS')}</b>
          <small>{t('Meine Dateien · Teamordner · PioPost','My files · Team folders · PioPost')}</small>
        </button>
        {[
          ['✉',t('E-Mail','Email')],['▦',t('Kalender','Calendar')],['☑',t('Aufgaben','Tasks')],['◈','CRM'],['▣',t('Projekte','Projects')],['◉',t('Finanzen','Finance')],['♙','HR'],['✈','Travel'],['⌘',t('Workflows','Workflows')]
        ].map(([icon,name])=><button type="button" key={name} className="lp-v32-app-tile" onClick={onDemo} title={t('Demo öffnen','Open demo')}><span aria-hidden="true">{icon}</span><b>{name}</b></button>)}
      </div>
      <div className="lp-v32-workforces"><article><UsersRound size={30}/><div><h3>{t('Menschliche Belegschaft','Human Workforce')}</h3><p>{t('Geschäftsführung, Teams und Fachabteilungen. Verantwortlich für Entscheidungen und Freigaben.','Leadership, teams and departments. Accountable for decisions and approvals.')}</p></div></article><article><BrainCircuit size={30}/><div><h3>{t('Digitale Belegschaft','Digital Workforce')}</h3><p>{t('Persönliche und spezialisierte digitale Mitarbeiter unterstützen Geschäftsprozesse – im Rahmen ihrer Berechtigungen.','Personal and specialist digital employees support workflows within delegated permissions.')}</p></div></article></div>
      <button className="lp-cta lp-v32-demo-cta" onClick={onDemo}>{t('Workspace ausprobieren','Explore workspace')} <ArrowUpRight size={18}/></button>
    </section>
    <section className="lp-workforce-section" id="digital-workforce" aria-labelledby="lp-workforce-heading">
      <div className="lp-workforce-description">
        <span className="lp-index">{t('DIE PIOONE PLATTFORM','THE PIOONE PLATFORM')}</span>
        <h2 id="lp-workforce-heading">{t('Digitale Belegschaft','Digital Workforce')}</h2>
        <p>{t('PioOne verbindet menschliche und digitale Mitarbeiter in einem gemeinsamen, KI-nativen Unternehmens-Workspace. Anwendungen, Daten und Geschäftsprozesse bleiben unter einer einheitlichen Steuerung.','PioOne connects human and digital employees in one AI-native enterprise workspace, bringing applications, data and business processes under unified orchestration.')}</p>
        <ul><li><Check size={18}/>{t('Menschen und Digitale Mitarbeiter arbeiten zusammen','People and digital employees work together')}</li><li><Check size={18}/>{t('Enterprise-Anwendungen und Daten integriert','Business applications and data integrated')}</li><li><Check size={18}/>{t('Kontrollierte Workflows und Freigaben','Governed workflows and approvals')}</li></ul>
      </div>
      <figure className="lp-architecture-figure"><img src="/pioone-platform-architecture.png" alt="PioOne Plattformarchitektur: PioVation Cloud, Daten, PioOne Plattform, Enterprise-Anwendungen, Digitale Mitarbeiter und Anwender" loading="lazy"/><figcaption>{t('PioOne Plattformarchitektur · Referenzdiagramm','PioOne platform architecture · reference diagram')}</figcaption></figure>
    </section>

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
    <section className="lp-documentation-teaser" id="documentation"><div className="lp-documentation-icon"><BookOpen size={34}/></div><div><span className="lp-index">PIOONE KNOWLEDGE CENTER</span><h2>{t('Dokumentation','Documentation')}</h2><p>{t('Spezifikationen – immer nur die aktuelle Version. Weitere Inhalte: Architektur, User Guides, Produktbriefe, Bilder und KMU-Funktionsmatrix. Die interne Bibliothek ist im Workspace erreichbar.','Specifications – latest version only. Also architecture, user guides, product briefs, images and the SME function matrix. The internal library is available in the workspace.')}</p></div><button type="button" className="lp-doc-action" onClick={onLogin}>{t('Zur Dokumentation','Open documentation')} <ArrowUpRight size={18}/></button></section>
    <section className="lp-dark-section" id="how"><div><span className="lp-index">02 / {t('EIN NEUES ARBEITSMODELL','A NEW WAY OF WORKING')}</span><h2>{t('Nicht nur Software.','Not just software.')}<br/><em>{t('Ein intelligentes Team.','An intelligent team.')}</em></h2><p>{t('Menschen entscheiden. Digitale Mitarbeiter unterstützen, verarbeiten und automatisieren – innerhalb definierter Berechtigungen und Freigaben.','Humans stay in control. Digital workers assist, process and automate – within defined permissions and approval steps.')}</p><a href="#platform" className="lp-white-link">{t('Funktionen entdecken','Explore capabilities')} <ArrowUpRight size={17}/></a></div><div className="lp-flow"><div><span><UsersRound size={23}/></span><strong>{t('Menschen','People')}</strong><small>{t('Entscheiden & führen','Decide & lead')}</small></div><span className="lp-flow-connector">↕</span><div><strong>PioOne</strong><small>{t('Verbinden & koordinieren','Connect & coordinate')}</small></div><span className="lp-flow-connector">↕</span><div><span><BrainCircuit size={23}/></span><strong>{t('Digitale Mitarbeiter','Digital Workers')}</strong><small>{t('Unterstützen & ausführen','Assist & execute')}</small></div></div></section>
    <section className="lp-security" id="security"><div className="lp-sec-icon"><LockKeyhole size={35}/></div><div><span className="lp-index">03 / SECURITY FIRST</span><h2>{t('Zugriff unter Kontrolle.','Access under control.')}</h2><p>{t('Single Sign-On mit Keycloak, moderne Anmeldeverfahren und klar getrennte Rollen. Die endgültige Durchsetzung von Rechten erfolgt durch die produktiven Backend-Services.','Single sign-on with Keycloak, modern sign-in flows and clearly scoped roles. Production backend services must enforce access permissions.')}</p></div><div className="lp-sec-badges"><span><Check size={14}/> OpenID Connect</span><span><Check size={14}/> PKCE</span><span><Check size={14}/> Keycloak SSO</span></div></section>
    <section className="lp-cta-section" id="contact"><span className="lp-index">{t('DEIN ARBEITSPLATZ. NEU GEDACHT.','YOUR WORKSPACE. REIMAGINED.')}</span><h2>{t('Bereit für die Zukunft','Ready for the future')}<br/>{t('der Arbeit?','of work?')}</h2><p>{t('Ein Einstiegspunkt. Dein gesamtes Unternehmen.','One starting point. Your entire business.')}</p><button onClick={onLogin}>{t('Jetzt anmelden','Sign in now')} <ArrowUpRight size={20}/></button></section>
   </main><footer className="lp-footer"><div className="lp-logo lp-official-brand"><img src="/logo.png" alt="PioVation" className="lp-official-logo"/><span className="lp-product-name">PioOne</span></div><span>© {new Date().getFullYear()} PioOne · PioVation</span><a href="#top">{t('Nach oben','Back to top')} ↑</a></footer>
 </div>
}
