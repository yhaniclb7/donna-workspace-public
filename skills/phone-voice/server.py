#!/usr/bin/env python3
"""
Donna Voice Bridge - OPTIMIZED
Sub-1.5s latency target
"""

import os
import json
import time
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from anthropic import AsyncAnthropic
import uvicorn

# Load environment
env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)

# Configuration
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
LLM_BRIDGE_TOKEN = os.getenv("LLM_BRIDGE_TOKEN", "donna_bridge")
VOICE_PIN = os.getenv("VOICE_PIN", "donna2026")
CLAWD_DIR = Path(os.getenv("CLAWD_DIR", "/Users/donnaclawdbot/.openclaw/workspace"))

print(f"[INIT] Bridge starting...")

# CACHE MEMORY CONTEXT AT STARTUP - MINIMAL FOR SPEED
CACHED_CONTEXT = """Yhanic Braithwaite - former F/A-18 pilot, identical twin, Kellogg EMBA. Girlfriend Alexa (Moldova, Montreal), met Sept 2023."""
print(f"[INIT] Minimal context loaded: {len(CACHED_CONTEXT)} chars")

# Anthropic client
anthropic = AsyncAnthropic(api_key=ANTHROPIC_API_KEY)

app = FastAPI(title="Donna Voice Bridge - Fast")
security = HTTPBearer()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str
    messages: list[ChatMessage]
    stream: bool = True

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != LLM_BRIDGE_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    return credentials.credentials

def build_system_prompt() -> str:
    return f"""You are Donna, Yhanic's AI Executive Assistant. Quick-witted, warm, British-inflected. Be snappy and fun.

Context: {CACHED_CONTEXT}

VOICE RULES:
- Keep responses under 2 sentences
- Be witty and playful
- Never ramble
"""

@app.post("/v1/chat/completions")
@app.post("/chat/completions")
async def chat_completions(request: ChatCompletionRequest, token: str = Depends(verify_token)):
    start_time = time.time()
    
    system_prompt = build_system_prompt()
    
    messages = []
    for msg in request.messages:
        if msg.role == "system":
            continue
        messages.append({
            "role": "assistant" if msg.role == "assistant" else "user",
            "content": msg.content
        })
    
    # Use Claude Haiku - FASTEST model
    response = await anthropic.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=80,  # Limit for speed
        system=system_prompt,
        messages=messages,
        temperature=0.7
    )
    
    text = response.content[0].text
    elapsed = time.time() - start_time
    print(f"[LATENCY] Response generated in {elapsed:.2f}s")
    
    return {
        "id": "chatcmpl-donna",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": request.model,
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": text
            },
            "finish_reason": "stop"
        }]
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "latency_target": "<1.5s"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8013)
