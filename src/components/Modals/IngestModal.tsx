import React, { useState } from 'react';
import { WorkspaceDocument } from '../../types';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md bg-surface-container-low border border-[#27272A] rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">upload_file</span>
            <span className="text-headline-sm font-semibold text-primary">Ingest Document</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-primary transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-code uppercase text-on-surface-variant mb-1">
              Document Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Q3_Incident_Response_Plan.pdf"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container text-on-surface px-3 py-2 rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm font-body-md"
            />
          </div>

          <div>
            <label className="block text-xs font-code uppercase text-on-surface-variant mb-1">
              Destination Platform
            </label>
            <select
              value={sourceApp}
              onChange={(e) => setSourceApp(e.target.value as any)}
              className="w-full bg-surface-container text-on-surface px-3 py-2 rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm font-body-md"
            >
              <option value="Google Drive">Google Drive (Enterprise Storage)</option>
              <option value="Box Enterprise">Box Enterprise (Secure Vault)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-code uppercase text-on-surface-variant mb-1">
              Shared By / Owner
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full bg-surface-container text-on-surface px-3 py-2 rounded-xl border border-[#27272A] focus:outline-none focus:border-primary text-body-sm font-body-md"
            />
          </div>

          <div className="p-3 bg-surface-container rounded-xl border border-[#27272A] text-xs text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px]">neurology</span>
            <span>Will be embedded in 1,248,590+ vector index with sub-15ms searchability.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-on-primary hover:bg-primary-fixed-dim transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    progress_activity
                  </span>
                  <span>Indexing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
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
