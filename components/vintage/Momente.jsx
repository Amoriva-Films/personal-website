'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { momente } from '@/content/texte';

/* "Momente, die bleiben". Vorbild (Danilo 22.10.2026): die Darcy-McQueeny-
   Referenz im Board. Heller Papiergrund, oben der Titel in Schreibschrift,
   in der Mitte zwei scharfe Fotos nebeneinander, ringsum blasse Abzuege
   wie verblichene Erinnerungen, dahinter kaum sichtbar eine Handschrift
   wie ein alter Brief. Rechts eine kurze Notiz in Schreibmaschine.

   Effekt: jedes Bild wandert mit eigenem Tempo (Tiefe), die Handschrift
   driftet langsam. */

// Lage auf dem Rechner (in %): links, oben, Breite, Seitenverhaeltnis, Tempo, blass?
const STREU = [
  { i: 1, l: 11, o: 30, b: 19, r: '4 / 3', t: -40, blass: true },
  { i: 5, l: 4, o: 70, b: 15, r: '1 / 1', t: 60, blass: false },
  { i: 3, l: 24, o: 82, b: 15, r: '4 / 3', t: 30, blass: true },
  { i: 4, l: 76, o: 0, b: 14, r: '3 / 4', t: -60, blass: true },
  { i: 6, l: 57, o: 66, b: 18, r: '4 / 3', t: 40, blass: true },
  { i: 2, l: 92, o: 86, b: 12, r: '1 / 1', t: -30, blass: true },
];

function Foto({ bild, lage, p, groesse }) {
  const y = useTransform(p, [0, 1], [lage.t, -lage.t]);
  return (
    <motion.figure
      className={`momente-foto${lage.blass ? ' momente-foto--blass' : ''}`}
      style={{ left: `${lage.l}%`, top: `${lage.o}%`, width: `${lage.b}%`, aspectRatio: lage.r, y }}
    >
      <Image src={bild.src} alt={lage.blass ? '' : bild.alt} fill sizes={groesse} quality={lage.blass ? 60 : 80} />
    </motion.figure>
  );
}

export default function Momente() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const schriftY = useTransform(p, [0, 1], [40, -40]);
  const mitteY = useTransform(p, [0, 1], [24, -24]);
  const b = momente.bilder;

  return (
    <section ref={ref} className="v-papier momente">
      <h2 className="momente-titel v-schrift">{momente.schrift}</h2>

      <div className="momente-buehne">
        <motion.p className="momente-handschrift v-schrift" aria-hidden="true" style={{ y: schriftY }}>
          {momente.handschrift}
        </motion.p>

        {STREU.map((lage) => (
          <Foto key={lage.i} bild={b[lage.i]} lage={lage} p={p} groesse="(max-width: 760px) 40vw, 20vw" />
        ))}

        <motion.div className="momente-mitte" style={{ y: mitteY }}>
          <figure className="momente-paar"><Image src={b[0].src} alt={b[0].alt} fill sizes="(max-width: 760px) 44vw, 16vw" quality={85} /></figure>
          <figure className="momente-paar"><Image src={b[2].src} alt={b[2].alt} fill sizes="(max-width: 760px) 44vw, 16vw" quality={85} /></figure>
        </motion.div>

        <div className="momente-notiz">
          <p>{momente.notiz}</p>
          <Link href="/vision" className="v-link">{momente.link}</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .momente { position: relative; overflow: clip; padding: clamp(48px, 5vw, 72px) 0 clamp(40px, 4vw, 64px); }
        .momente-titel {
          position: relative; z-index: 2; margin: 0; text-align: center; font-weight: 400;
          font-size: clamp(46px, 6.4vw, 100px); line-height: 1.05; color: var(--ton-akzent);
        }
        .momente-buehne { position: relative; height: clamp(520px, 46vw, 700px); max-width: 1500px; margin: clamp(-10px, -1vw, 0px) auto 0; }

        .momente-handschrift {
          position: absolute; left: 6%; top: 6%; width: 30%; margin: 0; z-index: 0;
          font-size: clamp(22px, 2.2vw, 34px); line-height: 1.5; color: var(--ton); opacity: .24;
          transform: rotate(-8deg); pointer-events: none;
        }

        .momente-foto { position: absolute; margin: 0; overflow: hidden; z-index: 1; will-change: transform; }
        .momente-foto img, .momente-paar img { object-fit: cover; }
        /* Blass: verblichen, fast im Papier (Referenz) */
        .momente-foto--blass { opacity: .34; filter: grayscale(.4) sepia(.3); }
        .momente-foto:not(.momente-foto--blass) { box-shadow: 0 16px 30px -14px rgba(46, 43, 34, .5); }

        .momente-mitte {
          position: absolute; left: 0; right: 0; margin-inline: auto; top: 16%; z-index: 2;
          display: grid; grid-template-columns: 1fr 1fr; gap: clamp(8px, .8vw, 14px); width: clamp(300px, 32vw, 480px);
        }
        .momente-paar { position: relative; margin: 0; aspect-ratio: 3 / 4; overflow: hidden; box-shadow: 0 22px 40px -16px rgba(46, 43, 34, .55); }

        .momente-notiz { position: absolute; right: 2.5%; top: 50%; z-index: 2; width: clamp(200px, 18vw, 270px); }
        .momente-notiz p { margin: 0 0 14px; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 14px; line-height: 1.6; color: var(--ton); }
        .momente-notiz .v-link { font-family: var(--font-text), system-ui, sans-serif; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; }

        @media (max-width: 760px) {
          .momente-buehne { height: auto; display: flex; flex-direction: column; align-items: center; gap: 28px; padding: 24px var(--rand) 0; }
          .momente-foto, .momente-handschrift { display: none; }
          .momente-mitte { position: relative; top: auto; width: 100%; }
          .momente-notiz { position: relative; right: auto; top: auto; width: 100%; text-align: center; }
        }
      ` }} />
    </section>
  );
}
