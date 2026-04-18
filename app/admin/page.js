'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Satyamev@2025#AI';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Password check on load
  useEffect(() => {
    const ok = sessionStorage.getItem('admin_auth');
    if (ok === 'yes') {
      setAuth(true);
    } else {
      setLoading(false);
    }
  }, []);

  function handleLogin() {
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'yes');
      setAuth(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  useEffect(() => {
    if (!auth) return;
    fetchMessages();
  }, [auth]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id) {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // ===== PASSWORD SCREEN =====
  if (!auth) {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '24px', padding: '48px 40px',
          width: '100%', maxWidth: '400px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(26,107,255,0.12)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '28px', fontWeight: 700,
            color: 'var(--navy)', marginBottom: '8px'
          }}>Admin Access</h2>
          <p style={{
            color: 'var(--muted)', fontSize: '14px',
            marginBottom: '28px'
          }}>
            Enter password to continue
          </p>

          <input
            type="password"
            placeholder="Enter password"
            value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: '12px', fontSize: '15px',
              border: `1px solid ${pwError ? 'var(--red)' : 'var(--border)'}`,
              background: 'var(--card-bg)',
              color: 'var(--text)',
              marginBottom: '12px', outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />

          {pwError && (
            <p style={{
              color: 'var(--red)', fontSize: '13px',
              marginBottom: '12px'
            }}>
              ❌ Wrong password. Try again.
            </p>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
              color: '#fff', border: 'none', borderRadius: '12px',
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              boxShadow: '0 4px 20px rgba(26,107,255,0.35)',
              transition: 'all 0.3s ease'
            }}
          >
            Login →
          </button>
        </div>
      </main>
    );
  }

  // ===== ADMIN PANEL =====
  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '32px auto', padding: '0 20px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <h1 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '32px', fontWeight: 700,
            color: 'var(--navy)'
          }}>
            📊 Admin Panel
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={fetchMessages} style={{
              background: 'var(--card-bg)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '10px', padding: '8px 16px',
              cursor: 'pointer', fontSize: '13px',
              fontWeight: 600
            }}>
              🔄 Refresh
            </button>
            <button onClick={() => {
              sessionStorage.removeItem('admin_auth');
              setAuth(false);
              setPwInput('');
            }} style={{
              background: 'rgba(255,59,92,0.1)',
              color: 'var(--red)', border: 'none',
              borderRadius: '10px', padding: '8px 16px',
              cursor: 'pointer', fontSize: '13px', fontWeight: 600
            }}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px', padding: '20px 28px',
          marginBottom: '24px',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <span style={{ fontSize: '28px' }}>📨</span>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
              Total Messages
            </p>
            <p style={{
              color: 'var(--blue)', fontSize: '28px',
              fontWeight: 700, margin: 0,
              fontFamily: 'Rajdhani, sans-serif'
            }}>
              {messages.length}
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{
              width: '40px', height: '40px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--blue)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px'
            }} />
            <p style={{ color: 'var(--muted)' }}>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px',
            background: 'var(--card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--card-border)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
              No messages yet
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              background: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid var(--card-border)'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  color: '#fff'
                }}>
                  <th style={th}>#</th>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Message</th>
                  <th style={th}>Date</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id} style={{
                    borderBottom: '1px solid var(--border)',
                    background: i % 2 === 0
                      ? 'transparent'
                      : 'rgba(26,107,255,0.02)',
                    transition: 'background 0.2s ease'
                  }}>
                    <td style={{ ...td, color: 'var(--muted)', fontSize: '12px' }}>
                      {i + 1}
                    </td>
                    <td style={{ ...td, color: 'var(--text)', fontWeight: 600 }}>
                      {m.name}
                    </td>
                    <td style={{ ...td, color: 'var(--blue)' }}>
                      {m.email}
                    </td>
                    <td style={{
                      ...td, color: 'var(--muted)',
                      maxWidth: '280px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {m.message}
                    </td>
                    <td style={{ ...td, color: 'var(--muted)', fontSize: '12px' }}>
                      {new Date(m.created_at).toLocaleString('en-IN')}
                    </td>
                    <td style={td}>
                      <button
                        onClick={() => deleteMessage(m.id)}
                        style={{
                          background: 'rgba(255,59,92,0.12)',
                          color: 'var(--red)', border: 'none',
                          padding: '6px 14px', borderRadius: '8px',
                          cursor: 'pointer', fontWeight: 600,
                          fontSize: '13px', transition: 'all 0.2s ease'
                        }}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        tr:hover {
          background: rgba(26,107,255,0.04) !important;
        }
      `}</style>
    </main>
  );
}

const th = {
  padding: '12px 16px',
  textAlign: 'left',
  fontFamily: 'Rajdhani, sans-serif',
  fontSize: '14px',
  letterSpacing: '0.05em',
  fontWeight: 600
};

const td = {
  padding: '12px 16px',
  fontSize: '14px'
};
