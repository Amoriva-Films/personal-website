'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

/* Nevio am 21.09.2026: "mach die Hero section genau so, will die so
   behalten, dass man das ganze Video auf dem Vollbild sieht."

   Das ist die Fassung von der Live-Seite, 1:1 uebernommen: volle
   Bildschirmhoehe, zentrierter Markenname, EIN senkrechter Schleier,
   der in der Mitte nur 0,18 traegt. Drei Dinge sind bewusst anders:

   1. var(--font-display) statt var(--font-cormorant). Die Schrift heisst
      jetzt Fraunces.
   2. var(--font-inter) statt 'Inter', sans-serif. next/font erzeugt einen
      eigenen Familiennamen; 'Inter' trifft ihn NICHT und faellt still auf
      die Systemschrift zurueck. Auf Nevios Rechner faellt das nicht auf,
      weil Inter dort installiert ist - bei Besuchern schon. Genau dieser
      Fehler steckte hier schon einmal an 27 Stellen.
   3. Ein weicher Schatten hinter den Buchstaben. Gemessen ueber sechs
      Videostellen an je drei Punkten: mit dem Schleier allein faellt der
      Titel bei Sekunde 7,5 auf 2,07 zu 1 - dort laeuft er ueber ein
      helles Brautkleid. Das gilt fuer die Live-Seite genauso. Der
      Schatten liegt nur hinter der Schrift, ist auf dunklen Bildern
      unsichtbar und laesst das Video vollstaendig frei. Genau das war
      Nevios Wunsch: das ganze Video sehen.
   4. 100svh statt 100vh. Auf dem Handy rechnet vh mit eingeklappter
      Adressleiste, dadurch ragt der Hero unten aus dem Bild. svh ist die
      Hoehe, die wirklich sichtbar ist.                                   */

/* Wie lange die Ueberblendung am Schleifenpunkt dauert, in Sekunden. */
const UEBERBLENDUNG = 1.1;

