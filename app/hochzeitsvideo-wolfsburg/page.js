import Link from 'next/link';
import Titel from '@/components/vintage/Titel';
import Aufklapper from '@/components/vintage/Aufklapper';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import Drehplan from '@/components/vintage/Drehplan';
import Abspann from '@/components/vintage/Abspann';
import Umgebung from '@/components/vintage/Umgebung';
import { brief, marke, seiteVideoWolfsburg as s } from '@/content/texte';

/* Stadtseite "Hochzeitsvideo in Wolfsburg" (Nevio 29.10.2026), Gegenstueck zur
   Fotograf-Seite. Bei "Hochzeitsvideo Wolfsburg" stand Amoriva nicht in den
   Top 10, die Startseite bleibt aber bei "Hochzeitsfilm" (Platz 2). Aufbau:
   Textkopf mit Antwort zuerst, vier Eckdaten, Stil, der Drehplan (Filmklappe und Drehbuchblatt), das Paket
   als Abspann, Region, lokale Fragen, Abschluss. Antworten offen im HTML.
   Das Video aus der Vision-Seite kommt hier dazu, sobald es da ist. */

const BASIS = 'https://amoriva-films.de';
const URL = `${BASIS}/hochzeitsvideo-wolfsburg`;

export const metadata = {
  title: s.meta.titel,
  description: s.meta.text,
  alternates: { canonical: URL },
  openGraph: { title: `${s.meta.titel} | Amoriva Films`, description: s.meta.text, url: URL, images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }] },
};

const ohneStern = (t) => t.replace(/\*/g, '');

const ld = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hochzeitsvideo in Wolfsburg',
    serviceType: 'Hochzeitsvideo',
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
    offers: { '@type': 'Offer', name: 'Hochzeitsvideo', priceSpecification: { '@type': 'PriceSpecification', minPrice: 1000, priceCurrency: 'EUR' } },
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
      { '@type': 'ListItem', position: 3, name: 'Hochzeitsvideo Wolfsburg', item: URL },
    ],
  },
];

