'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";

// ─── Galerie-Daten ────────────────────────────────────────────────────────────

const gallerieData = {
  'laura-jakob-2026': {
    names: 'Laura & Jakob',
    location: 'Schloss Wolfsburg, Wolfsburg',
    year: '2026',
    tag: 'Hochzeitsfilm & Fotografie',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85', alt: 'Braut beim Schminken' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Erster Blick' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Brautpaar im Schlosspark' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Brautpaar Stirn an Stirn' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=85', alt: 'Zeremonie Einzug' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Ehegelübde' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Eheringe' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1200&q=85', alt: 'Brautstrauß' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Erster Tanz' },
      { id: 10, src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Abendstimmung' },
      { id: 11, src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Brautpaar lacht' },
      { id: 12, src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1200&q=85', alt: 'Kleid Detail' },
    ],
  },
  'mishelle-julian-2026': {
    names: 'Mishelle & Julian',
    location: 'Gewandhaus Braunschweig, Braunschweig',
    year: '2026',
    tag: 'Hochzeitsfilm',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Erster Blick' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Zeremonie' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85', alt: 'Brautjungfern' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Ringe' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Brautpaar draußen' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85', alt: 'Vorbereitung' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Abendtanz' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Nahaufnahme Paar' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Feier' },
      { id: 10, src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=85', alt: 'Einzug' },
      { id: 11, src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1200&q=85', alt: 'Blumendetail' },
      { id: 12, src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Stimmungsmoment' },
    ],
  },
  'anna-thomas-2025': {
    names: 'Anna & Thomas',
    location: 'Herrenhäuser Gärten, Hannover',
    year: '2025',
    tag: 'Hochzeitsfilm & Fotografie',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Brautpaar lacht' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Kuss' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85', alt: 'Vorbereitung Braut' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Gäste feiern' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Garten Shooting' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=85', alt: 'Zeremonie' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Inniger Moment' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Ringdetail' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85', alt: 'Gesellschaft' },
      { id: 10, src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Erster Tanz' },
      { id: 11, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Gelübde' },
      { id: 12, src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1200&q=85', alt: 'Kleid Nahaufnahme' },
    ],
  },
  'raffaele-caterina-2026': {
    names: 'Raffaele & Caterina',
    location: 'Schloss Gifhorn, Gifhorn',
    year: '2026',
    tag: 'Hochzeitsfilm',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85', alt: 'Brautjungfern Vorbereitung' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1200&q=85', alt: 'Kleid im Licht' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Zeremonie Höhepunkt' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Schlosskulisse' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Brautpaar Schloss' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Romantischer Moment' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Gelübde sprechen' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1200&q=85', alt: 'Blumen Arrangement' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Ringe Schloss' },
      { id: 10, src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Freudiger Moment' },
      { id: 11, src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Abendfeier' },
      { id: 12, src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85', alt: 'Morgenstimmung' },
    ],
  },
  'basti-chiara-2025': {
    names: 'Basti & Chiara',
    location: 'Autostadt Wolfsburg, Wolfsburg',
    year: '2025',
    tag: 'Hochzeitsfilm & Fotografie',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1200&q=85', alt: 'Brautstrauß Detail' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Brautpaar Wasser' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Verträumt' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=85', alt: 'Einzug Zeremonie' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Hochzeitskuss' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85', alt: 'Gruppe Foto' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Lachen zusammen' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Gelübde Autostadt' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Tanz Abend' },
      { id: 10, src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Gäste Moment' },
      { id: 11, src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Ringe auf Tisch' },
      { id: 12, src: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1200&q=85', alt: 'Schleier Licht' },
    ],
  },
  'katharina-ben-2025': {
    names: 'Katharina & Ben',
    location: 'Dom zu Hildesheim, Hildesheim',
    year: '2025',
    tag: 'Fotografie',
    photos: [
      { id: 1,  src: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=85', alt: 'Dom Einzug' },
      { id: 2,  src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85', alt: 'Gelübde Dom' },
      { id: 3,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', alt: 'Kuss Dom' },
      { id: 4,  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85', alt: 'Ringe Stein' },
      { id: 5,  src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85', alt: 'Braut Vorbereitung' },
      { id: 6,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85', alt: 'Brautpaar Dom Außen' },
      { id: 7,  src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85', alt: 'Glücklich' },
      { id: 8,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85', alt: 'Romantisch Blick' },
      { id: 9,  src: 'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=1200&q=85', alt: 'Empfang Tanz' },
      { id: 10, src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&q=85', alt: 'Gäste feiern' },
      { id: 11, src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=85', alt: 'Familienfoto' },
      { id: 12, src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=1200&q=85', alt: 'Blumen Dom' },
    ],
  },
};

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent(i => Math.min(photos.length - 1, i + 1)), [photos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'ArrowLeft')   prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, next, prev]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10,8,6,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Bild */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[current].src}
        alt={photos[current].alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxHeight: '88vh',
          maxWidth: '90vw',
          objectFit: 'contain',
          display: 'block',
        }}
      />

      {/* Schließen */}
      <button
        onClick={onClose}
        aria-label="Schließen"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        ✕
      </button>

      {/* Pfeil Links */}
      {current > 0 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          aria-label="Vorheriges Bild"
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.12)',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </button>
      )}

      {/* Pfeil Rechts */}
      {current < photos.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          aria-label="Nächstes Bild"
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.12)',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ›
        </button>
      )}

      {/* Zähler */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: sans,
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.12em',
        }}>
          {current + 1} / {photos.length}
        </p>
        <p style={{
          fontFamily: sans,
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.38)',
          marginTop: '4px',
        }}>
          {photos[current].alt}
        </p>
      </div>
    </div>
  );
}

// ─── Seite ───────────────────────────────────────────────────────────────────

export default function GaleriePage({ params }) {
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const gallery = gallerieData[params.id];

  if (!gallery) {
    return (
      <SmoothScroll>
        <Nav />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F6F1EB' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: sans, color: '#5E5148', marginBottom: '2rem' }}>Galerie nicht gefunden.</p>
            <Link href="/referenzen" style={{ fontFamily: sans, fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2A1F1B', textDecoration: 'none', borderBottom: '1px solid #B79B72', paddingBottom: '2px' }}>
              Zurück zu den Referenzen
            </Link>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    );
  }

  return (
    <SmoothScroll>
      <Nav />

      <main style={{ background: '#F6F1EB', minHeight: '100vh' }}>

        {/* ── Header ── */}
        <section style={{ padding: 'clamp(100px, 12vw, 160px) 8% clamp(40px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

            {/* Zurück */}
            <button
              onClick={() => router.push('/referenzen')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: sans,
                fontSize: '0.66rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B79B72',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '2.4rem',
                padding: 0,
              }}
            >
              ← Alle Referenzen
            </button>

            {/* Meta */}
            <p style={{
              fontFamily: sans,
              fontSize: '0.62rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#B79B72',
              fontWeight: 300,
              marginBottom: '0.8rem',
            }}>
              {gallery.year} · {gallery.tag} · {gallery.photos.length} Fotos
            </p>

            {/* Titel */}
            <h1 style={{
              fontFamily: serif,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 300,
              lineHeight: 1.04,
              color: '#2A1F1B',
              marginBottom: '0.6rem',
              hyphens: 'none',
              wordBreak: 'keep-all',
            }}>
              {gallery.names}
            </h1>
            <p style={{
              fontFamily: sans,
              fontSize: '0.84rem',
              color: '#5E5148',
              fontWeight: 300,
              letterSpacing: '0.06em',
            }}>
              {gallery.location}
            </p>
          </div>
        </section>

        {/* ── Masonry Grid ── */}
        <section style={{ padding: '0 8% clamp(64px, 8vw, 112px)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="masonry-grid">
              {gallery.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="masonry-item"
                  onClick={() => setLightboxIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightboxIndex(index)}
                  aria-label={`${photo.alt} vergrößern`}
                  style={{ cursor: 'zoom-in', breakInside: 'avoid', marginBottom: '12px', position: 'relative' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="masonry-img"
                    style={{
                      width: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      transition: 'filter 0.25s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: '#EFE7DD',
          padding: 'clamp(52px, 7vw, 96px) 8%',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: sans,
            fontSize: '0.62rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#B79B72',
            marginBottom: '1.4rem',
          }}>
            Von Amoriva Films · {gallery.year}
          </p>
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 300,
            color: '#2A1F1B',
            lineHeight: 1.1,
            marginBottom: '1.6rem',
            hyphens: 'none',
            wordBreak: 'keep-all',
          }}>
            Hat euch diese Hochzeit{' '}
            <em style={{ fontStyle: 'italic' }}>inspiriert?</em>
          </h2>
          <p style={{
            fontFamily: sans,
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            fontWeight: 300,
            lineHeight: 1.88,
            color: '#5E5148',
            maxWidth: '480px',
            margin: '0 auto 2.8rem',
          }}>
            Schreibt uns, wir melden uns persönlich innerhalb von 24 Stunden und erzählen euch, wie euer Tag werden könnte.
          </p>
          <Link
            href="/anfrage"
            className="btn-cta"
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
          <p style={{
            fontFamily: sans,
            fontSize: '0.62rem',
            color: '#B79B72',
            fontWeight: 300,
            marginTop: '1.4rem',
            letterSpacing: '0.1em',
          }}>
            Unverbindlich · Kostenlos · Antwort in 24 Stunden
          </p>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={gallery.photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <style>{`
        .masonry-grid {
          columns: 3;
          column-gap: 12px;
        }
        .masonry-item:hover .masonry-img {
          filter: brightness(0.88);
        }
        @media (max-width: 760px) {
          .masonry-grid { columns: 2; }
        }
        @media (max-width: 480px) {
          .masonry-grid { columns: 1; }
        }
      `}</style>
    </SmoothScroll>
  );
}
