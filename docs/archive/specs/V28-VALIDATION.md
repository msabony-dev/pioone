# V28 Validation Report — 2026-11-20

## Scope
The complete React frontend source has been carried forward from V27.1 and updated to version 28.0.0. Includes the existing 14 application groups and 99 modules, DCOS workflows, settings and data-protection UI, plus the new interactive Documents explorer.

## Verified in the build environment
- `npm run test:model`: **PASS**. Eleven model test groups, including legacy routing, worker version assignments, business/public workflows, backup/residency/restore planning.
- `npm run test:documents`: **PASS**. Folder navigation logic, drive partitions, quotas, move constraints, rename constraints, cascade trash/restore, persisted metadata validation.
- TypeScript/TSX **syntax transpilation for 67 files: PASS**.
- `src/locales/de.json` and `src/locales/en.json`: parse as valid JSON.
- `src/modules.json`: **14 application groups / 99 application modules**.
- ZIP: created with the full repository layout and validated for extraction/integrity.

## Not verified here
- Full `npm run build` (React/Vite packages were not available to install in this execution environment). CI and users should execute `npm install` followed by `npm run build`.
- Browser end-to-end tests; IndexedDB file I/O in a live browser; server integrations.
- Complete German localization across all legacy pages. V28 improves the main workflow navigation and template titles/descriptions, but stage-level descriptions and some legacy workflow labels remain untranslated.
- Real permissions, quotas, cloud drives, backup/restore, durable document versioning and production security.

## Explicit limits
- In V28, file bytes uploaded to the demo are browser-local via IndexedDB. Metadata is in localStorage, scoped by demo workspace and person. No server synchronizes the data. Clearing the browser profile removes the data.
- The UI allows a local RAG/DCOS preference toggle, but **real worker access is neither granted nor invoked**.
- Previously uploaded file contents are not preserved on replacement, although the metadata history indicates sequential versions.
- Enterprise documents and connected external drives are demo placeholders with no attached real bytes or authentication.
- Do not use the browser demo to store sensitive or production business data.
