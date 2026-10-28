import Link from 'next/link';
import Titel from './Titel';
import Fuss from './Fuss';
import WhatsApp from '@/components/WhatsApp';

/* Rahmen fuer Impressum und Datenschutz im Vintage-Design (Nevio 26.10.2026).
   Oben ein dunkler Kopf wie auf den anderen Unterseiten (Kopfzeile liegt dort
   durchsichtig), darunter der Text auf einem Papierbogen, der auf der dunklen
   Flaeche liegt. Kopf und Bogen auf EINER Flaeche, keine Naht. */

export function RechtSeite({ titel, unter, children }) {
  return (
    <>
      <main className="v-nacht recht">
        <section className="recht-kopf" data-dunkler-kopf="flaeche">
          <p className="v-label recht-label">Rechtliches</p>
          <Titel text={titel} als="h1" className="v-titel recht-titel" />
          {unter && <p className="recht-unter">{unter}</p>}
        </section>

        <section className="recht-inhalt">
          <article className="recht-blatt">
            {children}
            <p className="recht-zurueck"><Link href="/" className="v-link">Zurück zur Startseite</Link></p>
          </article>
        </section>
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .recht { padding-bottom: clamp(72px, 8vw, 120px); }
        .recht-kopf { padding: calc(var(--v-kopf) + clamp(56px, 8vw, 110px)) var(--rand) clamp(40px, 5vw, 64px); text-align: center; }
        .recht-label { margin: 0 0 18px; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .recht-titel { font-size: var(--v-titel); }
        .recht-unter { margin: 16px 0 0; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13px; color: var(--ton-akzent); }
        .recht-inhalt { padding-inline: var(--rand); }
        .recht-blatt {
          max-width: 820px; margin-inline: auto; padding: clamp(32px, 5vw, 72px) clamp(24px, 5vw, 76px);
          color: var(--tinte); background: var(--blatt-hell) var(--v-papier-fein) 0 0 / 768px repeat;
          box-shadow: 0 30px 60px -24px rgba(10, 8, 4, .6), 0 2px 6px rgba(10, 8, 4, .25);
          outline: 1px solid color-mix(in srgb, var(--pergament) 70%, transparent); outline-offset: -14px;
        }
        .recht-abschnitt + .recht-abschnitt { margin-top: clamp(26px, 3vw, 36px); padding-top: clamp(26px, 3vw, 36px); border-top: 1px solid color-mix(in srgb, var(--tinte) 12%, transparent); }
        .recht-abschnitt h2 { margin: 0 0 12px; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(21px, 1.8vw, 26px); line-height: 1.2; }
        .recht-text { display: flex; flex-direction: column; gap: 10px; font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.7; color: color-mix(in srgb, var(--tinte) 86%, transparent); }
        .recht-text p, .recht-text ul { margin: 0; }
        .recht-text ul { padding-left: 1.2em; list-style: disc; display: flex; flex-direction: column; gap: 4px; }
        .recht-text li::marker { color: var(--oliv-braun); }
        .recht-text a { color: var(--tinte); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--tinte) 35%, transparent); text-underline-offset: 3px; overflow-wrap: anywhere; }
        @media (hover: hover) { .recht-text a:hover { text-decoration-color: var(--tinte); } }
        .recht-zurueck { margin: clamp(36px, 4vw, 52px) 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
        .recht-zurueck .v-link { color: var(--tinte); }
      ` }} />
    </>
  );
}

export function RechtAbschnitt({ titel, children }) {
  return (
    <section className="recht-abschnitt">
      <h2>{titel}</h2>
      <div className="recht-text">{children}</div>
    </section>
  );
}
