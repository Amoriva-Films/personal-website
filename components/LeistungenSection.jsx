'use client';

import Link from 'next/link';
import FadeIn from './FadeIn';

/* Keine Preise, keine Ab-Preise, keine Zahlen. Eine Zahl macht
   vergleichbar und zieht die Anfragen an, die nur auf den Preis
   schauen. Das Budgetfeld im Anfrageformular bleibt. */

const services = [
  {
    nr: '01',
    title: 'Hochzeitsfilm',
    subtitle: 'Cinematische Videografie Niedersachsen',
    description: 'Ein cinematic Hochzeitsfilm der sich anfühlt wie ein echtes Kinoerlebnis. Wir fangen die Atmosphäre, die Emotionen und die kleinen Momente ein die euren Tag besonders machen. Für Paare in Wolfsburg, Braunschweig, Hannover und ganz Deutschland.',
    includes: [
      'Cinematischer Hauptfilm (3 bis 12 Minuten)',
      'Emotionaler Highlights-Clip (60 bis 90 Sekunden)',
      'Vollständige Begleitung vom Morgen bis zum Abend',
      'Private Online-Galerie',
      'Soundtrack nach euren Wünschen',
    ],
  },
  {
    nr: '02',
    title: 'Hochzeitsfotografie',
    subtitle: 'Fine Art Fotografie Niedersachsen',
    description: 'Hochzeitsfotos die zeitlos sind. Wir arbeiten im Fine Art Stil und achten auf Licht, Tiefe und Authentizität. Keine gestellten Fotos. Nur echte Momente.',
    includes: [
      'Vollständige Fotobegleitung vom Getting Ready bis zum Tanz',
      'Bearbeitete Galeriefotos in hoher Auflösung',
      'Private Online-Galerie zum Download',
      'Druckfreigabe inklusive',
    ],
  },
  {
    nr: '03',
    title: 'Film und Foto',
    subtitle: 'Das komplette Hochzeitspaket',
    description: 'Ihr bekommt beides aus einer Hand. Kein zweites Team, keine Koordination zwischen verschiedenen Anbietern. Wir kennen euren Tag und halten ihn vollständig fest. Film und Foto perfekt aufeinander abgestimmt.',
    includes: [
      'Alles aus Film und Fotografie-Paket',
      'Perfekte Abstimmung durch ein Team',
      'Einheitliche Bildsprache durch gesamten Content',
    ],
  },
];

export default function LeistungenSection() {
  return (
    <section id="leistungen" className="abschnitt hell-2">
      <div className="bahn">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Leistungen</p>
          <h2 className="t-gross" style={{ maxWidth: '18ch', marginBottom: 'var(--luft-5)' }}>
            Was wir für euch tun können.
          </h2>
        </FadeIn>

        {services.map((s) => (
          <FadeIn key={s.nr}>
            {/* Grosse ruhige Bloecke. Keine Karten mit Rahmen und Schatten,
                getrennt wird durch eine Linie und durch Raum. */}
            <div className="zwei-spalten" style={{
              borderTop: '1px solid var(--linie)',
              paddingBlock: 'var(--luft-4)',
            }}>
              <div>
                <p className="t-label" style={{ marginBottom: 'var(--luft-2)' }}>{s.nr}</p>
                <h3 className="t-gross" style={{ marginBottom: 'var(--luft-1)' }}>{s.title}</h3>
                <p className="t-fein">{s.subtitle}</p>
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
          </FadeIn>
        ))}

        <FadeIn>
          <div style={{ paddingTop: 'var(--luft-4)', borderTop: '1px solid var(--linie)' }}>
            <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>
              Jede Hochzeit ist anders. Was zu eurem Tag passt, besprechen wir
              in einem kurzen Gespräch und ihr bekommt ein Angebot, das wirklich
              zu euch passt.
            </p>
            <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
