import {readFileSync,writeFileSync} from 'node:fs';

// Render the controlled guide sources without runtime requests or third-party scripts.
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline=s=>escape(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
function render(source){
 const lines=source.split(/\r?\n/);let html='',i=0;
 while(i<lines.length){
  const line=lines[i];if(!line.trim()){i++;continue;}
  const h=line.match(/^(#{1,3}) (.+)$/);
  if(h){html+=`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;i++;continue;}
  if(line.startsWith('|')){
   const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++].split('|').slice(1,-1).map(x=>x.trim()));
   html+='<div class="table-scroll"><table><thead><tr>'+rows[0].map(c=>`<th scope="col">${inline(c)}</th>`).join('')+'</tr></thead><tbody>'+rows.slice(2).map(row=>'<tr>'+row.map(c=>`<td>${inline(c)}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';continue;
  }
  if(/^(- |\d+\. )/.test(line)){
   const ordered=/^\d/.test(line),tag=ordered?'ol':'ul',pattern=ordered?/^\d+\. /:/^- /;html+=`<${tag}>`;
   while(i<lines.length&&pattern.test(lines[i]))html+=`<li>${inline(lines[i++].replace(pattern,''))}</li>`;
   html+=`</${tag}>`;continue;
  }
  const paragraph=[];while(i<lines.length&&lines[i].trim()&&!/^(#|\||- |\d+\. )/.test(lines[i]))paragraph.push(inline(lines[i++]));
  html+='<p>'+paragraph.join('<br>')+'</p>';
 }
 return html;
}
for(const language of ['EN','DE']){
 const de=language==='DE',name=`PIOONE-END-USER-SPECIFICATION-${language}`,other=de?'EN':'DE';
 const source=readFileSync(new URL(`../../../docs/end-user/${name}.md`,import.meta.url),'utf8');
 const page=`<!doctype html><html lang="${language.toLowerCase()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PioOne V42 – ${de?'Leitfaden für Anwender':'End-user guide'}</title><link rel="stylesheet" href="/guides/guide.css"></head><body><nav aria-label="${de?'Navigation':'Navigation'}"><a href="/#end-user-guide">← PioOne</a><div><a href="/guides/PIOONE-END-USER-SPECIFICATION-${other}.html" lang="${other.toLowerCase()}">${de?'English':'Deutsch'}</a><a href="/guides/${name}.md" download>Markdown ↓</a></div></nav><main>${render(source)}</main></body></html>`;
 writeFileSync(new URL(`../public/guides/${name}.html`,import.meta.url),page);
 writeFileSync(new URL(`../public/guides/${name}.md`,import.meta.url),source);
}
