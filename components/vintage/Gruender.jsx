'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Titel from './Titel';
import { gruender } from '@/content/texte';

/* Die Gruender. Board:
   - "Andere Loesung finden, dass die Bilder von uns vollstaendig gesehen
     werden + Animation (Zoom)." Die Fotos stehen im vollen 3:4-Format.
   - "Diese Texte Aufgaben-Bereiche weg! Wir sind ein Team." Keine Rollen.
   - Runde 8: oben auf jedem Foto ein Amoriva-Wachssiegel, als waere der
     Abzug damit angeheftet.
   - 22.10.2026, Startseite: Aufbau nach "Hello there! I'm Tilly" aus der
     Tilly-Roberts-Referenz. Dunkles Oliv-Braun, links die beiden Fotos
     ueberlappend, rechts Titel und Texte, dahinter blass ein Brautstrauss
     als Tuschezeichnung.
   Ausfuehrlich (Unterseite): Papier, Portraet und Text abwechselnd. */

const ease = [0.22, 1, 0.36, 1];

function Portraet({ person, index, klasse = '' }) {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  return (
    <div ref={ref} className={`gruender-rahmen ${klasse}`}>
      <div className="gruender-foto">
        <motion.div
          className="gruender-zoom"
          initial={{ scale: 1.16 }}
          animate={sichtbar ? { scale: 1 } : { scale: 1.16 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image src={person.bild} alt={person.name} width={1086} height={1448} sizes="(max-width: 900px) 70vw, 26vw" quality={85} />
        </motion.div>
      </div>
      <motion.span
        className="gruender-siegel" aria-hidden="true"
        initial={{ scale: 1.8, opacity: 0, rotate: index ? 14 : -18 }}
        animate={sichtbar ? { scale: [1.8, 0.94, 1], opacity: [0, 1, 1], rotate: index ? 9 : -11 } : {}}
        transition={{ delay: 0.5 + index * 0.18, duration: 0.55, times: [0, 0.72, 1], ease: 'easeOut' }}
      />
    </div>
  );
}

function Startseite() {
  return (
    <section className="v-abschnitt v-nacht gruender gruender--kurz">
      <span className="v-zeichnung gruender-strauss" style={{ '--bild': 'url(/images/vintage/strauss.webp)' }} aria-hidden="true" />
      <div className="v-bahn gruender-raster">
        <div className="gruender-collage">
          {gruender.leute.map((p, i) => <Portraet key={p.name} person={p} index={i} klasse={`gruender-rahmen--${i}`} />)}
        </div>
        <div className="gruender-text">
          <p className="v-zeile">{gruender.zeile}</p>
          <Titel text={gruender.titel} className="v-titel gruender-titel" />
          {gruender.leute.map((p) => (
            <div key={p.name} className="gruender-person">
              <h3 className="gruender-name">{p.name}</h3>
              <p className="v-text">{p.bio}</p>
            </div>
          ))}
          <Link href="/ueber-uns" className="v-knopf">{gruender.knopf}</Link>
        </div>
      </div>
    </section>
  );
}

function Ausfuehrlich() {
  return (
    <section className="v-abschnitt v-papier gruender gruender--lang">
      <span className="v-riss" aria-hidden="true" />
      <div className="v-bahn">
        <header className="gruender-kopf">
          <p className="v-zeile">{gruender.zeile}</p>
          <Titel text={gruender.titel} />
        </header>
        <div className="gruender-liste">
          {gruender.leute.map((p, i) => (
            <article key={p.name} className="gruender-zeile">
              <Portraet person={p} index={i} />
              <div>
                <h3 className="gruender-name">{p.name}</h3>
                <p className="v-text">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Gruender({ ausfuehrlich = false }) {
  return (
    <>
      {ausfuehrlich ? <Ausfuehrlich /> : <Startseite />}
      <style dangerouslySetInnerHTML={{ __html: `
        .gruender { position: relative; overflow-x: clip; }
        .gruender-rahmen { position: relative; }
        .gruender-foto { aspect-ratio: 3 / 4; overflow: hidden; background: var(--sand-hell); box-shadow: 0 22px 40px -16px rgba(0, 0, 0, .5); }
        .gruender-zoom { width: 100%; height: 100%; }
        .gruender-zoom img { width: 100%; height: 100%; object-fit: cover; filter: sepia(.12) brightness(.96); }
        @media (hover: hover) { .gruender-foto img { transition: transform 900ms var(--v-ease); } .gruender-rahmen:hover .gruender-foto img { transform: scale(1.04); } }
        .gruender-siegel {
          position: absolute; top: 0; left: 50%; width: 21%; aspect-ratio: 1; margin: -10.5% 0 0 -10.5%; z-index: 2;
          background: var(--v-siegel) center / contain no-repeat; filter: drop-shadow(0 5px 6px rgba(0, 0, 0, .4));
        }
        .gruender-name { margin: 0 0 6px; font-family: var(--font-display), Georgia, serif; font-weight: 500; font-size: clamp(18px, 1.5vw, 22px); text-transform: uppercase; letter-spacing: .08em; }

        /* Startseite: Tilly-Aufbau */
        .gruender--kurz.v-abschnitt { padding-block: clamp(64px, 7vw, 110px); }
        .gruender-strauss { position: absolute; right: 3%; top: 50%; width: clamp(240px, 28vw, 420px); aspect-ratio: 4 / 5; transform: translateY(-50%) rotate(6deg); color: var(--khaki); opacity: .16; }
        .gruender-raster { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(40px, 6vw, 96px); align-items: center; max-width: 1180px; }
        .gruender-collage { position: relative; height: clamp(420px, 40vw, 580px); }
        .gruender-collage .gruender-rahmen { position: absolute; width: 54%; }
        .gruender-rahmen--0 { left: 0; top: 4%; transform: rotate(-2deg); }
        .gruender-rahmen--1 { right: 2%; bottom: 0; transform: rotate(2.5deg); }
        .gruender-text { position: relative; }
        .gruender-titel { text-transform: none; letter-spacing: .01em; font-size: clamp(32px, 3.4vw, 52px); line-height: 1.08; margin-bottom: clamp(22px, 2.4vw, 30px); }
        .gruender-person { margin-bottom: 20px; max-width: 52ch; }
        .gruender-person .v-text { font-size: 15.5px; line-height: 1.7; }
        .gruender-text .v-knopf { margin-top: 10px; }

        /* Unterseite: Papier, abwechselnd */
        .gruender--lang .gruender-kopf { text-align: center; max-width: 820px; margin: 0 auto clamp(48px, 6vw, 88px); }
        .gruender-liste { display: grid; gap: clamp(64px, 8vw, 120px); max-width: 1040px; margin-inline: auto; }
        .gruender-zeile { display: grid; grid-template-columns: minmax(260px, 380px) 1fr; gap: clamp(32px, 6vw, 96px); align-items: center; }
        .gruender-zeile:nth-child(even) { grid-template-columns: 1fr minmax(260px, 380px); }
        .gruender-zeile:nth-child(even) .gruender-rahmen { order: 2; }

        @media (max-width: 900px) {
          .gruender-raster { grid-template-columns: minmax(0, 1fr); }
          .gruender-collage { height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding-top: 24px; }
          .gruender-collage .gruender-rahmen { position: relative; width: auto; left: auto; right: auto; top: auto; bottom: auto; }
          .gruender-zeile, .gruender-zeile:nth-child(even) { grid-template-columns: 1fr; }
          .gruender-zeile:nth-child(even) .gruender-rahmen { order: 0; }
        }
      ` }} />
    </>
  );
}
