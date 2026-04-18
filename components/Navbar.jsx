'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = () => {
      const u = JSON.parse(localStorage.getItem('satyamev_loggedin') || 'null');
      setUser(u);
    };
    const savedLang = localStorage.getItem('satyamev_lang') || 'en';
    setLang(savedLang);
    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('focus', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('focus', checkUser);
    };
  }, [pathname]);

  function handleLangChange(code) {
    setLang(code);
    localStorage.setItem('satyamev_lang', code);
    window.dispatchEvent(new CustomEvent('langChange', { detail: code }));
  }

  function logout() {
    localStorage.removeItem('satyamev_loggedin');
    setUser(null);
    router.push('/');
  }

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'About', href: '/about' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav style={{
        background: 'var(--navbar-bg)',           // ✅ DARK MODE FIXED
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--navbar-border)', // ✅ DARK MODE FIXED
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(26,107,255,0.08)',
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>

        {/* Logo */}
        <a href="/" style={{
          display: 'flex', alignItems: 'center',
          gap: '8px', textDecoration: 'none'
        }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
            borderRadius: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '16px',
            fontFamily: 'Rajdhani, sans-serif',
            flexShrink: 0
          }}>S</div>
          <span style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '20px', fontWeight: 700,
            color: 'var(--navy)'                  // ✅ DARK MODE FIXED
          }}>
            SATYAMEV <span style={{ color: 'var(--blue)' }}>AI</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex', gap: '24px', alignItems: 'center'
        }} className="mobile-hide">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontSize: '13px', fontWeight: 500,
              color: pathname === l.href ? 'var(--blue)' : 'var(--muted)', // ✅ DARK MODE FIXED
              textDecoration: 'none',
              borderBottom: pathname === l.href ? '2px solid var(--blue)' : 'none',
              paddingBottom: '2px',
              transition: 'color 0.2s ease'
            }}>{l.label}</a>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Language — Desktop only */}
          <div className="mobile-hide">
            <LanguageSwitcher currentLang={lang} onLangChange={handleLangChange} />
          </div>

          {/* User/Login — Desktop */}
          <div className="mobile-hide">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px', height: '32px',
                  background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '13px', fontWeight: 700
                }}>
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}> {/* ✅ */}
                  {user.name || user.email}
                </span>
                <button onClick={logout} style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',           // ✅ DARK MODE FIXED
                  borderRadius: '8px', padding: '6px 12px',
                  fontSize: '12px', color: 'var(--muted)',     // ✅ DARK MODE FIXED
                  cursor: 'pointer'
                }}>Logout</button>
              </div>
            ) : (
              <a href="/login">
                <button style={{
                  background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  padding: '8px 18px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif'
                }}>
                  Get Started →
                </button>
              </a>
            )}
          </div>

          {/* Hamburger — Mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '8px',
              flexDirection: 'column', gap: '5px'
            }}
            className="mobile-show"
          >
            <div style={{
              width: '24px', height: '2px',
              background: 'var(--blue)', borderRadius: '2px', // ✅ DARK MODE FIXED
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}/>
            <div style={{
              width: '24px', height: '2px',
              background: 'var(--blue)', borderRadius: '2px', // ✅ DARK MODE FIXED
              opacity: menuOpen ? 0 : 1, transition: 'all 0.3s'
            }}/>
            <div style={{
              width: '24px', height: '2px',
              background: 'var(--blue)', borderRadius: '2px', // ✅ DARK MODE FIXED
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
            }}/>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'var(--navbar-bg)',               // ✅ DARK MODE FIXED
          backdropFilter: 'blur(20px)',
          zIndex: 99, padding: '16px 24px',
          borderBottom: '1px solid var(--navbar-border)', // ✅ DARK MODE FIXED
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          animation: 'fadeInUp 0.2s ease'
        }}>
          {/* Links */}
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 16px',
                fontSize: '16px', fontWeight: 600,
                color: pathname === l.href ? 'var(--blue)' : 'var(--text)', // ✅ DARK MODE FIXED
                textDecoration: 'none',
                background: pathname === l.href ? 'rgba(26,107,255,0.06)' : 'transparent',
                borderRadius: '12px', marginBottom: '4px',
                transition: 'all 0.2s'
              }}
            >
              {l.label}
            </a>
          ))}

          <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }} /> {/* ✅ */}

          {/* Language */}
          <div style={{ marginBottom: '12px' }}>
            <LanguageSwitcher currentLang={lang} onLangChange={(code) => {
              handleLangChange(code);
              setMenuOpen(false);
            }} />
          </div>

          {/* User */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '16px', fontWeight: 700
                }}>
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}> {/* ✅ */}
                    {user.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}> {/* ✅ */}
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{
                  background: 'rgba(255,59,92,0.1)', color: 'var(--red)',
                  border: 'none', borderRadius: '8px',
                  padding: '8px 16px', fontSize: '13px',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" onClick={() => setMenuOpen(false)}>
              <button style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                color: '#fff', border: 'none', borderRadius: '12px',
                fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif'
              }}>
                Get Started →
              </button>
            </a>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-show { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-show { display: none !important; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}