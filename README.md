# PioOne

**The AI-Native Enterprise Workspace** · by PioVation

PioOne brings human and digital workers, applications, data and business processes into one workspace.

Current version: **V32.5** (frontend prototype). See [docs/releases/V32.5-RELEASE-NOTES.md](docs/releases/V32.5-RELEASE-NOTES.md).

## Repository structure

```
pioone/
├── README.md
├── docs/
│   ├── SPECIFICATION.md      current product and UI specification (V32)
│   ├── releases/             release notes V27 to V32.5
│   ├── assets/               architecture diagrams, product briefs
│   └── archive/              superseded specs, old webui specs, one-off migration scripts
├── app/
│   └── webui/                React/Vite frontend
│       ├── src/
│       ├── public/
│       ├── scripts/          model and document tests
│       ├── package.json
│       └── SPECIFICATION-V25.md
├── modules/                  domain modules (empty)
├── packages/                 shared libraries (empty)
├── infra/
│   └── db/migrations/        PostgreSQL migrations
└── .github/workflows/        CI
```

## Quick start

```bash
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev        # http://localhost:5220
```

Authentication is configured through `app/webui/.env.example` (Keycloak, public OIDC client with PKCE). For a local UI preview without login set `VITE_AUTH_MODE=demo`.

## Branches

- `main`: stable state
- `dev`: ongoing development, merged into `main` via pull request

## Scope

This is a frontend prototype. Data stays in the browser (localStorage / IndexedDB). Not included: production backend, PostgreSQL APIs, object storage, connector authorization, ACLs, live RAG indexing, backup/restore. Production use requires backend authorization and authentication.
