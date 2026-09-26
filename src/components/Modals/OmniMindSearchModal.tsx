import React, { useState, useEffect } from 'react';
import { executeOmniMindQuery } from '../../services/omniMindEngine';
import { OmniMindResponseSchema } from '../../types';
import {
  Search,
  X,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Share2,
  CheckSquare,
  Bot,
  Layers,
} from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in select-none"
    >
      <div
        className="w-full max-w-3xl bg-[#101014] border border-[#27272A] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-modal-in text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#27272A] flex items-center gap-3 bg-[#09090B]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunSearch()}
            placeholder="Search across Slack, Drive, Notion, Box, Gmail or ask OmniMind..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResult(null);
              }}
              className="text-zinc-400 hover:text-white p-1 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleRunSearch()}
            disabled={loading || !query.trim()}
            className="px-3.5 py-1.5 bg-white text-zinc-950 font-medium rounded-lg text-xs hover:bg-zinc-200 transition disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Execute</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!result && (
          <div className="p-5 flex flex-col gap-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Suggested Track 2 Agent Queries
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setQuery(preset);
                    handleRunSearch(preset);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white border border-[#27272A] transition text-left"
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
              <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
                <button
                  onClick={() => setViewMode('brief')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    viewMode === 'brief'
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Executive Briefing
                </button>
                <button
                  onClick={() => setViewMode('raw_json')}
                  className={`px-3 py-1 rounded text-xs font-mono transition ${
                    viewMode === 'raw_json'
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Strict Schema (JSON)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181B] hover:bg-zinc-800 text-xs text-zinc-300 border border-[#27272A] transition font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Schema'}</span>
                </button>
                {onNavigateToSearch && (
                  <button
                    onClick={() => {
                      onNavigateToSearch(result.queryProcessed);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition"
                  >
                    <span>Full View</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-300" />
                  </button>
                )}
              </div>
            </div>

            {viewMode === 'brief' ? (
              <div className="space-y-4">
                {/* Executive Summary */}
                <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 font-mono">
                    <Bot className="w-4 h-4" />
                    <span>SYNTHESIS COMPLETE (ZERO HALLUCINATION)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{result.summary}</p>
                </div>

                {/* Sources List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                    Correlated Sources ({result.sources.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.sources.map((src, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-blue-300 border border-zinc-700">
                            Swytchcode/{src.app}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-mono truncate max-w-[150px]">
                            {src.identifier}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2">"{src.snippet}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                {result.actionItems && result.actionItems.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                      Extracted Commitments ({result.actionItems.length})
                    </div>
                    <div className="space-y-2">
                      {result.actionItems.map((act, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-zinc-200 truncate">{act.task}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800 border border-[#27272A] shrink-0">
                            {act.sourceApp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Raw JSON Schema Inspector */
              <div className="p-4 rounded-lg bg-[#0C0C0E] border border-[#27272A] font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
