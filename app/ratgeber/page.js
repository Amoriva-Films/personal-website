import Link from 'next/link';
import Titel from '@/components/vintage/Titel';
import Fuss from '@/components/vintage/Fuss';
import WhatsApp from '@/components/WhatsApp';
import { seiteRatgeber as s } from '@/content/texte';

/* Ratgeber-Uebersicht im Vintage-Design (Nevio 28.10.2026). Ruhiger
   Textkopf wie bei den Artikeln (ein Hochformat-Foto war im breiten Kopf
   zu stark vergroessert), ein Satz Einleitung, die Artikel als Zeilen mit
   Linien, am Ende der Weg zu Fragen/Anfrage.
   Metadaten stehen in layout.js. */

export default function Ratgeber() {
  return (
    <>
      <main>
        <div className="v-nacht ratgeber-flaeche">
          <header className="ratgeber-kopf" data-dunkler-kopf="flaeche">
            <p className="v-label ratgeber-label">{s.label}</p>
            <Titel text={s.titel} als="h1" className="v-titel ratgeber-h1" />
          </header>
          <section className="v-abschnitt ratgeber">
            <div className="v-bahn">
              <p className="v-text ratgeber-einleitung">{s.einleitung}</p>
              <ul className="ratgeber-liste">
                {s.artikel.map((a, i) => (
                  <li key={a.href}>
                    <Link href={a.href} className="ratgeber-zeile">
                      <span className="ratgeber-nr v-schrift" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="ratgeber-mitte">
                        <span className="v-label ratgeber-kat">{a.kategorie} · {a.lesezeit} Lesezeit</span>
                        <h2 className="ratgeber-titel">{a.titel}</h2>
                        <span className="ratgeber-text">{a.text}</span>
                      </span>
                      <span className="ratgeber-pfeil" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="ratgeber-abschluss">
                <Titel text={s.abschlussTitel} className="v-titel ratgeber-abschluss-titel" />
                <p className="v-text">{s.abschluss}</p>
                <div className="ratgeber-knoepfe">
                  <Link href="/fragen" className="v-knopf">Häufige Fragen</Link>
                  <Link href="/anfrage" className="v-knopf">Anfrage stellen</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Fuss />
      <WhatsApp />

      <style dangerouslySetInnerHTML={{ __html: `
        .ratgeber-flaeche .ratgeber { background: none; }
        .ratgeber-kopf { max-width: 980px; margin-inline: auto; padding: calc(var(--v-kopf) + clamp(56px, 8vw, 110px)) var(--rand) clamp(28px, 3vw, 40px); text-align: center; }
        .ratgeber-label { margin: 0 0 18px; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .ratgeber-h1 { font-size: var(--v-titel); text-wrap: balance; }
        .ratgeber.v-abschnitt { padding-top: 0; }
        .ratgeber-einleitung { max-width: 600px; margin: 0 auto clamp(36px, 4vw, 56px); text-align: center; }
        .ratgeber-liste { list-style: none; margin: 0 auto; padding: 0; max-width: 900px; border-top: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .ratgeber-liste li { border-bottom: 1px solid color-mix(in srgb, var(--ton) 15%, transparent); }
        .ratgeber-zeile { display: grid; grid-template-columns: 48px minmax(0, 1fr) 32px; gap: clamp(14px, 2vw, 28px); align-items: center;
          padding: clamp(24px, 2.6vw, 34px) 0; color: inherit; text-decoration: none; }
        .ratgeber-nr { font-size: 24px; line-height: 1; color: var(--ton-akzent); }
        .ratgeber-mitte { display: flex; flex-direction: column; gap: 8px; }
        .ratgeber-kat { color: var(--ton-akzent); }
        .ratgeber-titel { margin: 0; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(22px, 2vw, 28px); line-height: 1.2; text-wrap: balance; transition: opacity 300ms var(--v-ease); }
        .ratgeber-text { font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: color-mix(in srgb, var(--ton) 72%, transparent); }
        .ratgeber-pfeil { justify-self: end; font-size: 20px; color: var(--ton-akzent); transition: transform 400ms var(--v-ease); }
        @media (hover: hover) { .ratgeber-zeile:hover .ratgeber-pfeil { transform: translateX(6px); } .ratgeber-zeile:hover .ratgeber-titel { opacity: .75; } }
        .ratgeber-zeile:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }
        .ratgeber-abschluss { max-width: 620px; margin: clamp(56px, 6vw, 88px) auto 0; text-align: center; }
        .ratgeber-abschluss-titel { font-size: var(--v-h2); margin-bottom: 16px; }
        .ratgeber-knoepfe { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 28px; }
        @media (max-width: 640px) { .ratgeber-zeile { grid-template-columns: minmax(0, 1fr) 24px; } .ratgeber-nr { display: none; } }
      ` }} />
    </>
  );
}
