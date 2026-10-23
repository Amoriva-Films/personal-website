'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';

/* Weiches Scrollen auf der ganzen Seite (Lenis, Grundausstattung laut
   STYLE.md). Einmal im Layout, nicht pro Seite: zwei Instanzen wuerden
   sich gegenseitig das Scrollen streitig machen.

   Das Intro sperrt das Scrollen, solange das Papier zu ist. Es setzt
   data-sperre auf <html> und schickt amoriva:sperre / amoriva:frei. Weil
   das Intro als Kind zuerst startet, wird data-sperre auch beim Anlegen
   geprueft.

   Jede neue Seite startet oben (Danilo, Runde 10: "immer von oben
   starten, egal ob ich schon mal drauf war"). Lenis behaelt sonst seine
   alte Position und scrollt die neue Seite dorthin zurueck; auch der
   Browser soll beim Zurueckgehen keine Position wiederherstellen. */

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pfad = usePathname();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pfad]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    // Fuer gezieltes Scrollen aus Komponenten (z. B. Prozess-Schritte anklicken)
    window.__lenis = lenis;

    if (document.documentElement.dataset.sperre) lenis.stop();
    const sperre = () => lenis.stop();
    const frei = () => lenis.start();
    window.addEventListener('amoriva:sperre', sperre);
    window.addEventListener('amoriva:frei', frei);

    let bild = 0;
    function raf(time) {
      lenis.raf(time);
      bild = requestAnimationFrame(raf);
    }
    bild = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(bild);
      window.removeEventListener('amoriva:sperre', sperre);
      window.removeEventListener('amoriva:frei', frei);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  // "Bewegung reduzieren" gilt damit fuer jede framer-motion-Animation der Seite.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
