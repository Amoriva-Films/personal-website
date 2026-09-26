const BASIS = 'https://amoriva-films.de';

/** Referenz-Detailseiten. Neue Hochzeit ergänzt? Hier die Kennung nachtragen. */
/** Ratgeber-Artikel (jeweils ein eigener Ordner unter app/ratgeber). */
const RATGEBER = [
  'was-kostet-ein-hochzeitsfilm',
  'cinematic-hochzeitsfilm',
  'hochzeitsfilmer-wann-buchen',
  'same-day-edit-hochzeit',
];

/* Stand der letzten inhaltlichen Aenderung. Bewusst ein fester Wert:
   vorher stand hier new Date(), damit meldete die Seite Google jeden Tag
   aufs Neue, jede Unterseite habe sich geaendert. Wer staendig "alles neu"
   meldet, wird irgendwann nicht mehr geglaubt. Beim naechsten echten
   Umbau hier das Datum nachziehen. */
const STAND = '2026-09-21';

export default function sitemap() {
  const jetzt = new Date(STAND);
  const eintrag = (pfad, prioritaet, takt = 'monthly') => ({
    url: pfad ? `${BASIS}/${pfad}` : BASIS,
    lastModified: jetzt,
    changeFrequency: takt,
    priority: prioritaet,
  });

  return [
    eintrag('', 1),
    // Filme sind das Wichtigste, was die Seite zeigt - deshalb meldet
    // sie sich erst bei Google an, wenn dort auch Filme liegen.
    // eintrag('filme', 0.95),
    eintrag('angebote', 0.9),
    eintrag('leistungen', 0.8),
    /* Referenzen war auskommentiert mit der Begruendung "Seite nicht
       mehr verlinkt". Das stimmt seit laengerem nicht: die Startseite
       verlinkt sie unter "Zur Galerie", und dort liegen 55 Bilder.
       Google kannte damit ausgerechnet die Seite nicht, die unsere
       Arbeit zeigt - nach der Startseite die wichtigste. */
    eintrag('referenzen', 0.9),
    eintrag('anfrage', 0.8, 'yearly'),
    eintrag('ratgeber', 0.7),
    ...RATGEBER.map((a) => eintrag(`ratgeber/${a}`, 0.6)),
    eintrag('impressum', 0.2, 'yearly'),
    eintrag('datenschutz', 0.2, 'yearly'),
  ];
}
