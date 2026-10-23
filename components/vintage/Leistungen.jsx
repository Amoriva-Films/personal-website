'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Titel from './Titel';
import { leistungen, anfrage, marke } from '@/content/texte';

/* Leistungen. Vorbild (Danilo 22.10.2026: "genau so, richtig clean"):
   "Wedding Sessions" aus dem Board.
   Links: ein grosses, blasses Foto, darauf eine Fotokarte mit Bogenbild,
   eine Kordel mit Schleife quer darueber, ein Wachssiegel und ein runder
   Stempel mit dem Namen. Rechts mittig: Titel, kleine Unterzeile in
   Schreibmaschine, die drei Pakete zum Aufklappen (zu Beginn zu), Knopf.

   Keine Preise (Nevio: keine Zahlen). Echtes Material: Kordel und Siegel
   sind Fotos (Figma-KI), der Olivenzweig im Stempel eine Tuschezeichnung. */

const STEMPEL = `${marke.name} · Hochzeitsfilm & Fotografie · Wolfsburg · `;

function Stempel() {
  return (
    <div className="sitzung-stempel" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs><path id="stempel-kreis" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth=".8" />
        <text><textPath href="#stempel-kreis" textLength="482">{STEMPEL.toUpperCase()}</textPath></text>
      </svg>
      <span className="v-zeichnung sitzung-stempel-zweig" style={{ '--bild': 'url(/images/vintage/olive.webp)' }} />
    </div>
  );
}

