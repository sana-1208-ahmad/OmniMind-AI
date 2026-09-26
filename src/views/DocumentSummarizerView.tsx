import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface DocumentSummarizerViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const DocumentSummarizerView: React.FC<DocumentSummarizerViewProps> = () => {
  const [activeMobileTab, setActiveMobileTab] = useState<'doc' | 'summary'>('doc');
  const [regenerating, setRegenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [docQuestion, setDocQuestion] = useState('');
  const [chatReplies, setChatReplies] = useState<Array<{ q: string; a: string }>>([
    {
      q: 'What are the core SLA targets in this spec?',
      a: 'The document targets a guaranteed 99.999% uptime SLA across all tier-1 services via distributed NVMe state stores, mTLS service mesh, and continuous chaos engineering.',
    },
  ]);

  function handleRegenerate() {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
    }, 1200);
  }

  function handleAskQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!docQuestion.trim()) return;
    const q = docQuestion.trim();
    setDocQuestion('');

    let a = 'OmniMind analyzed Q3_Enterprise_Architecture_Spec.md: ';
    if (q.toLowerCase().includes('sla') || q.toLowerCase().includes('uptime')) {
      a += 'The specification targets 99.999% uptime across all tier-1 services with automated edge failover.';
    } else if (q.toLowerCase().includes('security') || q.toLowerCase().includes('cmek')) {
      a += 'All data-at-rest must utilize Customer-Managed Encryption Keys (CMEK) and mutual TLS (mTLS) for RPC communications to satisfy SOC2 Type II requirements.';
    } else if (q.toLowerCase().includes('lead') || q.toLowerCase().includes('chaos')) {
      a += 'An automated chaos engineering lead must be assigned before July 15 to inject staging failure pipelines.';
    } else {
      a += `Regarding "${q}", the architecture blueprint establishes distributed NVMe caching and zero-trust service mesh integrations across multi-region VPCs.`;
    }

    setChatReplies((prev) => [...prev, { q, a }]);
  }

  return (
    <div className="flex flex-col w-full h-full min-h-full bg-surface text-on-surface relative">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] border border-emerald-500/40 text-primary px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar / Workspace Header */}
      <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b border-[#27272A] flex-wrap gap-2">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-lg bg-surface-container-high text-on-surface text-xs font-mono border border-[#27272A]">
            <span className="material-symbols-outlined text-[16px] text-primary">description</span>
            <span>Q3_Enterprise_Architecture_Spec.md</span>
          </div>
          <span className="text-on-surface-variant text-xs font-mono">
            Last edited 2 hours ago by System AI
          </span>
        </div>

        <div className="flex items-center gap-space-sm">
          {/* Mobile Tab Switcher */}
          <div className="lg:hidden flex items-center bg-surface-container rounded-lg p-0.5 border border-[#27272A]">
            <button
              onClick={() => setActiveMobileTab('doc')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activeMobileTab === 'doc'
                  ? 'bg-surface-container-high text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Document
            </button>
            <button
              onClick={() => setActiveMobileTab('summary')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activeMobileTab === 'summary'
                  ? 'bg-primary text-black font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              AI Insights
            </button>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setToastMessage('Document share link copied to clipboard!');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="hidden sm:flex items-center gap-space-xs px-space-md py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-medium transition-all border border-[#27272A]"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Share</span>
          </button>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center gap-space-xs px-3 py-1.5 rounded-xl bg-primary text-[#131315] text-xs font-bold transition-all hover:bg-primary-fixed-dim shadow-sm disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                regenerating ? 'animate-spin' : ''
              }`}
            >
              auto_awesome
            </span>
            <span>{regenerating ? 'Synthesizing...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDE: Document Viewer Area */}
        <div className={`${activeMobileTab === 'doc' ? 'flex' : 'hidden lg:flex'} flex-1 flex-col border-r border-[#27272A] overflow-y-auto bg-surface`}>
          {/* Toolbar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-space-lg py-space-sm bg-surface/90 backdrop-blur-md border-b border-[#27272A]">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Heading 1"
              >
                <span className="material-symbols-outlined text-[18px]">format_h1</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Heading 2"
              >
                <span className="material-symbols-outlined text-[18px]">format_h2</span>
              </button>
              <div className="w-[1px] h-4 bg-surface-container-high mx-space-xs"></div>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Bold"
              >
                <span className="material-symbols-outlined text-[18px]">format_bold</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Italic"
              >
                <span className="material-symbols-outlined text-[18px]">format_italic</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Underline"
              >
                <span className="material-symbols-outlined text-[18px]">format_underlined</span>
              </button>
              <div className="w-[1px] h-4 bg-surface-container-high mx-space-xs"></div>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Bullet List"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Numbered List"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
              </button>
              <button
                className="p-1 rounded hover:bg-surface-container-high hover:text-on-surface transition-all"
                title="Quote"
              >
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
              </button>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-mono text-xs">
              <span>Words: 2,410</span>
              <span>•</span>
              <span>Read time: 9 min</span>
            </div>
          </div>

          {/* Document Content */}
          <div className="max-w-3xl mx-auto px-space-xl py-space-xl flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <div className="text-xs text-on-surface-variant font-mono tracking-wider uppercase">
                Technical Specification // Doc ID: 8849-B
              </div>
              <h1 className="text-headline-lg text-primary text-3xl font-bold">
                Q3 Enterprise Architecture &amp; Scalability Blueprint
              </h1>
              <div className="text-body-sm text-on-surface-variant">
                Author: Lead Infrastructure Guild • Status: Under Review
              </div>
            </div>

            {/* Architecture Graphic */}
            <div className="w-full h-52 rounded-2xl bg-surface-container border border-[#27272A] overflow-hidden relative group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1i_wRcFJMYnWohABzwXK6H8AyuGl3_6vHsE7OWj43IPtt72C_Jv5zSqi311na05QuGyVyxWM418MGA_W9HWatisfRjEQhIIVtpanZyCc5_Udl0EjuDKZOCOGCBH-uKqf9glGlU9vMguEfj4DHE-MwynoEUuBcxKQo4Gsl-RFanoeJv2pGE8rUdcTysUoeh01qNz0HjzjiYIDkzZvd-epQ-JgC9MGLdUzSH5YS2DUK_8rXquN92lSWbg"
                alt="Q3 Enterprise Architecture & Scalability Diagram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback container
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-xs font-mono text-on-surface-variant">
                Figure 1: Microservices Mesh &amp; Event Bus Topology
              </div>
            </div>

            <div className="flex flex-col gap-space-md text-body-md text-on-surface leading-relaxed">
              <h2 className="text-headline-md text-primary font-semibold mt-space-md text-xl">
                1. Executive Overview
              </h2>
              <p>
                As Acme Corp continues its rapid scaling trajectory across multi-cloud deployments,
                our core architectural paradigm must shift from monolithic federations to a highly
                resilient event-driven mesh. This document outlines the roadmap for Q3 infrastructure
                stabilization, latency reduction targets, and security compliance enhancements.
              </p>
              <p>
                Key bottlenecks identified in Q2—specifically regarding database connection pooling
                and cross-region replication lag—will be directly addressed via the implementation of
                our new edge-caching layer and asynchronous worker pools.
              </p>

              <h2 className="text-headline-md text-primary font-semibold mt-space-md text-xl">
                2. Core Infrastructure Objectives
              </h2>
              <p>
                Our primary objective is achieving a guaranteed 99.999% uptime SLA across all tier-1
                services. To accomplish this, the infrastructure team has authorized three core
                initiatives:
              </p>
              <ul className="list-disc pl-space-lg flex flex-col gap-space-xs text-on-surface-variant">
                <li>
                  Migration of persistent state stores to distributed NVMe clusters with automated
                  snapshotting.
                </li>
                <li>
                  Zero-trust service mesh integration utilizing mutual TLS (mTLS) for all internal RPC
                  communications.
                </li>
                <li>
                  Automated failover testing via continuous chaos engineering pipelines running in
                  staging environments.
                </li>
              </ul>

              <h2 className="text-headline-md text-primary font-semibold mt-space-md text-xl">
                3. Security &amp; Compliance Mandates
              </h2>
              <p>
                With upcoming SOC2 Type II audits and expanding global data residency regulations, all
                data-at-rest must utilize customer-managed encryption keys (CMEK). Furthermore,
                automated vulnerability scanning will be injected into every pull request stage to catch
                dependency regressions before merging into main branches.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Structured Summary Panel */}
        <div className={`${activeMobileTab === 'summary' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[420px] shrink-0 flex-col bg-surface-container-low overflow-y-auto border-l border-[#27272A]`}>
          {/* Panel Header */}
          <div className="flex items-center justify-between px-space-lg py-space-md border-b border-[#27272A]">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <h3 className="text-headline-sm text-primary font-bold">AI Intelligence Panel</h3>
            </div>
            <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-mono text-xs">
              v2.4 model
            </span>
          </div>

          {/* Panel Body */}
          <div className="flex flex-col p-space-lg gap-space-xl">
            {/* Metadata Block */}
            <div className="flex flex-col p-space-md rounded-2xl bg-surface border border-[#27272A] gap-space-sm">
              <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                <span>Document Type</span>
                <span className="text-primary">Architecture Spec</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                <span>Sentiment / Tone</span>
                <span className="text-primary">Authoritative / Technical</span>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                <span>Estimated Complexity</span>
                <span className="text-primary">Advanced (Tier 3)</span>
              </div>
              <div className="w-full h-[1px] bg-[#27272A] my-1"></div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
                <span>Entities Extracted</span>
                <span className="text-primary font-semibold">14 Services, 6 Protocols</span>
              </div>
            </div>

            {/* Key Takeaways Section */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-on-surface-variant font-mono">
                  Key Takeaways
                </h4>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                  format_list_bulleted
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface border border-[#27272A] hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px] mt-0.5">
                    check_circle
                  </span>
                  <p className="text-body-sm text-on-surface">
                    Transitioning from monolithic architecture to an event-driven mesh in Q3.
                  </p>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface border border-[#27272A] hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px] mt-0.5">
                    check_circle
                  </span>
                  <p className="text-body-sm text-on-surface">
                    Targeting 99.999% uptime SLA via distributed NVMe and edge caching layers.
                  </p>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface border border-[#27272A] hover:bg-surface-container-high transition-all">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px] mt-0.5">
                    check_circle
                  </span>
                  <p className="text-body-sm text-on-surface">
                    Strict enforcement of customer-managed encryption keys (CMEK) and mTLS.
                  </p>
                </div>
              </div>
            </div>

            {/* Actionable Insights Section */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider text-on-surface-variant font-mono">
                  Actionable Insights
                </h4>
                <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                  task_alt
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="flex flex-col p-space-md rounded-2xl bg-surface border border-[#27272A] gap-space-xs hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-label-md font-bold text-primary">
                      Assign Chaos Engineering Lead
                    </span>
                    <span className="px-space-xs py-0.5 rounded bg-error-container text-error text-[10px] font-mono font-bold">
                      High Priority
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Establish automated failure injection pipelines in staging before July 15.
                  </p>
                </div>

                <div className="flex flex-col p-space-md rounded-2xl bg-surface border border-[#27272A] gap-space-xs hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-label-md font-bold text-primary">
                      Review CMEK Compliance
                    </span>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-mono">
                      Security
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">
                    Audit current key rotation policies with the infosec team prior to SOC2 review.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat History */}
            {chatReplies.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-surface border border-[#27272A] text-xs space-y-1.5 animate-in fade-in duration-150"
              >
                <div className="font-semibold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">question_answer</span>
                  <span>"{item.q}"</span>
                </div>
                <div className="text-on-surface-variant leading-relaxed">{item.a}</div>
              </div>
            ))}

            {/* Ask OmniMind Box */}
            <form
              onSubmit={handleAskQuestion}
              className="flex flex-col p-space-md rounded-2xl bg-surface border border-[#27272A] gap-space-sm mt-auto"
            >
              <div className="flex items-center gap-space-xs text-xs font-bold text-primary font-mono">
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Ask OmniMind about this doc</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <input
                  type="text"
                  value={docQuestion}
                  onChange={(e) => setDocQuestion(e.target.value)}
                  placeholder="e.g. What are the core SLA targets?"
                  className="flex-1 bg-surface-container-low border border-[#27272A] rounded-xl px-space-sm py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary transition-all text-xs"
                />
                <button
                  type="submit"
                  disabled={!docQuestion.trim()}
                  className="p-2 rounded-xl bg-primary text-[#131315] hover:bg-primary-fixed-dim transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
