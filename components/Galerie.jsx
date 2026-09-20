'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

/* Einfaches Raster, das auf dem Handy einspaltig wird. Bewusst kein
   Mauerwerk-Layout: dort springen die Hoehen, und beim Nachladen ruckt
   alles einmal durch. */

function Lupe({ bilder, start, schliessen }) {
  const [i, setI] = useState(start);
  const vor = useCallback(() => setI(n => (n + 1) % bilder.length), [bilder.length]);
  const zurueck = useCallback(() => setI(n => (n - 1 + bilder.length) % bilder.length), [bilder.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') schliessen();
      if (e.key === 'ArrowRight') vor();
      if (e.key === 'ArrowLeft') zurueck();
    };
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = vorher;
      window.removeEventListener('keydown', onKey);
    };
  }, [schliessen, vor, zurueck]);

  const bild = bilder[i];

  return (
    <div
      onClick={schliessen}
      role="dialog"
      aria-modal="true"
      aria-label="Bild vergrößert"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(14,14,13,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 5vw, 4rem)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bild.src}
        alt={bild.alt}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '86vh', maxWidth: '100%', objectFit: 'contain' }}
      />

      {[
        { label: 'Schließen',       pos: { top: '1.25rem', right: '1.25rem' }, tun: schliessen,
          pfad: <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></> },
        { label: 'Vorheriges Bild', pos: { left: '1.25rem', top: '50%' },  tun: zurueck,
          pfad: <polyline points="15 5 8 12 15 19" /> },
        { label: 'Nächstes Bild',   pos: { right: '1.25rem', top: '50%' }, tun: vor,
          pfad: <polyline points="9 5 16 12 9 19" /> },
      ].map(({ label, pos, tun, pfad }) => (
        <button
          key={label}
          onClick={e => { e.stopPropagation(); tun(); }}
          aria-label={label}
          style={{
            position: 'absolute', ...pos,
            transform: pos.top === '50%' ? 'translateY(-50%)' : 'none',
            width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid rgba(244,244,242,0.25)', background: 'transparent',
            color: 'var(--auf-dunkel)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {pfad}
          </svg>
        </button>
      ))}

      <p style={{
        position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        fontSize: 'var(--schrift-fein)', color: 'var(--grau-dunkel)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {i + 1} / {bilder.length}
      </p>
    </div>
  );
}

export default function Galerie({ bilder, grenze }) {
  const [lupe, setLupe] = useState(null);
  const zeigen = grenze ? bilder.slice(0, grenze) : bilder;

  if (!zeigen.length) return null;

  return (
    <>
      <div className="galerie-raster">
        {zeigen.map((bild, i) => (
          <button
            key={bild.src + i}
            onClick={() => setLupe(i)}
            aria-label={`${bild.alt}, vergrößern`}
            className="galerie-kachel"
            style={{
              position: 'relative', width: '100%',
              /* Ein Seitenverhaeltnis fuer alle Kacheln. Vorher trugen hohe und
                 quere Bilder ihr eigenes: in einer Reihe endeten die einen
                 195 px tiefer als die anderen, die Unterkante war eine
                 Treppe. Der Ausschnitt uebernimmt das objectFit: cover. */
              aspectRatio: '4 / 5',
              overflow: 'hidden', border: 'none', padding: 0,
              cursor: 'zoom-in', background: '#000', display: 'block',
            }}
          >
            <Image
              src={bild.src}
              alt={bild.alt}
              fill
              className="galerie-bild"
              sizes="(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw"
              style={{ objectFit: 'cover', transition: 'transform 700ms var(--ease)' }}
            />
          </button>
        ))}
      </div>

      {lupe !== null && (
        <Lupe bilder={zeigen} start={lupe} schliessen={() => setLupe(null)} />
      )}
    </>
  );
}
