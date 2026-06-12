export const metadata = {
  title: 'Preise – Hochzeitsfilm und Fotografie Niedersachsen',
  description: 'Transparente Preise für Hochzeitsfilm und Hochzeitsfotografie in Niedersachsen. Hochzeitsfilm ab 1.600 Euro. Fine Art Fotografie ab 1.400 Euro. Jetzt anfragen.',
  alternates: { canonical: 'https://amoriva-films.de/preise' },
};

const sans  = "var(--font-inter), system-ui, sans-serif";
const serif = "var(--font-cormorant), Georgia, serif";

const pakete = [
  {
    name: 'Hochzeitsfilm',
    subline: 'Cinematische Videografie',
    preis: 'ab 1.600 €',
    beschreibung: 'Ein cinematic Hochzeitsfilm der sich anfühlt wie ein echtes Kinoerlebnis. Wir fangen Atmosphäre, Emotionen und die kleinen Momente ein die euren Tag ausmachen.',
    features: [
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
    name: 'Film und Foto',
    subline: 'Das komplette Paket',
    preis: 'ab 2.600 €',
    beschreibung: 'Ihr bekommt beides aus einer Hand. Kein zweites Team, keine Koordination. Film und Foto perfekt aufeinander abgestimmt.',
    features: [
      'Alles aus dem Hochzeitsfilm-Paket',
      'Vollständige Fotobegleitung',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie mit Download',
      'Druckfreigabe inklusive',
      'Einheitliche Bildsprache',
    ],
    highlight: true,
  },
  {
    name: 'Hochzeitsfotografie',
    subline: 'Fine Art Fotografie',
    preis: 'ab 1.400 €',
    beschreibung: 'Hochzeitsfotos die zeitlos sind. Fine Art Stil, Licht, Tiefe, Authentizität. Keine gestellten Fotos. Nur echte Momente.',
    features: [
      'Vollständige Fotobegleitung',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie mit Download',
      'Druckfreigabe inklusive',
      'Lieferung innerhalb von 6 bis 8 Wochen',
    ],
    highlight: false,
  },
];

export default function PreisePage() {
  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh', paddingTop: '80px' }}>
      <section style={{ padding: '6rem 1.5rem 4rem', textAlign: 'center', background: '#FFFFFF', borderBottom: '0.5px solid #E8E2DC' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A7B6F', marginBottom: '1.5rem', fontWeight: 300 }}>Preise</p>
          <h1 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#3B2F2A', lineHeight: 1.2, marginBottom: '1.75rem' }}>
            Transparente Preise.<br />Kein Verstecken.
          </h1>
          <div style={{ width: '2.5rem', height: '1px', background: '#C4973A', margin: '0 auto 1.75rem' }} />
          <p style={{ fontFamily: sans, fontSize: '17px', lineHeight: 1.85, color: '#6B5E57', fontWeight: 300 }}>
            Wir glauben dass Paare wissen sollten was sie erwartet. Deshalb veröffentlichen wir unsere Startpreise offen. Was genau zu eurem Tag passt besprechen wir persönlich.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {pakete.map((p, i) => (
            <div key={i} style={{ background: p.highlight ? '#3B2F2A' : '#FFFFFF', border: p.highlight ? 'none' : '0.5px solid #E8E2DC', borderRadius: '10px', padding: '2.5rem', position: 'relative' }}>
              {p.highlight && (
                <p style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#C4973A', color: '#FFFFFF', fontFamily: sans, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap', fontWeight: 500 }}>
                  Beliebt
                </p>
              )}
              <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.highlight ? '#C4A882' : '#8A7B6F', marginBottom: '0.5rem', fontWeight: 300 }}>{p.subline}</p>
              <h2 style={{ fontFamily: serif, fontSize: '1.5rem', fontWeight: 300, color: p.highlight ? '#FAF9F7' : '#3B2F2A', marginBottom: '0.75rem' }}>{p.name}</h2>
              <p style={{ fontFamily: sans, fontSize: '2rem', fontWeight: 300, color: '#C4973A', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{p.preis}</p>
              <p style={{ fontFamily: sans, fontSize: '14px', lineHeight: 1.7, color: p.highlight ? '#C4A882' : '#6B5E57', marginBottom: '2rem', borderTop: `0.5px solid ${p.highlight ? 'rgba(255,255,255,0.1)' : '#E8E2DC'}`, paddingTop: '1.5rem', fontWeight: 300 }}>{p.beschreibung}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: '10px', fontFamily: sans, fontSize: '14px', color: p.highlight ? '#E8DDD5' : '#6B5E57', padding: '0.5rem 0', borderBottom: `0.5px solid ${p.highlight ? 'rgba(255,255,255,0.07)' : '#F0EDE8'}`, alignItems: 'flex-start', fontWeight: 300 }}>
                    <span style={{ color: '#C4973A', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/anfrage" style={{ display: 'block', textAlign: 'center', padding: '0.85rem 1.5rem', background: p.highlight ? '#C4973A' : 'transparent', border: p.highlight ? 'none' : '1px solid #3B2F2A', color: p.highlight ? '#FFFFFF' : '#3B2F2A', fontFamily: sans, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', fontWeight: 300 }}>
                Anfrage stellen
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 1.5rem 5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: sans, fontSize: '14px', lineHeight: 1.8, color: '#8A7B6F', maxWidth: '560px', margin: '0 auto', fontWeight: 300 }}>
          Alle Preise sind Startpreise und richten sich nach Umfang, Location und Anreise. Wir erstellen euch gerne ein persönliches Angebot nach einem kurzen Gespräch.
        </p>
      </section>
    </main>
  );
}
