# Deployed PioOne login

The public frontend at `https://enterprise.piosphere.ai` uses these public OIDC settings:

```env
VITE_AUTH_MODE=keycloak
VITE_KEYCLOAK_URL=https://dev.auth.piosphere.ai
VITE_KEYCLOAK_REALM=piocloud
VITE_KEYCLOAK_CLIENT_ID=piocloud-client
```

These identify the issuer and public client; they are not user credentials. Do not add a client secret to Vite configuration.

## Identity-provider configuration

In the `piocloud` realm, configure `piocloud-client` for public-client Authorization Code flow with PKCE S256. Retain existing application redirect entries and add the exact PioOne URLs:

- Valid redirect URI: `https://enterprise.piosphere.ai/auth/callback`
- Web origin: `https://enterprise.piosphere.ai`
- Valid post-logout redirect URI: `https://enterprise.piosphere.ai/`

For local testing, separately retain or add `http://localhost:3000/auth/callback`, the `http://localhost:3000` web origin and `http://localhost:3000/` post-logout redirect. Registering localhost does not authorize the deployed domain. Avoid broad redirect wildcards.

The deployed callback was rejected with `Invalid parameter: redirect_uri` when checked on November 27, 2026. This client-side repository cannot change the identity-provider allowlist.

## Deploy and verify

Merge the build configuration fix and run the Jenkins build/deployment after configuring the client. Vite embeds these values at build time: restarting the existing container alone does not change them. Jenkins explicitly passes the build arguments, so a developer's local `.env` does not supply production login settings.

Open the deployed website and sign in. Confirm the authorization request uses realm `piocloud`, client `piocloud-client` and the exact deployed callback. Verify the callback token exchange, page access, session refresh and logout. Real user sign-in remains necessary to validate the full flow.
