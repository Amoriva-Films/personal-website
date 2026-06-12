'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: '#0a0806',
      }}
    >
      {/* Background Video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/Bild-5.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay — dunkler oben/unten, offen in der Mitte */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.70) 100%)',
          zIndex: 1,
        }}
      />

      {/* Zentrierter Inhalt — Wakefield-Stil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.8, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 8%',
        }}
      >
        {/* Klein oben: Kategorie */}
        <span
          style={{
            display: 'block',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: 'rgba(246,241,235,0.75)',
            fontWeight: 300,
            marginBottom: '2.2rem',
          }}
        >
          Wedding Videography &amp; Photography
        </span>

        {/* Riesiger Markenname */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: 'clamp(38px, 6.5vw, 92px)',
            lineHeight: 0.9,
            letterSpacing: '0.03em',
            fontWeight: 300,
            color: '#F6F1EB',
            textTransform: 'uppercase',
            marginBottom: '2.2rem',
          }}
        >
          Amoriva Films
        </h1>

        {/* Kursive Subline */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: 'clamp(17px, 1.8vw, 26px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(246,241,235,0.82)',
            letterSpacing: '0.02em',
            maxWidth: '620px',
          }}
        >
          Mit Sitz in Niedersachsen, für Hochzeiten auf der ganzen Welt.
        </p>
      </motion.div>

      {/* Scroll-Indikator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
            color: 'rgba(246,241,235,0.55)',
            fontWeight: 300,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '56px',
            background: 'rgba(246,241,235,0.38)',
          }}
        />
      </motion.div>
    </section>
  );
}
