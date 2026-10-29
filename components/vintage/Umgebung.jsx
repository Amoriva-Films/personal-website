'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* "In Wolfsburg und Umgebung" als dezente alte Landkarte (Nevio
   29.10.2026: "ganz dezent, chillig"). Eine Karte mit feinem Doppel-
   rahmen, links Zeile und Text, rechts die Staedte als Punkte, Wolfsburg
   in der Mitte mit Ring, feine gestrichelte Wege zu den anderen Orten.
   Lage nach echten Koordinaten (Laenge x cos 52,4°), nur grob.

   Desktop: die Wege zeichnen sich beim Hereinscrollen langsam ein.
   Handy: alles steht sofort da, Karte unter dem Text. */

const orte = [
  { name: 'Wolfsburg', x: 496, y: 210, mitte: true },
  { name: 'Gifhorn', x: 407, y: 171, lage: 'links' },
  { name: 'Braunschweig', x: 396, y: 305, lage: 'links' },
  { name: 'Wolfenbüttel', x: 403, y: 375, lage: 'links' },
  { name: 'Helmstedt', x: 586, y: 330, lage: 'unten' },
  { name: 'Hannover', x: 90, y: 241, lage: 'unten' },
  { name: 'Celle', x: 225, y: 83, lage: 'unten' },
];
const mitte = orte[0];

export default function Umgebung({ zeile, text }) {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
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
    <div ref={ref} className="ug">
      <div className="ug-text">
        <p className="v-zeile ug-zeile">{zeile}</p>
        <p className="v-text">{text}</p>
      </div>

      <svg className="ug-karte" viewBox="40 40 620 390" role="img" aria-label="Karte: Wolfsburg mit Gifhorn, Braunschweig, Wolfenbüttel, Helmstedt, Hannover und Celle">
        {/* feines Gradnetz wie auf alten Karten */}
        <g className="ug-netz">
          {[110, 220, 330].map((y) => <line key={y} x1="0" x2="660" y1={y} y2={y} />)}
          {[165, 330, 495].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="440" />)}
        </g>
        {/* Wege von Wolfsburg aus */}
        {orte.slice(1).map((o, i) => (
          <motion.path key={o.name} className="ug-weg"
            d={`M${mitte.x} ${mitte.y} Q ${(mitte.x + o.x) / 2} ${Math.min(mitte.y, o.y) - 26} ${o.x} ${o.y}`}
            initial={false}
            animate={an ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: still ? 0 : 1.6, ease: [0.22, 1, 0.36, 1], delay: still ? 0 : 0.3 + i * 0.18 }} />
        ))}
        {/* Orte */}
        {orte.map((o, i) => (
          <motion.g key={o.name} className={o.mitte ? 'ug-ort ug-ort--mitte' : 'ug-ort'}
            initial={false}
            animate={an ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: still ? 0 : (o.mitte ? 0.1 : 1.2 + i * 0.15) }}>
            {o.mitte && <circle className="ug-ring" cx={o.x} cy={o.y} r="15" />}
            <circle className="ug-punkt" cx={o.x} cy={o.y} r={o.mitte ? 4.5 : 3} />
            <text
              x={o.mitte ? o.x + 24 : o.lage === 'links' ? o.x - 12 : o.x}
              y={o.mitte ? o.y + 9 : o.lage === 'unten' ? o.y + 26 : o.y + 5}
              textAnchor={o.mitte ? 'start' : o.lage === 'unten' ? 'middle' : 'end'}>
              {o.name}
            </text>
          </motion.g>
        ))}
        {/* kleine Windrose */}
        <g className="ug-rose" transform="translate(610 400)">
          <path d="M0 -18 L4 0 L0 18 L-4 0 Z" />
          <path d="M-18 0 L0 -3 L18 0 L0 3 Z" />
          <text x="0" y="-24" textAnchor="middle">N</text>
        </g>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .ug { position: relative; max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: center; gap: clamp(28px, 4vw, 56px);
          padding: clamp(30px, 4vw, 52px) clamp(28px, 4vw, 56px); border-radius: 4px; text-align: left;
          border: 1px solid color-mix(in srgb, var(--ton) 14%, transparent); background: rgba(241, 232, 214, .025); }
        .ug::before { content: ''; position: absolute; inset: 6px; border: 1px solid color-mix(in srgb, var(--ton) 7%, transparent); border-radius: 2px; pointer-events: none; }
        .ug-zeile { margin: 0 0 12px; }
        .ug-text .v-text { margin: 0; }
        .ug-karte { display: block; width: 100%; height: auto; overflow: visible; }
        .ug-netz line { stroke: color-mix(in srgb, var(--ton) 7%, transparent); stroke-width: 1; }
        .ug-weg { fill: none; stroke: var(--ton-akzent); stroke-width: 1.2; stroke-dasharray: 2 6; stroke-linecap: round; opacity: .7; }
        .ug-punkt { fill: var(--ton); }
        .ug-ort text { font-family: var(--font-text), system-ui, sans-serif; font-size: 13px; letter-spacing: .22em; text-transform: uppercase; fill: color-mix(in srgb, var(--ton) 66%, transparent); transition: fill .4s ease; }
        .ug-ort--mitte text { font-family: var(--font-schrift), cursive; font-size: 30px; letter-spacing: 0; text-transform: none; fill: var(--ton-akzent); }
        .ug-ring { fill: none; stroke: var(--ton-akzent); stroke-width: 1; opacity: .7; }
        @media (hover: hover) { .ug-ort:hover text { fill: var(--ton); } }
        .ug-rose path { fill: color-mix(in srgb, var(--ton) 22%, transparent); }
        .ug-rose text { font-family: var(--font-display), Georgia, serif; font-size: 12px; fill: color-mix(in srgb, var(--ton) 35%, transparent); }
        @media (max-width: 760px) {
          .ug { grid-template-columns: 1fr; text-align: center; gap: 22px; padding: 28px 20px 24px; }
          .ug-ort text { font-size: 16px; letter-spacing: .16em; }
          .ug-ort--mitte text { font-size: 34px; letter-spacing: 0; }
        }
      ` }} />
    </div>
  );
}
