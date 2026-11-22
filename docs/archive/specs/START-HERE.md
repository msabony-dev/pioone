# PioOne V28 — Full React Source

Unzip the archive and enter `app/webui`.

```bash
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Open the local Vite development URL (default http://localhost:5220) and select **Documents**.

**V28 includes all V27 frontend source**, the new working browser-demo Documents/File Explorer, 14 application groups / 99 modules, the V27 data residency and data protection screens, and the previous technical specifications.

**Not implemented:** a production Go backend, file metadata PostgreSQL APIs, S3 object storage, OneDrive/NAS connector authorization, cross-user sharing, secure ACLs, live RAG indexing, production backup/restore, or full service integration. Demo uploads remain in the current browser's IndexedDB, not on the server.

Read `docs/PIOONE-V28-SPECIFICATION.md` for feature scope and limitations.
