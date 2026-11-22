# PioOne V21 — Embedded PioBrain workspace

## User experience
- The PioBrain navigation entry and header shortcut route to the main PioOne workspace; no automatic external tab opens.
- The main workspace embeds https://chat.piosphere.ai/ in a full-width iframe. The PioOne header and navigation remain available. The assistant rail is hidden on this route to maximize usable space; its previous state is preserved on other routes.
- The toolbar offers Reload and an explicit Open in new tab link (noopener/noreferrer). The assistant's PioBrain tab routes to the central workspace instead of creating a second iframe.
- English/German labels; legacy PioChat bookmark compatibility retained. Leaving the workspace unmounts the iframe, so unsaved external UI state may be lost; returning loads the remote app again.
- V19 local data namespace and V20 dev port 5220 retained for same-origin migration. All other V20 features unchanged.

## Deployment requirements (not verified against live servers)
- The chat application and any framed authentication pages must permit the exact trusted PioOne deployment origin via Content-Security-Policy frame-ancestors. Incompatible X-Frame-Options must be aligned with this policy on those services; do not allow arbitrary origins. Parent CSP frame-src must allow the chat origin and any necessary authentication origins. Example trusted parent origin: https://pioone.example.com (replace with actual origin); localhost:5220 only in development.
- Keycloak and the chat application's OIDC client must support the embedded flow. Browser third-party cookie restrictions, login framing restrictions, and cross-origin policies can prevent sign-in. Use top-level authentication or an explicitly configured production SSO flow if needed; the external tab remains a manual fallback, not a guaranteed way to restore embedded login.
- No hard-coded authorization request, state, nonce, PKCE challenge, token forwarding or cross-origin DOM access. The remote application controls its identity, permissions and session. The demo's tenant/user switches do not switch the external identity; production requires verified identity/tenant mapping and logout coordination before deploying this to real customers.
- An iframe load event cannot prove successful rendering or sign-in; the UI makes no such claim. No framing restrictions are bypassed.
