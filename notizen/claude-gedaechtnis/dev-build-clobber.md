---
name: dev-build-clobber
description: Nie npm run build ausfuehren waehrend next dev laeuft - zerschiesst die CSS
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 48454e1e-0fa3-4704-ae3e-a7daf096c06f
  modified: 2026-07-20T15:06:30.645Z
---

Bei Amoriva NIE `npm run build` (Produktions-Build) ausfuehren, waehrend der
`next dev`-Server laeuft. Der Prod-Build ueberschreibt `.next/`, und der laufende
Dev-Server liefert danach `/_next/static/css/app/layout.css` als **404** aus →
die Seite erscheint komplett OHNE CSS (alles untereinander, kein Layout).

**Why:** Genau das hat den Nutzer wiederholt „geht gar nichts / kann nichts angucken"
sehen lassen (unstyled Seite), obwohl der Code korrekt war.

**How to apply:** Zum Verifizieren `npx tsc --noEmit` nutzen; `npm run build` nur, wenn
KEIN Dev-Server laeuft (vorher Node stoppen), und danach den Dev-Server mit frischem
`.next` neu starten (Node stoppen, `.next` loeschen, `npm run dev`). Wenn der Nutzer
unstyled/„kaputt" meldet: zuerst pruefen, ob `curl $CSS` 200 liefert; bei 404 = dieser
Clobber → Dev sauber neu starten. Siehe [[browser-pane-limits]] und [[amoriva-project-state]].
