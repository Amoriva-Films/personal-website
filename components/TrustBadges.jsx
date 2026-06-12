'use client';

import FadeIn from './FadeIn';

const sans = "var(--font-inter), system-ui, sans-serif";

const badges = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    label: 'Persönliche Beratung', sub: 'Von Anfang bis Ende nur wir',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    label: 'Datenschutz garantiert', sub: 'Eure Bilder bleiben privat',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: 'Antwort innerhalb 24 Stunden', sub: 'Auch per WhatsApp erreichbar',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    label: 'International tätig', sub: 'Deutschland, Österreich, Schweiz und Europa',
  },
];

export default function TrustBadges() {
  return (
    <FadeIn>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.75rem', padding: '3rem 1.5rem',
        borderTop: '0.5px solid #E8E2DC', borderBottom: '0.5px solid #E8E2DC',
        background: '#FAF9F7',
      }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '0.7rem 1.25rem', background: '#FFFFFF',
            border: '0.5px solid #E8E2DC', borderRadius: '100px',
          }}>
            <span style={{ color: '#C4973A', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {b.icon}
            </span>
            <div>
              <p style={{ fontFamily: sans, fontSize: '13px', fontWeight: 500, color: '#3B2F2A', margin: 0, lineHeight: 1.3 }}>{b.label}</p>
              <p style={{ fontFamily: sans, fontSize: '11px', color: '#8A7B6F', margin: 0, fontWeight: 300 }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
