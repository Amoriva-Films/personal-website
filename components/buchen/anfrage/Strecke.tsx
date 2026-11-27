"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AnfrageRueckmeldung, DatumAuskunft, PaketId } from "@/lib/films-typen";
import { Abstand, Band, Fehler, Feld, Haken, Karte, Knopf, Kopf, Label, Lade, SchrittLeiste } from "../basis/bausteine";
import titel from "../basis/bilder/titel.webp";
import { KONTAKT } from "../basis/kontakt";
import { PFADE } from "../basis/pfade";
import { pruefeKontakt, pruefeWunsch, type AnfrageEingabe, type FeldFehler } from "./pruefung";
import { GAESTE, HERKUNFT, MAX_DATEN, WUENSCHE, WUNSCH_REIHENFOLGE } from "./werte";

// Stufe 1 und 2 der Buchungsstrecke: Datum prüfen, Anfrage in zwei Schritten, Danke.
// Öffentlich gibt es nur „frei“ oder „bitte anfragen“, das ehrliche Ergebnis mit Wartelistenplatz kommt erst nach
// dem Absenden. Nach dem Prüfen geht es ohne Zwischenseite direkt ins Formular (Nevio 27.11.2026): das Ergebnis
// steht als kurze Zeile über Schritt 1. Schritt 1 fragt den Wunsch (Paket, Datum, Ort, Gäste), Schritt 2 wer ihr
// seid. Jede Eingabe wird vor dem Weiter im Browser geprüft (pruefung.ts, Regeln wie in Selfmade), Fehler stehen
// direkt am Feld. Der Server prüft zusätzlich.

type Seite = "start" | "pruefung" | "schritt1" | "schritt2" | "danke";

/** Reihenfolge der Felder je Schritt: der Weiter-Knopf springt zum ersten Fehler. */
// Schritt 1: wer ihr seid, Schritt 2: eure Hochzeit (Nevio 27.11.: erst die Daten des Paares)
const FELDER_SCHRITT1 = ["namen", "email", "telefon"];
const FELDER_SCHRITT2 = ["paket", "datum", "wunschdatum-1", "wunschdatum-2", "ort", "gaeste", "nachricht"];
const nur = (f: FeldFehler, ids: string[]): FeldFehler => Object.fromEntries(Object.entries(f).filter(([k]) => ids.includes(k)));

function zumFeld(id: string) {
  const el = document.getElementById(id === "paket" ? "paket-wahl" : id);
  if (!el) return;
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "center", behavior: ruhig ? "auto" : "smooth" });
  const ziel = id === "paket" ? el.querySelector<HTMLElement>("[aria-checked=true]") ?? el.querySelector<HTMLElement>("button") : el;
  ziel?.focus({ preventScroll: true });
}

/**
 * Herkunft als eigene Zeile in der Notiz. OFFEN (oeffentlich.ts): anfrageFelder kennt kein Feld „herkunft“ und
 * FilmsPaar keine Herkunft. Bis dahin geht sie in der Nachricht mit (und zusätzlich als Feld herkunft, das der
 * Server heute noch ignoriert). Sobald der Server herkunft selbst in die Notiz schreibt, hier nicht mehr anhängen.
 */
function nachrichtMitHerkunft(nachricht: string, herkunft: string) {
  const text = nachricht.trim();
  if (!herkunft) return text;
  const zeile = `Von uns erfahren über: ${herkunft}`;
  // Der Server kürzt die Nachricht auf 2000 Zeichen, die Herkunft soll dabei nicht wegfallen
  return [text.slice(0, 2000 - zeile.length - 2).trim(), zeile].filter(Boolean).join("\n\n");
}

/** Mindestdauer der Ladeanimation wie im Prototyp, damit das Ergebnis nicht hektisch aufspringt. */
const LADE_MS = 1900;

function heuteBerlin() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

function tagLang(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

async function senden<T>(url: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  } catch {
    throw new Error("Keine Verbindung. Prüft kurz euer Internet und versucht es noch einmal.");
  }
  const daten = (await res.json().catch(() => null)) as (T & { error?: string }) | null;
  if (!res.ok || !daten) throw new Error(daten?.error ?? "Gerade klemmt etwas bei uns. Versucht es noch einmal.");
  return daten;
}

