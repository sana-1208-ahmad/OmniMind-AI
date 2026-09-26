---
name: gmail-ai-assistant
description: Connects OmniMind AI to Gmail via Swytchcode to parse threads, meeting schedules, and urgent emails.
manifest: gmail
---

# Gmail AI Assistant Skill

## Operational Rules
- Scan incoming threads for budget reviews, meetings, and high-priority action items.
- Format extracted email snippets cleanly for the executive morning briefing.

## Execution Steps
1. Pull manifest: `swytchcode get gmail`
2. Authenticate: `swy auth connect gmail`
3. Execute message read: `swy exec gmail.messages.list --label "INBOX"`
