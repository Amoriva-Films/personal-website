'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const fragen = [
  {
    frage: 'Was kostet ein Hochzeitsfilm bei euch?',
    antwort: 'Das hängt von eurem Tag ab. Wo findet die Hochzeit statt, was braucht ihr, wie lange soll der Film sein. Wir erstellen jedem Paar ein individuelles Angebot nach einem kurzen Gespräch. Schreibt uns einfach an.',
  },
  {
    frage: 'Wie lange dauert es bis wir den Film bekommen?',
    antwort: 'Innerhalb von 6 bis 8 Wochen nach eurer Hochzeit erhaltet ihr euren fertigen Film und alle Fotos in einer privaten Online-Galerie. Bei besonderen Terminwünschen sprechen wir das gerne vorab ab.',
  },
  {
    frage: 'Gibt es einen Vertrag und wie läuft die Bezahlung ab?',
    antwort: 'Ja. Nach der Anfrage erhaltet ihr von uns ein schriftliches Angebot und einen Vertrag. Eine Anzahlung sichert euren Termin. Den Restbetrag zahlt ihr nach der Hochzeit. Alles wird offen und transparent im Vorfeld besprochen.',
  },
  {
    frage: 'Seid ihr nur in Wolfsburg tätig?',
    antwort: 'Nein, wir sind international unterwegs. Wolfsburg ist unser Zuhause, aber wir waren schon in Deutschland, Österreich, der Schweiz und südeuropäischen Ländern. Wo eure Hochzeit ist, schauen wir uns gemeinsam an. Anreisekosten sprechen wir offen im Vorfeld ab.',
  },
  {
    frage: 'Wie viele Hochzeiten begleitet ihr pro Jahr?',
    antwort: 'Wir halten unsere Buchungen bewusst begrenzt. So bleibt jede Hochzeit eine Einzelanfertigung und keine Routine. Ihr arbeitet direkt mit uns und nicht mit einem großen Agenturteam das euch kurz vor der Hochzeit zum ersten Mal trifft.',
  },
  {
    frage: 'In welchem Format erhalten wir den Film und die Fotos?',
    antwort: 'Euer Film wird als hochauflösende Videodatei geliefert. Die Fotos erhaltet ihr in voller Auflösung mit Druckfreigabe. Alles landet in einer privaten Online-Galerie die ihr jederzeit aufrufen und mit Familie und Freunden teilen könnt.',
  },
];

export default function FAQ() {
  const [offen, setOffen] = useState(null);

  return (
    <section className="abschnitt hell-2">
      <div className="bahn lesebreite">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Häufige Fragen</p>
          <h2 className="t-gross" style={{ marginBottom: 'var(--luft-5)' }}>
            Was ihr wissen wollt.
          </h2>
        </FadeIn>

        <div>
          {fragen.map((f, i) => {
            const auf = offen === i;
            return (
              <FadeIn key={i}>
                <div style={{ borderTop: '1px solid var(--linie)' }}>
                  <h3>
                    <button
                      onClick={() => setOffen(auf ? null : i)}
                      aria-expanded={auf}
                      style={{
                        width: '100%', display: 'flex', gap: 'var(--luft-3)',
                        justifyContent: 'space-between', alignItems: 'center',
                        paddingBlock: 'var(--luft-2)', background: 'none', border: 'none',
                        cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'var(--font-inter), system-ui, sans-serif',
                        fontSize: 'var(--schrift-klein)', fontWeight: 500,
                        color: 'var(--tinte)', lineHeight: 1.35,
                      }}
                    >
                      {f.frage}
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0, width: '16px', height: '16px',
                          position: 'relative',
                          transform: auf ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 250ms var(--ease)',
                        }}
                      >
                        <span style={{
                          position: 'absolute', top: '50%', left: 0, right: 0,
                          height: '1px', background: 'var(--grau-2)',
                        }} />
                        <span style={{
                          position: 'absolute', left: '50%', top: 0, bottom: 0,
                          width: '1px', background: 'var(--grau-2)',
                        }} />
                      </span>
                    </button>
                  </h3>
                  {auf && (
                    <p className="t-text t-grau" style={{ paddingBottom: 'var(--luft-2)' }}>
                      {f.antwort}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
