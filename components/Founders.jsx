'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

/* Bei einem Zwei-Personen-Betrieb sind die Gesichter das staerkste
   Vertrauenselement, das es gibt. Deshalb gross. */

const leute = [
  {
    name: 'Nevio Mastrogiorgio',
    rolle: 'Founder · Beratung & kreative Leitung',
    bio: 'Nevio begleitet euch vom ersten Gespräch bis weit über den Hochzeitstag hinaus. Mit seiner ruhigen und klaren Art sorgt er dafür, dass ihr euch verstanden, sicher und vollkommen aufgehoben fühlt.',
    bild: '/images/nevio.webp',
    position: 'center 80%',
  },
  {
    name: 'Danilo Buonafede',
    rolle: 'Co Founder · Cinematography & Bildgestaltung',
    bio: 'Danilo ist der Blick hinter der Kamera. Mit seinem Gespür für Licht, Bewegung und echte Emotionen entstehen die Momente, die euren Film später lebendig machen.',
    bild: '/images/danilo.webp',
    position: 'center top',
  },
];

export default function Founders() {
  return (
    <section id="founders" className="abschnitt hell-2">
      <div className="mitte">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: '1.5rem' }}>Wer wir sind</p>
          <h2 className="t-gross" style={{ maxWidth: '16ch', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Zwei Blicke. Eine gemeinsame Haltung.
          </h2>
        </FadeIn>

        <div className="zwei-spalten">
          {leute.map((p) => (
            <FadeIn key={p.name}>
              <div>
                <div style={{
                  position: 'relative', width: '100%',
                  aspectRatio: '4 / 5', overflow: 'hidden',
                  marginBottom: '1.75rem', background: 'var(--papier)',
                }}>
                  <Image
                    src={p.bild}
                    alt={p.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    style={{ objectFit: 'cover', objectPosition: p.position }}
                  />
                </div>
                <p className="t-label" style={{ marginBottom: '0.6rem' }}>{p.rolle}</p>
                <h3 className="t-gross" style={{ marginBottom: '1rem' }}>{p.name}</h3>
                <p className="t-text t-grau">{p.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
