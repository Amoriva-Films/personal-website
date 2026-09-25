import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';

const services = [
  {
    nr: '01',
    title: 'Hochzeitsfilm in Cinégraphie',
    subtitle: 'Hochzeitsvideografie',
    keywords: 'International',
    description:
      'Wir halten euren Tag so fest, wie er sich angefühlt hat. Ruhige Momente, kleine Details und die Augenblicke dazwischen werden zu einem Film, der zeitlos wirkt und eure Geschichte authentisch erzählt.',
    includes: [
      'Vollständige Filmbegleitung (Vorbereitung bis Tanz)',
      'Hauptfilm in Cinégraphie (3 bis 12 Min.)',
      'Highlight Trailer (1 Min.)',
      'Professionelle Farbkorrektur und Tonbearbeitung',
      'Private Online-Galerie zum Download',
    ],
  },
  {
    nr: '02',
    title: 'Hochzeitsfotografie',
    subtitle: 'Fine Art & Documentary',
    keywords: 'International',
    description:
      'Wir schaffen Bilder, die sich echt anfühlen. Mit einem Blick für Licht, Atmosphäre und Details entstehen Aufnahmen, die zeitlos wirken, mal ruhig und intim, mal modern und editorial. Dabei richten wir uns nicht nach starren Posen, sondern nach dem, was zu euch passt.',
    includes: [
      'Vollständige Fotobegleitung eurer Hochzeit',
      'Alle bearbeiteten Fotos in Druckqualität',
      'Online-Galerie (12 Monate verfügbar)',
      'Natürliche Bildbearbeitung ohne übertriebene Filter',
      'Mix aus Reportage & Paarportraits',
    ],
  },
  {
    nr: '03',
    title: 'Kombipaket Film & Foto',
    subtitle: 'Alles aus einer Hand',
    keywords: 'International',
    description:
      'Ein Team für Foto und Film bedeutet weniger Organisation und mehr Zeit für das Wesentliche. Wir arbeiten Hand in Hand und halten euren Tag so fest, dass Bilder und bewegte Aufnahmen wie aus einem Guss wirken.',
    includes: [
      'Alles aus Hochzeitsfilm und Hochzeitsfotografie',
      'Perfekte Abstimmung zwischen Film und Fototeam',
      'Einheitliche Bildsprache und Ästhetik',
      'Ein Ansprechpartner für alles',
    ],
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Leistungen Amoriva Films',
  description: 'Hochzeitsfilm und Hochzeitsfotografie international',
  url: 'https://amoriva-films.de/leistungen',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      provider: { '@type': 'LocalBusiness', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
      areaServed: { '@type': 'Place', name: 'International' },
    },
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://amoriva-films.de/leistungen' },
  ],
};

export default function LeistungenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Nav />

      <main className="hell" style={{ minHeight: '100vh' }}>
        <section className="abschnitt-kopf">
          <div className="bahn">
            <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Unsere Leistungen</p>
            <h1 className="t-display" style={{ marginBottom: 'var(--luft-3)' }}>
              Hochzeitsfilm, Fotografie und mehr.
            </h1>
            <p className="t-text t-grau">
              Hochzeitsfilm und Fotografie, wo immer ihr heiratet.
              International, zeitlos, in Cinégraphie.
            </p>
          </div>
        </section>

        <section className="abschnitt" style={{ paddingTop: 0 }}>
          <div className="bahn">
            {services.map((s) => (
              <div key={s.nr} className="zwei-spalten" style={{
                borderTop: '1px solid var(--linie)',
                paddingBlock: 'var(--luft-5)',
              }}>
                <div>
                  <p className="t-label" style={{ marginBottom: 'var(--luft-2)' }}>{s.nr}</p>
                  <h2 className="t-gross" style={{ marginBottom: 'var(--luft-1)' }}>{s.title}</h2>
                  <p className="t-fein" style={{ marginBottom: 'var(--luft-1)' }}>{s.subtitle}</p>
                  <p className="t-fein t-gruen">{s.keywords}</p>
                </div>
                <div>
                  <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>{s.description}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
                    {s.includes.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex', gap: 'var(--luft-1)', alignItems: 'flex-start',
                        fontSize: 'var(--schrift-fein)', color: 'var(--grau-2)', lineHeight: 1.6,
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="var(--gruen)" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" aria-hidden="true"
                             style={{ flexShrink: 0, marginTop: '4px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="abschnitt hell-2">
          <div className="bahn" style={{ textAlign: 'center' }}>
            <h2 className="t-gross" style={{ marginBottom: 'var(--luft-3)' }}>Bereit für euren Film?</h2>
            <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>
              Erzählt uns von eurer Hochzeit, wir melden uns innerhalb von 24 Stunden.
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
