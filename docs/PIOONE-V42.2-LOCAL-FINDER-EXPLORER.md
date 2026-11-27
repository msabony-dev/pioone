# PioOne V42.2 – Dateien & DMS as one user interface

## Scope
This update is based directly on PioOne V42.1. The existing browser demo DMS is retained. The Files & DMS screen now has two source tabs:

- **PioOne Dateien & DMS:** Existing personal/team/enterprise/external-drive demo file manager, local browser storage, user access and document controls. This does not imply a functioning production DMS backend.
- **Lokaler Computer (Finder / Explorer):** A new native-style in-browser browser for **user-selected** local desktop folders.

## Local folder behavior
- Chrome/Edge: uses `window.showDirectoryPicker({mode:'read'})` when available. It does **not** request write access.
- Safari and other browsers without the above API: uses a standard folder chooser via `input type=file webkitdirectory` and creates an in-memory folder tree from the files chosen.
- Lists folders before files, navigates subdirectories, breadcrumbs, current-folder search, list/grid views, text/PDF/image previews and downloads.
- Maximum 3000 entries displayed in one directly picked folder (UI safeguard). Text preview limited to 1 MB.
- Local files stay in browser memory and are not automatically uploaded to a cloud backend or copied into the PioOne DMS. No background indexing, syncing, or persistent access is provided.
- Files require fresh selection when reloading or restarting.

## Security and production considerations
- This is **not the native Windows Explorer or macOS Finder embedded in the browser**. It is an application file explorer with browser-mediated access.
- A website cannot silently access system-wide disks, other applications, network drives, or arbitrary local files.
- This local preview does not grant PioBrain or a Worker permission to read these files. Real DMS indexing or AI analysis needs a separately authorized upload/connector process, authentication, user delegation, consent and audit.
- For fully integrated native file management, use a separately installed local bridge/desktop app (e.g. Tauri/Electron) or system file dialogs plus scoped connectors. Do not rely on browser DOM access to bypass OS permissions.
- Browser sandbox, tenant scope and Keycloak server-side authorization remain relevant for any future production services.

## Verification
- Both modified TSX modules passed TypeScript transpilation syntax checks.
- A full Vite build and existing unit tests could not run here without the local project npm dependencies. Run `npm install`, `npm run test:model`, `npm run test:documents`, `npm run build` in `app/webui`.
