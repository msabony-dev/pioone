import React,{useState} from 'react';
import {Brain, ExternalLink, RefreshCw, ShieldCheck} from 'lucide-react';
import {useLanguage} from '../locales/i18n';
import {useWorkspace} from '../stores/WorkspaceStore';
export const PIOBRAIN_URL='https://chat.piosphere.ai/';
export function PioBrainWorkspace({compact=false}:{compact?:boolean}) {
  const {language}=useLanguage(); const de=language==='de';
  const {go}=useWorkspace();
  const [revision,setRevision]=useState(0);
  const external=<a className="piobrain-external outline" href={PIOBRAIN_URL} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/>{de?'In neuem Tab öffnen':'Open in new tab'}</a>;
  if(compact)return <section className="card piobrain-compact">
    <h3><Brain size={20}/> PioBrain</h3>
    <p>{de?'Öffnen Sie PioBrain im zentralen Arbeitsbereich, ohne PioOne zu verlassen.':'Open PioBrain in the main workspace without leaving PioOne.'}</p>
    <button className="primary" onClick={()=>go('PioBrain')}>{de?'In PioOne öffnen':'Open inside PioOne'}</button>{external}
  </section>;
  return <section className="piobrain-workspace" aria-label="PioBrain">
    <div className="piobrain-toolbar">
      <div className="piobrain-heading"><Brain size={24}/><div><strong>PioBrain</strong><small>{de?'Wissens- und Aktionsplattform':'Knowledge and action platform'}</small></div></div>
      <div className="actions"><button className="outline" onClick={()=>setRevision(n=>n+1)}><RefreshCw size={16}/>{de?'Neu laden':'Reload'}</button>{external}</div>
    </div>
    <iframe key={revision} className="piobrain-frame" src={PIOBRAIN_URL} title="PioBrain" referrerPolicy="no-referrer" />
    <div className="piobrain-help"><ShieldCheck size={18}/><span>{de?'PioBrain verwaltet Anmeldung und Berechtigungen selbst. Falls die eingebettete Ansicht oder Anmeldung blockiert ist, verwenden Sie „In neuem Tab öffnen“. PioOne bleibt geöffnet.':'PioBrain manages its own authentication and permissions. If the embedded view or sign-in is blocked, use “Open in new tab”. PioOne stays open.'}</span></div>
  </section>;
}
