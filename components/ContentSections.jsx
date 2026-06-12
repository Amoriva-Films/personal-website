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
              Eigentlich passiert auf einer<br />Hochzeit gar nicht so viel.
            </h2>
            <div style={{ width: '2.5rem', height: '1px', background: gold, margin: '0 auto 2rem' }} />
            <p style={{ fontFamily: sans, fontSize: '17px', lineHeight: 1.9, color: soft, marginBottom: '1.5rem', fontWeight: 300 }}>
              Ein paar Stunden, Menschen die sich lieben, ein Ja-Wort und ganz viel Aufregung. Und trotzdem ist kein Tag so vollgepackt mit Momenten die man nie wieder vergessen will.
            </p>
            <p style={{ fontFamily: sans, fontSize: '17px', lineHeight: 1.9, color: soft, marginBottom: '2.75rem', fontWeight: 300 }}>
              Wir sind da um sie festzuhalten. Nicht weil wir müssen, sondern weil wir genau dafür hier sind.
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

      {/* ── 4. Unser Ansatz ─────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 1.5rem', background: '#F5F2ED', borderTop: '0.5px solid #E8E2DC' }}>
        <div className="ansatz-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: muted, marginBottom: '1.5rem', fontWeight: 300 }}>
                Unser Ansatz
              </p>
              <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', fontWeight: 400, color: brown, lineHeight: 1.3, marginBottom: '1.75rem' }}>
                Elegant begleitet.<br />Persönlich erzählt.
              </h2>
              <p style={{ fontFamily: sans, fontSize: '16px', lineHeight: 1.9, color: soft, marginBottom: '1.25rem', fontWeight: 300 }}>
                Jedes Paar ist anders. Jede Hochzeit auch. Deshalb reden wir vor dem Drehen lieber erstmal miteinander. Nicht über Technik und Pakete, sondern über euch.
              </p>
              <p style={{ fontFamily: sans, fontSize: '16px', lineHeight: 1.9, color: soft, marginBottom: '2rem', fontWeight: 300 }}>
                Was euch wichtig ist, was euch bewegt, was ihr euch vorstellt. Daraus entsteht dann ein Film der sich anfühlt wie euer Tag und nicht wie irgendein anderer.
              </p>
              <Link href="/anfrage" style={{ fontFamily: sans, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, textDecoration: 'none', borderBottom: '1px solid #C4973A', paddingBottom: '2px', transition: 'opacity 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.65'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
                Anfrage stellen
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { schritt: 'Vor der Hochzeit', text: 'Ihr erzählt uns von eurem Tag. Nicht von Abläufen, sondern davon was euch wirklich wichtig ist.' },
                { schritt: 'Am Hochzeitstag', text: 'Wir sind irgendwo im Hintergrund. Und trotzdem überall. Keine Kommandos, kein Posieren.' },
                { schritt: 'Danach', text: 'Film und Fotos landen in eurer privaten Galerie. Zum Ansehen, Weinen und nochmal Ansehen.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.5rem 1.75rem', background: '#FFFFFF', borderRadius: '8px', border: '0.5px solid #E8E2DC' }}>
                  <p style={{ fontFamily: sans, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: gold, marginBottom: '0.6rem', fontWeight: 500 }}>{item.schritt}</p>
                  <p style={{ fontFamily: sans, fontSize: '15px', lineHeight: 1.75, color: soft, margin: 0, fontWeight: 300 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .ansatz-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: 260px 200px 200px !important; }
          .gallery-grid > *:first-child { grid-row: auto !important; }
        }
      `}</style>
    </>
  );
}
