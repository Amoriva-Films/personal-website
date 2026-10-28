'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useAnimationControls, useMotionValueEvent, useScroll } from 'framer-motion';
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

   Nevio 26.10.2026: die Schritte stehen jetzt auf einer gepraegten Papierkarte
   (wie Leistungen), dunkel auf hell und damit klar lesbar.

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
            {/* Immer nur der aktive Schritt (Nevio 26.10.2026): grosse Nummer, Titel,
                kurzer Text und ein Link auf die passende Seite. Feste Hoehe, damit
                beim Wechsel nichts springt. */}
            <div className="prozess-schrittfeld" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={aktiv} className="prozess-einzel"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <span className="prozess-gross" aria-hidden="true">{String(aktiv + 1).padStart(2, '0')}</span>
                  <h3 className="prozess-titel">{prozess.schritte[aktiv].titel}</h3>
                  <p className="prozess-beschreibung">{prozess.schritte[aktiv].text}</p>
                  <Link href={prozess.schritte[aktiv].link.href} className="v-link prozess-link">{prozess.schritte[aktiv].link.label}</Link>
                </motion.div>
              </AnimatePresence>
            </div>
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
        .prozess-raster { width: 100%; display: grid; grid-template-columns: minmax(300px, 1fr) minmax(0, 1.05fr); gap: clamp(32px, 4.5vw, 80px); align-items: center; }

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

        /* Rechts eine Karte mit Blindpraegung wie bei Leistungen (Nevio 26.10.2026:
           "sichtbarer und cooler", einheitlich mit der Section darueber). Dunkle
           Schrift auf Papier statt blasser Schrift auf Braun. */
        .prozess-text {
          --rand: clamp(34px, 3.2vw, 48px);
          max-width: 660px; width: 100%; justify-self: center; color: var(--tinte);
          border: var(--rand) solid transparent;
          border-image: url("/images/vintage/karte-praegung.jpg") 240 fill / var(--rand) stretch;
          padding: clamp(2px, .6vw, 8px) clamp(6px, 1vw, 14px);
          filter: drop-shadow(0 26px 30px rgba(8, 6, 3, .45)) drop-shadow(0 3px 5px rgba(8, 6, 3, .3));
          rotate: .6deg;
        }
        .prozess-text .v-zeile { color: var(--oliv-braun); margin-bottom: 6px; }
        .prozess-text .v-titel { font-size: clamp(24px, 2.1vw, 31px); line-height: 1.08; }
        .prozess-schrittfeld { position: relative; min-height: clamp(250px, 24vw, 290px); margin-top: clamp(18px, 2vw, 24px); padding-top: clamp(16px, 1.8vw, 22px); border-top: 1px solid color-mix(in srgb, var(--tinte) 14%, transparent); }
        .prozess-gross { display: block; font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 500; font-size: clamp(54px, 5vw, 76px); line-height: .9; color: var(--oliv-braun); }
        .prozess-titel { margin: 8px 0 10px; font-family: var(--font-display), Georgia, serif; font-weight: 600; font-size: clamp(22px, 2vw, 28px); text-transform: uppercase; letter-spacing: .07em; }
        .prozess-beschreibung { margin: 0 0 16px; max-width: 46ch; font-family: var(--font-text), system-ui, sans-serif; font-size: 15.5px; line-height: 1.6; color: color-mix(in srgb, var(--tinte) 88%, transparent); }
        .prozess-link { color: var(--tinte); font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
        .prozess-link::after { content: ' \\2192'; }
        .prozess-punkte { display: flex; gap: 8px; margin-top: clamp(14px, 1.6vw, 20px); padding-top: clamp(14px, 1.6vw, 20px); border-top: 1px solid color-mix(in srgb, var(--tinte) 14%, transparent); }
        .prozess-punkte button {
          min-width: 42px; min-height: 42px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--tinte) 28%, transparent);
          background: none; color: var(--tinte); font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 16px; cursor: pointer;
          transition: background-color 300ms var(--v-ease), color 300ms var(--v-ease), border-color 300ms var(--v-ease);
        }
        .prozess-punkte button[aria-current='step'] { background: var(--nacht); border-color: var(--nacht); color: var(--sand-hell); }
        @media (hover: hover) { .prozess-punkte button:hover { border-color: var(--tinte); } }
        .prozess-punkte button:focus-visible { outline: 1px solid var(--oliv-braun); outline-offset: 2px; }

        /* Handy: Scheibe unten, darueber die Karte */
        @media (max-width: 860px) {
          .prozess-raster { grid-template-columns: 1fr; gap: 24px; }
          .prozess-scheibe { width: min(64vw, 32svh); order: 2; }
          .prozess-text { order: 1; }
          .prozess-text .v-titel { font-size: clamp(22px, 6vw, 28px); }
          .prozess-schrittfeld { min-height: 230px; }
        }
        @media (prefers-reduced-motion: reduce) { .prozess-punkte button { transition: none; } }
      ` }} />
    </section>
  );
}
