# PioOne V19 — Context-Aware Quick Create

## Release scope
V19 extends V18 without removing applications, modules, PioVation's 54-person / 19-team reference organisation, the interactive organisation chart or animated Company, DCOS, CRM and ERP dashboards. The 13 applications and 92 module catalogue entries remain unchanged. V19 introduces a global context-aware creation menu in the workspace header. This is a local UI prototype, not a production transaction system.

## Functional behaviour
- The menu is labelled **New record / Neuer Vorgang**, available throughout the workspace header. Actions depend on the current section, route, application filter, enabled core features, module access and communication provider availability. An exact matching module action is ranked first. The application hub without a selected application shows all authorized application creation actions.
- Home and DCOS provide task, document import, meeting and email shortcuts, subject to availability. Communication offers email, meeting and authorized CRM contact creation. Documents opens authorized capture workflows. Tasks opens task creation.
- CRM: contact, lead, customer account, opportunity and quotation. ERP: invoice, purchase order, supplier, payment draft, journal draft and invoice import. HR: employee draft, application, leave request and personnel capture. Projects: project, task, milestone and time entry. Other applications provide selected relevant creation actions; not every module is a createable entity. Reporting, approval and other read-only modules are not given generic bypass actions.
- Document Processing opens existing Capture Center or Digital Mailroom; there is no new blank document editor. Travel Requests, Booking and Expenses open existing travel workflows; approval and settlement checks remain unchanged. Booking and expense operations require appropriate existing travel records. Email uses the existing composer, meetings and tasks use the existing local stores.
- Structured business drafts open a modal form with localized labels, required fields, type validation, positive amounts, three-letter uppercase currency syntax and chronological date checks. Currency defaults to EUR. ISO currency membership, accounting calculations and full domain validation are not implemented. Save navigates to the target module, where the structured draft is shown in an expandable record list. Cancel or Escape discards unsaved input. Context changes close the menu and draft form. Permissions are checked again at save time.

## Data model (local prototype)
`QuickDraft` is a separate local record, not an accounting entry or the proposed production relational data model.

| Field | Type | Meaning |
|---|---|---|
| id | string UUID | Locally generated identifier |
| module | string | Exact catalogue module route |
| owner | string | Current demo person ID |
| workspace | string | Existing tenant/org/person/role/scope context key |
| createdAt | ISO timestamp string | Local creation timestamp |
| status | literal Draft | No production posting or approval |
| fields | Record<string,string> | Form-specific trimmed values |

Storage key: `pio19-<encoded tenant>-<encoded organization>-quickDrafts`. Ordinary users see their own drafts in their current workspace context; tenant SuperAdmin can view all drafts for an authorized module in that tenant/organisation. Existing generic demo records remain separate. Draft editing/deletion and migration of previous local data are not implemented. Existing task, meeting and email stores retain their earlier prototype semantics.

### Structured form examples
- Contact: firstName, lastName, optional email, company, phone, notes.
- Invoice: customer, draft reference, invoice date, due date, amount, currency, optional notes.
- Purchase order: supplier, title, amount, currency, notes.
- Leave: start date, end date, notes.
- Time entry: title, date, hours, notes.
- Other selected entities use smaller title/notes forms or domain fields defined in `src/core/quickCreate.ts`.

## Production requirements
Backend must derive tenant and actor from authenticated identity, authorize **create** separately from read, enforce scope and separation of duties, validate domain constraints and referenced entities, perform idempotent transactional writes and generate audit events. UI checks and localStorage are not security boundaries. The invoice/payment/journal drafts do not issue invoices, post ledger entries or transfer funds. Employee drafts do not create user identities. Document capture stores prototype metadata according to the existing workflow. No external meeting invitations or emails are transmitted. Production service contracts and storage should follow the V18 complete specification and physical data model; this release adds only local QuickDraft semantics.

## Acceptance and validation
- All existing domain tests: 13 applications, 92 module routes/assignments, 54 people, 19 teams, reporting tree, travel approvals, dashboard calculations and organisation diagram.
- New model tests: contextual menu ordering, application filtering, route existence, access denial, disabled core features, missing provider, validation and draft visibility.
- Syntax transpilation of all 55 TS/TSX source files: passed.
- Full dependency-backed Vite build, browser interaction, responsive layout, accessibility and end-to-end persistence testing: pending. React/Vite dependencies are not installed in the validation environment.

## Run
`npm install`, `npm run dev` (port 5219), `npm run test:model`, `npm run build`. V19 uses a separate `pio19-` browser storage namespace. V18 and its custom local changes are not modified or automatically migrated.
