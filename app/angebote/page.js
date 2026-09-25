import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';

export const metadata = {
  title: 'Angebote für Film & Fotografie',
  description: 'Jede Hochzeit ist einzigartig. Deshalb erstellen wir für jedes Paar ein individuelles Angebot. Hochzeitsfilm und Fine Art Fotografie in Deutschland.',
  alternates: { canonical: 'https://amoriva-films.de/angebote' },
};

/* Keine Preise, keine Ab-Preise, keine Zahlen. Auch kein "Preis auf
   Anfrage" mehr unter jedem Block: das lenkt auf den Preis, bevor ein
   Paar die Leistung gelesen hat. Was es kostet, klaert das Gespraech. */

const leistungen = [
  {
    nummer: '01',
    name: 'Hochzeitsfilm',
    subline: 'Cinégraphie',
    beschreibung: 'Ein cinematic Hochzeitsfilm der sich anfühlt wie ein echtes Kinoerlebnis. Wir erzählen eure Geschichte so wie sie wirklich war.',
    enthalten: [
      'Hauptfilm in Cinégraphie (3 bis 12 Minuten)',
      'Emotionaler Highlights-Clip (60 bis 90 Sekunden)',
      'Vollständige Begleitung vom Morgen bis zum Abend',
      'Private Online-Galerie',
      'Soundtrack nach euren Wünschen',
      'Lieferung innerhalb von 6 bis 8 Wochen',
    ],
  },
  {
    nummer: '02',
    name: 'Film und Foto',
    subline: 'Das komplette Erlebnis',
    beschreibung: 'Beides aus einer Hand. Kein zweites Team, keine Abstimmungsprobleme. Film und Foto entstehen in perfekter Harmonie.',
    enthalten: [
      'Vollständiger Hochzeitsfilm',
      'Highlights-Clip',
      'Vollständige Fotobegleitung',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie mit Download',
      'Druckfreigabe inklusive',
      'Einheitliche Bildsprache durch ein Team',
      'Lieferung innerhalb von 6 bis 8 Wochen',
    ],
  },
  {
    nummer: '03',
    name: 'Hochzeitsfotografie',
    subline: 'Fine Art Fotografie',
    beschreibung: 'Fotos die zeitlos sind und sich anfühlen wie Gemälde. Kein gestelltes Lächeln. Echte Momente in echter Bildsprache.',
    enthalten: [
      'Vollständige Fotobegleitung',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie mit Download',
      'Druckfreigabe inklusive',
      'Lieferung innerhalb von 6 bis 8 Wochen',
    ],
  },
];

const schritte = [
  'Ihr schreibt uns kurz was ihr euch vorstellt',
  'Wir melden uns innerhalb von 24 Stunden',
  'Kurzes Gespräch um euren Tag kennenzulernen',
  'Ihr bekommt ein Angebot das wirklich zu euch passt',
];

export default function AngebotePage() {
  return (
    <>
      <Nav />

      <main className="hell" style={{ minHeight: '100vh' }}>
        <section className="abschnitt-kopf">
          <div className="bahn">
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Unsere Leistungen</p>
            <h1 className="t-display" style={{ marginBottom: 'var(--luft-3)' }}>
              Kein Angebot ist wie das andere.
            </h1>
            <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-3)' }}>
              Jede Hochzeit ist einzigartig. Deshalb erstellen wir für jedes
              Paar ein Angebot das wirklich zu ihrem Tag passt. Nicht mehr,
              nicht weniger.
            </p>
            <p className="t-text t-grau">
              Was wir euch anbieten seht ihr unten. Was es kostet besprechen
              wir nach einem kurzen Gespräch in dem wir euren Tag kennenlernen.
            </p>
          </div>
        </section>

        <section className="abschnitt" style={{ paddingTop: 0 }}>
          <div className="bahn">
            {leistungen.map((l) => (
              <div key={l.nummer} className="zwei-spalten" style={{
                borderTop: '1px solid var(--linie)',
                paddingBlock: 'var(--luft-5)',
              }}>
                <div>
                  <p className="t-label" style={{ marginBottom: 'var(--luft-2)' }}>{l.nummer}</p>
                  <h2 className="t-gross" style={{ marginBottom: 'var(--luft-1)' }}>{l.name}</h2>
                  <p className="t-fein">{l.subline}</p>
                </div>
                <div>
                  <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>{l.beschreibung}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
                    {l.enthalten.map((e, i) => (
                      <li key={i} style={{
                        display: 'flex', gap: 'var(--luft-1)', alignItems: 'flex-start',
                        fontSize: 'var(--schrift-fein)', color: 'var(--grau-2)', lineHeight: 1.6,
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="var(--gruen)" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" aria-hidden="true"
                             style={{ flexShrink: 0, marginTop: '4px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="abschnitt hell-2">
          <div className="bahn">
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Wie bekommt ihr euer Angebot?</p>
            <h2 className="t-gross" style={{ marginBottom: 'var(--luft-4)' }}>
              Einfach. Persönlich. Unverbindlich.
            </h2>
            <ol style={{ listStyle: 'none', marginBottom: '3rem' }}>
              {schritte.map((s, i) => (
                <li key={i} className="schritt">
                  <span className="schritt-ziffer" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="t-text t-grau" style={{ paddingTop: '0.5rem' }}>{s}</p>
                </li>
              ))}
            </ol>
            <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsApp />
    </>
  );
}
