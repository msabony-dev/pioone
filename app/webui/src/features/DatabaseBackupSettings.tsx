import React,{useState} from 'react';
import {useLanguage} from '../locales/i18n';
import {useWorkspace} from '../stores/WorkspaceStore';
type DatabaseSettings={host:string;port:string;name:string;provider:string};
type BackupSettings={target:string;schedule:string;retention:string;location:string};
const read=<T,>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}};
export function DatabaseBackupSettings(){
 const {t}=useLanguage();const {admin,platform,organization}=useWorkspace();
 const [tab,setTab]=useState<'database'|'backup'>('database');
 const key='pioone-v39-infrastructure-'+organization;
 const [db,setDb]=useState<DatabaseSettings>(()=>read(key+'-db',{host:'',port:'5432',name:'pioone',provider:'PostgreSQL'}));
 const [backup,setBackup]=useState<BackupSettings>(()=>read(key+'-backup',{target:'s3',schedule:'daily',retention:'30',location:''}));
 const [notice,setNotice]=useState('');const editable=admin||platform;
 const save=()=>{if(!editable)return;localStorage.setItem(key+'-db',JSON.stringify(db));localStorage.setItem(key+'-backup',JSON.stringify(backup));setNotice(t('Save local configuration'));};
 const field=(name:string,value:string,update:(value:string)=>void,type='text')=><label>{t(name)}<input type={type} value={value} onChange={e=>update(e.target.value)} disabled={!editable}/></label>;
 return <section className="card" data-testid="database-backup-settings">
  <h2>{t('Database & Backup')}</h2>
  <p>{t('This is a UI preview. No live database or backup connection is established.')}</p>
  <div className="actions" role="tablist" aria-label={t('Database & Backup')}>
   <button role="tab" aria-selected={tab==='database'} className={tab==='database'?'primary':'outline'} onClick={()=>setTab('database')}>{t('Database')}</button>
   <button role="tab" aria-selected={tab==='backup'} className={tab==='backup'?'primary':'outline'} onClick={()=>setTab('backup')}>{t('Backup')}</button>
  </div>
  {tab==='database'?<div role="tabpanel" className="worker-form">
   <h3>{t('Database connection')}</h3>
   <label>{t('Connection method')}<select disabled={!editable} value={db.provider} onChange={e=>setDb({...db,provider:e.target.value})}><option value="PostgreSQL">{t('PostgreSQL (recommended)')}</option></select></label>
   {field('Server',db.host,v=>setDb({...db,host:v}))}
   {field('Port',db.port,v=>setDb({...db,port:v}),'number')}
   {field('Database name',db.name,v=>setDb({...db,name:v}))}
   <small>{t('Connection status')}: {t('Not connected')}</small>
  </div>:<div role="tabpanel" className="worker-form">
   <h3>{t('Backup configuration')}</h3>
   <label>{t('Backup provider')}<select disabled={!editable} value={backup.target} onChange={e=>setBackup({...backup,target:e.target.value})}><option value="s3">{t('S3-compatible storage')}</option><option value="local">{t('Local / on-premises')}</option></select></label>
   {field('Storage location',backup.location,v=>setBackup({...backup,location:v}))}
   <label>{t('Backup schedule')}<select disabled={!editable} value={backup.schedule} onChange={e=>setBackup({...backup,schedule:e.target.value})}><option value="daily">{t('Daily')}</option><option value="weekly">{t('Weekly')}</option><option value="manual">{t('Manual')}</option></select></label>
   {field('Retention (days)',backup.retention,v=>setBackup({...backup,retention:v}),'number')}
  </div>}
  <p><small>{t('Local demo settings only; credentials must be stored in a server-side secrets manager.')}</small></p>
  <div className="actions"><button className="primary" disabled={!editable} onClick={save}>{t('Save local configuration')}</button><button className="outline" disabled title={t('This is a UI preview. No live database or backup connection is established.')}>{t('Test connection')}</button></div>
  {notice&&<p role="status">{notice}</p>}
 </section>;
}
