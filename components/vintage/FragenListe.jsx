'use client';

import { useState } from 'react';
import Link from 'next/link';
import Titel from './Titel';
import SeitenKopf from './SeitenKopf';
import { marke, brief } from '@/content/texte';

/* Fragen und Antworten. Die Fragen sind die bisherigen der Live-Seite.
   Linien statt Kaesten, Nummer in Schreibschrift, weiches Aufklappen
   (grid-rows, keine feste Hoehe). Eine offene Frage zur Zeit.
   Runde 6: alles mittig (Danilo: "bei Fragen genau dasselbe, mittig"),
   und zu Beginn ist keine Frage offen. */

/* 23.10.2026: Nevio fand die Seite leer ("kommen direkt nur die Fragen").
   Jetzt: gemaltes Kopfbild, das unten in die Flaeche ausblendet, ein
   Einleitungssatz, die Fragen und am Ende ein Abschluss mit Knoepfen.
   Kopf und Rest liegen auf einer durchgehenden Flaeche (keine Kante). */
/* Hover (Nevio 27.10.2026): weisses, durchscheinendes LED-Licht, das der Maus
   in der Frage folgt, dazu leuchtet die Linie darunter an derselben Stelle. */
function licht(e) {
  const b = e.currentTarget;
  const r = b.getBoundingClientRect();
  b.style.setProperty('--mx', `${e.clientX - r.left}px`);
}

export default function FragenListe({ liste, label, titel, bild, einleitung, abschlussTitel, abschluss }) {
  const [offen, setOffen] = useState(-1);

  return (
    <div className="v-nacht fragen-flaeche">
      {/* Bild scrollt genau mit der Seite, ohne Parallax (Nevio 23.10.2026) */}
      <SeitenKopf label={label} titel={titel} bild={bild} weich />
      <section className="v-abschnitt fragen">
        <div className="v-bahn">
          {einleitung && <p className="v-text fragen-einleitung">{einleitung}</p>}
          <ul className="fragen-liste">
            {liste.map((f, i) => {
              const auf = offen === i;
              return (
                <li key={f.frage} className={`frage${auf ? ' frage--auf' : ''}`}>
                  <h2 className="frage-h">
                    <button type="button" className="frage-knopf" aria-expanded={auf} onClick={() => setOffen(auf ? -1 : i)} onPointerMove={licht}>
                      <span className="frage-nr v-schrift" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="frage-text">{f.frage}</span>
                      <span className="frage-zeichen" aria-hidden="true" />
                    </button>
                  </h2>
                  <div className="frage-antwort" data-auf={auf ? '1' : '0'}>
                    <div><p className="v-text">{f.antwort}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>

          {abschluss && (
            <div className="fragen-abschluss">
              <Titel text={abschlussTitel} className="v-titel fragen-abschluss-titel" />
              <p className="v-text">{abschluss}</p>
              <div className="fragen-knoepfe">
                <Link href="/anfrage" className="v-knopf">{brief.knopf}</Link>
                <a href={marke.whatsapp} className="v-knopf" target="_blank" rel="noopener noreferrer">{brief.whatsapp}</a>
              </div>
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .fragen-liste { list-style: none; margin: 0 auto; padding: 0; max-width: 760px; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage { border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage-h { margin: 0; }
        .fragen.v-abschnitt { background: none; padding: 0 0 clamp(72px, 8vw, 120px); margin-top: calc(clamp(40px, 5vw, 72px) * -1); }
        .fragen-einleitung { max-width: 560px; margin: 0 auto clamp(32px, 4vw, 52px); text-align: center; }
        .fragen-abschluss { max-width: 620px; margin: clamp(56px, 6vw, 88px) auto 0; text-align: center; }
        .fragen-abschluss-titel { font-size: var(--v-h2); margin-bottom: 16px; }
        .fragen-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }
        .frage-knopf {
          width: 100%; display: grid; grid-template-columns: 34px minmax(0, 1fr) 34px; align-items: center; gap: 10px;
          padding: 15px 0; background: none; border: none; cursor: pointer; text-align: center; color: inherit;
        }
        .frage-knopf { position: relative; --mx: 50%; isolation: isolate; }
        .frage-knopf::before, .frage-knopf::after { content: ''; position: absolute; left: 0; right: 0; pointer-events: none; opacity: 0; transition: opacity 450ms var(--v-ease); z-index: -1; }
        .frage-knopf::before { inset: 0; background: radial-gradient(ellipse 280px 100% at var(--mx) 100%, rgba(255, 255, 255, .15), rgba(255, 255, 255, .05) 55%, transparent 100%); }
        .frage-knopf::after { bottom: -1px; height: 1px; z-index: 0;
          background: linear-gradient(90deg, transparent calc(var(--mx) - 240px), rgba(255, 255, 255, .8) var(--mx), transparent calc(var(--mx) + 240px));
          box-shadow: 0 0 12px rgba(255, 255, 255, .35); }
        @media (hover: hover) { .frage-knopf:hover::before, .frage-knopf:hover::after { opacity: 1; } }
        .frage-knopf:focus-visible::before, .frage--auf .frage-knopf::before { opacity: .55; }
        .frage-knopf:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
        .frage-nr { font-size: 20px; color: var(--ton-akzent); line-height: 1; text-align: left; }
        .frage-text { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(18px, 1.5vw, 21px); line-height: 1.3; text-wrap: balance; }
        .frage-zeichen { position: relative; width: 14px; height: 14px; justify-self: end; }
        .frage-zeichen::before, .frage-zeichen::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: currentColor; transition: transform 400ms var(--v-ease); }
        .frage-zeichen::after { transform: rotate(90deg); }
        .frage--auf .frage-zeichen::after { transform: rotate(0deg); }
        .frage-antwort { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 500ms var(--v-ease); }
        .frage-antwort[data-auf='1'] { grid-template-rows: 1fr; }
        .frage-antwort > div { overflow: hidden; text-align: center; }
        .frage-antwort p { margin: 0 auto 20px; max-width: 60ch; font-size: 15.5px; }
        @media (prefers-reduced-motion: reduce) { .frage-antwort, .frage-zeichen::before, .frage-zeichen::after { transition: none; } .frage-knopf::before, .frage-knopf::after { transition: none; } }
      ` }} />
    </div>
  );
}
