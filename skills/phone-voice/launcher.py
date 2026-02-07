#!/usr/bin/env python3
import os
import sys

# Clear any cached env vars
for key in ['LLM_BRIDGE_TOKEN', 'GOOGLE_API_KEY', 'ELEVENLABS_API_KEY']:
    if key in os.environ:
        del os.environ[key]

# Now run the actual server
exec(open('server.py').read())
