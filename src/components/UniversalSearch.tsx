import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Hash,
  HardDrive,
  FileText,
  Box as BoxIcon,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  CheckSquare,
  CornerDownRight,
  Database,
  Layers,
} from 'lucide-react';
import { ActiveView } from './Navigation/Sidebar';

export interface SearchResultItem {
  id: string;
  sourceTool: 'slack' | 'gdrive' | 'notion' | 'box' | 'gmail';
  sourceTag: string;
  title: string;
  author: string;
  timestamp: string;
  summary: string;
  snippet: string;
  confidence: number;
  tags: string[];
  manifestCommand: string;
  latencyMs: number;
  extractedAction?: string;
  metadata: Record<string, string>;
}

const SAMPLE_SEARCH_RESULTS: SearchResultItem[] = [
  {
    id: 'res-slack-1',
    sourceTool: 'slack',
    sourceTag: '[Source: Swytchcode/Slack #engineering]',
    title: 'Q3 Infrastructure Migration & Database Failover Discussion',
    author: 'Alex Rivera (DevOps Lead)',
    timestamp: 'Today at 14:20 UTC',
    summary: 'Confirmed multi-region database failover passed peak simulated load with 0 data loss. Final instance lock-in required by Friday.',
    snippet: '"We need to lock in the final instances for the Q3 roadmap infrastructure migration by Friday. The database replication lag test passed successfully under heavy load simulation."',
    confidence: 99.8,
    tags: ['#engineering', '#q3-migration', '#database'],
    manifestCommand: 'swy exec slack.conversations.history --channel "engineering"',
    latencyMs: 38,
    extractedAction: 'Lock in final instances for Q3 infrastructure migration by Friday (Assignee: Alex Rivera)',
    metadata: {
      Channel: '#engineering',
      Workspace: 'acme-corp.slack.com',
      Replies: '14 thread replies',
    },
  },
  {
    id: 'res-gdrive-1',
    sourceTool: 'gdrive',
    sourceTag: '[Source: Swytchcode/Google Drive]',
    title: 'Q3_Global_Strategy_Roadmap_v4.docx',
    author: 'Sarah Jenkins (VP Engineering)',
    timestamp: 'Yesterday at 16:20 UTC',
    summary: 'Quarterly cloud migration targets, cost allocations, and cross-functional team deliverables for Sprint 42-48.',
    snippet: '"Milestone 3 commits 100% of EU/US multi-tenant clusters to automated failover by end of Q3. Budget ceiling allocated at $142,000/mo post-consolidation."',
    confidence: 99.4,
    tags: ['#q3-roadmap', '#cloud-budget', '#strategy'],
    manifestCommand: 'swy exec google-drive.files.list --query "roadmap"',
    latencyMs: 64,
    extractedAction: 'Review multi-region failover provisions before the board meeting (Assignee: Executive Staff)',
    metadata: {
      Format: 'Google Docs',
      Folder: 'Executive / Engineering Architecture',
      Size: '4.2 MB',
    },
  },
  {
    id: 'res-notion-1',
    sourceTool: 'notion',
    sourceTag: '[Source: Swytchcode/Notion Workspace]',
    title: 'SOC2 Type II Audit Compliance Checklist & Access Review',
    author: 'Elena Rostova (Compliance Officer)',
    timestamp: '2 days ago',
    summary: 'Comprehensive list of security controls, CMEK key rotation proofs, and automated VPC audit evidence ready for auditor sign-off.',
    snippet: '"Encryption keys verified with CMEK automated rotation. Audit sign-off requested before Friday EOD to clear Q3 compliance gate."',
    confidence: 99.6,
    tags: ['#compliance', '#soc2', '#security'],
    manifestCommand: 'swy exec notion.search --query "q3 roadmap"',
    latencyMs: 52,
    extractedAction: 'Complete auditor sign-off for CMEK rotation before Friday EOD (Assignee: Security Lead)',
    metadata: {
      Database: 'Acme Security & Governance Wiki',
      Status: 'Under Review',
      LastEditedBy: 'Elena Rostova',
    },
  },
  {
    id: 'res-gmail-1',
    sourceTool: 'gmail',
    sourceTag: '[Source: Swytchcode/Gmail Thread: Sarah Jenkins]',
    title: 'RE: Executive Briefing: Q3 Roadmap & Cloud Migration Budget',
    author: 'Sarah Jenkins <sjenkins@acmecorp.com>',
    timestamp: 'Today at 07:15 UTC',
    summary: 'Updated financial forecast for Q3 multi-region failover deployment with revised AWS/GCP blended expenditure.',
    snippet: '"Attached is the revised financial projection for the upcoming Q3 roadmap infrastructure migration. Please review the multi-region failover provisions before the board meeting."',
    confidence: 99.1,
    tags: ['#board-briefing', '#budget', '#urgent'],
    manifestCommand: 'swy exec gmail.messages.list --label "INBOX"',
    latencyMs: 44,
    extractedAction: 'Prepare revised budget slides for board presentation on Monday',
    metadata: {
      ThreadID: 'th_008129',
      Priority: 'High',
      Recipients: 'Executive Staff',
    },
  },
  {
    id: 'res-box-1',
    sourceTool: 'box',
    sourceTag: '[Source: Swytchcode/Box Vault]',
    title: 'Enterprise_Architecture_Security_Review.xlsx',
    author: 'Compliance Officer (Box Vault)',
    timestamp: '3 days ago',
    summary: 'Annual penetration testing reports, external vulnerability assessments, and VPC peering isolation proofs.',
    snippet: '"All production endpoints verified zero critical findings. Multi-tenant isolation verified compliant with HIPAA and SOC2 standards."',
    confidence: 98.9,
    tags: ['#security', '#audit', '#box-vault'],
    manifestCommand: 'swy exec box.search --query "audit"',
    latencyMs: 78,
    metadata: {
      VaultID: 'box_991823',
      Classification: 'Confidential / SOC2 Type II',
      Storage: 'Box Shield Vault',
    },
  },
];

