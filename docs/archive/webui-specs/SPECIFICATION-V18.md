# PioOne V18 – Interactive Organisation and Management Intelligence

## Scope
Retain V17 module catalogue, demo organisation, reporting relationships, roles, worker bindings and local workflows. No additional application or business module. The new UI is a prototype, not a production deployment.

## Organisation diagram
Company Organisation uses the reporting forest calculated from the person directory (`id`, `managerId`). A valid edge connects manager and direct report. Missing manager references and cyclic relationships are excluded from the edge set; affected people remain visible as roots. The tree layout assigns leaf positions and centers managers over their visible children. Leadership view opens root nodes only, Expand all opens all reporting paths, and each node can toggle direct reports. Search includes matching employees and ancestors. Zoom (20–150%), fit-to-width and scroll support large hierarchies. Employee cards reuse existing profile interactions. The default demo contains 54 people and 53 reporting edges, 19 teams. No synthetic hierarchy is substituted for actual directory relationships.

## Dashboard visualization
Company: existing finance trends and workforce coverage with animated KPI cards, bars, donuts and trend reveal. DCOS: task counts/completion, selected-provider unread messages, local meetings, configured worker access, workspace links and illustrative briefing flow. CRM: cumulative sales funnel with selectable stages, conversion details and module navigation; existing period filters. ERP: financial trends, cash flow, cost structure, budget and receivables/inventory views. The existing demo data and authorization checks remain in place. DCOS local activity is organisation-scoped, not isolated by personal identity. No live execution or external data feed is implied.

## Motion and accessibility
Shared Motion wrapper offers an animation switch and replay. Numeric counters use requestAnimationFrame; chart transitions use SVG/CSS. Numeric values remain available through labels. Reduced-motion preferences suppress motion. Animations convey presentation only, not actual workflow execution. Period selection, funnel selection and drill-down remain interactive.

## Data and persistence
No new database schema is implemented. Diagram coordinates, search, expansion and zoom are derived or transient UI state. Animation settings are session/component state. V18 namespace is independent of V17; existing customized V17 browser data are not automatically migrated. The source demo directory and catalogue are unchanged.

## Verification
Model tests cover 13 applications, 92 module routes/assignments, 54 people, 19 teams, all 53 reporting edges, expanded/leadership/search layouts, non-overlapping cards, invalid relationships, empty directories, governance and dashboard arithmetic. TypeScript transpilation syntax checks cover 53 source files. Full dependency-installed build and browser regression remain required. Production backend integration, personal isolation and server-side authorization remain open.
