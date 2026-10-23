'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wortmarke from '@/components/Wortmarke';
import { anfrage, kopf, marke, navigation } from '@/content/texte';

/* Kopfzeile nach der Crown-Perfumery-Referenz: Links links, Wortmarke in
   der Mitte, Anfrage rechts. Keine Pille, kein Milchglas: backdrop-blur
   wird bei jedem Scrollbild neu berechnet (Vault: Fluessige Animationen).

   Ueber einem dunklen Kopfbereich (data-dunkler-kopf, z. B. Hero-Video)
   steht sie hell und durchsichtig. Sobald dieser Bereich unter der Leiste
   durch ist, liegt sie als Sand-Leiste mit dunkler Schrift (Vorbild
   Tilly Roberts im Board). "Start" fuehrt immer zurueck (Danilo: "ich will einen Home-Button"). */

// Muss zu --v-kopf in vintage.css passen (dort fuer das CSS).
const HOEHE = 76;

export default function Kopf() {
  const pfad = usePathname();
  // 'leiste' = feste dunkle Leiste, 'hell' = durchsichtig ueber dem Video.
  const [modus, setModus] = useState('leiste');
  const [offen, setOffen] = useState(false);

  useEffect(() => {
    let bild = 0;
    const pruefen = () => {
      bild = 0;
      const kopfbereich = document.querySelector('[data-dunkler-kopf]');
      if (!kopfbereich || kopfbereich.getBoundingClientRect().bottom <= HOEHE) { setModus('leiste'); return; }
      // Seiten, die oben auf Oliv-Braun beginnen (Fragen, Vision): die Leiste
      // wird selbst Oliv-Braun mit heller Schrift, solange diese Flaeche unter
      // ihr liegt. Keine helle Kante oben (Danilo 23.10.2026).
      if (kopfbereich.dataset.dunklerKopf === 'flaeche') { setModus('dunkel'); return; }
      // Helle Schrift nur, solange das dunkle Bild wirklich hinter der Leiste
      // liegt. Beim Hero schrumpft das Video schnell unter die Leiste weg,
      // dann steht die Kopfzeile wieder als Sandleiste da (sonst helle Schrift
      // auf hellem Himmel, 22.10.2026).
      setModus(kopfbereich.getBoundingClientRect().top > -window.innerHeight * 0.08 ? 'hell' : 'leiste');
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
    <header className={`kopf${!offen && modus !== 'leiste' ? ` kopf--${modus}` : ''}`}>
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
          {[...navigation, anfrage].map(({ label, href }) => (
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
        .kopf--hell { color: var(--blatt); background: transparent; border-bottom-color: transparent; }
        .kopf--dunkel {
          color: var(--sand-hell); border-bottom-color: color-mix(in srgb, var(--sand-hell) 10%, transparent);
          background: url("/images/vintage/braun-alt.webp") 0 0 / 1024px repeat, var(--nacht);
          background-blend-mode: luminosity, normal;
        }
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
          .kopf--hell .kopf-knopf:hover, .kopf--dunkel .kopf-knopf:hover { background-color: var(--sand-hell); color: var(--tinte); }
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
        @media (prefers-reduced-motion: reduce) { .kopf, .kopf-link::after, .kopf-knopf { transition: none; } }
      ` }} />
    </header>
  );
}
