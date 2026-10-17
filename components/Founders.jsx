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
    /* Korrektur 26.09.2026, zweiter Anlauf. Mein Zentrieren davor war
       falsch: es hat Danilo nach unten geschoben, dadurch sass sein
       Kopf 50 px tiefer als Nevios und er wirkte kleiner und weiter
       weg. Das richtige Mass ist nicht die Bildmitte, sondern die
       Stirnlinie - Portraits nebeneinander liest man ueber die Koepfe.
       Gemessen ueber die Hautflaeche, weil Haare und Kragen jede
       andere Messung verfaelschen: die Wangenbreite ist bei beiden
       fast gleich (68,4 zu 66,5 px), die Koepfe sind also gleich gross.
       Nur die Hoehe stimmte nicht. Jetzt liegen beide Stirnkanten bei
       42 px im Rahmen. */
    hoehe: '99.1%', oben: '-11.8%', links: '3.55%', grund: 'rgb(249,249,251)',
  },
];

export default function Founders() {
  return (
    <section id="founders" className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Wer wir sind</p>
          <h2 className="t-gross" style={{ maxWidth: '20ch', marginBottom: 'var(--luft-4)' }}>
            Zwei Blicke. Eine <span className="kursiv">gemeinsame Haltung.</span>
          </h2>
        </FadeIn>

        {/* Zwei Portraets, die sich wie ein Stapel ueberlappen. Beim Hover
            kommt das jeweilige nach vorne (z-index + Hebung) und gibt den
            Text frei. Auf Touch stehen beide offen. Die Bild-Zuschnitte
            (hoehe/oben/links je Person) bleiben wie gemessen. */}
        <FadeIn>
          <div className="founder-stapel">
            {leute.map((p, i) => (
              <article key={p.name} className={`founder-karte${i === 1 ? ' founder-karte--b' : ''}`}>
                <div className="founder-bild" style={{ background: p.grund }}>
                  <Image
                    src={p.bild}
                    alt={p.name}
                    width={1086}
                    height={1448}
                    sizes="400px"
                    className="portraet-bild"
                    quality={85}
                    style={{ position: 'absolute', height: p.hoehe, width: 'auto', top: p.oben, left: p.links }}
                  />
                  <div className="founder-overlay">
                    <p className="founder-rolle">{p.rolle}</p>
                    <h3 className="founder-name">{p.name}</h3>
                    <p className="founder-bio">{p.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .founder-stapel {
          position: relative;
          display: flex; justify-content: center; align-items: flex-start;
          padding-top: var(--luft-2);
        }
        .founder-karte {
          position: relative;
          width: min(44%, 400px);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 10px 30px -22px rgba(20,20,19,0.35);
          transition: transform 420ms var(--ease), box-shadow 420ms var(--ease);
          z-index: 2;
        }
        .founder-karte--b { margin-left: -9%; z-index: 1; }
        @media (hover: hover) {
          .founder-karte:hover {
            z-index: 5;
            transform: translateY(-10px) scale(1.035);
            box-shadow: 0 34px 64px -30px rgba(20,20,19,0.5);
          }
        }
        .founder-bild {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--radius);
        }
        .founder-overlay {
          position: absolute; inset-inline: 0; bottom: 0;
          padding: var(--luft-3);
          background: linear-gradient(to top, rgba(20,20,19,0.82) 0%, rgba(20,20,19,0.45) 45%, rgba(20,20,19,0) 100%);
          color: #f4f4f2;
        }
        .founder-rolle {
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: 0.6875rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(244,244,242,0.72); margin-bottom: 0.3rem;
        }
        .founder-name {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(1.25rem, 2vw, 1.625rem); font-weight: 400; line-height: 1.1;
          color: #fff;
        }
        .founder-bio {
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: 0.8125rem; line-height: 1.55; color: rgba(244,244,242,0.88);
          max-height: 0; opacity: 0; overflow: hidden; margin-top: 0;
          transition: max-height 480ms var(--ease), opacity 320ms var(--ease), margin-top 320ms var(--ease);
        }
        @media (hover: hover) {
          .founder-karte:hover .founder-bio { max-height: 12rem; opacity: 1; margin-top: 0.55rem; }
        }
        @media (hover: none) {
          .founder-bio { max-height: 12rem; opacity: 1; margin-top: 0.55rem; }
        }
        @media (max-width: 760px) {
          .founder-stapel { flex-direction: column; align-items: center; }
          .founder-karte { width: min(92%, 360px); }
          .founder-karte--b { margin-left: 0; margin-top: var(--luft-3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .founder-karte, .founder-bio { transition: none; }
        }
      ` }} />
    </section>
  );
}
