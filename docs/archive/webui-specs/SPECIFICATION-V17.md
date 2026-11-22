# PioOne V17 — PioVation Enterprise Demo

V17 extends V16's Management Intelligence UI. All 13 applications and 92 modules are retained. The company profile is a **fictional role-based demonstration**, not an assertion of PioVation's actual workforce, finances, or reporting lines. No employee names or private personnel records are used.

## Organisation seed

| Department | Management | Staff | Total |
|---|---|---:|---:|
| Executive | CEO | 0 | 1 |
| Technology | CTO | 31 | 32 |
| Finance | CFO | 5 | 6 |
| People | Head of HR | 2 | 3 |
| Sales | Head of Sales | 6 | 7 |
| Corporate Services (proposed) | Reports to CEO | 5 | 5 |
| Total | | | 54 |

Technology: System Administration 2; DevOps 2; Frontend 2; Backend 5; Applications 10 (8 application engineers, 1 AI engineer, 1 QA engineer); COS 3; Support 2; IT 5 (3 IT engineers, 1 network engineer, 1 security engineer). First member of each team is its lead, counted within the requested staff size. Finance: accountant, controller, procurement, accounts payable, treasury. HR: HR specialist and recruitment/people operations. Sales: GovTech 2, CSP 2, SME/KMU 2. Proposed Corporate Services: marketing/communications 2, legal/compliance 1, business operations/executive assistance 2. No additional manager headcount for these teams. Total 19 teams including management teams.

## Data structure and navigation

`Person` extends V16 with optional `jobTitle`, `department`, `managerId`. The reporting graph is separate from team membership and team-level module grants. The seed is defined in `src/core/piovationDemo.ts`. CEO is the root; functional heads report to CEO; technical and sales team leads report to their functional head, staff report to their team lead. Finance/HR staff report to their respective head. Corporate Services team leads report to CEO. Existing Team and Workforce types remain unchanged.

Organisation → Company Organisation shows a hierarchical CEO tree, departmental columns, collapsible reporting lines, recursive counts, search and profile drill-down. Settings → Teams & users allows reporting profile changes (CEO metadata fixed in this demo; cycle prevention on manager changes), membership changes and team grants. Reporting department and team department are separate editable fields; keep them aligned operationally. Unassigned reporting nodes remain visible separately. Generic customer demo profiles retain their original seed and view.

## Digital organisation and permissions

54 personal DCOS profiles (configuration, not running instances); 13 functional digital positions; 92 module assignments. Each functional position has a named role-based human owner, supervisor and escalation owner. Assignment owners specialize for procurement, customer service, marketing and travel expense processing. Finance approvers are explicitly seeded as CFO and Financial Controller. Travel approval continues to prohibit self-approval; team leader demo mode recognizes direct reporting relationships or team leadership. Finance settlement requires a distinct third actor with explicit finance permission, finance membership and module access. All permissions remain client-side simulation; role switching is not authentication. Team grants are illustrative, not a production least-privilege review.

## Dashboard

Company dashboard shows local headcount, teams, assignment coverage, configured accountability, and a department headcount chart with organisation drill-down. CRM and ERP retain V16 interactive financial and funnel visuals with fictional metrics, not real PioVation financial or sales data. The new reporting view is styled for existing light/dark themes and has DE/EN labels; role names and some dynamic content remain English.

## Storage and validation

New `pio17-` localStorage namespace; V16 data is not migrated or overwritten. Default port 5217. Model tests cover 54 employees, 19 teams, exact team and department counts, unique IDs, valid acyclic reporting graph rooted at CEO, team leader membership, valid module IDs, 92 configured assignments and finance approver membership. All prior tests retained. TypeScript syntax transpilation is not a full typecheck or browser regression. Production runtime, backend authorization, audit, actual employee provisioning and live analytics remain out of scope.
