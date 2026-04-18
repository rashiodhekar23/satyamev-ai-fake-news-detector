'use client';
import { useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🟠' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const TRANSLATIONS = {
  en: {
    title: 'AI-POWERED SATYAMEV AI',
    subtitle: 'DETECTION PLATFORM',
    desc: 'Instantly analyze headlines, articles and URLs.',
    paste: 'Paste Headline or Text',
    placeholder: 'e.g. Scientists discover water on Mars...',
    urlPlaceholder: 'https://article-url.com (optional)',
    analyze: 'ANALYZE ⚡',
    scanning: '⏳ Scanning...',
    recentSearches: '🕐 Recent Searches',
    clearHistory: '🗑️ Clear History',
    liveNews: '📰 Live News Feed',
    read: '🔗 Read',
    analyzeBtn: '⚡ Analyze',
    enterHeadline: 'Enter a headline or URL to see analysis result',
  },
  hi: {
    title: 'AI-संचालित SATYAMEV AI',
    subtitle: 'समाचार जांच मंच',
    desc: 'तुरंत समाचार, लेख और URL की जांच करें।',
    paste: 'शीर्षक या पाठ चिपकाएं',
    placeholder: 'उदा. वैज्ञानिकों ने मंगल पर पानी खोजा...',
    urlPlaceholder: 'https://article-url.com (वैकल्पिक)',
    analyze: 'जांचें ⚡',
    scanning: '⏳ जांच हो रही है...',
    recentSearches: '🕐 हाल की खोजें',
    clearHistory: '🗑️ इतिहास साफ करें',
    liveNews: '📰 लाइव समाचार',
    read: '🔗 पढ़ें',
    analyzeBtn: '⚡ जांचें',
    enterHeadline: 'परिणाम देखने के लिए शीर्षक या URL डालें',
  },
  mr: {
    title: 'AI-चालित SATYAMEV AI',
    subtitle: 'बातमी तपासणी मंच',
    desc: 'बातम्या, लेख आणि URL त्वरित तपासा।',
    paste: 'मथळा किंवा मजकूर टाका',
    placeholder: 'उदा. शास्त्रज्ञांनी मंगळावर पाणी शोधले...',
    urlPlaceholder: 'https://article-url.com (पर्यायी)',
    analyze: 'तपासा ⚡',
    scanning: '⏳ तपासत आहे...',
    recentSearches: '🕐 अलीकडील शोध',
    clearHistory: '🗑️ इतिहास साफ करा',
    liveNews: '📰 थेट बातम्या',
    read: '🔗 वाचा',
    analyzeBtn: '⚡ तपासा',
    enterHeadline: 'निकाल पाहण्यासाठी मथळा किंवा URL टाका',
  },
  gu: {
    title: 'AI-સંચાલિત SATYAMEV AI',
    subtitle: 'સમાચાર તપાસ મંચ',
    desc: 'તરત જ સમાચાર, લેખ અને URL તપાસો.',
    paste: 'શીર્ષક અથવા ટેક્સ્ટ પેસ્ટ કરો',
    placeholder: 'દા.ત. વૈજ્ઞાનિકોએ મંગળ પર પાણી શોધ્યું...',
    urlPlaceholder: 'https://article-url.com (વૈકલ્પિક)',
    analyze: 'તપાસો ⚡',
    scanning: '⏳ તપાસ થઈ રહી છે...',
    recentSearches: '🕐 તાજેતરની શોધ',
    clearHistory: '🗑️ ઇતિહાસ સાફ કરો',
    liveNews: '📰 લાઇવ સમાચાર',
    read: '🔗 વાંચો',
    analyzeBtn: '⚡ તપાસો',
    enterHeadline: 'પરિણામ જોવા માટે શીર્ષક અથવા URL દાખલ કરો',
  },
  pa: {
    title: 'AI-ਸੰਚਾਲਿਤ SATYAMEV AI',
    subtitle: 'ਖ਼ਬਰ ਜਾਂਚ ਮੰਚ',
    desc: 'ਤੁਰੰਤ ਖ਼ਬਰਾਂ, ਲੇਖ ਅਤੇ URL ਦੀ ਜਾਂਚ ਕਰੋ।',
    paste: 'ਸਿਰਲੇਖ ਜਾਂ ਟੈਕਸਟ ਪੇਸਟ ਕਰੋ',
    placeholder: 'ਉਦਾ. ਵਿਗਿਆਨੀਆਂ ਨੇ ਮੰਗਲ \'ਤੇ ਪਾਣੀ ਲੱਭਿਆ...',
    urlPlaceholder: 'https://article-url.com (ਵਿਕਲਪਿਕ)',
    analyze: 'ਜਾਂਚੋ ⚡',
    scanning: '⏳ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...',
    recentSearches: '🕐 ਹਾਲੀਆ ਖੋਜਾਂ',
    clearHistory: '🗑️ ਇਤਿਹਾਸ ਸਾਫ਼ ਕਰੋ',
    liveNews: '📰 ਲਾਈਵ ਖ਼ਬਰਾਂ',
    read: '🔗 ਪੜ੍ਹੋ',
    analyzeBtn: '⚡ ਜਾਂਚੋ',
    enterHeadline: 'ਨਤੀਜਾ ਦੇਖਣ ਲਈ ਸਿਰਲੇਖ ਜਾਂ URL ਦਾਖਲ ਕਰੋ',
  },
  ta: {
    title: 'AI-இயக்கும் SATYAMEV AI',
    subtitle: 'செய்தி சரிபார்ப்பு மேடை',
    desc: 'உடனடியாக செய்திகள், கட்டுரைகள் மற்றும் URL சரிபார்க்கவும்.',
    paste: 'தலைப்பு அல்லது உரை ஒட்டவும்',
    placeholder: 'எ.கா. விஞ்ஞானிகள் செவ்வாயில் நீர் கண்டுபிடித்தனர்...',
    urlPlaceholder: 'https://article-url.com (விருப்பமானது)',
    analyze: 'சரிபார்க்க ⚡',
    scanning: '⏳ சரிபார்க்கிறது...',
    recentSearches: '🕐 சமீபத்திய தேடல்கள்',
    clearHistory: '🗑️ வரலாற்றை அழிக்கவும்',
    liveNews: '📰 நேரடி செய்திகள்',
    read: '🔗 படிக்க',
    analyzeBtn: '⚡ சரிபார்க்க',
    enterHeadline: 'முடிவைப் பார்க்க தலைப்பு அல்லது URL உள்ளிடவும்',
  },
  te: {
    title: 'AI-ఆధారిత SATYAMEV AI',
    subtitle: 'వార్తా తనిఖీ వేదిక',
    desc: 'వెంటనే వార్తలు, వ్యాసాలు మరియు URL తనిఖీ చేయండి.',
    paste: 'శీర్షిక లేదా వచనం అతికించండి',
    placeholder: 'ఉదా. శాస్త్రవేత్తలు అంగారకుడిపై నీరు కనుగొన్నారు...',
    urlPlaceholder: 'https://article-url.com (ఐచ్ఛికం)',
    analyze: 'తనిఖీ చేయండి ⚡',
    scanning: '⏳ తనిఖీ అవుతోంది...',
    recentSearches: '🕐 ఇటీవలి శోధనలు',
    clearHistory: '🗑️ చరిత్రను తొలగించండి',
    liveNews: '📰 లైవ్ వార్తలు',
    read: '🔗 చదవండి',
    analyzeBtn: '⚡ తనిఖీ',
    enterHeadline: 'ఫలితం చూడటానికి శీర్షిక లేదా URL నమోదు చేయండి',
  },
  kn: {
    title: 'AI-ಚಾಲಿತ SATYAMEV AI',
    subtitle: 'ಸುದ್ದಿ ಪರಿಶೀಲನಾ ವೇದಿಕೆ',
    desc: 'ತಕ್ಷಣವೇ ಸುದ್ದಿಗಳು, ಲೇಖನಗಳು ಮತ್ತು URL ಪರಿಶೀಲಿಸಿ.',
    paste: 'ಶೀರ್ಷಿಕೆ ಅಥವಾ ಪಠ್ಯ ಅಂಟಿಸಿ',
    placeholder: 'ಉದಾ. ವಿಜ್ಞಾನಿಗಳು ಮಂಗಳದಲ್ಲಿ ನೀರು ಕಂಡುಕೊಂಡರು...',
    urlPlaceholder: 'https://article-url.com (ಐಚ್ಛಿಕ)',
    analyze: 'ಪರಿಶೀಲಿಸಿ ⚡',
    scanning: '⏳ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    recentSearches: '🕐 ಇತ್ತೀಚಿನ ಹುಡುಕಾಟಗಳು',
    clearHistory: '🗑️ ಇತಿಹಾಸ ತೆರವು ಮಾಡಿ',
    liveNews: '📰 ನೇರ ಸುದ್ದಿ',
    read: '🔗 ಓದಿ',
    analyzeBtn: '⚡ ಪರಿಶೀಲಿಸಿ',
    enterHeadline: 'ಫಲಿತಾಂಶ ನೋಡಲು ಶೀರ್ಷಿಕೆ ಅಥವಾ URL ನಮೂದಿಸಿ',
  },
  ml: {
    title: 'AI-ഉദ്യോഗസ്ഥ SATYAMEV AI',
    subtitle: 'വാർത്താ പരിശോധന വേദി',
    desc: 'ഉടനടി വാർത്തകൾ, ലേഖനങ്ങൾ, URL പരിശോധിക്കുക.',
    paste: 'തലക്കെട്ട് അല്ലെങ്കിൽ ടെക്സ്റ്റ് ഒട്ടിക്കുക',
    placeholder: 'ഉദാ. ശാസ്ത്രജ്ഞർ ചൊവ്വയിൽ വെള്ളം കണ്ടെത്തി...',
    urlPlaceholder: 'https://article-url.com (ഐച്ഛികം)',
    analyze: 'പരിശോധിക്കുക ⚡',
    scanning: '⏳ പരിശോധിക്കുന്നു...',
    recentSearches: '🕐 സമീപകാല തിരയലുകൾ',
    clearHistory: '🗑️ ചരിത്രം മായ്ക്കുക',
    liveNews: '📰 തത്സമയ വാർത്ത',
    read: '🔗 വായിക്കുക',
    analyzeBtn: '⚡ പരിശോധിക്കുക',
    enterHeadline: 'ഫലം കാണാൻ തലക്കെട്ട് അല്ലെങ്കിൽ URL നൽകുക',
  },
  bn: {
    title: 'AI-চালিত SATYAMEV AI',
    subtitle: 'সংবাদ যাচাই মঞ্চ',
    desc: 'তাৎক্ষণিকভাবে সংবাদ, নিবন্ধ এবং URL যাচাই করুন।',
    paste: 'শিরোনাম বা পাঠ্য পেস্ট করুন',
    placeholder: 'যেমন. বিজ্ঞানীরা মঙ্গলে জল আবিষ্কার করেছেন...',
    urlPlaceholder: 'https://article-url.com (ঐচ্ছিক)',
    analyze: 'যাচাই করুন ⚡',
    scanning: '⏳ যাচাই হচ্ছে...',
    recentSearches: '🕐 সাম্প্রতিক অনুসন্ধান',
    clearHistory: '🗑️ ইতিহাস মুছুন',
    liveNews: '📰 লাইভ সংবাদ',
    read: '🔗 পড়ুন',
    analyzeBtn: '⚡ যাচাই',
    enterHeadline: 'ফলাফল দেখতে শিরোনাম বা URL লিখুন',
  },
  or: {
    title: 'AI-ଚାଳିତ SATYAMEV AI',
    subtitle: 'ସମ୍ବାଦ ଯାଞ୍ଚ ମଞ୍ଚ',
    desc: 'ତୁରନ୍ତ ସମ୍ବାଦ, ଲେଖା ଏବଂ URL ଯାଞ୍ଚ କରନ୍ତୁ।',
    paste: 'ଶୀର୍ଷ କିମ୍ବା ପାଠ ପେଷ୍ଟ କରନ୍ତୁ',
    placeholder: 'ଯଥା. ବୈଜ୍ଞାନିକମାନେ ମଙ୍ଗଳରେ ଜଳ ଆବିଷ୍କାର କଲେ...',
    urlPlaceholder: 'https://article-url.com (ଐଚ୍ଛିକ)',
    analyze: 'ଯାଞ୍ଚ କରନ୍ତୁ ⚡',
    scanning: '⏳ ଯାଞ୍ଚ ହେଉଛି...',
    recentSearches: '🕐 ସଦ୍ୟ ଅନୁସନ୍ଧାନ',
    clearHistory: '🗑️ ଇତିହାସ ସଫା କରନ୍ତୁ',
    liveNews: '📰 ସରାସରି ସମ୍ବାଦ',
    read: '🔗 ପଢ଼ନ୍ତୁ',
    analyzeBtn: '⚡ ଯାଞ୍ଚ',
    enterHeadline: 'ଫଳ ଦେଖିବା ପାଇଁ ଶୀର୍ଷ କିମ୍ବା URL ଦିଅନ୍ତୁ',
  },
  as: {
    title: 'AI-চালিত SATYAMEV AI',
    subtitle: 'বাতৰি পৰীক্ষা মঞ্চ',
    desc: 'তৎক্ষণাৎ বাতৰি, প্ৰবন্ধ আৰু URL পৰীক্ষা কৰক।',
    paste: 'শিৰোনাম বা পাঠ পেষ্ট কৰক',
    placeholder: 'যেনে. বিজ্ঞানীসকলে মঙলত পানী আৱিষ্কাৰ কৰিলে...',
    urlPlaceholder: 'https://article-url.com (ঐচ্ছিক)',
    analyze: 'পৰীক্ষা কৰক ⚡',
    scanning: '⏳ পৰীক্ষা হৈছে...',
    recentSearches: '🕐 শেহতীয়া সন্ধান',
    clearHistory: '🗑️ ইতিহাস মচক',
    liveNews: '📰 লাইভ বাতৰি',
    read: '🔗 পঢ়ক',
    analyzeBtn: '⚡ পৰীক্ষা',
    enterHeadline: 'ফলাফল চাবলৈ শিৰোনাম বা URL দিয়ক',
  },
  ur: {
    title: 'AI-کارفرما SATYAMEV AI',
    subtitle: 'خبر جانچ پلیٹ فارم',
    desc: 'فوری طور پر خبریں، مضامین اور URL جانچیں۔',
    paste: 'عنوان یا متن چسپاں کریں',
    placeholder: 'مثلاً. سائنسدانوں نے مریخ پر پانی دریافت کیا...',
    urlPlaceholder: 'https://article-url.com (اختیاری)',
    analyze: 'جانچیں ⚡',
    scanning: '⏳ جانچ ہو رہی ہے...',
    recentSearches: '🕐 حالیہ تلاش',
    clearHistory: '🗑️ تاریخ صاف کریں',
    liveNews: '📰 لائیو خبریں',
    read: '🔗 پڑھیں',
    analyzeBtn: '⚡ جانچیں',
    enterHeadline: 'نتیجہ دیکھنے کے لیے عنوان یا URL درج کریں',
  },
  fr: {
    title: 'SATYAMEV AI Alimenté par IA',
    subtitle: 'PLATEFORME DE DÉTECTION',
    desc: 'Analysez instantanément les titres, articles et URLs.',
    paste: 'Collez le titre ou le texte',
    placeholder: 'ex. Des scientifiques découvrent de l\'eau sur Mars...',
    urlPlaceholder: 'https://article-url.com (optionnel)',
    analyze: 'ANALYSER ⚡',
    scanning: '⏳ Analyse en cours...',
    recentSearches: '🕐 Recherches récentes',
    clearHistory: '🗑️ Effacer l\'historique',
    liveNews: '📰 Actualités en direct',
    read: '🔗 Lire',
    analyzeBtn: '⚡ Analyser',
    enterHeadline: 'Entrez un titre ou URL pour voir le résultat',
  },
  es: {
    title: 'SATYAMEV AI con IA',
    subtitle: 'PLATAFORMA DE DETECCIÓN',
    desc: 'Analiza al instante titulares, artículos y URLs.',
    paste: 'Pega el titular o texto',
    placeholder: 'ej. Científicos descubren agua en Marte...',
    urlPlaceholder: 'https://article-url.com (opcional)',
    analyze: 'ANALIZAR ⚡',
    scanning: '⏳ Analizando...',
    recentSearches: '🕐 Búsquedas recientes',
    clearHistory: '🗑️ Borrar historial',
    liveNews: '📰 Noticias en vivo',
    read: '🔗 Leer',
    analyzeBtn: '⚡ Analizar',
    enterHeadline: 'Ingresa un titular o URL para ver el resultado',
  },
  de: {
    title: 'KI-gestütztes SATYAMEV AI',
    subtitle: 'ERKENNUNGSPLATTFORM',
    desc: 'Analysieren Sie sofort Schlagzeilen, Artikel und URLs.',
    paste: 'Überschrift oder Text einfügen',
    placeholder: 'z.B. Wissenschaftler entdecken Wasser auf dem Mars...',
    urlPlaceholder: 'https://article-url.com (optional)',
    analyze: 'ANALYSIEREN ⚡',
    scanning: '⏳ Wird analysiert...',
    recentSearches: '🕐 Letzte Suchanfragen',
    clearHistory: '🗑️ Verlauf löschen',
    liveNews: '📰 Live-Nachrichten',
    read: '🔗 Lesen',
    analyzeBtn: '⚡ Analysieren',
    enterHeadline: 'Geben Sie eine Überschrift oder URL ein',
  },
};

export default function LanguageSwitcher({ currentLang, onLangChange }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(26,107,255,0.08)',
          border: '1px solid rgba(26,107,255,0.2)',
          borderRadius: '50px', padding: '7px 14px',
          fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          color: '#1a6bff', transition: 'all 0.2s'
        }}
      >
        <span>{current.flag}</span>
        <span>{current.name}</span>
        <span style={{ fontSize: '10px' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '44px', right: 0,
          background: 'white', borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          border: '1px solid #e2e8f8',
          zIndex: 999, width: '200px',
          maxHeight: '320px', overflowY: 'auto',
          padding: '8px'
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                onLangChange(lang.code);
                setOpen(false);
              }}
              style={{
                width: '100%', textAlign: 'left',
                padding: '10px 14px', borderRadius: '10px',
                border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                background: currentLang === lang.code
                  ? 'rgba(26,107,255,0.08)' : 'transparent',
                color: currentLang === lang.code ? '#1a6bff' : '#1a2340',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontSize: '18px' }}>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLang === lang.code && (
                <span style={{ marginLeft: 'auto', color: '#1a6bff' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}