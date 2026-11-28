'use client';

import { stimmen } from '@/content/texte';

/* Stimmen der Paare. Eine dritte Stimme ist am 06.11.2026 raus, das Paar
   steht nicht dahinter. Nie unter anderem Namen wieder einsetzen.

   Danilo 20.10.2026: die grosse Fassung (ein Zitat riesig, Karussell) war
   "viel zu gross, das juckt keinen". Jetzt eine schmale Leiste: drei
   Zitate nebeneinander, klein und kursiv, mit feinen Trennlinien. Keine
   eigene Buehne, keine Animation. 22.10.2026: auf hellem Papier, dazu ein
   Schmetterling als Tuschezeichnung (Tilly-Referenz). */

export default function Stimmen() {
  return (
    <section className="stimmen" aria-labelledby="stimmen-titel">
      <span className="v-zeichnung stimmen-falter" style={{ '--bild': 'url(/images/vintage/falter-flug.webp)' }} aria-hidden="true" />
      <div className="v-bahn">
        <p id="stimmen-titel" className="v-zeile stimmen-zeile">{stimmen.zeile}</p>
        <ul className="stimmen-reihe">
          {stimmen.liste.map((s) => (
            <li key={s.namen}>
              <figure>
                {/* Ohne Namen und Jahr (Danilo 28.11.2026) */}
                <blockquote>&bdquo;{s.zitat}&ldquo;</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stimmen { position: relative; overflow: clip; padding-block: clamp(56px, 6vw, 88px) clamp(40px, 4vw, 56px); }
        .stimmen-falter { position: absolute; right: 6%; top: 10%; width: clamp(70px, 7vw, 110px); aspect-ratio: 1; color: var(--ton-akzent); opacity: .55; transform: rotate(10deg); }
        /* Groesser und heller (Nevio 28.10.2026: war kaum zu sehen) */
        .stimmen-zeile { text-align: center; color: var(--ton); font-size: clamp(40px, 4.6vw, 66px); line-height: 1.1; margin-bottom: clamp(28px, 3vw, 44px); }
        /* Sichtbarer (Danilo 28.11.2026): jede Stimme auf einer dunklen Glaskarte mit doppelter feiner Linie wie
           das Formular der Anfrage-Seite, groessere und hellere Schrift, grosses Anfuehrungszeichen. Kein
           backdrop-filter (Scrollen bleibt fluessig). Beide Karten gleich hoch. */
        .stimmen-reihe { list-style: none; margin: 0 auto; padding: 0; max-width: 860px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(18px, 2.4vw, 32px); align-items: stretch; }
        .stimmen-reihe li { position: relative; padding: clamp(34px, 3.2vw, 44px) clamp(24px, 2.6vw, 36px) clamp(24px, 2.4vw, 30px);
          background: rgba(34, 31, 23, .8); outline: 1px solid rgba(238, 233, 222, .5); outline-offset: -10px; box-shadow: 0 24px 50px -28px rgba(10, 8, 4, .7); }
        .stimmen-reihe li::after { content: ''; position: absolute; inset: 14px; border: 1px solid rgba(238, 233, 222, .18); pointer-events: none; }
        .stimmen-reihe li::before { content: '“'; position: absolute; left: 50%; top: 18px; transform: translateX(-50%);
          font-family: var(--font-display), Georgia, serif; font-size: 52px; line-height: .6; color: var(--khaki); }
        .stimmen-reihe figure { margin: 0; height: 100%; display: flex; flex-direction: column; text-align: center; }
        .stimmen-reihe blockquote {
          margin: auto 0; font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 500;
          font-size: 16.5px; line-height: 1.6; color: var(--sand-hell);
        }
        @media (max-width: 860px) {
          .stimmen-reihe { grid-template-columns: minmax(0, 1fr); gap: 30px; max-width: 560px; }
        }
      ` }} />
    </section>
  );
}
