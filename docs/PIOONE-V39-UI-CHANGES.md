# PioOne V39 UI Corrections

## Language / Sprache
- The UI language switch persists and the translation helper now supports German and English source labels, including explicit translations for V38 navigation and worker management.
- Important limitation: legacy views with hard-coded strings may still contain untranslated content; full bilingual QA for every historical screen is not yet complete.

## Settings
- **Worker bindings** is now a worker-first table of `DW-` workers; it no longer lists all CRM/ERP modules as rows.
- **Worker Factory** remains for worker creation, version drafts and publication.
- **Database & Backup** is its own Settings navigation entry with separate Database and Backup sub-tabs.
- Settings values are stored locally (demo only); no credentials, real database connection or backup actions are implemented.

## Product
PioOne is the AI-Native Enterprise Operating System / Das KI-native Unternehmensbetriebssystem.

## Run
`cd app/webui && npm install && npm run build && npm run dev`
