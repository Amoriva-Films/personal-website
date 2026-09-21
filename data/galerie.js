// ════════════════════════════════════════════════════════════════════
// Bildergalerie
// ════════════════════════════════════════════════════════════════════
//
// Hier trägst du die Fotos ein, Nevio. Die Galerie ist auf 20 bis 30
// Bilder ausgelegt.
//
// So fügst du ein Bild hinzu:
//
//   1. Bild nach public/images/ legen. Am besten als .webp, quer oder
//      hoch ist beides in Ordnung.
//   2. Unten einen Block ergänzen: Dateiname und eine kurze
//      Beschreibung.
//
// Die Beschreibung (alt) ist wichtig: Sie wird blinden Besuchern
// vorgelesen und Google liest sie mit. Schreib, was auf dem Bild
// passiert, nicht "Hochzeitsfoto".
//
//   Gut:     'Braut lacht, während ihre Mutter den Schleier richtet'
//   Schwach: 'Hochzeit Foto 12'
//
// hoch: true  setzt du bei Hochformat-Bildern. Die bekommen dann im
// Raster mehr Höhe. Lässt du es weg, gilt Querformat.
//
// ════════════════════════════════════════════════════════════════════

export const galerie = [
  {
    src: '/images/Bild-33.webp',
    alt: 'Brautpaar stößt mit Champagner an, Fine-Art-Aufnahme',
    hoch: true,
  },
  {
    src: '/images/Bild-101.webp',
    alt: 'Brautpaar in einem ruhigen Moment während der Feier',
  },
  {
    src: '/images/Bild-67.webp',
    alt: 'Gedeckter Hochzeitstisch mit Menükarte und Kerzen',
  },
  {
    src: '/images/Bild-76.webp',
    alt: 'Braut unter dem Schleier, Porträt',
    hoch: true,
  },
  {
    src: '/images/Bild-5.webp',
    alt: 'Save-the-Date-Karten und Ringschatulle auf hellem Stoff',
  },
];
