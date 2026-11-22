# PioOne V27 — Release Notes

## UI additions
- Settings > Data Residency & Storage (new): cloud/hybrid/on-prem models; configurable PostgreSQL service; document connector, PioBrain and worker locality; gateway toggle; compatibility/sovereignty warnings; local draft export.
- Data location migration planner: required scopes, change reason, validation and export of a non-executable JSON runbook.
- Settings > Data Protection Center: backup destination drafts (local/NAS/S3/OneDrive export/remote/offline), backup policy drafts, PITR constraints, illustrative recovery manifests, restore-plan export, separate software release and data-point selectors, versioning and architecture.

## Existing functionality preserved
- Existing navigation, 14 application groups and 99 catalog module routes.
- V26 DCOS workflows: four commercial, four public external and four public internal workflows.
- Existing React app, PioBrain, Assistants, PioPakt and all other feature sources.

## Verification completed
- `node scripts/test-model.mjs`: PASSED, including V27 residency/migration/backup pure-model tests.
- TypeScript/TSX syntax parsing across all `src/` files: PASSED (0 parse errors).
- Archive integrity: verified after packaging.

## Not verified
- Full `npm run build` and browser-level integration: unavailable due to missing npm dependencies in the build environment (offline install ENOTCACHED). Run these in CI or developer machine before merging.

## Live integrations not yet present
- Browser settings only write non-secret design data to localStorage. These are not production settings.
- No actual PostgreSQL connection, OneDrive authorization, NAS mount, backup, restore, PITR, worker runtime call or relocation executes.
- Real operations require PioSphere COS / PioLiance backend controllers, secure vault, PioOne API, tenant-scoped gateway, audited approvals and fully tested restore playbooks.

## Import to GitHub

```bash
git switch pioone-v24
# Extract V27 monorepo ZIP at repository root, retaining app/webui/.
cd app/webui
npm install
npm run test:model
npm run build
cd ../..
git add -A
git commit -m 'feat: PioOne V27 data management and recovery planning UI'
git push origin pioone-v24
```
