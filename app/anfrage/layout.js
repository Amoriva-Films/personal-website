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
export const metadata = {
  title: 'Hochzeitsfilm anfragen in Wolfsburg',
  description:
    'Hochzeitsfilm und Fotografie anfragen bei Amoriva Films. Wolfsburg, Braunschweig, Hannover und deutschlandweit. Antwort innerhalb von 24 Stunden.',
  alternates: {
    canonical: 'https://amoriva-films.de/anfrage',
  },
};

export const viewport = {
  themeColor: '#3D3727',
  viewportFit: 'cover',
};

export default function AnfrageLayout({ children }) {
  return (
    <div className={`af ${schriftKlassen}`} data-lenis-prevent="">
      {children}
      <Fuss>
        <a href="/impressum">Impressum</a>
        {' · '}
        <a href="/datenschutz">Datenschutz</a>
      </Fuss>
    </div>
  );
}
