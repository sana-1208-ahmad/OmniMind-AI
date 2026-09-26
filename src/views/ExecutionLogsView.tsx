import React, { useState } from 'react';
import { EXECUTION_LOGS_INITIAL } from '../data/mockWorkspacePayload';
import { ExecutionLog } from '../types';

export const ExecutionLogsView: React.FC = () => {
  const [logs, setLogs] = useState<ExecutionLog[]>(EXECUTION_LOGS_INITIAL);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Success' | 'Failed' | 'Pending'>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<ExecutionLog | null>(null);
  const [isRetrying, setIsRetrying] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.execId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || log.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleRetry = (logId: string) => {
    setIsRetrying(logId);
    setTimeout(() => {
      setIsRetrying(null);
      setLogs((prev) =>
        prev.map((l) =>
          l.id === logId ? { ...l, status: 'Success', timestamp: 'Just now', latencyMs: Math.floor(Math.random() * 80) + 90 } : l
        )
      );
    }, 900);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack':
        return 'tag';
      case 'Gmail':
        return 'mail';
      case 'Notion':
        return 'description';
      case 'Google Drive':
        return 'folder_shared';
      case 'Box':
        return 'inventory_2';
      case 'GitHub':
        return 'terminal';
      default:
        return 'hub';
    }
  };

  return (
    <div className="flex-1 p-space-xl max-w-7xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              AUDIT TRAIL & TELEMETRY
            </span>
            <span className="text-[12px] text-secondary">Track 2 Compliance Active</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">Execution Logs</h1>
          <p className="text-secondary text-body-md mt-1">
            Real-time trace logs of autonomous multi-platform queries, webhook ingestions, and synthesis events.
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => {
              const newLog: ExecutionLog = {
                id: `log-${Date.now()}`,
                typeIcon: 'bolt',
                description: 'Autonomous cache warm & vector re-index',
                execId: `exec_${Math.random().toString(16).substring(2, 10)}`,
                source: 'Google Drive',
                timestamp: 'Just now',
                status: 'Success',
                latencyMs: 118,
                details: {
                  caller: 'OmniMind Autonomous Cron',
                  chunksUpdated: 24,
                  sourceApp: 'Google Drive',
                },
              };
              setLogs([newLog, ...logs]);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high border border-[#27272A] text-sm text-primary hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Force Re-sync
          </button>
          <button
            onClick={() => {
              const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', dataStr);
              downloadAnchor.setAttribute('download', `omnimind-execution-logs-${new Date().toISOString().slice(0, 10)}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high border border-[#27272A] text-sm text-primary hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Export Audit JSON
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary text-xs font-mono uppercase">
            <span>Total Executions</span>
            <span className="material-symbols-outlined text-[18px] text-emerald-400">trending_up</span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-primary">14,291</span>
            <span className="ml-2 text-xs text-emerald-400">+12% today</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary text-xs font-mono uppercase">
            <span>Success Rate</span>
            <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-emerald-400">99.82%</span>
            <span className="ml-2 text-xs text-secondary">0.18% failover</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary text-xs font-mono uppercase">
            <span>Avg Pipeline Latency</span>
            <span className="material-symbols-outlined text-[18px] text-blue-400">speed</span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-primary">142ms</span>
            <span className="ml-2 text-xs text-emerald-400">-18ms p95</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary text-xs font-mono uppercase">
            <span>Active Triggers</span>
            <span className="material-symbols-outlined text-[18px] text-purple-400">bolt</span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-primary">18</span>
            <span className="ml-2 text-xs text-secondary">Across 5 Apps</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low border border-[#27272A]/70">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by execution ID, task name, or payload keyword..."
            className="w-full bg-surface-container-lowest border border-[#27272A] rounded-lg pl-9 pr-4 py-2 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Status Filter */}
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg border border-[#27272A]">
            {(['ALL', 'Success', 'Failed', 'Pending'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Source Dropdown */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-surface-container-lowest border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-primary focus:outline-none"
          >
            <option value="ALL">All Sources (5)</option>
            <option value="Slack">Slack</option>
            <option value="Gmail">Gmail</option>
            <option value="Google Drive">Google Drive</option>
            <option value="Notion">Notion</option>
            <option value="Box">Box</option>
            <option value="GitHub">GitHub</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-xl border border-[#27272A]/70 bg-surface-container-low overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] bg-surface-container-lowest/60 text-secondary text-xs uppercase font-mono tracking-wider">
                <th className="py-3 px-4">Event & Description</th>
                <th className="py-3 px-4">Execution ID</th>
                <th className="py-3 px-4">Source Platform</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-secondary">
                    <span className="material-symbols-outlined text-[36px] mb-2 block text-secondary/50">
                      find_in_page
                    </span>
                    No execution logs match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-surface-container/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A] text-secondary group-hover:text-primary">
                          <span className="material-symbols-outlined text-[18px]">{log.typeIcon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-primary text-sm line-clamp-1">{log.description}</p>
                          <p className="text-xs text-secondary font-mono mt-0.5">
                            {log.details?.origin || 'Autonomous trigger dispatcher'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-secondary">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-[#27272A]">
                        {log.execId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs font-medium border border-[#27272A]">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {getSourceIcon(log.source)}
                        </span>
                        <span>{log.source}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className={log.latencyMs > 300 ? 'text-amber-400' : 'text-emerald-400'}>
                        {log.latencyMs}ms
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{log.status}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-secondary font-mono">{log.timestamp}</td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="px-2.5 py-1 rounded text-xs bg-surface-container-high hover:bg-[#27272A] border border-[#27272A] text-secondary hover:text-primary transition-colors"
                        >
                          Payload
                        </button>
                        <button
                          disabled={isRetrying === log.id}
                          onClick={() => handleRetry(log.id)}
                          title="Re-run pipeline"
                          className="w-7 h-7 rounded flex items-center justify-center bg-surface-container hover:bg-[#27272A] border border-[#27272A] text-secondary hover:text-primary transition-colors disabled:opacity-50"
                        >
                          <span
                            className={`material-symbols-outlined text-[15px] ${
                              isRetrying === log.id ? 'animate-spin text-emerald-400' : ''
                            }`}
                          >
                            refresh
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Log Trace Modal / Drawer */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container border border-[#27272A] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center border border-[#27272A]">
                  <span className="material-symbols-outlined text-primary text-[20px]">{selectedLog.typeIcon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-base">Execution Trace: {selectedLog.execId}</h3>
                  <p className="text-xs text-secondary font-mono">
                    {selectedLog.source} • Latency {selectedLog.latencyMs}ms • {selectedLog.timestamp}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-[#27272A] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-1">
                  Task Summary
                </label>
                <p className="text-sm text-primary bg-surface-container-lowest p-3 rounded-lg border border-[#27272A]">
                  {selectedLog.description}
                </p>
              </div>

              {/* Latency Waterfall */}
              <div>
                <label className="text-xs uppercase font-mono text-secondary tracking-wider block mb-2">
                  Latency Breakdown (OmniMind Engine)
                </label>
                <div className="space-y-2 bg-surface-container-lowest p-3 rounded-lg border border-[#27272A]">
                  <div>
                    <div className="flex justify-between text-xs text-secondary mb-1">
                      <span>Multi-App Workspace Ingest (Slack, Drive, Notion)</span>
                      <span className="font-mono">{Math.floor(selectedLog.latencyMs * 0.45)}ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-secondary mb-1">
                      <span>Track 2 Schema Formulation & Strict Validation</span>
                      <span className="font-mono">{Math.floor(selectedLog.latencyMs * 0.35)}ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-secondary mb-1">
                      <span>Cross-Platform Dispatch & Vector Index Sync</span>
                      <span className="font-mono">{Math.floor(selectedLog.latencyMs * 0.2)}ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs uppercase font-mono text-secondary tracking-wider">
                    Raw Telemetry & Execution JSON
                  </label>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2));
                    }}
                    className="text-xs text-secondary hover:text-primary flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    Copy JSON
                  </button>
                </div>
                <pre className="text-xs font-mono p-3 rounded-lg bg-surface-container-lowest border border-[#27272A] text-zinc-300 overflow-x-auto max-h-60">
                  {JSON.stringify(
                    {
                      status: 'success',
                      executionId: selectedLog.execId,
                      queryProcessed: selectedLog.description,
                      sourceApp: selectedLog.source,
                      metrics: {
                        latencyMs: selectedLog.latencyMs,
                        timestamp: selectedLog.timestamp,
                        complianceTrack: 'Track 2 Autonomous Enterprise Knowledge Worker',
                      },
                      details: selectedLog.details,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#27272A] flex justify-end gap-2 bg-surface-container-lowest">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-lg bg-surface-container border border-[#27272A] text-sm text-secondary hover:text-primary transition-colors"
              >
                Close Trace
              </button>
              <button
                onClick={() => {
                  handleRetry(selectedLog.id);
                  setSelectedLog(null);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Re-dispatch Execution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
