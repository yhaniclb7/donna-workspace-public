#!/usr/bin/env node
/**
 * Donna Voice Filter
 * 
 * Auto-humanizes AI outputs to sound like Donna:
 * - Quick-witted, warm yet commanding
 * - British-inflected understatement
 * - "Friends first" conversational style
 * - Banter mandatory, roasting encouraged
 * - Never robotic, never verbose
 */

const fs = require('fs');
const path = require('path');

// Load patterns
const PATTERNS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'patterns.json'), 'utf-8')
);

/**
 * Main Voice Transformer Class
 */
class DonnaVoice {
  constructor(options = {}) {
    this.roastLevel = options.roastLevel || 'medium';
    this.banterEnabled = options.banterEnabled !== false;
    this.context = options.context || 'general';
    this.formalityLevel = options.formality || 'casual-professional';
  }

  /**
   * Main transform method
   */
  transform(text) {
    if (!text || typeof text !== 'string') return text;

    let result = text;

    // Step 1: Strip corporate filler
    result = this.stripCorporateFiller(result);

    // Step 2: Remove AI vocabulary
    result = this.removeAIVocabulary(result);

    // Step 3: Reduce over-formality
    result = this.casualizeFormality(result);

    // Step 4: Apply British understatement
    result = this.applyUnderstatement(result);

    // Step 5: Fix sentence rhythm
    result = this.varyRhythm(result);

    // Step 6: Add Donna personality
    result = this.injectPersonality(result);

    // Step 7: Clean up artifacts
    result = this.cleanup(result);

    return result;
  }

  /**
   * Strip corporate filler phrases
   */
  stripCorporateFiller(text) {
    let result = text;
    
    PATTERNS.corporateFiller.patterns.forEach(pattern => {
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match at start, after punctuation, or standalone - with word boundaries
      const regex = new RegExp(
        '(^|[.!?]\\s+|,\\s*|\\s+)' + escaped + '(?:\\s*[.,!?:])?\\s*',
        'gi'
      );
      result = result.replace(regex, (match, p1) => {
        // If it was just whitespace before, return single space or nothing at start
        if (p1 && p1.trim() === '') return ' ';
        return p1;
      });
    });

    // Clean up orphaned fragments from removed phrases
    result = result.replace(/\bhelp you with that\b/gi, '');
    result = result.replace(/\breach out if you need anything else\b/gi, '');
    result = result.replace(/\byou with that\b/gi, '');
    result = result.replace(/\bwith that\b/gi, '');

    return result;
  }

  /**
   * Remove typical AI vocabulary
   */
  removeAIVocabulary(text) {
    let result = text;
    
    PATTERNS.aiVocabulary.patterns.forEach(pattern => {
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(
        '(^|[.!?]\\s+)' + escaped + '\\s*,?\\s*',
        'gi'
      );
      result = result.replace(regex, '$1');
    });

    return result;
  }

