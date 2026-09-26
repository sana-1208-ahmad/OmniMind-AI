import {
  OmniMindResponseSchema,
  KnowledgeNode,
  WorkspaceDocument,
  TriggerRule,
  ExecutionLog,
  ConnectedIntegration,
  ActionItem,
} from '../types';

export const CONNECTED_INTEGRATIONS_INITIAL: ConnectedIntegration[] = [
  {
    id: 'gdrive',
    name: 'Google Drive',
    subtitle: 'Enterprise Storage & Docs',
    icon: 'folder_shared',
    workspaceIdentity: 'workspace@acmecorp.com',
    internalId: 'drv_99a8x1',
    syncHealth: 'Healthy',
    lastSynced: '2 mins ago',
    connected: true,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    subtitle: 'Email & Thread Ingestion',
    icon: 'mail',
    workspaceIdentity: 'admin@acmecorp.com',
    internalId: 'gml_44b2z9',
    syncHealth: 'Healthy',
    lastSynced: 'Just now',
    connected: true,
  },
  {
    id: 'notion',
    name: 'Notion',
    subtitle: 'Wikis & Knowledge Base',
    icon: 'description',
    workspaceIdentity: 'Acme Engineering Workspace',
    internalId: 'ntn_77c3q5',
    syncHealth: 'Healthy',
    lastSynced: '14 mins ago',
    connected: true,
  },
  {
    id: 'box',
    name: 'Box',
    subtitle: 'Secure Cloud Content Management',
    icon: 'inventory_2',
    workspaceIdentity: 'acme-enterprise.box.com',
    internalId: 'box_11d4k8',
    syncHealth: 'Healthy',
    lastSynced: '1 hour ago',
    connected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    subtitle: 'Channels & Direct Messages',
    icon: 'tag',
    workspaceIdentity: 'acme-workspace.slack.com',
    internalId: 'slk_55e9m3',
    syncHealth: 'Healthy',
    lastSynced: '3 mins ago',
    connected: true,
  },
];

export const WORKSPACE_DOCUMENTS_INITIAL: WorkspaceDocument[] = [
  {
    id: 'doc-1',
    name: 'Q3_Global_Strategy_Roadmap_v4.docx',
    size: '2.4 MB',
    pagesOrSheets: '45 pages',
    sourceApp: 'Google Drive',
    sharedBy: 'Sarah Chen',
    sharedByInitials: 'SC',
    lastModified: 'Today, 14:22',
    indexingStatus: 'Fully Indexed',
    isLocked: true,
  },
  {
    id: 'doc-2',
    name: 'Enterprise_Architecture_Security_Review.xlsx',
    size: '8.1 MB',
    pagesOrSheets: '12 sheets',
    sourceApp: 'Box Enterprise',
    sharedBy: 'Marcus Vance',
    sharedByInitials: 'MV',
    lastModified: 'Yesterday, 09:15',
    indexingStatus: 'Fully Indexed',
  },
  {
    id: 'doc-3',
    name: 'Board_Meeting_Deck_Q2_Final.pdf',
    size: '14.6 MB',
    pagesOrSheets: '28 slides',
    sourceApp: 'Google Drive',
    sharedBy: 'Alice Lawson',
    sharedByInitials: 'AL',
    lastModified: 'Oct 24, 2023',
    indexingStatus: 'Processing Chunks',
  },
  {
    id: 'doc-4',
    name: 'API_Integration_Specs_v2.md',
    size: '450 KB',
    pagesOrSheets: 'Markdown',
    sourceApp: 'Box Enterprise',
    sharedBy: 'Jason Doe',
    sharedByInitials: 'JD',
    lastModified: 'Oct 19, 2023',
    indexingStatus: 'Fully Indexed',
  },
  {
    id: 'doc-5',
    name: 'Employee_Handbook_2024_Update.pdf',
    size: '5.2 MB',
    pagesOrSheets: '82 pages',
    sourceApp: 'Google Drive',
    sharedBy: 'People Operations',
    sharedByInitials: 'HR',
    lastModified: 'Oct 12, 2023',
    indexingStatus: 'Queued',
  },
];

