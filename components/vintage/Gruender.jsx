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

/* Test fuer Danilo (Nevio 26.10.2026), Vorbild "About me"-Layout: kleine Zeile,
   dahinter gross und hell der Name, davor das freigestellte Foto (weisser Grund
   per multiply ins Papier), rechts daneben der Text im Blocksatz. */
function Plakat({ person }) {
  const ref = useRef(null);
  const sichtbar = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  return (
    <motion.article
      ref={ref} className={`gruender-plakat${typeof person.plakat === 'string' ? ` gruender-plakat--${person.plakat}` : ''}`}
      initial={{ opacity: 0, y: 30 }} animate={sichtbar ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease }}
    >
      <p className="plakat-name" aria-hidden="true">
        {person.name.split(' ').map((w, i) => <span key={w} className={typeof person.plakat === 'string' ? undefined : 'plakat-wort'}>{w}{i === 0 && typeof person.plakat !== 'string' ? ' ' : ''}</span>)}
      </p>
      <div className="plakat-unten">
        <div className="plakat-foto">
          {/* Freigestellt (PNG mit Transparenz), damit die Person vor dem Namen steht */}
          <Image src={person.freigestellt || person.bild} alt={person.name} width={1086} height={1448} sizes="(max-width: 900px) 60vw, 360px" quality={85} />
        </div>
        <div className="plakat-text">
          {(person.bioLang || [person.bio]).map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
        </div>
      </div>
    </motion.article>
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
          {gruender.leute.map((p, i) => p.plakat ? <Plakat key={p.name} person={p} /> : (
            <article key={p.name} className="gruender-zeile">
              <Portraet person={p} index={i} />
              <div>
                <h3 className="gruender-name">{p.name}</h3>
                {(p.bioLang || [p.bio]).map((t) => <p key={t.slice(0, 24)} className="v-text">{t}</p>)}
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
        .gruender-rahmen { position: relative; --r: 0deg; transform: rotate(var(--r)); transition: transform 600ms var(--v-ease); }
        .gruender-foto { transition: box-shadow 600ms var(--v-ease); }
        /* Hover: der Abzug hebt sich, dreht gerade und kommt nach vorne */
        @media (hover: hover) {
          .gruender-rahmen:hover { transform: rotate(0deg) translateY(-14px) scale(1.05); z-index: 6; }
          .gruender-rahmen:hover .gruender-foto { box-shadow: 0 34px 56px -14px rgba(0, 0, 0, .65); }
        }
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
        .gruender-raster { position: relative; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(32px, 4vw, 64px); align-items: center; max-width: 1300px; }
        .gruender-collage { position: relative; height: clamp(480px, 50vw, 740px); }
        .gruender-collage .gruender-rahmen { position: absolute; width: 40%; }
        .gruender-rahmen--0 { left: 0; top: 2%; --r: -3deg; }
        .gruender-rahmen--1 { left: 30%; top: 40%; z-index: 2; --r: 1.5deg; }
        .gruender-rahmen--2 { right: 0; top: 0; --r: 3deg; }
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
        .gruender-zeile .v-text + .v-text { margin-top: 14px; }
        .gruender-zeile:nth-child(even) .gruender-rahmen { order: 2; }

        /* Danilo als Plakat (Test) */
        .gruender-plakat { --nf: clamp(44px, 7vw, 100px); position: relative; padding-top: calc(var(--nf) * .55); max-width: 860px; margin-inline: auto; width: 100%; }
        .plakat-name {
          position: relative; z-index: 0; margin: 0; text-align: center; white-space: nowrap;
          font-family: var(--font-display), Georgia, serif; font-weight: 500; text-transform: uppercase; letter-spacing: -.01em;
          font-size: var(--nf); line-height: .9; color: color-mix(in srgb, var(--tinte) 11%, transparent);
          transform: scaleY(1.55); transform-origin: 50% 100%;
        }
        .plakat-unten { position: relative; display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: clamp(18px, 2.4vw, 30px); align-items: start; margin-top: calc(var(--nf) * -1.55); }
        .plakat-text { margin-top: calc(var(--nf) * 1.75); }
        .plakat-foto { position: relative; }
        .plakat-foto img { width: 100%; height: auto; display: block; filter: drop-shadow(0 18px 22px rgba(46, 43, 34, .12)); }
        .plakat-text { padding-bottom: 8px; color: var(--tinte); font-family: var(--font-text), system-ui, sans-serif; font-size: 14.5px; line-height: 1.5; }
        .plakat-text p { margin: 0; text-align: justify; hyphens: auto; -webkit-hyphens: auto; }
        .plakat-text p + p { margin-top: 10px; }
        /* Nevio: gleiche Bausteine, anders gesetzt. Der Name liegt auf Hoehe des
           Laptops hinter dem Foto, der Text steht darunter rechts */
        .gruender-plakat--unten {
          --nf: clamp(40px, 5.4vw, 78px); padding-top: 0;
          display: grid; grid-template-columns: minmax(0, 360px) minmax(0, 1fr); grid-template-rows: clamp(120px, 12vw, 170px) auto auto; column-gap: clamp(18px, 2.4vw, 30px);
        }
        .gruender-plakat--unten .plakat-unten { display: contents; }
        /* Name rechts neben Nevio, zweizeilig, damit er lesbar bleibt */
        .gruender-plakat--unten .plakat-name { grid-column: 2; grid-row: 2; justify-self: start; margin-left: calc(var(--nf) * -.6); text-align: left; white-space: normal; line-height: .82; }
        .gruender-plakat--unten .plakat-name span { display: block; }
        .gruender-plakat--unten .plakat-foto { position: relative; grid-column: 1; grid-row: 1 / span 3; align-self: start; }
        .gruender-plakat--unten .plakat-text { grid-column: 2; grid-row: 3; margin-top: 0; padding-top: 16px; }
        /* Kati: gespiegelt. Foto rechts, Name zweizeilig links, die Kamera in ihrer
           Hand zeigt in den Namen; Text unter dem Namen */
        .gruender-plakat--rechts {
          --nf: clamp(44px, 6.2vw, 90px); padding-top: calc(var(--nf) * .55);
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 360px); grid-template-rows: auto auto; column-gap: clamp(18px, 2.4vw, 30px);
        }
        .gruender-plakat--rechts .plakat-unten { display: contents; }
        .gruender-plakat--rechts .plakat-name { grid-column: 1; grid-row: 1; justify-self: end; margin-right: calc(var(--nf) * -1.9); text-align: right; white-space: normal; line-height: .82; align-self: end; }
        .gruender-plakat--rechts .plakat-name span { display: block; }
        .gruender-plakat--rechts .plakat-foto { grid-column: 2; grid-row: 1 / span 2; align-self: end; }
        .gruender-plakat--rechts .plakat-text { grid-column: 1; grid-row: 2; margin-top: 0; padding-top: 22px; padding-bottom: 8px; }
        /* Handy (Nevio 28.10.2026: Fotos fehlten, bei Kati war alles verschoben).
           Alle drei gleich: Name gross und blass oben, die Person steht davor und
           verdeckt den unteren Teil des Namens, darunter der Text ueber die volle
           Breite. Alle Gitter-Positionen vom Desktop zuruecksetzen. */
        @media (max-width: 760px) {
          .gruender-plakat, .gruender-plakat--unten, .gruender-plakat--rechts { --nf: clamp(30px, 9.6vw, 60px); display: block; padding-top: 0; }
          .gruender-plakat .plakat-unten { display: block; margin-top: 0; }
          .gruender-plakat .plakat-name { grid-column: auto; grid-row: auto; margin: 0; justify-self: auto; text-align: center; white-space: normal; transform: none; line-height: .86; }
          .gruender-plakat .plakat-name span { display: block; }
          .gruender-plakat .plakat-foto { position: relative; z-index: 1; width: 68%; max-width: 280px; margin: calc(var(--nf) * -.95) auto 0; }
          /* Alle drei mit demselben Abstand Kopf zu Name wie bei Danilo (Nevio
             28.10.2026). Die Koepfe sitzen in den freigestellten Fotos verschieden
             hoch (oberste Kante: Danilo 16,9 %, Kati 29,6 %, Nevio 8,9 % der
             Bildhoehe), das gleicht der Versatz aus. Fotohoehe = 4/3 der Breite. */
          .gruender-plakat--rechts .plakat-foto { margin-top: calc(var(--nf) * -.95 - .169 * min(68%, 280px)); }
          .gruender-plakat--unten .plakat-foto { margin-top: calc(var(--nf) * -.95 + .107 * min(68%, 280px)); }
          .gruender-plakat .plakat-text { grid-column: auto; grid-row: auto; margin-top: 18px; padding-top: 0; }
          .gruender-plakat .plakat-text p { text-align: left; hyphens: manual; -webkit-hyphens: manual; }
        }


        @media (max-width: 900px) {
          .gruender-raster { grid-template-columns: minmax(0, 1fr); }
          .gruender-collage { height: auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding-top: 24px; }
          .gruender-collage .gruender-rahmen { position: relative; width: auto; left: auto; right: auto; top: auto; bottom: auto; }
          .gruender-zeile, .gruender-zeile:nth-child(even) { grid-template-columns: 1fr; }
          .gruender-zeile:nth-child(even) .gruender-rahmen { order: 0; }
        }
      ` }} />
    </>
  );
}
