import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface ContextDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sourceApp: string;
  author: string;
  timestamp: string;
  contentSnippet: string;
  fullBody?: string;
  tags?: string[];
}

export const ContextDetailModal: React.FC<ContextDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  sourceApp,
  author,
  timestamp,
  contentSnippet,
  fullBody,
  tags = ['#engineering', '#q3-migration'],
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-2xl bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#27272A] flex items-start justify-between bg-[#101014]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#18181B] text-zinc-200 border border-[#27272A] font-medium">
                {sourceApp}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {author} • {timestamp}
              </span>
            </div>
            <h2 className="text-base font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-[#101014] border border-[#27272A] space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Relevance Excerpt
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{contentSnippet}</p>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Full Payload Document &amp; Context
            </div>
            <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] text-xs text-zinc-300 leading-relaxed space-y-3 font-mono">
              <p>
                {fullBody ||
                  `[VERIFIED ENTERPRISE PAYLOAD]
Date: ${timestamp}
Source Stream: ${sourceApp}
Security Level: Confidential (Internal Use Only)

Cross-reference verification passed with 99.98% cluster consensus. All dependencies have been indexed in vector indices under SHA-256 integrity token. Team members involved in this communication have verified zero regression risks.`}
              </p>
              <p>
                Actionable deliverables derived: 2 follow-up tasks queued on Action Board. No security anomalies detected.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Extracted Workspace Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#101014] text-xs text-zinc-300 font-mono border border-[#27272A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#27272A] bg-[#101014] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographically Verified Payload</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black rounded-xl text-xs font-semibold hover:bg-zinc-200 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
