const BASIS = 'https://amoriva-films.de';

/** Referenz-Detailseiten. Neue Hochzeit ergänzt? Hier die Kennung nachtragen. */
/** Ratgeber-Artikel (jeweils ein eigener Ordner unter app/ratgeber). */
const RATGEBER = [
  'was-kostet-ein-hochzeitsfilm',
  'cinematic-hochzeitsfilm',
  'hochzeitsfilmer-wann-buchen',
  'same-day-edit-hochzeit',
];

export default function sitemap() {
  const jetzt = new Date();
  const eintrag = (pfad, prioritaet, takt = 'monthly') => ({
    url: pfad ? `${BASIS}/${pfad}` : BASIS,
    lastModified: jetzt,
    changeFrequency: takt,
    priority: prioritaet,
  });

  return [
    eintrag('', 1),
    eintrag('angebote', 0.9),
    eintrag('leistungen', 0.8),
    eintrag('referenzen', 0.8),
    eintrag('anfrage', 0.8, 'yearly'),
    eintrag('ratgeber', 0.7),
    ...RATGEBER.map((a) => eintrag(`ratgeber/${a}`, 0.6)),
    eintrag('impressum', 0.2, 'yearly'),
    eintrag('datenschutz', 0.2, 'yearly'),
  ];
}
