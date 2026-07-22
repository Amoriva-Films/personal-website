import ArticleLayout from '../../../components/ArticleLayout';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Same Day Edit: Euer Hochzeitsfilm noch am selben Abend',
  description: 'Was ist ein Same Day Edit, wie funktioniert es und für wen lohnt sich ein Highlight Film noch am Hochzeitstag?',
  author: { '@type': 'Organization', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
  publisher: {
    '@type': 'Organization',
    name: 'Amoriva Films',
    logo: { '@type': 'ImageObject', url: 'https://amoriva-films.de/images/logo.webp' },
  },
  datePublished: '2025-05-01',
  dateModified: '2025-05-13',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://amoriva-films.de/ratgeber/same-day-edit-hochzeit' },
  image: 'https://amoriva-films.de/images/hero.webp',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Ratgeber',   item: 'https://amoriva-films.de/ratgeber' },
    { '@type': 'ListItem', position: 3, name: 'Same Day Edit', item: 'https://amoriva-films.de/ratgeber/same-day-edit-hochzeit' },
  ],
};

export default function Page() {
  return (
    <ArticleLayout
      title="Same Day Edit: Euer Hochzeitsfilm noch am selben Abend"
      category="Leistungen"
      date="Mai 2025"
      readTime="3 Min."
      jsonLd={jsonLd}
      breadcrumb={breadcrumb}
      currentHref="/ratgeber/same-day-edit-hochzeit"
    >
      <p>
        Stellt euch vor: Es ist Abend eurer Hochzeit, die ersten Gäste tanzen, und plötzlich erscheint auf der Leinwand ein kurzer Film, alles was heute passiert ist. Die Tränen beim Einzug, die Lacher beim Ja-Wort, die Umarmungen, der erste Tanz. Komprimiert auf 3 bis 4 Minuten, mit Musik unterlegt, fertig geschnitten.
      </p>
      <p>
        Das ist ein <strong>Same Day Edit</strong>, und er ist einer der emotionalsten Momente, den wir als Filmemacher erleben dürfen.
      </p>

      <h2>Was ist ein Same Day Edit?</h2>
      <p>
        Ein Same Day Edit (auch: SDE) ist ein Kurzfilm, der noch am selben Hochzeitstag fertiggestellt und gezeigt wird. Während die Zeremonie und der Empfang stattfinden, schneidet ein Cutter parallel das Rohmaterial, in Echtzeit. Am Abend, oft beim Dinner oder zur Party, wird der Film auf einer Leinwand präsentiert.
      </p>
      <p>
        Das Ergebnis: Eure Gäste sehen in wenigen Minuten, was sie selbst erlebt haben, aber aus einer anderen Perspektive, verdichtet, emotional verstärkt durch Musik und Schnitt.
      </p>

      <div className="highlight-box">
        Ein Same Day Edit ist keine Dokumentation, er ist ein Erlebnis. Für euch und eure Gäste gleichzeitig.
      </div>

      <h2>Wie läuft ein Same Day Edit ab?</h2>
      <p>Damit ein Same Day Edit funktioniert, braucht es ein eingespieltes Team und eine klare Logistik:</p>
      <ul>
        <li><strong>Drehstart früh:</strong> Das Team filmt ab der Vorbereitung: Getting Ready, Brautkleid, Morgenatmosphäre.</li>
        <li><strong>Parallelschnitt:</strong> Während Zeremonie und Empfang laufen, überträgt ein Kameramann das Material in Echtzeit an einen Cutter, oft über lokales WLAN oder direkt vor Ort.</li>
        <li><strong>Schnitt in 3 bis 5 Stunden:</strong> Der Cutter wählt die stärksten Momente, synchronisiert sie mit Musik und erstellt einen 3 bis 5 minütigen Film.</li>
        <li><strong>Präsentation am Abend:</strong> Der Film wird per HDMI oder WLAN auf die Leinwand gebracht, oft als Überraschung für das Brautpaar.</li>
      </ul>

      <h2>Für wen ist ein Same Day Edit geeignet?</h2>
      <p>
        Ein Same Day Edit ist nicht für jede Hochzeit das Richtige. Folgende Punkte helfen bei der Entscheidung:
      </p>
      <ul>
        <li>Ihr habt eine größere Feier mit mindestens 50 bis 80 Gästen und eine Leinwand oder Projektor vor Ort</li>
        <li>Ihr möchtet euren Gästen einen besonderen Moment schenken, etwas das sie so noch nie erlebt haben</li>
        <li>Euer Ablauf hat ein klares Zeitfenster zwischen Zeremonie und Party (mindestens 3 bis 4 Stunden)</li>
        <li>Ihr habt ein Budget für ein zusätzliches Kamera und Schnittteam</li>
      </ul>
      <p>
        Wenn das auf euch zutrifft: Der Same Day Edit ist die Leistung, über die Gäste noch Jahre später sprechen.
      </p>

      <h2>Same Day Edit bei Amoriva Films</h2>
      <p>
        Wir bieten den Same Day Edit als Zusatzoption zu unseren Hauptpaketen an, international. Meldet euch frühzeitig, da diese Option begrenzt verfügbar ist und eine detailliertere Absprache im Vorfeld erfordert.
      </p>
      <p>
        <Link href="/leistungen">Alle unsere Leistungen</Link> findet ihr auf der Leistungsseite. Oder <Link href="/anfrage">schreibt uns direkt</Link>, wir beraten euch gerne, ob ein Same Day Edit zu eurer Hochzeit passt.
      </p>
    </ArticleLayout>
  );
}
