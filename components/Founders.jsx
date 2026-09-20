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
    <section id="founders" className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Wer wir sind</p>
          <h2 className="t-gross" style={{ maxWidth: '16ch', marginBottom: 'var(--luft-5)' }}>
            Zwei Blicke. Eine gemeinsame Haltung.
          </h2>
        </FadeIn>

        <div className="zwei-spalten">
          {leute.map((p) => (
            <FadeIn key={p.name}>
              <div>
                <div style={{
                  position: 'relative', width: '100%',
                  aspectRatio: '3 / 2', overflow: 'hidden',
                  marginBottom: 'var(--luft-3)', background: 'var(--papier)',
                }}>
                  <Image
                    src={p.bild}
                    alt={p.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    style={{ objectFit: 'cover', objectPosition: p.position }}
                  />
                </div>
                <p className="t-label" style={{ marginBottom: 'var(--luft-1)' }}>{p.rolle}</p>
                <h3 className="t-gross" style={{ marginBottom: 'var(--luft-2)' }}>{p.name}</h3>
                <p className="t-text t-grau">{p.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
