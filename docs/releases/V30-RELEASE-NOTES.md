# PioOne V30 — Landing page, Demo, Sign in / Sign up

- **Hero:** BY PIOVATION · PioOne · The AI-Native Enterprise Workspace · One Workspace. One Workforce. One Enterprise. · Bringing people, AI workers, applications and business processes together.
- **Demo login:** email only, no password; in-memory local UI preview with sample data; no user provisioning and no identity token. Email is not sent to server. Banner marks demo clearly.
- **Sign in:** Keycloak public OIDC client via Authorization Code + PKCE S256.
- **Sign up:** Keycloak realm user registration endpoint with the same OIDC + PKCE parameters. Keycloak User Registration must be enabled.
- **Protected `/app`:** real account needs Keycloak token; demo only unlocks sample UI in the browser. Production APIs must validate access tokens, tenant and permissions server-side, deny demo clients and prevent demo data reaching real sources.
- **Routes:** `/` landing, `/demo`, `/login`, `/register`, `/auth/callback`, `/app`.
- **Config:** see `app/webui/.env.example`; configure redirect URIs and web origins in Keycloak.
- **Note:** sign up creates a Keycloak user only, not an automatically provisioned enterprise tenant. Tenant onboarding requires backend services.
