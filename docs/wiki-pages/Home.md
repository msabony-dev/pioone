# PioOne — Product & Engineering Wiki

> **The AI-Native Enterprise Workspace**  
> **One Workspace. One Workforce. One Enterprise.**  
> By PioVation

PioOne brings **human and digital workers, communication, personal files, enterprise applications, governed knowledge and business processes** into one daily workspace. It integrates My Assistant (DCOS), Files & DMS, CRM, ERP and other applications while keeping records with their authoritative systems.

## Product and release

- [PioOne repository and getting started](https://github.com/msabony-dev/pioone/blob/main/README.md)
- [V32.5 release notes](https://github.com/msabony-dev/pioone/blob/main/docs/releases/V32.5-RELEASE-NOTES.md)
- [Current product/UI specification (V32)](https://github.com/msabony-dev/pioone/blob/main/docs/SPECIFICATION.md)
- [Engineering specifications index (V32.5 target)](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/README.md)

## Architecture and implementation

| Topic | Engineering documentation |
|---|---|
| Architecture, data sovereignty, storage, identity and events | [Platform architecture](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/PLATFORM-ARCHITECTURE.md) |
| Personal Assistant / DCOS, workers, morning briefing and workflows | [My Assistant / DCOS](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/ASSISTANT-DCOS.md) |
| Private drive, file explorer, team storage, governed records and RAG | [Files & DMS](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/FILES-DMS.md) |
| Leads, accounts, contacts, opportunities, quotations and sales workflows | [CRM](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/CRM.md) |
| Accounting, invoices, procurement, payments, inventory and finance | [ERP](https://github.com/msabony-dev/pioone/blob/docs/v32-5-domain-implementation/docs/implementation/v32.5/ERP.md) |

## Key architectural principles

- One workspace for all daily work; **personal storage is private by default** and does not require business-module links.
- Business records are owned by CRM, ERP and DMS services, **not the Assistant**.
- PioBrain retrieves only documents authorized by the source's access rules.
- Digital workers act under delegated scopes and human approval requirements.
- Versioning, audit, backup/restore, tenancy and data residency are designed as cross-cutting capabilities.
- Backend specifications are **proposals**, not claims of currently deployed V32.5 services.

## Getting started for developers

```bash
git clone https://github.com/msabony-dev/pioone.git
cd pioone/app/webui
npm install
npm run dev
```

The repository's current V32.5 release is a frontend prototype. Actual production services and associated database implementations must be verified before live business use.

**Documentation policy:** Write all GitHub materials in English. Keep the versioned Markdown under `docs/` as the single source of truth. This Wiki is a navigation and explanation layer; update links as documents are merged.
