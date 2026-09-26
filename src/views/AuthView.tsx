import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { Layers, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthViewProps {
  onNavigate: (view: ActiveView) => void;
  setUserEmail?: (email: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigate, setUserEmail }) => {
  const [email, setEmail] = useState('sabiyaahmad8661@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (setUserEmail && email) setUserEmail(email);

    setTimeout(() => {
      setLoading(false);
      onNavigate('dashboard');
    }, 600);
  }

  function handleGoogleLogin() {
    setLoading(true);
    setTimeout(() => {
      if (setUserEmail) setUserEmail('sabiyaahmad8661@gmail.com');
      setLoading(false);
      onNavigate('dashboard');
    }, 500);
  }

  return (
    <main className="w-full bg-[#09090B] min-h-full flex-1 flex items-center justify-center py-10 px-4 text-zinc-100">
      <div className="flex flex-col w-full items-center justify-center max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#18181B] mb-4 border border-[#27272A] shadow-sm">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            Welcome to OmniMind AI
          </h1>
          <p className="text-xs text-zinc-400">
            Autonomous enterprise knowledge worker for your workspace.
          </p>
        </div>

        {/* Center Card */}
        <div className="w-full bg-[#18181B] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#27272A]">
          {/* Enterprise SSO Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#101014] hover:bg-zinc-800 transition-colors text-white font-medium text-xs border border-[#27272A] shadow-sm mb-5 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          {/* Text Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-[#27272A]"></div>
            <span className="px-3 text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              or sign in with email
            </span>
            <div className="flex-grow h-px bg-[#27272A]"></div>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#101014] text-white placeholder:text-zinc-600 border border-[#27272A] focus:outline-none focus:border-zinc-500 transition text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono uppercase text-zinc-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(true);
                    setTimeout(() => setResetSent(false), 3000);
                  }}
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#101014] text-white placeholder:text-zinc-600 border border-[#27272A] focus:outline-none focus:border-zinc-500 transition text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {resetSent && (
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Password reset link sent to your work email.</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition duration-150 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <>
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer action switch */}
          <div className="mt-5 text-center">
            <p className="text-xs text-zinc-400">
              New to OmniMind?{' '}
              <button
                onClick={() => onNavigate('onboarding')}
                className="text-white font-medium hover:underline cursor-pointer"
              >
                Create an enterprise org
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SOC2 Type II Certified &amp; End-to-End Encrypted</span>
        </div>
      </div>
    </main>
  );
};
