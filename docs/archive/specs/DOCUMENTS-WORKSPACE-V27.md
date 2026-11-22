# PioOne V27 Documents Workspace

This update introduces a unified **Documents** workspace in the Web UI.

## Scope
- My Drive (private user storage)
- Team Drives (shared team folders)
- Enterprise Documents (governed module-linked records)
- Connected Drives (OneDrive, SharePoint, NAS, object storage)

## UX goals
- Single interface for daily work and file browsing
- Folder-structure experience similar to OneDrive / file explorer
- Per-user private storage separated from enterprise records
- Visible quota / capacity usage
- RAG and DCOS access visibility per folder / file category
- Connected external storage visibility

## Updated front-end file
- `app/webui/src/features/DocumentsOverview.tsx`

## Updated translations
- `app/webui/src/locales/de.json`

## Notes
This is a UI prototype / demo implementation. Next recommended step:
1. Bind the view to a real file / folder metadata API.
2. Add upload, rename, move, share and permission actions.
3. Add per-folder DCOS / PioBrain access policies.
4. Connect governed records to CRM / ERP / Travel / PioPakt / KiDiS entities.
