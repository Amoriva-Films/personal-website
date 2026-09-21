'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

/* Bei einem Zwei-Personen-Betrieb sind die Gesichter das staerkste
   Vertrauenselement, das es gibt. Deshalb gross. */

/* Nevio am 21.09.2026: "es sieht aus, als ob ich zwei Koepfe groesser
   waere". Stimmt, und es liegt an den Aufnahmen, nicht am Layout. Beide
   Dateien sind 1086 x 1448, aber unterschiedlich weit weg fotografiert.
   Gemessen ueber die Helligkeit gegen den weissen Studiohintergrund:

     Nevio   Kopf beginnt bei  9,0 % der Bildhoehe, fuellt 90,6 %
     Danilo  Kopf beginnt bei 17,2 % der Bildhoehe, fuellt 82,4 %

   Mit demselben Ausschnitt fuer beide kann das nie passen. Deshalb
   traegt jeder seine eigenen Werte, ausgerechnet so, dass in BEIDEN
   Bildern der Kopf bei 8 % des Rahmens beginnt und die Person 84 % der
   Rahmenhoehe fuellt. Danilos Bild wird dafuer 10 % groesser gezeigt.

   Weil die Bilder schmaler sind als der Rahmen, bleibt links und rechts
   ein Rest. Der traegt den gemessenen Studiohintergrund des jeweiligen
   Bildes, dadurch sieht man die Naht nicht. */

const leute = [
  {
    name: 'Nevio Mastrogiorgio',
    rolle: 'Founder · Beratung & kreative Leitung',
    bio: 'Nevio begleitet euch vom ersten Gespräch bis weit über den Hochzeitstag hinaus. Mit seiner ruhigen und klaren Art sorgt er dafür, dass ihr euch verstanden, sicher und vollkommen aufgehoben fühlt.',
    bild: '/images/nevio.webp',
    hoehe: '92.7%', oben: '-0.3%', links: '5.5%', grund: 'rgb(249,249,251)',
  },
  {
    name: 'Danilo Buonafede',
    rolle: 'Co Founder · Cinematography & Bildgestaltung',
    bio: 'Danilo ist der Blick hinter der Kamera. Mit seinem Gespür für Licht, Bewegung und echte Emotionen entstehen die Momente, die euren Film später lebendig machen.',
    bild: '/images/danilo.webp',
    hoehe: '101.9%', oben: '-9.5%', links: '4.4%', grund: 'rgb(246,246,246)',
  },
];

export default function Founders() {
  return (
    <section id="founders" className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Wer wir sind</p>
          <h2 className="t-gross" style={{ maxWidth: '20ch', marginBottom: 'var(--luft-5)' }}>
            Zwei Blicke. Eine <span className="kursiv">gemeinsame Haltung.</span>
          </h2>
        </FadeIn>

        <div className="zwei-spalten">
          {leute.map((p) => (
            <FadeIn key={p.name}>
              <div>
                {/* Nevio: "macht unsere Bilder kleiner". Der Rahmen war
                    quadratisch und 628 px breit. Jetzt hoechstens 360 px
                    im Hochformat, also gut ein Drittel kleiner. */}
                <div className="portraet" style={{
                  position: 'relative', width: '100%', maxWidth: 360,
                  aspectRatio: '4 / 5', overflow: 'hidden',
                  marginBottom: 'var(--luft-3)',
                  background: p.grund, borderRadius: 'var(--radius)',
                }}>
                  <Image
                    src={p.bild}
                    alt={p.name}
                    width={1086}
                    height={1448}
                    sizes="360px"
                    className="portraet-bild"
                    style={{
                      position: 'absolute',
                      height: p.hoehe, width: 'auto',
                      top: p.oben, left: p.links,
                    }}
            quality={90}
                  />
                </div>
                <p className="t-label" style={{ marginBottom: 'var(--luft-1)' }}>{p.rolle}</p>
                {/* War t-gross (bis 56 px). Ein Name ist keine
                    Abschnitts-Ueberschrift. */}
                <h3 className="t-mittel" style={{ marginBottom: 'var(--luft-2)' }}>{p.name}</h3>
                <p className="t-text t-grau">{p.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
