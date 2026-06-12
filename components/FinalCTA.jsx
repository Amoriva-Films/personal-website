'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

export default function FinalCTA() {
  return (
    <section id="anfrage" style={{ padding: '7rem 1.5rem', background: '#FAF9F7', textAlign: 'center', borderTop: '0.5px solid #E8E2DC' }}>
      <FadeIn>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A7B6F', marginBottom: '1.5rem', fontWeight: 300 }}>
            Anfrage stellen
          </p>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 300, color: '#3B2F2A', lineHeight: 1.3, marginBottom: '1.5rem' }}>
            Euer Tag verdient mehr als schöne Bilder.
          </h2>
          <div style={{ width: '2.5rem', height: '1px', background: '#C4973A', margin: '0 auto 1.75rem' }} />
          <p style={{ fontFamily: sans, fontSize: '16px', lineHeight: 1.85, color: '#6B5E57', marginBottom: '2.5rem', fontWeight: 300 }}>
            Schreibt uns kurz, erzählt uns von eurem Tag und wir schauen ob wir zueinander passen. Kein Druck, kein Verkaufsgespräch.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:hallo@amoriva-films.de"
              style={{
                display: 'inline-block', padding: '0.9rem 2.25rem',
                background: '#3B2F2A', color: '#FAF9F7',
                fontFamily: sans, fontSize: '12px', letterSpacing: '0.15em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5A4A42'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3B2F2A'; }}
            >
              E-Mail schreiben
            </a>
            <a
              href="https://wa.me/4915565559747?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Arbeit."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '0.9rem 2.25rem',
                background: 'transparent', border: '1px solid #3B2F2A',
                color: '#3B2F2A', fontFamily: sans, fontSize: '12px',
                letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3B2F2A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3B2F2A'; }}
            >
              WhatsApp schreiben
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
