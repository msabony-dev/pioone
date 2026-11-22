/** IndexedDB document-content adapter for the local V28 demonstration (not server backup or document storage). */
const DB='pioone-v28-local-document-demo';const STORE='fileBlobs';
export async function openBlobDB():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{if(typeof indexedDB==='undefined'){reject(Error('IndexedDB is unavailable'));return}const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>{const db=request.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE)};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
async function writeRequest<T>(mode:IDBTransactionMode,action:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T>{const db=await openBlobDB();return new Promise<T>((resolve,reject)=>{const tx=db.transaction(STORE,mode);const req=action(tx.objectStore(STORE));req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);tx.oncomplete=()=>db.close();tx.onerror=()=>{db.close();reject(tx.error)}})}
export function storeBlob(id:string,blob:Blob){return writeRequest('readwrite',s=>s.put(blob,id))}
export function loadBlob(id:string):Promise<Blob|undefined>{return writeRequest('readonly',s=>s.get(id))}
export function removeBlob(id:string){return writeRequest('readwrite',s=>s.delete(id))}
