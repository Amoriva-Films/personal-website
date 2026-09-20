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
    <section className="abschnitt hell">
      <div className="bahn">
        {/* Kopf als Paar: links die Ueberschrift, rechts der Satz, der
            die Sorge nimmt. Genau dieses Paar traegt auf amoriva.app
            die halbe Startseite.                                      */}
        <FadeIn>
          <div className="paar" style={{ marginBottom: 'var(--luft-5)' }}>
            <div>
              <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>So funktioniert es</p>
              <h2 className="t-gross">
                Von der ersten Nachricht bis zu <span className="kursiv">eurem Film.</span>
              </h2>
            </div>
            <p className="t-text t-grau" style={{ paddingTop: '0.4rem' }}>
              Kein Verkaufsgespräch, keine Vertragsfalle, keine Technikvorträge.
              Fünf Schritte, die ihr von Anfang an überblickt.
            </p>
          </div>
        </FadeIn>

        {/* Die Schritte standen als lange Liste untereinander und zogen
            den Abschnitt in die Laenge. Jetzt Kacheln nebeneinander mit
            grosser, heller Ziffer - das Muster der Schritt-Kacheln von
            amoriva.app.                                               */}
        <div className="schritt-raster">
          {schritte.map((s) => (
            <FadeIn key={s.nummer}>
              <div className="kachel kachel-heb" style={{ height: '100%' }}>
                <span className="schritt-ziffer" aria-hidden="true">{s.nummer}</span>
                <h3 className="t-klein" style={{ marginTop: 'var(--luft-3)', marginBottom: 'var(--luft-1)' }}>{s.titel}</h3>
                <p className="t-fein">{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
