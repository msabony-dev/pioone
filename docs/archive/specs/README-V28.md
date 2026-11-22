# PioOne V28 — Complete React/Vite Frontend Source

This repository contains the PioOne enterprise workspace frontend source. **V28 introduces a unified Documents/File Explorer** with My Drive, Team Drives, Enterprise Documents, connected-drive placeholders, navigation, upload/download in browser storage, folder operations, favorites, trash and restoration, local AI access flags and a usage display.

All existing V27 frontend modules and pages are retained, including 14 application groups / 99 modules, DCOS and workflows, Data Residency & Storage and the Data Protection Center.

## Quick start

```bash
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Use **`npm install`** (not `npm run install`).

## Documentation

- [V28 full feature specification](docs/PIOONE-V28-SPECIFICATION.md)
- [V27 architecture and data protection specification](docs/PIOONE-V27-SPECIFICATION.md)
- [V28 validation and limitations](docs/V28-VALIDATION.md)

## Architecture boundary

This is a **complete frontend source package, not the complete production platform**. A real personal drive requires an authenticated backend, persistent database metadata, object storage, tenant/worker access checks, virus scanning, version retention, backup, restore and connector services. This demo uses browser-local storage only.


V30: Public landing and Keycloak login. See `docs/PIOONE-V30-LANDING-AND-KEYCLOAK.md`.
