'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { zerlegen } from './Titel';
import { termine, anfrage } from '@/content/texte';

/* Verfuegbarkeit. Board: "Dass man hier drauf klicken kann und dann auch
   auf die Anfrage-Seite kommt." Beide Jahre fuehren zur Anfrage.

   Danilo 20.10.2026: die grosse Fassung war "viel zu riesig, interessiert
   keinen". Jetzt ein schmales Band: links der Titel, rechts zwei schlanke
   Jahres-Schilder. Runde 6: haengt ohne Kante an den Stimmen darueber,
   gleicher Grund, nur eine feine Linie dazwischen. 22.10.2026: Jahre als
   runde Plaketten wie in der Dolcezza-Referenz. Der Wachsstempel aus dem Board ("klatscht irgendwo
   rauf") bleibt, klein, auf 2026. */

const ease = [0.22, 1, 0.36, 1];

export default function Termine() {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <section className="termine">
      <div ref={ref} className="v-bahn termine-band">
        <div className="termine-kopf">
          <p className="v-label termine-label">{termine.zeile}</p>
          <h2 className="v-titel termine-titel">
            {zerlegen(termine.titel).map((t, i) => <span key={i}>{t.schrift ? <em>{t.wort}</em> : t.wort} </span>)}
          </h2>
        </div>

        <div className="termine-schilder">
          {termine.jahre.map((j, i) => (
            <Link key={j.jahr} href={anfrage.href} className={i === 0 ? 'termine-schild termine-schild--stempel' : 'termine-schild'}>
              <span className="termine-jahr">{j.jahr}</span>
              <span className="termine-frei">{j.frei}</span>
              <svg className="termine-pfeil" width="30" height="10" viewBox="0 0 30 10" aria-hidden="true"><path d="M1 5h27M24 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
              {i === 0 && (
                <span className="termine-stempel" aria-hidden="true">
                  <motion.span
                    className="termine-ring"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={sichtbar ? { scale: [0.7, 1.6], opacity: [0, 0.4, 0] } : {}}
                    transition={{ delay: 0.7, duration: 0.8, ease }}
                  />
                  <motion.span
                    className="termine-siegel"
                    initial={{ scale: 1.9, opacity: 0, rotate: -22 }}
                    animate={sichtbar ? { scale: [1.9, 0.93, 1], opacity: [0, 1, 1], rotate: [-22, -8, -8] } : {}}
                    transition={{ delay: 0.3, duration: 0.55, times: [0, 0.72, 1], ease: 'easeOut' }}
                  />
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .termine { overflow: clip; padding-block: 0 clamp(56px, 6vw, 88px); }
        .termine-band { border-top: 1px solid color-mix(in srgb, var(--ton) 14%, transparent); padding-top: clamp(32px, 3.6vw, 48px); }
        .termine-band { display: flex; align-items: center; justify-content: space-between; gap: clamp(24px, 4vw, 64px); flex-wrap: wrap; }
        .termine-label { margin: 0 0 8px; color: color-mix(in srgb, var(--ton) 65%, transparent); }
        .termine-titel { font-size: clamp(22px, 2.2vw, 32px); }
        .termine-schilder { display: flex; gap: clamp(14px, 2vw, 24px); flex-wrap: wrap; }
        .termine-schild {
          position: relative; border-radius: 999px; display: grid; grid-template-columns: auto auto; grid-template-rows: auto auto; column-gap: 18px; row-gap: 2px; align-items: center;
          padding: 16px 32px; min-width: 240px; color: var(--ton); text-decoration: none;
          border: 1px solid color-mix(in srgb, var(--ton) 40%, transparent);
          transition: background-color 400ms var(--v-ease);
        }
        .termine-schild::after { content: ''; position: absolute; inset: 4px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); pointer-events: none; }
        .termine-jahr { grid-row: 1 / 3; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(34px, 3.2vw, 46px); line-height: 1; }
        .termine-frei { font-family: var(--font-text), system-ui, sans-serif; font-size: 13px; letter-spacing: .04em; color: color-mix(in srgb, var(--ton) 82%, transparent); }
        .termine-pfeil { opacity: .6; transition: transform 400ms var(--v-ease), opacity 400ms var(--v-ease); }
        @media (hover: hover) {
          .termine-schild:hover { background: color-mix(in srgb, var(--ton) 8%, transparent); }
          .termine-schild:hover .termine-pfeil { transform: translateX(6px); opacity: 1; }
        }
        .termine-schild:focus-visible { outline: 1px solid var(--ton); outline-offset: 4px; }

        .termine-schild--stempel { padding-right: 62px; }
        .termine-stempel { position: absolute; top: -24px; right: -16px; width: 58px; aspect-ratio: 1; }
        .termine-siegel { position: absolute; inset: 0; background: var(--v-siegel) center / contain no-repeat; filter: drop-shadow(0 4px 5px color-mix(in srgb, var(--tusche) 45%, transparent)); }
        .termine-ring { position: absolute; inset: 8%; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--ton-akzent) 70%, transparent); }
        @media (max-width: 640px) { .termine-schilder { width: 100%; flex-direction: column; } .termine-schild { min-width: 0; grid-template-columns: auto 1fr; } }
      ` }} />
    </section>
  );
}
