# PioOne V31 – KMU Process Engine (Browser-Demo)

Builds on PioOne V30, preserving public landing page, email-only isolated demo and Keycloak sign in/sign up.

## Changes
- Assistant → Workflow Assistant → **KMU Process Engine** on desktop and mobile.
- Seven cross-functional KMU process templates: Lead-to-Customer, Order-to-Cash, Procure-to-Pay, Hire-to-Retire, Project-to-Invoice, Document-to-Knowledge, Request-to-Resolution.
- Interactive local simulation: create process instances, advance demo steps, require human approvals, reject, show steps/worker/application ownership, audit timeline, JSON demo export.
- Role indication for demo approval (Team Leader / administrator).
- No backend integration, no external API calls, no actual invoices/payments/emails, no live AI workers, no production grade authorization or audit; browser storage only.
- Existing Workflow Assistant screens, DMS, documentation and V30 landing remain intact.

## Production requirements (not implemented)
- Keycloak token validation and tenant-scoped RBAC/ABAC in backend.
- Durable Go/gRPC workflow API backed by Postgres, Temporal, idempotency and transactional outbox.
- Audited human gate and two-person approval for sensitive transactions; actor separation.
- Versioned worker manifests, strict tool privileges, connector readiness checks and secrets management.
- Retry, compensations, timeouts, error handling, monitoring, and domain-specific accounting/HR/compliance validations.
- APIs/integrations for DATEV, email, calendar, DMS, ERP, CRM, banking.

## Local run
`cd app/webui && npm install && npm run dev`
Open `/demo` and enter a demo email, then Assistant → Workflow Assistant → KMU Process Engine.
