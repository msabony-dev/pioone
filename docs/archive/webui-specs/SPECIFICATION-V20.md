# PioOne V20 — PioBrain live application integration

## UI
- PioBrain replaces PioChat in the main navigation and assistant tabs (DE/EN).
- Selecting PioBrain in the main navigation opens https://chat.piosphere.ai/ in a separate browser tab and navigates to the PioBrain landing page. An explicit link is available if automatic opening is blocked.
- The header shortcut opens the landing page; the assistant tab offers the same external link.
- The legacy #/PioChat/PioChat bookmark resolves to PioBrain. The previous local chat simulator is no longer exposed by the router or assistant.
- All V19 modules, routes, business drafts and demo governance remain unchanged. V19 storage namespace is deliberately retained for in-place upgrades on the same origin (browser storage does not cross ports or domains). Historical simulated chats are not uploaded.

## Authentication and security
The external application is responsible for initiating its own OpenID Connect authorization-code flow with PKCE. Do not hard-code a generated authorization request, state, nonce or code challenge. The provided application URL is used instead. The link uses noopener/noreferrer; no tenant identifier, context, documents, prompts or credentials are passed. PioOne demo roles do not authorize access to the external application. Shared SSO requires production identity configuration; it is not implemented here. No iframe is used, avoiding reliance on framing policy or third-party cookies. Live service, login and production build require deployment testing.
