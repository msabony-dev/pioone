# PioOne V30 — Landing Page & Keycloak OIDC

## Included
- Public responsive marketing landing at `/` (DE/EN), featuring product, DCOS, Digital Workers, DMS, applications and governance
- Dedicated login gateway at `/login`; authenticated workspace at `/app`
- Keycloak Authorization Code + PKCE S256; state and nonce checks; ID token issuer/audience/expiration checks; refresh tokens held **in memory only**; logout via Keycloak end-session endpoint
- Deliberate optional local `VITE_AUTH_MODE=demo` for *UI preview only*, visibly labeled, NEVER a secure production mode

## Configure Keycloak
1. Create realm `pioone` (or your realm).
2. Create client `pioone-web` as **Public**, Standard Flow enabled, Direct Access Grants disabled; configure PKCE method S256. Do not put a client secret in React.
3. For local development, valid redirect URIs: `http://localhost:5220/auth/callback`; Web origins: `http://localhost:5220`.
4. Valid post-logout redirect URIs: `http://localhost:5220/`. Production: add exact production origin equivalents using HTTPS.
5. Copy `.env.example` to `.env`, adjust URL, realm and client ID.
6. From `app/webui`, run `npm install && npm run dev`.
7. For UI-only preview without Keycloak set `VITE_AUTH_MODE=demo` explicitly.

## Security and production integration caveats
- This is a **frontend authentication integration** and does **not** turn the legacy local-demo WorkspaceStore into server-enforced authorization.
- Production backend MUST validate access tokens (issuer, audience, expiry and signatures via JWKS), enforce tenant/user/role scopes on EVERY API call, and restrict the demo role/tenant selectors.
- In production, the BFF/session-cookie architecture is preferred for sensitive workflows if cross-site browser restrictions and refresh token handling are a concern.
- Native JS token parsing is only a supplemental client consistency check; backend cryptographic verification is mandatory.
- No password form or credentials are collected by PioOne UI. Password / MFA screens must be configured and themed within Keycloak.
- Serve app routes with SPA history fallback to `index.html` (`/app`, `/login`, `/auth/callback`).
- The dashboard screenshot is a **designed illustration with example data**, not live customer information.
- Existing modules and documentation from V29.3 remain unchanged except authentication wrapper and logout UI.

## V30 demo + registration

The demo asks for a syntactically valid email only. It does **not** authenticate the person or create any account, and the address is only held in React memory, with no persistence or network transmission. Workspace preview uses prototype/sample-state UI. Production backend APIs MUST require valid Keycloak bearer tokens and MUST NOT grant demo permissions based on an email address.

Sign up uses the Keycloak user registration endpoint `/realms/{realm}/protocol/openid-connect/registrations` with OIDC code+PKCE, requiring `User Registration` enabled on the realm. Registration alone does not assign company roles, tenant or subscriptions; provisioning must be performed server-side with approval.

Public routes `/`, `/demo`, `/login`, `/register`; `/app` is a Keycloak authenticated workspace for real accounts or isolated local sample preview for demo. A sample demo must never expose live customer databases, files or business connectors.
