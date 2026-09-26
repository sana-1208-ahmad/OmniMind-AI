import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { AudioBriefingModal } from '../components/Modals/AudioBriefingModal';

interface MorningBriefingViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenSearchWithQuery: (query: string) => void;
}

export const MorningBriefingView: React.FC<MorningBriefingViewProps> = ({
  onNavigate,
  onOpenSearchWithQuery,
}) => {
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [customizingDigest, setCustomizingDigest] = useState(false);
  const [digestTime, setDigestTime] = useState('08:30 AM PST');

  return (
    <div className="flex flex-col w-full min-h-full pb-12">
      <AudioBriefingModal isOpen={audioModalOpen} onClose={() => setAudioModalOpen(false)} />

      {/* Top Banner / Editorial Header */}
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-mono text-on-surface-variant uppercase tracking-wider text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Synced • {digestTime}</span>
            <span className="text-outline">/</span>
            <span>ID #9924-A</span>
          </div>
          <h1 className="font-headline-lg text-primary text-2xl sm:text-3xl font-bold tracking-tight">
            Morning Briefing
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Automated intelligence &amp; overnight activity across connected tools
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setCustomizingDigest(!customizingDigest)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-bright transition-all text-xs sm:text-sm font-medium border border-[#27272A]"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>{customizingDigest ? 'Done' : 'Preferences'}</span>
          </button>
          <button
            onClick={() => setAudioModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-[#131315] hover:bg-primary-fixed-dim transition-all text-xs sm:text-sm font-bold shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            <span>Listen (3 min)</span>
          </button>
        </div>
      </div>

      {customizingDigest && (
        <div className="mx-4 sm:mx-6 md:mx-8 mb-6 p-4 bg-surface-container rounded-2xl border border-[#27272A] grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-150 max-w-7xl">
          <div>
            <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1">
              Digest Schedule Time
            </label>
            <input
              type="text"
              value={digestTime}
              onChange={(e) => setDigestTime(e.target.value)}
              className="bg-surface-container-low px-3 py-1.5 rounded-lg text-sm text-primary w-full border border-[#27272A]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1">
              Included Channels
            </label>
            <div className="text-xs text-on-surface-variant font-mono mt-1">
              Slack (12 channels), Gmail (Inbox VIP), Notion, Box
            </div>
          </div>
          <div className="flex items-end justify-end">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check</span>
              Preferences Auto-Saved
            </span>
          </div>
        </div>
      )}

      {/* Bento Grid / Executive Summary Layout */}
      <div className="px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Key Takeaways & Urgent Items (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Executive AI Summary Banner Card */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low relative overflow-hidden flex flex-col gap-space-md border border-[#27272A]">
            <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  auto_awesome
                </span>
                <h2 className="font-headline-sm font-semibold text-primary">
                  Executive Intelligence Synthesis
                </h2>
              </div>
              <span className="px-space-sm py-0.5 rounded text-label-sm bg-surface-container-high text-on-surface-variant font-mono">
                3 High Priority Actions
              </span>
            </div>

            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              Overnight activity shows significant movement on the{' '}
              <strong className="text-primary font-semibold">Project Atlas V2</strong> launch roadmap.
              Engineering resolved 14 blockers on Slack, while leadership finalized Q3 budget allocation
              via Notion. One high-risk escalation requires immediate attention in Gmail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-sm">
              <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs border border-[#27272A]/50">
                <span className="text-label-sm text-on-surface-variant font-mono uppercase text-[11px]">
                  Overnight Commits
                </span>
                <span className="font-headline-md text-2xl font-bold text-primary">48 PRs</span>
                <span className="text-body-sm text-emerald-400 flex items-center gap-1 font-mono text-xs">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% vs avg
                </span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs border border-[#27272A]/50">
                <span className="text-label-sm text-on-surface-variant font-mono uppercase text-[11px]">
                  Urgent Emails
                </span>
                <span className="font-headline-md text-2xl font-bold text-primary">2 Threads</span>
                <span className="text-body-sm text-rose-400 flex items-center gap-1 font-mono text-xs">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span> Action
                  required
                </span>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-xs border border-[#27272A]/50">
                <span className="text-label-sm text-on-surface-variant font-mono uppercase text-[11px]">
                  Doc Updates
                </span>
                <span className="font-headline-md text-2xl font-bold text-primary">7 Files</span>
                <span className="text-body-sm text-on-surface-variant flex items-center gap-1 font-mono text-xs">
                  <span className="material-symbols-outlined text-[14px]">edit</span> Notion &amp; Drive
                </span>
              </div>
            </div>
          </div>

          {/* Urgent Gmail Threads Block */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
                <h2 className="font-headline-sm font-semibold text-primary">Urgent Gmail Threads</h2>
              </div>
              <span className="text-label-md text-on-surface-variant font-mono text-xs">
                2 threads require reply
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Gmail Item 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('Summarize Globex Corp SLA requirements')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-sm cursor-pointer group border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#ef4444]/10 text-[#ef4444] font-medium">
                      Gmail
                    </span>
                    <span className="text-body-md font-semibold text-primary group-hover:underline">
                      Sarah Jenkins (VP Sales) — Enterprise SLA Escalation: Globex Corp
                    </span>
                  </div>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    07:15 AM
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  "We are at risk of losing the renewal if the custom API rate limits aren't approved by
                  noon. They have escalated directly to their CTO..."
                </p>
                <div className="flex items-center gap-space-sm pt-space-xs flex-wrap">
                  <span className="px-2 py-0.5 rounded text-label-sm bg-surface-container-high text-rose-400 font-mono text-xs font-semibold">
                    Priority: Critical
                  </span>
                  <span className="text-body-sm text-on-surface-variant text-xs">
                    • Suggested action: Review attached API waiver and approve via security portal
                  </span>
                </div>
              </div>

              {/* Gmail Item 2 */}
              <div
                onClick={() => onOpenSearchWithQuery('Board Deck Final Review Q3 Numbers')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-sm cursor-pointer group border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#ef4444]/10 text-[#ef4444] font-medium">
                      Gmail
                    </span>
                    <span className="text-body-md font-semibold text-primary group-hover:underline">
                      Marcus Vance — Board Deck Final Review Q3 Numbers
                    </span>
                  </div>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    04:30 AM
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  "Please check slide 14 regarding ARR projections. I adjusted the churn rate down based on
                  the latest cohort analysis..."
                </p>
                <div className="flex items-center gap-space-sm pt-space-xs flex-wrap">
                  <span className="px-2 py-0.5 rounded text-label-sm bg-surface-container-high text-amber-400 font-mono text-xs font-semibold">
                    Priority: High
                  </span>
                  <span className="text-body-sm text-on-surface-variant text-xs">
                    • Suggested action: Quick sign-off or inline comment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overnight Slack Activity Block */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-sm bg-[#3b82f6]"></div>
                <h2 className="font-headline-sm font-semibold text-primary">Overnight Slack Activity</h2>
              </div>
              <span className="text-label-md text-on-surface-variant font-mono text-xs">
                342 messages analyzed across 12 channels
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Slack Thread 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('Redis connection pool hotfix staging')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-sm cursor-pointer border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#3b82f6]/10 text-[#3b82f6] font-medium">
                      Slack
                    </span>
                    <span className="text-body-md font-semibold text-primary">
                      #eng-core-infra •{' '}
                      <span className="text-on-surface-variant font-normal">Thread led by @alex.dev</span>
                    </span>
                  </div>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    14 replies
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Resolved memory leak in redis caching layer. Deployed hotfix to staging at 02:45 AM. All
                  smoke tests passed successfully. Ready for production rollout during next maintenance
                  window.
                </p>
                <div className="flex items-center gap-space-xs text-label-sm text-emerald-400 font-mono text-xs">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Consensus reached: Zero regressions detected.</span>
                </div>
              </div>

              {/* Slack Thread 2 */}
              <div
                onClick={() => onOpenSearchWithQuery('Marketing copy AI Assistant feature')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-sm cursor-pointer border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#3b82f6]/10 text-[#3b82f6] font-medium">
                      Slack
                    </span>
                    <span className="text-body-md font-semibold text-primary">
                      #product-launch •{' '}
                      <span className="text-on-surface-variant font-normal">Thread led by @elena_p</span>
                    </span>
                  </div>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    28 replies
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Marketing copy for the AI Assistant feature set approved. Localization strings
                  dispatched for French and Japanese. Beta testers report 94% satisfaction score.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Document Updates & Quick Actions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Key Document Updates Block */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-sm bg-[#64748b]"></div>
                <h2 className="font-headline-sm font-semibold text-primary">Key Document Updates</h2>
              </div>
              <span className="text-label-md text-on-surface-variant font-mono text-xs">
                Notion &amp; Drive
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Doc 1 */}
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-xs cursor-pointer border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#64748b]/10 text-[#64748b] font-medium">
                    Notion
                  </span>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    Updated 2h ago
                  </span>
                </div>
                <span className="text-body-md font-semibold text-primary">
                  Q3 Strategic Roadmap — Final Draft
                </span>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  Added revised milestones for enterprise SSO integration and SOC2 Type II compliance
                  audit schedule.
                </p>
              </div>

              {/* Doc 2 */}
              <div
                onClick={() => onNavigate('vault')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-xs cursor-pointer border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#64748b]/10 text-[#64748b] font-medium">
                    Google Drive
                  </span>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    Updated 5h ago
                  </span>
                </div>
                <span className="text-body-md font-semibold text-primary">
                  Pricing Model Simulation v4.xlsx
                </span>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  Modified tier thresholds for mid-market tier based on feedback from the sales team sync.
                </p>
              </div>

              {/* Doc 3 */}
              <div
                onClick={() => onOpenSearchWithQuery('Incident #409 post-mortem')}
                className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all flex flex-col gap-space-xs cursor-pointer border border-[#27272A]/60"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-label-sm font-mono text-xs bg-[#64748b]/10 text-[#64748b] font-medium">
                    Notion
                  </span>
                  <span className="text-label-sm text-on-surface-variant font-mono text-xs">
                    Yesterday
                  </span>
                </div>
                <span className="text-body-md font-semibold text-primary">
                  Engineering Post-Mortem: Incident #409
                </span>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  Root cause analysis and preventative action items for the latency spike in EU-Central
                  region.
                </p>
              </div>
            </div>
          </div>

          {/* AI Action Center / Quick Prompts */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-md border border-[#27272A]">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <h2 className="font-headline-sm font-semibold text-primary">Quick Actions &amp; Queries</h2>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Ask OmniMind anything regarding today's digests:
            </p>
            <div className="flex flex-col gap-space-xs">
              <button
                onClick={() => onOpenSearchWithQuery('Summarize Globex Corp SLA requirements')}
                className="w-full text-left p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-body-sm text-on-surface transition-all flex items-center justify-between group border border-[#27272A]/50"
              >
                <span className="text-primary font-medium">“Summarize Globex Corp SLA requirements”</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => onOpenSearchWithQuery('Draft reply to Sarah Jenkins regarding waiver')}
                className="w-full text-left p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-body-sm text-on-surface transition-all flex items-center justify-between group border border-[#27272A]/50"
              >
                <span className="text-primary font-medium">
                  “Draft reply to Sarah Jenkins regarding waiver”
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => onOpenSearchWithQuery('List all action items assigned to me today')}
                className="w-full text-left p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-body-sm text-on-surface transition-all flex items-center justify-between group border border-[#27272A]/50"
              >
                <span className="text-primary font-medium">
                  “List all action items assigned to me today”
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
