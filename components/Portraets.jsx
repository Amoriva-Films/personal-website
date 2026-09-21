'use client';

import Image from 'next/image';
import FadeIn from './FadeIn';

/* Nevio am 21.09.2026: "mach so eine kleine Portraet-Section mit ein
   paar ausgewaehlten Bildern, aber die darf nicht zu gross sein."

   Deshalb eine flache Reihe statt eines Rasters: fuenf Bilder
   nebeneinander, jedes rund 240 px breit. Der ganze Abschnitt bleibt
   unter einem Drittel Bildschirmhoehe.

   Auf dem Handy wird daraus ein Streifen zum Wischen. Fuenf Bilder
   untereinander waeren dort fuenf Bildschirmseiten - genau das, was
   hier nicht passieren soll.

   Die Auswahl mischt bewusst zwei Hochzeiten: drei aus der Galerie von
   Celine & Alex, zwei aus den Bildern, die schon vorher auf der Seite
   standen. Eine Firma, die nur eine Hochzeit zeigen kann, sieht aus wie
   eine Firma, die nur eine hatte.                                     */

const bilder = [
  { src: '/images/Bild-76.webp',          b: 2000, h: 3000, alt: 'Braut unter dem Schleier, Porträt' },
  { src: '/images/paare/paar-kuss.webp',  b: 1600, h: 2400, alt: 'Ein Brautpaar küsst sich nach der Trauung' },
  { src: '/images/Bild-33.webp',          b: 2000, h: 3000, alt: 'Brautpaar stößt mit Champagner an' },
  { src: '/images/paare/braut.webp',      b: 1600, h: 2400, alt: 'Eine Braut im Kleid, kurz vor der Trauung' },
  { src: '/images/paare/haende.webp',     b: 1600, h: 2400, alt: 'Die Hände des Brautpaars, ineinander gelegt' },
];

export default function Portraets() {
  return (
    <section className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-4)' }}>Aus unseren Hochzeiten</p>
        </FadeIn>

        <div className="portraet-reihe">
          {bilder.map((b, i) => (
            <FadeIn key={b.src} index={i}>
              <div className="portraet-kachel">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.b}
                  height={b.h}
                  quality={90}
                  sizes="(max-width: 860px) 46vw, 240px"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
