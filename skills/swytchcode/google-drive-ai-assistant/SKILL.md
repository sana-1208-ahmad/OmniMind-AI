---
name: google-drive-ai-assistant
description: Connects OmniMind AI to Google Drive via Swytchcode for secure file indexing and PDF data extraction.
manifest: google-drive
---

# Google Drive AI Assistant Skill

## Operational Rules
- Search and read document metadata across enterprise folders safely.
- Prevent raw credential exposure by routing file queries through Swytchcode wrappers.

## Execution Steps
1. Pull manifest: `swytchcode get google-drive`
2. Authenticate: `swy auth connect google-drive`
3. Execute file search: `swy exec google-drive.files.list --query "roadmap"`
