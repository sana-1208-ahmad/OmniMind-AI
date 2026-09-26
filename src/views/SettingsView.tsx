import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { Save, CheckCircle2, Sliders, Building2, ShieldCheck } from 'lucide-react';

interface SettingsViewProps {
  onNavigate: (view: ActiveView) => void;
  userEmail?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  userEmail = 'sabiyaahmad8661@gmail.com',
}) => {
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
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto space-y-6 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold px-2 py-0.5 rounded bg-[#18181B] border border-[#27272A]">
              ORGANIZATION PREFERENCES
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Workspace Settings</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Manage organization metadata, connected domains, team permissions, and security policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
        >
          <Save className="w-4 h-4 text-black" />
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Workspace settings updated successfully!</span>
        </div>
      )}

      {/* General Settings */}
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-5">
        <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
          <Building2 className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold text-white">Workspace Profile</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] uppercase font-mono text-zinc-400 tracking-wider block mb-1.5">
              Workspace Display Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-sans"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase font-mono text-zinc-400 tracking-wider block mb-1.5">
              Corporate Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-sans"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase font-mono text-zinc-400 tracking-wider block mb-1.5">
              Primary Administrator
            </label>
            <input
              type="text"
              disabled
              value={userEmail}
              className="w-full bg-[#101014]/60 border border-[#27272A] rounded-lg px-3 py-2 text-xs text-zinc-500 font-mono cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase font-mono text-zinc-400 tracking-wider block mb-1.5">
              Knowledge Retention Window
            </label>
            <select
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
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
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
        <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Security & Compliance Standards</h3>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
          <div>
            <span className="text-xs font-semibold text-white block">SOC2 Type II Audit Logging</span>
            <span className="text-[11px] text-zinc-400">
              Record cryptographic hash for every cross-platform retrieval in the Execution Logs.
            </span>
          </div>
          <button
            onClick={() => setEnableAuditLog(!enableAuditLog)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              enableAuditLog ? 'bg-emerald-500' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                enableAuditLog ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
          <div>
            <span className="text-xs font-semibold text-white block">Configure AI Engine Governance</span>
            <span className="text-[11px] text-zinc-400">
              Strict schema validators, prompt grounding constraints, and executive tones.
            </span>
          </div>
          <button
            onClick={() => onNavigate('ai-settings')}
            className="px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-medium text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <span>Open AI Governance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
