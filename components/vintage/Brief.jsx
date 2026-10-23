'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { brief, marke, anfrage } from '@/content/texte';
import { zerlegen } from './Titel';

/* Der Brief. Board: "Vintage-Brief, der sich oeffnet, und dann kommt ein
   Vintage-Blatt raus, wo etwas steht (Scroll-Effekte)."

   Echter Briefumschlag (Foto, Figma-KI), zerlegt in drei Ebenen: Klappe,
   Tasche (Vorderseite mit V-Ausschnitt) und Rueckwand. Beim Scrollen:
   1. der Umschlag steht von Anfang an da (Danilo, Runde 5: vorher kam
      erst ein leerer Schirm), auf der Klappenspitze das Amoriva-Siegel,
   2. die Klappe klappt nach oben auf: flach gespiegelt (scaleY 1 bis -1)
      statt 3D, weil preserve-3d je nach Browser die Klappe abgeloest
      neben den Umschlag gezeichnet hat ("komplett verbuggt"),
   3. der Brief gleitet ganz aus der Tasche (der Umschlag rueckt dafuer
      nach unten),
   4. erst wenn er ganz draussen ist, wechselt er nach vorne. Vorher
      steckte er beim Wechsel noch halb in der Tasche und "sprang" sichtbar
      davor (Runde 9). Dann legt er sich mittig hin, der Umschlag sinkt
      darunter weg und blendet aus.
   Nur transform und opacity. Bei "Bewegung reduzieren" steht der Brief
   sofort offen da (MotionConfig im Layout plus kurze Strecke). */

const KLAPPE = 'polygon(0 0, 100% 0, 49.8% 66%)';
const TASCHE = 'polygon(0 0, 49.8% 66%, 100% 0, 100% 100%, 0 100%)';

function TitelZeile({ text }) {
  return (
    <h2 className="brief-titel">
      {zerlegen(text).map((t, i) => (
        <span key={i}>{t.schrift ? <em>{t.wort}</em> : t.wort}{' '}</span>
      ))}
    </h2>
  );
}

