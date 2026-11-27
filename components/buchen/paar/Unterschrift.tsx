"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Abstand, Fehler, Feld, Karte, Knopf, Label } from "@/components/buchen/basis/bausteine";
import type { UnterschriftDaten } from "./PaarSeite";

// Unterschrift wie im Prototyp: Name, Anschrift, mit dem Finger gezeichnete Unterschrift, zwei Häkchen.
// Vor dem endgültigen Unterschreiben kommt ein 6-stelliger Code per Mail (Route /api/buchen/paar/vertrag/code).
// Ist der Mailversand aus, geht es ohne Code weiter (der Nachweis vermerkt das).
// Den Schlüssel liest die Komponente selbst aus der Adresse (#schlüssel), wie PaarSeite, falls er nicht als Prop kommt.

/** Gleicher Wortlaut wie VORZEITIG_TEXT in src/lib/films/oeffentlich-paar.ts (§ 356 Abs. 4, § 357a Abs. 2 BGB). */
const VORZEITIG_TEXT =
  "Wir verlangen ausdrücklich, dass mit der Leistung schon vor Ablauf der vierzehntägigen Widerrufsfrist begonnen wird. Uns ist bekannt, dass wir bei einem Widerruf einen angemessenen Betrag für die bis dahin erbrachten Leistungen zahlen und dass unser Widerrufsrecht erlischt, sobald der Vertrag vollständig erfüllt ist.";

type Anschrift = { strasse: string; plz: string; ort: string };
const LEER: Anschrift = { strasse: "", plz: "", ort: "" };

/** Was zusätzlich zu UnterschriftDaten an /api/buchen/paar/vertrag geht. */
export type UnterschriftZusatz = { anschrift: Anschrift; anschrift2?: Anschrift; code?: string };

type CodeStand = { art: "keiner" } | { art: "gesendet"; an: string; minuten: number };

const anschriftOk = (a: Anschrift) => a.strasse.trim().length >= 3 && /^\d{4,5}$/.test(a.plz.replace(/\s/g, "")) && a.ort.trim().length >= 2;

