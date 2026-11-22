# PioOne V28 — Unified Documents Workspace & File Explorer

**Release:** 28.0.0  
**Scope:** complete React/Vite source for the current PioOne frontend prototype, including all V27 work.  
**Status:** browser-side interactive prototype. **No production file service, database, cloud connector, or backup engine is connected.**

## 1. Product goal

PioOne is one workspace for daily work. The Documents area is a unified file explorer covering personal, team and enterprise records alongside externally connected drives. Every user should be able to manage a private allocation of ordinary files unrelated to CRM, ERP, HR and other modules. Documents associated with business modules must remain in governed document repositories and retain their application relationships and access policies.

## 2. UI implementation

Route: `Documents` → `Documents overview`.

Four locations:
1. **My Drive** — private-by-default user folders and arbitrary files. New-folder creation and upload supported in the local demo.
2. **Team Drives** — team-shared folders (locally simulated).
3. **Enterprise Documents** — governed examples for CRM, ERP, HR, Travel, PioPakt and KiDiS. Read-only demo records to avoid misleading business-record edits.
4. **Connected Drives** — illustrative OneDrive, SharePoint, NAS and S3 roots. These are not authenticated connectors.

Navigation includes folder hierarchy, breadcrumbs, recent files, favorites, recycle bin, search, detail inspector and storage-quota indicator. The detail panel presents file ownership, privacy, version metadata, current file size and a local demonstration toggle for DCOS/PioBrain access.

### Functional browser-demo operations

- Create folders; enter folders by clicking the arrow or double-clicking.
- Upload ordinary files using the browser file picker. Uploaded byte content is stored in **IndexedDB**, while metadata is stored in **localStorage**. No upload leaves the browser.
- Download uploaded content from the same browser profile.
- Rename files/folders, move them within the same drive, mark favorites.
- Trash folders recursively, restore them, view recent items, search by file/folder name.
- View metadata versions when a file with the same name is uploaded again. **Previous file content is not archived in this prototype**, and historical content cannot be restored.
- Change a demonstration RAG/DCOS permission flag for writable drives. **This does not configure a real worker or grant secure access.**

Demo storage is scoped by the application workspace prefix and the active demo person. This is **not a substitute for authorization**; production access rules must be enforced by the backend.

### Known limits

- Browsers may clear IndexedDB/localStorage data. This is **not a backup**.
- The 100 GB/500 GB quota values are **illustrative configuration ceilings**, not real storage allocations.
- Sample CRM/ERP records contain metadata only; their file bytes are absent.
- Sharing, ACL enforcement, OneDrive/NAS connectivity, sync, document previews, virus scanning, retention and real AI retrieval require backend services.
- UI metadata version history is not a complete, immutable versioning system.

## 3. Data architecture (target, not fully implemented)

```
PioOne Web UI (browser file explorer)
  -> Authenticated Document API / secure PioOne Gateway
    -> PostgreSQL (metadata, folders, drives, ACL, versions, links, quotas)
    -> S3-compatible object storage (immutable document version blobs)
    -> Document connector service (OneDrive / SharePoint / NAS)
    -> Document-indexing outbox
       -> PioBrain (OCR, extraction, chunks, embeddings, vector/hybrid retrieval)
          -> PioWorker / DCOS via permission-checked Knowledge API
    -> PioSphere/PioLiance backup controller (WAL/PITR, object replication, recovery)
```

Target logical entities:
- `storage_provider` — provider type, endpoint reference, residency, health and credential-secret ref.
- `drive` — tenant, owner user/team/organization, drive kind, quota and policy.
- `folder` — drive, parent, name, lineage/materialized path and access scope.
- `document` — drive/folder, owner, document type, lifecycle status, legal hold, classification.
- `document_version` — sequential version, immutable object key/version, checksum, encryption key ref, byte count and MIME type.
- `document_link` — CRM/ERP/HR/Travel/PioPakt/KiDiS business object reference.
- `document_acl` — user, role, department/team/worker subject and allowed actions.
- `document_knowledge_policy` — indexing/retrieval approvals and allowed workers with time/purpose constraints.
- `knowledge_chunk` — derived chunk with document ID and version ID, indexed by PioBrain.
- `audit_event` — actor, action, resource, time, outcome, correlation ID.
- `backup_manifest` — consistent database WAL point, object-version references, worker state/config and application release compatibility.

For the V27 DMS SQL starter, see `db/migrations/001_dms_starter.sql`. It is **not production-ready**. The above added entities are specified but not deployed.

## 4. DCOS and morning briefing permissions

DCOS must never read arbitrary user directories automatically. The user may explicitly allow designated folders for retrieval. PioBrain must enforce tenant, user-delegation and worker-scope authorization at retrieval time and respect document version/revocation events. Official CRM/ERP records remain governed by their respective applications. Morning briefing output must record source version IDs and be permission-filtered at viewing time.

## 5. Backup / recovery requirements inherited from V27

- Per-tenant managed cloud, hybrid customer-hosted PostgreSQL or PioLiance deployment model.
- S3/object storage, NAS or removable destination for document backups; OneDrive only for suitable encrypted export packages, never live PostgreSQL datafiles.
- PostgreSQL physical snapshots plus WAL point-in-time recovery.
- Immutable file versions; independent offsite copies; retention and periodic restore tests.
- Restore planner separates **application release version** from **backup recovery point**, checks schema compatibility and requires preflight/approvals.
- Customer migration uses authenticated gateways, integrity validation, staged cutover and rollback planning.

These remain specification and UI-planning features. Operational backup/restore requires backend workers and system permissions.

## 6. Technical source files

```
app/webui/src/features/DocumentsOverview.tsx   V28 interactive explorer
app/webui/src/features/documentsV28.css          Responsive documents styling
app/webui/src/core/documentsModel.ts             Pure document metadata model and safeguards
app/webui/src/core/documentBlobs.ts              IndexedDB demo blob adapter
app/webui/src/locales/de.json                    V28 German UI strings
app/webui/src/app/PageRouter.tsx                 Workspace route integration
app/webui/scripts/test-documents.mjs             V28 model tests
app/webui/package.json                           Version and test script
```

All V27 application modules, data residency/backup UI and public/business workflows remain in the package.

## 7. Installation and verification

```
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Node.js 22 recommended. Always run `npm install` and **not** `npm run install`.

## 8. Localization carry-forward

V28 improves DE/EN display of the Workflow Center navigation and high-level workflow template titles and descriptions. Translation coverage of legacy workflow step labels and descriptions remains incomplete; a comprehensive localization audit is required before production release.
