# PioOne V27 React Web UI

The web UI lives in `app/webui` of the PioOne monorepo. Version 27 adds **Settings → Data Residency & Storage** and **Settings → Data Protection Center**.

- Data Residency: default PioVation Cloud, Hybrid with customer PostgreSQL and private data gateway, PioLiance/On-Prem; separate document, RAG/PioBrain and PioWorker/DCOS locality settings.
- Data Protection: destination/policy drafts, recovery points, backup & PITR design, release compatibility, restore-plan export and architecture.
- Existing V26 enterprise and public workflow screens are preserved.

Run `npm install`, `npm run test:model`, `npm run build`, `npm run dev`.

**Prototype only:** no real data is moved, backed up, restored, connected to a database or sent to OneDrive. No secrets should be entered. Read `../../docs/PIOONE-V27-SPECIFICATION.md` for the complete production plan and constraints.
