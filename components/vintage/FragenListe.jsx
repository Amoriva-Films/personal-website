'use client';

import { useState } from 'react';
import Titel from './Titel';

/* Fragen und Antworten. Die Fragen sind die bisherigen der Live-Seite.
   Linien statt Kaesten, Nummer in Schreibschrift, weiches Aufklappen
   (grid-rows, keine feste Hoehe). Eine offene Frage zur Zeit.
   Runde 6: alles mittig (Danilo: "bei Fragen genau dasselbe, mittig"),
   und zu Beginn ist keine Frage offen. */

/* 23.10.2026 (Danilo): kein Bild-Kopf mehr, die Seite beginnt direkt mit
   dem Titel auf demselben Grund wie die Fragen. Fragen kompakt: Nummer und
   Frage in einer Zeile, deutlich weniger Hoehe. */
export default function FragenListe({ liste, label, titel }) {
  const [offen, setOffen] = useState(-1);

  return (
    <section className="v-abschnitt v-nacht fragen" data-dunkler-kopf={titel ? 'flaeche' : undefined}>
      <div className="v-bahn">
        {titel && (
          <header className="fragen-kopf">
            <p className="v-label fragen-label">{label}</p>
            <Titel text={titel} als="h1" className="v-titel fragen-titel" />
          </header>
        )}
        <ul className="fragen-liste">
          {liste.map((f, i) => {
            const auf = offen === i;
            return (
              <li key={f.frage} className={`frage${auf ? ' frage--auf' : ''}`}>
                <h2 className="frage-h">
                  <button type="button" className="frage-knopf" aria-expanded={auf} onClick={() => setOffen(auf ? -1 : i)}>
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
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fragen-liste { list-style: none; margin: 0 auto; padding: 0; max-width: 760px; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage { border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .frage-h { margin: 0; }
        .fragen.v-abschnitt { padding: calc(var(--v-kopf) + clamp(40px, 5vw, 72px)) 0 clamp(56px, 6vw, 88px); min-height: 100svh; }
        .fragen-kopf { text-align: center; margin: 0 auto clamp(28px, 3.4vw, 44px); }
        .fragen-label { margin: 0 0 14px; color: var(--ton-akzent); }
        .fragen-titel { font-size: var(--v-titel); }
        .frage-knopf {
          width: 100%; display: grid; grid-template-columns: 34px minmax(0, 1fr) 34px; align-items: center; gap: 10px;
          padding: 15px 0; background: none; border: none; cursor: pointer; text-align: center; color: inherit;
        }
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
        @media (prefers-reduced-motion: reduce) { .frage-antwort, .frage-zeichen::before, .frage-zeichen::after { transition: none; } }
      ` }} />
    </section>
  );
}