export default function Hero() {
  const videoRef = useRef(null);
  const zweitRef = useRef(null);

  /* Nevio am 21.09.2026: "Das video soll direkt losgehen und nicht
     5 sekunden spaeter."

     Die Verzoegerung war hausgemacht. Vorher stand hier: Video auf
     unsichtbar setzen, auf 'canplay' warten, dann ueber 0,6 Sekunden
     einblenden. Das hiess in dieser Reihenfolge:

       HTML da -> Javascript laden -> Javascript versteckt das Video
       -> genug Video geladen -> 0,6 Sekunden einblenden

     Jeder dieser Schritte kostet Zeit, und bis zum letzten sah man die
     dunkle Flaeche des Abschnitts. Nichts davon war noetig: das
     <video>-Element startet mit autoplay/muted/playsInline von selbst,
     ganz ohne Javascript, und zeigt bis dahin sein Standbild.

     Geblieben sind zwei Anstoesse, die beide nichts verzoegern:      */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const starten = () => { const p = v.play(); if (p) p.catch(() => {}); };
    starten();

    /* Wer die Seite in einem Hintergrund-Tab oeffnet (Mittelklick,
       "in neuem Tab oeffnen"), bekommt vom Browser kein Autoplay -
       versteckte Tabs spielen nichts ab. Ohne das hier bliebe das
       Video fuer denjenigen fuer immer stehen, auch nachdem er
       hingewechselt ist. Gemessen genau so aufgetreten.              */
    const beiSichtbar = () => {
      if (document.visibilityState === 'visible' && v.paused) starten();
    };
    document.addEventListener('visibilitychange', beiSichtbar);
    return () => document.removeEventListener('visibilitychange', beiSichtbar);
  }, []);

  /* Nevio am 21.09.2026: "Das video soll durchlaufen und direkt wieder
     neu anlaufen, also ohne Pause sich wiederholen."

     Mit dem blossen loop-Attribut lief es technisch schon ohne Pause.
     Was man sah, war etwas anderes: das LETZTE Bild des Videos ist eine
     helle Szene am Tisch (gemessene Helligkeit 131), das erste eine
     dunkle Tanzflaeche (39). Am Schleifenpunkt schlug das Bild also
     hart von hell auf dunkel um - und ein harter Schnitt sieht aus wie
     ein Stopp, auch wenn kein einziges Bild fehlt.

     Deshalb liegen hier ZWEI Videoebenen uebereinander, beide mit
     derselben Datei. Geht die vordere auf ihr Ende zu, startet die
     hintere bei null und wird eingeblendet, waehrend die vordere
     ausgeblendet wird. Danach tauschen sie die Rollen. Das Ergebnis
     ist eine weiche Blende statt eines Schnitts - dieselbe Blende, die
     in einem Hochzeitsfilm auch zwischen zwei Szenen steht.

     Es kostet keinen zweiten Download: beide Ebenen zeigen dieselbe
     Adresse, der Browser nimmt sie aus dem Zwischenspeicher.         */
  useEffect(() => {
    const a = videoRef.current;
    const b = zweitRef.current;
    if (!a || !b) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let vorne = a, hinten = b;
    let blendet = false;
    let bild = 0;

    const ebene = (v, wert) => { v.style.opacity = String(wert); };

    const schritt = () => {
      bild = requestAnimationFrame(schritt);
      const d = vorne.duration;
      if (!d || isNaN(d)) return;
      const rest = d - vorne.currentTime;

      if (!blendet && rest <= UEBERBLENDUNG) {
        blendet = true;
        hinten.currentTime = 0;
        const p = hinten.play();
        if (p) p.catch(() => {});
      }

      if (blendet) {
        // 0 am Beginn der Blende, 1 am Ende.
        const t = Math.min(1, Math.max(0, (UEBERBLENDUNG - rest) / UEBERBLENDUNG));
        ebene(hinten, t);
        ebene(vorne, 1 - t);

        if (rest <= 0.03) {
          // Rollen tauschen. Die alte vordere Ebene haelt an und
          // wartet unsichtbar auf ihren naechsten Einsatz.
          vorne.pause();
          ebene(hinten, 1);
          ebene(vorne, 0);
          const merk = vorne; vorne = hinten; hinten = merk;
          blendet = false;
        }
      }
    };
    bild = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(bild);
  }, []);

  return (
    <section
      data-dunkler-kopf=""
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--leinwand)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Kein loop-Attribut mehr: das Wiederholen macht die
            Ueberblendung oben, sonst kaeme der harte Schnitt zurueck. */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          /* Standbild, bis das Video laeuft. Ohne das sieht man beim
             Aufbau der Seite eine dunkle Flaeche - der erste Eindruck
             waere dann die Ladezeit statt das Bild.

             Es ist das ERSTE BILD DES VIDEOS, mit ffmpeg daraus
             geschnitten. Vorher lag hier eine andere Stelle aus der
             Hochzeit: man sah erst diesen einen Moment und dann sprang
             es auf eine voellig andere Szene. Genau dieses Springen ist
             Nevio ganz am Anfang aufgefallen ("zeigt irgendein Bild an,
             was dort garnicht sein soll"). Jetzt ist der Uebergang vom
             Standbild zum Video unsichtbar.                          */
          poster="/images/hero-poster.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Die zweite Ebene. Liegt unsichtbar darunter und uebernimmt
            am Schleifenpunkt. Kein autoPlay: sie wird gestartet, wenn
            sie gebraucht wird. Fuer Vorlesesoftware unsichtbar, sie
            zeigt ja dasselbe Bild.                                   */}
        <video
          ref={zweitRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            opacity: 0,
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Ein Schleier, dunkel oben und unten, offen in der Mitte. In der
          Titelzone liegt er bei 0,18 - dort sieht man das Video. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.70) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.8, ease }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 8%',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,242,0.75)',
            fontWeight: 400,
            marginBottom: '2.2rem',
            textShadow: '0 1px 18px rgba(0,0,0,0.60), 0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          Hochzeitsfilm &amp; Hochzeitsfotografie
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(38px, 6.5vw, 92px)',
            lineHeight: 0.9,
            letterSpacing: '0.03em',
            fontWeight: 400,
            color: 'var(--auf-dunkel)',
            textTransform: 'uppercase',
            marginBottom: '2.2rem',
            textShadow: '0 2px 28px rgba(0,0,0,0.60), 0 1px 4px rgba(0,0,0,0.45)',
          }}
        >
          Amoriva Films
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: 'clamp(17px, 1.8vw, 26px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(244,244,242,0.82)',
            letterSpacing: '0.02em',
            maxWidth: '620px',
            textShadow: '0 1px 18px rgba(0,0,0,0.60), 0 1px 3px rgba(0,0,0,0.45)',
          }}
        >
          Mit Sitz in Niedersachsen, für Hochzeiten auf der ganzen Welt.
        </p>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2, ease }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,242,0.55)',
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <div style={{ width: '1px', height: '56px', background: 'rgba(244,244,242,0.38)' }} />
      </motion.div>
    </section>
  );
}
