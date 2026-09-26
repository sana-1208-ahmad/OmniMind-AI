import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { KNOWLEDGE_NODES_INITIAL } from '../data/mockWorkspacePayload';
import { KnowledgeNode } from '../types';
import { IngestModal } from '../components/Modals/IngestModal';
import {
  Search,
  Plus,
  X,
  Layers,
  MessageSquare,
  FileText,
  Shield,
  BarChart2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Activity,
  Calendar,
  User,
  ChevronRight,
  Pin,
  ExternalLink,
  Bot,
  Sparkles,
} from 'lucide-react';

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
    <div className="flex flex-col w-full h-full min-h-full relative bg-[#09090B] text-zinc-100 overflow-hidden select-none">
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
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3.5 border-b border-[#27272A] bg-[#09090B]/90 backdrop-blur-md flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
              Multi-Tool Neural Lattice
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive Knowledge Graph
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            1,420 cross-platform entities (Slack, Drive, Notion, Box, Gmail)
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-[#18181B] rounded-lg px-3 py-1.5 border border-[#27272A] flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter nodes or tags..."
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600 text-xs"
            />
          </div>

          <div className="flex items-center bg-[#18181B] p-1 rounded-lg border border-[#27272A] text-xs">
            <button
              onClick={() => setNodeFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                nodeFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setNodeFilter('documents')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                nodeFilter === 'documents' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Docs
            </button>
            <button
              onClick={() => setNodeFilter('slack')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                nodeFilter === 'slack' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Slack
            </button>
          </div>

          <button
            onClick={() => setIngestModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-zinc-950 rounded-lg text-xs font-medium hover:bg-zinc-200 transition"
          >
            <Plus className="w-3.5 h-3.5" />
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
                <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.5"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"></stop>
              </linearGradient>
            </defs>

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
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all ${
                      isSelected
                        ? 'bg-white text-zinc-950 ring-4 ring-white/30'
                        : 'bg-white text-zinc-950'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0 max-w-[280px]">
                      <span className="text-sm font-bold text-zinc-950 truncate">
                        {node.title}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-600 truncate">
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
                  className={`relative flex items-center gap-3 bg-[#18181B] hover:bg-zinc-800 border px-3.5 py-2.5 rounded-xl shadow-xl transition-all ${
                    isSelected ? 'border-white ring-2 ring-white/30' : 'border-[#27272A]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#27272A] flex items-center justify-center text-zinc-200 shrink-0">
                    {node.type === 'slack' ? (
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                    ) : node.type === 'financial' ? (
                      <FileText className="w-4 h-4 text-emerald-400" />
                    ) : node.type === 'document' ? (
                      <Shield className="w-4 h-4 text-purple-400" />
                    ) : (
                      <BarChart2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 max-w-[220px]">
                    <span className="text-xs font-semibold text-white truncate">{node.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono truncate">
                      {node.code} • {node.linksCount} links
                    </span>
                  </div>

                  {isPinned && (
                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black text-[9px] font-bold">
                      ★
                    </div>
                  )}

                  {node.relevance.includes('98') && (
                    <>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Canvas Controls Floating Widget */}
          <div className="absolute bottom-5 left-5 flex items-center gap-1 bg-[#18181B] border border-[#27272A] p-1 rounded-xl shadow-xl z-20">
            <button
              onClick={() => setZoomScale((z) => Math.min(1.6, z + 0.15))}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomScale((z) => Math.max(0.6, z - 0.15))}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-[#27272A] mx-0.5"></div>
            <button
              onClick={() => setZoomScale(1)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
              title="Reset View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPhysicsActive(!physicsActive)}
              className={`p-1.5 transition-colors rounded-lg hover:bg-zinc-800 ${
                physicsActive ? 'text-white' : 'text-zinc-500'
              }`}
              title="Graph Dynamics Toggle"
            >
              <Activity className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Drawer (Slide-out when node selected) */}
        {selectedNode && (
          <div className="w-full sm:w-[380px] md:w-[420px] max-w-full bg-[#18181B] border-l border-[#27272A] flex flex-col h-full z-30 sm:relative fixed inset-y-0 right-0 shadow-2xl animate-in slide-in-from-right duration-200 shrink-0">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                  {selectedNode.category}
                </span>
                <span className="text-emerald-400 font-mono text-xs">
                  {selectedNode.relevance}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-white">{selectedNode.title}</h2>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {selectedNode.updatedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    {selectedNode.author}
                  </span>
                </div>
              </div>

              {/* Structured AI Summary Card */}
              <div className="flex flex-col bg-[#101014] p-4 rounded-xl border border-[#27272A] gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Autonomous Knowledge Summary
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Track 2 Verified</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Linked Files & Communications */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-medium">
                  Connected Tool Files ({selectedNode.connectedFiles.length})
                </span>
                <div className="flex flex-col gap-1.5">
                  {selectedNode.connectedFiles.map((file, i) => (
                    <div
                      key={i}
                      onClick={() => onNavigate('summarizer')}
                      className="flex items-center justify-between p-2.5 bg-[#101014] hover:bg-zinc-800/60 rounded-lg transition cursor-pointer border border-[#27272A]"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs text-zinc-200 font-mono truncate">{file}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vector Cluster Neighbors */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-medium">
                  Vector Cluster Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#101014] border border-[#27272A] text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#27272A] flex items-center gap-2 bg-[#18181B]">
              <button
                onClick={() => onNavigate('summarizer')}
                className="flex-1 py-2 bg-white text-zinc-950 font-medium rounded-lg text-xs hover:bg-zinc-200 transition text-center"
              >
                Inspect in Doc Summarizer
              </button>
              <button
                onClick={() => togglePin(selectedNode.id)}
                className={`p-2 rounded-lg border transition ${
                  pinnedNodes.includes(selectedNode.id)
                    ? 'bg-amber-400/20 text-amber-400 border-amber-400/40'
                    : 'bg-[#101014] hover:bg-zinc-800 border-[#27272A] text-zinc-300'
                }`}
                title="Pin Node"
              >
                <Pin className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
