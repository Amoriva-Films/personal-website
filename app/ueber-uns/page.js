import SeitenKopf from '@/components/vintage/SeitenKopf';
import Titel from '@/components/vintage/Titel';
import Gruender from '@/components/vintage/Gruender';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { seiteUeberUns as s } from '@/content/texte';

/* Ueber uns als eigene Seite. Board: "Onepager macht null Sinn! Ueber uns
   will ich doch als Unterseite." Aufbau nach "About Runaway Vows" (Kopf)
   und "Meet the Founders" (Portraet und Text abwechselnd).

   Runde 7: oben steht jetzt, wofuer Amoriva steht (eigener Text, keine
   Wiederholung der Gruender-Texte darunter), dann vier Werte, dann reisst
   das Papier auf und die beiden stellen sich vor. */

const ZIFFER = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: { canonical: 'https://amoriva-films.de/ueber-uns' },
};

export default function UeberUns() {
  return (
    <>
      <main>
        {/* Kopf und "Wofuer wir stehen" sind eine durchgehende Flaeche (Nevio 23.10.2026:
            der Uebergang war als harte Kante sichtbar) */}
        <div className="v-nacht ueber-flaeche">
        <SeitenKopf label={s.label} titel={s.titel} bild={s.bild} bildLage="center 60%" weich gruen />

        <section className="v-abschnitt v-nacht amoriva-steht">
          <div className="v-bahn amoriva-steht-bahn">
            <p className="v-zeile">{s.einleitungZeile}</p>
            <Titel text={s.einleitungTitel} />
            {s.absaetze.map((a) => <p key={a.slice(0, 24)} className="v-text">{a}</p>)}
          </div>

          <ul className="v-bahn amoriva-werte">
            {s.werte.map((w, i) => (
              <li key={w.titel}>
                <span className="amoriva-werte-ziffer" aria-hidden="true">{ZIFFER[i]}</span>
                <span className="amoriva-werte-titel">{w.titel}</span>
                <span className="amoriva-werte-text">{w.text}</span>
              </li>
            ))}
          </ul>
        </section>
        </div>

        <Gruender ausfuehrlich />
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .ueber-flaeche .seitenkopf, .ueber-flaeche .amoriva-steht { background: none; }
        /* Titel ein Stueck hoeher als bei Fragen, damit er nicht auf den Koepfen im Bild sitzt */
        .ueber-flaeche .seitenkopf-inhalt { translate: 0 calc(clamp(50px, 9vh, 90px) * -1); }
        .ueber-flaeche .amoriva-steht.v-abschnitt { padding-top: 0; }
        /* Unten Platz fuer den Papier-Riss der Gruender-Section */
        .amoriva-steht.v-abschnitt { padding-bottom: clamp(130px, 13vw, 190px); }
        .amoriva-steht-bahn { max-width: 780px; text-align: center; }
        .amoriva-steht-bahn .v-titel { margin-bottom: clamp(24px, 2.6vw, 34px); }
        .amoriva-steht-bahn .v-text + .v-text { margin-top: 18px; }
        .amoriva-werte {
          list-style: none; margin-top: clamp(48px, 5vw, 72px); padding-top: 28px; max-width: 1080px;
          display: grid; grid-template-columns: repeat(3, 1fr); row-gap: 40px; text-align: center;
          border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent);
        }
        .amoriva-werte li { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 20px; border-left: 1px solid color-mix(in srgb, var(--ton) 11%, transparent); }
        .amoriva-werte li:nth-child(3n + 1) { border-left: none; }
        .amoriva-werte-ziffer { font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 18px; color: var(--ton-akzent); }
        .amoriva-werte-titel { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 19px; text-transform: uppercase; letter-spacing: .06em; }
        .amoriva-werte-text { font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; line-height: 1.5; color: color-mix(in srgb, var(--ton) 70%, transparent); }
        @media (max-width: 900px) {
          .amoriva-werte { grid-template-columns: 1fr 1fr; row-gap: 32px; }
          .amoriva-werte li:nth-child(3n + 1) { border-left: 1px solid color-mix(in srgb, var(--ton) 11%, transparent); }
          .amoriva-werte li:nth-child(odd) { border-left: none; }
        }
        /* Handy: eine Spalte, zwei waren breiter als der Schirm (28.10.2026) */
        @media (max-width: 560px) {
          .amoriva-werte { grid-template-columns: 1fr; }
          .amoriva-werte li { border-left: none !important; }
        }
      ` }} />
    </>
  );
}
