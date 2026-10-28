'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Titel from './Titel';
import { momente, seiteVision as s } from '@/content/texte';

/* Vision. Board: "Vielleicht Platzhalter fuer ein Video, das da
   reinkommt, und unten beim Moodboard Bilder, die wir schon haben. Ich
   gebe dir dann nochmal genau welche." Vorbild: Emma & Liam mit
   Moodboard-Collage.

   Oben: Video-Platz im Passepartout auf Oliv (klar als Platzhalter
   markiert). Unten: Collage aus sich ueberlappenden, leicht gedrehten
   Fotos, die beim Scrollen leicht gegeneinander wandern. Die Auswahl ist
   vorlaeufig, bis Danilo die Bilder nennt. */

const COLLAGE = [
  { l: 4, o: 8, b: 26, d: -5, t: -40 },
  { l: 26, o: 30, b: 22, d: 4, t: 50 },
  { l: 45, o: 2, b: 24, d: -2, t: -60 },
  { l: 64, o: 26, b: 22, d: 6, t: 40 },
  { l: 80, o: 6, b: 17, d: -4, t: -30 },
];

function CollageFoto({ bild, lage, p }) {
  const y = useTransform(p, [0, 1], [lage.t, -lage.t]);
  return (
    <motion.figure className="moodboard-foto" style={{ left: `${lage.l}%`, top: `${lage.o}%`, width: `${lage.b}%`, rotate: lage.d, y }}>
      <div className="moodboard-abzug" style={{ aspectRatio: '2 / 3' }}>
        <Image src={bild.src} alt={bild.alt} width={bild.b} height={bild.h} sizes="(max-width: 760px) 45vw, 26vw" quality={80} />
      </div>
    </motion.figure>
  );
}

/* Der Trichter braucht eine Hoehe, bei der der Text genau unten an der
   Gegenlichtblende endet. Die Hoehe veraendert die Schraege und damit den
   Umbruch, deshalb per Binaersuche die kleinste passende Hoehe suchen. */
function useTrichter(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const passen = () => {
      if (getComputedStyle(el.querySelector('.trichter-l')).display === 'none') { el.style.height = ''; return; }
      const letzter = el.querySelector('p:last-of-type');
      let lo = 120, hi = 1400;
      while (hi - lo > 2) {
        const mitte = (lo + hi) >> 1;
        el.style.height = `${mitte}px`;
        const ende = letzter.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
        if (ende <= mitte) hi = mitte; else lo = mitte;
      }
      el.style.height = `${hi}px`;
    };
    passen();
    document.fonts?.ready.then(passen);
    window.addEventListener('resize', passen);
    return () => window.removeEventListener('resize', passen);
  }, [ref]);
}

