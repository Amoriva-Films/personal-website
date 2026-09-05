'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Angebote',   href: '/angebote'     },
  { label: 'Über uns',   href: '/#founders'    },
  { label: 'Anfrage',    href: '/anfrage'      },
];

const CREME = '#F6F1EB';
const DUNKEL = '#3B2F2A';
const TELEFON = '+49 155 6555 9747';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  // Bis 768px sind die Links ausgeblendet. Ohne dieses Menue kaeme man auf dem
  // Handy ueber die Kopfzeile nirgendwo hin.
  const [offen, setOffen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solange das Menue offen ist: Seite dahinter nicht scrollen, Escape schliesst.
  useEffect(() => {
    if (!offen) return;
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOffen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = vorher;
      window.removeEventListener('keydown', onKey);
    };
  }, [offen]);

  const color = scrolled ? DUNKEL : 'rgba(246,241,235,0.88)';
  const markeFarbe = offen ? DUNKEL : (scrolled ? DUNKEL : CREME);

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
      <Link href="/" onClick={() => setOffen(false)} style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.28em',
        textTransform: 'uppercase', color: markeFarbe,
        textDecoration: 'none', transition: 'color 0.6s ease',
        whiteSpace: 'nowrap', position: 'relative', zIndex: 102,
      }}>
        Amoriva Films
      </Link>

      <div className="nav-links" style={{ display: 'flex', gap: 'clamp(1.2rem, 2.5vw, 2.5rem)', alignItems: 'center' }}>
        {LINKS.map(({ label, href }) => (
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
          {TELEFON}
        </a>
      </div>

      {/* Menue-Schalter, nur auf dem Handy sichtbar */}
      <button
        type="button"
        className="nav-burger"
        aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={offen}
        aria-controls="mobilmenue"
        onClick={() => setOffen((o) => !o)}
        style={{
          display: 'none', position: 'relative', zIndex: 102,
          background: 'none', border: 'none', padding: '10px', margin: '-10px',
          cursor: 'pointer', color: markeFarbe, transition: 'color 0.6s ease',
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '1px', background: 'currentColor',
          transform: offen ? 'translateY(3px) rotate(45deg)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }} />
        <span style={{ display: 'block', width: '22px', height: '1px', background: 'currentColor',
          marginTop: '5px', opacity: offen ? 0 : 1,
          transition: 'opacity 0.2s' }} />
        <span style={{ display: 'block', width: '22px', height: '1px', background: 'currentColor',
          marginTop: '5px',
          transform: offen ? 'translateY(-9px) rotate(-45deg)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }} />
      </button>

      {/* Menue-Flaeche */}
      <div
        id="mobilmenue"
        className="nav-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 101,
          background: CREME,
          // Sichtbarkeit haengt am Zustand. Ein hidden-Attribut wuerde hier
          // gegen das Inline-display verlieren, das Menue stuende immer offen.
          display: offen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          gap: '2rem', padding: '0 8%',
        }}
      >
        {LINKS.map(({ label, href }) => (
          <Link key={label} href={href} onClick={() => setOffen(false)} style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '2rem', fontWeight: 400, letterSpacing: '0.06em',
            color: DUNKEL, textDecoration: 'none',
          }}>
            {label}
          </Link>
        ))}
        <a href="tel:+4915565559747" onClick={() => setOffen(false)} style={{
          marginTop: '1.5rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '13px', fontWeight: 300, letterSpacing: '0.08em',
          color: DUNKEL, textDecoration: 'none', opacity: 0.7,
        }}>
          {TELEFON}
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-phone { display: none !important; }
          .nav-burger { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-overlay { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
