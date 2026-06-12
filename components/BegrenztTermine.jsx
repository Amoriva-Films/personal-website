'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

export default function BegrenztTermine() {
  return (
    <section style={{ padding: '4.5rem 1.5rem', background: '#3B2F2A', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C4973A', marginBottom: '1rem', fontWeight: 300 }}>
            Verfügbarkeit 2026
          </p>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: '#FAF9F7', lineHeight: 1.4, marginBottom: '1.25rem' }}>
            Wir begleiten pro Saison bewusst nur eine begrenzte Anzahl an Paaren.
          </h2>
          <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.8, color: '#C4A882', marginBottom: '2.25rem', fontWeight: 300 }}>
            So bekommt jede Hochzeit die Aufmerksamkeit die sie verdient. Schreibt uns an und wir schauen gemeinsam ob euer Termin noch verfügbar ist.
          </p>
          <a
            href="/anfrage"
            style={{
              display: 'inline-block', padding: '0.85rem 2.25rem',
              background: '#C4973A', color: '#FFFFFF',
              fontFamily: sans, fontSize: '12px', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              borderRadius: '2px', transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8A6420'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C4973A'; }}
          >
            Termin anfragen
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
