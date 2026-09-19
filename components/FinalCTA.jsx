'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function FinalCTA() {
  return (
    <section id="anfrage" className="abschnitt dunkel">
      <FadeIn>
        <div className="mitte-schmal" style={{ textAlign: 'center' }}>
          <p className="t-label" style={{ marginBottom: '1.5rem' }}>Anfrage stellen</p>
          <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)', marginBottom: '1.5rem' }}>
            Euer Tag verdient mehr als schöne Bilder.
          </h2>
          <p className="t-text" style={{ color: 'var(--grau-dunkel)', margin: '0 auto 2.75rem' }}>
            Schreibt uns kurz, erzählt uns von eurem Tag und wir schauen ob
            wir zueinander passen. Kein Druck, kein Verkaufsgespräch.
          </p>

          {/* Ein Hauptweg, die beiden anderen daneben als feine Links. */}
          <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>

          <div style={{
            display: 'flex', gap: '2rem', justifyContent: 'center',
            flexWrap: 'wrap', marginTop: '2.25rem',
          }}>
            <a href="mailto:booking@amoriva-films.de" style={{
              fontSize: 'var(--schrift-fein)', color: 'var(--grau-dunkel)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(244,244,242,0.25)', paddingBottom: '2px',
            }}>
              booking@amoriva-films.de
            </a>
            <a
              href="https://wa.me/4915565559747?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Arbeit."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'var(--schrift-fein)', color: 'var(--grau-dunkel)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(244,244,242,0.25)', paddingBottom: '2px',
              }}
            >
              WhatsApp schreiben
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
