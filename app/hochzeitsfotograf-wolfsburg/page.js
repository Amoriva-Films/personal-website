import Image from 'next/image';
import Link from 'next/link';
import Titel from '@/components/vintage/Titel';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { brief, marke, seiteFotografWolfsburg as s } from '@/content/texte';

/* Stadtseite "Hochzeitsfotograf in Wolfsburg" (Nevio 28.10.2026: "krass
   pushen fuer Fotograf"). Laut Recherche wird "Hochzeitsfotograf" viel oefter
   gesucht als jeder Video-Begriff, und fuer Wolfsburg ranken fast nur
   Verzeichnisse. Aufbau: Textkopf mit Antwort zuerst, vier Eckdaten, Fotos,
   Stil, Paketinhalt, Orte in Wolfsburg, lokale Fragen, Abschluss. Alle
   Antworten stehen offen im HTML (keine Klapp-Liste), damit Suchmaschinen
   und KI-Assistenten sie lesen und zitieren koennen. */

const BASIS = 'https://amoriva-films.de';
const URL = `${BASIS}/hochzeitsfotograf-wolfsburg`;

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: { canonical: URL },
  openGraph: { title: `${s.meta.titel} | Amoriva Films`, description: s.meta.text, url: URL, images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }] },
};

const ZIFFER = ['I', 'II', 'III', 'IV'];
const ohneStern = (t) => t.replace(/\*/g, '');

