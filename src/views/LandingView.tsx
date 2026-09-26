import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface LandingViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 w-full z-30 bg-surface/90 backdrop-blur-xl border-b border-[#27272A]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <div
            className="flex items-center gap-space-md cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A]">
              <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            </div>
            <span className="text-headline-sm font-semibold tracking-tight text-on-surface">
              OmniMind
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-space-lg">
            <span className="px-3 py-1 bg-surface-container text-on-surface font-medium rounded-lg text-body-md">
              Overview
            </span>
            <button
              onClick={() => onNavigate('search')}
              className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Universal Search
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Knowledge Graph
            </button>
            <button
              onClick={() => onNavigate('action-board')}
              className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Action Board
            </button>
            <button
              onClick={() => onNavigate('integrations')}
              className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Integrations
            </button>
          </nav>

          <div className="flex items-center gap-space-md">
            <button
              onClick={() => onNavigate('auth')}
              className="text-body-md text-on-surface-variant hover:text-on-surface px-space-md py-space-sm transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-primary text-on-primary px-space-lg py-2 rounded-xl text-body-md font-semibold hover:bg-primary-fixed-dim transition-colors shadow-sm"
            >
              Workspace
            </button>
            <div
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 bg-surface">
        <div className="flex flex-col w-full text-on-surface">
          {/* Hero Section */}
          <section className="relative pt-8 sm:pt-12 pb-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-space-xl items-center">
            <div className="flex flex-col gap-space-lg lg:col-span-7">
              <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container border border-outline-variant/35 w-max">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-label-md text-on-surface-variant font-code">
                  v4.2 Enterprise Release Live
                </span>
              </div>

              <h1 className="font-headline-lg text-4xl lg:text-5xl font-bold tracking-tight text-on-surface leading-[1.1]">
                The autonomous knowledge layer for your entire enterprise.
              </h1>

              <p className="font-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Connect fragmented internal data, documentation, and real-time workflows into a single
                reasoning architecture across Gmail, Google Drive, Notion, Box, and Slack.
              </p>

              <div className="flex flex-col sm:flex-row gap-space-md max-w-md mt-space-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="bg-surface-container-low border border-outline-variant/40 px-space-lg py-space-md rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors flex-1 text-body-md"
                />
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="bg-primary text-on-primary px-space-xl py-space-md rounded-xl text-body-md font-semibold hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-space-sm whitespace-nowrap shadow-md"
                >
                  <span>Start Free Trial</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="flex items-center gap-space-lg mt-space-md text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">
                    check_circle
                  </span>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">
                    check_circle
                  </span>
                  <span>SOC2 Type II Certified</span>
                </div>
              </div>
            </div>

            {/* Hero System Box */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-space-lg flex flex-col gap-space-lg shadow-2xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-3 h-3 rounded-full bg-error/80"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                  </div>
                  <span className="text-code text-label-sm text-on-surface-variant font-mono">
                    omnimind-core-v2.1.sys
                  </span>
                </div>

                <div className="space-y-space-md">
                  <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/20">
                    <div className="flex items-center justify-between text-body-sm mb-space-xs font-mono">
                      <span className="text-on-surface-variant">Query Vector Index</span>
                      <span className="text-emerald-400 font-bold">14ms latency</span>
                    </div>
                    <p className="text-body-sm text-primary font-mono bg-surface/80 p-space-sm rounded-lg border border-[#27272A]">
                      GET /api/v2/knowledge/stream?sync=true
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-space-md">
                    <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/20">
                      <span className="text-label-sm text-on-surface-variant block mb-1 font-mono">
                        Active Nodes
                      </span>
                      <span className="text-headline-md font-bold text-on-surface">1,248,590</span>
                    </div>
                    <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/20">
                      <span className="text-label-sm text-on-surface-variant block mb-1 font-mono">
                        Sync Accuracy
                      </span>
                      <span className="text-headline-md font-bold text-emerald-400">99.98%</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between border border-[#27272A]">
                    <div className="flex items-center gap-space-md">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <div>
                        <h4 className="text-body-md font-medium text-on-surface">
                          Autonomous Cluster #4
                        </h4>
                        <p className="text-body-sm text-on-surface-variant">Real-time reasoning active</p>
                      </div>
                    </div>
                    <span className="px-space-sm py-space-xs rounded bg-surface-container-highest text-label-sm font-mono text-primary">
                      Stable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="border-y border-outline-variant/20 bg-surface-container-lowest py-space-xl px-gutter">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-space-xl text-center">
              <div className="flex flex-col gap-space-xs">
                <span className="text-headline-lg font-bold text-on-surface">99.99%</span>
                <span className="text-body-md text-on-surface-variant">Uptime SLA Guaranteed</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="text-headline-lg font-bold text-on-surface">&lt; 15ms</span>
                <span className="text-body-md text-on-surface-variant">Average Vector Lookup</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="text-headline-lg font-bold text-on-surface">10B+</span>
                <span className="text-body-md text-on-surface-variant">Tokens Processed Daily</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="text-headline-lg font-bold text-on-surface">500+</span>
                <span className="text-body-md text-on-surface-variant">Enterprise Deployments</span>
              </div>
            </div>
          </section>

          {/* Architecture Bento Section */}
          <section className="py-margin px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-space-sm mb-space-xl">
              <span className="text-label-md font-mono text-primary uppercase tracking-wider">
                Architecture
              </span>
              <h2 className="font-headline-lg text-3xl md:text-4xl font-bold">
                Engineered for absolute scale
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-2xl">
                Everything you need to orchestrate complex knowledge graphs and reasoning engines
                across disparate tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-space-lg flex flex-col justify-between gap-space-xl group hover:border-outline-variant/60 transition-colors">
                <div className="flex flex-col gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">hub</span>
                  </div>
                  <h3 className="font-headline-md text-xl text-on-surface font-semibold">
                    Zero-Latency Sync
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Connect internal databases, repositories, and documentation channels without custom
                    pipeline engineering.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-xl font-mono text-body-sm text-on-surface-variant border border-outline-variant/20">
                  $ omnimind sync --auto-resolve
                </div>
              </div>

              <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-space-lg flex flex-col justify-between gap-space-xl group hover:border-outline-variant/60 transition-colors">
                <div className="flex flex-col gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">shield_lock</span>
                  </div>
                  <h3 className="font-headline-md text-xl text-on-surface font-semibold">
                    Enterprise Security
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Role-based access controls, end-to-end encryption at rest and in transit, and complete
                    audit logging.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-xl font-mono text-body-sm text-primary border border-outline-variant/20 flex items-center justify-between">
                  <span>SOC2 &amp; HIPAA Compliant</span>
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">
                    verified
                  </span>
                </div>
              </div>

              <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-space-lg flex flex-col justify-between gap-space-xl group hover:border-outline-variant/60 transition-colors">
                <div className="flex flex-col gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">neurology</span>
                  </div>
                  <h3 className="font-headline-md text-xl text-on-surface font-semibold">
                    Autonomous Reasoning
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Self-healing vector indexes that automatically adapt to structural code changes and
                    documentation edits.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-md rounded-xl font-mono text-body-sm text-on-surface-variant border border-outline-variant/20">
                  Index health: 100% optimized
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner Section */}
          <section className="py-margin px-gutter max-w-7xl mx-auto w-full mb-margin">
            <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-space-xl md:p-16 flex flex-col items-center text-center gap-space-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none"></div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface max-w-xl font-bold">
                Ready to transform your enterprise knowledge?
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-lg">
                Join forward-thinking engineering teams building the next generation of autonomous
                workplace intelligence.
              </p>
              <div className="flex items-center gap-space-md mt-space-sm flex-wrap justify-center">
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="bg-primary text-on-primary px-space-xl py-space-md rounded-xl text-body-md font-semibold hover:bg-primary-fixed-dim transition-colors shadow-lg"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-surface-container border border-outline-variant/40 text-on-surface px-space-xl py-space-md rounded-xl text-body-md font-medium hover:bg-surface-container-highest transition-colors"
                >
                  Enter Workspace
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-margin border-t border-[#27272A]/40">
        <div className="max-w-7xl mx-auto px-gutter flex flex-col sm:flex-row items-center justify-between text-on-surface-variant text-body-sm gap-2">
          <div>© 2026 OmniMind Inc. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs font-mono">
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
