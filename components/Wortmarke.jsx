/* Die Wortmarke, zweizeilig: AMORIVA gross, FILMS klein und weit
   gesperrt darunter. Nevio hat am 26.09.2026 aus drei Entwuerfen diesen
   gewaehlt.

   Sie ist jetzt echter Text in der Bodoni Moda und kein Bild mehr.
   Vorher lagen zwei PNG uebereinander, eine helle und eine gruene, und
   eine davon wurde je nach Untergrund eingeblendet. Das hatte drei
   Nachteile: die Datei trug noch die alte Schrift und passte nicht mehr
   zu den Ueberschriften, zwei Bilder wurden geladen um eines zu zeigen,
   und auf scharfen Bildschirmen war sie weicher als der Text daneben.

   Als Text erbt sie die Farbe vom Elternteil - der Wechsel hell/gruen
   ist damit eine einzige Farbangabe statt zweier Bilder.

   Achtung bei der Laufweite: ein gesperrtes Wort bekommt den Abstand
   auch HINTER dem letzten Buchstaben. Ohne den Ausgleich unten stuende
   die Zeile sichtbar links von der Mitte. */

const SPERRE_GROSS = 0.16;
const SPERRE_KLEIN = 0.46;

export default function Wortmarke({ hoehe = 34, farbe = 'currentColor' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: hoehe * 0.09,
        color: farbe,
        fontFamily: 'var(--font-display), Georgia, serif',
        /* Nevio am 26.09.2026: "mach es ein bisschen dicker, man kann es
           schlecht lesen". Zwei Ursachen, beide nachgemessen:

           1. Gewicht 400 plus automatische optische Groesse. Die Bodoni
              duennt ihre Haarstriche aus, je groesser die optische
              Groesse gewaehlt wird - und automatisch waehlt der Browser
              danach. Bei 18 px Versalien bleibt vom Querstrich des A
              fast nichts uebrig. Jetzt Gewicht 600 und opsz fest auf 11,
              das ist der Lesetext-Schnitt mit den kraeftigsten Strichen.
           2. FILMS stand auf 82 Prozent Deckung. Gemessen auf dem hellen
              Papier: 3,02 zu 1 bei 6,8 px. Die Deckung ist raus, damit
              liegen beide Zeilen bei 4,62 zu 1. Der Groessenunterschied
              trennt die Zeilen ohnehin deutlich genug. */
        fontWeight: 600,
        fontVariationSettings: "'opsz' 11",
        lineHeight: 1,
        /* Versalien, wie im Musterblatt gezeigt. Der weite Abstand
           zwischen den Buchstaben ist das eigentliche Erkennungszeichen
           der Marke, und der wirkt nur in Grossbuchstaben. */
        textTransform: 'uppercase',
        userSelect: 'none',
      }}
    >
      <span style={{
        fontSize: hoehe * 0.52,
        letterSpacing: `${SPERRE_GROSS}em`,
        textIndent: `${SPERRE_GROSS}em`,
        /* Bodoni-Versalien brauchen unten etwas Luft, sonst sitzt FILMS
           auf den Serifen von AMORIVA. */
        paddingBottom: hoehe * 0.02,
      }}>
        Amoriva
      </span>
      <span style={{
        fontSize: hoehe * 0.23,
        letterSpacing: `${SPERRE_KLEIN}em`,
        textIndent: `${SPERRE_KLEIN}em`,
      }}>
        Films
      </span>
    </span>
  );
}
