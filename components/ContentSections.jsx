'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from './FadeIn';
import TrustBadges from './TrustBadges';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "var(--font-inter), system-ui, sans-serif";
const gold  = '#C4973A';
const brown = '#3B2F2A';
const soft  = '#6B5E57';
const muted = '#8A7B6F';

export default function ContentSections() {
  return (
    <>
      {/* ── 1. Unsere Arbeit ─────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 1.5rem', background: '#FFFFFF' }}>
        <FadeIn>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: muted, marginBottom: '1.75rem', fontWeight: 300 }}>
              Unsere Arbeit
            </p>
            <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400, color: brown, lineHeight: 1.25, marginBottom: '2rem' }}>
              Für einen Tag voller Gefühle,<br />den ihr niemals vergessen wollt.
            </h2>
            <div style={{ width: '2.5rem', height: '1px', background: gold, margin: '0 auto 2rem' }} />
            <p style={{ fontFamily: sans, fontSize: '17px', lineHeight: 1.9, color: soft, marginBottom: '1.5rem', fontWeight: 300 }}>
              Eure Hochzeit ist mehr als ein Ablauf. Sie ist ein Gefühl. Der Moment bevor ihr euch zum ersten Mal seht. Die Hände die sich halten. Die Stimmen eurer Liebsten. Das Licht, die Musik, die Aufregung und all die kleinen Augenblicke die viel zu schnell vorbeigehen.
            </p>
            <p style={{ fontFamily: sans, fontSize: '17px', lineHeight: 1.9, color: soft, marginBottom: '2.75rem', fontWeight: 300 }}>
              Mit Fotos und Filmen halten wir genau diese Momente fest. Ehrlich, emotional und so dass ihr euch auch Jahre später noch mittendrin fühlt.
            </p>
            <Link href="/anfrage" style={{
              display: 'inline-block', padding: '0.9rem 2.5rem',
              background: 'transparent', border: '1px solid #3B2F2A',
              color: '#3B2F2A', fontFamily: sans, fontSize: '12px',
              letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              fontWeight: 300, transition: 'background 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B2F2A'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3B2F2A'; }}>
              Anfrage stellen
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── 2. TrustBadges ──────────────────────────────────────────────── */}
      <TrustBadges />

      {/* ── 3. 3-Bilder-Grid ────────────────────────────────────────────── */}
      <section style={{ padding: '0 1.5rem 5.5rem', background: '#FFFFFF' }}>
        <div className="gallery-grid" style={{
          maxWidth: '1000px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '320px 320px', gap: '10px',
        }}>
          <FadeIn style={{ gridRow: '1 / 3', overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
            <div style={{ gridRow: '1 / 3', overflow: 'hidden', borderRadius: '4px', position: 'relative', height: '100%' }}>
              <Image src="/images/Bild-33.jpg" alt="Brautpaar Champagner Hochzeitsmoment Fine Art – Amoriva Films" fill style={{ objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.8s ease' }} sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
            <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', height: '100%' }}>
              <Image src="/images/Bild-101.jpg" alt="Brautpaar emotionaler Hochzeitsfilm Niedersachsen – Amoriva Films" fill style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.8s ease' }} sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative' }}>
            <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', height: '100%' }}>
              <Image src="/images/Bild-67.jpg" alt="Hochzeitsmoment cinematic Hannover Braunschweig – Amoriva Films" fill style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.8s ease' }} sizes="(max-width: 768px) 100vw, 50vw"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: 260px 200px 200px !important; }
          .gallery-grid > *:first-child { grid-row: auto !important; }
        }
      `}</style>
    </>
  );
}
