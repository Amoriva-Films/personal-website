'use client';

import { useState } from 'react';

/* Fragen zum Aufklappen, aus FragenListe herausgeloest (Nevio 29.10.2026),
   damit die Stadtseiten dieselben Fragen wie /fragen bekommen.
   Linien statt Kaesten, Nummer in Schreibschrift, weiches Aufklappen
   (grid-rows, keine feste Hoehe), eine offene Frage zur Zeit, zu Beginn
   keine offen. Die Antworten stehen trotzdem komplett im HTML.
   Hover (Nevio 27.10.2026): weisses, durchscheinendes LED-Licht, das der
   Maus in der Frage folgt, dazu leuchtet die Linie darunter mit. */
function licht(e) {
  const b = e.currentTarget;
  const r = b.getBoundingClientRect();
  b.style.setProperty('--mx', `${e.clientX - r.left}px`);
}

export default function Aufklapper({ liste, ebene = 'h2' }) {
  const [offen, setOffen] = useState(-1);
  const H = ebene;

  return (
    <>
      <ul className="fragen-liste">
        {liste.map((f, i) => {
          const auf = offen === i;
          return (
            <li key={f.frage} className={`frage${auf ? ' frage--auf' : ''}`}>
              <H className="frage-h">
                <button type="button" className="frage-knopf" aria-expanded={auf} onClick={() => setOffen(auf ? -1 : i)} onPointerMove={licht}>
                  <span className="frage-nr v-schrift" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="frage-text">{f.frage}</span>
                  <span className="frage-zeichen" aria-hidden="true" />
                </button>
              </H>
              <div className="frage-antwort" data-auf={auf ? '1' : '0'}>
                <div><p className="v-text">{f.antwort}</p></div>
              </div>
            </li>
          );
        })}
      </ul>

      <style dangerouslySetInnerHTML={{ __html: `
        .fragen-liste { list-style: none; margin: 0 auto; padding: 0; max-width: 760px; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage { border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage-h { margin: 0; }
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
    </>
  );
}
