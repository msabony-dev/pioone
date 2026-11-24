import {useSyncExternalStore} from 'react';
export type Route={section:string,page:string};
const HOME={section:'Home',page:'Home'};
let cachedHash='', cached=HOME;
export function parseRoute(h:string):Route {try{if(!h.startsWith('#/'))return HOME;const parts=h.slice(2).split('/').map(decodeURIComponent);if(parts.length===2&&parts[0]==='Tasks'&&parts[1]==='Tasks')return {section:'DCOS',page:'Tasks'};if(parts.length===2&&((parts[0]==='Knowledge'&&parts[1]==='Knowledge')||(parts[0]==='DCOS'&&parts[1]==='DCOS knowledge')))return {section:'PioBrain',page:'PioBrain'};if(parts.length===2&&parts[0]==='PioChat'&&parts[1]==='PioChat')return {section:'PioBrain',page:'PioBrain'};return parts.length===2&&parts.every(Boolean)?{section:parts[0],page:parts[1]}:HOME;}catch{return HOME;}}
export function routeHash(section:string,page:string){return '#/'+encodeURIComponent(section)+'/'+encodeURIComponent(page);}
function snapshot():Route {const h=location.hash;if(h===cachedHash)return cached;cachedHash=h;cached=parseRoute(h);return cached;}
function subscribe(fn:()=>void){window.addEventListener('hashchange',fn);return()=>window.removeEventListener('hashchange',fn);}
export function useRouter(){const {section,page}=useSyncExternalStore(subscribe,snapshot);const routeTo=(s:string,p:string)=>{location.hash=routeHash(s,p);};return {section,page,routeTo,P:(p:string)=>routeTo(section,p),S:(s:string)=>routeTo(s,s)};}
