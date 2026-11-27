import ts from 'typescript';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function load(path){const code=ts.transpileModule(readFileSync(new URL('../'+path,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const mod={exports:{}};const req=(id)=>id==='../modules.json'?JSON.parse(readFileSync(new URL('../src/modules.json',import.meta.url),'utf8')):id==='react'?{}:require(id);new Function('exports','module','require',code)(mod.exports,mod,req);return mod.exports;}
const catalog=JSON.parse(readFileSync(new URL('../src/modules.json',import.meta.url),'utf8'));
const modules=Object.entries(catalog).flatMap(([a,ms])=>ms.map(m=>a+'/'+m));
const {seedWorkforce,accountabilityReady,pinBindings}=load('src/core/workforce.ts');
const {validRoute}=load('src/app/routeRules.ts');
const {routeHash,parseRoute}=load('src/app/Router.ts');
const {canApproveTravel,canApproveExpense}=load('src/core/travelGovernance.ts');
const w=seedWorkforce(modules,[]);
assert.equal(Object.keys(catalog).length,14);assert.equal(modules.length,99);assert.equal(w.positions.length,14);assert.equal(Object.keys(w.assignments).length,99);assert.equal(w.financeApprovers.length,0);
for(const m of modules){assert.ok(validRoute('Apps',m));assert.deepEqual(parseRoute(routeHash('Apps',m)),{section:'Apps',page:m});assert.ok(w.positions.some(p=>p.id===w.assignments[m].positionId));}
assert.ok(!validRoute('Apps','Unknown'));assert.ok(!validRoute('Settings','Travel Management/Travel Requests'));assert.deepEqual(parseRoute('#/%zz/x'),{section:'Home',page:'Home'});
const people=['u1','u2','u3'].map(id=>({id}));const p=w.positions[0];assert.equal(accountabilityReady(p,'',people),false);const configured={...p,ownerId:'u1',supervisorId:'u2',escalationOwnerId:'u3',responsibleRole:'Role',department:'Dept',approvalRole:'Approver'};assert.equal(accountabilityReady(configured,'',people),true);assert.equal(accountabilityReady(configured,'unknown',people),false);
const state={workers:[{id:'w',releases:[{version:'1',status:'Published'},{version:'2',status:'Draft'}]}],bindings:{a:{workerId:'w',mode:'latest'}}};assert.deepEqual(pinBindings(state).bindings.a,{workerId:'w',mode:'pinned',version:'1'});
assert.equal(canApproveTravel('u1','u1',true),false);assert.equal(canApproveTravel('u1','u2',false),false);assert.equal(canApproveTravel('u1','u2',true),true);
assert.equal(canApproveExpense('u1','u2','u3',true,true,true),true);for(const actor of ['u1','u2',''])assert.equal(canApproveExpense('u1','u2',actor,true,true,true),false);for(const flags of [[false,true,true],[true,false,true],[true,true,false]])assert.equal(canApproveExpense('u1','u2','u3',...flags),false);assert.equal(canApproveExpense('u1',undefined,'u3',true,true,true),false);
console.log('PASS: 14 applications / 99 module routes and assignments; accountability; version pinning; travel separation of duties.');

const {finance,pipeline,dashboardAllowed,dashboardModules}=load('src/features/analytics/model.ts');
for(const period of [3,6,12]){const f=finance(period),p=pipeline(period);assert.equal(f.revenue.length,period);assert.equal(f.cost.length,period);assert.equal(f.profit,f.total-f.spend);assert.ok(p.every((x,i)=>i===0||x.count<=p[i-1].count));assert.ok(p[4].count>0);}
for(const app of ['CRM','ERP']){assert.ok(validRoute('Apps',app+' Dashboard'));assert.deepEqual(parseRoute(routeHash('Apps',app+' Dashboard')),{section:'Apps',page:app+' Dashboard'});assert.ok(dashboardModules[app].every(m=>modules.includes(m)));assert.ok(dashboardAllowed(app,true,()=>true));assert.ok(!dashboardAllowed(app,false,()=>true));assert.ok(!dashboardAllowed(app,true,id=>id!==dashboardModules[app][0]));}
console.log('PASS: dashboard periods, financial arithmetic, cumulative funnel, route and access rules.');
const {createPioVationDemo,configurePioVationWorkforce}=load('src/core/piovationDemo.ts');
const demo=createPioVationDemo(modules); const dw=configurePioVationWorkforce(seedWorkforce(modules,demo.people),modules);
assert.equal(demo.people.length,54);assert.equal(demo.teams.length,19);assert.equal(new Set(demo.people.map(p=>p.id)).size,54);
const counts=Object.fromEntries(demo.departments.map(d=>[d,demo.people.filter(p=>p.department===d).length]));assert.deepEqual(counts,{Executive:1,Technology:32,Finance:6,People:3,Sales:7,'Corporate Services':5});
for(const [id,n] of Object.entries({admin:2,devops:2,frontend:2,backend:5,apps:10,cos:3,support:2,it:5,govtech:2,csp:2,sme:2}))assert.equal(demo.people.filter(p=>p.teams.includes(id)).length,n);
for(const p of demo.people){assert.ok(p.teams.every(t=>demo.teams.some(x=>x.id===t)));const seen=new Set([p.id]);let manager=p.managerId;while(manager){assert.ok(!seen.has(manager));seen.add(manager);const m=demo.people.find(x=>x.id===manager);assert.ok(m);manager=m.managerId;}assert.ok(seen.has('u1'));}
for(const t of demo.teams){assert.ok(demo.people.some(p=>p.id===t.leader&&p.teams.includes(t.id)));assert.ok(t.modules.every(m=>modules.includes(m)));}
assert.equal(dw.positions.length,14);assert.equal(Object.keys(dw.assignments).length,99);for(const [m,a] of Object.entries(dw.assignments))assert.ok(accountabilityReady(dw.positions.find(p=>p.id===a.positionId),a.ownerId,demo.people),m);
for(const id of dw.financeApprovers)assert.ok(demo.people.some(p=>p.id===id&&p.teams.includes('finance')));
console.log('PASS: PioVation 54 people / 19 teams, departmental counts, valid reporting tree, all 99 accountability assignments and finance approvers.');
const {diagramLayout,reportingForest,NODE_W,NODE_H}=load('src/core/orgDiagram.ts');
const leadership=diagramLayout(demo.people,new Set(['u1']));assert.equal(leadership.nodes.length,8);assert.equal(leadership.edges.length,7);
const full=diagramLayout(demo.people,new Set(demo.people.map(p=>p.id)));assert.equal(full.nodes.length,54);assert.equal(full.edges.length,53);
for(const e of full.edges){const a=full.nodes.find(n=>n.person.id===e.from),b=full.nodes.find(n=>n.person.id===e.to);assert.equal(b.person.managerId,a.person.id);assert.equal(b.depth,a.depth+1);}
for(let i=0;i<full.nodes.length;i++)for(let j=i+1;j<full.nodes.length;j++){const a=full.nodes[i],b=full.nodes[j];assert.ok(Math.abs(a.x-b.x)>=NODE_W||Math.abs(a.y-b.y)>=NODE_H,'overlapping cards');}
const found=diagramLayout(demo.people,new Set(),p=>p.id==='backend-5');assert.deepEqual(new Set(found.nodes.map(n=>n.person.id)),new Set(['u1','cto','backend-1','backend-5']));assert.equal(found.edges.length,3);
const invalid=[{id:'a',managerId:'b'},{id:'b',managerId:'a'},{id:'c',managerId:'missing'},{id:'d',managerId:'d'},{id:'e',managerId:'c'}];const invalidLayout=diagramLayout(invalid,new Set(invalid.map(p=>p.id)));assert.equal(invalidLayout.nodes.length,5);assert.equal(invalidLayout.edges.length,1);assert.equal(reportingForest(invalid).roots.length,4);
assert.equal(diagramLayout([],new Set()).nodes.length,0);assert.equal(diagramLayout(demo.people,new Set(),()=>false).nodes.length,0);
console.log('PASS: V18 org diagram leadership/full/search layouts, no overlapping cards, actual reporting edges, invalid relationships and empty directory.');
const {groups,actionsFor,validate,visibleDrafts}=load('src/core/quickCreate.ts');
const core=['Tasks','Communication','Documents','DCOS'];const list=(s,p,a='',allowed=()=>true,c=core,provider=()=> 'Demo')=>actionsFor(s,p,a,allowed,c,()=>true,provider);
assert.equal(Object.keys(groups).length,14);for(const a of Object.values(groups).flat()){assert.ok(validRoute(a.section,a.page),a.page);assert.ok(modules.includes(a.permission));}
assert.equal(list('Apps','CRM/Contacts')[0].id,'CRM/Contacts');assert.equal(list('Apps','ERP/Invoicing')[0].id,'ERP/Invoicing');assert.ok(list('Apps','CRM Dashboard').every(a=>a.page.startsWith('CRM/')));assert.ok(list('Apps','Apps','ERP').every(a=>a.page.startsWith('ERP/')));assert.ok(list('Apps','Apps').length>30);assert.ok(list('Home','Home').some(a=>a.id==='task'));assert.ok(list('DCOS','DCOS').some(a=>a.id==='task'));assert.ok(list('Documents','Documents overview').some(a=>a.kind==='workflow'&&a.page==='Document Processing/Capture Center'));assert.ok(list('Apps','Travel Management/Travel Expenses').every(a=>a.kind==='workflow'));assert.ok(!list('Apps','ERP/Invoicing','',()=>false).length);assert.ok(!list('Documents','Documents overview','',()=>true,[]).length);assert.ok(!list('Home','Home','',()=>true,core,()=> '').some(a=>['mail','meeting'].includes(a.kind)));
const invoice=groups.ERP[0];const good={customer:'Customer',reference:'D1',date:'2026-11-16',due:'2026-12-01',amount:'42',currency:'EUR'};assert.ok(validate(invoice,good));assert.ok(!validate(invoice,{...good,amount:'-1'}));assert.ok(!validate(invoice,{...good,due:'2026-01-01'}));assert.ok(!validate(invoice,{...good,customer:' '}));assert.ok(!validate(invoice,{...good,currency:'foo'}));assert.ok(validate(groups.CRM[0],{firstName:'A',lastName:'B'}));assert.ok(!validate(groups.CRM[0],{firstName:'A',lastName:'B',email:'invalid'}));
const drafts=[{module:'CRM/Contacts',owner:'u1',workspace:'a'},{module:'CRM/Contacts',owner:'u2',workspace:'a'},{module:'CRM/Contacts',owner:'u1',workspace:'b'},{module:'ERP/Invoicing',owner:'u1',workspace:'a'}];assert.equal(visibleDrafts(drafts,'CRM/Contacts','u1',false,'a').length,1);assert.equal(visibleDrafts(drafts,'CRM/Contacts','u1',true,'a').length,3);
console.log('PASS: V19 contextual create catalog, route permissions, core/provider checks, draft validation, specialized workflows and draft visibility.');
assert.ok(validRoute('PioBrain','PioBrain'));
assert.deepEqual(parseRoute('#/PioChat/PioChat'),{section:'PioBrain',page:'PioBrain'});
assert.deepEqual(parseRoute(routeHash('PioBrain','PioBrain')),{section:'PioBrain',page:'PioBrain'});
console.log('PASS: PioBrain route and legacy PioChat bookmark compatibility.');
const contractApp='Contracts (PioPakt)', intake=contractApp+'/Contract Intake';
assert.equal(catalog[contractApp].length,7);
assert.ok(validRoute('Apps',contractApp+'/Contract Dashboard'));
assert.ok(!validRoute('Settings',intake));
assert.equal(list('Apps',contractApp+'/Contract Dashboard')[0].id,intake);
assert.equal(list('Apps',contractApp+'/Contract Dashboard','',m=>m!==intake).length,0);
const contractDraft=groups[contractApp][0], validContract={title:'Demo agreement',partner:'Demo partner',category:'IT',amount:'1200',currency:'EUR',end:'2027-12-31'};
assert.ok(validate(contractDraft,validContract));assert.ok(!validate(contractDraft,{...validContract,amount:'0'}));assert.ok(!validate(contractDraft,{...validContract,partner:''}));
assert.equal(dw.assignments[intake].ownerId,'legal-1');
assert.ok(demo.teams.find(t=>t.id==='legal').modules.includes(intake));assert.ok(!demo.teams.find(t=>t.id==='frontend').modules.includes(intake));
assert.ok(validRoute('Apps','Tenders & Contracts/Contracts'));
const contractSamples=JSON.parse(readFileSync(new URL('../src/features/contracts/demoContracts.json',import.meta.url),'utf8'));assert.equal(contractSamples.length,15);assert.equal(new Set(contractSamples.map(x=>x.id)).size,15);assert.ok(contractSamples.every(x=>x.partner.startsWith('Demo Partner ')&&x.wert>0));
console.log('PASS: V22 Contracts module catalog, route and quick-create permission checks, valid metadata, legal ownership, legacy routes and sample records.');

assert.ok(validRoute('DCOS','Tasks'));
assert.ok(!validRoute('Tasks','Tasks'));
assert.ok(!validRoute('Knowledge','Knowledge'));
assert.ok(!validRoute('DCOS','DCOS knowledge'));
assert.deepEqual(parseRoute('#/Tasks/Tasks'),{section:'DCOS',page:'Tasks'});
assert.deepEqual(parseRoute('#/Knowledge/Knowledge'),{section:'PioBrain',page:'PioBrain'});
assert.deepEqual(parseRoute('#/DCOS/DCOS%20knowledge'),{section:'PioBrain',page:'PioBrain'});
assert.equal(list('DCOS','Tasks')[0].section,'DCOS');
assert.ok(!list('Home','Home','',()=>true,['Tasks']).some(a=>a.id==='task'));
assert.ok(!list('DCOS','DCOS','',()=>true,['DCOS']).some(a=>a.id==='task'));
console.log('PASS: V23 DCOS task routes, legacy redirects, Knowledge consolidation and task permissions.');
const {templates,fromTemplate,validAssistant,startRun,canReview,reviewRun}=load('src/core/assistants.ts');
for(const p of ['Assistants','My Assistants','Template Library','Assistant Builder','Workflows','Activity & Audit'])assert.ok(validRoute('Assistants',p));
assert.equal(templates.length,11);const a=fromTemplate('notary','u1');assert.ok(!validAssistant(a,people));a.reviewerId='u2';assert.ok(validAssistant(a,people));assert.ok(!validAssistant({...a,reviewerId:'u1'},people));assert.ok(!validAssistant({...a,steps:[{id:'x',label:'Send',kind:'Action'},...a.steps]},people));const run=startRun(a,'u1','Test');assert.ok(!canReview(run,'u1'));assert.ok(canReview(run,'u2'));assert.equal(reviewRun(run,'u1',true).status,'Awaiting review');assert.equal(reviewRun(run,'u2',true).status,'Approved');assert.equal(reviewRun(run,'u2',false).status,'Rejected');assert.equal(run.steps.length,a.steps.length);console.log('PASS: V24 assistant routes, templates, approval ordering, independent reviewer, immutable run snapshot.');

// V26 public administration workflows
const {workflowTemplates: allV26,templatesForDomain,createRun: createV26,nextRun: stepV26,returnForInformation,resumeRun,rejectRun}=load('src/core/workflows.ts');
assert.equal(allV26.length,12);
assert.equal(templatesForDomain('enterprise').length,4);
assert.equal(templatesForDomain('public-external').length,4);
assert.equal(templatesForDomain('public-internal').length,4);
assert.equal(new Set(allV26.map(x=>x.id)).size,12);
for(const w of allV26){assert.ok(w.stages.length>=6);assert.ok(w.stages.some(s=>s.approval));assert.ok(w.stages.every(s=>s.id&&s.app&&s.worker));}
for(const w of allV26){let r=createV26(w.id,'Demo case','Demo officer','V26-1','2026-11-20T00:00:00Z',{caseReference:'CASE-001',applicant:'Demo Applicant',department:'Office A',dueDate:'2026-12-31'});assert.equal(r.caseReference,'CASE-001');for(let i=0;i<w.stages.length;i++){if(w.stages[i].approval){const pending=stepV26(r,false);assert.equal(pending.status,'awaiting-approval');assert.equal(pending.stage,i);r=stepV26(pending,true);}else r=stepV26(r,false);}assert.equal(r.status,'completed');}
let pub=createV26('Application-to-Decision','External application','Caseworker','CASE-2');pub=returnForInformation(pub,'Missing document');assert.equal(pub.status,'returned-for-information');assert.equal(stepV26(pub).stage,0);assert.equal(returnForInformation(pub,'').status,'returned-for-information');pub=resumeRun(pub,'Received supporting document');assert.equal(pub.status,'active');pub=rejectRun(pub,'Not eligible');assert.equal(pub.status,'rejected');assert.equal(stepV26(pub).status,'rejected');
// V42 workflow entry points live in the Digital Workers catalog.
assert.ok(!validRoute('DCOS','Public Workflows'));assert.ok(!validRoute('DCOS','Internal Administration'));
const {DIGITAL_WORKER_CATEGORIES,DIGITAL_WORKER_NAMES}=load('src/features/digitalWorkerCatalog.ts');
const workflowWorkers=DIGITAL_WORKER_CATEGORIES.find(c=>c.name==='Workflows').workers;
assert.equal(workflowWorkers.length,13);
for(const workflow of allV26)assert.ok(workflowWorkers.includes('DW-'+workflow.id),workflow.id);
assert.ok(workflowWorkers.includes('DW-Workflow-Automation'));
assert.equal(new Set(DIGITAL_WORKER_NAMES).size,DIGITAL_WORKER_NAMES.length);
for(const worker of workflowWorkers)assert.ok(validRoute('Assistants',worker));
for(const page of ['DWs','DW Organisations','Worker Factory','DW Settings'])assert.ok(validRoute('Assistants',page));
assert.ok(validRoute('Documentation','Documentation'));
assert.ok(validRoute('Settings','Database & Backup'));
console.log('PASS: V26 all 12 workflow templates, case metadata, human gates, public case clarification/resumption/rejection, and routes.');

// V27 data protection, data residency and migration planning models
const {destinationKinds,validDestination,initialProtection,validPolicy,assessRestore,createDemoPoint}=load('src/core/dataProtection.ts');
assert.equal(destinationKinds.length,6);
assert.ok(validDestination({name:'Offsite',endpoint:'bucket/backup',kind:'s3'}));
assert.ok(!validDestination({name:'',endpoint:'',kind:'s3'}));
const backupState=initialProtection();backupState.destinations.push({id:'d1',name:'Test',kind:'s3',endpoint:'b/x',status:'unverified',immutable:true,encrypted:true,createdAt:'2026-11-20'});
assert.ok(validPolicy({id:'p1',name:'Full',targetId:'d1',scopes:['database'],frequency:'daily',retentionDays:90,pitr:true,enabled:false},backupState));
assert.ok(!validPolicy({id:'p2',name:'Invalid PITR',targetId:'d1',scopes:['documents'],frequency:'daily',retentionDays:90,pitr:true,enabled:false},backupState));
const rp=createDemoPoint('d1');assert.ok(assessRestore({recoveryPointId:rp.id,mode:'production',scopes:['database'],appRelease:'PioOne V25',confirmedCompatibility:false,secondApprover:'',reason:''},rp).length>=3);
const {defaultResidency,validateResidency,assessSovereignty,buildMigration}=load('src/core/dataResidency.ts');
const defaultPlan=defaultResidency('tenant1');assert.deepEqual(validateResidency(defaultPlan),[]);
assert.ok(validateResidency({...defaultPlan,deployment:'hybrid',database:'customer-pg',databaseEndpointRef:'customer-db',privateGateway:false}).length>0);
assert.ok(validateResidency({...defaultPlan,database:'customer-pg',databaseEndpointRef:''}).length>0);
assert.ok(validateResidency({...defaultPlan,documents:'onedrive',documentLocationRef:'graph-connector',deployment:'onprem',database:'customer-pg',databaseEndpointRef:'local-db',knowledge:'customer',workers:'customer',region:'Customer site'}).some(x=>x.includes('OneDrive')));
const hybrid={...defaultPlan,deployment:'hybrid',database:'customer-pg',databaseEndpointRef:'cust-db-01',documents:'customer-s3',documentLocationRef:'customer-docs',privateGateway:true,knowledge:'piovation',workers:'piovation'};
assert.deepEqual(validateResidency(hybrid),[]);
assert.ok(assessSovereignty(hybrid).some(x=>x.includes('PioBrain')));
assert.ok(buildMigration(defaultPlan,hybrid,['database','documents'],'Change 134').errors.length===0);
assert.ok(buildMigration(defaultPlan,hybrid,['documents'],'Change 134').errors.some(x=>x.includes('database migration')));
assert.ok(buildMigration(defaultPlan,hybrid,['database','documents'],'').errors.some(x=>x.includes('reason')));
assert.ok(validRoute('Settings','Data Residency & Storage'));assert.ok(validRoute('Settings','Data Protection Center'));
console.log('PASS: V27 destinations, PITR scope validation, restore approvals, residency and sovereignty checks, migration gating and routes.');
