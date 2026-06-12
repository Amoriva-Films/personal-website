'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";
const gold  = '#C4973A';
const brown = '#3B2F2A';
const soft  = '#6B5E57';

const services = [
  {
    nr: '01',
    title: 'Hochzeitsfilm',
    subtitle: 'Cinematische Videografie Niedersachsen',
    description: 'Ein Film der sich anfühlt wie euer Tag und nicht wie irgendein Hochzeitsvideo. Wir drehen so dass ihr euch traut zu weinen wenn ihr ihn Jahre später nochmal anschaut. Für Paare in Wolfsburg, Braunschweig, Hannover und ganz Deutschland.',
    includes: [
      'Cinematischer Hauptfilm (3 bis 12 Minuten)',
      'Emotionaler Highlights-Clip (60 bis 90 Sekunden)',
      'Vollständige Begleitung vom Morgen bis zum Abend',
      'Private Online-Galerie',
      'Soundtrack nach euren Wünschen',
    ],
  },
  {
    nr: '02',
    title: 'Hochzeitsfotografie',
    subtitle: 'Fine Art Fotografie Niedersachsen',
    description: 'Fotos die ihr nicht inszeniert habt. Keine Kommandos, keine gestellten Posen. Nur echte Momente in schönem Licht.',
    includes: [
      'Vollständige Fotobegleitung vom Getting Ready bis zum Tanz',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie zum Download',
      'Druckfreigabe inklusive',
    ],
  },
  {
    nr: '03',
    title: 'Film und Foto',
    subtitle: 'Das komplette Hochzeitspaket',
    description: 'Beides bei uns. Ein Team, eine Bildsprache, keine Abstimmungsprobleme zwischen zwei Fremden an eurem Hochzeitstag.',
    includes: [
      'Alles aus Film und Fotografie-Paket',
      'Perfekte Abstimmung durch ein Team',
      'Einheitliche Bildsprache durch gesamten Content',
    ],
  },
];

function ServiceRow({ s }) {
  return (
    <FadeIn>
      <div className="service-row" style={{
        borderTop: '1px solid rgba(59,47,42,0.10)',
        paddingTop: 'clamp(36px, 4.5vw, 60px)',
        paddingBottom: 'clamp(36px, 4.5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 'clamp(28px, 4vw, 80px)',
      }}>
        <div>
          <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: gold, fontWeight: 300, marginBottom: '1rem' }}>
            {s.nr}
          </p>
          <h3 style={{ fontFamily: serif, fontSize: 'clamp(24px, 2.6vw, 38px)', fontWeight: 300, color: brown, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            {s.title}
          </h3>
          <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.20em', textTransform: 'uppercase', color: soft, fontWeight: 300, opacity: 0.65 }}>
            {s.subtitle}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: sans, fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300, color: soft, lineHeight: 1.85, marginBottom: '2rem' }}>
            {s.description}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {s.includes.map((item, i) => (
              <li key={i} style={{ fontFamily: sans, fontSize: '13px', fontWeight: 300, color: soft, display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <span style={{ color: gold, flexShrink: 0, marginTop: '2px' }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

export default function LeistungenSection() {
  return (
    <section id="leistungen" style={{ background: '#F6F1EB' }}>
      <div style={{ padding: 'clamp(64px, 7vw, 96px) 8% 0' }}>
        <FadeIn>
          <span style={{ display: 'block', fontFamily: sans, fontSize: '11px', fontWeight: 300, letterSpacing: '0.40em', textTransform: 'uppercase', color: gold, marginBottom: '1.4rem' }}>
            Leistungen
          </span>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(30px, 4vw, 58px)', fontWeight: 300, lineHeight: 1.05, color: brown, maxWidth: '680px' }}>
            Was wir <em style={{ fontStyle: 'italic' }}>machen.</em>
          </h2>
        </FadeIn>
      </div>
      <div style={{ padding: '0 8% clamp(48px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {services.map((s) => <ServiceRow key={s.nr} s={s} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .service-row { grid-template-columns: 1fr !important; gap: 1.4rem !important; }
        }
      `}</style>
    </section>
  );
}
