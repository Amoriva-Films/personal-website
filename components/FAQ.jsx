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
    antwort: 'Nein, wir filmen international. Wolfsburg ist unser Zuhause und bisher waren wir in ganz Deutschland unterwegs. Für eure Hochzeit reisen wir genauso nach Österreich, in die Schweiz oder nach Südeuropa. Wo es hingeht, schauen wir uns gemeinsam an, und die Anreise sprechen wir vorher offen ab.',
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
    <section className="abschnitt dunkel faq-dunkel">
      <div className="bahn">
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'var(--luft-4)' }}>
            <p className="t-label" style={{ justifyContent: 'center', marginBottom: 'var(--luft-2)' }}>Häufige Fragen</p>
            <h2 className="t-gross" style={{ color: 'var(--auf-dunkel)' }}>
              Was ihr <span className="kursiv">wissen wollt.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="faq-liste">
          {fragen.map((f, i) => {
            const auf = offen === i;
            return (
              <FadeIn key={i} index={i}>
                <div className={`faq-zeile${auf ? ' faq-zeile--auf' : ''}`}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      className="faq-frage"
                      onClick={() => setOffen(auf ? null : i)}
                      aria-expanded={auf}
                    >
                      <span className="faq-frage-text">{f.frage}</span>
                      <span className={`faq-plus${auf ? ' faq-plus--auf' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-antwort" data-auf={auf ? '1' : '0'}>
                    <div className="faq-antwort-inner">
                      <p>{f.antwort}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .faq-dunkel { position: relative; overflow: hidden; }
        /* Weicher Sage-Schein oben links, wie der Akzent in der Vorlage, nur in Markenfarbe. */
        .faq-dunkel::before {
          content: ''; position: absolute; top: -12%; left: -6%;
          width: 360px; height: 360px; z-index: 0; pointer-events: none;
          background: radial-gradient(circle at center, rgba(110,125,84,0.22), rgba(110,125,84,0) 68%);
          filter: blur(6px);
        }
        .faq-liste { position: relative; z-index: 1; max-width: 760px; margin-inline: auto; }
        .faq-zeile { border-top: 1px solid rgba(244,244,242,0.12); }
        .faq-zeile:last-child { border-bottom: 1px solid rgba(244,244,242,0.12); }
        .faq-frage {
          width: 100%; display: grid; grid-template-columns: 1fr auto; align-items: center;
          gap: var(--luft-3); padding-block: 0.95rem;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: 1.0625rem; font-weight: 500; line-height: 1.3;
          color: var(--auf-dunkel);
          transition: color 200ms var(--ease);
        }
        .faq-frage-text { text-align: center; }
        @media (hover: hover) { .faq-frage:hover .faq-frage-text { color: var(--gruen-hell); } }
        /* Plus-Zeichen aus zwei Strichen, dreht beim Oeffnen zum x. */
        .faq-plus { position: relative; width: 15px; height: 15px; flex-shrink: 0; transition: transform 300ms var(--ease); }
        .faq-plus::before, .faq-plus::after {
          content: ''; position: absolute; background: var(--gruen-hell); border-radius: 1px;
        }
        .faq-plus::before { top: 50%; left: 0; right: 0; height: 1.5px; transform: translateY(-50%); }
        .faq-plus::after  { left: 50%; top: 0; bottom: 0; width: 1.5px; transform: translateX(-50%); transition: opacity 250ms var(--ease); }
        .faq-plus--auf { transform: rotate(90deg); }
        .faq-plus--auf::after { opacity: 0; }
        /* Antwort faehrt weich auf (grid-rows-Trick, keine feste Hoehe noetig). */
        .faq-antwort { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 360ms var(--ease); }
        .faq-antwort[data-auf='1'] { grid-template-rows: 1fr; }
        .faq-antwort-inner { overflow: hidden; }
        .faq-antwort-inner p {
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: 0.9375rem; line-height: 1.6; color: var(--grau-dunkel);
          max-width: 60ch; margin-inline: auto; text-align: center;
          padding: 0 0 1.1rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-antwort, .faq-plus { transition: none; }
        }
      ` }} />
    </section>
  );
}
