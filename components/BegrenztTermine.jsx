'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function BegrenztTermine() {
  return (
    <section className="abschnitt hell-2">
      <FadeIn>
        <div className="bahn lesebreite">
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>
            Verfügbarkeit 2026 / 2027
          </p>
          <h2 className="t-gross" style={{ marginBottom: 'var(--luft-3)' }}>
            Für 2026 und 2027 haben wir noch ein paar Termine frei.
          </h2>
          <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>
            Schreibt uns kurz euer Datum und wir schauen ob es passt.
          </p>
          <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
        </div>
      </FadeIn>
    </section>
  );
}
