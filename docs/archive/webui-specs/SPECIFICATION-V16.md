# PioOne V16 — Management Intelligence UI

Status: local React prototype, incremental release on V15. The V15 specification remains the baseline. No new licensed modules: 13 applications / 92 modules; two dashboard routes are presentation views, not new worker assignments.

## 1. Entry points and access

- Home → Company overview: company dashboard, restricted to the demo Tenant SuperAdmin. Local directory counts and authorized assignment data; financial and CRM panels only if corresponding dashboard access is granted.
- Apps → CRM → CRM Dashboard: direct route `#/Apps/CRM%20Dashboard`. Available in navigation and app cards. Requires Tenant SuperAdmin plus authorization for Leads, Sales Pipeline, Opportunities, Quotations and Forecasting.
- Apps → ERP → ERP Dashboard: direct route `#/Apps/ERP%20Dashboard`. Requires Tenant SuperAdmin plus authorization for Accounting, Controlling, Cash Flow, Receivables, Payables, Budgets and Inventory Management.
- Restricted routes display access unavailable. Existing feature modules and routes remain unchanged. A production dashboard entitlement should be independent of admin status and enforce per-metric and per-record permissions server-side.

## 2. Visualization requirements

| View | Components | Interaction |
|---|---|---|
| Company | Employee / team counts, digital positions, module assignments, revenue, operating result, pipeline, revenue/cost trend, accountability donut, application coverage, sales stages | Period selector, month selection, links to CRM/ERP and Digital Organisation |
| CRM | Lead count, open pipeline value, won value, lead-to-win conversion, cumulative funnel, open stage deal values, stage conversion, won/not-won donut | Period selector, stage selection with counts and conversion, module navigation |
| ERP | Revenue, cost, operating result and margin, revenue/cost trends, cash receipts/payments, cost allocation donut, budget utilization, receivables aging, inventory value | Period selector, month selection, module navigation |

Use PioVation green, semantic contrasting amber for costs, responsive card grids, accessible native controls, text equivalents for chart values, dark/light theme, and reduced-motion support. DE/EN display dictionary and locale-specific currencies/month names. No additional third-party chart library. New feature directory `src/features/analytics/` contains charts, styling, and calculation model.

## 3. Data contract and formulas

V16 uses a fixed fictional 2025 dataset for financial and CRM charts. 3, 6 or 12 months ending December 2025; revenue and cost arrays represent EUR thousands per month. Totals are EUR; operating result = revenue minus operating costs; margin = result/revenue. Cash receipts/payments are independent sample series and must never be equated with revenue/cost recognition. Cost mix, budget utilization, receivables and inventory are sample snapshots; the selector does not change these static snapshots. CRM count stages are cumulative; smaller period cohorts are proportional rounded samples, not actual historical transactions. Open opportunity amounts are separate non-overlapping illustrative buckets. Lead-to-win = won / leads; adjacent conversion = next count / prior count. Funnel shape top width is proportional to stage count; labels are separate for readability. No financial values inferred from generic demo text records.

Company employee and team counts are local directory records, not HR/payroll verified counts. Digital positions count distinct positions with at least one authorized assignment; assignment count is scoped to authorized module IDs. Accountability donut counts assignments passing the existing V15 configuration readiness predicate, not approved runtime deployments. Directory and configuration counts are current snapshots, not 2025 history. V15 storage prefix is intentionally retained for compatibility on the same browser origin; V16 default port 5216 creates a different localStorage origin from 5215 unless served on the original origin.

## 4. Production target (not implemented)

Typed analytics endpoints via Backend Gateway with tenant/organization, date range, timezone, currency, scope and metric permissions; aggregated data sourced from CRM opportunity events, ERP posted journal entries, payment settlements, budget versions, inventory valuation and HR/workforce records. Distinguish cohort and snapshot queries. Server enforces tenant isolation, aggregation permissions and drilldown visibility. Include metric definitions, data freshness, reconciliation, missing data states, audit events, caching and query limits. Financial periods and currency conversion require finance-approved rules. UI role switching is not authentication and no live data or worker runtime is connected.

## 5. Validation

Model tests cover the existing 92 routes and assignments, accountability, version pinning and travel separation of duties, plus new dashboard routes, permission checks, period calculations and monotonic funnel counts. TypeScript transpilation syntax checks passed for all 48 source files; full type checking, npm build and browser regression/visual checks remain pending in the creation environment because React/Vite dependencies are not installed. No production readiness claim.
