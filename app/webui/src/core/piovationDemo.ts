import type {Person,Team} from '../app/catalog';
import type {Workforce} from './workforce';
// Fictional role-based directory; counts are a proposed organisation, not actual employment records.
export const demoDepartments=['Executive','Technology','Finance','People','Sales','Corporate Services'];
export function createPioVationDemo(modules:string[]){
 const people:Person[]=[]; const teams:Team[]=[];
 const common=modules.filter(m=>['Travel Management/Travel Requests','Travel Management/Travel Booking','Travel Management/Travel Expenses','HR/Self-Service','HR/Leave','HR/Time & Attendance'].includes(m));
 const addPerson=(id:string,name:string,jobTitle:string,department:string,managerId:string,team:string)=>{people.push({id,name,jobTitle,department,managerId,teams:[team]});return id;};
 const addTeam=(id:string,name:string,department:string,leader:string,apps:string[],extra:string[]=[])=>{teams.push({id,name,department,leader,modules:[...new Set([...common,...modules.filter(m=>apps.includes(m.split('/')[0])),...extra])],workers:['DCOS','Email','Calendar','Task','Document','Knowledge'],tokens:20});};
 addPerson('u1','CEO','Chief Executive Officer','Executive','','executive');
 addTeam('executive','Executive Office','Executive','u1',['Business Intelligence','Governance & Compliance','Tenders & Contracts','Contracts (PioPakt)'],['Travel Management/Travel Approvals']);
 addPerson('cto','CTO','Chief Technology Officer','Technology','u1','technology');addTeam('technology','Technology Leadership','Technology','cto',['Projects','Products & Services','Quality Management','IT Service Management'],['Travel Management/Travel Approvals']);
 addPerson('cfo','CFO','Chief Financial Officer','Finance','u1','finance');addTeam('finance','Finance & Accounting','Finance','cfo',['ERP','Travel Management','Business Intelligence','Contracts (PioPakt)']);
 addPerson('hr-lead','Head of HR','Head of Human Resources','People','u1','hr');addTeam('hr','People & HR','People','hr-lead',['HR'],['Travel Management/Travel Approvals','HR/Personnel Document Capture']);
 addPerson('sales-lead','Head of Sales','Head of Sales','Sales','u1','sales');addTeam('sales','Sales Leadership','Sales','sales-lead',['CRM','Tenders & Contracts'],['Travel Management/Travel Approvals']);
 const staff=(team:string,name:string,dept:string,manager:string,roles:string[],apps:string[],extra:string[]=[])=>{
  const ids=roles.map((r,i)=>addPerson(`${team}-${i+1}`,`${r} ${roles.filter(x=>x===r).length>1?String(roles.slice(0,i+1).filter(x=>x===r).length).padStart(2,'0'):''}`.trim(),r,dept,i===0?manager:`${team}-1`,team));
  addTeam(team,name,dept,ids[0],apps,extra);return ids;
 };
 const repeat=(r:string,n:number)=>Array(n).fill(r) as string[];
 staff('admin','System Administration','Technology','cto',repeat('System Administrator',2),['IT Service Management']);
 staff('devops','DevOps & Platform Engineering','Technology','cto',repeat('DevOps Engineer',2),['Projects','IT Service Management']);
 staff('frontend','Frontend Engineering','Technology','cto',repeat('Frontend Engineer',2),['Projects','Products & Services']);
 staff('backend','Backend Engineering','Technology','cto',repeat('Backend Engineer',5),['Projects','Products & Services']);
 staff('apps','AI & Enterprise Applications','Technology','cto',[...repeat('Application Engineer',8),'AI Engineer','QA Engineer'],['Projects','Products & Services','Document Processing','Quality Management']);
 staff('cos','PioSphere COS','Technology','cto',repeat('Cloud OS Engineer',3),['Projects','Products & Services','IT Service Management']);
 staff('support','Customer Support','Technology','cto',repeat('Support Engineer',2),['IT Service Management'],['CRM/Customer Service']);
 staff('it','IT & Infrastructure','Technology','cto',[...repeat('IT Engineer',3),'Network Engineer','Security Engineer'],['IT Service Management','Facility Management']);
 const financeRoles=['Accountant','Financial Controller','Procurement Specialist','Accounts Payable Specialist','Treasury Specialist'];
 financeRoles.forEach((r,i)=>addPerson('finance-'+(i+1),r,r,'Finance','cfo','finance'));
 ['HR Specialist','Recruitment & People Operations'].forEach((r,i)=>addPerson('hr-'+(i+1),r,r,'People','hr-lead','hr'));
 for(const [id,name,role] of [['govtech','GovTech','GovTech Account Manager'],['csp','Cloud Service Providers (CSP)','CSP Account Manager'],['sme','SME / KMU','SME Account Manager']])staff(id,name,'Sales','sales-lead',repeat(role,2),['CRM','Tenders & Contracts']);
 // Five suggested supporting roles; not part of the requested core headcount.
 staff('marketing','Marketing & Communications','Corporate Services','u1',['Marketing Manager','Communications Specialist'],[],['CRM/Marketing']);
 staff('legal','Legal & Compliance','Corporate Services','u1',['Legal & Compliance Officer'],['Governance & Compliance','Tenders & Contracts','Contracts (PioPakt)']);
 staff('operations','Business Operations','Corporate Services','u1',['Operations Manager','Executive Assistant'],['Facility Management','Document Processing']);
 // Let team leaders approve travel for their own team; approval still requires the existing actor checks.
 for(const t of teams){if(!t.modules.includes('Travel Management/Travel Approvals'))t.modules.push('Travel Management/Travel Approvals');}
 return {people,teams,departments:demoDepartments};
}
export function configurePioVationWorkforce(base:Workforce,modules:string[]):Workforce{
 const owners:Record<string,[string,string,string]>={CRM:['sales-lead','Sales','Head of Sales'],ERP:['cfo','Finance','CFO'],HR:['hr-lead','People','Head of HR'],Projects:['cto','Technology','CTO'],'Products & Services':['cto','Technology','CTO'],'Tenders & Contracts':['sales-lead','Sales','Head of Sales'],'IT Service Management':['it-1','Technology','IT Team Lead'],'Facility Management':['operations-1','Corporate Services','Operations Manager'],'Quality Management':['apps-10','Technology','QA Engineer'],'Business Intelligence':['finance-2','Finance','Financial Controller'],'Governance & Compliance':['legal-1','Corporate Services','Legal & Compliance Officer'],'Document Processing':['operations-1','Corporate Services','Operations Manager'],'Travel Management':['cfo','Finance','CFO'],'Contracts (PioPakt)':['legal-1','Corporate Services','Legal & Compliance Officer']};
 const positions=base.positions.map(p=>{const [ownerId,department,responsibleRole]=owners[p.id.slice(9)]||['u1','Executive','CEO'];return {...p,ownerId,department,responsibleRole,supervisorId:ownerId==='cto'||ownerId==='cfo'||ownerId==='hr-lead'||ownerId==='sales-lead'||department==='Corporate Services'?'u1':department==='Technology'?'cto':'cfo',escalationOwnerId:'u1',approvalRole:'Authorized human approver'};});
 const assignments=Object.fromEntries(modules.map(m=>{const a=m.split('/')[0];let ownerId=owners[a]?.[0]||'u1';if(m==='Travel Management/Travel Expenses')ownerId='finance-1';if(m==='ERP/Procurement'||m==='ERP/Suppliers')ownerId='finance-3';if(m==='CRM/Customer Service')ownerId='support-1';if(m==='CRM/Marketing')ownerId='marketing-1';return [m,{positionId:'position:'+a,ownerId}];}));
 return {...base,positions,assignments,financeApprovers:['cfo','finance-2']};
}
