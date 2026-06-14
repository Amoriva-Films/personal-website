'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

const fragen = [
  {
    frage: 'Was kostet ein Hochzeitsfilm bei euch?',
    antwort: 'Unsere Hochzeitsfilme beginnen ab 1.600 Euro. Hochzeitsfotografie ab 1.400 Euro. Das Kombi-Paket aus Film und Foto ab 2.600 Euro. Was genau in eurem Paket steckt und welches Angebot zu eurem Tag passt besprechen wir gerne persönlich. Schreibt uns einfach an.',
  },
  {
    frage: 'Wie lange dauert es bis wir den Film bekommen?',
    antwort: 'Innerhalb von 6 bis 8 Wochen nach eurer Hochzeit erhaltet ihr euren fertigen Film und alle Fotos in einer privaten Online-Galerie. Bei besonderen Terminwünschen sprechen wir das gerne vorab ab.',
  },
  {
    frage: 'Was passiert wenn einer von euch am Hochzeitstag krank wird?',
    antwort: 'Euer Hochzeitstag kann nicht verschoben werden. Das wissen wir. Deshalb haben wir für diesen Fall Kontakte zu erfahrenen Kollegen in Niedersachsen und der Region. Sollte wirklich etwas Unvorhergesehenes passieren sorgen wir dafür dass jemand Vertrauenswürdiges für euch da ist.',
  },
  {
    frage: 'Seid ihr nur in Wolfsburg tätig?',
    antwort: 'Nein, wir sind international unterwegs. Wolfsburg ist unser Zuhause, aber wir waren schon in Deutschland, Österreich, der Schweiz und südeuropäischen Ländern. Wo eure Hochzeit ist, schauen wir uns gemeinsam an. Anreisekosten sprechen wir offen im Vorfeld ab.',
  },
  {
    frage: 'Wie viele Hochzeiten begleitet ihr pro Jahr?',
    antwort: 'Wir halten unsere Buchungen bewusst begrenzt. So bleibt jede Hochzeit eine Einzelanfertigung und keine Routine. Ihr arbeitet direkt mit uns und nicht mit einem großen Agenturteam das euch kurz vor der Hochzeit zum ersten Mal trifft.',
  },
  {
    frage: 'Kann ich die Musik für den Film mitbestimmen?',
    antwort: 'Ja. In unserem zweiten Gespräch vor der Hochzeit besprechen wir zusammen welchen Stil euer Film haben soll und welche Musik dazu passt. Wir haben Zugang zu lizenzierten Musikbibliotheken und können auch auf eure Vorschläge eingehen.',
  },
];

export default function FAQ() {
  const [offen, setOffen] = useState(null);

  return (
    <section style={{ padding: '6rem 1.5rem', background: '#FAFAF8', borderTop: '0.5px solid #E8E2DC' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ textAlign: 'center', fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A7B6F', marginBottom: '1rem', fontWeight: 300 }}>
            Häufige Fragen
          </p>
          <h2 style={{ textAlign: 'center', fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#3B2F2A', marginBottom: '3.5rem' }}>
            Was ihr wissen wollt.
          </h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {fragen.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ borderBottom: '0.5px solid #E8E2DC' }}>
                <button
                  onClick={() => setOffen(offen === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '1.5rem 0',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
                  }}
                >
                  <span style={{ fontFamily: sans, fontSize: '16px', fontWeight: 400, color: '#3B2F2A', lineHeight: 1.4 }}>
                    {f.frage}
                  </span>
                  <span style={{
                    fontSize: '20px', color: '#C4973A', flexShrink: 0,
                    transition: 'transform 0.25s ease',
                    transform: offen === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block', lineHeight: 1,
                  }}>
                    +
                  </span>
                </button>
                {offen === i && (
                  <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.8, color: '#6B5E57', paddingBottom: '1.5rem', margin: 0, fontWeight: 300 }}>
                    {f.antwort}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
