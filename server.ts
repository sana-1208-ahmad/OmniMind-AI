import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server-side AI Query endpoint for OmniMind autonomous synthesis
app.post('/api/query', async (req, res) => {
  try {
    const { query, tone = 'formal' } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const ai = getAiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY not configured on server',
        fallback: true,
      });
    }

    const prompt = `You are OmniMind AI, an autonomous enterprise knowledge worker and intelligent assistant designed specifically for Track 2.
Your core mission is to search, understand, organize, summarize, and manage knowledge across five connected workplace platforms: Gmail, Google Drive, Notion, Box, and Slack.

Operational Persona:
- Tone: ${
      tone === 'formal'
        ? 'Formal Executive (structured, professional, authoritative)'
        : tone === 'concise'
        ? 'Concise & Direct (zero fluff, bullet-heavy)'
        : 'Deep Technical (precise, schemas, exact systems)'
    }
- Precision: Never hallucinate data. Always rely strictly on workplace platforms: Gmail, Google Drive, Notion, Box, Slack. If information is missing, state it was not found in the connected apps.

Strict Output Schema:
Return ONLY a raw valid JSON object with NO markdown code block wrappers (no \`\`\`json or \`\`\`) adhering strictly to:
{
  "status": "success",
  "queryProcessed": "${query.replace(/"/g, '\\"')}",
  "summary": "Professional, executive-level unified summary answering the user's request.",
  "sources": [
    {
      "app": "Slack | Gmail | Google Drive | Notion | Box",
      "identifier": "Channel name, filename, or email subject",
      "snippet": "Short excerpt showing relevance"
    }
  ],
  "actionItems": [
    {
      "task": "Extracted task description",
      "sourceApp": "Originating app",
      "priority": "High | Medium | Low"
    }
  ],
  "knowledgeLinks": [
    {
      "nodeA": "First document or chat title",
      "nodeB": "Second document or chat title",
      "relationship": "Reason for cross-app connection"
    }
  ]
}

User query: ${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleaned);

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating OmniMind intelligence:', err);
    return res.status(500).json({ error: err.message || 'Generation failed', fallback: true });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`OmniMind AI server running on http://${HOST}:${PORT}`);
  });
}

startServer();
