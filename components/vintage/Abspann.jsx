'use client';

import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { seiteVideoWolfsburg as s } from '@/content/texte';

/* Paketinhalt auf /hochzeitsvideo-wolfsburg als Kino-Abspann (Nevio
   29.10.2026: "nicht einfach hinballern"). Eine Leinwand mit
   Perforation an den Seiten und Projektorlicht von oben, darin die
   Punkte wie echte Credits: Rolle rechtsbuendig links, Inhalt links-
   buendig rechts, in der Mitte ein feiner Steg. Am Ende der Preis als
   Schlusstafel mit Knopf.

   Desktop: beim Hereinscrollen flackert das Licht an, die Zeilen steigen
   nacheinander aus der Unschaerfe hoch, beim Weiterscrollen wandert der
   Abspann leicht nach oben. Hover: Lichtstreif ueber die Zeile, Rolle
   wird hell. Handy: alles steht ruhig da, Rolle ueber Inhalt.
   Nur transform/opacity/filter, Text steht komplett im HTML. */

const ease = [0.22, 1, 0.36, 1];

export default function Abspann() {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -18% 0px' });
  const ohneBewegung = useReducedMotion();
  const [handy, setHandy] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const an = () => setHandy(mq.matches);
    an();
    mq.addEventListener('change', an);
    return () => mq.removeEventListener('change', an);
  }, []);
  const still = ohneBewegung || handy;
  const an = still || sichtbar;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rollen = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <div ref={ref} className="ab">
      <motion.span className="ab-licht" aria-hidden="true"
        initial={false}
        animate={an ? { opacity: still ? 1 : [0, 0.7, 0.25, 0.9, 0.6, 1] } : { opacity: 0 }}
        transition={{ duration: 1.3, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }} />
      <span className="ab-perfo ab-perfo-l" aria-hidden="true" />
      <span className="ab-perfo ab-perfo-r" aria-hidden="true" />

      <motion.div className="ab-rolle" style={still ? undefined : { y: rollen }}>
        <motion.p className="ab-vorspann"
          initial={false}
          animate={an ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, ease, delay: still ? 0 : 0.5 }}>
          Amoriva Films präsentiert
        </motion.p>

        <dl className="ab-liste">
          {s.inhalt.map((z, i) => (
            <motion.div key={z.rolle} className="ab-zeile"
              initial={false}
              animate={an ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease, delay: still ? 0 : 0.75 + i * 0.16 }}>
              <dt>{z.rolle}</dt>
              <span className="ab-steg" aria-hidden="true" />
              <dd>{z.wert}</dd>
            </motion.div>
          ))}
        </dl>

        {/* Schluss: was uns ausmacht, vier Filmbilder */}
        <div className="ab-ende">
          <motion.p className="ab-ende-titel"
            initial={false}
            animate={an ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, ease, delay: still ? 0 : 0.85 + s.inhalt.length * 0.16 }}>
            <span className="ab-ornament" aria-hidden="true">✦</span>
            <span>{s.ausmachtTitel.split('*').map((t, i) => (i % 2 ? <em key={i}>{t}</em> : t))}</span>
          </motion.p>
          <ul className="ab-usps">
            {s.ausmacht.map((u, i) => (
              <motion.li key={u.titel} className="ab-usp"
                initial={false}
                animate={an ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.9, ease, delay: still ? 0 : 1.05 + s.inhalt.length * 0.16 + i * 0.14 }}>
                <span className="ab-usp-nr" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{u.titel}</h3>
                <p>{u.text}</p>
              </motion.li>
            ))}
          </ul>
          <Link href="/anfrage" className="v-knopf ab-knopf">Termin anfragen</Link>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ab { position: relative; overflow: hidden; margin: 0 auto; max-width: 960px;
          padding: clamp(56px, 7vw, 96px) clamp(48px, 7vw, 100px) clamp(60px, 7vw, 100px);
          border-radius: 6px; background: rgba(8, 7, 4, .34);
          box-shadow: inset 0 0 140px rgba(0, 0, 0, .55), 0 40px 70px -40px rgba(0, 0, 0, .8); }
        /* Projektorlicht: heller Kegel von oben */
        .ab-licht { position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% -8%, rgba(241, 232, 214, .16), rgba(241, 232, 214, .04) 55%, transparent 80%); }
        /* Perforation links und rechts wie am Filmstreifen */
        .ab-perfo { position: absolute; top: 0; bottom: 0; width: 12px; opacity: .5; pointer-events: none;
          background: repeating-linear-gradient(to bottom, transparent 0 14px, rgba(241, 232, 214, .2) 14px 26px); border-radius: 2px; }
        .ab-perfo-l { left: 16px; }
        .ab-perfo-r { right: 16px; }

        .ab-rolle { position: relative; }
        .ab-vorspann { margin: 0 0 clamp(30px, 3.5vw, 46px); font-family: var(--font-schrift), cursive; font-size: clamp(26px, 2.4vw, 34px); line-height: 1.2; color: var(--ton-akzent); }

        .ab-liste { margin: 0; display: flex; flex-direction: column; }
        .ab-zeile { position: relative; display: grid; grid-template-columns: 1fr 56px 1.5fr; align-items: center; padding: 15px 18px; border-radius: 3px; isolation: isolate; }
        /* Lichtstreif beim Hovern */
        .ab-zeile::before { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; opacity: 0;
          background: linear-gradient(100deg, transparent 10%, rgba(241, 232, 214, .07) 45%, rgba(241, 232, 214, .12) 50%, rgba(241, 232, 214, .07) 55%, transparent 90%);
          background-size: 250% 100%; background-position: 100% 0; transition: opacity .4s ease, background-position .9s cubic-bezier(.22, 1, .36, 1); }
        .ab-zeile dt { text-align: right; font-family: var(--font-text), system-ui, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: .3em; text-transform: uppercase;
          color: color-mix(in srgb, var(--ton) 58%, transparent); transition: color .4s ease, letter-spacing .5s cubic-bezier(.22, 1, .36, 1); }
        .ab-steg { justify-self: center; align-self: center; width: 22px; height: 1px; background: var(--ton-akzent); opacity: .5; transition: width .5s cubic-bezier(.22, 1, .36, 1), opacity .4s ease; }
        .ab-zeile dd { margin: 0; text-align: left; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.3; color: var(--ton);
          transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
        @media (hover: hover) {
          .ab-zeile:hover::before { opacity: 1; background-position: 0 0; }
          .ab-zeile:hover dt { color: var(--ton-akzent); letter-spacing: .34em; }
          .ab-zeile:hover .ab-steg { width: 38px; opacity: 1; }
          .ab-zeile:hover dd { transform: translateX(4px); }
        }

        /* Schlusstafel */
        .ab-ende { margin-top: clamp(40px, 4.5vw, 60px); display: flex; flex-direction: column; align-items: center; }
        .ab-ende-titel { margin: 0; display: flex; flex-direction: column; align-items: center; font-family: var(--font-display), Georgia, serif; font-weight: 500;
          font-size: clamp(26px, 2.6vw, 36px); letter-spacing: .08em; text-transform: uppercase; color: var(--ton); }
        .ab-ende-titel em { font-family: var(--font-schrift), cursive; font-style: normal; text-transform: none; letter-spacing: 0; font-size: 1.25em; color: var(--ton-akzent); margin-left: .2em; }
        .ab-ornament { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; font-size: 12px; color: var(--ton-akzent); }
        .ab-ornament::before, .ab-ornament::after { content: ''; width: 64px; height: 1px; background: currentColor; opacity: .55; }
        /* USPs als Filmbilder: abgerundetes Fenster wie ein 35-mm-Bild,
           Hover: Projektorlicht faellt hinein, Bild hebt sich leicht */
        .ab-usps { list-style: none; margin: clamp(28px, 3.4vw, 44px) 0 0; padding: 0; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; text-align: left; }
        .ab-usp { position: relative; overflow: hidden; padding: 26px 26px 28px; border-radius: 14px / 10px;
          border: 1px solid color-mix(in srgb, var(--ton) 16%, transparent); background: rgba(241, 232, 214, .035);
          transition: transform .55s cubic-bezier(.22, 1, .36, 1), border-color .5s ease, background-color .5s ease, box-shadow .5s ease; }
        .ab-usp::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: radial-gradient(ellipse 90% 80% at 50% 0%, rgba(241, 232, 214, .14), transparent 70%); transition: opacity .6s ease; }
        .ab-usp-nr { display: block; font-family: var(--font-display), Georgia, serif; font-style: italic; font-size: 18px; color: var(--ton-akzent); transition: letter-spacing .5s cubic-bezier(.22, 1, .36, 1); }
        .ab-usp h3 { margin: 10px 0 0; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(20px, 1.8vw, 23px); line-height: 1.25; color: var(--ton); }
        .ab-usp p { margin: 10px 0 0; font-family: var(--font-text), system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: color-mix(in srgb, var(--ton) 72%, transparent); }
        @media (hover: hover) {
          .ab-usp:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--ton-akzent) 55%, transparent);
            background-color: rgba(241, 232, 214, .06); box-shadow: 0 24px 40px -24px rgba(0, 0, 0, .75); }
          .ab-usp:hover::before { opacity: 1; }
          .ab-usp:hover .ab-usp-nr { letter-spacing: .12em; }
        }
        .ab-knopf { margin-top: clamp(32px, 3.6vw, 44px); }

        @media (prefers-reduced-motion: reduce) { .ab-zeile::before, .ab-zeile dt, .ab-steg, .ab-zeile dd, .ab-usp, .ab-usp::before { transition: none; } .ab-usp:hover { transform: none; } }

        @media (max-width: 760px) {
          .ab { padding: 44px 30px 48px; box-shadow: inset 0 0 80px rgba(0, 0, 0, .5); }
          .ab-perfo { width: 8px; }
          .ab-perfo-l { left: 9px; }
          .ab-perfo-r { right: 9px; }
          .ab-zeile { grid-template-columns: 1fr; justify-items: center; gap: 6px; padding: 14px 0; text-align: center; }
          .ab-zeile dt { text-align: center; font-size: 11px; letter-spacing: .26em; }
          .ab-zeile dd { text-align: center; font-size: 19px; }
          .ab-steg { display: none; }
          .ab-zeile + .ab-zeile { border-top: 1px solid color-mix(in srgb, var(--ton) 10%, transparent); }
          .ab-ornament::before, .ab-ornament::after { width: 44px; }
          .ab-usps { grid-template-columns: 1fr; gap: 12px; }
          .ab-usp { padding: 20px 20px 22px; }
          .ab-usp p { font-size: 14.5px; }
        }
      ` }} />
    </div>
  );
}
