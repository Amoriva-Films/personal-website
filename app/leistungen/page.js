import Image from 'next/image';
import Link from 'next/link';
import Titel from '@/components/vintage/Titel';
import Preiskarte from '@/components/vintage/Preiskarte';
import SeitenKopf from '@/components/vintage/SeitenKopf';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { leistungen, prozess, marke, brief, seiteLeistungen as s } from '@/content/texte';

/* Leistungen im Vintage-Design (Nevio 28.10.2026), ersetzt auch /angebote
   (leitet hierher um, next.config.mjs). Keine Preise (Teamentscheidung
   28.10.2026), am selben Tag doch mit Startpreisen. Aufbau: Kopf mit gemaltem Bild,
   die drei Pakete abwechselnd Bild und Text, die Preiskarte (Preiskarte.jsx, wie die
   Menuekarte eines alten Grandhotels), wovon das Angebot abhaengt, der Ablauf in fuenf Schritten,
   Abschluss mit Knoepfen. Pakete und Schritte kommen aus derselben Quelle
   wie die Startseite, damit nichts auseinanderlaeuft. Metadaten: layout.js */

const ZIFFER = ['I', 'II', 'III', 'IV'];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Leistungen Amoriva Films',
  url: 'https://amoriva-films.de/leistungen',
  itemListElement: leistungen.pakete.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: p.titel.replace(/­/g, ''),
      description: p.text,
      provider: { '@type': 'ProfessionalService', name: 'Amoriva Films', url: 'https://amoriva-films.de' },
      areaServed: [{ '@type': 'AdministrativeArea', name: 'Niedersachsen' }, { '@type': 'Place', name: 'Europa' }],
    },
  })),
};

// Startpreise fuer Suchmaschinen: nur Eintraege mit Zahl, als Mindestpreis
const preisLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Preise Amoriva Films',
  itemListElement: s.preise.filter((p) => p.ab).map((p) => ({
    '@type': 'Offer',
    name: p.titel,
    itemOffered: { '@type': 'Service', name: p.titel },
    priceSpecification: { '@type': 'PriceSpecification', minPrice: p.ab, priceCurrency: 'EUR' },
  })),
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://amoriva-films.de' },
    { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://amoriva-films.de/leistungen' },
  ],
};

