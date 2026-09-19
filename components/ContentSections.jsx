'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';
import Galerie from './Galerie';
import TrustBadges from './TrustBadges';
import { Filmkachel, KeineFilme } from './Filmspieler';
import { galerie } from '@/data/galerie';
import { startseitenFilm } from '@/data/filme';

export default function ContentSections() {
  return (
    <>
      {/* ── Ein Film, direkt unter dem Hero ──────────────────────────
          Das ist die Arbeit. Sie kommt vor jedem Text ueber die Arbeit. */}
      <section className="abschnitt dunkel">
        <div className="mitte">
          <FadeIn>
            {startseitenFilm ? (
              <>
                <Filmkachel film={startseitenFilm} gross />
                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                  <Link href="/filme" className="knopf knopf-linie">Alle Filme ansehen</Link>
                </div>
              </>
            ) : (
              <KeineFilme knapp />
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── Unsere Arbeit ───────────────────────────────────────────── */}
      <section className="abschnitt hell">
        <FadeIn>
          <div className="mitte-schmal">
            <p className="t-label" style={{ marginBottom: '1.75rem' }}>Unsere Arbeit</p>
            <h2 className="t-gross" style={{ marginBottom: '2rem' }}>
              Für einen Tag voller Gefühle, den ihr niemals vergessen wollt.
            </h2>
            <p className="t-text t-grau" style={{ marginBottom: '1.5rem' }}>
              Eure Hochzeit ist mehr als ein Ablauf. Sie ist ein Gefühl. Der
              Moment bevor ihr euch zum ersten Mal seht. Die Hände die sich
              halten. Die Stimmen eurer Liebsten. Das Licht, die Musik, die
              Aufregung und all die kleinen Augenblicke die viel zu schnell
              vorbeigehen.
            </p>
            <p className="t-text t-grau" style={{ marginBottom: '2.75rem' }}>
              Mit Fotos und Filmen halten wir genau diese Momente fest.
              Ehrlich, emotional und so dass ihr euch auch Jahre später noch
              mittendrin fühlt.
            </p>
            <Link href="/anfrage" className="knopf knopf-linie">Anfrage stellen</Link>
          </div>
        </FadeIn>
      </section>

      <TrustBadges />

      {/* ── Bilder ──────────────────────────────────────────────────── */}
      <section className="abschnitt dunkel">
        <div className="mitte">
          <FadeIn>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem',
            }}>
              <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)' }}>Bilder</h2>
              <Link href="/referenzen" className="t-fein" style={{
                color: 'var(--grau-dunkel)', textDecoration: 'none',
                borderBottom: '1px solid rgba(244,244,242,0.25)', paddingBottom: '2px',
              }}>
                Zur Galerie
              </Link>
            </div>
            <Galerie bilder={galerie} grenze={6} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
