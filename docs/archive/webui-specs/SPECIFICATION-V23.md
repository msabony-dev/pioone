# PioOne V23 — Consolidated Navigation

Incremental release on V22, preserving 14 enterprise applications and 99 application modules, including Contracts (PioPakt).

## Navigation
Eight top-level areas: Home, PioBrain, DCOS, Communication, Documents, Apps, Organisation, Settings. Tasks and Knowledge are no longer standalone areas. German and English navigation remain available.

## DCOS
DCOS owns the personal work interface: Dashboard, Morning briefing, To-do list, My approvals, Follow-ups, Digital workers, Documents and Executive DCOS (admin-only in the demo). Existing communication shortcuts remain. To-do list supports local creation and completion; dashboard counts, briefing, follow-ups, assistant links and contextual New record all use the same task collection. Quick-create targets `DCOS/Tasks` and requires both DCOS and task access. Task access remains a DCOS sub-permission in Module access to preserve existing denied grants; no new top-level Tasks service is exposed.

## PioBrain
PioBrain is the single knowledge interface; the duplicate Knowledge and DCOS knowledge placeholder pages are removed. The embedded https://chat.piosphere.ai/ workspace and external-tab fallback from V21 remain unchanged. Knowledge worker definitions and assignments are retained: removing a UI entry does not delete worker capabilities, documents or backend data. Existing PioBrain access behavior is unchanged; production access and retrieval must be enforced by the backend. The old Knowledge demo flag is removed from settings and normalized on load; it previously did not control PioBrain access.

## Compatibility and data
Old bookmarks `#/Tasks/Tasks` resolve to DCOS Tasks; `#/Knowledge/Knowledge`, `#/DCOS/DCOS%20knowledge` and `#/PioChat/PioChat` resolve to PioBrain. Route checks still apply to tasks. Existing storage prefixes, task schema, application records, entitlements and worker assignments are unchanged. Task records remain organisation-scoped local demo data, not isolated per employee; production requires authenticated per-user/tenant authorization, server-side persistence and audit. No data migration or deletion of task records is needed. Same local origin/port 5220 is required to reuse browser data.

## Validation
All eight model-test groups pass, including route compatibility, task permission combinations, quick-create destination and existing 14 applications/99 modules. Syntax transpilation of 57 TypeScript files reports zero errors. Full Vite build not verified: Vite and React dependencies are not installed in the execution environment. Live PioBrain iframe authentication is not verified; remote CSP and authentication must permit embedding. No new production backend integration is claimed.

## Start
`npm install`, `npm run dev`, then open http://localhost:5220. Run `npm run test:model` and `npm run build` after installing dependencies.
