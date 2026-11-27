"use client";

import { useEffect, useState } from "react";
import { Karte, Label } from "@/components/buchen/basis/bausteine";
import type { AbgabeFuersPaar } from "@/lib/films-typen";

// Abgabe auf der Paar-Seite (Agent E4): freigegebene Links zu Film und Fotos im Look der Strecke.
// Zeigt nichts, solange nichts freigegeben ist. Der Schlüssel geht nur im Body an den Server.
const ROUTE = "/api/buchen/paar/abgabe";

export function Abgabe({ schluessel }: { schluessel: string }) {
  const [eintraege, setEintraege] = useState<AbgabeFuersPaar[]>([]);

  useEffect(() => {
    if (!schluessel) return;
    let aus = false;
    void (async () => {
      try {
        const res = await fetch(ROUTE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ schluessel }), cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { eintraege?: AbgabeFuersPaar[] };
        if (!aus && Array.isArray(json.eintraege)) setEintraege(json.eintraege);
      } catch {
        // Ohne Verbindung bleibt der Bereich einfach weg, die übrige Seite funktioniert weiter
      }
    })();
    return () => {
      aus = true;
    };
  }, [schluessel]);

  if (!eintraege.length) return null;

  return (
    <Karte style={{ marginTop: 22 }}>
      <Label>Eure Erinnerungen</Label>
      <div style={{ marginTop: 8 }}>
        {eintraege.map((e) => {
          const unter = [e.datumText, e.passwortHinweis].filter(Boolean).join(" · ");
          return (
            <a key={e.id} className="aufgabe" href={e.link} target="_blank" rel="noopener noreferrer">
              <span className="was">
                {e.titel}
                {unter ? <small>{unter}</small> : null}
              </span>
              <span className="pfeil" aria-hidden="true">
                ↗
              </span>
            </a>
          );
        })}
      </div>
      <p className="leise klein" style={{ marginTop: 12 }}>
        Ladet euch am besten alles bald herunter und sichert es an einem zweiten Ort.
      </p>
    </Karte>
  );
}
