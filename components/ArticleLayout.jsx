import Link from 'next/link';
import Titel from './vintage/Titel';
import Fuss from './vintage/Fuss';
import WhatsApp from './WhatsApp';
import { anfrage, marke, brief, seiteRatgeber as r } from '@/content/texte';

/* Rahmen fuer die Ratgeber-Artikel im Vintage-Design (Nevio 28.10.2026).
   Aufbau wie Impressum/Datenschutz (Rechtliches.jsx): dunkler Kopf mit
   Brotkrumen, Titel und Lesezeit, darunter der Text auf einem Papierbogen.
   Danach der Weg zur Anfrage und drei weitere Artikel. Alles auf EINER
   dunklen Flaeche, keine Naht. Der Text steht komplett im HTML (keine
   Einblend-Animation), damit Suchmaschinen und KI-Crawler ihn lesen. */

export default function ArticleLayout({ title, category, date, readTime, jsonLd, breadcrumb, currentHref, children }) {
  const weitere = r.artikel.filter((a) => a.href !== currentHref).slice(0, 3);

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {breadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />}

      <main className="v-nacht artikel">
        <header className="artikel-kopf" data-dunkler-kopf="flaeche">
          <nav className="artikel-krumen" aria-label="Brotkrumen">
            <Link href="/">Startseite</Link>
            <span aria-hidden="true">·</span>
            <Link href="/ratgeber">Ratgeber</Link>
            <span aria-hidden="true">·</span>
            <span>{category}</span>
          </nav>
          <h1 className="v-titel artikel-titel">{title}</h1>
          <p className="artikel-meta">
            <span>{date}</span><span aria-hidden="true">·</span><span>{readTime} Lesezeit</span><span aria-hidden="true">·</span><span>Amoriva Films</span>
          </p>
        </header>

        <section className="artikel-inhalt">
          <article className="artikel-blatt">{children}</article>
        </section>

        <section className="v-bahn artikel-cta">
          <p className="v-label">{r.artikelCta.zeile}</p>
          <Titel text={r.artikelCta.titel} className="v-titel artikel-cta-titel" />
          <p className="v-text">{r.artikelCta.text}</p>
          <div className="artikel-knoepfe">
            <Link href={anfrage.href} className="v-knopf">{brief.knopf}</Link>
            <a href={marke.whatsapp} className="v-knopf" target="_blank" rel="noopener noreferrer">{brief.whatsapp}</a>
          </div>
        </section>

        <section className="v-bahn artikel-weitere" aria-label="Weitere Artikel">
          <p className="v-label artikel-weitere-label">Weitere Artikel</p>
          <ul>
            {weitere.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="artikel-weiter">
                  <span className="v-label">{a.kategorie}</span>
                  <span className="artikel-weiter-titel">{a.kurz}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .artikel { padding-bottom: clamp(72px, 8vw, 120px); }
        .artikel-kopf { max-width: 980px; margin-inline: auto; padding: calc(var(--v-kopf) + clamp(56px, 8vw, 110px)) var(--rand) clamp(40px, 5vw, 64px); text-align: center; }
        .artikel-krumen { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; margin-bottom: 24px;
          font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: color-mix(in srgb, var(--ton) 62%, transparent); }
        .artikel-krumen a { color: inherit; text-decoration: none; padding-block: 6px; }
        @media (hover: hover) { .artikel-krumen a:hover { color: var(--ton); } }
        .artikel-titel { font-size: var(--v-titel); text-wrap: balance; }
        .artikel-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; margin: 22px 0 0;
          font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13px; color: var(--ton-akzent); }

        .artikel-inhalt { padding-inline: var(--rand); }
        .artikel-blatt {
          max-width: 820px; margin-inline: auto; padding: clamp(32px, 5vw, 72px) clamp(24px, 5vw, 76px);
          color: var(--tinte); background: var(--blatt-hell) var(--v-papier-fein) 0 0 / 768px repeat;
          box-shadow: 0 30px 60px -24px rgba(10, 8, 4, .6), 0 2px 6px rgba(10, 8, 4, .25);
          outline: 1px solid color-mix(in srgb, var(--pergament) 70%, transparent); outline-offset: -14px;
          font-family: var(--font-text), system-ui, sans-serif; font-size: 16.5px; line-height: 1.75; color: color-mix(in srgb, var(--tinte) 88%, transparent);
        }
        .artikel-blatt > :first-child { margin-top: 0; }
        .artikel-blatt p { margin: 0 0 1.2em; }
        /* Zwischenbalken vor jedem Abschnitt (Nevio 28.10.2026): feine Linie mit
           kleinem Ornament in der Mitte, wie im Buchdruck */
        .artikel-blatt h2 { position: relative; margin: 2.4em 0 .6em; padding-top: 1.5em; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(24px, 2.2vw, 30px); line-height: 1.2; color: var(--tinte); }
        .artikel-blatt h2::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, color-mix(in srgb, var(--tinte) 28%, transparent) 18%, color-mix(in srgb, var(--tinte) 28%, transparent) 82%, transparent); }
        .artikel-blatt h2::after { content: '\\2726'; position: absolute; top: 0; left: 50%; transform: translate(-50%, -52%); padding: 0 12px;
          font-size: 12px; line-height: 1; color: var(--oliv-braun); background: var(--blatt-hell) var(--v-papier-fein) 0 0 / 768px repeat; }
        .artikel-blatt h3 { margin: 1.8em 0 .5em; font-family: var(--font-text), system-ui, sans-serif; font-weight: 500; font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--oliv-braun); }
        /* Listen buendig mit dem Text (Nevio 28.10.2026: am Handy wirkten sie
           eingerueckt ohne sichtbare Punkte), davor eine kleine Raute */
        .artikel-blatt ul, .artikel-blatt ol { margin: 0 0 1.2em; padding: 0; list-style: none; display: flex; flex-direction: column; gap: .5em; }
        .artikel-blatt li { position: relative; padding-left: 20px; }
        .artikel-blatt li::before { content: ''; position: absolute; left: 1px; top: .66em; width: 6px; height: 6px; border: 1px solid var(--oliv-braun); transform: rotate(45deg); }
        .artikel-blatt strong { font-weight: 500; color: var(--tinte); }
        .artikel-blatt a { color: var(--tinte); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--tinte) 35%, transparent); text-underline-offset: 3px; }
        @media (hover: hover) { .artikel-blatt a:hover { text-decoration-color: var(--tinte); } }
        .artikel-blatt .highlight-box {
          margin: 1.6em 0; padding: 18px 22px; border-left: 2px solid var(--oliv-braun);
          background: color-mix(in srgb, var(--oliv-braun) 8%, transparent); font-style: italic;
        }

        .artikel-cta { max-width: 680px; margin-top: clamp(72px, 8vw, 110px); text-align: center; }
        .artikel-cta .v-label { margin: 0 0 18px; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .artikel-cta-titel { margin-bottom: 16px; }
        .artikel-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }

        .artikel-weitere { margin-top: clamp(72px, 8vw, 110px); }
        .artikel-weitere-label { margin: 0 0 20px; text-align: center; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .artikel-weitere ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .artikel-weiter { display: flex; flex-direction: column; gap: 10px; height: 100%; padding-top: 20px; color: inherit; text-decoration: none;
          border-top: 1px solid color-mix(in srgb, var(--ton) 18%, transparent); transition: border-color 400ms var(--v-ease); }
        .artikel-weiter .v-label { color: var(--ton-akzent); }
        .artikel-weiter-titel { font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(20px, 1.7vw, 24px); line-height: 1.25; transition: opacity 300ms var(--v-ease); }
        @media (hover: hover) { .artikel-weiter:hover { border-color: var(--ton); } .artikel-weiter:hover .artikel-weiter-titel { opacity: .7; } }
        @media (max-width: 760px) { .artikel-weitere ul { grid-template-columns: 1fr; } }
      ` }} />
    </>
  );
}
