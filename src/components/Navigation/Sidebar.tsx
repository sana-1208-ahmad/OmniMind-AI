import React from 'react';
import {
  LayoutDashboard,
  Sun,
  Search,
  Share2,
  FileText,
  CheckSquare,
  Zap,
  History,
  FolderGit2,
  BarChart3,
  Terminal,
  Sliders,
  Download,
  Settings,
  X,
  ExternalLink,
  Layers,
  ChevronRight,
  ShieldCheck,
  Radio,
  Cpu,
  Activity,
  CheckCircle2,
  Bot,
} from 'lucide-react';

export type ActiveView =
  | 'chat'
  | 'landing'
  | 'onboarding'
  | 'auth'
  | 'dashboard'
  | 'briefing'
  | 'search'
  | 'workflow'
  | 'graph'
  | 'summarizer'
  | 'action-board'
  | 'triggers'
  | 'logs'
  | 'vault'
  | 'analytics'
  | 'integrations'
  | 'ai-settings'
  | 'export-hub'
  | 'settings';

interface SidebarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isCliOffline?: boolean;
}

interface NavItem {
  id: ActiveView;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
  isCliOffline = false,
}) => {
  const navGroups: NavGroup[] = [
    {
      groupName: 'Workspace Core',
      items: [
        { id: 'chat', label: 'Agent Workspace', icon: Bot, badge: 'ChatGPT UI' },
        { id: 'search', label: 'Command Center', icon: Search, badge: 'Unified' },
        { id: 'workflow', label: 'Agentic Workflow', icon: Cpu, badge: 'Pipeline' },
        { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
        { id: 'briefing', label: 'Executive Briefing', icon: Sun, badge: 'Live' },
      ],
    },
    {
      groupName: 'Autonomous Agent',
      items: [
        { id: 'action-board', label: 'Action Board', icon: CheckSquare, badge: '7' },
        { id: 'graph', label: 'Knowledge Graph', icon: Share2 },
        { id: 'summarizer', label: 'Doc Summarizer', icon: FileText },
        { id: 'vault', label: 'Vault Explorer', icon: FolderGit2 },
      ],
    },
    {
      groupName: 'Swytchcode & APIs',
      items: [
        { id: 'integrations', label: 'Integration Hub', icon: Terminal, badge: '5 Tools' },
        { id: 'logs', label: 'Execution & SOC2', icon: History },
        { id: 'analytics', label: 'Agent Analytics', icon: BarChart3 },
      ],
    },
    {
      groupName: 'System & Governance',
      items: [
        { id: 'ai-settings', label: 'AI Governance', icon: Sliders },
        { id: 'settings', label: 'Settings & Orgs', icon: Settings },
      ],
    },
  ];

  const handleItemClick = (id: ActiveView) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="w-[260px] h-full bg-[#101014] flex flex-col border-r border-[#27272A] overflow-hidden select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#27272A] flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleItemClick('search')}
        >
          <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white shadow-sm group-hover:border-zinc-500 transition-colors">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              OmniMind AI
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">Swytchcode Track 2</span>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-[#18181B] transition"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
        {navGroups.map((group) => (
          <div key={group.groupName} className="space-y-1">
            <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              {group.groupName}
            </div>
            {group.items.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors text-left ${
                    isActive
                      ? 'bg-[#18181B] text-white font-medium border border-[#27272A] shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-zinc-500'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1.5 ${
                        isActive
                          ? 'bg-zinc-800 text-zinc-200'
                          : 'bg-[#18181B] text-zinc-500 border border-[#27272A]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Swytchcode Daemon Status Indicator */}
      <div className="p-3 border-t border-[#27272A] bg-[#101014] space-y-2">
        <div
          onClick={() => handleItemClick('integrations')}
          title="Swytchcode CLI Daemon Status (PID 4108) - Click to manage"
          className="p-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-zinc-700 transition-colors cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isCliOffline ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isCliOffline ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              ></span>
            </span>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] font-mono text-zinc-200 font-semibold truncate">
                  {isCliOffline ? 'swy daemon: paused' : 'swy login: active'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 truncate">
                {isCliOffline ? 'PID 4108 unreachable' : 'PID 4108 verified (5 tools)'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:translate-x-0.5 shrink-0 ml-1" />
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 pt-1">
          <span className="font-mono text-[10px]">v1.4.2 [Track 2]</span>
          <button
            onClick={() => handleItemClick('landing')}
            className="flex items-center gap-1 hover:text-zinc-300 transition-colors text-[11px]"
          >
            <span>Overview</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed 260px) */}
      <aside className="hidden lg:flex shrink-0 h-full w-[260px]">{sidebarContent}</aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full shadow-2xl flex flex-col max-w-[85vw] animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
