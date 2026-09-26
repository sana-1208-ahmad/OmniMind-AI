import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  HardDrive,
  Mail,
  FileText,
  Box as BoxIcon,
  Hash,
  Check,
  Link as LinkIcon,
  Info,
  ArrowRight,
  Loader2,
  Layers,
} from 'lucide-react';

interface OnboardingViewProps {
  onNavigate: (view: ActiveView) => void;
}

interface IntegrationCardState {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  connected: boolean;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onNavigate }) => {
  const [integrations, setIntegrations] = useState<IntegrationCardState[]>([
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: HardDrive,
      description: 'Sync documents, spreadsheets, and shared team folders instantly.',
      connected: true,
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      description: 'Index email communications and threads for contextual AI queries.',
      connected: true,
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: FileText,
      description: 'Import wikis, technical notes, and collaborative roadmaps.',
      connected: true,
    },
    {
      id: 'box',
      name: 'Box',
      icon: BoxIcon,
      description: 'Secure enterprise content management and file sharing sync.',
      connected: true,
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: Hash,
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
    }, 700);
  }

  return (
    <main className="w-full bg-[#09090B] min-h-full flex-1 flex items-center justify-center py-10 px-4 text-zinc-100">
      <div className="flex flex-col w-full max-w-7xl mx-auto justify-between gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-white" />
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                Step 03 / 05 • Connect Swytchcode Core APIs
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connect your core workspace tools
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Synchronize your workspace data across platforms to enable real-time intelligence, automated
              indexing, and unified search.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#18181B] px-3 py-2 rounded-xl border border-[#27272A]">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs text-zinc-300 font-mono">
              Encrypted End-to-End TLS 1.3
            </span>
          </div>
        </div>

        {/* Grid Layout for Integrations (5 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-[#18181B] hover:border-zinc-600 transition duration-200 rounded-2xl p-5 flex flex-col justify-between border border-[#27272A]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center text-white border border-[#27272A]">
                      <Icon className="w-5 h-5 text-zinc-200" />
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                        item.connected
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-[#101014] text-zinc-500 border border-[#27272A]'
                      }`}
                    >
                      {item.connected ? 'Active' : 'Available'}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => toggleConnect(item.id)}
                    className={`w-full py-2 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 border font-medium ${
                      item.connected
                        ? 'bg-white text-black border-white hover:bg-zinc-200'
                        : 'bg-[#101014] text-zinc-300 border-[#27272A] hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {item.connected ? (
                      <Check className="w-3.5 h-3.5 text-black" />
                    ) : (
                      <LinkIcon className="w-3.5 h-3.5" />
                    )}
                    <span>{item.connected ? 'Connected' : 'Connect'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#27272A] gap-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            <Info className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>
              You can manage, add, or remove integrations anytime from workspace settings.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Skip for now
            </button>

            <button
              onClick={handleContinue}
              disabled={loadingContinue}
              className="bg-white text-black px-5 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-200 transition flex items-center gap-1.5 shadow-sm"
            >
              {loadingContinue ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                  <span>Initializing Workspace...</span>
                </>
              ) : (
                <>
                  <span>Continue to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