function schluesselAusAdresse() {
  return decodeURIComponent(window.location.hash.replace(/^#/, "")).trim();
}

function AnschriftFelder({ wert, setzen, titel }: { wert: Anschrift; setzen: (a: Anschrift) => void; titel?: string }) {
  return (
    <>
      <Feld label={titel ?? "Straße und Hausnummer"} style={{ marginTop: 12 }}>
        <input value={wert.strasse} onChange={(e) => setzen({ ...wert, strasse: e.target.value })} autoComplete="street-address" maxLength={120} />
      </Feld>
      <div className="zwei">
        <Feld label="PLZ">
          <input value={wert.plz} onChange={(e) => setzen({ ...wert, plz: e.target.value })} inputMode="numeric" autoComplete="postal-code" maxLength={5} />
        </Feld>
        <Feld label="Ort">
          <input value={wert.ort} onChange={(e) => setzen({ ...wert, ort: e.target.value })} autoComplete="address-level2" maxLength={80} />
        </Feld>
      </div>
    </>
  );
}

export function Unterschrift({ unterschreiben, schluessel }: { unterschreiben: (e: UnterschriftDaten) => Promise<string | null>; schluessel?: string }) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const malt = useRef(false);
  const breite = useRef(0);
  const [gezeichnet, setGezeichnet] = useState(false);
  const [name, setName] = useState("");
  const [anschrift, setAnschrift] = useState<Anschrift>(LEER);
  const [getrennt, setGetrennt] = useState(false);
  const [anschrift2, setAnschrift2] = useState<Anschrift>(LEER);
  const [gelesen, setGelesen] = useState(false);
  const [vorzeitig, setVorzeitig] = useState(false);
  const [codeStand, setCodeStand] = useState<CodeStand>({ art: "keiner" });
  const [code, setCode] = useState("");
  const [laeuft, setLaeuft] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  /** Zeichenfläche an die echte Größe anpassen. Leert sie dabei, darum nur bei neuer Breite. */
  const skalieren = (erzwingen = false) => {
    const cv = canvas.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    if (!r.width || (!erzwingen && r.width === breite.current)) return;
    breite.current = r.width;
    const d = window.devicePixelRatio || 1;
    cv.width = r.width * d;
    cv.height = r.height * d;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.scale(d, d);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#EEE9DE";
    setGezeichnet(false);
  };

  useEffect(() => {
    const neu = () => skalieren();
    neu();
    window.addEventListener("resize", neu);
    return () => window.removeEventListener("resize", neu);
  }, []);

  const pos = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  const fehlt = [
    name.trim().length < 3 ? "Name" : "",
    anschriftOk(anschrift) && (!getrennt || anschriftOk(anschrift2)) ? "" : "Anschrift",
    gezeichnet ? "" : "Unterschrift",
    gelesen ? "" : "Häkchen",
  ].filter(Boolean);

  const codeFehlt = codeStand.art === "gesendet" && !/^\d{6}$/.test(code.replace(/\s/g, ""));

  const absenden = async (mitCode: boolean) => {
    if (!canvas.current) return;
    const eingabe: UnterschriftDaten & UnterschriftZusatz = {
      name: name.trim(),
      anschrift,
      ...(getrennt ? { anschrift2 } : {}),
      ...(mitCode ? { code: code.replace(/\s/g, "") } : {}),
      unterschrift: canvas.current.toDataURL("image/png"),
      gelesen,
      vorzeitigerBeginn: vorzeitig,
    };
    const f = await unterschreiben(eingabe);
    if (f) {
      setFehler(f);
      setLaeuft(false);
    }
  };

  /** Code per Mail anfordern. Ist der Versand aus, gleich ohne Code unterschreiben. */
  const codeAnfordern = async () => {
    setLaeuft(true);
    setFehler(null);
    try {
      const res = await fetch("/api/buchen/paar/vertrag/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schluessel: schluessel ?? schluesselAusAdresse() }),
        cache: "no-store",
      });
      const json = (await res.json().catch(() => ({}))) as { art?: string; an?: string; minuten?: number; error?: string };
      if (!res.ok) {
        setFehler(json.error ?? "Das hat gerade nicht geklappt. Bitte probiert es noch einmal.");
        setLaeuft(false);
        return;
      }
      if (json.art === "versand_aus") {
        await absenden(false);
        return;
      }
      setCodeStand({ art: "gesendet", an: json.an ?? "", minuten: json.minuten ?? 15 });
      setCode("");
      setLaeuft(false);
    } catch {
      setFehler("Keine Verbindung. Bitte probiert es noch einmal.");
      setLaeuft(false);
    }
  };

  const los = () => {
    if (fehlt.length || laeuft) return;
    if (codeStand.art === "keiner") {
      void codeAnfordern();
      return;
    }
    if (codeFehlt) return;
    setLaeuft(true);
    setFehler(null);
    void absenden(true);
  };

  return (
    <Karte>
      <Label>1 · Euer Name</Label>
      <Feld label="Vor- und Nachname, wie im Ausweis" style={{ marginTop: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Zum Beispiel: Lena Beispiel" autoComplete="name" maxLength={120} />
      </Feld>
      <Label style={{ marginTop: 28 }}>2 · Eure Anschrift</Label>
      <AnschriftFelder wert={anschrift} setzen={setAnschrift} />
      <label className="check">
        <input type="checkbox" checked={getrennt} onChange={(e) => setGetrennt(e.target.checked)} />
        <span>Wir wohnen nicht zusammen.</span>
      </label>
      {getrennt ? <AnschriftFelder wert={anschrift2} setzen={setAnschrift2} titel="Zweite Anschrift: Straße und Hausnummer" /> : null}
      <Label style={{ marginTop: 28 }}>3 · Unterschrift</Label>
      <div className="sign-feld">
        <canvas
          ref={canvas}
          aria-label="Hier mit dem Finger unterschreiben"
          onPointerDown={(e) => {
            skalieren();
            const ctx = e.currentTarget.getContext("2d");
            if (!ctx) return;
            malt.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            const [x, y] = pos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
          }}
          onPointerMove={(e) => {
            if (!malt.current) return;
            const ctx = e.currentTarget.getContext("2d");
            if (!ctx) return;
            const [x, y] = pos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
            if (!gezeichnet) setGezeichnet(true);
          }}
          onPointerUp={() => {
            malt.current = false;
          }}
          onPointerCancel={() => {
            malt.current = false;
          }}
        />
        {!gezeichnet ? <p className="sign-hinweis">Hier mit dem Finger unterschreiben</p> : null}
        <span className="sign-linie" />
      </div>
      <p style={{ textAlign: "right" }}>
        <button className="textlink" type="button" onClick={() => skalieren(true)}>
          Unterschrift löschen
        </button>
      </p>
      <label className="check">
        <input type="checkbox" checked={gelesen} onChange={(e) => setGelesen(e.target.checked)} />
        <span>Wir haben den Vertrag gelesen und sind einverstanden.</span>
      </label>
      <label className="check">
        <input type="checkbox" checked={vorzeitig} onChange={(e) => setVorzeitig(e.target.checked)} />
        <span>{VORZEITIG_TEXT}</span>
      </label>
      <p className="leise klein" style={{ marginTop: 10 }}>
        Ihr könnt den Vertrag 14 Tage lang ohne Angabe von Gründen widerrufen, auch hier auf eurer Seite. Die Widerrufsbelehrung steht am Ende des Vertrags.
      </p>
      {codeStand.art === "gesendet" ? (
        <>
          <Label style={{ marginTop: 28 }}>4 · Code aus der Mail</Label>
          <p className="leise klein" style={{ marginTop: 8 }}>
            Wir haben euch einen Code{codeStand.an ? ` an ${codeStand.an}` : ""} geschickt. Er gilt {codeStand.minuten} Minuten.
          </p>
          <Feld label="6-stelliger Code" style={{ marginTop: 12 }}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^\d\s]/g, ""))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={7}
              placeholder="123456"
            />
          </Feld>
          <p style={{ textAlign: "right" }}>
            <button className="textlink" type="button" disabled={laeuft} onClick={() => void codeAnfordern()}>
              Neuen Code schicken
            </button>
          </p>
        </>
      ) : null}
      <Abstand />
      <Knopf art="hell-voll" disabled={fehlt.length > 0 || codeFehlt} beschaeftigt={laeuft} onClick={los}>
        {laeuft ? "Einen Moment" : codeStand.art === "gesendet" ? "Verbindlich unterschreiben" : "Code anfordern"}
      </Knopf>
      <p className="leise klein" style={{ marginTop: 10, textAlign: "center" }} aria-live="polite">
        {fehlt.length
          ? `Es fehlen noch: ${fehlt.join(", ")}`
          : codeStand.art === "gesendet"
            ? codeFehlt
              ? "Tragt den Code aus der Mail ein."
              : "Alles bereit."
            : "Zum Bestätigen schicken wir euch einen Code per Mail."}
      </p>
      <Fehler text={fehler} />
    </Karte>
  );
}
