import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface AuthViewProps {
  onNavigate: (view: ActiveView) => void;
  setUserEmail?: (email: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigate, setUserEmail }) => {
  const [email, setEmail] = useState('sanaahmad9352@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      if (setUserEmail) setUserEmail('sanaahmad9352@gmail.com');
      setLoading(false);
      onNavigate('dashboard');
    }, 500);
  }

  return (
    <main className="w-full bg-surface min-h-full flex-1 flex items-center justify-center selection:bg-white selection:text-black py-8">
      <div className="flex flex-col w-full items-center justify-center px-gutter relative overflow-hidden">
        {/* Subtle decorative ambient background elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-surface-container rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-surface-container-high rounded-full blur-3xl opacity-30 pointer-events-none"></div>

        {/* Outer container */}
        <div className="w-full max-w-md relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container mb-6 shadow-sm border border-[#27272A]">
              <span className="material-symbols-outlined text-primary text-2xl">hexagon</span>
            </div>
            <h1 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight mb-2">
              Welcome back to OmniMind
            </h1>
            <p className="font-body-md text-on-surface-variant">
              Enter your enterprise workspace credentials below.
            </p>
          </div>

          {/* Center Card */}
          <div className="bg-surface-container rounded-2xl p-8 shadow-xl relative border border-[#27272A] backdrop-blur-md bg-opacity-95">
            {/* Enterprise SSO Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright transition-all duration-200 text-on-surface font-medium text-body-md border border-[#27272A] shadow-sm mb-6 group cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                ></path>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Text Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-[#27272A]"></div>
              <span className="px-3 text-xs text-on-surface-variant uppercase tracking-wider font-mono">
                or sign in with email
              </span>
              <div className="flex-grow h-px bg-[#27272A]"></div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline border border-[#27272A] focus:outline-none focus:border-primary transition-all text-body-md"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-mono uppercase text-on-surface-variant">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link dispatched to enterprise SSO admin.')}
                    className="text-xs text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline border border-[#27272A] focus:outline-none focus:border-primary transition-all text-body-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-fixed-dim text-[#131315] font-semibold text-body-md transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin text-lg">
                      progress_activity
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer action switch */}
            <div className="mt-6 text-center">
              <p className="font-body-sm text-on-surface-variant">
                New to OmniMind?{' '}
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  Create an enterprise org
                </button>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-outline text-xs font-mono">
            <span className="material-symbols-outlined text-base text-emerald-400">
              verified_user
            </span>
            <span>SOC2 Type II Certified &amp; End-to-End Encrypted</span>
          </div>
        </div>
      </div>
    </main>
  );
};
