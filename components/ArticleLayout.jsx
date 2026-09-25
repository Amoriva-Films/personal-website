'use client';

import Link from 'next/link';
import Nav from './Nav';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import FadeIn from './FadeIn';

const serif = "var(--font-display), Georgia, serif";
const sans  = "var(--font-text), system-ui, sans-serif";
const brown = 'var(--tinte)';
const gruen  = 'var(--gruen)';
const soft  = 'var(--grau-2)';

const related_articles = [
  { href: '/ratgeber/was-kostet-ein-hochzeitsfilm',  label: 'Was kostet ein Hochzeitsfilm?',               cat: 'Kosten & Pakete'  },
  { href: '/ratgeber/cinematic-hochzeitsfilm',       label: 'Was ist ein cinematic Hochzeitsfilm?',         cat: 'Stil & Qualität'  },
  { href: '/ratgeber/same-day-edit-hochzeit',        label: 'Same Day Edit: Film noch am Hochzeitstag',     cat: 'Leistungen'       },
  { href: '/ratgeber/hochzeitsfilmer-wann-buchen',   label: 'Wann Hochzeitsfilmer & Fotograf buchen?',      cat: 'Planung'          },
];

export default function ArticleLayout({ title, category, date, readTime, jsonLd, breadcrumb, currentHref, children }) {
  const others = related_articles.filter(a => a.href !== currentHref).slice(0, 3);

  return (
    <SmoothScroll>
      {jsonLd    && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />}

      <Nav />

      {/* ── Article Header ───────────────────────────────── */}
      <header className="abschnitt-kopf hell" style={{ paddingBottom: 0 }}>
        <div className="bahn lesebreite">
          <FadeIn>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: 'var(--luft-4)', display: 'flex', gap: 'var(--luft-1)', alignItems: 'center' }}>
              <Link href="/" style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: gruen, fontWeight: 300, textDecoration: 'none' }}>Startseite</Link>
              <span style={{ color: gruen, fontSize: '0.6rem' }}>›</span>
              <Link href="/ratgeber" style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: gruen, fontWeight: 300, textDecoration: 'none' }}>Ratgeber</Link>
              <span style={{ color: gruen, fontSize: '0.6rem' }}>›</span>
              <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: soft, fontWeight: 300, opacity: 0.6 }}>{category}</span>
            </nav>

            <span style={{ display: 'block', fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gruen, fontWeight: 300, marginBottom: 'var(--luft-2)' }}>
              {category}
            </span>

            <h1 style={{ fontFamily: serif, fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 300, lineHeight: 1.08, color: brown, marginBottom: 'var(--luft-3)', hyphens: 'none', wordBreak: 'keep-all' }}>
              {title}
            </h1>

            <div style={{ display: 'flex', gap: 'var(--luft-3)', alignItems: 'center', paddingBottom: 'clamp(40px,5vw,64px)', borderBottom: '1px solid var(--linie)' }}>
              <span style={{ fontFamily: sans, fontSize: '12px', color: soft, fontWeight: 300, opacity: 0.65 }}>{date}</span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(59,47,42,0.2)' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: soft, fontWeight: 300, opacity: 0.65 }}>{readTime} Lesezeit</span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(59,47,42,0.2)' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: gruen, fontWeight: 300 }}>Amoriva Films</span>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* ── Article Body ─────────────────────────────────── */}
      <article className="abschnitt hell">
        <div
          className="article-body bahn lesebreite"
          style={{ fontFamily: sans, fontSize: 'clamp(15px,1.1vw,17px)', fontWeight: 300, color: soft, lineHeight: 1.85 }}
        >
          {children}
        </div>
      </article>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="abschnitt hell-2">
        <FadeIn>
          <p style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gruen, marginBottom: 'var(--luft-2)' }}>Amoriva Films · Wolfsburg</p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px,3vw,44px)', fontWeight: 300, color: brown, marginBottom: 'var(--luft-2)' }}>
            Euer Hochzeitsfilm wartet auf euch.
          </h2>
          <p style={{ fontFamily: sans, fontSize: '14px', fontWeight: 300, color: soft, marginBottom: 'var(--luft-4)', lineHeight: 1.7 }}>
            Schreibt uns, wir antworten innerhalb von 24 Stunden und beraten euch kostenlos.
          </p>
          <Link
            href="/anfrage"
            className="knopf knopf-voll"
          >
            Jetzt anfragen
          </Link>
        </FadeIn>
      </section>

      {/* ── Related Articles ─────────────────────────────── */}
      <section className="abschnitt hell">
        <div className="bahn">
          <FadeIn>
            <p style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gruen, marginBottom: 'var(--luft-4)' }}>Weitere Artikel</p>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--luft-4)' }}>
              {others.map(a => (
                <Link key={a.href} href={a.href} style={{ textDecoration: 'none', borderTop: '1px solid var(--linie)', paddingTop: 'var(--luft-3)', display: 'block' }}
                  onMouseEnter={e => e.currentTarget.querySelector('h3').style.opacity = '0.5'}
                  onMouseLeave={e => e.currentTarget.querySelector('h3').style.opacity = '1'}
                >
                  <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gruen, fontWeight: 300, display: 'block', marginBottom: 'var(--luft-1)' }}>{a.cat}</span>
                  <h3 style={{ fontFamily: serif, fontSize: 'clamp(18px,1.6vw,24px)', fontWeight: 300, color: brown, lineHeight: 1.2, transition: 'opacity 0.3s' }}>{a.label}</h3>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .article-body h2 {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 300;
          color: var(--tinte);
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .article-body h3 {
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #687850;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
        }
        .article-body p { margin-bottom: 1.4rem; }
        .article-body ul { margin: 0 0 1.4rem 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .article-body ul li { display: flex; gap: 0.8rem; align-items: flex-start; }
        .article-body ul li::before { content: '›'; color: #687850; flex-shrink: 0; margin-top: 2px; }
        .article-body a { color: #687850; text-decoration: underline; text-underline-offset: 3px; }
        .article-body strong { font-weight: 400; color: var(--tinte); }
        .article-body .highlight-box {
          border-left: 2px solid #687850;
          padding: 1rem 1.4rem;
          margin: 2rem 0;
          background: rgba(104,120,80,0.07);
          font-style: italic;
        }
        @media (max-width: 760px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </SmoothScroll>
  );
}
