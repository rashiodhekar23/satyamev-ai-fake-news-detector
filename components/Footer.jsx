export default function Footer() {
  return (
    <footer style={{
      background: '#0a1628',
      color: '#fff',
      padding: '48px',
      marginTop: '60px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#1a6bff,#7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '16px' }}>S</div>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700 }}>SATYAMEV <span style={{ color: '#1a6bff' }}>AI</span></span>
            </div>
            <p style={{ fontSize: '13px', color: '#8899bb', lineHeight: 1.7 }}>
              AI-powered fake news detection platform. Satya ki khoj mein.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Quick Links</h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'About', href: '/about' },
              { label: 'Login', href: '/login' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ display: 'block', fontSize: '13px', color: '#8899bb', textDecoration: 'none', marginBottom: '8px' }}>{l.label}</a>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Tech Stack</h4>
            {['Next.js', 'MongoDB', 'Groq AI', 'LLaMA 3.3'].map(t => (
              <div key={t} style={{ fontSize: '13px', color: '#8899bb', marginBottom: '8px' }}>→ {t}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Project Info</h4>
            <p style={{ fontSize: '13px', color: '#8899bb', lineHeight: 1.7 }}>
              BCA Final Year Project<br/>
              AI & Web Development<br/>
              2024-2025
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#8899bb' }}>© 2025 SATYAMEV AI. All rights reserved.</span>
          <span style={{ fontSize: '13px', color: '#8899bb' }}>Made with ❤️ for BCA Project</span>
        </div>
      </div>
    </footer>
  );
}