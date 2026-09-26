import React, { useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, Code, ListFilter, Sliders } from 'lucide-react';

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
    <div className="flex-1 p-6 md:p-8 max-w-4xl mx-auto space-y-6 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
              TRACK 2 ENGINE GOVERNANCE
            </span>
            <span className="text-xs text-zinc-400">Autonomous Executive Worker</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">OmniMind AI Engine Settings</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Configure autonomous reasoning parameters, schema validation, and cross-platform citation policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
        >
          <Save className="w-4 h-4 text-black" />
          Save Preferences
        </button>
      </div>

      {saveToast && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>OmniMind AI governance policies and strict schema enforcement updated successfully!</span>
        </div>
      )}

      {/* Operational Persona Section */}
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white">1. Operational Persona &amp; Tone</h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Defines the executive voice, conciseness, and depth when generating briefings, summaries, and chat responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTone('executive')}
            className={`p-4 rounded-xl border text-left transition ${
              tone === 'executive'
                ? 'bg-[#101014] border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-[#101014] border-[#27272A] hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Executive Standard</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Concise, high-level summaries with strategic action items, decision roadmaps, and clear risks. (Default Track 2 standard)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTone('technical')}
            className={`p-4 rounded-xl border text-left transition ${
              tone === 'technical'
                ? 'bg-[#101014] border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-[#101014] border-[#27272A] hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Engineering &amp; Architecture</span>
              <Code className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Focuses on technical specifications, commit hashes, latency metrics, database migrations, and schema contracts.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTone('concise')}
            className={`p-4 rounded-xl border text-left transition ${
              tone === 'concise'
                ? 'bg-[#101014] border-zinc-400 ring-1 ring-zinc-400'
                : 'bg-[#101014] border-[#27272A] hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Minimalist Bullet Points</span>
              <ListFilter className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Ultra-condensed bullet items, zero filler words, immediate tasks, and explicit owners.
            </p>
          </button>
        </div>
      </div>

      {/* Strict Output Schema & Accuracy Policy */}
      <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A] space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white">2. Track 2 Schema &amp; Precision Guardrails</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Enforces strict formatting rules and zero hallucination policies on all agent computations.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-white block">Strict Raw JSON Schema Output</span>
              <span className="text-[11px] text-zinc-400">
                Guarantee response adheres to <code className="text-zinc-300 font-mono text-[10px]">&#123;status, queryProcessed, summary, sources, actionItems, knowledgeLinks&#125;</code> without Markdown code fences.
              </span>
            </div>
            <button
              onClick={() => setStrictJson(!strictJson)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                strictJson ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  strictJson ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-white block">Zero-Hallucination Strict Grounding</span>
              <span className="text-[11px] text-zinc-400">
                Rely exclusively on provided multi-source workspace payloads. If information is missing from Gmail, Drive, Notion, Box, or Slack, explicitly state that it was not found.
              </span>
            </div>
            <button
              onClick={() => setZeroHallucination(!zeroHallucination)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                zeroHallucination ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  zeroHallucination ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-white block">Explicit Source Citation Requirement</span>
              <span className="text-[11px] text-zinc-400">
                Every generated insight must tag its originating app and identifier (e.g., <code className="text-zinc-300 font-mono text-[10px]">[Source: Slack #engineering]</code>).
              </span>
            </div>
            <button
              onClick={() => setCitationTags(!citationTags)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                citationTags ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  citationTags ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-white block">Automatic Action Item Extraction</span>
              <span className="text-[11px] text-zinc-400">
                Automatically detect commitments, tasks, or deadlines from cross-app conversations and populate the Action Board.
              </span>
            </div>
            <button
              onClick={() => setAutoExtractActions(!autoExtractActions)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                autoExtractActions ? 'bg-emerald-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoExtractActions ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#101014] border border-[#27272A]">
            <div className="max-w-xl">
              <span className="text-xs font-semibold text-white block">Cross-Platform Knowledge Graph Correlation</span>
              <span className="text-[11px] text-zinc-400">
                Dynamically establish cross-platform graph links between chat threads, documents, and wiki pages.
              </span>
            </div>
            <button
              onClick={() => setCrossAppCorrelation(!crossAppCorrelation)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                crossAppCorrelation ? 'bg-emerald-500' : 'bg-zinc-700'
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
            <span className="text-zinc-400">Minimum Semantic Retrieval Confidence Score:</span>
            <span className="font-mono font-bold text-white">{minConfidenceScore}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="98"
            value={minConfidenceScore}
            onChange={(e) => setMinConfidenceScore(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 mt-1 font-mono">
            <span>60% (Broad Search)</span>
            <span>85% (Recommended for Track 2)</span>
            <span>98% (High Precision Only)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
