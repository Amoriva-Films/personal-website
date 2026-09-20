'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function FinalCTA() {
  return (
    <section id="anfrage" className="abschnitt dunkel">
      <FadeIn>
        <div className="bahn lesebreite">
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Anfrage stellen</p>
          {/* Die Schlusszeile ist die einzige Stelle, an der die Schrift
              ganz gross werden darf. Auf amoriva.app steht dort 80 px.
              Wenn jede Ueberschrift gross ist, ist keine gross.        */}
          <h2 style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'var(--schrift-riesig)', fontWeight: 400,
            lineHeight: 0.98, letterSpacing: 'var(--laufweite-eng)',
            color: 'var(--auf-dunkel)', marginBottom: 'var(--luft-3)',
            textWrap: 'balance',
          }}>
            Euer Tag verdient mehr als <span className="kursiv">schöne Bilder.</span>
          </h2>
          <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginBottom: 'var(--luft-4)' }}>
            Schreibt uns kurz, erzählt uns von eurem Tag und wir schauen ob
            wir zueinander passen. Kein Druck, kein Verkaufsgespräch.
          </p>

          {/* Ein Hauptweg, die beiden anderen daneben als feine Links. */}
          <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>

          <div style={{
            display: 'flex', gap: 'var(--luft-4)', justifyContent: 'flex-start',
            flexWrap: 'wrap', marginTop: 'var(--luft-4)',
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
