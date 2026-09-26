export type WorkplacePlatform = 'Slack' | 'Gmail' | 'Google Drive' | 'Notion' | 'Box';

export interface SourceCitation {
  app: WorkplacePlatform;
  identifier: string; // e.g. Channel name, filename, email subject
  snippet: string;
}

export interface ActionItem {
  id?: string;
  task: string;
  sourceApp: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee?: string;
  assigneeInitials?: string;
  status?: 'todo' | 'in_progress' | 'completed';
  code?: string;
}

export interface KnowledgeLink {
  nodeA: string;
  nodeB: string;
  relationship: string;
}

/**
 * Strict Output Schema required by Track 2
 */
export interface OmniMindResponseSchema {
  status: 'success' | 'error';
  queryProcessed: string;
  summary: string;
  sources: SourceCitation[];
  actionItems: ActionItem[];
  knowledgeLinks: KnowledgeLink[];
}

export interface KnowledgeNode {
  id: string;
  title: string;
  code: string;
  category: string;
  type: 'document' | 'slack' | 'master' | 'architecture' | 'financial' | 'strategy';
  linksCount: number;
  isMaster?: boolean;
  relevance: string;
  summary: string;
  connectedFiles: string[];
  tags: string[];
  xPercent: number;
  yPercent: number;
  updatedAt: string;
  author: string;
}

export interface WorkspaceDocument {
  id: string;
  name: string;
  size: string;
  pagesOrSheets: string;
  sourceApp: 'Google Drive' | 'Box Enterprise';
  sharedBy: string;
  sharedByInitials: string;
  lastModified: string;
  indexingStatus: 'Fully Indexed' | 'Processing Chunks' | 'Queued';
  isLocked?: boolean;
}

export interface TriggerRule {
  id: string;
  name: string;
  when: {
    event: string;
    source: string;
    filter: string;
  };
  do: {
    action: string;
    destination: string;
  };
  executions: number;
  isActive: boolean;
  typeIcon: string;
}

export interface ExecutionLog {
  id: string;
  typeIcon: string;
  description: string;
  execId: string;
  source: 'Slack' | 'Notion' | 'Gmail' | 'GitHub' | 'Box' | 'Google Drive';
  timestamp: string;
  status: 'Success' | 'Failed' | 'Pending';
  latencyMs: number;
  details?: Record<string, any>;
}

export interface ConnectedIntegration {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  workspaceIdentity: string;
  internalId: string;
  syncHealth: 'Healthy' | 'Syncing' | 'Paused' | 'Disconnected';
  lastSynced: string;
  connected: boolean;
}

export interface AIPreferences {
  tone: 'formal' | 'concise' | 'technical';
  summaryDepth: string;
  language: string;
  crossSessionRetention: boolean;
  autoIndexing: boolean;
  telemetry: boolean;
}
