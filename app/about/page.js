export default function About() {
  return (
    <main style={{ minHeight: '100vh', background: '#f0f4ff', padding: '80px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '48px', fontWeight: 700, color: '#0a1628', marginBottom: '16px' }}>
          About <span style={{ color: '#1a6bff' }}>SATYAMEV AI</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7a99', lineHeight: 1.8, marginBottom: '32px' }}>
          SATYAMEV AI is an AI-powered fake news detection platform built to help people identify misinformation using advanced AI technology.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { icon: '🤖', title: 'AI Powered', desc: 'Uses Groq LLaMA AI for real-time analysis' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Results in under 3 seconds' },
            { icon: '🌐', title: 'Multi-language', desc: 'Supports Hindi & English' },
            { icon: '🔒', title: 'Privacy First', desc: 'Your searches are private' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e2e8f8' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', fontWeight: 700, color: '#0a1628', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7a99', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}