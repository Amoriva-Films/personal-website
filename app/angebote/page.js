export const metadata = {
  title: 'Angebote – Hochzeitsfilm und Fotografie individuell',
  description: 'Jede Hochzeit ist einzigartig. Deshalb erstellen wir für jedes Paar ein individuelles Angebot. Hochzeitsfilm und Fine Art Fotografie in Deutschland.',
  alternates: { canonical: 'https://amoriva-films.de/angebote' },
};

const serif = 'var(--font-cormorant), Georgia, serif';
const sans  = 'var(--font-inter), system-ui, sans-serif';

const leistungen = [
  {
    nummer: '01',
    name: 'Hochzeitsfilm',
    subline: 'Cinematische Videografie',
    beschreibung: 'Ein cinematic Hochzeitsfilm der sich anfühlt wie ein echtes Kinoerlebnis. Wir erzählen eure Geschichte so wie sie wirklich war.',
    enthalten: [
      'Cinematischer Hauptfilm (3 bis 12 Minuten)',
      'Emotionaler Highlights-Clip (60 bis 90 Sekunden)',
      'Vollständige Begleitung vom Morgen bis zum Abend',
      'Private Online-Galerie',
      'Soundtrack nach euren Wünschen',
      'Lieferung innerhalb von 6 bis 8 Wochen',
    ],
    highlight: false,
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
    ],
    highlight: true,
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
    highlight: false,
  },
];

export default function AngebotePage() {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh', fontFamily: sans }}>
      {/* Hero */}
      <section style={{
        padding: '8rem 1.5rem 5.5rem',
        textAlign: 'center',
        background: '#FFFFFF',
        borderBottom: '0.5px solid #E8E2DC',
      }}>
        <div style={{ maxWidth: '660px', margin: '0 auto' }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#8A7B6F', marginBottom: '1.5rem',
          }}>
            Unsere Leistungen
          </p>
          <h1 style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400,
            color: '#3B2F2A', lineHeight: 1.2, marginBottom: '1.75rem',
          }}>
            Kein Angebot ist wie das andere.
          </h1>
          <div style={{ width: '2.5rem', height: '1px', background: '#C4973A', margin: '0 auto 1.75rem' }} />
          <p style={{ fontSize: '17px', lineHeight: 1.9, color: '#6B5E57', marginBottom: '1.25rem' }}>
            Jede Hochzeit ist einzigartig. Deshalb erstellen wir für jedes Paar ein
            Angebot das wirklich zu ihrem Tag passt. Nicht mehr, nicht weniger.
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.9, color: '#6B5E57' }}>
            Was wir euch anbieten seht ihr unten. Was es kostet besprechen wir
            nach einem kurzen Gespräch in dem wir euren Tag kennenlernen.
          </p>
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ padding: '5.5rem 1.5rem' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem', alignItems: 'stretch',
        }}>
          {leistungen.map((l, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column',
              background: l.highlight ? '#0F0D0C' : '#FFFFFF',
              border: l.highlight ? 'none' : '0.5px solid #E8E2DC',
              borderRadius: '10px', padding: '2.5rem',
              position: 'relative',
            }}>
              {l.highlight && (
                <div style={{
                  position: 'absolute', top: '-1px', left: 0, right: 0,
                  height: '2px', background: '#C4973A', borderRadius: '10px 10px 0 0',
                }} />
              )}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#C4973A', marginBottom: '0.5rem', opacity: 0.8,
                }}>
                  {l.nummer} — {l.subline}
                </p>
                <h2 style={{
                  fontFamily: serif, fontStyle: 'italic',
                  fontSize: '1.6rem', fontWeight: 400,
                  color: l.highlight ? '#F5F0EB' : '#3B2F2A',
                  marginBottom: '1.25rem', lineHeight: 1.2,
                }}>
                  {l.name}
                </h2>
                <p style={{
                  fontSize: '14px', lineHeight: 1.8,
                  color: l.highlight ? '#A89880' : '#6B5E57',
                  marginBottom: '2rem', paddingBottom: '1.5rem',
                  borderBottom: `0.5px solid ${l.highlight ? 'rgba(255,255,255,0.08)' : '#E8E2DC'}`,
                }}>
                  {l.beschreibung}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem' }}>
                  {l.enthalten.map((e, j) => (
                    <li key={j} style={{
                      display: 'flex', gap: '10px',
                      fontSize: '14px',
                      color: l.highlight ? '#C4B09A' : '#6B5E57',
                      padding: '0.6rem 0',
                      borderBottom: `0.5px solid ${l.highlight ? 'rgba(255,255,255,0.06)' : '#F0EDE8'}`,
                      alignItems: 'flex-start',
                    }}>
                      <span style={{ color: '#C4973A', flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>
                        ✓
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{
                borderTop: `0.5px solid ${l.highlight ? 'rgba(255,255,255,0.08)' : '#E8E2DC'}`,
                paddingTop: '1.5rem',
              }}>
                <p style={{
                  fontSize: '12px',
                  color: l.highlight ? '#7A6A5A' : '#A89880',
                  marginBottom: '1rem', fontStyle: 'italic',
                }}>
                  Preis auf Anfrage — individuell für euren Tag
                </p>
                <a
                  href="/#anfrage"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '0.85rem 1.5rem', background: 'transparent',
                    border: l.highlight ? '1px solid rgba(196,151,58,0.4)' : '1px solid #3B2F2A',
                    color: l.highlight ? '#C4973A' : '#3B2F2A',
                    fontSize: '11px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Persönliches Angebot anfragen
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wie läuft das ab */}
      <section style={{ padding: '0 1.5rem 5.5rem' }}>
        <div style={{
          maxWidth: '720px', margin: '0 auto',
          background: '#FFFFFF', border: '0.5px solid #E8E2DC',
          borderRadius: '10px', padding: '3rem', textAlign: 'center',
        }}>
          <p style={{
            fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#8A7B6F', marginBottom: '1rem',
          }}>
            Wie bekommt ihr euer Angebot?
          </p>
          <h2 style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: '1.5rem', fontWeight: 400,
            color: '#3B2F2A', marginBottom: '1.5rem',
          }}>
            Einfach. Persönlich. Unverbindlich.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left',
          }}>
            {[
              { num: '01', text: 'Ihr schreibt uns kurz was ihr euch vorstellt' },
              { num: '02', text: 'Wir melden uns innerhalb von 24 Stunden' },
              { num: '03', text: 'Kurzes Gespräch um euren Tag kennenzulernen' },
              { num: '04', text: 'Ihr bekommt ein Angebot das wirklich zu euch passt' },
            ].map((s, i) => (
              <div key={i}>
                <p style={{
                  fontSize: '10px', color: '#C4973A', letterSpacing: '0.2em',
                  marginBottom: '0.4rem', fontWeight: 500,
                }}>
                  {s.num}
                </p>
                <p style={{ fontSize: '13px', color: '#6B5E57', lineHeight: 1.6, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <a
            href="/#anfrage"
            style={{
              display: 'inline-block', padding: '0.9rem 2.5rem',
              background: '#3B2F2A', color: '#FAF9F7',
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Jetzt anfragen
          </a>
        </div>
      </section>
    </main>
  );
}
