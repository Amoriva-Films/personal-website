'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wortmarke from '@/components/Wortmarke';
import { anfrage, kopf, marke, navigation, navigationMehr } from '@/content/texte';

/* Kopfzeile nach der Crown-Perfumery-Referenz: Links links, Wortmarke in
   der Mitte, Anfrage rechts. Keine Pille, kein Milchglas: backdrop-blur
   wird bei jedem Scrollbild neu berechnet (Vault: Fluessige Animationen).

   Sie liegt auf jeder Seite gleich als Sand-Leiste mit dunkler Schrift
   (Vorbild Tilly Roberts im Board). "Start" fuehrt immer zurueck (Danilo: "ich will einen Home-Button"). */

export default function Kopf() {
  const pfad = usePathname();
  // Eine einheitliche Kopfzeile auf jeder Seite (Nevio 26.10.2026: "die Zeile da
  // oben darf sich nicht aendern"): die Sand-Leiste mit dunkler Schrift.
  // Ganz oben liegt sie auf jeder Seite mit dunklem Kopfbereich (Hero-Video,
  // gemalte Kopfbilder, Vision) durchsichtig mit heller Schrift, damit das Bild
  // voll zu sehen ist. Sobald man ein Stueck scrollt, kommt die Sand-Leiste
  // (Nevio 26.10.2026).
  const [offen, setOffen] = useState(false);
  const [ueberVideo, setUeberVideo] = useState(false);

  useEffect(() => {
    let bild = 0;
    const pruefen = () => {
      bild = 0;
      const kopfbereich = document.querySelector('[data-dunkler-kopf]');
      // Ab etwa 8 % Scrollweg kommt die Leiste (beim Hero schrumpft das Video
      // dann schon in seinen Rahmen und dahinter liegt heller Grund)
      setUeberVideo(Boolean(kopfbereich) && kopfbereich.getBoundingClientRect().top > -window.innerHeight * 0.08);
    };
    const beiScroll = () => { if (!bild) bild = requestAnimationFrame(pruefen); };
    pruefen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    window.addEventListener('resize', beiScroll);
    return () => {
      window.removeEventListener('scroll', beiScroll);
      window.removeEventListener('resize', beiScroll);
      if (bild) cancelAnimationFrame(bild);
    };
  }, [pfad]);

  useEffect(() => { setOffen(false); }, [pfad]);

  useEffect(() => {
    if (!offen) return;
    const html = document.documentElement;
    const vorher = html.style.overflow;
    html.style.overflow = 'hidden';
    const taste = (e) => { if (e.key === 'Escape') setOffen(false); };
    window.addEventListener('keydown', taste);
    return () => {
      html.style.overflow = vorher;
      window.removeEventListener('keydown', taste);
    };
  }, [offen]);

  const aktiv = (href) => (pfad === href ? 'page' : undefined);

  return (
    <header className={`kopf${pfad !== '/' ? ' kopf--dunkel' : ''}${ueberVideo && !offen ? ' kopf--video' : ''}`}>
      <div className="kopf-bahn">
        <nav className="kopf-links" aria-label="Hauptnavigation">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} className="kopf-link" aria-current={aktiv(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="kopf-menue"
          aria-expanded={offen}
          aria-controls="kopf-panel"
          aria-label={offen ? kopf.menueZu : kopf.menueAuf}
          onClick={() => setOffen((o) => !o)}
        >
          <span className="v-label">{kopf.menue}</span>
        </button>

        <Link href="/" className="kopf-marke" aria-label={kopf.startseite}>
          <Wortmarke hoehe={40} />
        </Link>

        <div className="kopf-rechts">
          <a href={marke.telefonHref} className="kopf-link kopf-telefon">{marke.telefon}</a>
          <Link href={anfrage.href} className="kopf-knopf" aria-current={aktiv(anfrage.href)}>
            {anfrage.label}
          </Link>
        </div>
      </div>

      <div id="kopf-panel" className={`kopf-panel${offen ? ' kopf-panel--offen' : ''}`} hidden={!offen}>
        <nav aria-label="Menü">
          {[...navigation, ...navigationMehr, anfrage].map(({ label, href }) => (
            <Link key={href} href={href} className="kopf-panel-link" aria-current={aktiv(href)}>
              {label}
            </Link>
          ))}
        </nav>
        <a href={marke.telefonHref} className="kopf-panel-telefon v-label">{marke.telefon}</a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .kopf {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          color: var(--tinte);
          background: var(--sand);
          border-bottom: 1px solid color-mix(in srgb, var(--tinte) 12%, transparent);
          transition: background-color 400ms var(--v-ease), color 400ms var(--v-ease), border-color 400ms var(--v-ease);
        }
        /* Unterseiten (alles ausser Start): die Leiste im Oliv-Braun mit
           Papierstruktur wie die Flaechen darunter, helle Schrift (Nevio 26.10.2026) */
        .kopf--dunkel {
          color: var(--sand-hell); border-bottom-color: color-mix(in srgb, var(--sand-hell) 10%, transparent);
          background: url("/images/vintage/braun-alt.webp") 0 0 / 1024px repeat, var(--nacht);
          background-blend-mode: luminosity, normal;
        }
        @media (hover: hover) { .kopf--dunkel .kopf-knopf:hover { background-color: var(--sand-hell); color: var(--tinte); } }
        /* Ganz oben ueber dem dunklen Kopfbereich: durchsichtig, helle Schrift,
           oben ein weicher Schatten, damit die Schrift lesbar bleibt */
        .kopf--video { color: var(--blatt); background: transparent; border-bottom-color: transparent; }
        .kopf--video::before { content: ''; position: absolute; inset: 0 0 -40px; z-index: -1; pointer-events: none;
          background: linear-gradient(to bottom, rgba(14, 11, 6, .5), rgba(14, 11, 6, 0)); }
        @media (hover: hover) { .kopf--video .kopf-knopf:hover { background-color: var(--sand-hell); color: var(--tinte); } }
        .kopf-bahn {
          height: var(--v-kopf); max-width: var(--spalte); margin-inline: auto; padding-inline: var(--rand);
          display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--luft-3);
        }
        .kopf-links { display: flex; gap: 30px; justify-self: start; }
        .kopf-rechts { display: flex; align-items: center; gap: 28px; justify-self: end; }
        .kopf-marke { justify-self: center; color: inherit; display: inline-flex; }
        .kopf-link {
          position: relative; color: inherit; text-decoration: none;
          font-family: var(--font-text), system-ui, sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          padding-block: 6px;
        }
        .kopf-link::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
          background: currentColor; transform: scaleX(0); transform-origin: left;
          transition: transform 350ms var(--v-ease);
        }
        .kopf-link[aria-current='page']::after { transform: scaleX(1); }
        @media (hover: hover) { .kopf-link:hover::after { transform: scaleX(1); } }
        .kopf-telefon { letter-spacing: .08em; }

        /* Anfrage-Knopf: dieselbe Plakette wie .v-knopf, nur kleiner */
        .kopf-knopf {
          position: relative; color: inherit; text-decoration: none; white-space: nowrap; line-height: 1;
          font-family: var(--font-display), Georgia, serif; font-weight: 600;
          font-size: 13px; letter-spacing: .22em; text-transform: uppercase;
          padding: 12px 38px 11px; border: 1px solid color-mix(in srgb, currentColor 75%, transparent); border-radius: 999px;
          background-image:
            radial-gradient(circle at 18px 50%, currentColor 1.5px, transparent 2.1px),
            radial-gradient(circle at calc(100% - 18px) 50%, currentColor 1.5px, transparent 2.1px);
          transition: background-color 400ms var(--v-ease), color 400ms var(--v-ease);
        }
        .kopf-knopf::after {
          content: ''; position: absolute; inset: 3px; border: 1px solid currentColor; border-radius: 999px; opacity: .3; pointer-events: none;
        }
        @media (hover: hover) {
          .kopf-knopf:hover { background-color: var(--tinte); color: var(--sand); }
        }
        .kopf a:focus-visible, .kopf button:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }

        .kopf-menue { display: none; background: none; border: none; color: inherit; cursor: pointer; padding: 10px 0; justify-self: start; }

        .kopf-panel {
          position: fixed; inset: var(--v-kopf) 0 0 0; z-index: 99; color: var(--tinte); background: var(--sand);
          display: flex; flex-direction: column; justify-content: center; gap: var(--luft-5);
          padding: var(--luft-5) var(--rand);
        }
        .kopf-panel[hidden] { display: none; }
        .kopf-panel nav { display: flex; flex-direction: column; gap: var(--luft-2); }
        .kopf-panel-link {
          color: var(--tinte); text-decoration: none;
          font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: var(--v-h2); line-height: 1.1;
        }
        .kopf-panel-link[aria-current='page'] { font-style: italic; color: var(--oliv-braun); }
        .kopf-panel-telefon { color: var(--oliv-braun); text-decoration: none; }

        @media (max-width: 959px) {
          .kopf-links, .kopf-telefon { display: none; }
          .kopf-menue { display: inline-flex; }
          /* Spalten duerfen schrumpfen, sonst wird die Leiste am Handy breiter als der Schirm */
          .kopf-bahn { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 10px; }
          /* Handy: ohne Punkte, damit die Plakette neben dem Logo Platz hat */
          .kopf-knopf { padding: 9px 14px 8px; font-size: 11px; letter-spacing: .12em; background-image: none; }
        }
        @media (max-width: 959px) { .kopf-bahn > .kopf-menue { grid-column: 1; grid-row: 1; } .kopf-marke { grid-column: 2; grid-row: 1; } .kopf-rechts { grid-column: 3; grid-row: 1; } }
        @media (min-width: 960px) { .kopf-bahn { padding-inline: 60px; } }
        /* Kleine Laptops: mit "Leistungen" im Menue brachen die Links sonst in zwei
           Zeilen um (28.10.2026). Enger setzen, Telefonnummer steht dann nur im Fuss. */
        .kopf-link { white-space: nowrap; }
        @media (min-width: 960px) and (max-width: 1239px) {
          .kopf-bahn { padding-inline: 32px; }
          .kopf-links { gap: 20px; }
          .kopf-link { font-size: 12px; letter-spacing: .12em; }
          .kopf-telefon { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .kopf, .kopf-link::after, .kopf-knopf { transition: none; } }
      ` }} />
    </header>
  );
}
