import React, { useState } from 'react';
import { CONNECTED_INTEGRATIONS_INITIAL } from '../data/mockWorkspacePayload';
import { ConnectedIntegration } from '../types';

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState<ConnectedIntegration[]>(CONNECTED_INTEGRATIONS_INITIAL);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [overallTestStatus, setOverallTestStatus] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              syncHealth: !item.connected ? 'Healthy' : 'Disconnected',
              lastSynced: !item.connected ? 'Just now' : 'Inactive',
            }
          : item
      )
    );
  };

  const handleTestConnection = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setIntegrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, syncHealth: 'Healthy', lastSynced: 'Verified just now' } : item
        )
      );
    }, 1000);
  };

  const handleTestAll = () => {
    setOverallTestStatus('Testing all 5 workspace integrations...');
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((item) => ({ ...item, syncHealth: 'Healthy', lastSynced: 'Verified just now' }))
      );
      setOverallTestStatus('All 5 platforms verified! Universal search pipeline 100% operational.');
      setTimeout(() => setOverallTestStatus(null), 4000);
    }, 1500);
  };

  return (
    <div className="flex-1 p-space-xl max-w-7xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              TRACK 2 INTEGRATION SUITE
            </span>
            <span className="text-[12px] text-secondary">5 Connected Apps</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">Workspace Integrations</h1>
          <p className="text-secondary text-body-md mt-1">
            OmniMind AI connects directly with your enterprise tools to search, summarize, and extract action items in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestAll}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Test All Connections
          </button>
        </div>
      </div>

      {overallTestStatus && (
        <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-sm flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>{overallTestStatus}</span>
        </div>
      )}

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between hover:border-zinc-500/50 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-[#27272A]">
                  <span className="material-symbols-outlined text-[26px] text-primary">{item.icon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.connected && item.syncHealth === 'Healthy'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.connected && item.syncHealth === 'Healthy' ? 'bg-emerald-400' : 'bg-zinc-500'
                      }`}
                    />
                    {item.connected ? item.syncHealth : 'Disconnected'}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold text-primary text-base">{item.name}</h3>
                <p className="text-xs text-secondary mt-0.5">{item.subtitle}</p>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-surface-container border border-[#27272A] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-secondary">Identity:</span>
                  <span className="font-mono text-primary truncate max-w-[170px]">{item.workspaceIdentity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Sync ID:</span>
                  <span className="font-mono text-secondary">{item.internalId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Last Synced:</span>
                  <span className="text-primary">{item.lastSynced}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272A]/50 flex items-center justify-between gap-2">
              <button
                disabled={!item.connected || testingId === item.id}
                onClick={() => handleTestConnection(item.id)}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-[#27272A] text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[15px] ${testingId === item.id ? 'animate-spin text-emerald-400' : ''}`}>
                  refresh
                </span>
                Test Ping
              </button>

              <button
                onClick={() => toggleConnection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  item.connected
                    ? 'bg-red-950/40 text-red-400 border border-red-800/40 hover:bg-red-900/40'
                    : 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/50'
                }`}
              >
                {item.connected ? 'Disconnect' : 'Connect Tool'}
              </button>
            </div>
          </div>
        ))}

        {/* Custom Webhook Connector Card */}
        <div className="p-5 rounded-xl bg-surface-container-lowest border border-dashed border-[#27272A] flex flex-col justify-center items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-[#27272A]">
            <span className="material-symbols-outlined text-[24px] text-secondary">add_link</span>
          </div>
          <div>
            <h4 className="font-medium text-primary text-sm">Add Custom Webhook</h4>
            <p className="text-xs text-secondary mt-1 max-w-xs">
              Ingest payloads from GitHub, Linear, or internal Jira deployments via standard Track 2 schemas.
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText('https://api.omnimind.internal/v1/ingest');
              setOverallTestStatus('Webhook URL copied to clipboard: https://api.omnimind.internal/v1/ingest');
              setTimeout(() => setOverallTestStatus(null), 3500);
            }}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-[#27272A] text-xs text-primary hover:bg-[#27272A] transition-colors"
          >
            Copy Webhook URL
          </button>
        </div>
      </div>
    </div>
  );
};
