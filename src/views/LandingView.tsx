import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  User,
  Zap,
  Network,
  Lock,
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-[#09090B] text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 w-full z-30 bg-[#09090B]/90 backdrop-blur-xl border-b border-[#27272A]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-[#18181B] flex items-center justify-center border border-[#27272A]">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">
              OmniMind AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
            <span className="px-3 py-1 bg-[#18181B] text-white rounded-lg border border-[#27272A]">
              Overview
            </span>
            <button
              onClick={() => onNavigate('search')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Universal Search
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Knowledge Graph
            </button>
            <button
              onClick={() => onNavigate('action-board')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Action Board
            </button>
            <button
              onClick={() => onNavigate('integrations')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Integrations
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('auth')}
              className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-white text-black px-4 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-200 transition shadow-sm"
            >
              Workspace
            </button>
            <div
              className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center cursor-pointer text-zinc-300 hover:text-white"
              onClick={() => onNavigate('dashboard')}
            >
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1">
        <div className="flex flex-col w-full">
          {/* Hero Section */}
          <section className="relative pt-12 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="flex flex-col gap-5 lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] w-max">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs text-zinc-300 font-mono">
                  v4.2 Enterprise Release Live • Swytchcode Track 2
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                The autonomous knowledge layer for your entire enterprise.
              </h1>

              <p className="text-sm lg:text-base text-zinc-400 max-w-xl leading-relaxed">
                Connect fragmented internal data, documentation, and real-time workflows into a single
                reasoning architecture across Gmail, Google Drive, Notion, Box, and Slack.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="bg-[#18181B] border border-[#27272A] px-4 py-2.5 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors flex-1 text-xs font-sans"
                />
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="bg-white text-black px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-zinc-200 transition flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

              <div className="flex items-center gap-6 mt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SOC2 Type II Certified</span>
                </div>
              </div>
            </div>

            {/* Hero System Box */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col gap-4 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    omnimind-core-v2.1.sys
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#101014] p-3 rounded-xl border border-[#27272A]">
                    <div className="flex items-center justify-between text-xs mb-1 font-mono">
                      <span className="text-zinc-400">Query Vector Index</span>
                      <span className="text-emerald-400 font-bold">14ms latency</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-mono bg-[#18181B] p-2 rounded-lg border border-[#27272A]">
                      GET /api/v2/knowledge/stream?sync=true
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#101014] p-3 rounded-xl border border-[#27272A]">
                      <span className="text-[10px] text-zinc-400 block mb-1 font-mono uppercase">
                        Active Nodes
                      </span>
                      <span className="text-lg font-bold text-white font-mono">1,248,590</span>
                    </div>
                    <div className="bg-[#101014] p-3 rounded-xl border border-[#27272A]">
                      <span className="text-[10px] text-zinc-400 block mb-1 font-mono uppercase">
                        Sync Accuracy
                      </span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">99.98%</span>
                    </div>
                  </div>

                  <div className="bg-[#101014] p-3 rounded-xl flex items-center justify-between border border-[#27272A]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#18181B] flex items-center justify-center text-white border border-[#27272A]">
                        <Cpu className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">
                          Autonomous Cluster #4
                        </h4>
                        <p className="text-[11px] text-zinc-400">Real-time reasoning active</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#18181B] text-[10px] font-mono text-emerald-400 border border-[#27272A]">
                      Stable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="border-y border-[#27272A] bg-[#101014] py-8 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">99.99%</span>
                <span className="text-xs text-zinc-400">Uptime SLA Guaranteed</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">&lt; 15ms</span>
                <span className="text-xs text-zinc-400">Average Vector Lookup</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">10B+</span>
                <span className="text-xs text-zinc-400">Tokens Processed Daily</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold text-white font-mono">500+</span>
                <span className="text-xs text-zinc-400">Enterprise Deployments</span>
              </div>
            </div>
          </section>

          {/* Architecture Bento Section */}
          <section className="py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-2 mb-10">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Architecture
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Engineered for absolute scale
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
                Everything you need to orchestrate complex knowledge graphs and reasoning engines
                across disparate tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between gap-6 group hover:border-zinc-600 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center text-white border border-[#27272A]">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-base text-white font-semibold">
                    Zero-Latency Sync
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Connect internal databases, repositories, and documentation channels without custom
                    pipeline engineering.
                  </p>
                </div>
                <div className="bg-[#101014] p-3 rounded-xl font-mono text-xs text-zinc-400 border border-[#27272A]">
                  $ omnimind sync --auto-resolve
                </div>
              </div>

              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between gap-6 group hover:border-zinc-600 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center text-white border border-[#27272A]">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base text-white font-semibold">
                    Enterprise Security
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Role-based access controls, end-to-end encryption at rest and in transit, and complete
                    audit logging.
                  </p>
                </div>
                <div className="bg-[#101014] p-3 rounded-xl font-mono text-xs text-zinc-300 border border-[#27272A] flex items-center justify-between">
                  <span>SOC2 &amp; HIPAA Compliant</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 flex flex-col justify-between gap-6 group hover:border-zinc-600 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center text-white border border-[#27272A]">
                    <Network className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-base text-white font-semibold">
                    Autonomous Reasoning
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Self-healing vector indexes that automatically adapt to structural code changes and
                    documentation edits.
                  </p>
                </div>
                <div className="bg-[#101014] p-3 rounded-xl font-mono text-xs text-zinc-400 border border-[#27272A]">
                  Index health: 100% optimized
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner Section */}
          <section className="py-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full mb-12">
            <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center gap-4 relative">
              <h2 className="text-2xl sm:text-3xl text-white max-w-xl font-bold">
                Ready to transform your enterprise knowledge?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
                Join forward-thinking engineering teams building the next generation of autonomous
                workplace intelligence.
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-zinc-200 transition shadow-lg"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-[#101014] border border-[#27272A] text-white px-6 py-2.5 rounded-xl text-xs font-medium hover:bg-zinc-800 transition"
                >
                  Enter Workspace
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full bg-[#101014] py-6 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs gap-3">
          <div>© 2026 OmniMind AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>SOC2 Type II</span>
            <span>·</span>
            <span>HIPAA Compliant</span>
            <span>·</span>
            <span>TLS 1.3 Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
