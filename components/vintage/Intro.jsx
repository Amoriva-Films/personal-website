'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import IntroFilm from './IntroFilm';

/* Intro (Nevio 27.10.2026): nur noch der kleine Film (IntroFilm) beim Laden der
   Startseite. Der Vorhang mit Seitenname bei jedem Seitenwechsel ist weg, das
   stoerte zu sehr. Auf allen anderen Seiten und beim Zurueckklicken zur
   Startseite gibt es keine Animation, der Hero bekommt sofort sein Startsignal.
   Das Skript sperrt waehrend des Films das Scrollen (window.__amorivaIntro). */

const useVorDemBild = typeof window === 'undefined' ? useEffect : useLayoutEffect;

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
  return <Intro key={pfad} pfad={pfad} />;
}

function Intro({ pfad }) {
  const [aktiv, setAktiv] = useState(pfad === '/');
  // null = noch nicht entschieden: bis dahin nur Schwarz, damit nichts aufblitzt
  // Einmal pro Intro entscheiden (React ruft Effekte im Dev-Modus doppelt auf)
  const filmEntschieden = useRef(null);
  const [film, setFilm] = useState(null);

  useVorDemBild(() => {
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const oeffnen = () => window.dispatchEvent(new Event('amoriva:intro-oeffnet'));
    if (filmEntschieden.current === null) {
      filmEntschieden.current = pfad === '/' && !window.__amorivaFilmGezeigt;
      if (filmEntschieden.current) window.__amorivaFilmGezeigt = true;
    }
    if (reduziert || !filmEntschieden.current) {
      window.__amorivaIntro = 'fertig';
      setAktiv(false);
      oeffnen();
      return;
    }
    setFilm(true);
    window.__amorivaIntro = 'laeuft';
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    sperren(true);
    window.addEventListener('wheel', blockieren, { passive: false });
    window.addEventListener('touchmove', blockieren, { passive: false });
    window.addEventListener('keydown', tasteBlockieren);

    return () => {
      window.removeEventListener('wheel', blockieren);
      window.removeEventListener('touchmove', blockieren);
      window.removeEventListener('keydown', tasteBlockieren);
      sperren(false);
    };
  }, []);

  function beenden() {
    window.__amorivaIntro = 'fertig';
    sperren(false);
    setAktiv(false);
  }

  if (!aktiv) return null;
  if (film) return <IntroFilm fertig={beenden} />;
  // Bis zur Entscheidung (vor dem ersten Bild) nur Schwarz, der Film beginnt schwarz
  return <div className="intro-schwarz" aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 300, background: '#000' }} />;
}
