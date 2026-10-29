'use client';

import Link from 'next/link';
import Titel from './Titel';
import Aufklapper from './Aufklapper';
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
/* Die Liste selbst (Aufklappen, LED-Hover) steht in Aufklapper.jsx. */

export default function FragenListe({ liste, label, titel, bild, einleitung, abschlussTitel, abschluss }) {
  return (
    <div className="v-nacht fragen-flaeche">
      {/* Bild scrollt genau mit der Seite, ohne Parallax (Nevio 23.10.2026) */}
      <SeitenKopf label={label} titel={titel} bild={bild} weich />
      <section className="v-abschnitt fragen">
        <div className="v-bahn">
          {einleitung && <p className="v-text fragen-einleitung">{einleitung}</p>}
          <Aufklapper liste={liste} />

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
        .fragen.v-abschnitt { background: none; padding: 0 0 clamp(72px, 8vw, 120px); margin-top: calc(clamp(40px, 5vw, 72px) * -1); }
        .fragen-einleitung { max-width: 560px; margin: 0 auto clamp(32px, 4vw, 52px); text-align: center; }
        .fragen-abschluss { max-width: 620px; margin: clamp(56px, 6vw, 88px) auto 0; text-align: center; }
        .fragen-abschluss-titel { font-size: var(--v-h2); margin-bottom: 16px; }
        .fragen-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }
      ` }} />
    </div>
  );
}
