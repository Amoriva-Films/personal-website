'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";

const fragen = [
  {
    frage: 'Was kostet ein Hochzeitsfilm bei euch?',
    antwort: 'Film ab 1.600 Euro, Foto ab 1.400 Euro, beides zusammen ab 2.600 Euro. Was genau zu eurem Tag passt, klären wir im Gespräch. Schreibt uns einfach kurz.',
  },
  {
    frage: 'Wie lange dauert es bis wir den Film bekommen?',
    antwort: 'In der Regel 6 bis 8 Wochen. Manchmal etwas früher. Ihr bekommt alles in einer privaten Galerie die ihr mit wem ihr wollt teilen könnt.',
  },
  {
    frage: 'Was passiert wenn einer von euch am Hochzeitstag krank wird?',
    antwort: 'Ja, daran denken wir auch. Falls wirklich etwas passiert haben wir Kollegen in der Region auf die wir zählen können. War noch nie nötig, aber wir haben einen Plan.',
  },
  {
    frage: 'Seid ihr nur in Wolfsburg tätig?',
    antwort: 'Nein. Wir fahren dahin wo eure Hochzeit ist. Niedersachsen ist unser Zuhause, aber wir sind auch gern woanders. Anreise klären wir offen im Vorfeld.',
  },
  {
    frage: 'Wie viele Hochzeiten begleitet ihr pro Jahr?',
    antwort: 'Wenige. Das ist Absicht. So arbeiten wir lieber als mehr zu nehmen und weniger zu geben.',
  },
  {
    frage: 'Kann ich die Musik für den Film mitbestimmen?',
    antwort: 'Klar. Was zu euch passt entscheiden nicht wir alleine. Das besprechen wir gemeinsam bevor es losgeht.',
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
