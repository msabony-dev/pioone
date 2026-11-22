# PioOne V32.5 — Engineering Implementation Specifications

**Status:** Proposed production implementation contracts. **Target baseline:** PioOne V32.5 React frontend.  
**Verified repository:** [msabony-dev/pioone](https://github.com/msabony-dev/pioone), branches `main` and `dev`.  
**Source of existing behavior:** `README.md`, `docs/SPECIFICATION.md` (V32 UI), and `docs/releases/V32.5-RELEASE-NOTES.md`.

The current repository documents a **frontend prototype** with local browser data and Keycloak OIDC integration options. The backend data models, endpoints and state machines in this directory are **proposed implementation requirements**, not existing production services.

## Specifications

| Domain | Detailed specification |
|---|---|
| Shared platform contracts | [PLATFORM-ARCHITECTURE.md](PLATFORM-ARCHITECTURE.md) |
| My Assistant / DCOS | [ASSISTANT-DCOS.md](ASSISTANT-DCOS.md) |
| Files & Document Management (Datei & DMS) | [FILES-DMS.md](FILES-DMS.md) |
| Customer Relationship Management | [CRM.md](CRM.md) |
| Enterprise Resource Planning | [ERP.md](ERP.md) |

## PioOne product principle

**One workspace for all daily work**: people, digital workers, communications, private files, team folders, enterprise documents, CRM, ERP, approvals and knowledge. The browser UI is a unified surface; authoritative data stays with the responsible business service.

**Common design rules**
- Every resource is tenant-scoped; every private file is user-owned unless explicitly shared.
- DCOS uses source APIs and PioBrain retrieval with delegated authorization, never broad direct database access.
- CRM owns commercial pipeline and quotes; ERP owns posted finance and operational transactions; DMS owns file bytes/versions; PioWorker owns execution state.
- PostgreSQL for business/metadata state, S3-compatible storage for native file content; OneDrive is an external file connector, **not a live database volume**.
- Business writes require authenticated server-side authorization, idempotency and audit.
- German and English UI and responsive desktop/mobile workflows are required.
- Cloud, hybrid, on-prem and air-gapped deployments must define both **where data is stored** and **where data is processed**.
- Recovery must coordinate database backup/PITR with exact document object versions and worker definitions.

## Implementation order

1. Verify V32.5 UI routes, module capabilities, auth flow and existing test suite.
2. Create shared OIDC identity + tenant policy enforcement, audit events, service contracts, migrations and object storage registry.
3. Deliver native personal/team/enterprise drives, folders, upload/version/share/retention APIs and DMS integration.
4. Deliver CRM leads, contacts/accounts, opportunity pipelines, activities and quote lifecycle.
5. Deliver Assistant briefing connectors and worker orchestration, with human approval and source citations.
6. Deliver ERP posting foundation, sales orders, AR/AP, procurement, inventory and bank reconciliation.
7. Integrate DE/EN responsive UI, security, monitoring, backup/restore and end-to-end acceptance tests.

## Release acceptance checklist

- Migratable schema with tenant-safe composite foreign keys and index coverage.
- Versioned OpenAPI/protobuf schemas, audit and error-code catalog.
- State transitions tested, including invalid states and retry/idempotency paths.
- Privacy/ACL testing: no cross-tenant, cross-user personal-file or unauthorized worker access.
- Backup and isolated restore verified across Postgres and binary object versions.
- E2E tests under both German and English, desktop and mobile.
- Production behavior distinguished from prototype simulation in docs and UI.

**Important:** No service is production-ready merely because a specification or React screen exists. All proposals must be reconciled with the checked-out V32.5 code and approved by engineering, security and finance/domain owners.
