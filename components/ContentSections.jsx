'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';
// import Galerie from './Galerie';        // s. u., ausgehaengt
import TrustBadges from './TrustBadges';
// import { Filmkachel, KeineFilme } from './Filmspieler';   // s. u., ausgehaengt
// import { galerie } from '@/data/galerie';  // s. u., ausgehaengt
// import { startseitenFilm } from '@/data/filme';           // s. u., ausgehaengt

export default function ContentSections() {
  return (
    <>
      {/* ── Ein Film, direkt unter dem Hero ──────────────────────────
          AUSGEHAENGT, bis es Filme zu zeigen gibt (Nevio, 20.09.2026).
          Ein Abschnitt, der nur sagt "hier kommen bald Filme", kostet
          Vertrauen statt es aufzubauen.

          Wieder einhaengen: diesen Block entkommentieren, die Importe
          fuer Filmkachel/KeineFilme/startseitenFilm oben wieder
          aktivieren, den Link "Filme" in Nav.jsx und Footer.jsx wieder
          eintragen, den Hero-Knopf auf /filme zurueckstellen und
          'filme' wieder in app/sitemap.js aufnehmen. Die Filme selbst
          kommen in data/filme.js, dort steht die Anleitung.

      <section className="abschnitt dunkel">
        <div className="bahn">
          <FadeIn>
            {startseitenFilm ? (
              <>
                <Filmkachel film={startseitenFilm} gross />
                <div style={{ marginTop: 'var(--luft-4)', textAlign: 'center' }}>
                  <Link href="/filme" className="knopf knopf-linie">Alle Filme ansehen</Link>
                </div>
              </>
            ) : (
              <KeineFilme knapp />
            )}
          </FadeIn>
        </div>
      </section>
      */}

      {/* ── Unsere Arbeit ───────────────────────────────────────────── */}
      <section className="abschnitt hell">
        <FadeIn>
          <div className="bahn">
            {/* Ueberschrift und Text standen untereinander in einer Spalte,
                rechts blieb die halbe Seite leer. Jetzt nebeneinander -
                das Paar-Raster, das auf amoriva.app die Startseite traegt. */}
            <div className="paar">
              <div>
                <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Unsere Arbeit</p>
                <h2 className="t-gross">
                  Für einen Tag voller Gefühle, den ihr <span className="kursiv">niemals vergesst.</span>
                </h2>
              </div>
              <div>
                <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-3)' }}>
                  Eure Hochzeit ist mehr als ein Ablauf. Sie ist ein Gefühl. Der
                  Moment bevor ihr euch zum ersten Mal seht. Die Hände die sich
                  halten. Die Stimmen eurer Liebsten. Das Licht, die Musik, die
                  Aufregung und all die kleinen Augenblicke die viel zu schnell
                  vorbeigehen.
                </p>
                <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>
                  Mit Fotos und Filmen halten wir genau diese Momente fest.
                  Ehrlich, emotional und so dass ihr euch auch Jahre später noch
                  mittendrin fühlt.
                </p>
                <Link href="/anfrage" className="knopf knopf-linie">Anfrage stellen</Link>
              </div>
            </div>
            <TrustBadges />
          </div>
        </FadeIn>
      </section>

      {/* ── Bilder ───────────────────────────────────────────────────
          AUSGEHAENGT auf Nevios Wunsch (21.09.2026): "Galerie rausnehmen
          komplett". Die drei Bilder waren das Einzige, was die Seite an
          eigener Arbeit gezeigt hat.

          Wieder einhaengen: diesen Block entkommentieren, die Importe fuer
          Galerie und galerie oben wieder aktivieren, den Link "Galerie" in
          Nav.jsx und Footer.jsx eintragen, den Hero-Knopf zurueckstellen
          und 'referenzen' wieder in app/sitemap.js aufnehmen.

      <section className="abschnitt dunkel">
        <div className="bahn">
          <FadeIn>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: 'var(--luft-3)', flexWrap: 'wrap', marginBottom: 'var(--luft-4)',
            }}>
              <div>
                <p className="t-label" style={{ marginBottom: 'var(--luft-2)' }}>Galerie</p>
                <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)' }}>
                  Momente, die <span className="kursiv">bleiben.</span>
                </h2>
              </div>
              <Link href="/referenzen" className="t-fein" style={{
                color: 'var(--grau-dunkel)', textDecoration: 'none',
                borderBottom: '1px solid rgba(244,244,242,0.25)', paddingBottom: '2px',
              }}>
                Zur Galerie
              </Link>
            </div>
            <Galerie bilder={galerie} grenze={3} />
          </FadeIn>
        </div>
      </section>
      */}

    </>
  );
}