interface UniversalSearchProps {
  onNavigate?: (view: ActiveView) => void;
  initialQuery?: string;
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({
  onNavigate,
  initialQuery = 'q3 roadmap infrastructure migration',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionAddedId, setActionAddedId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const queryPresets = [
    'q3 roadmap infrastructure migration',
    'soc2 compliance audit checklist',
    'executive board briefing budget',
    'enterprise SLA waivers & VPC peering',
  ];

  const toolsList = [
    { id: 'all', label: 'All Connected Tools', count: 5, icon: Database },
    { id: 'slack', label: 'Slack', count: 1, icon: Hash },
    { id: 'gdrive', label: 'Google Drive', count: 1, icon: HardDrive },
    { id: 'notion', label: 'Notion', count: 1, icon: FileText },
    { id: 'box', label: 'Box Vault', count: 1, icon: BoxIcon },
    { id: 'gmail', label: 'Gmail', count: 1, icon: Mail },
  ];

  const handlePresetClick = (preset: string) => {
    setQuery(preset);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleCopyCitation = (item: SearchResultItem) => {
    const citation = `${item.sourceTag} "${item.title}" — ${item.summary} (Verified via Swytchcode)`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddToActionBoard = (item: SearchResultItem) => {
    setActionAddedId(item.id);
    setTimeout(() => setActionAddedId(null), 2500);
  };

  const filteredResults = useMemo(() => {
    return SAMPLE_SEARCH_RESULTS.filter((item) => {
      const matchesTool = selectedTool === 'all' || item.sourceTool === selectedTool;
      if (!query.trim()) return matchesTool;
      const q = query.toLowerCase();
      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.sourceTag.toLowerCase().includes(q);
      return matchesTool && matchesText;
    });
  }, [query, selectedTool]);

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
        return Database;
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6 text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              Command Center
            </span>
            <span className="text-xs text-zinc-400">Track 2 Multi-Tool Universal Search</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Universal Knowledge Search
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
            Query across Slack discussions, Google Drive documents, Notion databases, Box vaults, and Gmail threads with verified source attribution.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>5 Tools Indexed (0 Hallucinations)</span>
          </div>
        </div>
      </div>

      {/* Main Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center bg-[#18181B] border border-[#27272A] focus-within:border-zinc-500 rounded-xl transition shadow-lg overflow-hidden">
          <div className="pl-4 pr-2 text-zinc-400">
            <Search className="w-5 h-5 text-zinc-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all 5 tools (e.g. Q3 roadmap, SOC2 audit, budget)..."
            className="w-full py-3.5 pr-28 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="px-2 py-1 text-xs text-zinc-500 hover:text-zinc-300 font-mono transition"
            >
              Clear
            </button>
          )}
          <div className="pr-3 pl-1 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 border-l border-[#27272A]">
            <kbd className="px-1.5 py-0.5 rounded bg-[#101014] border border-[#27272A] text-zinc-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Quick Query Preset Chips */}
        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Suggested:</span>
          </span>
          {queryPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className={`text-xs px-2.5 py-1 rounded-md border font-mono transition ${
                query === preset
                  ? 'bg-blue-950/60 border-blue-800/60 text-blue-300'
                  : 'bg-[#18181B] hover:bg-zinc-800 border-[#27272A] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#27272A]">
        {toolsList.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-[#18181B] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#27272A]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tool.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-zinc-200 text-zinc-900' : 'bg-[#101014] text-zinc-500'
                }`}
              >
                {tool.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span>Found {filteredResults.length} verified records across Swytchcode pipelines</span>
          {isSearching && (
            <span className="text-blue-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>Re-indexing...</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-zinc-500">Avg Latency: 48ms</span>
          <span className="text-emerald-400">SOC2 Type II Encrypted</span>
        </div>
      </div>

      {/* Search Results Feed */}
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => {
            const ToolIcon = getToolIcon(item.sourceTool);
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-zinc-700 transition shadow-sm space-y-3.5 group"
              >
                {/* Source Attribution Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#27272A]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#101014] border border-[#27272A] flex items-center justify-center text-white">
                      <ToolIcon className="w-3.5 h-3.5" />
                    </div>
                    {/* Exact Source Badge as requested */}
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {item.sourceTag}
                    </span>
                    <span className="text-xs text-zinc-400">•</span>
                    <span className="text-xs text-zinc-400">{item.author}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{item.timestamp}</span>
                    <span className="text-emerald-400 font-medium">({item.latencyMs}ms)</span>
                  </div>
                </div>

                {/* Content Title & Summary */}
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Verified Snippet Box */}
                <div className="p-3 rounded-lg bg-[#101014] border border-[#27272A] text-xs font-mono text-zinc-300 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-1 border-b border-[#27272A]">
                    <span className="flex items-center gap-1.5">
                      <CornerDownRight className="w-3 h-3 text-emerald-400" />
                      <span>Indexed Raw Content Excerpt:</span>
                    </span>
                    <span className="text-zinc-500">{item.manifestCommand}</span>
                  </div>
                  <p className="italic text-zinc-300 pt-1 leading-relaxed">{item.snippet}</p>
                </div>

                {/* Auto-extracted Action Item (if present) */}
                {item.extractedAction && (
                  <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-800/30 flex items-start gap-2.5">
                    <CheckSquare className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-blue-300 uppercase tracking-wide font-semibold">
                          Extracted Action Item
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">Auto-Assigned</span>
                      </div>
                      <p className="text-xs text-zinc-200 mt-0.5">{item.extractedAction}</p>
                    </div>
                  </div>
                )}

                {/* Metadata & Tag Pill Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {Object.entries(item.metadata).map(([key, val]) => (
                      <span
                        key={key}
                        className="text-[11px] font-mono text-zinc-500 hidden sm:inline"
                      >
                        {key}: <span className="text-zinc-400">{val}</span> •
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCitation(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#101014] hover:bg-zinc-800 border border-[#27272A] text-xs font-medium text-zinc-300 hover:text-white transition flex items-center gap-1.5"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>

                    {item.extractedAction && onNavigate && (
                      <button
                        onClick={() => {
                          handleAddToActionBoard(item);
                          setTimeout(() => onNavigate('action-board'), 600);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition flex items-center gap-1.5"
                      >
                        {actionAddedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Added to Board</span>
                          </>
                        ) : (
                          <>
                            <CheckSquare className="w-3.5 h-3.5 text-black" />
                            <span>Add to Action Board</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 rounded-xl bg-[#18181B] border border-[#27272A] text-center space-y-3">
            <Search className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No matching knowledge records</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              No results match "{query}". Try checking your active Swytchcode filters or execute a sync in the Integration Hub.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedTool('all');
              }}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white font-medium transition"
            >
              Reset Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
