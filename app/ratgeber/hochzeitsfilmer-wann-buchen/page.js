import ArticleLayout from '../../../components/ArticleLayout';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wann Hochzeitsfilmer & Fotograf buchen? Der richtige Zeitpunkt',
  description: 'Wann sollte man Hochzeitsfilmer und Hochzeitsfotograf buchen? Empfehlung, Checkliste und Tipps für Paare weltweit.',
  author: { '@type': 'Organization', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
  publisher: {
    '@type': 'Organization',
    name: 'Amoriva Films',
    logo: { '@type': 'ImageObject', url: 'https://amoriva-films.de/images/logo.webp' },
  },
  datePublished: '2025-05-01',
  dateModified: '2025-05-13',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://amoriva-films.de/ratgeber/hochzeitsfilmer-wann-buchen' },
  image: 'https://amoriva-films.de/images/og-image.jpg',
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Ratgeber',   item: 'https://amoriva-films.de/ratgeber' },
    { '@type': 'ListItem', position: 3, name: 'Wann buchen', item: 'https://amoriva-films.de/ratgeber/hochzeitsfilmer-wann-buchen' },
  ],
};

export default function Page() {
  return (
    <ArticleLayout
      title="Wann Hochzeitsfilmer & Fotograf buchen? Der richtige Zeitpunkt"
      category="Planung"
      date="Mai 2025"
      readTime="4 Min."
      jsonLd={jsonLd}
      breadcrumb={breadcrumb}
      currentHref="/ratgeber/hochzeitsfilmer-wann-buchen"
    >
      <p>
        Unter allen Fragen, die uns Brautpaare stellen, ist diese eine der häufigsten: <em>„Haben wir noch Chancen für unser Datum?"</em> Meistens folgt dann das Datum, und leider müssen wir oft sagen: nein. Nicht weil wir keine Lust haben, sondern weil das Datum längst vergeben ist.
      </p>
      <p>
        Hochzeitsfilmer und Fotografen mit gutem Ruf sind <strong>das am frühesten ausgebuchte Gewerk bei Hochzeiten</strong>. Vor der Location, vor dem Caterer, vor dem DJ. Wer zu spät fragt, hat oft keine Wahl mehr.
      </p>

      <h2>Unsere Empfehlung: 12 bis 18 Monate vor der Hochzeit</h2>
      <p>
        Der ideale Buchungszeitpunkt für einen Hochzeitsfilmer und Hochzeitsfotograf liegt bei <strong>12 bis 18 Monaten vor dem Hochzeitsdatum</strong>. Das klingt früh, und das ist es auch. Aber es gibt gute Gründe dafür.
      </p>
      <p>
        Beliebte Samstage im Sommer (Mai bis September) sind bei erfahrenen Hochzeitsfilmern häufig bereits 14 bis 20 Monate im Voraus gebucht. Wer das verpasst, findet noch Anbieter, aber nicht mehr die, die er sich eigentlich gewünscht hätte.
      </p>

      <div className="highlight-box">
        Die Faustregel: Habt ihr eure Location, solltet ihr sofort auch Fotograf und Videograf buchen, nicht Wochen später.
      </div>

      <h2>Was passiert, wenn man zu spät bucht?</h2>
      <p>Zu spät buchen bedeutet meistens eines oder mehreres davon:</p>
      <ul>
        <li>Euer Wunschvideograf und Wunschfotograf sind nicht mehr verfügbar</li>
        <li>Ihr müsst Kompromisse beim Stil oder der Qualität eingehen</li>
        <li>Ihr habt weniger Zeit für ein Kennenlerngespräch und die Vorbereitung</li>
        <li>Auf kurzem Vorbereitungsweg entstehen Missverständnisse, die an eurem Tag spürbar sind</li>
      </ul>

      <h2>Wie die Buchung ablaufen sollte</h2>

      <h3>1. Portfolio prüfen</h3>
      <p>
        Schaut euch Beispielfilme an, nicht nur Fotos. Ein Hochzeitsfilmer ist gut, wenn sein Film euch Gänsehaut macht, bevor ihr die Person überhaupt kennt. Stil, Schnitt, Musik: das muss sich richtig anfühlen.
      </p>

      <h3>2. Kennenlerngespräch führen</h3>
      <p>
        Ein gutes Erstgespräch ist kein Verkaufsgespräch. Ihr sollt verstehen, wie der Anbieter arbeitet, und er soll verstehen, was euch wichtig ist. Stellt Fragen zu Ablauf, Ausrüstung, Lieferzeiten und was passiert, wenn etwas schief geht.
      </p>

      <h3>3. Vertrag prüfen</h3>
      <p>
        Achtet auf: Datum und Ort, was inbegriffen ist, Lieferzeit, Zahlungsmodalitäten und Stornobedingungen. Ein seriöser Anbieter hat einen klaren, schriftlichen Vertrag.
      </p>

      <h3>4. Anzahlung leisten & Datum sichern</h3>
      <p>
        Erst mit Anzahlung und Vertragsunterschrift ist das Datum wirklich reserviert. Nur mündliche Zusagen oder E-Mails ohne Vertrag binden niemanden.
      </p>

      <h2>Checkliste: Was beim Buchen wichtig ist</h2>
      <ul>
        <li>Portfolio und Beispielfilme angeschaut?</li>
        <li>Kennenlerngespräch geführt (persönlich oder Video)?</li>
        <li>Paketumfang schriftlich bestätigt?</li>
        <li>Lieferdatum für Film und Fotos festgehalten?</li>
        <li>Stornobedingungen gelesen?</li>
        <li>Anzahlung geleistet und Datum gesichert?</li>
        <li>Ansprechpartner für den Hochzeitstag festgelegt?</li>
      </ul>

      <h2>Und wenn das Datum schon nah ist?</h2>
      <p>
        Manchmal ist die Hochzeit in 4 bis 6 Monaten und man hat noch keinen Videografen. Das ist kein Grund zur Panik, aber es erfordert schnelles Handeln. Fragt direkt an, seid flexibel beim Paketumfang und versteht, dass weniger Vorlaufzeit manchmal Abstriche beim Vorgespräch bedeutet.
      </p>
      <p>
        Bei <strong>Amoriva Films</strong> bearbeiten wir kurzfristige Anfragen, sofern das Datum verfügbar ist. <Link href="/anfrage">Stellt jetzt eine Anfrage</Link>, wir antworten innerhalb von 24 Stunden und sagen euch ehrlich, was möglich ist.
      </p>
    </ArticleLayout>
  );
}
