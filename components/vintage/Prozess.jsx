'use client';

import { motion, useAnimationControls, useMotionValueEvent, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Titel from './Titel';
import { prozess } from '@/content/texte';

/* Prozess mit Waehlscheibe. Board: "ersetzen durch sowas, baue eine
   Vintage-Telefon-Animation, die dann diese 5 Bereiche aufzaehlt."
   Referenz: die Waehlscheibe "It's time for a better story".

   Die Buehne bleibt beim Scrollen stehen (sticky). Pro Schritt waehlt die
   Scheibe die naechste Ziffer: sie dreht sich im Uhrzeigersinn, bis das
   Loch der Ziffer am Fingeranschlag liegt, und laeuft dann zurueck. Wie
   bei einem echten Telefon steht der Anschlag still (eigene Ebene).

   Danilo 22.10.2026: die Schritte rechts waren schlecht zu erkennen, und
   man soll sie anklicken koennen, statt scrollen zu muessen. Jeder Schritt
   ist ein Knopf: Klick waehlt die Ziffer sofort und scrollt die Seite an
   die passende Stelle, damit Scrollen und Anzeige zusammenpassen.

   Drehwinkel je Ziffer, gemessen am Bild (Mitte 50% / 49,3%):
   Ziffer 1 liegt 90 Grad vor dem Anschlag, jede weitere rund 29 Grad mehr. */

const WINKEL = [90, 119, 148, 177, 205];
const ease = [0.22, 1, 0.36, 1];

export default function Prozess() {
  const huelle = useRef(null);
  const [aktiv, setAktiv] = useState(0);
  const [wahl, setWahl] = useState(0);        // zaehlt hoch, damit ein Klick auf denselben Schritt neu waehlt
  const ziel = useRef(null);                   // waehrend des Klick-Scrollens: Schritt festhalten
  const scheibe = useAnimationControls();
  const anzahl = prozess.schritte.length;

  const { scrollYProgress } = useScroll({ target: huelle, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (ziel.current !== null) return;
    setAktiv(Math.min(anzahl - 1, Math.max(0, Math.floor(p * anzahl * 0.999))));
  });

  // Waehlen: hin bis zum Anschlag, kurz halten, zuruecklaufen
  useEffect(() => {
    const w = WINKEL[aktiv];
    scheibe.start({
      rotate: [0, w, w, 0],
      transition: { duration: 2.1, times: [0, 0.42, 0.52, 1], ease: ['easeInOut', 'linear', [0.35, 0, 0.25, 1]] },
    });
  }, [aktiv, wahl, scheibe]);

  const waehlen = useCallback((i) => {
    setAktiv(i);
    setWahl((n) => n + 1);
    const el = huelle.current;
    if (!el) return;
    // Mitte des Abschnitts fuer Schritt i auf der klebenden Strecke
    const strecke = el.offsetHeight - window.innerHeight;
    const oben = el.getBoundingClientRect().top + window.scrollY;
    const y = oben + strecke * ((i + 0.5) / anzahl);
    ziel.current = i;
    const frei = () => { ziel.current = null; };
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1, onComplete: frei });
    else { window.scrollTo({ top: y, behavior: 'smooth' }); }
    setTimeout(frei, 1500);
  }, [anzahl]);

  return (
    <section ref={huelle} className="prozess v-nacht" style={{ height: `${anzahl * 75 + 60}vh` }}>
      <div className="prozess-buehne">
        <div className="v-bahn prozess-raster">
          <div className="prozess-scheibe" aria-hidden="true">
            <motion.img
              src="/images/brief/waehlscheibe-rad.webp" alt="" className="prozess-rad"
              animate={scheibe} initial={{ rotate: 0 }} draggable={false}
            />
            <img src="/images/brief/waehlscheibe-anschlag.webp" alt="" className="prozess-anschlag" draggable={false} />
            <div className="prozess-mitte">
              <span className="v-label">{prozess.schritt}</span>
              <motion.span key={aktiv} className="prozess-zahl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                {String(aktiv + 1).padStart(2, '0')}
              </motion.span>
              <motion.span key={`t${aktiv}`} className="prozess-mitte-titel v-schrift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
                {prozess.schritte[aktiv].titel}
              </motion.span>
            </div>
          </div>

          <div className="prozess-text">
            <p className="v-zeile">{prozess.zeile}</p>
            <Titel text={prozess.titel} />
            <ol className="prozess-liste">
              {prozess.schritte.map((s, i) => (
                <li key={s.titel} className={i === aktiv ? 'ist-aktiv' : ''}>
                  <button type="button" className="prozess-schritt" aria-current={i === aktiv ? 'step' : undefined} onClick={() => waehlen(i)}>
                    <span className="prozess-nr">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="prozess-titel">{s.titel}</span>
                      <span className="prozess-beschreibung">{s.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            {/* Handy: nur der aktive Schritt steht da, darunter die Nummern zum Antippen */}
            <div className="prozess-punkte" role="group" aria-label={prozess.zeile}>
              {prozess.schritte.map((s, i) => (
                <button key={s.titel} type="button" aria-label={s.titel} aria-current={i === aktiv ? 'step' : undefined} onClick={() => waehlen(i)}>
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .prozess { position: relative; }
        .prozess-buehne { position: sticky; top: 0; height: 100svh; min-height: 640px; display: flex; align-items: center; overflow: hidden; }
        .prozess-raster { width: 100%; display: grid; grid-template-columns: minmax(300px, 1fr) 1fr; gap: clamp(40px, 6vw, 110px); align-items: center; }

        .prozess-scheibe { position: relative; width: min(100%, 560px, 72svh); aspect-ratio: 1; margin-inline: auto; }
        .prozess-rad, .prozess-anschlag { position: absolute; inset: 0; width: 100%; height: 100%; user-select: none; }
        .prozess-rad { transform-origin: 50% 49.3%; filter: drop-shadow(0 24px 40px color-mix(in srgb, #000 55%, transparent)); }
        .prozess-anschlag { z-index: 2; pointer-events: none; }
        /* Mitte der Scheibe: Elfenbein-Etikett, darauf der aktuelle Schritt */
        .prozess-mitte {
          position: absolute; left: 50%; top: 49.3%; transform: translate(-50%, -50%); z-index: 3;
          width: 44%; aspect-ratio: 1; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          color: var(--tusche); text-align: center;
        }
        .prozess-mitte .v-label { font-size: 10px; opacity: .65; }
        .prozess-zahl { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(40px, 5vw, 70px); line-height: 1; }
        .prozess-mitte-titel { font-size: clamp(20px, 2vw, 28px); line-height: 1.1; color: var(--oliv-tief); }

        .prozess-text .v-zeile { color: var(--khaki); }
        .prozess-liste { list-style: none; margin: clamp(28px, 4vw, 44px) 0 0; padding: 0; }
        .prozess-liste li { border-top: 1px solid color-mix(in srgb, var(--sand-hell) 16%, transparent); }
        .prozess-liste li:last-child { border-bottom: 1px solid color-mix(in srgb, var(--sand-hell) 16%, transparent); }

        /* Jeder Schritt ein Knopf. Inaktiv deutlich lesbar (vorher 32 %
           Deckkraft, auf der Struktur kaum zu erkennen), aktiv hell mit
           Khaki-Linie links. */
        .prozess-schritt {
          position: relative; width: 100%; display: grid; grid-template-columns: 52px 1fr; gap: 12px;
          padding: 15px 14px 15px 0; background: none; border: none; text-align: left; color: var(--sand-hell);
          cursor: pointer; opacity: .62; transition: opacity 450ms var(--v-ease), background-color 450ms var(--v-ease);
        }
        .prozess-schritt::before {
          content: ''; position: absolute; left: -18px; top: 14px; bottom: 14px; width: 2px; background: var(--khaki);
          transform: scaleY(0); transform-origin: top; transition: transform 500ms var(--v-ease);
        }
        .ist-aktiv .prozess-schritt { opacity: 1; }
        .ist-aktiv .prozess-schritt::before { transform: scaleY(1); }
        @media (hover: hover) { .prozess-schritt:hover { opacity: .9; } }
        .prozess-schritt:focus-visible { outline: 1px solid var(--khaki); outline-offset: 2px; }
        .prozess-nr { font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 22px; color: var(--khaki); }
        .prozess-titel { display: block; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 22px; text-transform: uppercase; letter-spacing: .06em; }
        .prozess-beschreibung {
          display: block; margin-top: 4px; font-family: var(--font-text), system-ui, sans-serif; font-size: 15.5px; line-height: 1.55;
          color: color-mix(in srgb, var(--sand-hell) 82%, transparent);
        }
        .ist-aktiv .prozess-beschreibung { color: var(--sand-hell); }

        .prozess-punkte { display: none; }

        /* Handy: Scheibe unten, darueber nur der aktive Schritt und die Nummern */
        @media (max-width: 860px) {
          .prozess-raster { grid-template-columns: 1fr; gap: 28px; }
          .prozess-scheibe { width: min(74vw, 40svh); order: 2; }
          .prozess-text { order: 1; text-align: center; }
          .prozess-text .v-titel { font-size: clamp(24px, 6.4vw, 32px); }
          .prozess-liste { margin-top: 18px; }
          .prozess-liste li, .prozess-liste li:last-child { display: none; border: none; }
          .prozess-liste li.ist-aktiv { display: block; max-width: 420px; margin-inline: auto; }
          .prozess-schritt::before { display: none; }
          .prozess-punkte { display: flex; justify-content: center; gap: 8px; margin-top: 10px; }
          .prozess-punkte button {
            min-width: 44px; min-height: 44px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--sand-hell) 35%, transparent);
            background: none; color: var(--sand-hell); font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 16px; cursor: pointer;
          }
          .prozess-punkte button[aria-current='step'] { background: var(--khaki); border-color: var(--khaki); color: var(--tinte); }
        }
        @media (prefers-reduced-motion: reduce) { .prozess-schritt, .prozess-schritt::before { transition: none; } }
      ` }} />
    </section>
  );
}
