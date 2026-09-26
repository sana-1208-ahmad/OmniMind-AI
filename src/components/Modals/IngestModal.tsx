import React, { useState } from 'react';
import { WorkspaceDocument } from '../../types';
import { UploadCloud, X, Layers, Loader2 } from 'lucide-react';

interface IngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngest: (doc: Partial<WorkspaceDocument>) => void;
}

export const IngestModal: React.FC<IngestModalProps> = ({ isOpen, onClose, onIngest }) => {
  const [name, setName] = useState('');
  const [sourceApp, setSourceApp] = useState<'Google Drive' | 'Box Enterprise'>('Google Drive');
  const [owner, setOwner] = useState('Current User (Admin)');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    setTimeout(() => {
      onIngest({
        id: `doc-${Date.now()}`,
        name: name.trim().endsWith('.pdf') || name.trim().endsWith('.docx') ? name.trim() : `${name.trim()}.pdf`,
        size: '3.8 MB',
        pagesOrSheets: '24 pages',
        sourceApp,
        sharedBy: owner,
        sharedByInitials: 'CU',
        lastModified: 'Just now',
        indexingStatus: 'Fully Indexed',
      });
      setLoading(false);
      onClose();
    }, 700);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-white" />
            <span className="text-base font-semibold text-white">Ingest Document</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
              Document Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Q3_Incident_Response_Plan.pdf"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#101014] text-zinc-200 px-3 py-2.5 rounded-xl border border-[#27272A] focus:outline-none focus:border-zinc-500 text-xs font-sans placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
              Destination Platform
            </label>
            <select
              value={sourceApp}
              onChange={(e) => setSourceApp(e.target.value as any)}
              className="w-full bg-[#101014] text-zinc-200 px-3 py-2.5 rounded-xl border border-[#27272A] focus:outline-none focus:border-zinc-500 text-xs font-sans"
            >
              <option value="Google Drive">Google Drive (Swytchcode Ingest)</option>
              <option value="Box Enterprise">Box Enterprise (Secure Vault)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
              Shared By / Owner
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-[#101014] text-zinc-200 px-3 py-2.5 rounded-xl border border-[#27272A] focus:outline-none focus:border-zinc-500 text-xs font-sans"
            />
          </div>

          <div className="p-3 bg-[#101014] rounded-xl border border-[#27272A] text-xs text-zinc-400 flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-zinc-300 shrink-0" />
            <span>Embedded in unified vector index with sub-15ms search latency.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-xl bg-[#101014] hover:bg-zinc-800 text-zinc-300 transition border border-[#27272A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-white text-black hover:bg-zinc-200 transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Indexing...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-black" />
                  <span>Ingest & Vectorize</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
