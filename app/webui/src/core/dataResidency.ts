/** Pure V27 configuration model. No connection is opened, no data is migrated. */
export type DeploymentMode='cloud'|'hybrid'|'onprem';
export type DatabaseProvider='piovation-pg'|'customer-pg'|'managed-pg';
export type DocumentProvider='piovation-s3'|'customer-s3'|'customer-nas'|'onedrive';
export type KnowledgeLocation='piovation'|'customer';
export type WorkerLocation='piovation'|'customer';
export type DataResidencyPlan={
  id:string;deployment:DeploymentMode;database:DatabaseProvider;databaseEndpointRef:string;
  documents:DocumentProvider;documentLocationRef:string;knowledge:KnowledgeLocation;workers:WorkerLocation;
  privateGateway:boolean;region:string;tenantId:string;createdAt:string;status:'draft';
};
export type MigrationScope='database'|'documents'|'knowledge'|'workers';
export type MigrationPlan={id:string;from:DataResidencyPlan;to:DataResidencyPlan;scopes:MigrationScope[];requestedBy:string;reason:string;steps:string[];status:'draft';};
export const supportedDatabases=[{id:'piovation-pg',label:'PioVation-managed PostgreSQL'},{id:'customer-pg',label:'Customer-hosted PostgreSQL'},{id:'managed-pg',label:'Approved managed PostgreSQL'}] as const;
export const supportedDocuments=[{id:'piovation-s3',label:'PioVation object storage'},{id:'customer-s3',label:'Customer S3-compatible storage'},{id:'customer-nas',label:'Customer NAS / managed file gateway'},{id:'onedrive',label:'OneDrive / SharePoint document connector'}] as const;
export function defaultResidency(tenantId:string):DataResidencyPlan{return {id:'residency-default',deployment:'cloud',database:'piovation-pg',databaseEndpointRef:'',documents:'piovation-s3',documentLocationRef:'',knowledge:'piovation',workers:'piovation',privateGateway:false,region:'Munich, Germany (target)',tenantId,createdAt:'',status:'draft'};}
export function validateResidency(p:DataResidencyPlan):string[]{const errors:string[]=[];
 if(!p.tenantId.trim())errors.push('Tenant identifier required');
 if(p.deployment==='onprem'&&(p.database==='piovation-pg'||p.documents==='piovation-s3'||p.knowledge!=='customer'||p.workers!=='customer'))errors.push('Fully local deployment requires customer-hosted database, documents, knowledge, and worker execution');
 if(p.deployment==='hybrid'&&p.database!=='piovation-pg'&&!p.privateGateway)errors.push('Hybrid customer database requires private gateway connectivity');
 if(p.database!=='piovation-pg'&&!p.databaseEndpointRef.trim())errors.push('Customer database requires a registered service reference');
 if(['customer-s3','customer-nas','onedrive'].includes(p.documents)&&!p.documentLocationRef.trim())errors.push('External documents require a destination/connector reference');
 if(p.documents==='onedrive'&&p.deployment==='onprem')errors.push('Fully isolated/air-gapped mode cannot depend on OneDrive');
 if(p.deployment==='onprem'&&p.region.toLowerCase().includes('munich'))errors.push('Set the customer-site location for on-prem deployment');
 return errors;}
export function assessSovereignty(p:DataResidencyPlan):string[]{const messages:string[]=[];
 if(p.database!=='piovation-pg')messages.push('Database data stays with the selected PostgreSQL operator, but API payloads may still cross the network');
 if(p.documents==='onedrive')messages.push('OneDrive is a document connector, not PostgreSQL, S3-compatible primary object store, or WAL/PITR destination');
 if(p.knowledge==='piovation'&&(p.database!=='piovation-pg'||p.documents!=='piovation-s3'))messages.push('Cloud-hosted PioBrain may receive extracted or retrieved customer data');
 if(p.workers==='piovation'&&p.deployment!=='cloud')messages.push('Cloud-hosted PioWorker/DCOS may process customer information remotely');
 if(p.deployment==='onprem')messages.push('Air-gap is possible only when identity, inference, model updates, connectors and all services work without public internet');
 return messages;}
export const migrationSteps=[
 'Discover dataset and legal/retention requirements; approve scope and target',
 'Validate PostgreSQL compatibility, gateway, throughput, available space and keys',
 'Capture source backup, schema version, document manifest and worker checkpoints',
 'Transfer encrypted database and immutable document revisions to destination',
 'Synchronize changes; perform object checksum, record count and relationship validation',
 'Rebuild or verify PioBrain indexes within the agreed processing location',
 'Quiesce writes and queues; perform final transaction/document synchronization',
 'Switch endpoint via controlled configuration release and test tenant-scoped APIs',
 'Confirm DCOS/worker resumability, audit consistency and read/write permissions',
 'Approve cutover, retain rollback copy, document completion and monitoring'
];
export function buildMigration(from:DataResidencyPlan,to:DataResidencyPlan,scopes:MigrationScope[],reason:string):{errors:string[];plan:MigrationPlan}{
 const errors=[...validateResidency(to)];if(!scopes.length)errors.push('Select at least one migration scope');if(!reason.trim())errors.push('Change ticket or migration reason required');
 if(from.tenantId!==to.tenantId)errors.push('Cross-tenant migration is not supported by this planner');
 if(from.database!==to.database&&!scopes.includes('database'))errors.push('Database destination change requires database migration');
 if(from.documents!==to.documents&&!scopes.includes('documents'))errors.push('Document destination change requires document migration');
 if(from.knowledge!==to.knowledge&&!scopes.includes('knowledge'))errors.push('Knowledge location change requires index/knowledge migration');
 if(from.workers!==to.workers&&!scopes.includes('workers'))errors.push('Worker location change requires workflow-state migration');
 return {errors,plan:{id:'migration-draft',from,to,scopes,requestedBy:'admin (demo)',reason,steps:migrationSteps,status:'draft'}};}
