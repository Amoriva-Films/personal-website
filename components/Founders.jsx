'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from './FadeIn';

const ease = [0.22, 1, 0.36, 1];

function Portrait({ name, role, bio, img, imgPosition, imgFit = 'cover', imgTranslate = '0%', delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 1.3, ease }}
    >
      {/* Portrait */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          height: 'clamp(400px, 45vw, 650px)',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <img
          src={img}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: imgFit,
            objectPosition: imgPosition,
            display: 'block',
            background: '#F6F1EB',
            transform: `translateY(${imgTranslate})`,
            filter: 'contrast(1.08) saturate(1.15) brightness(1.02)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ maxWidth: '480px' }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.62rem',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.7rem',
          }}
        >
          {role}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: 'clamp(26px, 2.4vw, 42px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--brown)',
            lineHeight: 1.15,
            marginBottom: '1.2rem',
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 1.1vw, 17px)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: '#1A1A1A',
            opacity: 0.65,
            maxWidth: '480px',
          }}
        >
          {bio}
        </p>
      </div>
    </motion.div>
  );
}

export default function Founders() {
  return (
    <section
      id="founders"
      style={{
        padding: 'clamp(36px, 3.5vw, 56px) 8% clamp(52px, 5.5vw, 80px)',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn style={{ marginBottom: 'clamp(64px, 8vw, 100px)' }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.66rem',
              fontWeight: 300,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.4rem',
            }}
          >
            Wer wir sind
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 'clamp(30px, 3.2vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--brown)',
            }}
          >
            Wir sind Nevio und Danilo.
          </h2>
        </FadeIn>

        {/* Two equal portrait columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(28px, 4vw, 56px)',
          }}
          className="founders-grid"
        >
          <Portrait
            name="Nevio Mastrogiorgio"
            role="Founder · Beratung & kreative Leitung"
            bio="Nevio ist das erste Gesicht das ihr von uns seht. Er hört zu, stellt die richtigen Fragen und sorgt dafür dass ihr euch von Anfang an gut aufgehoben fühlt."
            img="/images/nevio.png"
            imgPosition="center 80%"
            delay={0}
          />
          <Portrait
            name="Danilo Buonafede"
            role="Co Founder · Cinematography & Bildgestaltung"
            bio="Danilo ist der Mann hinter der Kamera. Leise, aufmerksam, mit einem Auge für Momente die andere verpassen."
            img="/images/danilo.png"
            imgPosition="center top"
            delay={0.14}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .founders-grid > * {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .founders-grid > * > div {
            max-width: 100% !important;
            width: 100%;
          }
          .founders-portrait {
            max-width: 340px !important;
            width: 100%;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
