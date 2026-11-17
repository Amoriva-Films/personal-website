'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { leistungen, marke } from '@/content/texte';

/* Fotokarte mit Bogenbild, Kordel, Wachssiegel und rundem Stempel.
   Stand frueher links neben den Leistungen (Vorbild "Wedding Sessions"),
   seit 17.11.2026 unten links im Fuss (Nevio: die Leistungen-Karte soll
   breiter werden, die Fotokarte wandert in den Footer).
   Ohne das blasse Hintergrundfoto: auf dem dunklen Fuss reicht die Karte.
   Echtes Material: Kordel und Siegel sind Fotos (Figma-KI), der
   Olivenzweig im Stempel eine Tuschezeichnung. */

const STEMPEL = `${marke.name} · Hochzeitsfilm & Fotografie · Wolfsburg · `;

function Stempel() {
  return (
    <div className="fk-stempel" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs><path id="fk-stempel-kreis" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth=".8" />
        <text><textPath href="#fk-stempel-kreis" textLength="482">{STEMPEL.toUpperCase()}</textPath></text>
      </svg>
      <span className="v-zeichnung fk-stempel-zweig" style={{ '--bild': 'url(/images/vintage/olive.webp)' }} />
    </div>
  );
}

export default function Fotokarte() {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <div ref={ref} className="fk">
      <motion.div
        className="fk-karte"
        initial={{ y: 24, opacity: 0, rotate: -2 }}
        animate={sichtbar ? { y: 0, opacity: 1, rotate: -2 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="fk-bogen">
          <Image src={leistungen.bild.src} alt={leistungen.bild.alt} fill sizes="200px" quality={80} />
        </div>
        <span className="fk-schleife" aria-hidden="true" />
        <span className="fk-umschlag" aria-hidden="true" />
      </motion.div>
      <motion.span
        className="fk-siegel" aria-hidden="true"
        initial={{ scale: 1.8, opacity: 0, rotate: -20 }}
        animate={sichtbar ? { scale: [1.8, 0.94, 1], opacity: [0, 1, 1], rotate: -8 } : {}}
        transition={{ delay: 0.7, duration: 0.55, times: [0, 0.72, 1], ease: 'easeOut' }}
      />
      <Stempel />

      <style dangerouslySetInnerHTML={{ __html: `
        /* Alles in % einer festen Buehne, damit die Teile zueinander passen */
        .fk { position: relative; width: 100%; aspect-ratio: 1 / 1.05; }
        .fk-karte {
          position: absolute; left: 24%; top: 4%; width: 56%; aspect-ratio: 0.74; padding: 6.5% 5.5% 14%;
          background: #F5F2EA; box-shadow: 0 24px 40px -18px rgba(0, 0, 0, .6), 0 2px 6px rgba(0, 0, 0, .25);
        }
        .fk-karte::before { content: ''; position: absolute; inset: 3.5%; border: 1px solid rgba(46, 43, 34, .14); pointer-events: none; }
        .fk-bogen { position: relative; height: 100%; overflow: hidden; border-radius: 50% 50% 4px 4px / 30% 30% 4px 4px; box-shadow: inset 0 0 0 1px rgba(46, 43, 34, .2); }
        .fk-bogen img { object-fit: cover; }
        /* Kordel um die Karte geschlungen: Foto 24 % breiter als die Karte,
           an den Kartenkanten abgeschnitten, an den Kanten kleine Umschlaege */
        .fk-schleife {
          position: absolute; left: -12%; right: -12%; top: 63%; aspect-ratio: 1024 / 617;
          background: url("/images/vintage/schleife.webp") center / 100% 100% no-repeat;
          clip-path: inset(-60% 9.68% -60% 9.68%);
          filter: drop-shadow(0 3px 3px rgba(0, 0, 0, .35)); pointer-events: none;
        }
        .fk-umschlag { position: absolute; left: 0; right: 0; top: 77.3%; height: 1.7%; transform: translateY(-50%); pointer-events: none; }
        .fk-umschlag::before, .fk-umschlag::after { content: ''; position: absolute; top: 0; bottom: 0; width: 5px; border-radius: 3px; box-shadow: 0 1px 2px rgba(0, 0, 0, .35); }
        .fk-umschlag::before { left: -3px; background: linear-gradient(to right, #8E6E55, #C59F82); }
        .fk-umschlag::after { right: -3px; background: linear-gradient(to left, #8E6E55, #C59F82); }
        .fk-siegel { position: absolute; left: 66%; top: 68%; width: 20%; aspect-ratio: 1; background: var(--v-siegel) center / contain no-repeat; filter: drop-shadow(0 5px 6px rgba(0, 0, 0, .45)); }
        /* Stempel hell auf dem dunklen Fuss */
        .fk-stempel { position: absolute; left: 2%; top: 2%; width: 40%; aspect-ratio: 1; color: var(--ton); opacity: .55; }
        .fk-stempel svg { width: 100%; height: 100%; animation: fk-dreht 60s linear infinite; }
        .fk-stempel text { font-family: var(--font-display), Georgia, serif; font-weight: 600; font-size: 15px; letter-spacing: 2px; fill: currentColor; }
        .fk-stempel-zweig { position: absolute; inset: 27%; color: currentColor; }
        @keyframes fk-dreht { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .fk-stempel svg { animation: none; } }
      ` }} />
    </div>
  );
}
