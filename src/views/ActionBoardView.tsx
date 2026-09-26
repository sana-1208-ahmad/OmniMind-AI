import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { ACTION_ITEMS_INITIAL } from '../data/mockWorkspacePayload';
import { ActionItem } from '../types';
import {
  CheckSquare,
  Plus,
  RefreshCw,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Hash,
  Mail,
  HardDrive,
  FileText,
  Box as BoxIcon,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface ActionBoardViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const ActionBoardView: React.FC<ActionBoardViewProps> = () => {
  const [tasks, setTasks] = useState<ActionItem[]>(ACTION_ITEMS_INITIAL);
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'my'>('all');
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<'todo' | 'in_progress' | 'completed'>('todo');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSource, setNewTaskSource] = useState<'Slack' | 'Gmail' | 'Google Drive' | 'Notion' | 'Box'>('Slack');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'high') return t.priority === 'High';
    if (activeFilter === 'my') return t.assignee?.includes('Sarah') || t.assignee?.includes('Elena');
    return true;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed');

  function handleSync() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setToastMessage('Action Board synchronized with Slack, Gmail, Drive, Notion & Box.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 900);
  }

  function moveTask(taskId: string, newStatus: 'todo' | 'in_progress' | 'completed') {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function openCreateTaskModal(column: 'todo' | 'in_progress' | 'completed') {
    setNewTaskColumn(column);
    setNewTaskTitle('');
    setIsNewTaskModalOpen(true);
  }

  function handleCreateTaskSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: ActionItem = {
      id: `task-${Date.now()}`,
      task: newTaskTitle.trim(),
      sourceApp: newTaskSource,
      priority: newTaskPriority,
      assignee: 'Sarah Jenkins',
      assigneeInitials: 'SJ',
      status: newTaskColumn,
      code: `OMN-${Math.floor(8000 + Math.random() * 900)}`,
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsNewTaskModalOpen(false);
    setNewTaskTitle('');
    setToastMessage(`Action item created.`);
    setTimeout(() => setToastMessage(null), 3000);
  }

  const getSourceIcon = (sourceApp: string) => {
    if (sourceApp.includes('Slack')) return <Hash className="w-3.5 h-3.5 text-blue-400" />;
    if (sourceApp.includes('Gmail')) return <Mail className="w-3.5 h-3.5 text-emerald-400" />;
    if (sourceApp.includes('Drive')) return <HardDrive className="w-3.5 h-3.5 text-blue-400" />;
    if (sourceApp.includes('Notion')) return <FileText className="w-3.5 h-3.5 text-purple-400" />;
    return <BoxIcon className="w-3.5 h-3.5 text-amber-400" />;
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-12 text-zinc-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] border border-emerald-500/50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="px-4 sm:px-6 md:px-8 py-5 border-b border-[#27272A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
              Autonomous Extraction
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Action Board &amp; Commitments
          </h1>
          <p className="text-xs text-zinc-400">
            Tasks automatically extracted from conversations, email escalations, and meeting minutes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#18181B] rounded-lg p-1 border border-[#27272A] text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveFilter('high')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeFilter === 'high' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setActiveFilter('my')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeFilter === 'my' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Assigned to Me
            </button>
          </div>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-medium hover:bg-zinc-200 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Tasks'}</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="px-4 sm:px-6 md:px-8 pt-5 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto w-full items-start">
        {/* Column 1: To Do */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                To Do ({todoTasks.length})
              </h2>
            </div>
            <button
              onClick={() => openCreateTaskModal('todo')}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todoTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-zinc-700 hover-card-motion space-y-2 group animate-fade-in"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-400 min-w-0">
                    {getSourceIcon(t.sourceApp)}
                    <span className="truncate max-w-[130px]">{t.sourceApp}</span>
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      t.priority === 'High'
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <h3 className="text-xs font-medium text-zinc-100 group-hover:text-white leading-relaxed break-words">
                  {t.task}
                </h3>

                <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[120px]">
                    {t.assignee || 'Unassigned'}
                  </span>
                  <button
                    onClick={() => moveTask(t.id || '', 'in_progress')}
                    className="text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Start</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                In Progress ({inProgressTasks.length})
              </h2>
            </div>
            <button
              onClick={() => openCreateTaskModal('in_progress')}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {inProgressTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-zinc-700 hover-card-motion space-y-2 group animate-fade-in"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-400 min-w-0">
                    {getSourceIcon(t.sourceApp)}
                    <span className="truncate max-w-[130px]">{t.sourceApp}</span>
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      t.priority === 'High'
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <h3 className="text-xs font-medium text-zinc-100 group-hover:text-white leading-relaxed break-words">
                  {t.task}
                </h3>

                <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[120px]">
                    {t.assignee || 'Unassigned'}
                  </span>
                  <button
                    onClick={() => moveTask(t.id || '', 'completed')}
                    className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Complete</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Completed ({completedTasks.length})
              </h2>
            </div>
            <button
              onClick={() => openCreateTaskModal('completed')}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Add task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {completedTasks.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] hover-card-motion space-y-2 opacity-85 hover:opacity-100 animate-fade-in"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-400 min-w-0">
                    {getSourceIcon(t.sourceApp)}
                    <span className="truncate max-w-[130px]">{t.sourceApp}</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 shrink-0">
                    Done
                  </span>
                </div>

                <h3 className="text-xs font-medium text-zinc-300 line-through leading-relaxed break-words">
                  {t.task}
                </h3>

                <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[120px]">
                    {t.assignee || 'Unassigned'}
                  </span>
                  <button
                    onClick={() => moveTask(t.id || '', 'todo')}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white transition"
                  >
                    Reopen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Create Action Item</h3>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g., Update security compliance docs..."
                  className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-zinc-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Source Tool
                  </label>
                  <select
                    value={newTaskSource}
                    onChange={(e) => setNewTaskSource(e.target.value as any)}
                    className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="Slack">Slack</option>
                    <option value="Gmail">Gmail</option>
                    <option value="Google Drive">Google Drive</option>
                    <option value="Notion">Notion</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-[#101014] border border-[#27272A] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-white text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition"
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
