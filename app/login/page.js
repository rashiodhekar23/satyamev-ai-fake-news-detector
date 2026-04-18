'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function testReset() {
    const { error } = await 
supabase.auth.resetPasswordForEmail('aifakenewsdetector2026@gmail.com',);
if (error) {
  console.log('Error:', + error.message);
} else {
  console.log('Email sent successfully!');
  alert('Reset email sent! ');
}
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();

    // Forgot Password
    if (isForgot) {
      if (!email) { setMsg('Email daalo!'); return; }
      setLoading(true);
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
          setMsg('Password reset link sent ! ✅ Check your email.');
        }
      } catch {
        setMsg('Server error! Try again ❌');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Validation
    if (!email || !password) { setMsg('Enter email and password!'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg('Enter a valid email address (example@gmail.com)');
      return;
    }
    if (!isLogin && !name) { setMsg('Enter your name!'); return; }
    if (!isLogin && password !== confirmPassword) {
      setMsg('Password match nahi kar raha! ❌');
      return;
    }
    if (!isLogin && password.length < 8) {
      setMsg('Password must be at least 8 characters long!');
      return;
    }

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          name, email, password
        })
      });
      const data = await res.json();
      if (data.error) {
        setMsg(data.error + ' ❌');
      } else {
        localStorage.setItem('satyamev_loggedin', JSON.stringify(data.user));
        setMsg(isLogin ? 'Login successful! ✅' : 'Account created successfully! ✅');
        setTimeout(() => router.push('/'), 1000);
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
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 800, fontSize: '24px',
            boxShadow: '0 8px 24px rgba(26,107,255,0.35)'
          }}>S</div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '28px', fontWeight: 700, color: '#0a1628'
          }}>
            {isForgot ? 'Forgot Password 🔑' : isLogin ? 'Welcome Back 👋' : 'Create Account 🚀'}
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7a99', marginTop: '8px' }}>
            {isForgot ? 'Email daalo — reset link bhejenge'
              : isLogin ? 'Login to SATYAMEV AI'
              : 'Join SATYAMEV AI today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex', flexDirection: 'column', gap: '14px'
        }}>

          {/* Name — only register */}
          {!isLogin && !isForgot && (
            <input
              placeholder="Full Name"
              value={name}
              required
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />

          {/* Password */}
          {!isForgot && (
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, width: '100%', paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: '18px', color: '#6b7a99'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          )}

          {/* Confirm Password — only register */}
          {!isLogin && !isForgot && (
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                required
                onChange={e => setConfirmPassword(e.target.value)}
                style={{
                  ...inputStyle, width: '100%', paddingRight: '44px',
                  borderColor: confirmPassword && password !== confirmPassword
                    ? '#ff3b5c' : '#e2e8f8'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: '18px', color: '#6b7a99'
                }}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
              {/* Match indicator */}
              {confirmPassword && (
                <p style={{
                  fontSize: '12px', marginTop: '4px',
                  color: password === confirmPassword ? '#00c97a' : '#ff3b5c'
                }}>
                  {password === confirmPassword ? '✅ Password match!' : '❌ Passwords do not match!'}
                </p>
              )}
            </div>
          )}

          {/* Forgot Password Link */}
          {isLogin && !isForgot && (
            <div style={{ textAlign: 'right' }}>
              <span
                onClick={() => { window.location.href = '/forgot-password'; }}
                
                style={{
                  fontSize: '12px', color: '#1a6bff',
                  cursor: 'pointer', fontWeight: 600
                }}
              >
                Forgot Password?
              </span>
            </div>
          )}

          {/* Message */}
          {msg && (
            <div style={{
              padding: '12px 16px', borderRadius: '10px',
              background: msg.includes('✅') ? 'rgba(0,201,122,0.1)' : 'rgba(255,59,92,0.1)',
              color: msg.includes('✅') ? '#00a864' : '#ff3b5c',
              fontSize: '13px', textAlign: 'center', fontWeight: 600
            }}>
              {msg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              padding: '14px', fontSize: '15px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Please wait...'
              : isForgot ? 'SEND RESET LINK 📧'
              : isLogin ? 'LOGIN →'
              : 'CREATE ACCOUNT →'}
          </button>
        </form>

        {/* Toggle */}
        <div style={{
          textAlign: 'center', fontSize: '13px',
          color: '#6b7a99', marginTop: '20px'
        }}>
          {isForgot ? (
            <span
              onClick={() => { setIsForgot(false); setMsg(''); }}
              style={{ color: '#1a6bff', cursor: 'pointer', fontWeight: 600 }}
            >
              ← Back to Login
            </span>
          ) : (
            <>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span
                onClick={() => { setIsLogin(!isLogin); setMsg(''); setConfirmPassword(''); }}
                style={{ color: '#1a6bff', cursor: 'pointer', fontWeight: 600 }}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: '13px 16px', borderRadius: '12px',
  border: '1.5px solid #e2e8f8', fontSize: '14px',
  outline: 'none', fontFamily: 'inherit',
  background: '#f8faff', width: '100%'
};