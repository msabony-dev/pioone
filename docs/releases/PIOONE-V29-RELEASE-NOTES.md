# PioOne V29 — Navigation Consolidation

Based on **V28.1** mobile responsive complete source.

## DCOS
- Navigation reduced to Overview, My Tasks, Approvals, Activities (the latter reuses existing Follow-ups screen).
- Workflow administration is no longer a DCOS menu item.
- Existing data and worker bindings are retained.

## Assistant
- Workflow Assistant is a subordinate, expandable group under Assistants, with existing enterprise/public/administrative workflow libraries, builder, executions, human approvals, worker assignment and analytics.
- Existing DCOS workflow deep links are redirected to Assistants.
- Assistant simulations remain separate from the enterprise Workflow Center.

## Documents
- One top-level Documents workspace combines private personal storage, team, enterprise and external drives with capture/PioPost and document processing.
- Capture modules are grouped into collapsed/expandable sub-navigation rather than separate top-level destinations.
- Existing local browser drive data and access control checks are retained; cloud integrations are not claimed to be active.

## Mobile
- Same reduced DCOS, Assistant and Documents navigation exposed within V28.1 responsive drawer.

## Prototype scope
- Browser-local demonstration only; no server-side authorization, persistent cloud store, live worker invocation, real OCR or production data sync.
