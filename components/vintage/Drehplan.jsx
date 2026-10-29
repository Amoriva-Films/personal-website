'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { seiteVideoWolfsburg as s } from '@/content/texte';

/* Drehplan auf /hochzeitsvideo-wolfsburg (Nevio 29.10.2026). Oben eine
   Filmklappe (schwarz-weisse Schraegstreifen, darunter die Felder in
   Kreide), darunter ein Drehbuchblatt in Schreibmaschine: Szene, Uhrzeit,
   Motiv, Notiz. Ein Beispieltag.

   Desktop: beim Hereinscrollen klappt die Klappe einmal zu, danach laufen
   die Szenen nacheinander ein. Handy: ruhig, keine Bewegung, alles steht
   sofort da (Nevio: "uebertreib auf Handy nicht"). Nur transform/opacity.
   Der Text steht komplett im HTML. */

const ease = [0.22, 1, 0.36, 1];

export default function Drehplan() {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const ohneBewegung = useReducedMotion();
  const [handy, setHandy] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const an = () => setHandy(mq.matches);
    an();
    mq.addEventListener('change', an);
    return () => mq.removeEventListener('change', an);
  }, []);
  const still = ohneBewegung || handy;
  const an = still || sichtbar;

  return (
    <div ref={ref} className="dp">
      <div className="dp-klappe" aria-hidden="true">
        <motion.span className="dp-klappe-oben"
          initial={false}
          animate={still ? { rotate: 0 } : (sichtbar ? { rotate: [-18, 0, -3, 0] } : { rotate: -18 })}
          transition={{ duration: 0.9, ease: 'easeOut', times: [0, 0.45, 0.7, 1] }} />
        <span className="dp-klappe-unten" />
      </div>
      <dl className="dp-felder">
        {s.klappe.map((k) => (
          <div key={k.feld}><dt>{k.feld}</dt><dd>{k.wert}</dd></div>
        ))}
      </dl>

      <div className="dp-blatt">
        <p className="dp-kopf" aria-hidden="true"><span>Szene</span><span>Zeit</span><span>Motiv</span></p>
        <ol className="dp-szenen">
          {s.szenen.map((sz, i) => (
            <motion.li key={sz.titel} className="dp-szene"
              initial={false}
              animate={an ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, ease, delay: still ? 0 : 0.7 + i * 0.14 }}>
              <span className="dp-nr">{String(i + 1).padStart(2, '0')}</span>
              <span className="dp-zeit">{sz.zeit}</span>
              <span className="dp-motiv"><strong>{sz.titel}</strong><span>{sz.text}</span></span>
            </motion.li>
          ))}
        </ol>
        <p className="dp-fuss">{s.drehplanFuss}</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dp { max-width: 760px; margin: 0 auto; text-align: left; }
        /* Filmklappe: oberer Balken klappt, unterer steht. Streifen schraeg schwarz/weiss */
        .dp-klappe { position: relative; height: 64px; }
        .dp-klappe-oben, .dp-klappe-unten { position: absolute; left: 0; right: 0; height: 30px; border-radius: 3px;
          background: repeating-linear-gradient(-55deg, #15120c 0 26px, #efe7d4 26px 52px); box-shadow: 0 6px 14px -6px rgba(0, 0, 0, .6); }
        .dp-klappe-oben { top: 0; transform-origin: 3% 100%; }
        .dp-klappe-unten { bottom: 0; background-position: 13px 0; }
        .dp-felder { margin: 0; display: grid; grid-template-columns: repeat(4, 1fr); background: #1a1610; border-radius: 0 0 4px 4px; box-shadow: 0 24px 40px -22px rgba(0, 0, 0, .8); }
        .dp-felder > div { padding: 14px 16px 16px; border-left: 1px solid rgba(239, 231, 212, .14); }
        .dp-felder > div:first-child { border-left: none; }
        .dp-felder dt { font-family: var(--font-text), system-ui, sans-serif; font-size: 10.5px; letter-spacing: .24em; text-transform: uppercase; color: rgba(239, 231, 212, .55); }
        .dp-felder dd { margin: 6px 0 0; font-family: var(--font-schrift), cursive; font-size: 24px; line-height: 1.1; color: #f1e8d6; }

        /* Drehbuchblatt */
        .dp-blatt { margin-top: 18px; padding: clamp(24px, 4vw, 44px) clamp(20px, 4.5vw, 52px); color: var(--tinte);
          background: var(--blatt-hell) var(--v-papier-fein) 0 0 / 768px repeat;
          box-shadow: 0 30px 60px -24px rgba(10, 8, 4, .6), 0 2px 6px rgba(10, 8, 4, .25);
          outline: 1px solid color-mix(in srgb, var(--pergament) 70%, transparent); outline-offset: -12px; rotate: .5deg; }
        .dp-kopf, .dp-szene { display: grid; grid-template-columns: 56px 70px minmax(0, 1fr); gap: 14px; }
        .dp-kopf { margin: 0 0 6px; padding-bottom: 8px; border-bottom: 1.5px solid color-mix(in srgb, var(--tinte) 70%, transparent);
          font-family: var(--font-maschine), ui-monospace, monospace; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: color-mix(in srgb, var(--tinte) 70%, transparent); }
        .dp-szenen { list-style: none; margin: 0; padding: 0; }
        .dp-szene { padding: 14px 0; border-bottom: 1px dashed color-mix(in srgb, var(--tinte) 22%, transparent); font-family: var(--font-maschine), ui-monospace, monospace; font-size: 14px; line-height: 1.5; }
        .dp-nr { font-weight: 700; }
        .dp-zeit { color: var(--oliv-braun); }
        .dp-motiv { display: flex; flex-direction: column; gap: 2px; }
        .dp-motiv strong { font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
        .dp-motiv span { color: color-mix(in srgb, var(--tinte) 72%, transparent); }
        .dp-fuss { margin: 18px 0 0; font-family: var(--font-schrift), cursive; font-size: 24px; line-height: 1.2; color: var(--oliv-braun); }

        @media (max-width: 760px) {
          .dp-klappe { height: 46px; }
          .dp-klappe-oben, .dp-klappe-unten { height: 21px; background-size: auto; }
          .dp-felder { grid-template-columns: 1fr 1fr; }
          .dp-felder > div:nth-child(3) { border-left: none; }
          .dp-felder > div:nth-child(n + 3) { border-top: 1px solid rgba(239, 231, 212, .14); }
          .dp-felder dd { font-size: 20px; }
          .dp-blatt { rotate: 0deg; }
          .dp-kopf { display: none; }
          .dp-szene { grid-template-columns: 30px 50px minmax(0, 1fr); gap: 10px; font-size: 13px; }
          .dp-fuss { font-size: 20px; }
        }
      ` }} />
    </div>
  );
}
