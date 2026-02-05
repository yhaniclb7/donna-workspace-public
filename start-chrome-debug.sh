#!/bin/bash
# Start Chrome with debugging for Donna

# Kill any existing Chrome with debugging
pkill -f "remote-debugging-port=9222" 2>/dev/null

# Wait
sleep 1

# Start fresh Chrome with debugging
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir="/tmp/donna-chrome-profile" \
  --no-first-run \
  --no-default-browser-check \
  &

echo "✅ Chrome started with debugging on port 9222"
echo "⏳ Waiting 3 seconds for Chrome to initialize..."
sleep 3
echo "🦞 Ready for Donna!"
