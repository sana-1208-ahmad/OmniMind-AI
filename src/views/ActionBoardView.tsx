import React, { useState } from 'react';
import { ActiveView } from '../components/Navigation/Sidebar';
import { ACTION_ITEMS_INITIAL } from '../data/mockWorkspacePayload';
import { ActionItem } from '../types';

interface ActionBoardViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const ActionBoardView: React.FC<ActionBoardViewProps> = () => {
  const [tasks, setTasks] = useState<ActionItem[]>(ACTION_ITEMS_INITIAL);
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'my'>('all');
  const [mobileKanbanTab, setMobileKanbanTab] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'high') return t.priority === 'High';
    if (activeFilter === 'my') return t.assignee?.includes('Sarah') || t.assignee?.includes('Elena');
    return true;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'completed');

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<'todo' | 'in_progress' | 'completed'>('todo');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSource, setNewTaskSource] = useState<'Slack' | 'Gmail' | 'Google Drive' | 'Notion' | 'Box'>('Slack');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

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
    setToastMessage(`Action item added to ${newTaskColumn.replace('_', ' ')}.`);
    setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <div className="flex flex-col w-full min-h-full bg-surface text-on-surface pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-emerald-500/40 text-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Controls */}
      <div className="px-4 sm:px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-outline">
              Reasoning Engine
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface-container-high text-primary border border-[#27272A]">
              Live Sync
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-primary tracking-tight text-2xl sm:text-3xl">
            Action Board
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full md:w-auto justify-between md:justify-end">
          {/* Filter Buttons */}
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-[#27272A]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveFilter('high')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'high'
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setActiveFilter('my')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeFilter === 'my'
                  ? 'bg-surface-container-high text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Assigned to Me
            </button>
          </div>

          {/* Primary Action */}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-[#131315] font-semibold text-xs hover:bg-primary-fixed-dim transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${syncing ? 'animate-spin' : ''}`}>
              bolt
            </span>
            <span>{syncing ? 'Syncing...' : 'Sync Commitments'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Column Selector */}
      <div className="px-4 sm:px-6 md:hidden max-w-7xl mx-auto w-full mb-4">
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-[#27272A] text-xs font-mono">
          <button
            onClick={() => setMobileKanbanTab('all')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
              mobileKanbanTab === 'all'
                ? 'bg-surface-container-high text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All ({filteredTasks.length})
          </button>
          <button
            onClick={() => setMobileKanbanTab('todo')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
              mobileKanbanTab === 'todo'
                ? 'bg-primary text-black font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            To Do ({todoTasks.length})
          </button>
          <button
            onClick={() => setMobileKanbanTab('in_progress')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
              mobileKanbanTab === 'in_progress'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Active ({inProgressTasks.length})
          </button>
          <button
            onClick={() => setMobileKanbanTab('completed')}
            className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
              mobileKanbanTab === 'completed'
                ? 'bg-emerald-400 text-black font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Done ({completedTasks.length})
          </button>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="px-4 sm:px-6 md:px-8 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start max-w-7xl mx-auto w-full">
        {/* Column 1: To Do */}
        <div className={`${mobileKanbanTab === 'all' || mobileKanbanTab === 'todo' ? 'flex' : 'hidden md:flex'} flex-col gap-4`}>
          <div className="flex items-center justify-between px-space-xs py-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <h2 className="text-headline-sm font-semibold text-primary">To Do</h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface-container-high text-on-surface-variant">
                {todoTasks.length}
              </span>
            </div>
            <button
              onClick={() => openCreateTaskModal('todo')}
              className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container"
              title="Add task"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {todoTasks.map((t) => (
            <div
              key={t.id}
              className="flex flex-col bg-surface-container-low rounded-2xl p-space-md hover:bg-surface-container transition-all group relative border border-[#27272A]"
            >
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {t.sourceApp.includes('Slack')
                      ? 'chat'
                      : t.sourceApp.includes('Gmail')
                      ? 'mail'
                      : 'description'}
                  </span>
                  <span className="truncate max-w-[150px]">{t.sourceApp}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    t.priority === 'High'
                      ? 'bg-error-container text-error'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {t.priority} Priority
                </span>
              </div>

              <h3 className="text-body-md font-semibold text-primary mb-1 group-hover:text-primary-container transition-colors">
                {t.task}
              </h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Commitment automatically detected and parsed by OmniMind reasoning engine.
              </p>

              <div className="flex items-center justify-between pt-space-sm border-t border-[#27272A]">
                <div className="flex items-center gap-space-xs">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold text-primary font-mono">
                    {t.assigneeInitials}
                  </div>
                  <span className="text-xs text-on-surface-variant">{t.assignee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-outline">{t.code}</span>
                  <button
                    onClick={() => moveTask(t.id!, 'in_progress')}
                    title="Move to In Progress"
                    className="p-1 rounded bg-surface-container hover:bg-primary hover:text-black text-on-surface-variant transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: In Progress */}
        <div className={`${mobileKanbanTab === 'all' || mobileKanbanTab === 'in_progress' ? 'flex' : 'hidden md:flex'} flex-col gap-4`}>
          <div className="flex items-center justify-between px-space-xs py-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <h2 className="text-headline-sm font-semibold text-primary">In Progress</h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface-container-high text-on-surface-variant">
                {inProgressTasks.length}
              </span>
            </div>
            <button
              onClick={() => openCreateTaskModal('in_progress')}
              className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container"
              title="Add task"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {inProgressTasks.map((t) => (
            <div
              key={t.id}
              className="flex flex-col bg-surface-container-low rounded-2xl p-space-md hover:bg-surface-container transition-all group relative border border-[#27272A]"
            >
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {t.sourceApp.includes('Slack')
                      ? 'chat'
                      : t.sourceApp.includes('Gmail')
                      ? 'mail'
                      : 'smart_toy'}
                  </span>
                  <span className="truncate max-w-[150px]">{t.sourceApp}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    t.priority === 'High'
                      ? 'bg-error-container text-error'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {t.priority} Priority
                </span>
              </div>

              <h3 className="text-body-md font-semibold text-primary mb-1">
                {t.task}
              </h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Active execution tracking in progress across designated stakeholder threads.
              </p>

              <div className="flex items-center justify-between pt-space-sm border-t border-[#27272A]">
                <div className="flex items-center gap-space-xs">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold text-primary font-mono">
                    {t.assigneeInitials}
                  </div>
                  <span className="text-xs text-on-surface-variant">{t.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveTask(t.id!, 'todo')}
                    title="Move back to To Do"
                    className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                  <button
                    onClick={() => moveTask(t.id!, 'completed')}
                    title="Complete task"
                    className="p-1 rounded bg-surface-container hover:bg-emerald-500 hover:text-black text-on-surface-variant transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Completed */}
        <div className={`${mobileKanbanTab === 'all' || mobileKanbanTab === 'completed' ? 'flex' : 'hidden md:flex'} flex-col gap-4`}>
          <div className="flex items-center justify-between px-space-xs py-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <h2 className="text-headline-sm font-semibold text-primary">Completed</h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-surface-container-high text-on-surface-variant">
                {completedTasks.length}
              </span>
            </div>
            <button
              onClick={() => openCreateTaskModal('completed')}
              className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container"
              title="Add task"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {completedTasks.map((t) => (
            <div
              key={t.id}
              className="flex flex-col bg-surface-container-low rounded-2xl p-space-md hover:bg-surface-container transition-all group relative border border-[#27272A] opacity-75"
            >
              <div className="flex items-center justify-between mb-space-sm">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {t.sourceApp.includes('Slack') ? 'tag' : 'mail'}
                  </span>
                  <span className="truncate max-w-[150px]">{t.sourceApp}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-semibold">
                  Done
                </span>
              </div>

              <h3 className="text-body-md font-semibold text-primary mb-1 line-through text-on-surface-variant">
                {t.task}
              </h3>
              <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                Verification logs confirmed and archived in enterprise compliance ledger.
              </p>

              <div className="flex items-center justify-between pt-space-sm border-t border-[#27272A]">
                <div className="flex items-center gap-space-xs">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold text-primary font-mono">
                    {t.assigneeInitials}
                  </div>
                  <span className="text-xs text-on-surface-variant">{t.assignee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-outline">{t.code}</span>
                  <button
                    onClick={() => moveTask(t.id!, 'in_progress')}
                    title="Re-open task"
                    className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">undo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Action Item Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">add_task</span>
                <h3 className="font-semibold text-primary text-base">New Action Item</h3>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="text-on-surface-variant hover:text-primary transition"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5">
                  Task Description
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Schedule database migration rehearsal..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest text-primary placeholder:text-outline border border-[#27272A] focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5">
                    Source App
                  </label>
                  <select
                    value={newTaskSource}
                    onChange={(e) => setNewTaskSource(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest text-primary border border-[#27272A] focus:outline-none focus:border-primary text-xs font-mono"
                  >
                    <option value="Slack">Slack</option>
                    <option value="Gmail">Gmail</option>
                    <option value="Google Drive">Google Drive</option>
                    <option value="Notion">Notion</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest text-primary border border-[#27272A] focus:outline-none focus:border-primary text-xs font-mono"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5">
                  Initial Column
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTaskColumn('todo')}
                    className={`py-1.5 rounded-lg text-xs font-mono text-center border transition ${
                      newTaskColumn === 'todo'
                        ? 'bg-primary text-black font-bold border-primary'
                        : 'bg-surface-container text-on-surface-variant border-[#27272A]'
                    }`}
                  >
                    To Do
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTaskColumn('in_progress')}
                    className={`py-1.5 rounded-lg text-xs font-mono text-center border transition ${
                      newTaskColumn === 'in_progress'
                        ? 'bg-amber-400 text-black font-bold border-amber-400'
                        : 'bg-surface-container text-on-surface-variant border-[#27272A]'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTaskColumn('completed')}
                    className={`py-1.5 rounded-lg text-xs font-mono text-center border transition ${
                      newTaskColumn === 'completed'
                        ? 'bg-emerald-400 text-black font-bold border-emerald-400'
                        : 'bg-surface-container text-on-surface-variant border-[#27272A]'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#27272A]">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary text-black font-bold text-xs hover:opacity-90 transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
