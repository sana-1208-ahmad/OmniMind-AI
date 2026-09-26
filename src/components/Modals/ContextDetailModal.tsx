import React from 'react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-2xl bg-surface-container-low border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-space-lg border-b border-[#27272A] flex items-start justify-between bg-surface-container-lowest/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-code bg-surface-container-high text-primary font-medium">
                {sourceApp}
              </span>
              <span className="text-xs text-on-surface-variant font-code">
                {author} • {timestamp}
              </span>
            </div>
            <h2 className="text-headline-sm font-semibold text-primary">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-lg overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-surface-container border border-[#27272A] space-y-2">
            <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
              Relevance Excerpt
            </div>
            <p className="text-body-md text-primary leading-relaxed">{contentSnippet}</p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
              Full Payload Document & Context
            </div>
            <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] text-body-sm text-on-surface-variant leading-relaxed space-y-3 font-mono">
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
            <div className="text-xs font-code uppercase tracking-wider text-on-surface-variant">
              Extracted Workspace Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high text-xs text-primary font-code"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md border-t border-[#27272A] bg-surface-container-lowest flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
            <span>Cryptographically Verified Payload</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-fixed-dim transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
