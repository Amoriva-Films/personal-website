'use client';

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { seiteLeistungen as s } from '@/content/texte';

/* Preiskarte auf /leistungen (Nevio 28.10.2026: "schoener, in unserem Stil,
   ein Effekt wie es reinkommt"). Vorbild: die Menuekarte eines alten
   Grandhotels. Gepraegte Karte (karte-praegung.jpg wie bei Prozess und
   Leistungen), dahinter eine zweite Karte, unten das gruene Amoriva-Siegel.

   Effekt beim Hereinscrollen: die Karte richtet sich aus dem Liegen auf
   (rotateX), steigt hoch und dreht sich gerade, die hintere Karte faechert
   seitlich heraus. Ist die Karte im Bild, laufen die Zeilen nacheinander
   ein: die Punktlinie zieht sich bis zum Preis, der Preis wird wie mit
   einem Stempel aufgedrueckt, zuletzt wird das Siegel aufgepresst.
   Mit der Maus neigt sich die Karte leicht (wie der Brief auf der
   Startseite). Nur transform/opacity. Bei "Bewegung reduzieren" steht
   alles sofort da. Der Text steht komplett im HTML. */

const ease = [0.22, 1, 0.36, 1];

export default function Preiskarte() {
  const buehne = useRef(null);
  const karte = useRef(null);
  const ohneBewegung = useReducedMotion();
  // Handy (Nevio 28.10.2026: "wackelt und haengt"): kein Aufrichten, kein
  // Neigen, die Karte steht still da, nur die Zeilen blenden ein
  const [handy, setHandy] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const an = () => setHandy(mq.matches);
    an();
    mq.addEventListener('change', an);
    return () => mq.removeEventListener('change', an);
  }, []);
  const reduziert = ohneBewegung || handy;
  const sichtbar = useInView(karte, { once: true, margin: '0px 0px -18% 0px' });
  const an = reduziert || sichtbar;

  // Aufrichten beim Hereinscrollen
  const { scrollYProgress: p } = useScroll({ target: buehne, offset: ['start end', 'center center'] });
  // Bei "Bewegung reduzieren" gleich der Endzustand. Immer dieselben Werte an
  // style geben, sonst bleibt nach dem Hydrieren der Server-Stand haengen.
  const kippen = useTransform(p, [0, 1], reduziert ? [0, 0] : [38, 0]);
  const heben = useTransform(p, [0, 1], reduziert ? [0, 0] : [160, 0]);
  const drehen = useTransform(p, [0, 1], reduziert ? [-1.2, -1.2] : [5, -1.2]);
  const hintenDrehen = useTransform(p, [0.2, 1], reduziert ? [-6, -6] : [-1.2, -6]);
  const hintenX = useTransform(p, [0.2, 1], reduziert ? ['-6%', '-6%'] : ['0%', '-6%']);

  // Neigen mit der Maus
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });
  const neigungX = useTransform([sy, kippen], ([m, k]) => -m * 6 + k);
  const neigungY = useTransform(sx, (m) => m * 8);
  const glanzX = useTransform(sx, (m) => `${m * 30}%`);
  const glanzY = useTransform(sy, (m) => `${m * 30}%`);
  const zeiger = (e) => {
    if (reduziert) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const zeigerWeg = () => { mx.set(0); my.set(0); };

  const start = 0.35;
  const schritt = 0.16;

  return (
    <div ref={buehne} className="pk-buehne" onPointerMove={zeiger} onPointerLeave={zeigerWeg}>
      <motion.span className="pk-hinten" aria-hidden="true"
        style={{ rotate: hintenDrehen, x: hintenX }} />

      <motion.div ref={karte} className="pk-karte"
        style={{ y: heben, rotate: drehen, rotateX: neigungX, rotateY: neigungY, transformPerspective: 1300 }}>
        <motion.span className="pk-glanz" aria-hidden="true" style={{ x: glanzX, y: glanzY }} />

        <div className="pk-kopf">
          <p className="pk-oben">{s.preiseKarte.kopf}</p>
          <p className="pk-titel v-schrift">{s.preiseKarte.titel}</p>
          <p className="pk-saison">{s.preiseKarte.saison}</p>
          <span className="pk-zier" aria-hidden="true"><span /><i>✦</i><span /></span>
        </div>

        <ul className="pk-liste">
          {s.preise.map((e, i) => {
            const t = start + i * schritt;
            return (
              <motion.li key={e.titel} className="pk-zeile"
                initial={false}
                animate={an ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.7, ease, delay: reduziert ? 0 : t }}>
                <span className="pk-oben-zeile">
                  <span className="pk-name">{e.titel}</span>
                  <motion.span className="pk-punkte" aria-hidden="true"
                    initial={false}
                    animate={an ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, ease, delay: reduziert ? 0 : t + 0.15 }} />
                  <motion.span className="pk-preis"
                    initial={false}
                    animate={an ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 1.45, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 18, delay: reduziert ? 0 : t + 0.75 }}>
                    {e.preis}
                  </motion.span>
                </span>
                <span className="pk-text">{e.text}</span>
              </motion.li>
            );
          })}
        </ul>

        <motion.div className="pk-fuss"
          initial={false}
          animate={an ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: reduziert ? 0 : start + s.preise.length * schritt + 0.5 }}>
          <p className="pk-hinweis">{s.preiseHinweis}</p>
          <p className="pk-gruss v-schrift">{s.preiseKarte.gruss}</p>
        </motion.div>

        <motion.span className="pk-siegel" aria-hidden="true"
          initial={false}
          animate={an ? { opacity: 1, scale: 1, rotate: -12 } : { opacity: 0, scale: 1.9, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 17, delay: reduziert ? 0 : start + s.preise.length * schritt + 0.9 }} />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pk-buehne { position: relative; max-width: 540px; margin: 0 auto; padding: 10px 0 60px; }
        .pk-hinten, .pk-karte {
          --r: clamp(32px, 4vw, 46px);
          border: var(--r) solid transparent;
          border-image: url("/images/vintage/karte-praegung.jpg") 240 fill / var(--r) stretch;
        }
        .pk-hinten { position: absolute; inset: 10px 0 60px; z-index: 0; transform-origin: 70% 100%;
          filter: brightness(.82) sepia(.25) drop-shadow(0 18px 24px rgba(8, 6, 3, .45)); }
        .pk-karte { position: relative; z-index: 1; color: var(--tinte); text-align: left; transform-origin: 50% 100%; will-change: transform;
          padding: clamp(6px, 1.4vw, 18px) clamp(6px, 2vw, 26px) clamp(20px, 3vw, 34px);
          filter: drop-shadow(0 30px 34px rgba(8, 6, 3, .5)) drop-shadow(0 3px 5px rgba(8, 6, 3, .3)); }
        .pk-glanz { position: absolute; inset: -30%; pointer-events: none; z-index: 2; mix-blend-mode: soft-light;
          background: radial-gradient(circle at 50% 50%, rgba(255, 252, 240, .55), transparent 45%); }

        .pk-kopf { text-align: center; margin-bottom: clamp(18px, 2.4vw, 26px); }
        .pk-oben { margin: 0; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 11.5px; letter-spacing: .22em; text-transform: uppercase; color: color-mix(in srgb, var(--tinte) 62%, transparent); }
        .pk-titel { margin: 4px 0 0; font-size: clamp(46px, 5.6vw, 66px); line-height: 1.05; color: var(--oliv-braun); }
        .pk-saison { margin: 2px 0 0; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 13px; letter-spacing: .3em; text-transform: uppercase; color: color-mix(in srgb, var(--tinte) 70%, transparent); }
        .pk-zier { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 16px; color: var(--oliv-braun); }
        .pk-zier span { width: 64px; height: 1px; background: currentColor; opacity: .5; }
        .pk-zier i { font-style: normal; font-size: 12px; }

        .pk-liste { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: clamp(14px, 1.8vw, 19px); }
        .pk-oben-zeile { display: flex; align-items: baseline; gap: 12px; }
        .pk-name { font-family: var(--font-display), Georgia, serif; font-weight: 600; font-size: clamp(17px, 1.45vw, 20px); line-height: 1.2; letter-spacing: .01em; }
        .pk-punkte { flex: 1; min-width: 20px; height: 1px; transform-origin: left center; transform: translateY(-4px);
          background-image: radial-gradient(circle, color-mix(in srgb, var(--tinte) 55%, transparent) 1px, transparent 1.4px); background-size: 7px 2px; background-repeat: repeat-x; }
        .pk-preis { display: inline-block; white-space: nowrap; font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 600; font-size: clamp(19px, 1.7vw, 23px); color: var(--oliv-braun); }
        .pk-text { display: block; margin-top: 3px; font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: clamp(14px, 1.1vw, 15.5px); line-height: 1.4; color: color-mix(in srgb, var(--tinte) 66%, transparent); }

        .pk-fuss { margin-top: clamp(26px, 3vw, 36px); padding-top: 18px; border-top: 1px solid color-mix(in srgb, var(--tinte) 16%, transparent); padding-right: clamp(56px, 7vw, 84px); }
        .pk-hinweis { margin: 0; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 11.5px; line-height: 1.65; color: color-mix(in srgb, var(--tinte) 72%, transparent); }
        .pk-gruss { margin: 10px 0 0; font-size: 26px; line-height: 1; color: var(--oliv-braun); }
        .pk-siegel { position: absolute; right: calc(var(--r) * -.35); bottom: calc(var(--r) * -.55); z-index: 3; width: clamp(84px, 10vw, 106px); aspect-ratio: 1;
          background: url("/images/brief/siegel.webp") center / contain no-repeat; filter: drop-shadow(0 8px 10px rgba(8, 6, 3, .45)); }

        @media (max-width: 560px) {
          /* Handy: kompakt, damit die ganze Karte auf einen Blick zu sehen ist.
             Ohne Unterzeilen, Name und Preis in einer Zeile, ohne Schatten-Filter
             (der machte das Scrollen ruckelig) */
          .pk-buehne { padding-bottom: 34px; }
          .pk-hinten { display: none; }
          .pk-karte { --r: 22px; padding: 2px 4px 10px; filter: none; box-shadow: 0 18px 30px -16px rgba(8, 6, 3, .6); will-change: auto; }
          .pk-glanz { display: none; }
          .pk-kopf { margin-bottom: 14px; }
          .pk-oben { font-size: 10px; }
          .pk-titel { font-size: 42px; }
          .pk-saison { font-size: 11px; }
          .pk-zier { margin-top: 10px; }
          .pk-liste { gap: 12px; }
          .pk-oben-zeile { gap: 8px; }
          .pk-name { font-size: 16px; }
          .pk-punkte { min-width: 12px; }
          .pk-preis { font-size: 18px; }
          .pk-text { display: none; }
          .pk-fuss { margin-top: 16px; padding-top: 12px; padding-right: 74px; }
          .pk-hinweis { font-size: 10.5px; line-height: 1.5; }
          .pk-gruss { font-size: 22px; margin-top: 6px; }
          .pk-siegel { width: 66px; right: 2px; bottom: 6px; }
        }
      ` }} />
    </div>
  );
}
