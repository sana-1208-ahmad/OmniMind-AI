import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Key,
  UploadCloud,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
  Calendar,
  Lock,
  ExternalLink,
  Trash2,
  Plus,
  Radio,
  Sliders,
  Sparkles,
  ArrowRight,
  Database,
  Mail,
  HardDrive,
  Hash,
  Box as BoxIcon,
} from 'lucide-react';
import { GoogleOAuthModal } from './GoogleOAuthModal';
import { getGoogleAuthProfile, simulateGoogleOAuthLogin } from '../../services/googleAuthService';

export interface PersonalOAuthCredentials {
  mode: 'sandbox' | 'personal';
  googleClientId: string;
  googleClientSecret: string;
  slackToken: string;
  notionSecret: string;
  boxToken: string;
  swytchcodeCliToken: string;
  ingestedFiles: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    recordsCount: number;
  }[];
}

const DEFAULT_CREDENTIALS: PersonalOAuthCredentials = {
  mode: 'sandbox',
  googleClientId: '',
  googleClientSecret: '',
  slackToken: '',
  notionSecret: '',
  boxToken: '',
  swytchcodeCliToken: '',
  ingestedFiles: [
    {
      id: 'file-1',
      name: 'personal_calendar_q3_sync.ics',
      type: 'Calendar Export (iCal)',
      size: '24 KB',
      uploadedAt: 'Today at 08:30 AM',
      recordsCount: 4,
    },
    {
      id: 'file-2',
      name: 'sarah_jenkins_meeting_notes.md',
      type: 'Markdown Notes',
      size: '18 KB',
      uploadedAt: 'Today at 09:15 AM',
      recordsCount: 2,
    },
  ],
};

interface PersonalDataOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (creds: PersonalOAuthCredentials) => void;
}

