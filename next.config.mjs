/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  /* Sicherheits-Kopfzeilen. Live gemessen war nur HSTS gesetzt; die
     vier hier sind der Grundschutz, den jede oeffentliche Seite haben
     sollte, und keiner davon aendert etwas am Aussehen.

     Bewusst OHNE Content-Security-Policy: die Seite bindet Vimeo als
     iframe ein und laedt Schriften ueber next/font. Eine CSP, die das
     falsch abdeckt, macht Filme oder Schrift kaputt, ohne dass man es
     sofort sieht. Das gehoert eigenstaendig gemessen, nicht nebenbei. */
  async headers() {
    return [
      {
        source: '/:pfad*',
        headers: [
          // Verhindert, dass ein Browser eine Datei als etwas anderes
          // interpretiert als angegeben (etwa ein Bild als Skript).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Niemand darf die Seite in einen Rahmen auf einer fremden
          // Seite stecken und Klicks abfangen.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Beim Klick nach aussen wird nur die Domain mitgegeben,
          // nicht die genaue Seite, auf der jemand war.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Kamera, Mikrofon und Standort braucht diese Seite nicht.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        /* Bilder und das Hero-Video kamen live mit max-age=0 und wurden
           bei jedem Besuch neu geladen. Diese Dateien aendern sich nie,
           ohne dass sich ihr Name aendert - ein Jahr Cache ist richtig.
           Fuer wiederkehrende Besucher spart das die komplette Last. */
        source: '/:datei*.(jpg|jpeg|png|webp|avif|mp4|svg)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        /* Das Favicon war hier mit drin und gehoert nicht dazu. Alle
           anderen Bilder bekommen bei einer Aenderung einen neuen Namen
           oder von Next einen Hash angehaengt - /favicon.ico nicht, die
           Adresse steht fest. Ein Jahr immutable heisst dann: wer die
           Seite schon einmal besucht hat, sieht das alte Icon noch
           monatelang, egal was wir ausliefern. Aufgefallen beim Wechsel
           auf das Bodoni-A am 26.09.2026.

           Einen Tag Cache mit Rueckfrage danach: schnell genug, damit
           es nicht bei jedem Aufruf neu geladen wird, und aktuell genug,
           dass eine Aenderung wirklich ankommt. */
        source: '/:datei*.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' }],
      },
    ];
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
