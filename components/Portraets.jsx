'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';

/* Nevio am 21.09.2026: "packe 2 weitere Bilder rein und es soll
   durchlaufen langsam von links nach rechts, und wenn man es
   beschleunigen will, kann man es mit swipen beschleunigen."

   Aus der starren Reihe ist damit ein Laufband geworden. Sieben Bilder
   statt fuenf, und sie ziehen dauerhaft vorbei - auf dem Rechner wie
   auf dem Handy.

   Wie es gebaut ist, und warum so:

   Der Streifen ist ein ganz normaler waagerecht scrollbarer Kasten,
   und das Laufen entsteht nur dadurch, dass Javascript die
   Scrollposition Bild fuer Bild ein kleines Stueck weiterschiebt.
   Das klingt umstaendlicher als eine reine CSS-Animation, hat aber
   genau den Vorteil, den Nevio verlangt hat: Wischen ist damit das
   normale Scrollen des Browsers. Es fuehlt sich richtig an, hat
   Schwung und laeuft danach von selbst weiter. Mit einer
   CSS-Animation muesste man das Wischen nachbauen, und nachgebautes
   Wischen fuehlt sich auf einem Handy immer falsch an.

   Damit es nie an ein Ende stoesst, steht die Liste zweimal
   hintereinander. Sobald die erste Haelfte durchgelaufen ist, springt
   die Position um genau diese Haelfte zurueck - an dieser Stelle sieht
   das Bild identisch aus, der Sprung ist deshalb unsichtbar.         */

const bilder = [
  { src: '/images/Bild-76.webp',             b: 2000, h: 3000, alt: 'Braut unter einem Perlenschleier, Porträt' },
  { src: '/images/Bild-5.webp',              b: 2000, h: 3000, alt: 'Save-the-Date-Karten und die Ringschatulle auf hellem Stoff' },
  { src: '/images/paare/paar-kuss.webp',     b: 1600, h: 2400, alt: 'Ein Brautpaar küsst sich nach der Trauung, Schwarzweiß' },
  { src: '/images/Bild-33.webp',             b: 2000, h: 3000, alt: 'Brautpaar mit Champagner zwischen brennenden Kerzen' },
  { src: '/images/paare/kronleuchter.webp',  b: 1600, h: 2400, alt: 'Kronleuchter über dem Festsaal' },
  { src: '/images/paare/haende.webp',        b: 1600, h: 2400, alt: 'Die Hände des Brautpaars, ineinander gelegt' },
  { src: '/images/paare/paar-wand.webp',     b: 1600, h: 2400, alt: 'Das Brautpaar vor einer hellen Wand, ruhiger Moment' },
];

/* Pixel pro Sekunde. Bewusst langsam: der Streifen soll im Augenwinkel
   leben, nicht die Aufmerksamkeit vom Text wegziehen. */
const TEMPO = 18;

export default function Portraets() {
  const bahnRef = useRef(null);

  useEffect(() => {
    const el = bahnRef.current;
    if (!el) return;

    // Wer im Betriebssystem weniger Bewegung eingestellt hat, bekommt
    // einen stehenden Streifen. Bewegung ohne Not ist fuer manche
    // Menschen nicht nur Geschmack, sondern koerperlich unangenehm.
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (ruhig.matches) return;

    let laeuft = true;
    let letzte = 0;
    let bild = 0;
    let wartenBis = 0;

    /* Nur laufen, solange der Streifen ueberhaupt im Bild ist. Wer
       weiter unten die Preise liest, braucht keine Animation, die im
       Hintergrund Rechenzeit und Akku zieht. */
    let imBild = true;
    const beobachter = new IntersectionObserver(
      ([e]) => { imBild = e.isIntersecting; letzte = 0; },
      { threshold: 0 }
    );
    beobachter.observe(el);

    const anhalten = () => { wartenBis = performance.now() + 1200; };

    const schritt = (jetzt) => {
      if (!laeuft) return;
      const delta = letzte ? (jetzt - letzte) / 1000 : 0;
      letzte = jetzt;

      // Nach dem Wischen kurz nicht dazwischenfunken, damit der
      // Schwung des Fingers ungestoert auslaufen kann.
      if (imBild && jetzt >= wartenBis && !el.matches(':hover')) {
        el.scrollLeft += TEMPO * delta;
      }

      // Die Liste steht zweimal da. Ist die erste Haelfte durch,
      // genau um diese Haelfte zurueckspringen - dort sieht es gleich
      // aus, man sieht den Sprung nicht.
      const haelfte = el.scrollWidth / 2;
      if (haelfte > 0 && el.scrollLeft >= haelfte) el.scrollLeft -= haelfte;

      bild = requestAnimationFrame(schritt);
    };
    bild = requestAnimationFrame(schritt);

    el.addEventListener('touchstart', anhalten, { passive: true });
    el.addEventListener('touchmove', anhalten, { passive: true });
    el.addEventListener('wheel', anhalten, { passive: true });

    return () => {
      laeuft = false;
      cancelAnimationFrame(bild);
      beobachter.disconnect();
      el.removeEventListener('touchstart', anhalten);
      el.removeEventListener('touchmove', anhalten);
      el.removeEventListener('wheel', anhalten);
    };
  }, []);

  // Zweimal dieselbe Liste, damit der Streifen nie an ein Ende kommt.
  const lauf = [...bilder, ...bilder];

  return (
    <section className="abschnitt hell">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-4)' }}>Aus unseren Hochzeiten</p>
        </FadeIn>
      </div>

      {/* Der Streifen laeuft ueber die ganze Breite, nicht nur in der
          Bahn - ein Laufband, das an der Kante aufhoert, sieht aus wie
          ein Fehler und nicht wie eine Bewegung. */}
      <div className="portraet-reihe" ref={bahnRef} aria-label="Bilder aus unseren Hochzeiten">
        {lauf.map((b, i) => (
          <div className="portraet-kachel" key={`${b.src}-${i}`} aria-hidden={i >= bilder.length}>
            <Image
              src={b.src}
              alt={i < bilder.length ? b.alt : ''}
              width={b.b}
              height={b.h}
              quality={85}
              sizes="(max-width: 860px) 46vw, 240px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
