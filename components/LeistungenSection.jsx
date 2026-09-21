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
          <div className="paar" style={{ marginBottom: 'var(--luft-5)' }}>
            <div>
              <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Leistungen</p>
              <h2 className="t-gross">
                Was wir für euch <span className="kursiv">tun können.</span>
              </h2>
            </div>
          </div>
        </FadeIn>

        {/* Lagen als drei Kacheln untereinander, jede zweispaltig - der
            Abschnitt kam damit auf 1,75 Bildschirme und war der laengste
            der ganzen Seite. Jetzt nebeneinander: drei Leistungen sind
            eine Auswahl, und eine Auswahl vergleicht man, statt sie zu
            durchscrollen. */}
        <div className="leistungs-raster">
          {services.map((s) => (
            <FadeIn key={s.nr}>
              <div className="kachel" style={{ height: '100%' }}>
                <span className="schritt-ziffer" aria-hidden="true">{s.nr}</span>
                <h3 className="t-klein" style={{ marginTop: 'var(--luft-2)', marginBottom: 'var(--luft-1)' }}>{s.title}</h3>
                <p className="t-fein" style={{ marginBottom: 'var(--luft-3)' }}>{s.subtitle}</p>
                <p className="t-fein t-grau" style={{ marginBottom: 'var(--luft-3)' }}>{s.description}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
                  {s.includes.map((item, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: 'var(--luft-1)', alignItems: 'flex-start',
                      fontSize: '0.875rem', color: 'var(--grau-2)', lineHeight: 1.55,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
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
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ paddingTop: 'var(--luft-4)', borderTop: '1px solid var(--linie)' }}>
            <Link href="/anfrage" className="knopf knopf-voll">Anfrage stellen</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
