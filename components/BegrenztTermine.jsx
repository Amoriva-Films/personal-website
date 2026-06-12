'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

export default function BegrenztTermine() {
  return (
    <section style={{ padding: '4.5rem 1.5rem', background: '#0F0D0C', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          {/* Dünne goldene Linie oben */}
          <div style={{ width: '1.5rem', height: '1px', background: '#C4973A', margin: '0 auto 1.75rem', opacity: 0.7 }} />
          <p style={{ fontFamily: sans, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C4973A', marginBottom: '1.5rem', opacity: 0.85 }}>
            Verfügbarkeit 2026
          </p>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 300, color: '#F5F0EB', lineHeight: 1.45, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Wir begleiten pro Saison bewusst<br />
            nur eine begrenzte Anzahl an Paaren.
          </h2>
          <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.85, color: '#A89880', marginBottom: '2.75rem', fontWeight: 300 }}>
            So bekommt jede Hochzeit die Aufmerksamkeit die sie verdient. Schreibt uns an und wir schauen gemeinsam ob euer Termin noch verfügbar ist.
          </p>
          <a
            href="/anfrage"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2.5rem',
              background: 'transparent',
              border: '1px solid rgba(196, 151, 58, 0.5)',
              color: '#C4973A',
              fontFamily: sans,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#C4973A';
              e.currentTarget.style.background = 'rgba(196, 151, 58, 0.08)';
              e.currentTarget.style.color = '#D4A84A';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(196, 151, 58, 0.5)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#C4973A';
            }}
          >
            Termin anfragen
          </a>
          {/* Dünne goldene Linie unten */}
          <div style={{ width: '1.5rem', height: '1px', background: '#C4973A', margin: '2.75rem auto 0', opacity: 0.7 }} />
        </div>
      </FadeIn>
    </section>
  );
}
