# PioOne V27 — Source Package Validation

Date: 20 November 2026

## Scope

This is the **complete V27 React frontend source tree**, including earlier V26 enterprise and public-administration workflows. It is not a completed production backend.

- Repository layout: `app/webui/`
- Application catalog: **14 groups** and **99 modules**
- Source files under `app/webui/src/`: **77**
- React + TypeScript + Vite; version `27.0.0`
- V27 modules: Data Residency, Backup & Versioning, Disaster Recovery, migration planner
- Source includes documentation, DMS database SQL starter, and GitHub CI.

## Checks

- `node scripts/test-model.mjs`: **PASS**, 11 output groups covering routing/catalog/workflows/data protection/data residency.
- TypeScript/TSX source syntax: parsed using globally installed TypeScript (not a full type-check).
- ZIP archive: verified via CRC for every file.
- Full Vite build: **NOT VERIFIED** (React/Vite dependencies unavailable in this environment).

## Current implementation boundaries

1. Frontend catalog contains working UI views, demo data and placeholders for some planned modules. The 99-module count is a navigation/catalog count, not 99 fully deployed backend services.
2. Data residency, backup, restore and migration pages are interactive plans saved locally and/or exported as JSON. No live infrastructure operations are performed.
3. DCOS orchestration currently simulates workflows in browser state. Actual DCOS will call PioWorker/PioAgent APIs through authenticated backend services.
4. PostgreSQL DMS migration is a design starting point; it is not a full production schema with row-level security, tenancy tests, or encryption-key management.

## Run locally

```bash
cd app/webui
npm install
npm run test:model
npm run build
npm run dev
```

## Import into GitHub

Unzip contents at the root of `sabonygb/pioone` on a feature branch, review changes, run commands above, and push after validation. Avoid deploying prototype data protection actions as if they were operational.
