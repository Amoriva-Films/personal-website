import { Fuss } from '@/components/buchen/basis/bausteine';
import { schriftKlassen } from '@/components/buchen/basis/schriften';
import '@/components/buchen/basis/buchen.css';

/* Buchungsstrecke von Amoriva Films (seit 27.11.2026 statt des alten
   Anfrageformulars): Datum pruefen, Anfrage in drei Schritten, danach die
   Seiten des Paares unter /anfrage/p, /anfrage/kennenlernen und
   /anfrage/warteliste. Die Komponenten liegen in components/buchen, Daten
   und Logik bleiben in Selfmade. Jeder Aufruf geht ueber
   app/api/buchen/[...pfad]/route.js dorthin.

   Kopf (Wortmarke, Navigation) kommt wie auf jeder Seite aus dem
   Wurzel-Layout. Alles Aussehen der Strecke haengt unter .af
   (components/buchen/basis/buchen.css), damit nichts auf die uebrige
   Seite durchschlaegt.

   data-lenis-prevent: in der Strecke scrollt der Browser selbst, ohne das
   weiche Scrollen der uebrigen Seite. Formulare, Auswahllisten, Textfelder
   und das Unterschriftsfeld verhalten sich so wie gewohnt, und die
   Spruenge nach oben beim Schrittwechsel sitzen sofort.

   Unten der schlichte Fuss der Strecke mit Impressum und Datenschutz:
   die Strecke hat keinen Seitenfuss der Website, beides muss aber von
   jeder Seite aus erreichbar sein. */
/* SEO (Danilo 28.11.2026): Titel und Beschreibung mit den Suchbegriffen der Paare (Hochzeitsfilm,
   Hochzeitsfotograf, Wolfsburg, Verfügbarkeit), eigenes Vorschaubild (das Gemälde der Seite) und strukturierte
   Daten: ContactPage, die auf das Unternehmen der Startseite verweist, plus Brotkrumen. */
const BESCHREIBUNG =
  'Hochzeitsfilm und Fotografie anfragen bei Amoriva Films. Wolfsburg, Braunschweig, Hannover und deutschlandweit. Antwort innerhalb von 24 Stunden.';

export const metadata = {
  title: 'Hochzeitsfilm anfragen in Wolfsburg',
  description: BESCHREIBUNG,
  alternates: {
    canonical: 'https://amoriva-films.de/anfrage',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://amoriva-films.de/anfrage',
    siteName: 'Amoriva Films',
    title: 'Hochzeitsfilm anfragen in Wolfsburg | Amoriva Films',
    description: BESCHREIBUNG,
    images: [{ url: '/images/anfrage/og-anfrage.jpg', width: 1200, height: 630, alt: 'Gemaltes Brautpaar, das Hand in Hand über eine Wiese am Abend läuft' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hochzeitsfilm anfragen in Wolfsburg | Amoriva Films',
    description: BESCHREIBUNG,
    images: ['/images/anfrage/og-anfrage.jpg'],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://amoriva-films.de/anfrage#seite',
      url: 'https://amoriva-films.de/anfrage',
      name: 'Hochzeitsfilm anfragen in Wolfsburg',
      description: BESCHREIBUNG,
      inLanguage: 'de-DE',
      about: { '@id': 'https://amoriva-films.de/#business' },
      primaryImageOfPage: 'https://amoriva-films.de/images/anfrage/og-anfrage.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://amoriva-films.de/' },
        { '@type': 'ListItem', position: 2, name: 'Anfrage', item: 'https://amoriva-films.de/anfrage' },
      ],
    },
  ],
};

export const viewport = {
  themeColor: '#3D3727',
  viewportFit: 'cover',
};

export default function AnfrageLayout({ children }) {
  return (
    <div className={`af ${schriftKlassen}`} data-lenis-prevent="">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      {children}
      <Fuss>
        <a href="/impressum">Impressum</a>
        {' · '}
        <a href="/datenschutz">Datenschutz</a>
      </Fuss>
    </div>
  );
}
