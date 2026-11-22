# PioOne V24 — Configurable assistants

## Scope
V24 extends the existing V23 React prototype, retaining the 14 business applications / 99 modules, DCOS tasks, embedded PioBrain, PioPakt, organisation, dashboards and existing routes. Assistants is a separate core workspace, not a fifteenth business application. Port and existing `pio19-` storage namespace remain unchanged.

## UI
- My Assistants: locally saved personal or assigned configurations; DCOS link; draft/active status, version, owner and simulation queue counts.
- Template Library: searchable templates for notary, legal, tax, property, sales, HR, purchasing, finance, contracts (PioPakt), documents (PioAkte), and custom configuration. Templates are presets, not separate products or connected workers.
- Assistant Builder: name, owner, reviewer, trigger, requested sources, instructions, ordered workflow steps (prepare/review/action), reorder/add/delete, draft and activation. An independent reviewer and a review step before any action are required for activation. Each save increments the version of an existing configuration; this is a revision counter, not a complete release history.
- Workflows: manual simulation with fictional input; immutable snapshot of configured steps. Trigger fields are descriptive configuration only; no email listeners, timers or scheduler are connected.
- Activity & Audit: local simulation log, human approval/rejection. The named reviewer cannot be the requester or accountable owner. Approval changes only the local run status and never executes tools.
- DCOS: navigation to specialist assistants and simulation approvals. DCOS is the personal coordinating role, but no live delegation or orchestration is implemented.
- DE/EN interface. User-created names and workflow text are retained as entered.

## Data model (implemented locally)
`Assistant { id, template, name, ownerId, reviewerId, trigger, sources[], rules, steps[], version, status }`
`Step { id, label, kind: Prepare | Review | Action }`
`Run { id, assistantId, name, version, ownerId, reviewerId, requestedBy, createdAt, input, steps[], status, events[] }`
`Event { at, actor, message }`
`Trigger = Manual | Incoming document | Incoming email | Schedule`
`AssistantStatus = Draft | Active`; `RunStatus = Awaiting review | Approved | Rejected`.
Local storage keys: `<tenant/org prefix>assistants-v24` and `<tenant/org prefix>assistant-runs-v24`. Existing storage is not migrated or deleted. Active configuration editing requires a new save; saved runs retain their original workflow steps and reviewer. The run log is not a tamper-proof audit trail.

## Governance (prototype)
Tenant SuperAdmin can view/configure all assistants in the selected organisation; owners configure their own and reviewers can see assigned assistants/runs. Platform SuperAdmin is denied this workspace. A reviewer must be a distinct person, and a run cannot be approved by its initiator or owner. Scope is organisation + person/role demonstration, not production team/department RBAC. The client role switch and localStorage are not security boundaries. Do not enter real client, legal or confidential information.

## Production target (not implemented)
Use PioWorker as execution runtime, PioBrain for authorized knowledge, DCOS for coordination, and approved application connectors. Backend must enforce tenant, user, team and case permissions on every read, invocation, and action; use server-side versioned templates, tool allowlists, explicit approvals with separation of duties, least privilege, authenticated gRPC APIs, policy checks before each external action, durable workflow orchestration, idempotency, retries, cancellation, secrets management, append-only audit, retention and backups. Version and pin configuration releases and immutable workflow inputs. Model output is untrusted; never execute arbitrary generated instructions. Validate template-specific rules with qualified professionals; notary, legal and tax decisions remain with the authorized human. Dedicated permissions, organisation/worker-registry bindings, actual data-source integration, licensing and scheduling require further implementation.

## Validation
Existing model suite plus V24 assistant route, template, validation, reviewer separation, and snapshot tests pass. TypeScript syntax transpilation of 59 source files passes. Full Vite build and live browser validation not verified because dependencies are not installed/cached in the environment. Run `npm install`, `npm run test:model`, `npm run build`, `npm run dev` on a connected development machine.