const warte = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function Strecke({ dauerMin }: { dauerMin: number }) {
  const [seite, setSeite] = useState<Seite>("start");
  const [datum, setDatum] = useState("");
  const [min, setMin] = useState("");
  const [auskunft, setAuskunft] = useState<DatumAuskunft | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  // Anfrage
  const [namen, setNamen] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [paket, setPaket] = useState<PaketId>("komplett");
  const [weitere, setWeitere] = useState<string[]>([]);
  const [ort, setOrt] = useState("");
  const [gaeste, setGaeste] = useState("");
  const [nachricht, setNachricht] = useState("");
  const [herkunft, setHerkunft] = useState("");
  const [website, setWebsite] = useState("");
  const [sendet, setSendet] = useState(false);
  const [ergebnis, setErgebnis] = useState<AnfrageRueckmeldung | null>(null);
  // Felder, deren Fehler sichtbar ist: alle Fehler eines Schritts, sobald „Weiter“ gedrückt ist. Nicht schon beim
  // Verlassen eines Felds: der Fehlertext schöbe dann den Knopf weg, während er gedrückt wird, und der Klick ginge
  // ins Leere. Die Prüfung läuft bei jeder Eingabe neu, ein korrigiertes Feld ist also sofort wieder ruhig.
  const [gezeigt, setGezeigt] = useState<Set<string>>(() => new Set());
  const lauf = useRef(0);

  useEffect(() => {
    // Erst im Browser setzen, damit Server und Browser denselben ersten Stand zeigen
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMin(heuteBerlin());
  }, []);

  useEffect(() => {
    // Der Kopf der Website prüft nur beim Scrollen und bei Größenänderung, ob er über dem Bild des Einstiegs liegt.
    // Beim Wechsel zwischen den Stufen ändert sich die Adresse nicht, darum hier einmal anstoßen.
    window.dispatchEvent(new Event("resize"));
  }, [seite]);

  function zeige(s: Seite) {
    setFehler(null);
    setSeite(s);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  async function pruefen(neu?: string) {
    const d = neu ?? datum;
    if (!d) {
      document.getElementById("datum")?.focus();
      return;
    }
    if (neu) setDatum(neu);
    const nr = ++lauf.current;
    zeige("pruefung");
    try {
      const [a] = await Promise.all([senden<DatumAuskunft>("/api/buchen/datum", { datum: d }), warte(LADE_MS)]);
      if (nr !== lauf.current) return;
      setAuskunft(a);
      zeige("schritt1");
    } catch (err) {
      if (nr !== lauf.current) return;
      setSeite("start");
      setFehler(err instanceof Error ? err.message : "Versucht es noch einmal.");
    }
  }

  const alleDaten = [datum, ...weitere].filter(Boolean);
  const eingabe: AnfrageEingabe = { namen, email, telefon, datum, weitere, paket, ort, gaeste, nachricht };
  const fehlerWunsch = pruefeWunsch(eingabe, min);
  const fehlerKontakt = pruefeKontakt(eingabe);
  const alleFehler: FeldFehler = { ...fehlerWunsch, ...fehlerKontakt };
  const fehlerAm = (id: string) => (gezeigt.has(id) ? (alleFehler[id] ?? null) : null);

  function zeigeFehlerFuer(ids: string[]) {
    setGezeigt((alt) => new Set([...alt, ...ids]));
  }

  /** Prüft einen Schritt. Bei Fehlern: alle markieren, zum ersten springen, false. */
  function schrittOk(f: FeldFehler, reihenfolge: string[]) {
    const ids = reihenfolge.filter((id) => f[id]);
    if (!ids.length) return true;
    zeigeFehlerFuer(ids);
    setFehler(null);
    // Erst nach dem Zeichnen springen, damit der Fehlertext schon steht
    requestAnimationFrame(() => zumFeld(ids[0]!));
    return false;
  }

  const fehlerSchritt1 = nur(alleFehler, FELDER_SCHRITT1);
  const fehlerSchritt2 = nur(alleFehler, FELDER_SCHRITT2);

  function weiterNach1() {
    if (!schrittOk(fehlerSchritt1, FELDER_SCHRITT1)) return;
    zeige("schritt2");
  }

  async function absenden(e?: FormEvent) {
    e?.preventDefault();
    if (sendet) return;
    if (Object.keys(fehlerSchritt1).length) {
      zeige("schritt1");
      requestAnimationFrame(() => void schrittOk(fehlerSchritt1, FELDER_SCHRITT1));
      return;
    }
    if (!schrittOk(fehlerSchritt2, FELDER_SCHRITT2)) return;
    setSendet(true);
    setFehler(null);
    try {
      const r = await senden<AnfrageRueckmeldung>("/api/buchen/anfrage", {
        namen,
        email,
        telefon,
        wunschdaten: alleDaten,
        paket,
        ort,
        gaeste,
        nachricht: nachrichtMitHerkunft(nachricht, herkunft),
        herkunft,
        website,
      });
      setErgebnis(r);
      zeige("danke");
    } catch (err) {
      setFehler(err instanceof Error ? err.message : "Versucht es noch einmal.");
    } finally {
      setSendet(false);
    }
  }

  if (seite === "start") {
    return (
      <section className="seite">
        {/* data-dunkler-kopf: der Kopf der Website liegt hier durchsichtig über dem Bild (components/vintage/Kopf.jsx) */}
        <div className="landing" data-dunkler-kopf="">
          <Image className="landing-bild" src={titel} alt="Brautpaar geht Hand in Hand durch einen Park" priority sizes="(min-width: 900px) 64vw, 100vw" />
          <div className="landing-in">
            <p className="hero-marke" aria-label="Amoriva Films">
              AMORIVA<small>FILMS</small>
            </p>
            <form
              className="landing-text"
              onSubmit={(e) => {
                e.preventDefault();
                void pruefen();
              }}
            >
              <p className="label">Hochzeitsfilm und Fotografie</p>
              <h1>
                Ist euer Tag noch <em>frei?</em>
              </h1>
              <p className="landing-unter">Wählt euer Hochzeitsdatum. Ihr seht sofort, wie es für euren Tag aussieht.</p>
              <label className="datum-feld">
                <span className="label">Euer Hochzeitsdatum</span>
                <input type="date" id="datum" value={datum} min={min || undefined} onChange={(e) => setDatum(e.target.value)} required />
              </label>
              <Knopf art="hell-voll" type="submit" id="pruefen">
                Datum prüfen
              </Knopf>
              <Fehler text={fehler} />
            </form>
          </div>
        </div>
      </section>
    );
  }

  if (seite === "pruefung") {
    return (
      <section className="seite mitte">
        <Lade
          label="Einen Moment"
          titel={
            <>
              Wir schauen in unseren <em>Kalender</em>
            </>
          }
          unter={datum ? tagLang(datum) : undefined}
        />
      </section>
    );
  }

  if (seite === "schritt1") {
    // Das Ergebnis gilt nur für das geprüfte Datum. Ändert das Paar es hier, steht ein ruhiger Hinweis statt „frei“.
    const geprueft = auskunft !== null && auskunft.datum === datum;
    const frei = geprueft && auskunft?.auskunft === "frei";
    return (
      <section className="seite">
        <Kopf zurueck={{ onClick: () => zeige("start") }} />
        <form
          className="bahn luft"
          style={{ paddingTop: 8 }}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            weiterNach1();
          }}
        >
          {frei ? (
            <div className="frei-banner" role="status">
              <Haken klein />
              <div>
                <p className="fb-titel">Euer Tag ist noch frei.</p>
                <p className="fb-datum">{tagLang(datum)}</p>
              </div>
            </div>
          ) : geprueft ? (
            <div className="frei-banner warte lang" role="status">
              <Haken art="frage" klein />
              <div>
                <p className="fb-titel">Fragt uns für euren Tag kurz an.</p>
                <p className="fb-datum">{tagLang(datum)}</p>
                <p className="fb-text">Für diesen Tag schauen wir lieber persönlich nach. Gleich nach dem Absenden seht ihr, wie es für euren Tag aussieht.</p>
              </div>
            </div>
          ) : datum ? (
            <div className="frei-banner warte" role="status">
              <div style={{ paddingLeft: 12 }}>
                <p className="fb-titel">Wir schauen für euren Tag nach.</p>
                <p className="fb-datum">{tagLang(datum)}</p>
              </div>
            </div>
          ) : null}
          <SchrittLeiste schritt={1} von={2} />
          <Label style={{ marginTop: 14 }}>Schritt 1 von 2</Label>
          <h2 style={{ marginTop: 6 }}>
            Wer seid <em>ihr?</em>
          </h2>
          <p className="leise klein" style={{ marginTop: 8 }}>
            Zwei kurze Schritte, dauert etwa eine Minute. Unverbindlich.
          </p>
          <Feld label="Eure Vornamen" fehler={fehlerAm("namen")}>
            <input
              id="namen"
              value={namen}
              onChange={(e) => setNamen(e.target.value)}
              autoComplete="off"
              placeholder="Zum Beispiel: Lena und Jonas"
              maxLength={120}
              required
            />
          </Feld>
          <Feld label="E-Mail-Adresse" fehler={fehlerAm("email")}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={200}
              required
            />
          </Feld>
          <Feld label="Handynummer für WhatsApp" fehler={fehlerAm("telefon")}>
            <input
              id="telefon"
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
              maxLength={40}
            />
          </Feld>
          <p className="leise klein" style={{ marginTop: 10, paddingLeft: 22 }}>
            Wir schreiben euch meist per WhatsApp, das geht für alle am schnellsten.
          </p>
          {/* Verstecktes Feld gegen Bots, für Menschen unsichtbar */}
          <label className="versteckt" aria-hidden="true">
            Website
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
          <Abstand />
          <Knopf type="submit">Weiter</Knopf>
          <Fehler text={fehler} />
        </form>
      </section>
    );
  }

  if (seite === "schritt2") {
    return (
      <section className="seite">
        <Kopf zurueck={{ onClick: () => zeige("schritt1") }} />
        <form className="bahn luft" style={{ paddingTop: 8 }} noValidate onSubmit={absenden}>
          <SchrittLeiste schritt={2} von={2} />
          <Label style={{ marginTop: 14 }}>Schritt 2 von 2</Label>
          <h2 style={{ marginTop: 6 }}>
            Eure <em>Hochzeit</em>
          </h2>
          <div className="wunsch" id="paket-wahl" role="radiogroup" aria-label="Was wünscht ihr euch" aria-describedby={fehlerAm("paket") ? "paket-fehler" : undefined}>
            {WUNSCH_REIHENFOLGE.map((id) => (
              <button
                key={id}
                type="button"
                className={`wunsch-karte${paket === id ? " an" : ""}`}
                role="radio"
                aria-checked={paket === id}
                onClick={() => setPaket(id)}
              >
                <b>{WUENSCHE[id].titel}</b>
                <span>{WUENSCHE[id].text}</span>
              </button>
            ))}
          </div>
          {fehlerAm("paket") ? (
            <p className="feld-hinweis wahl-hinweis" id="paket-fehler">
              {fehlerAm("paket")}
            </p>
          ) : null}
          <Feld label="Euer Hochzeitsdatum" fehler={fehlerAm("datum")}>
            <input
              type="date"
              id="datum"
              value={datum}
              min={min || undefined}
              onChange={(e) => setDatum(e.target.value)}
              required
            />
          </Feld>
          {weitere.map((w, i) => (
            <div key={i}>
              <Feld label={`Weiteres Wunschdatum ${i + 1} (optional)`} fehler={fehlerAm(`wunschdatum-${i + 1}`)}>
                <input
                  type="date"
                  id={`wunschdatum-${i + 1}`}
                  value={w}
                  min={min || undefined}
                  onChange={(e) => setWeitere((alt) => alt.map((x, j) => (j === i ? e.target.value : x)))}
                />
              </Feld>
              <button
                type="button"
                className="textlink"
                style={{ marginLeft: 22 }}
                onClick={() => {
                  setWeitere((alt) => alt.filter((_, j) => j !== i));
                  // Die Felder rücken nach, ihre Fehler zeigen wir erst beim nächsten Weiter wieder
                  setGezeigt((alt) => new Set([...alt].filter((id) => !id.startsWith("wunschdatum-"))));
                }}
              >
                Datum entfernen
              </button>
            </div>
          ))}
          {weitere.length < MAX_DATEN - 1 ? (
            <p style={{ marginTop: 6, paddingLeft: 22 }}>
              <button type="button" className="textlink" onClick={() => setWeitere((alt) => [...alt, ""])}>
                Location noch nicht fest? Weiteres Datum dazu
              </button>
            </p>
          ) : null}
          <Feld label="Wo feiert ihr?" fehler={fehlerAm("ort")}>
            <input id="ort" value={ort} onChange={(e) => setOrt(e.target.value)} maxLength={200} placeholder="Location oder Ort" />
          </Feld>
          <Feld label="Wie viele Gäste ungefähr?" fehler={fehlerAm("gaeste")}>
            <select id="gaeste" value={gaeste} onChange={(e) => setGaeste(e.target.value)}>
              <option value="">Noch offen</option>
              {GAESTE.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Feld>
          <Feld label="Was ist euch wichtig? (optional)" fehler={fehlerAm("nachricht")}>
            <textarea
              id="nachricht"
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              maxLength={2000}
              placeholder="Zum Beispiel: Uns ist die Rede von Jonas’ Bruder wichtig und unser erster Tanz."
            />
          </Feld>
          <Label style={{ marginTop: 26, paddingLeft: 22 }}>Wie habt ihr von uns erfahren? (optional)</Label>
          <div className="wahl" role="group" aria-label="Wie habt ihr von uns erfahren">
            {HERKUNFT.map((h) => (
              <button key={h} type="button" className={`chip${herkunft === h ? " an" : ""}`} aria-pressed={herkunft === h} onClick={() => setHerkunft((alt) => (alt === h ? "" : h))}>
                {h}
              </button>
            ))}
          </div>
          <Abstand />
          <Knopf type="submit" beschaeftigt={sendet} disabled={sendet} id="absenden">
            {sendet ? "Wird gesendet" : "Anfrage senden"}
          </Knopf>
          <Fehler text={fehler} />
          <p className="leise klein" style={{ marginTop: 12, textAlign: "center" }}>
            Wir nutzen eure Angaben nur für eure Anfrage. Mehr dazu in unserer{" "}
            <a href={KONTAKT.datenschutz} target="_blank" rel="noopener">
              Datenschutzerklärung
            </a>
            .
          </p>
        </form>
      </section>
    );
  }

  if (seite === "danke" && ergebnis) {
    const frei = ergebnis.daten.some((d) => d.ergebnis === "frei");
    const warteliste = ergebnis.daten.some((d) => d.ergebnis === "warteliste");
    const nurWarteliste = warteliste && !frei;
    return (
      <section className="seite">
        <Kopf />
        <div className="bahn luft" style={{ paddingTop: 8 }}>
          <Label>Danke, {ergebnis.vornamen}</Label>
          <h2 style={{ marginTop: 8 }}>
            {nurWarteliste ? (
              <>
                Ihr steht auf der <em>Warteliste.</em>
              </>
            ) : (
              <>
                Eure Anfrage ist bei <em>uns.</em>
              </>
            )}
          </h2>
          {ergebnis.daten.map((d) => (
            <Band key={d.datum} grau={d.ergebnis !== "frei"} style={{ marginTop: 18 }}>
              {d.text}
            </Band>
          ))}
          {warteliste ? (
            <Karte style={{ marginTop: 14 }}>
              <Label>So läuft es</Label>
              <ol className="schritte">
                <li>
                  <span className="nr">1</span>
                  <span>Alle vier Wochen fragen wir kurz nach, ob ihr weiter warten wollt.</span>
                </li>
                <li>
                  <span className="nr">2</span>
                  <span>Wird der Tag frei, habt ihr 48 Stunden Zeit, euch zu entscheiden.</span>
                </li>
                <li>
                  <span className="nr">3</span>
                  <span>Bleibt er vergeben, sagen wir euch das ehrlich und helfen weiter.</span>
                </li>
              </ol>
            </Karte>
          ) : null}
          {/* Übergang ohne Selfmade: kein Schlüssel, also keine Paar-Seite und kein Kennenlernen-Link */}
          {!ergebnis.schluessel ? (
            <p className="leise klein" style={{ marginTop: 18 }}>
              Ihr bekommt gleich eine Bestätigung per Mail. Eilt es, schreibt uns gern per{" "}
              <a className="textlink" href={KONTAKT.whatsapp} target="_blank" rel="noopener">
                WhatsApp
              </a>
              .
            </p>
          ) : (
          <>
          <Karte style={{ marginTop: 18 }}>
            <Label>Wollt ihr uns kennenlernen?</Label>
            <h3 style={{ marginTop: 6 }}>Sucht euch einen Termin aus.</h3>
            <p className="leise klein" style={{ marginTop: 4 }}>
              {dauerMin} Minuten per Video.
            </p>
            <Abstand hoehe={20} />
            <Knopf href={PFADE.kennenlernen(ergebnis.schluessel)}>{nurWarteliste ? "Trotzdem schon kennenlernen" : "Termin aussuchen"}</Knopf>
          </Karte>
          <p className="leise klein" style={{ marginTop: 14 }}>
            Lieber später? Wir melden uns sowieso persönlich bei euch.
          </p>
          <Karte style={{ marginTop: 18 }}>
            <Label>Eure Seite</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Hier seht ihr jederzeit, wie es weitergeht. Speichert euch den Link am besten gleich.
            </p>
            <p style={{ marginTop: 6 }}>
              <a className="textlink" href={PFADE.paar(ergebnis.schluessel)}>
                Zu eurer Seite
              </a>
            </p>
          </Karte>
          </>
          )}
        </div>
      </section>
    );
  }

  return null;
}
