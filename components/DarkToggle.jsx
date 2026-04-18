'use client';
import { useEffect, useState } from 'react';

export default function DarkToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('satyamev_dark') === 'true';
    setDark(saved);
    document.documentElement.setAttribute('data-theme', saved ? 'dark' : 'light');
  }, []);

  function toggle() {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem('satyamev_dark', String(newDark));
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      title={dark ? 'Light Mode' : 'Dark Mode'}
      style={{
        position: 'fixed', bottom: '24px', right: '20px', zIndex: 9999,
        width: '48px', height: '48px',
        background: dark
          ? 'linear-gradient(135deg, #FFD700, #FFA500)'
          : 'linear-gradient(135deg, #1a1a2e, #7c3aed)',
        border: 'none', borderRadius: '50%',
        fontSize: '22px', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        transition: 'all 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}