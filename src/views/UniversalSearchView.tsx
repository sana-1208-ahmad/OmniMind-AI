import React, { useState, useEffect } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { ContextDetailModal } from '../components/Modals/ContextDetailModal';
import { executeOmniMindQuery } from '../services/omniMindEngine';
import { OmniMindResponseSchema } from '../types';

interface UniversalSearchViewProps {
  initialQuery?: string;
  onNavigate: (view: ActiveView) => void;
}

export const UniversalSearchView: React.FC<UniversalSearchViewProps> = ({
  initialQuery = 'q3 roadmap infrastructure migration',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'gmail' | 'slack' | 'drive' | 'notion' | 'box'>('all');
  const [timeRange, setTimeRange] = useState('any');
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([
    'Sarah Jenkins (Lead)',
    'Alex Rivera (DevOps)',
  ]);
  const [tags, setTags] = useState(['#engineering', '#q3-migration']);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [page, setPage] = useState(1);

  // Selected item for Context Viewer Modal
  const [contextItem, setContextItem] = useState<{
    isOpen: boolean;
    title: string;
    sourceApp: string;
    author: string;
    timestamp: string;
    snippet: string;
  } | null>(null);

  // Live Track 2 Autonomous Synthesis State
  const [autonomousResult, setAutonomousResult] = useState<OmniMindResponseSchema | null>(null);
  const [loadingSynthesis, setLoadingSynthesis] = useState(false);
  const [showJsonSchema, setShowJsonSchema] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Run automated Track 2 synthesis on initial mount or query change
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
    <div className="flex flex-col w-full min-h-full text-on-surface pb-12">
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
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-4 flex flex-col gap-4 border-b border-[#27272A]/40">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-headline-lg text-primary text-2xl sm:text-3xl font-bold tracking-tight">
              Multi-Source Search
            </h1>
            <p className="font-body-md text-on-surface-variant text-xs sm:text-sm mt-1">
              Correlating text payloads from <span className="text-primary font-mono">Slack, Gmail, Google Drive, Notion, and Box</span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find docs, threads, or commits..."
                className="w-full bg-surface-container pl-10 pr-3 py-2 rounded-xl text-primary border border-[#27272A] focus:outline-none focus:border-primary text-xs sm:text-sm font-body-md"
              />
            </div>
            <button
              type="submit"
              disabled={loadingSynthesis}
              className="px-4 py-2 bg-primary text-[#131315] rounded-xl text-xs font-bold hover:bg-primary-fixed-dim transition flex items-center gap-1.5 shadow-sm"
            >
              {loadingSynthesis ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    progress_activity
                  </span>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>Query</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between overflow-x-auto pb-1 gap-4">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all shadow-sm ${
                activeTab === 'all'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              All (14)
            </button>
            <button
              onClick={() => setActiveTab('gmail')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
                activeTab === 'gmail'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">mail</span> Gmail (4)
            </button>
            <button
              onClick={() => setActiveTab('slack')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
                activeTab === 'slack'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">chat</span> Slack (6)
            </button>
            <button
              onClick={() => setActiveTab('drive')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
                activeTab === 'drive'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">folder</span> Drive (2)
            </button>
            <button
              onClick={() => setActiveTab('notion')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
                activeTab === 'notion'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">description</span> Notion (2)
            </button>
            <button
              onClick={() => setActiveTab('box')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
                activeTab === 'box'
                  ? 'bg-primary text-[#131315] font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-[#27272A]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">inventory_2</span> Box (2)
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowJsonSchema(!showJsonSchema)}
              className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-primary font-mono text-xs border border-[#27272A] flex items-center gap-1.5 transition"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              <span>{showJsonSchema ? 'Hide Schema' : 'Raw JSON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters & Search Content */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 pt-6">
        {/* Mobile Filter Toggle */}
        <div className="col-span-12 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-container border border-[#27272A] text-xs font-mono text-primary"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filter Options ({timeRange !== 'any' ? '1 active' : 'Default'})</span>
            </span>
            <span className="material-symbols-outlined text-[18px]">
              {mobileFiltersOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {/* Left Column: Filters (3 cols on desktop, toggled on mobile) */}
        <div className={`col-span-12 lg:col-span-3 ${mobileFiltersOpen ? 'flex' : 'hidden lg:flex'} flex-col gap-4`}>
          <div className="bg-surface-container rounded-2xl p-space-md flex flex-col gap-space-md border border-[#27272A]">
            <div className="flex items-center justify-between border-b border-[#27272A]/50 pb-2">
              <span className="font-headline-sm font-semibold text-primary">Filters</span>
              <button
                onClick={() => {
                  setTimeRange('any');
                  setSelectedAuthors(['Sarah Jenkins (Lead)', 'Alex Rivera (DevOps)']);
                  setTags(['#engineering', '#q3-migration']);
                }}
                className="text-xs font-mono text-on-surface-variant hover:text-primary transition-colors"
              >
                Reset all
              </button>
            </div>

            {/* Time Range */}
            <div className="flex flex-col gap-space-sm">
              <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
                Time Range
              </label>
              <div className="flex flex-col gap-space-xs">
                {[
                  { id: 'any', label: 'Any time' },
                  { id: '24h', label: 'Past 24 hours' },
                  { id: 'week', label: 'Past week' },
                  { id: 'month', label: 'Past month' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-space-sm p-1.5 rounded-lg hover:bg-surface-container-high cursor-pointer transition"
                  >
                    <input
                      type="radio"
                      name="timerange"
                      checked={timeRange === item.id}
                      onChange={() => setTimeRange(item.id)}
                      className="accent-primary"
                    />
                    <span className="text-body-sm text-on-surface">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Author / Sender */}
            <div className="flex flex-col gap-space-sm pt-space-sm border-t border-[#27272A]/40">
              <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
                Author / Sender
              </label>
              <div className="flex flex-col gap-space-xs">
                {['Sarah Jenkins (Lead)', 'Alex Rivera (DevOps)', 'Elena Rostova (Product)'].map(
                  (author) => (
                    <label
                      key={author}
                      className="flex items-center gap-space-sm p-1.5 rounded-lg hover:bg-surface-container-high cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAuthors.includes(author)}
                        onChange={() => toggleAuthor(author)}
                        className="accent-primary rounded"
                      />
                      <span className="text-body-sm text-on-surface">{author}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Tags & Categories */}
            <div className="flex flex-col gap-space-sm pt-space-sm border-t border-[#27272A]/40">
              <label className="font-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
                Tags &amp; Categories
              </label>
              <div className="flex flex-wrap gap-space-xs">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-space-sm py-1 bg-surface-container-high text-on-surface rounded-lg text-xs font-mono flex items-center gap-1 border border-[#27272A]"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-primary text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
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
                      className="px-2 py-0.5 bg-surface-container text-primary rounded-lg text-xs font-mono border border-primary focus:outline-none w-24"
                    />
                    <button
                      type="submit"
                      className="px-1.5 py-0.5 bg-primary text-black rounded text-[11px] font-bold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingTag(false);
                        setNewTagInput('');
                      }}
                      className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant hover:text-white rounded text-[11px]"
                    >
                      ✕
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAddingTag(true)}
                    className="px-space-sm py-1 bg-surface-container text-on-surface-variant hover:text-primary rounded-lg text-xs font-mono border border-dashed border-[#27272A] transition"
                  >
                    + Add tag
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Search Results & Track 2 Autonomous Response (9 cols) */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-space-md">
          {/* OmniMind Autonomous Intelligence Summary Banner */}
          {autonomousResult && (
            <div className="bg-surface-container rounded-2xl p-space-lg border border-[#27272A] shadow-md flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    psychology
                  </span>
                  <span className="font-semibold text-primary text-body-md">
                    OmniMind Autonomous Synthesis (Track 2)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400">
                    Precision Guaranteed • Zero Hallucination
                  </span>
                  <button
                    onClick={copyRawJson}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-mono text-primary transition"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copied ? 'Copied' : 'Copy JSON Schema'}</span>
                  </button>
                </div>
              </div>

              {showJsonSchema ? (
                <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                  <pre>{JSON.stringify(autonomousResult, null, 2)}</pre>
                </div>
              ) : (
                <>
                  <p className="text-body-md text-on-surface leading-relaxed">
                    {autonomousResult.summary}
                  </p>

                  {/* Sources citations inline */}
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#27272A]/40">
                    {autonomousResult.sources.map((src, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-surface-container-low border border-[#27272A] text-xs font-mono text-on-surface flex items-center gap-1.5"
                      >
                        <span className="text-primary font-bold">[{src.app}]</span>
                        <span className="text-on-surface-variant truncate max-w-[200px]">
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
            <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-[#27272A]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-[#27272A]">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <h3 className="font-headline-sm font-semibold text-primary">
                        Infrastructure Migration Timeline &amp; Q3 Milestones
                      </h3>
                      <span className="px-space-sm py-0.5 bg-surface-container-low text-on-surface-variant font-mono text-xs rounded-lg border border-[#27272A]">
                        Source: Slack #engineering
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Posted by Alex Rivera • Yesterday at 4:42 PM
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Infrastructure Migration Timeline & Q3 Milestones',
                      sourceApp: 'Slack #engineering',
                      author: 'Alex Rivera (DevOps)',
                      timestamp: 'Yesterday at 4:42 PM',
                      snippet:
                        '...We need to lock in the final instances for the q3 roadmap infrastructure migration by Friday. The database replication lag test passed successfully under heavy load simulation...',
                    })
                  }
                  className="px-space-md py-space-sm bg-surface-container-low hover:bg-primary hover:text-[#131315] rounded-xl text-on-surface font-medium text-xs transition-all flex items-center gap-space-xs border border-[#27272A]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Context</span>
                </button>
              </div>

              <p className="text-body-md text-on-surface pl-14 leading-relaxed">
                "...We need to lock in the final instances for the{' '}
                <span className="bg-primary/20 text-primary px-1 rounded font-semibold">
                  q3 roadmap infrastructure migration
                </span>{' '}
                by Friday. The database replication lag test passed successfully under heavy load
                simulation..."
              </p>

              <div className="flex items-center gap-space-md pl-14 pt-space-xs text-xs text-on-surface-variant font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">forum</span> 14 replies
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">attachment</span> 2 files
                  attached
                </span>
              </div>
            </div>
          )}

          {/* Result Card 2: Gmail */}
          {(activeTab === 'all' || activeTab === 'gmail') && (
            <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-[#27272A]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-[#27272A]">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <h3 className="font-headline-sm font-semibold text-primary">
                        RE: Executive Briefing: Q3 Roadmap &amp; Cloud Migration Budget
                      </h3>
                      <span className="px-space-sm py-0.5 bg-surface-container-low text-on-surface-variant font-mono text-xs rounded-lg border border-[#27272A]">
                        Source: Gmail Inbox
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      From Sarah Jenkins • 3 days ago
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'RE: Executive Briefing: Q3 Roadmap & Cloud Migration Budget',
                      sourceApp: 'Gmail Inbox',
                      author: 'Sarah Jenkins (VP Sales)',
                      timestamp: '3 days ago',
                      snippet:
                        'Attached is the revised financial projection for the upcoming q3 roadmap infrastructure migration. Please review the multi-region failover provisions before the board meeting next Tuesday...',
                    })
                  }
                  className="px-space-md py-space-sm bg-surface-container-low hover:bg-primary hover:text-[#131315] rounded-xl text-on-surface font-medium text-xs transition-all flex items-center gap-space-xs border border-[#27272A]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Context</span>
                </button>
              </div>

              <p className="text-body-md text-on-surface pl-14 leading-relaxed">
                "Attached is the revised financial projection for the upcoming{' '}
                <span className="bg-primary/20 text-primary px-1 rounded font-semibold">
                  q3 roadmap infrastructure migration
                </span>
                . Please review the multi-region failover provisions before the board meeting next
                Tuesday..."
              </p>

              <div className="flex items-center gap-space-md pl-14 pt-space-xs text-xs text-on-surface-variant font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">label</span> Executive
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 5 min read
                </span>
              </div>
            </div>
          )}

          {/* Result Card 3: Notion */}
          {(activeTab === 'all' || activeTab === 'notion') && (
            <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-[#27272A]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-[#27272A]">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <h3 className="font-headline-sm font-semibold text-primary">
                        Technical Architecture Spec: Q3 Migration Plan
                      </h3>
                      <span className="px-space-sm py-0.5 bg-surface-container-low text-on-surface-variant font-mono text-xs rounded-lg border border-[#27272A]">
                        Source: Notion Engineering Wiki
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Updated by Elena Rostova • 5 days ago
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Technical Architecture Spec: Q3 Migration Plan',
                      sourceApp: 'Notion Engineering Wiki',
                      author: 'Elena Rostova (Product)',
                      timestamp: '5 days ago',
                      snippet:
                        '...This document outlines the zero-downtime strategy for the core database clusters as part of the broader q3 roadmap infrastructure migration. Kubernetes node pools will auto-scale...',
                    })
                  }
                  className="px-space-md py-space-sm bg-surface-container-low hover:bg-primary hover:text-[#131315] rounded-xl text-on-surface font-medium text-xs transition-all flex items-center gap-space-xs border border-[#27272A]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Context</span>
                </button>
              </div>

              <p className="text-body-md text-on-surface pl-14 leading-relaxed">
                "...This document outlines the zero-downtime strategy for the core database clusters as part
                of the broader{' '}
                <span className="bg-primary/20 text-primary px-1 rounded font-semibold">
                  q3 roadmap infrastructure migration
                </span>
                . Kubernetes node pools will auto-scale..."
              </p>

              <div className="flex items-center gap-space-md pl-14 pt-space-xs text-xs text-on-surface-variant font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">edit</span> Edited 4 times
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">folder</span> Wiki / Architecture
                </span>
              </div>
            </div>
          )}

          {/* Result Card 4: Google Drive */}
          {(activeTab === 'all' || activeTab === 'drive') && (
            <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-[#27272A]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-[#27272A]">
                    <span className="material-symbols-outlined text-[20px]">folder</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <h3 className="font-headline-sm font-semibold text-primary">
                        Q3_Migration_Architecture_Draft_v4.pdf
                      </h3>
                      <span className="px-space-sm py-0.5 bg-surface-container-low text-on-surface-variant font-mono text-xs rounded-lg border border-[#27272A]">
                        Source: Google Drive
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Owned by Alex Rivera • Last modified last week
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Q3_Migration_Architecture_Draft_v4.pdf',
                      sourceApp: 'Google Drive',
                      author: 'Alex Rivera (DevOps)',
                      timestamp: 'Last modified last week',
                      snippet:
                        '...Diagrams and network topologies highlighting data flow during the q3 roadmap infrastructure migration phase 2. Includes security compliance checklists...',
                    })
                  }
                  className="px-space-md py-space-sm bg-surface-container-low hover:bg-primary hover:text-[#131315] rounded-xl text-on-surface font-medium text-xs transition-all flex items-center gap-space-xs border border-[#27272A]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Context</span>
                </button>
              </div>

              <p className="text-body-md text-on-surface pl-14 leading-relaxed">
                "...Diagrams and network topologies highlighting data flow during the{' '}
                <span className="bg-primary/20 text-primary px-1 rounded font-semibold">
                  q3 roadmap infrastructure migration
                </span>{' '}
                phase 2. Includes security compliance checklists..."
              </p>

              <div className="flex items-center gap-space-md pl-14 pt-space-xs text-xs text-on-surface-variant font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lock</span> Shared with 12
                  people
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">description</span> PDF
                  Document
                </span>
              </div>
            </div>
          )}

          {/* Result Card 5: Box */}
          {(activeTab === 'all' || activeTab === 'box') && (
            <div className="bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl p-space-lg flex flex-col gap-space-md shadow-sm border border-[#27272A]">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary border border-[#27272A]">
                    <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-sm flex-wrap">
                      <h3 className="font-headline-sm font-semibold text-primary">
                        Enterprise_Architecture_Security_Review.xlsx
                      </h3>
                      <span className="px-space-sm py-0.5 bg-surface-container-low text-on-surface-variant font-mono text-xs rounded-lg border border-[#27272A]">
                        Source: Box Enterprise
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Uploaded by Marcus Vance • Yesterday at 09:15
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setContextItem({
                      isOpen: true,
                      title: 'Enterprise_Architecture_Security_Review.xlsx',
                      sourceApp: 'Box Enterprise',
                      author: 'Marcus Vance (Infra Sec)',
                      timestamp: 'Yesterday at 09:15',
                      snippet:
                        '...Security audit matrix confirming all storage buckets and Box sync pipelines adhere to SOC2 Type II compliance standards. Cross-tool encryption validated for Gmail, Drive, Notion, Box, and Slack...',
                    })
                  }
                  className="px-space-md py-space-sm bg-surface-container-low hover:bg-primary hover:text-[#131315] rounded-xl text-on-surface font-medium text-xs transition-all flex items-center gap-space-xs border border-[#27272A]"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>View Context</span>
                </button>
              </div>

              <p className="text-body-md text-on-surface pl-14 leading-relaxed">
                "...Security audit matrix confirming all storage buckets and Box sync pipelines adhere to SOC2 Type II compliance standards. Cross-tool encryption validated for{' '}
                <span className="bg-primary/20 text-primary px-1 rounded font-semibold">
                  q3 roadmap infrastructure migration
                </span>{' '}
                and automated disaster recovery runs..."
              </p>

              <div className="flex items-center gap-space-md pl-14 pt-space-xs text-xs text-on-surface-variant font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">history</span> Version 3.2
                </span>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-space-md">
            <span className="text-body-sm text-on-surface-variant font-mono">
              Showing results across Gmail, Google Drive, Notion, Box, and Slack
            </span>
            <div className="flex items-center gap-space-xs font-mono text-xs">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-space-md py-space-sm bg-surface-container text-on-surface-variant rounded-xl disabled:opacity-50 border border-[#27272A]"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(1)}
                className={`px-space-md py-space-sm rounded-xl font-bold ${
                  page === 1 ? 'bg-primary text-[#131315]' : 'bg-surface-container'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setPage(2)}
                className={`px-space-md py-space-sm rounded-xl ${
                  page === 2 ? 'bg-primary text-[#131315] font-bold' : 'bg-surface-container'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setPage(3)}
                className={`px-space-md py-space-sm rounded-xl ${
                  page === 3 ? 'bg-primary text-[#131315] font-bold' : 'bg-surface-container'
                }`}
              >
                3
              </button>
              <button
                disabled={page === 3}
                onClick={() => setPage(page + 1)}
                className="px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl border border-[#27272A]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
