import React, { useState } from 'react';
import { ActiveView } from './Sidebar';

interface TopHeaderProps {
  currentWorkspace: string;
  onSelectWorkspace: (ws: string) => void;
  onOpenCommandPalette: () => void;
  onNavigate: (view: ActiveView) => void;
  userEmail?: string;
  onToggleMobileNav?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentWorkspace,
  onSelectWorkspace,
  onOpenCommandPalette,
  onNavigate,
  userEmail = 'sanaahmad9352@gmail.com',
  onToggleMobileNav,
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const workspaces = ['Acme Corp Workspace', 'Stripe Global Enterprise', 'Linear Engineering Org'];

  return (
    <header className="h-16 shrink-0 bg-surface/90 backdrop-blur-xl z-20 flex items-center justify-between px-3 sm:px-6 border-b border-[#27272A]/40 gap-2">
      {/* Left: Mobile Menu Toggle & Workspace Dropdown */}
      <div className="flex items-center gap-2">
        {onToggleMobileNav && (
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition"
            aria-label="Toggle navigation menu"
            title="Open Menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-label-md border border-[#27272A]/50 hover:bg-surface-container transition-all max-w-[150px] sm:max-w-[220px] md:max-w-none"
          >
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">domain</span>
            <span className="font-medium text-primary truncate text-xs sm:text-sm">{currentWorkspace}</span>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">expand_more</span>
          </button>

          {workspaceMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-surface-container-low border border-[#27272A] rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[11px] font-code text-on-surface-variant uppercase tracking-wider">
                Switch Workspace
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    onSelectWorkspace(ws);
                    setWorkspaceMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-body-sm flex items-center justify-between transition-colors ${
                    ws === currentWorkspace
                      ? 'bg-surface-container-high text-primary font-medium'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="truncate">{ws}</span>
                  {ws === currentWorkspace && (
                    <span className="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Command Palette Quick Affordance */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-3">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between gap-space-md px-space-md py-1.5 rounded-xl bg-surface-container-low border border-[#27272A]/60 hover:border-outline-variant/60 text-on-surface-variant hover:text-on-surface transition-all text-body-sm shadow-inner group"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors shrink-0">
              search
            </span>
            <span className="truncate text-xs sm:text-sm">Search docs, threads, or actions...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code text-[11px] border border-outline-variant/30">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code text-[11px] border border-outline-variant/30">
              K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right: Quick actions and Profile */}
      <div className="flex items-center gap-1.5 sm:gap-space-md shrink-0">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition"
          title="Search (⌘K)"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        <button
          onClick={() => onNavigate('briefing')}
          title="Morning Digest"
          className="hidden sm:flex p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition"
        >
          <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
        </button>

        <button
          onClick={() => onNavigate('integrations')}
          title="5 Connected Apps Active"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-[#27272A] text-xs font-code text-on-surface-variant hover:text-primary transition"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>5 Synced</span>
        </button>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-surface-container-low border border-[#27272A] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-[#27272A]/50 mb-1">
                <div className="text-body-sm font-semibold text-primary truncate">Enterprise Admin</div>
                <div className="text-xs text-on-surface-variant truncate font-code">{userEmail}</div>
              </div>

              <button
                onClick={() => {
                  onNavigate('onboarding');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
                <span>Connect Integrations (Step 3/5)</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('ai-settings');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>AI Preferences</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('landing');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">public</span>
                <span>Public Overview Landing</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('auth');
                  setUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-body-sm text-rose-400 hover:bg-surface-container flex items-center gap-2 mt-1 border-t border-[#27272A]/40 pt-2"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out / Switch User</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
