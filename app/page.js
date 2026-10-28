import Hero from '@/components/vintage/Hero';
import Arbeit from '@/components/vintage/Arbeit';
import Leitsatz from '@/components/vintage/Leitsatz';
import Momente from '@/components/vintage/Momente';
import Leistungen from '@/components/vintage/Leistungen';
import Prozess from '@/components/vintage/Prozess';
import Stimmen from '@/components/vintage/Stimmen';
import Termine from '@/components/vintage/Termine';
import Gruender from '@/components/vintage/Gruender';
import Brief from '@/components/vintage/Brief';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';

/* Startseite im Vintage-Redesign (Danilo 20.10.2026: "bau die ganze
   Seite"). Die Reihenfolge erzaehlt: wer wir sind (Hero), worum es geht
   (Unsere Arbeit), Beweis (Momente), was ihr bekommt (Leistungen), wie es
   ablaeuft (Waehlscheibe), was Paare sagen (Stimmen), wann (Termine), mit
   wem (Gruender), jetzt anfragen (Brief).
   22.10.2026: neue Farbwelt Gruen-Beige nach Danilos sechs Referenzen,
   dazu der grosse Leitsatz in Versalien nach "Unsere Arbeit".
   Erzaehlbogen (Danilo): erst das Problem der Paare (Arbeit), dann die
   Zuspitzung (Leitsatz), Belege und Angebot in der Mitte, die Loesung mit
   Team und Anfrage ganz unten (Gruender, Brief). */

export default function Home() {
  return (
    <>
      <main>
        {/* Gemaelde nur in zwei Zonen (Danilo 22.10.2026): Morgenwolken hinter
            Hero und "Kennt ihr das?", die Wiese mit dem Paar hinter den Stimmen */}
        <div className="tag-zone tag-zone--morgen">
          <Hero />
          <Arbeit />
        </div>
        <Leitsatz />
        <Momente />
        <Leistungen />
        <Prozess />
        {/* Stimmen, Termine und Gruender liegen auf EINER dunklen Flaeche: keine Naht
            zwischen den Abschnitten (Nevio 26.10.2026). Das Wiesen-Bild haengt nur
            hinter Stimmen und Terminen. */}
        <div className="dunkel-strecke v-nacht">
          <div className="tag-zone tag-zone--wiese">
            <Stimmen />
            <Termine />
          </div>
          <Gruender />
        </div>
        <Brief />
      </main>
      <Fuss />
      <WhatsApp />
    </>
  );
}
