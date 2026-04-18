'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) { setMsg('Email required! ❌'); return; }

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'forgot', email })
      });
      const data = await res.json();

      if (data.error) {
        setMsg(data.error + ' ❌');
      } else {
        setSent(true);
        setMsg(data.message);
      }
    } catch {
      setMsg('Server error! Try again ❌');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div className="glass-card animate-fadeInUp" style={{
        padding: '40px', width: '100%', maxWidth: '420px'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
            borderRadius: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', color: '#fff',
            fontFamily: 'Rajdhani', fontWeight: 800, fontSize: '24px',
            boxShadow: '0 8px 24px rgba(26,107,255,0.35)'
          }}>S</div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '28px', fontWeight: 700, color: 'var(--navy)'
          }}>
            Forgot Password 🔑
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
            Email will be sent to reset your password. <br/>
          </p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>📧</div>
            <h3 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '22px', fontWeight: 800,
              color: '#00c97a', marginBottom: '12px'
            }}>
              Email Sent!
            </h3>
            <p style={{
              color: 'var(--muted)', fontSize: '14px',
              lineHeight: 1.7, marginBottom: '24px'
            }}>
              <strong>{email}</strong> password reset link has been sent!<br/>
              Please check your email and click on the link.
            </p>
            <div style={{
              padding: '12px 16px', borderRadius: '12px',
              background: 'rgba(0,201,122,0.1)',
              border: '1px solid rgba(0,201,122,0.2)',
              fontSize: '13px', color: '#00c97a',
              fontWeight: 600, marginBottom: '20px'
            }}>
              ✅ Check your spam folder!
            </div>
            <button
              onClick={() => router.push('/login')}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif'
              }}
            >
              ← Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <div>
              <label style={{
                fontSize: '11px', color: 'var(--muted)', fontWeight: 700,
                display: 'block', marginBottom: '6px', letterSpacing: '0.06em'
              }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '13px 16px',
                  borderRadius: '12px', border: '1.5px solid var(--border)',
                  fontSize: '14px', outline: 'none',
                  fontFamily: 'inherit', background: 'var(--input-bg)',
                  color: 'var(--text)', boxSizing: 'border-box'
                }}
              />
            </div>

            {msg && (
              <div style={{
                padding: '12px 16px', borderRadius: '10px',
                background: msg.includes('❌') ? 'rgba(255,59,92,0.1)' : 'rgba(0,201,122,0.1)',
                color: msg.includes('❌') ? '#ff3b5c' : '#00c97a',
                fontSize: '13px', textAlign: 'center', fontWeight: 600
              }}>
                {msg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#aab4cc' : 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '15px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Rajdhani, sans-serif',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(26,107,255,0.35)',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? '⏳ sending...' : '📧 Send Reset Link'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <a href="/login" style={{
                color: '#1a6bff', fontSize: '13px',
                fontWeight: 600, textDecoration: 'none'
              }}>
                ← Back to Login
              </a>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}