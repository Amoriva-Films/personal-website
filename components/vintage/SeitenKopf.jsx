'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Titel from './Titel';

/* Kopf einer Unterseite. Vorbild: "About Runaway Vows" im Board (Bild
   ueber die volle Breite, Titel in Versalien mit einem Wort in
   Schreibschrift). Die Kopfzeile steht darueber hell (data-dunkler-kopf).
   Das Bild bewegt sich beim Scrollen langsamer als die Seite. */

export default function SeitenKopf({ label, titel, bild, zeichnungen, weich = false, hoch = false, gruen = false, klein = false, oben = false, bildLage }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', weich ? '0%' : '22%']);

  return (
    <section ref={ref} className={`seitenkopf v-nacht${weich ? ' seitenkopf--weich' : ''}${hoch ? ' seitenkopf--hoch' : ''}${gruen ? ' seitenkopf--gruen' : ''}${klein ? ' seitenkopf--klein' : ''}${oben ? ' seitenkopf--oben' : ''}`} data-dunkler-kopf="">
      {bild && (
        <motion.div className="seitenkopf-bild" style={{ y }}>
          <Image src={bild.src} alt={bild.alt || ''} fill priority sizes="100vw" quality={82} style={bildLage ? { objectPosition: bildLage } : undefined} />
        </motion.div>
      )}
      {!bild && zeichnungen && (
        <>
          <span className="v-zeichnung seitenkopf-zeichnung seitenkopf-zeichnung--links" style={{ '--bild': `url(${zeichnungen[0]})` }} aria-hidden="true" />
          <span className="v-zeichnung seitenkopf-zeichnung seitenkopf-zeichnung--rechts" style={{ '--bild': `url(${zeichnungen[1]})` }} aria-hidden="true" />
        </>
      )}
      <div className="seitenkopf-inhalt">
        <p className="v-label seitenkopf-label">{label}</p>
        <Titel text={titel} als="h1" className="v-titel seitenkopf-titel" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .seitenkopf { position: relative; height: clamp(520px, 78svh, 860px); overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .seitenkopf-bild { position: absolute; inset: 0 0 -22% 0; }
        .seitenkopf--weich .seitenkopf-bild { inset: 0; }
        .seitenkopf-bild img { object-fit: cover; }
        .seitenkopf::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, color-mix(in srgb, var(--tusche) 55%, transparent), color-mix(in srgb, var(--tusche) 30%, transparent) 45%, var(--nacht));
        }
        /* Weich: das Bild blendet unten in die Flaeche der Seite aus, keine Kante zum naechsten Abschnitt */
        .seitenkopf.seitenkopf--weich { background: none; }
        .seitenkopf--weich .seitenkopf-bild { -webkit-mask-image: linear-gradient(to bottom, #000 60%, transparent 100%); mask-image: linear-gradient(to bottom, #000 60%, transparent 100%); }
        .seitenkopf--weich::after { background: linear-gradient(to bottom, color-mix(in srgb, var(--tusche) 55%, transparent), color-mix(in srgb, var(--tusche) 22%, transparent) 50%, transparent); }
        /* Hoch: Titel oben, darunter bleibt das Bild frei (z. B. gemaltes Team) */
        .seitenkopf--hoch { height: clamp(600px, 96svh, 980px); align-items: flex-start; }
        .seitenkopf--hoch .seitenkopf-inhalt { padding-top: calc(var(--v-kopf) + clamp(24px, 4vw, 60px)); }
        .seitenkopf--hoch .seitenkopf-bild { -webkit-mask-image: linear-gradient(to bottom, #000 66%, transparent 100%); mask-image: linear-gradient(to bottom, #000 66%, transparent 100%); }
        .seitenkopf--hoch::after { background: linear-gradient(to bottom, color-mix(in srgb, var(--tusche) 62%, transparent), color-mix(in srgb, var(--tusche) 12%, transparent) 38%, transparent 70%); }
        /* Gruen: warmes Gemaelde Richtung Oliv/Salbei ziehen */
        .seitenkopf--gruen .seitenkopf-bild img { filter: saturate(.8) sepia(.15) brightness(.94); }
        .seitenkopf--gruen .seitenkopf-bild::after { content: ''; position: absolute; inset: 0; background: #55663a; mix-blend-mode: color; opacity: .5; pointer-events: none; }
        /* Klein: Bild als blasse, weich auslaufende Vignette, die Figuren kaum erkennbar */
        .seitenkopf--klein .seitenkopf-bild { inset: 24% 16% 0 16%; opacity: .55;
          -webkit-mask-image: radial-gradient(closest-side at 50% 50%, #000 25%, transparent 100%); mask-image: radial-gradient(closest-side at 50% 50%, #000 25%, transparent 100%); }
        .seitenkopf--klein .seitenkopf-bild img { object-fit: contain; }
        /* Oben: Titel im Himmel, damit Figuren im unteren Bilddrittel frei bleiben;
           das Bild blendet erst spaeter ins Braun aus */
        .seitenkopf--oben { align-items: flex-start; }
        .seitenkopf--oben .seitenkopf-inhalt { padding-top: calc(var(--v-kopf) + clamp(28px, 4vw, 56px)); }
        .seitenkopf--oben .seitenkopf-bild img { object-position: center 100%; }
        .seitenkopf--oben.seitenkopf--weich .seitenkopf-bild { -webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); }
        .seitenkopf--oben.seitenkopf--weich::after { background: linear-gradient(to bottom, color-mix(in srgb, var(--tusche) 50%, transparent), color-mix(in srgb, var(--tusche) 10%, transparent) 40%, transparent 70%); }
        .seitenkopf-zeichnung { position: absolute; z-index: 0; color: var(--khaki); opacity: .34; aspect-ratio: 4 / 5; width: clamp(200px, 26vw, 400px); }
        .seitenkopf-zeichnung--links { left: 5%; bottom: -6%; transform: rotate(-8deg); }
        .seitenkopf-zeichnung--rechts { right: 5%; top: 8%; transform: rotate(7deg); }
        @media (max-width: 700px) { .seitenkopf-zeichnung { width: 46vw; } }
        .seitenkopf-inhalt { position: relative; z-index: 1; text-align: center; padding: var(--v-kopf) var(--rand) 0; }
        .seitenkopf-label { margin: 0 0 22px; color: color-mix(in srgb, var(--blatt) 80%, transparent); }
        .seitenkopf-titel { font-size: var(--v-titel); color: var(--blatt); text-shadow: 0 2px 30px color-mix(in srgb, var(--tusche) 50%, transparent); }
      ` }} />
    </section>
  );
}
