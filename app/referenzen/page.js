'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import FadeIn from '../../components/FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";
const ease  = [0.22, 1, 0.36, 1];

// Nur eigene Aufnahmen. Frueher standen hier sechs Hochzeiten mit Paarnamen,
// deren Bilder samt Galerien aus einer Bilddatenbank stammten. Werbung mit
// Kunden, die es nicht gibt, ist irrefuehrend - deshalb zeigt die Seite jetzt
// ausschliesslich Fotos aus echten Auftraegen und nennt keine Namen. Namen und
// Paar-Galerien kommen zurueck, sobald die Paare schriftlich zugestimmt haben.
const arbeiten = [
  { src: '/images/Bild-33.webp',  alt: 'Brautpaar bei Kerzenschein, kurz vor dem Kuss' },
  { src: '/images/Bild-76.webp',  alt: 'Braut unter dem Schleier, Porträt' },
  { src: '/images/Bild-101.webp', alt: 'Brautpaar am Hochzeitstisch beim Anschnitt der Torte' },
  { src: '/images/Bild-5.webp',   alt: 'Save-the-Date-Karten und Ringschatulle auf hellem Stoff' },
  { src: '/images/Bild-67.webp',  alt: 'Gedeckter Hochzeitstisch mit Menükarte und Kerzen' },
];

function Kachel({ bild, i, oeffnen }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => oeffnen(i)}
      aria-label={`${bild.alt} — größer ansehen`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 3) * 0.1, duration: 1.2, ease }}
      className="ref-card"
      style={{
        position: 'relative', width: '100%', aspectRatio: '4 / 5',
        overflow: 'hidden', cursor: 'pointer',
        padding: 0, border: 'none', background: 'none', display: 'block',
      }}
    >
      <Image
        src={bild.src}
        alt={bild.alt}
        fill
        className="ref-card-img"
        style={{
          objectFit: 'cover', objectPosition: 'center center',
          filter: 'contrast(1.08) saturate(1.1) brightness(1.02)',
          transition: 'transform 0.7s ease',
        }}
        sizes="(max-width: 760px) 100vw, 33vw"
      />
      <div className="ref-card-overlay" style={{
        position: 'absolute', inset: 0, background: 'rgba(42,31,27,0.32)',
        opacity: 0, transition: 'opacity 0.35s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          background: '#F6F1EB', color: '#2A1F1B', fontFamily: sans,
          fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.18em',
          textTransform: 'uppercase', padding: '10px 24px', borderRadius: '100px',
        }}>
          Ansehen
        </span>
      </div>
    </motion.button>
  );
}

function Lichtkasten({ index, setIndex }) {
  const offen = index !== null;

  useEffect(() => {
    if (!offen) return;
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const taste = (e) => {
      if (e.key === 'Escape')     setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % arbeiten.length);
      if (e.key === 'ArrowLeft')  setIndex((i) => (i - 1 + arbeiten.length) % arbeiten.length);
    };
    window.addEventListener('keydown', taste);
    return () => { document.body.style.overflow = vorher; window.removeEventListener('keydown', taste); };
  }, [offen, setIndex]);

  if (!offen) return null;
  const bild = arbeiten[index];

  return (
    <div
      onClick={() => setIndex(null)}
      role="dialog"
      aria-modal="true"
      aria-label={bild.alt}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(26,20,17,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '5vh 6vw', cursor: 'zoom-out',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image src={bild.src} alt={bild.alt} fill sizes="90vw" style={{ objectFit: 'contain' }} priority />
      </div>
      <button
        type="button"
        aria-label="Schließen"
        onClick={() => setIndex(null)}
        style={{
          position: 'absolute', top: '2.2rem', right: '6vw',
          background: 'none', border: 'none', color: '#F6F1EB',
          fontSize: '1.6rem', lineHeight: 1, cursor: 'pointer', padding: '8px',
        }}
      >
        ×
      </button>
    </div>
  );
}

export default function ReferenzenPage() {
  const [index, setIndex] = useState(null);

  return (
    <SmoothScroll>
      <Nav />

      {/* Hero */}
      <section style={{
        background: '#F6F1EB',
        padding: 'clamp(120px, 14vw, 180px) 8% clamp(52px, 6vw, 80px)',
      }}>
        <FadeIn>
          <span style={{
            display: 'block', fontFamily: sans, fontSize: '0.66rem', fontWeight: 300,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#B79B72', marginBottom: '1.4rem',
          }}>
            Unsere Arbeiten
          </span>
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300,
            lineHeight: 1.05, color: '#2A1F1B', maxWidth: '700px',
            hyphens: 'none', wordBreak: 'keep-all', overflowWrap: 'normal',
          }}>
            Hochzeiten, die wir{' '}
            <em style={{ fontStyle: 'italic', hyphens: 'none', wordBreak: 'keep-all' }}>begleiten durften.</em>
          </h1>
          <p style={{
            fontFamily: sans, fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75,
            color: 'rgba(42,31,27,0.72)', maxWidth: '560px', marginTop: '1.6rem',
          }}>
            Ein Ausschnitt aus unserer Arbeit. Namen und ganze Galerien zeigen wir erst,
            wenn die Paare uns das ausdrücklich erlaubt haben.
          </p>
        </FadeIn>
      </section>

      {/* Galerie */}
      <section style={{ background: '#F6F1EB', padding: '0 8% clamp(64px, 8vw, 112px)' }}>
        <div
          className="ref-grid"
          style={{
            maxWidth: '1280px', margin: '0 auto', display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(24px, 3vw, 40px)',
          }}
        >
          {arbeiten.map((b, i) => (
            <Kachel key={b.src} bild={b} i={i} oeffnen={setIndex} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#EFE7DD', padding: 'clamp(52px, 6vw, 88px) 8%', textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(28px, 3vw, 46px)', fontWeight: 300,
            color: '#2A1F1B', marginBottom: '2rem',
          }}>
            Euer Tag soll der Nächste sein.
          </h2>
          <Link
            href="/anfrage"
            style={{
              display: 'inline-block', border: '1px solid #3B2F2A', padding: '14px 36px',
              fontFamily: sans, fontSize: '0.7rem', fontWeight: 300, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#3B2F2A', textDecoration: 'none',
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
      <Lichtkasten index={index} setIndex={setIndex} />

      <style>{`
        @media (max-width: 760px) {
          .ref-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 761px) and (max-width: 1024px) {
          .ref-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .ref-card:hover .ref-card-overlay { opacity: 1 !important; }
        .ref-card:hover .ref-card-img { transform: scale(1.04); }
      `}</style>
    </SmoothScroll>
  );
}
