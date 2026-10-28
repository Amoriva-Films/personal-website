/* Die Angaben hier muessen zeichengenau zum Impressum passen. Google
   gleicht Name, Adresse und Telefon ueber Quellen hinweg ab; weichen sie
   ab, zaehlt keine davon richtig. Bis 21.09.2026 stand hier "Wolfsburg,
   38440", im Impressum aber "Grafhorster Str. 16b, 38458 Velpke". */

const ADRESSE = {
  '@type': 'PostalAddress',
  streetAddress: 'Grafhorster Str. 16b',
  addressLocality: 'Velpke',
  addressRegion: 'Niedersachsen',
  postalCode: '38458',
  addressCountry: 'DE',
};

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': 'https://amoriva-films.de/#business',
        name: 'Amoriva Films',
        alternateName: 'Amoriva Films Hochzeitsfilm',
        description:
          'Hochzeitsfilm in Cinégraphie und Hochzeitsfotografie aus Wolfsburg, für Braunschweig, Hannover, ganz Niedersachsen und Europa.',
        url: 'https://amoriva-films.de',
        telephone: '+4915565559747',
        email: 'booking@amoriva-films.de',
        address: ADRESSE,
        geo: { '@type': 'GeoCoordinates', latitude: 52.4083, longitude: 10.9333 },
        // Ein echtes Foto statt der Wortmarke (das Logo steht unter logo)
        image: ['https://amoriva-films.de/images/og-image.jpg', 'https://amoriva-films.de/images/kuss-seifenblasen.jpg'],
        priceRange: 'ab 250 €',
        logo: {
          '@type': 'ImageObject',
          url: 'https://amoriva-films.de/brand/wortmarke-gruen-v2.png',
        },
        /* Umkreis statt blosser Ortsliste: sagt Google, wie weit wir
           fahren, statt nur welche Staedte wir aufzaehlen. */
        areaServed: [
          { '@type': 'City', name: 'Wolfsburg' },
          { '@type': 'City', name: 'Braunschweig' },
          { '@type': 'City', name: 'Hannover' },
          { '@type': 'City', name: 'Magdeburg' },
          { '@type': 'State', name: 'Niedersachsen' },
          { '@type': 'Country', name: 'Deutschland' },
          { '@type': 'Country', name: 'Österreich' },
          { '@type': 'Country', name: 'Schweiz' },
          { '@type': 'Country', name: 'Italien' },
          // Europaweit buchbar (Nevio 28.10.2026)
          { '@type': 'Continent', name: 'Europa' },
        ],
        serviceType: ['Hochzeitsfilm', 'Hochzeitsfotografie', 'Hochzeitsfotograf', 'Videografie'],
        /* Startpreise wie auf /leistungen (28.10.2026). Highlight-Clip raus,
           der steht nicht mehr im Angebot der Fragen-Seite. */
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Leistungen',
          url: 'https://amoriva-films.de/leistungen',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hochzeitsfilm', description: 'Hauptfilm in Cinégraphie, 3 bis 12 Minuten, Begleitung vom Morgen bis zum Abend, Lieferung in 6 bis 8 Wochen.' }, priceSpecification: { '@type': 'PriceSpecification', minPrice: 1000, priceCurrency: 'EUR' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hochzeitsfotografie, ganzer Tag', description: 'Fine-Art-Fotografie vom Getting Ready bis zum ersten Tanz, private Online-Galerie, Lieferung in 3 bis 6 Wochen.' }, priceSpecification: { '@type': 'PriceSpecification', minPrice: 850, priceCurrency: 'EUR' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotos im Standesamt', description: 'Fotos der standesamtlichen Trauung.' }, priceSpecification: { '@type': 'PriceSpecification', minPrice: 250, priceCurrency: 'EUR' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film und Foto aus einer Hand', description: 'Hochzeitsfilm und Hochzeitsfotografie aus einem Team, ein Look, ein Ansprechpartner. Preis auf Anfrage.' } },
          ],
        },
        founder: [
          { '@type': 'Person', name: 'Nevio Mastrogiorgio', jobTitle: 'Founder, Beratung und kreative Leitung' },
          { '@type': 'Person', name: 'Danilo Buonafede', jobTitle: 'Co Founder, Cinégraphie und Bildgestaltung' },
        ],
        // Kati gehoert seit 2026 zum Team (Fotografie), fehlte hier bisher
        employee: [
          { '@type': 'Person', name: 'Katharina Hieb', jobTitle: 'Hochzeitsfotografie' },
        ],
        knowsLanguage: ['de', 'en'],
        /* Die Adresse hier stand als "amoriva.films" mit Punkt drin -
           das Konto heisst aber "amorivafilms" ohne. Google konnte die
           Website damit nicht mit dem Instagram-Profil verknuepfen; beides
           galt als zwei fremde Dinge. Im Impressum, in der Fusszeile und
           in den Mails stand immer schon die richtige Adresse.          */
        sameAs: ['https://www.instagram.com/amorivafilms'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://amoriva-films.de/#website',
        url: 'https://amoriva-films.de',
        name: 'Amoriva Films',
        inLanguage: 'de-DE',
        publisher: { '@id': 'https://amoriva-films.de/#business' },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
