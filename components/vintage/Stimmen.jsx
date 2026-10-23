'use client';

import { stimmen } from '@/content/texte';

/* Stimmen der Paare, die drei echten, freigegebenen Zitate der bisherigen
   Seite.

   Danilo 20.10.2026: die grosse Fassung (ein Zitat riesig, Karussell) war
   "viel zu gross, das juckt keinen". Jetzt eine schmale Leiste: drei
   Zitate nebeneinander, klein und kursiv, mit feinen Trennlinien. Keine
   eigene Buehne, keine Animation. 22.10.2026: auf hellem Papier, dazu ein
   Schmetterling als Tuschezeichnung (Tilly-Referenz). */

export default function Stimmen() {
  return (
    <section className="v-papier stimmen" aria-labelledby="stimmen-titel">
      <span className="v-zeichnung stimmen-falter" style={{ '--bild': 'url(/images/vintage/falter-flug.webp)' }} aria-hidden="true" />
      <div className="v-bahn">
        <p id="stimmen-titel" className="v-zeile stimmen-zeile">{stimmen.zeile}</p>
        <ul className="stimmen-reihe">
          {stimmen.liste.map((s) => (
            <li key={s.namen}>
              <figure>
                <blockquote>&bdquo;{s.zitat}&ldquo;</blockquote>
                <figcaption>
                  <span className="stimmen-namen">{s.namen}</span>
                  <span className="stimmen-art">{s.art}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stimmen { position: relative; overflow: clip; padding-block: clamp(56px, 6vw, 88px) clamp(40px, 4vw, 56px); }
        .stimmen-falter { position: absolute; right: 6%; top: 10%; width: clamp(70px, 7vw, 110px); aspect-ratio: 1; color: var(--ton-akzent); opacity: .55; transform: rotate(10deg); }
        .stimmen-zeile { text-align: center; color: var(--ton-akzent); margin-bottom: clamp(20px, 2.4vw, 32px); }
        .stimmen-reihe { list-style: none; margin: 0 auto; padding: 0; max-width: 1180px; display: grid; grid-template-columns: repeat(3, 1fr); }
        .stimmen-reihe li { padding: 0 clamp(18px, 2.4vw, 36px); border-left: 1px solid color-mix(in srgb, var(--ton) 13%, transparent); }
        .stimmen-reihe li:first-child { border-left: none; }
        .stimmen-reihe figure { margin: 0; }
        .stimmen-reihe blockquote {
          margin: 0 0 14px; font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 500;
          font-size: 16px; line-height: 1.55; color: color-mix(in srgb, var(--ton) 85%, transparent);
        }
        .stimmen-reihe figcaption { display: flex; flex-direction: column; gap: 2px; }
        .stimmen-namen { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 15px; letter-spacing: .08em; text-transform: uppercase; }
        .stimmen-art { font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .06em; color: var(--ton-akzent); }
        @media (max-width: 860px) {
          .stimmen-reihe { grid-template-columns: 1fr; gap: 24px; max-width: 520px; }
          .stimmen-reihe li { border-left: none; padding: 0; }
        }
      ` }} />
    </section>
  );
}
