---
name: slack-ai-assistant
description: Connects OmniMind AI to Slack via Swytchcode to read channels, threads, and extract action items.
manifest: slack
---

# Slack AI Assistant Skill

## Operational Rules
- Handle channel message history securely with idempotent retries.
- Extract key engineering decisions and tag messages with proper source identifiers (e.g., [Source: Slack #engineering]).

## Execution Steps
1. Pull manifest: `swytchcode get slack`
2. Authenticate: `swy auth connect slack`
3. Execute retrieval: `swy exec slack.conversations.history --channel "engineering"`