export default function VisionInhalt() {
  const ref = useRef(null);
  const trichter = useRef(null);
  useTrichter(trichter);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bilder = momente.bilder.slice(1, 6);

  return (
    <>
      {/* Kopf und Team liegen auf EINER dunklen Flaeche, keine Naht dazwischen (Nevio 26.10.2026) */}
      <div className="v-nacht vision-flaeche">
      <section className="vision-kopf" data-dunkler-kopf="flaeche">
        <div className="v-bahn">
          <p className="v-label vision-label">{s.label}</p>
          <Titel text={s.titel} als="h1" className="v-titel vision-titel" />
          <div className="v-rahmen vision-video">
            <div className="v-rahmen-bild vision-platz">
              <span className="v-label">{s.video}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision als Anzeige: schmale Spalte im Blocksatz, die aus dem Objektiv einer
          Vintage-Kamera kommt (Nevio 26.10.2026, Vorbild alte Leica-Anzeige
          "a shade of difference"). Kamera: Figma-KI, ohne Marke, Magenta freigestellt. */}
      <section className="v-abschnitt vision-team-flaeche">
        <div className="vision-anzeige">
          <div className="vision-spalte">
            <p className="v-zeile">{s.spalteZeile}</p>
            <Titel text={s.spalteTitel} className="v-titel vision-spalte-titel" />
            {/* Trichter: zwei schraege Floats (shape-outside) lassen den Text nach unten
                bis auf die Breite der Gegenlichtblende zulaufen, wie ein Lichtkegel */}
            <div ref={trichter} className="vision-trichter">
              <span className="trichter-l" aria-hidden="true" />
              <span className="trichter-r" aria-hidden="true" />
              {s.absaetze.map((x) => <p key={x.slice(0, 20)} className="vision-spalte-text">{x}</p>)}
            </div>
          </div>
          <div className="vision-kamera">
            <Image src="/images/vintage/kamera.png" alt="" width={1024} height={1024} sizes="(max-width: 760px) 84vw, 480px" quality={85} />
          </div>
        </div>
      </section>
      </div>

      <section ref={ref} className="v-abschnitt v-papier moodboard">
        <span className="v-riss" aria-hidden="true" />
        <div className="v-bahn">
          <p className="moodboard-schrift v-schrift">{s.moodboardZeile}</p>
          <div className="moodboard-buehne">
            {bilder.map((b, i) => <CollageFoto key={b.src} bild={b} lage={COLLAGE[i]} p={scrollYProgress} />)}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .vision-kopf { padding: calc(var(--v-kopf) + clamp(48px, 7vw, 100px)) 0 clamp(120px, 14vw, 200px); text-align: center; }
        .vision-label { margin: 0 0 20px; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .vision-titel { font-size: var(--v-titel); margin-bottom: clamp(40px, 5vw, 72px); }
        .vision-video { max-width: 1040px; margin-inline: auto; }
        .vision-platz { aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; color: color-mix(in srgb, var(--ton) 70%, transparent); background: var(--ton-akzent); }
        /* Anzeige: Spaltenbreite = Breite der Gegenlichtblende, die Spalte sitzt auf dem Objektiv */
        .vision-team-flaeche.v-abschnitt { padding-bottom: clamp(40px, 5vw, 72px); }
        .vision-anzeige { --kamera: min(84vw, 480px); display: flex; flex-direction: column; align-items: center; }
        .vision-spalte { position: relative; z-index: 1; width: min(92vw, 580px); text-align: center; }
        .vision-trichter { --unten: calc(var(--kamera) * .5); height: 420px; }
        .trichter-l, .trichter-r { width: calc((100% - var(--unten)) / 2); height: 100%; }
        .trichter-l { float: left; shape-outside: polygon(0 0, 0 100%, 100% 100%); }
        .trichter-r { float: right; shape-outside: polygon(100% 0, 100% 100%, 0 100%); }
        .vision-spalte .v-zeile { margin-bottom: 10px; }
        .vision-spalte-titel { font-size: clamp(24px, 2.2vw, 32px); line-height: 1.12; margin-bottom: 14px; text-wrap: balance; }
        .vision-spalte-text { margin: 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 15.5px; line-height: 1.55; text-align: justify; text-align-last: center; hyphens: auto; -webkit-hyphens: auto; color: color-mix(in srgb, var(--ton) 88%, transparent); }
        .vision-spalte-text + .vision-spalte-text { margin-top: 10px; }
        .vision-kamera { width: var(--kamera); margin-top: calc(var(--kamera) * -.145); }
        .vision-kamera img { width: 100%; height: auto; display: block; filter: drop-shadow(0 24px 30px rgba(10, 8, 4, .5)); }
        .moodboard-abzug { overflow: hidden; box-shadow: 0 14px 30px -10px rgba(20, 21, 23, .45), 0 2px 6px rgba(20, 21, 23, .18); }
        .moodboard-schrift { text-align: center; margin: 0 0 clamp(16px, 2vw, 28px); padding-top: .15em; font-size: clamp(42px, 4.6vw, 72px); line-height: 1; color: var(--ton); }
        .moodboard-buehne { position: relative; height: clamp(300px, 30vw, 440px); max-width: 980px; margin-inline: auto; }
        .moodboard-foto { position: absolute; margin: 0; will-change: transform; }
        .moodboard-foto img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 760px) {
          .vision-trichter { height: auto; }
          .trichter-l, .trichter-r { display: none; }
          .moodboard-buehne { height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .moodboard-foto { position: relative; left: auto !important; top: auto !important; width: auto !important; }
        }
      ` }} />
    </>
  );
}
