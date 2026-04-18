'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/') return null;

  return (
    <button
      onClick={() => router.push('/')}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      style={{
        position: 'fixed', bottom: '24px', left: '24px',
        zIndex: 999,
        background: 'linear-gradient(135deg,#1a6bff,#7c3aed)',
        color: 'white', border: 'none',
        borderRadius: '50px', padding: '12px 24px',
        fontSize: '14px', fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(26,107,255,0.4)',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.3s ease'
      }}
    >
      ← Home
    </button>
  );
}