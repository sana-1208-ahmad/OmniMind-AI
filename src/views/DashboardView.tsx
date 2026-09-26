import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

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
  const [activeFilter, setActiveFilter] = useState<'all' | 'docs' | 'slack' | 'jira'>('all');

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!searchInput.trim()) {
      onOpenCommandPalette();
      return;
    }
    onOpenSearchWithQuery(searchInput.trim());
  }

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Hero / Command Center Header & Search */}
      <section className="relative px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Ambient glow behind command bar */}
        <div className="absolute w-[600px] h-[250px] bg-gradient-to-tr from-primary/10 via-surface-container-high/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-label-md border border-[#27272A]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs">All systems operational • 5 integrations active</span>
          </div>

          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
            What would you like to explore today?
          </h1>

          {/* Command Palette Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full mt-2 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-outline-variant/30 to-primary/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center bg-surface-container-low rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 shadow-2xl border border-[#27272A]">
              <span className="material-symbols-outlined text-outline text-[22px] sm:text-[24px] mr-3">
                search
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search across Slack, Drive, Notion, Box, and Gmail..."
                className="w-full bg-transparent text-primary placeholder-outline text-sm sm:text-base outline-none font-body-md"
              />
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1 ml-2 cursor-pointer hover:opacity-80 shrink-0"
                title="Open OmniMind Autonomous Modal (⌘K)"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono text-[11px] border border-outline-variant/30">
                  ⌘K
                </kbd>
              </button>
            </div>
          </form>

          {/* Quick action chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <button
              onClick={() => {
                setActiveFilter('all');
                onOpenSearchWithQuery('q3 roadmap infrastructure migration');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-[#27272A] ${
                activeFilter === 'all'
                  ? 'bg-surface-container-high text-primary font-medium'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Recent Threads</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('docs');
                onNavigate('vault');
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-[#27272A]"
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>Pinned Docs</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('slack');
                onOpenSearchWithQuery('#engineering');
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-[#27272A]"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Slack Mentions</span>
            </button>

            <button
              onClick={() => {
                setActiveFilter('jira');
                onNavigate('action-board');
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-[#27272A]"
            >
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Action Board</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3-Column Modular Enterprise Grid */}
      <section className="px-4 sm:px-6 md:px-8 mt-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Column 1: Active Reasoning Threads */}
          <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg border border-[#27272A] hover:border-outline-variant/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                <h2 className="font-headline-sm font-semibold text-primary">Active Reasoning</h2>
              </div>
              <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-mono">
                3 running
              </span>
            </div>

            <div className="flex flex-col gap-space-md flex-1">
              {/* Thread Item 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('q3 roadmap infrastructure migration')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="text-label-sm text-on-surface-variant font-mono">THREAD #8492</span>
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Synthesizing
                  </span>
                </div>
                <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors">
                  Q3 Infrastructure Cost Optimization &amp; Multi-region Failover Strategy
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  Cross-referencing AWS bill anomalies with Notion architectural RFCs and Slack
                  engineering channel consensus.
                </p>
                <div className="mt-space-sm flex items-center justify-between pt-space-sm border-t border-[#27272A]/50">
                  <div className="flex items-center gap-1 text-xs text-outline">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>Updated 2m ago</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">94% confidence</span>
                </div>
              </div>

              {/* Thread Item 2 */}
              <div
                onClick={() => onOpenSearchWithQuery('Enterprise SSO Integration Audit')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="text-label-sm text-on-surface-variant font-mono">THREAD #8488</span>
                  <span className="text-xs text-amber-400 font-mono">Waiting for input</span>
                </div>
                <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors">
                  Enterprise SSO Integration Audit &amp; SOC2 Compliance Mapping
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  Reviewing security questionnaires from Google Drive against Okta audit logs in Notion.
                </p>
                <div className="mt-space-sm flex items-center justify-between pt-space-sm border-t border-[#27272A]/50">
                  <div className="flex items-center gap-1 text-xs text-outline">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>Updated 14m ago</span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant">Action required</span>
                </div>
              </div>

              {/* Thread Item 3 */}
              <div
                onClick={() => onOpenSearchWithQuery('Mobile App Latency Spike')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="text-label-sm text-on-surface-variant font-mono">THREAD #8471</span>
                  <span className="text-xs text-blue-400 font-mono">Completed</span>
                </div>
                <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors">
                  Customer Feedback Cluster: Mobile App Latency Spike
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                  Aggregated 42 Intercom tickets, 12 GitHub issues, and 3 Slack threads into summary
                  report.
                </p>
                <div className="mt-space-sm flex items-center justify-between pt-space-sm border-t border-[#27272A]/50">
                  <div className="flex items-center gap-1 text-xs text-outline">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>1h ago</span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant">Ready to export</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('logs')}
              className="mt-space-md w-full py-space-sm rounded-xl bg-surface hover:bg-surface-container-high text-on-surface text-body-sm font-medium transition-all flex items-center justify-center gap-space-xs border border-[#27272A]"
            >
              <span>View All Reasoning Logs</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Column 2: Pinned Documents & Knowledge */}
          <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg border border-[#27272A] hover:border-outline-variant/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">bookmark</span>
                <h2 className="font-headline-sm font-semibold text-primary">Pinned Knowledge</h2>
              </div>
              <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-mono">
                6 pinned
              </span>
            </div>

            <div className="flex flex-col gap-space-md flex-1">
              {/* Doc 1 */}
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] flex items-start gap-space-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-purple-400 text-[20px]">
                    description
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-outline font-mono uppercase text-[11px]">
                      Notion • Engineering
                    </span>
                    <span className="material-symbols-outlined text-xs text-amber-400">star</span>
                  </div>
                  <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors truncate">
                    System Architecture Overview Q3 2025
                  </h3>
                  <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                    Comprehensive topology of microservices and event bus.
                  </p>
                </div>
              </div>

              {/* Doc 2 */}
              <div
                onClick={() => onNavigate('vault')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] flex items-start gap-space-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">
                    folder_open
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-outline font-mono uppercase text-[11px]">
                      Google Drive • Product
                    </span>
                    <span className="material-symbols-outlined text-xs text-amber-400">star</span>
                  </div>
                  <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors truncate">
                    Q4 Roadmap &amp; Feature Prioritization Matrix
                  </h3>
                  <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                    Spreadsheet tracking core deliverables and resource allocation.
                  </p>
                </div>
              </div>

              {/* Doc 3 */}
              <div
                onClick={() => onNavigate('graph')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] flex items-start gap-space-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-emerald-400 text-[20px]">code</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-outline font-mono uppercase text-[11px]">
                      GitHub • Security
                    </span>
                    <span className="material-symbols-outlined text-xs text-amber-400">star</span>
                  </div>
                  <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors truncate">
                    API Authentication Middleware Specification
                  </h3>
                  <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                    OAuth2 token rotation flow and rate limiting headers spec.
                  </p>
                </div>
              </div>

              {/* Doc 4 */}
              <div
                onClick={() => onOpenSearchWithQuery('Board Deck Final Draft v4')}
                className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all cursor-pointer border border-[#27272A] flex items-start gap-space-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-rose-400 text-[20px]">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-outline font-mono uppercase text-[11px]">
                      Gmail • Executive
                    </span>
                    <span className="material-symbols-outlined text-xs text-amber-400">star</span>
                  </div>
                  <h3 className="text-body-md font-semibold text-primary group-hover:text-primary-container transition-colors truncate">
                    Board Deck Final Draft v4 (Feedback Thread)
                  </h3>
                  <p className="text-body-sm text-on-surface-variant truncate mt-0.5">
                    Thread with CEO and CFO regarding ARR projections.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('vault')}
              className="mt-space-md w-full py-space-sm rounded-xl bg-surface hover:bg-surface-container-high text-on-surface text-body-sm font-medium transition-all flex items-center justify-center gap-space-xs border border-[#27272A]"
            >
              <span>Browse Knowledge Base</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Column 3: Recent Activity Feed */}
          <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg border border-[#27272A] hover:border-outline-variant/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">rss_feed</span>
                <h2 className="font-headline-sm font-semibold text-primary">Activity Stream</h2>
              </div>
              <span className="px-space-sm py-0.5 rounded bg-surface-container-high text-emerald-400 text-label-sm font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live sync
              </span>
            </div>

            <div className="flex flex-col gap-space-md flex-1">
              {/* Activity Item 1 */}
              <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-[#27272A] flex items-start gap-space-md">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-primary">
                      Sarah Jenkins in #eng-lead
                    </span>
                    <span className="text-xs text-outline font-mono">4m ago</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    "Just pushed the fix for the Redis connection pool timeout. OmniMind indexed the
                    PR instantly."
                  </p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-[#27272A] flex items-start gap-space-md">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-primary">
                      Alex Rivera updated Notion
                    </span>
                    <span className="text-xs text-outline font-mono">18m ago</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    Added new requirements to{' '}
                    <span className="text-primary underline underline-offset-2">
                      Q3 Security Review Specification
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-[#27272A] flex items-start gap-space-md">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">cloud_sync</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-primary">Google Drive Sync</span>
                    <span className="text-xs text-outline font-mono">45m ago</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    Indexed 14 new folders and processed 32 PDFs for semantic search vectors.
                  </p>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="p-space-md rounded-xl bg-surface hover:bg-surface-container transition-all border border-[#27272A] flex items-start gap-space-md">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-semibold text-primary">David Chen via Gmail</span>
                    <span className="text-xs text-outline font-mono">1h ago</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    "Contract renewal terms accepted for Acme Corp enterprise tier deployment."
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('briefing')}
              className="mt-space-md w-full py-space-sm rounded-xl bg-surface hover:bg-surface-container-high text-on-surface text-body-sm font-medium transition-all flex items-center justify-center gap-space-xs border border-[#27272A]"
            >
              <span>View Full Stream</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* System Diagnostics / Integration Status Banner */}
      <section className="px-4 sm:px-6 md:px-8 mt-6 max-w-7xl mx-auto w-full">
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-6 border border-[#27272A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 border border-[#27272A]">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">hub</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-semibold text-primary text-sm sm:text-base">OmniMind Neural Indexer</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                5 workspace providers active • 1,420,930 vectors indexed (sub-12ms retrieval).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface text-on-surface text-xs border border-[#27272A]">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
              <span className="font-mono">Slack</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface text-on-surface text-xs border border-[#27272A]">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
              <span className="font-mono">Notion</span>
            </div>
            <button
              onClick={() => onNavigate('integrations')}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-[#131315] font-semibold text-xs hover:bg-primary-fixed-dim transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">settings</span>
              <span>Manage</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
