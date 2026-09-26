import React, { useState } from 'react';
import { WORKSPACE_DOCUMENTS_INITIAL } from '../data/mockWorkspacePayload';
import { WorkspaceDocument } from '../types';
import { ActiveView } from '../components/Navigation/Sidebar';
import { IngestModal } from '../components/Modals/IngestModal';
import {
  UploadCloud,
  RefreshCw,
  HardDrive,
  Box as BoxIcon,
  Database,
  Search,
  FileText,
  FileSpreadsheet,
  FileCode,
  File,
  Lock,
  X,
  BookOpen,
  FolderX,
} from 'lucide-react';

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

  const renderFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="w-4 h-4 text-rose-400" />;
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return <FileText className="w-4 h-4 text-blue-400" />;
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
    if (fileName.endsWith('.md')) return <FileCode className="w-4 h-4 text-purple-400" />;
    return <File className="w-4 h-4 text-zinc-400" />;
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
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto space-y-6 text-zinc-100">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#27272A] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
              CROSS-PLATFORM STORAGE
            </span>
            <span className="text-xs text-zinc-400">Google Drive + Box Synchronized</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">File Vault & Knowledge Base</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            All documents, PDF roadmaps, presentations, and spreadsheets pre-indexed with semantic chunking for OmniMind.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsIngestOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-zinc-300" />
            Upload Document
          </button>
          <button
            onClick={() => {
              setDocuments((prev) =>
                prev.map((d) => ({ ...d, indexingStatus: 'Fully Indexed', lastModified: 'Just now' }))
              );
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            Index All Documents
          </button>
        </div>
      </div>

      {/* Storage Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-mono">Google Drive Workspace</span>
            <p className="text-xl font-bold font-mono text-white mt-1">1,842 Files</p>
            <p className="text-xs text-zinc-400 mt-0.5">38.4 GB indexed • Encrypted</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#101014] flex items-center justify-center border border-[#27272A]">
            <HardDrive className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-mono">Box Enterprise Storage</span>
            <p className="text-xl font-bold font-mono text-white mt-1">940 Files</p>
            <p className="text-xs text-zinc-400 mt-0.5">14.1 GB indexed • SOC2</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#101014] flex items-center justify-center border border-[#27272A]">
            <BoxIcon className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase font-mono">Semantic Vector Status</span>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-1">100% Vectorized</p>
            <p className="text-xs text-zinc-400 mt-0.5">Track 2 High-Precision Indexing</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#101014] flex items-center justify-center border border-[#27272A]">
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by filename, author, or keyword..."
            className="w-full bg-[#101014] border border-[#27272A] rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Storage Filter */}
          <div className="flex items-center bg-[#101014] p-1 rounded-lg border border-[#27272A]">
            {(['ALL', 'Google Drive', 'Box Enterprise'] as const).map((app) => (
              <button
                key={app}
                onClick={() => setAppFilter(app)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  appFilter === app
                    ? 'bg-[#18181B] text-white font-semibold border border-[#27272A]'
                    : 'text-zinc-400 hover:text-white'
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
            className="bg-[#101014] border border-[#27272A] rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none"
          >
            <option value="ALL">All Index Statuses</option>
            <option value="Fully Indexed">Fully Indexed</option>
            <option value="Processing Chunks">Processing Chunks</option>
            <option value="Queued">Queued</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-xl border border-[#27272A] bg-[#18181B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272A] bg-[#101014] text-zinc-400 uppercase font-mono tracking-wider text-[11px]">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Origin Storage</th>
                <th className="py-3 px-4">Shared By</th>
                <th className="py-3 px-4">Index Status</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <FolderX className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
                    No documents found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedDocForDetail(doc)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#101014] flex items-center justify-center border border-[#27272A]">
                          {renderFileIcon(doc.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-white text-xs line-clamp-1">{doc.name}</p>
                            {doc.isLocked && <Lock className="w-3 h-3 text-zinc-500" />}
                          </div>
                          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                            {doc.size} • {doc.pagesOrSheets}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#101014] text-xs font-medium border border-[#27272A] text-zinc-300">
                        {doc.sourceApp === 'Google Drive' ? (
                          <HardDrive className="w-3 h-3 text-blue-400" />
                        ) : (
                          <BoxIcon className="w-3 h-3 text-indigo-400" />
                        )}
                        <span>{doc.sourceApp}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 border border-[#27272A] flex items-center justify-center text-[10px] font-bold text-zinc-300 font-mono">
                          {doc.sharedByInitials}
                        </div>
                        <span className="text-xs text-zinc-300">{doc.sharedBy}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
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

                    <td className="py-3 px-4 text-xs text-zinc-400 font-mono">{doc.lastModified}</td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            if (onSelectDocumentForSummary) {
                              onSelectDocumentForSummary(doc.name);
                            }
                            onNavigate('summarizer');
                          }}
                          className="px-2.5 py-1 rounded text-xs bg-[#101014] hover:bg-zinc-800 border border-[#27272A] text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                          Summarize
                        </button>
                        <button
                          onClick={() => handleReindex(doc.id)}
                          title="Re-index document"
                          className="w-7 h-7 rounded flex items-center justify-center bg-[#101014] hover:bg-zinc-800 border border-[#27272A] text-zinc-400 hover:text-white transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#101014] flex items-center justify-center border border-[#27272A]">
                  {renderFileIcon(selectedDocForDetail.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm line-clamp-1">
                    {selectedDocForDetail.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">{selectedDocForDetail.sourceApp}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocForDetail(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#27272A]">
                <span className="text-zinc-400">File Size:</span>
                <span className="font-mono text-zinc-200">{selectedDocForDetail.size}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]">
                <span className="text-zinc-400">Length / Structure:</span>
                <span className="text-zinc-200">{selectedDocForDetail.pagesOrSheets}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]">
                <span className="text-zinc-400">Shared By / Author:</span>
                <span className="text-zinc-200">{selectedDocForDetail.sharedBy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]">
                <span className="text-zinc-400">Indexing Status:</span>
                <span className="text-emerald-400 font-medium">{selectedDocForDetail.indexingStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#27272A]">
                <span className="text-zinc-400">Last Synced:</span>
                <span className="font-mono text-zinc-200">{selectedDocForDetail.lastModified}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDocForDetail(null)}
                className="px-4 py-2 rounded-lg bg-[#101014] border border-[#27272A] text-xs text-zinc-300 hover:text-white transition-colors"
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
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-black" />
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
