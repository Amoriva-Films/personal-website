'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

/* Kurzes Einblenden beim Scrollen, unter 400 ms und ohne Versatz nach
   oben. Wer im Betriebssystem "Bewegung reduzieren" eingestellt hat,
   bekommt den Inhalt sofort und ohne Animation. */

export default function FadeIn({ children, delay = 0, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const wenigerBewegung = useReducedMotion();

  if (wenigerBewegung) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.38, delay, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