export default function Brief() {
  const huelle = useRef(null);
  const [vorne, setVorne] = useState(false);
  const [klappeOffen, setKlappeOffen] = useState(false);

  const { scrollYProgress: p } = useScroll({ target: huelle, offset: ['start start', 'end end'] });

  // Umschlag: steht mittig, rueckt beim Herausziehen etwas nach unten
  // (damit der Brief nicht unter die Kopfzeile geraet), sinkt ab 0,55 weg
  const einY = useTransform(p, [0.3, 0.52, 0.55, 0.8], ['0vh', '34vh', '34vh', '112vh']);
  const einO = useTransform(p, [0.57, 0.71], [1, 0]);
  // Klappe: 1 = zu, -1 = ganz offen (nach oben gespiegelt)
  const klappe = useTransform(p, [0.08, 0.28], [1, -1]);
  // Brief: erst aus der Tasche, dann zurueck in die Mitte, aber vorne.
  // briefVor gleicht das Wegsinken des Umschlags genau aus.
  // -112 % der Briefhoehe: die Unterkante liegt dann ueber der Tasche
  const briefRaus = useTransform(p, [0.3, 0.52, 0.55, 0.8], ['0%', '-112%', '-112%', '0%']);
  const briefVor = useTransform(p, [0.55, 0.8], ['0vh', '-112vh']);
  const briefGross = useTransform(p, [0.55, 0.8], [1, 1.14]);

  useMotionValueEvent(p, 'change', (w) => {
    setVorne(w > 0.53);
    setKlappeOffen(w > 0.18);
  });

  return (
    <>
    <section ref={huelle} className="brief v-nacht" style={{ height: '300vh' }}>
      <div className="brief-buehne">
        {/* Ausgeblendet werden nur die Umschlag-Teile, nicht der Brief */}
        <motion.div className="brief-umschlag" style={{ y: einY }}>
          <motion.span className="brief-rueckwand" aria-hidden="true" style={{ opacity: einO }} />

          {/* Der Brief: aussen die Bewegung nach vorne, innen das Herausgleiten */}
          <motion.div className="brief-blatt-huelle" style={{ y: briefVor, scale: briefGross, zIndex: vorne ? 6 : 2 }}>
            <motion.div className="brief-blatt v-blatt" style={{ y: briefRaus }}>
              <p className="brief-zeile v-schrift">{brief.zeile}</p>
              <TitelZeile text={brief.titel} />
              <p className="brief-text">{brief.text}</p>
              <div className="brief-wege">
                <Link href={anfrage.href} className="v-knopf brief-knopf">{brief.knopf}</Link>
                <span className="brief-links">
                  <a href={marke.mailHref} className="v-link">{marke.mail}</a>
                  <a href={marke.whatsapp} target="_blank" rel="noopener noreferrer" className="v-link">{brief.whatsapp}</a>
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.span className="brief-tasche" aria-hidden="true" style={{ opacity: einO }} />

          <motion.div
            className={`brief-klappe${klappeOffen ? ' brief-klappe--offen' : ''}`}
            aria-hidden="true" style={{ scaleY: klappe, zIndex: klappeOffen ? 1 : 5, opacity: einO }}
          >
            <span className="brief-klappe-vorn" />
            {/* Eigene Ebene, nicht im Zuschnitt der Klappe, sonst wird das Siegel
                abgeschnitten (Danilo 20.10.2026: "gar nicht richtig drauf") */}
            <span className="brief-siegel" />
            <span className="brief-klappe-innen" />
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Handy: der Brief ist zu klein fuer Fliesstext, der Rest steht hier,
          nach der klebenden Strecke, nicht mitten in ihr. */}
      <div className="v-sand brief-handy">
        <div className="v-bahn brief-handy-innen">
          <p className="v-text">{brief.text}</p>
          <Link href={anfrage.href} className="v-knopf">{brief.knopf}</Link>
          <span className="brief-links">
            <a href={marke.mailHref} className="v-link">{marke.mail}</a>
            <a href={marke.whatsapp} target="_blank" rel="noopener noreferrer" className="v-link">{brief.whatsapp}</a>
          </span>
        </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .brief { position: relative; }
        /* Hintergrund: gemalte Toskana (Figma-KI), Vorbild Umschlag-Referenz im Board (22.10.2026) */
        .brief-buehne {
          position: sticky; top: 0; height: 100svh; min-height: 620px; overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: var(--nacht) url("/images/vintage/landschaft-gemalt.webp") center / cover no-repeat;
        }
        .brief-umschlag {
          position: relative; width: min(88vw, 720px); aspect-ratio: 1259 / 823;
          will-change: transform;
        }
        .brief-rueckwand, .brief-tasche, .brief-klappe-vorn, .brief-klappe-innen {
          position: absolute; inset: 0;
          /* 2 % hoeher und unten ausgerichtet: die oberste Fotozeile ist dunkel
             und stand beim Aufklappen als Spalt an der Knickkante (Runde 6) */
          background: url("/images/brief/umschlag.webp") 50% 100% / 100% 102% no-repeat;
        }
        /* Innenseite: dunkler, oben am Falz am tiefsten */
        .brief-rueckwand { z-index: 1; filter: brightness(.8); box-shadow: 0 40px 90px color-mix(in srgb, var(--tusche) 50%, transparent); }
        .brief-tasche { z-index: 3; clip-path: ${TASCHE}; }
        /* Zu: Aussenseite mit Siegel. Offen (gespiegelt): Innenseite, dunkler. */
        .brief-klappe { position: absolute; inset: 0; transform-origin: 50% 0; }
        .brief-klappe-vorn { clip-path: ${KLAPPE}; }
        .brief-klappe-innen { clip-path: ${KLAPPE}; filter: brightness(.8); opacity: 0; }
        .brief-klappe--offen .brief-klappe-vorn, .brief-klappe--offen .brief-siegel { opacity: 0; }
        .brief-klappe--offen .brief-klappe-innen { opacity: 1; }
        .brief-siegel {
          position: absolute; width: 12.5%; aspect-ratio: 1; left: 49.8%; top: 66%; transform: translate(-50%, -52%);
          background: var(--v-siegel) center / contain no-repeat;
          filter: drop-shadow(0 4px 5px color-mix(in srgb, var(--tusche) 35%, transparent));
        }

        /* Der Brief: kleiner als der Umschlag, damit er hineinpasst */
        .brief-blatt-huelle { position: absolute; left: 5%; right: 5%; top: 8%; height: 86%; transform-origin: 50% 50%; }
        .brief-blatt {
          height: 100%; container-type: inline-size; color: var(--tusche);
          display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
          padding: 5cqw 7cqw; box-shadow: 0 10px 30px color-mix(in srgb, var(--tusche) 22%, transparent);
          outline: 1px solid color-mix(in srgb, var(--pergament) 70%, transparent); outline-offset: -2.2cqw;
        }
        .brief-zeile { margin: 0 0 1.4cqw; font-size: 5cqw; line-height: 1; color: var(--oliv-mitte); }
        .brief-titel {
          margin: 0 0 2.6cqw; font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: 4.3cqw; line-height: 1.15; letter-spacing: .05em; text-transform: uppercase; text-wrap: balance;
        }
        .brief-titel em { font-family: var(--font-schrift), cursive; font-style: normal; text-transform: none; letter-spacing: 0; font-size: 1.35em; line-height: .7; }
        /* Runde 11: vorher 2,45cqw, "super klein". Jetzt etwa 20 px auf dem Rechner */
        .brief-text { margin: 0 0 3cqw; font-family: var(--font-text), system-ui, sans-serif; font-size: 3.05cqw; line-height: 1.55; color: color-mix(in srgb, var(--tusche) 82%, transparent); max-width: 74cqw; }
        .brief-wege { display: flex; flex-direction: column; align-items: center; gap: 2.4cqw; }
        .brief-knopf { color: var(--nacht); }
        @media (hover: hover) { .brief-knopf:hover { background-color: var(--nacht); color: var(--sand-hell); } }
        .brief-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 4cqw; font-family: var(--font-text), system-ui, sans-serif; font-size: clamp(14px, 2.6cqw, 17px); }

        .brief-handy { display: none; }
        @media (max-width: 760px) {
          .brief-text, .brief-wege { display: none; }
          .brief-zeile { font-size: 8cqw; }
          .brief-titel { font-size: 6.6cqw; margin: 0; }
          .brief-handy { display: block; padding-bottom: 88px; }
          .brief-handy-innen { display: flex; flex-direction: column; align-items: center; gap: 24px; text-align: center; }
          .brief-handy .brief-links { font-size: 14px; gap: 22px; }
        }
      ` }} />
      </div>
    </>
  );
}
