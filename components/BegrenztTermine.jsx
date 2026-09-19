'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

export default function BegrenztTermine() {
  return (
    <section className="abschnitt hell">
      <FadeIn>
        <div className="mitte-schmal" style={{ textAlign: 'center' }}>
          <p className="t-label" style={{ marginBottom: '1.5rem' }}>
            Verfügbarkeit 2026 / 2027
          </p>
          <h2 className="t-gross" style={{ marginBottom: '1.25rem' }}>
            Für 2026 und 2027 haben wir noch ein paar Termine frei.
          </h2>
          <p className="t-text t-grau" style={{ margin: '0 auto 2.5rem' }}>
            Schreibt uns kurz euer Datum und wir schauen ob es passt.
          </p>
          <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
        </div>
      </FadeIn>
    </section>
  );
}
