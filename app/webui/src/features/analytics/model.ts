export const periods = [3,6,12] as const;
export type Period = typeof periods[number];
export const sales = [82,94,88,115,108,128,119,143,135,159,148,178];
export const expenses = [62,69,68,78,73,86,84,91,90,101,98,110];
export const stages = ['Leads','Qualified','Opportunities','Quotations','Won'];
export const stageCounts = [480,264,156,84,42];
export const stageAmounts = [0,0,720000,430000,210000];
export const sum = (xs:number[]) => xs.reduce((a,b)=>a+b,0);
export function finance(period:Period){const revenue=sales.slice(-period),cost=expenses.slice(-period);return {revenue,cost,total:sum(revenue)*1000,spend:sum(cost)*1000,profit:(sum(revenue)-sum(cost))*1000};}
export function pipeline(period:Period){return stageCounts.map((n,i)=>({name:stages[i],count:Math.round(n*period/12),amount:Math.round(stageAmounts[i]*period/12)}));}
export const dashboardModules={CRM:['CRM/Leads','CRM/Sales Pipeline','CRM/Opportunities','CRM/Quotations','CRM/Forecasting'],ERP:['ERP/Accounting','ERP/Controlling','ERP/Cash Flow','ERP/Receivables','ERP/Payables','ERP/Budgets','ERP/Inventory Management']};
export function dashboardAllowed(app:'CRM'|'ERP',admin:boolean,allowed:(id:string)=>boolean){return admin && dashboardModules[app].every(allowed);}
