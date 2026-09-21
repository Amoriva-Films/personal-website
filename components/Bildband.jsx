'use client';

import Image from 'next/image';

/* Ein einzelnes Bild ueber die volle Breite, als Atempause zwischen zwei
   Textabschnitten. Kein Raster, keine Galerie - ein Bild.

   Es ist absichtlich flach (21:9 auf dem Rechner): es soll den Lesefluss
   unterbrechen, nicht eine eigene Bildschirmseite fuellen. */

export default function Bildband() {
  return (
    <section aria-hidden="true" className="bildband">
      <Image
        src="/images/paare/trauung-weit.webp"
        alt=""
        width={1024}
        height={683}
        sizes="100vw"
        className="bildband-bild"
            quality={80}
      />
    </section>
  );
}
