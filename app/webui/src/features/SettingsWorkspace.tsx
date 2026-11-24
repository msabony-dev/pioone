import {WorkerAssignmentSettings} from './WorkerAssignmentSettings';
import {DatabaseBackupSettings} from './DatabaseBackupSettings';
import {DataResidencyCenter} from './DataResidencyCenter';
import {DataProtectionCenter} from './DataProtectionCenter';
import {OrganizationSettings} from './OrganizationSettings';
import {AppearanceSettings} from './AppearanceSettings';
import {SubscriptionSettings} from './SubscriptionSettings';
import {TeamSettings} from './TeamSettings';
import {ResourceSettings} from './ResourceSettings';
import {ModuleAccessSettings} from './ModuleAccessSettings';
import {ProviderSettings} from './ProviderSettings';
import {WorkerRegistrySettings} from './WorkerRegistrySettings';
import {APISettings} from './APISettings';
import {RoleSettings} from './RoleSettings';
import {OtherSettings} from './OtherSettings';
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
export function SettingsWorkspace(){const {t:trLabel}=useLanguage();const {tenant,workerState,saveWorkers,role,entitled,SE,active,SA,grants,SG,packageName,PK,addons,AD,limits,LM,teams,TM,people,PE,FS,effectiveFont,teamId,TI,teamName,TN,personName,PN,department,DP,departments,DS,selectedTeam,purchased,admin,platform,teamBudget,editTeam,core,CO,providers,SP,target,service,page,section,selected,dark,D,N,config,G,tasks,meetings,go,open,save,field}=useWorkspace();if(page==='Database & Backup')return <DatabaseBackupSettings/>;if(page==='Data Protection Center')return <DataProtectionCenter/>;if(page==='Data Residency & Storage')return <DataResidencyCenter/>;return (<section className="card"><h2>{trLabel(String(page))}</h2>{<SettingsPage/>}<button className="primary" onClick={()=>N('Non-secret configuration saved in this browser only.')}>{trLabel("Save local configuration")}</button><button className="outline" onClick={()=>N('Connection test requires the Go backend.')}>{trLabel("Test connection")}</button></section>);}

function SettingsPage(){const {page}=useWorkspace();if(page==='Organization')return <OrganizationSettings/>;if(page==='Appearance')return <AppearanceSettings/>;if(page==='Subscription & package')return <SubscriptionSettings/>;if(page==='Teams & users')return <TeamSettings/>;if(page==='Resources & budgets')return <ResourceSettings/>;if(page==='Module access')return <ModuleAccessSettings/>;if(page==='Communication providers')return <ProviderSettings/>;if((page==='Digital workers'||page==='Module worker bindings'||page==='Worker Factory'||page==='Worker bindings'))return <WorkerRegistrySettings/>;if(page==='API connections')return <APISettings/>;if(page==='Roles & permissions')return <RoleSettings/>;return <OtherSettings/>;}
