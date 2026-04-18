'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Dono keys se data lo — purana aur naya
    const old = JSON.parse(localStorage.getItem('satyamev_history') || '[]');
    const newData = JSON.parse(localStorage.getItem('satyamev_history') || '[]');
    const merged = [...newData, ...old];
    setHistory(merged);
  }, []);

  function clearHistory() {
    localStorage.removeItem('satyamev_history');
    localStorage.removeItem('satyamev_history');
    setHistory([]);
  }

  function deleteOne(index) {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem('satyamev_history', JSON.stringify(updated));
  }

  const colors = {
    FAKE: '#ff3b5c', REAL: '#00c97a',
    MISLEADING: '#ffb800', UNVERIFIED: '#6b7a99',
    UNKNOWN: '#aab4cc'
  };

  const bgColors = {
    FAKE: 'rgba(255,59,92,0.1)', REAL: 'rgba(0,201,122,0.1)',
    MISLEADING: 'rgba(255,184,0,0.1)', UNVERIFIED: 'rgba(107,122,153,0.1)',
    UNKNOWN: 'rgba(170,180,204,0.1)'
  };

  // Filter + Search
  const filtered = history.filter(item => {
    const verdict = item.verdict || item.result || 'UNKNOWN';
    const matchFilter = filter === 'ALL' || verdict === filter;
    const matchSearch = (item.text || item.title || '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Stats
  const fakeCount = history.filter(h => (h.verdict || h.result) === 'FAKE').length;
  const realCount = history.filter(h => (h.verdict || h.result) === 'REAL').length;
  const misleadingCount = history.filter(h => (h.verdict || h.result) === 'MISLEADING').length;

  const textColor = darkMode ? '#ffffff' : '#0a1628';
  const subColor = darkMode ? '#aab4cc' : '#6b7a99';
  const cardBg = darkMode ? 'rgba(255,255,255,0.05)' : '#fff';
  const borderColor = darkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f8';
  const pageBg = darkMode ? '#0a0a1a' : '#f0f4ff';

  return (
    <main style={{ minHeight: '100vh', background: pageBg, transition: 'all 0.3s ease' }}>
      <Navbar />

      {/* Dark Mode Toggle */}
      <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 999 }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? '#FFD700' : '#1a1a2e',
            color: darkMode ? '#000' : '#fff',
            border: 'none', borderRadius: '50px',
            padding: '10px 18px', fontSize: '20px',
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'none', border: `1px solid ${borderColor}`,
                color: subColor, borderRadius: '50px',
                padding: '6px 16px', fontSize: '13px',
                cursor: 'pointer', marginBottom: '12px'
              }}
            >← Back to Home</button>
            <h1 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '42px', fontWeight: 900, color: textColor, margin: 0
            }}>
              Search <span style={{
                background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>History</span>
            </h1>
            <p style={{ color: subColor, marginTop: '4px' }}>
              Tumhare saare {history.length} purane searches
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              style={{
                background: 'rgba(255,59,92,0.1)', color: '#ff3b5c',
                border: '1px solid rgba(255,59,92,0.2)', borderRadius: '10px',
                padding: '10px 20px', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer'
              }}
            >🗑 Clear All</button>
          )}
        </div>

        {/* Stats Bar */}
        {history.length > 0 && (
          <div style={{
            display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px'
          }}>
            {[
              { label: 'Total', value: history.length, color: '#1a6bff', icon: '📊' },
              { label: 'Fake', value: fakeCount, color: '#ff3b5c', icon: '❌' },
              { label: 'Real', value: realCount, color: '#00c97a', icon: '✅' },
              { label: 'Misleading', value: misleadingCount, color: '#ffb800', icon: '⚠️' },
            ].map((s, i) => (
              <div key={i} style={{
                background: cardBg, border: `1px solid ${borderColor}`,
                borderRadius: '14px', padding: '16px 24px',
                textAlign: 'center', flex: 1, minWidth: '80px',
                borderTop: `3px solid ${s.color}`,
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '20px' }}>{s.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: subColor, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search + Filter */}
        {history.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Search history..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, minWidth: '200px',
                background: cardBg, border: `1.5px solid ${borderColor}`,
                borderRadius: '10px', padding: '10px 16px',
                fontSize: '14px', color: textColor, outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            {['ALL', 'FAKE', 'REAL', 'MISLEADING', 'UNVERIFIED'].map(f => (
              <button key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 16px', borderRadius: '10px',
                  border: `1.5px solid ${filter === f ? '#1a6bff' : borderColor}`,
                  background: filter === f ? 'rgba(26,107,255,0.1)' : cardBg,
                  color: filter === f ? '#1a6bff' : subColor,
                  cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                  transition: 'all 0.2s ease'
                }}
              >{f}</button>
            ))}
          </div>
        )}

        {/* History List */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px',
            background: cardBg, borderRadius: '16px',
            border: `1.5px solid ${borderColor}`
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ color: subColor, fontSize: '16px' }}>
              {history.length === 0 ? 'Abhi tak koi search nahi kiya!' : 'Koi result nahi mila!'}
            </p>
            {history.length === 0 && (
              <button
                onClick={() => router.push('/')}
                style={{
                  display: 'inline-block', marginTop: '16px',
                  background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  color: '#fff', padding: '12px 24px', borderRadius: '10px',
                  border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontSize: '14px'
                }}
              >Analyze Karo →</button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((item, i) => {
              const verdict = item.verdict || item.result || 'UNKNOWN';
              const displayText = item.text || item.title || 'No text';
              const displayDate = item.date || item.time || '';
              return (
                <div key={i} style={{
                  background: cardBg, borderRadius: '14px',
                  padding: '20px 24px', border: `1.5px solid ${borderColor}`,
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: '16px',
                  transition: 'all 0.2s ease',
                  borderLeft: `4px solid ${colors[verdict] || '#aab4cc'}`
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: textColor, marginBottom: '4px' }}>
                      {displayText.slice(0, 80)}{displayText.length > 80 ? '...' : ''}
                    </p>
                    {item.reason && (
                      <p style={{ fontSize: '12px', color: subColor }}>
                        {item.reason.slice(0, 80)}...
                      </p>
                    )}
                    <p style={{ fontSize: '11px', color: subColor, marginTop: '4px' }}>
                      🕐 {displayDate ? new Date(displayDate).toLocaleString('en-IN') : ''}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.score && (
                      <span style={{ fontWeight: 900, color: textColor, fontSize: '20px' }}>
                        {item.score}/100
                      </span>
                    )}
                    <span style={{
                      padding: '4px 14px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 700,
                      background: bgColors[verdict] || 'rgba(170,180,204,0.1)',
                      color: colors[verdict] || '#aab4cc'
                    }}>{verdict}</span>
                    <button
                      onClick={() => deleteOne(i)}
                      style={{
                        background: 'none', border: 'none',
                        cursor: 'pointer', fontSize: '16px', opacity: 0.5,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
                    >🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}