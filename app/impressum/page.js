import { RechtSeite, RechtAbschnitt } from '@/components/vintage/Rechtliches';

export const metadata = {
  title: 'Impressum',
  alternates: { canonical: 'https://amoriva-films.de/impressum' },
};

/* Impressum im Vintage-Design (Nevio 26.10.2026). Inhalt unveraendert. */
export default function Impressum() {
  return (
    <RechtSeite titel="Impressum" unter="Angaben gemäß § 5 DDG">
        <RechtAbschnitt titel="Angaben gemäß § 5 DDG">
          <p><strong>Amoriva Films</strong></p>
          <p>Inhaber: Nevio Mastrogiorgio</p>
          <p>Grafhorster Str. 16b<br />38458 Velpke<br />Deutschland</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Kontakt">
          <p>Telefon: <a href="tel:015565559747">0155 65559747</a></p>
          <p>E-Mail: <a href="mailto:booking@amoriva-films.de">booking@amoriva-films.de</a></p>
          <p>Website: <a href="https://amoriva-films.de">https://amoriva-films.de</a></p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Umsatzsteuer">
          <p>Steuernummer: 13/128/13447</p>
          <p>Kein Ausweis der Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung).</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          <p>Nevio Mastrogiorgio<br />Grafhorster Str. 16b<br />38458 Velpke</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="EU-Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Haftung für Links">
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="Urheberrecht">
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </RechtAbschnitt>
    </RechtSeite>
  );
}
