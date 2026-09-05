/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/inquire',
        destination: '/anfrage',
        permanent: true,
      },
      {
        // Die sechs Paar-Galerien unter /referenzen/... zeigten Paare, die es so
        // nicht gab, mit Bildern aus einer Bilddatenbank. Sie sind entfernt.
        // Alte Links und Google-Treffer landen auf der Uebersicht statt im Nichts.
        source: '/referenzen/:id',
        destination: '/referenzen',
        permanent: true,
      },
      {
        // Die Preisseite ist in /angebote aufgegangen (eine Seite statt zwei mit
        // demselben Thema). Dauerhafte Umleitung, damit alte Links und die
        // Google-Bewertung der Seite erhalten bleiben.
        source: '/preise',
        destination: '/angebote',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
