import React, {useEffect, useState} from 'react';
import './landing.css';
import {EndUserGuide} from './EndUserGuide';

type Language = 'de' | 'en';
const copy = {
 de: {
  product:'Produkt',benefits:'Vorteile',applications:'Anwendungen',workforce:'Digitale Belegschaft',architecture:'Architektur',demo:'Demo starten',login:'Anmelden',docs:'Dokumentation',
  eyebrow:'PIOONE · BY PIOVATION',title:'Das KI-native Unternehmensbetriebssystem',
  slogan:'Eine Plattform. Alle Anwendungen. Eine digitale Belegschaft.',
  intro:'PioOne verbindet Menschen, digitale Mitarbeiter, Unternehmensanwendungen, Daten und Geschäftsprozesse in einer einheitlichen Arbeitsumgebung.',
  discover:'Vorteile entdecken', benefitTitle:'Ein Betriebssystem für das gesamte Unternehmen',benefitIntro:'Statt Insellösungen: ein zentraler Arbeitsraum, der tägliche Arbeit und Geschäftsprozesse zusammenführt.',
  benefitCards:[['Einheitliche Arbeitsumgebung','Ein Arbeitsplatz für Teams, Führungskräfte und digitale Mitarbeiter.'],['Digitale Belegschaft','Digitale Mitarbeiter unterstützen Fachabteilungen, bearbeiten Aufgaben und bereiten Freigaben vor.'],['Vernetzte Prozesse','Geschäftsprozesse verbinden Anwendungen, Daten und zuständige Personen.'],['Kontrolle & Governance','Identitäten, Berechtigungen und menschliche Freigaben als gemeinsame Leitplanken.']],
  appsTitle:'Ein Workspace. Alle Anwendungen.',appsIntro:'CRM, HR, Projekte, Kommunikation, Dateien & DMS und weitere Fachsysteme — in einem konsistenten Arbeitsumfeld.',
  workforceTitle:'Menschen und digitale Mitarbeiter. Ein Team.', workforceIntro:'PioOne organisiert die Zusammenarbeit zwischen Menschen und digitalen Mitarbeitern über Abteilungen, Anwendungen und Prozesse hinweg.',
  diagramTitle:'Die PioOne-Plattform im Überblick', diagramSubtitle:'Unternehmensanwendungen, digitale Mitarbeiter, Daten und Cloud-Betrieb im Zusammenspiel.',
  docsTitle:'Produktdokumentation',docsBody:'Architektur, Produktbriefe und Spezifikationen. In der Kategorie Spezifikationen soll nur die jeweils aktuelle Version angeboten werden.',
  footer:'PioOne · KI-natives Unternehmensbetriebssystem', demoNote:'Lokaler Demo-Workspace ohne produktive Anmeldung',
 },
 en:{
  product:'Product',benefits:'Benefits',applications:'Applications',workforce:'Digital Workforce',architecture:'Architecture',demo:'Try demo',login:'Sign in',docs:'Documentation',
  eyebrow:'PIOONE · BY PIOVATION',title:'The AI-Native Enterprise Operating System',
  slogan:'One platform. All applications. One digital workforce.',
  intro:'PioOne brings people, digital workers, enterprise applications, data and business processes together in one unified workspace.',discover:'Explore benefits',
  benefitTitle:'One operating system for your enterprise',benefitIntro:'Move beyond disconnected tools: a central workspace that unites daily work and end-to-end processes.',
  benefitCards:[['Unified workspace','One place for teams, leadership and digital workers.'],['Digital workforce','Digital workers help departments handle tasks and prepare approvals.'],['Connected processes','Enterprise workflows connect applications, data and accountable people.'],['Control & governance','Identity, permissions and human approvals provide shared guardrails.']],
  appsTitle:'One Workspace. All Applications.',appsIntro:'CRM, HR, projects, communications, files & DMS and other enterprise systems — together in one workspace.',
  workforceTitle:'People and digital workers. One team.', workforceIntro:'PioOne coordinates people and digital workers across departments, enterprise applications and workflows.',
  diagramTitle:'The PioOne platform at a glance',diagramSubtitle:'Applications, digital workers, data and cloud operations working together.',
  docsTitle:'Product documentation',docsBody:'Architecture, product briefs and specifications. Only the current specification version should be listed.',
  footer:'PioOne · AI-Native Enterprise Operating System', demoNote:'Local demo workspace without production authentication',
 }
} as const;

