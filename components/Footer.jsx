'use client';

export default function Footer() {
  return (
    <footer style={{
      background: '#0a1628',
      color: '#fff',
      padding: '48px 32px',
      marginTop: '60px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
                borderRadius: '8px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: '16px'
              }}>S</div>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700 }}>
                SATYAMEV <span style={{ color: '#1a6bff' }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#8899bb', lineHeight: 1.7 }}>
              AI-powered fake news detection platform. Satya ki khoj mein.
            </p>
            <div style={{ marginTop: '16px' }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(26,107,255,0.15)',
                color: '#1a6bff', fontSize: '11px',
                fontWeight: 700, padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(26,107,255,0.3)'
              }}>
                🔴 LIVE NEWS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              Quick Links
            </h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'Live News', href: '/news' },
              { label: 'Leaderboard', href: '/leaderboard' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              { label: 'Login', href: '/login' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{
                display: 'block', fontSize: '13px',
                color: '#8899bb', textDecoration: 'none',
                marginBottom: '8px'
              }}>{l.label}</a>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              Tech Stack
            </h4>
            {[
              { name: 'Next.js 16', icon: '▲' },
              { name: 'React 18', icon: '⚛' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'Supabase', icon: '🗄' },
              { name: 'Groq AI', icon: '🤖' },
              { name: 'LLaMA 3', icon: '🦙' },
              { name: 'RSS Feeds', icon: '📡' },
              { name: 'Vercel', icon: '☁' },
            ].map(t => (
              <div key={t.name} style={{
                fontSize: '13px', color: '#8899bb',
                marginBottom: '7px', display: 'flex',
                alignItems: 'center', gap: '6px'
              }}>
                <span style={{ fontSize: '12px' }}>{t.icon}</span>
                <span>→ {t.name}</span>
              </div>
            ))}
          </div>

          {/* RSS News Sources */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              📡 News Sources
            </h4>
            <p style={{ fontSize: '12px', color: '#1a6bff', marginBottom: '10px', fontWeight: 600 }}>
              40+ Live RSS Feeds
            </p>
            {[
              '🇬🇧 English — BBC, NDTV, TOI',
              '🇮🇳 Hindi — Aaj Tak, Bhaskar',
              '📊 Business — ET, Moneycontrol',
              '🟠 Marathi — Maharashtra Times',
              '🟣 Gujarati — Divya Bhaskar',
              '🟡 Punjabi — Punjab Kesari',
              '🔵 Tamil, Telugu, Kannada',
              '🟢 Malayalam, Bengali',
              '🌍 International — Reuters',
            ].map(s => (
              <div key={s} style={{
                fontSize: '12px', color: '#8899bb',
                marginBottom: '6px', lineHeight: 1.5
              }}>
                {s}
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
              Project Info
            </h4>
            <p style={{ fontSize: '13px', color: '#8899bb', lineHeight: 1.9 }}>
              BCA Final Year Project<br />
              AI & Web Development<br />
              2025-2026<br />
              <br />
              <span style={{ color: '#fff', fontWeight: 600 }}>Tilak Maharashtra</span><br />
              <span style={{ color: '#8899bb' }}>Vidyapeeth</span>
            </p>
            <div style={{ marginTop: '14px' }}>
              <a
                href="https://satyamev-ai-fake-news-detector.vercel.app"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '11px', color: '#1a6bff',
                  textDecoration: 'none'
                }}
              >
                🌐 Live Site ↗
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e2d45',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span style={{ fontSize: '13px', color: '#8899bb' }}>
            © 2026 SATYAMEV AI. All rights reserved.
          </span>
          <span style={{ fontSize: '12px', color: '#4a5568' }}>
            📡 Powered by 40+ RSS feeds across 10+ languages
          </span>
          <span style={{ fontSize: '13px', color: '#8899bb' }}>
            Made with ❤️ for BCA Project
          </span>
        </div>
      </div>

      <style>{`
        footer a:hover { color: #1a6bff !important; }
      `}</style>
    </footer>
  );
}