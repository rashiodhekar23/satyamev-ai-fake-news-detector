'use client';
import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { TRANSLATIONS } from './LanguageSwitcher';

const demoExamples = [
  { text: "Scientists discover water on Mars", verdict: "REAL", score: 92 },
  { text: "5G towers causing COVID-19", verdict: "FAKE", score: 4 },
  { text: "Government plans to tax WhatsApp", verdict: "MISLEADING", score: 28 },
  { text: "New diet pill burns fat overnight", verdict: "FAKE", score: 2 },
  { text: "India GDP grows 7.2% in Q3 2024", verdict: "REAL", score: 88 },
  { text: "Alien spaceship spotted over Delhi", verdict: "UNVERIFIED", score: 18 },
];

export default function Detector({ darkMode }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('satyamev_lang') || 'en';
    setLang(saved);

    const handleLang = (e) => setLang(e.detail);
    const handleNews = (e) => setText(e.detail.text);

    window.addEventListener('langChange', handleLang);
    window.addEventListener('analyzeNews', handleNews);
    return () => {
      window.removeEventListener('langChange', handleLang);
      window.removeEventListener('analyzeNews', handleNews);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  const textColor = darkMode ? '#ffffff' : '#1a2340';
  const subColor = darkMode ? '#aab4cc' : '#6b7a99';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#fff';
  const inputBg = darkMode ? 'rgba(255,255,255,0.08)' : '#f8faff';
  const borderColor = darkMode ? 'rgba(255,255,255,0.15)' : '#e2e8f8';

  async function analyze(inputText, inputUrl) {
    const tx = inputText || text;
    const u = inputUrl || url;
    if (!tx && !u) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: tx, url: u }),
      });
      const data = await res.json();
      setResult(data);

      const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const newEntry = {
        text: tx,
        result: (data.verdict || data.label || 'UNKNOWN').toUpperCase(),
        date: new Date().toISOString()
      };
      const updated = [newEntry, ...saved].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      localStorage.setItem('satyamev_history', JSON.stringify(updated));

      setShowSuccess(true);
      // Leaderboard update karo
const loggedUser = JSON.parse(localStorage.getItem('satyamev_loggedin') || 'null');
if (loggedUser) {
  fetch('/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: loggedUser.email,
      name: loggedUser.name,
      verdict: data.verdict
    })
  });
}
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      {/* Success Toast */}
      {showSuccess && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 9999,
          background: 'linear-gradient(135deg, #43B89C, #1a6bff)',
          color: 'white', padding: '12px 28px', borderRadius: '50px',
          fontSize: '14px', fontWeight: '700',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          animation: 'slideDown 0.3s ease'
        }}>
          ✅ Analysis Complete! Saved to history
        </div>
      )}

      {/* MAIN CARD */}
      <div style={{
        background: cardBg, border: `2px solid ${borderColor}`,
        borderRadius: '20px', padding: '32px',
        boxShadow: '0 8px 40px rgba(26,107,255,0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: subColor,
          marginBottom: '20px', textAlign: 'left'
        }}>
          {t.paste}
        </div>

        {/* TWO COLUMN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              background: inputBg, border: `1.5px solid ${borderColor}`,
              borderRadius: '12px', padding: '16px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: subColor, marginBottom: '8px'
              }}>
                {t.paste}
              </div>
              <textarea
                value={text}
                onChange={e => { setText(e.target.value); setCharCount(e.target.value.length); }}
                placeholder={t.placeholder}
                rows={4}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  outline: 'none', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px', color: textColor, lineHeight: 1.6, resize: 'none'
                }}
              />
              <div style={{ textAlign: 'right', fontSize: '11px', color: subColor, marginTop: '4px' }}>
                {charCount} characters
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="url" value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder={t.urlPlaceholder}
                style={{
                  flex: 1, background: inputBg,
                  border: `1.5px solid ${borderColor}`, borderRadius: '10px',
                  padding: '11px 14px', fontSize: '13px',
                  color: textColor, outline: 'none', fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
              />
              <button
                onClick={() => analyze()}
                disabled={loading || (!text && !url)}
                style={{
                  background: loading ? '#aab4cc' : 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '12px 20px', fontSize: '14px', fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(26,107,255,0.35)',
                  transition: 'all 0.3s ease',
                  transform: loading ? 'scale(0.97)' : 'scale(1)'
                }}
              >
                {loading ? t.scanning : t.analyze}
              </button>
            </div>

            {(text || url) && (
              <button
                onClick={() => { setText(''); setUrl(''); setResult(null); setCharCount(0); }}
                style={{
                  background: 'none', border: `1px solid ${borderColor}`,
                  color: subColor, borderRadius: '8px', padding: '8px',
                  cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s'
                }}
              >
                🗑️ Clear
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div style={{
            background: inputBg, border: `1.5px solid ${borderColor}`,
            borderRadius: '14px', padding: '20px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            minHeight: '180px', transition: 'all 0.3s ease'
          }}>
            {!result && !loading && (
              <div style={{ textAlign: 'center', color: subColor }}>
                <div style={{ fontSize: '48px', marginBottom: '10px', animation: 'float 3s ease-in-out infinite' }}>🔍</div>
                <p style={{ fontSize: '13px', lineHeight: 1.5 }}>{t.enterHeadline}</p>
              </div>
            )}
            {loading && (
              <div style={{ textAlign: 'center', color: subColor }}>
                <div style={{
                  width: '48px', height: '48px',
                  border: '4px solid rgba(26,107,255,0.2)',
                  borderTopColor: '#1a6bff', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 16px'
                }}/>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>🧠 AI Scanning sources...</p>
                <p style={{ fontSize: '11px', opacity: 0.7 }}>Checking credibility...</p>
              </div>
            )}
            {result && <NewsCard result={result} />}
          </div>
        </div>
      </div>

      {/* DEMO EXAMPLES */}
      <div style={{ marginTop: '32px', paddingBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{
            fontFamily: 'Rajdhani, sans-serif', fontSize: '18px',
            fontWeight: 700, color: textColor
          }}>
            ⚡ Demo Examples
          </span>
          <div style={{ flex: 1, height: '1px', background: borderColor }}/>
          <span style={{ fontSize: '12px', color: subColor }}>Click to test</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))',
          gap: '12px'
        }}>
          {demoExamples.map((ex, i) => {
            const colors = { FAKE:'#ff3b5c', REAL:'#00c97a', MISLEADING:'#ffb800', UNVERIFIED:'#6b7a99' };
            const bgs = { FAKE:'rgba(255,59,92,0.08)', REAL:'rgba(0,201,122,0.08)', MISLEADING:'rgba(255,184,0,0.08)', UNVERIFIED:'rgba(107,122,153,0.08)' };
            return (
              <div key={i}
                onClick={() => { setText(ex.text); analyze(ex.text, ''); }}
                style={{
                  background: cardBg, border: `1.5px solid ${borderColor}`,
                  borderRadius: '14px', padding: '16px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1a6bff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,107,255,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '13px', color: textColor, fontWeight: 500, lineHeight: 1.4 }}>
                  {ex.text}
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '3px 10px', borderRadius: '100px', fontSize: '11px',
                  fontWeight: 600, background: bgs[ex.verdict],
                  color: colors[ex.verdict], width: 'fit-content'
                }}>
                  {ex.verdict} · {ex.score}/100
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}