export function LandingPage({onDemo,onLogin,onRegister}:{onDemo:()=>void;onLogin:()=>void;onRegister:()=>void}) {
 const [lang,setLang]=useState<Language>(()=>{try{return localStorage.getItem('pio19-language')==='en'?'en':'de'}catch{return 'de'}});
 const t=copy[lang];
 useEffect(()=>{try{localStorage.setItem('pio19-language',lang)}catch{}document.documentElement.lang=lang},[lang]);
 return <div className="pio-landing">
   <header className="pl-top"><a className="pl-brand" href="/" aria-label="PioVation – Startseite"><img src="/logo.png" alt="PioVation"/></a>
    <nav aria-label={lang==='de'?'Hauptnavigation':'Main navigation'}><a href="#vorteile">{t.benefits}</a><a href="#anwendungen">{t.applications}</a><a href="#belegschaft">{t.workforce}</a><a href="#architektur">{t.architecture}</a><a href="#end-user-guide">{lang==='de'?'Für Anwender':'For users'}</a></nav>
    <div className="pl-actions"><button className="pl-lang" onClick={()=>setLang(lang==='de'?'en':'de')} aria-label="Change language">{lang==='de'?'EN':'DE'}</button><button className="pl-outline" onClick={onLogin}>{t.login}</button><button className="pl-primary" onClick={onDemo}>{t.demo}</button></div>
   </header>
   <main id="top">
    <section className="pl-hero"><div className="pl-container pl-hero-grid"><div className="pl-copy"><p className="pl-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="pl-tagline">{t.slogan}</p><p className="pl-intro">{t.intro}</p><div className="pl-buttons"><button className="pl-primary pl-big" onClick={onDemo}>{t.demo} <span aria-hidden>↗</span></button><a className="pl-secondary pl-big" href="#vorteile">{t.discover} ↓</a></div><small>{t.demoNote}</small></div><div className="pl-hero-art" aria-hidden="true"><div className="pl-orbit pl-orbit-a"/><div className="pl-orbit pl-orbit-b"/><div className="pl-visual-card"><span>01</span><strong>Workspace</strong><i/></div><div className="pl-visual-card"><span>02</span><strong>Applications</strong><i/></div><div className="pl-visual-card"><span>03</span><strong>Digital Workforce</strong><i/></div><div className="pl-visual-core">PioOne</div></div></div></section>
    <section className="pl-section" id="vorteile"><div className="pl-container"><p className="pl-section-tag">01 — {t.benefits}</p><h2>{t.benefitTitle}</h2><p className="pl-lead">{t.benefitIntro}</p><div className="pl-cards">{t.benefitCards.map(([name,desc],i)=><article className="pl-card" key={name}><div className="pl-number">0{i+1}</div><h3>{name}</h3><p>{desc}</p></article>)}</div></div></section>
    <section className="pl-section pl-apps-section" id="anwendungen"><div className="pl-container"><p className="pl-section-tag">02 — {t.applications}</p><h2>{t.appsTitle}</h2><p className="pl-lead">{t.appsIntro}</p><div className="pl-module-grid">{['My Assistant',lang==='de'?'Kommunikation':'Communication','CRM','ERP','HR',lang==='de'?'Projekte':'Projects',lang==='de'?'Dateien & DMS':'Files & DMS','PioPost','PioBrain','Travel',lang==='de'?'Digitale Mitarbeiter':'Digital Workers','Workflows'].map(x=><span key={x}>{x}</span>)}</div></div></section>
    <section className="pl-section" id="belegschaft"><div className="pl-container pl-workforce"><div><p className="pl-section-tag">03 — {t.workforce}</p><h2>{t.workforceTitle}</h2><p className="pl-lead">{t.workforceIntro}</p></div><div className="pl-worker-cards"><div><b>DCOS</b><span>My Assistant</span></div><div><b>DW</b><span>{lang==='de'?'Spezialisten':'Specialists'}</span></div><div><b>↗</b><span>{lang==='de'?'Prozesse':'Processes'}</span></div></div></div></section>
    <section className="pl-section pl-diagram-section" id="architektur"><div className="pl-container"><p className="pl-section-tag">04 — {t.architecture}</p><h2>{t.diagramTitle}</h2><p className="pl-lead">{t.diagramSubtitle}</p><div className="pl-diagram"><img src="/pioone-platform-architecture.png" alt="PioOne Plattformarchitektur: Anwender, digitale Mitarbeiter, Enterprise-Anwendungen, PioOne-Plattform, Daten und PioVation Cloud München" loading="lazy"/></div></div></section>
    <EndUserGuide language={lang}/><section className="pl-section pl-last" id="documentation"><div className="pl-container pl-bottom"><div><p className="pl-section-tag">{t.docs}</p><h2>{t.docsTitle}</h2><p>{t.docsBody}</p></div><div className="pl-buttons"><button onClick={onLogin} className="pl-primary">{t.docs}</button><button onClick={onRegister} className="pl-outline">{lang==='de'?'Registrieren':'Sign up'}</button></div></div></section>
   </main><footer className="pl-footer"><div className="pl-container"><span>© PioVation</span><span>{t.footer}</span></div></footer>
  </div>;
}
