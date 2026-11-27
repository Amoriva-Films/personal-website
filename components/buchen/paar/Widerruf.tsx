"use client";

import { useState } from "react";
import { Band, Fehler, Feld, Karte, Knopf, Label } from "@/components/buchen/basis/bausteine";
import { berlinTag, berlinZeitpunkt, kurzDatum, tageAddieren } from "@/lib/films-zeit";
import type { PaarSeite } from "@/lib/films-typen";

// Online-Widerrufsfunktion (§ 356a BGB): innerhalb von 14 Tagen nach der Unterschrift „Vertrag widerrufen“, danach
// eine Bestätigungsstufe „Widerruf bestätigen“. Route POST /api/buchen/paar/widerruf { schluessel, name }.
// Nach Ablauf der Frist zeigt die Komponente nichts. Die Frist prüft der Server noch einmal.

/** Ende der Frist wie widerrufBis in oeffentlich-paar.ts: Ende des 14. Tages nach dem Tag der Unterschrift (Berlin). */
function fristEnde(unterschriebenAm: string) {
  const tag = berlinTag(new Date(unterschriebenAm));
  return { ende: berlinZeitpunkt(tageAddieren(tag, 15), 0).getTime() - 1, text: kurzDatum(tageAddieren(tag, 14)) };
}

type Stand = { art: "zu" } | { art: "frage" } | { art: "fertig"; am: string };

export function Widerruf({
  schluessel,
  unterschriebenAm,
  name: vorname = "",
  fertig,
}: {
  schluessel: string;
  /** ISO-Zeitpunkt der Unterschrift (PaarSeite.widerruf.unterschriebenAm). */
  unterschriebenAm: string;
  /** Name aus der Unterschrift zum Vorausfüllen (PaarSeite.widerruf.name). */
  name?: string;
  /** Wird mit der neuen Seite aufgerufen, sobald der Widerruf eingegangen ist. */
  fertig?: (seite: PaarSeite) => void;
}) {
  const [stand, setStand] = useState<Stand>({ art: "zu" });
  const [name, setName] = useState(vorname);
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  // Einmal beim Anzeigen festhalten, damit die Darstellung stabil bleibt
  const [jetzt] = useState(() => Date.now());
  const frist = fristEnde(unterschriebenAm);

  if (stand.art === "fertig") {
    return (
      <Band style={{ marginTop: 22 }}>
        <p className="klein" role="status">
          Euer Widerruf ist am {stand.am} bei uns eingegangen. Die Bestätigung schicken wir euch per Mail.
        </p>
      </Band>
    );
  }
  if (!Number.isFinite(frist.ende) || jetzt > frist.ende) return null;

  const bestaetigen = async () => {
    if (laeuft || name.trim().length < 3) return;
    setLaeuft(true);
    setFehler(null);
    try {
      const res = await fetch("/api/buchen/paar/widerruf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schluessel, name: name.trim() }),
        cache: "no-store",
      });
      const json = (await res.json().catch(() => ({}))) as { seite?: PaarSeite; error?: string };
      if (!res.ok || !json.seite) {
        setFehler(json.error ?? "Das hat gerade nicht geklappt. Schreibt uns kurz, wir kümmern uns sofort.");
        setLaeuft(false);
        return;
      }
      setStand({ art: "fertig", am: json.seite.widerrufen?.am ?? "heute" });
      fertig?.(json.seite);
    } catch {
      setFehler("Keine Verbindung. Bitte probiert es noch einmal.");
      setLaeuft(false);
    }
  };

  if (stand.art === "zu") {
    return (
      <div style={{ marginTop: 28 }}>
        <Label>Widerruf</Label>
        <p className="leise klein" style={{ marginTop: 8 }}>
          Bis zum {frist.text} könnt ihr den Vertrag ohne Angabe von Gründen widerrufen.
        </p>
        <p style={{ marginTop: 4 }}>
          <button type="button" className="textlink" onClick={() => setStand({ art: "frage" })}>
            Vertrag widerrufen
          </button>
        </p>
      </div>
    );
  }

  return (
    <Karte style={{ marginTop: 28 }}>
      <Label>Vertrag widerrufen</Label>
      <p className="klein" style={{ marginTop: 10 }}>
        Wollt ihr den Vertrag wirklich widerrufen? Euer Tag ist dann nicht mehr für euch gebucht. Habt ihr schon etwas gezahlt, bekommt ihr es zurück.
      </p>
      <Feld label="Euer Vor- und Nachname" style={{ marginTop: 18 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} />
      </Feld>
      <p className="leise klein" style={{ marginTop: 10 }}>
        Die Bestätigung mit Datum und Uhrzeit schicken wir an eure Mail-Adresse.
      </p>
      <div style={{ marginTop: 22 }}>
        <Knopf art="hell-voll" disabled={name.trim().length < 3} beschaeftigt={laeuft} onClick={() => void bestaetigen()}>
          {laeuft ? "Einen Moment" : "Widerruf bestätigen"}
        </Knopf>
      </div>
      <p style={{ textAlign: "center", marginTop: 6 }}>
        <button type="button" className="textlink" disabled={laeuft} onClick={() => setStand({ art: "zu" })}>
          Abbrechen
        </button>
      </p>
      <Fehler text={fehler} />
    </Karte>
  );
}
