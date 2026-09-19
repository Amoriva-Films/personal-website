// ════════════════════════════════════════════════════════════════════
// Unsere Filme
// ════════════════════════════════════════════════════════════════════
//
// Hier trägst du die Filme ein, Nevio. Du musst sonst nichts anfassen.
// Solange die Liste leer ist, zeigt die Seite einen ruhigen Hinweis
// statt einer kaputten Seite.
//
// So fügst du einen Film hinzu:
//
//   1. Film bei Vimeo hochladen (Vimeo ist ruhiger als YouTube: keine
//      fremden Videovorschläge am Ende, kein Logo über dem Bild).
//   2. Die Nummer aus der Adresse kopieren.
//      Beispiel: vimeo.com/912345678  →  vimeoId: '912345678'
//   3. Ein Vorschaubild in public/images/ legen und hier eintragen.
//      Quer, mindestens 1600 Pixel breit.
//   4. Den Block unten kopieren, ausfüllen, Komma nicht vergessen.
//
// Der erste Film in der Liste steht auch auf der Startseite.
//
// Beispiel, wie ein fertiger Eintrag aussieht:
//
//   {
//     id: 'laura-jakob',
//     paar: 'Laura & Jakob',
//     ort: 'Schloss Wolfsburg',
//     laenge: '6:12',
//     vimeoId: '912345678',
//     bild: '/images/Bild-33.webp',
//     alt: 'Laura und Jakob bei ihrer Trauung auf Schloss Wolfsburg',
//   },
//
// ════════════════════════════════════════════════════════════════════

export const filme = [
  // Hier kommen die Filme rein.
];

// Wird auf der Startseite gezeigt: der erste Film aus der Liste.
export const startseitenFilm = filme[0] || null;
