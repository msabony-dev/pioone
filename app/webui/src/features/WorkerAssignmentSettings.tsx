import React,{useState} from 'react';
import {useWorkspace} from '../stores/WorkspaceStore';
import {useLanguage} from '../locales/i18n';
import type {Worker} from './WorkerSettings';
import {DIGITAL_WORKER_CATEGORIES,DIGITAL_WORKER_DESCRIPTIONS} from './digitalWorkerCatalog';
/** Bind functional DW roles to a worker runtime definition (not CRM/ERP modules). */
export function WorkerAssignmentSettings(){
 const {t,language}=useLanguage();const {workerState,saveWorkers,admin,platform,go}=useWorkspace();
 const editable=admin||platform;const [filter,setFilter]=useState('');const [group,setGroup]=useState('All');
 const catalog=workerState.workers.filter(w=>w.name==='My Assistant'||w.name.startsWith('DW-')||w.id.startsWith('worker-'));
 const runtimes=workerState.workers.filter(w=>!w.id.startsWith('catalog:')&&w.name!=='My Assistant');
 const category=(name:string)=>DIGITAL_WORKER_CATEGORIES.find(g=>g.workers.some(n=>n===name))?.name||'Custom';
 const setRuntime=(w:Worker,workerId:string)=>saveWorkers({...workerState,workers:workerState.workers.map(x=>x.id===w.id?{...x,runtimeWorkerId:workerId}:x)});
 const setStatus=(w:Worker,status:'active'|'deactivated')=>saveWorkers({...workerState,workers:workerState.workers.map(x=>x.id===w.id?{...x,status}:x)});
 return <section className="card"><h2>{t('DW runtime bindings')}</h2><p>{t('Select an available worker implementation for each digital worker role. My Assistant remains in its own sidebar section.')}</p>
 {!editable&&<p>{t('Only administrators can change worker assignments.')}</p>}
 <div className="worker-toolbar"><input aria-label={t('Search workers')} placeholder={t('Search workers')} value={filter} onChange={e=>setFilter(e.target.value)}/><select value={group} onChange={e=>setGroup(e.target.value)} aria-label={t('Category')}><option value="All">{t('All categories')}</option>{DIGITAL_WORKER_CATEGORIES.map(c=><option key={c.name} value={c.name}>{t(c.name)}</option>)}<option value="Custom">{t('Custom')}</option></select></div>
 <div className="worker-table-wrap"><table className="worker-table"><thead><tr><th>{t('Digital worker')}</th><th>{t('Status')}</th><th>{t('Connected worker')}</th><th>{t('Runtime state')}</th><th>{t('Actions')}</th></tr></thead><tbody>{catalog.filter(w=>(group==='All'||category(w.name)===group)&&(w.name+' '+(w.description||'')).toLowerCase().includes(filter.toLowerCase())).map(w=>{const runtime=runtimes.find(r=>r.id===w.runtimeWorkerId);const published=runtime?.releases.some(r=>r.status==='Published'&&!!r.endpoint);return <tr key={w.id}><td><b>{w.name}</b><small>{w.description||DIGITAL_WORKER_DESCRIPTIONS[w.name]?.[language]||t(category(w.name))}</small></td><td><select disabled={!editable} value={w.status||'deactivated'} onChange={e=>setStatus(w,e.target.value as 'active'|'deactivated')} aria-label={t('Status')+' '+w.name}><option value="active">{t('Active')}</option><option value="deactivated">{t('Deactivated')}</option></select></td><td><select disabled={!editable} value={w.runtimeWorkerId||''} onChange={e=>setRuntime(w,e.target.value)} aria-label={t('Connected worker')+' '+w.name}><option value="">{t('Unassigned')}</option>{runtimes.filter(r=>r.id!==w.id).map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></td><td><span className={'dw-status '+(published?'active':'deactivated')}>{!runtime?t('Not connected'):published?t('Endpoint configured'):t('No published endpoint')}</span></td><td><button className="outline" type="button" onClick={()=>go('Assistants',w.name==='My Assistant'?'DWs':w.name)}>{t('Edit')}</button></td></tr>})}</tbody></table></div>
 <p><small>{t('Demo configuration only. Connecting a runtime does not start or deploy it. Secrets belong in a server-side vault.')}</small></p></section>;
}
