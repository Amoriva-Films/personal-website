# Übergabe Windows-PC → Mac (23.10.2026)

## Stand
- Branch `redesign-vintage` enthält das komplette Vintage-Redesign. `main` = alte Live-Seite, noch nicht ersetzt.
- Live geht es, sobald `redesign-vintage` nach `main` gemerged und gepusht ist (Vercel baut automatisch). Nur auf ausdrückliches "live" von Danilo.
- Lokal testen: `npm run build && npx next start -p 4000` (Produktionsfassung, flüssiger als `npm run dev`). Nie `build` laufen lassen, während `next dev` läuft.

## Offen vor dem Live-Gang
1. Vision-Seite hat sichtbare Platzhalter ([VIDEO FOLGT], [TEXT FEHLT], [BILDAUSWAHL FOLGT]). Vorschlag: Vision vorerst aus Menü und Fuß nehmen.
2. Zwei unbestätigte Aussagen in `content/texte.js`: "seit vier Jahren in der Medienbranche, für Unternehmen gedreht, geschnitten und Social-Media-Auftritte betreut" (Vision-Seite und Über uns) und "Antwort innerhalb von 24 Stunden" (Brief). Danilo fragen.
3. Alte Unterseiten (leistungen, filme, referenzen, angebote, ratgeber) sind noch im alten Design, aber nicht im Menü.
4. Vorschlag für die Schreibschrift-Zeile unter "Kennt ihr das?": "Wir sorgen dafür, dass euch nichts davon verloren geht." (statt "Und genau das machen wir anders.") noch nicht bestätigt.

## Wichtigste Vorlieben (Details in STYLE.md und claude-gedaechtnis/)
- Intro: clean wie Danilos Westfeld-Intro (Fläche, Name fliegt rein, Vorhang hoch). Aufwendige Intros lehnt er ab.
- Farben Sand/Creme/Khaki/Oliv-Braun, kein dunkles Grün, keine Goldrahmen, kein Text markierbar, alle Knöpfe gleiche Plakette.
- Hintergründe bei klebenden Abschnitten nie mitscrollen lassen.
- Texte: Team Amoriva statt zwei Namen, kein Werbe- oder Guru-Ton, ehrlich (sie leiten Paare an). Aufbau Problem → Lösung ganz unten.
- Skill `anti-ai-slop-writing` liegt in `.claude/skills/` und gilt für alle Texte.

## Figma
- Board: https://www.figma.com/board/XvdCbkmEpYcXSUwPPYwhHc/Amoriva-Films
- Die sechs Referenzen der aktuellen Richtung: Knoten 17:88, 17:39, 1:346, 16:24, 16:35, 16:31.
- KI-Bilder entstehen in der Datei "Amoriva Films Assets" (fileKey DyZy8t4Gk14ndSSDh0pxr2), Modell gpt-image-2.5-sunburst. Freistellen per Magenta, siehe claude-gedaechtnis/.

## Was nicht im Repo ist
- Obsidian-Vault "SECOND GEHIRN" (liegt auf dem Windows-PC) mit Projektnotiz "02 Projekte/Amoriva Films Website.md" und Danilos globalen Regeln (Vault-CLAUDE.md).
- Backup-Ordner mit alten Intro-Fassungen und KI-Rohbilder (nicht nötig).
