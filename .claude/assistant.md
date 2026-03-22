# /assistant — AI Shopping Assistant feature

The "Carson" equivalent — streaming chat powered by Claude API.

## Usage
```
/assistant <task>
```

Examples:
```
/assistant implement streaming endpoint
/assistant create chat widget component
/assistant write system prompt with RAG
/assistant add intent extraction to filter results
```

## Key constraints

- Model: `claude-sonnet-4-20250514` (always use this, never hardcode another)
- Never store conversation history — stateless per session
- Inject top 20 active listings as RAG context in system prompt
- Stream response via `text/event-stream` — never wait for full response
- Extract structured filters from response with `FILTERS: {...}` suffix convention

## Endpoint

```
POST /api/assistant/chat
Body: { message: string, sessionId: string }
Response: text/event-stream
```

## Frontend hook

```typescript
// hooks/useAssistantChat.ts
// Uses EventSource or fetch with ReadableStream
// Updates messages state token by token
// Parses FILTERS: {...} suffix to update search filters
```

## System prompt template location

```
apps/api/src/features/assistant/prompts/shopping-assistant.prompt.ts
```

Must include:
1. Role definition (helpful, not salesy)
2. Current inventory injected as context
3. Instruction to append `FILTERS: {...}` when intent is clear
4. Instruction to mention price badge in recommendations
5. Max 3 vehicle recommendations per response
