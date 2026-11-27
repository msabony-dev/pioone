# PioOne — End-User Product Specification (English)

**Product:** PioOne by PioVation
**Version baseline:** V42
**Audience:** Employees, team leaders, managers and organizational administrators
**Document type:** End-user product and intended capabilities specification
**Important:** V42 in the connected repository is a **frontend prototype**, with demonstration data and interactions. The descriptions below distinguish current prototype experience from planned production services. They are not commitments that all backend functions are available today.

## 1. PioOne at a glance

**PioOne is the AI-native enterprise operating system for your daily work.** It combines people, digital workers, communications, personal files, enterprise applications and workflows in a single environment. Rather than moving between separate systems to check emails, review documents, follow up on customers and approve requests, users can organize work from one workspace.

PioOne is designed around two collaborating workforces: human employees retain accountability for decisions, while digital workers help prepare, coordinate and execute approved tasks.

## 2. Who uses PioOne?

| User | Everyday goal | Typical activities |
|---|---|---|
| Employee | Focus on daily responsibilities | Personal briefing, email, files, tasks, meetings, business records |
| Team leader | Coordinate people and work | Assign tasks, review pending approvals, monitor team workflows |
| Department leader | Monitor functional operations | Department dashboards, service queues, budgets, worker assignments |
| Company administrator | Configure the environment | Organizations, roles, access, modules, storage and worker availability |
| Digital worker | Assist under supervision | Retrieve permitted context, prepare drafts, start approved workflows |

Your exact features depend on organization policy, enabled modules, subscription and deployment.

## 3. Main workspace areas

### Home and My Assistant (DCOS)
Your personal starting point for the workday. The target experience includes daily briefings, important emails, scanned incoming post, CRM activities, ERP alerts, upcoming appointments, approvals and suggested next steps. Ask questions about accessible records, review source references and initiate controlled actions. **My Assistant does not automatically read your private files or execute binding actions.**

### Communication and collaboration
Access email, calendar, meetings, calls, messaging, contacts and tasks in one place, subject to connected-provider support. Organize your day, plan meetings and track follow-ups.

### Files & DMS
A unified file explorer organized into:
- **My Drive**: your own private storage for PDFs, images, presentations and other permitted files, even if unrelated to business applications.
- **Team Drives**: shared folders for teams and projects.
- **Enterprise Documents**: documents attached to CRM, ERP, HR, Travel, PioPakt and other enterprise records.
- **Connected Drives**: intended connections to OneDrive, SharePoint and network/cloud storage.

A mature DMS supports folder trees, upload/download, preview, version history, access rights, sharing, quota management, search, retention and recovery. File visibility and digital-worker access must follow your permissions.

### CRM — Customer Relationships
Manage leads, accounts, contacts, opportunities, sales activities, quotes, follow-ups and customer service processes. My Assistant can highlight opportunities and upcoming actions. Confirmed sales can be handed over to ERP via approved workflows.

### ERP — Business Operations and Finance
Work with orders, purchasing, suppliers, invoices, receivables/payables, finance, budgets, inventory and payments, as enabled by your organization. Financial postings and bank payments must be validated by authoritative ERP services and approved according to company policy.

### Other business applications
PioOne's target workspace also includes HR, Projects, Travel, Contracts/PioPakt, PioPost document intake, governance, IT/service processes and analytics. Availability varies by release and deployment.

### Digital workforce and Workflows
A digital worker has a defined role, permitted data sources, assigned applications, tools and a responsible human. Use workflow templates for Lead-to-Cash, Procure-to-Pay, Hire-to-Retire and Request-to-Resolution. Progress, human approvals and results should be traceable.

### V42 navigation and workflow Digital Workers
My Assistant keeps personal briefings, PioBrain, communication, tasks and approvals. Process-oriented roles are under **Digital Workers (DW) > DWs > Workflows**, with twelve workflow templates plus **DW-Workflow-Automation**. Every workflow role begins with DW-, including DW-Lead-to-Cash and DW-Procure-to-Pay.

