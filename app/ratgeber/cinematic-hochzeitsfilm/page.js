import ArticleLayout from '../../../components/ArticleLayout';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Was ist ein cinematic Hochzeitsfilm und warum macht es den Unterschied?',
  description: 'Cinematic Hochzeitsfilm erklärt: Stil, Unterschied zu documentary, emotionale Wirkung und wie ein filmischer Hochzeitsfilm entsteht.',
  author: { '@type': 'Organization', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
  publisher: {
    '@type': 'Organization',
    name: 'Amoriva Films',
    logo: { '@type': 'ImageObject', url: 'https://amoriva-films.de/images/logo.webp' },
  },
  datePublished: '2025-05-01',
  dateModified: '2025-05-13',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://amoriva-films.de/ratgeber/cinematic-hochzeitsfilm' },
  image: 'https://amoriva-films.de/images/hero.webp',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Ratgeber',   item: 'https://amoriva-films.de/ratgeber' },
    { '@type': 'ListItem', position: 3, name: 'Cinematic Hochzeitsfilm', item: 'https://amoriva-films.de/ratgeber/cinematic-hochzeitsfilm' },
  ],
};

export default function Page() {
  return (
    <ArticleLayout
      title="Was ist ein cinematic Hochzeitsfilm und warum macht es den Unterschied?"
      category="Stil & Qualität"
      date="Mai 2025"
      readTime="4 Min."
      jsonLd={jsonLd}
      breadcrumb={breadcrumb}
      currentHref="/ratgeber/cinematic-hochzeitsfilm"
    >
      <p>
        Wenn ihr nach einem Hochzeitsfilmer sucht, begegnet euch das Wort <em>cinematic</em> auf fast jeder Website. Aber was bedeutet es wirklich, und wie unterscheidet sich ein cinematic Hochzeitsfilm von einem klassischen Hochzeitsvideo? Dieser Artikel erklärt es ehrlich und ohne Marketingsprache.
      </p>

      <h2>Was bedeutet „cinematic"?</h2>
      <p>
        <strong>Cinematic</strong> kommt vom englischen <em>cinema</em>, also Kino. Ein cinematischer Hochzeitsfilm ist so gedreht und geschnitten, dass er sich wie ein kurzer Kinofilm anfühlt, mit Dramaturgie, Lichtgestaltung, Farbgrading, Sounddesign und einer emotionalen Erzählstruktur.
      </p>
      <p>
        Das Gegenstück dazu ist der <strong>documentary</strong> Stil: chronologisch, nah am Ablauf der Zeremonie, weniger inszeniert. Beide Stile haben ihre Berechtigung, aber sie erzeugen völlig unterschiedliche Gefühle beim Anschauen.
      </p>

      <div className="highlight-box">
        Ein documentary Film zeigt was passiert ist. Ein cinematic Film lässt euch es noch einmal fühlen.
      </div>

      <h2>Die 5 Merkmale eines cinematic Hochzeitsfilms</h2>
      <ul>
        <li><strong>Farbgrading:</strong> Jede Einstellung wird in der Nachbearbeitung farblich abgestimmt. Warme Töne, weiche Schatten, filmisches Korn. Das ist der visuelle Unterschied, den ihr sofort spürt.</li>
        <li><strong>Musik als Erzähler:</strong> Die Musik trägt die Geschichte. Sie beginnt ruhig, baut sich auf, explodiert im emotionalen Höhepunkt. Gänsehaut ist das Ziel.</li>
        <li><strong>Nichtlinearer Schnitt:</strong> Ein cinematic Film erzählt nicht immer in Chronologie. Manchmal beginnt er mit dem emotionalsten Moment und baut dann die Geschichte drumherum.</li>
        <li><strong>Bewegte Kamera:</strong> Gimbal, Slider, Drohne. Statt statischer Einstellungen bewegt sich die Kamera mit euch. Das erzeugt Lebendigkeit.</li>
        <li><strong>O-Töne & Stille:</strong> Echte Stimmen, Gelächter, Weingeräusche, integriert in den Soundtrack. Die authentischen Momente, die kein Skript ersetzen kann.</li>
      </ul>

      <h2>Documentary vs. Cinematic: Was ist besser?</h2>
      <p>
        Es kommt auf euren Geschmack an. Wenn ihr wollt, dass euer Film möglichst vollständig ist und jeden Abschnitt der Hochzeit zeigt, tendiert ihr zum documentary Stil. Wenn ihr möchtet, dass euer Film Gänsehaut erzeugt und wie ein Kurzfilm wirkt, ist cinematic die richtige Wahl.
      </p>
      <p>
        Viele unserer Kunden entscheiden sich für eine Kombination: ein cinematic Hauptfilm plus ein vollständiger documentary Schnitt als Zusatz. So habt ihr das Beste aus beiden Welten.
      </p>

      <h2>Wie entsteht ein cinematic Hochzeitsfilm?</h2>
      <p>
        Die eigentliche Arbeit beginnt nach dem Drehtag. Ein cinematic Film von 6 bis 8 Minuten Länge erfordert typischerweise 30 bis 60 Stunden Postproduktion:
      </p>
      <ul>
        <li>Sichtung und Selektion des Rohmaterials (oft 6 bis 10 Stunden Aufnahmen)</li>
        <li>Erster Schnitt: Dramaturgie und Struktur festlegen</li>
        <li>Musikauswahl und Synchronisation mit emotionalen Höhepunkten</li>
        <li>Farbkorrektur und Grading jeder Einstellung</li>
        <li>Sounddesign: Umgebungsgeräusche, O-Töne, Musikübergänge</li>
        <li>Feinschnitt und Korrekturrunde</li>
      </ul>

      <h2>Unser Ansatz bei Amoriva Films</h2>
      <p>
        Wir drehen jeden Hochzeitsfilm mit einem cinematischen Blick, vom ersten Moment des Tages bis zum letzten Tanz. Was uns antreibt: Wir wollen, dass ihr in fünf Jahren denselben Film anschaut und dieselben Gefühle habt wie am Hochzeitstag selbst.
      </p>
      <p>
        Schaut euch unsere <Link href="/referenzen">Referenzen</Link> an oder <Link href="/anfrage">stellt direkt eine Anfrage</Link>, wir sind gespannt von euch zu hören.
      </p>
    </ArticleLayout>
  );
}
