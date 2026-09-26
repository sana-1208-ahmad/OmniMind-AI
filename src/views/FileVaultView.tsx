import React, { useState } from 'react';
import { WORKSPACE_DOCUMENTS_INITIAL } from '../data/mockWorkspacePayload';
import { WorkspaceDocument } from '../types';
import { ActiveView } from '../components/Navigation/Sidebar';
import { IngestModal } from '../components/Modals/IngestModal';

interface FileVaultViewProps {
  onNavigate: (view: ActiveView) => void;
  onSelectDocumentForSummary?: (docName: string) => void;
}

export const FileVaultView: React.FC<FileVaultViewProps> = ({ onNavigate, onSelectDocumentForSummary }) => {
  const [documents, setDocuments] = useState<WorkspaceDocument[]>(WORKSPACE_DOCUMENTS_INITIAL);
  const [searchQuery, setSearchQuery] = useState('');
  const [appFilter, setAppFilter] = useState<'ALL' | 'Google Drive' | 'Box Enterprise'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [selectedDocForDetail, setSelectedDocForDetail] = useState<WorkspaceDocument | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sharedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesApp = appFilter === 'ALL' || doc.sourceApp === appFilter;
    const matchesStatus = statusFilter === 'ALL' || doc.indexingStatus === statusFilter;
    return matchesSearch && matchesApp && matchesStatus;
  });

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return 'picture_as_pdf';
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return 'article';
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) return 'table_chart';
    if (fileName.endsWith('.md')) return 'markdown';
    return 'description';
  };

  const handleIngest = (newDoc: Partial<WorkspaceDocument>) => {
    const completeDoc: WorkspaceDocument = {
      id: `doc-${Date.now()}`,
      name: newDoc.name || 'Untitled_Enterprise_Doc.pdf',
      size: newDoc.size || '3.2 MB',
      pagesOrSheets: newDoc.pagesOrSheets || '18 pages',
      sourceApp: newDoc.sourceApp || 'Google Drive',
      sharedBy: 'Current User',
      sharedByInitials: 'CU',
      lastModified: 'Just now',
      indexingStatus: 'Fully Indexed',
      isLocked: false,
    };
    setDocuments([completeDoc, ...documents]);
  };

  const handleReindex = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, indexingStatus: 'Processing Chunks' } : d))
    );
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, indexingStatus: 'Fully Indexed', lastModified: 'Just now' } : d))
      );
    }, 1200);
  };

  return (
    <div className="flex-1 p-space-xl max-w-7xl mx-auto space-y-space-xl animate-fade-in text-primary">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-[#27272A]/60 pb-space-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              CROSS-PLATFORM STORAGE
            </span>
            <span className="text-[12px] text-secondary">Google Drive + Box Synchronized</span>
          </div>
          <h1 className="text-display-sm font-semibold tracking-tight text-primary">File Vault & Knowledge Base</h1>
          <p className="text-secondary text-body-md mt-1">
            All documents, PDF roadmaps, presentations, and spreadsheets pre-indexed with semantic chunking for OmniMind.
          </p>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => setIsIngestOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high border border-[#27272A] text-sm text-primary hover:bg-[#27272A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            Upload Document
          </button>
          <button
            onClick={() => {
              setDocuments((prev) =>
                prev.map((d) => ({ ...d, indexingStatus: 'Fully Indexed', lastModified: 'Just now' }))
              );
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Index All Documents
          </button>
        </div>
      </div>

      {/* Storage Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex items-center justify-between">
          <div>
            <span className="text-xs text-secondary uppercase font-mono">Google Drive Workspace</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">1,842 Files</p>
            <p className="text-xs text-secondary mt-0.5">38.4 GB indexed • Encrypted</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A]">
            <span className="material-symbols-outlined text-blue-400">folder_shared</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex items-center justify-between">
          <div>
            <span className="text-xs text-secondary uppercase font-mono">Box Enterprise Storage</span>
            <p className="text-xl font-bold font-mono text-primary mt-1">940 Files</p>
            <p className="text-xs text-secondary mt-0.5">14.1 GB indexed • SOC2</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A]">
            <span className="material-symbols-outlined text-indigo-400">inventory_2</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-[#27272A]/70 flex items-center justify-between">
          <div>
            <span className="text-xs text-secondary uppercase font-mono">Semantic Vector Status</span>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-1">100% Vectorized</p>
            <p className="text-xs text-secondary mt-0.5">Track 2 High-Precision Indexing</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A]">
            <span className="material-symbols-outlined text-emerald-400">dataset</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low border border-[#27272A]/70">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by filename, author, or keyword..."
            className="w-full bg-surface-container-lowest border border-[#27272A] rounded-lg pl-9 pr-4 py-2 text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Storage Filter */}
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-lg border border-[#27272A]">
            {(['ALL', 'Google Drive', 'Box Enterprise'] as const).map((app) => (
              <button
                key={app}
                onClick={() => setAppFilter(app)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  appFilter === app
                    ? 'bg-surface-container-high text-primary font-semibold shadow-xs'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {app}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-lowest border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-primary focus:outline-none"
          >
            <option value="ALL">All Index Statuses</option>
            <option value="Fully Indexed">Fully Indexed</option>
            <option value="Processing Chunks">Processing Chunks</option>
            <option value="Queued">Queued</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-xl border border-[#27272A]/70 bg-surface-container-low overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] bg-surface-container-lowest/60 text-secondary text-xs uppercase font-mono tracking-wider">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Origin Storage</th>
                <th className="py-3 px-4">Shared By</th>
                <th className="py-3 px-4">Index Status</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]/60">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-secondary">
                    <span className="material-symbols-outlined text-[36px] mb-2 block text-secondary/50">
                      folder_off
                    </span>
                    No documents found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-surface-container/60 transition-colors cursor-pointer group"
                    onClick={() => setSelectedDocForDetail(doc)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-[#27272A] text-secondary group-hover:text-primary">
                          <span className="material-symbols-outlined text-[18px]">{getFileIcon(doc.name)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-primary text-sm line-clamp-1">{doc.name}</p>
                            {doc.isLocked && (
                              <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                            )}
                          </div>
                          <p className="text-xs text-secondary font-mono mt-0.5">
                            {doc.size} • {doc.pagesOrSheets}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs font-medium border border-[#27272A]">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {doc.sourceApp === 'Google Drive' ? 'folder_shared' : 'inventory_2'}
                        </span>
                        <span>{doc.sourceApp}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high border border-[#27272A] flex items-center justify-center text-[10px] font-bold text-primary">
                          {doc.sharedByInitials}
                        </div>
                        <span className="text-xs text-primary">{doc.sharedBy}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc.indexingStatus === 'Fully Indexed'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            : doc.indexingStatus === 'Processing Chunks'
                            ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50'
                            : 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doc.indexingStatus === 'Fully Indexed'
                              ? 'bg-emerald-400'
                              : doc.indexingStatus === 'Processing Chunks'
                              ? 'bg-blue-400 animate-pulse'
                              : 'bg-amber-400'
                          }`}
                        />
                        {doc.indexingStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-secondary font-mono">{doc.lastModified}</td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            if (onSelectDocumentForSummary) {
                              onSelectDocumentForSummary(doc.name);
                            }
                            onNavigate('summarizer');
                          }}
                          className="px-2.5 py-1 rounded text-xs bg-surface-container-high hover:bg-[#27272A] border border-[#27272A] text-secondary hover:text-primary transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                          Summarize
                        </button>
                        <button
                          onClick={() => handleReindex(doc.id)}
                          title="Re-index document"
                          className="w-7 h-7 rounded flex items-center justify-center bg-surface-container hover:bg-[#27272A] border border-[#27272A] text-secondary hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">refresh</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocForDetail && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container border border-[#27272A] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center border border-[#27272A]">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {getFileIcon(selectedDocForDetail.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-base line-clamp-1">
                    {selectedDocForDetail.name}
                  </h3>
                  <p className="text-xs text-secondary font-mono">{selectedDocForDetail.sourceApp}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocForDetail(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-[#27272A]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-[#27272A]/50">
                <span className="text-secondary">File Size:</span>
                <span className="font-mono text-primary">{selectedDocForDetail.size}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]/50">
                <span className="text-secondary">Length / Structure:</span>
                <span className="text-primary">{selectedDocForDetail.pagesOrSheets}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]/50">
                <span className="text-secondary">Shared By / Author:</span>
                <span className="text-primary">{selectedDocForDetail.sharedBy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]/50">
                <span className="text-secondary">Indexing Status:</span>
                <span className="text-emerald-400 font-medium">{selectedDocForDetail.indexingStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]/50">
                <span className="text-secondary">Last Synced:</span>
                <span className="font-mono text-primary">{selectedDocForDetail.lastModified}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDocForDetail(null)}
                className="px-4 py-2 rounded-lg bg-surface-container-high border border-[#27272A] text-sm text-secondary hover:text-primary transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (onSelectDocumentForSummary) {
                    onSelectDocumentForSummary(selectedDocForDetail.name);
                  }
                  setSelectedDocForDetail(null);
                  onNavigate('summarizer');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">summarize</span>
                Open in Summarizer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ingest Modal */}
      <IngestModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
        onIngest={(doc) => handleIngest(doc)}
      />
    </div>
  );
};
