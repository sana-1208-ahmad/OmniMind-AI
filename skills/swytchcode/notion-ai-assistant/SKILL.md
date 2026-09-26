---
name: notion-ai-assistant
description: Connects OmniMind AI to Notion via Swytchcode for workspace knowledge search and page management.
manifest: notion
---

# Notion AI Assistant Skill

## Operational Rules
- Use Swytchcode to bypass undocumented Notion API sequences and handle rate limits safely.
- Always validate page search queries and structure results into concise summaries with source tags.

## Execution Steps
1. Pull manifest: `swytchcode get notion`
2. Authenticate: `swy auth connect notion`
3. Execute search: `swy exec notion.search --query "user_query"`
