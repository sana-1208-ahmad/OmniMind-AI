import React, { useState, useEffect, useRef } from 'react';
import { ActiveView } from './Sidebar';
import {
  Menu,
  Building2,
  ChevronDown,
  Search,
  Check,
  Sun,
  Terminal,
  User,
  Sliders,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Activity,
  RefreshCw,
  FileText,
  Hash,
  HardDrive,
  Box as BoxIcon,
  Mail,
  Key,
  Sparkles,
  Radio,
} from 'lucide-react';
import {
  getGoogleAuthProfile,
  getEnvironmentMode,
  setEnvironmentMode,
  GoogleAccountProfile,
  EnvironmentMode,
} from '../../services/googleAuthService';

interface TopHeaderProps {
  currentWorkspace: string;
  onSelectWorkspace: (ws: string) => void;
  onOpenCommandPalette: () => void;
  onNavigate: (view: ActiveView) => void;
  userEmail?: string;
  onToggleMobileNav?: () => void;
  currentView?: ActiveView;
  isCliOffline?: boolean;
  onToggleCliOffline?: () => void;
}

const VIEW_TITLES: Record<ActiveView, string> = {
  chat: 'Agent Chat Workspace',
  landing: 'Product Overview',
  onboarding: 'Setup Wizard',
  auth: 'Authentication',
  dashboard: 'Command Center',
  briefing: 'Morning Executive Briefing',
  search: 'Universal Multi-App Search',
  workflow: 'Agentic Workflow Pipeline',
  graph: 'Interactive Knowledge Graph',
  summarizer: 'Document Summarizer',
  'action-board': 'Action Board & Commitments',
  triggers: 'Automation Trigger Studio',
  logs: 'Execution Logs & SOC2 Audit',
  vault: 'Vault Explorer',
  analytics: 'Workspace Analytics',
  integrations: 'Swytchcode Integration Hub',
  'ai-settings': 'AI Governance & Policies',
  'export-hub': 'Executive Report Hub',
  settings: 'Organization Settings',
};

interface SyncServiceInfo {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  dotColor: string;
  pingColor: string;
  activityText: string;
  latencyMs: number;
}

