# INSPO Amoriva Films Redesign

Quelle: FigJam-Board "Amoriva-Films" (https://www.figma.com/board/XvdCbkmEpYcXSUwPPYwhHc/Amoriva-Films), ausgelesen am 2026-10-19.
Das Board hat vier Spalten: Funktion (links), Layout beispiel (oben Mitte), Design (Mitte rechts), Jetzige Verbesserungen/Änderungen/Fehler (rechts).
Ziel laut Danilo: Amoriva Films auf ein neues Niveau heben, Wolfsburg übernehmen. Zuerst lokal bauen.

## Grundrichtung (Spalte Funktion, Danilos Notizen)

- "Schriftarten: Elegant Vintage aber auch Modern und Lesbar"
- "Ich möchte eine Vintage, Königliche Seite!" / "Wir brauchen krassen Look, so ein Vintage Look."
- "Italienisch Vintage als Italiener": die italienische Herkunft ist Teil der Marke.
- "Wichtig ist, dass die Seite Sinn macht, auch vom Pain etc.": Inhalte müssen die Probleme der Paare ansprechen, nicht nur schön sein.
- "Ich möchte zu jedem Thema Unterseiten: Fragen, Über uns, Vision, Anfragen."
- "Überall wo du Bilder brauchst oder sonst was: mach Platzhalter."
- "Wichtig: Hero-Video soll erstmal bestehen bleiben, danach alles vintage. Du kannst aber das Hero-Video vintage umrahmen."

## Signatur-Effekte (alle aus dem Board)

1. Intro: "Start mit Amoriva-Stempel, der sich öffnet, und dann kommt die Webseite." Bildreferenz: Briefumschlag mit grünem Wachssiegel auf Landschaftsgemälde (unten links) und Siegel auf Papier mit Kupferstich-Landschaft (unten rechts, "KI-modifiziert").
2. "Bevor man auf die Seite kommt, kommt erstmal Amoriva eingeblendet: mit Animation und passendem Effekt (Hochzeit + Ästhetik)."
3. "Ein Wachsstempel, der irgendwo raufklatscht."
4. "Vintage-Brief, der sich öffnet, und dann kommt ein Vintage-Blatt raus, wo etwas steht (Scroll-Effekte)."
5. Prozess "Von der ersten Nachricht bis zu eurem Film": "Komplett anderes Design!" und "ersetzen durch sowas, baue eine Vintage-Telefon-Animation, die dann diese 5 Bereiche aufzählt." Referenz: Wählscheibe mit Ziffern 0 bis 9, Mitte "It's time for a love story".
6. Verfügbarkeit 2026/2027: "Dass man hier drauf klicken kann und dann auch auf die Anfrage-Seite kommt."

## Referenzen (Spalten Layout beispiel und Design)

- The Crown Perfumery ("Layout beispiel"): Editorial-Vintage-Layout wie ein Magazin, gerahmtes Titelbild auf dunkelgrünem Grund, Serifen-Versalien, Ornamente, cremefarbener Textteil, Porträt mit Unterschrift. Übernehmen: Aufbau und Haltung der Seite.
- "Capturing those real moments" ("Nur Hintergrund-Effekt mit dem Blatt"): zerknittertes Papier als Hintergrund. Übernehmen: nur die Papierstruktur, nicht das Layout.
- GUESS ("Aufgerissener Hintergrund"): Papier reißt auf und gibt ein Bild frei, tiefes Rot. Übernehmen: den Aufreiß-Effekt als Übergang.
- Lunerre: dunkles Oliv, ovales Porträt im Goldrahmen, Luxus-Vintage.
- About Runaway Vows ("About us haben derzeit kein Duo-Bild, überlege dort dir was anderes"): Über-uns ohne gemeinsames Foto lösen.
- Valerie Marie ("Vintage Look für About us"): Papier mit Prägung, gerahmte Bilder.
- Meet the Founders (Jake Weisler, Nate Teaman): zwei Gründer, je Porträt, Name in Serifen-Versalien, Rolle, Bio. Vorlage für Über uns.
- "Show Section: Auch so vintage design": dunkelolive Fläche mit Bilderreihe und Schreibschrift.
- "Section: Auch so vintage design": dunkle Editorial-Strecke mit Bildern und "Ready to make magic?".
- Dark Editorial ("Wildly in love", "Let's tell your story", "Nice to meet you", "The script forever"): dunkle Sections mit Serifen-Headlines, Bild-Collagen.
- Footer ("Let's create something beautiful together"): Schwarzweiß-Weitwinkelbild, Serifen-Headline, darunter dunkle Leiste mit Navigation und Bildraster.
- Vision-Seite ("Vielleicht Platzhalter für ein Video, das da reinkommt, und unten beim Moodboard Bilder, die wir schon haben. Ich gebe dir dann nochmal genau welche."): Referenz Emma & Liam mit Moodboard-Collage auf hellem Grund.
- Contact us ("Nur Formular-Design, oben Hero ass"): Anfrage-Seite mit Bild-Hero oben und RSVP-artigem Formular.

## Fehler und Änderungen an der jetzigen Seite (Spalte rechts)

- "Unsere Arbeit": Text lässt sich markieren, am Ende von "vergesst" hängt ein Leerzeichen-Fehler. Beheben.
- "Schriftart kann man kacke lesen! Brauchen da eine andere, moderne. Schau mal im Hero, wir brauchen passende Schriftarten, die gemeinsam matchen."
- "Diese Texte Aufgaben-Bereiche weg! Wir sind ein Team." (Beratung und Kreativleitung, Videografie und Bildgestaltung unter den Gründerfotos)
- Gründerfotos: "Andere Lösung finden, dass die Bilder von uns vollständig gesehen werden, plus Animation (Zoom, z. B. wie jetzt)."
- "Onepager macht null Sinn! Über uns will ich doch als Unterseite etc."

## Material

- Hero-Video: das bestehende `/videos/hero.mp4` bleibt.
- Gründerfotos Nevio und Danilo: vorhanden im Repo (`public/images/nevio-v2.webp`, `danilo-v3.webp`).
- Hochzeitsfotos: vorhanden im Repo (`public/images/`, `public/images/paare/`). Welche auf die Vision-Seite kommen, liefert Danilo noch.
- Logo: `public/images/logo.webp`.
- Wachssiegel-Motiv für das Intro: nur als Referenz im Board (KI-modifiziert). Eigenes Siegel mit Amoriva-Monogramm wird gebraucht.

## Nicht lesbar oder offen

- `get_figjam` scheitert an der Größe des Boards. Ausgelesen wurde zuerst über den Gesamt-Screenshot, am 19.10.2026 dann zusätzlich die ersten 20 Original-Bilder einzeln (Figma liefert höchstens 20 pro Abruf). Daraus übernommen: geprägtes Passepartout und Blindprägung (Valerie Marie), Samt-Oliv mit dunklen Ecken (Lunerre), rau-wolkiges Olivpapier (Intimate and Elegance), Knitterpapier (Capturing those real moments). Weitere Referenzen (Crown Perfumery groß, Meet the Founders, Wählscheibe) werden vor ihrer Section einzeln geladen.
- Schriftpaar ist laut Danilo offen und wird gemeinsam festgelegt.
- Farben stehen nicht als Farbflächen mit Hex im Board. Aus den Referenzen ablesbar: dunkles Oliv, Creme/Papier, Schwarz, Sage-Grün des Siegels.
