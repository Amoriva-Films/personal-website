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
// Blasse Fotos in den Bildern des Filmstreifens, keins davon steht weiter oben
const FILM = ['/images/hochzeit-1.jpg', '/images/braut-schleier-garten.jpg', '/images/schleier-klavier.jpg', '/images/champagner.jpg', '/images/paare/haende.webp', '/images/braut-drehen.jpg'];
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

        {/* Paketinhalt als Negativstreifen (Nevio 28.10.2026: die Papierkarte war
            zu langweilig). Jeder Punkt ist ein Bild auf dem Film, mit Bildnummer
            und Randbeschriftung wie auf einem alten Kleinbildfilm. Nur CSS, am
            Handy steht der Streifen senkrecht und ruhig. */}
        <section className="v-bahn fw-paket">
          <p className="v-zeile">Euer Paket</p>
          <Titel text={s.inhaltTitel} className="v-titel fw-zwischen" />
          <div className="fw-film">
            <p className="fw-film-rand fw-film-rand--oben" aria-hidden="true"><span>AMORIVA 400</span><span>WOLFSBURG</span><span>AMORIVA 400</span></p>
            <ol className="fw-film-bilder">
              {s.inhalt.map((p, i) => (
                <li key={p} className="fw-film-bild">
                  <Image src={FILM[i]} alt="" fill sizes="(max-width: 640px) 90vw, 200px" quality={60} className="fw-film-foto" />
                  <span className="fw-film-nr" aria-hidden="true">{i + 1}<small>A</small></span>
                  <span className="fw-film-text">{p}</span>
                </li>
              ))}
            </ol>
            <p className="fw-film-rand fw-film-rand--unten" aria-hidden="true"><span>▸ 1</span><span>▸ 2</span><span>▸ 3</span><span>▸ 4</span><span>▸ 5</span><span>▸ 6</span></p>
          </div>
          <p className="fw-film-fuss">
            Ganzer Tag ab 850 €, Standesamt ab 250 €. Alle Preise findet ihr unter <Link href="/leistungen#preise" className="v-link">Leistungen und Preise</Link>, den Film dazu unter <Link href="/hochzeitsvideo-wolfsburg" className="v-link">Hochzeitsvideo in Wolfsburg</Link>.
          </p>
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

        .fw-bilder { max-width: 1180px; margin-top: clamp(56px, 7vw, 96px); display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(10px, 1.4vw, 20px); align-items: start; }
        .fw-bild { margin: 0; overflow: hidden; aspect-ratio: 2 / 3; box-shadow: 0 24px 40px -22px rgba(8, 6, 3, .7); }
        .fw-bild--1, .fw-bild--3 { margin-top: clamp(28px, 4vw, 60px); }
        .fw-bild img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 1200ms var(--v-ease); }
        @media (hover: hover) { .fw-bild:hover img { transform: scale(1.04); } }

        .fw-stil, .fw-paket, .fw-orte, .fw-fragen, .fw-abschluss { margin-top: clamp(88px, 10vw, 140px); }
        .fw-stil { max-width: 760px; text-align: center; }
        .fw-stil .v-text + .v-text { margin-top: 16px; }
        .fw-zwischen { margin-bottom: clamp(26px, 3vw, 40px); }

        .fw-paket { text-align: center; }
        /* Negativstreifen: dunkler Film, oben und unten Perforation, dazwischen
           die Bilder. Leicht schraeg, wie hingelegt. */
        .fw-film {
          --loch: 14px; position: relative; max-width: 1180px; margin: 0 auto; padding: calc(var(--loch) * 2.4) 0;
          background: linear-gradient(to bottom, #15110b, #221c12 50%, #15110b);
          box-shadow: 0 30px 50px -24px rgba(0, 0, 0, .75);
          rotate: -1.2deg;
        }
        .fw-film::before, .fw-film::after { content: ''; position: absolute; left: 0; right: 0; height: var(--loch); pointer-events: none;
          background: radial-gradient(closest-side, var(--nacht) 0 60%, transparent 68%) 6px 0 / 26px 100% repeat-x; }
        .fw-film::before { top: 8px; } .fw-film::after { bottom: 8px; }
        .fw-film-rand { position: absolute; left: 0; right: 0; margin: 0; display: flex; justify-content: space-around; pointer-events: none;
          font-family: var(--font-maschine), ui-monospace, monospace; font-size: 10px; letter-spacing: .3em; color: #d9a44a; opacity: .75; }
        .fw-film-rand--oben { top: calc(var(--loch) + 12px); }
        .fw-film-rand--unten { bottom: calc(var(--loch) + 12px); }
        .fw-film-bilder { list-style: none; margin: 0; padding: 22px 18px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; counter-reset: bild; }
        .fw-film-bild { position: relative; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; aspect-ratio: 3 / 3.4; padding: 14px 14px 16px; text-align: left;
          background: radial-gradient(120% 90% at 30% 20%, rgba(255, 236, 200, .1), transparent 60%), #2a2318;
          outline: 1px solid rgba(231, 220, 196, .18); outline-offset: -1px; border-radius: 3px;
          transition: transform 500ms var(--v-ease), background-color 500ms var(--v-ease); }
        @media (hover: hover) { .fw-film-bild:hover { transform: translateY(-6px); background-color: #342b1d; } }
        .fw-film-bild { overflow: hidden; isolation: isolate; }
        .fw-film-foto { z-index: -1; object-fit: cover; opacity: .34; filter: sepia(.55) saturate(.7) contrast(1.05); transition: opacity 600ms var(--v-ease), transform 1200ms var(--v-ease); }
        .fw-film-bild::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; background: linear-gradient(to top, rgba(18, 14, 8, .92) 18%, rgba(18, 14, 8, .25) 70%, rgba(18, 14, 8, .1)); }
        @media (hover: hover) { .fw-film-bild:hover .fw-film-foto { opacity: .6; transform: scale(1.06); } }
        .fw-film-nr { font-family: var(--font-display), Georgia, serif; font-style: italic; font-weight: 500; font-size: 34px; line-height: 1; color: #d9a44a; }
        .fw-film-nr small { margin-left: 3px; font-size: .45em; font-style: normal; letter-spacing: .1em; }
        .fw-film-text { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(16px, 1.3vw, 19px); line-height: 1.25; color: #f1e8d6; }
        .fw-film-fuss { max-width: 620px; margin: clamp(28px, 3vw, 40px) auto 0; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13px; line-height: 1.7; color: color-mix(in srgb, var(--ton) 75%, transparent); }

        /* Tablet: zwei Reihen zu drei Bildern */
        @media (max-width: 1080px) { .fw-film-bilder { grid-template-columns: repeat(3, 1fr); } .fw-film-bild { aspect-ratio: auto; min-height: 150px; } }
        /* Handy: ruhig und schlicht. Streifen gerade, Bilder als Zeilen
           (Nummer links, Text rechts), Perforation bleibt oben und unten */
        @media (max-width: 640px) {
          .fw-film { rotate: 0deg; --loch: 11px; }
          .fw-film-rand { font-size: 9px; letter-spacing: .22em; }
          .fw-film-rand--unten { display: none; }
          .fw-film-bilder { grid-template-columns: 1fr; gap: 8px; padding: 18px 12px 10px; }
          .fw-film-bild { flex-direction: row; align-items: center; justify-content: flex-start; gap: 16px; min-height: 0; padding: 12px 14px; }
          .fw-film-nr { flex: 0 0 44px; font-size: 26px; }
          .fw-film-text { font-size: 16px; }
          .fw-film-foto { opacity: .26; }
          .fw-film-bild::after { background: linear-gradient(to right, rgba(18, 14, 8, .9) 30%, rgba(18, 14, 8, .45)); }
        }

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
          .fw-fakten, .fw-orte-liste { grid-template-columns: 1fr 1fr; row-gap: 28px; }
          .fw-fakten { gap: 10px; }
          .fw-fakten li { padding: 20px 10px 22px; gap: 10px; }
          .fw-orte-liste li:nth-child(3) { border-left: none; }
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
