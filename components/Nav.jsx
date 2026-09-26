'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wortmarke from './Wortmarke';

// Filme stehen an erster Stelle. Wer einen Hochzeitsfilmer sucht,
// will Filme sehen, nicht Leistungen lesen.
const LINKS = [
  // { label: 'Filme', href: '/filme' },   // wieder rein, sobald es Filme gibt
  // { label: 'Galerie', href: '/referenzen' },   // raus auf Nevios Wunsch 21.09.2026
  { label: 'Leistungen', href: '/#leistungen'  },
  { label: 'Über uns',   href: '/#founders'    },
  { label: 'Anfrage',    href: '/anfrage'      },
];

const TELEFON = '+49 155 6555 9747';
// Die Wortmarke ist jetzt gesetzter Text, kein Bild mehr. Sie richtet
// sich allein nach dieser Hoehe aus, die Breite ergibt der Satz.
const LOGO_HOEHE = 34;

export default function Nav() {
  const [gescrollt, setGescrollt] = useState(false);
  const [offen, setOffen] = useState(false);

  const pfad = usePathname();
  const [ueberDunkel, setUeberDunkel] = useState(false);

  useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Nur wo ein Abschnitt sich als dunkler Kopf meldet (das Hero-Video auf
     der Startseite), darf die Leiste helle Schrift tragen. Vorher galt das
     ueberall: auf den Unterseiten stand helle Schrift auf hellem Grund,
     gemessen 1,06 zu 1 - praktisch unsichtbar.                          */
  useEffect(() => {
    setUeberDunkel(Boolean(document.querySelector('[data-dunkler-kopf]')));
  }, [pfad]);

  useEffect(() => {
    if (!offen) return;
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOffen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = vorher;
      window.removeEventListener('keydown', onKey);
    };
  }, [offen]);

  // Helle Wortmarke nur, solange sie ueber dem dunklen Video steht.
  const aufDunkel = ueberDunkel && !offen && !gescrollt;
  const textFarbe = aufDunkel ? 'rgba(244,244,242,0.9)' : 'var(--tinte)';

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          paddingBlock: gescrollt ? '0.75rem' : '1.25rem',
          transition: 'padding 400ms var(--ease)',
        }}
      >
        {/* Die Navigation liegt als Pille auf der Seite statt als Balken
            quer darueber. Ueber dem Video bleibt sie durchsichtig, sobald
            man scrollt legt sie sich als milchiges Glas darunter - so
            bleibt oben das Bild die Hauptsache. Wie auf amoriva.app.   */}
        <div className="bahn">
        <div className="nav-pille" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--luft-3)',
          /* Die Pille braucht Innenabstand, damit das Glas nicht an der
             Schrift klebt. Derselbe Wert geht als negativer Aussenabstand
             wieder ab: so liegt das Glas etwas ueber der Bahn, die Marke
             darin steht aber exakt auf der Textkante von 60 px. Ohne das
             sass das Logo 23 px weiter rechts als jede Ueberschrift.   */
          padding: '0.6rem 1.1rem',
          marginInline: '-1.1rem',
          borderRadius: 'var(--radius-pille)',
          background: gescrollt ? 'rgba(251,251,250,0.82)' : 'transparent',
          backdropFilter: gescrollt ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: gescrollt ? 'blur(20px) saturate(140%)' : 'none',
          border: gescrollt ? '1px solid rgba(20,20,19,0.08)' : '1px solid transparent',
          boxShadow: gescrollt ? '0 8px 30px rgba(20,20,19,0.07)' : 'none',
          transition: 'background 400ms var(--ease), border-color 400ms var(--ease), box-shadow 400ms var(--ease), padding 400ms var(--ease)',
        }}>
        <Link href="/" aria-label="Amoriva Films, zur Startseite" style={{
          display: 'block', flexShrink: 0, textDecoration: 'none',
        }}>
          <Wortmarke hoehe={LOGO_HOEHE} farbe={aufDunkel ? 'var(--auf-dunkel)' : 'var(--gruen)'} />
        </Link>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2.2vw, 2.25rem)' }}>
          {LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              fontSize: 'var(--schrift-fein)', fontWeight: 400,
              color: textFarbe, textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'color 400ms var(--ease), opacity 200ms var(--ease)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.55'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
              {label}
            </Link>
          ))}
          {/* Die Telefonnummer steht wieder in der Kopfzeile (Nevio,
              20.09.2026). Damit sie nicht wie ein weiterer Menuepunkt
              aussieht: ein feiner Strich davor trennt Menue von Kontakt,
              und der Hoerer sagt auf einen Blick, was die Ziffern sind.
              Sie ist waehlbar, nicht nur lesbar.                       */}
          <span aria-hidden="true" className="nav-trenner" />

          <a href="tel:+4915565559747" className="nav-telefon" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: 'var(--schrift-fein)', fontWeight: 500,
            color: textFarbe, textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'color 400ms var(--ease), opacity 200ms var(--ease)',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.6'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {TELEFON}
          </a>

          <Link href="/anfrage" className="knopf knopf-voll nav-knopf" style={{
            minHeight: 42, padding: '0.55rem 1.2rem', fontSize: '0.875rem',
          }}>
            Anfrage stellen
          </Link>
        </div>

        <button
          className="nav-schalter"
          onClick={() => setOffen(o => !o)}
          aria-label={offen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={offen}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px', margin: '-10px', color: offen ? 'var(--tinte)' : textFarbe,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {offen
              ? (<><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>)
              : (<><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>)}
          </svg>
        </button>
        </div>
        </div>
      </nav>

      {offen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'var(--papier)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          gap: 'var(--luft-3)', padding: '0 var(--rand)',
        }}>
          {LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOffen(false)} className="menue-link">
              {label}
            </Link>
          ))}
          <Link href="/anfrage" onClick={() => setOffen(false)}
                className="knopf knopf-voll" style={{ marginTop: 'var(--luft-3)' }}>
            Anfrage stellen
          </Link>
          <a href="tel:+4915565559747" onClick={() => setOffen(false)} style={{
            marginTop: 'var(--luft-2)', fontSize: 'var(--schrift-text)',
            color: 'var(--grau-2)', textDecoration: 'none',
          }}>
            {TELEFON}
          </a>
        </div>
      )}
    </>
  );
}
