'use client';

import FadeIn from './FadeIn';

const punkte = [
  {
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    label: 'Persönliche Beratung', sub: 'Von Anfang bis Ende nur wir',
  },
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    label: 'Datenschutz garantiert', sub: 'Veröffentlichung nur nach eurer Freigabe',
  },
  {
    icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    label: 'Antwort innerhalb 24 Stunden', sub: 'Auch per WhatsApp erreichbar',
  },
  {
    icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    label: 'International tätig', sub: 'Deutschland, Österreich, Schweiz und Europa',
  },
];

export default function TrustBadges() {
  return (
    <FadeIn>
      {/* Keine Pillen mehr mit Rahmen und Radius. Vier Spalten, nur durch
          Raum getrennt, oben und unten eine feine Linie. */}
      <section className="abschnitt-eng hell" style={{
        borderTop: '1px solid var(--linie)',
        borderBottom: '1px solid var(--linie)',
      }}>
        <div className="mitte vertrauen-raster">
          {punkte.map((p, i) => (
            <div key={i}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="var(--gruen)" strokeWidth="1.4" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true"
                   style={{ marginBottom: '0.9rem' }}>
                {p.icon}
              </svg>
              <p style={{
                fontSize: 'var(--schrift-fein)', fontWeight: 500,
                color: 'var(--tinte)', lineHeight: 1.4, marginBottom: '0.25rem',
              }}>
                {p.label}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--grau-2)', lineHeight: 1.5 }}>
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
