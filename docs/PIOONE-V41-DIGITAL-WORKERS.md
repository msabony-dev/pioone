# PioOne V41 — Digital Worker catalog and controls

## Navigation

- **My Assistant** stays a first-class sidebar entry and is the first catalog role, with PioBrain and communications.
- **Digital Workers (DW)** has the existing three subtabs: **DWs**, **DW Organisations**, **DW Settings**.
- **DWs** offers the long, categorized functional catalog (HR, finance, sales, travel, etc.) with status **Active/Deactivated** and per-worker **Run / Edit / Settings / Activate** actions.
- **DW Settings → Worker assignments** lists functional DW roles (including My Assistant), not CRM/ERP modules. Each can select an available runtime worker from the registry using the **Connected worker** selector and set its activation state.
- **DW Settings → Worker Factory** continues to create worker definitions and manage version/release records.
- **DW Organisations** retains organizational positions, supervisors and workforce assignments.

## Worker / runtime distinction

A *DW role* describes a business capability (e.g. DW-HR, DW-Lead-to-Cash). A *worker runtime implementation* is an assignable worker definition with versioned releases/endpoints. A role can be assigned to a runtime worker in DW Settings. This is a local demo configuration; **Run never claims production execution**. Even when active and assigned, without a real authorized backend the UI shows an explicit demo warning. The selected runtime is persisted as `Worker.runtimeWorkerId` in the existing local worker registry. Status is persisted as `Worker.status`.

Catalog data is defined in `app/webui/src/features/digitalWorkerCatalog.ts`. Existing V40 data is preserved and the catalog is merged additively; old name `DW-HW` is corrected to `DW-HR`.

## Safety and implementation status

V41 remains a React UI prototype based on the previous V40 local source, not the newer GitHub V32.5 frontend. Worker statuses, assignments, versions and descriptions are browser-local data. No production runtime, permission checks, gRPC execution or backend deployment has been implemented by this update.

## Verification

The changed TypeScript/TSX source files passed standalone TypeScript syntax/transpile diagnostics. A full Vite build is not confirmed because npm dependencies were not installed in the available source tree.
