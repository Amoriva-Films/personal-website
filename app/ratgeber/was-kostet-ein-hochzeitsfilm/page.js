import ArticleLayout from '../../../components/ArticleLayout';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Was kostet ein Hochzeitsfilm? Was den Preis bestimmt',
  description: 'Hochzeitsfilm Kosten: welche Faktoren den Preis bestimmen und was in einem guten Paket enthalten sein sollte.',
  author: { '@type': 'Organization', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
  publisher: {
    '@type': 'Organization',
    name: 'Amoriva Films',
    logo: { '@type': 'ImageObject', url: 'https://amoriva-films.de/images/logo.webp' },
  },
  datePublished: '2025-05-01',
  dateModified: '2026-10-28',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://amoriva-films.de/ratgeber/was-kostet-ein-hochzeitsfilm' },
  image: 'https://amoriva-films.de/images/og-image.jpg',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite',  item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Ratgeber',    item: 'https://amoriva-films.de/ratgeber' },
    { '@type': 'ListItem', position: 3, name: 'Was kostet ein Hochzeitsfilm?', item: 'https://amoriva-films.de/ratgeber/was-kostet-ein-hochzeitsfilm' },
  ],
};

export default function Page() {
  return (
    <ArticleLayout
      title="Was kostet ein Hochzeitsfilm? Was den Preis bestimmt"
      category="Kosten & Pakete"
      date="Mai 2025"
      readTime="5 Min."
      jsonLd={jsonLd}
      breadcrumb={breadcrumb}
      currentHref="/ratgeber/was-kostet-ein-hochzeitsfilm"
    >
      <p>
        Ein Hochzeitsfilm gehört zu den Entscheidungen, die viele Paare erst spät in der Planung treffen, die im Nachhinein aber oft als eine der wichtigsten gelten. Während Blumen verwelken und das Catering vergessen wird, bleibt der Film. Doch was kostet ein Hochzeitsfilm eigentlich? Und worauf sollte man beim Vergleich von Angeboten achten?
      </p>

      <div className="highlight-box">
        Kurze Antwort: Den einen Preis gibt es nicht. Was ein Hochzeitsfilm kostet, hängt vom <strong>Aufwand</strong> ab: wie viele Stunden gefilmt wird, wie lang euer Film wird und ob ihr ihn <strong>dokumentarisch</strong> oder <strong>gescriptet mit gespielten Szenen</strong> möchtet. Wer euch ohne ein Gespräch eine Zahl nennt, kennt euren Tag noch gar nicht.
      </div>

      <h2>Warum ein Hochzeitsfilm eine lohnende Investition ist</h2>
      <p>
        Viele Paare fragen sich: Lohnt sich das wirklich? Die Antwort ist fast immer ja, und zwar aus einem einfachen Grund: Ein Hochzeitsfilm ist das einzige Medium, das Bewegung, Ton, Stimmen und Emotionen gleichzeitig einfängt. Fotos zeigen Momente. Ein Film lässt euch sie erneut <em>erleben</em>.
      </p>
      <p>
        Die meisten Paare, die wir begleiten, berichten uns Monate nach der Hochzeit, dass der Film das war, was sie am häufigsten wieder angeschaut haben. Nicht die Fotos, nicht die Deko-Bilder auf Instagram.
      </p>

      <h2>Welche Faktoren beeinflussen den Preis?</h2>
      <p>
        Zwischen dem günstigsten und dem teuersten Angebot, das ihr bekommen werdet, liegen oft mehrere Tausend Euro. Diese Faktoren entscheiden darüber:
      </p>
      <ul>
        <li><strong>Drehtag & Stunden:</strong> Wie lange wird gefilmt? Von der Vorbereitung bis zur Party oder nur Trauung bis Dinner?</li>
        <li><strong>Art des Films:</strong> Ein dokumentarischer Film begleitet euren Tag so, wie er passiert. Ein gescripteter Film hat eine Idee, ein kleines Drehbuch und Szenen, die ihr gemeinsam mit uns spielt. Das braucht mehr Vorbereitung, Drehzeit und Schnitt.</li>
        <li><strong>Schnitt & Nachbearbeitung:</strong> Ein Film in Cinégraphie braucht 30 bis 80 Stunden Schnittprozess: Farbkorrektur und Sounddesign.</li>
        <li><strong>Kameraausrüstung:</strong> Vollformat-Kameras, Gimbal, Slider. Professionelles Equipment kostet und macht den visuellen Unterschied.</li>
        <li><strong>Länge des Hauptfilms:</strong> 6 Minuten oder 20 Minuten sind zwei komplett unterschiedliche Schnittaufwände.</li>
        <li><strong>Eure Wünsche:</strong> Ein separater Trailer, Rohmaterial, Clips für Social Media oder ein Paarshooting an einem zweiten Tag.</li>
      </ul>

      <h2>Woran ihr die Unterschiede erkennt</h2>

      <h3>Das günstigste Angebot</h3>
      <p>
        Ganz unten findet ihr meist Einsteiger oder Hobby-Filmemacher. Die Qualität kann überraschen, aber auch enttäuschen. Oft fehlt es an Erfahrung mit Hochzeitsabläufen, professionellem Equipment oder einem strukturierten Schnittprozess. Für eine Hochzeit, die ihr euer Leben lang erinnern wollt, ist das Risiko oft zu hoch. Und anders als beim Catering könnt ihr den Tag nicht wiederholen.
      </p>

      <h3>Erfahrene Videografen</h3>
      <p>
        In der breiten Mitte arbeiten erfahrene Videografen mit gutem Equipment und einem durchdachten Ablauf. Ihr bekommt einen Hauptfilm, einen Trailer und professionelle Nachbearbeitung. Für die meisten Paare ist das genau richtig.
      </p>

      <h3>Premium</h3>
      <p>
        Ganz oben wird in Cinégraphie gearbeitet, mit ausgeprägtem Stilgefühl und oft mit nur wenigen Hochzeiten im Jahr. Die Ergebnisse sind filmreif, das ist auch der Anspruch. Hier arbeiten wir. Bei uns filmen immer mindestens zwei von uns, so entgeht euch kein Moment, auch wenn an zwei Stellen gleichzeitig etwas passiert.
      </p>

      <h2>Was sollte in einem guten Paket enthalten sein?</h2>
      <ul>
        <li>Vollständige Filmbegleitung (Vorbereitung bis mindestens Abendessen)</li>
        <li>Hauptfilm in Cinégraphie (mindestens 5 bis 8 Minuten)</li>
        <li>Highlight Trailer (1 bis 2 Minuten)</li>
        <li>Professionelle Farbkorrektur und Audiobearbeitung</li>
        <li>Private Online-Galerie mit Download-Option</li>
        <li>Klarer Zeitrahmen für die Lieferung</li>
      </ul>

      <h2>Unser Angebot bei Amoriva Films</h2>
      <p>
        Wir von <strong>Amoriva Films</strong> begleiten Paare in Niedersachsen und europaweit. Unsere Pakete beginnen bei einem einzigen Ansprechpartner und enden bei einem vollständigen Kombipaket aus Hochzeitsfilm und Hochzeitsfotografie.
      </p>
      <p>
        Damit ihr eine Orientierung habt, hier unsere Startpreise:
      </p>
      <ul>
        <li><strong>Hochzeitsfilm:</strong> ab 1.000 €</li>
        <li><strong>Hochzeitsfotografie, ganzer Tag:</strong> ab 850 €</li>
        <li><strong>Fotos im Standesamt:</strong> ab 250 €</li>
        <li><strong>Fotos für ein paar Stunden:</strong> auf Anfrage</li>
        <li><strong>Film und Foto aus einer Hand:</strong> auf Anfrage</li>
      </ul>
      <p>
        Alle Details zu den Paketen findet ihr auf unserer Seite <Link href="/leistungen#preise">Leistungen und Preise</Link>.
      </p>
      <p>
        Was uns wichtig ist: Wir beraten euch ehrlich. Wenn euer Datum verfügbar ist, erzählen wir euch genau, was möglich ist, ohne versteckte Kosten. <Link href="/anfrage">Stellt uns jetzt eine unverbindliche Anfrage</Link> und erhaltet innerhalb von 24 Stunden eine Antwort.
      </p>
    </ArticleLayout>
  );
}
