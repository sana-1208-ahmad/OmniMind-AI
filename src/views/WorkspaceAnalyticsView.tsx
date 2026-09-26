import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import {
  Download,
  ArrowUpRight,
  HardDrive,
  Mail,
  FileText,
  Box as BoxIcon,
  Hash,
  ArrowRight,
} from 'lucide-react';

interface WorkspaceAnalyticsViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const WorkspaceAnalyticsView: React.FC<WorkspaceAnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const platformDistribution = [
    { name: 'Slack', percent: 34, docs: '12.4k messages', color: 'bg-emerald-500', icon: Hash },
    { name: 'Google Drive', percent: 26, docs: '1,842 files', color: 'bg-blue-500', icon: HardDrive },
    { name: 'Notion', percent: 18, docs: '480 pages', color: 'bg-purple-500', icon: FileText },
    { name: 'Gmail', percent: 14, docs: '8,920 threads', color: 'bg-red-400', icon: Mail },
    { name: 'Box Enterprise', percent: 8, docs: '940 files', color: 'bg-indigo-400', icon: BoxIcon },
  ];

  const topKnowledgeNodes = [
    { name: 'Acme Core Architecture Spec', code: 'SYS-001', citations: 412, category: 'Architecture', trend: '+28%' },
    { name: 'Q3 Financial Roadmap & Budget', code: 'DOC-9821', citations: 329, category: 'Finance', trend: '+14%' },
    { name: 'Product Launch Retrospective', code: 'REP-102', citations: 215, category: 'Product', trend: '+9%' },
    { name: 'SOC2 Type II Audit Compliance', code: 'SEC-441', citations: 188, category: 'Security', trend: '+35%' },
    { name: 'Engineering Sync #42 DB Sharding', code: 'SLACK-884', citations: 164, category: 'Engineering', trend: '+6%' },
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-zinc-100">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
              INTELLIGENCE & KNOWLEDGE METRICS
            </span>
            <span className="text-xs text-zinc-400">Cross-Platform Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Workspace Analytics</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time insights into knowledge indexing, cross-platform citation graphs, and employee search resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Pills */}
          <div className="flex items-center bg-[#101014] p-1 rounded-lg border border-[#27272A]">
            {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-[#18181B] text-white font-semibold border border-[#27272A]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('export-hub')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
          <span className="text-xs text-zinc-400 uppercase font-mono">Total Queries Answered</span>
          <p className="text-2xl font-bold font-mono text-white mt-2">28,490</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>+18.4% vs last period</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
          <span className="text-xs text-zinc-400 uppercase font-mono">Knowledge Graph Nodes</span>
          <p className="text-2xl font-bold font-mono text-purple-400 mt-2">1,420 Items</p>
          <p className="text-xs text-zinc-400 mt-1">Across 5 workspace apps</p>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
          <span className="text-xs text-zinc-400 uppercase font-mono">Est. Time Saved / User</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-2">4.2 hrs/wk</p>
          <p className="text-xs text-zinc-400 mt-1">Autonomous contextual search</p>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
          <span className="text-xs text-zinc-400 uppercase font-mono">Citation Verification Rate</span>
          <p className="text-2xl font-bold font-mono text-white mt-2">99.4%</p>
          <p className="text-xs text-emerald-400 mt-1">Zero hallucination standard</p>
        </div>
      </div>

      {/* Main Grid: Platform Distribution & Query Intent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Share */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-sm">Platform Ingestion Share</h3>
            <span className="text-[11px] text-zinc-500 font-mono">5 CONNECTED WORKSPACES</span>
          </div>

          <div className="space-y-4 pt-1">
            {platformDistribution.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-medium text-white">{platform.name}</span>
                      <span className="text-zinc-500 font-mono">({platform.docs})</span>
                    </div>
                    <span className="font-mono font-bold text-white">{platform.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#101014] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${platform.color} rounded-full transition-all duration-500`}
                      style={{ width: `${platform.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#101014] rounded-lg border border-[#27272A] text-xs text-zinc-400">
            <span className="text-white font-medium">Insight:</span> Slack and Google Drive represent 60% of knowledge citations. The autonomous agent regularly correlates informal channel chats with formal engineering docs.
          </div>
        </div>

        {/* Top Referenced Documents */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-sm">Top Referenced Knowledge Nodes</h3>
            <button
              onClick={() => onNavigate('graph')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View in Graph</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          <div className="space-y-2.5">
            {topKnowledgeNodes.map((node, idx) => (
              <div
                key={node.code}
                className="p-3 rounded-lg bg-[#101014] border border-[#27272A] flex items-center justify-between hover:bg-zinc-800/50 transition-colors cursor-pointer"
                onClick={() => onNavigate('graph')}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-500 w-4">{idx + 1}</span>
                  <div>
                    <p className="text-xs font-medium text-white line-clamp-1">{node.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400 font-mono">
                      <span>{node.code}</span>
                      <span>•</span>
                      <span>{node.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white">{node.citations} refs</span>
                  <span className="block text-[11px] text-emerald-400 font-mono">{node.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Query Intents & Action Items Metrics */}
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
        <h3 className="font-semibold text-white text-sm">Autonomous Query Intent Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#101014] border border-[#27272A]">
            <span className="text-xs text-zinc-400 uppercase font-mono">Technical & Infra</span>
            <p className="text-xl font-bold font-mono text-white mt-1">42%</p>
            <p className="text-xs text-zinc-500 mt-1">Architecture specs, API, DB sharding</p>
          </div>

          <div className="p-4 rounded-lg bg-[#101014] border border-[#27272A]">
            <span className="text-xs text-zinc-400 uppercase font-mono">Roadmaps & Sprints</span>
            <p className="text-xl font-bold font-mono text-white mt-1">29%</p>
            <p className="text-xs text-zinc-500 mt-1">Q3 milestones, Notion boards, OKRs</p>
          </div>

          <div className="p-4 rounded-lg bg-[#101014] border border-[#27272A]">
            <span className="text-xs text-zinc-400 uppercase font-mono">Security & Compliance</span>
            <p className="text-xl font-bold font-mono text-white mt-1">16%</p>
            <p className="text-xs text-zinc-500 mt-1">SOC2 audits, ISO, penetration tests</p>
          </div>

          <div className="p-4 rounded-lg bg-[#101014] border border-[#27272A]">
            <span className="text-xs text-zinc-400 uppercase font-mono">Daily Briefings & Syncs</span>
            <p className="text-xl font-bold font-mono text-white mt-1">13%</p>
            <p className="text-xs text-zinc-500 mt-1">Morning digests, executive highlights</p>
          </div>
        </div>
      </div>
    </div>
  );
};
