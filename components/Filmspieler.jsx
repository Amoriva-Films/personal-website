'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/* Der Film wird erst geladen, wenn jemand darauf klickt. Bis dahin steht
   nur ein Bild da. Wuerde die Seite alle Filme sofort einbetten, laedt
   jeder Besucher mehrere Megabyte fremden Code mit, den er vielleicht
   nie braucht. */

function Abspieler({ film, schliessen }) {
  const beiTaste = useCallback((e) => { if (e.key === 'Escape') schliessen(); }, [schliessen]);

  useEffect(() => {
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', beiTaste);
    return () => {
      document.body.style.overflow = vorher;
      window.removeEventListener('keydown', beiTaste);
    };
  }, [beiTaste]);

  return (
    <div
      onClick={schliessen}
      role="dialog"
      aria-modal="true"
      aria-label={`Film von ${film.paar}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(14,14,13,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <button
        onClick={schliessen}
        aria-label="Film schließen"
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid rgba(244,244,242,0.25)', background: 'transparent',
          color: 'var(--auf-dunkel)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      </button>

      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '1400px', aspectRatio: '16 / 9' }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${film.vimeoId}?autoplay=1&byline=0&portrait=0&title=0&dnt=1`}
          title={`Hochzeitsfilm von ${film.paar}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>
    </div>
  );
}

export function Filmkachel({ film, gross = false }) {
  const [offen, setOffen] = useState(false);

  return (
    <>
      <div>
        <button
          onClick={() => setOffen(true)}
          aria-label={`Film von ${film.paar} abspielen`}
          className="filmkachel"
          style={{
            position: 'relative', width: '100%', aspectRatio: '16 / 9',
            overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer',
            background: '#000', borderRadius: 'var(--radius)', display: 'block',
          }}
        >
          {film.bild && (
            <Image
              src={film.bild}
              alt={film.alt || `Standbild aus dem Hochzeitsfilm von ${film.paar}`}
              fill
              className="filmkachel-bild"
              sizes={gross ? '(max-width: 900px) 100vw, 90vw' : '(max-width: 900px) 100vw, 45vw'}
              style={{ objectFit: 'cover', transition: 'transform 600ms var(--ease)' }}
            />
          )}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(14,14,13,0.55) 0%, transparent 50%)',
            }}
          />
          <span
            aria-hidden="true"
            className="filmkachel-knopf"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: gross ? '84px' : '64px', height: gross ? '84px' : '64px',
              borderRadius: '50%',
              background: 'rgba(14,14,13,0.45)',
              border: '1px solid rgba(244,244,242,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 300ms var(--ease)',
            }}
          >
            <svg width={gross ? 24 : 18} height={gross ? 24 : 18} viewBox="0 0 24 24"
                 fill="var(--auf-dunkel)" style={{ marginLeft: '3px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {film.laenge && (
            <span style={{
              position: 'absolute', bottom: '0.9rem', right: '1rem',
              fontSize: '0.8125rem', color: 'rgba(244,244,242,0.85)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {film.laenge}
            </span>
          )}
        </button>

        <div style={{ marginTop: 'var(--luft-2)' }}>
          <p className="t-klein" style={{ color: 'var(--auf-dunkel)' }}>{film.paar}</p>
          {film.ort && (
            <p style={{ fontSize: 'var(--schrift-fein)', color: 'var(--grau-dunkel)', marginTop: 'var(--luft-1)' }}>
              {film.ort}
            </p>
          )}
        </div>
      </div>

      {offen && <Abspieler film={film} schliessen={() => setOffen(false)} />}
    </>
  );
}

export function KeineFilme({ knapp = false }) {
  return (
    <div style={{
      border: '1px solid rgba(244,244,242,0.14)',
      borderRadius: 'var(--radius)',
      padding: knapp ? 'var(--luft-5)' : 'var(--luft-6)',
      textAlign: 'center',
    }}>
      <p className="t-klein" style={{ color: 'var(--auf-dunkel)', marginBottom: 'var(--luft-1)' }}>
        Die Filme kommen in Kürze
      </p>
      <p style={{
        fontSize: 'var(--schrift-text)', color: 'var(--grau-dunkel)',
        maxWidth: '46ch', margin: 0, lineHeight: 1.7,
      }}>
        Wir stellen gerade eine Auswahl unserer Arbeiten zusammen. Wenn ihr
        vorher etwas sehen wollt, schreibt uns kurz. Wir schicken euch gerne
        einen Film, der zu eurem Tag passt.
      </p>
    </div>
  );
}
