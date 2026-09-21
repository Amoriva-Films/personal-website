'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

/* Einblenden beim Scrollen.

   Nevio am 21.09.2026: "packe ueberall coole und stylische Animationen
   rein". Die Regel dabei: eine Bewegung pro Abschnitt, in eine Richtung,
   unter einer halben Sekunde. Alles andere wirkt nach zweimal Scrollen
   wie eine Baustelle, und bei einer Hochzeitsseite soll die Ruhe das
   Teuerste sein.

   Wer im Betriebssystem "Bewegung reduzieren" eingestellt hat, bekommt
   den Inhalt sofort und ohne Animation. Das ist keine Kuer: fuer Menschen
   mit Gleichgewichtsstoerungen loesen bewegte Seiten echtes Unwohlsein
   aus.                                                                 */

export default function FadeIn({
  children,
  delay = 0,
  /* 'hoch' schiebt von unten herein, 'links'/'rechts' seitlich,
     'ruhig' blendet nur auf. */
  richtung = 'hoch',
  /* Staffelung: Index in einer Reihe. Jede Kachel kommt 80 ms nach der
     vorigen - das Auge liest die Reihe dann von links nach rechts,
     statt alles auf einmal serviert zu bekommen. */
  index = 0,
  className,
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const wenigerBewegung = useReducedMotion();

  if (wenigerBewegung) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  const start = {
    hoch:   { opacity: 0, y: 26 },
    links:  { opacity: 0, x: -26 },
    rechts: { opacity: 0, x: 26 },
    ruhig:  { opacity: 0 },
  }[richtung] || { opacity: 0, y: 26 };

  return (
    <motion.div
      ref={ref}
      initial={start}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.62, delay: delay + index * 0.08, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
