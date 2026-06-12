'use client';

import Link from 'next/link';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";
const brown = '#3B2F2A';

const numberedNav = [
  { nr: '01', label: 'Startseite',  href: '/'            },
  { nr: '02', label: 'Leistungen',  href: '/#leistungen' },
  { nr: '03', label: 'Über uns',    href: '/#founders'   },
  { nr: '04', label: 'Anfrage',     href: '/anfrage'     },
];

export default function Footer() {
  return (
    <footer style={{ background: '#F5F2ED' }}>

      {/* ── Hauptbereich: 3 Spalten ── */}
      <div
        className="footer-main-grid"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(64px, 7vw, 96px) 8% clamp(48px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 'clamp(2rem, 4vw, 6rem)',
          alignItems: 'start',
        }}
      >

        {/* ── Links: Kontakt ── */}
        <div>
          <span style={{
            display: 'block',
            fontFamily: sans,
            fontSize: '11px',
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
            color: '#8A7B6E',
            fontWeight: 300,
            marginBottom: '1.8rem',
          }}>
            Kontakt
          </span>

          <a
            href="mailto:booking@amoriva-films.de"
            style={{
              display: 'block',
              fontFamily: serif,
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              fontWeight: 300,
              color: brown,
              textDecoration: 'none',
              marginBottom: '0.6rem',
              transition: 'opacity 400ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.5'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            booking@amoriva-films.de
          </a>

          <a
            href="https://wa.me/4915565559747"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              fontFamily: sans,
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: '#8A7B6E',
              textDecoration: 'none',
              marginBottom: '2rem',
              transition: 'opacity 400ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.65'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            WhatsApp: +49 155 655 59747
          </a>

          <span style={{
            display: 'block',
            fontFamily: sans,
            fontSize: '13px',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: '#8A7B6E',
            marginBottom: '2rem',
          }}>
            Wolfsburg, Niedersachsen
          </span>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="https://www.instagram.com/amorivafilms/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid rgba(59,47,42,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.7, transition: 'opacity 400ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '15px', height: '15px', fill: brown }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://wa.me/4915565559747"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid rgba(59,47,42,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.7, transition: 'opacity 400ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '15px', height: '15px', fill: brown }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Mitte: Logo + Ornament ── */}
        <div
          className="footer-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '1px', height: '48px', background: 'rgba(59,47,42,0.18)', marginBottom: '24px' }} />

          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ marginBottom: '20px', opacity: 0.4 }}>
            <circle cx="22" cy="22" r="18" stroke={brown} strokeWidth="0.6" />
            <circle cx="22" cy="22" r="10" stroke={brown} strokeWidth="0.6" />
            <line x1="22" y1="4" x2="22" y2="40" stroke={brown} strokeWidth="0.6" />
            <line x1="4" y1="22" x2="40" y2="22" stroke={brown} strokeWidth="0.6" />
            <line x1="9.37" y1="9.37" x2="34.63" y2="34.63" stroke={brown} strokeWidth="0.4" />
            <line x1="34.63" y1="9.37" x2="9.37" y2="34.63" stroke={brown} strokeWidth="0.4" />
          </svg>

          <span style={{
            fontFamily: serif,
            fontSize: 'clamp(17px, 1.8vw, 24px)',
            fontWeight: 400,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: brown,
            marginBottom: '24px',
            whiteSpace: 'nowrap',
          }}>
            Amoriva Films
          </span>

          <div style={{ width: '1px', height: '48px', background: 'rgba(59,47,42,0.18)' }} />
        </div>

        {/* ── Rechts: Nummerierte Navigation ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          {numberedNav.map(({ nr, label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                textDecoration: 'none',
                transition: 'opacity 400ms ease',
                opacity: 0.75,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.75'; }}
            >
              <span style={{
                fontFamily: sans,
                fontSize: '10px',
                fontWeight: 300,
                letterSpacing: '0.10em',
                color: '#8A7B6E',
              }}>
                {nr}
              </span>
              <span style={{
                fontFamily: serif,
                fontSize: 'clamp(20px, 2.2vw, 30px)',
                fontWeight: 300,
                color: brown,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
              }}>
                {label}
              </span>
              <span style={{ fontFamily: sans, fontSize: '10px', color: '#8A7B6E', opacity: 0.4 }}>
                /
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Schwarzer Bodenstreifen ── */}
      <div
        className="footer-black-bar"
        style={{
          background: '#1A1410',
          padding: '16px 8%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
        }}
      >
        <span style={{
          fontFamily: sans,
          fontSize: '11px',
          fontWeight: 300,
          letterSpacing: '0.06em',
          color: 'rgba(246,241,235,0.40)',
        }}>
          © 2026 Amoriva Films
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Impressum',   href: '/impressum'   },
            { label: 'Datenschutz', href: '/datenschutz' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: sans,
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: 'rgba(246,241,235,0.40)',
                textDecoration: 'none',
                transition: 'color 400ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(246,241,235,0.85)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(246,241,235,0.40)'; }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-center {
            order: -1;
          }
          .footer-main-grid > div:last-child {
            align-items: center !important;
          }
          .footer-black-bar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
