---
name: workflow-automation
description: "Workflow automation with n8n/Make.com. Use when the user says 'n8n', 'Make', 'Zapier', 'workflow', 'automation', 'webhook', 'trigger', or 'no-code'."
---

# Workflow Automation

## n8n

### Node types
- **Trigger**: Webhook, Schedule, Email, Form, Manual
- **Action**: HTTP Request, Function, Database, File, AI
- **Logic**: IF, Switch, Merge, Split, Loop

### Webhook workflow
```
Webhook (POST /api/data)
  -> Validate Data (Function node)
  -> IF valid:
      -> Save to Database
      -> Send Notification (Email/Slack)
  -> ELSE:
      -> Log Error
      -> Send Alert
```

### AI nodes in n8n
- **AI Agent**: use LLM with tools
- **OpenAI/Anthropic**: direct API calls
- **Vector Store**: RAG retrieval
- **Text Classifier**: categorize inputs

### Error handling
- **Error Trigger**: catch workflow failures
- **Retry on fail**: configurable retry count and interval
- **Continue on fail**: keep workflow running even if a node fails

## Make.com (Integromat)

- **Modules**: equivalent to n8n nodes
- **Scenarios**: equivalent to workflows
- **Routers**: send data to multiple paths
- **Filters**: conditional execution

## Best practices

1. **Idempotency**: workflow can run twice with same result
2. **Error handling**: every workflow needs a failure path
3. **Logging**: log inputs, outputs, and errors
4. **Rate limiting**: respect API limits of downstream services
5. **Testing**: test with real data before activating
6. **Version control**: export workflow JSON and commit

## Monitoring

- Set up alerts for workflow failures
- Monitor execution time and frequency
- Track API usage and costs
- Log all AI model calls and token usage

## Pitfalls

- Not handling errors (workflow fails silently)
- Hardcoding credentials in workflows (use environment variables)
- Not testing with edge cases
- Too many steps in one workflow (break into sub-workflows)
- Not versioning workflow configurations
