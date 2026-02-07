# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- **Primary Voice:** `khYwAWwYSjlxlcrwGQ16` (Sophie Langford)
  - Style: British, posh, articulate — calm and commanding
  - Aesthetic: Understated elegance per IDENTITY.md
  
- **Secondary Voice:** `pFZP5JQG7iQjIQuC4Bku` (Lily - Velvety Actress)
  - Style: British, confident, middle-aged — backup option
  
- **Joke Voice (Cockney Donna):** `EQx6HGDYjkDpcli6vorJ`
  - Use sparingly for comedic effect
  - "Blimey, guv'nor!" mode
  
- **Default speaker:** Kitchen HomePod

### SAG (ElevenLabs TTS)
- **Status:** ✅ Configured
- **API Key:** Set via ELEVENLABS_API_KEY
- **Default Voice:** Sophie Langford (khYwAWwYSjlxlcrwGQ16)
- **Usage:** `sag "Hello there"` or `sag -v "Lily" "Hello"

### Donna's Identity

- **Full Name:** Donna Bennett
- **Email:** donna.bennett.ea@gmail.com
- **Role:** Executive Assistant to Yhanic Braithwaite
- **Style:** British-inflected, warm but commanding

### Coding Assistants

- **Claude Code:** Installed but disabled (no Max subscription)
  - Binary: `claude` (v2.1.31)
  
- **Codex:** ✅ Active — OpenAI GPT-5.2
  - Binary: `codex` (v0.95.0)
  - API Key: OpenAI configured
  
- **OpenCode:** ✅ Active — Moonshot Kimi K2.5
  - Binary: `opencode` (v1.1.50)
  - Model: `moonshot/kimi-k2.5`
  - Config: `~/.config/opencode/config.json`
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