export default function Leistungen() {
  const [offen, setOffen] = useState(-1);
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });

  return (
    <section id="leistungen" className="v-abschnitt v-sand leistungen">
      <div className="v-bahn sitzung">
        <div ref={ref} className="sitzung-bild">
          <div className="sitzung-grund">
            <Image src="/images/paare/trauung-weit.webp" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" quality={60} />
          </div>
          <motion.div
            className="sitzung-karte"
            initial={{ y: 30, opacity: 0, rotate: -1 }}
            animate={sichtbar ? { y: 0, opacity: 1, rotate: -1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sitzung-bogen">
              <Image src={leistungen.bild.src} alt={leistungen.bild.alt} fill sizes="(max-width: 900px) 40vw, 16vw" quality={85} />
            </div>
            <span className="sitzung-schleife" aria-hidden="true" />
            <span className="sitzung-umschlag" aria-hidden="true" />
          </motion.div>
          <motion.span
            className="sitzung-siegel" aria-hidden="true"
            initial={{ scale: 1.8, opacity: 0, rotate: -20 }}
            animate={sichtbar ? { scale: [1.8, 0.94, 1], opacity: [0, 1, 1], rotate: -8 } : {}}
            transition={{ delay: 0.7, duration: 0.55, times: [0, 0.72, 1], ease: 'easeOut' }}
          />
          <Stempel />
        </div>

        <div className="sitzung-text">
          <Titel text={leistungen.titel} className="v-titel sitzung-titel" />
          <p className="sitzung-unter">{leistungen.untertitel}</p>

          <ul className="sitzung-liste">
            {leistungen.pakete.map((p, i) => {
              const auf = offen === i;
              return (
                <li key={p.titel} className={`sitzung-paket${auf ? ' sitzung-paket--auf' : ''}`}>
                  <button type="button" className="sitzung-kopf" aria-expanded={auf} onClick={() => setOffen(auf ? -1 : i)}>
                    <span className="sitzung-paket-titel">{p.titel}</span>
                    <svg className="sitzung-pfeil" width="12" height="8" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                  </button>
                  <div className="sitzung-inhalt" data-auf={auf ? '1' : '0'}>
                    <div>
                      <p className="v-label sitzung-paket-unter">{p.unter}</p>
                      <p className="v-text sitzung-beschreibung">{p.text}</p>
                      <ul className="sitzung-punkte">{p.inhalt.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link href={anfrage.href} className="v-knopf">{leistungen.knopf}</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leistungen.v-abschnitt { padding-block: clamp(56px, 6vw, 96px); }
        .sitzung { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: clamp(32px, 5vw, 80px); align-items: center; max-width: 1360px; }

        /* Links: Komposition in festem Seitenverhaeltnis, alles in % */
        .sitzung-bild { position: relative; aspect-ratio: 860 / 560; }
        .sitzung-grund { position: absolute; left: 0; right: 0; top: 0; height: 84%; overflow: hidden; opacity: .5; filter: grayscale(.85) sepia(.15); }
        .sitzung-grund img { object-fit: cover; }
        .sitzung-karte {
          position: absolute; left: 30%; top: 8%; width: 35%; aspect-ratio: 0.74; padding: 6.5% 5.5% 14%;
          background: #F5F2EA; box-shadow: 0 24px 40px -18px rgba(46, 43, 34, .5), 0 2px 6px rgba(46, 43, 34, .15);
        }
        /* feine Praegelinie auf der Karte */
        .sitzung-karte::before { content: ''; position: absolute; inset: 3.5%; border: 1px solid rgba(46, 43, 34, .14); pointer-events: none; }
        .sitzung-bogen { position: relative; height: 100%; overflow: hidden; border-radius: 50% 50% 4px 4px / 30% 30% 4px 4px; box-shadow: inset 0 0 0 1px rgba(46, 43, 34, .2); }
        .sitzung-bogen img { object-fit: cover; }
        /* Kordel um die Karte geschlungen (Danilo 22.10.2026: "umarmt", nicht
           links und rechts ueberstehend). Das Foto ist 24 % breiter als die
           Karte, die Schnur wird genau an den Kartenkanten abgeschnitten
           (12 / 124 = 9,68 %). Die Schnur liegt im Foto bei 25,8 % der Hoehe,
           das ist auf der Karte 77,3 %; dort sitzen kleine Umschlaege, an
           denen sie hinter die Karte laeuft. */
        .sitzung-schleife {
          position: absolute; left: -12%; right: -12%; top: 63%; aspect-ratio: 1024 / 617;
          background: url("/images/vintage/schleife.webp") center / 100% 100% no-repeat;
          clip-path: inset(-60% 9.68% -60% 9.68%);
          filter: drop-shadow(0 3px 3px rgba(46, 43, 34, .3)); pointer-events: none;
        }
        .sitzung-umschlag { position: absolute; left: 0; right: 0; top: 77.3%; height: 1.7%; transform: translateY(-50%); pointer-events: none; }
        .sitzung-umschlag::before, .sitzung-umschlag::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 5px; border-radius: 3px;
          box-shadow: 0 1px 2px rgba(46, 43, 34, .35);
        }
        .sitzung-umschlag::before { left: -3px; background: linear-gradient(to right, #8E6E55, #C59F82); }
        .sitzung-umschlag::after { right: -3px; background: linear-gradient(to left, #8E6E55, #C59F82); }
        .sitzung-siegel { position: absolute; left: 58%; top: 76%; width: 12%; aspect-ratio: 1; background: var(--v-siegel) center / contain no-repeat; filter: drop-shadow(0 5px 6px rgba(46, 43, 34, .4)); }

        .sitzung-stempel { position: absolute; left: 13%; top: 10%; width: 24%; aspect-ratio: 1; color: var(--oliv-braun); opacity: .85; mix-blend-mode: multiply; }
        .sitzung-stempel svg { width: 100%; height: 100%; animation: stempel-dreht 60s linear infinite; }
        .sitzung-stempel text { font-family: var(--font-display), Georgia, serif; font-weight: 600; font-size: 15px; letter-spacing: 2px; fill: currentColor; }
        .sitzung-stempel-zweig { position: absolute; inset: 27%; color: currentColor; }
        @keyframes stempel-dreht { to { transform: rotate(360deg); } }

        /* Rechts: alles mittig */
        .sitzung-text { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .sitzung-titel { text-transform: none; letter-spacing: .01em; font-size: clamp(34px, 3.6vw, 56px); line-height: 1.08; }
        .sitzung-unter { margin: 14px 0 clamp(24px, 2.6vw, 34px); font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13.5px; color: var(--ton-akzent); }
        .sitzung-liste { list-style: none; margin: 0 0 clamp(26px, 3vw, 38px); padding: 0; width: 100%; max-width: 520px; border-top: 3px double color-mix(in srgb, var(--ton) 30%, transparent); }
        .sitzung-paket { border-bottom: 1px solid color-mix(in srgb, var(--ton) 22%, transparent); }
        .sitzung-kopf {
          width: 100%; display: grid; grid-template-columns: 18px minmax(0, 1fr) 18px; align-items: center; gap: 10px;
          padding: 18px 0; background: none; border: none; cursor: pointer; color: inherit;
        }
        .sitzung-kopf:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
        .sitzung-paket-titel { grid-column: 2; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(19px, 1.6vw, 23px); letter-spacing: .02em; }
        .sitzung-pfeil { justify-self: end; opacity: .7; transition: transform 400ms var(--v-ease); }
        .sitzung-paket--auf .sitzung-pfeil { transform: rotate(180deg); }
        .sitzung-inhalt { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 500ms var(--v-ease); }
        .sitzung-inhalt[data-auf='1'] { grid-template-rows: 1fr; }
        .sitzung-inhalt > div { overflow: hidden; }
        .sitzung-paket-unter { margin: 0 0 10px; color: var(--ton-akzent); }
        .sitzung-beschreibung { margin: 0 auto 14px; max-width: 46ch; font-size: 15px; }
        .sitzung-punkte { list-style: none; margin: 0 0 22px; padding: 0; display: flex; flex-direction: column; gap: 6px; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13.5px; color: color-mix(in srgb, var(--ton) 82%, transparent); }

        @media (max-width: 900px) {
          .sitzung { grid-template-columns: minmax(0, 1fr); }
          .sitzung-bild { max-width: 620px; width: 100%; margin-inline: auto; }
        }
        @media (prefers-reduced-motion: reduce) { .sitzung-stempel svg { animation: none; } .sitzung-inhalt, .sitzung-pfeil { transition: none; } }
      ` }} />
    </section>
  );
}
