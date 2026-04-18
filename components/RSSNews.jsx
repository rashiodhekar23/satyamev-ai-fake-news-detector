'use client';
import { useState, useEffect } from 'react';

const RSS_SOURCES = [
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', lang: 'EN', category: 'General', color: '#BB1919' },
  { name: 'NDTV', url: 'https://feeds.feedburner.com/ndtvnews-top-stories', lang: 'EN', category: 'General', color: '#E63946' },
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', lang: 'EN', category: 'General', color: '#FF6B35' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/feeder/default.rss', lang: 'EN', category: 'General', color: '#1a6bff' },
  { name: 'India Today', url: 'https://www.indiatoday.in/rss/home', lang: 'EN', category: 'General', color: '#7c3aed' },
  { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml', lang: 'EN', category: 'General', color: '#ff3b5c' },
  { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms', lang: 'TREND', category: 'Business', color: '#FF9F43' },
  { name: 'Moneycontrol', url: 'https://www.moneycontrol.com/rss/latestnews.xml', lang: 'TREND', category: 'Finance', color: '#00c97a' },
  { name: 'Business Standard', url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', lang: 'TREND', category: 'Business', color: '#FF6B35' },
  { name: 'CNBC TV18', url: 'https://www.cnbctv18.com/rss/business.xml', lang: 'TREND', category: 'Stock Market', color: '#FFD700' },
  { name: 'Livemint', url: 'https://www.livemint.com/rss/news', lang: 'TREND', category: 'Finance', color: '#43B89C' },
  { name: 'Financial Express', url: 'https://www.financialexpress.com/feed/', lang: 'TREND', category: 'Finance', color: '#1a6bff' },
  { name: 'Aaj Tak', url: 'https://feeds.feedburner.com/aajtaklatestnews', lang: 'HI', category: 'General', color: '#1a6bff' },
  { name: 'ABP News', url: 'https://news.abplive.com/feeds/hindi.xml', lang: 'HI', category: 'General', color: '#E63946' },
  { name: 'Dainik Bhaskar', url: 'https://www.bhaskar.com/rss-feed/1061/', lang: 'HI', category: 'General', color: '#FF6B35' },
  { name: 'Navbharat Times', url: 'https://navbharattimes.indiatimes.com/rssfeedsdefault.cms', lang: 'HI', category: 'General', color: '#7c3aed' },
  { name: 'Zee News Hindi', url: 'https://zeenews.india.com/hindi/rss/india.xml', lang: 'HI', category: 'General', color: '#ff3b5c' },
  { name: 'Lokmat', url: 'https://www.lokmat.com/rss/maharashtra.xml', lang: 'MR', category: 'General', color: '#FF6B35' },
  { name: 'Sakal', url: 'https://www.esakal.com/rss/maharashtra', lang: 'MR', category: 'General', color: '#7c3aed' },
  { name: 'Maharashtra Times', url: 'https://maharashtratimes.com/rssfeedsdefault.cms', lang: 'MR', category: 'General', color: '#FF9F43' },
  { name: 'TV9 Marathi', url: 'https://tv9marathi.com/feed', lang: 'MR', category: 'General', color: '#E63946' },
  { name: 'Divya Bhaskar', url: 'https://www.divyabhaskar.co.in/rss-feed/1094/', lang: 'GU', category: 'General', color: '#FF9F43' },
  { name: 'Gujarat Samachar', url: 'https://www.gujaratsamachar.com/rss', lang: 'GU', category: 'General', color: '#1a6bff' },
  { name: 'Punjab Kesari', url: 'https://www.punjabkesari.in/rss/news', lang: 'PA', category: 'General', color: '#FFD700' },
  { name: 'Dinamalar', url: 'https://www.dinamalar.com/rss.asp', lang: 'TA', category: 'General', color: '#E63946' },
  { name: 'Sun News Tamil', url: 'https://www.sunnews.in/feed/', lang: 'TA', category: 'General', color: '#FF6B35' },
  { name: 'Eenadu', url: 'https://www.eenadu.net/rss.aspx', lang: 'TE', category: 'General', color: '#1a6bff' },
  { name: 'TV9 Telugu', url: 'https://tv9telugu.com/feed', lang: 'TE', category: 'General', color: '#E63946' },
  { name: 'Vijay Karnataka', url: 'https://vijaykarnataka.com/rssfeedsdefault.cms', lang: 'KN', category: 'General', color: '#FF6B35' },
  { name: 'Mathrubhumi', url: 'https://www.mathrubhumi.com/rss', lang: 'ML', category: 'General', color: '#7c3aed' },
  { name: 'Anandabazar', url: 'https://www.anandabazar.com/rss', lang: 'BN', category: 'General', color: '#E63946' },
  { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', lang: 'INTL', category: 'World', color: '#FF6B35' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', lang: 'INTL', category: 'World', color: '#43B89C' },
];

const LANG_CONFIG = {
  ALL:   { label: 'All',       color: '#1a6bff' },
  EN:    { label: 'English',   color: '#BB1919' },
  TREND: { label: 'Trending',  color: '#FFD700' },
  HI:    { label: 'Hindi',     color: '#FF6B35' },
  MR:    { label: 'Marathi',   color: '#7c3aed' },
  GU:    { label: 'Gujarati',  color: '#FF9F43' },
  PA:    { label: 'Punjabi',   color: '#FFD700' },
  TA:    { label: 'Tamil',     color: '#E63946' },
  TE:    { label: 'Telugu',    color: '#1a6bff' },
  KN:    { label: 'Kannada',   color: '#FF6B35' },
  ML:    { label: 'Malayalam', color: '#7c3aed' },
  BN:    { label: 'Bengali',   color: '#E63946' },
  INTL:  { label: 'World',     color: '#43B89C' },
};

const CATEGORIES = ['ALL', 'General', 'Business', 'Finance', 'Stock Market', 'World'];

export default function RSSNews({ darkMode }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [lastRefresh, setLastRefresh] = useState('');
  const [search, setSearch] = useState('');

  const textColor   = darkMode ? '#ffffff'                : '#0a1628';
  const subColor    = darkMode ? '#aab4cc'                : '#6b7a99';
  const cardBg      = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const borderColor = darkMode ? 'rgba(255,255,255,0.1)'  : '#e2e8f8';
  const inputBg     = darkMode ? 'rgba(255,255,255,0.08)' : '#f8faff';

  async function fetchNews() {
    setLoading(true);
    try {
      const res = await fetch('/api/news?t=' + Date.now());
      const d = await res.json();
      setNews(d.news || []);
      setLastRefresh(new Date().toLocaleTimeString('en-IN'));
    } catch {
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = news.filter(item => {
    const langMatch = filter === 'ALL' || item.lang?.toUpperCase() === filter;
    const catMatch = categoryFilter === 'ALL' || item.category === categoryFilter;
    const searchMatch = !search || item.title?.toLowerCase().includes(search.toLowerCase());
    return langMatch && catMatch && searchMatch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto 60px', padding: '0 24px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap',
        gap: '12px', marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: textColor, fontSize: '28px',
            fontWeight: 800, margin: 0
          }}>
            Live News Feed
          </h2>
          <span style={{
            background: 'rgba(255,59,92,0.1)', color: '#ff3b5c',
            borderRadius: '50px', padding: '3px 12px',
            fontSize: '11px', fontWeight: 700,
            animation: 'blink 1.5s infinite'
          }}>
            LIVE
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {lastRefresh && (
            <span style={{ fontSize: '11px', color: subColor }}>
              {lastRefresh}
            </span>
          )}
          <button
            onClick={fetchNews}
            style={{
              background: 'rgba(26,107,255,0.1)',
              border: '1px solid rgba(26,107,255,0.2)',
              color: '#1a6bff', borderRadius: '50px',
              padding: '6px 14px', fontSize: '12px',
              cursor: 'pointer', fontWeight: 600
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search news..."
        style={{
          width: '100%', padding: '12px 20px',
          borderRadius: '50px', border: `1.5px solid ${borderColor}`,
          background: inputBg, color: textColor,
          fontSize: '14px', outline: 'none',
          fontFamily: 'inherit', marginBottom: '16px',
          boxSizing: 'border-box'
        }}
      />

      {/* Language Filter */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '12px',
        overflowX: 'auto', paddingBottom: '8px',
        scrollbarWidth: 'none'
      }}>
        {Object.entries(LANG_CONFIG).map(([code, config]) => (
          <button
            key={code}
            onClick={() => setFilter(code)}
            style={{
              padding: '7px 16px', borderRadius: '50px',
              border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: 700,
              whiteSpace: 'nowrap',
              background: filter === code ? config.color : cardBg,
              color: filter === code ? 'white' : subColor,
              boxShadow: filter === code ? `0 4px 12px ${config.color}55` : 'none',
              transition: 'all 0.2s'
            }}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '16px',
        overflowX: 'auto', paddingBottom: '8px',
        scrollbarWidth: 'none'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '5px 14px', borderRadius: '50px',
              border: `1px solid ${borderColor}`,
              cursor: 'pointer', fontSize: '11px', fontWeight: 600,
              whiteSpace: 'nowrap',
              background: categoryFilter === cat ? '#1a6bff' : 'transparent',
              color: categoryFilter === cat ? 'white' : subColor,
              transition: 'all 0.2s'
            }}
          >
            {cat === 'ALL' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontSize: '12px', color: subColor, marginBottom: '16px' }}>
        {loading ? 'Loading...' : `${filtered.length} articles found`}
        {search && ` for "${search}"`}
      </p>

      {/* News Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: subColor }}>
          <div style={{
            width: '48px', height: '48px',
            border: '4px solid rgba(26,107,255,0.2)',
            borderTopColor: '#1a6bff', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ fontWeight: 600 }}>Live news load ho raha hai...</p>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>
            {RSS_SOURCES.length}+ sources se fetch ho raha hai
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: subColor }}>
          <p style={{ fontSize: '48px', marginBottom: '12px' }}>No news found</p>
          <p style={{ color: subColor }}>Koi news nahi mili</p>
          <button
            onClick={fetchNews}
            style={{
              marginTop: '12px', padding: '10px 24px',
              background: 'linear-gradient(135deg, #1a6bff, #7c3aed)',
              color: 'white', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 600
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {filtered.map((item, i) => {
            const source = RSS_SOURCES.find(s => s.name === item.source);
            const langConfig = LANG_CONFIG[item.lang?.toUpperCase()] || LANG_CONFIG['EN'];
            return (
              <div
                key={i}
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '20px',
                  border: `1px solid ${borderColor}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                {/* Source Badge */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', flexWrap: 'wrap', gap: '4px'
                }}>
                  <span style={{
                    background: source?.color || '#1a6bff',
                    color: 'white', borderRadius: '50px',
                    padding: '3px 10px', fontSize: '11px', fontWeight: 700
                  }}>
                    {item.source}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {item.category && item.category !== 'General' && (
                      <span style={{
                        background: 'rgba(255,159,67,0.15)',
                        color: '#FF9F43', borderRadius: '50px',
                        padding: '2px 8px', fontSize: '10px', fontWeight: 700
                      }}>
                        {item.category}
                      </span>
                    )}
                    <span style={{
                      background: `${langConfig.color}22`,
                      color: langConfig.color, borderRadius: '50px',
                      padding: '2px 8px', fontSize: '10px', fontWeight: 700
                    }}>
                      {langConfig.label}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p style={{
                  color: textColor, fontSize: '14px',
                  fontWeight: 600, lineHeight: 1.5,
                  margin: 0, flex: 1
                }}>
                  {item.title}
                </p>

                {/* Date */}
                {item.date && (
                  <p style={{ fontSize: '11px', color: subColor, margin: 0 }}>
                    {(() => {
                      try {
                        return new Date(item.date).toLocaleString('en-IN', {
                          day: 'numeric', month: 'short',
                          hour: '2-digit', minute: '2-digit'
                        });
                      } catch {
                        return item.date;
                      }
                    })()}
                  </p>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, textAlign: 'center',
                      padding: '8px', borderRadius: '10px',
                      background: darkMode ? 'rgba(255,255,255,0.08)' : '#f0f4ff',
                      border: `1px solid ${borderColor}`,
                      color: subColor, fontSize: '12px',
                      textDecoration: 'none', fontWeight: 600,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '4px'
                    }}
                  >
                    Read
                  </a>
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('analyzeNews', {
                        detail: { text: item.title }
                      }));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      flex: 1, padding: '8px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #1a6bff, #7c3aed)',
                      color: 'white', border: 'none',
                      fontSize: '12px', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Analyze
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
