'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import FadeIn from '../../components/FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";
const ease  = [0.22, 1, 0.36, 1];

const weddings = [
  {
    id: 'laura-jakob-2026',
    names: 'Laura & Jakob',
    location: 'Wolfsburg',
    venue: 'Schloss Wolfsburg',
    year: '2026',
    img: '/images/editorial-couple.png',
    position: 'center center',
    tag: 'Hochzeitsfilm & Fotografie',
    preview: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&q=75',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=75',
      'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=300&q=75',
    ],
  },
  {
    id: 'mishelle-julian-2026',
    names: 'Mishelle & Julian',
    location: 'Braunschweig',
    venue: 'Gewandhaus Braunschweig',
    year: '2026',
    img: '/images/gallery-left-2.png',
    position: '50% center',
    tag: 'Hochzeitsfilm',
    preview: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=75',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=75',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=75',
    ],
  },
  {
    id: 'anna-thomas-2025',
    names: 'Anna & Thomas',
    location: 'Hannover',
    venue: 'Herrenhäuser Gärten',
    year: '2025',
    img: '/images/wedding-couple.jpg',
    position: 'center center',
    tag: 'Hochzeitsfilm & Fotografie',
    preview: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=300&q=75',
      'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=300&q=75',
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=300&q=75',
    ],
  },
  {
    id: 'raffaele-caterina-2026',
    names: 'Raffaele & Caterina',
    location: 'Gifhorn',
    venue: 'Schloss Gifhorn',
    year: '2026',
    img: '/images/veil.png',
    position: '75% 52%',
    tag: 'Hochzeitsfilm',
    preview: [
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=300&q=75',
      'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=300&q=75',
      'https://images.unsplash.com/photo-1470920756610-0b21ff04a2c2?w=300&q=75',
    ],
  },
  {
    id: 'basti-chiara-2025',
    names: 'Basti & Chiara',
    location: 'Wolfsburg',
    venue: 'Autostadt Wolfsburg',
    year: '2025',
    img: '/images/wedding-portrait.png',
    position: '10% 20%',
    tag: 'Hochzeitsfilm & Fotografie',
    preview: [
      'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=300&q=75',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&q=75',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=75',
    ],
  },
  {
    id: 'katharina-ben-2025',
    names: 'Katharina & Ben',
    location: 'Hildesheim',
    venue: 'Dom zu Hildesheim',
    year: '2025',
    img: '/images/gallery-braut.jpg',
    position: 'center center',
    tag: 'Fotografie',
    preview: [
      'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=300&q=75',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=75',
      'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=300&q=75',
    ],
  },
];

function WeddingCard({ wedding, i }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const router = useRouter();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 3) * 0.1, duration: 1.2, ease }}
    >
      {/* Cover — klickbar */}
      <div
        onClick={() => router.push(`/referenzen/${wedding.id}`)}
        className="ref-card"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          marginBottom: '1rem',
          cursor: 'pointer',
        }}
      >
        <Image
          src={wedding.img}
          alt={`Hochzeitsfilm ${wedding.names}`}
          fill
          className="ref-card-img"
          style={{
            objectFit: 'cover',
            objectPosition: wedding.position,
            filter: 'contrast(1.08) saturate(1.1) brightness(1.02)',
            transition: 'transform 0.7s ease',
          }}
          sizes="(max-width: 760px) 100vw, 33vw"
        />

        {/* Gradient + Tag */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)',
        }} />
        <span style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.2rem',
          fontFamily: sans,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(246,241,235,0.85)',
          fontWeight: 300,
        }}>
          {wedding.tag}
        </span>

        {/* Hover-Overlay */}
        <div className="ref-card-overlay" style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(42,31,27,0.32)',
          opacity: 0,
          transition: 'opacity 0.35s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            background: '#F6F1EB',
            color: '#2A1F1B',
            fontFamily: sans,
            fontSize: '0.62rem',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            borderRadius: '100px',
          }}>
            Galerie ansehen
          </span>
        </div>
      </div>

      {/* 3 Preview-Thumbnails */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '6px',
        marginBottom: '1rem',
        cursor: 'pointer',
      }}
        onClick={() => router.push(`/referenzen/${wedding.id}`)}
      >
        {wedding.preview.map((src, idx) => (
          <div key={idx} style={{
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              aria-hidden="true"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* Text */}
      <div>
        <p style={{
          fontFamily: sans,
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B79B72',
          fontWeight: 300,
          marginBottom: '0.4rem',
        }}>
          {wedding.year}
        </p>
        <h3
          onClick={() => router.push(`/referenzen/${wedding.id}`)}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(22px, 2vw, 30px)',
            fontWeight: 300,
            color: '#2A1F1B',
            marginBottom: '0.3rem',
            cursor: 'pointer',
          }}
        >
          {wedding.names}
        </h3>
      </div>
    </motion.div>
  );
}

export default function ReferenzenPage() {
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
            display: 'block',
            fontFamily: sans,
            fontSize: '0.66rem',
            fontWeight: 300,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#B79B72',
            marginBottom: '1.4rem',
          }}>
            Unsere Arbeiten
          </span>
          <h1 style={{
            fontFamily: serif,
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: '#2A1F1B',
            maxWidth: '700px',
            hyphens: 'none',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
          }}>
            Hochzeiten, die wir{' '}
            <em style={{ fontStyle: 'italic', hyphens: 'none', wordBreak: 'keep-all' }}>begleiten durften.</em>
          </h1>
        </FadeIn>
      </section>

      {/* Grid */}
      <section style={{
        background: '#F6F1EB',
        padding: '0 8% clamp(64px, 8vw, 112px)',
      }}>
        <div
          className="ref-grid"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {weddings.map((w, i) => (
            <WeddingCard key={i} wedding={w} i={i} />
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
            color: '#2A1F1B',
            marginBottom: '2rem',
          }}>
            Euer Tag soll der Nächste sein.
          </h2>
          <Link
            href="/anfrage"
            style={{
              display: 'inline-block',
              border: '1px solid #3B2F2A',
              padding: '14px 36px',
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
