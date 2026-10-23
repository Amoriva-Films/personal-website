# STYLE Amoriva Films Redesign (Vintage)

Stand 2026-10-20 ("bau die ganze Seite"). Jede Zeile zeigt auf eine Quelle: Figma-Board (siehe INSPO.md), Danilos Aussagen oder bestehende CI.
Im Code nur die Tokens aus `app/vintage.css`. Keine losen Werte.

## Haltung

- Vintage, königlich, italienisch, aber modern und lesbar. Quelle: Board, Spalte Funktion.
- Editorial wie ein altes Magazin: gerahmte Bilder, Versal-Titel mit einem Wort in Schreibschrift, kleine Versal-Labels. Quelle: Crown Perfumery, Meet the Founders, About Runaway Vows.
- Realistisches Material statt Code-Grafik: echtes Wachs, echtes Papier, echte Wählscheibe, echter Umschlag. Quelle: Danilo 20.10.2026 ("komplett realistisch").
- Signatur-Detail: das Amoriva-Wachssiegel. Es öffnet die Seite (Intro), klatscht auf 2026 (Termine) und verschließt den Brief (Abschluss).

## Schriften

Alle frei (SIL OFL), über next/font selbst gehostet, `display: swap`.

| Rolle | Schrift | Hinweis | Quelle |
|---|---|---|---|
| Titel (Versalien), Wortmarke, Zahlen | Cormorant Garamond 500/600 | erst ab 22 px | Danilo 19.10.2026 |
| Text, Navigation, Labels, Formulare | Hanken Grotesk | | Danilo 19.10.2026 |
| ein Akzentwort pro Titel, kleine Zeile über Titeln, Unterschrift | Pinyon Script | nie für Fließtext | fast jede Referenz im Board ("Meet the *Founders*", "A *Better* Story", "Intimate and *Elegance*") |

Titel: `<Titel text="Was wir für euch *tun* können." />`, das Wort in Sternchen steht in Schreibschrift.

Größen (Token): `--v-display` 44 bis 104 px (Hero), `--v-titel` 40 bis 76 px (Seitentitel), `--v-h2` 30 bis 54 px (Section-Titel), `--v-text` 17 px, `--v-klein` 15 px, `--v-label` 11,5 px Versalien.

## Farben

Gemessen aus den Referenzbildern im Board, Akzent aus der bestehenden Wortmarke.

| Token | Hex | Rolle | Quelle |
|---|---|---|---|
| `--oliv` | #48442B | Hero-Wand | Lunerre |
| `--oliv-tief` | #413C29 | Grundfläche dunkler Sections, Kopfleiste | Dark Editorial ("Wildly in love") |
| `--oliv-mitte` | #5C5744 | Flächen, Nummern, Zeilen | "Show Section" |
| `--blatt` | #EDE9E0 | helle Sections (Creme) | Crown Perfumery, Textteil |
| `--blatt-hell` | #F0ECE3 | Passepartout | Crown Perfumery |
| `--pergament` | #D3C4A7 | Linien auf Dunkel, Ziffern | Valerie Marie |
| `--tusche` | #141517 | Text auf Creme, Prozess-Fläche, Footer | Crown Perfumery, "The Process" |
| `--siegel`, `--siegel-tief` | #62603A, #4D4A2D | Wachs | Siegel-Referenz |
| `--akzent` | #687850 | feine Akzente (Listen-Striche) | bestehende Wortmarke (CI) |

Danilo 20.10.2026: Nach dem Intro "ein geiles Olivgrün", basic und stylish, kein Bildhintergrund. Oliv und Creme wechseln sich ab, der Prozess steht auf Schwarz.
Regeln: nie Gelb, nie Rot (Nevio, CI). Ausnahme nur die bestehende Warnfarbe `--warnung` für Formularfehler.
Kontraste: Tusche auf Blatt 15,1:1, Blatt auf Oliv-tief 9,1:1, Pergament auf Oliv-tief 6,4:1.

## Raster

- Seitenbreite `--v-spalte` 1320 px, Rand 24 px (Handy) bis 60 px.
- Section-Abstand `--v-luft` 88 bis 160 px.

## Formen