export default function Leistungen() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(preisLd) }} />

      <main className="v-nacht leist">
        {/* Kopf mit gemalter Sommerwiese (Nevio 29.10.2026), blendet unten weich aus */}
        <SeitenKopf label={s.label} titel={s.titel} bild={s.bild} weich bildLage="64% 70%" />
        <p className="v-text leist-einleitung">{s.einleitung}</p>

        <section className="v-bahn leist-pakete" aria-label="Pakete">
          {leistungen.pakete.map((p, i) => (
            <article key={p.titel} className={`leist-paket${i % 2 ? ' leist-paket--rechts' : ''}`}>
              <div className="leist-bild">
                <Image src={s.bilder[i].src} alt={s.bilder[i].alt} width={s.bilder[i].b} height={s.bilder[i].h} sizes="(max-width: 860px) 90vw, 440px" quality={80} />
              </div>
              <div className="leist-text">
                <p className="leist-nr v-schrift" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="leist-titel">{p.titel}</h2>
                <p className="v-label leist-unter">{p.unter}</p>
                <p className="v-text">{p.text}</p>
                <ul className="leist-inhalt">
                  {p.inhalt.map((punkt) => <li key={punkt}>{punkt}</li>)}
                </ul>
                {s.paketLinks?.[i] && <Link href={s.paketLinks[i].href} className="v-link leist-mehr">{s.paketLinks[i].label}</Link>}
              </div>
            </article>
          ))}
        </section>

        <section className="v-bahn leist-preise" id="preise">
          <p className="v-zeile">{s.preiseZeile}</p>
          <Titel text={s.preiseTitel} className="v-titel leist-zwischen" />
          <Preiskarte />
        </section>

        <section className="v-bahn leist-angebot">
          <p className="v-zeile">{s.angebotZeile}</p>
          <Titel text={s.angebotTitel} className="v-titel leist-zwischen" />
          <ul className="leist-faktoren">
            {s.angebotPunkte.map((a, i) => (
              <li key={a.titel}>
                <span className="leist-faktor-ziffer" aria-hidden="true">{ZIFFER[i]}</span>
                <span className="leist-faktor-titel">{a.titel}</span>
                <span className="leist-faktor-text">{a.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="v-bahn leist-ablauf">
          <p className="v-zeile">{s.ablaufZeile}</p>
          <Titel text={s.ablaufTitel} className="v-titel leist-zwischen" />
          <ol className="leist-schritte">
            {prozess.schritte.map((st, i) => (
              <li key={st.titel}>
                <span className="leist-schritt-nr v-schrift" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="leist-schritt-mitte">
                  <span className="leist-schritt-titel">{st.titel}</span>
                  <span className="leist-schritt-text">{st.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="v-bahn leist-abschluss">
          <Titel text={s.abschlussTitel} className="v-titel leist-zwischen" />
          <p className="v-text">{s.abschluss}</p>
          <div className="leist-knoepfe">
            <Link href="/anfrage" className="v-knopf">{brief.knopf}</Link>
            <a href={marke.whatsapp} className="v-knopf" target="_blank" rel="noopener noreferrer">{brief.whatsapp}</a>
          </div>
          <p className="leist-weiter">Noch Fragen? <Link href="/fragen" className="v-link">Häufige Fragen</Link> · <Link href="/ratgeber" className="v-link">Ratgeber</Link></p>
        </section>
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .leist { padding-bottom: clamp(80px, 9vw, 130px); overflow-x: clip; }
        /* Kopfbild etwas dunkler, damit es zu den anderen Unterseiten passt (Nevio 29.10.2026) */
        .leist .seitenkopf-bild img { filter: brightness(.72) saturate(.85) sepia(.1); }
        /* Titel mittig wie auf /fragen: das Bild wird von oben her leicht vergroessert,
           damit das Brautpaar unter dem Titel steht und nicht dahinter */
        .leist .seitenkopf-bild img { transform: scale(1.18); transform-origin: 50% 0; }
        .leist-einleitung { position: relative; z-index: 1; max-width: 600px; margin: calc(clamp(40px, 5vw, 72px) * -1) auto 0; padding-inline: var(--rand); text-align: center; }

        .leist-pakete { max-width: 1080px; margin-top: clamp(64px, 7vw, 100px); display: flex; flex-direction: column; gap: clamp(64px, 8vw, 120px); }
        .leist-paket { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
        .leist-paket--rechts .leist-bild { order: 2; }
        .leist-bild { position: relative; aspect-ratio: 4 / 5; overflow: hidden; box-shadow: 0 28px 50px -24px rgba(8, 6, 3, .75); }
        .leist-bild img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 1200ms var(--v-ease); }
        @media (hover: hover) { .leist-paket:hover .leist-bild img { transform: scale(1.03); } }
        .leist-nr { margin: 0 0 6px; font-size: 30px; line-height: 1; color: var(--ton-akzent); }
        /* "Hochzeitsfotografie" lief sonst bis ans Bild (Nevio 28.10.2026): etwas kleiner,
           und das weiche Trennzeichen im Titel darf greifen (global steht hyphens: none) */
        .leist-titel { margin: 0; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(24px, 2.05vw, 30px); line-height: 1.1; text-transform: uppercase; letter-spacing: .04em; hyphens: manual; }
        .leist-unter { margin: 10px 0 18px; color: var(--ton-akzent); }
        .leist-inhalt { list-style: none; margin: 22px 0 0; padding: 18px 0 0; display: flex; flex-direction: column; gap: 9px; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent);
          font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.5; color: color-mix(in srgb, var(--ton) 82%, transparent); }
        .leist-inhalt li { position: relative; padding-left: 22px; }
        .leist-mehr { display: inline-block; margin-top: 20px; font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
        .leist-mehr::after { content: ' \\2192'; }
        .leist-inhalt li::before { content: ''; position: absolute; left: 2px; top: .62em; width: 7px; height: 7px; border: 1px solid var(--ton-akzent); transform: rotate(45deg); }

        .leist-preise { text-align: center; }
        .leist-preise, .leist-angebot, .leist-ablauf, .leist-abschluss { margin-top: clamp(96px, 10vw, 150px); text-align: center; }
        .leist-zwischen { margin-bottom: clamp(32px, 4vw, 52px); }
        .leist-faktoren { list-style: none; margin: 0 auto; padding: 28px 0 0; max-width: 1080px; display: grid; grid-template-columns: repeat(4, 1fr); row-gap: 36px;
          border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .leist-faktoren li { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 0 20px; border-left: 1px solid color-mix(in srgb, var(--ton) 11%, transparent); }
        .leist-faktoren li:first-child { border-left: none; }
        .leist-faktor-ziffer { font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 18px; color: var(--ton-akzent); }
        .leist-faktor-titel { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 19px; text-transform: uppercase; letter-spacing: .06em; }
        .leist-faktor-text { font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; line-height: 1.55; color: color-mix(in srgb, var(--ton) 70%, transparent); }

        .leist-schritte { list-style: none; margin: 0 auto; padding: 0; max-width: 820px; text-align: left; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .leist-schritte li { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 18px; padding: 22px 0; border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .leist-schritt-nr { font-size: 26px; line-height: 1.1; color: var(--ton-akzent); }
        .leist-schritt-mitte { display: flex; flex-direction: column; gap: 6px; }
        .leist-schritt-titel { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 22px; line-height: 1.2; }
        .leist-schritt-text { font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: color-mix(in srgb, var(--ton) 75%, transparent); }

        .leist-abschluss { max-width: 640px; }
        .leist-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }
        .leist-weiter { margin: 28px 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; color: color-mix(in srgb, var(--ton) 70%, transparent); }

        @media (max-width: 960px) {
          .leist-faktoren { grid-template-columns: 1fr 1fr; }
          .leist-faktoren li:nth-child(3) { border-left: none; }
        }
        @media (max-width: 860px) {
          .leist-paket { grid-template-columns: 1fr; }
          .leist-paket--rechts .leist-bild { order: 0; }
          .leist-bild { max-width: 440px; width: 100%; margin-inline: auto; }
        }
        @media (max-width: 560px) {
          .leist-faktoren { grid-template-columns: 1fr; }
          .leist-faktoren li { border-left: none; }
          .leist-schritte li { grid-template-columns: 40px minmax(0, 1fr); gap: 12px; }
        }
      ` }} />
    </>
  );
}
