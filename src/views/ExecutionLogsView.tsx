import React, { useState } from 'react';
import { EXECUTION_LOGS_INITIAL } from '../data/mockWorkspacePayload';
import { ExecutionLog } from '../types';
import {
  History,
  Search,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  HardDrive,
  Mail,
  FileText,
  Hash,
  Box as BoxIcon,
  Terminal,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';

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
          l.id === logId
            ? { ...l, status: 'Success', timestamp: 'Just now', latencyMs: Math.floor(Math.random() * 80) + 90 }
            : l
        )
      );
    }, 900);
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack':
        return <Hash className="w-4 h-4 text-blue-400" />;
      case 'Gmail':
        return <Mail className="w-4 h-4 text-emerald-400" />;
      case 'Notion':
        return <FileText className="w-4 h-4 text-purple-400" />;
      case 'Google Drive':
        return <HardDrive className="w-4 h-4 text-blue-400" />;
      case 'Box':
        return <BoxIcon className="w-4 h-4 text-amber-400" />;
      default:
        return <Terminal className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-6 max-w-7xl mx-auto space-y-6 text-zinc-100">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              SOC2 Type II Audit Trail
            </span>
            <span className="text-xs text-zinc-400">Swytchcode Cryptographic Hashes Active</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Execution Logs</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time trace logs of autonomous multi-platform queries, webhook ingestions, and synthesis events.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
                  caller: 'OmniMind Swytchcode Agent',
                  chunksUpdated: 24,
                  sourceApp: 'Google Drive',
                },
              };
              setLogs([newLog, ...logs]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-zinc-700 text-xs text-zinc-200 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Force Re-sync</span>
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search execution ID or description..."
            className="w-full bg-[#101014] text-xs text-white pl-8 pr-3 py-1.5 rounded-lg border border-[#27272A] outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-[#101014] p-1 rounded-lg border border-[#27272A] text-xs">
            {(['ALL', 'Success', 'Failed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  statusFilter === s ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-[#101014] text-xs text-zinc-200 border border-[#27272A] rounded-lg px-2.5 py-1.5 outline-none"
          >
            <option value="ALL">All Sources</option>
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
      <div className="rounded-xl bg-[#18181B] border border-[#27272A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#27272A] bg-[#101014] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Execution ID</th>
                <th className="py-3 px-4">Tool Pipeline</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Latency</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A] font-mono">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-[#141418] transition cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] ${
                        log.status === 'Success'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
                      }`}
                    >
                      {log.status === 'Success' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-semibold">{log.execId}</td>
                  <td className="py-3 px-4 text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      {getSourceIcon(log.source)}
                      <span className="font-sans font-medium">{log.source}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-200 font-sans max-w-xs truncate">
                    {log.description}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-zinc-400">
                    {log.latencyMs}ms
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-500 font-sans">{log.timestamp}</td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    {log.status === 'Failed' ? (
                      <button
                        onClick={() => handleRetry(log.id)}
                        disabled={isRetrying === log.id}
                        className="text-xs text-blue-400 hover:text-blue-300 transition"
                      >
                        {isRetrying === log.id ? 'Retrying...' : 'Retry'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-xs text-zinc-400 hover:text-white transition"
                      >
                        Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#18181B] border border-[#27272A] rounded-xl p-5 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-sm">{selectedLog.execId}</span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Pipeline Source:</span>
                <span className="text-white">{selectedLog.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Latency:</span>
                <span className="text-emerald-400">{selectedLog.latencyMs}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Timestamp:</span>
                <span className="text-zinc-300">{selectedLog.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Status:</span>
                <span className="text-emerald-400">{selectedLog.status}</span>
              </div>
            </div>

            <div className="p-3 bg-[#101014] rounded-lg border border-[#27272A] space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase">Payload Details</span>
              <pre className="text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
                {JSON.stringify(selectedLog.details || {}, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-zinc-800 text-white text-xs hover:bg-zinc-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
