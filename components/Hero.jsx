'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // muted muss zusaetzlich am Element gesetzt werden, sonst verweigern
    // manche Browser das automatische Abspielen.
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '560px',
        overflow: 'hidden',
        background: 'var(--leinwand)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center center',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Zwei Schichten Abdunklung.

          Unten: Verlauf fuer Wortmarke oben und Verlauf unten.

          Darueber: ein weicher Schleier hinter dem Textblock. Der ist
          noetig, weil im Video reinweisse Stellen vorkommen. Gemessen
          ueber die ganze Laufzeit lag der Kontrast an der hellsten
          Stelle bei 1,5 zu 1 - der Titel war dort praktisch unlesbar.
          Gerechnet braucht es 60 % Deckkraft, damit auch Video-Weiss
          noch 4,5 zu 1 traegt; 65 % geben etwas Reserve. Weil der
          Schleier radial ausläuft, bleibt das Bild am Rand offen.

          Nachgezogen am 19.09.2026: Eine Messung an fuenf Stellen ergab
          viermal ueber 15, einmal nur 5,8 - dort, wo der Titel ueber ein
          helles Gesicht laeuft. Das bestand zwar, aber knapp, und
          gemessen war nur ein einziges Videobild. Verlauf und Schleier
          sind deshalb kraeftiger: rechnerisch 9,6 zu 1 selbst bei
          reinweissem Bild hinter der Schrift. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(14,14,13,0.60) 0%, rgba(14,14,13,0.26) 30%, rgba(14,14,13,0.28) 60%, rgba(14,14,13,0.76) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'radial-gradient(ellipse 82% 56% at 50% 48%, rgba(14,14,13,0.72) 0%, rgba(14,14,13,0.60) 45%, rgba(14,14,13,0.20) 78%, transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '0 var(--rand)',
        }}
      >
        {/* Der Name steht oben links als Wortmarke. Hier steht deshalb das,
            was ein Paar bekommt, nicht noch einmal der Name. */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="t-display"
          style={{ color: 'var(--auf-dunkel)', maxWidth: '16ch', marginBottom: '1.5rem' }}
        >
          Euer Tag, wie er sich angefühlt hat.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.9, ease }}
          style={{
            fontSize: 'var(--schrift-text)',
            lineHeight: 1.6,
            color: 'rgba(244,244,242,0.82)',
            maxWidth: '44ch',
            marginBottom: '2.75rem',
          }}
        >
          Mit Sitz in Niedersachsen, für Hochzeiten auf der ganzen Welt.
        </motion.p>

        {/* Ein Handlungsaufruf, nicht zwei. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24, duration: 0.9, ease }}
        >
          <Link href="/filme" className="knopf knopf-voll">
            Filme ansehen
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 3,
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(244,244,242,0.45), transparent)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
