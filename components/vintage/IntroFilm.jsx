'use client';

import { useEffect, useRef, useState } from 'react';
import { intro } from '@/content/texte';

/* Start-Intro als kleiner Film (Nevio 26.10.2026), Vorbild der Lusio-Clip auf
   Pinterest ("Episode 1"). Die Fassade mit dem Brautpaar am Fenster ist raus
   (Nevio 29.10.2026: "nur das Auto lassen"), uebrig:
   1. Auf Schwarz faehrt ein elfenbeinfarbener Oldtimer von rechts nach links
      durch und deckt dabei hinter sich AMORIVA Films auf.
   2. Das Intro blendet aus, der Hero beginnt.
   Bilder: Figma-KI (Datei "Amoriva Films Assets"). Nur transform/opacity.
   Laeuft bei jedem Laden der Startseite (auch nach Aktualisieren); beim
   Wechseln innerhalb der Seite kommt der kurze Vorhang (Intro.jsx). Ueberspringen und Escape springen ans Ende. */

const BILDER = ['/images/intro/oldtimer.jpg'];
const FAHRT = 200;      // ms bis das Auto losfaehrt
const ENDE = 2720;      // ms bis das Intro ganz weg ist
const OEFFNEN = 2370;   // Hero-Titel startet, wenn der Intro-Schriftzug fast weg ist
const MARKE_AUS = 2090; // eigener Schriftzug blendet zuerst aus, sonst ueberlagert er den Hero-Titel
const SCHWARZ_AUS = 2130; // gleich danach loest sich das Schwarz ins Video auf, ohne Pause dazwischen

export default function IntroFilm({ fertig }) {
  const [bereit, setBereit] = useState(false);
  const [weg, setWeg] = useState(false);
  const uhren = useRef([]);

  // Erst starten, wenn das Bild geladen ist (hoechstens 2,5 s warten)
  useEffect(() => {
    let offen = BILDER.length;
    const los = () => setBereit(true);
    const notfall = setTimeout(los, 2500);
    BILDER.forEach((src) => {
      const b = new Image();
      b.onload = b.onerror = () => { offen -= 1; if (!offen) { clearTimeout(notfall); los(); } };
      b.src = src;
    });
    return () => clearTimeout(notfall);
  }, []);

  useEffect(() => {
    if (!bereit) return undefined;
    uhren.current = [
      setTimeout(() => window.dispatchEvent(new Event('amoriva:intro-oeffnet')), OEFFNEN),
      setTimeout(fertig, ENDE),
    ];
    const taste = (e) => { if (e.key === 'Escape') ueberspringen(); };
    window.addEventListener('keydown', taste);
    return () => { uhren.current.forEach(clearTimeout); window.removeEventListener('keydown', taste); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bereit]);

  function ueberspringen() {
    uhren.current.forEach(clearTimeout);
    setWeg(true);
    window.dispatchEvent(new Event('amoriva:intro-oeffnet'));
    uhren.current = [setTimeout(fertig, 450)];
  }

  return (
    <div className={`film${bereit ? ' film--laeuft' : ''}${weg ? ' film--weg' : ''}`}>
      <div className="film-auto" aria-hidden="true"><img src={BILDER[0]} alt="" draggable="false" /></div>
      <p className="film-marke" aria-hidden="true">
        <span className="film-marke-titel">Amoriva</span>
        <span className="film-marke-unter">Films</span>
      </p>
      <button type="button" className="film-weiter" onClick={ueberspringen}>{intro.ueberspringen}</button>

      <style dangerouslySetInnerHTML={{ __html: `
        .film { position: fixed; inset: 0; z-index: 300; overflow: hidden; background: #000; user-select: none; }
        .film * { animation-play-state: paused; }
        .film--laeuft * { animation-play-state: running; }
        .film--laeuft { animation: film-aus 600ms cubic-bezier(.4, 0, .2, 1) ${SCHWARZ_AUS}ms both; }
        .film--weg { animation: film-aus 400ms ease both !important; }
        .film img { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }

        /* Oldtimer faehrt von rechts nach links durch */
        .film-auto { position: absolute; left: 50%; top: 52%; width: min(118vw, 1250px); aspect-ratio: 16 / 9; z-index: 2;
          margin: calc(min(118vw, 1250px) * -.28) 0 0 calc(min(118vw, 1250px) * -.5);
          -webkit-mask-image: radial-gradient(ellipse 60% 70% at 50% 50%, #000 62%, transparent 100%); mask-image: radial-gradient(ellipse 60% 70% at 50% 50%, #000 62%, transparent 100%);
          /* Start: Bug genau am rechten Bildrand (Heck/Bug liegen 43 % der Bildbreite
             neben der Mitte), damit keine schwarze Pause entsteht */
          --start: calc(50vw + min(118vw, 1250px) * .43);
          /* lighten: der schwarze Fotogrund verschwindet ganz im Schwarz */
          mix-blend-mode: lighten;
          opacity: 0; animation: film-auto 1820ms cubic-bezier(.25, .1, .45, 1) ${FAHRT}ms both; }
        @keyframes film-auto {
          0% { opacity: 1; transform: translateX(var(--start)); }
          100% { opacity: 1; transform: translateX(-112vw); }
        }

        /* Der Schriftzug wird vom Auto aufgedeckt (Nevio 26.10.2026): sichtbar ist
           immer nur der Teil rechts vom Heck. Gleiche Dauer, Verzoegerung und Kurve
           wie die Fahrt; das Heck liegt bei 42,8 % der Bildbreite rechts der Mitte. */
        .film-marke { position: absolute; left: 0; right: 0; top: 50%; z-index: 1; margin: 0; transform: translateY(-50%); text-align: center; color: var(--sand-hell); line-height: .9;
          --heck: calc(min(118vw, 1250px) * .428);
          text-shadow: 0 0 40px rgba(255, 236, 200, .25);
          animation: film-marke-auf 1820ms cubic-bezier(.25, .1, .45, 1) ${FAHRT}ms both, film-marke-aus 280ms ease ${MARKE_AUS}ms forwards; }
        .film-marke-titel { display: block; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(46px, 8vw, 128px); letter-spacing: .14em; text-indent: .14em; text-transform: uppercase; }
        .film-marke-unter { display: block; margin-top: .1em; font-family: var(--font-schrift), cursive; font-size: clamp(30px, 4.2vw, 64px); line-height: 1; color: var(--khaki); }
        @keyframes film-marke-aus { from { opacity: 1; } to { opacity: 0; } }
        @keyframes film-marke-auf {
          from { clip-path: inset(0 0 0 calc(100vw + 2 * var(--heck))); }
          to { clip-path: inset(0 0 0 calc(-62vw + var(--heck))); }
        }

        .film-weiter { position: absolute; right: clamp(16px, 3vw, 40px); bottom: clamp(16px, 3vw, 36px); z-index: 3; padding: 8px 4px; background: none; border: none; cursor: pointer;
          font-family: var(--font-text), system-ui, sans-serif; font-size: 11px; letter-spacing: .24em; text-transform: uppercase; color: rgba(255, 248, 236, .6); }
        .film-weiter:hover, .film-weiter:focus-visible { color: #fff8ec; }
        @keyframes film-aus { from { opacity: 1; } to { opacity: 0; visibility: hidden; } }
      ` }} />
    </div>
  );
}
