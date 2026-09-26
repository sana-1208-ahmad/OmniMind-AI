import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Mail,
  Calendar,
  Key,
  ExternalLink,
  Lock,
  Terminal,
  Radio,
  Sparkles,
  RefreshCw,
  LogOut,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import {
  GoogleAccountProfile,
  getGoogleAuthProfile,
  simulateGoogleOAuthLogin,
  disconnectGoogleAccount,
  getEnvironmentMode,
  setEnvironmentMode,
  EnvironmentMode,
  GOOGLE_SCOPES_INFO,
} from '../../services/googleAuthService';

interface GoogleOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: (profile: GoogleAccountProfile) => void;
}

export const GoogleOAuthModal: React.FC<GoogleOAuthModalProps> = ({
  isOpen,
  onClose,
  onConnected,
}) => {
  const [profile, setProfile] = useState<GoogleAccountProfile>(getGoogleAuthProfile);
  const [mode, setMode] = useState<EnvironmentMode>(getEnvironmentMode);
  const [selectedEmail, setSelectedEmail] = useState(profile.email || 'ishukhan8661@gmail.com');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<number>(0);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getGoogleAuthProfile();
      setProfile(current);
      setSelectedEmail(current.email || 'ishukhan8661@gmail.com');
      setMode(getEnvironmentMode());
      setAuthStep(0);
      setIsAuthenticating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartAuth = async () => {
    setIsAuthenticating(true);
    setAuthStep(1);

    // Step 1: Contact Google Accounts
    await new Promise((res) => setTimeout(res, 500));
    setAuthStep(2);

    // Step 2: Grant scopes and acquire Bearer tokens
    await new Promise((res) => setTimeout(res, 600));
    setAuthStep(3);

    // Step 3: Register with Swytchcode CLI daemon
    await new Promise((res) => setTimeout(res, 600));
    setAuthStep(4);

    const updated = await simulateGoogleOAuthLogin(selectedEmail);
    setProfile(updated);
    setMode('live');
    setIsAuthenticating(false);

    if (onConnected) {
      onConnected(updated);
    }
  };

  const handleDisconnect = () => {
    disconnectGoogleAccount();
    setProfile(getGoogleAuthProfile());
    setMode('sandbox');
    setAuthStep(0);
  };

  const handleToggleMode = (newMode: EnvironmentMode) => {
    setEnvironmentMode(newMode);
    setMode(newMode);
  };

  const handleCopyToken = () => {
    if (profile.accessToken) {
      navigator.clipboard.writeText(profile.accessToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150 overflow-y-auto">
      <div className="max-w-xl w-full my-auto flex flex-col rounded-2xl bg-[#18181B] border border-[#27272A] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#101014] border-b border-[#27272A] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center p-2">
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
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Google Workspace OAuth 2.0
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    profile.isConnected
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {profile.isConnected ? 'Connected & Active' : 'Not Connected'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Direct OAuth integration for Google Drive, Gmail, and Google Calendar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 text-xs text-zinc-300 overflow-y-auto max-h-[75vh]">
          {/* Status / Mode Toggle Box */}
          <div className="p-3.5 rounded-xl bg-[#101014] border border-[#27272A] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Environment Execution Mode
                </span>
                <span className="text-[11px] text-zinc-400">
                  Switch how Swytchcode CLI wrappers fetch workspace data
                </span>
              </div>

              <div className="flex items-center bg-[#18181B] p-1 rounded-lg border border-[#27272A] font-mono">
                <button
                  onClick={() => handleToggleMode('sandbox')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition text-[11px] ${
                    mode === 'sandbox'
                      ? 'bg-zinc-700 text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Radio className={`w-3 h-3 ${mode === 'sandbox' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span>Sandbox Mode</span>
                </button>
                <button
                  onClick={() => handleToggleMode('live')}
                  disabled={!profile.isConnected}
                  title={!profile.isConnected ? 'Connect Google Account first to activate live mode' : ''}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition text-[11px] ${
                    mode === 'live'
                      ? 'bg-blue-600 text-white font-medium shadow-sm'
                      : !profile.isConnected
                      ? 'text-zinc-600 cursor-not-allowed'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-blue-300" />
                  <span>Live Personal Account</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 pt-1 border-t border-[#27272A] flex items-center gap-2">
              {mode === 'live' ? (
                <div className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    Active: <code className="text-white">swy exec google-drive.*</code> and <code className="text-white">swy exec gmail.*</code> querying live account ({profile.email}).
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Active: Running with enterprise sandbox fixtures (Track 2 verification benchmark).
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Connected State View */}
          {profile.isConnected ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-600/50 flex items-center justify-center text-sm font-bold text-emerald-300 font-mono">
                      {profile.name.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>{profile.name}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                          OAuth 2.0 Live
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-300 font-mono">{profile.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#18181B] border border-rose-900/50 hover:bg-rose-950/60 text-rose-300 text-[11px] transition"
                  >
                    <LogOut className="w-3 h-3 text-rose-400" />
                    <span>Disconnect</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400 pt-2 border-t border-emerald-900/30">
                  <div>
                    <span className="text-zinc-500 block">Session Token:</span>
                    <div className="flex items-center gap-1 text-zinc-300">
                      <span>{profile.accessToken.slice(0, 18)}...</span>
                      <button
                        onClick={handleCopyToken}
                        className="p-1 hover:text-white transition"
                        title="Copy Bearer Token"
                      >
                        {copiedToken ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Authenticated:</span>
                    <span className="text-zinc-300">{profile.connectedAt || 'Just now'}</span>
                  </div>
                </div>
              </div>

              {/* Scopes Overview */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-200 block">
                  Granted Google Workspace Scopes
                </span>
                <div className="space-y-2">
                  {GOOGLE_SCOPES_INFO.map((item) => (
                    <div
                      key={item.service}
                      className="p-2.5 rounded-lg bg-[#101014] border border-[#27272A] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="font-semibold text-white block">{item.service}</span>
                          <span className="text-[10px] text-zinc-400">{item.description}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.shortName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Re-authenticate / Refresh button */}
              <button
                onClick={handleStartAuth}
                disabled={isAuthenticating}
                className="w-full py-2.5 px-4 rounded-xl bg-[#101014] border border-[#27272A] hover:border-zinc-600 text-zinc-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAuthenticating ? 'animate-spin' : ''}`} />
                <span>Re-authenticate &amp; Refresh OAuth Tokens</span>
              </button>
            </div>
          ) : (
            /* Disconnected / Auth Prompt View */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/40 text-blue-200 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Secure OAuth 2.0 Token Simulation Flow</span>
                </div>
                <p className="text-[11px] text-blue-300/80 leading-relaxed">
                  Connecting your Google Account enables Swytchcode CLI wrappers (<code className="bg-blue-950 px-1 py-0.5 rounded font-mono">swy exec</code>) to query your live Google Drive files, Gmail message threads, and Google Calendar meeting invites.
                </p>
              </div>

              {/* User Account Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-300 block">
                  Google Workspace / Gmail Account
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    placeholder="you@company.com or you@gmail.com"
                    className="w-full bg-[#101014] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                  <div className="absolute right-3 top-2.5 text-[10px] font-mono text-zinc-500">
                    OAuth Target
                  </div>
                </div>
              </div>

              {/* Required Scopes Preview */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-200 block">
                  Permissions Requested by OmniMind AI:
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#101014] border border-[#27272A] flex items-center gap-3">
                    <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Google Drive Readonly</span>
                        <code className="text-[10px] text-zinc-500 font-mono">drive.readonly</code>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Index spreadsheets, slide decks, documentation specs, and shared team drives.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#101014] border border-[#27272A] flex items-center gap-3">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Gmail Message Threads</span>
                        <code className="text-[10px] text-zinc-500 font-mono">gmail.readonly</code>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Extract customer SLA waivers, meeting invite threads, and board deliverables.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#101014] border border-[#27272A] flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Google Calendar Intelligence</span>
                        <code className="text-[10px] text-zinc-500 font-mono">calendar.readonly</code>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Synthesize structured meeting timelines, Google Meet URLs, and attendee agendas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Stepper during auth */}
              {isAuthenticating && (
                <div className="p-3.5 rounded-xl bg-[#101014] border border-blue-500/40 space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-blue-400 font-semibold">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Connecting OAuth 2.0 with Google...
                    </span>
                    <span>Step {authStep} of 4</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${authStep * 25}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {authStep === 1 && 'Initiating consent exchange with accounts.google.com...'}
                    {authStep === 2 && 'Acquiring Google Bearer access tokens (ya29.a0AfH6SM...)...'}
                    {authStep === 3 && 'Binding tokens to Swytchcode daemon (swy auth connect google)...'}
                    {authStep === 4 && 'Switching active environment to Live Personal Account Mode!'}
                  </div>
                </div>
              )}

              {/* Primary Connect Button */}
              <button
                onClick={handleStartAuth}
                disabled={isAuthenticating || !selectedEmail.includes('@')}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2.5 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Connect Google Account &amp; Authorize OAuth 2.0</span>
              </button>
            </div>
          )}

          {/* Security & Vault Note */}
          <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-zinc-400" />
              AES-256 Vault Encryption via Swytchcode CLI
            </span>
            <span>swy v1.4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