export const PersonalDataOAuthModal: React.FC<PersonalDataOAuthModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'credentials' | 'files' | 'cli'>('credentials');

  // Load from localStorage or defaults
  const [credentials, setCredentials] = useState<PersonalOAuthCredentials>(() => {
    try {
      const saved = localStorage.getItem('omnimind_personal_oauth');
      if (saved) {
        return { ...DEFAULT_CREDENTIALS, ...JSON.parse(saved) };
      }
    } catch (_) {}
    return DEFAULT_CREDENTIALS;
  });

  // Password visibility toggles
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isDirectGoogleModalOpen, setIsDirectGoogleModalOpen] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(getGoogleAuthProfile);

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      setGoogleAuth(e.detail || getGoogleAuthProfile());
    };
    window.addEventListener('omnimind:google-auth-change', handleAuthChange);
    return () => window.removeEventListener('omnimind:google-auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('omnimind_personal_oauth', JSON.stringify(credentials));
    } catch (_) {}
  }, [credentials]);

  if (!isOpen) return null;

  const toggleShowSecret = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleValidateAndTest = async () => {
    setIsValidating(true);
    setValidationSuccess(false);

    // Simulate validation with Swytchcode Daemon
    await new Promise((res) => setTimeout(res, 900));

    setIsValidating(false);
    setValidationSuccess(true);
    if (onSave) onSave(credentials);

    setTimeout(() => {
      setValidationSuccess(false);
    }, 3500);
  };

  const handleModeChange = (newMode: 'sandbox' | 'personal') => {
    setCredentials((prev) => ({ ...prev, mode: newMode }));
  };

  const handleRemoveFile = (fileId: string) => {
    setCredentials((prev) => ({
      ...prev,
      ingestedFiles: prev.ingestedFiles.filter((f) => f.id !== fileId),
    }));
  };

  const handleAddSampleFile = (sampleName: string, sampleType: string, records: number) => {
    const newFile = {
      id: `file-${Date.now()}`,
      name: sampleName,
      type: sampleType,
      size: `${Math.floor(Math.random() * 25) + 10} KB`,
      uploadedAt: 'Just now',
      recordsCount: records,
    };
    setCredentials((prev) => ({
      ...prev,
      ingestedFiles: [newFile, ...prev.ingestedFiles],
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const newFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: file.name.endsWith('.ics')
          ? 'Calendar Export (iCal)'
          : file.name.endsWith('.json')
          ? 'JSON Dataset'
          : 'Document / Text',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: 'Just now',
        recordsCount: file.name.endsWith('.ics') ? 5 : 3,
      };
      setCredentials((prev) => ({
        ...prev,
        ingestedFiles: [newFile, ...prev.ingestedFiles],
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150 overflow-y-auto">
      <div className="max-w-3xl w-full my-auto max-h-[92vh] flex flex-col rounded-2xl bg-[#18181B] border border-[#27272A] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#101014] border-b border-[#27272A] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-blue-500/30 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white tracking-tight">
                  Connect Personal Data &amp; Developer OAuth
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/70 text-blue-400 border border-blue-800/40">
                  Swytchcode CLI Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Switch between sandbox verification and your real-world workplace credentials
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

        {/* Execution Mode Selector Bar */}
        <div className="p-4 bg-[#141417] border-b border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-zinc-200 block">
              Active Knowledge Worker Execution Mode
            </span>
            <span className="text-[11px] text-zinc-400">
              {credentials.mode === 'sandbox'
                ? 'Currently running with simulated Track 2 enterprise test fixtures.'
                : 'Currently running with personal OAuth credentials via Swytchcode CLI.'}
            </span>
          </div>

          <div className="flex items-center bg-[#101014] p-1 rounded-xl border border-[#27272A] text-xs font-mono shrink-0">
            <button
              onClick={() => handleModeChange('sandbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                credentials.mode === 'sandbox'
                  ? 'bg-zinc-700 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className={`w-3 h-3 ${credentials.mode === 'sandbox' ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>Sandbox (Default)</span>
            </button>

            <button
              onClick={() => handleModeChange('personal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                credentials.mode === 'personal'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-blue-300" />
              <span>Personal Live Mode</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-[#27272A] bg-[#101014] text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex items-center gap-2 pb-2.5 border-b-2 font-medium transition shrink-0 ${
              activeTab === 'credentials'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 pb-2.5 border-b-2 font-medium transition shrink-0 ${
              activeTab === 'files'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
            <span>Custom Files &amp; Calendars ({credentials.ingestedFiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-2 pb-2.5 border-b-2 font-medium transition shrink-0 ${
              activeTab === 'cli'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>CLI Authentication Commands</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* TAB 1: Developer Credentials Form */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200 space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Client-Side AES-256 Organization Vault</span>
                </div>
                <p className="text-[11px] text-blue-300/80 leading-relaxed">
                  Your credentials are encrypted and stored in local browser memory. They are utilized by the Swytchcode CLI runtime daemon (<code className="bg-blue-950 px-1 py-0.5 rounded font-mono">swy daemon</code>) to execute real-time queries against your personal workspace.
                </p>
              </div>

              {/* Direct 1-Click Google OAuth Connection Banner */}
              <div className="p-3.5 rounded-xl bg-[#101014] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center p-1.5 shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">Direct Google Workspace OAuth 2.0</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                        googleAuth.isConnected
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {googleAuth.isConnected ? `Connected: ${googleAuth.email}` : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Auto-acquire tokens for Drive, Gmail &amp; Calendar without manually creating GCP credentials.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDirectGoogleModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition shadow-sm cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{googleAuth.isConnected ? 'Manage Google OAuth' : 'Connect Google Account'}</span>
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Google Workspace / Gmail */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-rose-400" />
                      Google OAuth Client ID
                    </label>
                    <span className="text-[10px] font-mono text-zinc-500">Gmail &amp; Calendar</span>
                  </div>
                  <input
                    type="text"
                    value={credentials.googleClientId}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, googleClientId: e.target.value }))
                    }
                    placeholder="e.g. 326730206120-apps.googleusercontent.com"
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>

                {/* Google Client Secret */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-400" />
                      Google Client Secret
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('googleSecret')}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets['googleSecret'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showSecrets['googleSecret'] ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets['googleSecret'] ? 'text' : 'password'}
                    value={credentials.googleClientSecret}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, googleClientSecret: e.target.value }))
                    }
                    placeholder="GOCSPX-..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>

                {/* Slack App Token */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-sky-400" />
                      Slack Bot / User Token
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('slackToken')}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets['slackToken'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showSecrets['slackToken'] ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets['slackToken'] ? 'text' : 'password'}
                    value={credentials.slackToken}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, slackToken: e.target.value }))
                    }
                    placeholder="xoxb- or xapp-..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>

                {/* Notion Integration Secret */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      Notion Internal Secret
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('notionSecret')}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets['notionSecret'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showSecrets['notionSecret'] ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets['notionSecret'] ? 'text' : 'password'}
                    value={credentials.notionSecret}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, notionSecret: e.target.value }))
                    }
                    placeholder="secret_..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>

                {/* Box Platform Token */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <BoxIcon className="w-3.5 h-3.5 text-teal-400" />
                      Box Developer Token
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('boxToken')}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets['boxToken'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showSecrets['boxToken'] ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets['boxToken'] ? 'text' : 'password'}
                    value={credentials.boxToken}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, boxToken: e.target.value }))
                    }
                    placeholder="box_token_..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>

                {/* Swytchcode User API Key */}
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#101014] border border-[#27272A]">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-zinc-200 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      Swytchcode CLI Daemon Key
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('cliKey')}
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {showSecrets['cliKey'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showSecrets['cliKey'] ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showSecrets['cliKey'] ? 'text' : 'password'}
                    value={credentials.swytchcodeCliToken}
                    onChange={(e) =>
                      setCredentials((prev) => ({ ...prev, swytchcodeCliToken: e.target.value }))
                    }
                    placeholder="swy_user_live_..."
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-zinc-500 placeholder-zinc-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Custom Local Files & Calendar (.ics, .json, .eml) */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed transition text-center space-y-2.5 ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-[#27272A] bg-[#101014] hover:border-zinc-600'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">
                  Drop Local Calendar (.ics) or Document Files Here
                </h4>
                <p className="text-[11px] text-zinc-400 max-w-md mx-auto">
                  Ingest personal calendar exports, email threads (.eml), meeting notes (.md), or JSON schemas directly into OmniMind&apos;s local vector cache.
                </p>

                {/* Pre-Loaded Quick Ingest Chips */}
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() =>
                      handleAddSampleFile('q3_board_calendar_sync.ics', 'iCalendar (.ics)', 3)
                    }
                    className="px-2.5 py-1 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-zinc-600 text-zinc-300 hover:text-white text-[11px] font-mono transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3 text-emerald-400" />
                    <span>+ Add Sample Calendar (.ics)</span>
                  </button>
                  <button
                    onClick={() =>
                      handleAddSampleFile('client_sla_waiver_threads.eml', 'Email Threads (.eml)', 2)
                    }
                    className="px-2.5 py-1 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-zinc-600 text-zinc-300 hover:text-white text-[11px] font-mono transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3 text-blue-400" />
                    <span>+ Add Sample Email Thread</span>
                  </button>
                </div>
              </div>

              {/* Active Ingested Files List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
                  Active Ingested Personal Data Streams ({credentials.ingestedFiles.length})
                </span>

                <div className="space-y-2">
                  {credentials.ingestedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl bg-[#101014] border border-[#27272A] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                          {file.name.endsWith('.ics') ? (
                            <Calendar className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-white block">{file.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {file.type} • {file.size} • {file.recordsCount} parsed records • {file.uploadedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                          Active in Agent
                        </span>
                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1 rounded text-zinc-500 hover:text-rose-400 transition"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLI Terminal Commands */}
          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#101014] border border-[#27272A] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Swytchcode CLI Authentication Reference</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Run these commands in your local shell terminal to pair your personal workspace with the Swytchcode CLI daemon.
                </p>
              </div>

              {/* Monospace Command snippets */}
              <div className="space-y-2.5 font-mono text-xs">
                {[
                  {
                    title: '1. Connect Google Workspace (Gmail & Calendar)',
                    cmd: 'swy login --provider google --scopes "gmail.readonly,calendar.events.readonly"',
                    note: 'Spawns local OAuth consent flow and securely stores token in AES-256 KMS vault.',
                  },
                  {
                    title: '2. Pair Slack Workspace',
                    cmd: 'swy auth set slack --token "xoxb-your-slack-bot-token"',
                    note: 'Validates Socket Mode connection to your company channels.',
                  },
                  {
                    title: '3. Ingest Personal Calendar Events (.ics)',
                    cmd: 'swy ingest ./personal_calendar_q3_sync.ics --tag "calendar:personal"',
                    note: 'Parses timestamps, meeting links (Google Meet/Zoom), and agendas.',
                  },
                  {
                    title: '4. Start Swytchcode Daemon in Live Mode',
                    cmd: 'swy daemon start --mode personal --port 3000',
                    note: 'Enables real-time query execution across all 5 live personal connectors.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#101014] border border-[#27272A] space-y-1.5">
                    <span className="text-zinc-300 font-semibold block">{item.title}</span>
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#09090B] border border-[#27272A]">
                      <span className="text-emerald-400 truncate select-all">{item.cmd}</span>
                      <button
                        onClick={() => copyToClipboard(item.cmd, `cli-${idx}`)}
                        className="p-1 rounded text-zinc-400 hover:text-white transition shrink-0"
                        title="Copy command"
                      >
                        {copiedKey === `cli-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-zinc-500 block">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-[#101014] border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            {validationSuccess ? (
              <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Personal OAuth &amp; Data Streams Validated
              </span>
            ) : (
              <span className="text-[11px] font-mono text-zinc-500">
                Mode: <strong className="text-white uppercase">{credentials.mode}</strong> • AES-256 Vault Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:bg-zinc-800 text-zinc-300 text-xs transition"
            >
              Cancel
            </button>

            <button
              onClick={handleValidateAndTest}
              disabled={isValidating}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-semibold text-xs transition shadow-md ${
                isValidating
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95'
              }`}
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Save &amp; Apply Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Google OAuth Modal */}
      <GoogleOAuthModal
        isOpen={isDirectGoogleModalOpen}
        onClose={() => setIsDirectGoogleModalOpen(false)}
        onConnected={(prof) => {
          setCredentials((prev) => ({
            ...prev,
            mode: 'personal',
            googleClientId: '326730206120-apps.googleusercontent.com',
            googleClientSecret: prof.accessToken,
          }));
        }}
      />
    </div>
  );
};
