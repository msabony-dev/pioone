# PioOne V40 — Digital Workers navigation

## Main navigation
Home, My Assistant, Digital Workers (DW), Dateien & DMS, Apps, Organisation, Settings. PioOne remains **The AI-Native Enterprise Operating System**.

## Digital Workers (DW) — exactly three sub-tabs
1. **DWs:** searchable worker registry, versions and worker detail, e.g. DW-HR (Human Resources), DW-Lead-to-Cash, DW-Notar, DW-Rechnungseingang, DW-Vertrieb.
2. **DW Organisations:** existing digital workforce organization, responsible users, digital positions and assignments (same shared demo state).
3. **DW Settings:** nested configuration for **Worker Factory**, **Worker assignments**, and **Digital positions**.

Worker Factory and digital-worker organization are no longer navigation entries in general Settings. General Settings retains Database & Backup, permissions and general enterprise configuration. Organisation retains Company Organisation.

## DW-HR migration
Saved demo worker records formerly labeled DW-HW are displayed and normalized to DW-HR without discarding release history or worker bindings. Internal IDs are preserved so references remain valid.

## Deployment status
Local React/Vite UI demonstration. Worker definitions, assignments, database connections and backups are not production backend functions.
