import Image from 'next/image';
import FadeIn from './FadeIn';

/* Laufband "Aus unseren Hochzeiten".

   Nevio: "Die Bilder sollen die ganze Zeit von links nach rechts laufen,
   automatisch als Animation."

   Die Bewegung macht jetzt eine reine CSS-Animation - KEIN Javascript.
   Davor schob ein Skript die Scrollposition Bild fuer Bild weiter. Das
   funktioniert zwar, haengt aber an requestAnimationFrame, und das laeuft
   in einem Tab im Hintergrund gar nicht. Eine CSS-Animation laeuft immer,
   auch wenn Javascript scheitert oder langsam laedt - und sie laesst sich
   nachmessen, ohne die Seite ansehen zu muessen.

   Wie die Endlosschleife entsteht: die Liste steht zweimal hintereinander,
   und die Spur wandert von -50% auf 0. Nach einem Durchlauf sieht das Bild
   exakt so aus wie am Anfang, der Sprung ist deshalb unsichtbar.

   Wischen geht weiterhin: der aeussere Kasten scrollt waagerecht wie
   jeder andere auch.                                                    */

const bilder = [
  { src: '/images/Bild-76.webp',             b: 2000, h: 3000, alt: 'Braut unter einem Perlenschleier, Porträt' },
  { src: '/images/Bild-5.webp',              b: 2000, h: 3000, alt: 'Save-the-Date-Karten und die Ringschatulle auf hellem Stoff' },
  { src: '/images/paare/paar-kuss.webp',     b: 1600, h: 2400, alt: 'Ein Brautpaar küsst sich nach der Trauung, Schwarzweiß' },
  { src: '/images/Bild-33.webp',             b: 2000, h: 3000, alt: 'Brautpaar mit Champagner zwischen brennenden Kerzen' },
  { src: '/images/paare/kronleuchter-v2.webp',  b: 1600, h: 2400, alt: 'Kronleuchter über dem Festsaal' },
  { src: '/images/paare/haende.webp',        b: 1600, h: 2400, alt: 'Die Hände des Brautpaars, ineinander gelegt' },
  { src: '/images/paare/paar-wand-v2.webp',     b: 1600, h: 2400, alt: 'Das Brautpaar vor einer hellen Wand, ruhiger Moment' },
];

export default function Portraets() {
  const lauf = [...bilder, ...bilder, ...bilder, ...bilder];

  return (
    <section className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-4)' }}>Aus unseren Hochzeiten</p>
        </FadeIn>
      </div>

      <div className="portraet-reihe" aria-label="Bilder aus unseren Hochzeiten">
        <div className="portraet-lauf">
          {lauf.map((b, i) => (
            <div className="portraet-kachel" key={`${b.src}-${i}`} aria-hidden={i >= bilder.length}>
              <Image
                src={b.src}
                alt={i < bilder.length ? b.alt : ''}
                width={b.b}
                height={b.h}
                quality={85}
                /* Nicht lazy: die Kacheln wandern staendig durchs Bild.
                   Lazy wuerde beim Durchlaufen leere Felder zeigen. */
                loading="eager"
                sizes="(max-width: 860px) 46vw, 240px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
