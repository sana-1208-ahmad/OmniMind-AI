import React, { useState, useEffect } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  Save,
  CheckCircle2,
  Sliders,
  Building2,
  ShieldCheck,
  Key,
  HardDrive,
  Mail,
  Calendar,
  Sparkles,
  Radio,
  LogOut,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { GoogleOAuthModal } from '../components/Modals/GoogleOAuthModal';
import {
  getGoogleAuthProfile,
  getEnvironmentMode,
  setEnvironmentMode,
  disconnectGoogleAccount,
  GoogleAccountProfile,
  EnvironmentMode,
  GOOGLE_SCOPES_INFO,
} from '../services/googleAuthService';

interface SettingsViewProps {
  onNavigate: (view: ActiveView) => void;
  userEmail?: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  userEmail = 'ishukhan8661@gmail.com',
}) => {
  const [workspaceName, setWorkspaceName] = useState('Acme Corp Enterprise');
  const [domain, setDomain] = useState('acmecorp.com');
  const [retentionDays, setRetentionDays] = useState(90);
  const [enableAuditLog, setEnableAuditLog] = useState(true);
  const [saved, setSaved] = useState(false);

  // Google OAuth state
  const [isGoogleOAuthModalOpen, setIsGoogleOAuthModalOpen] = useState(false);
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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleModeToggle = (mode: EnvironmentMode) => {
    if (mode === 'live' && !googleAuth.isConnected) {
      setIsGoogleOAuthModalOpen(true);
      return;
    }
    setEnvironmentMode(mode);
    setEnvironmentModeState(mode);
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

      {/* Google Account & Direct OAuth 2.0 Integration */}
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#101014] border border-[#27272A] flex items-center justify-center p-2 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">Google Workspace Direct OAuth 2.0</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    googleAuth.isConnected
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {googleAuth.isConnected ? `Connected: ${googleAuth.email}` : 'Not Connected'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Direct tokens for Google Drive, Gmail, and Google Calendar via Swytchcode CLI
              </p>
            </div>
          </div>

          {/* Connect / Disconnect Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            {googleAuth.isConnected ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGoogleOAuthModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#101014] border border-[#27272A] hover:border-zinc-500 text-xs font-medium text-white transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Manage Scopes</span>
                </button>
                <button
                  onClick={disconnectGoogleAccount}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 hover:bg-rose-900/40 text-xs font-medium text-rose-300 transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsGoogleOAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Connect Google Account</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-Time Environment Switching Selector */}
        <div className="p-4 rounded-xl bg-[#101014] border border-[#27272A] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-white block">
                Real-Time Data Execution Environment
              </span>
              <p className="text-[11px] text-zinc-400">
                Choose whether OmniMind runs with mock benchmark test fixtures or live Google session tokens.
              </p>
            </div>

            <div className="flex items-center bg-[#18181B] p-1 rounded-xl border border-[#27272A] text-xs font-mono shrink-0">
              <button
                onClick={() => handleModeToggle('sandbox')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  environmentMode === 'sandbox'
                    ? 'bg-zinc-700 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Radio className={`w-3 h-3 ${environmentMode === 'sandbox' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>Sandbox Mode</span>
              </button>

              <button
                onClick={() => handleModeToggle('live')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  environmentMode === 'live'
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-blue-300" />
                <span>Live Personal Account Mode</span>
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#141418] border border-[#27272A] text-[11px] text-zinc-400 font-mono">
            {environmentMode === 'live' ? (
              <span className="text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                Live Mode Enabled: Swytchcode CLI wrappers (<code>swy exec google-drive.*</code>, <code>swy exec gmail.*</code>) fetch live data using session token {googleAuth.accessToken ? `${googleAuth.accessToken.slice(0, 16)}...` : 'ya29.live'} for {googleAuth.email}.
              </span>
            ) : (
              <span className="text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Sandbox Mode Enabled: Swytchcode CLI wrappers return deterministic Track 2 enterprise benchmark test fixtures.
              </span>
            )}
          </div>
        </div>

        {/* Granted OAuth Scopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-[#101014] border border-[#27272A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                Google Drive
              </span>
              <span className="text-[9px] font-mono text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900">
                drive.readonly
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Live document parsing, presentation slide decks, and spreadsheets indexing.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#101014] border border-[#27272A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                Gmail Threads
              </span>
              <span className="text-[9px] font-mono text-rose-400 bg-rose-950 px-1.5 py-0.5 rounded border border-rose-900">
                gmail.readonly
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Email thread retrieval, customer SLA waivers, and board correspondence.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#101014] border border-[#27272A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Google Calendar
              </span>
              <span className="text-[9px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-900">
                calendar.readonly
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Meeting agenda parsing, attendee verification, and Google Meet URL generation.
            </p>
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

      {/* Google OAuth Modal */}
      <GoogleOAuthModal
        isOpen={isGoogleOAuthModalOpen}
        onClose={() => setIsGoogleOAuthModalOpen(false)}
      />
    </div>
  );
};
