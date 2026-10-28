'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Titel from './Titel';
import { arbeit, anfrage } from '@/content/texte';

/* "Unsere Arbeit". Vorbild (Danilo 22.10.2026): "An Ode to your Memories"
   aus der Tilly-Roberts-Referenz im Board. Text mittig, links und rechts je
   ein grosses, blasses Bild und davor ein kleines, scharfes, leicht
   versetzt. Dazu ein Farnzweig als Tuschezeichnung.

   Effekt: die kleinen Bilder wandern beim Scrollen schneller als die
   blassen, dadurch entsteht Tiefe. */

function Stapel({ blass, scharf, seite, p }) {
  const yBlass = useTransform(p, [0, 1], [30, -30]);
  const yScharf = useTransform(p, [0, 1], [70, -70]);
  return (
    <div className={`ode-stapel ode-stapel--${seite}`} aria-hidden={!scharf.alt}>
      <motion.div className="ode-blass" style={{ y: yBlass }}>
        <Image src={blass.src} alt="" width={blass.b} height={blass.h} sizes="(max-width: 900px) 60vw, 26vw" quality={70} />
      </motion.div>
      <motion.div className="ode-scharf" style={{ y: yScharf }}>
        <Image src={scharf.src} alt={scharf.alt || ''} width={scharf.b} height={scharf.h} sizes="(max-width: 900px) 40vw, 14vw" quality={82} />
      </motion.div>
    </div>
  );
}

export default function Arbeit() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const c = arbeit.collage;

  return (
    <section ref={ref} className="v-abschnitt v-papier arbeit">
      <div className="v-bahn ode">
        <Stapel blass={c.linksBlass} scharf={c.linksScharf} seite="links" p={scrollYProgress} />

        <div className="ode-mitte">
          <p className="v-zeile">{arbeit.zeile}</p>
          <Titel text={arbeit.titel} />
          <p className="v-text">{arbeit.links}</p>
          <p className="v-text">{arbeit.rechts}</p>
          <p className="ode-unterschrift v-schrift">{arbeit.unterschrift}</p>
          <Link href={anfrage.href} className="v-knopf">{arbeit.knopf}</Link>
        </div>

        <Stapel blass={c.rechtsBlass} scharf={c.rechtsScharf} seite="rechts" p={scrollYProgress} />
      </div>

      <span className="v-zeichnung ode-farn" style={{ '--bild': 'url(/images/vintage/farn.webp)' }} aria-hidden="true" />

      <style dangerouslySetInnerHTML={{ __html: `
        .arbeit { overflow: clip; }
        .ode {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 540px) minmax(0, 1fr);
          gap: clamp(28px, 4vw, 64px); align-items: center; max-width: 1360px;
        }
        .ode-mitte { text-align: center; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; }
        .ode-mitte .v-titel { font-size: clamp(26px, 2.6vw, 40px); margin-bottom: clamp(20px, 2.2vw, 28px); }
        .ode-mitte .v-text { max-width: 46ch; }
        .ode-mitte .v-text + .v-text { margin-top: 14px; }
        .ode-unterschrift { margin: clamp(18px, 2vw, 26px) 0 clamp(22px, 2.4vw, 30px); font-size: clamp(28px, 2.4vw, 38px); line-height: 1; color: var(--ton-akzent); transform: rotate(-4deg); }

        .ode-stapel { position: relative; height: clamp(380px, 38vw, 560px); }
        .ode-blass, .ode-scharf { position: absolute; overflow: hidden; }
        .ode-blass img, .ode-scharf img { width: 100%; height: 100%; object-fit: cover; display: block; }
        /* Blass: wie ein verblichener Abzug, der im Papier verschwindet */
        .ode-blass { opacity: .4; filter: grayscale(.5) sepia(.25); }
        .ode-scharf { box-shadow: 0 18px 34px -14px rgba(46, 43, 34, .5); outline: 1px solid rgba(46, 43, 34, .25); }
        /* Die zwei kleinen Bilder schweben langsam wie die losen Abzuege im Fuss
           (Nevio 26.10.2026), Hover haelt an und hebt hervor. Die blassen Bilder
           bleiben ruhig im Hintergrund. translate/rotate als eigene Eigenschaften,
           weil transform vom Scroll-Effekt belegt ist. */
        .ode-scharf { --dreh: 0deg; rotate: var(--dreh); z-index: 1; animation: ode-schweben 7s ease-in-out infinite; transition: box-shadow 400ms var(--v-ease); }
        .ode-stapel--links .ode-scharf { --dreh: -3deg; animation-duration: 7.4s; }
        .ode-stapel--rechts .ode-scharf { --dreh: 2.5deg; animation-duration: 6.4s; animation-delay: -2.5s; }
        @keyframes ode-schweben {
          0%, 100% { translate: 0 0; rotate: var(--dreh); }
          50% { translate: 4px -12px; rotate: calc(var(--dreh) * .5); }
        }
        @media (hover: hover) {
          .ode-scharf:hover { animation-play-state: paused; z-index: 3; box-shadow: 0 28px 44px -12px rgba(46, 43, 34, .6); }
        }
        @media (prefers-reduced-motion: reduce) { .ode-scharf { animation: none; } }
        .ode-stapel--links .ode-blass { left: 0; right: 8%; top: 10%; bottom: 0; }
        .ode-stapel--links .ode-scharf { left: 0; top: 0; width: 46%; aspect-ratio: 4 / 5; }
        .ode-stapel--rechts .ode-blass { left: 12%; right: 0; top: 0; bottom: 6%; }
        .ode-stapel--rechts .ode-scharf { left: 0; bottom: 0; width: 58%; aspect-ratio: 5 / 4; }

        .ode-farn { position: absolute; width: clamp(90px, 10vw, 150px); aspect-ratio: 1 / 2; left: 1.5%; bottom: 4%; color: var(--ton-akzent); opacity: .5; transform: rotate(-14deg); }

        @media (max-width: 900px) {
          .ode { grid-template-columns: minmax(0, 1fr); }
          .ode-stapel { height: 300px; max-width: 520px; width: 100%; margin-inline: auto; }
          .ode-stapel--rechts { display: none; }
          .ode-farn { display: none; }
        }
      ` }} />
    </section>
  );
}
