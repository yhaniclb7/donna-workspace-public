#!/bin/bash
# Donna Outbound Calling Script
# Makes outbound calls using Twilio + ElevenLabs Agent

set -e

# Load env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/../.env"

# Parse args
TO_NUMBER=""
MESSAGE=""
VOICE_ID="khYwAWwYSjlxlcrwGQ16"  # Sophie Langford
CONTEXT=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --to)
      TO_NUMBER="$2"
      shift 2
      ;;
    --message)
      MESSAGE="$2"
      shift 2
      ;;
    --voice)
      VOICE_ID="$2"
      shift 2
      ;;
    --context)
      CONTEXT="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if [ -z "$TO_NUMBER" ] || [ -z "$MESSAGE" ]; then
  echo "Usage: $0 --to '+15551234567' --message 'Hello' [--context briefing]"
  exit 1
fi

echo "📞 Donna Calling: $TO_NUMBER"
echo "🎯 Message: $MESSAGE"
echo ""

# Make call via Twilio
curl -s -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
  --data-urlencode "To=$TO_NUMBER" \
  --data-urlencode "From=$TWILIO_NUMBER" \
  --data-urlencode "Url=https://handler.twilio.com/twiml/EH[YOUR_ELEVENLABS_HANDLER]" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" | jq .

echo ""
echo "✅ Call initiated! Check Twilio console for status."
