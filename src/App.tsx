import { useState, useEffect } from 'react';
import { Sidebar, ActiveView } from './components/Navigation/Sidebar';
import { TopHeader } from './components/Navigation/TopHeader';
import { OmniMindSearchModal } from './components/Modals/OmniMindSearchModal';
import { SwytchcodeStatusToast } from './components/Notifications/SwytchcodeStatusToast';

// Views
import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { MorningBriefingView } from './views/MorningBriefingView';
import { UniversalSearchView } from './views/UniversalSearchView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { DocumentSummarizerView } from './views/DocumentSummarizerView';
import { ActionBoardView } from './views/ActionBoardView';
import { TriggerStudioView } from './views/TriggerStudioView';
import { ExecutionLogsView } from './views/ExecutionLogsView';
import { FileVaultView } from './views/FileVaultView';
import { WorkspaceAnalyticsView } from './views/WorkspaceAnalyticsView';
import { IntegrationsView } from './views/IntegrationsView';
import { AISettingsView } from './views/AISettingsView';
import { ExportHubView } from './views/ExportHubView';
import { SettingsView } from './views/SettingsView';
import { WorkflowVisualizer } from './components/WorkflowVisualizer';
import { AgentChatWorkspaceView } from './views/AgentChatWorkspaceView';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('chat');
  const [currentWorkspace, setCurrentWorkspace] = useState('Acme Corp Workspace');
  const [userEmail, setUserEmail] = useState('sabiyaahmad8661@gmail.com');

  // Swytchcode CLI Connection state
  const [isCliOffline, setIsCliOffline] = useState(false);

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [searchInitialMode, setSearchInitialMode] = useState<'briefing' | 'strict'>('briefing');

  // Universal Search page query
  const [universalSearchQuery, setUniversalSearchQuery] = useState('q3 roadmap infrastructure migration');

  // Listen for custom trigger events to toggle CLI status if triggered elsewhere
  useEffect(() => {
    const handler = () => setIsCliOffline((prev) => !prev);
    window.addEventListener('swytchcode:toggle-offline', handler);
    return () => window.removeEventListener('swytchcode:toggle-offline', handler);
  }, []);

  const handleReconnectCli = async () => {
    await new Promise((res) => setTimeout(res, 800));
    setIsCliOffline(false);
  };

  // Keyboard shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchInitialQuery('');
        setSearchInitialMode('briefing');
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSearchWithQuery = (query: string, mode: 'briefing' | 'strict' = 'briefing') => {
    setSearchInitialQuery(query);
    setSearchInitialMode(mode);
    setIsSearchOpen(true);
  };

  const handleNavigateToSearch = (query?: string) => {
    if (query) {
      setUniversalSearchQuery(query);
    }
    setCurrentView('search');
  };

  // Determine if current view should display full shell (Sidebar + TopHeader)
  const isFullShellView = !['landing', 'onboarding', 'auth'].includes(currentView);

  return (
    <div className="h-screen w-full flex flex-col bg-surface text-primary font-sans antialiased selection:bg-zinc-700 selection:text-white overflow-hidden">
      {isFullShellView ? (
        <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden relative">
          {/* Main Sidebar (Desktop + Mobile Drawer) */}
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              setIsMobileSidebarOpen(false);
            }}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            isCliOffline={isCliOffline}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
            {/* Top Navigation Bar */}
            <TopHeader
              currentWorkspace={currentWorkspace}
              onSelectWorkspace={setCurrentWorkspace}
              onOpenCommandPalette={() => setIsSearchOpen(true)}
              onNavigate={setCurrentView}
              userEmail={userEmail}
              onToggleMobileNav={() => setIsMobileSidebarOpen((prev) => !prev)}
              currentView={currentView}
              isCliOffline={isCliOffline}
              onToggleCliOffline={() => setIsCliOffline((prev) => !prev)}
            />

            {/* View Container */}
            <main className="flex-1 overflow-y-auto bg-surface overflow-x-hidden min-h-0">
              {currentView === 'chat' && (
                <AgentChatWorkspaceView onNavigate={setCurrentView} />
              )}

              {currentView === 'dashboard' && (
                <DashboardView
                  onNavigate={setCurrentView}
                  onOpenSearchWithQuery={handleOpenSearchWithQuery}
                  onOpenCommandPalette={() => setIsSearchOpen(true)}
                />
              )}

              {currentView === 'briefing' && (
                <MorningBriefingView
                  onNavigate={setCurrentView}
                  onOpenSearchWithQuery={handleOpenSearchWithQuery}
                />
              )}

              {currentView === 'search' && (
                <UniversalSearchView
                  onNavigate={setCurrentView}
                  initialQuery={universalSearchQuery}
                />
              )}

              {currentView === 'workflow' && (
                <WorkflowVisualizer onNavigate={setCurrentView} />
              )}

              {currentView === 'graph' && (
                <KnowledgeGraphView onNavigate={setCurrentView} />
              )}

              {currentView === 'summarizer' && (
                <DocumentSummarizerView onNavigate={setCurrentView} />
              )}

              {currentView === 'action-board' && (
                <ActionBoardView onNavigate={setCurrentView} />
              )}

              {currentView === 'triggers' && <TriggerStudioView />}

              {currentView === 'logs' && <ExecutionLogsView />}

              {currentView === 'vault' && (
                <FileVaultView
                  onNavigate={setCurrentView}
                  onSelectDocumentForSummary={() => setCurrentView('summarizer')}
                />
              )}

              {currentView === 'analytics' && (
                <WorkspaceAnalyticsView onNavigate={setCurrentView} />
              )}

              {currentView === 'integrations' && (
                <IntegrationsView
                  isCliOffline={isCliOffline}
                  onToggleCliOffline={() => setIsCliOffline((prev) => !prev)}
                />
              )}

              {currentView === 'ai-settings' && <AISettingsView />}

              {currentView === 'export-hub' && <ExportHubView />}

              {currentView === 'settings' && (
                <SettingsView onNavigate={setCurrentView} userEmail={userEmail} />
              )}
            </main>
          </div>
        </div>
      ) : (
        /* Standalone Screen Views (Landing, Onboarding, Auth) */
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
          {currentView === 'landing' && <LandingView onNavigate={setCurrentView} />}
          {currentView === 'onboarding' && <OnboardingView onNavigate={setCurrentView} />}
          {currentView === 'auth' && (
            <AuthView onNavigate={setCurrentView} setUserEmail={setUserEmail} />
          )}
        </div>
      )}

      {/* Global Universal Search & Schema Inspector Modal */}
      <OmniMindSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
        initialMode={searchInitialMode}
        onNavigateToSearch={handleNavigateToSearch}
      />

      {/* Subtle Bottom-Right Swytchcode Connection Interruption Toast */}
      <SwytchcodeStatusToast
        isOffline={isCliOffline}
        onReconnect={handleReconnectCli}
        onDismiss={() => setIsCliOffline(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
}
