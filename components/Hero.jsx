'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

/* Nevio am 21.09.2026: "mach die Hero section genau so, will die so
   behalten, dass man das ganze Video auf dem Vollbild sieht."

   Das ist die Fassung von der Live-Seite, 1:1 uebernommen: volle
   Bildschirmhoehe, zentrierter Markenname, EIN senkrechter Schleier,
   der in der Mitte nur 0,18 traegt. Drei Dinge sind bewusst anders:

   1. var(--font-display) statt var(--font-cormorant). Die Schrift heisst
      jetzt Fraunces.
   2. var(--font-inter) statt 'Inter', sans-serif. next/font erzeugt einen
      eigenen Familiennamen; 'Inter' trifft ihn NICHT und faellt still auf
      die Systemschrift zurueck. Auf Nevios Rechner faellt das nicht auf,
      weil Inter dort installiert ist - bei Besuchern schon. Genau dieser
      Fehler steckte hier schon einmal an 27 Stellen.
   3. Ein weicher Schatten hinter den Buchstaben. Gemessen ueber sechs
      Videostellen an je drei Punkten: mit dem Schleier allein faellt der
      Titel bei Sekunde 7,5 auf 2,07 zu 1 - dort laeuft er ueber ein
      helles Brautkleid. Das gilt fuer die Live-Seite genauso. Der
      Schatten liegt nur hinter der Schrift, ist auf dunklen Bildern
      unsichtbar und laesst das Video vollstaendig frei. Genau das war
      Nevios Wunsch: das ganze Video sehen.
   4. 100svh statt 100vh. Auf dem Handy rechnet vh mit eingeklappter
      Adressleiste, dadurch ragt der Hero unten aus dem Bild. svh ist die
      Hoehe, die wirklich sichtbar ist.                                   */

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.style.opacity = '0';
    v.style.transition = 'opacity 0.6s ease';
    const show = () => { v.style.opacity = '1'; };
    v.addEventListener('canplay', show, { once: true });
    v.play().catch(() => {});
    return () => v.removeEventListener('canplay', show);
  }, []);

  return (
    <section
      data-dunkler-kopf=""
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
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
          /* Standbild, bis das Video laeuft. Ohne das sieht man beim
             Aufbau der Seite eine schwarze Flaeche - der erste Eindruck
             ist dann die Ladezeit statt das Bild. Die Datei lag
             ungenutzt im Ordner. */
          poster="/images/hero-poster.jpg"
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

      {/* Ein Schleier, dunkel oben und unten, offen in der Mitte. In der
          Titelzone liegt er bei 0,18 - dort sieht man das Video. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.70) 100%)',
        }}
      />

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
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,242,0.75)',
            fontWeight: 400,
            marginBottom: '2.2rem',
            textShadow: '0 1px 18px rgba(0,0,0,0.60), 0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          Hochzeitsfilm &amp; Hochzeitsfotografie
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(38px, 6.5vw, 92px)',
            lineHeight: 0.9,
            letterSpacing: '0.03em',
            fontWeight: 400,
            color: 'var(--auf-dunkel)',
            textTransform: 'uppercase',
            marginBottom: '2.2rem',
            textShadow: '0 2px 28px rgba(0,0,0,0.60), 0 1px 4px rgba(0,0,0,0.45)',
          }}
        >
          Amoriva Films
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(17px, 1.8vw, 26px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(244,244,242,0.82)',
            letterSpacing: '0.02em',
            maxWidth: '620px',
            textShadow: '0 1px 18px rgba(0,0,0,0.60), 0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          Mit Sitz in Niedersachsen, für Hochzeiten auf der ganzen Welt.
        </p>
      </motion.div>

      <motion.div
        aria-hidden="true"
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
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,242,0.55)',
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <div style={{ width: '1px', height: '56px', background: 'rgba(244,244,242,0.38)' }} />
      </motion.div>
    </section>
  );
}
