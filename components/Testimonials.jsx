'use client';

import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";
const gold  = '#C4973A';
const brown = '#3B2F2A';
const soft  = '#6B5E57';

const items = [
  {
    quote: 'Wir wollten eigentlich nur ein paar schöne Fotos vom Standesamt. Bekommen haben wir Bilder, die genau so aussehen wie sich der Tag angefühlt hat. Nichts gestellt, nichts gekünstelt. Wir schauen sie uns immer noch ständig an.',
    namen: 'Celine & Alex', datum: 'Hochzeitsfotografie · 2026', init: 'C&A',
  },
  {
    quote: 'Nevio und Danilo waren den ganzen Tag da und trotzdem haben wir sie kaum bemerkt. Als wir den Film dann gesehen haben, mussten wir beide weinen. Da war alles drin, sogar Momente, die wir selbst gar nicht mitbekommen hatten.',
    namen: 'Laura & Jakob', datum: 'Hochzeitsfilm · 2026', init: 'L&J',
  },
  {
    quote: 'Film und Fotos aus einer Hand war für uns die beste Entscheidung. Kein Abstimmen zwischen zwei Teams, einfach zwei Leute, die wussten was sie tun. Der Film und die Bilder passen perfekt zusammen und erzählen unseren Tag genau so, wie er war.',
    namen: 'Diana & Mattia', datum: 'Hochzeitsfilm und Fotografie · 2026', init: 'D&M',
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '6rem 1.5rem', background: '#FFFFFF', borderTop: '0.5px solid #E8E2DC' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ textAlign: 'center', fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A7B6F', marginBottom: '3.5rem', fontWeight: 300 }}>
            Das sagen unsere Paare
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {items.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: '2rem', background: '#FAF9F7', borderRadius: '10px',
                border: '0.5px solid #E8E2DC', minHeight: '280px', height: '100%',
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="13" height="13" viewBox="0 0 14 14" fill={gold}>
                        <polygon points="7,1 8.8,5.4 13.5,5.7 10,8.8 11.1,13.3 7,10.7 2.9,13.3 4,8.8 0.5,5.7 5.2,5.4"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '15px', lineHeight: 1.8, color: brown, margin: '0 0 1.5rem 0', fontWeight: 300 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div>
                  <div style={{ width: '2rem', height: '1px', background: gold, marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5ECD7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 500, color: '#8A6420', flexShrink: 0 }}>
                      {t.init}
                    </div>
                    <div>
                      <p style={{ fontFamily: sans, fontSize: '13px', fontWeight: 500, color: brown, margin: 0 }}>{t.namen}</p>
                      <p style={{ fontFamily: sans, fontSize: '11px', color: '#8A7B6F', margin: 0 }}>{t.datum}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
