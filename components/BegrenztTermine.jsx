'use client';

import FadeIn from './FadeIn';
import Link from 'next/link';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

export default function BegrenztTermine() {
  return (
    <section style={{ padding: '5rem 1.5rem', background: '#FAF7F4', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>

          {/* Vertikale gold-Linie oben */}
          <div style={{ width: '1px', height: '32px', background: '#C4973A', opacity: 0.5, margin: '0 auto 2rem' }} />

          <p style={{ fontFamily: sans, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B0A498', marginBottom: '1.5rem', fontWeight: 400 }}>
            Verfügbarkeit 2026 / 2027
          </p>

          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.35rem', fontWeight: 400, color: '#2C1F18', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            Für 2026 und 2027 haben wir
            noch ein paar Termine frei.
          </h2>

          <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.85, color: '#9A8C82', marginBottom: '2rem', fontWeight: 300 }}>
            Schreibt uns kurz euer Datum und wir schauen ob es passt.
          </p>

          <Link
            href="/anfrage"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: sans, fontSize: '12px', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#C4973A', textDecoration: 'none',
              fontWeight: 400, transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.6'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Termin anfragen
            <span style={{ fontSize: '14px', lineHeight: 1 }}>→</span>
          </Link>

          {/* Vertikale gold-Linie unten */}
          <div style={{ width: '1px', height: '32px', background: '#C4973A', opacity: 0.5, margin: '2rem auto 0' }} />

        </div>
      </FadeIn>
    </section>
  );
}
