export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://amoriva-films.de/#business',
        name: 'Amoriva Films',
        description: 'Cinematic Hochzeitsfilm und Hochzeitsfotografie in Niedersachsen und deutschlandweit',
        url: 'https://amoriva-films.de',
        telephone: '+4915565559747',
        email: 'hallo@amoriva-films.de',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Wolfsburg',
          addressRegion: 'Niedersachsen',
          postalCode: '38440',
          addressCountry: 'DE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 52.4227, longitude: 10.7865 },
        areaServed: ['Wolfsburg','Braunschweig','Hannover','Niedersachsen','Deutschland'],
        priceRange: 'ab 1.400 Euro',
        serviceType: ['Hochzeitsfilm','Hochzeitsfotografie','Videografie'],
        knowsLanguage: 'de',
        sameAs: ['https://www.instagram.com/amoriva.films'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://amoriva-films.de/#website',
        url: 'https://amoriva-films.de',
        name: 'Amoriva Films',
        inLanguage: 'de-DE',
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
