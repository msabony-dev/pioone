export type ReportingPerson={id:string;managerId?:string};
export const NODE_W=226,NODE_H=122,GAP_X=26,GAP_Y=58;
export function reportingForest<T extends ReportingPerson>(people:T[]){
 const byId=new Map(people.map(p=>[p.id,p]));const parent=new Map<string,string>();
 // Reject invalid or cyclic reporting edges; affected people remain visible as roots.
 for(const p of people){let id=p.managerId;const seen=new Set([p.id]);let valid=!!id&&byId.has(id);while(valid&&id){if(seen.has(id)){valid=false;break}seen.add(id);id=byId.get(id)?.managerId;}if(valid&&p.managerId)parent.set(p.id,p.managerId);}
 const children=(id:string)=>people.filter(p=>parent.get(p.id)===id);const roots=people.filter(p=>!parent.has(p.id));return {roots,children,parent};
}
export function diagramLayout<T extends ReportingPerson>(people:T[],expanded:Set<string>,matches?:(p:T)=>boolean){
 const {roots,children,parent}=reportingForest(people);const include=(p:T):boolean=>!matches||matches(p)||children(p.id).some(include);const nodes:{person:T;x:number;y:number;depth:number;reports:number}[]=[];const edges:{from:string;to:string}[]=[];let cursor=0;
 function visit(p:T,depth:number){const kids=children(p.id).filter(include);const show=matches||expanded.has(p.id)?kids:[];let x:number;if(show.length){const xs=show.map(k=>{edges.push({from:p.id,to:k.id});return visit(k,depth+1)});x=(xs[0]+xs[xs.length-1])/2;}else{x=cursor;cursor+=NODE_W+GAP_X;}nodes.push({person:p,x,y:depth*(NODE_H+GAP_Y),depth,reports:children(p.id).length});return x;}
 roots.filter(include).forEach(p=>visit(p,0));return {nodes,edges,width:Math.max(NODE_W,cursor-GAP_X),height:Math.max(NODE_H,...nodes.map(n=>n.y+NODE_H)),parent,roots};
}
