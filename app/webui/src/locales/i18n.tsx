import React,{createContext,useContext,useState} from 'react';
import de from './de.json';
export type Language='de'|'en';
const dictionary:Record<string,string>=de;
const Context=createContext<{language:Language;setLanguage:(l:Language)=>void;t:(s:string)=>string}>({language:'en',setLanguage:()=>{},t:s=>s});
export function LanguageProvider({children}:{children:React.ReactNode}){const [language,S]=useState<Language>(()=>localStorage.getItem('pio19-language')==='en'?'en':'de');const setLanguage=(l:Language)=>{S(l);localStorage.setItem('pio19-language',l);document.documentElement.lang=l};React.useEffect(()=>{document.documentElement.lang=language},[language]);return <Context.Provider value={{language,setLanguage,t:s=>(s==='DCOS' ? (language==='de'?'Mein Assistent':'My Assistant') : language==='de' ? (dictionary[s]||(s.includes('/')?s.split('/').map(x=>dictionary[x]||x).join('/'):s)) : s)}}>{children}</Context.Provider>}
export const useLanguage=()=>useContext(Context);
export function LanguageSwitch(){const {language,setLanguage}=useLanguage();return <select aria-label="Language / Sprache" value={language} onChange={e=>setLanguage(e.target.value as Language)}><option value="de">DE</option><option value="en">EN</option></select>}
