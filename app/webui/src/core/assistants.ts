export type Trigger='Manual'|'Incoming document'|'Incoming email'|'Schedule';
export type Step={id:string;label:string;kind:'Prepare'|'Review'|'Action'};
export type Assistant={id:string;template:string;name:string;ownerId:string;reviewerId:string;trigger:Trigger;sources:string[];rules:string;steps:Step[];version:number;status:'Draft'|'Active'};
export type Run={id:string;assistantId:string;name:string;version:number;ownerId:string;reviewerId:string;requestedBy:string;createdAt:string;input:string;steps:Step[];status:'Awaiting review'|'Approved'|'Rejected';events:{at:string;actor:string;message:string}[]};
export const sources=['PioBrain','E-mail','Documents','CRM','ERP','Calendar','SharePoint','Specialist systems'];
export const templates=[
{id:'notary',name:'Notary assistant',description:'Prepare deeds and case files',icon:'landmark',steps:['Classify incoming documents','Extract case and participant details','Check completeness against checklist','Prepare deed draft']},
{id:'legal',name:'Legal assistant',description:'Mandates, research and contracts',icon:'scale',steps:['Collect case documents','Summarize relevant facts','Prepare research and draft']},
{id:'tax',name:'Tax assistant',description:'Receipts, deadlines and client files',icon:'calculator',steps:['Classify receipts','Check missing documents','Prepare client file']},
{id:'property',name:'Property assistant',description:'Leases and property administration',icon:'building',steps:['Read tenant correspondence','Identify lease deadlines','Prepare response']},
{id:'sales',name:'Sales assistant',description:'Customers, proposals and follow-ups',icon:'sales',steps:['Gather customer context','Prepare proposal','Draft follow-up']},
{id:'hr',name:'HR assistant',description:'Personnel and onboarding',icon:'users',steps:['Collect onboarding documents','Check completeness','Prepare onboarding checklist']},
{id:'purchase',name:'Purchasing assistant',description:'Suppliers and procurement',icon:'cart',steps:['Compare supplier documents','Prepare purchase request']},
{id:'finance',name:'Finance assistant',description:'Invoices and financial documents',icon:'finance',steps:['Extract invoice metadata','Check against supplied records','Prepare accounting draft']},
{id:'contract',name:'Contract assistant',description:'PioPakt · contracts and deadlines',icon:'contract',steps:['Extract contract clauses','Identify deadlines and risks','Prepare proposed action']},
{id:'document',name:'Document assistant',description:'PioAkte · documents and mail',icon:'files',steps:['Classify document','Extract metadata','Prepare routing proposal']},
{id:'custom',name:'Custom assistant',description:'Define your own role and workflow',icon:'custom',steps:['Prepare task']}
];
export const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
export function fromTemplate(id:string,ownerId:string):Assistant {const t=templates.find(x=>x.id===id)||templates[templates.length-1];return {id:uid(),template:t.id,name:t.name,ownerId,reviewerId:'',trigger:'Manual',sources:['PioBrain'],rules:'',steps:[...t.steps.map(label=>({id:uid(),label,kind:'Prepare' as const})),{id:uid(),label:'Human approval',kind:'Review'},{id:uid(),label:'Prepare next action',kind:'Action'}],version:1,status:'Draft'};}
export function validAssistant(a:Assistant,people:{id:string}[]){const reviews=a.steps.findIndex(s=>s.kind==='Review');return !!a.name.trim()&&people.some(p=>p.id===a.ownerId)&&people.some(p=>p.id===a.reviewerId)&&a.ownerId!==a.reviewerId&&a.steps.length>0&&a.steps.every(s=>!!s.label.trim())&&reviews>=0&&a.steps.every((s,i)=>s.kind!=='Action'||i>reviews);}
export function startRun(a:Assistant,actor:string,input:string):Run {const at=new Date().toISOString();return {id:uid(),assistantId:a.id,name:a.name,version:a.version,ownerId:a.ownerId,reviewerId:a.reviewerId,requestedBy:actor,createdAt:at,input,steps:a.steps.map(s=>({...s})),status:'Awaiting review',events:[{at,actor,message:'Simulation created; no tools executed'}]};}
export function canReview(r:Run,actor:string){return r.status==='Awaiting review'&&actor===r.reviewerId&&actor!==r.requestedBy&&actor!==r.ownerId;}
export function reviewRun(r:Run,actor:string,approve:boolean):Run {if(!canReview(r,actor))return r;return {...r,status:approve?'Approved':'Rejected',events:[...r.events,{at:new Date().toISOString(),actor,message:approve?'Simulation approved; no external action executed':'Simulation rejected'}]};}
