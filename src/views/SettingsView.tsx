import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface SettingsViewProps {
  onNavigate: (view: ActiveView) => void;
  userEmail?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate, userEmail = 'sanaahmad9352@gmail.com' }) => {
  const [workspaceName, setWorkspaceName] = useState('Acme Corp Enterprise');
  const [domain, setDomain] = useState('acmecorp.com');
  const [retentionDays, setRetentionDays] = useState(90);
  const [enableAuditLog, setEnableAuditLog] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 p-space-xl max-w-4xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold px-2 py-0.5 rounded bg-surface-container-high border border-[#27272A]">
              ORGANIZATION PREFERENCES
            </span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">Workspace Settings</h1>
          <p className="text-secondary text-body-md mt-1">
            Manage organization metadata, connected domains, team permissions, and security policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-sm flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>Workspace settings updated successfully!</span>
        </div>
      )}

      {/* General Settings */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-5">
        <h3 className="text-base font-semibold text-primary">Workspace Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-1.5">
              Workspace Display Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-[#27272A] rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-1.5">
              Corporate Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-surface-container-lowest border border-[#27272A] rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-1.5">
              Primary Administrator
            </label>
            <input
              type="text"
              disabled
              value={userEmail}
              className="w-full bg-surface-container-lowest/60 border border-[#27272A] rounded-lg px-3 py-2 text-sm text-secondary font-mono cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-1.5">
              Knowledge Retention Window
            </label>
            <select
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full bg-surface-container-lowest border border-[#27272A] rounded-lg px-3 py-2 text-sm text-primary focus:outline-none"
            >
              <option value={30}>30 Days (Ephemeral)</option>
              <option value={90}>90 Days (Enterprise Standard)</option>
              <option value={365}>365 Days (Full Year)</option>
              <option value={9999}>Indefinite Retention</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-4">
        <h3 className="text-base font-semibold text-primary">Security & Compliance Standards</h3>

        <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
          <div>
            <span className="text-sm font-medium text-primary block">SOC2 Type II Audit Logging</span>
            <span className="text-xs text-secondary">
              Record cryptographic hash for every cross-platform retrieval in the Execution Logs.
            </span>
          </div>
          <button
            onClick={() => setEnableAuditLog(!enableAuditLog)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              enableAuditLog ? 'bg-emerald-500' : 'bg-surface-container-high'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                enableAuditLog ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
          <div>
            <span className="text-sm font-medium text-primary block">Configure AI Engine Governance</span>
            <span className="text-xs text-secondary">
              Strict schema validators, prompt grounding constraints, and executive tones.
            </span>
          </div>
          <button
            onClick={() => onNavigate('ai-settings')}
            className="px-3 py-1.5 rounded-lg bg-surface-container-high border border-[#27272A] text-xs font-medium text-primary hover:bg-[#27272A] transition-colors"
          >
            Open AI Governance
          </button>
        </div>
      </div>
    </div>
  );
};
