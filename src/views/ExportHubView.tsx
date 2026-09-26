import React, { useState } from 'react';
import {
  PRECOMPILED_TRACK2_PAYLOADS,
  ACTION_ITEMS_INITIAL,
  EXECUTION_LOGS_INITIAL,
  WORKSPACE_DOCUMENTS_INITIAL,
} from '../data/mockWorkspacePayload';
import {
  FileCode,
  CheckCircle2,
  Download,
  Table,
  FileText,
  Sun,
} from 'lucide-react';

export const ExportHubView: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Exported ${filename} successfully!`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleExportMorningBriefing = () => {
    const mdContent = `# OmniMind AI — Workspace Executive Digest
Generated: ${new Date().toLocaleDateString()}
Target: Executive Leadership & Cross-Functional Team

## Executive Intelligence Synthesis
Cross-platform synchronization indicates unanimous readiness across Slack #eng-core, Google Drive Q3 roadmap deliverables, and Notion sprint tickets.

### Urgent Ingestion Items (Gmail)
- **Q3 Security Compliance Sign-off Needed** — Sarah Jenkins (VP Eng)
  - Action: Review SOC2 audit before Friday EOD.

### Overnight Highlights (Slack #engineering)
- DB Connection pooling latency resolved by Alex M.
- Vector re-indexing pipeline speed improved by 28%.

### Key Document Updates
- Q3_Global_Strategy_Roadmap_v4.docx (Google Drive) — Fully Indexed
- Enterprise_Architecture_Security_Review.xlsx (Box) — Fully Indexed

---
Compliant with OmniMind Track 2 Autonomous Enterprise Knowledge Worker standards.
`;
    downloadFile(`omnimind-executive-briefing-${Date.now()}.md`, mdContent, 'text/markdown');
  };

  const handleExportActionBoardCSV = () => {
    let csv = 'ID,Task,SourceApp,Priority,Assignee,Status\n';
    ACTION_ITEMS_INITIAL.forEach((item) => {
      csv += `"${item.id || item.code}","${item.task.replace(/"/g, '""')}","${item.sourceApp}","${item.priority}","${item.assignee || 'Unassigned'}","${item.status || 'todo'}"\n`;
    });
    downloadFile(`omnimind-action-items-${Date.now()}.csv`, csv, 'text/csv');
  };

  const handleExportTrack2RawJSON = () => {
    const rawTrack2Payload = {
      complianceTrack: 'Track 2 Autonomous Enterprise Knowledge Worker',
      exportedAt: new Date().toISOString(),
      connectedWorkspaces: ['Gmail', 'Google Drive', 'Notion', 'Box', 'Slack'],
      schemaVersion: '2.0.0-strict',
      sampleOutputs: PRECOMPILED_TRACK2_PAYLOADS,
      documentsIndexed: WORKSPACE_DOCUMENTS_INITIAL,
      actionBoard: ACTION_ITEMS_INITIAL,
      telemetry: EXECUTION_LOGS_INITIAL,
    };
    downloadFile(
      `omnimind-track2-enterprise-payload-${Date.now()}.json`,
      JSON.stringify(rawTrack2Payload, null, 2),
      'application/json'
    );
  };

  return (
    <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto space-y-6 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              CROSS-PLATFORM DISPATCH
            </span>
            <span className="text-xs text-zinc-400">Export & Migration Center</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Export Hub</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Extract executive digests, action item inventories, and raw Track 2 JSON payloads for external systems.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Track 2 Schema Payload */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4 hover:border-zinc-600 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center border border-[#27272A] mb-3">
              <FileCode className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Track 2 Raw JSON Payload</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Complete strict-schema JSON payload formatted strictly for Track 2 evaluation. Contains query processed, multi-app citations, action items, and knowledge links.
            </p>
          </div>

          <button
            onClick={handleExportTrack2RawJSON}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            Download Schema JSON
          </button>
        </div>

        {/* Card 2: Action Items CSV */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4 hover:border-zinc-600 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center border border-[#27272A] mb-3">
              <Table className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Action Items CSV</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Structured export of detected commitments, deadlines, and task owners across Slack, Gmail, and Notion for import into Jira, Asana, or Linear.
            </p>
          </div>

          <button
            onClick={handleExportActionBoardCSV}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#101014] border border-[#27272A] text-zinc-200 font-semibold text-xs hover:bg-zinc-800 hover:text-white transition"
          >
            <Table className="w-3.5 h-3.5 text-zinc-400" />
            Export Action CSV
          </button>
        </div>

        {/* Card 3: Morning Digest Markdown */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4 hover:border-zinc-600 transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#101014] flex items-center justify-center border border-[#27272A] mb-3">
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-semibold text-white text-sm">Executive Digest (Markdown)</h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Consolidated intelligence briefing with overnight Slack activity, urgent C-level Gmail threads, and key roadmap updates formatted in executive Markdown.
            </p>
          </div>

          <button
            onClick={handleExportMorningBriefing}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#101014] border border-[#27272A] text-zinc-200 font-semibold text-xs hover:bg-zinc-800 hover:text-white transition"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            Export Briefing .md
          </button>
        </div>
      </div>
    </div>
  );
};
