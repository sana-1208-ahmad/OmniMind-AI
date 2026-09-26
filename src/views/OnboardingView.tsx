import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface OnboardingViewProps {
  onNavigate: (view: ActiveView) => void;
}

interface IntegrationCardState {
  id: string;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onNavigate }) => {
  const [integrations, setIntegrations] = useState<IntegrationCardState[]>([
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: 'add_to_drive',
      description: 'Sync documents, spreadsheets, and shared team folders instantly.',
      connected: true,
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: 'mail',
      description: 'Index email communications and threads for contextual AI queries.',
      connected: true,
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: 'edit_note',
      description: 'Import wikis, technical notes, and collaborative roadmaps.',
      connected: true,
    },
    {
      id: 'box',
      name: 'Box',
      icon: 'folder_zip',
      description: 'Secure enterprise content management and file sharing sync.',
      connected: true,
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: 'chat',
      description: 'Real-time chat channels, direct messages, and team notifications.',
      connected: true,
    },
  ]);

  const [loadingContinue, setLoadingContinue] = useState(false);

  function toggleConnect(id: string) {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  }

  function handleContinue() {
    setLoadingContinue(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 900);
  }

  return (
    <main className="w-full bg-surface min-h-full flex-1 flex items-center justify-center selection:bg-white selection:text-black py-8">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-gutter justify-between gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-margin gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="material-symbols-outlined text-primary text-body-lg">hub</span>
              <span className="font-label-md text-on-surface-variant uppercase tracking-wider font-mono text-xs">
                Step 03 / 05
              </span>
            </div>
            <h1 className="font-headline-lg text-primary text-3xl font-bold tracking-tight">
              Connect your core tools
            </h1>
            <p className="font-body-md text-on-surface-variant mt-space-xs max-w-xl">
              Synchronize your workspace data across platforms to enable real-time intelligence, automated
              indexing, and unified search.
            </p>
          </div>
          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-[#27272A]">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-body-sm text-on-surface-variant font-mono">
              Encrypted End-to-End TLS 1.3
            </span>
          </div>
        </div>

        {/* Grid Layout for Integrations (5 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter mb-margin">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="group relative bg-surface-container hover:bg-surface-container-high transition-all duration-300 rounded-2xl p-space-lg flex flex-col justify-between border border-[#27272A]"
            >
              <div>
                <div className="flex items-center justify-between mb-space-lg">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span
                    className={`px-space-sm py-1 rounded-full text-label-sm font-mono text-[11px] ${
                      item.connected
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-surface-container-lowest text-on-surface-variant'
                    }`}
                  >
                    {item.connected ? 'Active' : 'Available'}
                  </span>
                </div>
                <h3 className="font-headline-sm text-primary mb-space-xs font-semibold">
                  {item.name}
                </h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-space-xl">
                <button
                  onClick={() => toggleConnect(item.id)}
                  className={`w-full py-space-sm px-space-md rounded-xl font-body-sm transition-all duration-200 flex items-center justify-center gap-space-xs border border-[#27272A] ${
                    item.connected
                      ? 'bg-primary text-[#131315] font-semibold'
                      : 'text-primary hover:bg-primary hover:text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-body-md">
                    {item.connected ? 'check' : 'link'}
                  </span>
                  <span>{item.connected ? 'Connected' : 'Connect'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg border-t border-[#27272A]">
          <div className="flex items-center gap-space-sm text-on-surface-variant mb-space-md sm:mb-0">
            <span className="material-symbols-outlined text-body-md">info</span>
            <span className="font-body-sm">
              You can manage, add, or remove integrations anytime from workspace settings.
            </span>
          </div>

          <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-space-lg py-space-sm rounded-xl font-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              Skip for now
            </button>

            <button
              onClick={handleContinue}
              disabled={loadingContinue}
              className="bg-primary text-on-primary px-space-xl py-space-sm rounded-xl font-body-sm font-semibold hover:bg-primary-fixed-dim transition-colors flex items-center gap-space-xs shadow-md"
            >
              {loadingContinue ? (
                <>
                  <span className="material-symbols-outlined text-body-md animate-spin">
                    progress_activity
                  </span>
                  <span>Initializing Workspace...</span>
                </>
              ) : (
                <>
                  <span>Continue to Workspace</span>
                  <span className="material-symbols-outlined text-body-md">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
