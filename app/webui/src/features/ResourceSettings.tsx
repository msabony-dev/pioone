import {useLanguage} from '../locales/i18n';
import {DigitalPositions} from './DigitalPositions';
import {TravelManagement} from '../features/TravelManagement';
import {Organisation,seedModuleWorkers,type PersonalBindings} from '../features/Organisation';
import {WorkerSettings, initialWorkers, resolveWorker, type WorkerState} from '../features/WorkerSettings';
import {PioChat, type ChatThread} from '../features/PioChat';
import {organizations, storagePrefix, resetDemo, type Scope} from '../core/workspaces';
import {Capture,Studio,captureRoutes} from '../Capture';
import React,{useState} from 'react';import{Plane,Home,Mail,CalendarDays,Video,MessageCircle,Phone,Users,Inbox,Files,Brain,ListTodo,Settings,Bot,Search,Sun,Moon,Bell,Plus,Send,Archive,Trash2,Star,Reply,Forward,Paperclip,PanelRightClose,Sparkles,ShieldCheck,LayoutGrid,ChevronDown,Check,Clock,Plug,Building2,Menu,Briefcase,Wallet,UserRound,FolderKanban,Package,FileCheck,Headphones,Building,ChartNoAxesCombined,Shield,PanelLeftClose,PanelLeftOpen}from'lucide-react';import modules from '../modules.json';
import {documentNav,appIcons,AppIcon,appCatalog,allModules,initial,rail,comm,folders,settings,useLocal,catalog,defaults,seedTeams,seedPeople,profiles,workerNames,type Message,type ProviderConfig,type Team,type Person} from '../app/catalog';
import {useWorkspace} from '../stores/WorkspaceStore';
export function ResourceSettings(){const {t:trLabel}=useLanguage();const {role,limits,teams,TM,people,admin,teamBudget,target}=useWorkspace();return (<><h3>{trLabel("Tenant allocation")}</h3><p>{people.length}/{limits.users} {trLabel("users ·")} {teams.length}/{limits.teams} {trLabel("teams ·")} {teamBudget}/{limits.tokens} {trLabel("million AI tokens allocated ·")} {limits.storage} {trLabel("GB storage limit")}</p>{teamBudget>limits.tokens&&<p role="alert">{trLabel("Allocations exceed subscription limit. Reduce allocations before provisioning.")}</p>}<h3>{trLabel("Team token budgets (million/month)")}</h3>{teams.map(t=><label key={t.id}>{t.name}<input type="number" min="0" max={Math.max(0,limits.tokens-teamBudget+t.tokens)} disabled={!admin} value={t.tokens} onChange={e=>TM(teams.map(x=>x.id===t.id?{...x,tokens:Math.min(Math.max(0,limits.tokens-teamBudget+t.tokens),Math.max(0,Number(e.target.value)||0))}:x))}/></label>)}<p>{trLabel("Allocation only; actual metering and billing require backend.")}</p></>);}
