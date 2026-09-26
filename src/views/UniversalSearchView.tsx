import React, { useState, useEffect } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { ContextDetailModal } from '../components/Modals/ContextDetailModal';
import { executeOmniMindQuery } from '../services/omniMindEngine';
import { OmniMindResponseSchema } from '../types';
import {
  Search,
  Hash,
  Mail,
  HardDrive,
  FileText,
  Box as BoxIcon,
  Check,
  Copy,
  Code2,
  SlidersHorizontal,
  Eye,
  MessageSquare,
  Paperclip,
  Shield,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Bot,
  CheckCircle2,
} from 'lucide-react';

interface UniversalSearchViewProps {
  initialQuery?: string;
  onNavigate: (view: ActiveView) => void;
}

export const UniversalSearchView: React.FC<UniversalSearchViewProps> = ({
  initialQuery = 'q3 roadmap infrastructure migration',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'slack' | 'drive' | 'notion' | 'box' | 'gmail'>('all');
  const [timeRange, setTimeRange] = useState('any');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([
    'Sarah Jenkins (Lead)',
    'Alex Rivera (DevOps)',
  ]);
  const [tags, setTags] = useState(['#engineering', '#q3-migration']);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [page, setPage] = useState(1);

  // Context Viewer Modal
  const [contextItem, setContextItem] = useState<{
    isOpen: boolean;
    title: string;
    sourceApp: string;
    author: string;
    timestamp: string;
    snippet: string;
  } | null>(null);

  // Track 2 Autonomous Synthesis State
  const [autonomousResult, setAutonomousResult] = useState<OmniMindResponseSchema | null>(null);
  const [loadingSynthesis, setLoadingSynthesis] = useState(false);
  const [showJsonSchema, setShowJsonSchema] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    runAutonomousSynthesis(initialQuery);
  }, [initialQuery]);

  async function runAutonomousSynthesis(q: string) {
    setLoadingSynthesis(true);
    try {
      const res = await executeOmniMindQuery(q);
      setAutonomousResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSynthesis(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    runAutonomousSynthesis(query.trim());
  }

  function toggleAuthor(author: string) {
    setSelectedAuthors((prev) =>
      prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
    );
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleAddTagSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTagInput.trim()) {
      setIsAddingTag(false);
      return;
    }
    const cleanTag = newTagInput.trim().startsWith('#') ? newTagInput.trim() : `#${newTagInput.trim()}`;
    if (!tags.includes(cleanTag)) {
      setTags((prev) => [...prev, cleanTag]);
    }
    setNewTagInput('');
    setIsAddingTag(false);
  }

  function copyRawJson() {
    if (!autonomousResult) return;
    navigator.clipboard.writeText(JSON.stringify(autonomousResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-12 text-zinc-100">
      {/* Context Viewer Modal */}
      {contextItem && (
        <ContextDetailModal
          isOpen={contextItem.isOpen}
          onClose={() => setContextItem(null)}
          title={contextItem.title}
          sourceApp={contextItem.sourceApp}
          author={contextItem.author}
          timestamp={contextItem.timestamp}
          contentSnippet={contextItem.snippet}
          tags={tags}
        />
      )}

      {/* Top Header & Search Input */}
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 border-b border-[#27272A] bg-[#09090B]">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
                Swytchcode 5-Tool Engine
              </span>
              <span className="text-xs text-zinc-400">Track 2 Multi-App Reasoning</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Universal Multi-App Search
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across Slack, Drive, Notion, Box, Gmail..."
                className="w-full bg-[#18181B] pl-9 pr-3 py-2 rounded-lg text-white border border-[#27272A] focus:outline-none focus:border-zinc-500 text-xs sm:text-sm font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={loadingSynthesis}
              className="px-4 py-2 bg-white text-zinc-950 font-medium rounded-lg text-xs hover:bg-zinc-200 transition flex items-center gap-1.5 shrink-0 disabled:opacity-50"
            >
              {loadingSynthesis ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesize</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Filter Segmented Controls */}
        <div className="flex items-center justify-between overflow-x-auto pt-4 gap-4">
          <div className="flex items-center gap-1 p-1 bg-[#18181B] rounded-lg border border-[#27272A] shrink-0 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All (14)
            </button>
            <button
              onClick={() => setActiveTab('slack')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'slack'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-zinc-400" />
              <span>Slack (6)</span>
            </button>
            <button
              onClick={() => setActiveTab('drive')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'drive'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
              <span>Drive (2)</span>
            </button>
            <button
              onClick={() => setActiveTab('notion')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'notion'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Notion (2)</span>
            </button>
            <button
              onClick={() => setActiveTab('box')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'box'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BoxIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>Box (2)</span>
            </button>
            <button
              onClick={() => setActiveTab('gmail')}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${
                activeTab === 'gmail'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>Gmail (2)</span>
            </button>
          </div>

          <button
            onClick={() => setShowJsonSchema(!showJsonSchema)}
            className="px-3 py-1.5 bg-[#18181B] hover:bg-zinc-800 rounded-lg text-zinc-300 font-mono text-xs border border-[#27272A] flex items-center gap-1.5 transition shrink-0"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{showJsonSchema ? 'Hide Schema' : 'Inspect JSON Schema'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Filters & Search Content */}
      <div className="grid grid-cols-12 gap-5 px-4 sm:px-6 md:px-8 pt-5">
        {/* Mobile Filter Toggle */}
        <div className="col-span-12 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs font-mono text-white"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
              <span>Filter Options</span>
            </span>
            <span className="text-zinc-400 text-xs">
              {mobileFiltersOpen ? 'Collapse' : 'Expand'}
            </span>
          </button>
        </div>

        {/* Left Column: Filters */}
        <div className={`col-span-12 lg:col-span-3 ${mobileFiltersOpen ? 'flex' : 'hidden lg:flex'} flex-col gap-4`}>
          <div className="bg-[#18181B] rounded-xl p-4 flex flex-col gap-4 border border-[#27272A]">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
              <span className="text-xs font-semibold text-white">Search Filters</span>
              <button
                onClick={() => {
                  setTimeRange('any');
                  setSelectedAuthors(['Sarah Jenkins (Lead)', 'Alex Rivera (DevOps)']);
                }}
                className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition"
              >
                Reset
              </button>
            </div>

            {/* Time Horizon */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                Time Horizon
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-[#101014] text-xs text-zinc-200 border border-[#27272A] rounded-lg px-2.5 py-1.5 outline-none focus:border-zinc-500"
              >
                <option value="any">Any Time</option>
                <option value="24h">Past 24 Hours</option>
                <option value="7d">Past 7 Days</option>
                <option value="30d">Past 30 Days</option>
                <option value="q3">Q3 Fiscal Cycle</option>
              </select>
            </div>

            {/* Author / Sender */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#27272A]">
              <label className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                Key Authors &amp; Senders
              </label>
              <div className="flex flex-col gap-1">
                {['Sarah Jenkins (Lead)', 'Alex Rivera (DevOps)', 'Elena Rostova (Product)'].map((author) => (
                  <label
                    key={author}
                    className="flex items-center gap-2 p-1.5 rounded hover:bg-zinc-800/60 cursor-pointer transition text-xs text-zinc-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAuthors.includes(author)}
                      onChange={() => toggleAuthor(author)}
                      className="accent-zinc-100 rounded"
                    />
                    <span>{author}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags & Categories */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#27272A]">
              <label className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                Active Ingestion Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#101014] text-zinc-300 rounded text-xs font-mono flex items-center gap-1 border border-[#27272A]"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-white text-zinc-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {isAddingTag ? (
                  <form onSubmit={handleAddTagSubmit} className="flex items-center gap-1">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      placeholder="#tag"
                      className="px-2 py-0.5 bg-[#101014] text-zinc-200 rounded text-xs font-mono border border-zinc-500 focus:outline-none w-20"
                    />
                    <button
                      type="submit"
                      className="px-1.5 py-0.5 bg-white text-zinc-950 rounded text-[11px] font-bold"
                    >
                      Add
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingTag(true)}
                    className="px-2 py-0.5 bg-[#101014] text-zinc-400 hover:text-white rounded text-xs font-mono border border-dashed border-[#27272A] transition"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Search Results & Track 2 Autonomous Response */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          {/* OmniMind Autonomous Intelligence Summary Banner */}
          {autonomousResult && (
            <div className="bg-[#18181B] rounded-xl p-5 border border-[#27272A] shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-white text-sm">
                    Autonomous Multi-App Synthesis
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    Track 2 Schema Validated
                  </span>
                  <button
                    onClick={copyRawJson}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#101014] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-[#27272A] transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>

              {showJsonSchema ? (
                <div className="p-4 rounded-lg bg-[#0C0C0E] border border-[#27272A] font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                  <pre>{JSON.stringify(autonomousResult, null, 2)}</pre>
                </div>
              ) : (
                <>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {autonomousResult.summary}
                  </p>

                  {/* Explicit Swytchcode Source Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#27272A]">
                    {autonomousResult.sources.map((src, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#101014] border border-[#27272A] text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                      >
                        <span className="text-blue-400 font-semibold">[Source: Swytchcode/{src.app}]</span>
                        <span className="text-zinc-400 truncate max-w-[220px]">
                          {src.identifier}
                        </span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Result Card 1: Slack */}
          {(activeTab === 'all' || activeTab === 'slack') && (
            <div className="bg-[#18181B] hover-card-motion hover:border-zinc-700 rounded-xl p-5 flex flex-col gap-3 border border-[#27272A] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#101014] flex items-center justify-center text-zinc-200 border border-[#27272A] shrink-0 mt-0.5">
                    <Hash className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm break-words">
                        Infrastructure Migration Timeline &amp; Q3 Milestones
                      </h3>
                      <span className="px-2 py-0.5 bg-[#101014] text-blue-400 font-mono text-xs rounded border border-[#27272A] shrink-0">
                        [Source: Swytchcode/Slack #engineering]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Posted by Alex Rivera • Yesterday at 4:42 PM
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Infrastructure Migration Timeline & Q3 Milestones',
                      sourceApp: 'Swytchcode/Slack #engineering',
                      author: 'Alex Rivera (DevOps)',
                      timestamp: 'Yesterday at 4:42 PM',
                      snippet:
                        '...We need to lock in the final instances for the q3 roadmap infrastructure migration by Friday. The database replication lag test passed successfully under heavy load simulation...',
                    })
                  }
                  className="px-3 py-1.5 bg-[#101014] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#27272A] shrink-0 self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Thread</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 sm:pl-12 pl-0 leading-relaxed break-words">
                "...We need to lock in the final instances for the{' '}
                <span className="bg-zinc-800 text-white px-1 py-0.5 rounded font-mono font-medium">
                  q3 roadmap infrastructure migration
                </span>{' '}
                by Friday. The database replication lag test passed successfully under heavy load simulation..."
              </p>

              <div className="flex items-center gap-4 sm:pl-12 pl-0 pt-1 text-xs text-zinc-500 font-mono flex-wrap">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> 14 replies
                </span>
                <span className="flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5" /> 2 files attached
                </span>
              </div>
            </div>
          )}

          {/* Result Card 2: Gmail */}
          {(activeTab === 'all' || activeTab === 'gmail') && (
            <div className="bg-[#18181B] hover-card-motion hover:border-zinc-700 rounded-xl p-5 flex flex-col gap-3 border border-[#27272A] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#101014] flex items-center justify-center text-zinc-200 border border-[#27272A] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm break-words">
                        RE: Executive Briefing: Q3 Roadmap &amp; Cloud Migration Budget
                      </h3>
                      <span className="px-2 py-0.5 bg-[#101014] text-emerald-400 font-mono text-xs rounded border border-[#27272A] shrink-0">
                        [Source: Swytchcode/Gmail Thread: Sarah Jenkins]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      From Sarah Jenkins • 3 days ago
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'RE: Executive Briefing: Q3 Roadmap & Cloud Migration Budget',
                      sourceApp: 'Swytchcode/Gmail Inbox',
                      author: 'Sarah Jenkins (VP Sales)',
                      timestamp: '3 days ago',
                      snippet:
                        'Attached is the revised financial projection for the upcoming q3 roadmap infrastructure migration. Please review the multi-region failover provisions before the board meeting next Tuesday...',
                    })
                  }
                  className="px-3 py-1.5 bg-[#101014] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#27272A] shrink-0 self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Thread</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 sm:pl-12 pl-0 leading-relaxed break-words">
                "Attached is the revised financial projection for the upcoming{' '}
                <span className="bg-zinc-800 text-white px-1 py-0.5 rounded font-mono font-medium">
                  q3 roadmap infrastructure migration
                </span>
                . Please review the multi-region failover provisions before the board meeting next Tuesday..."
              </p>

              <div className="flex items-center gap-4 sm:pl-12 pl-0 pt-1 text-xs text-zinc-500 font-mono flex-wrap">
                <span>Executive Thread</span>
                <span>·</span>
                <span>Direct Sign-off</span>
              </div>
            </div>
          )}

          {/* Result Card 3: Notion */}
          {(activeTab === 'all' || activeTab === 'notion') && (
            <div className="bg-[#18181B] hover-card-motion hover:border-zinc-700 rounded-xl p-5 flex flex-col gap-3 border border-[#27272A] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#101014] flex items-center justify-center text-zinc-200 border border-[#27272A] shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm break-words">
                        Technical Architecture Spec: Q3 Migration Plan
                      </h3>
                      <span className="px-2 py-0.5 bg-[#101014] text-purple-400 font-mono text-xs rounded border border-[#27272A] shrink-0">
                        [Source: Swytchcode/Notion Architecture Spec]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Updated by Elena Rostova • 5 days ago
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Technical Architecture Spec: Q3 Migration Plan',
                      sourceApp: 'Swytchcode/Notion Engineering Wiki',
                      author: 'Elena Rostova (Product)',
                      timestamp: '5 days ago',
                      snippet:
                        '...This document outlines the zero-downtime strategy for the core database clusters as part of the broader q3 roadmap infrastructure migration. Kubernetes node pools will auto-scale...',
                    })
                  }
                  className="px-3 py-1.5 bg-[#101014] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#27272A] shrink-0 self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Doc</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 sm:pl-12 pl-0 leading-relaxed break-words">
                "...This document outlines the zero-downtime strategy for the core database clusters as part of the broader{' '}
                <span className="bg-zinc-800 text-white px-1 py-0.5 rounded font-mono font-medium">
                  q3 roadmap infrastructure migration
                </span>
                . Kubernetes node pools will auto-scale..."
              </p>

              <div className="flex items-center gap-4 sm:pl-12 pl-0 pt-1 text-xs text-zinc-500 font-mono flex-wrap">
                <span>Version 4.2</span>
                <span>·</span>
                <span>Engineering Spec</span>
              </div>
            </div>
          )}

          {/* Result Card 4: Google Drive */}
          {(activeTab === 'all' || activeTab === 'drive') && (
            <div className="bg-[#18181B] hover-card-motion hover:border-zinc-700 rounded-xl p-5 flex flex-col gap-3 border border-[#27272A] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#101014] flex items-center justify-center text-zinc-200 border border-[#27272A] shrink-0 mt-0.5">
                    <HardDrive className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm break-words">
                        Q3_Migration_Architecture_Draft_v4.pdf
                      </h3>
                      <span className="px-2 py-0.5 bg-[#101014] text-blue-400 font-mono text-xs rounded border border-[#27272A] shrink-0">
                        [Source: Swytchcode/Google Drive / Roadmap.docx]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Owned by Alex Rivera • Last modified last week
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Q3_Migration_Architecture_Draft_v4.pdf',
                      sourceApp: 'Swytchcode/Google Drive',
                      author: 'Alex Rivera (DevOps)',
                      timestamp: 'Last modified last week',
                      snippet:
                        '...Diagrams and network topologies highlighting data flow during the q3 roadmap infrastructure migration phase 2. Includes security compliance checklists...',
                    })
                  }
                  className="px-3 py-1.5 bg-[#101014] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#27272A] shrink-0 self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Doc</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 sm:pl-12 pl-0 leading-relaxed break-words">
                "...Diagrams and network topologies highlighting data flow during the{' '}
                <span className="bg-zinc-800 text-white px-1 py-0.5 rounded font-mono font-medium">
                  q3 roadmap infrastructure migration
                </span>{' '}
                phase 2. Includes security compliance checklists..."
              </p>

              <div className="flex items-center gap-4 sm:pl-12 pl-0 pt-1 text-xs text-zinc-500 font-mono flex-wrap">
                <span>PDF Document</span>
                <span>·</span>
                <span>Shared with 12 engineers</span>
              </div>
            </div>
          )}

          {/* Result Card 5: Box */}
          {(activeTab === 'all' || activeTab === 'box') && (
            <div className="bg-[#18181B] hover-card-motion hover:border-zinc-700 rounded-xl p-5 flex flex-col gap-3 border border-[#27272A] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#101014] flex items-center justify-center text-zinc-200 border border-[#27272A] shrink-0 mt-0.5">
                    <BoxIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm break-words">
                        Enterprise_Architecture_Security_Review.xlsx
                      </h3>
                      <span className="px-2 py-0.5 bg-[#101014] text-amber-400 font-mono text-xs rounded border border-[#27272A] shrink-0">
                        [Source: Swytchcode/Box Vault]
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Uploaded by Marcus Vance • Yesterday at 09:15
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Enterprise_Architecture_Security_Review.xlsx',
                      sourceApp: 'Swytchcode/Box Vault',
                      author: 'Marcus Vance (Infra Sec)',
                      timestamp: 'Yesterday at 09:15',
                      snippet:
                        '...Security audit matrix confirming all storage buckets and Box sync pipelines adhere to SOC2 Type II compliance standards. Cross-tool encryption validated for Gmail, Drive, Notion, Box, and Slack...',
                    })
                  }
                  className="px-3 py-1.5 bg-[#101014] hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#27272A] shrink-0 self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>View Doc</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 sm:pl-12 pl-0 leading-relaxed break-words">
                "...Security audit matrix confirming all storage buckets and Box sync pipelines adhere to SOC2 Type II compliance standards. Cross-tool encryption validated for{' '}
                <span className="bg-zinc-800 text-white px-1 py-0.5 rounded font-mono font-medium">
                  q3 roadmap infrastructure migration
                </span>{' '}
                and automated disaster recovery runs..."
              </p>

              <div className="flex items-center gap-4 sm:pl-12 pl-0 pt-1 text-xs text-zinc-500 font-mono flex-wrap">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Shield className="w-3.5 h-3.5" /> SOC2 Verified
                </span>
                <span>·</span>
                <span>Encrypted AES-256</span>
              </div>
            </div>
          )}

          {/* Clean Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-[#27272A] text-xs font-mono text-zinc-400">
            <span>Showing verified cross-tool records</span>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-2.5 py-1 bg-[#18181B] hover:bg-zinc-800 rounded border border-[#27272A] disabled:opacity-40 transition flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="px-2 py-1 text-white">Page {page} of 3</span>
              <button
                disabled={page === 3}
                onClick={() => setPage(page + 1)}
                className="px-2.5 py-1 bg-[#18181B] hover:bg-zinc-800 rounded border border-[#27272A] disabled:opacity-40 transition flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
