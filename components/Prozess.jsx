'use client';

import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const ease = [0.22, 1, 0.36, 1];

/* Fuenf Schritte als Timeline: eine feine Linie verbindet sie und zieht
   beim Reinscrollen von links nach rechts auf. Die Schritte erscheinen
   nacheinander, beim Hover hebt sich der Schritt und die Ziffer wird
   gruen. Das macht aus der Aufzaehlung einen sichtbaren Ablauf. */

const schritte = [
  { nummer: '01', titel: 'Anfrage',        text: 'Kurz per Formular oder WhatsApp. Keine Verpflichtung.' },
  { nummer: '02', titel: 'Kennenlernen',   text: '20 Minuten per Video oder Telefon. Kein Verkaufsgespräch.' },
  { nummer: '03', titel: 'Eure Vision',    text: 'Was euer Film erzählen soll. Kein Wort über Technik.' },
  { nummer: '04', titel: 'Euer Tag',       text: 'Wir sind den ganzen Tag da. Ohne zu stören, ohne Anweisungen.' },
  { nummer: '05', titel: 'Film und Fotos', text: 'In sechs bis acht Wochen in eurer privaten Galerie.' },
];

export default function Prozess() {
  return (
    <section className="abschnitt hell prozess-band">
      <div className="bahn">
        <FadeIn>
          <div className="paar" style={{ marginBottom: 'var(--luft-4)' }}>
            <div>
              <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>So funktioniert es</p>
              <h2 className="t-gross">
                Von der ersten Nachricht bis zu <span className="kursiv">eurem Film.</span>
              </h2>
            </div>
          </div>
        </FadeIn>

        <div className="prozess-raster-wrap">
          <motion.span
            className="prozess-linie"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.3, ease }}
          />
          <div className="schritt-raster">
            {schritte.map((s, i) => (
              <FadeIn key={s.nummer} index={i}>
                <div className="schritt schritt-heb">
                  <span className="schritt-ziffer" aria-hidden="true">{s.nummer}</span>
                  <h3 className="t-klein">{s.titel}</h3>
                  <p className="t-fein">{s.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .prozess-raster-wrap { position: relative; }
        .prozess-linie {
          position: absolute; top: 2px; left: 0; right: 0; height: 2px; z-index: 0;
          background: linear-gradient(90deg, var(--gruen) 0%, rgba(110,125,84,0.25) 100%);
          transform-origin: left; border-radius: 2px;
        }
        .prozess-band .schritt { position: relative; z-index: 1; transition: transform 320ms var(--ease); }
        .prozess-band .schritt-ziffer { transition: color 320ms var(--ease); }
        @media (hover: hover) {
          .prozess-band .schritt-heb:hover { transform: translateY(-5px); }
          .prozess-band .schritt-heb:hover .schritt-ziffer { color: var(--gruen); }
        }
        @media (prefers-reduced-motion: reduce) {
          .prozess-linie { transform: none !important; }
          .prozess-band .schritt { transition: none; }
        }
      ` }} />
    </section>
  );
}
