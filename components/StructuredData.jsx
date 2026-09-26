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
          'Hochzeitsfilm in Cinégraphie und Hochzeitsfotografie aus Niedersachsen. Wolfsburg, Braunschweig, Hannover und deutschlandweit.',
        url: 'https://amoriva-films.de',
        telephone: '+4915565559747',
        email: 'booking@amoriva-films.de',
        address: ADRESSE,
        geo: { '@type': 'GeoCoordinates', latitude: 52.4083, longitude: 10.9333 },
        image: 'https://amoriva-films.de/brand/wortmarke-gruen-v2.png',
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
        ],
        serviceType: ['Hochzeitsfilm', 'Hochzeitsfotografie', 'Videografie'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Leistungen',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hochzeitsfilm', description: 'Hauptfilm in Cinégraphie und Highlights-Clip, Begleitung vom Morgen bis zum Abend.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hochzeitsfotografie', description: 'Fine-Art-Fotografie vom Getting Ready bis zum Tanz, private Online-Galerie.' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film und Foto', description: 'Film und Fotografie aus einer Hand, ein Team, eine Bildsprache.' } },
          ],
        },
        founder: [
          { '@type': 'Person', name: 'Nevio Mastrogiorgio', jobTitle: 'Founder, Beratung und kreative Leitung' },
          { '@type': 'Person', name: 'Danilo Buonafede', jobTitle: 'Co Founder, Cinégraphie und Bildgestaltung' },
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
