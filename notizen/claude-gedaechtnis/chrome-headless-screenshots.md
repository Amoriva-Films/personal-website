---
name: chrome-headless-screenshots
description: "Echte Screenshots in 375/768/1440 px über Chrome headless + DevTools-Protokoll, weil der App-Browser-Pane zu klein ist"
metadata:
  node_type: memory
  type: reference
  originSessionId: 0ad7c58d-5f35-4930-985b-aff99e511fa0
  modified: 2026-10-19T21:38:57.682Z
---

Der Claude-Browser-Pane rendert die Seite oft winzig (ca. 345x172) oder versteckt, Details sind
nicht beurteilbar. Zuverlässig: das installierte Chrome
(`C:/Program Files/Google/Chrome/Application/chrome.exe`) headless mit
`--remote-debugging-port` starten und per Node-24-WebSocket (eingebaut, kein Puppeteer) steuern:
`Emulation.setDeviceMetricsOverride`, `Page.addScriptToEvaluateOnNewDocument` (z. B. sessionStorage
für Intro an/aus), `Page.navigate`, warten, `Runtime.evaluate` (scrollen/klicken),
`Page.captureScreenshot`; Konsolenfehler über `Runtime.exceptionThrown` / `consoleAPICalled`.
Das PNG dann mit dem Read-Tool ansehen. Rund 80 Zeilen Skript, gehört in den Scratchpad, nicht ins Repo.
Ausführlich im Vault: `04 Ressourcen/Webentwicklung/Echte Screenshots per Chrome headless.md`.
Ergänzt [[browser-pane-limits]].

Falle: `--user-data-dir` muss ein absoluter Pfad sein. Mit relativem Pfad (z. B. `node shot.mjs r5 ...`) beendet sich Chrome sofort und das Skript meldet "Chrome nicht erreichbar". Ausgabeordner absolut übergeben.