export const KNOWLEDGE_NODES_INITIAL: KnowledgeNode[] = [
  {
    id: 'node-master',
    title: 'Acme Core Architecture Spec',
    code: 'SYS-001',
    category: 'Architecture Spec',
    type: 'master',
    linksCount: 38,
    isMaster: true,
    relevance: '99% relevance',
    summary:
      'Comprehensive system architecture blueprint detailing microservices layout, event bus topologies, and security compliance matrices across regional clusters.',
    connectedFiles: ['architecture_v2.md', 'security_audit_2025.pdf', 'api_swagger.json'],
    tags: ['#microservices', '#kubernetes', '#soc2-compliance', '#event-bus'],
    xPercent: 48,
    yPercent: 32,
    updatedAt: '2 hours ago',
    author: 'Sarah Jenkins',
  },
  {
    id: 'node-financial',
    title: 'Q3 Financial Roadmap',
    code: 'DOC-9821',
    category: 'Financial Document',
    type: 'financial',
    linksCount: 14,
    relevance: '98% relevance',
    summary:
      'Detailed financial model outlining projected ARR growth, resource allocation, and operational expenditure caps for Q3-Q4 fiscal cycle.',
    connectedFiles: ['budget_v4_final.xlsx', 'board_deck_aug.pdf', 'slack_thread_execs'],
    tags: ['#budget', '#arr-projections', '#q3-roadmap', '#cfo-review'],
    xPercent: 22,
    yPercent: 18,
    updatedAt: 'Yesterday',
    author: 'Marcus Vance',
  },
  {
    id: 'node-sync',
    title: 'Engineering Sync #42',
    code: 'SLACK-884',
    category: 'Communication Archive',
    type: 'slack',
    linksCount: 8,
    relevance: '91% relevance',
    summary:
      'Transcript and action items from weekly cross-functional engineering alignment on database sharding and latency reduction.',
    connectedFiles: ['sync_notes_0812.txt', 'jira_epic_db.json'],
    tags: ['#database-sharding', '#latency', '#eng-core', '#redis'],
    xPercent: 75,
    yPercent: 22,
    updatedAt: '4 hours ago',
    author: 'Alex Rivera',
  },
  {
    id: 'node-retro',
    title: 'Product Launch Retrospective',
    code: 'REP-102',
    category: 'Strategic Report',
    type: 'strategy',
    linksCount: 19,
    relevance: '85% relevance',
    summary:
      'Post-mortem analysis of the v2.4 global rollout highlighting regional adoption rates, customer feedback loops, and bug triage speed.',
    connectedFiles: ['retrospective_deck.key', 'customer_surveys.csv'],
    tags: ['#v2.4-rollout', '#customer-feedback', '#retrospective'],
    xPercent: 42,
    yPercent: 68,
    updatedAt: '3 days ago',
    author: 'Elena Rostova',
  },
  {
    id: 'node-gtm',
    title: 'Go-To-Market Strategy 2025',
    code: 'STRAT-309',
    category: 'Market Analysis',
    type: 'strategy',
    linksCount: 12,
    relevance: '88% relevance',
    summary:
      'Comprehensive GTM plan covering enterprise tier pricing adjustments, outbound sales cadences, and partner channel enablement.',
    connectedFiles: ['gtm_master_2025.pdf', 'pricing_matrix.xlsx'],
    tags: ['#gtm-2025', '#enterprise-tier', '#pricing-matrix'],
    xPercent: 72,
    yPercent: 58,
    updatedAt: '5 days ago',
    author: 'David Chen',
  },
  {
    id: 'node-security',
    title: 'Security Compliance & ISO Audit',
    code: 'SEC-441',
    category: 'Compliance Record',
    type: 'document',
    linksCount: 6,
    relevance: '95% relevance',
    summary:
      'Annual audit reports, penetration test outcomes, and SOC2 Type II compliance verification certificates.',
    connectedFiles: ['soc2_report_final.pdf', 'pentest_summary.pdf'],
    tags: ['#soc2', '#iso27001', '#pentest', '#compliance'],
    xPercent: 12,
    yPercent: 20,
    updatedAt: '1 week ago',
    author: 'Security Guild',
  },
];

