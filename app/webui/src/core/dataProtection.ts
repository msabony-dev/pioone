/** PioOne V27: pure, frontend-only data-protection planning model.
 * No backup, cloud connection or restore is performed by this module. */
export type DestinationKind='local'|'nas'|'s3'|'onedrive'|'remote'|'offline';
export type BackupScope='platform'|'database'|'documents'|'knowledge'|'workers'|'config'|'module';
export type Destination={id:string;name:string;kind:DestinationKind;endpoint:string;status:'unverified'|'validated-demo';immutable:boolean;encrypted:boolean;createdAt:string};
export type Policy={id:string;name:string;targetId:string;scopes:BackupScope[];frequency:'hourly'|'daily'|'weekly';retentionDays:number;pitr:boolean;enabled:boolean};
export type RecoveryPoint={id:string;createdAt:string;appRelease:string;schemaVersion:string;workerVersion:string;scope:BackupScope[];destinationId:string;manifestHash:string;verification:'verified-demo'|'needs-verification'|'failed';type:'scheduled'|'manual'};
export type RestoreMode='isolated'|'production';
export type RestorePlan={recoveryPointId:string;mode:RestoreMode;scopes:BackupScope[];appRelease:string;confirmedCompatibility:boolean;secondApprover:string;reason:string};
export type ProtectionState={destinations:Destination[];policies:Policy[];points:RecoveryPoint[];history:{id:string;action:string;when:string;detail:string}[]};
export const destinationKinds:{kind:DestinationKind;label:string;hint:string}[]=[
 {kind:'local',label:'Local SSD / HDD',hint:'Agent-managed mounted volume; not an off-site backup'},
 {kind:'nas',label:'NAS / network drive',hint:'NFS or SMB share accessed by a dedicated backup agent'},
 {kind:'s3',label:'S3-compatible object storage',hint:'Object-lock capable bucket; preferred durable destination'},
 {kind:'onedrive',label:'Microsoft OneDrive',hint:'Optional encrypted export connector, not primary database PITR'},
 {kind:'remote',label:'Remote data center',hint:'Remote backup gateway and isolated credentials'},
 {kind:'offline',label:'Offline removable media',hint:'Controlled offline rotation for disaster recovery'}
];
export const scopes:BackupScope[]=['platform','database','documents','knowledge','workers','config','module'];
export const releaseCatalog=['PioOne V27','PioOne V26','PioOne V25'];
export function initialProtection():ProtectionState{return {destinations:[],policies:[],points:[],history:[]};}
export function validDestination(d:Pick<Destination,'name'|'endpoint'|'kind'>){return d.name.trim().length>1&&d.endpoint.trim().length>2&&destinationKinds.some(x=>x.kind===d.kind);}
export function validPolicy(p:Policy,s:ProtectionState){return p.name.trim().length>1&&s.destinations.some(x=>x.id===p.targetId)&&p.scopes.length>0&&p.retentionDays>=1&&p.retentionDays<=3650&&(!p.pitr||p.scopes.includes('database'));}
export function assessRestore(plan:RestorePlan,point:RecoveryPoint|undefined):string[]{const errors:string[]=[];if(!point)return ['Unknown recovery point'];if(point.verification!=='verified-demo')errors.push('Recovery point verification required');if(!plan.scopes.length)errors.push('Select at least one component');if(plan.scopes.some(s=>!point.scope.includes(s)))errors.push('Requested component missing from the recovery point');if(plan.appRelease!==point.appRelease&&!plan.confirmedCompatibility)errors.push('Release/schema compatibility must be reviewed');if(plan.mode==='production'&&!plan.secondApprover.trim())errors.push('Independent second approver required');if(!plan.reason.trim())errors.push('Recovery reason required');return errors;}
export function createDemoPoint(targetId:string,appRelease='PioOne V27'):RecoveryPoint{return {id:'rp-'+Date.now(),createdAt:new Date().toISOString(),appRelease,schemaVersion:'demo-schema-v1',workerVersion:'demo-worker-v1',scope:['platform','database','documents','knowledge','workers','config'],destinationId:targetId,manifestHash:'DEMO-NO-BACKUP-CREATED',verification:'needs-verification',type:'manual'};}
export const dataDomains=[
 ['core','Tenant, organizations, users, RBAC'],['party','Accounts, persons, addresses'],['crm','Leads, contacts, opportunities, quotes'],['erp','Orders, procurement, invoices, ledgers'],['projects','Project planning and milestones'],['contracts','PioPakt versions and obligations'],['hr','Personnel records'],['travel','Travel cases and reimbursement'],['public_cases','KiDiS administrative cases'],['dms','Document metadata, folders, ACL, revisions'],['integration','Outbox events, external references'],['audit','Server-side evidence and approvals']
] as const;
