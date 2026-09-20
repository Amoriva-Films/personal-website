import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import StructuredData from '@/components/StructuredData';

/* Fraunces, dieselbe Schrift wie auf amoriva.app. Beide Marken sind
   eine Familie, und eine Hochzeitsfirma erkennt man an der Schrift
   frueher als am Logo. Variabel, deshalb reicht eine Angabe fuer den
   ganzen Bereich von 400 bis 600. Kursiv brauchen wir fuer den Akzent
   in den Ueberschriften. */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://amoriva-films.de'),
  title: {
    default: 'Amoriva Films – Hochzeitsfilm und Hochzeitsfotografie Niedersachsen',
    template: '%s | Amoriva Films',
  },
  description: 'Cinematic Hochzeitsfilm und Hochzeitsfotografie in Niedersachsen. Wolfsburg, Braunschweig, Hannover. Persönlich, ehrlich, zeitlos. Jetzt anfragen.',
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
    description: 'Cinematic Hochzeitsfilm und Hochzeitsfotografie. Persönlich, ehrlich, zeitlos. Für Paare die mehr wollen als schöne Bilder.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Amoriva Films – Hochzeitsfilm Niedersachsen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amoriva Films – Hochzeitsfilm und Fotografie',
    description: 'Cinematic Hochzeitsfilm und Hochzeitsfotografie in Niedersachsen.',
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
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#FBFBFA' }}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
