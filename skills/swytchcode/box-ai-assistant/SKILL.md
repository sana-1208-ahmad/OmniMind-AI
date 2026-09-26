---
name: box-ai-assistant
description: Connects OmniMind AI to Box via Swytchcode for enterprise security audits and file management.
manifest: box
---

# Box AI Assistant Skill

## Operational Rules
- Index secure cloud documents and audit files without exposing raw tokens.
- Return structured content summaries to the universal search layer.

## Execution Steps
1. Pull manifest: `swytchcode get box`
2. Authenticate: `swy auth connect box`
3. Execute search: `swy exec box.search --query "audit"`
