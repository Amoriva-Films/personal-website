'use client';

import Link from 'next/link';
import { useState } from 'react';
import Titel from './Titel';
import { leistungen, anfrage } from '@/content/texte';

/* Leistungen als breite Karte mit Blindpraegung (Vorbild "Why We Gather"):
   links Titel, Pakete und Knopf, rechts ein festes Feld mit den Details des
   gewaehlten Pakets. Die Fotokarte mit Kordel, Siegel und Stempel stand
   frueher links daneben und liegt seit 17.11.2026 im Fuss (Fotokarte.jsx).
   Nevio 17.11.2026: "kaum lesbar", deshalb Karte laenger und Schrift groesser,
   die Hoehe bleibt wie gehabt. */

export default function Leistungen() {
  // Ein Paket ist immer gewaehlt; seine Details stehen in einem festen Feld der Karte,
  // damit beim Wechseln nichts auf der Seite springt (Nevio 26.10.2026)
  const [gewaehlt, setGewaehlt] = useState(0);

  return (
    <section id="leistungen" className="v-abschnitt v-sand leistungen">
      <div className="v-bahn sitzung">
        <div className="sitzung-text">
          <div className="sitzung-links">
            <p className="v-label sitzung-zeile">{leistungen.zeile}</p>
            <Titel text={leistungen.titel} className="v-titel sitzung-titel" />
            <p className="sitzung-unter">{leistungen.untertitel}</p>
            <ul className="sitzung-liste">
              {leistungen.pakete.map((p, i) => (
                <li key={p.titel}>
                  <button
                    type="button" className={`sitzung-wahl${gewaehlt === i ? ' sitzung-wahl--an' : ''}`}
                    aria-pressed={gewaehlt === i} aria-controls="sitzung-feld" onClick={() => setGewaehlt(i)}
                  >
                    {p.titel}
                  </button>
                </li>
              ))}
            </ul>
            <Link href={anfrage.href} className="v-knopf">{leistungen.knopf}</Link>
          </div>

          <div id="sitzung-feld" className="sitzung-feld" aria-live="polite">
            {leistungen.pakete.map((p, i) => (
              <div key={p.titel} className={`sitzung-paket${gewaehlt === i ? ' sitzung-paket--an' : ''}`} hidden={gewaehlt !== i}>
                <p className="v-label sitzung-paket-unter">{p.unter}</p>
                <p className="v-text sitzung-beschreibung">{p.text}</p>
                <ul className="sitzung-punkte">{p.inhalt.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leistungen.v-abschnitt { padding-block: clamp(56px, 6vw, 96px); }
        .sitzung { display: grid; grid-template-columns: minmax(0, 1fr); max-width: 1360px; }

        /* Die Karte quer mit Blindpraegung (Figma-KI, Vorbild "Why We Gather").
           Feste Groesse: links Titel, Pakete und Knopf, rechts ein festes Feld mit den
           Details des gewaehlten Pakets. Beim Wechseln aendert sich keine Hoehe, links
           und die Seite bleiben stehen (Nevio 26.10.2026). Rand und Ecken per
           border-image (9-Teilung), die Mitte ist leeres Papier. */
        .sitzung-text {
          --rand: clamp(38px, 3.8vw, 58px);
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: clamp(28px, 4vw, 64px); align-items: center;
          justify-self: center; width: 100%; max-width: 1180px; height: clamp(500px, 40vw, 560px); color: var(--tinte);
          border: var(--rand) solid transparent;
          border-image: url("/images/vintage/karte-praegung.jpg") 240 fill / var(--rand) stretch;
          padding: clamp(4px, .8vw, 10px) clamp(18px, 3vw, 48px);
          filter: drop-shadow(0 22px 26px rgba(46, 43, 34, .24)) drop-shadow(0 3px 4px rgba(46, 43, 34, .16));
          rotate: -.3deg;
        }
        .sitzung-links { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .sitzung-zeile { margin: 0 0 10px; color: color-mix(in srgb, var(--tinte) 62%, transparent); }
        .sitzung-titel { text-transform: none; letter-spacing: .01em; font-size: clamp(30px, 2.9vw, 42px); line-height: 1.1; }
        .sitzung-unter { margin: 10px 0 20px; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 14px; color: var(--ton-akzent); }
        .sitzung-liste { list-style: none; margin: 0 0 18px; padding: 0; width: 100%; border-top: 1px solid color-mix(in srgb, var(--tinte) 18%, transparent); }
        .sitzung-liste li { border-bottom: 1px solid color-mix(in srgb, var(--tinte) 18%, transparent); }
        .sitzung-wahl {
          width: 100%; padding: 13px 0; background: none; border: none; cursor: pointer; color: color-mix(in srgb, var(--tinte) 55%, transparent);
          font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(19px, 1.6vw, 23px); letter-spacing: .02em;
          transition: color 300ms var(--v-ease);
        }
        .sitzung-wahl--an { color: var(--tinte); }
        .sitzung-wahl--an::before, .sitzung-wahl--an::after { content: '\\2022'; margin: 0 .6em; font-size: .7em; vertical-align: .15em; color: var(--ton-akzent); }
        @media (hover: hover) { .sitzung-wahl:hover { color: var(--tinte); } }
        .sitzung-wahl:focus-visible { outline: 1px solid currentColor; outline-offset: 2px; }
        .sitzung-links .v-knopf { margin-top: 4px; }
        /* Festes Detailfeld: gleiche Hoehe fuer alle Pakete */
        .sitzung-feld { position: relative; align-self: stretch; display: flex; align-items: center; padding-left: clamp(24px, 3.4vw, 56px); border-left: 1px solid color-mix(in srgb, var(--tinte) 16%, transparent); }
        .sitzung-paket { animation: paket-ein 450ms var(--v-ease); }
        @keyframes paket-ein { from { opacity: 0; translate: 0 6px; } to { opacity: 1; translate: 0 0; } }
        .sitzung-paket-unter { margin: 0 0 12px; font-size: 13px; color: var(--ton-akzent); }
        .sitzung-beschreibung { margin: 0 0 18px; font-size: clamp(16px, 1.25vw, 18px); line-height: 1.6; }
        .sitzung-punkte { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; font-family: var(--font-maschine), ui-monospace, monospace; font-size: clamp(14px, 1.05vw, 15px); line-height: 1.45; color: var(--tinte); }
        /* Haengender Einzug: der Strich steht links, umbrechender Text beginnt
           unter dem Text und nicht unter dem Strich (Nevio 17.11.2026) */
        .sitzung-punkte li { position: relative; padding-left: 1.5em; }
        .sitzung-punkte li::before { content: '\\2013'; position: absolute; left: 0; color: var(--ton-akzent); }

        @media (max-width: 900px) {
          .sitzung { grid-template-columns: minmax(0, 1fr); }
          .sitzung-text { grid-template-columns: minmax(0, 1fr); height: auto; }
          .sitzung-feld { border-left: none; padding-left: 0; border-top: 1px solid color-mix(in srgb, var(--tinte) 16%, transparent); padding-top: 16px; min-height: 260px; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) { .sitzung-paket { animation: none; } }
      ` }} />
    </section>
  );
}
