'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* Titel in Antiqua-Versalien. Ein Wort in *Sternchen* steht in
   Schreibschrift (STYLE.md, Schriften).

   Beim Erscheinen gleiten die Woerter einzeln aus einer Maske nach oben,
   Zeile fuer Zeile aufgebaut. Vorbild: der Headline-Reveal auf
   giomediamarketing.de, Danilos Referenz. Nur fuer Haupttitel, nicht als
   Standard fuer jeden Text. */

const ease = [0.22, 1, 0.36, 1];

export function zerlegen(text) {
  const teile = [];
  const muster = /\*([^*]+)\*|(\S+)/g;
  let m;
  while ((m = muster.exec(text))) teile.push(m[1] ? { wort: m[1], schrift: true } : { wort: m[2], schrift: false });
  return teile;
}

export default function Titel({ text, als: Tag = 'h2', className = 'v-titel', verzoegerung = 0 }) {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const teile = zerlegen(text);

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {teile.map((t, i) => (
        <span key={i} aria-hidden="true">
          <span className={`titel-maske${t.schrift ? ' titel-maske--schrift' : ''}`}>
            <motion.span
              className="titel-wort"
              initial={{ y: '115%' }}
              animate={sichtbar ? { y: '0%' } : { y: '115%' }}
              transition={{ duration: 1.05, ease, delay: verzoegerung + i * 0.055 }}
            >
              {t.schrift ? <em>{t.wort}</em> : t.wort}
            </motion.span>
          </span>
          {i < teile.length - 1 ? ' ' : null}
        </span>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        .titel-maske { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: .1em; margin-bottom: -.1em; }
        /* Schreibschrift hat lange Schwuenge: mehr Luft, damit nichts abgeschnitten wird */
        .titel-maske--schrift { padding: .28em .18em .22em; margin: -.28em -.18em -.22em; }
        .titel-wort { display: inline-block; will-change: transform; }
      ` }} />
    </Tag>
  );
}
