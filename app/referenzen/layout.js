export const metadata = {
  // Das Wurzel-Layout haengt automatisch " | Amoriva Films" an, deshalb hier ohne.
  title: 'Unsere Arbeiten: Film & Fotografie',
  description:
    'Ein Ausschnitt aus der Arbeit von Amoriva Films: Hochzeitsfilm und Hochzeitsfotografie in Niedersachsen. Cinégraphie, emotional, zeitlos.',
  alternates: {
    canonical: 'https://amoriva-films.de/referenzen',
  },
  /* Auf Nevios Wort am 26.09.2026 aus dem Index genommen.

     Hintergrund: die Galerie ist seit dem 21.09.2026 bewusst ausgehaengt
     ("Galerie rausnehmen komplett"). Die Seite antwortet zwar weiter mit
     200, wird aber von keiner Stelle der Website mehr verlinkt und steht
     auch nicht in der sitemap.xml. Eine Waisenseite also - und falls sie
     von frueher noch im Google-Index steht, zeigt sie Besuchern etwas,
     das Nevio absichtlich von der Seite genommen hat.

     follow bleibt an: die Links auf der Seite duerfen weiter verfolgt
     werden, nur die Seite selbst soll nicht mehr im Suchergebnis
     auftauchen.

     Wieder in den Index nehmen: diesen robots-Block loeschen, dann die
     Anleitung im Kommentar in components/ContentSections.jsx abarbeiten
     (Block entkommentieren, Importe aktivieren, Links in Nav und Footer,
     Hero-Knopf, Eintrag in app/sitemap.js). */
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ReferenzenLayout({ children }) {
  return children;
}
