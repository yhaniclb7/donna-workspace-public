# Voice System Research Report

## Executive Summary

**Recommendation: Migrate to Twilio ConversationRelay**

| Platform | Median Latency | 95th Percentile | Best For |
|----------|---------------|-----------------|----------|
| **Twilio ConversationRelay** | **<500ms** | **<725ms** | **Production voice AI** |
| Retell AI | ~620-780ms | ~840ms | Balanced features |
| Synthflow | ~420ms | ~480ms | Pure speed (limited features) |
| ElevenLabs Agents | ~950ms+ | ~1100ms | Current setup - TOO SLOW |

## Twilio ConversationRelay (RECOMMENDED)

**Why it's better:**
- **<500ms median latency** (p50: 491ms, p95: 713ms)
- Built-in STT (Deepgram/Google/Amazon)
- Built-in TTS (ElevenLabs/Google/Amazon)
- **WebSocket interface** - direct connection to your LLM
- Handles interruptions automatically
- No media server management needed
- HIPAA eligible

**How it works:**
```
Phone → Twilio → ConversationRelay → WebSocket → Your Bridge → LLM → Response
```

**Integration:**
- Uses TwiML: `<ConversationRelay url="wss://your-server.com">`
- You bring your own LLM (Claude, Gemini, etc.)
- You control the entire conversation logic
- Can inject context/memory on each turn

**Pricing:**
- Pay for Twilio minutes + ConversationRelay usage
- Estimated: $0.05-0.08/minute total

## Why ElevenLabs Agents Failed Us

**Problems encountered:**
1. **7-second cascade timeout** - hung up mid-conversation
2. **950ms+ latency** - too slow for natural conversation
3. **Limited control** - black box, can't optimize
4. **Path issues** - `/v1/chat/completions` URL confusion

## Recommended Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Phone     │────▶│ Twilio           │────▶│ ConversationRelay│
│  +1747...   │     │ +17472453967     │     │ WebSocket       │
└─────────────┘     └──────────────────┘     └────────┬────────┘
                                                      │
                                    ┌─────────────────▼────────┐
                                    │  Donna Voice Bridge       │
                                    │  - Cached context         │
                                    │  - Claude/Gemini LLM      │
                                    │  - <800ms response        │
                                    └──────────────────────────┘
```

## Next Steps

1. **Prototype ConversationRelay** - Build minimal WebSocket bridge
2. **Benchmark** - Compare latency vs current ElevenLabs setup
3. **Migrate** - Switch Twilio number to ConversationRelay
4. **Optimize** - Add streaming responses for sub-500ms

## Alternative: Retell AI

If Twilio doesn't work out:
- 620-780ms latency (acceptable)
- Purpose-built for conversational AI
- Direct LLM integration
- Better than ElevenLabs, slower than Twilio

## Resources

- [Twilio ConversationRelay Docs](https://www.twilio.com/en-us/products/conversational-ai/conversationrelay)
- [Latency Benchmarks](https://www.retellai.com/resources/sub-second-latency-voice-assistants-benchmarks)
- [Twilio Latency Guide](https://www.twilio.com/en-us/blog/developers/best-practices/guide-core-latency-ai-voice-agents)

---
*Research completed: 2026-02-06*
*Next action: Build ConversationRelay prototype*