Use **DW Organisations** to view digital positions and responsibilities. **Worker Factory** is a separate Digital Workers tab for worker definitions and versions. Under **DW Settings**, Worker assignments controls role status and runtime bindings; Digital positions manages accountability. **Settings > Database & Backup** contains local database and backup configuration previews.

In **Files & DMS**, the **Local Computer** source lets you choose a folder on your computer for read-only browsing, filename search, file previews and downloads. Folder selection is required again after reload. Local files are not automatically uploaded, synced, indexed or made available to AI workers. The supplied local explorer currently uses German labels.

Active/Deactivated, Run, Edit and Settings controls are demonstration interactions. Run displays a local preview warning; it does not execute a production workflow. Existing worker versions and bindings remain in the shared browser-local registry.

### PioBrain knowledge
Search and work with permitted organizational knowledge using documents and data with source references. Indexing personal files requires explicit access permission or another valid organizational basis; a generated AI answer must not replace an authoritative business record.

## 4. A typical workday in PioOne

1. **Open PioOne** and sign in using your organization's configured identity provider (or enter demonstration mode).
2. **Review Home / My Assistant** for upcoming meetings, urgent items, follow-ups and draft briefing.
3. **Open the relevant source**—email, scanned post, CRM record, ERP invoice, task or document.
4. **Work with files** in My Drive, shared folders, enterprise DMS or an approved connected provider.
5. **Ask My Assistant** for a summary, draft, checklist or suggested action based on authorized sources.
6. **Approve or reject** sensitive workflow actions when your responsibility requires a human decision.
7. **Track progress** in workflows and your application dashboards; check that a business transaction really completed.

### Example: a customer inquiry
Incoming message → create/attach CRM lead → qualify and schedule follow-up → prepare quotation → approval and acceptance → approved order creation in ERP → invoicing/payment tracking. Each business application remains the authoritative owner of its records.

### Example: incoming invoice
PioPost scan or uploaded document → extraction/classification → DMS file version → ERP payable draft → validation and matching → human approval → posted invoice → authorized payment and bank reconciliation.

## 5. Privacy and access

- Access depends on tenant, team, role, business record and granted privileges.
- Your personal drive is private by default; sharing and AI access require appropriate authorization.
- Digital workers act with defined scopes and can be subject to explicit human approval.
- Data storage and AI processing locations depend on the selected cloud, hybrid or on-prem deployment.
- Backups, retention, versioning and disaster recovery are organization-level capabilities requiring operational backend services.

## 6. Devices and languages

PioOne is designed for desktop browsers, tablets and smartphones. The workspace supports English and German UI language choices. Specific screen responsiveness and translation completeness must be tested for each release.

## 7. What is available in V42?

**Verified repository description:** V42 contains a React/Vite frontend prototype, PioVation branding, a public landing page, demonstration workflows, configurable Keycloak OIDC login flows and browser-local demonstration data. The repository README explicitly states there is **no production backend**, no live PostgreSQL APIs/object storage/connector authorization, no full access-control enforcement, no live RAG indexing and no operational backup/restore.

**Planned implementation:** persistent multi-user data, file synchronization, real CRM/ERP transactions, authorized PioWorker execution, production audit/approval services, RAG indexing, storage connectors and disaster recovery.

Do **not** use demonstration interactions as proof of real payment, invoice issuance, legal approval, data migration or security enforcement.

## 8. Getting started

For a product tour, use the **Try the demo** option on the landing page. For organizational access, use **Sign in** or **Sign up** when an identity provider is configured. Use the language selector to switch between English and German.

For developer installation, technical data models and backend proposals, see the repository's versioned documentation under `docs/implementation/v32.5/`. This document is intended for end users, not as a database or API reference.

© PioVation. PioOne product description and intended capability guide.
