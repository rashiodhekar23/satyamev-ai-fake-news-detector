'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [searches, setSearches] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('satyamev_loggedin') || 'null');
    if (!u) { router.push('/login'); return; }
    setUser(u);
    setEditName(u.name || '');
    setEditEmail(u.email || '');

    const s = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setSearches(s);

    const b = JSON.parse(localStorage.getItem('satyamev_bookmarks') || '[]');
    setBookmarks(b);
  }, []);

  function saveProfile() {
    const updated = { ...user, name: editName, email: editEmail };
    localStorage.setItem('satyamev_loggedin', JSON.stringify(updated));
    setUser(updated);
    setEditMode(false);
    setMsg('Profile update ho gaya! ✅');
    setTimeout(() => setMsg(''), 3000);
  }

  function removeBookmark(i) {
    const updated = bookmarks.filter((_, idx) => idx !== i);
    setBookmarks(updated);
    localStorage.setItem('satyamev_bookmarks', JSON.stringify(updated));
  }

  function clearHistory() {
    setSearches([]);
    localStorage.removeItem('recentSearches');
  }

  if (!user) return null;

  // Stats
  const total = searches.length;
  const fake = searches.filter(s => s.result?.toUpperCase() === 'FAKE').length;
  const real = searches.filter(s => s.result?.toUpperCase() === 'REAL').length;
  const misleading = searches.filter(s => s.result?.toUpperCase() === 'MISLEADING').length;
  const accuracy = total > 0 ? Math.round((real / total) * 100) : 0;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'history', label: '🕐 History' },
    { id: 'bookmarks', label: '🔖 Bookmarks' },
    { id: 'profile', label: '👤 Profile' },
  ];

  const statCards = [
    { label: 'Total Searches', value: total, icon: '🔍', color: '#1a6bff' },
    { label: 'Fake Detected', value: fake, icon: '❌', color: '#ff3b5c' },
    { label: 'Real News', value: real, icon: '✅', color: '#00c97a' },
    { label: 'Misleading', value: misleading, icon: '⚠️', color: '#ffb800' },
    { label: 'Bookmarks', value: bookmarks.length, icon: '🔖', color: '#7c3aed' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: '🎯', color: '#43B89C' },
  ];

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div className="glass-card animate-fadeInUp" style={{
          padding: '32px', marginBottom: '28px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px', height: '64px',
              background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
              borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '28px', fontWeight: 800,
              boxShadow: '0 8px 24px rgba(26,107,255,0.35)'
            }}>
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h1 style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '28px', fontWeight: 900, color: 'var(--navy)', margin: 0
              }}>
                Welcome, {user.name || 'User'}! 👋
              </h1>
              <p style={{ color: '#6b7a99', fontSize: '14px', margin: '4px 0 0' }}>
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
              color: 'white', border: 'none', borderRadius: '50px',
              padding: '10px 24px', fontSize: '14px', fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ⚡ Analyze News
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px', borderRadius: '50px',
                border: 'none', cursor: 'pointer', fontWeight: 600,
                fontSize: '13px', transition: 'all 0.2s',
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg,#1a6bff,#7c3aed)'
                  : 'rgba(255,255,255,0.75)',
                color: activeTab === tab.id ? 'white' : '#6b7a99',
                boxShadow: activeTab === tab.id
                  ? '0 4px 16px rgba(26,107,255,0.3)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === 'overview' && (
          <div className="animate-fadeInUp">

            {/* Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))',
              gap: '16px', marginBottom: '28px'
            }}>
              {statCards.map((s, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '32px', fontWeight: 900, color: s.color
                  }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#6b7a99', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart — Bar */}
            <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '18px', fontWeight: 700, color: 'var(--navy)', marginBottom: '20px'
              }}>
                📊 Analysis Breakdown
              </h3>
              {total === 0 ? (
                <p style={{ color: '#6b7a99', textAlign: 'center', padding: '20px' }}>
                  Koi analysis nahi hui abhi — pehle kuch news analyze karo!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Fake News', value: fake, color: '#ff3b5c', bg: 'rgba(255,59,92,0.1)' },
                    { label: 'Real News', value: real, color: '#00c97a', bg: 'rgba(0,201,122,0.1)' },
                    { label: 'Misleading', value: misleading, color: '#ffb800', bg: 'rgba(255,184,0,0.1)' },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a2340' }}>
                          {bar.label}
                        </span>
                        <span style={{ fontSize: '13px', color: bar.color, fontWeight: 700 }}>
                          {bar.value}/{total}
                        </span>
                      </div>
                      <div style={{
                        height: '10px', background: bar.bg,
                        borderRadius: '10px', overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%', borderRadius: '10px',
                          background: bar.color,
                          width: total > 0 ? `${(bar.value / total) * 100}%` : '0%',
                          transition: 'width 1s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent 3 searches */}
            {searches.length > 0 && (
              <div className="glass-card" style={{ padding: '28px' }}>
                <h3 style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '18px', fontWeight: 700,
                  color: 'var(--navy)', marginBottom: '16px'
                }}>
                  🕐 Recent Activity
                </h3>
                {searches.slice(0, 3).map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '12px 0',
                    borderBottom: i < 2 ? '1px solid #e2e8f8' : 'none'
                  }}>
                    <p style={{ color: '#1a2340', fontSize: '13px', fontWeight: 500, margin: 0, flex: 1, marginRight: '12px' }}>
                      {s.text?.slice(0, 60)}...
                    </p>
                    <span style={{
                      background: s.result === 'FAKE'
                        ? 'linear-gradient(135deg,#ff3b5c,#ff6584)'
                        : s.result === 'REAL'
                        ? 'linear-gradient(135deg,#00c97a,#43B89C)'
                        : 'linear-gradient(135deg,#ffb800,#FF9F43)',
                      color: 'white', borderRadius: '50px',
                      padding: '4px 12px', fontSize: '11px', fontWeight: 800,
                      whiteSpace: 'nowrap'
                    }}>
                      {s.result}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== HISTORY TAB ===== */}
        {activeTab === 'history' && (
          <div className="animate-fadeInUp">
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '20px'
              }}>
                <h3 style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '20px', fontWeight: 700, color: 'var(--navy)', margin: 0
                }}>
                  🕐 Full Analysis History
                </h3>
                {searches.length > 0 && (
                  <button
                    onClick={clearHistory}
                    style={{
                      background: 'rgba(255,59,92,0.1)', color: '#ff3b5c',
                      border: 'none', borderRadius: '50px',
                      padding: '8px 16px', fontSize: '12px',
                      fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    🗑️ Clear All
                  </button>
                )}
              </div>

              {searches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7a99' }}>
                  <p style={{ fontSize: '48px' }}>📭</p>
                  <p>Koi history nahi hai abhi!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {searches.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', padding: '16px',
                      background: 'rgba(26,107,255,0.03)',
                      borderRadius: '12px', border: '1px solid #e2e8f8'
                    }}>
                      <div style={{ flex: 1, marginRight: '12px' }}>
                        <p style={{ color: '#1a2340', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                          {s.text?.slice(0, 80)}...
                        </p>
                        <p style={{ color: '#6b7a99', fontSize: '11px', margin: '4px 0 0' }}>
                          {new Date(s.date).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <span style={{
                        background: s.result === 'FAKE'
                          ? 'linear-gradient(135deg,#ff3b5c,#ff6584)'
                          : s.result === 'REAL'
                          ? 'linear-gradient(135deg,#00c97a,#43B89C)'
                          : 'linear-gradient(135deg,#ffb800,#FF9F43)',
                        color: 'white', borderRadius: '50px',
                        padding: '6px 16px', fontSize: '12px',
                        fontWeight: 800, whiteSpace: 'nowrap'
                      }}>
                        {s.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== BOOKMARKS TAB ===== */}
        {activeTab === 'bookmarks' && (
          <div className="animate-fadeInUp">
            <div className="glass-card" style={{ padding: '28px' }}>
              <h3 style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--navy)', marginBottom: '20px'
              }}>
                🔖 Saved Bookmarks
              </h3>
              {bookmarks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7a99' }}>
                  <p style={{ fontSize: '48px' }}>🔖</p>
                  <p>Koi bookmark nahi hai!</p>
                  <p style={{ fontSize: '13px' }}>News analyze karne ke baad bookmark kar sakte ho</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {bookmarks.map((b, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', padding: '16px',
                      background: 'rgba(124,58,237,0.04)',
                      borderRadius: '12px', border: '1px solid #e2e8f8'
                    }}>
                      <div style={{ flex: 1, marginRight: '12px' }}>
                        <p style={{ color: '#1a2340', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                          {b.text?.slice(0, 80)}...
                        </p>
                        <p style={{ color: '#6b7a99', fontSize: '11px', margin: '4px 0 0' }}>
                          {new Date(b.date).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{
                          background: b.result === 'FAKE'
                            ? 'linear-gradient(135deg,#ff3b5c,#ff6584)'
                            : b.result === 'REAL'
                            ? 'linear-gradient(135deg,#00c97a,#43B89C)'
                            : 'linear-gradient(135deg,#ffb800,#FF9F43)',
                          color: 'white', borderRadius: '50px',
                          padding: '4px 12px', fontSize: '11px', fontWeight: 800
                        }}>
                          {b.result}
                        </span>
                        <button
                          onClick={() => removeBookmark(i)}
                          style={{
                            background: 'rgba(255,59,92,0.1)',
                            border: 'none', borderRadius: '8px',
                            padding: '6px 10px', cursor: 'pointer',
                            color: '#ff3b5c', fontSize: '14px'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PROFILE TAB ===== */}
        {activeTab === 'profile' && (
          <div className="animate-fadeInUp">
            <div className="glass-card" style={{ padding: '32px', maxWidth: '480px' }}>
              <h3 style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--navy)', marginBottom: '24px'
              }}>
                👤 Edit Profile
              </h3>

              {msg && (
                <div style={{
                  padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
                  background: 'rgba(0,201,122,0.1)', color: '#00a864',
                  fontSize: '13px', fontWeight: 600
                }}>
                  {msg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7a99', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    FULL NAME
                  </label>
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    disabled={!editMode}
                    style={{
                      width: '100%', padding: '12px 16px',
                      borderRadius: '12px', border: '1.5px solid #e2e8f8',
                      fontSize: '14px', outline: 'none',
                      background: editMode ? '#f8faff' : '#f4f4f8',
                      color: editMode ? '#1a2340' : '#6b7a99',
                      transition: 'all 0.2s'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7a99', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    disabled={!editMode}
                    style={{
                      width: '100%', padding: '12px 16px',
                      borderRadius: '12px', border: '1.5px solid #e2e8f8',
                      fontSize: '14px', outline: 'none',
                      background: editMode ? '#f8faff' : '#f4f4f8',
                      color: editMode ? '#1a2340' : '#6b7a99',
                      transition: 'all 0.2s'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      style={{
                        flex: 1, padding: '12px',
                        background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                        color: 'white', border: 'none',
                        borderRadius: '12px', fontSize: '14px',
                        fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      ✏️ Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={saveProfile}
                        style={{
                          flex: 1, padding: '12px',
                          background: 'linear-gradient(135deg,#00c97a,#43B89C)',
                          color: 'white', border: 'none',
                          borderRadius: '12px', fontSize: '14px',
                          fontWeight: 700, cursor: 'pointer'
                        }}
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={() => { setEditMode(false); setEditName(user.name); setEditEmail(user.email); }}
                        style={{
                          flex: 1, padding: '12px',
                          background: '#f0f4ff', color: '#6b7a99',
                          border: '1px solid #e2e8f8',
                          borderRadius: '12px', fontSize: '14px',
                          fontWeight: 700, cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Summary */}
              <div style={{
                marginTop: '28px', padding: '20px',
                background: 'rgba(26,107,255,0.05)',
                borderRadius: '16px', border: '1px solid rgba(26,107,255,0.1)'
              }}>
                <p style={{ fontSize: '12px', color: '#6b7a99', fontWeight: 600, marginBottom: '12px' }}>
                  YOUR STATS
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Searches', value: total, color: '#1a6bff' },
                    { label: 'Fake', value: fake, color: '#ff3b5c' },
                    { label: 'Real', value: real, color: '#00c97a' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: s.color, fontFamily: 'Rajdhani, sans-serif' }}>
                        {s.value}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6b7a99' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}