'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Wortmarke from '@/components/Wortmarke';
import Titel from './Titel';
import { anfrage, fuss, marke, navigation, navigationMehr } from '@/content/texte';

/* Fusszeile. Vorbild: die Footer-Referenz im Board ("Let's create
   something beautiful together"): oben ein breites Schwarzweiss-Bild mit
   grosser Zeile, darunter eine dunkle Leiste mit Marke, Wegen, Kontakt und
   einem kleinen Bildraster. Die Zeile ist der Claim aus dem Vault
   (00 Kontext/Branding).

   Effekt: das Bild bewegt sich beim Scrollen langsamer als die Seite.

   Danilo 22.10.2026: das Schwarz-Grau passte nicht mehr. Neu nach seiner
   Referenz "Your story deserves to be held eternally": das Bild als
   breites, sepiafarbenes Banner in einem Passepartout (helle Kante, Khaki-
   Linie aussen), ein Satz in feiner Antiqua darauf. Danach (22.10.2026):
   der Fuss liegt auf dem Oliv-Braun mit Vintage-Oberflaeche wie "Wir sind
   ein Team". */

const SEITEN = [...navigation, ...navigationMehr, anfrage];

export default function Fuss() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <footer className="fuss v-nacht">
      <div className="fuss-banner">
      <div ref={ref} className="fuss-bild">
        <motion.div className="fuss-bild-innen" style={{ y }}>
          <Image src={fuss.bild.src} alt={fuss.bild.alt} fill sizes="100vw" quality={80} />
        </motion.div>
        <div className="fuss-claim">
          <Titel text={fuss.claim} als="p" />
          {/* Runde 8: darunter schlicht der Weg zur Anfrage */}
          <Link href={anfrage.href} className="v-knopf fuss-anfrage">{anfrage.label} stellen</Link>
        </div>
      </div>
      </div>

      <div className="v-bahn fuss-raster">
        <div className="fuss-marke">
          <Wortmarke hoehe={46} />
          <p>{marke.sparte}<br />{marke.ort}</p>
          {/* WeddyPlace-Siegel (30.10.2026). Bild und Link genau so, wie
              WeddyPlace es vorgibt, deshalb einfaches img statt next/image */}
          <a href="https://www.weddyplace.com/vendors/6ae486f49da56f42c53e9226" target="_blank" rel="noopener" className="fuss-siegel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="WeddyPlace" src="https://cdn.weddyplace.com/static/misc/badges/badge-gelistet.png" width="250" height="250" loading="lazy" />
          </a>
        </div>

        <nav aria-label="Fußzeile">
          <p className="v-label fuss-label">{fuss.seiten}</p>
          <ul>
            {SEITEN.map((s) => <li key={s.href}><Link href={s.href} className="fuss-link">{s.label}</Link></li>)}
          </ul>
        </nav>

        <div>
          <p className="v-label fuss-label">{fuss.kontakt}</p>
          <ul>
            <li><a href={marke.mailHref} className="fuss-link">{marke.mail}</a></li>
            <li><a href={marke.telefonHref} className="fuss-link">{marke.telefon}</a></li>
            <li><a href={marke.instagram} target="_blank" rel="noopener noreferrer" className="fuss-link">Instagram</a></li>
          </ul>
        </div>

        <div className="fuss-raster-bilder" aria-hidden="true">
          {/* Verstreut und leicht schwebend, wie lose Abzuege (Danilo 22.10.2026:
              "verspielter, dass die so herumfliegen") */}
          {fuss.bilder.map((b, i) => (
            <span key={b.src} className={`fuss-kachel fuss-kachel--${i}`}>
              <Image src={b.src} alt="" fill sizes="90px" quality={60} />
            </span>
          ))}
        </div>
      </div>

      <div className="v-bahn fuss-leiste">
        <span>{fuss.copyright}</span>
        <span className="fuss-recht">
          {fuss.rechtliches.map((r) => <Link key={r.href} href={r.href} className="fuss-link">{r.label}</Link>)}
        </span>
      </div>

      {/* Ganz unten, halb abgeschnitten: der Name riesig, Ton in Ton
          (Danilo 20.10.2026, Vorbild sein HypnoInside-Footer) */}
      <div className="fuss-riesig" aria-hidden="true">
        {/* Blindpraegung in Schreibschrift, leicht schraeg (Danilo 22.10.2026:
            "kuenstlerisch, schraeg, Schreibschrift, viel cleaner"). Die
            Buchstaben bleiben leer, darin liegt dasselbe Papier wie im Fuss.
            Gezeichnet werden nur weiche Kanten: Licht innen oben links,
            Schatten aussen unten rechts, beide aus einer weichgezeichneten
            Form, damit die Praegung rund und sauber wirkt statt kantig. */}
        <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet" focusable="false">
          <defs>
            <filter id="fuss-praegung" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="weich" />
              <feOffset in="weich" dx="2" dy="2.4" result="weich-versatz" />
              <feComposite in="SourceAlpha" in2="weich-versatz" operator="out" result="kante-licht" />
              <feFlood floodColor="#E9DFC9" floodOpacity=".28" />
              <feComposite in2="kante-licht" operator="in" result="licht" />
              <feOffset in="weich" dx="-1.6" dy="-1.8" result="weich-zurueck" />
              <feComposite in="SourceAlpha" in2="weich-zurueck" operator="out" result="kante-innen" />
              <feFlood floodColor="#120F08" floodOpacity=".3" />
              <feComposite in2="kante-innen" operator="in" result="innen" />
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="schatten-weich" />
              <feOffset in="schatten-weich" dx="2.6" dy="3.4" result="schatten-versatz" />
              <feComposite in="schatten-versatz" in2="SourceAlpha" operator="out" result="kante-schatten" />
              <feFlood floodColor="#0E0B06" floodOpacity=".7" />
              <feComposite in2="kante-schatten" operator="in" result="schatten" />
              <feMerge><feMergeNode in="schatten" /><feMergeNode in="innen" /><feMergeNode in="licht" /></feMerge>
            </filter>
          </defs>
          <text x="500" y="205" textAnchor="middle" transform="rotate(-7 500 160)" filter="url(#fuss-praegung)">Amoriva</text>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .fuss { position: relative; }
        /* Kein Rahmen mehr (Danilo: "der beige-weisse Rahmen sieht aus").
           Stattdessen ist das Foto oben und unten aus dem Papier gerissen:
           dieselbe echte Risskante wie im Intro, als Maske auf dem Bild.
           Der Schatten folgt der Kante (drop-shadow auf der Huelle). */
        .fuss-banner { padding-top: clamp(20px, 3vw, 44px); filter: drop-shadow(0 12px 18px rgba(0, 0, 0, .45)); --kante: clamp(70px, 9vw, 130px); }
        .fuss-bild {
          position: relative; height: clamp(340px, 38vw, 560px); overflow: hidden;
          -webkit-mask:
            url("/images/brief/riss.webp") top / 100% var(--kante) no-repeat,
            linear-gradient(#000, #000) center / 100% calc(100% - var(--kante)) no-repeat,
            url("/images/brief/riss-unten.webp") bottom / 100% var(--kante) no-repeat;
                  mask:
            url("/images/brief/riss.webp") top / 100% var(--kante) no-repeat,
            linear-gradient(#000, #000) center / 100% calc(100% - var(--kante)) no-repeat,
            url("/images/brief/riss-unten.webp") bottom / 100% var(--kante) no-repeat;
        }
        .fuss-bild-innen { position: absolute; inset: -12% 0; }
        /* Sepia wie ein alter Abzug (Referenz) */
        .fuss-bild-innen img { object-fit: cover; filter: sepia(.55) saturate(.75) brightness(.9) contrast(.95); }
        .fuss-bild::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 90% at 50% 50%, rgba(61, 55, 39, .25), rgba(61, 55, 39, .55));
        }
        .fuss-claim { position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(22px, 2.6vw, 34px); padding: 0 var(--rand); text-align: center; color: var(--sand-hell); }
        /* Schrift wie vorher: Antiqua-Versalien, "Gefuehl" in Schreibschrift */
        .fuss-claim .v-titel { max-width: 1000px; font-size: clamp(30px, 4.2vw, 62px); text-shadow: 0 2px 22px rgba(38, 35, 27, .5); }
        .fuss-anfrage { color: var(--sand-hell); }
        @media (hover: hover) { .fuss-anfrage:hover { background-color: var(--sand-hell); color: var(--tinte); } }

        .fuss-raster {
          display: grid; grid-template-columns: 1.3fr 1fr 1.2fr 1fr; gap: clamp(32px, 4vw, 64px);
          padding-block: clamp(56px, 6vw, 88px) clamp(40px, 4vw, 64px);
        }
        .fuss-marke { display: flex; flex-direction: column; gap: 22px; align-items: flex-start; }
        .fuss-marke p { margin: 0; font-family: var(--font-maschine), ui-monospace, monospace; font-size: 13.5px; line-height: 1.7; color: color-mix(in srgb, var(--ton) 75%, transparent); }
        .fuss-siegel { display: block; width: 92px; border-radius: 50%; opacity: .92; transition: opacity 250ms var(--v-ease), transform 400ms var(--v-ease); }
        .fuss-siegel img { display: block; width: 100%; height: auto; border-radius: 50%; }
        @media (hover: hover) { .fuss-siegel:hover { opacity: 1; transform: translateY(-2px); } }
        .fuss-siegel:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
        .fuss-label { margin: 0 0 18px; color: var(--ton-akzent); }
        .fuss ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
        .fuss-link { color: color-mix(in srgb, var(--ton) 85%, transparent); text-decoration: none; font-family: var(--font-text), system-ui, sans-serif; font-size: var(--v-klein); transition: color 250ms var(--v-ease); }
        @media (hover: hover) { .fuss-link:hover { color: var(--ton); text-decoration: underline; text-underline-offset: 4px; } }
        .fuss-link:focus-visible { outline: 1px solid currentColor; outline-offset: 3px; }
        .fuss-raster-bilder { position: relative; align-self: start; width: 100%; max-width: 300px; aspect-ratio: 1 / .92; }
        .fuss-kachel {
          position: absolute; width: 38%; aspect-ratio: 1; overflow: hidden;
          box-shadow: 0 12px 22px -8px rgba(0, 0, 0, .6);
          --dreh: 0deg; transform: rotate(var(--dreh));
          animation: fuss-schweben 7s ease-in-out infinite;
          transition: box-shadow 400ms var(--v-ease);
        }
        .fuss-kachel img { object-fit: cover; filter: sepia(.4) saturate(.8); }
        /* Lage, Drehung, Tempo je Bild: lose gestreut, teils ueberlappend */
        /* Vier lose Abzuege (26.10.2026: vorher sechs, davon alle doppelt) */
        .fuss-kachel--0 { left: 2%;  top: 4%;  width: 44%; --dreh: -7deg; animation-duration: 7.5s; }
        .fuss-kachel--1 { left: 52%; top: 0;   width: 42%; --dreh: 5deg;  animation-duration: 6.2s; animation-delay: -2s; z-index: 2; }
        .fuss-kachel--2 { left: 6%;  top: 50%; width: 42%; --dreh: 6deg;  animation-duration: 6.8s; animation-delay: -1s; z-index: 1; }
        .fuss-kachel--3 { left: 50%; top: 46%; width: 44%; --dreh: -5deg; animation-duration: 7.2s; animation-delay: -3s; z-index: 3; }
        @keyframes fuss-schweben {
          0%, 100% { transform: translate(0, 0) rotate(var(--dreh)); }
          50% { transform: translate(3px, -9px) rotate(calc(var(--dreh) * .6)); }
        }
        @media (hover: hover) {
          .fuss-kachel:hover { animation-play-state: paused; z-index: 5; box-shadow: 0 20px 34px -10px rgba(0, 0, 0, .7); }
        }
        @media (prefers-reduced-motion: reduce) { .fuss-kachel { animation: none; } }

        .fuss-leiste {
          display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
          padding-block: 22px; border-top: 1px solid color-mix(in srgb, var(--ton) 16%, transparent);
          font-family: var(--font-text), system-ui, sans-serif; font-size: 13px; color: color-mix(in srgb, var(--ton) 65%, transparent);
        }
        .fuss-recht { display: flex; gap: 24px; }
        .fuss-recht .fuss-link { font-size: 13px; }
        /* Nur die obere Haelfte des Schriftzugs ist zu sehen, der Rest laeuft
           unten aus der Seite (Danilo: "nur so halb sehen, Fuss nicht fett").
           Hoehe = 18 % der SVG-Breite, das schneidet das Wort etwa mittig. */
        .fuss-riesig {
          overflow: hidden; padding: 0 var(--rand); pointer-events: none; user-select: none;
          --breite: min(100vw - 2 * var(--rand), 1180px);
          height: calc(var(--breite) * .14);
        }
        .fuss-riesig svg { display: block; width: min(100%, 1180px); height: auto; margin: calc(var(--breite) * -.05) auto 0; overflow: visible; }
        .fuss-riesig text { font-family: var(--font-schrift), cursive; font-size: 250px; fill: #000; }

        @media (max-width: 900px) { .fuss-raster { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .fuss-raster { grid-template-columns: 1fr; } .fuss-raster-bilder { max-width: 300px; margin-top: 12px; } .fuss-bild { height: 440px; } .fuss-banner { --kante: 60px; } }
      ` }} />
    </footer>
  );
}
