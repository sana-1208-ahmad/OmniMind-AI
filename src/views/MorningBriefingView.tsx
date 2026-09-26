import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { AudioBriefingModal } from '../components/Modals/AudioBriefingModal';
import {
  Sun,
  Play,
  SlidersHorizontal,
  Check,
  TrendingUp,
  AlertCircle,
  FileText,
  Mail,
  Hash,
  ArrowRight,
  Headphones,
  Sparkles,
  CheckCircle2,
  Clock,
  HardDrive,
  Box as BoxIcon,
  Bot,
} from 'lucide-react';

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
    <div className="flex flex-col w-full min-h-full pb-12 text-zinc-100">
      <AudioBriefingModal isOpen={audioModalOpen} onClose={() => setAudioModalOpen(false)} />

      {/* Top Banner / Editorial Header */}
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 max-w-7xl mx-auto w-full border-b border-[#27272A]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-mono text-zinc-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Swytchcode Overnight Sync • {digestTime}</span>
            <span className="text-zinc-600">/</span>
            <span>Batch #9924-A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Morning Executive Briefing
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Autonomous intelligence and overnight activity across Slack, Drive, Notion, Box, and Gmail
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setCustomizingDigest(!customizingDigest)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] text-zinc-300 hover:text-white hover:bg-zinc-800 transition text-xs font-medium border border-[#27272A]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span>{customizingDigest ? 'Close Preferences' : 'Preferences'}</span>
          </button>
          <button
            onClick={() => setAudioModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition text-xs font-medium shadow-md"
          >
            <Headphones className="w-3.5 h-3.5 text-zinc-950" />
            <span>Listen Audio Brief (3 min)</span>
          </button>
        </div>
      </div>

      {customizingDigest && (
        <div className="mx-4 sm:mx-6 md:px-8 mt-4 p-4 bg-[#18181B] rounded-xl border border-[#27272A] grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
              Digest Schedule Time
            </label>
            <input
              type="text"
              value={digestTime}
              onChange={(e) => setDigestTime(e.target.value)}
              className="bg-[#101014] px-3 py-1.5 rounded-lg text-xs text-zinc-200 w-full border border-[#27272A] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
              Connected Tool Ingestion
            </label>
            <div className="text-xs text-zinc-300 font-mono mt-1">
              Slack (12 channels), Gmail (VIP Inbox), Notion, Box, Drive
            </div>
          </div>
          <div className="flex items-end justify-end">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Preferences Active</span>
            </span>
          </div>
        </div>
      )}

      {/* Bento Grid / Executive Summary Layout */}
      <div className="px-4 sm:px-6 md:px-8 pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-7xl mx-auto w-full">
        {/* Left Column: Key Takeaways & Urgent Items (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Executive AI Summary Banner Card */}
          <div className="p-5 rounded-xl bg-[#18181B] flex flex-col gap-4 border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">
                  Executive Intelligence Synthesis
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] bg-zinc-800 text-zinc-300 font-mono border border-[#27272A]">
                3 High Priority Actions
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              Overnight activity shows critical movement on the{' '}
              <strong className="text-white font-semibold">Q3 Infrastructure Migration</strong>.
              Engineering resolved the Redis pooling bottleneck on Slack, while Marcus Vance updated Slide 14 of the board deck in Google Drive. One critical customer SLA escalation requires immediate attention in Gmail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-[#101014] flex flex-col gap-1 border border-[#27272A]">
                <span className="text-[10px] text-zinc-400 font-mono uppercase">
                  Overnight Commits
                </span>
                <span className="text-xl font-bold text-white">48 PRs</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3 h-3" /> +12% vs average
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#101014] flex flex-col gap-1 border border-[#27272A]">
                <span className="text-[10px] text-zinc-400 font-mono uppercase">
                  Urgent Escalations
                </span>
                <span className="text-xl font-bold text-white">2 Threads</span>
                <span className="text-xs text-rose-400 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3 h-3" /> Sign-off required
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#101014] flex flex-col gap-1 border border-[#27272A]">
                <span className="text-[10px] text-zinc-400 font-mono uppercase">
                  Vault Updates
                </span>
                <span className="text-xl font-bold text-white">7 Files</span>
                <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                  <FileText className="w-3 h-3" /> Notion &amp; Drive
                </span>
              </div>
            </div>
          </div>

          {/* Urgent Gmail Threads Block */}
          <div className="p-5 rounded-xl bg-[#18181B] flex flex-col gap-3.5 border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-semibold text-white">Urgent Gmail Threads</h2>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                2 threads require reply
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Gmail Item 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('Summarize Globex Corp SLA requirements')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] transition flex flex-col gap-1.5 cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-950/50 text-rose-400 border border-rose-800/40">
                      [Swytchcode/Gmail]
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                      Sarah Jenkins (VP Sales) — Enterprise SLA Escalation: Globex Corp
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    07:15 AM
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  "We are at risk of losing the renewal if the custom API rate limits aren't approved by noon. They have escalated directly to their CTO..."
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-zinc-500">
                  <span className="text-rose-400 font-medium">Priority: Critical</span>
                  <span>•</span>
                  <span>Suggested action: Review attached API waiver</span>
                </div>
              </div>

              {/* Gmail Item 2 */}
              <div
                onClick={() => onOpenSearchWithQuery('Board Deck Final Review Q3 Numbers')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] transition flex flex-col gap-1.5 cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-[#27272A]">
                      [Swytchcode/Gmail]
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                      Marcus Vance — Board Deck Final Review Q3 Numbers
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    04:30 AM
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  "Please check slide 14 regarding ARR projections. I adjusted the churn rate down based on the latest cohort analysis..."
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-zinc-500">
                  <span className="text-amber-400 font-medium">Priority: High</span>
                  <span>•</span>
                  <span>Suggested action: Quick sign-off on slide 14</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overnight Slack Activity Block */}
          <div className="p-5 rounded-xl bg-[#18181B] flex flex-col gap-3.5 border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Overnight Slack Discussions</h2>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                342 messages analyzed across 12 channels
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Slack Thread 1 */}
              <div
                onClick={() => onOpenSearchWithQuery('Redis connection pool hotfix staging')}
                className="p-3.5 rounded-lg bg-[#101014] hover:bg-[#141418] transition flex flex-col gap-1.5 cursor-pointer border border-[#27272A] group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-950/50 text-blue-400 border border-blue-800/40">
                      [Swytchcode/Slack]
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                      #eng-core-infra • Thread led by @alex.dev
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    14 replies
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Resolved memory leak in redis caching layer. Deployed hotfix to staging at 02:45 AM. All smoke tests passed successfully. Ready for production rollout.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Consensus reached: Zero regressions detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Document Updates & Quick Actions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Key Document Updates Block */}
          <div className="p-5 rounded-xl bg-[#18181B] flex flex-col gap-3.5 border border-[#27272A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-white">Key Document Updates</h2>
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                Notion &amp; Drive
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div
                onClick={() => onNavigate('summarizer')}
                className="p-3 rounded-lg bg-[#101014] hover:bg-[#141418] transition flex flex-col gap-1 cursor-pointer border border-[#27272A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-400">[Swytchcode/Notion]</span>
                  <span className="text-[10px] text-zinc-500 font-mono">2h ago</span>
                </div>
                <span className="text-xs font-semibold text-zinc-200">
                  Q3 Strategic Roadmap — Final Draft
                </span>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Added revised milestones for enterprise SSO integration and SOC2 Type II audit.
                </p>
              </div>

              <div
                onClick={() => onNavigate('vault')}
                className="p-3 rounded-lg bg-[#101014] hover:bg-[#141418] transition flex flex-col gap-1 cursor-pointer border border-[#27272A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400">[Swytchcode/Drive]</span>
                  <span className="text-[10px] text-zinc-500 font-mono">5h ago</span>
                </div>
                <span className="text-xs font-semibold text-zinc-200">
                  Pricing Model Simulation v4.xlsx
                </span>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Modified tier thresholds for mid-market tier based on sales feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Queries Center */}
          <div className="p-5 rounded-xl bg-[#18181B] flex flex-col gap-3.5 border border-[#27272A]">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Ask OmniMind Agent</h2>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onOpenSearchWithQuery('Summarize Globex Corp SLA requirements')}
                className="w-full text-left p-2.5 rounded-lg bg-[#101014] hover:bg-zinc-800 text-xs text-zinc-200 transition flex items-center justify-between border border-[#27272A]"
              >
                <span>“Summarize Globex Corp SLA requirements”</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                onClick={() => onOpenSearchWithQuery('Investigation: Redis connection pool leak')}
                className="w-full text-left p-2.5 rounded-lg bg-[#101014] hover:bg-zinc-800 text-xs text-zinc-200 transition flex items-center justify-between border border-[#27272A]"
              >
                <span>“Investigation: Redis connection pool leak”</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              <button
                onClick={() => onOpenSearchWithQuery('List all action items assigned to me today')}
                className="w-full text-left p-2.5 rounded-lg bg-[#101014] hover:bg-zinc-800 text-xs text-zinc-200 transition flex items-center justify-between border border-[#27272A]"
              >
                <span>“List all action items assigned to me today”</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
