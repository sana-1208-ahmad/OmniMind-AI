import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { KNOWLEDGE_NODES_INITIAL } from '../data/mockWorkspacePayload';
import { KnowledgeNode } from '../types';
import { IngestModal } from '../components/Modals/IngestModal';

interface KnowledgeGraphViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ onNavigate }) => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>(KNOWLEDGE_NODES_INITIAL);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [nodeFilter, setNodeFilter] = useState<'all' | 'documents' | 'slack'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [zoomScale, setZoomScale] = useState(1);
  const [physicsActive, setPhysicsActive] = useState(true);
  const [ingestModalOpen, setIngestModalOpen] = useState(false);
  const [pinnedNodes, setPinnedNodes] = useState<string[]>([]);

  const filteredNodes = nodes.filter((n) => {
    if (nodeFilter === 'documents' && (n.type === 'slack' || n.category.includes('Communication'))) {
      return false;
    }
    if (nodeFilter === 'slack' && n.type !== 'slack' && !n.category.includes('Communication')) {
      return false;
    }
    if (searchFilter && !n.title.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  function togglePin(nodeId: string) {
    setPinnedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-full relative bg-[#09090B] text-on-surface overflow-hidden">
      <IngestModal
        isOpen={ingestModalOpen}
        onClose={() => setIngestModalOpen(false)}
        onIngest={(newDoc) => {
          const newNode: KnowledgeNode = {
            id: `node-${Date.now()}`,
            title: newDoc.name || 'New Enterprise Ingestion',
            code: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
            category: 'Ingested Specification',
            type: 'document',
            linksCount: 4,
            relevance: '97% relevance',
            summary: 'Newly indexed enterprise document connected into the neural knowledge lattice.',
            connectedFiles: [newDoc.name || 'document.pdf', 'audit_receipt.json'],
            tags: ['#ingested', '#enterprise-vault', '#realtime-vector'],
            xPercent: 35,
            yPercent: 45,
            updatedAt: 'Just now',
            author: 'Current User',
          };
          setNodes((prev) => [...prev, newNode]);
          setSelectedNode(newNode);
        }}
      />

      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      {/* Top Action & Filter Bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-[#27272A]/50 bg-[#09090B]/85 backdrop-blur-md flex-wrap gap-3">
        <div className="flex items-center gap-space-md">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
              Knowledge Graph
            </h1>
            <p className="text-body-sm text-on-surface-variant font-mono text-xs">
              1,420 interconnected enterprise documents &amp; communications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-[#18181B] rounded-xl px-3 py-1.5 border border-[#27272A] flex-1 sm:w-60">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter nodes or tags..."
              className="bg-transparent border-none outline-none text-primary w-full placeholder:text-on-surface-variant/60 text-xs"
            />
          </div>

          <div className="flex items-center bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
            <button
              onClick={() => setNodeFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                nodeFilter === 'all'
                  ? 'bg-[#27272A] text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setNodeFilter('documents')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                nodeFilter === 'documents'
                  ? 'bg-[#27272A] text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Docs
            </button>
            <button
              onClick={() => setNodeFilter('slack')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                nodeFilter === 'slack'
                  ? 'bg-[#27272A] text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Slack
            </button>
          </div>

          <button
            onClick={() => setIngestModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-[#131315] rounded-xl text-xs font-bold shadow-sm hover:bg-primary-fixed-dim transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add_box</span>
            <span>Ingest</span>
          </button>
        </div>
      </header>

      {/* Main Graph & Workspace Container */}
      <div className="relative flex-1 flex w-full min-h-0 overflow-hidden">
        {/* Interactive Graph Canvas Area */}
        <div
          className="flex-1 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ transform: `scale(${zoomScale})`, transition: 'transform 0.2s ease-out' }}
        >
          {/* SVG Vector Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-grad-1" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05"></stop>
              </linearGradient>
              <linearGradient id="line-grad-2" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#c8c6c9" stopOpacity="0.5"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"></stop>
              </linearGradient>
            </defs>

            {/* Dynamic Vector Lines linking to center master node */}
            <path
              d="M 320 200 Q 450 160 580 230"
              fill="none"
              stroke="url(#line-grad-1)"
              strokeDasharray={physicsActive ? '4 4' : 'none'}
              strokeWidth="2"
            />
            <path
              d="M 580 230 Q 720 280 840 180"
              fill="none"
              stroke="url(#line-grad-2)"
              strokeWidth="2"
            />
            <path
              d="M 320 200 Q 420 380 500 420"
              fill="none"
              stroke="url(#line-grad-1)"
              strokeWidth="1.5"
            />
            <path
              d="M 580 230 Q 450 320 320 200"
              fill="none"
              stroke="url(#line-grad-2)"
              strokeWidth="1.5"
            />
            <path
              d="M 500 420 Q 680 480 840 360"
              fill="none"
              stroke="url(#line-grad-1)"
              strokeDasharray={physicsActive ? '6 3' : 'none'}
              strokeWidth="2"
            />
            <path
              d="M 220 180 Q 270 200 320 200"
              fill="none"
              stroke="url(#line-grad-2)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Floating Interactive Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isPinned = pinnedNodes.includes(node.id);

            if (node.isMaster) {
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-105 z-20"
                  style={{ top: `${node.yPercent}%`, left: `${node.xPercent}%` }}
                >
                  <div
                    className={`relative flex items-center gap-space-md px-space-lg py-space-md rounded-2xl shadow-2xl transition-all ${
                      isSelected
                        ? 'bg-primary text-[#131315] ring-4 ring-primary/30'
                        : 'bg-primary text-[#131315]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center text-[#131315]">
                      <span className="material-symbols-outlined text-[24px]">hub</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-headline-sm font-bold text-[#131315]">
                        {node.title}
                      </span>
                      <span className="text-xs font-mono text-[#131315]/80">
                        {node.code} • {node.linksCount} links • Master Node
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-105 z-10"
                style={{ top: `${node.yPercent}%`, left: `${node.xPercent}%` }}
              >
                <div
                  className={`relative flex items-center gap-space-md bg-[#18181B] hover:bg-[#27272A] border px-space-md py-space-sm rounded-xl shadow-xl transition-all ${
                    isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-[#27272A]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      {node.type === 'slack'
                        ? 'forum'
                        : node.type === 'financial'
                        ? 'description'
                        : node.type === 'document'
                        ? 'security'
                        : 'analytics'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md font-semibold text-primary">{node.title}</span>
                    <span className="text-label-sm text-on-surface-variant font-mono text-[11px]">
                      {node.code} • {node.linksCount} links
                    </span>
                  </div>

                  {isPinned && (
                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black text-[10px]">
                      ★
                    </div>
                  )}

                  {node.relevance.includes('98') && (
                    <>
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Canvas Controls Floating Widget */}
          <div className="absolute bottom-space-lg left-space-lg flex items-center gap-space-sm bg-[#18181B] border border-[#27272A] p-1.5 rounded-xl shadow-xl z-20">
            <button
              onClick={() => setZoomScale((z) => Math.min(1.6, z + 0.15))}
              className="p-1.5 text-on-surface-variant hover:text-primary transition-all rounded-lg hover:bg-[#27272A]"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
            <button
              onClick={() => setZoomScale((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 text-on-surface-variant hover:text-primary transition-all rounded-lg hover:bg-[#27272A]"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <div className="w-[1px] h-4 bg-[#27272A] mx-space-xs"></div>
            <button
              onClick={() => setZoomScale(1)}
              className="p-1.5 text-on-surface-variant hover:text-primary transition-all rounded-lg hover:bg-[#27272A]"
              title="Reset View"
            >
              <span className="material-symbols-outlined text-[20px]">fit_screen</span>
            </button>
            <button
              onClick={() => setPhysicsActive(!physicsActive)}
              className={`p-1.5 transition-all rounded-lg hover:bg-[#27272A] ${
                physicsActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
              title="Graph Physics Toggle"
            >
              <span className="material-symbols-outlined text-[20px]">animation</span>
            </button>
          </div>
        </div>

        {/* Preview Drawer (Slide-out when node selected) */}
        {selectedNode && (
          <div className="w-full sm:w-[420px] max-w-full bg-[#18181B] border-l border-[#27272A] flex flex-col h-full z-30 absolute right-0 top-0 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-space-lg py-space-md border-b border-[#27272A]">
              <div className="flex items-center gap-space-sm">
                <span className="px-space-sm py-0.5 rounded bg-[#27272A] text-on-surface text-label-sm font-mono text-[11px]">
                  {selectedNode.category}
                </span>
                <span className="text-emerald-400 text-label-sm font-mono text-xs">
                  {selectedNode.relevance}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 text-on-surface-variant hover:text-primary rounded-lg hover:bg-[#27272A] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Drawer Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
              {/* Title & Metadata */}
              <div className="flex flex-col gap-space-xs">
                <h2 className="text-headline-md font-bold text-primary">{selectedNode.title}</h2>
                <div className="flex items-center gap-space-md text-xs text-on-surface-variant font-mono">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {selectedNode.updatedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {selectedNode.author}
                  </span>
                </div>
              </div>

              {/* Structured AI Summary Card */}
              <div className="flex flex-col bg-[#201f22] p-space-lg rounded-2xl border border-[#27272A] gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="text-label-md font-semibold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      auto_awesome
                    </span>
                    Structured AI Summary
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant">OmniMind v4.2</span>
                </div>
                <p className="text-body-md text-on-surface font-body-md leading-relaxed">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Linked Files & Communications */}
              <div className="flex flex-col gap-space-md">
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  Connected Entities &amp; Files ({selectedNode.connectedFiles.length})
                </span>
                <div className="flex flex-col gap-space-xs">
                  {selectedNode.connectedFiles.map((file, i) => (
                    <div
                      key={i}
                      onClick={() => onNavigate('summarizer')}
                      className="flex items-center justify-between p-space-md bg-[#201f22] hover:bg-[#2a2a2c] rounded-xl transition-all cursor-pointer border border-[#27272A]"
                    >
                      <div className="flex items-center gap-space-md">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          {file.endsWith('.pdf')
                            ? 'picture_as_pdf'
                            : file.endsWith('.xlsx')
                            ? 'table_chart'
                            : 'description'}
                        </span>
                        <span className="text-body-sm text-primary font-mono truncate">{file}</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge Graph Context / Neighbors */}
              <div className="flex flex-col gap-space-md">
                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  Vector Cluster Neighbors
                </span>
                <div className="flex flex-wrap gap-space-xs">
                  {selectedNode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-space-md py-1 rounded-lg bg-[#201f22] border border-[#27272A] text-xs font-mono text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-space-lg border-t border-[#27272A] flex items-center gap-space-md bg-[#18181B]">
              <button
                onClick={() => onNavigate('summarizer')}
                className="flex-1 py-space-md bg-primary text-[#131315] font-bold rounded-xl text-xs hover:bg-primary-fixed-dim transition-all text-center shadow-md cursor-pointer"
              >
                Open Full Document
              </button>
              <button
                onClick={() => togglePin(selectedNode.id)}
                className={`p-space-md rounded-xl border transition-all cursor-pointer ${
                  pinnedNodes.includes(selectedNode.id)
                    ? 'bg-amber-400/20 text-amber-400 border-amber-400/40'
                    : 'bg-[#201f22] hover:bg-[#27272A] border-[#27272A] text-primary'
                }`}
                title="Pin Node"
              >
                <span className="material-symbols-outlined text-[20px]">push_pin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