export default function VideoWolfsburg() {
  return (
    <>
      {ld.map((d) => <script key={d['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}

      <main className="v-nacht fw">
        <header className="fw-kopf" data-dunkler-kopf="flaeche">
          <nav className="fw-krumen" aria-label="Brotkrumen">
            <Link href="/">Startseite</Link><span aria-hidden="true">·</span>
            <Link href="/leistungen">Leistungen</Link><span aria-hidden="true">·</span>
            <span>Hochzeitsvideo Wolfsburg</span>
          </nav>
          <Titel text={s.titel} als="h1" className="v-titel fw-h1" />
          <p className="v-text fw-einleitung">{s.einleitung}</p>
          <ul className="fw-fakten">
            {s.fakten.map((f) => (
              <li key={f.text}><span className="fw-fakt-wert">{f.wert}</span><span className="fw-fakt-text">{f.text}</span></li>
            ))}
          </ul>
        </header>


        <section className="v-bahn fw-stil">
          <p className="v-zeile">{s.stilZeile}</p>
          <Titel text={s.stilTitel} className="v-titel fw-zwischen" />
          {s.stil.map((t) => <p key={t.slice(0, 20)} className="v-text">{t}</p>)}
        </section>

        <section className="v-bahn fw-drehplan">
          <p className="v-zeile">{s.drehplanZeile}</p>
          <Titel text={s.drehplanTitel} className="v-titel fw-zwischen" />
          <Drehplan />
        </section>

        {/* Paketinhalt als Kino-Abspann auf einer Leinwand */}
        <section className="v-bahn fw-abspann">
          <Titel text={s.inhaltTitel} className="v-titel fw-zwischen" />
          <Abspann />
          <p className="fw-abspann-fuss">
            Alle Preise findet ihr unter <Link href="/leistungen#preise" className="v-link">Leistungen und Preise</Link>, Fotos dazu unter <Link href="/hochzeitsfotograf-wolfsburg" className="v-link">Hochzeitsfotograf in Wolfsburg</Link>.
          </p>
        </section>

        {/* Region als dezente Landkarte (Umgebung.jsx) */}
        <section className="v-bahn fw-orte">
          <Umgebung zeile={s.orteZeile} text={s.umgebung} />
        </section>

        <section className="v-bahn fw-fragen">
          <Titel text={s.fragenTitel} className="v-titel fw-zwischen" />
          <Aufklapper liste={s.fragen} ebene="h3" />
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
        /* Eckdaten (Nevio 29.10.2026: "hingeballert"): kleine Marke in Versalien
           oben, Wert ruhig in Antiqua darunter, feine Trennlinien, keine Kursive */
        .fw-fakten { list-style: none; margin: clamp(40px, 4.5vw, 60px) auto 0; padding: 0; max-width: 820px; display: grid; grid-template-columns: repeat(4, 1fr); }
        /* Karten (Nevio 29.10.2026): doppelter feiner Rahmen wie ein Etikett,
           beim Hovern heben sie sich leicht, Rahmen wird bernstein, unten
           waechst ein kurzer Strich. Am Handy ruhig, ohne Bewegung. */
        .fw-fakten { gap: 14px; }
        .fw-fakten li { position: relative; display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 26px 14px 28px; border-radius: 3px;
          border: 1px solid color-mix(in srgb, var(--ton) 18%, transparent); background: color-mix(in srgb, var(--ton) 4%, transparent);
          transition: transform .5s cubic-bezier(.22, 1, .36, 1), border-color .5s ease, background-color .5s ease, box-shadow .5s ease; }
        .fw-fakten li::before { content: ''; position: absolute; inset: 5px; border: 1px solid color-mix(in srgb, var(--ton) 8%, transparent); border-radius: 2px; pointer-events: none; transition: border-color .5s ease; }
        .fw-fakten li::after { content: ''; position: absolute; left: 50%; bottom: 14px; width: 0; height: 1px; background: var(--ton-akzent); translate: -50% 0; transition: width .5s cubic-bezier(.22, 1, .36, 1); }
        @media (hover: hover) {
          .fw-fakten li:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--ton-akzent) 60%, transparent);
            background-color: color-mix(in srgb, var(--ton) 7%, transparent); box-shadow: 0 22px 34px -20px rgba(0, 0, 0, .6); }
          .fw-fakten li:hover::before { border-color: color-mix(in srgb, var(--ton-akzent) 28%, transparent); }
          .fw-fakten li:hover::after { width: 34px; }
        }
        @media (prefers-reduced-motion: reduce) { .fw-fakten li, .fw-fakten li::after { transition: none; } .fw-fakten li:hover { transform: none; } }
        .fw-fakt-text { order: -1; font-family: var(--font-text), system-ui, sans-serif; font-size: 10.5px; font-weight: 500; letter-spacing: .26em; text-transform: uppercase; color: color-mix(in srgb, var(--ton) 55%, transparent); }
        .fw-fakt-wert { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(21px, 1.9vw, 26px); line-height: 1.1; letter-spacing: .02em; color: var(--ton); white-space: nowrap; }

        .fw-stil, .fw-drehplan, .fw-abspann, .fw-orte, .fw-fragen, .fw-abschluss { margin-top: clamp(88px, 10vw, 140px); }
        .fw-stil { max-width: 760px; text-align: center; }
        .fw-stil .v-text + .v-text { margin-top: 16px; }
        .fw-zwischen { margin-bottom: clamp(26px, 3vw, 40px); }

        .fw-drehplan { text-align: center; }
        .fw-abspann { max-width: 980px; text-align: center; }
        .fw-abspann-fuss { margin: clamp(32px, 4vw, 48px) auto 0; max-width: 600px; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13px; line-height: 1.7; color: color-mix(in srgb, var(--ton) 75%, transparent); }

        .fw-orte { text-align: center; }

        .fw-fragen { max-width: 820px; text-align: center; }
        .fw-mehr { margin: 24px 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 14px; color: color-mix(in srgb, var(--ton) 70%, transparent); }

        .fw-abschluss { max-width: 640px; text-align: center; }
        .fw-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }

        @media (max-width: 860px) {
          .fw-fakten { grid-template-columns: 1fr 1fr; row-gap: 28px; }
          .fw-fakten { gap: 10px; }
          .fw-fakten li { padding: 20px 10px 22px; gap: 10px; }
        }
        @media (max-width: 520px) {
          /* "HOCHZEITSVIDEO" ist ein langes Wort, am Handy kleiner, damit es passt */
          .fw-h1 { font-size: clamp(22px, 7vw, 32px); }
        }
      ` }} />
    </>
  );
}
