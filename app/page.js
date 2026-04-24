'use client';

import Navbar from '@/components/Navbar';
import RSSNews from '@/components/RSSNews';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect, useRef } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export default function Home() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);

  const headlines = [
    'Alien spaceship spotted over Mumbai...',
    'Scientists discover water on Mars...',
    '5G towers causing health issues...',
    'Government plans free electricity...',
    'New vaccine cures all diseases...',
  ];
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    let i = 0;
    let current = headlines[headlineIndex];
    let typing = true;
    setTypedText('');

    const interval = setInterval(() => {
      if (typing) {
        if (i <= current.length) {
          setTypedText(current.slice(0, i));
          i++;
        } else {
          typing = false;
          setTimeout(() => {
            typing = false;
            let j = current.length;
            const erase = setInterval(() => {
              if (j >= 0) {
                setTypedText(current.slice(0, j));
                j--;
              } else {
                clearInterval(erase);
                setHeadlineIndex(prev => (prev + 1) % headlines.length);
              }
            }, 30);
          }, 2000);
          clearInterval(interval);
        }
      }
    }, 60);

    return () => clearInterval(interval);
  }, [headlineIndex]);

  // Cursor blink
  useEffect(() => {
    const c = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(c);
  }, []);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
    setLoggedIn(!!localStorage.getItem('satyamev_loggedin'));
    const handler = (e) => setText(e.detail?.text || '');
    window.addEventListener('analyzeNews', handler);
    return () => window.removeEventListener('analyzeNews', handler);
  }, []);

  async function handleAnalyze() {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
      const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const updated = [{ text, result: (data.verdict || 'UNKNOWN').toUpperCase(), date: new Date().toISOString() }, ...saved].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      setRecentSearches(updated);
      const u = JSON.parse(localStorage.getItem('satyamev_loggedin') || 'null');
      if (u) fetch('/api/leaderboard', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: u.email, name: u.name, verdict: data.verdict }) });
    } catch (err) { console.error(err); }
    finally { setAnalyzing(false); }
  }

  const verdictColors = { FAKE: '#ff3b5c', REAL: '#00c97a', MISLEADING: '#ffb800', UNVERIFIED: '#6b7a99' };
  const verdictBg = { FAKE: 'rgba(255,59,92,0.1)', REAL: 'rgba(0,201,122,0.1)', MISLEADING: 'rgba(255,184,0,0.1)', UNVERIFIED: 'rgba(107,122,153,0.1)' };
  const verdictEmoji = { FAKE: '❌', REAL: '✅', MISLEADING: '⚠️', UNVERIFIED: '❓' };

  return (
    <main style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(40px,8vw,80px) 16px',
        textAlign: 'center', position: 'relative'
      }}>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${4 + (i % 4) * 3}px`,
            height: `${4 + (i % 4) * 3}px`,
            background: ['#1a6bff','#7c3aed','#ff6584','#00c97a','#ffb800'][i % 5],
            borderRadius: '50%',
            top: `${5 + (i * 8)}%`,
            left: `${3 + (i * 8)}%`,
            opacity: 0.3,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`
          }}/>
        ))}

        {/* LIVE Badge */}
        <div className="animate-fadeInUp" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,59,92,0.1)',
          border: '1px solid rgba(255,59,92,0.3)',
          borderRadius: '100px', padding: '8px 20px',
          fontSize: '12px', fontWeight: 800,
          letterSpacing: '0.12em', marginBottom: '24px',
          color: '#ff3b5c',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <span style={{ width: '8px', height: '8px', background: '#ff3b5c', borderRadius: '50%', animation: 'blink 1s infinite' }}/>
          🇮🇳 INDIA'S #1 FAKE NEWS DETECTOR
        </div>

        {/* MAIN TITLE */}
        <h1 className="animate-fadeInUp" style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: 'clamp(48px, 10vw, 100px)',
          fontWeight: 900, lineHeight: 0.95,
          margin: '0 0 8px', letterSpacing: '-2px'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #1a6bff 0%, #7c3aed 30%, #ff6584 60%, #ffb800 80%, #00c97a 100%)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s linear infinite',
            display: 'block'
          }}>
            SATYAMEV AI
          </span>
          <span style={{
            color: 'var(--navy)',
            display: 'block',
            fontSize: 'clamp(32px, 7vw, 72px)',
            letterSpacing: '8px',
            opacity: 0.9
          }}>
            
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fadeInUp" style={{
          fontSize: 'clamp(14px, 3vw, 20px)',
          color: 'var(--muted)', margin: '0 0 40px',
          letterSpacing: '0.15em', fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          ⚡ Satya ki khoj main — AI se karo sach ki pehchaan!
        </p>

        {/* Search Box */}
        <div className="animate-fadeInUp" style={{
          width: '100%', maxWidth: '680px',
          marginBottom: '16px'
        }}>
          {/* Typing placeholder above */}
          <div style={{
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            color: 'var(--muted)', marginBottom: '12px',
            fontStyle: 'italic', minHeight: '20px'
          }}>
            e.g. "{typedText}<span style={{ opacity: showCursor ? 1 : 0 }}>|</span>"
          </div>

          <div style={{
            display: 'flex', gap: '0',
            background: 'var(--card-bg)',
            backdropFilter: 'blur(30px)',
            borderRadius: '20px',
            border: '2px solid rgba(26,107,255,0.2)',
            boxShadow: '0 8px 40px rgba(26,107,255,0.15)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <textarea
              ref={inputRef}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAnalyze())}
              placeholder=" Paste any headline, article, or URL here..."
              rows={3}
              style={{
                flex: 1, padding: '20px',
                border: 'none', outline: 'none',
                fontSize: 'clamp(14px, 3vw, 16px)',
                color: 'var(--text)',
                background: 'transparent',
                fontFamily: 'inherit',
                resize: 'none', lineHeight: 1.6
              }}
            />
            <div style={{
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', padding: '12px'
            }}>
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !text.trim()}
                style={{
                  background: analyzing ? '#aab4cc' : 'linear-gradient(135deg, #1a6bff, #7c3aed)',
                  color: 'white', border: 'none',
                  borderRadius: '14px',
                  padding: 'clamp(10px,2vw,14px) clamp(16px,3vw,24px)',
                  fontSize: 'clamp(13px,2.5vw,15px)', fontWeight: 800,
                  cursor: analyzing ? 'not-allowed' : 'pointer',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.05em',
                  boxShadow: analyzing ? 'none' : '0 4px 20px rgba(26,107,255,0.4)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {analyzing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white', borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                      display: 'inline-block'
                    }}/>
                    Scanning...
                  </span>
                ) : '⚡ ANALYZE'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex', gap: '10px', marginTop: '12px',
            flexWrap: 'wrap'
          }}>
            <a href={loggedIn ? '/dashboard' : '/login'} style={{
              flex: 1, minWidth: '140px',
              padding: '12px',
              background: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              color: '#1a6bff',
              border: '2px solid rgba(26,107,255,0.2)',
              borderRadius: '14px', fontSize: 'clamp(12px,2.5vw,14px)',
              fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              textDecoration: 'none', textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              {loggedIn ? '📊 Dashboard' : '👤 Login / Sign Up'}
            </a>
            <a href="/leaderboard" style={{
              flex: 1, minWidth: '140px',
              padding: '12px',
              background: 'linear-gradient(135deg, rgba(255,184,0,0.15), rgba(255,107,26,0.15))',
              color: '#FF9F43',
              border: '2px solid rgba(255,184,0,0.3)',
              borderRadius: '14px', fontSize: 'clamp(12px,2.5vw,14px)',
              fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              textDecoration: 'none', textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              🏆 Leaderboard
            </a>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="animate-fadeInUp" style={{
            width: '100%', maxWidth: '680px',
            padding: 'clamp(16px,3vw,24px)',
            borderRadius: '20px',
            background: verdictBg[result.verdict] || 'rgba(107,122,153,0.1)',
            border: `2px solid ${verdictColors[result.verdict] || '#6b7a99'}44`,
            textAlign: 'left', marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px'
            }}>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 'clamp(20px,4vw,28px)', fontWeight: 900,
                color: verdictColors[result.verdict]
              }}>
                {verdictEmoji[result.verdict]} {result.verdict}
              </span>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 'clamp(24px,5vw,36px)', fontWeight: 900,
                color: verdictColors[result.verdict]
              }}>
                {result.score}<small style={{ fontSize: '14px', opacity: 0.7 }}>/100</small>
              </span>
            </div>
            <div style={{
              height: '8px', background: 'rgba(0,0,0,0.1)',
              borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'
            }}>
              <div style={{
                height: '100%', borderRadius: '8px',
                width: `${result.score}%`,
                background: `linear-gradient(135deg, ${verdictColors[result.verdict]}, ${verdictColors[result.verdict]}99)`,
                transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: `0 0 12px ${verdictColors[result.verdict]}66`
              }}/>
            </div>
            <p style={{
              fontSize: 'clamp(12px,2.5vw,14px)',
              color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 16px'
            }}>
              {result.reason}
            </p>

            {/* Share Buttons */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '14px' }}>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.08em' }}>
                SHARE RESULT
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                {[
                  { label: '💬 WhatsApp', bg: '#25D366', onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`🔍 SATYAMEV AI\n\n📰 ${text}\n\nVerdict: ${result.verdict}\n📊 Score: ${result.score}/100\n\n${result.reason}`)}`, '_blank') },
                  { label: '🐦 Twitter', bg: '#1DA1F2', onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text.slice(0,80)}" is ${result.verdict} (${result.score}/100) - SATYAMEV AI #FakeNews`)}`, '_blank') },
                  { label: '📸 Share', bg: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)', onClick: async () => { const msg = `🔍 SATYAMEV AI\n\n📰 ${text}\n\nVerdict: ${result.verdict}\n📊 Score: ${result.score}/100`; if(navigator.share) { try { await navigator.share({ title:'SATYAMEV AI', text:msg }); } catch{} } else { try { await navigator.clipboard.writeText(msg); } catch { const el=document.createElement('textarea'); el.value=msg; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); } alert('✅ Copied!'); } } },
                  { label: '📋 Copy', bg: 'var(--card-bg)', color: '#1a6bff', border: '2px solid rgba(26,107,255,0.2)', onClick: async () => { const msg = `🔍 SATYAMEV AI\n\n📰 ${text}\n\nVerdict: ${result.verdict}\n📊 Score: ${result.score}/100\n\n${result.reason}`; try { await navigator.clipboard.writeText(msg); } catch { const el=document.createElement('textarea'); el.value=msg; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); } alert('✅ Copied!'); } },
                  { label: '📄 PDF', bg: 'linear-gradient(135deg,#ff6b35,#ff3b5c)', onClick: () => { const w=window.open('','_blank'); w.document.write(`<html><head><style>body{font-family:Arial,sans-serif;padding:40px}.header{background:linear-gradient(135deg,#1a6bff,#7c3aed);color:white;padding:20px;border-radius:12px;text-align:center;margin-bottom:24px}.verdict{font-size:32px;font-weight:900;color:${verdictColors[result.verdict]}}.bar-bg{height:12px;background:#f0f0f0;border-radius:8px;margin:12px 0}.bar{height:12px;background:${verdictColors[result.verdict]};border-radius:8px;width:${result.score}%}.reason{border-left:4px solid ${verdictColors[result.verdict]};padding:16px;color:#555;margin:16px 0}.footer{margin-top:40px;text-align:center;color:#999;font-size:12px}</style></head><body><div class="header"><h1>🔍 SATYAMEV AI Report</h1></div><h2>${text}</h2><div class="verdict">${verdictEmoji[result.verdict]} ${result.verdict} — ${result.score}/100</div><div class="bar-bg"><div class="bar"></div></div><div class="reason">${result.reason}</div><div class="footer">Generated: ${new Date().toLocaleString('en-IN')} | SATYAMEV AI</div></body></html>`); w.document.close(); w.print(); } },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.onClick} style={{
                    padding: '10px 8px',
                    background: btn.bg, color: btn.color || 'white',
                    border: btn.border || 'none',
                    borderRadius: '10px', fontSize: 'clamp(10px,2vw,12px)',
                    fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>{btn.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px,2vw,16px)',
          maxWidth: '680px', width: '100%',
          marginBottom: '20px'
        }}>
          {[
            { num: '12,400+', label: 'ANALYZED', icon: '📰', color: '#1a6bff' },
            { num: '94%', label: 'ACCURACY', icon: '🎯', color: '#00c97a' },
            { num: '3 sec', label: 'RESPONSE', icon: '⚡', color: '#ffb800' },
            { num: 'FREE', label: 'FOREVER', icon: '🎁', color: '#ff6584' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{
              padding: 'clamp(14px,3vw,20px)',
              textAlign: 'center',
              animation: `fadeInUp 0.6s ease ${0.1 * i}s both`
            }}>
              <div style={{ fontSize: 'clamp(20px,4vw,28px)', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 'clamp(24px,5vw,32px)', fontWeight: 900, color: s.color,
                lineHeight: 1
              }}>{s.num}</div>
              <div style={{ fontSize: 'clamp(9px,1.8vw,11px)', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '8px',
          color: 'var(--muted)', fontSize: '12px', fontWeight: 600,
          animation: 'float 2s ease-in-out infinite'
        }}>
          <span>Scroll for Live News</span>
          <span style={{ fontSize: '20px' }}>↓</span>
        </div>
      </section>

      {/* ===== RECENT SEARCHES ===== */}
      {mounted && recentSearches.length > 0 && (
        <section style={{ maxWidth: '680px', margin: '0 auto 40px', padding: '0 16px' }}>
          <div className="glass-card" style={{ padding: 'clamp(16px,3vw,24px)' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '16px'
            }}>
              <h2 style={{
                fontFamily: 'Rajdhani, sans-serif',
                color: 'var(--navy)', fontSize: 'clamp(16px,3.5vw,20px)',
                fontWeight: 700, margin: 0
              }}>🕐 Recent Searches</h2>
              <button
                onClick={() => { localStorage.removeItem('recentSearches'); setRecentSearches([]); }}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '12px' }}
              >🗑️ Clear</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentSearches.slice(0, 5).map((s, i) => (
                <div key={i} onClick={() => setText(s.text)} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: 'clamp(10px,2vw,12px) 14px',
                  background: 'rgba(26,107,255,0.04)',
                  borderRadius: '12px', cursor: 'pointer', gap: '8px',
                  transition: 'all 0.2s ease'
                }}>
                  <p style={{
                    color: 'var(--text)', margin: 0, fontWeight: 600,
                    fontSize: 'clamp(11px,2.5vw,13px)', flex: 1,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {s.text?.slice(0, 55)}...
                  </p>
                  <span style={{
                    background: s.result === 'FAKE' ? '#ff3b5c'
                      : s.result === 'REAL' ? '#00c97a' : '#ffb800',
                    color: 'white', borderRadius: '50px',
                    padding: '3px 10px', fontSize: '10px',
                    fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0
                  }}>{s.result}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== LIVE NEWS ===== */}
      <section style={{ padding: '0 0 40px' }}>
        <RSSNews />
      </section>  
       
       
     
      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        @keyframes gradient {
          0%{background-position:0% center}
          100%{background-position:300% center}
        }
        @keyframes blink {
          0%,100%{opacity:1} 50%{opacity:0.2}
        }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeInUp {
          from{opacity:0;transform:translateY(20px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(255,59,92,0.3)}
          50%{box-shadow:0 0 0 8px rgba(255,59,92,0)}
        }
        textarea::placeholder { color: var(--muted); }
        input::placeholder { color: var(--muted); }
        @media(max-width:480px) {
          .share-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </main>
  );
}