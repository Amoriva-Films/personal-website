'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

/* Verfuegbarkeit als eigener, moderner Akzent-Block: dunkel (Kontrast zu
   den hellen Abschnitten daneben), kompakt, mit einem lebendigen Signal -
   ein pulsierender Punkt je Jahr und ein grosser Ghost-Jahrgang im Grund. */

const jahre = [
  { jahr: '2026', frei: 'Wenige Termine frei' },
  { jahr: '2027', frei: 'Buchung geöffnet' },
];

export default function BegrenztTermine() {
  return (
    <section className="abschnitt dunkel verf-band">
      <span aria-hidden="true" className="verf-ghost">26·27</span>
      <FadeIn>
        <div className="bahn verf-grid">
          <div>
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Verfügbarkeit 2026 / 2027</p>
            <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)', marginBottom: 'var(--luft-3)' }}>
              Noch ein paar <span className="kursiv">Termine frei.</span>
            </h2>
            <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginBottom: 'var(--luft-4)' }}>
              Schreibt uns kurz euer Datum und wir schauen, ob es passt.
            </p>
            <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
          </div>

          <div className="verf-jahre">
            {jahre.map((j) => (
              <div key={j.jahr} className="verf-karte">
                <span className="verf-dot" aria-hidden="true" />
                <span className="verf-jahr">{j.jahr}</span>
                <span className="verf-frei">{j.frei}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <style>{`
        .verf-band { position: relative; overflow: hidden; }
        .verf-ghost {
          position: absolute; right: -0.5rem; bottom: -3rem; z-index: 0;
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(6rem, 20vw, 15rem); line-height: 0.8;
          color: rgba(244,244,242,0.045); letter-spacing: -0.02em;
          pointer-events: none; user-select: none; white-space: nowrap;
          animation: verfDrift 9s ease-in-out infinite alternate;
        }
        @keyframes verfDrift { from { transform: translateX(0); } to { transform: translateX(-20px); } }
        .verf-grid {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(2rem, 5vw, 4.5rem); align-items: center;
        }
        .verf-jahre { display: grid; grid-template-columns: 1fr 1fr; gap: var(--luft-2); }
        .verf-karte {
          border: 1px solid rgba(244,244,242,0.14);
          border-radius: var(--radius);
          padding: var(--luft-3);
          background: rgba(244,244,242,0.03);
          display: flex; flex-direction: column; gap: 0.3rem;
          transition: border-color 300ms var(--ease), transform 300ms var(--ease);
        }
        @media (hover: hover) {
          .verf-karte:hover { border-color: var(--gruen-hell); transform: translateY(-3px); }
        }
        .verf-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--gruen-hell);
          box-shadow: 0 0 0 0 rgba(155,176,122,0.5);
          animation: verfPuls 1.8s ease-out infinite;
        }
        @keyframes verfPuls {
          0%   { box-shadow: 0 0 0 0 rgba(155,176,122,0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(155,176,122,0); }
          100% { box-shadow: 0 0 0 0 rgba(155,176,122,0); }
        }
        .verf-jahr {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem); line-height: 1;
          color: var(--auf-dunkel); letter-spacing: -0.01em; margin-top: 0.2rem;
        }
        .verf-frei { font-size: 0.8125rem; color: var(--grau-dunkel); letter-spacing: 0.02em; }
        @media (max-width: 860px) {
          .verf-grid { grid-template-columns: 1fr; gap: var(--luft-4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .verf-ghost, .verf-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
