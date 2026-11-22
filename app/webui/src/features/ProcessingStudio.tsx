import {useLanguage} from '../locales/i18n';
import {TravelManagement} from '../features/TravelManagement';
import {Organisation,seedModuleWorkers,type PersonalBindings} from '../features/Organisation';
import {WorkerSettings, initialWorkers, resolveWorker, type WorkerState} from '../features/WorkerSettings';
import {PioChat, type ChatThread} from '../features/PioChat';
import {organizations, storagePrefix, resetDemo, type Scope} from '../core/workspaces';
import {Capture,Studio,captureRoutes} from '../Capture';
import React,{useState} from 'react';import{Plane,Home,Mail,CalendarDays,Video,MessageCircle,Phone,Users,Inbox,Files,Brain,ListTodo,Settings,Bot,Search,Sun,Moon,Bell,Plus,Send,Archive,Trash2,Star,Reply,Forward,Paperclip,PanelRightClose,Sparkles,ShieldCheck,LayoutGrid,ChevronDown,Check,Clock,Plug,Building2,Menu,Briefcase,Wallet,UserRound,FolderKanban,Package,FileCheck,Headphones,Building,ChartNoAxesCombined,Shield,PanelLeftClose,PanelLeftOpen}from'lucide-react';import modules from '../modules.json';
import {documentNav,appIcons,AppIcon,appCatalog,allModules,initial,rail,comm,folders,settings,useLocal,catalog,defaults,seedTeams,seedPeople,profiles,workerNames,type Message,type ProviderConfig,type Team,type Person} from '../app/catalog';
import {useWorkspace} from '../stores/WorkspaceStore';
export function ProcessingStudio(){const {t:trLabel}=useLanguage();const {prefix,admin,allowed,section}=useWorkspace();return (admin&&allowed('Document Processing/Processing Studio')?<Studio scope={prefix}/>:<section className="card">{trLabel("Administrator access and Studio entitlement required.")}</section>);}
