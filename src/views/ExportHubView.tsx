import React, { useState } from 'react';
import {
  PRECOMPILED_TRACK2_PAYLOADS,
  ACTION_ITEMS_INITIAL,
  EXECUTION_LOGS_INITIAL,
  WORKSPACE_DOCUMENTS_INITIAL,
} from '../data/mockWorkspacePayload';

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
    <div className="flex-1 p-space-xl max-w-5xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              CROSS-PLATFORM DISPATCH
            </span>
            <span className="text-[12px] text-secondary">Export & Migration Center</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">Export Hub</h1>
          <p className="text-secondary text-body-md mt-1">
            Extract executive digests, action item inventories, and raw Track 2 JSON payloads for external systems.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-sm flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Card 1: Track 2 Schema Payload */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between space-y-4 hover:border-zinc-500/50 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-[#27272A] mb-3">
              <span className="material-symbols-outlined text-purple-400 text-[26px]">data_object</span>
            </div>
            <h3 className="font-semibold text-primary text-base">Track 2 Raw JSON Payload</h3>
            <p className="text-xs text-secondary mt-1.5 leading-relaxed">
              Complete strict-schema JSON payload formatted strictly for Track 2 evaluation. Contains query processed, multi-app citations, action items, and knowledge links.
            </p>
          </div>

          <button
            onClick={handleExportTrack2RawJSON}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-primary text-black font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Download Schema JSON
          </button>
        </div>

        {/* Card 2: Action Items CSV */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between space-y-4 hover:border-zinc-500/50 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-[#27272A] mb-3">
              <span className="material-symbols-outlined text-emerald-400 text-[26px]">view_kanban</span>
            </div>
            <h3 className="font-semibold text-primary text-base">Action Items CSV</h3>
            <p className="text-xs text-secondary mt-1.5 leading-relaxed">
              Structured export of detected commitments, deadlines, and task owners across Slack, Gmail, and Notion for import into Jira, Asana, or Linear.
            </p>
          </div>

          <button
            onClick={handleExportActionBoardCSV}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-high border border-[#27272A] text-primary font-semibold text-xs hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">table_chart</span>
            Export Action CSV
          </button>
        </div>

        {/* Card 3: Morning Digest Markdown */}
        <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex flex-col justify-between space-y-4 hover:border-zinc-500/50 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-[#27272A] mb-3">
              <span className="material-symbols-outlined text-blue-400 text-[26px]">wb_sunny</span>
            </div>
            <h3 className="font-semibold text-primary text-base">Executive Digest (Markdown)</h3>
            <p className="text-xs text-secondary mt-1.5 leading-relaxed">
              Consolidated intelligence briefing with overnight Slack activity, urgent C-level Gmail threads, and key roadmap updates formatted in executive Markdown.
            </p>
          </div>

          <button
            onClick={handleExportMorningBriefing}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface-container-high border border-[#27272A] text-primary font-semibold text-xs hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            Export Briefing .md
          </button>
        </div>
      </div>
    </div>
  );
};
