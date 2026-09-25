import './globals.css';
import { Bodoni_Moda, Jost } from 'next/font/google';
import Nav from '@/components/Nav';
import StructuredData from '@/components/StructuredData';

/* Bodoni Moda fuer die Ueberschriften. Giambattista Bodoni hat sie
   ab 1790 in Parma geschnitten - es gibt keine italienischere Schrift,
   und sie liegt frei bei Google Fonts, wir hosten sie also selbst wie
   vorher die Fraunces. Variabel ueber die optische Groesse: dieselbe
   Datei traegt die grosse Zeile im Hero und die kleine Ueberschrift
   im Ratgeber, ohne dass die Haarstriche kippen. Kursiv brauchen wir
   fuer den hervorgehobenen Halbsatz in den Ueberschriften.           */
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});

/* Jost fuer alles, was gelesen wird. Der freie Nachbau der Futura -
   Bodoni ueber einer geometrischen Grotesk ist seit Jahrzehnten der
   Satz der italienischen Modepresse. Variabel, deshalb reicht eine
   Angabe fuer den ganzen Gewichtsbereich.                            */
const jost = Jost({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-text',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://amoriva-films.de'),
  /* public/manifest.json lag da, war aber nirgends eingebunden und tat
     deshalb nichts. Eingehaengt gibt es der Seite auf Android-Handys
     einen richtigen Namen und die Markenfarbe in der Browserleiste. */
  manifest: '/manifest.json',
  title: {
    default: 'Hochzeitsfilm & Fotografie Niedersachsen | Amoriva Films',
    template: '%s | Amoriva Films',
  },
  description: 'Hochzeitsfilm in Cinégraphie und Hochzeitsfotografie in Niedersachsen. Wolfsburg, Braunschweig, Hannover. Persönlich, ehrlich, zeitlos. Jetzt anfragen.',
  keywords: [
    'Hochzeitsfilm Niedersachsen','Hochzeitsfilm Wolfsburg','Hochzeitsfilm Braunschweig',
    'Hochzeitsfilm Hannover','Hochzeitsvideo Niedersachsen','Hochzeitsfilmer Wolfsburg',
    'Hochzeitsfilmer Niedersachsen','Hochzeitsfotograf Wolfsburg','Hochzeitsfotograf Niedersachsen',
    'Hochzeitsfotograf Braunschweig','cinematischer Hochzeitsfilm','Fine Art Hochzeitsfotografie',
    'Hochzeitsfilm emotional','Wedding Videographer Germany','Amoriva Films',
  ],
  authors: [{ name: 'Amoriva Films' }],
  creator: 'Amoriva Films',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://amoriva-films.de',
    siteName: 'Amoriva Films',
    title: 'Amoriva Films – Hochzeitsfilm und Fotografie Niedersachsen',
    description: 'Hochzeitsfilm in Cinégraphie und Hochzeitsfotografie. Persönlich, ehrlich, zeitlos. Für Paare die mehr wollen als schöne Bilder.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Amoriva Films – Hochzeitsfilm Niedersachsen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amoriva Films – Hochzeitsfilm und Fotografie',
    description: 'Hochzeitsfilm in Cinégraphie und Hochzeitsfotografie in Niedersachsen.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://amoriva-films.de' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${bodoni.variable} ${jost.variable}`}>
      <head>
        {/* Das Hero-Video ist das Erste, was ein Besucher sieht, aber
            Browser geben Video von sich aus eine niedrige Prioritaet:
            gemessen startete die Anfrage erst nach 543 ms, hinter CSS,
            Schriften und Javascript. Dieser Hinweis stellt sie nach
            vorne, damit das Laden mit der Seite beginnt statt danach. */}
        <link rel="preload" as="video" type="video/mp4" href="/videos/hero.mp4" />
        <StructuredData />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#FBFBFA' }}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
