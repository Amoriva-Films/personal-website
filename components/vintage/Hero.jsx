'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { hero } from '@/content/texte';

/* Hero.

   Board: "Hero-Video soll erstmal bestehen bleiben, danach alles vintage.
   Du kannst aber das Hero-Video vintage umrahmen."

   Danilo 20.10.2026 (Runde 4): Papier als Hintergrund "macht gar keinen
   Sinn", zurueck zu einem luxurioesen, dunklen Gruen (#111509). Der Titel
   bleibt beim Video und geht beim Hochscrollen wieder gross in die Mitte.

   Also: oben Vollbild-Video (erste Section bleibt Vollbild). Beim
   Scrollen schrumpft das Video auf den Sandgrund (22.10.2026: neue
   Farbwelt). Kein Goldrahmen mehr ("einer zu viel"), nur ein weicher
   Schatten, als laege ein Abzug auf dem Papier. Der Titel sitzt auf
   dem Video und skaliert mit, beim Hochscrollen waechst alles zurueck.
   Danach scrollt das gerahmte Bild nach oben weg und die Seite geht
   weiter. Nur transform und opacity werden animiert. */

const ease = [0.22, 1, 0.36, 1];
const UEBERBLENDUNG = 1.1;
const ENDE = 0.6;

export default function Hero() {
  const huelleRef = useRef(null);
  const videoRef = useRef(null);
  const zweitRef = useRef(null);
  const [reduziert, setReduziert] = useState(false);
  const [bereit, setBereit] = useState(false);

  // 0 = Huelle oben am Schirm, 1 = Huelle unten am Schirm: genau die
  // Strecke, auf der die Buehne klebt.
  const { scrollYProgress } = useScroll({ target: huelleRef, offset: ['start start', 'end end'] });
  const skala = useTransform(scrollYProgress, [0, 0.75], [1, ENDE]);
  const rahmen = useTransform(scrollYProgress, [0.12, 0.6], [0, 1]);
  const hinweis = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const an = () => setReduziert(mq.matches);
    an();
    mq.addEventListener('change', an);
    return () => mq.removeEventListener('change', an);
  }, []);

  // Titel erst zeigen, wenn das Intro aufgeht (oder es keins gibt).
  useEffect(() => {
    const los = (e) => {
      setBereit(true);
      // Intro (Filmstreifen) uebergibt die Stelle, an der sein Film gerade ist
      const zeit = e?.detail?.zeit;
      const v = videoRef.current;
      if (v && typeof zeit === 'number' && zeit > 0) { try { v.currentTime = zeit; } catch {} }
    };
    if (window.__amorivaIntro === 'fertig') los();
    window.addEventListener('amoriva:intro-oeffnet', los);
    const notfall = setTimeout(los, 4500);
    return () => { window.removeEventListener('amoriva:intro-oeffnet', los); clearTimeout(notfall); };
  }, []);

  // Video sofort starten; auch wenn der Tab erst im Hintergrund geoeffnet wurde.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const starten = () => { const p = v.play(); if (p) p.catch(() => {}); };
    starten();
    const sichtbar = () => { if (document.visibilityState === 'visible' && v.paused) starten(); };
    document.addEventListener('visibilitychange', sichtbar);
    // iPhone im Stromsparmodus blockiert Autoplay (Nevio 28.10.2026: man musste
    // Play druecken). Dann startet das Video bei der ersten Beruehrung oder
    // beim ersten Scrollen von selbst.
    const beiGeste = () => { if (v.paused) starten(); };
    const geste = { passive: true };
    window.addEventListener('touchstart', beiGeste, geste);
    window.addEventListener('scroll', beiGeste, geste);
    window.addEventListener('pointerdown', beiGeste, geste);
    return () => {
      document.removeEventListener('visibilitychange', sichtbar);
      window.removeEventListener('touchstart', beiGeste, geste);
      window.removeEventListener('scroll', beiGeste, geste);
      window.removeEventListener('pointerdown', beiGeste, geste);
    };
  }, []);

  // Weiche Ueberblendung am Schleifenpunkt mit zwei Ebenen derselben Datei.
  useEffect(() => {
    const a = videoRef.current;
    const b = zweitRef.current;
    if (!a || !b) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { a.loop = true; return; }
    let vorne = a, hinten = b, blendet = false, bild = 0;
    const schritt = () => {
      bild = requestAnimationFrame(schritt);
      const d = vorne.duration;
      if (!d || isNaN(d)) return;
      const rest = d - vorne.currentTime;
      if (!blendet && rest <= UEBERBLENDUNG) {
        blendet = true;
        hinten.currentTime = 0;
        const p = hinten.play(); if (p) p.catch(() => {});
      }
      if (blendet) {
        const t = Math.min(1, Math.max(0, (UEBERBLENDUNG - rest) / UEBERBLENDUNG));
        hinten.style.opacity = String(t);
        vorne.style.opacity = String(1 - t);
        if (rest <= 0.03) {
          vorne.pause();
          hinten.style.opacity = '1';
          vorne.style.opacity = '0';
          const m = vorne; vorne = hinten; hinten = m;
          blendet = false;
        }
      }
    };
    bild = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(bild);
  }, []);

  const r = (wert, ruhe) => (reduziert ? ruhe : wert);

  return (
    <section ref={huelleRef} className="hero" data-dunkler-kopf="" style={{ height: reduziert ? '100svh' : '200vh' }}>
      <div className="hero-buehne">
        <motion.div className="hero-karte" style={{ scale: r(skala, 1) }}>
          {/* Weicher Schatten unter dem Video, erscheint beim Schrumpfen */}
          <motion.div className="hero-passepartout" aria-hidden="true" style={{ opacity: r(rahmen, 0) }} />

          <div className={`hero-fenster${bereit ? ' hero-fenster--auf' : ''}`}>
            <video
              ref={videoRef}
              className="hero-video"
              autoPlay muted playsInline preload="auto"
              poster="/images/hero-poster.jpg"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <video
              ref={zweitRef}
              className="hero-video"
              muted playsInline preload="auto"
              aria-hidden="true" tabIndex={-1}
              style={{ opacity: 0 }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            <div className="hero-schleier" aria-hidden="true" />

            <motion.div
              className="hero-inhalt"
              initial={{ opacity: 0, y: 14 }}
              animate={bereit ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 1.4, ease, delay: 0.15 }}
            >
              {/* Eine H1 mit Ort und Leistung (SEO, Nevio 28.10.2026), sichtbar wie vorher:
                  kleine Zeile oben, darunter gross der Name */}
              <h1 className="hero-h1">
                <span className="v-label hero-label">{hero.label}</span>
                <span className="hero-titel">{hero.titel}</span>
              </h1>
              <span className="hero-trenner" aria-hidden="true" />
              <p className="hero-unterzeile">{hero.unterzeile}</p>
            </motion.div>

            <motion.div className="hero-hinweis" aria-hidden="true" style={{ opacity: r(hinweis, 1) }}>
              <span className="v-label">{hero.scroll}</span>
              <span className="hero-hinweis-linie" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Struktur an der klebenden Buehne, nicht an der Section: sonst
           scrollt das Papier unter dem stehenden Video weiter (22.10.2026) */
        .hero { position: relative; background: transparent; }
        /* Papier und Wolken haengen an der klebenden Buehne, nicht an der
           Seite: solange das Video steht, steht auch der Hintergrund
           (Danilo: "der Hintergrund scrollt mit, macht keinen Sinn").
           Die Zone darunter (.tag-zone--morgen) setzt das Gemaelde genau
           dort fort, wo die Buehne aufhoert. */
        .hero-buehne::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: url("/images/vintage/tag.webp") center top / max(100%, 1100px) auto no-repeat;
          mix-blend-mode: multiply; opacity: .24;
        }
        .hero-karte { z-index: 1; }
        .hero-buehne {
          background: var(--sand-hell) var(--v-papier-fein) 0 0 / 768px repeat;
          position: sticky; top: 0; height: 100svh; min-height: 600px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .hero-karte { position: relative; width: 100%; height: 100%; will-change: transform; }

        .hero-passepartout {
          position: absolute; inset: 0; pointer-events: none;
          box-shadow: 0 40px 80px -30px rgba(46, 43, 34, .55), 0 6px 18px rgba(46, 43, 34, .18);
        }

        .hero-fenster { position: absolute; inset: 0; overflow: hidden; background: var(--nacht-hell); }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        /* Wenn das Intro aufreisst, zoomt das Video leicht heran (Intro, Fassung 4) */
        .hero-fenster .hero-video { transform: scale(1.06); transition: transform 2s cubic-bezier(.16, 1, .3, 1); }
        .hero-fenster--auf .hero-video { transform: scale(1); }
        @media (prefers-reduced-motion: reduce) { .hero-fenster .hero-video { transform: none; transition: none; } }
        .hero-schleier {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom,
            color-mix(in srgb, var(--tusche) 52%, transparent) 0%,
            color-mix(in srgb, var(--tusche) 16%, transparent) 32%,
            color-mix(in srgb, var(--tusche) 16%, transparent) 62%,
            color-mix(in srgb, var(--tusche) 64%, transparent) 100%);
        }

        .hero-inhalt {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 0 10%; color: var(--blatt);
        }
        .hero-h1 { margin: 0; font: inherit; }
        .hero-h1 > span { display: block; }
        .hero-label { margin: 0 0 28px; opacity: .85; text-shadow: 0 1px 14px color-mix(in srgb, var(--tusche) 60%, transparent); }
        .hero-titel {
          margin: 0; font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: var(--v-display); line-height: .95; letter-spacing: .14em; text-indent: .14em;
          text-transform: uppercase; text-shadow: 0 2px 26px color-mix(in srgb, var(--tusche) 55%, transparent);
        }
        .hero-trenner { display: block; width: 64px; height: 1px; margin: 26px 0 22px; background: currentColor; opacity: .6; }
        .hero-unterzeile {
          margin: 0; max-width: 34ch; font-family: var(--font-display), Georgia, serif;
          font-style: italic; font-weight: 500; font-size: clamp(19px, 1.9vw, 26px); line-height: 1.3;
          text-wrap: balance; text-shadow: 0 1px 16px color-mix(in srgb, var(--tusche) 60%, transparent);
        }
        .hero-hinweis {
          position: absolute; left: 50%; bottom: 26px; z-index: 3; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--blatt);
        }
        .hero-hinweis .v-label { font-size: 10px; opacity: .7; }
        .hero-hinweis-linie { width: 1px; height: 34px; background: currentColor; opacity: .45; }

        @media (max-width: 640px) {
          .hero-titel { letter-spacing: .09em; text-indent: .09em; }
          .hero-label { margin-bottom: 20px; }
        }
      ` }} />
    </section>
  );
}
