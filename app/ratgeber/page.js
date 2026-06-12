'use client';

import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import FadeIn from '../../components/FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";
const brown = '#2A1F1B';
const gold  = '#B79B72';
const soft  = '#5E5148';

const articles = [
  {
    href:     '/ratgeber/was-kostet-ein-hochzeitsfilm',
    cat:      'Kosten & Pakete',
    title:    'Was kostet ein Hochzeitsfilm? Preise & Pakete 2025',
    excerpt:  'Hochzeitsfilm Preise variieren stark. Wir erklären, welche Faktoren den Preis beeinflussen und was ein gutes Paket enthalten sollte.',
    readTime: '5 Min.',
  },
  {
    href:     '/ratgeber/cinematic-hochzeitsfilm',
    cat:      'Stil & Qualität',
    title:    'Was ist ein cinematic Hochzeitsfilm und warum macht es den Unterschied?',
    excerpt:  'Cinematic bedeutet mehr als eine Kamera. Wir erklären den Unterschied zwischen documentary und cinematic Hochzeitsfilm und warum es emotional so viel mehr berührt.',
    readTime: '4 Min.',
  },
  {
    href:     '/ratgeber/same-day-edit-hochzeit',
    cat:      'Leistungen',
    title:    'Same Day Edit: Euer Hochzeitsfilm noch am selben Abend',
    excerpt:  'Ein Same Day Edit ist einer der emotionalsten Momente einer Hochzeit. Wir erklären wie es funktioniert und für wen es sich lohnt.',
    readTime: '3 Min.',
  },
  {
    href:     '/ratgeber/hochzeitsfilmer-wann-buchen',
    cat:      'Planung',
    title:    'Wann Hochzeitsfilmer & Fotograf buchen? Der richtige Zeitpunkt',
    excerpt:  'Zu spät buchen ist der häufigste Fehler bei der Hochzeitsplanung. Wir geben euch eine klare Empfehlung und eine Checkliste für die Buchung.',
    readTime: '4 Min.',
  },
];

export default function RatgeberPage() {
  return (
    <SmoothScroll>
      <Nav />

      {/* Hero */}
      <section style={{ background: '#F6F1EB', padding: 'clamp(120px,14vw,180px) 8% clamp(52px,6vw,80px)' }}>
        <FadeIn>
          <span style={{ display: 'block', fontFamily: sans, fontSize: '0.66rem', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: gold, marginBottom: '1.4rem' }}>
            Wissen & Tipps
          </span>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, lineHeight: 1.05, color: brown, maxWidth: '700px', hyphens: 'none', wordBreak: 'keep-all' }}>
            Der Hochzeitsfilm{' '}
            <em style={{ fontStyle: 'italic' }}>Ratgeber.</em>
          </h1>
          <p style={{ fontFamily: sans, fontSize: 'clamp(14px,1.1vw,16px)', fontWeight: 300, color: soft, maxWidth: '520px', lineHeight: 1.8, marginTop: '1.6rem' }}>
            Alles was ihr über Hochzeitsfilme und Fotografie wissen müsst: Kosten, Buchungszeitpunkte, Stile und mehr.
          </p>
        </FadeIn>
      </section>

      {/* Articles */}
      <section style={{ background: '#F6F1EB', padding: '0 8% clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {articles.map((a, i) => (
            <FadeIn key={i}>
              <Link
                href={a.href}
                style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(24px,4vw,64px)', borderTop: '1px solid rgba(59,47,42,0.1)', padding: 'clamp(36px,4vw,56px) 0', textDecoration: 'none', alignItems: 'start' }}
                className="article-row"
                onMouseEnter={e => { e.currentTarget.querySelector('h2').style.opacity = '0.5'; }}
                onMouseLeave={e => { e.currentTarget.querySelector('h2').style.opacity = '1'; }}
              >
                <div>
                  <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, fontWeight: 300 }}>{a.cat}</span>
                  <p style={{ fontFamily: sans, fontSize: '11px', color: soft, opacity: 0.5, fontWeight: 300, marginTop: '0.4rem' }}>{a.readTime} Lesezeit</p>
                </div>
                <div>
                  <h2 style={{ fontFamily: serif, fontSize: 'clamp(22px,2.4vw,36px)', fontWeight: 300, color: brown, lineHeight: 1.15, marginBottom: '0.8rem', transition: 'opacity 0.3s' }}>{a.title}</h2>
                  <p style={{ fontFamily: sans, fontSize: 'clamp(13px,1vw,15px)', fontWeight: 300, color: soft, lineHeight: 1.75, opacity: 0.85 }}>{a.excerpt}</p>
                  <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: gold, fontWeight: 300, display: 'inline-block', marginTop: '1.2rem' }}>Lesen →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .article-row { grid-template-columns: 1fr !important; gap: 0.8rem !important; }
        }
      `}</style>
    </SmoothScroll>
  );
}
