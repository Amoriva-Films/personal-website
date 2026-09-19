import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';
import Galerie from '@/components/Galerie';
import { galerie } from '@/data/galerie';

/* Nur eigene Aufnahmen. Frueher standen hier sechs Hochzeiten mit
   Paarnamen, deren Bilder samt Galerien aus einer Bilddatenbank stammten.
   Werbung mit Kunden, die es nicht gibt, ist irrefuehrend. Namen und
   Paar-Galerien kommen zurueck, sobald die Paare zugestimmt haben.
   Die Bilder stehen in data/galerie.js und werden dort gepflegt. */

export default function ReferenzenPage() {
  return (
    <>
      <Nav />

      <main className="dunkel" style={{ minHeight: '100vh' }}>
        <section className="abschnitt" style={{ paddingTop: 'clamp(9rem, 16vw, 14rem)' }}>
          <div className="mitte">
            <p className="t-label" style={{ marginBottom: '1.5rem' }}>Unsere Arbeiten</p>
            <h1 className="t-display" style={{ color: 'var(--auf-dunkel)', maxWidth: '16ch' }}>
              Momente, die bleiben.
            </h1>
            <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginTop: '1.75rem' }}>
              Bilder aus Hochzeiten, die wir begleiten durften.
            </p>
          </div>
        </section>

        <section className="abschnitt" style={{ paddingTop: 0 }}>
          <div className="mitte">
            <Galerie bilder={galerie} />
          </div>
        </section>

        <section className="abschnitt-eng" style={{ borderTop: '1px solid rgba(244,244,242,0.14)' }}>
          <div className="mitte-schmal" style={{ textAlign: 'center' }}>
            <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)', marginBottom: '1.5rem' }}>
              Euer Tag soll der nächste sein.
            </h2>
            <p className="t-text" style={{ color: 'var(--grau-dunkel)', margin: '0 auto 2.5rem' }}>
              Schreibt uns, wir melden uns persönlich innerhalb von 24 Stunden.
            </p>
            <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsApp />
    </>
  );
}
