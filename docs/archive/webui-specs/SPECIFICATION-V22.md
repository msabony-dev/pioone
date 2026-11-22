# PioOne V22 — Contracts (PioPakt)

## Scope and navigation
V22 extends V21 with a dedicated Contracts (PioPakt) application in Apps / Application Hub. Existing Tenders & Contracts routes and records remain separate and unchanged; PioPakt covers ongoing contract lifecycle management rather than tender workflows. The seven new module routes follow `Contracts (PioPakt)/<module>`. The catalog now contains 14 applications and 99 modules (previously 13/92). PioBrain embedding and the external-tab fallback are unchanged.

| Module | V22 prototype behavior |
|---|---|
| Contract Dashboard | Four computed sample KPIs, deadline and risk summaries |
| Contract Register | Search, category filters, read-only contract details and sample clauses; scoped draft list where authorized |
| Contract Intake | Manual metadata entry and local draft persistence; contextual New record action |
| Contract Deadlines | Static reference deadline flags and dates |
| Contract Approvals | Read-only illustrative human review queue; no approval or execution |
| Contract Analytics | Animated annual contract-value chart by category, reduced-motion support |
| Contract Settings | Read-only worker owner, knowledge/document platform and proposed source connections |

DE and EN navigation and UI controls; source contract types and clauses are German examples. Sample data adapted from the supplied Vertragsmanagement Worker.html (15 records, anonymized counterparties); dashboard figures computed from these 15 records rather than copying the reference cockpit's illustrative headline totals. No representation of real contracts. Product lifecycle and integrations are based on the supplied PioPakt product brief: capture, understand, organize, monitor, analyze, prepare actions. OCR, connected intake, actual reminders, versioned document storage, execution and legally effective approvals are not implemented.

## Governance and workforce
Every new module uses the existing entitlement, activation, role and team-grant gates, plus the standard module-specific worker registry and version binding. One functional position for PioPakt, seven module assignments (not seven physical workers or running instances). Fresh PioVation demo: Legal & Compliance Officer accountable; Executive, Finance and Legal demo teams have PioPakt access. Existing custom user/team grants are not expanded. Existing saved entitlement/activation lists are retained; use Settings > Module access to enable new modules (platform administrator grants entitlement, tenant administrator activates and grants access), and assign them to relevant teams. Existing worker/workforce data are merged with new demo defaults without overriding existing bindings; actual worker endpoints are not provisioned. Existing 54-person/19-team company structure unchanged.

## Data structure
The local prototype uses the existing `QuickDraft` storage model: `id`, `module`, `owner`, `workspace`, `createdAt`, `status=Draft`, `fields {title, partner, category, amount, currency, end, notes}`. New drafts are not signed contracts or accounting entries. The read-only reference catalog contains contract ID, counterparty label, type, category, annual value, end date, status, risk, deadline description, notice period, renewal description, confidence and sample clauses. Neither file contains operational documents. Existing storage namespace and port preserved.

Production design (not implemented): `contract`, `contract_party`, `contract_version`, `contract_document`, `contract_clause`, `contract_deadline`, `contract_risk`, `contract_action_draft`, `contract_approval`, `contract_audit_event`; each tenant/organization scoped, document/version linked with source provenance. Require backend authorization, record-level access, explicit approval permissions, separation of duties, immutable audit records, validated deadlines, idempotent action execution, retention rules and encrypted storage. Integration candidates: PioBrain, PioAkte, ERP, DMS/d.velop, SharePoint, email, calendar and SMB. The product brief states integration availability is project-dependent.

## Validation
Model tests cover all 99 routes and assignments, contextual create permissions, new metadata validation, legacy Tenders & Contracts routes, accountability and PioBrain routing. TypeScript syntax validation is not a production build. Dependency install unavailable from local npm cache; browser rendering and external PioBrain SSO not verified in this environment.
