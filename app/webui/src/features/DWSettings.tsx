import React,{useState} from 'react';
import {useLanguage} from '../locales/i18n';
import {WorkerAssignmentSettings} from './WorkerAssignmentSettings';
import {DigitalPositions} from './DigitalPositions';
import './digitalWorkersOverview.css';
type Subview='assignments'|'positions';
export function DWSettings(){
 const {t}=useLanguage();const [view,setView]=useState<Subview>('assignments');
 return <div className="dw-page"><section className="hero"><small>{t('Digital Workers (DW)')}</small><h2>{t('DW Settings')}</h2><p>{t('Manage worker assignments and digital positions. Create and version workers in the separate Worker Factory tab.')}</p></section>
 <div className="dw-subtabs" role="tablist" aria-label={t('DW Settings')}>
 {([['assignments','Worker assignments'],['positions','Digital positions']] as const).map(([id,name])=><button key={id} type="button" role="tab" aria-selected={view===id} className={view===id?'active':''} onClick={()=>setView(id)}>{t(name)}</button>)}
 </div>
 {view==='assignments'?<WorkerAssignmentSettings/>:<DigitalPositions/>}
 <p className="dw-note">{t('Local demonstration only. Worker configuration does not deploy a production runtime.')}</p></div>;
}
