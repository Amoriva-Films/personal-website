'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Preise',     href: '/preise'       },
    { label: 'Über uns',   href: '/#founders'    },
    { label: 'Anfrage',    href: '/anfrage'      },
  ];

  const color = scrolled ? '#3B2F2A' : 'rgba(246,241,235,0.88)';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '1.0rem 8%' : '1.6rem 8%',
      background: scrolled ? 'rgba(246,241,235,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(59,47,42,0.07)' : '1px solid transparent',
      transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: scrolled ? '#3B2F2A' : '#F6F1EB',
        textDecoration: 'none', transition: 'color 0.6s ease',
        whiteSpace: 'nowrap',
      }}>
        Amoriva Films
      </Link>

      <div className="nav-links" style={{ display: 'flex', gap: 'clamp(1.2rem, 2.5vw, 2.5rem)', alignItems: 'center' }}>
        {links.map(({ label, href }) => (
          <Link key={label} href={href} style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px', fontWeight: 300, letterSpacing: '0.18em',
            textTransform: 'uppercase', color, textDecoration: 'none',
            transition: 'color 0.6s ease, opacity 0.3s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.45'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
            {label}
          </Link>
        ))}

        {/* Telefon — desktop only */}
        <a href="tel:+4915565559747" className="nav-phone" style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '12px', fontWeight: 300, color,
          textDecoration: 'none', display: 'flex', alignItems: 'center',
          gap: '5px', letterSpacing: '0.02em', whiteSpace: 'nowrap',
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.5'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
          </svg>
          +49 155 6555 9747
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-phone { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
