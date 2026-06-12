'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import FadeIn from '../../components/FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";
const brown = '#2A1F1B';
const gold  = '#B79B72';
const soft  = '#5E5148';

const services = [
  {
    nr: '01',
    title: 'Cinematic Hochzeitsfilm',
    subtitle: 'Hochzeitsvideografie',
    keywords: 'International',
    description:
      'Wir halten euren Tag so fest, wie er sich angefühlt hat. Ruhige Momente, kleine Details und die Augenblicke dazwischen werden zu einem Film, der zeitlos wirkt und eure Geschichte authentisch erzählt.',
    includes: [
      'Vollständige Filmbegleitung (Vorbereitung bis Tanz)',
      'Cinematischer Hauptfilm (3 bis 12 Min.)',
      'Highlight Trailer (1 Min.)',
      'Professionelle Farbkorrektur und Tonbearbeitung',
      'Private Online-Galerie zum Download',
    ],
  },
  {
    nr: '02',
    title: 'Hochzeitsfotografie',
    subtitle: 'Fine Art & Documentary',
    keywords: 'International',
    description:
      'Wir schaffen Bilder, die sich echt anfühlen. Mit einem Blick für Licht, Atmosphäre und Details entstehen Aufnahmen, die zeitlos wirken – mal ruhig und intim, mal modern und editorial. Dabei richten wir uns nicht nach starren Posen, sondern nach dem, was zu euch passt.',
    includes: [
      'Vollständige Fotobegleitung eurer Hochzeit',
      'Alle bearbeiteten Fotos in Druckqualität',
      'Online-Galerie (12 Monate verfügbar)',
      'Natürliche Bildbearbeitung ohne übertriebene Filter',
      'Mix aus Reportage & Paarportraits',
    ],
  },
  {
    nr: '03',
    title: 'Kombipaket Film & Foto',
    subtitle: 'Alles aus einer Hand',
    keywords: 'International',
    description:
      'Ein Team für Foto und Film bedeutet weniger Organisation und mehr Zeit für das Wesentliche. Wir arbeiten Hand in Hand und halten euren Tag so fest, dass Bilder und bewegte Aufnahmen wie aus einem Guss wirken.',
    includes: [
      'Alles aus Hochzeitsfilm und Hochzeitsfotografie',
      'Perfekte Abstimmung zwischen Film und Fototeam',
      'Einheitliche Bildsprache und Ästhetik',
      'Kombinierter Rabatt gegenüber Einzelbuchung',
      'Ein Ansprechpartner für alles',
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Leistungen Amoriva Films',
  description: 'Hochzeitsfilm und Hochzeitsfotografie international',
  url: 'https://amoriva-films.de/leistungen',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Amoriva Films',
        url: 'https://amoriva-films.de',
      },
      areaServed: {
        '@type': 'Place',
        name: 'International',
      },
    },
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://amoriva-films.de/leistungen' },
  ],
};

function ServiceCard({ s, i }) {
  return (
    <FadeIn>
      <div style={{
        borderTop: '1px solid rgba(59,47,42,0.12)',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(40px, 5vw, 64px)',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 'clamp(32px, 4vw, 80px)',
      }}
      className="service-row"
      >
        {/* Left */}
        <div>
          <p style={{
            fontFamily: sans,
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: gold,
            fontWeight: 300,
            marginBottom: '1rem',
          }}>{s.nr}</p>
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(26px, 2.8vw, 40px)',
            fontWeight: 300,
            color: brown,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}>{s.title}</h2>
          <p style={{
            fontFamily: sans,
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: soft,
            fontWeight: 300,
            opacity: 0.7,
            marginBottom: '0.6rem',
          }}>{s.subtitle}</p>
          <p style={{
            fontFamily: sans,
            fontSize: '11px',
            color: gold,
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}>{s.keywords}</p>
        </div>

        {/* Right */}
        <div>
          <p style={{
            fontFamily: sans,
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            fontWeight: 300,
            color: soft,
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>{s.description}</p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {s.includes.map((item, j) => (
              <li key={j} style={{
                fontFamily: sans,
                fontSize: '13px',
                fontWeight: 300,
                color: soft,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem',
              }}>
                <span style={{ color: gold, marginTop: '2px', flexShrink: 0 }}>›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

export default function LeistungenPage() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Nav />

      {/* Hero */}
      <section style={{
        background: '#F6F1EB',
        padding: 'clamp(120px, 14vw, 180px) 8% clamp(52px, 6vw, 80px)',
      }}>
        <FadeIn>
          <span style={{
            display: 'block',
            fontFamily: sans,
            fontSize: '0.66rem',
            fontWeight: 300,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: '1.4rem',
          }}>
            Unsere Leistungen
          </span>
          <h1 style={{
            fontFamily: serif,
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: brown,
            maxWidth: '780px',
            marginBottom: '1.8rem',
            hyphens: 'none',
            wordBreak: 'keep-all',
          }}>
            Hochzeitsfilm, Fotografie{' '}
            <em style={{ fontStyle: 'italic' }}>& mehr.</em>
          </h1>
          <p style={{
            fontFamily: sans,
            fontSize: 'clamp(14px, 1.1vw, 17px)',
            fontWeight: 300,
            color: soft,
            maxWidth: '560px',
            lineHeight: 1.8,
          }}>
            Hochzeitsfilm und Fotografie, wo immer ihr heiratet. International, zeitlos, cinematisch.
          </p>
        </FadeIn>
      </section>

      {/* Services */}
      <section style={{
        background: '#F6F1EB',
        padding: '0 8% clamp(64px, 8vw, 112px)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#EFE7DD',
        padding: 'clamp(52px, 6vw, 88px) 8%',
        textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(28px, 3vw, 46px)',
            fontWeight: 300,
            color: brown,
            marginBottom: '1rem',
          }}>
            Bereit für euren Film?
          </h2>
          <p style={{
            fontFamily: sans,
            fontSize: 'clamp(13px, 1vw, 15px)',
            fontWeight: 300,
            color: soft,
            marginBottom: '2.4rem',
            maxWidth: '420px',
            margin: '0 auto 2.4rem',
            lineHeight: 1.7,
          }}>
            Erzählt uns von eurer Hochzeit, wir melden uns innerhalb von 24 Stunden.
          </p>
          <Link
            href="/anfrage"
            style={{
              display: 'inline-block',
              border: '1px solid #3B2F2A',
              padding: '14px 40px',
              fontFamily: sans,
              fontSize: '0.7rem',
              fontWeight: 300,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#3B2F2A',
              textDecoration: 'none',
              transition: 'background 500ms ease, color 500ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B2F2A'; e.currentTarget.style.color = '#F6F1EB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3B2F2A'; }}
          >
            Jetzt anfragen
          </Link>
        </FadeIn>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 760px) {
          .service-row {
            grid-template-columns: 1fr !important;
            gap: 1.6rem !important;
          }
        }
      `}</style>
    </SmoothScroll>
  );
}