const ld = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hochzeitsfotografie in Wolfsburg',
    serviceType: 'Hochzeitsfotograf',
    url: URL,
    description: s.meta.text,
    provider: { '@type': 'ProfessionalService', name: 'Amoriva Films', url: BASIS },
    areaServed: [
      { '@type': 'City', name: 'Wolfsburg' },
      { '@type': 'City', name: 'Braunschweig' },
      { '@type': 'City', name: 'Gifhorn' },
      { '@type': 'City', name: 'Hannover' },
      { '@type': 'State', name: 'Niedersachsen' },
    ],
    offers: [
      { '@type': 'Offer', name: 'Hochzeitsfotografie, ganzer Tag', priceSpecification: { '@type': 'PriceSpecification', minPrice: 850, priceCurrency: 'EUR' } },
      { '@type': 'Offer', name: 'Fotos im Standesamt', priceSpecification: { '@type': 'PriceSpecification', minPrice: 250, priceCurrency: 'EUR' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.fragen.map((f) => ({ '@type': 'Question', name: f.frage, acceptedAnswer: { '@type': 'Answer', text: f.antwort } })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: BASIS },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${BASIS}/leistungen` },
      { '@type': 'ListItem', position: 3, name: 'Hochzeitsfotograf Wolfsburg', item: URL },
    ],
  },
];

export default function FotografWolfsburg() {
  return (
    <>
      {ld.map((d) => <script key={d['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}

      <main className="v-nacht fw">
        <header className="fw-kopf" data-dunkler-kopf="flaeche">
          <nav className="fw-krumen" aria-label="Brotkrumen">
            <Link href="/">Startseite</Link><span aria-hidden="true">·</span>
            <Link href="/leistungen">Leistungen</Link><span aria-hidden="true">·</span>
            <span>Hochzeitsfotograf Wolfsburg</span>
          </nav>
          <Titel text={s.titel} als="h1" className="v-titel fw-h1" />
          <p className="v-text fw-einleitung">{s.einleitung}</p>
          <ul className="fw-fakten">
            {s.fakten.map((f) => (
              <li key={f.text}><span className="fw-fakt-wert">{f.wert}</span><span className="fw-fakt-text">{f.text}</span></li>
            ))}
          </ul>
        </header>

        <section className="v-bahn fw-bilder" aria-label="Beispiele aus unserer Hochzeitsfotografie">
          {s.bilder.map((b, i) => (
            <figure key={b.src} className={`fw-bild fw-bild--${i}`}>
              <Image src={b.src} alt={b.alt} width={b.b} height={b.h} sizes="(max-width: 760px) 46vw, 24vw" quality={80} />
            </figure>
          ))}
        </section>

        <section className="v-bahn fw-stil">
          <p className="v-zeile">{s.stilZeile}</p>
          <Titel text={s.stilTitel} className="v-titel fw-zwischen" />
          {s.stil.map((t) => <p key={t.slice(0, 20)} className="v-text">{t}</p>)}
        </section>

        <section className="v-bahn fw-paket">
          <div className="fw-blatt">
            <h2 className="fw-blatt-titel">{ohneStern(s.inhaltTitel)}</h2>
            <ul className="fw-inhalt">{s.inhalt.map((p) => <li key={p}>{p}</li>)}</ul>
            <p className="fw-blatt-fuss">
              Alle Preise und Pakete findet ihr auf der Seite <Link href="/leistungen#preise">Leistungen und Preise</Link>.
            </p>
          </div>
        </section>

        <section className="v-bahn fw-orte">
          <p className="v-zeile">{s.orteZeile}</p>
          <Titel text={s.orteTitel} className="v-titel fw-zwischen" />
          <p className="v-text fw-orte-text">{s.orteText}</p>
          <ul className="fw-orte-liste">
            {s.orte.map((o, i) => (
              <li key={o.name}>
                <span className="fw-ort-ziffer" aria-hidden="true">{ZIFFER[i]}</span>
                <h3 className="fw-ort-name">{o.name}</h3>
                <p>{o.text}</p>
              </li>
            ))}
          </ul>
          <p className="v-text fw-umgebung">{s.umgebung}</p>
        </section>

        <section className="v-bahn fw-fragen">
          <Titel text={s.fragenTitel} className="v-titel fw-zwischen" />
          <dl className="fw-fragen-liste">
            {s.fragen.map((f) => (
              <div key={f.frage}>
                <dt>{f.frage}</dt>
                <dd>{f.antwort}</dd>
              </div>
            ))}
          </dl>
          <p className="fw-mehr">Noch mehr Antworten: <Link href="/fragen" className="v-link">Häufige Fragen</Link> · <Link href="/ratgeber/was-kostet-ein-hochzeitsfilm" className="v-link">Was kostet ein Hochzeitsfilm?</Link></p>
        </section>

        <section className="v-bahn fw-abschluss">
          <Titel text={s.abschlussTitel} className="v-titel fw-zwischen" />
          <p className="v-text">{s.abschluss}</p>
          <div className="fw-knoepfe">
            <Link href="/anfrage" className="v-knopf">{brief.knopf}</Link>
            <a href={marke.whatsapp} className="v-knopf" target="_blank" rel="noopener noreferrer">{brief.whatsapp}</a>
          </div>
        </section>
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .fw { padding-bottom: clamp(80px, 9vw, 130px); overflow-x: clip; }
        .fw-kopf { max-width: 900px; margin-inline: auto; padding: calc(var(--v-kopf) + clamp(48px, 7vw, 96px)) var(--rand) 0; text-align: center; }
        .fw-krumen { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; margin-bottom: 22px;
          font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: color-mix(in srgb, var(--ton) 62%, transparent); }
        .fw-krumen a { color: inherit; text-decoration: none; padding-block: 6px; }
        @media (hover: hover) { .fw-krumen a:hover { color: var(--ton); } }
        .fw-h1 { font-size: var(--v-titel); text-wrap: balance; }
        .fw-einleitung { max-width: 640px; margin: 24px auto 0; }
        .fw-fakten { list-style: none; margin: clamp(36px, 4vw, 52px) auto 0; padding: 22px 0 0; max-width: 860px; display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .fw-fakten li { display: flex; flex-direction: column; gap: 4px; padding: 0 14px; border-left: 1px solid color-mix(in srgb, var(--ton) 11%, transparent); }
        .fw-fakten li:first-child { border-left: none; }
        .fw-fakt-wert { font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 500; font-size: clamp(22px, 2vw, 28px); color: var(--ton-akzent); }
        .fw-fakt-text { font-family: var(--font-text), system-ui, sans-serif; font-size: 13.5px; line-height: 1.4; color: color-mix(in srgb, var(--ton) 72%, transparent); }

        .fw-bilder { max-width: 1180px; margin-top: clamp(56px, 7vw, 96px); display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(10px, 1.4vw, 20px); align-items: start; }
        .fw-bild { margin: 0; overflow: hidden; aspect-ratio: 2 / 3; box-shadow: 0 24px 40px -22px rgba(8, 6, 3, .7); }
        .fw-bild--1, .fw-bild--3 { margin-top: clamp(28px, 4vw, 60px); }
        .fw-bild img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 1200ms var(--v-ease); }
        @media (hover: hover) { .fw-bild:hover img { transform: scale(1.04); } }

        .fw-stil, .fw-paket, .fw-orte, .fw-fragen, .fw-abschluss { margin-top: clamp(88px, 10vw, 140px); }
        .fw-stil { max-width: 760px; text-align: center; }
        .fw-stil .v-text + .v-text { margin-top: 16px; }
        .fw-zwischen { margin-bottom: clamp(26px, 3vw, 40px); }

        .fw-blatt { max-width: 720px; margin-inline: auto; padding: clamp(30px, 4.5vw, 60px) clamp(24px, 5vw, 64px); color: var(--tinte);
          background: var(--blatt-hell) var(--v-papier-fein) 0 0 / 768px repeat;
          box-shadow: 0 30px 60px -24px rgba(10, 8, 4, .6), 0 2px 6px rgba(10, 8, 4, .25);
          outline: 1px solid color-mix(in srgb, var(--pergament) 70%, transparent); outline-offset: -14px; }
        .fw-blatt-titel { margin: 0 0 20px; text-align: center; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(24px, 2.2vw, 30px); text-transform: uppercase; letter-spacing: .05em; }
        .fw-inhalt { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px;
          font-family: var(--font-text), system-ui, sans-serif; font-size: 15.5px; line-height: 1.55; color: color-mix(in srgb, var(--tinte) 88%, transparent); }
        .fw-inhalt li { position: relative; padding-left: 22px; }
        .fw-inhalt li::before { content: ''; position: absolute; left: 2px; top: .62em; width: 6px; height: 6px; border: 1px solid var(--oliv-braun); transform: rotate(45deg); }
        .fw-blatt-fuss { margin: 22px 0 0; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--tinte) 14%, transparent);
          font-family: var(--font-maschine), ui-monospace, monospace; font-size: 12.5px; line-height: 1.6; color: color-mix(in srgb, var(--tinte) 72%, transparent); }
        .fw-blatt-fuss a { color: var(--tinte); text-underline-offset: 3px; }

        .fw-orte { text-align: center; }
        .fw-orte-text { max-width: 640px; margin: 0 auto; }
        .fw-orte-liste { list-style: none; margin: clamp(32px, 4vw, 48px) auto 0; padding: 26px 0 0; max-width: 1080px; display: grid; grid-template-columns: repeat(4, 1fr); row-gap: 32px;
          border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .fw-orte-liste li { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 0 18px; border-left: 1px solid color-mix(in srgb, var(--ton) 11%, transparent); }
        .fw-orte-liste li:first-child { border-left: none; }
        .fw-ort-ziffer { font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 18px; color: var(--ton-akzent); }
        .fw-ort-name { margin: 0; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: 19px; text-transform: uppercase; letter-spacing: .06em; }
        .fw-orte-liste p { margin: 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; line-height: 1.55; color: color-mix(in srgb, var(--ton) 72%, transparent); }
        .fw-umgebung { max-width: 640px; margin: clamp(32px, 4vw, 48px) auto 0; }

        .fw-fragen { max-width: 820px; text-align: center; }
        .fw-fragen-liste { margin: 0; text-align: left; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .fw-fragen-liste > div { padding: 22px 0; border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .fw-fragen-liste dt { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(19px, 1.6vw, 22px); line-height: 1.3; }
        .fw-fragen-liste dd { margin: 8px 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.65; color: color-mix(in srgb, var(--ton) 78%, transparent); }
        .fw-mehr { margin: 24px 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; color: color-mix(in srgb, var(--ton) 70%, transparent); }

        .fw-abschluss { max-width: 640px; text-align: center; }
        .fw-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }

        @media (max-width: 860px) {
          .fw-fakten, .fw-orte-liste { grid-template-columns: 1fr 1fr; row-gap: 24px; }
          .fw-fakten li:nth-child(3), .fw-orte-liste li:nth-child(3) { border-left: none; }
          .fw-bilder { grid-template-columns: 1fr 1fr; }
          .fw-bild--1, .fw-bild--3 { margin-top: 28px; }
        }
        @media (max-width: 520px) {
          /* "HOCHZEITSFOTOGRAF" ist ein langes Wort, am Handy kleiner, damit es passt */
          .fw-h1 { font-size: clamp(22px, 7vw, 32px); }
          .fw-orte-liste { grid-template-columns: 1fr; }
          .fw-orte-liste li { border-left: none; }
        }
      ` }} />
    </>
  );
}
