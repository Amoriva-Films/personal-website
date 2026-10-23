---
name: amoriva-films-redesign
description: "Vintage-Redesign von amoriva-films.de läuft auf Branch redesign-vintage, Section für Section nach Skill webseite-bauen"
metadata:
  node_type: memory
  type: project
  originSessionId: 0ad7c58d-5f35-4930-985b-aff99e511fa0
  modified: 2026-10-19T22:48:19.701Z
---

Seit 2026-10-19 läuft das Vintage-Redesign von amoriva-films.de im Repo
`C:\Users\danil\Downloads\amoriva-films-site` auf Branch **`redesign-vintage`** (main = Live-Stand,
nicht anrühren). Ablauf nach Skill `webseite-bauen`: INSPO.md und STYLE.md im Repo sind die
Designquelle, jede Section einzeln von Danilo abnehmen lassen, kein Commit/Push ohne sein Ja.

Entscheidungen: Next.js behalten; Seiten Start, Über uns, Vision, Fragen, Anfrage; Cormorant Garamond +
Hanken Grotesk; Tokens in `app/vintage.css` (Oliv/Papier/Siegel, gemessen aus dem Figma-Board).
Neue Komponenten unter `components/vintage/`, Texte in `content/texte.js`. Kopfzeile und Lenis
jetzt global im Layout; die alte `<Nav />` wurde aus allen Seiten entfernt.

Stand 2026-10-19: Intro (Wachssiegel, bei JEDEM Laden, Flag `window.__amorivaIntro` gegen
Wiederholung beim Zurückklicken), Hero (Video sinkt in geprägtes Passepartout auf Samt-Oliv,
`useScroll` mit offset ['start start','end end']), Kopfzeile gebaut, Build grün, wartet auf Abnahme.
Stand 2026-10-20 abends: GANZE Seite gebaut (Start mit 10 Sections plus /ueber-uns, /vision,
/fragen, /anfrage restyled), Build grün, NICHT committet, wartet auf Danilos Feedback. Nach dem
Intro: schlichtes Olivgrün (kein Bildhintergrund), Titel bleibt auf dem Hero-Video. Komponenten in
`components/vintage/` (Titel mit *Schreibschrift*-Wort, Arbeit, Momente, Leistungen, Prozess mit
Wählscheibe, Stimmen, Termine mit Stempel, Gruender, Brief mit Umschlag, Fuss, SeitenKopf).

Danilo hat dünne Rahmenlinien, flache Farbflächen UND gerechnete Code-Grafik (SVG-Siegel,
Samt-Textur) verworfen: er will **fotorealistisches Material** wie seine Siegel-Referenz. Seit
2026-10-20 kommen Briefbogen (Kupferstich-Toile quer/hoch) und Wachssiegel aus Figma-KI
(`generate_image`, gpt-image-2.5, Datei "Amoriva Films Assets" in Nevios Figma, Credits nur nach
Freigabe), liegen unter `public/images/brief/`. Siegel per Magenta-Hintergrund freigestellt. Vor jeder Section die Figma-Originalbilder einzeln laden
(`download_assets` auf 0:1 liefert max. 20), nicht nur das Gesamtbild. Projektnotiz im Vault:
`02 Projekte/Amoriva Films Website.md`.

**Why:** Danilo will "Wolfsburg übernehmen"; das Board verlangt Vintage-Look, Wachssiegel-Intro,
Wählscheiben-Prozess, Unterseiten statt Onepager.
**How to apply:** Vor jeder Arbeit an der Films-Seite den Branch prüfen; Screenshots über die
Chrome-headless-Schleife machen, siehe [[chrome-headless-screenshots]]. Verwandt:
[[next-inline-style-hydration]], [[dev-build-clobber]].

Stand 20.10.2026 (Runde 4): Danilo will die Seite DUNKEL: Grund #111509, kein Papier als Seitenhintergrund (nur Intro und Brief), keine Bildrahmen/Passepartouts, keine Reißkanten. Textschrift Jost (Hanken abgelehnt). Home-Button "Start" ist Pflicht.

Stand 20.10.2026 (Runde 5, ersetzt Runde 4 teilweise): NICHT alles Grün. Vier Flächen im Wechsel (Grün #111509, Oliv #413C29, Schwarz, Papier), jede Section muss klar für sich stehen. Er WILL Rahmen, aber echte (Goldrahmen + Perlen-Oval aus Figma-KI), keine Papier-Passepartouts. Riss-Übergang mag er, nur sauber.
Runde 6: max. 2-3 Farben (Grün, Papier, Schwarz; KEIN Oliv). Goldrahmen nur bei Arbeit + Hero. Gründer-Bios ohne Rollen (beide hinter der Kamera). Akkordeons standardmäßig zu.
Runde 9: Danilo erwartet Einheitlichkeit ohne Ansage: alle Knöpfe gleiche .v-knopf-Form, gleiche Ausrichtung je Bauart, keine Einzel-Varianten. Papier fein gekörnt (papier-fein.webp).

22.10.2026 NEUE RICHTUNG (ersetzt dunkles Grün): Vintage Grün-Beige. Nur seine 6 Referenzen zählen (Wedding Sessions, Blumen-Statement, Umschlag/Toskana-Gemälde, Tilly Roberts, Darcy McQueeny, Dolcezza; Figma-Knoten 17:88, 17:39, 1:346, 16:24, 16:35, 16:31). Farben Sand/Creme/Khaki/Oliv-Braun. Intro = Zeichnen + Papier-Riss. Er will mit mehr Bildern arbeiten und liefert neue Fotos.
22.10.2026: Tageslauf-Hintergrund (Tageslauf.jsx). Wenn Danilo 'Backup' sagt: app/, components/, content/, STYLE.md aus C:\Users\danil\Downloads\amoriva-films-site-backup-vor-hintergrund-2026-10-22 zurückkopieren (public/images bleibt).
23.10.2026: Intro soll CLEAN sein wie Danilos Westfeld-Intro (Documents/westfeld/westfeld-seminar/src/components/IntroVorhang.tsx): Name fliegt rein, Unterzeile, Vorhang nach oben. Aufwendige Intros (Zeichnen, Aufrollen, Filmstreifen) lehnt er ab.
