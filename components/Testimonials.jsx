'use client';

import FadeIn from './FadeIn';

/* Keine Sterne, keine Bewertungszahlen. Die Initialen stehen in Grau,
   nicht in der Markenfarbe: Gruen markiert Handlungen, nicht Deko.
   Sobald ein freigegebenes Foto aus der jeweiligen Hochzeit vorliegt,
   kann es hier als "bild" eingetragen werden und ersetzt die Initialen. */

const stimmen = [
  {
    quote: 'Wir wollten eigentlich nur ein paar schöne Fotos vom Standesamt. Bekommen haben wir Bilder, die genau so aussehen wie sich der Tag angefühlt hat. Nichts gestellt, nichts gekünstelt. Wir schauen sie uns immer noch ständig an.',
    namen: 'Celine & Alex', datum: 'Hochzeitsfotografie · 2026', init: 'C&A', bild: null,
  },
  {
    quote: 'Nevio und Danilo waren den ganzen Tag da und trotzdem haben wir sie kaum bemerkt. Als wir den Film dann gesehen haben, mussten wir beide weinen. Da war alles drin, sogar Momente, die wir selbst gar nicht mitbekommen hatten.',
    namen: 'Laura & Jakob', datum: 'Hochzeitsfilm · 2026', init: 'L&J', bild: null,
  },
  {
    quote: 'Film und Fotos aus einer Hand war für uns die beste Entscheidung. Kein Abstimmen zwischen zwei Teams, einfach zwei Leute, die wussten was sie tun. Der Film und die Bilder passen perfekt zusammen und erzählen unseren Tag genau so, wie er war.',
    namen: 'Diana & Mattia', datum: 'Hochzeitsfilm und Fotografie · 2026', init: 'D&M', bild: null,
  },
];

export default function Testimonials() {
  return (
    <section className="abschnitt hell">
      <div className="bahn">
        {/* Stand nur eine Augenbraue ohne Ueberschrift - der Abschnitt
            begann damit im Nichts. Jetzt derselbe Paar-Kopf wie ueberall. */}
        <FadeIn>
          <div style={{ marginBottom: 'var(--luft-5)' }}>
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Das sagen unsere Paare</p>
            <h2 className="t-gross">
              Was danach <span className="kursiv">übrig bleibt.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="stimmen-raster">
          {stimmen.map((t, i) => (
            <FadeIn key={i}>
              {/* Zitat, Trennung durch die Kachel, darunter das Paar mit
                  Datum. Die Kachel haelt die drei Stimmen auf einer Hoehe,
                  auch wenn die Zitate verschieden lang sind.          */}
              <figure className="kachel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <blockquote style={{ flex: 1, marginBottom: 'var(--luft-4)' }}>
                  {/* Groesse als Klasse statt fest hier: ein fester Wert
                      im Element laesst sich auf dem Handy nicht mehr
                      verkleinern. Siehe .stimme-zitat in globals.css. */}
                  <p className="stimme-zitat">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 'var(--luft-2)' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: 'var(--papier-2)', border: '1px solid var(--linie)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6875rem', fontWeight: 500, color: 'var(--grau-2)',
                      flexShrink: 0,
                    }}
                  >
                    {t.init}
                  </span>
                  <span>
                    <span style={{
                      display: 'block', fontSize: 'var(--schrift-fein)',
                      fontWeight: 500, color: 'var(--tinte)',
                    }}>
                      {t.namen}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--grau-3)' }}>
                      {t.datum}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
