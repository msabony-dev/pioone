import React,{useMemo,useState} from 'react';
import {BrainCircuit,Search,ShieldCheck,CheckCircle2,ArrowRight,BookOpen,Play,FileText,LockKeyhole,RefreshCcw} from 'lucide-react';
import {useWorkspace} from '../stores/WorkspaceStore';
import {useLocal} from '../app/catalog';
import './knowledgeActions.css';

type DemoAction={id:string;name:string;source:string;scope:string;approval:boolean;description:string};
type Request={id:string;action:string;state:'Entwurf'|'Wartet auf Freigabe'|'Freigegeben (Demo)'|'Abgelehnt';created:string};
const actions:DemoAction[]=[
 {id:'summarize',name:'Dokument zusammenfassen',source:'Dateien & DMS',scope:'Freigegebene Demo-Dokumente',approval:false,description:'Fasst eine freigegebene Beispielquelle zusammen, ohne Dateien zu verändern.'},
 {id:'post',name:'Posteingang prüfen',source:'PioPost',scope:'Posteingang (Demo)',approval:false,description:'Öffnet den PioPost-Prozess zum Prüfen eingegangener Dokumente.'},
 {id:'followup',name:'Follow-up vorbereiten',source:'Aufgaben',scope:'Demo-Aufgaben',approval:true,description:'Erstellt nur einen Entwurf; eine echte Aktion benötigt Autorisierung und Worker-Laufzeit.'},
 {id:'invoice',name:'Rechnungsfreigabe vorbereiten',source:'Finanzen / DMS',scope:'Beispielrechnung',approval:true,description:'Bereitet einen Prüfauftrag für den menschlichen Freigabeprozess vor.'},
];
const knowledge=[
 {id:'k1',title:'PioOne – KI-nativer Enterprise Workspace',type:'Produktwissen',summary:'PioOne vereint Anwendungen, Menschen, digitale Mitarbeiter und Prozesse in einem Workspace.'},
 {id:'k2',title:'PioBrain – Wissens- und Aktionsplattform',type:'Plattformwissen',summary:'PioBrain stellt berechtigtes Wissen bereit und kann Aktionen über zugelassene Tools und PioAgent anstoßen.'},
 {id:'k3',title:'PioPost – Posteingang und Rechnungen',type:'Anwendung',summary:'PioPost unterstützt Erfassen, Klassifizieren und Weiterleiten von Post und Eingangsrechnungen.'},
 {id:'k4',title:'Freigabeprozess für digitale Mitarbeiter',type:'Governance',summary:'Verbindliche Aktionen müssen vor Ausführung von den jeweils berechtigten Personen freigegeben werden.'},
];
export function KnowledgeActionsWorkspace(){
 const {prefix,go}=useWorkspace();
 const [query,setQuery]=useState('');const [active,setActive]=useState<'knowledge'|'actions'|'requests'>('knowledge');
 const [requests,setRequests]=useLocal<Request[]>(prefix+'v32:knowledge-actions:requests',[]);
 const results=useMemo(()=>knowledge.filter(k=>(k.title+' '+k.type+' '+k.summary).toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de'))),[query]);
 const prepare=(action:DemoAction)=>{
  if(action.id==='post'){go('Documents','Document Processing/Digital Mailroom');return;}
  const entry:Request={id:'req-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),action:action.name,state:action.approval?'Wartet auf Freigabe':'Entwurf',created:new Date().toLocaleString('de-DE')};
  setRequests([entry,...requests]);setActive('requests');
 };
 const decide=(id:string,state:Request['state'])=>setRequests(requests.map(r=>r.id===id?{...r,state}:r));
 return <div className="ka-page" data-testid="piobrain-knowledge-actions">
  <div className="ka-hero"><div><span className="ka-eyebrow">MEIN ASSISTENT / POWERED BY PIOBRAIN</span><h2><BrainCircuit size={27}/> Wissen & Aktionen</h2><p>Wissen finden, Zusammenhänge verstehen und vorbereitete Aktionen mit menschlicher Kontrolle koordinieren.</p></div><span className="ka-demo">DEMO · Kein produktiver PioBrain-/PioAgent-Zugriff</span></div>
  <div className="ka-boundary"><ShieldCheck size={20}/><span><strong>Klare Zuständigkeiten:</strong> PioBrain ist die Wissens- und Aktionsplattform. Mein Assistent ist dein persönlicher Einstieg. PioAgent führt später ausschließlich autorisierte Aktionen aus. In dieser Version sind die Beispiele lokal simuliert.</span></div>
  <nav className="ka-tabs" aria-label="Wissen und Aktionen"><button className={active==='knowledge'?'selected':''} onClick={()=>setActive('knowledge')}><BookOpen size={17}/> Wissen</button><button className={active==='actions'?'selected':''} onClick={()=>setActive('actions')}><Play size={17}/> Aktionen</button><button className={active==='requests'?'selected':''} onClick={()=>setActive('requests')}><ShieldCheck size={17}/> Anfragen & Freigaben ({requests.length})</button></nav>
  {active==='knowledge'&&<section className="ka-panel"><h3>Wissenssuche</h3><p>Durchsuche ausschließlich die eingebauten Beispielinformationen. Reale Dokumente und private Daten werden nicht indiziert.</p><label className="ka-search"><Search size={18}/><input aria-label="Wissen durchsuchen" placeholder="Wissen suchen, z. B. PioPost oder Governance …" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="ka-list">{results.map(k=><article key={k.id}><FileText size={20}/><div><small>{k.type}</small><h4>{k.title}</h4><p>{k.summary}</p></div></article>)}{!results.length&&<p>Keine Treffer in der Demo-Wissensbasis.</p>}</div><button className="ka-outline" onClick={()=>go('PioBrain','PioBrain')}>Bestehende PioBrain-Oberfläche öffnen <ArrowRight size={16}/></button></section>}
  {active==='actions'&&<section className="ka-panel"><h3>Aktionen vorbereiten</h3><p>Aktionen werden hier nur als Demo-Entwürfe oder Freigabeanfragen angelegt. Es werden keine E-Mails versendet, Buchungen ausgeführt oder Daten geändert.</p><div className="ka-action-grid">{actions.map(a=><article key={a.id}><div className="ka-action-top"><Play size={18}/>{a.approval?<span>Freigabe erforderlich</span>:<span>Demo-Vorbereitung</span>}</div><h4>{a.name}</h4><p>{a.description}</p><small>{a.source} · {a.scope}</small><button onClick={()=>prepare(a)}>{a.id==='post'?'PioPost öffnen':'Vorbereiten'} <ArrowRight size={15}/></button></article>)}</div></section>}
  {active==='requests'&&<section className="ka-panel"><div className="ka-row"><div><h3>Vorbereitete Aktionen und Freigaben</h3><p>Nur lokale Demo-Anfragen. Freigaben bestätigen keine echte Systemaktion.</p></div><button className="ka-outline" onClick={()=>setRequests([])}><RefreshCcw size={15}/> Demo zurücksetzen</button></div><div className="ka-list">{requests.map(r=><article key={r.id}><LockKeyhole size={20}/><div><small>{r.created}</small><h4>{r.action}</h4><p>Status: <strong>{r.state}</strong></p></div>{r.state==='Wartet auf Freigabe'&&<div className="ka-approve"><button onClick={()=>decide(r.id,'Freigegeben (Demo)')}><CheckCircle2 size={15}/> Demo freigeben</button><button onClick={()=>decide(r.id,'Abgelehnt')}>Ablehnen</button></div>}</article>)}{!requests.length&&<p>Keine vorbereiteten Aktionen. Unter „Aktionen“ kannst du einen Demo-Vorgang anlegen.</p>}</div></section>}
  <p className="ka-foot">Produktionsanforderungen: Keycloak-Sitzung, Mandanten-/Objektberechtigungen, PioBrain-Suche mit Quellenprüfung, PioAgent-Tools, persistente Freigaben und unveränderbare Audit-Protokolle. Nichts davon wird durch die Browser-Demo ersetzt.</p>
 </div>;
}
