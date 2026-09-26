import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  Search,
  Terminal,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckSquare,
  FileText,
  HardDrive,
  Hash,
  Mail,
  Box as BoxIcon,
  Share2,
  Zap,
  Activity,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenSearchWithQuery: (query: string) => void;
  onOpenCommandPalette: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenSearchWithQuery,
  onOpenCommandPalette,
}) => {
  const [searchInput, setSearchInput] = useState('');

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!searchInput.trim()) {
      onOpenCommandPalette();
      return;
    }
    onOpenSearchWithQuery(searchInput.trim());
  }

  const quickFilters = [
    { label: 'Q3 Infrastructure', query: 'q3 roadmap infrastructure migration' },
    { label: 'Globex SLA Waiver', query: 'Summarize Globex Corp SLA requirements' },
    { label: 'Redis Connection Leak', query: 'Investigation: Redis connection pool leak' },
    { label: 'Action Items', query: 'List all action items assigned to me today' },
  ];

  return (
    <div className="flex flex-col w-full pb-12 text-zinc-100">
      {/* Hero / Command Center Header */}
      <section className="px-4 sm:px-6 md:px-8 pt-8 pb-6 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Swytchcode Multi-App Agent Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-zinc-300 mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Swytchcode Track 2 Agent Active • 5 Ingestion APIs Synced</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight text-center">
          Autonomous Enterprise Knowledge Worker
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm text-center mt-2 max-w-xl">
          Unified semantic reasoning across Slack, Google Drive, Notion, Box, and Gmail with strict citation verification and zero hallucinations.
        </p>

        {/* Global Command Center Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full mt-6">
          <div className="flex items-center bg-[#18181B] rounded-xl px-4 py-3 border border-[#27272A] hover:border-zinc-700 transition shadow-lg">
            <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search across Slack, Drive, Notion, Box, and Gmail..."
              className="w-full bg-transparent text-white placeholder-zinc-500 text-sm outline-none font-sans"
            />
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1 ml-2 font-mono text-xs text-zinc-400 bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded border border-[#27272A] transition shrink-0"
              title="Open OmniMind Modal (⌘K)"
            >
              <span>⌘K</span>
            </button>
          </div>
        </form>

        {/* Preset Query Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          {quickFilters.map((q) => (
            <button
              key={q.label}
              onClick={() => onOpenSearchWithQuery(q.query)}
              className="px-3 py-1.5 rounded-lg text-xs bg-[#18181B] border border-[#27272A] hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 transition"
            >
              {q.label}
            </button>
          ))}
        </div>
      </section>

      {/* Quick Access Hub: Knowledge Graph & Action Board */}
      <section className="px-4 sm:px-6 md:px-8 mt-2 mb-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white tracking-tight">Quick Access</h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">Direct Workspace Navigation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Knowledge Graph */}
          <div
            onClick={() => onNavigate('graph')}
            className="group relative overflow-hidden bg-[#18181B] hover:bg-[#1C1C20] hover-card-motion border border-[#27272A] hover:border-blue-500/50 rounded-xl p-5 cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40 font-medium">
                    18 Active Nodes
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Live SVG Lattice
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  <span>Interactive Knowledge Graph</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Explore multi-tool neural clusters connecting Slack conversations, Google Drive specs, Notion pages, and Box audits in real-time.
                </p>
              </div>

              {/* Node highlights */}
              <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center gap-2 flex-wrap text-[11px] font-mono text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] text-zinc-300">
                  #q3-migration
                </span>
                <span className="px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] text-zinc-300">
                  #soc2-compliance
                </span>
                <span className="px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] text-zinc-300">
                  #infrastructure
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
              <span className="text-xs text-zinc-500">Cross-app relationship mapping</span>
              <span className="text-xs font-medium text-blue-400 group-hover:underline flex items-center gap-1">
                <span>Open Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Action Board */}
          <div
            onClick={() => onNavigate('action-board')}
            className="group relative overflow-hidden bg-[#18181B] hover:bg-[#1C1C20] hover-card-motion border border-[#27272A] hover:border-emerald-500/50 rounded-xl p-5 cursor-pointer shadow-lg flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 font-medium">
                    3 High Priority
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Kanban Active
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <span>Cross-Platform Action Board</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Track and manage high-priority tasks extracted automatically by OmniMind across Gmail threads, Slack channels, and Drive documentation.
                </p>
              </div>

              {/* Column stats highlight */}
              <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                  <span className="text-zinc-400">To Do:</span>
                  <span className="text-white font-medium">5</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-zinc-400">In Progress:</span>
                  <span className="text-white font-medium">3</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-zinc-400">Done:</span>
                  <span className="text-white font-medium">12</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between">
              <span className="text-xs text-zinc-500">Auto-extracted from 5 tools</span>
              <span className="text-xs font-medium text-emerald-400 group-hover:underline flex items-center gap-1">
                <span>Open Board</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Linear-Style Enterprise Grid */}
      <section className="px-4 sm:px-6 md:px-8 mt-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Column 1: Active Swytchcode Reasoning Threads */}
          <div className="flex flex-col bg-[#18181B] rounded-xl p-5 border border-[#27272A]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Active Reasoning</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-800/80 border border-[#27272A]">
                3 running
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {/* Thread 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('q3 roadmap infrastructure migration')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-zinc-500">[Source: Swytchcode/Slack #eng-core]</span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Synthesized
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition">
                  Q3 Infrastructure Migration &amp; Redis Pooling
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  Correlated Slack thread with Notion post-mortem #409. Zero latency regressions found in staging.
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Updated 2m ago</span>
                  <span className="text-zinc-300">96% score</span>
                </div>
              </div>

              {/* Thread 2 */}
              <div
                onClick={() => onOpenSearchWithQuery('Summarize Globex Corp SLA requirements')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-zinc-500">[Source: Swytchcode/Gmail Thread]</span>
                  <span className="text-[11px] text-amber-400 font-mono">Urgent</span>
                </div>
                <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition">
                  Globex Corp 99.99% SLA Rate Limit Waiver
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  Sarah Jenkins forwarded customer request for burst throughput before migration window.
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Updated 14m ago</span>
                  <span className="text-zinc-300">Requires sign-off</span>
                </div>
              </div>

              {/* Thread 3 */}
              <div
                onClick={() => onOpenSearchWithQuery('Board Meeting Deck ARR projections')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-zinc-500">[Source: Swytchcode/Google Drive]</span>
                  <span className="text-[11px] text-blue-400 font-mono">Completed</span>
                </div>
                <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition">
                  Board Deck ARR Modeling &amp; Churn Metrics
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  Marcus Vance adjusted churn rate down on Slide 14 based on newest cohort analysis.
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>1h ago</span>
                  <span className="text-zinc-300">Ready</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('logs')}
              className="mt-4 w-full py-2 rounded-lg bg-[#101014] hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition flex items-center justify-center gap-1.5 border border-[#27272A]"
            >
              <span>View Execution Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 2: Pinned Multi-Tool Knowledge */}
          <div className="flex flex-col bg-[#18181B] rounded-xl p-5 border border-[#27272A]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-white">Vault Index</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-800/80 border border-[#27272A]">
                6 documents
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {/* Doc 1 */}
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-[#27272A]">
                  <HardDrive className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">Google Drive</span>
                    <span className="text-[10px] font-mono text-emerald-400">Indexed</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200 truncate mt-0.5 group-hover:text-white">
                    Q3_Global_Strategy_Roadmap_v4.docx
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    Shared by Sarah Chen • 45 pages
                  </p>
                </div>
              </div>

              {/* Doc 2 */}
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-[#27272A]">
                  <BoxIcon className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">Box Vault</span>
                    <span className="text-[10px] font-mono text-emerald-400">SOC2 Verified</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200 truncate mt-0.5 group-hover:text-white">
                    Enterprise_Architecture_Security_Review.xlsx
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    12 compliance verification sheets
                  </p>
                </div>
              </div>

              {/* Doc 3 */}
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] border border-[#27272A] transition cursor-pointer flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 border border-[#27272A]">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">Notion Wiki</span>
                    <span className="text-[10px] font-mono text-emerald-400">Master Spec</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-200 truncate mt-0.5 group-hover:text-white">
                    Acme Core Architecture Spec (SYS-001)
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                    Service mesh topologies &amp; mTLS parameters
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('vault')}
              className="mt-4 w-full py-2 rounded-lg bg-[#101014] hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition flex items-center justify-center gap-1.5 border border-[#27272A]"
            >
              <span>Explore File Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column 3: Cross-Tool Action Commitments */}
          <div className="flex flex-col bg-[#18181B] rounded-xl p-5 border border-[#27272A]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-white">Extracted Commitments</h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-800/80 border border-[#27272A]">
                3 urgent
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {/* Task 1 */}
              <div className="p-3.5 rounded-lg bg-[#101014] border border-[#27272A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-800/50">
                    High Priority
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">From Gmail</span>
                </div>
                <p className="text-xs font-medium text-zinc-200">
                  Update Q3 Security Compliance Docs &amp; attach to master workspace
                </p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Assignee: Sarah Jenkins • Due today
                </div>
              </div>

              {/* Task 2 */}
              <div className="p-3.5 rounded-lg bg-[#101014] border border-[#27272A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-800/50">
                    High Priority
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">From Slack #eng-core</span>
                </div>
                <p className="text-xs font-medium text-zinc-200">
                  Verify staging DB connection pooling hotfix prior to rollout
                </p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Assignee: Alex Rivera • Due 17:00
                </div>
              </div>

              {/* Task 3 */}
              <div className="p-3.5 rounded-lg bg-[#101014] border border-[#27272A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-1.5 py-0.5 rounded border border-blue-800/50">
                    Medium
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">From Notion</span>
                </div>
                <p className="text-xs font-medium text-zinc-200">
                  Review Incident #409 post-mortem action items
                </p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Assignee: Engineering Guild • Tomorrow
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('action-board')}
              className="mt-4 w-full py-2 rounded-lg bg-[#101014] hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition flex items-center justify-center gap-1.5 border border-[#27272A]"
            >
              <span>Open Action Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Swytchcode Fast Launch Banner */}
      <section className="px-4 sm:px-6 md:px-8 mt-6 max-w-7xl mx-auto w-full">
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white">
                Swytchcode Autonomous Agent CLI Installed
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Run <code className="text-zinc-200 font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-[11px]">swy exec omnimind --pipeline=auto</code> in your local terminal to invoke the agent from the CLI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('integrations')}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition flex items-center gap-1"
            >
              <span>CLI Terminal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-xs font-medium text-zinc-950 transition flex items-center gap-1"
            >
              <span>Knowledge Graph</span>
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
