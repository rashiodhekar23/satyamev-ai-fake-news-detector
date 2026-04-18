import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Verdict translations per language
const VERDICT_TRANSLATIONS = {
  mr: { FAKE: "खोटी बातमी", REAL: "खरी बातमी", MISLEADING: "दिशाभूल करणारी बातमी", UNVERIFIED: "अपुष्ट बातमी" },
  hi: { FAKE: "फर्जी खबर", REAL: "सच्ची खबर", MISLEADING: "भ्रामक खबर", UNVERIFIED: "अपुष्ट खबर" },
  gu: { FAKE: "નકલી સમાચાર", REAL: "સાચા સમાચાર", MISLEADING: "ભ્રામક સમાચાર", UNVERIFIED: "અચકાસાયેલ સમાચાર" },
  pa: { FAKE: "ਝੂਠੀ ਖਬਰ", REAL: "ਸੱਚੀ ਖਬਰ", MISLEADING: "ਭੁਲੇਖਾ ਪਾਉਣ ਵਾਲੀ", UNVERIFIED: "ਅਣਪੁਸ਼ਟ ਖਬਰ" },
  ta: { FAKE: "பொய்யான செய்தி", REAL: "உண்மையான செய்தி", MISLEADING: "தவறான செய்தி", UNVERIFIED: "உறுதிப்படாத செய்தி" },
  te: { FAKE: "నకిలీ వార్త", REAL: "నిజమైన వార్త", MISLEADING: "తప్పుదారి వార్త", UNVERIFIED: "నిర్ధారించని వార్త" },
  kn: { FAKE: "ನಕಲಿ ಸುದ್ದಿ", REAL: "ನಿಜವಾದ ಸುದ್ದಿ", MISLEADING: "ತಪ್ಪುದಾರಿ ಸುದ್ದಿ", UNVERIFIED: "ಅಪರಿಚಿತ ಸುದ್ದಿ" },
  ml: { FAKE: "വ്യാജ വാർത്ത", REAL: "യഥാർത്ഥ വാർത്ത", MISLEADING: "തെറ്റിദ്ധരിപ്പിക്കുന്ന വാർത്ത", UNVERIFIED: "സ്ഥിരീകരിക്കാത്ത വാർത്ത" },
  bn: { FAKE: "মিথ্যা খবর", REAL: "সত্য খবর", MISLEADING: "বিভ্রান্তিকর খবর", UNVERIFIED: "অযাচাই খবর" },
  en: { FAKE: "FAKE", REAL: "REAL", MISLEADING: "MISLEADING", UNVERIFIED: "UNVERIFIED" },
};

// Language detection by script/keywords
function detectLanguage(text) {
  if (/[\u0900-\u097F]/.test(text)) {
    // Devanagari — Hindi or Marathi
    const marathiWords = ['आहे', 'नाही', 'होते', 'केले', 'आणि', 'मराठी', 'महाराष्ट्र', 'बातमी', 'सांगितले'];
    const hindiWords = ['है', 'नहीं', 'था', 'किया', 'और', 'हिंदी', 'भारत', 'खबर', 'कहा'];
    const mrCount = marathiWords.filter(w => text.includes(w)).length;
    const hiCount = hindiWords.filter(w => text.includes(w)).length;
    return mrCount >= hiCount ? 'mr' : 'hi';
  }
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa'; // Punjabi
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
  return 'en'; // Default English
}

const LANGUAGE_NAMES = {
  mr: 'Marathi', hi: 'Hindi', gu: 'Gujarati', pa: 'Punjabi',
  ta: 'Tamil', te: 'Telugu', kn: 'Kannada', ml: 'Malayalam',
  bn: 'Bengali', en: 'English'
};

export async function POST(req) {
  try {
    const body = await req.json();
    const text = body.text;

    if (!text) {
      return NextResponse.json(
        { error: "Please enter news text" },
        { status: 400 }
      );
    }

    // Detect language
    const lang = detectLanguage(text);
    const langName = LANGUAGE_NAMES[lang] || 'English';

    // Demo mode
    if (!process.env.GROQ_API_KEY) {
      const demo = VERDICT_TRANSLATIONS[lang] || VERDICT_TRANSLATIONS['en'];
      return NextResponse.json({
        verdict: "FAKE",
        verdictLocal: demo["FAKE"],
        reason: "Demo mode active (API key missing)",
        score: Math.floor(Math.random() * 100),
        lang,
      });
    }

    // AI Call with language instruction
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a fake news detector. 
The user's input is in ${langName}. 
You MUST respond ONLY in ${langName} language.
Reply ONLY in this exact JSON format (no extra text):
{"verdict":"FAKE","reason":"...explanation in ${langName}...","score":0}
- verdict must be exactly one of: FAKE, REAL, MISLEADING, UNVERIFIED
- reason must be written in ${langName} language
- score is credibility score from 0 to 100 (100 = fully credible)`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
    });

    const aiResponse = chatCompletion.choices?.[0]?.message?.content || "{}";

    let verdict = "UNVERIFIED";
    let reason = "No explanation available.";
    let score = 50;

    // Parse JSON
    try {
      // Strip markdown code blocks if present
      const cleaned = aiResponse.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      verdict = parsed.verdict?.toUpperCase() || "UNVERIFIED";
      reason = parsed.reason || reason;
      score = typeof parsed.score === 'number' ? parsed.score : 50;
    } catch {
      console.log("JSON parse failed, using fallback...");
      const lower = aiResponse.toLowerCase();
      if (lower.includes("fake")) verdict = "FAKE";
      else if (lower.includes("real")) verdict = "REAL";
      else if (lower.includes("misleading")) verdict = "MISLEADING";
      reason = aiResponse;
    }

    // Get local language verdict label
    const translations = VERDICT_TRANSLATIONS[lang] || VERDICT_TRANSLATIONS['en'];
    const verdictLocal = translations[verdict] || verdict;

    return NextResponse.json({
      verdict,
      verdictLocal,
      reason,
      score,
      lang,
    });

  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json(
      { verdict: "UNVERIFIED", reason: "AI processing failed", score: 0 },
      { status: 500 }
    );
  }
}