export const ACTION_ITEMS_INITIAL: ActionItem[] = [
  {
    id: 'task-1',
    task: 'Update Q3 Security Compliance Docs',
    sourceApp: 'From Gmail: Sarah Jenkins',
    priority: 'High',
    assignee: 'Sarah J.',
    assigneeInitials: 'SJ',
    status: 'todo',
    code: 'EXT-8492',
  },
  {
    id: 'task-2',
    task: 'Patch DB Connection Pooling Leak',
    sourceApp: 'From Slack #eng-core',
    priority: 'High',
    assignee: 'Alex M.',
    assigneeInitials: 'AM',
    status: 'todo',
    code: 'EXT-8495',
  },
  {
    id: 'task-3',
    task: 'Refactor Vector Indexing Pipeline',
    sourceApp: 'From Linear: PR-1042',
    priority: 'Medium',
    assignee: 'Dan K.',
    assigneeInitials: 'DK',
    status: 'todo',
    code: 'EXT-8501',
  },
  {
    id: 'task-4',
    task: 'API Rate Limiting Enforcement Review',
    sourceApp: 'From AI Briefing Agent',
    priority: 'High',
    assignee: 'Elena L.',
    assigneeInitials: 'EL',
    status: 'in_progress',
    code: 'EXT-8470',
  },
  {
    id: 'task-5',
    task: 'Draft Enterprise SLA Addendum',
    sourceApp: 'From Gmail: Marcus Vance',
    priority: 'Medium',
    assignee: 'Marcus V.',
    assigneeInitials: 'MV',
    status: 'in_progress',
    code: 'EXT-8461',
  },
  {
    id: 'task-6',
    task: 'Rotate Production OAuth Secrets',
    sourceApp: 'From Slack #releases',
    priority: 'High',
    assignee: 'John D.',
    assigneeInitials: 'JD',
    status: 'completed',
    code: 'EXT-8430',
  },
  {
    id: 'task-7',
    task: 'Export Q2 Usage Metrics for Apex',
    sourceApp: 'From Gmail: Client Success',
    priority: 'Medium',
    assignee: 'Sarah J.',
    assigneeInitials: 'SJ',
    status: 'completed',
    code: 'EXT-8412',
  },
];

export const TRIGGER_RULES_INITIAL: TriggerRule[] = [
  {
    id: 'rule-1',
    name: 'VIP Escalation & Notion Sync',
    when: {
      event: 'Urgent Email from VIP (C-Level / Board)',
      source: 'Gmail',
      filter: "contains 'Confidential' OR 'Urgent'",
    },
    do: {
      action: 'Summarize & Extract Action Items (LLM)',
      destination: '#leadership-briefs (Slack)',
    },
    executions: 482,
    isActive: true,
    typeIcon: 'mail',
  },
  {
    id: 'rule-2',
    name: 'Google Drive Auto-Index & Slack Alert',
    when: {
      event: 'New Doc Indexed in Drive',
      source: 'Google Drive',
      filter: "folder == '/Enterprise_Roadmaps'",
    },
    do: {
      action: 'Post to Slack Channel',
      destination: '#product-launch (Slack)',
    },
    executions: 612,
    isActive: true,
    typeIcon: 'folder',
  },
  {
    id: 'rule-3',
    name: 'Slack Keyword Extraction (#engineering)',
    when: {
      event: 'Slack Mention ("Incident")',
      source: 'Slack',
      filter: 'channel: #engineering-ops',
    },
    do: {
      action: 'Sync to Notion Roadmap',
      destination: 'Engineering Post-Mortems DB',
    },
    executions: 315,
    isActive: true,
    typeIcon: 'forum',
  },
  {
    id: 'rule-4',
    name: 'Jira Critical Bug Auto-Digest',
    when: {
      event: 'Jira P1 Ticket Created',
      source: 'Jira / Webhook',
      filter: 'priority == Highest',
    },
    do: {
      action: 'Post Weekly Digest',
      destination: '#eng-core-infra',
    },
    executions: 73,
    isActive: false,
    typeIcon: 'bug_report',
  },
];