const CONNECTED_SYNC_SERVICES: SyncServiceInfo[] = [
  {
    id: 'notion',
    name: 'Notion',
    icon: FileText,
    color: 'text-amber-400',
    dotColor: 'bg-amber-400',
    pingColor: 'bg-amber-400',
    activityText: 'Ingesting wikis & roadmap pages',
    latencyMs: 52,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: Hash,
    color: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    pingColor: 'bg-emerald-400',
    activityText: 'Streaming channels & Socket Mode v2',
    latencyMs: 38,
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    icon: HardDrive,
    color: 'text-blue-400',
    dotColor: 'bg-blue-400',
    pingColor: 'bg-blue-400',
    activityText: 'Indexing changes stream & folders',
    latencyMs: 64,
  },
  {
    id: 'box',
    name: 'Box Vault',
    icon: BoxIcon,
    color: 'text-indigo-400',
    dotColor: 'bg-indigo-400',
    pingColor: 'bg-indigo-400',
    activityText: 'Listening to SOC2 audit webhooks',
    latencyMs: 78,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: Mail,
    color: 'text-rose-400',
    dotColor: 'bg-rose-400',
    pingColor: 'bg-rose-400',
    activityText: 'PubSub batch sync & VIP threads',
    latencyMs: 44,
  },
];

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentWorkspace,
  onSelectWorkspace,
  onOpenCommandPalette,
  onNavigate,
  userEmail = 'sabiyaahmad8661@gmail.com',
  onToggleMobileNav,
  currentView = 'dashboard',
  isCliOffline = false,
  onToggleCliOffline,
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeSyncIndex, setActiveSyncIndex] = useState(0);
  const [syncMenuOpen, setSyncMenuOpen] = useState(false);
  const syncMenuRef = useRef<HTMLDivElement>(null);

  const [googleAuth, setGoogleAuth] = useState<GoogleAccountProfile>(getGoogleAuthProfile);
  const [environmentMode, setEnvironmentModeState] = useState<EnvironmentMode>(getEnvironmentMode);

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      setGoogleAuth(e.detail || getGoogleAuthProfile());
    };
    const handleModeChange = (e: any) => {
      setEnvironmentModeState(e.detail || getEnvironmentMode());
    };
    window.addEventListener('omnimind:google-auth-change', handleAuthChange);
    window.addEventListener('omnimind:mode-change', handleModeChange);
    return () => {
      window.removeEventListener('omnimind:google-auth-change', handleAuthChange);
      window.removeEventListener('omnimind:mode-change', handleModeChange);
    };
  }, []);

  // Rotate through connected services to show background sync activity pulse
  useEffect(() => {
    if (isCliOffline) return;
    const timer = setInterval(() => {
      setActiveSyncIndex((prev) => (prev + 1) % CONNECTED_SYNC_SERVICES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isCliOffline]);

  // Click outside to close sync popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (syncMenuRef.current && !syncMenuRef.current.contains(event.target as Node)) {
        setSyncMenuOpen(false);
      }
    };
    if (syncMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [syncMenuOpen]);

  const activeSyncService = CONNECTED_SYNC_SERVICES[activeSyncIndex];
  const ActiveServiceIcon = activeSyncService.icon;

  const workspaces = [
    'Acme Corp Enterprise',
    'Stripe Global Infrastructure',
    'Linear Engineering Guild',
  ];

  return (
    <header className="h-14 shrink-0 bg-[#09090B] border-b border-[#27272A] z-20 flex items-center justify-between px-4 sm:px-6 gap-3 select-none">
      {/* Left: Mobile Nav & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileNav && (
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#18181B] transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Live Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs min-w-0">
          {/* Workspace Switcher */}
          <div className="relative shrink-0">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#18181B] text-zinc-200 border border-[#27272A] hover:border-zinc-700 transition-colors font-medium text-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{currentWorkspace}</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl p-1 z-50 animate-dropdown-in">
                <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Select Organization
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws}
                    onClick={() => {
                      onSelectWorkspace(ws);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      ws === currentWorkspace
                        ? 'bg-zinc-800 text-white font-medium'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <span className="truncate">{ws}</span>
                    {ws === currentWorkspace && <Check className="w-3.5 h-3.5 text-zinc-200" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-zinc-600 font-mono shrink-0">/</span>
          <span className="text-zinc-200 font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
            {VIEW_TITLES[currentView] || 'Command Center'}
          </span>
        </div>
      </div>

      {/* Middle: Global Command Bar (Linear style) */}
      <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md mx-2 min-w-0">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors text-xs group"
        >
          <div className="flex items-center gap-2 truncate min-w-0">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" />
            <span className="truncate">Search Slack, Drive, Notion, Box, Gmail...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-[#27272A]">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right: Swytchcode Status & Profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Swytchcode CLI status chip */}
        <button
          onClick={() => {
            if (isCliOffline && onToggleCliOffline) {
              onToggleCliOffline();
            } else {
              onNavigate('integrations');
            }
          }}
          title={
            isCliOffline
              ? 'Swytchcode CLI disconnected: click to reconnect'
              : 'Swytchcode CLI: 5 active connectors'
          }
          className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border transition text-xs font-mono ${
            isCliOffline
              ? 'bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-900/40'
              : 'bg-[#18181B] border-[#27272A] hover:border-zinc-700 text-zinc-300'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCliOffline ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
            }`}
          ></span>
          <span>{isCliOffline ? 'swy: offline' : 'swy: 5 connected'}</span>
        </button>

        {/* Environment Status Indicator Pill */}
        <button
          onClick={() => onNavigate('integrations')}
          title={`Active Environment: ${
            environmentMode === 'live'
              ? `Live Personal Account Mode (${googleAuth.email})`
              : 'Sandbox Mode (Mock Data)'
          }. Click to manage in Integration Hub.`}
          className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-mono transition cursor-pointer ${
            environmentMode === 'live'
              ? 'bg-blue-950/50 border-blue-800/70 text-blue-300 hover:border-blue-500'
              : 'bg-[#18181B] border-[#27272A] hover:border-zinc-700 text-zinc-400'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {environmentMode === 'live' && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                environmentMode === 'live' ? 'bg-blue-400' : 'bg-emerald-500'
              }`}
            ></span>
          </span>
          <span className="text-[11px] font-medium">
            {environmentMode === 'live' ? 'Live' : 'Sandbox'}
          </span>
          {googleAuth.isConnected && (
            <span className="text-[10px] text-zinc-400 font-sans hidden xl:inline">
              ({googleAuth.email.split('@')[0]})
            </span>
          )}
        </button>

        {/* Background Synchronization Pulse Indicator for Connected Services */}
        <div className="relative" ref={syncMenuRef}>
          <button
            onClick={() => setSyncMenuOpen(!syncMenuOpen)}
            title={
              isCliOffline
                ? 'Swytchcode daemon offline - background sync paused'
                : `Background sync active: syncing ${activeSyncService.name}... Click for service telemetry`
            }
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-mono transition group ${
              isCliOffline
                ? 'bg-amber-950/30 border-amber-800/40 text-amber-300'
                : 'bg-[#18181B] border-[#27272A] hover:border-zinc-700 text-zinc-300'
            }`}
          >
            {/* Small Pulse Ring Indicator */}
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isCliOffline ? 'bg-amber-400' : activeSyncService.pingColor
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isCliOffline ? 'bg-amber-500' : activeSyncService.dotColor
                }`}
              ></span>
            </span>

            {/* Service Icon & Dynamic Name */}
            <div className="flex items-center gap-1">
              <ActiveServiceIcon className={`w-3 h-3 ${isCliOffline ? 'text-zinc-500' : activeSyncService.color}`} />
              <span className="text-[11px] text-zinc-400 hidden xl:inline">sync:</span>
              <span
                className={`text-[11px] font-medium transition-all duration-300 ${
                  isCliOffline ? 'text-zinc-500' : activeSyncService.color
                }`}
              >
                {isCliOffline ? 'paused' : activeSyncService.name}
              </span>
            </div>
          </button>

          {/* Sync Telemetry Popover */}
          {syncMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#18181B] border border-[#27272A] rounded-xl shadow-2xl p-3 z-50 text-zinc-100 animate-dropdown-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272A] mb-2">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-semibold text-white">Background Sync Telemetry</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    isCliOffline
                      ? 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                  }`}
                >
                  {isCliOffline ? 'PAUSED' : 'STREAMING'}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 mb-2.5 leading-relaxed">
                Swytchcode daemon continuously syncs workspace changes across all 5 integrated services.
              </p>

              {/* Service list with live sync status */}
              <div className="space-y-1.5">
                {CONNECTED_SYNC_SERVICES.map((srv, idx) => {
                  const Icon = srv.icon;
                  const isCurrent = idx === activeSyncIndex && !isCliOffline;
                  return (
                    <div
                      key={srv.id}
                      className={`flex items-center justify-between p-1.5 rounded-lg border text-xs transition ${
                        isCurrent
                          ? 'bg-[#101014] border-zinc-700'
                          : 'bg-transparent border-transparent text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="relative flex h-2 w-2 shrink-0">
                          {isCurrent && (
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${srv.pingColor}`}
                            ></span>
                          )}
                          <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${
                              isCliOffline ? 'bg-zinc-600' : srv.dotColor
                            }`}
                          ></span>
                        </span>
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isCliOffline ? 'text-zinc-500' : srv.color}`} />
                        <div className="truncate">
                          <span className="font-medium text-zinc-200">{srv.name}</span>
                          <span className="text-[10px] text-zinc-500 block truncate">{srv.activityText}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-2">
                        {isCliOffline ? '--' : `${srv.latencyMs}ms`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-2 border-t border-[#27272A] flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono">Swytchcode v1.4.2</span>
                <button
                  onClick={() => {
                    setSyncMenuOpen(false);
                    onNavigate('integrations');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  <span>Open Hub</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Morning Briefing shortcut */}
        <button
          onClick={() => onNavigate('briefing')}
          title="Morning Executive Briefing"
          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-[#18181B] transition"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-7 h-7 rounded-full bg-zinc-800 border border-[#27272A] hover:border-zinc-600 flex items-center justify-center text-zinc-200 transition text-xs font-mono"
            title={userEmail}
          >
            {userEmail.charAt(0).toUpperCase()}
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#18181B] border border-[#27272A] rounded-lg shadow-xl p-1.5 z-50 animate-dropdown-in">
              <div className="px-3 py-2 border-b border-[#27272A] mb-1">
                <div className="text-xs font-semibold text-zinc-100 truncate">Swytchcode Admin</div>
                <div className="text-[11px] text-zinc-400 truncate font-mono">{userEmail}</div>
              </div>

              <button
                onClick={() => {
                  onNavigate('integrations');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>Swytchcode CLI Dashboard</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('ai-settings');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                <span>Agent Governance</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('landing');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                <span>Landing Page</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('auth');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-rose-400 hover:bg-zinc-800 flex items-center gap-2 mt-1 border-t border-[#27272A] pt-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
