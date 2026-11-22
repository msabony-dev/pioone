# PioOne V28.1 — Responsive Mobile Web UI

## Overview
This release updates the **complete V28 frontend source** for mobile and tablet screens. It is not a separate mobile application: the same React Web UI serves desktop, tablet and mobile clients.

## Navigation
- **≤900 px:** compact sticky header, a hamburger button opening a scrollable navigation drawer, and a five-item bottom navigation bar (Home, DCOS, Docs, Apps, More).
- The drawer contains the workspaces available to the current user; for DCOS, Documents, Apps and Settings it additionally provides contextual links.
- The old desktop navigation rail and contextual column are hidden on small screens to preserve content width.
- **>900 px:** the existing desktop navigation is preserved.

## Mobile layouts
- Prevents the previous Documents shell's minimum-width constraint from forcing horizontal viewport overflow.
- Documents: horizontal drive selector, 1–2-column folder cards, full-width search/actions, per-file mobile cards instead of a six-column table, and details below the files.
- Business and Public Workflows: scrollable workflow tabs and single-column workflow forms/cards.
- Shared dashboard, mail, capture, organization, and app grids adapt to smaller widths. Wide legacy tables scroll within their own container rather than stretching the whole page.
- Assistant slides over the content on tablet/mobile; dialogs are sized within viewport.
- Uses viewport safe-area padding for the fixed bottom navigation.

## Mobile check list
1. 375 × 812 (modern iPhone portrait): test bottom nav, drawer, DE/EN switch, Documents cards, forms and dialogs.
2. 390 × 844 (Android/iPhone portrait): upload, create folder, selecting item, trash/recovery.
3. 768 × 1024 (tablet): Documents, DCOS workflows, dashboard tiles, side panel.
4. 1024 × 768 and 1440 × 900: verify desktop navigation and functionality unchanged.
5. Keyboard navigation, VoiceOver/TalkBack, reduced motion and browser zoom need further device testing.

## Build and validation

```bash
cd app/webui
npm install
npm run test:model
npm run test:documents
npm run build
npm run dev
```

Observed in the packaging environment:
- Model tests: PASS.
- Document model tests: PASS.
- TypeScript/TSX syntax: PASS for all 67 source files.
- **Vite production build and real-device visual testing: NOT VERIFIED** (npm dependencies not installed in the packaging environment).

## Boundaries
The existing V28 storage/file explorer features remain **browser-local prototypes**. Mobile layout does not introduce PostgreSQL services, S3, live OneDrive sync, remote backup/restore execution or server-enforced worker permissions.
