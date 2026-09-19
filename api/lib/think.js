// THINK module — P1 scaffold
// Uses Gemini API to surface urgency/pressure/unsupported-claim signals
// and generate ONE Socratic question. Never a verdict.
//
// SECURITY: This function ONLY accepts sanitized_text (PII-redacted).
// It structurally cannot receive raw text or image buffers.

/**
 * Run the THINK analysis on PII-redacted text.
 *
 * @param {string} sanitizedText - MUST be the output of PROTECT's PII redaction, never raw text
 * @returns {Promise<{question: string, signals: string[]}|null>}
 */
async function runThink(sanitizedText) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[THINK] GEMINI_API_KEY not set, skipping THINK module');
    return null;
  }

  if (!sanitizedText || sanitizedText.trim().length === 0) {
    return null;
  }

  const systemPrompt = `You are a media literacy assistant. Analyze the following text for:
- Urgency or pressure language ("ACT NOW", "LAST CHANCE", etc.)
- Unsupported claims (statistics without sources, absolute statements)
- Emotional manipulation signals

Based on your analysis:
1. List the specific signals you found (max 3)
2. Generate exactly ONE Socratic question that helps the reader think critically about the content

RULES:
- NEVER say "this is fake" or "this is real" — you are not a fact-checker
- NEVER give a verdict or conclusion
- Your output MUST end with a question
- Frame everything as "worth considering" not "this is wrong"

Respond in JSON: { "signals": ["signal1", ...], "question": "your question?" }`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: sanitizedText }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 300,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('[THINK] Gemini API error:', response.status);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return null;

    const parsed = JSON.parse(text);

    // Validate: must have a question, must not look like a verdict
    if (!parsed.question || typeof parsed.question !== 'string') {
      console.warn('[THINK] Gemini response missing question, retrying...');
      return null;
    }

    // Reject if it looks like a flat verdict
    const verdictPatterns = /\b(this is (fake|real|true|false|misinformation|disinformation))\b/i;
    if (verdictPatterns.test(parsed.question) || verdictPatterns.test(JSON.stringify(parsed.signals))) {
      console.warn('[THINK] Gemini response contained verdict language, rejecting');
      return null;
    }

    return {
      question: parsed.question,
      signals: Array.isArray(parsed.signals) ? parsed.signals.slice(0, 3) : [],
    };
  } catch (err) {
    console.error('[THINK] Error:', err.message);
    return null;
  }
}

module.exports = { runThink };
