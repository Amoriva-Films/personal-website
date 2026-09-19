'use client';

import FadeIn from './FadeIn';

const schritte = [
  { nummer: '01', titel: 'Anfrage stellen', text: 'Ihr schreibt uns kurz per Formular oder WhatsApp. Kein Aufwand, keine Verpflichtung.' },
  { nummer: '02', titel: 'Kennenlerngespräch', text: 'Wir sprechen 20 Minuten per Video oder Telefon. Kein Verkaufsgespräch. Wir wollen euch kennen.' },
  { nummer: '03', titel: 'Eure Film und Fotovision', text: 'Was soll euer Film erzählen? Welche Fotos sollen bei euch an der Wand hängen? Wir reden nicht über Technik, sondern darüber was euch wirklich wichtig ist.' },
  { nummer: '04', titel: 'Euer Hochzeitstag', text: 'Euer Hochzeitstag. Wir sind den ganzen Tag mit dabei. Ohne euch zu stören, ohne Anweisungen. Einfach da.' },
  { nummer: '05', titel: 'Euer Film und Fotos', text: 'Innerhalb von 6 bis 8 Wochen erhaltet ihr euren fertigen Film und alle Fotos in einer privaten Galerie.' },
];

export default function Prozess() {
  return (
    <section className="abschnitt hell-2">
      <div className="mitte-schmal">
        <FadeIn>
          <p className="t-label" style={{ marginBottom: '1.5rem' }}>So funktioniert es</p>
          <h2 className="t-gross" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Von der ersten Nachricht bis zu eurem Film.
          </h2>
        </FadeIn>

        {/* Untereinander statt in fuenf engen Spalten. Die Ziffer steht
            links, der Text rechts, dazwischen Luft. */}
        <div>
          {schritte.map((s) => (
            <FadeIn key={s.nummer}>
              <div className="schritt">
                <span className="schritt-ziffer" aria-hidden="true">{s.nummer}</span>
                <div>
                  <h3 className="t-klein" style={{ marginBottom: '0.6rem' }}>{s.titel}</h3>
                  <p className="t-text t-grau">{s.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
