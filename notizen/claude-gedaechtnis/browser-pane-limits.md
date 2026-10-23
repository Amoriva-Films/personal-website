---
name: browser-pane-limits
description: Der Vorschau-Browser-Pane rendert IntersectionObserver und CSS-Transitions nicht
metadata: 
  node_type: memory
  type: reference
  originSessionId: 48454e1e-0fa3-4704-ae3e-a7daf096c06f
  modified: 2026-10-17T15:11:37.158Z
---

Der Claude-Browser-Vorschau-Pane (mcp__Claude_Browser__*) am Amoriva-Projekt rendert
NICHT kontinuierlich: **IntersectionObserver-Callbacks feuern nicht** (auch bei sichtbarem
Element) und **CSS-Transitions bleiben am Startwert haengen** (z. B. `.rise` opacity 0,
`.hdr.dark` bg, Marker-`left`). Das ist eine Pane-Eigenheit, KEIN Bug — im echten Browser
des Nutzers laeuft alles.

**Verifikation im Pane deshalb so:**
- Scroll-Listener FEUERN im Pane (Header-Farbwechsel, die auf Scroll umgestellten Reveals) —
  also Bewegung lieber scroll-basiert bauen als per IntersectionObserver.
- Ziel-/Endwerte pruefen statt Animationszustand: Transition kurz abschalten
  (`el.style.transition='none'; void el.offsetWidth;`) und dann `getComputedStyle` lesen,
  ODER die state-getriebenen Inline-Styles (z. B. `mark.style.left`) direkt lesen.
- `get_page_text` und `getComputedStyle().color` liefern Inhalt/Farbe auch bei opacity 0 —
  reicht NICHT als Beweis, dass etwas sichtbar ist; zusaetzlich opacity/Transition-Ziel pruefen.
- Screenshots (`computer` action:screenshot) timen im Pane durchgehend aus — nicht drauf verlassen.
- Am hypnoinside-Projekt (Aug 2026) zusaetzlich beobachtet: `document.hidden === true`,
  deshalb feuert **requestAnimationFrame gar nicht** und `window.scrollTo` bewegt nichts
  (scrollY bleibt 0). Scroll-Listener feuern dort also auch NICHT — anders als bei Amoriva.

**Trotzdem sehen, was man baut (wichtigster Trick):** `javascript_tool` kann asynchron
laufen (Image.onload, fetch). Also im Pane auf ein Offscreen-Canvas zeichnen,
`canvas.toDataURL('image/png')` per fetch an ein lokales PHP-Schnipsel POSTen, das die
Datei auf die Platte schreibt — dann die PNG mit dem **Read-Tool** oeffnen, das Bilder
visuell darstellt. Damit entsteht eine echte Sicht-Schleife fuer Canvas/SVG-Arbeit, ohne
die Base64-Daten durch den Kontext zu schleusen. Bei hypnoinside liegt der Endpunkt unter
`themes/hello-elementor-child/dev/snap.php` (nur `*.local`, vom Deploy ausgeschlossen).
Animationslogik selbst gehoert in einen **Node-Harness**, der die echte JS-Datei per `vm`
mit Stub-DOM laedt — siehe [[hypnoinside-website]].

**Die staerkste Variante (Filmstrip):** Beide Ideen kombinieren. Ein IIFE-Skript, das die Globals
`document` und `window` liest, laesst sich im Browser mit
`new Function('document','window','ResizeObserver', quelltext)(fakeDoc, fakeWin, undefined)`
gegen eine Attrappen-DOM starten — waehrend es auf ein ECHTES Canvas zeichnet. Damit rendert der
unveraenderte Produktionscode beliebige Scroll-Zustaende, die man dann als PNG ansehen kann.
Zwei Fallstricke: das Canvas **muss im Dokument haengen** (`getBoundingClientRect()` liefert sonst
Nullen und die build-Funktion bricht ab, ohne je zu zeichnen), und rAF-Callbacks muss man selbst
in einer Schleife abarbeiten und dabei genug Frames pumpen, damit geglaettete Werte (z. B. eine
eingefederte Rotation) eingeschwungen sind — sonst misst man Zwischenzustaende.
Bei hypnoinside liegt das als `themes/hello-elementor-child/dev/filmstrip.js`.

Konsequenz fuers Amoriva-Landing: Reveal/Kosten/Ablauf wurden auf Scroll-Erkennung
umgestellt (Commit 50f3c31), damit Inhalt nie unsichtbar haengenbleibt. Siehe
[[amoriva-project-state]].

**Am Amoriva-Films-Projekt (Okt 2026) zwei weitere Fallen bei verstecktem Pane:**
- `window.innerHeight === 0` → **alle `vh`-Hoehen kollabieren auf 0px** (ein `200vh`-Hero wurde
  0px hoch, Section nicht scrollbar). Mit `resize_window {width,height}` eine echte Viewport-
  Groesse erzwingen, dann stimmt innerHeight wieder (200vh = 1600px bei 800er Hoehe).
- **framer-motion `useScroll`/`useTransform` aktualisiert nicht**, weil es rAF-getrieben ist und
  rAF im versteckten Pane pausiert (ein `await requestAnimationFrame`-Skript TIMT NACH 45s AUS,
  obwohl `document.visibilityState` faelschlich "visible" meldet). Scroll-Schrumpf-Effekte
  (Video wird beim Scrollen zur gerundeten Karte) lassen sich hier NICHT in Zahlen pruefen.
  Verifizierbar bleibt: `prefers-reduced-motion` (schaltet den Effekt im Code ab — synchron lesbar,
  muss `false` sein), Tag-Bilanz, kompiliert sauber, Section-Hoehe/Sticky-Struktur. Das Sichtbare
  gehoert dem Nutzer.
