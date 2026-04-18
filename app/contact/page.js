'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ThemeProvider';
const faqs = [
  {
    q: 'How does satyamev AI work?',
    a: 'Satyamev AI uses Groq LLM AI to analyze news headlines and articles, providing a fake/real verdict with a credibility score 0-100.'
  },
  {
    q: 'Is it free?',
    a: 'Yes! SATYAMEV AI is completely free. No subscription or payment required.'

  },
  {
    q: 'Which languages are supported?',
    a: '16 languages support  — Hindi, Marathi, Gujarati, Punjabi, Tamil, Telugu, Kannada, Malayalam, Bengali, Odia, Assamese, Urdu, English, French, Spanish, German.'
  },
  {
    q: 'Is the analysis accurate?',
    a: 'Our accuracy rate is 94%. However, it is always recommended to verify information from multiple sources.'
  },
  {
    q: 'Is my data safe?',
    a: 'Yes! We use Supabase, which is a secure and encrypted database. Your data is never shared.'
  },
  {
    q: 'Is it mobile responsive?',
    a: 'Absolutely! SATYAMEV AI is fully mobile responsive. iOS and Android both support it.'
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate send
    await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    });
    setSent(true);
    setLoading(false);
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #e8f0ff 0%, #f0e8ff 40%, #ffe8f5 70%, #e8f8ff 100%)'
      }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(100,180,255,0.4) 0%, transparent 70%)',
          top: '-100px', left: '-100px',
          animation: 'floatBg1 12s ease-in-out infinite'
        }}/>
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(220,150,255,0.3) 0%, transparent 70%)',
          bottom: '-50px', right: '-50px',
          animation: 'floatBg2 15s ease-in-out infinite'
        }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>

      <div style={{
        position: 'relative', zIndex: 5,
        maxWidth: '1000px', margin: '0 auto',
        padding: 'clamp(24px, 5vw, 48px) 16px'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📬</div>
          <h1 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900, color: '#0a1628', margin: '0 0 12px'
          }}>
            Contact <span style={{
              background: 'linear-gradient(135deg, #1a6bff, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Us</span>
          </h1>
          <p style={{ color: '#6b7a99', fontSize: 'clamp(14px, 3vw, 17px)', lineHeight: 1.7 }}>
            Koi sawaal hai? Hum madad ke liye hain! 🙂
          </p>
        </div>

        {/* Top Grid — Contact Info + Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px', marginBottom: '32px'
        }}>

          {/* LEFT — Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Contact Cards */}
            {[
              { icon: '📧', title: 'Email', value: 'aifakenewsdetector2026@gmail.com', link: 'mailto:aifakenewsdetector2026@gmail.com', color: '#1a6bff' },
              { icon: '📱', title: 'Phone', value: '+91 8097874434', link: 'tel:+918097874434', color: '#00c97a' },
              { icon: '📍', title: 'Location', value: 'Pune, Maharashtra, India', link: null, color: '#ff6584' },
            ].map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px', padding: '20px 24px',
                border: '1px solid rgba(255,255,255,0.9)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '16px',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: `${c.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0
                }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7a99', fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.06em' }}>
                    {c.title.toUpperCase()}
                  </p>
                  {c.link ? (
                    <a href={c.link} style={{
                      fontSize: '15px', fontWeight: 700, color: c.color,
                      textDecoration: 'none'
                    }}>{c.value}</a>
                  ) : (
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#0a1628', margin: 0 }}>
                      {c.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px', padding: '24px',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              <p style={{
                fontSize: '12px', color: '#6b7a99', fontWeight: 700,
                marginBottom: '16px', letterSpacing: '0.06em'
              }}>FOLLOW US</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { name: 'Twitter', icon: '🐦', color: '#1DA1F2', url: 'https://twitter.com' },
                  { name: 'Instagram', icon: '📸', color: '#E1306C', url: 'https://instagram.com' },
                  { name: 'LinkedIn', icon: '💼', color: '#0077B5', url: 'https://linkedin.com' },
                  { name: 'YouTube', icon: '▶️', color: '#FF0000', url: 'https://youtube.com' },
                  { name: 'WhatsApp', icon: '💬', color: '#25D366', url: 'https://whatsapp.com' },
                ].map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '8px 14px', borderRadius: '50px',
                      background: `${s.color}15`, color: s.color,
                      textDecoration: 'none', fontSize: '13px', fontWeight: 700,
                      border: `1px solid ${s.color}30`,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${s.color}25`}
                    onMouseLeave={e => e.currentTarget.style.background = `${s.color}15`}
                  >
                    {s.icon} {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px', padding: 'clamp(20px, 4vw, 32px)',
            border: '1px solid rgba(255,255,255,0.9)',
            boxShadow: '0 8px 40px rgba(26,107,255,0.1)'
          }}>
            <h2 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '24px', fontWeight: 800,
              color: '#0a1628', marginBottom: '24px'
            }}>
              ✉️ Send Message
            </h2>

            {sent ? (
              <div style={{
                textAlign: 'center', padding: '40px 20px',
                animation: 'fadeInUp 0.5s ease'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '24px', fontWeight: 800, color: '#00c97a', marginBottom: '8px'
                }}>
                  Message Sent!
                </h3>
                <p style={{ color: '#6b7a99', marginBottom: '24px' }}>
                  Hum jald hi jawab denge! 😊
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    background: 'linear-gradient(135deg, #1a6bff, #7c3aed)',
                    color: 'white', border: 'none', borderRadius: '50px',
                    padding: '12px 28px', fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex', flexDirection: 'column', gap: '14px'
              }}>
                {/* Name + Email */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#6b7a99', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
                      YOUR NAME *
                    </label>
                    <input
                      placeholder="Rashi Odhekar"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        borderRadius: '12px', border: '1.5px solid #e2e8f8',
                        fontSize: '14px', outline: 'none',
                        fontFamily: 'inherit', background: '#f8faff',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#6b7a99', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      placeholder="rashi@gmail.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        borderRadius: '12px', border: '1.5px solid #e2e8f8',
                        fontSize: '14px', outline: 'none',
                        fontFamily: 'inherit', background: '#f8faff',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ fontSize: '11px', color: '#6b7a99', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
                    SUBJECT
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 16px',
                      borderRadius: '12px', border: '1.5px solid #e2e8f8',
                      fontSize: '14px', outline: 'none',
                      fontFamily: 'inherit', background: '#f8faff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select subject...</option>
                    <option>General Inquiry</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: '11px', color: '#6b7a99', fontWeight: 700, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>
                    MESSAGE *
                  </label>
                  <textarea
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: '100%', padding: '12px 16px',
                      borderRadius: '12px', border: '1.5px solid #e2e8f8',
                      fontSize: '14px', outline: 'none',
                      fontFamily: 'inherit', background: '#f8faff',
                      resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '14px',
                    background: loading ? '#aab4cc' : 'linear-gradient(135deg, #1a6bff, #7c3aed)',
                    color: 'white', border: 'none', borderRadius: '12px',
                    fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.04em',
                    transition: 'all 0.3s ease',
                    boxShadow: loading ? 'none' : '0 4px 16px rgba(26,107,255,0.35)'
                  }}
                >
                  {loading ? '⏳ Sending...' : '🚀 Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px', padding: 'clamp(20px, 4vw, 32px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800,
            color: '#0a1628', marginBottom: '24px', textAlign: 'center'
          }}>
            ❓ Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '16px',
                  border: `1.5px solid ${openFaq === i ? 'rgba(26,107,255,0.3)' : '#e2e8f8'}`,
                  overflow: 'hidden', transition: 'all 0.3s ease',
                  background: openFaq === i ? 'rgba(26,107,255,0.04)' : 'white'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 20px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', gap: '12px', textAlign: 'left'
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(13px, 3vw, 15px)',
                    fontWeight: 700, color: '#0a1628'
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: '20px', color: '#1a6bff',
                    transition: 'transform 0.3s ease', flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)'
                  }}>+</span>
                </button>

                {openFaq === i && (
                  <div style={{
                    padding: '0 20px 18px',
                    animation: 'fadeInUp 0.3s ease'
                  }}>
                    <p style={{
                      fontSize: 'clamp(13px, 2.5vw, 14px)',
                      color: '#6b7a99', lineHeight: 1.7, margin: 0
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBg1 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(40px,-30px) scale(1.05)}
          66%{transform:translate(-20px,40px) scale(0.95)}
        }
        @keyframes floatBg2 {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(-50px,30px) scale(1.08)}
          66%{transform:translate(30px,-40px) scale(0.92)}
        }
        @keyframes fadeInUp {
          from{opacity:0;transform:translateY(12px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </main>
  );
}