import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Hash,
  HardDrive,
  FileText,
  Box as BoxIcon,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileCode,
  Activity,
  Send,
} from 'lucide-react';
import { ActiveView } from './Navigation/Sidebar';

export interface WorkflowPreset {
  id: string;
  title: string;
  description: string;
  toolsUsed: ('slack' | 'gdrive' | 'notion' | 'box' | 'gmail')[];
  userRequest: {
    prompt: string;
    requester: string;
    targetMilestone: string;
    timestamp: string;
  };
  agentReasoning: {
    intent: string;
    decomposedSubtasks: string[];
    selectedManifests: { manifest: string; reason: string }[];
    securityCheck: string;
    confidenceScore: number;
  };
  swytchcodeExecution: {
    commands: {
      tool: string;
      cmd: string;
      status: '200 OK' | 'Success';
      latencyMs: number;
      payloadSummary: string;
    }[];
    totalLatencyMs: number;
    cliStdout: string[];
  };
  analyzedResult: {
    executiveSummary: string;
    verifiedCitations: {
      sourceTag: string;
      detail: string;
    }[];
    extractedActionItems: {
      task: string;
      owner: string;
      deadline: string;
      priority: 'High' | 'Medium' | 'Critical';
    }[];
  };
}

const PRESETS: WorkflowPreset[] = [
  {
    id: 'q3-migration',
    title: 'Cross-Tool Infrastructure Migration Audit',
    description: 'Decomposes engineering chatter, Drive technical specifications, and Notion roadmap tickets.',
    toolsUsed: ['slack', 'gdrive', 'notion'],
    userRequest: {
      prompt: 'Reconcile Q3 infrastructure roadmap commitments across engineering Slack channels, Drive architecture specs, and Notion tickets.',
      requester: 'Marcus Vance (VP Engineering)',
      targetMilestone: 'Sprint 42-48 Migration',
      timestamp: 'Today at 09:30 UTC',
    },
    agentReasoning: {
      intent: 'Multi-tool progress reconciliation and discrepancy detection',
      decomposedSubtasks: [
        'Query Slack #engineering for latest failover benchmarks and sprint blockers',
        'Extract Q3 architectural milestones from Google Drive document v4',
        'Cross-reference Notion database for open roadmap tickets and assignee status',
        'Verify zero hallucinations by matching claims against raw cryptographic timestamps',
      ],
      selectedManifests: [
        { manifest: 'slack', reason: 'Uncover real-time team commitments and blockers' },
        { manifest: 'google-drive', reason: 'Extract baseline architecture milestones' },
        { manifest: 'notion', reason: 'Check ticket status and sprint completion metrics' },
      ],
      securityCheck: 'CMEK Scopes Verified. No raw OAuth tokens passed to LLM layer.',
      confidenceScore: 99.8,
    },
    swytchcodeExecution: {
      commands: [
        {
          tool: 'slack',
          cmd: 'swy exec slack.conversations.history --channel "engineering"',
          status: '200 OK',
          latencyMs: 38,
          payloadSummary: 'Extracted 14 messages. Alex Rivera confirmed replication lag test passed.',
        },
        {
          tool: 'google-drive',
          cmd: 'swy exec google-drive.files.list --query "roadmap"',
          status: '200 OK',
          latencyMs: 64,
          payloadSummary: 'Parsed Q3_Global_Strategy_Roadmap_v4.docx. Confirmed $142k/mo budget cap.',
        },
        {
          tool: 'notion',
          cmd: 'swy exec notion.search --query "q3 roadmap"',
          status: '200 OK',
          latencyMs: 52,
          payloadSummary: 'Retrieved page ntn_page_89124. Sprint 42 milestones marked 85% complete.',
        },
      ],
      totalLatencyMs: 154,
      cliStdout: [
        '[swy daemon] Dispatching Track 2 Autonomous Knowledge Worker (PID 4108)',
        '[swy exec] slack.conversations.history: status=200 duration=38ms size=14kb',
        '[swy exec] google-drive.files.list: status=200 duration=64ms size=4.2mb (chunked)',
        '[swy exec] notion.search: status=200 duration=52ms size=28kb',
        '[swy kms] Tokens validated via AES-256 vault. Source attribution anchors locked.',
      ],
    },
    analyzedResult: {
      executiveSummary: 'All Q3 database failover criteria are met. The replication lag test passed under heavy simulated peak traffic with zero data loss. The budget ceiling ($142,000/mo) is respected.',
      verifiedCitations: [
        {
          sourceTag: '[Source: Swytchcode/Slack #engineering]',
          detail: 'Alex Rivera: "Database replication lag test passed successfully under heavy load simulation. Final instances required by Friday."',
        },
        {
          sourceTag: '[Source: Swytchcode/Google Drive]',
          detail: 'Sarah Jenkins: "Milestone 3 commits 100% of EU/US multi-tenant clusters to automated failover by end of Q3."',
        },
        {
          sourceTag: '[Source: Swytchcode/Notion Workspace]',
          detail: 'Sprint 42 Architecture Ticket: Database sharding milestones validated with 0 regression errors.',
        },
      ],
      extractedActionItems: [
        {
          task: 'Lock in final compute instances for Q3 infrastructure migration',
          owner: 'Alex Rivera (DevOps)',
          deadline: 'Friday EOD',
          priority: 'High',
        },
        {
          task: 'Distribute revised budget figures to Executive Board',
          owner: 'Sarah Jenkins (VP Eng)',
          deadline: 'Monday 09:00',
          priority: 'Medium',
        },
      ],
    },
  },
  {
    id: 'soc2-audit',
    title: 'SOC2 Type II Compliance & Access Review',
    description: 'Autonomous compliance evidence gathering across Box Shield, Notion policies, and Slack audit threads.',
    toolsUsed: ['box', 'notion', 'slack'],
    userRequest: {
      prompt: 'Verify our SOC2 Type II compliance readiness and compile evidence for CMEK key rotation and multi-tenant isolation.',
      requester: 'Elena Rostova (Compliance Officer)',
      targetMilestone: 'Annual SOC2 Type II Audit',
      timestamp: 'Yesterday at 16:45 UTC',
    },
    agentReasoning: {
      intent: 'Security control audit and automated evidence verification',
      decomposedSubtasks: [
        'Query Box Vault for latest external penetration testing reports',
        'Inspect Notion security workspace for CMEK rotation checklist',
        'Verify Slack #security-audits for auditor acknowledgment and sign-offs',
        'Tag every piece of evidence with tamper-proof Swytchcode source hashes',
      ],
      selectedManifests: [
        { manifest: 'box', reason: 'Audit sheets and penetration test results' },
        { manifest: 'notion', reason: 'Policy procedures and rotation proofs' },
        { manifest: 'slack', reason: 'Sign-off discussions and auditor notices' },
      ],
      securityCheck: 'Air-gapped verification. Box Shield classified files kept within tenant perimeter.',
      confidenceScore: 99.6,
    },
    swytchcodeExecution: {
      commands: [
        {
          tool: 'box',
          cmd: 'swy exec box.search --query "audit"',
          status: '200 OK',
          latencyMs: 78,
          payloadSummary: 'Fetched Enterprise_Architecture_Security_Review.xlsx (SOC2 / HIPAA ready)',
        },
        {
          tool: 'notion',
          cmd: 'swy exec notion.search --query "soc2 audit checklist"',
          status: '200 OK',
          latencyMs: 52,
          payloadSummary: 'Retrieved SOC2 checklist. 24 of 24 controls marked Compliant.',
        },
        {
          tool: 'slack',
          cmd: 'swy exec slack.conversations.history --channel "security-audits"',
          status: '200 OK',
          latencyMs: 38,
          payloadSummary: 'External auditor signed off on AWS KMS key rotation schedule.',
        },
      ],
      totalLatencyMs: 168,
      cliStdout: [
        '[swy daemon] Executing SOC2 Type II automated evidence sweep',
        '[swy exec] box.search: status=200 duration=78ms vault=box_991823',
        '[swy exec] notion.search: status=200 duration=52ms controls=24/24',
        '[swy exec] slack.conversations.history: status=200 duration=38ms',
        '✓ Evidence compiled with 100% cryptographic source traceability.',
      ],
    },
    analyzedResult: {
      executiveSummary: 'SOC2 Type II readiness is 100%. All 24 security controls have verified cryptographic evidence. CMEK automated rotation is operational across US and EU VPC clusters.',
      verifiedCitations: [
        {
          sourceTag: '[Source: Swytchcode/Box Vault]',
          detail: 'Box Vault #box_991823: Annual penetration testing showed 0 critical or high vulnerability findings.',
        },
        {
          sourceTag: '[Source: Swytchcode/Notion Workspace]',
          detail: 'Compliance Wiki: CMEK rotation verified on 90-day automated schedule. Access control policies ratified.',
        },
      ],
      extractedActionItems: [
        {
          task: 'Transmit final SOC2 package to external audit partner',
          owner: 'Elena Rostova',
          deadline: 'Thursday EOD',
          priority: 'High',
        },
      ],
    },
  },
  {
    id: 'executive-briefing',
    title: 'Executive Morning Briefing Pipeline',
    description: 'Synthesizes urgent Gmail threads, Slack channel updates, and Drive strategic docs into an executive brief.',
    toolsUsed: ['gmail', 'slack', 'gdrive'],
    userRequest: {
      prompt: 'Synthesize overnight board communications, customer SLA requests, and staging deployment status into an executive briefing.',
      requester: 'Chief Executive Officer',
      targetMilestone: 'Daily Executive Brief',
      timestamp: 'Today at 07:00 UTC',
    },
    agentReasoning: {
      intent: 'Executive triage and high-priority signal extraction',
      decomposedSubtasks: [
        'Scan Gmail inbox for board memos and vendor SLA contract notices',
        'Check Slack #announcements and #engineering for release status',
        'Cross-reference Google Drive executive deck for upcoming board presentations',
      ],
      selectedManifests: [
        { manifest: 'gmail', reason: 'Extract VIP board communications and contract notices' },
        { manifest: 'slack', reason: 'Review critical system alerts and staging status' },
        { manifest: 'google-drive', reason: 'Align with quarterly presentation figures' },
      ],
      securityCheck: 'Strict zero-retention policy for executive correspondence.',
      confidenceScore: 99.4,
    },
    swytchcodeExecution: {
      commands: [
        {
          tool: 'gmail',
          cmd: 'swy exec gmail.messages.list --label "INBOX"',
          status: '200 OK',
          latencyMs: 44,
          payloadSummary: 'Parsed 2 priority messages from Sarah Jenkins and Marcus Vance.',
        },
        {
          tool: 'slack',
          cmd: 'swy exec slack.conversations.history --channel "engineering"',
          status: '200 OK',
          latencyMs: 38,
          payloadSummary: 'Staging dry-run scheduled for 02:00 UTC approved.',
        },
        {
          tool: 'google-drive',
          cmd: 'swy exec google-drive.files.list --query "roadmap"',
          status: '200 OK',
          latencyMs: 64,
          payloadSummary: 'Retrieved Q3 strategy presentation v4.',
        },
      ],
      totalLatencyMs: 146,
      cliStdout: [
        '[swy daemon] Running Executive Morning Briefing Pipeline',
        '[swy exec] gmail.messages.list: 2 VIP messages identified',
        '[swy exec] slack.conversations.history: deployment status green',
        '[swy exec] google-drive.files.list: strategic deck synced',
        '✓ Briefing assembled with strict priority ranking.',
      ],
    },
    analyzedResult: {
      executiveSummary: 'Staging deployment dry-run passed at 02:00 UTC. Globex Enterprise submitted an SLA waiver request for 99.99% uptime with dedicated peering. Revised Q3 infrastructure budget is ready for board review.',
      verifiedCitations: [
        {
          sourceTag: '[Source: Swytchcode/Gmail Thread: Sarah Jenkins]',
          detail: 'Sarah Jenkins: "Attached is the revised financial projection for Q3 roadmap. Please review before board meeting."',
        },
        {
          sourceTag: '[Source: Swytchcode/Gmail Thread: Globex SLA]',
          detail: 'Marcus Vance: "We require contractual guarantees for 99.99% uptime with dedicated VPC peering in ap-northeast-1."',
        },
      ],
      extractedActionItems: [
        {
          task: 'Review Globex 99.99% SLA waiver terms with legal counsel',
          owner: 'Legal / VP Eng',
          deadline: 'Today 15:00 UTC',
          priority: 'Critical',
        },
        {
          task: 'Approve final board presentation deck slides',
          owner: 'CEO',
          deadline: 'Tomorrow 10:00 UTC',
          priority: 'High',
        },
      ],
    },
  },
];

