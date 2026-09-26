export interface SwytchcodeSkill {
  id: string;
  name: string;
  description: string;
  manifest: string;
  operationalRules: string[];
  executionSteps: {
    step: number;
    title: string;
    command: string;
  }[];
  sampleExecutionResult: {
    status: 'success';
    command: string;
    timestamp: string;
    latencyMs: number;
    data: any;
  };
}

export const SWYTCHCODE_SKILLS: SwytchcodeSkill[] = [
  {
    id: 'notion-ai-assistant',
    name: 'notion-ai-assistant',
    description: 'Connects OmniMind AI to Notion via Swytchcode for workspace knowledge search and page management.',
    manifest: 'notion',
    operationalRules: [
      'Use Swytchcode to bypass undocumented Notion API sequences and handle rate limits safely.',
      'Always validate page search queries and structure results into concise summaries with source tags.',
    ],
    executionSteps: [
      { step: 1, title: 'Pull manifest', command: 'swytchcode get notion' },
      { step: 2, title: 'Authenticate', command: 'swy auth connect notion' },
      { step: 3, title: 'Execute search', command: 'swy exec notion.search --query "q3 roadmap"' },
    ],
    sampleExecutionResult: {
      status: 'success',
      command: 'swy exec notion.search --query "q3 roadmap"',
      timestamp: '2026-09-25T21:18:00Z',
      latencyMs: 52,
      data: {
        object: 'list',
        results: [
          {
            id: 'ntn_page_89124',
            title: 'Q3 Enterprise Architecture Roadmap & Database Sharding',
            url: 'https://notion.so/acme/q3-roadmap-spec',
            last_edited_time: '2026-09-25T14:32:00Z',
            tags: ['#engineering', '#q3-migration', '#architecture'],
            snippet: 'Sprint 42 milestone commitments locked in. Multi-region database replication testing passed under peak simulated load.',
            sourceTag: '[Source: Swytchcode/Notion Workspace]',
          },
          {
            id: 'ntn_page_44021',
            title: 'SOC2 Type II Audit Compliance Checklist',
            url: 'https://notion.so/acme/soc2-audit-checklist',
            last_edited_time: '2026-09-24T18:15:00Z',
            tags: ['#compliance', '#security', '#soc2'],
            snippet: 'Encryption keys verified with CMEK rotation. Audit sign-off requested before Friday EOD.',
            sourceTag: '[Source: Swytchcode/Notion Workspace]',
          },
        ],
      },
    },
  },
  {
    id: 'slack-ai-assistant',
    name: 'slack-ai-assistant',
    description: 'Connects OmniMind AI to Slack via Swytchcode to read channels, threads, and extract action items.',
    manifest: 'slack',
    operationalRules: [
      'Handle channel message history securely with idempotent retries.',
      'Extract key engineering decisions and tag messages with proper source identifiers (e.g., [Source: Slack #engineering]).',
    ],
    executionSteps: [
      { step: 1, title: 'Pull manifest', command: 'swytchcode get slack' },
      { step: 2, title: 'Authenticate', command: 'swy auth connect slack' },
      { step: 3, title: 'Execute retrieval', command: 'swy exec slack.conversations.history --channel "engineering"' },
    ],
    sampleExecutionResult: {
      status: 'success',
      command: 'swy exec slack.conversations.history --channel "engineering"',
      timestamp: '2026-09-25T21:18:05Z',
      latencyMs: 38,
      data: {
        ok: true,
        channel: 'C05Q994K2',
        channel_name: 'engineering',
        messages: [
          {
            user: 'Alex Rivera (DevOps)',
            ts: '1727318520.001',
            text: 'We need to lock in the final instances for the q3 roadmap infrastructure migration by Friday. The database replication lag test passed successfully under heavy load simulation.',
            replies_count: 14,
            sourceTag: '[Source: Swytchcode/Slack #engineering]',
            extracted_action: 'Lock in final instances for Q3 infrastructure migration by Friday (Assignee: Alex Rivera)',
          },
          {
            user: 'Sarah Jenkins (Lead)',
            ts: '1727319100.002',
            text: 'Approved. Proceed with staging migration dry-run at 02:00 UTC.',
            sourceTag: '[Source: Swytchcode/Slack #engineering]',
          },
        ],
      },
    },
  },
  {
    id: 'google-drive-ai-assistant',
    name: 'google-drive-ai-assistant',
    description: 'Connects OmniMind AI to Google Drive via Swytchcode for secure file indexing and PDF data extraction.',
    manifest: 'google-drive',
    operationalRules: [
      'Search and read document metadata across enterprise folders safely.',
      'Prevent raw credential exposure by routing file queries through Swytchcode wrappers.',
    ],
    executionSteps: [
      { step: 1, title: 'Pull manifest', command: 'swytchcode get google-drive' },
      { step: 2, title: 'Authenticate', command: 'swy auth connect google-drive' },
      { step: 3, title: 'Execute file search', command: 'swy exec google-drive.files.list --query "roadmap"' },
    ],
    sampleExecutionResult: {
      status: 'success',
      command: 'swy exec google-drive.files.list --query "roadmap"',
      timestamp: '2026-09-25T21:18:10Z',
      latencyMs: 64,
      data: {
        kind: 'drive#fileList',
        files: [
          {
            id: '1a9Z0FkLq24_drive',
            name: 'Q3_Global_Strategy_Roadmap_v4.docx',
            mimeType: 'application/vnd.google-apps.document',
            size: '4.2 MB',
            owners: ['Sarah Jenkins (VP Eng)'],
            modifiedTime: '2026-09-24T16:20:00Z',
            sourceTag: '[Source: Swytchcode/Google Drive]',
            vectorStatus: 'Fully Indexed (1,842 chunks)',
          },
          {
            id: '2b8X1KmRq99_drive',
            name: 'Infrastructure_Capacity_Planning_2026.pdf',
            mimeType: 'application/pdf',
            size: '8.1 MB',
            owners: ['Alex Rivera (DevOps)'],
            modifiedTime: '2026-09-23T11:00:00Z',
            sourceTag: '[Source: Swytchcode/Google Drive]',
            vectorStatus: 'Fully Indexed (3,120 chunks)',
          },
        ],
      },
    },
  },
  {
    id: 'box-ai-assistant',
    name: 'box-ai-assistant',
    description: 'Connects OmniMind AI to Box via Swytchcode for enterprise security audits and file management.',
    manifest: 'box',
    operationalRules: [
      'Index secure cloud documents and audit files without exposing raw tokens.',
      'Return structured content summaries to the universal search layer.',
    ],
    executionSteps: [
      { step: 1, title: 'Pull manifest', command: 'swytchcode get box' },
      { step: 2, title: 'Authenticate', command: 'swy auth connect box' },
      { step: 3, title: 'Execute search', command: 'swy exec box.search --query "audit"' },
    ],
    sampleExecutionResult: {
      status: 'success',
      command: 'swy exec box.search --query "audit"',
      timestamp: '2026-09-25T21:18:15Z',
      latencyMs: 78,
      data: {
        total_count: 2,
        entries: [
          {
            type: 'file',
            id: 'box_991823',
            name: 'Enterprise_Architecture_Security_Review.xlsx',
            created_by: 'Elena Rostova (Compliance Officer)',
            modified_at: '2026-09-25T10:45:00Z',
            sourceTag: '[Source: Swytchcode/Box Vault]',
            compliance: 'SOC2 Type II + HIPAA Certified',
            summary: 'Contains annual pen-test results and access control policies for all VPC clusters.',
          },
          {
            type: 'file',
            id: 'box_441209',
            name: 'Vendor_Data_Processing_Addendum.pdf',
            created_by: 'Legal Counsel',
            modified_at: '2026-09-21T09:30:00Z',
            sourceTag: '[Source: Swytchcode/Box Vault]',
            compliance: 'GDPR / CCPA Protected',
          },
        ],
      },
    },
  },
  {
    id: 'gmail-ai-assistant',
    name: 'gmail-ai-assistant',
    description: 'Connects OmniMind AI to Gmail via Swytchcode to parse threads, meeting schedules, and urgent emails.',
    manifest: 'gmail',
    operationalRules: [
      'Scan incoming threads for budget reviews, meetings, and high-priority action items.',
      'Format extracted email snippets cleanly for the executive morning briefing.',
    ],
    executionSteps: [
      { step: 1, title: 'Pull manifest', command: 'swytchcode get gmail' },
      { step: 2, title: 'Authenticate', command: 'swy auth connect gmail' },
      { step: 3, title: 'Execute message read', command: 'swy exec gmail.messages.list --label "INBOX"' },
    ],
    sampleExecutionResult: {
      status: 'success',
      command: 'swy exec gmail.messages.list --label "INBOX"',
      timestamp: '2026-09-25T21:18:20Z',
      latencyMs: 44,
      data: {
        resultSizeEstimate: 142,
        messages: [
          {
            id: 'msg_9921448',
            threadId: 'th_008129',
            from: 'Sarah Jenkins <sjenkins@acmecorp.com>',
            subject: 'RE: Executive Briefing: Q3 Roadmap & Cloud Migration Budget',
            date: '2026-09-25T07:15:00Z',
            snippet: 'Attached is the revised financial projection for the upcoming Q3 roadmap infrastructure migration. Please review the multi-region failover provisions before the board meeting.',
            sourceTag: '[Source: Swytchcode/Gmail Thread: Sarah Jenkins]',
            extractedPriority: 'High',
            actionItem: 'Review multi-region failover provisions before board meeting (Assignee: CEO/VP)',
          },
          {
            id: 'msg_8841029',
            threadId: 'th_771920',
            from: 'Marcus Vance <mvance@globexcorp.com>',
            subject: 'Globex Enterprise SLA Waiver & Multi-Tenant Isolation',
            date: '2026-09-24T22:40:00Z',
            snippet: 'We require contractual guarantees for 99.99% uptime with dedicated VPC peering in ap-northeast-1.',
            sourceTag: '[Source: Swytchcode/Gmail Thread: Globex SLA]',
            extractedPriority: 'Urgent',
          },
        ],
      },
    },
  },
];
