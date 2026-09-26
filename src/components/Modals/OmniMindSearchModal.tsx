import React, { useState, useEffect } from 'react';
import { executeOmniMindQuery } from '../../services/omniMindEngine';
import { OmniMindResponseSchema } from '../../types';

interface OmniMindSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialMode?: 'briefing' | 'strict';
  onNavigateToSearch?: (query: string) => void;
}

export const OmniMindSearchModal: React.FC<OmniMindSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialMode = 'briefing',
  onNavigateToSearch,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OmniMindResponseSchema | null>(null);
  const [viewMode, setViewMode] = useState<'brief' | 'raw_json'>(initialMode === 'strict' ? 'raw_json' : 'brief');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
        // Automatically trigger search if query is provided
        handleRunSearch(initialQuery);
      }
      if (initialMode) {
        setViewMode(initialMode === 'strict' ? 'raw_json' : 'brief');
      }
    }
  }, [isOpen, initialQuery, initialMode]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleRunSearch(searchQuery?: string) {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await executeOmniMindQuery(q);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleCopyJson() {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const presets = [
    'q3 roadmap infrastructure migration',
    'Summarize Globex Corp SLA requirements',
    'List all action items assigned to me today',
    'Investigation: Redis connection pool leak',
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-3xl bg-surface-container-low border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#27272A] flex items-center gap-3 bg-surface-container-lowest/80">
          <span className="material-symbols-outlined text-primary text-[22px]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunSearch()}
            placeholder="Search across Slack, Drive, Notion, Box, Gmail or ask OmniMind..."
            className="w-full bg-transparent text-primary placeholder-outline text-body-lg outline-none font-body-md"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResult(null);
              }}
              className="text-on-surface-variant hover:text-primary p-1 rounded"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => handleRunSearch()}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-fixed-dim transition disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Execute</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!result && (
          <div className="p-4 flex flex-col gap-2">
            <div className="text-[11px] font-code uppercase tracking-wider text-on-surface-variant">
              Suggested Universal Queries (Track 2)
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setQuery(preset);
                    handleRunSearch(preset);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-on-surface hover:text-primary border border-[#27272A] transition text-left"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {/* View Mode Toggle & Copy JSON */}
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('brief')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    viewMode === 'brief'
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Executive Briefing
                </button>
                <button
                  onClick={() => setViewMode('raw_json')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition font-code ${
                    viewMode === 'raw_json'
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Strict Output Schema (JSON)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-primary border border-[#27272A] transition font-code"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied Raw JSON!' : 'Copy Schema'}</span>
                </button>
                {onNavigateToSearch && (
                  <button
                    onClick={() => {
                      onNavigateToSearch(result.queryProcessed);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-primary border border-[#27272A] transition"
                  >
                    <span>Full Search View</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                )}
              </div>
            </div>

            {viewMode === 'brief' ? (
              <div className="space-y-4">
                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-surface-container border border-[#27272A] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>Executive Knowledge Synthesis</span>
                  </div>
                  <p className="text-body-md text-on-surface leading-relaxed">{result.summary}</p>
                </div>

                {/* Sources List */}
                <div className="space-y-2">
                  <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
                    Correlated Cross-Platform Sources ({result.sources.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.sources.map((src, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-surface-container border border-[#27272A] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[11px] font-code bg-surface-container-high text-primary font-medium">
                            {src.app}
                          </span>
                          <span className="text-[11px] text-on-surface-variant font-code truncate max-w-[180px]">
                            {src.identifier}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">"{src.snippet}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                {result.actionItems && result.actionItems.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
                      Extracted Commitments & Action Items ({result.actionItems.length})
                    </div>
                    <div className="space-y-2">
                      {result.actionItems.map((act, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-surface-container border border-[#27272A] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-[18px]">
                              check_circle_outline
                            </span>
                            <div>
                              <div className="text-body-sm font-medium text-primary">{act.task}</div>
                              <div className="text-[11px] text-on-surface-variant">
                                Source: {act.sourceApp}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-code font-bold uppercase ${
                              act.priority === 'High'
                                ? 'bg-error-container text-error'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {act.priority} Priority
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Knowledge Graph Links */}
                {result.knowledgeLinks && result.knowledgeLinks.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
                      Knowledge Graph Connections
                    </div>
                    <div className="space-y-2">
                      {result.knowledgeLinks.map((link, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-surface-container border border-[#27272A] flex items-start gap-3"
                        >
                          <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                            hub
                          </span>
                          <div>
                            <div className="text-xs font-code text-primary">
                              {link.nodeA} ↔ {link.nodeB}
                            </div>
                            <div className="text-xs text-on-surface-variant mt-0.5">
                              {link.relationship}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] font-code text-xs text-emerald-400 overflow-x-auto leading-relaxed max-h-[500px]">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer controls */}
        <div className="p-3 bg-surface-container-lowest border-t border-[#27272A] flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-3">
            <span>
              Press <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high font-code">Esc</kbd> to exit
            </span>
            <span>·</span>
            <span>Strict Track 2 Schema Compliant</span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-primary transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
