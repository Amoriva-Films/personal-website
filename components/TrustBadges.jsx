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
    /* Die Unterzeile las sich wie eine Liste von Orten, an denen wir
       schon waren. Bisher war das nur Deutschland. Jetzt sagt sie, wohin
       wir reisen - das stimmt und bleibt genauso international. */
    label: 'International buchbar', sub: 'Wir reisen dorthin, wo eure Hochzeit ist',
  },
];

export default function TrustBadges() {
  return (
    <FadeIn>
      {/* Kein eigener Abschnitt: die vier Punkte stehen in der Bahn des
          Leistungs-Abschnitts, zwischen den Paketen und dem Knopf. Das
          spart eine Nahtstelle und liest sich als ein Gedanke. */}
      {/* Die vier Punkte standen als nackte Spalten im Weissraum und
          verschwanden darin. Jetzt tragen sie eine Kachel, wie auf
          amoriva.app: feine Linie, 12 px Radius, kein Schatten. Das
          Zeichen sitzt in einem runden Feld in Markengruen.          */}
      <div className="vertrauen-raster" style={{ marginTop: 'var(--luft-5)', marginBottom: 'var(--luft-5)' }}>
          {punkte.map((p, i) => (
            <FadeIn key={i} index={i}>
            <div className="kachel kachel-heb" style={{ height: '100%' }}>
              <span aria-hidden="true" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38, borderRadius: 'var(--radius-pille)',
                background: 'rgba(104,120,80,0.10)',
                marginBottom: 'var(--luft-3)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="var(--gruen)" strokeWidth="1.5" strokeLinecap="round"
                     strokeLinejoin="round">
                  {p.icon}
                </svg>
              </span>
              <p style={{
                fontSize: 'var(--schrift-fein)', fontWeight: 500,
                color: 'var(--tinte)', lineHeight: 1.4, marginBottom: 'var(--luft-1)',
              }}>
                {p.label}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--grau-2)', lineHeight: 1.5 }}>
                {p.sub}
              </p>
            </div>
            </FadeIn>
          ))}
      </div>
    </FadeIn>
  );
}
