import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  FileText,
  Share2,
  Sparkles,
  CheckCircle2,
  CheckSquare,
  Bot,
  Send,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
  Cpu,
  Clock,
  ArrowRight,
  Lock,
  MessageSquare,
} from 'lucide-react';

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
      setToastMessage('Document intelligence re-synthesized with newest vector embeddings!');
      setTimeout(() => setToastMessage(null), 3000);
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
    <div className="flex flex-col w-full h-full min-h-full bg-[#09090B] text-zinc-100 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] border border-emerald-500/50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar / Workspace Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#101014] border-b border-[#27272A] flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18181B] text-zinc-200 text-xs font-mono border border-[#27272A]">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Q3_Enterprise_Architecture_Spec.md</span>
          </div>
          <span className="text-zinc-500 text-xs font-mono">
            Synced from Swytchcode/Notion • 2h ago
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Tab Switcher */}
          <div className="lg:hidden flex items-center bg-[#18181B] rounded-lg p-0.5 border border-[#27272A]">
            <button
              onClick={() => setActiveMobileTab('doc')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activeMobileTab === 'doc'
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Document
            </button>
            <button
              onClick={() => setActiveMobileTab('summary')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activeMobileTab === 'summary'
                  ? 'bg-white text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              AI Insights
            </button>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setToastMessage('Document link copied to clipboard');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition border border-[#27272A]"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Share</span>
          </button>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-medium hover:bg-zinc-200 transition disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
            <span>{regenerating ? 'Synthesizing...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDE: Document Viewer Area */}
        <div className={`${activeMobileTab === 'doc' ? 'flex' : 'hidden lg:flex'} flex-1 flex-col border-r border-[#27272A] overflow-y-auto bg-[#09090B]`}>
          <div className="max-w-3xl mx-auto p-6 sm:p-8 w-full flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                RFC-2026-Q3-SPEC
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Q3 Enterprise Architecture &amp; Scalability Spec
              </h1>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-2">
                <span>Author: Sarah Jenkins</span>
                <span>•</span>
                <span>Security Level: CMEK Encrypted</span>
                <span>•</span>
                <span>Status: In Review</span>
              </div>
            </div>

            {/* Architecture Schematic Diagram */}
            <div className="w-full rounded-xl bg-[#101014] border border-[#27272A] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272A] text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Service Mesh Topology Schematic
                </span>
                <span className="text-[11px] text-emerald-400">SOC2 Type II Compliant</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase">Ingress Layer</div>
                  <div className="text-zinc-200 font-bold">Cloudflare Edge</div>
                  <div className="text-[11px] text-zinc-400">DDoS Shield &amp; TLS 1.3</div>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase">Service Mesh</div>
                  <div className="text-zinc-200 font-bold">Envoy / mTLS RPC</div>
                  <div className="text-[11px] text-zinc-400">Zero-Trust Internal Bus</div>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase">Persistent Store</div>
                  <div className="text-zinc-200 font-bold">Distributed NVMe</div>
                  <div className="text-[11px] text-zinc-400">Multi-Region Snapshotting</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
              <h2 className="text-lg font-semibold text-white pt-2">
                1. Executive Architecture Overview
              </h2>
              <p>
                As Acme Corp continues its rapid scaling trajectory across multi-cloud deployments, our core architectural paradigm must shift from monolithic federations to a highly resilient event-driven mesh. This document outlines the roadmap for Q3 infrastructure stabilization, latency reduction targets, and security compliance enhancements.
              </p>
              <p>
                Key bottlenecks identified in Q2—specifically regarding database connection pooling and cross-region replication lag—will be directly addressed via the implementation of our new edge-caching layer and asynchronous worker pools.
              </p>

              <h2 className="text-lg font-semibold text-white pt-2">
                2. Core SLA Targets &amp; High Availability
              </h2>
              <p>
                Our primary objective is achieving a guaranteed 99.999% uptime SLA across all tier-1 services. To accomplish this, the infrastructure team has authorized three core initiatives:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                <li>Migration of persistent state stores to distributed NVMe clusters with automated snapshotting.</li>
                <li>Zero-trust service mesh integration utilizing mutual TLS (mTLS) for all internal RPC communications.</li>
                <li>Automated failover testing via continuous chaos engineering pipelines running in staging environments.</li>
              </ul>

              <h2 className="text-lg font-semibold text-white pt-2">
                3. Security &amp; Compliance Mandates
              </h2>
              <p>
                With upcoming SOC2 Type II audits and expanding global data residency regulations, all data-at-rest must utilize customer-managed encryption keys (CMEK). Furthermore, automated vulnerability scanning will be injected into every pull request stage to catch dependency regressions before merging into main branches.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Structured Summary Panel */}
        <div className={`${activeMobileTab === 'summary' ? 'flex' : 'hidden lg:flex'} w-full lg:w-[420px] shrink-0 flex-col bg-[#101014] overflow-y-auto border-l border-[#27272A]`}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">AI Intelligence Panel</h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-[#27272A]">
              Track 2 Verified
            </span>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-5">
            {/* Metadata Box */}
            <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Document Type</span>
                <span className="text-zinc-200">Architecture Spec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Sentiment / Tone</span>
                <span className="text-zinc-200">Authoritative / Technical</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Entities Extracted</span>
                <span className="text-emerald-400 font-semibold">14 Services, 6 Protocols</span>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                Autonomous Key Takeaways
              </span>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Transitioning to an event-driven mesh in Q3 with edge caching layers.</span>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Targeting 99.999% uptime SLA via distributed NVMe and automatic failover.</span>
                </div>
                <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Mandatory Customer-Managed Encryption Keys (CMEK) and mTLS.</span>
                </div>
              </div>
            </div>

            {/* Extracted Tasks */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                Extracted Commitments
              </span>
              <div className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40">
                    High Priority
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">Due July 15</span>
                </div>
                <p className="text-zinc-200 font-medium">
                  Assign automated chaos engineering lead for staging failure injection pipeline.
                </p>
              </div>
            </div>

            {/* Document Interactive Q&A */}
            <div className="space-y-2 pt-2 border-t border-[#27272A]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                Ask Document AI
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {chatReplies.map((chat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1 text-xs">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-blue-400" />
                      <span>{chat.q}</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed pl-4">{chat.a}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAskQuestion} className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={docQuestion}
                  onChange={(e) => setDocQuestion(e.target.value)}
                  placeholder="Ask a question about this spec..."
                  className="flex-1 bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-white text-zinc-950 rounded-lg hover:bg-zinc-200 transition"
                  title="Ask"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
