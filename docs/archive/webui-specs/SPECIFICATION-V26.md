# PioOne V26 — DCOS Public Administration Workflows

**Version:** 26.0.0 · **Status:** front-end prototype, browser-local execution · **Path:** `app/webui`

## Additions
- One DCOS engine and shared Workflow Center with three libraries: **Business Workflows**, **Public Workflows** (external applications), **Internal Administration**.
- Four external public templates: Application-to-Decision (11 stages), Permit-to-Issuance (10), Grant-to-Disbursement (12), Complaint-to-Resolution (7).
- Four internal templates: Travel-to-Reimbursement (9 stages), Request-to-Approval (6), Public-Procure-to-Pay (10), Public-Hire-to-Retire (9).
- All four existing enterprise templates remain unchanged: Lead-to-Cash, Procure-to-Pay, Hire-to-Retire and Request-to-Resolution.
- Demonstration case metadata: case reference, applicant, competent department, due date. Human gates and simulated case returns, resumption and rejection with reasons.
- Existing builder, workflow runs, approvals, worker assignments and analytics cover all 12 templates.

## Constraints
- **No real administrative act, legally effective notice, signature, payment, travel approval or citizen-portal action is performed.**
- Browser localStorage is editable and cannot be used as an audit source. Selected UI roles do not provide real authorization.
- Workflow templates are **illustrative**, not legally verified for all jurisdictions; statutory deadlines and delegation rules must be configured and verified per authority/procedure.
- Production requires durable versioned workflows, secure tenant/case roles, delegated signatories, 4-eyes approvals, DMS/eAkte integrations, eID and official delivery where needed, evidentiary records, retention, and jurisdiction-dependent compliance review.
- The correct current postal/invoice capture product name is **PioPost**; legacy PioAkte case references retain their original historical naming.

## Detailed travel administrative workflow

See [`../../docs/TRAVEL-TO-REIMBURSEMENT-SPECIFICATION.md`](../../docs/TRAVEL-TO-REIMBURSEMENT-SPECIFICATION.md) for the nine-stage travel workflow, role separation, policy, case data, approval decisions, branch paths, audit, deadlines and V26 API integration requirements. This is a proposed design, not a claim of complete implementation.
