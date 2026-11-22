/** PioOne V30 — Public OIDC client (PKCE). Do not place client secrets in the SPA. */
export type Session={accessToken:string;idToken?:string;refreshToken?:string;expiresAt:number;displayName:string;email?:string};
export const demoMode=import.meta.env.VITE_AUTH_MODE==='demo';
const issuer=(import.meta.env.VITE_KEYCLOAK_URL||'').replace(/\/$/,'')+(import.meta.env.VITE_KEYCLOAK_REALM?'/realms/'+encodeURIComponent(import.meta.env.VITE_KEYCLOAK_REALM):'');
const clientId=import.meta.env.VITE_KEYCLOAK_CLIENT_ID||'';
export const configured=Boolean(issuer&&clientId);
export const callbackUrl=()=>new URL(import.meta.env.BASE_URL.replace(/\/$/,'')+'/auth/callback',window.location.origin).toString();
const u8=(b:ArrayBuffer)=>new Uint8Array(b);
const b64u=(bytes:Uint8Array)=>btoa(Array.from(bytes,b=>String.fromCharCode(b)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
const random=()=>b64u(crypto.getRandomValues(new Uint8Array(32)));
const sha256=async(s:string)=>b64u(u8(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))));
const safePath=(p:string|null)=>p&&p.startsWith('/')&&!p.startsWith('//')&&!p.includes('\\')?p:'/app';
const endpoints=()=>({authorize:issuer+'/protocol/openid-connect/auth',register:issuer+'/protocol/openid-connect/registrations',token:issuer+'/protocol/openid-connect/token',logout:issuer+'/protocol/openid-connect/logout'});
export async function startLogin(next='/app', intent:'login'|'register'='login'){
  if(!configured)throw new Error('Keycloak configuration missing. Set VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM and VITE_KEYCLOAK_CLIENT_ID.');
  const verifier=random(),state=random(),nonce=random();
  sessionStorage.setItem('pioone.oidc.pending',JSON.stringify({verifier,state,nonce,next:safePath(next),created:Date.now()}));
  const url=new URL(intent==='register'?endpoints().register:endpoints().authorize);
  url.search=new URLSearchParams({response_type:'code',client_id:clientId,redirect_uri:callbackUrl(),scope:'openid profile email',state,nonce,code_challenge:await sha256(verifier),code_challenge_method:'S256'}).toString();
  window.location.assign(url.toString());
}
function decodeJwt(jwt:string):Record<string,unknown>{try{const p=jwt.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(atob(p))}catch{return {}}}
export const startRegistration=(next='/app')=>startLogin(next,'register');
export async function finishLogin():Promise<{session:Session;next:string}>{
  if(!configured)throw new Error('Keycloak ist nicht konfiguriert.');
  const params=new URLSearchParams(location.search);
  if(params.get('error'))throw new Error(params.get('error_description')||params.get('error')||'Login failed');
  const pendingRaw=sessionStorage.getItem('pioone.oidc.pending');
  sessionStorage.removeItem('pioone.oidc.pending');
  if(!pendingRaw)throw new Error('Login session expired. Please try again.');
  const pending=JSON.parse(pendingRaw) as {verifier:string;state:string;nonce:string;next:string;created:number};
  if(Date.now()-pending.created>10*60*1000||params.get('state')!==pending.state||!params.get('code'))throw new Error('Invalid or expired sign-in response.');
  const response=await fetch(endpoints().token,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:clientId,redirect_uri:callbackUrl(),code:params.get('code')!,code_verifier:pending.verifier})});
  if(!response.ok)throw new Error('Token exchange failed ('+response.status+'). Check Keycloak client and redirect URI.');
  const data=await response.json();
  const claims=decodeJwt(data.id_token||'');
  if(claims.nonce!==pending.nonce)throw new Error('OIDC nonce mismatch.');
  if(claims.iss!==issuer||claims.aud!==clientId)throw new Error('OIDC issuer/audience mismatch.');
  if(typeof claims.exp!=='number'||claims.exp*1000<Date.now())throw new Error('Expired identity token.');
  const session={accessToken:data.access_token,idToken:data.id_token,refreshToken:data.refresh_token,expiresAt:Date.now()+(Number(data.expires_in)||300)*1000,displayName:String(claims.name||claims.preferred_username||'PioOne User'),email:typeof claims.email==='string'?claims.email:undefined};
  history.replaceState({},'',pending.next);
  return {session,next:pending.next};
}
export async function refreshSession(current:Session):Promise<Session>{
  if(!current.refreshToken)throw new Error('No refresh token available');
  const response=await fetch(endpoints().token,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'refresh_token',client_id:clientId,refresh_token:current.refreshToken})});
  if(!response.ok)throw new Error('Session refresh failed');
  const data=await response.json();
  return {...current,accessToken:data.access_token,refreshToken:data.refresh_token||current.refreshToken,idToken:data.id_token||current.idToken,expiresAt:Date.now()+(Number(data.expires_in)||300)*1000};
}
export function logout(session:Session|null){
  sessionStorage.removeItem('pioone.oidc.pending');
  if(demoMode||!configured){location.assign('/');return}
  const url=new URL(endpoints().logout);
  url.searchParams.set('client_id',clientId);
  url.searchParams.set('post_logout_redirect_uri',window.location.origin+'/');
  if(session?.idToken)url.searchParams.set('id_token_hint',session.idToken);
  location.assign(url.toString());
}
