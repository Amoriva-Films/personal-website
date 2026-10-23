'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { leitsatz } from '@/content/texte';

/* Der grosse Satz. Vorbild (Danilo 22.10.2026): die Blumen-Referenz im
   Board, ein Foto unter einem oliv-braunen Schleier, darauf ein Satz in
   grossen Versalien, mit hellem Rand wie ein eingeklebter Abzug.

   Effekt: Die Buehne klebt, waehrend man scrollt. Wort fuer Wort wird der
   Satz von blass zu hell "geschrieben", das Foto steht still. Rueckwaerts laeuft alles zurueck.

   Am Ende (Danilo 22.10.2026): beim Weiterscrollen loest sich der Satz
   auf. Jeder Buchstabe treibt ruhig in seine Richtung davon (links Stehende
   eher nach links, rechts Stehende nach rechts, dazu etwas hoch oder
   runter), dreht sich leicht und blendet aus. Kein Knall, eher wie
   Pusteblume. Die Richtungen sind fest (aus der Position berechnet), damit
   es bei jedem Besuch gleich aussieht. Nur transform und opacity.

   Danilo: danach stand das leere Bild noch eine Weile ("sonst denken die,
   die Seite ist vorbei"). Deshalb laeuft der Zerfall auf einem eigenen
   Fortschritt (q), der bis zum Herausscrollen reicht: die erste Haelfte
   zerfaellt, solange die Buehne steht, die zweite, waehrend sie schon nach
   oben weggeht. Ein leeres Bild bleibt nie stehen. */

// Feste Pseudo-Zufallszahl 0..1 je Buchstabe
const zufall = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// q: 0 = Abschnitt oben am Schirm, 1 = Abschnitt unten aus dem Schirm.
// Bei 250vh Hoehe endet die klebende Strecke bei q = 150 / 250 = 0,6.
const ZERFALL_AB = 0.47;
const ZERFALL_DAUER = 0.22;

function Buchstabe({ zeichen, n, lage, q: p }) {
  const r1 = zufall(n), r2 = zufall(n + 99), r3 = zufall(n + 7);
  const start = ZERFALL_AB + r3 * 0.1;
  const ende = start + ZERFALL_DAUER;
  // lage: -1 (ganz links im Satz) bis 1 (ganz rechts)
  const dx = (lage * 140 + (r1 - 0.5) * 120);
  const dy = ((r2 - 0.5) * 200);
  const x = useTransform(p, [start, ende], [0, dx]);
  const y = useTransform(p, [start, ende], [0, dy]);
  const rotate = useTransform(p, [start, ende], [0, (r1 - 0.5) * 50]);
  const opacity = useTransform(p, [start, start + ZERFALL_DAUER * 0.35, ende], [1, 0.9, 0]);
  return <motion.span className="leitsatz-buchstabe" style={{ x, y, rotate, opacity }}>{zeichen}</motion.span>;
}

function Wort({ wort, i, anzahl, p, q, versatz, gesamt }) {
  // Schreiben auf p (klebende Strecke): fertig bei etwa 0,6
  const start = 0.06 + (i / anzahl) * 0.46;
  const o = useTransform(p, [start, start + 0.07], [0.16, 1]);
  const y = useTransform(p, [start, start + 0.07], [10, 0]);
  const blur = useTransform(p, [start, start + 0.07], ['blur(6px)', 'blur(0px)']);
  return (
    <motion.span className="leitsatz-wort" style={{ opacity: o, y, filter: blur }}>
      {[...wort].map((z, k) => {
        const n = versatz + k;
        return <Buchstabe key={k} zeichen={z} n={n} lage={(n / Math.max(1, gesamt - 1)) * 2 - 1} q={q} />;
      })}
      {' '}
    </motion.span>
  );
}

export default function Leitsatz() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: q } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const labelO = useTransform(q, [0.01, 0.06, ZERFALL_AB, ZERFALL_AB + 0.06], [0, 1, 1, 0]);
  const woerter = leitsatz.text.split(' ');
  const gesamt = woerter.join('').length;
  const versaetze = woerter.reduce((a, w, i) => { a.push(i ? a[i - 1] + woerter[i - 1].length : 0); return a; }, []);

  return (
    <section ref={ref} className="v-papier leitsatz" aria-label={leitsatz.text}>
      <div className="leitsatz-buehne">
        <div className="leitsatz-bild">
          {/* Bild steht still, kein Zoom beim Scrollen (Danilo 22.10.2026) */}
          <div className="leitsatz-zoom">
            <Image src={leitsatz.bild.src} alt="" fill sizes="100vw" quality={78} />
          </div>
          <span className="leitsatz-schleier" aria-hidden="true" />
          <div className="leitsatz-inhalt" aria-hidden="true">
            <motion.p className="v-label leitsatz-label" style={{ opacity: labelO }}>{leitsatz.label}</motion.p>
            <p className="leitsatz-text">
              {woerter.map((w, i) => <Wort key={i} wort={w} i={i} anzahl={woerter.length} p={p} q={q} versatz={versaetze[i]} gesamt={gesamt} />)}
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leitsatz { position: relative; height: 250vh; }
        /* Papier an der klebenden Buehne, damit am Rand nichts unter dem
           stehenden Bild durchscrollt */
        .leitsatz-buehne { background: var(--sand-hell) var(--v-papier-fein) 0 0 / 768px repeat; position: sticky; top: 0; height: 100svh; padding: calc(var(--v-kopf) + 14px) clamp(14px, 2vw, 28px) clamp(14px, 2vw, 28px); }
        .leitsatz-bild { position: relative; height: 100%; overflow: hidden; }
        .leitsatz-zoom { position: absolute; inset: 0; }
        .leitsatz-zoom img { object-fit: cover; object-position: center 40%; }
        /* Oliv-brauner Schleier wie in der Referenz */
        .leitsatz-schleier { position: absolute; inset: 0; background: color-mix(in srgb, var(--nacht) 68%, transparent); }
        .leitsatz-inhalt {
          position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 0 clamp(20px, 8vw, 140px); text-align: center; color: var(--salbei-hell);
        }
        .leitsatz-label { margin: 0 0 clamp(20px, 2.4vw, 32px); font-family: var(--font-maschine), ui-monospace, monospace; letter-spacing: .3em; opacity: .85; }
        .leitsatz-text {
          margin: 0; max-width: 1100px; font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: clamp(26px, 3.7vw, 58px); line-height: 1.22; letter-spacing: .06em; text-transform: uppercase; text-wrap: balance;
        }
        .leitsatz-wort { display: inline-block; white-space: pre; }
        .leitsatz-buchstabe { display: inline-block; will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) {
          .leitsatz { height: auto; } .leitsatz-buehne { position: relative; height: 90svh; }
          .leitsatz-wort, .leitsatz-buchstabe, .leitsatz-label { opacity: 1 !important; filter: none !important; transform: none !important; }
        }
      ` }} />
    </section>
  );
}
