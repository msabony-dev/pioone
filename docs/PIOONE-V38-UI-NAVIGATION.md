# PioOne V38 UI – AI-Native Enterprise Operating System

## Status
This archive is an **interactive local UI preview** based on the last locally available complete source package **V28.1**. The GitHub repository has moved to `pioone-org/pioone`, and V32.5 is not available as a complete local source archive; therefore this ZIP does **not** replace or supersede GitHub V32.5 and is **not** a production backend release. Port the UI changes into the current repository after review.

## Product name
**PioOne – Das KI-native Unternehmensbetriebssystem** (EN: **The AI-Native Enterprise Operating System**). The term workspace is limited to a user work area, not used as PioOne product positioning.

## Seven top-level sections
1. Home — existing home UI and subtabs.
2. My Assistant — existing personal workspace (internal route `DCOS` preserved for compatibility), PioBrain replacing Knowledge & Actions, Communication nested here.
3. Digital Workers (DW) — catalog / roster of example DW-HW, DW-Lead-to-Cash, DW-Notar, DW-Rechnungseingang, DW-Vertrieb, with local state.
4. Dateien & DMS — existing Documents workspace, PioPost embedded within document intake.
5. Apps — existing applications.
6. Organisation — existing organization workspace.
7. Settings — Worker Factory and Worker bindings at the top, company and platform groups, with rarely used controls collapsed under Advanced settings. The bindings page supports both application modules and per-DW assignment keys as well as a My Assistant coordinator binding.

## Worker integration
Worker Factory uses existing shared WorkerSettings state (`workerRegistry`) for worker creation, version histories, draft/publish/retire. Worker bindings uses the same state for module-to-worker assignment and version pinning. Digital Workers overview reads the same state, without duplicating worker stores. This is **browser-local demo configuration** only and does not deploy workers or configure gRPC servers.

## Known limitations
The UI is based on an older source snapshot, so newer V32.5 features may be missing. Product-visible DCOS menu labels have been reduced, but legacy internal filenames, routes, records and i18n strings remain for migration compatibility.
