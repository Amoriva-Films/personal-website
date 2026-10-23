'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Titel from './Titel';

/* Kopf einer Unterseite. Vorbild: "About Runaway Vows" im Board (Bild
   ueber die volle Breite, Titel in Versalien mit einem Wort in
   Schreibschrift). Die Kopfzeile steht darueber hell (data-dunkler-kopf).
   Das Bild bewegt sich beim Scrollen langsamer als die Seite. */

export default function SeitenKopf({ label, titel, bild }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  return (
    <section ref={ref} className="seitenkopf v-nacht" data-dunkler-kopf="">
      {bild && (
        <motion.div className="seitenkopf-bild" style={{ y }}>
          <Image src={bild.src} alt={bild.alt || ''} fill priority sizes="100vw" quality={82} />
        </motion.div>
      )}
      <div className="seitenkopf-inhalt">
        <p className="v-label seitenkopf-label">{label}</p>
        <Titel text={titel} als="h1" className="v-titel seitenkopf-titel" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .seitenkopf { position: relative; height: clamp(520px, 78svh, 860px); overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .seitenkopf-bild { position: absolute; inset: 0 0 -22% 0; }
        .seitenkopf-bild img { object-fit: cover; }
        .seitenkopf::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, color-mix(in srgb, var(--tusche) 55%, transparent), color-mix(in srgb, var(--tusche) 30%, transparent) 45%, var(--nacht));
        }
        .seitenkopf-inhalt { position: relative; z-index: 1; text-align: center; padding: var(--v-kopf) var(--rand) 0; }
        .seitenkopf-label { margin: 0 0 22px; color: color-mix(in srgb, var(--blatt) 80%, transparent); }
        .seitenkopf-titel { font-size: var(--v-titel); color: var(--blatt); text-shadow: 0 2px 30px color-mix(in srgb, var(--tusche) 50%, transparent); }
      ` }} />
    </section>
  );
}