- Eckig, keine runden Ecken an Bildern und Karten. Quelle: Crown Perfumery.
- Bilder im Passepartout (`.v-rahmen`): Creme-Rand mit erhabener Kante, Bild vertieft. Quelle: Crown Perfumery (gerahmtes Titelbild), Valerie Marie.
- Knöpfe und Karten mit doppelter feiner Linie. Quelle: gedruckte Etiketten der Referenzen.
- Gerissene Papierkante (`.v-riss`) zwischen Oliv und Creme. Quelle: GUESS ("Aufgerissener Hintergrund").
- Schatten nur, wo ein echtes Objekt absteht (Wachs, Passepartout, Brief).

## Bildmaterial

Erzeugt mit Figma-KI (gpt-image-2.5) in Nevios Figma-Datei "Amoriva Films Assets", freigestellt per Magenta-Schlüssel. Liegen in `public/images/brief/`.

| Datei | Was | Wo |
|---|---|---|
| `papier-quer.webp`, `papier-hoch.webp` | gefalteter Briefbogen mit Kupferstich-Toskana | Intro |
| `siegel.webp` | Wachssiegel, Olivenzweig-Kranz, "A" | Intro, Termine, Brief |
| `waehlscheibe-rad.webp`, `waehlscheibe-anschlag.webp` | Wählscheibe, Fingeranschlag als stehende Ebene | Prozess |
| `umschlag.webp` | Briefumschlag, zerlegt in Klappe, Tasche, Rückwand | Brief |
| `riss.webp` | echte Reißkante, an Creme angeglichen | Übergänge |

Hochzeitsfotos: die vorhandenen in `public/images/`. Vision-Moodboard: vorläufige Auswahl, Danilo nennt die Bilder.

## Seitenaufbau

Start: Intro, Hero, Unsere Arbeit, Momente, Leistungen, Prozess, Stimmen, Termine, Gründer, Brief, Footer.
Unterseiten: Über uns, Vision, Fragen, Anfrage (Kopf mit Bild, dann Creme mit Reißkante, Brief, Footer).

## Effekte (je mit Quelle)

| Effekt | Wo | Quelle |
|---|---|---|
| Siegel wird auf den Briefbogen gedrückt, AMORIVA erscheint, Siegel bricht entlang des Falzes, die Flügel klappen in 3D auf | Intro, bei jedem Laden, nicht beim Zurückklicken | Board ("Start mit Amoriva-Stempel"), Danilo 20.10.2026 |
| Video sinkt beim Scrollen in ein Creme-Passepartout auf Oliv, Titel bleibt auf dem Video und wächst beim Hochscrollen zurück in die Mitte | Hero | bestehender Effekt, Danilo 20.10.2026 |
| Wörter gleiten Zeile für Zeile aus einer Maske | Section-Titel | giomediamarketing.de (Danilos Referenz) |
| Bild im Rahmen zoomt beim Scrollen heraus | Unsere Arbeit, Gründer | Board ("Zoom wie jetzt") |
| Fotos wandern mit verschiedener Geschwindigkeit (Tiefe), Schreibschrift läuft seitlich | Momente, Vision | "Show Section" ("Intimate and Elegance") |
| Wählscheibe wählt pro Schritt die Ziffer, Anschlag steht still | Prozess | Board ("Vintage-Telefon-Animation") |
| Wachssiegel klatscht auf die 2026-Karte | Termine | Board ("Wachsstempel, der raufklatscht") |
| Umschlag öffnet sich, Brief gleitet heraus und kommt nach vorne | Brief | Board ("Vintage-Brief, der sich öffnet") |
| Weiches Scrollen | überall | Lenis |

Nur `transform` und `opacity` animieren. `prefers-reduced-motion`: Intro aus, alle framer-motion-Bewegungen aus (MotionConfig).

## Tonalität

- Paare mit "ihr/euch". Alle Texte aus der bisherigen Seite, Claim aus dem Vault (Branding). Fehlt Text: `[TEXT FEHLT: ...]`.
- "Wir sind ein Team": keine Aufgaben-Rollen bei den Gründern (Board).

## Offen

- Vision: Video und Text von Danilo, Bildauswahl fürs Moodboard.
- Monogramm im Siegel: "A" mit Olivenzweig (aus der KI). Bei Wunsch "AF" oder eigenes Wappen neu erzeugen.
- Alte Unterseiten (Leistungen, Filme, Referenzen, Angebote, Ratgeber) laufen noch im alten Aufbau mit neuen Schriften.

