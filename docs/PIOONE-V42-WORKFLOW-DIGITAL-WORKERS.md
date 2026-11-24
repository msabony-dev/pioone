# PioOne V42 — Workflow Digital Workers

## Product decision

- **My Assistant** keeps its dedicated sidebar item and contains PioBrain, Communication, personal briefings, tasks and approvals. Workflow menus have been removed from My Assistant.
- **Digital Workers (DW) → DWs → Workflows** is the location for process-oriented digital worker roles.
- Every workflow role begins with **`DW-`**, including `DW-Lead-to-Cash`.
- The Workflow category includes the twelve workflow templates already present in `app/webui/src/core/workflows.ts`, plus `DW-Workflow-Automation`. The existing catalog role `DW-Lead-to-Cash` is moved out of Sales & CRM, and `DW-Procure-to-Pay` out of Finance & Procurement, to avoid duplicates.
- The same list also appears under **DW Settings → Worker assignments**, with status and runtime assignment controls.
- Existing worker states, editions and bindings use the same registry and are not reset.

## Workflow DWs

- `DW-Lead-to-Cash`
- `DW-Procure-to-Pay`
- `DW-Hire-to-Retire`
- `DW-Request-to-Resolution`
- `DW-Application-to-Decision`
- `DW-Permit-to-Issuance`
- `DW-Grant-to-Disbursement`
- `DW-Complaint-to-Resolution`
- `DW-Travel-to-Reimbursement`
- `DW-Request-to-Approval`
- `DW-Public-Procure-to-Pay`
- `DW-Public-Hire-to-Retire`
- `DW-Workflow-Automation`

## UI behavior

Every workflow DW has Active/Deactivated status, Run, Edit and Settings controls like other digital workers. Run is still a local preview warning, not a real workflow execution. No backend or connector implementation is implied by this catalog. The historic WorkflowCenter code and locally stored demo runs are retained for compatibility; it is no longer exposed as a My Assistant navigation item.

## Testing

Run `cd app/webui && npm install && npm run build` when npm dependencies are available.
