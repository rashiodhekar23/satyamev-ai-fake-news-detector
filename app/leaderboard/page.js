'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('points');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('satyamev_loggedin') || 'null');
    setCurrentUser(u);
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch('/api/leaderboard');
      const d = await res.json();
      setData(d.leaderboard || []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (tab === 'points') return b.points - a.points;
    if (tab === 'fake') return b.fake_detected - a.fake_detected;
    if (tab === 'total') return b.total_searches - a.total_searches;
    return 0;
  });

  const medals = ['🥇', '🥈', '🥉'];
  const tabList = [
    { id: 'points', label: '⭐ Points' },
    { id: 'fake', label: '❌ Fake Detected' },
    { id: 'total', label: '🔍 Total Searches' },
  ];

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🏆</div>
          <h1 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '40px', fontWeight: 900, color: 'var(--navy)', margin: 0
          }}>
            Leaderboard
          </h1>
          <p style={{ color: '#6b7a99', marginTop: '8px' }}>
            Top fake news detectors of SATYAMEV AI!
          </p>
        </div>

        {/* Points Info */}
        <div className="glass-card" style={{
          padding: '16px 24px', marginBottom: '24px',
          display: 'flex', gap: '24px', justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Fake Detected', points: '+10 pts', color: '#ff3b5c' },
            { label: 'Real News', points: '+5 pts', color: '#00c97a' },
            { label: 'Other', points: '+3 pts', color: '#ffb800' },
          ].map((p, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: p.color }}>
                {p.points}
              </span>
              <p style={{ fontSize: '11px', color: '#6b7a99', margin: '2px 0 0' }}>
                {p.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {tabList.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 18px', borderRadius: '50px',
                border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 600,
                background: tab === t.id
                  ? 'linear-gradient(135deg,#1a6bff,#7c3aed)'
                  : 'rgba(255,255,255,0.75)',
                color: tab === t.id ? 'white' : '#6b7a99',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="glass-card" style={{ padding: '8px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7a99' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '3px solid rgba(26,107,255,0.2)',
                borderTopColor: '#1a6bff', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 12px'
              }} />
              <p>Loading leaderboard...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7a99' }}>
              <p style={{ fontSize: '48px' }}>🏆</p>
              <p>No data yet !</p>
              <p style={{ fontSize: '13px' }}> Do news analysis and get on the leaderboard!</p>
            </div>
          ) : (
            sorted.map((user, i) => {
              const isCurrentUser = currentUser?.email === user.user_email;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '16px 20px', borderRadius: '12px',
                    margin: '4px 0',
                    background: isCurrentUser
                      ? 'rgba(26,107,255,0.08)'
                      : i === 0 ? 'rgba(255,184,0,0.08)'
                      : 'transparent',
                    border: isCurrentUser ? '1px solid rgba(26,107,255,0.2)' : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: '40px', textAlign: 'center',
                    fontSize: i < 3 ? '24px' : '16px',
                    fontWeight: 900,
                    color: i < 3 ? 'inherit' : '#6b7a99'
                  }}>
                    {i < 3 ? medals[i] : `#${i + 1}`}
                  </div>

                  {/* Avatar */}
                  <div style={{
                    width: '40px', height: '40px',
                    background: `linear-gradient(135deg, hsl(${i * 40}, 70%, 60%), hsl(${i * 40 + 60}, 70%, 50%))`,
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '16px', fontWeight: 700,
                    marginRight: '12px', marginLeft: '8px'
                  }}>
                    {user.user_name[0].toUpperCase()}
                  </div>

                  {/* Name & Stats */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#0a1628' }}>
                        {user.user_name}
                      </span>
                      {isCurrentUser && (
                        <span style={{
                          background: 'rgba(26,107,255,0.1)',
                          color: '#1a6bff', fontSize: '10px',
                          fontWeight: 700, padding: '2px 8px',
                          borderRadius: '50px'
                        }}>YOU</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#ff3b5c' }}>
                        ❌ {user.fake_detected} Fake
                      </span>
                      <span style={{ fontSize: '11px', color: '#00c97a' }}>
                        ✅ {user.real_detected} Real
                      </span>
                      <span style={{ fontSize: '11px', color: '#6b7a99' }}>
                        🔍 {user.total_searches} Total
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '24px', fontWeight: 900,
                      color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#1a6bff'
                    }}>
                      {tab === 'points' ? user.points
                        : tab === 'fake' ? user.fake_detected
                        : user.total_searches}
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7a99' }}>
                      {tab === 'points' ? 'pts' : tab === 'fake' ? 'fake' : 'searches'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchLeaderboard}
          style={{
            width: '100%', marginTop: '16px',
            padding: '12px', borderRadius: '12px',
            background: 'rgba(26,107,255,0.08)',
            border: '1px solid rgba(26,107,255,0.2)',
            color: '#1a6bff', fontWeight: 600,
            fontSize: '14px', cursor: 'pointer'
          }}
        >
          🔄 Refresh Leaderboard
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}