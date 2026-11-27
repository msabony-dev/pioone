import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const require=createRequire(import.meta.url);
function load(name){
 const url=new URL(`../src/features/${name}.tsx`,import.meta.url);
 const code=ts.transpileModule(readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;
 const module={exports:{}};
 const req=id=>id.endsWith('.css')?{}:id==='./EndUserGuide'?load('EndUserGuide'):require(id);
 new Function('require','module','exports',code)(req,module,module.exports);
 return module.exports;
}
const {LandingPage}=load('LandingPage');
for(const [language,title] of [['de','Das KI-native Unternehmensbetriebssystem'],['en','The AI-Native Enterprise Operating System']]){
 globalThis.localStorage={getItem:()=>language};
 const html=renderToStaticMarkup(React.createElement(LandingPage,{onLogin(){},onDemo(){},onRegister(){}}));
 assert.ok(html.includes(title));
 assert.ok(html.includes('id="end-user-guide"'));
 assert.ok(html.includes('id="documentation"'));
 assert.ok(html.includes(`/guides/PIOONE-END-USER-SPECIFICATION-${language.toUpperCase()}.html`));
 assert.ok(html.includes('alt="PioVation"'));
 assert.ok(!html.includes('loginNotice'));
}
delete globalThis.localStorage;
const {folderFromFiles}=load('LocalComputerExplorer');
const first={name:'invoice.txt',webkitRelativePath:'Selected/Finance/invoice.txt'};
const second={name:'notes.txt',webkitRelativePath:'Selected/notes.txt'};
const root=folderFromFiles([first,second]);
assert.equal(root.name,'Selected');
const entries=[];for await(const entry of root.entries())entries.push(entry);
const finance=entries.find(([name])=>name==='Finance')[1];
assert.equal(finance.kind,'directory');
const nested=[];for await(const entry of finance.entries())nested.push(entry);
assert.equal(await nested[0][1].getFile(),first);
assert.equal(await entries.find(([name])=>name==='notes.txt')[1].getFile(),second);
assert.equal('removeEntry' in root,false);
console.log('PASS: DE/EN landing, retained public guides and documentation, local folder fallback tree and read-only handles.');
