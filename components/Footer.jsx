'use client';

import Link from 'next/link';
import Image from 'next/image';

const LOGO_HOEHE = 40;
const LOGO_BREITE = Math.round(LOGO_HOEHE * 1116 / 427);

const wege = [
  // { label: 'Filme', href: '/filme' },   // wieder rein, sobald es Filme gibt
  { label: 'Galerie',    href: '/referenzen'     },
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Über uns',   href: '/#founders'   },
  { label: 'Anfrage',    href: '/anfrage'     },
];

const rechtliches = [
  { label: 'Impressum',   href: '/impressum'   },
  { label: 'Datenschutz', href: '/datenschutz' },
];

const linkStil = {
  fontSize: 'var(--schrift-fein)',
  color: 'var(--grau-dunkel)',
  textDecoration: 'none',
  transition: 'color 220ms var(--ease)',
};

export default function Footer() {
  return (
    <footer className="dunkel" style={{ borderTop: '1px solid rgba(244,244,242,0.12)' }}>
      <div className="abschnitt">
        <div className="bahn fuss-raster">
          {/* Marke und Kontakt */}
          <div>
            <Image
              src="/brand/wortmarke-hell.png"
              alt="Amoriva Films"
              width={LOGO_BREITE}
              height={LOGO_HOEHE}
              sizes={`${LOGO_BREITE}px`}
              style={{ objectFit: 'contain', marginBottom: 'var(--luft-3)' }}
            />
            <p style={{ fontSize: 'var(--schrift-fein)', color: 'var(--grau-dunkel)', lineHeight: 1.7 }}>
              Hochzeitsfilm und Fotografie<br />
              Wolfsburg, Niedersachsen
            </p>
          </div>

          {/* Wege durch die Seite */}
          <nav aria-label="Fußzeile">
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Seiten</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
              {wege.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={linkStil}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--auf-dunkel)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--grau-dunkel)'; }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontaktwege */}
          <div>
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Kontakt</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
              <li>
                <a href="mailto:booking@amoriva-films.de" style={linkStil}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--auf-dunkel)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--grau-dunkel)'; }}>
                  booking@amoriva-films.de
                </a>
              </li>
              <li>
                <a href="tel:+4915565559747" style={linkStil}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--auf-dunkel)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--grau-dunkel)'; }}>
                  +49 155 6555 9747
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/amorivafilms/" target="_blank" rel="noopener noreferrer" style={linkStil}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--auf-dunkel)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--grau-dunkel)'; }}>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(244,244,242,0.12)',
        /* Trug denselben Rand wie die Bahn darin: der Text stand dadurch
           bei 120 statt 60 px. Der Rand gehoert der Bahn, nicht hier. */
        paddingBlock: '1.5rem',
      }}>
        <div className="bahn fuss-leiste">
          <span style={{ fontSize: '0.8125rem', color: 'var(--grau-dunkel)' }}>
            © 2026 Amoriva Films
          </span>
          <div style={{ display: 'flex', gap: 'var(--luft-3)' }}>
            {rechtliches.map(({ label, href }) => (
              <Link key={label} href={href} style={{ ...linkStil, fontSize: '0.8125rem' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--auf-dunkel)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--grau-dunkel)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
