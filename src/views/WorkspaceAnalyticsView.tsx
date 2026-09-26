import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';

interface WorkspaceAnalyticsViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const WorkspaceAnalyticsView: React.FC<WorkspaceAnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const platformDistribution = [
    { name: 'Slack', percent: 34, docs: '12.4k messages', color: 'bg-emerald-500', icon: 'tag' },
    { name: 'Google Drive', percent: 26, docs: '1,842 files', color: 'bg-blue-500', icon: 'folder_shared' },
    { name: 'Notion', percent: 18, docs: '480 pages', color: 'bg-purple-500', icon: 'description' },
    { name: 'Gmail', percent: 14, docs: '8,920 threads', color: 'bg-red-400', icon: 'mail' },
    { name: 'Box Enterprise', percent: 8, docs: '940 files', color: 'bg-indigo-400', icon: 'inventory_2' },
  ];

  const topKnowledgeNodes = [
    { name: 'Acme Core Architecture Spec', code: 'SYS-001', citations: 412, category: 'Architecture', trend: '+28%' },
    { name: 'Q3 Financial Roadmap & Budget', code: 'DOC-9821', citations: 329, category: 'Finance', trend: '+14%' },
    { name: 'Product Launch Retrospective', code: 'REP-102', citations: 215, category: 'Product', trend: '+9%' },
    { name: 'SOC2 Type II Audit Compliance', code: 'SEC-441', citations: 188, category: 'Security', trend: '+35%' },
    { name: 'Engineering Sync #42 DB Sharding', code: 'SLACK-884', citations: 164, category: 'Engineering', trend: '+6%' },
  ];

  return (
    <div className="flex-1 p-space-xl max-w-7xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
              INTELLIGENCE & KNOWLEDGE METRICS
            </span>
            <span className="text-[12px] text-secondary">Cross-Platform Telemetry</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">Workspace Analytics</h1>
          <p className="text-secondary text-body-md mt-1">
            Real-time insights into knowledge indexing, cross-platform citation graphs, and employee search resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Pills */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-[#27272A]">
            {(['7D', '30D', '90D', '1Y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-surface-container-high text-primary font-semibold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('export-hub')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high border border-[#27272A] text-xs font-medium text-primary hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">ios_share</span>
            Export Analytics
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70">
          <span className="text-xs text-secondary uppercase font-mono">Total Queries Answered</span>
          <p className="text-2xl font-bold font-mono text-primary mt-2">28,490</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +18.4% vs last period
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70">
          <span className="text-xs text-secondary uppercase font-mono">Knowledge Graph Nodes</span>
          <p className="text-2xl font-bold font-mono text-purple-400 mt-2">1,420 Items</p>
          <p className="text-xs text-secondary mt-1">Across 5 workspace apps</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70">
          <span className="text-xs text-secondary uppercase font-mono">Est. Time Saved / User</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-2">4.2 hrs/wk</p>
          <p className="text-xs text-secondary mt-1">Autonomous contextual search</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70">
          <span className="text-xs text-secondary uppercase font-mono">Citation Verification Rate</span>
          <p className="text-2xl font-bold font-mono text-primary mt-2">99.4%</p>
          <p className="text-xs text-emerald-400 mt-1">Zero hallucination standard</p>
        </div>
      </div>

      {/* Main Grid: Platform Distribution & Query Intent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Platform Share */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary text-base">Platform Ingestion Share</h3>
            <span className="text-xs text-secondary font-mono">5 CONNECTED WORKSPACES</span>
          </div>

          <div className="space-y-4 pt-2">
            {platformDistribution.map((platform) => (
              <div key={platform.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">{platform.icon}</span>
                    <span className="font-medium text-primary">{platform.name}</span>
                    <span className="text-secondary font-mono">({platform.docs})</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{platform.percent}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full ${platform.color} rounded-full transition-all duration-500`}
                    style={{ width: `${platform.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-surface-container rounded-lg border border-[#27272A] text-xs text-secondary">
            <span className="text-primary font-medium">Insight:</span> Slack and Google Drive represent 60% of knowledge citations. The autonomous agent regularly correlates informal channel chats with formal engineering docs.
          </div>
        </div>

        {/* Top Referenced Documents */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-primary text-base">Top Referenced Knowledge Nodes</h3>
            <button
              onClick={() => onNavigate('graph')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              View in Graph
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {topKnowledgeNodes.map((node, idx) => (
              <div
                key={node.code}
                className="p-3 rounded-lg bg-surface-container border border-[#27272A] flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer"
                onClick={() => onNavigate('graph')}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-secondary w-4">{idx + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-primary line-clamp-1">{node.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-secondary font-mono">
                      <span>{node.code}</span>
                      <span>•</span>
                      <span>{node.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-primary">{node.citations} refs</span>
                  <span className="block text-[11px] text-emerald-400">{node.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Query Intents & Action Items Metrics */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-4">
        <h3 className="font-semibold text-primary text-base">Autonomous Query Intent Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-surface-container border border-[#27272A]">
            <span className="text-xs text-secondary uppercase font-mono">Technical & Infra</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">42%</p>
            <p className="text-xs text-secondary mt-1">Architecture specs, API, DB sharding</p>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-[#27272A]">
            <span className="text-xs text-secondary uppercase font-mono">Roadmaps & Sprints</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">29%</p>
            <p className="text-xs text-secondary mt-1">Q3 milestones, Notion boards, OKRs</p>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-[#27272A]">
            <span className="text-xs text-secondary uppercase font-mono">Security & Compliance</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">16%</p>
            <p className="text-xs text-secondary mt-1">SOC2 audits, ISO, penetration tests</p>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-[#27272A]">
            <span className="text-xs text-secondary uppercase font-mono">Daily Briefings & Syncs</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">13%</p>
            <p className="text-xs text-secondary mt-1">Morning digests, executive highlights</p>
          </div>
        </div>
      </div>
    </div>
  );
};
