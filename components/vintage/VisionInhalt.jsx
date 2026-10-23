'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Titel from './Titel';
import { momente, seiteVision as s } from '@/content/texte';

/* Vision. Board: "Vielleicht Platzhalter fuer ein Video, das da
   reinkommt, und unten beim Moodboard Bilder, die wir schon haben. Ich
   gebe dir dann nochmal genau welche." Vorbild: Emma & Liam mit
   Moodboard-Collage.

   Oben: Video-Platz im Passepartout auf Oliv (klar als Platzhalter
   markiert). Unten: Collage aus sich ueberlappenden, leicht gedrehten
   Fotos, die beim Scrollen leicht gegeneinander wandern. Die Auswahl ist
   vorlaeufig, bis Danilo die Bilder nennt. */

const COLLAGE = [
  { l: 4, o: 8, b: 26, d: -5, t: -40 },
  { l: 26, o: 30, b: 22, d: 4, t: 50 },
  { l: 45, o: 2, b: 24, d: -2, t: -60 },
  { l: 64, o: 26, b: 22, d: 6, t: 40 },
  { l: 80, o: 6, b: 17, d: -4, t: -30 },
];

function CollageFoto({ bild, lage, p }) {
  const y = useTransform(p, [0, 1], [lage.t, -lage.t]);
  return (
    <motion.figure className="moodboard-foto" style={{ left: `${lage.l}%`, top: `${lage.o}%`, width: `${lage.b}%`, rotate: lage.d, y }}>
      <div className="moodboard-abzug" style={{ aspectRatio: '2 / 3' }}>
        <Image src={bild.src} alt={bild.alt} width={bild.b} height={bild.h} sizes="(max-width: 760px) 45vw, 26vw" quality={80} />
      </div>
    </motion.figure>
  );
}

export default function VisionInhalt() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bilder = momente.bilder.slice(1, 6);

  return (
    <>
      <section className="vision-kopf v-nacht" data-dunkler-kopf="flaeche">
        <div className="v-bahn">
          <p className="v-label vision-label">{s.label}</p>
          <Titel text={s.titel} als="h1" className="v-titel vision-titel" />
          <div className="v-rahmen vision-video">
            <div className="v-rahmen-bild vision-platz">
              <span className="v-label">{s.video}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="v-abschnitt v-nacht">
        <div className="v-bahn vision-team" style={{ maxWidth: 820, textAlign: 'center' }}>
          <p className="v-zeile">{s.teamZeile}</p>
          <Titel text={s.teamTitel} />
          {s.teamAbsaetze.map((x) => <p key={x.slice(0, 20)} className="v-text">{x}</p>)}
          <p className="v-text vision-fehlt">{s.text}</p>
        </div>
      </section>

      <section ref={ref} className="v-abschnitt v-papier moodboard">
        <span className="v-riss" aria-hidden="true" />
        <div className="v-bahn">
          <p className="moodboard-schrift v-schrift">{s.moodboardZeile}</p>
          <div className="moodboard-buehne">
            {bilder.map((b, i) => <CollageFoto key={b.src} bild={b} lage={COLLAGE[i]} p={scrollYProgress} />)}
          </div>
          <p className="v-label moodboard-hinweis">{s.moodboardHinweis}</p>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .vision-kopf { padding: calc(var(--v-kopf) + clamp(48px, 7vw, 100px)) 0 clamp(120px, 14vw, 200px); text-align: center; }
        .vision-label { margin: 0 0 20px; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .vision-titel { font-size: var(--v-titel); margin-bottom: clamp(40px, 5vw, 72px); }
        .vision-video { max-width: 1040px; margin-inline: auto; }
        .vision-platz { aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; color: color-mix(in srgb, var(--ton) 70%, transparent); background: var(--ton-akzent); }
        .vision-team .v-titel { margin-bottom: clamp(22px, 2.4vw, 30px); }
        .vision-team .v-text + .v-text { margin-top: 16px; }
        .vision-fehlt { font-style: italic; opacity: .6; }
        .moodboard-abzug { overflow: hidden; box-shadow: 0 14px 30px -10px rgba(20, 21, 23, .45), 0 2px 6px rgba(20, 21, 23, .18); }
        .moodboard-schrift { text-align: center; margin: 0 0 clamp(24px, 3vw, 44px); padding-top: .15em; font-size: clamp(56px, 7vw, 110px); line-height: 1; color: var(--ton); }
        .moodboard-buehne { position: relative; height: clamp(460px, 48vw, 720px); }
        .moodboard-foto { position: absolute; margin: 0; will-change: transform; }
        .moodboard-foto img { width: 100%; height: 100%; object-fit: cover; }
        .moodboard-hinweis { text-align: center; margin-top: 32px; color: var(--ton-akzent); }
        @media (max-width: 760px) {
          .moodboard-buehne { height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .moodboard-foto { position: relative; left: auto !important; top: auto !important; width: auto !important; }
        }
      ` }} />
    </>
  );
}
