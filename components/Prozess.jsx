'use client';

import FadeIn from './FadeIn';

/* Fuenf Schritte in drei Spalten hiessen: drei oben, zwei unten, rechts
   ein Loch. Genau das, was Nevio als unsymmetrisch aufgefallen ist.

   Jetzt fuenf Spalten mit einer feinen Linie darueber, die sie
   verbindet. Ein Ablauf ist eine Folge - die soll man als Linie sehen,
   nicht als Kachelhaufen. Und bewusst OHNE Kacheln: die stehen schon
   bei den Leistungen, zwei Kachelabschnitte hintereinander sehen aus
   wie dieselbe Sache zweimal.

   Dafuer musste jeder Text auf einen Satz. In fuenf schmalen Spalten
   liest ohnehin niemand vier Zeilen. */

const schritte = [
  { nummer: '01', titel: 'Anfrage',        text: 'Kurz per Formular oder WhatsApp. Keine Verpflichtung.' },
  { nummer: '02', titel: 'Kennenlernen',   text: '20 Minuten per Video oder Telefon. Kein Verkaufsgespräch.' },
  { nummer: '03', titel: 'Eure Vision',    text: 'Was euer Film erzählen soll. Kein Wort über Technik.' },
  { nummer: '04', titel: 'Euer Tag',       text: 'Wir sind den ganzen Tag da. Ohne zu stören, ohne Anweisungen.' },
  { nummer: '05', titel: 'Film und Fotos', text: 'In sechs bis acht Wochen in eurer privaten Galerie.' },
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
          </div>
        </FadeIn>

        {/* Die Schritte standen als lange Liste untereinander und zogen
            den Abschnitt in die Laenge. Jetzt Kacheln nebeneinander mit
            grosser, heller Ziffer - das Muster der Schritt-Kacheln von
            amoriva.app.                                               */}
        <div className="schritt-raster">
          {schritte.map((s, i) => (
            <FadeIn key={s.nummer} index={i}>
              <div className="schritt">
                <span className="schritt-ziffer" aria-hidden="true">{s.nummer}</span>
                <h3 className="t-klein">{s.titel}</h3>
                <p className="t-fein">{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