## Nachtrag 2026-10-20 (Feedbackrunde 3)
- Grundfläche ist überall das Papier (`papier-glatt.webp` als feste Ebene `body::before`). Creme-Abschnitte sind durchsichtig, damit unter der Reißkante kein neues Weiß beginnt.
- Hero liegt nicht mehr auf Oliv, sondern auf Papier, mit geprägtem Passepartout statt Linienrahmen.
- Oliv bleibt nur für Momente, Verfügbarkeit und den Brief. Schwarz für Prozess und Fuß.
- Abschnitte passen in einen Bildschirm: kleinere Titel (`--v-titel`, `--v-h2`) und weniger Luft (`--v-luft`). Stimmen als schmale Dreierreihe, Verfügbarkeit als Band.
- Intro-Siegel kleiner (`clamp(92px, 8.4vw, 134px)`). Das Intro startet erst, wenn Papier und Siegel geladen sind.
- Brief nur auf der Startseite. Siegel als eigene Ebene auf der Klappenspitze.
- Ganz unten im Fuß der Name riesig und halb abgeschnitten, Ton in Ton.

## Nachtrag 2026-10-20 (Runde 4, gilt vor allem oben)
- Die Papier-Runde ist zurückgenommen. Danilo: Papier als Hintergrund "macht gar keinen Sinn", er will eine dunkle Seite.
- Grund der ganzen Seite: `--nacht` #111509 (sein Muster), tiefes Grün fast schwarz. `--nacht-hell` #181D0F für Bildflächen, `--nacht-tief` #0A0C06 für Prozess und Fuß, weich per Verlauf aus dem Grün.
- Alle Abschnitte `.v-nacht`, keine Reißkanten, keine harten Kanten zwischen Abschnitten.
- Keine Rahmen um Bilder. Nur der Hero bekommt beim Schrumpfen eine feine doppelte Linie in Pergament.
- Text: Jost (300/400/500) statt Hanken Grotesk. Akzente (Schreibschrift-Zeilen, Ziffern, Linien) in `--pergament`.
- "Unsere Arbeit": großes Bild links, Titel, Text, Unterschrift und Knopf rechts (Vorbild "Wedding Packages").
- Kopfzeile: "Start" als Home-Button vorne in der Navigation, Leiste dunkel.
- Papier bleibt nur da, wo es Gegenstand ist: Intro-Briefbogen und Brief am Ende.

