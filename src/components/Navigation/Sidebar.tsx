import React from 'react';

export type ActiveView =
  | 'landing'
  | 'onboarding'
  | 'auth'
  | 'dashboard'
  | 'briefing'
  | 'search'
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'briefing', label: 'Morning Briefing', icon: 'wb_sunny' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'graph', label: 'Knowledge Graph', icon: 'hub' },
    { id: 'summarizer', label: 'Document Summarizer', icon: 'summarize' },
    { id: 'action-board', label: 'Action Board', icon: 'view_kanban' },
    { id: 'triggers', label: 'Trigger Studio', icon: 'bolt' },
    { id: 'logs', label: 'Execution Logs', icon: 'history' },
    { id: 'vault', label: 'File Vault', icon: 'folder_managed' },
    { id: 'analytics', label: 'Workspace Analytics', icon: 'analytics' },
    { id: 'integrations', label: 'Integrations', icon: 'integration_instructions' },
    { id: 'ai-settings', label: 'AI Settings', icon: 'smart_toy' },
    { id: 'export-hub', label: 'Export Hub', icon: 'export_notes' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const handleItemClick = (id: ActiveView) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="w-64 h-full bg-surface-container-low flex flex-col pt-space-md pb-space-lg border-r border-[#27272A]/40 overflow-y-auto select-none">
      {/* Brand Zone */}
      <div className="px-space-lg mb-space-lg flex items-center justify-between">
        <div
          className="flex items-center gap-space-md cursor-pointer select-none"
          onClick={() => handleItemClick('dashboard')}
        >
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center border border-[#27272A]">
            <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
          </div>
          <span className="text-headline-sm font-bold text-primary tracking-tight">OmniMind</span>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-space-md flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id as ActiveView)}
              className={`w-full flex items-center px-space-md py-2 rounded-xl text-body-md transition-all text-left ${
                isActive
                  ? 'bg-surface-container-high text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined mr-space-md text-[20px] transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom status / Org Indicator */}
      <div className="px-space-md pt-space-md border-t border-[#27272A]/30">
        <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-primary">Track 2 Engine</span>
              <span className="text-[10px] text-on-surface-variant font-code">v4.2 Enterprise</span>
            </div>
          </div>
          <button
            onClick={() => handleItemClick('landing')}
            title="View Public Landing Page"
            className="text-on-surface-variant hover:text-primary p-1 rounded hover:bg-surface-container-high transition"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex shrink-0 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          {/* Slide-out Panel */}
          <div className="relative z-10 h-full shadow-2xl flex flex-col max-w-[85vw] animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
