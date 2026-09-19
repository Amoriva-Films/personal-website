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

          {/* Vertikale gruen-Linie oben */}
          <div style={{ width: '1px', height: '32px', background: '#687850', opacity: 0.5, margin: '0 auto 2rem' }} />

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

          {/* Derselbe Knopf wie oben auf der Seite. Vorher stand hier nur ein
              kleiner Textlink - ausgerechnet an der Stelle, an der ein Paar
              nach der freien Terminlage fragt, war der Weg dorthin das
              Leiseste auf dem Bildschirm. */}
          <Link
            href="/anfrage"
            style={{
              display: 'inline-block', padding: '0.9rem 2.5rem',
              background: 'transparent', border: '1px solid #3B2F2A',
              color: '#3B2F2A', fontFamily: sans, fontSize: '12px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 300,
              transition: 'background 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B2F2A'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3B2F2A'; }}
          >
            Termin anfragen
          </Link>

          {/* Vertikale gruen-Linie unten */}
          <div style={{ width: '1px', height: '32px', background: '#687850', opacity: 0.5, margin: '2rem auto 0' }} />

        </div>
      </FadeIn>
    </section>
  );
}
