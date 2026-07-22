'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import FadeIn from './FadeIn';

const ease = [0.22, 1, 0.36, 1];

export default function Experience() {
  const imgRef    = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-80px 0px' });

  return (
    <section
      id="experience"
      style={{
        padding: 'clamp(36px, 3.5vw, 56px) 8% clamp(52px, 5.5vw, 80px)',
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Editorial text block — centered */}
        <FadeIn style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 300,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '2rem',
            }}
          >
            Wie wir arbeiten
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 'clamp(26px, 2vw, 34px)',
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              color: 'var(--brown)',
              maxWidth: '820px',
              margin: '0 auto 2.2rem',
            }}
          >
            Die schönsten Momente entstehen,<br />
            wenn man sie einfach{' '}
            <em style={{ fontStyle: 'italic' }}>leben kann.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.82,
              color: '#1A1A1A',
              opacity: 0.65,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            Wir begleiten euren Tag ruhig und aufmerksam, damit ihr euch
            vollkommen auf das konzentrieren könnt, was wirklich zählt.
          </p>
        </FadeIn>

        {/* Single cinematic image */}
        <div
          ref={imgRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
            height: 'clamp(360px, 56vw, 780px)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={imgInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 2.0, ease }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src="/images/Bild-101.webp"
              alt="Ruhiger Hochzeitsmoment"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center 28%',
                filter: 'contrast(1.08) saturate(1.15) brightness(1.02)',
              }}
              sizes="(max-width: 860px) 100vw, 90vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