export const EXECUTION_LOGS_INITIAL: ExecutionLog[] = [
  {
    id: 'log-1',
    typeIcon: 'bolt',
    description: 'Sync Notion roadmap database with Jira sprint board',
    execId: 'exec_9f81a7bc24',
    source: 'Notion',
    timestamp: '2 mins ago',
    status: 'Success',
    latencyMs: 142,
    details: {
      recordsUpdated: 14,
      origin: 'Notion Engineering Wiki',
      destination: 'Jira Sprint 42',
      verificationHash: 'sha256-8a9d12f',
    },
  },
  {
    id: 'log-2',
    typeIcon: 'webhook',
    description: 'Incoming Slack alert processed for #engineering-ops',
    execId: 'exec_3d42e190ff',
    source: 'Slack',
    timestamp: '7 mins ago',
    status: 'Success',
    latencyMs: 89,
    details: {
      channel: '#engineering-ops',
      threadId: 'th_409184',
      sender: 'Sarah Jenkins',
      actionExtracted: 'Redis memory leak triage',
    },
  },
  {
    id: 'log-3',
    typeIcon: 'mail',
    description: 'Parsed inbound customer support email classification',
    execId: 'exec_88c4a11b22',
    source: 'Gmail',
    timestamp: '14 mins ago',
    status: 'Success',
    latencyMs: 231,
    details: {
      subject: 'Enterprise SLA Escalation: Globex Corp',
      sender: 'sarah.jenkins@acmecorp.com',
      classification: 'Critical / Rate Limit Waiver',
    },
  },
  {
    id: 'log-4',
    typeIcon: 'code',
    description: 'Executed automated CI/CD deployment status workflow',
    execId: 'exec_11209b55ef',
    source: 'GitHub',
    timestamp: '28 mins ago',
    status: 'Success',
    latencyMs: 312,
    details: {
      repo: 'acmecorp/core-mesh',
      commitSha: '6ab081f',
      branch: 'main',
      status: 'Passed smoke tests (zero regressions)',
    },
  },
  {
    id: 'log-5',
    typeIcon: 'bolt',
    description: 'Daily standup summary generated and dispatched',
    execId: 'exec_77410ac310',
    source: 'Slack',
    timestamp: '1 hour ago',
    status: 'Success',
    latencyMs: 178,
    details: {
      channelsAnalyzed: 12,
      messagesProcessed: 342,
      recipients: ['#leadership-briefs', '#eng-leads'],
    },
  },
  {
    id: 'log-6',
    typeIcon: 'folder',
    description: 'Google Drive batch indexing job completed for /Architecture',
    execId: 'exec_22910fa89c',
    source: 'Google Drive',
    timestamp: '2 hours ago',
    status: 'Success',
    latencyMs: 418,
    details: {
      filesIndexed: 32,
      vectorCount: 4890,
      totalBytes: '14.2 MB',
    },
  },
];

/**
 * Pre-compiled, rigorous Track 2 responses adhering strictly to the schema
 */
