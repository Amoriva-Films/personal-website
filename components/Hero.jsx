'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // muted muss zusaetzlich am Element gesetzt werden, sonst verweigern
    // manche Browser das automatische Abspielen.
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  /* data-dunkler-kopf ist die Markierung fuer die Kopfzeile: nur ueber
     DIESEM Abschnitt darf sie sich hell faerben. Ohne die Markierung stand
     helle Schrift auf hellem Grund - auf fuenf von sechs Unterseiten, mit
     1,06 zu 1, also praktisch unsichtbar. */
  return (
    <section
      data-dunkler-kopf=""
      style={{
        position: 'relative',
        width: '100%',
        height: '82svh',
        minHeight: '560px',
        overflow: 'hidden',
        background: 'var(--leinwand)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center center',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Zwei Schichten Abdunklung.

          Unten: Verlauf fuer Wortmarke oben und Verlauf unten.

          Darueber: ein weicher Schleier hinter dem Textblock. Der ist
          noetig, weil im Video reinweisse Stellen vorkommen. Gemessen
          ueber die ganze Laufzeit lag der Kontrast an der hellsten
          Stelle bei 1,5 zu 1 - der Titel war dort praktisch unlesbar.
          Gerechnet braucht es 60 % Deckkraft, damit auch Video-Weiss
          noch 4,5 zu 1 traegt; 65 % geben etwas Reserve. Weil der
          Schleier radial ausläuft, bleibt das Bild am Rand offen.

          Nachgezogen am 19.09.2026: Eine Messung an fuenf Stellen ergab
          viermal ueber 15, einmal nur 5,8 - dort, wo der Titel ueber ein
          helles Gesicht laeuft. Das bestand zwar, aber knapp, und
          gemessen war nur ein einziges Videobild. Verlauf und Schleier
          sind deshalb kraeftiger: rechnerisch 9,6 zu 1 selbst bei
          reinweissem Bild hinter der Schrift. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(14,14,13,0.58) 0%, rgba(14,14,13,0.24) 30%, rgba(14,14,13,0.30) 60%, rgba(14,14,13,0.78) 100%), '
            + 'linear-gradient(to right, rgba(14,14,13,0.55) 0%, rgba(14,14,13,0.18) 46%, transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            // Der Schleier sass mittig, solange der Titel mittig stand. Jetzt
            // steht der Titel links, also liegt auch der dunkelste Punkt
            // links - sonst schuetzt die Abdunklung leeres Bild und laesst
            // die Schrift ungeschuetzt.
            'radial-gradient(ellipse 70% 78% at 26% 50%, rgba(14,14,13,0.80) 0%, rgba(14,14,13,0.62) 42%, rgba(14,14,13,0.18) 76%, transparent 100%)',
        }}
      />

      {/* Der Titel stand mittig, wie auf jeder zweiten Hochzeitsseite.
          Jetzt steht er links auf derselben Kante wie alles darunter -
          die senkrechte Linie beginnt schon im ersten Bild und laeuft
          durch bis zur Fusszeile. Der Schnitt ist von amoriva.app. */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center',
        }}
      >
        <div className="bahn" style={{ width: '100%' }}>
          {/* Breite in Pixeln, nicht in ch: ch rechnet auf der Schriftgroesse
              DIESES Kastens (17 px), nicht auf der der Ueberschrift. Mit
              15ch stand hier ein Wort pro Zeile.                        */}
          <div style={{ maxWidth: 'min(640px, 58%)' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.8, ease }}
              className="t-label"
              style={{ color: 'rgba(244,244,242,0.62)', marginBottom: 'var(--luft-3)' }}
            >
              Hochzeitsfilm &amp; Fotografie
            </motion.p>

            {/* Der Name steht oben links als Wortmarke. Hier steht deshalb das,
                was ein Paar bekommt, nicht noch einmal der Name. */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="t-display"
              style={{ color: 'var(--auf-dunkel)', marginBottom: 'var(--luft-3)' }}
            >
              Euer Tag, wie er sich <span className="kursiv">angefühlt hat.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.9, ease }}
              style={{
                fontSize: 'var(--schrift-text)',
                lineHeight: 1.6,
                color: 'rgba(244,244,242,0.82)',
                maxWidth: '42ch',
                marginBottom: 'var(--luft-4)',
              }}
            >
              Mit Sitz in Niedersachsen, für Hochzeiten auf der ganzen Welt.
            </motion.p>

            {/* Ein gefuellter Weg und ein leiser daneben, wie auf
                amoriva.app. Zwei Knoepfe, aber nur einer faellt auf. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24, duration: 0.9, ease }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--luft-2)' }}
            >
              <Link href="/anfrage" className="knopf knopf-voll">
                Termin anfragen
              </Link>
              {/* Zeigte auf die Galerie. Die ist raus, also fuehrt der
                  zweite Weg jetzt zu den Leistungen - dem einzigen Ort,
                  an dem noch etwas zu sehen ist. */}
              <Link href="/leistungen" className="knopf knopf-linie"
                    style={{ color: 'var(--auf-dunkel)', borderColor: 'rgba(244,244,242,0.35)' }}>
                Leistungen ansehen
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 3,
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(244,244,242,0.45), transparent)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
