from pathlib import Path
import re,json
base=Path('/mnt/data/pioone-v29-work/app/webui/src')
def edit(path,fn):
 p=base/path;s=p.read_text();ns=fn(s);assert ns!=s,path;p.write_text(ns)
workflow=['Business Workflows','Public Workflows','Internal Administration','Workflow Builder','Workflow Executions','Workflow Approvals','Worker Assignments','Workflow Analytics']
# retain data and routes for old deep links, but new destinations use Assistants
p=base/'app/Router.ts';s=p.read_text();s=s.replace("if(parts.length===2&&parts[0]==='Tasks'", "if(parts.length===2&&parts[0]==='DCOS'&&['Business Workflows','Public Workflows','Internal Administration','Workflow Builder','Workflow Executions','Workflow Approvals','Worker Assignments','Workflow Analytics'].includes(parts[1]))return {section:'Assistants',page:parts[1]};if(parts.length===2&&parts[0]==='Tasks'");p.write_text(s)
p=base/'app/routeRules.ts';s=p.read_text();s=s.replace("'Workflows','Activity & Audit'],DCOS", "'Workflows','Activity & Audit','Business Workflows','Public Workflows','Internal Administration','Workflow Builder','Workflow Executions','Workflow Approvals','Worker Assignments','Workflow Analytics'],DCOS");p.write_text(s)
p=base/'app/PageRouter.tsx';s=p.read_text().replace("if(section==='DCOS'&&['Business Workflows'", "if(section==='Assistants'&&['Business Workflows'");s=s.replace("if(section==='Assistants')return <AssistantsWorkspace/>","if(section==='Assistants')return <AssistantsWorkspace/>")
# redirect legacy canonical page if already resolved? parsed old hashes migrated above
p.write_text(s)
p=base/'features/WorkflowCenter.tsx';s=p.read_text().replace('DCOS · ENTERPRISE + PUBLIC ADMINISTRATION','ASSISTANT · WORKFLOW ASSISTANT').replace('Unified Workflow Center · V28','Workflow Assistant · V29').replace('One DCOS foundation.','Managed from Assistant.');p.write_text(s)
p=base/'features/DCOSWorkspace.tsx';s=p.read_text().replace("{page==='DCOS'&&<><DCOSDashboard/>","{page==='DCOS'&&<><DCOSDashboard/");# no other logic removed, hidden routes only
p.write_text(s)
p=base/'app/AppShell.tsx';s=p.read_text();s=s.replace('V28 · LOCAL DEMO','V29 · LOCAL DEMO')
# simplified mobile DCOS
s=s.replace("['DCOS','Briefing','Tasks','Approvals','Follow-ups','Business Workflows','Public Workflows','Internal Administration','Workflow Builder','Workflow Executions']", "['DCOS','Tasks','Approvals','Follow-ups']")
# append assistant mobile navigation after DCOS snippet
anchor="{section==='Documents'&&<><small className=\"mobile-drawer-label\""
insert="{section==='Assistants'&&<><small className=\"mobile-drawer-label\">{trLabel('Workflow Assistant')}</small>{[['My Assistants','My Assistants'],['Template Library','Template Library'],['Assistant Builder','Assistant Builder'],['Workflows','Assistant simulations'],['Business Workflows','My Workflows'],['Workflow Builder','Workflow Builder'],['Workflow Executions','Executions'],['Workflow Approvals','Workflow Approvals'],['Workflow Analytics','Workflow Analytics']].map(([id,label])=><button type=\"button\" key={id} className={`mobile-drawer-item ${page===id?'selected':''}`} onClick={()=>{P(id);setMobileMenuOpen(false)}}>{trLabel(label)}</button>)}</>}"
assert anchor in s;s=s.replace(anchor,insert+anchor,1)
# assistant sidebar group hierarchy
old="{['My Assistants','Template Library','Assistant Builder','Workflows','Activity & Audit'].map(n=><button key={n} className={page===n||page==='Assistants'&&n==='My Assistants'?'active':''} onClick={()=>P(n)}>{trLabel(n)}</button>)}"
new="{['My Assistants','Template Library','Assistant Builder','Activity & Audit'].map(n=><button key={n} className={page===n||page==='Assistants'&&n==='My Assistants'?'active':''} onClick={()=>P(n)}>{trLabel(n)}</button>)}<details className=\"v29-nav-group\" open><summary><Bot size={17}/>{trLabel('Workflow Assistant')}</summary>{[['Business Workflows','My Workflows'],['Public Workflows','Public Workflows'],['Internal Administration','Internal Administration'],['Workflow Builder','Workflow Builder'],['Workflow Executions','Executions'],['Workflow Approvals','Approvals'],['Worker Assignments','Worker Assignments'],['Workflow Analytics','Workflow Analytics'],['Workflows','Assistant simulations']].map(([id,label])=><button key={id} className={page===id?'active':''} onClick={()=>P(id)}>{trLabel(label)}</button>)}</details>"
assert old in s;s=s.replace(old,new)
# DCOS navigation 4 core items, Activity route points to Assistant audit
start=s.index("[['DCOS','Dashboard'],['Briefing','Morning briefing']")
end=s.index(".map(([id,n])=>",start)
s=s[:start]+"[['DCOS','Overview'],['Tasks','My Tasks'],['Approvals','Approvals'],['Follow-ups','Activities']].filter(([id])=>id!=='Tasks'||core.includes('Tasks'))"+s[end:]
# Documents sidebar: minimize top-level to overview, one group capture, one business processing group
start=s.index("{[{label:'DOCUMENT CAPTURE'")
end=s.index('</aside>}',start)
s=s[:start]+'''<details className="v29-nav-group" open><summary><Files size={17}/>{trLabel('Capture & PioPost')}</summary>{documentNav.slice(0,3).filter(([,id])=>allowed(id)).map(([n,id])=><button key={id} className={page===id?'active':''} onClick={()=>P(id)}><Files size={16}/>{trLabel(String(n))}</button>)}</details><details className="v29-nav-group"><summary><Files size={17}/>{trLabel('Document processing')}</summary>{documentNav.slice(3).filter(([n,id])=>allowed(id)&&(n!=='Processing Studio'||admin)).map(([n,id])=><button key={id} className={page===id?'active':''} onClick={()=>P(id)}><Files size={16}/>{trLabel(String(n))}</button>)}</details>'''+s[end:]
p.write_text(s)
# update page docs label; routes remain stable
p=base/'features/DocumentsOverview.tsx';s=p.read_text().replace('· V28</small>','· V29</small>');p.write_text(s)
# version meta
p=Path('/mnt/data/pioone-v29-work/app/webui/package.json');d=json.loads(p.read_text());d['version']='29.0.0';p.write_text(json.dumps(d,indent=2)+'\n')
# docs
Path('/mnt/data/pioone-v29-work/docs/PIOONE-V29-RELEASE-NOTES.md').write_text('''# PioOne V29 — Navigation Consolidation\n\nBased on **V28.1** mobile responsive complete source.\n\n## DCOS\n- Navigation reduced to Overview, My Tasks, Approvals, Activities (the latter reuses existing Follow-ups screen).\n- Workflow administration is no longer a DCOS menu item.\n- Existing data and worker bindings are retained.\n\n## Assistant\n- Workflow Assistant is a subordinate, expandable group under Assistants, with existing enterprise/public/administrative workflow libraries, builder, executions, human approvals, worker assignment and analytics.\n- Existing DCOS workflow deep links are redirected to Assistants.\n- Assistant simulations remain separate from the enterprise Workflow Center.\n\n## Documents\n- One top-level Documents workspace combines private personal storage, team, enterprise and external drives with capture/PioPost and document processing.\n- Capture modules are grouped into collapsed/expandable sub-navigation rather than separate top-level destinations.\n- Existing local browser drive data and access control checks are retained; cloud integrations are not claimed to be active.\n\n## Mobile\n- Same reduced DCOS, Assistant and Documents navigation exposed within V28.1 responsive drawer.\n\n## Prototype scope\n- Browser-local demonstration only; no server-side authorization, persistent cloud store, live worker invocation, real OCR or production data sync.\n''')
print('V29 code updated')
