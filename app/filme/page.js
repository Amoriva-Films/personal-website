import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';
import { Filmkachel, KeineFilme } from '@/components/Filmspieler';
import { filme } from '@/data/filme';

export const metadata = {
  title: 'Hochzeitsfilme aus Niedersachsen',
  description:
    'Ausgewählte Hochzeitsfilme von Amoriva Films. Cinematische Hochzeitsfilme aus Wolfsburg, Braunschweig, Hannover und international.',
  alternates: { canonical: 'https://amoriva-films.de/filme' },
};

export default function FilmePage() {
  return (
    <>
      <Nav />

      <main className="dunkel" style={{ minHeight: '100vh' }}>
        <section className="abschnitt-kopf">
          <div className="bahn">
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Unsere Filme</p>
            <h1 className="t-display" style={{ color: 'var(--auf-dunkel)', maxWidth: '14ch' }}>
              Seht selbst.
            </h1>
            <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginTop: 'var(--luft-3)' }}>
              Ein Hochzeitsfilm lässt sich nicht beschreiben. Man muss ihn
              sehen. Deshalb steht hier unsere Arbeit und nicht, was wir über
              sie sagen könnten.
            </p>
          </div>
        </section>

        <section className="abschnitt" style={{ paddingTop: 0 }}>
          <div className="bahn">
            {filme.length === 0 ? (
              <KeineFilme />
            ) : (
              <div className="filme-raster">
                {filme.map((film, i) => (
                  <Filmkachel key={film.id || i} film={film} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="abschnitt" style={{
          borderTop: '1px solid rgba(244,244,242,0.14)',
        }}>
          <div className="bahn lesebreite">
            <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)', marginBottom: 'var(--luft-3)' }}>
              Soll euer Tag der nächste sein?
            </h2>
            <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginBottom: 'var(--luft-4)' }}>
              Schreibt uns kurz, erzählt uns von eurem Tag und wir schauen ob
              wir zueinander passen. Kein Druck, kein Verkaufsgespräch.
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
