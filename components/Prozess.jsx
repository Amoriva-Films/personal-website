'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";
const gold  = '#C4973A';
const brown = '#3B2F2A';
const soft  = '#6B5E57';

const schritte = [
  { nummer: '01', titel: 'Anfrage stellen', text: 'Schreibt uns kurz. Per Formular, WhatsApp oder Mail. Ganz wie ihr wollt.' },
  { nummer: '02', titel: 'Kennenlerngespräch', text: 'Wir telefonieren oder zoomen kurz. Keine Agenda, kein Pitch. Einfach kennenlernen.' },
  { nummer: '03', titel: 'Gemeinsame Filmvision', text: 'Ein zweites Gespräch. Diesmal geht es ums Herzstück: Was soll euer Film eines Tages erzählen?' },
  { nummer: '04', titel: 'Euer Hochzeitstag', text: 'Wir sind da. Irgendwo im Hintergrund und mit dem Blick für das was zählt.' },
  { nummer: '05', titel: 'Euer Film und Fotos', text: 'In 6 bis 8 Wochen landet alles in eurer privaten Galerie. Zum Ansehen, Weinen und nochmal Ansehen.' },
];

export default function Prozess() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#FAF9F7', borderTop: '0.5px solid #E8E2DC', borderBottom: '0.5px solid #E8E2DC' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ textAlign: 'center', fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A7B6F', marginBottom: '1rem', fontWeight: 300 }}>
            So funktioniert es
          </p>
          <h2 style={{ textAlign: 'center', fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300, color: brown, marginBottom: '3.5rem' }}>
            So läuft das bei uns.
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: '#E8E2DC', borderRadius: '10px', overflow: 'hidden' }}>
          {schritte.map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ background: '#FFFFFF', padding: '2rem 1.8rem', height: '100%' }}>
                <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.2em', color: gold, marginBottom: '0.75rem', fontWeight: 500 }}>{s.nummer}</p>
                <h3 style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 300, color: brown, marginBottom: '0.6rem' }}>{s.titel}</h3>
                <p style={{ fontFamily: sans, fontSize: '14px', lineHeight: 1.7, color: soft, margin: 0, fontWeight: 300 }}>{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
