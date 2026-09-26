import React, { useState } from 'react';
import { TRIGGER_RULES_INITIAL } from '../data/mockWorkspacePayload';
import { TriggerRule } from '../types';

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
    <div className="flex flex-col w-full min-h-full p-gutter max-w-7xl mx-auto space-y-space-xl pb-12">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-emerald-500/40 text-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span className="text-xs font-mono">{toastMsg}</span>
        </div>
      )}

      {/* Header / Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
            <span className="text-label-md uppercase tracking-wider text-on-surface-variant font-mono text-xs">
              Automation Engine
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-primary tracking-tight text-3xl">
            Trigger Studio
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            Build, test, and manage cross-platform conditional automation pipelines connecting your
            enterprise data sources to intelligent workflows.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => {
              const el = document.getElementById('rule-builder-card');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-space-md py-space-sm rounded-xl bg-primary text-[#131315] font-bold text-body-md flex items-center gap-space-xs hover:bg-primary-fixed-dim transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Rule</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container rounded-2xl p-space-lg flex flex-col justify-between relative overflow-hidden border border-[#27272A]">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-mono text-xs">
              Active Triggers
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div>
            <div className="text-headline-lg font-bold text-primary text-3xl">24</div>
            <div className="text-body-sm text-on-surface-variant mt-1 flex items-center gap-1 font-mono text-xs">
              <span className="text-emerald-400 font-bold">+3</span> this week
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-space-lg flex flex-col justify-between relative overflow-hidden border border-[#27272A]">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-mono text-xs">
              Executions (24h)
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">monitoring</span>
          </div>
          <div>
            <div className="text-headline-lg font-bold text-primary text-3xl">1,482</div>
            <div className="text-body-sm text-on-surface-variant mt-1 flex items-center gap-1 font-mono text-xs">
              <span className="text-emerald-400 font-bold">99.8%</span> success rate
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-space-lg flex flex-col justify-between relative overflow-hidden border border-[#27272A]">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-mono text-xs">
              Connected Apps
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">link</span>
          </div>
          <div>
            <div className="text-headline-lg font-bold text-primary text-3xl">8</div>
            <div className="text-body-sm text-on-surface-variant mt-1 text-xs">
              Drive, Slack, Notion, Box, Gmail...
            </div>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-space-lg flex flex-col justify-between relative overflow-hidden border border-[#27272A]">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-mono text-xs">
              Avg Latency
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">speed</span>
          </div>
          <div>
            <div className="text-headline-lg font-bold text-primary text-3xl">340ms</div>
            <div className="text-body-sm text-on-surface-variant mt-1 text-xs">
              Real-time webhooks active
            </div>
          </div>
        </div>
      </div>

      {/* Automation Rule Builder Card */}
      <div
        id="rule-builder-card"
        className="bg-surface-container rounded-2xl p-space-xl space-y-space-lg border border-[#27272A] shadow-xl"
      >
        <div className="flex items-center justify-between pb-space-md border-b border-[#27272A]">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-[#27272A]">
              <span className="material-symbols-outlined">tune</span>
            </div>
            <div>
              <h2 className="text-headline-sm font-bold text-primary">Rule Builder</h2>
              <p className="text-body-sm text-on-surface-variant">
                Configure conditions and automated execution payloads
              </p>
            </div>
          </div>
          <span className="px-space-sm py-1 rounded bg-surface-container-high text-xs font-mono text-primary border border-[#27272A]">
            Draft Mode
          </span>
        </div>

        <form onSubmit={handleCreateRule} className="space-y-space-lg">
          {/* Rule Name Input */}
          <div className="space-y-space-xs">
            <label className="block text-xs text-on-surface-variant font-mono uppercase">
              RULE NAME
            </label>
            <input
              type="text"
              required
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="e.g. Urgent Executive Briefing Pipeline"
              className="w-full bg-surface-container-low text-primary px-space-md py-space-sm rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-md"
            />
          </div>

          {/* WHEN Clause */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low space-y-space-md border border-[#27272A]">
            <div className="flex items-center gap-space-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">filter_alt</span>
              <span className="text-headline-sm font-semibold">WHEN (Trigger Condition)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="space-y-space-xs">
                <label className="block text-xs text-on-surface-variant font-mono uppercase">
                  SOURCE PLATFORM / EVENT
                </label>
                <select
                  value={sourceEvent}
                  onChange={(e) => setSourceEvent(e.target.value)}
                  className="w-full bg-surface-container text-primary px-space-md py-space-sm rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm"
                >
                  <option value="New Document Indexed in Google Drive">
                    New Document Indexed in Google Drive
                  </option>
                  <option value="Urgent Email from VIP (C-Level / Board)">
                    Urgent Email from VIP (C-Level / Board)
                  </option>
                  <option value="Slack Keyword Mention (#exec-alerts)">
                    Slack Keyword Mention (#exec-alerts)
                  </option>
                  <option value="Jira High-Priority Ticket Created">
                    Jira High-Priority Ticket Created
                  </option>
                </select>
              </div>

              <div className="space-y-space-xs">
                <label className="block text-xs text-on-surface-variant font-mono uppercase">
                  ADDITIONAL FILTER / REGEX
                </label>
                <input
                  type="text"
                  value={filterRegex}
                  onChange={(e) => setFilterRegex(e.target.value)}
                  className="w-full bg-surface-container text-primary px-space-md py-space-sm rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Arrow Connector */}
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-[#27272A]">
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </div>
          </div>

          {/* DO Clause */}
          <div className="p-space-lg rounded-2xl bg-surface-container-low space-y-space-md border border-[#27272A]">
            <div className="flex items-center gap-space-sm text-primary">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span className="text-headline-sm font-semibold">DO (Action Execution)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="space-y-space-xs">
                <label className="block text-xs text-on-surface-variant font-mono uppercase">
                  ACTION WORKFLOW
                </label>
                <select
                  value={actionWorkflow}
                  onChange={(e) => setActionWorkflow(e.target.value)}
                  className="w-full bg-surface-container text-primary px-space-md py-space-sm rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm"
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
                  <option value="Dispatch Custom Webhook Payload">
                    Dispatch Custom Webhook Payload
                  </option>
                </select>
              </div>

              <div className="space-y-space-xs">
                <label className="block text-xs text-on-surface-variant font-mono uppercase">
                  DESTINATION / CHANNEL
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-surface-container text-primary px-space-md py-space-sm rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm"
                >
                  <option value="#leadership-briefs (Slack)">#leadership-briefs (Slack)</option>
                  <option value="#exec-room (Slack)">#exec-room (Slack)</option>
                  <option value="Product Strategy DB (Notion)">Product Strategy DB (Notion)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex items-center justify-end gap-space-md pt-space-md">
            <button
              type="button"
              onClick={() => {
                setRuleName('VIP Escalation & Notion Sync');
                setFilterRegex("contains 'Confidential' OR 'Urgent'");
              }}
              className="px-space-md py-space-sm rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary text-body-sm transition-all"
            >
              Reset Inputs
            </button>
            <button
              type="submit"
              className="px-space-xl py-space-sm rounded-xl bg-primary text-[#131315] font-bold text-body-md hover:bg-primary-fixed-dim transition-all shadow-md flex items-center gap-space-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Create Rule</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Automation Rules List */}
      <div className="space-y-space-md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-space-sm">
            <h2 className="text-headline-md font-bold text-primary text-xl">Active Automation Rules</h2>
            <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-xs font-mono text-on-surface border border-[#27272A]">
              {rules.length} Rules
            </span>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">search</span>
            </span>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter rules..."
              className="bg-surface-container text-primary pl-10 pr-space-md py-1.5 rounded-xl text-body-sm border border-[#27272A] focus:outline-none focus:border-primary w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Rules List Container */}
        <div className="bg-surface-container rounded-2xl overflow-hidden divide-y divide-[#27272A] border border-[#27272A]">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-surface-container-high/40 transition-all ${
                !rule.isActive ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0 mt-1 border border-[#27272A]">
                  <span className="material-symbols-outlined">{rule.typeIcon}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-space-sm">
                    <span className="text-body-lg font-semibold text-primary">{rule.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 ${
                        rule.isActive
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          rule.isActive ? 'bg-emerald-400' : 'bg-outline'
                        }`}
                      ></span>
                      {rule.isActive ? 'Live' : 'Paused'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-body-sm text-on-surface-variant">
                    <span className="px-2 py-0.5 rounded bg-surface-container-low font-mono text-xs border border-[#27272A]">
                      WHEN: {rule.when.event}
                    </span>
                    <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-low font-mono text-xs border border-[#27272A]">
                      DO: {rule.do.action}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-space-lg">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-mono text-on-surface-variant uppercase">EXECUTIONS</div>
                  <div className="text-body-md font-bold text-primary font-mono">
                    {rule.executions} runs
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.isActive}
                      onChange={() => toggleRule(rule.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-low peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <button
                    onClick={() => {
                      setToastMsg(`Simulated test run triggered for rule: "${rule.name}"`);
                      setTimeout(() => setToastMsg(null), 3000);
                      setRules((prev) =>
                        prev.map((r) =>
                          r.id === rule.id ? { ...r, executions: r.executions + 1 } : r
                        )
                      );
                    }}
                    title="Run Test"
                    className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-all border border-[#27272A]"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
