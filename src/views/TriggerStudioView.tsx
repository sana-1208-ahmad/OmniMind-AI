import React, { useState } from 'react';
import { TRIGGER_RULES_INITIAL } from '../data/mockWorkspacePayload';
import { TriggerRule } from '../types';
import {
  Zap,
  Plus,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Clock,
  Sliders,
  Power,
  Play,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const TriggerStudioView: React.FC = () => {
  const [rules, setRules] = useState<TriggerRule[]>(TRIGGER_RULES_INITIAL);
  const [filterQuery, setFilterQuery] = useState('');
  const [ruleName, setRuleName] = useState('VIP Escalation & Notion Sync');
  const [sourceEvent, setSourceEvent] = useState('Urgent Email from VIP (C-Level / Board)');
  const [filterRegex, setFilterRegex] = useState("contains 'Confidential' OR 'Urgent'");
  const [actionWorkflow, setActionWorkflow] = useState('Summarize & Extract Action Items (LLM)');
  const [destination, setDestination] = useState('#leadership-briefs (Slack)');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredRules = rules.filter((r) =>
    r.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  function toggleRule(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  }

  function handleCreateRule(e: React.FormEvent) {
    e.preventDefault();
    if (!ruleName.trim()) return;

    const newRule: TriggerRule = {
      id: `rule-${Date.now()}`,
      name: ruleName.trim(),
      when: {
        event: sourceEvent,
        source: sourceEvent.includes('Drive') ? 'Google Drive' : sourceEvent.includes('Slack') ? 'Slack' : 'Gmail',
        filter: filterRegex,
      },
      do: {
        action: actionWorkflow,
        destination,
      },
      executions: 0,
      isActive: true,
      typeIcon: 'bolt',
    };

    setRules([newRule, ...rules]);
    setToastMsg(`Automation rule "${ruleName}" successfully created and armed.`);
    setTimeout(() => setToastMsg(null), 3500);
  }

  return (
    <div className="flex flex-col w-full min-h-full p-5 sm:p-6 max-w-7xl mx-auto space-y-6 text-zinc-100 pb-12">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] border border-emerald-500/50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              Swytchcode Event Automation
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Trigger Studio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
            Build and monitor cross-platform event pipelines connecting Slack, Drive, Notion, Box, and Gmail into autonomous workflows.
          </p>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('rule-builder-card');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </div>

      {/* 4 Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-zinc-400">Active Pipelines</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-2xl font-bold text-white">
            {rules.filter((r) => r.isActive).length} / {rules.length}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">100% SLA uptime</div>
        </div>

        <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Total Executions</span>
          <div className="text-2xl font-bold text-white">1,482</div>
          <div className="text-[11px] text-emerald-400 font-mono">+18% this week</div>
        </div>

        <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Avg Ingestion Latency</span>
          <div className="text-2xl font-bold text-white font-mono">182ms</div>
          <div className="text-[11px] text-zinc-500 font-mono">Real-time socket pipeline</div>
        </div>

        <div className="bg-[#18181B] rounded-xl p-4 border border-[#27272A] space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Cross-Tool Events</span>
          <div className="text-2xl font-bold text-white">5 Tools</div>
          <div className="text-[11px] text-zinc-400 font-mono">Slack, Drive, Notion, Box, Gmail</div>
        </div>
      </div>

      {/* Active Rules List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Active Automation Rules ({filteredRules.length})
          </h2>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter rules..."
              className="w-full bg-[#18181B] text-xs text-white pl-8 pr-3 py-1.5 rounded-lg border border-[#27272A] outline-none"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredRules.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{r.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-blue-300 border border-zinc-700">
                    {r.when.source}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono flex items-center gap-2 flex-wrap">
                  <span>WHEN: {r.when.event}</span>
                  <span className="text-zinc-600">→</span>
                  <span>DO: {r.do.action}</span>
                  <span className="text-zinc-600">→</span>
                  <span className="text-zinc-300">{r.do.destination}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-zinc-500">
                  {r.executions} runs
                </span>
                <button
                  onClick={() => toggleRule(r.id)}
                  className={`px-3 py-1 rounded text-xs font-mono transition flex items-center gap-1.5 ${
                    r.isActive
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{r.isActive ? 'Armed' : 'Paused'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rule Builder Card */}
      <div id="rule-builder-card" className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Create Cross-Platform Automation Pipeline</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure triggers across your Swytchcode tool APIs and execute automated reasoning workflows.
          </p>
        </div>

        <form onSubmit={handleCreateRule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
              Rule Name
            </label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-zinc-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#101014] border border-[#27272A] space-y-3">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              WHEN (Trigger Condition)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Source Event
                </label>
                <select
                  value={sourceEvent}
                  onChange={(e) => setSourceEvent(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                >
                  <option value="Urgent Email from VIP (C-Level / Board)">
                    Urgent Email from VIP (Gmail)
                  </option>
                  <option value="New Document Indexed in Google Drive">
                    New Document Indexed (Google Drive)
                  </option>
                  <option value="Slack Keyword Mention (#exec-alerts)">
                    Slack Channel Keyword (Slack)
                  </option>
                  <option value="Box Security Policy Flag Uploaded">
                    Box Vault Security Flag (Box)
                  </option>
                  <option value="Notion Architecture RFC Created">
                    Notion RFC Created (Notion)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Filter Condition
                </label>
                <input
                  type="text"
                  value={filterRegex}
                  onChange={(e) => setFilterRegex(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-zinc-500" />
          </div>

          <div className="p-4 rounded-xl bg-[#101014] border border-[#27272A] space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              DO (Agent Action Execution)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Autonomous Action
                </label>
                <select
                  value={actionWorkflow}
                  onChange={(e) => setActionWorkflow(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                >
                  <option value="Summarize & Extract Action Items (LLM)">
                    Summarize &amp; Extract Action Items (LLM)
                  </option>
                  <option value="Post formatted payload to Slack Channel">
                    Post formatted payload to Slack Channel
                  </option>
                  <option value="Sync structured record to Notion Roadmap">
                    Sync structured record to Notion Roadmap
                  </option>
                  <option value="Dispatch Swytchcode Webhook Ingestion">
                    Dispatch Swytchcode Webhook Ingestion
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">
                  Destination Target
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-lg text-xs hover:bg-zinc-200 transition"
            >
              Arm Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