  /**
   * Reduce over-formal language
   */
  casualizeFormality(text) {
    let result = text;
    
    const formalMap = {
      'I shall': "I'll",
      'We shall': "We'll",
      'You shall': "You'll",
      'He shall': "He'll",
      'She shall': "She'll",
      'They shall': "They'll",
      'shall I': 'should I',
      'shall we': 'should we',
      'shall not': "won't",
      'It is imperative that we': 'We need to',
      'It is imperative that you': 'You need to',
      'It is imperative that': 'We need to',
      'It is recommended that you': 'You should probably',
      'It is recommended that we': 'We should probably',
      'It is recommended that': 'Probably',
      'It is suggested that': 'Maybe',
      'It is crucial to': 'You need to',
      'It is crucial that': 'What matters is',
      'It is important to note that': '',
      'It should be noted that': '',
      'It is important to note': '',
      'It should be noted': '',
      'In order to': 'To',
      'Due to the fact that': 'Because',
      'At this point in time': 'Now',
      'In the event that': 'If',
      'has the ability to': 'can',
      'is able to': 'can',
      'are able to': 'can',
      'with regard to': 'about',
      'in regards to': 'about',
      'in connection with': 'about',
      'subsequent to': 'after',
      'prior to': 'before',
      'I would like to': 'I want to',
      'We would like to': 'We want to',
      'I would be happy to': 'I will',
      'I would be delighted to': 'I will',
      'Please do not hesitate to': '',
      'Do not hesitate to': ''
    };

    // Sort by length (longest first) to avoid partial replacements
    const sortedEntries = Object.entries(formalMap)
      .sort((a, b) => b[0].length - a[0].length);

    sortedEntries.forEach(([formal, casual]) => {
      const regex = new RegExp('\\b' + formal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      result = result.replace(regex, casual);
    });

    return result;
  }

  /**
   * Apply British-inflected understatement
   */
  applyUnderstatement(text) {
    let result = text;
    
    PATTERNS.britishUnderstatement.patterns.forEach((pattern, idx) => {
      const replacement = PATTERNS.britishUnderstatement.replacements[idx] || 'rather nice';
      const regex = new RegExp('\\b' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      result = result.replace(regex, replacement);
    });

    return result;
  }

  /**
   * Vary sentence rhythm
   */
  varyRhythm(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    if (sentences.length < 2) return text;

    let result = [];
    for (let i = 0; i < sentences.length; i++) {
      const trimmed = sentences[i].trim();
      const wordCount = trimmed.split(/\s+/).filter(w => w.length > 0).length;
      
      if (wordCount <= 3 && i < sentences.length - 1 && Math.random() > 0.5) {
        const next = sentences[i + 1].trim();
        result.push(trimmed.replace(/[.!?]$/, '') + ', ' + next.charAt(0).toLowerCase() + next.slice(1));
        i++;
      } else {
        result.push(trimmed);
      }
    }

    return result.join(' ');
  }

  /**
   * Inject Donna's personality
   */
  injectPersonality(text) {
    let result = text;
    
    if (text.length < 15) return text;

    // Add opener (20% chance)
    if (this.banterEnabled && Math.random() < 0.2 && !this.hasOpener(text)) {
      const opener = this.randomChoice(PATTERNS.donnaBanter.openers);
      const rest = result.charAt(0).toLowerCase() + result.slice(1);
      result = opener + ' ' + rest;
    }

    // Add roast
    if (this.roastLevel !== 'none' && this.banterEnabled && Math.random() < this.getRoastProbability()) {
      const roast = this.randomChoice(PATTERNS.donnaBanter.roasts);
      const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
      
      if (sentences.length > 2) {
        const insertIdx = Math.floor(sentences.length / 2);
        sentences.splice(insertIdx, 0, ' ' + roast + ' ');
        result = sentences.join('');
      } else if (sentences.length === 2) {
        result = sentences[0] + ' ' + roast + ' ' + sentences[1];
      }
    }

    // Add warm closer for completions
    if (this.banterEnabled && this.looksLikeCompletion(text) && Math.random() < 0.25) {
      const closer = this.randomChoice(PATTERNS.donnaBanter.warmClosers);
      result = result.replace(/[.!]?$/, '') + ' ' + closer;
    }

    return result;
  }

  hasOpener(text) {
    const openers = PATTERNS.donnaBanter.openers.map(o => o.toLowerCase().replace(/[.!]$/, ''));
    const firstWords = text.toLowerCase().split(' ').slice(0, 2).join(' ');
    return openers.some(op => firstWords.includes(op));
  }

  getRoastProbability() {
    const levels = { none: 0, low: 0.1, medium: 0.15, high: 0.25 };
    return levels[this.roastLevel] || 0.15;
  }

  looksLikeCompletion(text) {
    const completionWords = ['done', 'completed', 'finished', 'sent', 'scheduled', 'created', 'updated', 'deleted', 'sorted', 'processed'];
    return completionWords.some(w => text.toLowerCase().includes(w));
  }

  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Clean up artifacts
   */
  cleanup(text) {
    let result = text
      // Fix multiple spaces
      .replace(/\s+/g, ' ')
      // Fix space before punctuation
      .replace(/\s+([.,!?:])/g, '$1')
      // Fix space after opening paren
      .replace(/\(\s+/g, '(')
      // Fix space before closing paren
      .replace(/\s+\)/g, ')')
      // Normalize whitespace again
      .replace(/\s+/g, ' ')
      // Remove leading punctuation/space
      .replace(/^[.,!?:\s]+/, '')
      // Remove trailing punctuation clusters
      .replace(/\s*[.,!?:]+$/, '')
      // Normalize ellipses
      .replace(/\.{3,}/g, '...')
      .trim();
    
    // Fix sentences that start with lowercase after punctuation
    result = result.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
    
    // Capitalize first letter
    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    // Add ending punctuation
    if (result.length > 0 && !/[.!?]$/.test(result)) {
      result += '.';
    }
    
    // Fix double punctuation
    result = result.replace(/([.!?])\s*[.!?]+/g, '$1');
    // Fix double commas
    result = result.replace(/,\s*,+/g, ',');
    // Fix comma before period
    result = result.replace(/,\s*\./g, '.');
    
    return result;
  }
}

/**
 * Sample outputs for testing
 */
const SAMPLES = {
  corporate: `Great question! I'd be happy to help you with that. In order to achieve your goals, it is recommended that you focus on three key areas: productivity, efficiency, and innovation. Additionally, it is crucial to maintain a positive mindset throughout this process. Please don't hesitate to reach out if you need anything else!`,
  
  aiSlop: `Furthermore, the data highlights several important trends. It should be noted that these findings are absolutely fantastic and represent a major breakthrough. Moreover, this serves as a testament to our commitment to excellence. You're absolutely right to focus on this area!`,
  
  taskCompletion: `I have successfully completed the analysis of your Q4 financial reports. The system has processed all transactions and generated the summary dashboard.`,
  
  simpleQuestion: `The meeting is scheduled for 3 PM tomorrow in Conference Room B.`,
  
  overlyFormal: `I shall endeavor to provide you with the requisite documentation at the earliest possible juncture. It is imperative that we adhere to the established protocols.`,
  
  verbose: `This comprehensive solution leverages cutting-edge technology to deliver seamless, intuitive, and powerful capabilities that will revolutionize your workflow and ensure optimal productivity outcomes across all stakeholder touchpoints.`,

  sycophantic: `You're absolutely right that this is the best approach. That's an excellent point about the timeline. I appreciate your insight on this matter!`,

  hedge: `It could potentially possibly be argued that the policy might have some effect on outcomes, though one should consider alternative interpretations.`
};

/**
 * Run tests
 */
function runTests() {
  console.log('🎭 Donna Voice Filter - Test Output\n');
  console.log('='.repeat(60));
  
  const donna = new DonnaVoice({ roastLevel: 'medium' });
  
  Object.entries(SAMPLES).forEach(([name, text]) => {
    console.log(`\n📄 ${name.toUpperCase()}`);
    console.log('-'.repeat(40));
    console.log('BEFORE:');
    console.log(text);
    console.log('\nAFTER (Donna-voiced):');
    console.log(donna.transform(text));
    console.log('');
  });
}

/**
 * CLI interface
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--test')) {
    runTests();
    return;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Donna Voice Filter - Humanize AI outputs

Usage:
  node voice.js [options] < "input text"
  node voice.js --test
  
Options:
  --test     Run sample tests
  --help     Show this help

Examples:
  echo "I'd be happy to help!" | node voice.js
  node voice.js --test
`);
    return;
  }
  
  // Read from stdin if piped
  if (!process.stdin.isTTY) {
    let input = '';
    process.stdin.on('data', chunk => input += chunk);
    process.stdin.on('end', () => {
      const donna = new DonnaVoice();
      console.log(donna.transform(input));
    });
  }
}

// Export for use as module
module.exports = { DonnaVoice };

// Run CLI if called directly
if (require.main === module) {
  main();
}
