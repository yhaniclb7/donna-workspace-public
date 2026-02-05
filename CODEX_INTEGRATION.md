# Codex Associate - Integration Guide

## Status: ✅ ACTIVE

Codex (OpenAI GPT-5.2 coding agent) is now available as a sub-agent.

## How Donna Uses Codex

### Direct Spawn
```bash
codex "Build a React component that..."
```

### With Context
```bash
codex --context ./project "Add authentication to this app"
```

### File-based
```bash
codex --file task.md
```

## Use Cases

| Task | Donna | Codex |
|------|-------|-------|
| Complex web app | Manage scope, review | Build entire app |
| API integration | Specify requirements | Write integration code |
| Bug fixes | Identify issue | Implement fix |
| Refactoring | Define goals | Execute refactor |
| New features | Design UX | Code implementation |

## Workflow

1. **You request** → "Build an AI contract review app"
2. **I (Donna) spawn** → Codex with full requirements
3. **Codex builds** → Writes code, tests, commits
4. **I review** → Check quality, suggest improvements
5. **Deploy** → Push to GitHub, Vercel
6. **Report** → Send you completion summary

## Active Project Queue

When you say "Build X overnight":
1. I write detailed spec
2. Spawn Codex with spec
3. Monitor progress
4. Review deliverables
5. Deploy if good
6. Report results in morning brief

## Codex Limitations

- Needs terminal interaction for some prompts
- Works best with clear, detailed specs
- Can write code but can't deploy without my help
- Good at execution, not architecture decisions

**Codex is ready for autonomous overnight builds!**
