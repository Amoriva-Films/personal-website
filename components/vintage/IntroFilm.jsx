'use client';

import { useEffect, useRef, useState } from 'react';
import { intro } from '@/content/texte';

/* Start-Intro als kleiner Film (Nevio 26.10.2026), Vorbild der Lusio-Clip auf
   Pinterest ("Episode 1"), aber ohne Tasche aufs Auto:
   1. Eine Palazzo-Fassade als weisses Modell, alle Fenster warm erleuchtet,
      im mittleren Fenster das Brautpaar. Darueber eine Zeile in Schreibschrift.
   2. Die Kamera faehrt in das mittlere Fenster mit dem Brautpaar hinein,
      das warme Licht fuellt das Bild und geht ins Schwarz ueber.
   3. Auf Schwarz faehrt ein elfenbeinfarbener Oldtimer von rechts nach links
      durch und deckt dabei hinter sich AMORIVA Films auf.
   4. Das Intro blendet aus, der Hero beginnt.
   Bilder: Figma-KI (Datei "Amoriva Films Assets"). Nur transform/opacity.
   Laeuft bei jedem Laden der Startseite (auch nach Aktualisieren); beim
   Wechseln innerhalb der Seite kommt der kurze Vorhang (Intro.jsx). Ueberspringen und Escape springen ans Ende. */

const BILDER = ['/images/intro/fassade-ruhig.jpg', '/images/intro/oldtimer.jpg'];
const ENDE = 4300;      // ms bis das Intro ganz weg ist
const OEFFNEN = 3950;   // Hero-Titel startet, wenn der Intro-Schriftzug fast weg ist
const MARKE_AUS = 3670; // eigener Schriftzug blendet zuerst aus, sonst ueberlagert er den Hero-Titel
const SCHWARZ_AUS = 3710; // gleich danach loest sich das Schwarz ins Video auf, ohne Pause dazwischen

export default function IntroFilm({ fertig }) {
  const [bereit, setBereit] = useState(false);
  const [weg, setWeg] = useState(false);
  const uhren = useRef([]);

  // Erst starten, wenn beide Bilder geladen sind (hoechstens 2,5 s warten)
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
      <div className="film-fassade" aria-hidden="true"><img src={BILDER[0]} alt="" draggable="false" /></div>
      <p className="film-zeile" aria-hidden="true">
        <span className="film-zeile-klein">{intro.filmKlein}</span>
        <span className="film-zeile-schrift">{intro.filmSchrift}</span>
      </p>
      <span className="film-licht" aria-hidden="true" />
      <span className="film-nacht" aria-hidden="true" />
      <div className="film-auto" aria-hidden="true"><img src={BILDER[1]} alt="" draggable="false" /></div>
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

        /* 1. Fassade: blendet ein, schiebt sich langsam heran, dann fliegt die
           Kamera ueber die Koepfe von Braut und Braeutigam hinweg durchs Fenster
           ins Haus, Richtung Kronleuchter (Nevio 26.10.2026), dann voll geblendet.
           Zielpunkt im Bild (1536 x 864): x 770, y 228 (zwischen Kronleuchter und
           den Koepfen im mittleren Fenster), also 2 px rechts und 204 px ueber der
           Bildmitte; umgerechnet mit dem cover-Massstab des Bildes.
           Fassade dezent: nur das Brautpaar und zwei kleine Gaeste (Nevio 26.10.2026). */
        .film-fassade { position: absolute; inset: 0;
          --m: max(100vw / 1536, 100vh / 864);
          transform-origin: calc(50% + 2 * var(--m)) calc(50% - 204 * var(--m));
          animation: film-fassade-ein 420ms ease both, film-fassade-fahrt 1960ms linear both; }
        @keyframes film-fassade-ein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes film-fassade-fahrt {
          0% { transform: scale(1); animation-timing-function: cubic-bezier(.2, .6, .4, 1); }
          40% { transform: scale(1.08); animation-timing-function: cubic-bezier(.7, 0, .95, .6); }
          100% { transform: scale(34); }
        }

        .film-zeile { position: absolute; left: 0; right: 0; top: 50%; margin: 0; transform: translateY(-50%); text-align: center; color: #fff8ec;
          text-shadow: 0 2px 24px rgba(40, 24, 8, .55); animation: film-zeile 1050ms ease 180ms both; }
        .film-zeile-klein { display: block; margin-bottom: 10px; font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .32em; text-transform: uppercase; }
        .film-zeile-schrift { display: block; font-family: var(--font-schrift), cursive; font-size: clamp(38px, 5.4vw, 76px); line-height: 1.1; }
        @keyframes film-zeile { 0% { opacity: 0; transform: translateY(-40%); } 25%, 65% { opacity: 1; transform: translateY(-50%); } 100% { opacity: 0; transform: translateY(-56%); } }

        /* 2. Durch das Fenster: das warme Licht im Raum waechst mit der Fahrt und
           blendet am Ende voll, danach Schwarz */
        .film-licht { position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(circle at 50% 52%, #fffaf0 0%, #ffe9bf 35%, #f3c77d 70%, #d9a052 100%);
          animation: film-licht 700ms cubic-bezier(.5, 0, .9, .5) 1260ms both; }
        @keyframes film-licht { 0% { opacity: 0; } 85%, 100% { opacity: 1; } }
        .film-nacht { position: absolute; inset: 0; background: #000; opacity: 0; animation: film-nacht 280ms ease 1750ms both; }
        @keyframes film-nacht { from { opacity: 0; } to { opacity: 1; } }

        /* 3. Oldtimer faehrt von rechts nach links durch */
        .film-auto { position: absolute; left: 50%; top: 52%; width: min(118vw, 1250px); aspect-ratio: 16 / 9; z-index: 2;
          margin: calc(min(118vw, 1250px) * -.28) 0 0 calc(min(118vw, 1250px) * -.5);
          -webkit-mask-image: radial-gradient(ellipse 60% 70% at 50% 50%, #000 62%, transparent 100%); mask-image: radial-gradient(ellipse 60% 70% at 50% 50%, #000 62%, transparent 100%);
          /* Start: Bug genau am rechten Bildrand (Heck/Bug liegen 43 % der Bildbreite
             neben der Mitte), damit nach dem Licht keine schwarze Pause entsteht */
          --start: calc(50vw + min(118vw, 1250px) * .43);
          /* lighten: der schwarze Fotogrund verschwindet, auch solange dahinter
             noch das warme Licht liegt (sonst faehrt ein dunkler Kasten mit) */
          mix-blend-mode: lighten;
          opacity: 0; animation: film-auto 1820ms cubic-bezier(.25, .1, .45, 1) 1780ms both; }
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
          animation: film-marke-auf 1820ms cubic-bezier(.25, .1, .45, 1) 1780ms both, film-marke-aus 280ms ease ${MARKE_AUS}ms forwards; }
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
