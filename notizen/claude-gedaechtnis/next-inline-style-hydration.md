---
name: next-inline-style-hydration
description: "Next.js \"1 error\"-Badge durch inline <style>-Kinder mit Apostrophen (Hydration-Mismatch)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 6c7c7eeb-3022-47f2-a2ec-0a63637ee902
  modified: 2026-10-17T15:20:08.434Z
---

Am Amoriva-Films-Projekt (Next.js App Router) warf ein `<style>{`...`}</style>` mit
Template-String-**Kindern** einen Hydration-Error, den der Dev-Server als **"1 error"** im
Badge zeigt. Ursache: enthaelt das CSS Apostrophe (`content: ''`, `[data-auf='1']`,
`content: ''` in Pseudoelementen), **escaped React sie beim Server-Rendern zu `&#x27;`**,
im Client stehen rohe `'`. `<style>` ist ein RAWTEXT-Element, der Browser **decodiert die
Entity nicht** -> "Text content did not match. Server vs Client" -> ganze Seite faellt auf
Client-Rendering zurueck.

**Fix:** inline-CSS NICHT als Kinder, sondern
`<style dangerouslySetInnerHTML={{ __html: `...` }} />` -> rohes CSS, Server == Client.
Betraf FAQ, BegrenztTermine, Founders, Prozess (Commit dbfef11).

**Diagnose-Weg (zuverlaessig, auch ohne sichtbaren Pane):**
- `read_console_messages {onlyErrors:true}` zeigt den Mismatch im Klartext (Server-Block mit
  `&#x27;`, Client-Block mit `'`) und die Komponente im Stacktrace.
- Ob das Server-HTML wirklich noch buggy ist: `curl localhost:PORT | grep "content: &#x27;"`.
  0 Treffer = gefixt; rohe `content: ''` sollen dastehen.

**Zwei Fallen beim Verifizieren:**
1. **Stale HMR:** nach dem Edit lieferte der laufende Server den Style DOPPELT (einmal escaped,
   einmal roh) und der Stacktrace zeigte eine alte Zeilennummer. Hot-Reload reicht hier NICHT -
   Dev-Server stoppen, **komplettes `.next` loeschen** (nicht nur `.next/cache`), neu starten.
   (Weiter gilt: nie `npm run build` waehrend `next dev` laeuft, siehe [[dev-build-clobber]].)
2. **Konsolen-Buffer:** `read_console_messages` behaelt Fehler ueber `navigate` hinweg. Nach dem
   Neustart zeigte der alte Tab weiter die 17 alten Fehler. Erst ein **frischer Tab**
   (`tabs_create` + `navigate`) hat einen leeren Buffer -> dort "No console logs" = sauber.

Siehe [[amoriva-dev-server]], [[browser-pane-limits]].
