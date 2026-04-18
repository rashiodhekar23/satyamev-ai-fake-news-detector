'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [validLink, setValidLink] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // URL se session check karo
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setValidLink(false);
        setMsg('Invalid ya expired link! ❌ Dobara forgot password karo.');
      }
    });
  }, []);

  async function handleReset(e) {
    e.preventDefault();
    if (password !== confirm) { setMsg('Passwords match nahi! ❌'); return; }
    if (password.length < 6) { setMsg('Password 6+ characters ka hona chahiye! ❌'); return; }

    setLoading(true);
    setMsg('');

    // Supabase Auth se password update
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMsg('Error aaya! ❌ ' + error.message);
      setLoading(false);
      return;
    }

    // Users table mein bhi update karo
    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user?.email) {
      await supabase
        .from('users')
        .update({ password })
        .eq('email', session.session.user.email);
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => router.push('/login'), 3000);
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
            {success ? 'Password Reset! ✅' : 'New Password Set Karo 🔑'}
          </h2>
        </div>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎉</div>
            <p style={{ color: '#00c97a', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
              Password successfully change ho gaya!
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
              3 seconds mein login page pe jaoge...
            </p>
            <div style={{
              width: '100%', height: '4px',
              background: 'rgba(0,201,122,0.2)',
              borderRadius: '4px', overflow: 'hidden'
            }}>
              <div style={{
                height: '100%', background: '#00c97a',
                borderRadius: '4px',
                animation: 'progress 3s linear forwards'
              }}/>
            </div>
          </div>
        ) : !validLink ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>😕</div>
            <p style={{ color: '#ff3b5c', fontWeight: 700, marginBottom: '20px' }}>
              Link invalid ya expired hai!
            </p>
            <a href="/forgot-password" style={{
              display: 'block', padding: '14px',
              background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
              color: 'white', borderRadius: '12px',
              textDecoration: 'none', fontWeight: 700,
              fontFamily: 'Rajdhani, sans-serif', textAlign: 'center'
            }}>
              Dobara Try Karo →
            </a>
          </div>
        ) : (
          <form onSubmit={handleReset} style={{
            display: 'flex', flexDirection: 'column', gap: '16px'
          }}>

            {/* New Password */}
            <div>
              <label style={{
                fontSize: '11px', color: 'var(--muted)', fontWeight: 700,
                display: 'block', marginBottom: '6px', letterSpacing: '0.06em'
              }}>
                NEW PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Naya password daalo"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '13px 44px 13px 16px',
                    borderRadius: '12px', border: '1.5px solid var(--border)',
                    fontSize: '14px', outline: 'none',
                    fontFamily: 'inherit', background: 'var(--input-bg)',
                    color: 'var(--text)', boxSizing: 'border-box'
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: '18px'
                }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{
                fontSize: '11px', color: 'var(--muted)', fontWeight: 700,
                display: 'block', marginBottom: '6px', letterSpacing: '0.06em'
              }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password dobara daalo"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                style={{
                  width: '100%', padding: '13px 16px',
                  borderRadius: '12px',
                  border: `1.5px solid ${confirm && password !== confirm ? '#ff3b5c' : 'var(--border)'}`,
                  fontSize: '14px', outline: 'none',
                  fontFamily: 'inherit', background: 'var(--input-bg)',
                  color: 'var(--text)', boxSizing: 'border-box'
                }}
              />
              {confirm && (
                <p style={{
                  fontSize: '12px', marginTop: '4px',
                  color: password === confirm ? '#00c97a' : '#ff3b5c'
                }}>
                  {password === confirm ? '✅ Passwords match!' : '❌ Match nahi!'}
                </p>
              )}
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
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? '⏳ Reset ho raha hai...' : '🔑 Reset Password'}
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

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </main>
  );
}