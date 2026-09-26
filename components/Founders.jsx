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
   ein Rest. Der traegt den Studiohintergrund, dadurch sieht man die
   Naht nicht.

   Nevio am 26.09.2026: "der hintergrund von danilo und mir ist
   unterschiedlich". Stimmte, und zwar aus zwei Gruenden. Gemessen:
   Nevios Hintergrund lag flach bei rgb(248,248,250) mit leichtem Blau,
   Danilos bei rgb(246,246,246) neutral - und er lief nach unten auf
   rgb(229,229,229) aus. Diese Verlaufskante stiess im Rahmen auf eine
   flache Fuellfarbe, dadurch stand um sein Bild ein sichtbarer Kasten.

   Behoben in den Bilddateien selbst, nicht per CSS: der Studiogrund
   beider Fotos ist auf genau rgb(249,249,251) eingeebnet. Die Maske
   dafuer wurde vom Bildrand her geflutet, also ist nur zusammenhaengende
   Hintergrundflaeche betroffen - eine Lichtkante im Gesicht oder das
   Silber des Laptops haengen nicht am Rand und blieben unberuehrt.
   Nachgemessen: beide Bilder an allen sechs Randpunkten identisch,
   Spanne 0 Stufen.

   Zweite Runde, 26.09.2026: Danilo hatte rechts von sich zusaetzlich
   einen weichen Schlagschatten aus der Ausleuchtung. Der ist jetzt
   auch weg (danilo-v3). Der Trenner dafuer ist die Buntheit, nicht die
   Helligkeit: Haut ist farbig (gemessen 79 im Mittel), Studiogrund und
   Schatten sind neutral (unter 8). Dazu eine Kantenpruefung, damit der
   Flutvorgang an der Silhouette stoppt statt durch sie hindurchzulaufen.

   Ein erster Versuch ueber die Helligkeit hat beide Gesichter
   ausgebrannt - Stirn und Nase sind heller als jede brauchbare
   Schwelle. Deshalb entscheidet hier die Farbe.

   Nevios Bild bleibt absichtlich unangetastet: sein Grund war schon
   flach, und derselbe Vorgang frisst die Silberflaeche des Laptops weg.
   Die Originale liegen in .bilder-original/. */

const leute = [
  {
    name: 'Nevio Mastrogiorgio',
    rolle: 'Founder · Beratung & kreative Leitung',
    bio: 'Nevio begleitet euch vom ersten Gespräch bis weit über den Hochzeitstag hinaus. Mit seiner ruhigen und klaren Art sorgt er dafür, dass ihr euch verstanden, sicher und vollkommen aufgehoben fühlt.',
    bild: '/images/nevio-v2.webp',
    hoehe: '92.7%', oben: '-0.3%', links: '5.5%', grund: 'rgb(249,249,251)',
  },
  {
    name: 'Danilo Buonafede',
    rolle: 'Co Founder · Cinégraphie & Bildgestaltung',
    bio: 'Danilo ist der Blick hinter der Kamera. Mit seinem Gespür für Licht, Bewegung und echte Emotionen entstehen die Momente, die euren Film später lebendig machen.',
    bild: '/images/danilo-v3.webp',
    /* Nevio am 26.09.2026: Danilo mittiger setzen. Nachgemessen im
       Rahmen von 360x450: sein Schwerpunkt sass bei 196 statt bei 180,
       und das Bild hing 42 px zu hoch - unten blieb ein leerer Streifen,
       oben war sein Kopf angeschnitten. Jetzt waagerecht und senkrecht
       mittig. */
    hoehe: '101.9%', oben: '-1%', links: '0%', grund: 'rgb(249,249,251)',
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
                  /* Nevio am 25.09.2026: die Bilder sollen mittig ueber dem
                     Text stehen. Das Bild ist hoechstens 360 px breit, die
                     Textspalte darunter deutlich breiter - links buendig
                     sass es dadurch sichtbar aus der Mitte. */
                  marginInline: 'auto',
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
            quality={85}
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
