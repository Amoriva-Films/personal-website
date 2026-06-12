'use client';

import Link from 'next/link';
import Nav from './Nav';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import FadeIn from './FadeIn';

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";
const brown = '#2A1F1B';
const gold  = '#B79B72';
const soft  = '#5E5148';

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
      <header style={{ background: '#F6F1EB', padding: 'clamp(120px,14vw,180px) 8% 0' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeIn>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2.4rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, fontWeight: 300, textDecoration: 'none' }}>Startseite</Link>
              <span style={{ color: gold, fontSize: '0.6rem' }}>›</span>
              <Link href="/ratgeber" style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: gold, fontWeight: 300, textDecoration: 'none' }}>Ratgeber</Link>
              <span style={{ color: gold, fontSize: '0.6rem' }}>›</span>
              <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: soft, fontWeight: 300, opacity: 0.6 }}>{category}</span>
            </nav>

            <span style={{ display: 'block', fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gold, fontWeight: 300, marginBottom: '1.2rem' }}>
              {category}
            </span>

            <h1 style={{ fontFamily: serif, fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 300, lineHeight: 1.08, color: brown, marginBottom: '1.6rem', hyphens: 'none', wordBreak: 'keep-all' }}>
              {title}
            </h1>

            <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center', paddingBottom: 'clamp(40px,5vw,64px)', borderBottom: '1px solid rgba(59,47,42,0.1)' }}>
              <span style={{ fontFamily: sans, fontSize: '12px', color: soft, fontWeight: 300, opacity: 0.65 }}>{date}</span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(59,47,42,0.2)' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: soft, fontWeight: 300, opacity: 0.65 }}>{readTime} Lesezeit</span>
              <span style={{ width: '1px', height: '12px', background: 'rgba(59,47,42,0.2)' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: gold, fontWeight: 300 }}>Amoriva Films</span>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* ── Article Body ─────────────────────────────────── */}
      <article style={{ background: '#F6F1EB', padding: 'clamp(48px,6vw,80px) 8% clamp(64px,8vw,100px)' }}>
        <div
          className="article-body"
          style={{ maxWidth: '760px', margin: '0 auto', fontFamily: sans, fontSize: 'clamp(15px,1.1vw,17px)', fontWeight: 300, color: soft, lineHeight: 1.85 }}
        >
          {children}
        </div>
      </article>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ background: '#EFE7DD', padding: 'clamp(52px,6vw,80px) 8%', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gold, marginBottom: '1rem' }}>Amoriva Films · Wolfsburg</p>
          <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px,3vw,44px)', fontWeight: 300, color: brown, marginBottom: '1rem' }}>
            Euer Hochzeitsfilm wartet auf euch.
          </h2>
          <p style={{ fontFamily: sans, fontSize: '14px', fontWeight: 300, color: soft, maxWidth: '420px', margin: '0 auto 2.2rem', lineHeight: 1.7 }}>
            Schreibt uns, wir antworten innerhalb von 24 Stunden und beraten euch kostenlos.
          </p>
          <Link
            href="/anfrage"
            style={{ display: 'inline-block', border: '1px solid #3B2F2A', padding: '14px 40px', fontFamily: sans, fontSize: '0.68rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3B2F2A', textDecoration: 'none', transition: 'background 500ms, color 500ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B2F2A'; e.currentTarget.style.color = '#F6F1EB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3B2F2A'; }}
          >
            Jetzt anfragen
          </Link>
        </FadeIn>
      </section>

      {/* ── Related Articles ─────────────────────────────── */}
      <section style={{ background: '#F6F1EB', padding: 'clamp(52px,6vw,80px) 8%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: gold, marginBottom: '2rem' }}>Weitere Artikel</p>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
              {others.map(a => (
                <Link key={a.href} href={a.href} style={{ textDecoration: 'none', borderTop: '1px solid rgba(59,47,42,0.12)', paddingTop: '1.4rem', display: 'block' }}
                  onMouseEnter={e => e.currentTarget.querySelector('h3').style.opacity = '0.5'}
                  onMouseLeave={e => e.currentTarget.querySelector('h3').style.opacity = '1'}
                >
                  <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, fontWeight: 300, display: 'block', marginBottom: '0.6rem' }}>{a.cat}</span>
                  <h3 style={{ fontFamily: serif, fontSize: 'clamp(18px,1.6vw,24px)', fontWeight: 300, color: brown, lineHeight: 1.2, transition: 'opacity 0.3s' }}>{a.label}</h3>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style>{`
        .article-body h2 {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(22px, 2.2vw, 32px);
          font-weight: 300;
          color: #2A1F1B;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .article-body h3 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #B79B72;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
        }
        .article-body p { margin-bottom: 1.4rem; }
        .article-body ul { margin: 0 0 1.4rem 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .article-body ul li { display: flex; gap: 0.8rem; align-items: flex-start; }
        .article-body ul li::before { content: '›'; color: #B79B72; flex-shrink: 0; margin-top: 2px; }
        .article-body a { color: #B79B72; text-decoration: underline; text-underline-offset: 3px; }
        .article-body strong { font-weight: 400; color: #2A1F1B; }
        .article-body .highlight-box {
          border-left: 2px solid #B79B72;
          padding: 1rem 1.4rem;
          margin: 2rem 0;
          background: rgba(183,155,114,0.07);
          font-style: italic;
        }
        @media (max-width: 760px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SmoothScroll>
  );
}