export const PRECOMPILED_TRACK2_PAYLOADS: Record<string, OmniMindResponseSchema> = {
  'q3 roadmap infrastructure migration': {
    status: 'success',
    queryProcessed: 'q3 roadmap infrastructure migration',
    summary:
      'Executive alignment across Slack, Gmail, Notion, and Google Drive indicates the Q3 infrastructure migration is on track for zero-downtime execution by end of week. The engineering guild resolved Redis replication bottlenecks and validated database replication lag under simulated peak loads. Financial allocations and multi-region failover provisions have been updated in the executive deck pending Tuesday board review.',
    sources: [
      {
        app: 'Slack',
        identifier: '#engineering',
        snippet:
          'Alex Rivera confirmed: "We need to lock in the final instances for the q3 roadmap infrastructure migration by Friday. Database replication lag test passed successfully under heavy load simulation."',
      },
      {
        app: 'Gmail',
        identifier: 'Inbox: RE: Executive Briefing: Q3 Roadmap & Cloud Migration Budget',
        snippet:
          'Sarah Jenkins attached revised financial projections for the upcoming q3 roadmap infrastructure migration, requesting executive review of multi-region failover provisions.',
      },
      {
        app: 'Notion',
        identifier: 'Engineering Wiki / Technical Architecture Spec: Q3 Migration Plan',
        snippet:
          'Elena Rostova documented the zero-downtime strategy for core database clusters and auto-scaling Kubernetes node pools as part of the broader q3 roadmap infrastructure migration.',
      },
      {
        app: 'Google Drive',
        identifier: 'Q3_Migration_Architecture_Draft_v4.pdf',
        snippet:
          'Network topologies and data-flow diagrams owned by Alex Rivera highlighting phase 2 cutover and SOC2 security compliance checklists.',
      },
    ],
    actionItems: [
      {
        task: 'Lock in final cloud instances for the Q3 database migration by Friday',
        sourceApp: 'Slack #engineering',
        priority: 'High',
      },
      {
        task: 'Review multi-region failover budget provisions prior to Tuesday board meeting',
        sourceApp: 'Gmail Inbox',
        priority: 'High',
      },
      {
        task: 'Publish Kubernetes auto-scaler node pool policies to staging wiki',
        sourceApp: 'Notion Engineering Wiki',
        priority: 'Medium',
      },
    ],
    knowledgeLinks: [
      {
        nodeA: 'Slack #engineering (Alex Rivera thread)',
        nodeB: 'Q3_Migration_Architecture_Draft_v4.pdf (Google Drive)',
        relationship: 'Technical validation parameters directly cite network topology draft v4.',
      },
      {
        nodeA: 'Notion Technical Architecture Spec',
        nodeB: 'RE: Executive Briefing Email (Gmail)',
        relationship: 'Architectural redundancy RFC grounds the financial budget proposal submitted to board.',
      },
    ],
  },
  'globex corp sla': {
    status: 'success',
    queryProcessed: 'Summarize Globex Corp SLA requirements and escalation',
    summary:
      'Globex Corp has escalated an enterprise SLA requirement directly to the CTO via VP Sales Sarah Jenkins. Renewal is contingent upon approving custom API rate limit waivers by 12:00 PM PST. Legal and infosec teams must sign off on the attached waiver in the security portal to prevent contract lapse.',
    sources: [
      {
        app: 'Gmail',
        identifier: 'Enterprise SLA Escalation: Globex Corp (Sarah Jenkins)',
        snippet:
          '"We are at risk of losing the renewal if the custom API rate limits aren\'t approved by noon. They have escalated directly to their CTO..."',
      },
      {
        app: 'Notion',
        identifier: 'Q3 Strategic Roadmap — Final Draft',
        snippet:
          'Milestones for enterprise tier dedicated support channels and rate-limiting addendums.',
      },
      {
        app: 'Slack',
        identifier: '#product-launch',
        snippet:
          'Discussion on custom webhook payload throttling thresholds for Globex Corp staging environment.',
      },
    ],
    actionItems: [
      {
        task: 'Review attached API rate limit waiver in security portal before 12:00 PM',
        sourceApp: 'Gmail',
        priority: 'High',
      },
      {
        task: 'Draft reply to Sarah Jenkins with security waiver sign-off status',
        sourceApp: 'Gmail',
        priority: 'High',
      },
      {
        task: 'Verify dedicated webhook throughput on edge proxy cluster',
        sourceApp: 'Slack #product-launch',
        priority: 'Medium',
      },
    ],
    knowledgeLinks: [
      {
        nodeA: 'Sarah Jenkins Escalation Email',
        nodeB: 'API Integration Specs v2 (Box)',
        relationship: 'Customer requests higher rate tiers than currently specified in standard Box documentation.',
      },
    ],
  },
  'default': {
    status: 'success',
    queryProcessed: 'Enterprise Knowledge Synthesis',
    summary:
      'OmniMind evaluated the workspace knowledge graph spanning Slack, Gmail, Google Drive, Notion, and Box. Active initiatives center around Q3 infrastructure modernization, SOC2 Type II audit readiness, and enterprise SLA expansion. Cross-functional dependencies between cloud engineering and executive planning are documented with sub-15ms retrieval certainty.',
    sources: [
      {
        app: 'Notion',
        identifier: 'Acme Core Architecture Spec SYS-001',
        snippet:
          'Master node interconnecting 38 microservices, mTLS service mesh, and distributed NVMe storage topology.',
      },
      {
        app: 'Google Drive',
        identifier: 'Q3_Global_Strategy_Roadmap_v4.docx',
        snippet:
          'Strategic milestones defining enterprise customer retention targets and multi-region deployment timelines.',
      },
      {
        app: 'Slack',
        identifier: '#eng-core-infra',
        snippet:
          'Consensus reached on hotfix 409 rollout with zero detected regressions across staging clusters.',
      },
      {
        app: 'Box',
        identifier: 'Enterprise_Architecture_Security_Review.xlsx',
        snippet:
          'Compliance matrices and key rotation schedule for customer-managed encryption keys (CMEK).',
      },
    ],
    actionItems: [
      {
        task: 'Audit CMEK key rotation policies with infosec team prior to external audit',
        sourceApp: 'Box Enterprise',
        priority: 'High',
      },
      {
        task: 'Conduct staging chaos engineering drill for database failover',
        sourceApp: 'Notion',
        priority: 'Medium',
      },
      {
        task: 'Schedule executive alignment for Globex Corp contract renewal terms',
        sourceApp: 'Gmail',
        priority: 'High',
      },
    ],
    knowledgeLinks: [
      {
        nodeA: 'Acme Core Architecture Spec',
        nodeB: 'Security Compliance & ISO Audit SEC-441',
        relationship: 'Technical blueprint provides empirical evidence for SOC2 Type II trust criteria verification.',
      },
      {
        nodeA: 'Engineering Sync #42 (Slack)',
        nodeB: 'Q3 Financial Roadmap (DOC-9821)',
        relationship: 'Cluster scaling costs reflect infrastructure choices committed during sprint planning.',
      },
    ],
  },
};
