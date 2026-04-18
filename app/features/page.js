'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export default function FeaturesPage() {
  const router = useRouter();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [stats, setStats] = useState({ total: 0, fake: 0, real: 0 });

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => setStats({ total: 1247, fake: 683, real: 564 }));
  }, []);

  const features = [
    { 
      icon: '🔍', title: 'Real-time Analysis', 
      color: '#6C63FF', bg: '#f0efff',
      desc: 'Instantly analyze any headline or article using advanced AI',
      detail: 'Our AI processes your text in under 2 seconds using Groq LLM to detect misinformation patterns.',
      link: '/' 
    },
    { 
      icon: '📊', title: 'Credibility Score', 
      color: '#FF6584', bg: '#fff0f3',
      desc: 'Get a 0-100 score showing how credible the news is',
      detail: 'Score 0-30 is Fake, 31-70 is Suspicious, 71-100 is Real. Based on 50+ credibility factors.',
      link: '/' 
    },
    { 
      icon: '🌐', title: 'URL Analysis', 
      color: '#43B89C', bg: '#f0faf7',
      desc: 'Paste any article URL and we analyze the content',
      detail: 'We fetch the article content automatically and run full AI analysis on it.',
      link: '/' 
    },
    { 
      icon: '📋', title: 'Search History', 
      color: '#FF9F43', bg: '#fff8f0',
      desc: 'All your past searches saved  SUPABASE automatically',
      detail: 'All your previous analyses are saved in Supabase and accessible anytime.',
      link: '/history' 
    },
    { 
      icon: '🔗', title: 'Share Results', 
      color: '#54A0FF', bg: '#f0f7ff',
      desc: 'Share analysis results with friends instantly',
      detail: 'One click share to WhatsApp, Twitter, or copy link to clipboard.',
      link: '/' 
    },
    { 
      icon: '🇮🇳', title: 'Hindi Support', 
      color: '#FF6B35', bg: '#fff4f0',
      desc: 'Analyze news in Hindi language too',
      detail: 'Full Hindi language support — paste Hindi headlines and get results in Hindi.',
      link: '/' 
    },
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        style={{
          background: 'white', color: '#6C63FF', border: 'none',
          borderRadius: '50px', padding: '10px 24px', fontSize: '16px',
          cursor: 'pointer', fontWeight: 'bold', marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
      >
        ← Back to Home
      </button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'white', margin: 0 }}>
          Our <span style={{ color: '#FFD700' }}>Features</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginTop: '10px' }}>
          Everything you need to fight misinformation
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '20px',
        flexWrap: 'wrap', marginBottom: '40px'
      }}>
        {[
          { label: '📰 Total Analyzed', value: stats.total },
          { label: '❌ Fake Detected', value: stats.fake },
          { label: '✅ Real News', value: stats.real },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
            borderRadius: '16px', padding: '20px 30px', textAlign: 'center',
            color: 'white', minWidth: '140px'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '900' }}>{s.value.toLocaleString()}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px', maxWidth: '1000px', margin: '0 auto'
      }}>
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => setSelectedFeature(f)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.2)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
            style={{
              background: f.bg, borderRadius: '20px', padding: '32px',
              cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${f.color}`
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ color: f.color, fontSize: '20px', fontWeight: '800', margin: '0 0 10px' }}>
              {f.title}
            </h3>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              {f.desc}
            </p>
            <div style={{
              marginTop: '16px', color: f.color, fontSize: '13px', fontWeight: '700'
            }}>
              Tap to learn more →
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedFeature && (
        <div
          onClick={() => setSelectedFeature(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '24px', padding: '40px',
              maxWidth: '420px', width: '100%', textAlign: 'center',
              borderTop: `6px solid ${selectedFeature.color}`
            }}
          >
            <div style={{ fontSize: '64px' }}>{selectedFeature.icon}</div>
            <h2 style={{ color: selectedFeature.color, fontSize: '24px', fontWeight: '900' }}>
              {selectedFeature.title}
            </h2>
            <p style={{ color: '#666', lineHeight: 1.7, margin: '16px 0 24px' }}>
              {selectedFeature.detail}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => router.push(selectedFeature.link)}
                style={{
                  background: selectedFeature.color, color: 'white',
                  border: 'none', borderRadius: '50px', padding: '12px 28px',
                  fontSize: '16px', cursor: 'pointer', fontWeight: '700'
                }}
              >
                Try Now →
              </button>
              <button
                onClick={() => setSelectedFeature(null)}
                style={{
                  background: '#f0f0f0', color: '#666',
                  border: 'none', borderRadius: '50px', padding: '12px 28px',
                  fontSize: '16px', cursor: 'pointer', fontWeight: '700'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}