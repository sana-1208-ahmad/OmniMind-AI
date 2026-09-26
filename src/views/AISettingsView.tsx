import React, { useState } from 'react';

export const AISettingsView: React.FC = () => {
  const [tone, setTone] = useState<'executive' | 'technical' | 'concise'>('executive');
  const [strictJson, setStrictJson] = useState(true);
  const [zeroHallucination, setZeroHallucination] = useState(true);
  const [autoExtractActions, setAutoExtractActions] = useState(true);
  const [citationTags, setCitationTags] = useState(true);
  const [crossAppCorrelation, setCrossAppCorrelation] = useState(true);
  const [minConfidenceScore, setMinConfidenceScore] = useState(85);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="flex-1 p-space-xl max-w-4xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
              TRACK 2 ENGINE GOVERNANCE
            </span>
            <span className="text-[12px] text-secondary">Autonomous Executive Worker</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">OmniMind AI Engine Settings</h1>
          <p className="text-secondary text-body-md mt-1">
            Configure autonomous reasoning parameters, schema validation, and cross-platform citation policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          Save Preferences
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-sm flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
          <span>OmniMind AI governance policies and strict schema enforcement updated successfully!</span>
        </div>
      )}

      {/* Operational Persona Section */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-5">
        <div>
          <h3 className="text-base font-semibold text-primary">1. Operational Persona & Tone</h3>
          <p className="text-xs text-secondary mt-1">
            Defines the executive voice, conciseness, and depth when generating briefings, summaries, and chat responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTone('executive')}
            className={`p-4 rounded-xl border text-left transition-all ${
              tone === 'executive'
                ? 'bg-surface-container border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-surface-container-lowest border-[#27272A] hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">Executive Standard</span>
              <span className="material-symbols-outlined text-purple-400 text-[18px]">verified</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Concise, high-level summaries with strategic action items, decision roadmaps, and clear risks. (Default Track 2 standard)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTone('technical')}
            className={`p-4 rounded-xl border text-left transition-all ${
              tone === 'technical'
                ? 'bg-surface-container border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-surface-container-lowest border-[#27272A] hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">Engineering & Architecture</span>
              <span className="material-symbols-outlined text-blue-400 text-[18px]">code</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Focuses on technical specifications, commit hashes, latency metrics, database migrations, and schema contracts.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTone('concise')}
            className={`p-4 rounded-xl border text-left transition-all ${
              tone === 'concise'
                ? 'bg-surface-container border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-surface-container-lowest border-[#27272A] hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">Minimalist Bullet Points</span>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">format_list_bulleted</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Ultra-condensed bullet items, zero filler words, immediate tasks, and explicit owners.
            </p>
          </button>
        </div>
      </div>

      {/* Strict Output Schema & Accuracy Policy */}
      <div className="p-6 rounded-xl bg-surface-container-low border border-[#27272A]/70 space-y-5">
        <div>
          <h3 className="text-base font-semibold text-primary">2. Track 2 Schema & Precision Guardrails</h3>
          <p className="text-xs text-secondary mt-1">
            Enforces strict formatting rules and zero hallucination policies on all agent computations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-primary block">Strict Raw JSON Schema Output</span>
              <span className="text-xs text-secondary">
                Guarantee response adheres to <code className="text-zinc-300 font-mono text-[11px]">&#123;status, queryProcessed, summary, sources, actionItems, knowledgeLinks&#125;</code> without Markdown code fences.
              </span>
            </div>
            <button
              onClick={() => setStrictJson(!strictJson)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                strictJson ? 'bg-emerald-500' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  strictJson ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-primary block">Zero-Hallucination Strict Grounding</span>
              <span className="text-xs text-secondary">
                Rely exclusively on provided multi-source workspace payloads. If information is missing from Gmail, Drive, Notion, Box, or Slack, explicitly state that it was not found.
              </span>
            </div>
            <button
              onClick={() => setZeroHallucination(!zeroHallucination)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                zeroHallucination ? 'bg-emerald-500' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  zeroHallucination ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-primary block">Explicit Source Citation Requirement</span>
              <span className="text-xs text-secondary">
                Every generated insight must tag its originating app and identifier (e.g., <code className="text-zinc-300 font-mono text-[11px]">[Source: Slack #engineering]</code>).
              </span>
            </div>
            <button
              onClick={() => setCitationTags(!citationTags)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                citationTags ? 'bg-emerald-500' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  citationTags ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-primary block">Automatic Action Item Extraction</span>
              <span className="text-xs text-secondary">
                Automatically detect commitments, tasks, or deadlines from cross-app conversations and populate the Action Board.
              </span>
            </div>
            <button
              onClick={() => setAutoExtractActions(!autoExtractActions)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                autoExtractActions ? 'bg-emerald-500' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoExtractActions ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-sm font-medium text-primary block">Cross-Platform Knowledge Graph Correlation</span>
              <span className="text-xs text-secondary">
                Dynamically establish cross-platform graph links between chat threads, documents, and wiki pages.
              </span>
            </div>
            <button
              onClick={() => setCrossAppCorrelation(!crossAppCorrelation)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                crossAppCorrelation ? 'bg-emerald-500' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  crossAppCorrelation ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Confidence Threshold Slider */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-secondary">Minimum Semantic Retrieval Confidence Score:</span>
            <span className="font-mono font-bold text-primary">{minConfidenceScore}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="98"
            value={minConfidenceScore}
            onChange={(e) => setMinConfidenceScore(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-secondary mt-1">
            <span>60% (Broad Search)</span>
            <span>85% (Recommended for Track 2)</span>
            <span>98% (High Precision Only)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
