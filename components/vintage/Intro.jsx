'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/* Intro, Fassung 6 (Danilo 23.10.2026): "ganz clean, einfach Amoriva, so
   wie bei Westfeld Sicherheit". Aufbau wie dort (IntroVorhang): eine
   Flaeche, der Name fliegt herein, die Unterzeile taucht auf, dann zieht
   die Flaeche wie ein Vorhang nach oben weg.

   Hier im Oliv-Braun der Seite, Schrift in Sand. Die Animation ist reines
   CSS; das Skript regelt nur, dass das Intro beim Zurueckklicken innerhalb
   der Seite nicht noch einmal kommt (window.__amorivaIntro), sperrt
   waehrenddessen das Scrollen und gibt dem Hero das Startsignal. Bei
   "Bewegung reduzieren" ist es aus (vintage.css).

   Danilo 23.10.2026: als Preloader auf jeder Seite, bei jedem Aufruf. Unter
   AMORIVA steht der Name der Seite (Startseite: "Films"). Das Intro sitzt
   deshalb im Layout und startet bei jedem Seitenwechsel neu (key = Pfad). */

const SEITEN = {
  '/': 'Films',
  '/ueber-uns': 'Über uns',
  '/vision': 'Vision',
  '/fragen': 'Fragen',
  '/anfrage': 'Anfrage',
  '/impressum': 'Impressum',
  '/datenschutz': 'Datenschutz',
};

const useVorDemBild = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const VORHANG_AB = 1750;   // ms, wie bei Westfeld
const DAUER = 850;

const TASTEN = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End']);
function sperren(an) {
  const html = document.documentElement;
  if (an) html.dataset.sperre = '1'; else delete html.dataset.sperre;
  window.dispatchEvent(new Event(an ? 'amoriva:sperre' : 'amoriva:frei'));
}
const blockieren = (e) => { if (document.documentElement.dataset.sperre) e.preventDefault(); };
const tasteBlockieren = (e) => { if (document.documentElement.dataset.sperre && TASTEN.has(e.key)) e.preventDefault(); };

export default function IntroWechsel() {
  const pfad = usePathname() || '/';
  return <Intro key={pfad} unter={SEITEN[pfad] || 'Films'} />;
}

function Intro({ unter }) {
  const [aktiv, setAktiv] = useState(true);

  useVorDemBild(() => {
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const oeffnen = () => window.dispatchEvent(new Event('amoriva:intro-oeffnet'));
    if (reduziert) {
      window.__amorivaIntro = 'fertig';
      setAktiv(false);
      oeffnen();
      return;
    }
    window.__amorivaIntro = 'laeuft';
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    sperren(true);
    window.addEventListener('wheel', blockieren, { passive: false });
    window.addEventListener('touchmove', blockieren, { passive: false });
    window.addEventListener('keydown', tasteBlockieren);

    // Hero-Titel erscheint, waehrend der Vorhang hochzieht
    const t1 = setTimeout(oeffnen, VORHANG_AB + 200);
    const t2 = setTimeout(() => {
      window.__amorivaIntro = 'fertig';
      sperren(false);
      setAktiv(false);
    }, VORHANG_AB + DAUER + 50);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('wheel', blockieren);
      window.removeEventListener('touchmove', blockieren);
      window.removeEventListener('keydown', tasteBlockieren);
      sperren(false);
    };
  }, []);

  if (!aktiv) return null;

  return (
    <div className="intro" aria-hidden="true">
      <p className="intro-name">
        <span className="intro-titel">Amoriva</span>
        <span className="intro-unter">{unter}</span>
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        .intro {
          position: fixed; inset: 0; z-index: 300; pointer-events: none; user-select: none;
          display: flex; align-items: center; justify-content: center;
          background: var(--nacht); color: var(--sand-hell);
          animation: intro-vorhang ${DAUER}ms cubic-bezier(.65, 0, .35, 1) ${VORHANG_AB}ms both;
        }
        .intro-name { margin: 0; text-align: center; line-height: .9; }
        .intro-titel {
          display: block; font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: clamp(46px, 9vw, 140px); letter-spacing: .14em; text-indent: .14em; text-transform: uppercase;
          animation: intro-einflug 950ms cubic-bezier(.16, 1, .3, 1) 250ms both;
        }
        .intro-unter {
          display: block; margin-top: .1em; font-family: var(--font-schrift), cursive; font-weight: 400;
          font-size: clamp(30px, 4.6vw, 70px); line-height: 1; color: var(--khaki);
          animation: intro-auftauchen 600ms cubic-bezier(.16, 1, .3, 1) 1050ms both;
        }
        @keyframes intro-vorhang { from { transform: none; } to { transform: translateY(-100%); } }
        @keyframes intro-einflug { from { opacity: 0; transform: translateX(-55vw); } to { opacity: 1; transform: none; } }
        @keyframes intro-auftauchen { from { opacity: 0; transform: translateY(.35em); } to { opacity: 1; transform: none; } }
      ` }} />
    </div>
  );
}