## Nachtrag 2026-10-20 (Runde 5, gilt vor Runde 4)
- Nicht alles Grün: vier Flächen im Wechsel. `.v-nacht` (#111509), `.v-oliv` (#413C29), `.v-schwarz` (#141517), `.v-papier` (Baumwollpapier). Reihenfolge Startseite: Hero Grün, Arbeit Grün, Momente Papier (mit Riss oben), Leistungen Oliv, Prozess Schwarz, Stimmen Papier, Verfügbarkeit Oliv, Gründer Grün, Brief Schwarz, Fuß Schwarz.
- Jede Fläche setzt `--ton`, `--ton-akzent`, `--ton-grund`. Komponenten nutzen nur diese, dadurch passt jeder Abschnitt auf jeden Grund.
- Rahmen: echter vergoldeter Rahmen (Figma-KI) als `border-image` in `.v-rahmen`, Breite über `--r`. Gründer im ovalen Perlenrahmen (Vorbild Lunerre). Hero-Video schrumpft in denselben Goldrahmen.
- Brief: Klappe flach gespiegelt statt 3D (preserve-3d war je nach Browser kaputt). Umschlag ist von Anfang an da, Brief legt sich am Ende mittig nach vorne.

## Nachtrag 2026-10-20 (Runde 6)
- Höchstens drei Farben: Grün (#111509), Papier, Schwarz. Oliv ist raus.
- Startseite: Hero Grün, Arbeit Grün, Momente Papier (Riss), Leistungen Grün, Prozess Schwarz (weich aus Grün), Stimmen + Verfügbarkeit Grün als ein Block, Über uns Papier (Riss), Brief Schwarz, Fuß Schwarz.
- Goldrahmen nur noch bei "Unsere Arbeit" und Hero. Momente, Moodboard und Leistungen ohne Rahmen; Momente und Moodboard als Abzüge mit Schatten.
- Gründer im Oval mit nur einer Perlenreihe. Bios ohne Rollen, beide stehen hinter der Kamera.
- Akkordeons (Leistungen, Fragen) starten geschlossen. Fragen mittig.

## Nachtrag 2026-10-20 (Runde 7)
- Leistungen als eine mittige Spalte (wie Fragen), ohne Bild.
- Gründer ohne Rahmen, Fotos als Abzüge auf Papier, wieder größer (bis 300 px im Teaser).
- Über uns: oben "Wofür wir stehen" mit eigenem Text (junges Team, Mediengestaltung, italienisch, neues Vintage, Gegenteil von teuer und unzuverlässig) und vier Werten, dann Riss zu den Gründern.
- Hero-Unterzeile: "Mit Sitz in Wolfsburg, für Hochzeiten auf der ganzen Welt."

## Nachtrag 2026-10-20 (Runde 8)
- Goldrahmen nur noch am Hero-Video. "Unsere Arbeit" ohne Rahmen.
- Leistungen wieder Bild links, 01 bis 03 rechts untereinander, der ganze Block mittig auf der Seite (Raster mit festen Spalten, justify-content: center).
- Gründer-Fotos mit Amoriva-Wachssiegel oben, als wären sie aufs Papier geheftet; klatscht beim Erscheinen drauf.
- Fußbild: unter dem Claim ein schlichter Knopf "Anfrage stellen".

## Nachtrag 2026-10-20 (Runde 9)
- Papierflächen mit feiner, nahtloser Kachel `papier-fein.webp` (768 px), Körnung wie im Riss.
- Keine kleinen Trennstriche unter Titeln mehr.
- Einheitliche Knöpfe: überall die `.v-knopf`-Form (doppelte Linie, 12 px, .24em). Kopfzeile nur niedriger, Fußbild nur fest hell.
- Brief: kommt ganz aus der Tasche, erst dann nach vorne (kein Springen).
- Runde 10: jede Seite startet oben (SmoothScroll setzt Lenis + Fenster bei jedem Seitenwechsel auf 0, scrollRestoration manual). Über-uns-Text: 'junges, ambitioniertes Team'.

## Nachtrag 2026-10-22 (Intro, Fassung 3)
- Intro neu: Der Kupferstich wird auf leerem Papier gezeichnet (WebGL2-Shader auf dem echten Bild: erst Lasur, dann Linien nach Tintenstärke, links nach rechts), dann reißt der Bogen quer auf (echte Risskante als Maske, weiße Fasern, Schatten im Spalt). Im Spalt AMORIVA FILMS auf dem Video, danach gehen die Teile nach oben und unten weg. Kein Siegel mehr im Intro.
- Dauer: Zeichnen 2,7 s, Reißen 1,3 s, Halten 1,1 s, Weg 1,0 s. Überspringen und Escape springen direkt zu "Weg".
- Ebenen: Zeichnung und leeres Papier liegen über beiden Teilen, bis der Riss beginnt.

## Neue Richtung 2026-10-22: Vintage Grün-Beige (ersetzt die dunkle Fassung)
Quellen: nur Danilos sechs Referenzen im Board (Wedding Sessions, Blumen-Statement, Umschlag auf Toskana-Gemälde, Tilly Roberts, Darcy McQueeny, Dolcezza). Olive Branch liegt daneben, gehört nicht dazu.
- Farben: Sand #E3DACA, Creme #EEE9DE, Khaki #BCAE8C, Oliv-Braun #3D3727 (dunkle Flächen, heißt im Code weiter --nacht), Tinte #2E2B22, Salbei-Creme #DAD6BE, Akzent Oliv-Braun hell #6B6247.
- Flächen: .v-papier (Creme), .v-sand (Sand), .v-nacht (Oliv-Braun), .v-schwarz (warmes Schwarz, nur Fuß).
- Schriften: Cormorant (Titel, teils ohne Versalien wie "Wedding Sessions"), Jost (Text), Pinyon (Schreibschrift), neu Courier Prime (kleine Notizen, Vorbild Tilly).
- Material (Figma-KI): gemalte Toskana (Brief), Tuschezeichnungen Strauß, Farn, Falter, Olivenzweig (als CSS-Maske, Farbe per color), Kordelschleife.
- Startseite: Hero (Sand) · Unsere Arbeit wie "An Ode to your Memories" · Leitsatz in Versalien über Foto, Wort für Wort beim Scrollen · Momente wie Darcy · Leistungen wie Wedding Sessions (Fotokarte, Kordel, Siegel, Stempel) · Prozess (Oliv-Braun) · Stimmen + Verfügbarkeit (Creme, runde Plaketten wie Dolcezza) · Gründer wie Tillys "Hello there" · Brief auf Toskana-Gemälde · Fuß.
- Vertrauenspunkte (I bis IV) sind vorerst raus, damit Leistungen so clean bleibt wie die Referenz.
- 22.10.2026: Oliv-Braun (.v-nacht) mit Vintage-Oberfläche: KI-Kachel braun-alt.webp als luminosity über --nacht, dunkle Ränder (radial). Prozess bekommt die Ränder am Schirm. Fußbild und Fuß noch offen (Danilo sucht Ideen).
- Klebende Abschnitte (Hero, Prozess, Leitsatz, Brief): Hintergrund-Struktur immer an die sticky Bühne, nie an die hohe Section, sonst scrollt das Papier unter dem stehenden Inhalt mit.
- Prozess: Schritte sind Knöpfe (Klick wählt die Ziffer und scrollt per Lenis an die passende Stelle, window.__lenis aus SmoothScroll). Inaktive Schritte 62 % statt 32 %, aktiver mit Khaki-Linie. Handy: Nummern 01 bis 05 zum Antippen.
- Knöpfe (22.10.2026): .v-knopf und .kopf-knopf als runde Plakette (Vorbild Dolcezza): innere zweite Linie, Cormorant 600 in Versalien, Ornament-Punkte links und rechts (radial-gradient in currentColor), Hover nur background-color. Kopfzeile am Handy ohne Punkte.
- Fuß (22.10.2026): nach Danilos Referenz 'Your story deserves to be held eternally'. Bild als Sepia-Banner im Passepartout (helle Kante, feine Linie, Khaki-Band), Satz in feiner Antiqua ohne Versalien, ganzer Fuß auf Sand (.v-sand), dunkle Schrift, Riesenwort in Oliv-Braun 22 %.
- Riesenwort AMORIVA im Fuß als Blindprägung: Füllung #D6CBB6 (gemessener Grund #D0C4AE), Licht oben links, Schatten unten rechts per text-shadow.
- Riesenwort jetzt als SVG-Filter-Prägung: Buchstaben leer (echtes Papier des Fußes scheint durch), nur Lichtkante innen oben links und Schatten außen unten rechts. background-clip:text taugt nicht, weil blend-mode dort ignoriert wird.
- Riesenwort jetzt 'Amoriva' in Pinyon Script, -7 Grad gedreht, ganz sichtbar, weiche Prägung (Kanten aus weichgezeichneter Form).
- Fußbild: kein Passepartout mehr, Foto oben und unten aus dem Papier gerissen (riss.webp / riss-unten.webp als Maske wie im Intro), Schatten per drop-shadow auf der Hülle. Schrift zurück auf v-titel (Versalien + Schreibschrift).
- Fuß-Bilder rechts: lose gestreut, gedreht, überlappend, schweben langsam (CSS-Keyframes, je Bild eigenes Tempo), Hover hält an und hebt hervor.
- Leitsatz: Abschnitt 280vh. Wörter erscheinen bis p≈0,57, ab 0,66 zerfällt der Satz Buchstabe für Buchstabe (feste Pseudo-Zufallsrichtungen, links nach links, rechts nach rechts, ±100 px hoch/runter, leichte Drehung, ausblenden).
- Markieren global aus: html user-select none, Bilder nicht ziehbar, ::selection transparent; Formularfelder bleiben markierbar.

## Tageslauf-Hintergrund (2026-10-22)
- Ein durchgehendes Gemälde hinter der ganzen Seite (components/vintage/Tageslauf.jsx, public/images/vintage/tag.webp, 864 x 5100, vier Figma-KI-Teile weich überblendet): Morgenwolken mit Tauben, Villa im Dunst, lange Treppe, Garten, Wiese mit Paar, See mit Laternen, Nacht.
- Feste Ebene z-index -1, multiply, Deckkraft .24, wandert mit dem Scrollfortschritt (Bildanfang = Seitenanfang, Bildende = Seitenende).
- Dafür: Papier liegt auf html, body durchsichtig, .v-papier durchsichtig, .v-sand = rgba(190,170,135,.23), Hero und Leitsatz-Bühne durchsichtig. Dunkle Flächen decken das Bild ab.
- Kopfzeile: helle Schrift nur, solange das Hero-Video wirklich dahinter liegt (top > -8 % vh).
- Backup vor dieser Änderung: C:\Users\danil\Downloads\amoriva-films-site-backup-vor-hintergrund-2026-10-22 (app, components, content, STYLE.md).
- Tageslauf geändert: kein eigenes Mitwandern mehr, liegt absolut im body über die ganze Seitenhöhe (cover, oben ausgerichtet) und scrollt normal mit. Momente: Notiz weiter rechts und frei, Handschrift Deckkraft .24.
- Gemälde nur noch in zwei Zonen der Startseite (.tag-zone--morgen um Hero+Arbeit, .tag-zone--wiese um Stimmen+Termine), Tageslauf.jsx entfernt.
- Hero: Papier + Wolken hängen an der klebenden Bühne (.hero-buehne::before), stehen still solange das Video klebt. Zone darunter beginnt eine Bühnenhöhe tiefer (background-position center max(100svh,600px)), nahtlos.

## Intro, Fassung 4 (2026-10-23)
- Briefbogen (Kupferstich) mit AMORIVA FILMS, reißt von rechts nach links auf; der abgerissene Teil rollt sich zur Papierrolle (Zylinder-Schattierung, wird dicker), echte Risskante als Maske (riss-senkrecht.webp) mit Fasern; am Ende fliegt die Rolle auf den Betrachter zu (scale bis 6.5, leichte Drehung, Blur 3px, ausblenden). Video zoomt beim Aufreißen von 1.12 auf 1.
- Zeitleiste per requestAnimationFrame: Wort ab 0,2 s, Riss 1,5 bis 3,4 s, Flug bis 4,25 s.
- Vorige Fassung (Zeichnen + Querriss) liegt als Intro-zeichnen-riss.jsx im Backup-Ordner.

## Intro, Fassung 5 (2026-10-23): Filmstreifen
- Idee "aus Momenten wird ein Film": Filmstreifen (dunkler Träger, Perforation per SVG-Datenbild) mit den Momente-Bildern rauscht mit Bewegungsunschärfe (SVG feGaussianBlur nur waagerecht, aus der Geschwindigkeit) und leichter Neigung durch, bremst ab (ease-out quart, 2,3 s), hält 0,38 s mit Projektor-Flackern, dann Zoom ins Einzelbild bis bildschirmfüllend (1,05 s), Ausblenden ins Hero.
- Im Zielbild läuft das echte hero.mp4 ab dem Anhalten; beim Übergang übergibt das Intro die Abspielzeit (CustomEvent amoriva:intro-oeffnet, detail.zeit), Hero springt dorthin: kein Schnitt.
- Kein Logo im Intro. Fassungen 3 und 4 liegen im Backup-Ordner (Intro-zeichnen-riss.jsx, Intro-aufrollen.jsx).

## Intro, Fassung 6 (2026-10-23): clean wie Westfeld
- Nach Danilos Westfeld-Intro (IntroVorhang): Fläche Oliv-Braun, "AMORIVA" (Cormorant, Versalien) fliegt von links herein (0,25 s, 950 ms), "Films" in Schreibschrift (Khaki) taucht auf (1,05 s), Vorhang zieht nach oben weg (ab 1,75 s, 850 ms). Reines CSS, Skript nur für Sperre/Einmaligkeit/Hero-Signal.
- Fassungen 3 bis 5 sind verworfen; 3 und 4 liegen im Backup-Ordner.
- Intro als Preloader auf jeder Seite und bei jedem Seitenwechsel (im Layout, key = Pfad). Unter AMORIVA der Seitenname: Films, Über uns, Vision, Fragen, Anfrage, Impressum, Datenschutz.
- Kopfzeile Modus 'dunkel': auf Seiten mit data-dunkler-kopf="flaeche" (Fragen, Vision) wird die Leiste Oliv-Braun mit heller Schrift, solange die Fläche darunter liegt.