interface WorkflowVisualizerProps {
  onNavigate?: (view: ActiveView) => void;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ onNavigate }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('q3-migration');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(4); // 1, 2, 3, 4 (4 = completed)
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [showCliLogs, setShowCliLogs] = useState(true);

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleRunWorkflow = () => {
    setIsExecuting(true);
    setCurrentStepIndex(1);

    setTimeout(() => {
      setCurrentStepIndex(2);
    }, 700);

    setTimeout(() => {
      setCurrentStepIndex(3);
    }, 1400);

    setTimeout(() => {
      setCurrentStepIndex(4);
      setIsExecuting(false);
    }, 2100);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    handleRunWorkflow();
  };

  const handleCopyCitation = (sourceTag: string, detail: string) => {
    navigator.clipboard.writeText(`${sourceTag} ${detail}`);
    setCopiedCitation(sourceTag);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const getToolIcon = (tool: string) => {
    switch (tool) {
      case 'slack':
        return Hash;
      case 'gdrive':
        return HardDrive;
      case 'notion':
        return FileText;
      case 'box':
        return BoxIcon;
      case 'gmail':
        return Mail;
      default:
        return Layers;
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6 text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              Agentic Pipeline
            </span>
            <span className="text-xs text-zinc-400">Track 2 Multi-Tool Autonomous Worker</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Agentic Workflow Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
            Observe the step-by-step pipeline from natural language prompt through agent reasoning, Swytchcode API invocation, to structured analysis.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleRunWorkflow}
            disabled={isExecuting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition disabled:opacity-50 shadow-sm"
          >
            {isExecuting ? (
              <Activity className="w-3.5 h-3.5 animate-spin text-black" />
            ) : (
              <Play className="w-3.5 h-3.5 text-black" />
            )}
            <span>{isExecuting ? 'Executing Pipeline...' : 'Run Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Preset Workflow Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPresetId(preset.id);
                setCurrentStepIndex(4);
              }}
              className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#18181B] border-blue-500/60 shadow-md'
                  : 'bg-[#141417] hover:bg-[#18181B] border-[#27272A] text-zinc-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
                        : 'bg-[#101014] text-zinc-500 border border-[#27272A]'
                    }`}
                  >
                    Preset {preset.id === 'q3-migration' ? 'A' : preset.id === 'soc2-audit' ? 'B' : 'C'}
                  </span>
                  <div className="flex items-center gap-1">
                    {preset.toolsUsed.map((tool) => {
                      const Icon = getToolIcon(tool);
                      return <Icon key={tool} className="w-3 h-3 text-zinc-400" />;
                    })}
                  </div>
                </div>
                <h3 className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {preset.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 pt-1 border-t border-[#27272A] flex justify-between">
                <span>Tools: {preset.toolsUsed.join(', ')}</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Request Input Bar */}
      <form
        onSubmit={handleCustomSubmit}
        className="p-3 rounded-xl bg-[#141417] border border-[#27272A] flex items-center gap-2"
      >
        <span className="text-xs font-mono text-blue-400 font-semibold pl-2">Query Prompt:</span>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder={`Or type a custom executive prompt (e.g. "Check Slack #engineering for deployment blockers")...`}
          className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={!customPrompt.trim() || isExecuting}
          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-white hover:text-black text-white text-xs font-medium transition flex items-center gap-1.5 disabled:opacity-50"
        >
          <Send className="w-3 h-3" />
          <span>Execute</span>
        </button>
      </form>

      {/* 4-Step Pipeline Flow */}
      <div className="space-y-4">
        {/* STEP 1: User Request */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            currentStepIndex >= 1
              ? 'bg-[#18181B] border-[#27272A] shadow-sm'
              : 'bg-[#101014] border-zinc-800/50 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  currentStepIndex >= 1
                    ? 'bg-blue-950/70 border border-blue-800/60 text-blue-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                01
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">Step 1: User Request</h3>
                  <span className="text-[10px] font-mono text-zinc-400 bg-[#101014] px-2 py-0.5 rounded border border-[#27272A]">
                    Trigger: Executive Query
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Natural language goal provided by knowledge worker</p>
              </div>
            </div>

            <div className="text-right text-xs font-mono text-zinc-400 hidden sm:block">
              <div>{activePreset.userRequest.timestamp}</div>
              <div className="text-zinc-500 text-[11px]">{activePreset.userRequest.requester}</div>
            </div>
          </div>

          <div className="mt-3.5 p-3.5 rounded-lg bg-[#101014] border border-[#27272A] font-mono text-xs text-zinc-200 leading-relaxed">
            <span className="text-blue-400 font-semibold select-none">&gt; </span>
            {customPrompt.trim() ? customPrompt : activePreset.userRequest.prompt}
          </div>
        </div>

        {/* STEP 2: Agent Reasoning */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            currentStepIndex >= 2
              ? 'bg-[#18181B] border-[#27272A] shadow-sm'
              : 'bg-[#101014] border-zinc-800/50 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  currentStepIndex >= 2
                    ? 'bg-amber-950/70 border border-amber-800/60 text-amber-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                02
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">Step 2: Agent Reasoning</h3>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Confidence: {activePreset.agentReasoning.confidenceScore}%
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Autonomous decomposition, sub-goal generation &amp; tool routing</p>
              </div>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
              Zero Hallucinations Verified
            </span>
          </div>

          <div className="mt-3.5 space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold mb-1.5">
                Decomposed Subtasks:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePreset.agentReasoning.decomposedSubtasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#101014] border border-[#27272A] text-xs font-mono text-zinc-300 flex items-start gap-2"
                  >
                    <span className="text-amber-400 font-bold select-none">{idx + 1}.</span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Selected Manifests:</span>
                {activePreset.agentReasoning.selectedManifests.map((m) => (
                  <span
                    key={m.manifest}
                    className="px-2 py-0.5 rounded bg-[#101014] text-zinc-300 border border-[#27272A]"
                  >
                    @{m.manifest}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400">{activePreset.agentReasoning.securityCheck}</span>
            </div>
          </div>
        </div>

        {/* STEP 3: Swytchcode API Execution */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            currentStepIndex >= 3
              ? 'bg-[#18181B] border-[#27272A] shadow-sm'
              : 'bg-[#101014] border-zinc-800/50 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  currentStepIndex >= 3
                    ? 'bg-purple-950/70 border border-purple-800/60 text-purple-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                03
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">Step 3: Swytchcode API Execution</h3>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                    swy exec commands
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Rate-limit handling, token isolation &amp; raw cryptographic stdout retrieval
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">
                Latency: <span className="text-emerald-400">{activePreset.swytchcodeExecution.totalLatencyMs}ms</span>
              </span>
              <button
                onClick={() => setShowCliLogs(!showCliLogs)}
                className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] transition"
              >
                {showCliLogs ? 'Hide Logs' : 'View Logs'}
              </button>
            </div>
          </div>

          <div className="mt-3.5 space-y-3">
            {/* Command Cards */}
            <div className="space-y-2">
              {activePreset.swytchcodeExecution.commands.map((cmdItem, idx) => {
                const Icon = getToolIcon(cmdItem.tool);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#101014] border border-[#27272A] space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-white font-medium">{cmdItem.cmd}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40 text-[10px]">
                          {cmdItem.status}
                        </span>
                        <span className="text-zinc-500 text-[10px]">{cmdItem.latencyMs}ms</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 pl-5 leading-relaxed">{cmdItem.payloadSummary}</p>
                  </div>
                );
              })}
            </div>

            {/* CLI Output Terminal Drawer */}
            {showCliLogs && (
              <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A] font-mono text-xs text-zinc-300 space-y-1">
                <div className="text-[10px] text-zinc-500 pb-1 border-b border-[#27272A] flex justify-between">
                  <span>Swytchcode Terminal Stream (STDOUT)</span>
                  <span>PID 4108 verified</span>
                </div>
                {activePreset.swytchcodeExecution.cliStdout.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className={line.startsWith('✓') ? 'text-emerald-400' : 'text-zinc-400'}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* STEP 4: Analyzed Result */}
        <div
          className={`p-5 rounded-xl border transition-all duration-200 ${
            currentStepIndex >= 4
              ? 'bg-[#18181B] border-[#27272A] shadow-sm'
              : 'bg-[#101014] border-zinc-800/50 opacity-60'
          }`}
        >
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  currentStepIndex >= 4
                    ? 'bg-emerald-950/70 border border-emerald-800/60 text-emerald-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                04
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">Step 4: Analyzed Result</h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Synthesis Ready
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Structured intelligence output with verified source anchors</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('action-board')}
              className="text-xs font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-[#101014] border border-[#27272A] transition flex items-center gap-1"
            >
              <span>View Action Board</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3.5 space-y-4">
            {/* Executive Summary */}
            <div className="p-3.5 rounded-lg bg-[#101014] border border-[#27272A] text-xs sm:text-sm text-zinc-200 leading-relaxed">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold mb-1">
                Executive Synthesis:
              </span>
              {activePreset.analyzedResult.executiveSummary}
            </div>

            {/* Verified Citations List */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                Verified Source Attribution Badges:
              </span>
              {activePreset.analyzedResult.verifiedCitations.map((cite, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3 rounded-lg bg-[#101014] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-1">
                    <span className="inline-block font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 text-[11px]">
                      {cite.sourceTag}
                    </span>
                    <p className="text-zinc-300 font-sans italic">{cite.detail}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCitation(cite.sourceTag, cite.detail)}
                    className="self-start sm:self-center px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono transition flex items-center gap-1 shrink-0"
                  >
                    {copiedCitation === cite.sourceTag ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-zinc-400" />
                    )}
                    <span>{copiedCitation === cite.sourceTag ? 'Copied' : 'Cite'}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Extracted Action Items */}
            {activePreset.analyzedResult.extractedActionItems.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#27272A]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block font-semibold">
                  Extracted Action Items (Auto-Assigned):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activePreset.analyzedResult.extractedActionItems.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-800/30 text-xs flex flex-col justify-between space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-white">{act.task}</span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                            act.priority === 'Critical'
                              ? 'bg-rose-950/60 text-rose-300 border-rose-800/40'
                              : act.priority === 'High'
                              ? 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                              : 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                          }`}
                        >
                          {act.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-[#27272A]/40">
                        <span>Assignee: {act.owner}</span>
                        <span>Due: {act.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
