import './globals.css';
import './vintage.css';
import { Cormorant_Garamond, Courier_Prime, Jost, Pinyon_Script } from 'next/font/google';
import Kopf from '@/components/vintage/Kopf';
import Intro from '@/components/vintage/Intro';
import SmoothScroll from '@/components/SmoothScroll';
import StructuredData from '@/components/StructuredData';

/* Schriften laut STYLE.md: Cormorant Garamond fuer Wortmarke und
   Headlines. Fuer alles, was gelesen wird, Jost: eine Futura-Verwandte
   aus den 1920ern, passt zu Vintage und bleibt auf Dunkel klar lesbar.
   Hanken Grotesk ist raus (Danilo 20.10.2026: "komplett Scheiss-Schrift").
   Bodoni war im Board "kacke zu lesen". Die Variablennamen bleiben
   gleich, damit die noch nicht umgebauten Unterseiten weiter laufen.
   next/font hostet beide selbst, kein Abruf bei Google im Browser.     */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-text',
  display: 'swap',
});

/* Schreibschrift fuer einzelne Akzentwoerter in Titeln, nie fuer Text.
   Vorbild: fast jede Referenz im Board ("Meet the Founders", "A Better
   Story", "Intimate and Elegance"). Frei (SIL OFL). */
/* Schreibmaschine fuer kleine Vintage-Details (Unterzeilen, Notizen),
   nie fuer Fliesstext. Vorbild: Tilly Roberts im Board (22.10.2026). */
const courier = Courier_Prime({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-maschine',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-schrift',
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
    <html lang="de" className={`${cormorant.variable} ${jost.variable} ${courier.variable} ${pinyon.variable}`}>
      <head>
        {/* Das Hero-Video ist das Erste, was ein Besucher sieht, aber
            Browser geben Video von sich aus eine niedrige Prioritaet:
            gemessen startete die Anfrage erst nach 543 ms, hinter CSS,
            Schriften und Javascript. Dieser Hinweis stellt sie nach
            vorne, damit das Laden mit der Seite beginnt statt danach. */}
        <link rel="preload" as="video" type="video/mp4" href="/videos/hero.mp4" />
        <StructuredData />
      </head>
      <body style={{ margin: 0, padding: 0, background: 'transparent', color: 'var(--tinte)' }}>
        <SmoothScroll>
          <Intro />
          <Kopf />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
