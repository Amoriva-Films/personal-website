"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AnfrageRueckmeldung, DatumAuskunft, PaketId } from "@/lib/films-typen";
import { Abstand, Band, Fehler, Feld, Haken, Karte, Knopf, Kopf, Label, Lade, SchrittLeiste } from "../basis/bausteine";
import titel from "../basis/bilder/titel.webp";
import { KONTAKT } from "../basis/kontakt";
import { PFADE } from "../basis/pfade";
import { GAESTE, HERKUNFT, MAX_DATEN, WUENSCHE, WUNSCH_REIHENFOLGE } from "./werte";

// Stufe 1 und 2 der Buchungsstrecke: Datum prüfen, Ergebnis, Anfrage in drei Schritten, Danke.
// Ablauf und Texte 1:1 aus dem Prototyp. Öffentlich gibt es nur „frei“ oder „bitte anfragen“, das ehrliche
// Ergebnis mit Wartelistenplatz kommt erst nach dem Absenden. Ist der Tag frei, kommt erst die Zwischenseite
// „Gute Nachricht“ (Prototyp, Ergebnis frei), dann Schritt 1.

type Seite = "start" | "pruefung" | "frei" | "ergebnis" | "schritt1" | "schritt2" | "schritt3" | "danke";

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

function tagKurz(iso: string) {
  return `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}`;
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
  const [ungueltig, setUngueltig] = useState<string[]>([]);
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
      zeige(a.auskunft === "frei" ? "frei" : "ergebnis");
    } catch (err) {
      if (nr !== lauf.current) return;
      setSeite("start");
      setFehler(err instanceof Error ? err.message : "Versucht es noch einmal.");
    }
  }

  const alleDaten = [datum, ...weitere].filter(Boolean);

  function weiterNach1() {
    const f: string[] = [];
    if (namen.trim().length < 2) f.push("namen");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) f.push("email");
    setUngueltig(f);
    if (f.length) {
      setFehler(f.includes("namen") ? "Bitte tragt eure Vornamen ein." : "Bitte prüft eure E-Mail-Adresse.");
      return;
    }
    zeige("schritt2");
  }

  function weiterNach2() {
    if (new Set(alleDaten).size !== alleDaten.length) {
      setFehler("Ein Datum steht doppelt drin.");
      return;
    }
    zeige("schritt3");
  }

  async function absenden(e?: FormEvent) {
    e?.preventDefault();
    if (sendet) return;
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

  if (seite === "frei" && auskunft) {
    return (
      <section className="seite mitte">
        <div className="bahn mitte-in">
          <Haken />
          <Label style={{ marginTop: 26 }}>Gute Nachricht</Label>
          <h2 style={{ marginTop: 8 }}>
            Euer Tag ist noch <em>frei.</em>
          </h2>
          <p className="lade-datum">{tagLang(auskunft.datum)}</p>
          <p style={{ marginTop: 18 }}>Erzählt uns in drei kurzen Schritten von euch. Danach sucht ihr euch direkt einen Termin zum Kennenlernen aus.</p>
          <Abstand />
          <Knopf art="hell-voll" onClick={() => zeige("schritt1")}>
            Los geht&#8217;s
          </Knopf>
          <p className="leise klein" style={{ marginTop: 14 }}>
            Dauert etwa eine Minute. Unverbindlich.
          </p>
          <p style={{ marginTop: 18 }}>
            <button type="button" className="textlink" onClick={() => zeige("start")}>
              Anderes Datum prüfen
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (seite === "ergebnis" && auskunft) {
    // Öffentlich nur „bitte anfragen“: ob reserviert, gebucht oder gesperrt, sagen wir erst nach dem Absenden
    return (
      <section className="seite mitte">
        <div className="bahn mitte-in">
          <Haken art="frage" />
          <Label style={{ marginTop: 26 }}>Gut zu wissen</Label>
          <h2 style={{ marginTop: 8 }}>
            Fragt uns für euren Tag <em>kurz an.</em>
          </h2>
          <p className="lade-datum">{tagLang(auskunft.datum)}</p>
          <p style={{ marginTop: 18 }}>
            Für diesen Tag schauen wir lieber persönlich nach. Erzählt uns in drei kurzen Schritten von euch. Gleich danach seht ihr, wie es für euren Tag aussieht.
          </p>
          <Abstand />
          <Knopf art="hell-voll" onClick={() => zeige("schritt1")}>
            Anfrage starten
          </Knopf>
          <p style={{ marginTop: 18 }}>
            <button type="button" className="textlink" onClick={() => zeige("start")}>
              Anderes Datum prüfen
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (seite === "schritt1") {
    const frei = auskunft?.auskunft === "frei";
    return (
      <section className="seite">
        <Kopf zurueck={{ onClick: () => zeige(frei ? "frei" : "ergebnis") }} />
        <form
          className="bahn luft"
          style={{ paddingTop: 8 }}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            weiterNach1();
          }}
        >
          <div className={`frei-banner${frei ? "" : " warte"}`}>
            {frei ? <Haken klein /> : null}
            <div>
              <p className="fb-titel">{frei ? "Euer Tag ist noch frei." : "Wir schauen für euren Tag nach."}</p>
              <p className="fb-datum">{datum ? tagLang(datum) : ""}</p>
            </div>
          </div>
          <SchrittLeiste schritt={1} />
          <Label style={{ marginTop: 14 }}>Schritt 1 von 3</Label>
          <h2 style={{ marginTop: 6 }}>
            Wer seid <em>ihr?</em>
          </h2>
          <Feld label="Eure Vornamen" ungueltig={ungueltig.includes("namen")}>
            <input value={namen} onChange={(e) => setNamen(e.target.value)} autoComplete="off" placeholder="Zum Beispiel: Lena und Jonas" maxLength={120} required />
          </Feld>
          <Feld label="E-Mail-Adresse" ungueltig={ungueltig.includes("email")}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" maxLength={200} required />
          </Feld>
          <Feld label="Handynummer für WhatsApp">
            <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} autoComplete="tel" inputMode="tel" maxLength={40} />
          </Feld>
          <p className="leise klein" style={{ marginTop: 10 }}>
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
        <form
          className="bahn luft"
          style={{ paddingTop: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            weiterNach2();
          }}
        >
          <SchrittLeiste schritt={2} />
          <Label style={{ marginTop: 14 }}>Schritt 2 von 3</Label>
          <h2 style={{ marginTop: 6 }}>
            Was wünscht ihr <em>euch?</em>
          </h2>
          <div className="wunsch" role="radiogroup" aria-label="Was wünscht ihr euch">
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
          <Feld label="Euer Hochzeitsdatum">
            <input type="date" value={datum} min={min || undefined} onChange={(e) => setDatum(e.target.value)} required />
          </Feld>
          {weitere.map((w, i) => (
            <Feld key={i} label={`Weiteres Wunschdatum ${i + 1} (optional)`}>
              <span className="wunschdaten-zeile" style={{ display: "flex", margin: 0, letterSpacing: 0, textTransform: "none" }}>
                <input
                  type="date"
                  value={w}
                  min={min || undefined}
                  onChange={(e) => setWeitere((alt) => alt.map((x, j) => (j === i ? e.target.value : x)))}
                />
                <button type="button" className="textlink" onClick={() => setWeitere((alt) => alt.filter((_, j) => j !== i))}>
                  Entfernen
                </button>
              </span>
            </Feld>
          ))}
          {weitere.length < MAX_DATEN - 1 ? (
            <p style={{ marginTop: 6 }}>
              <button type="button" className="textlink" onClick={() => setWeitere((alt) => [...alt, ""])}>
                Location noch nicht fest? Weiteres Datum dazu
              </button>
            </p>
          ) : null}
          <Feld label="Wo feiert ihr?">
            <input value={ort} onChange={(e) => setOrt(e.target.value)} maxLength={200} placeholder="Location oder Ort" />
          </Feld>
          <Feld label="Wie viele Gäste ungefähr?">
            <select value={gaeste} onChange={(e) => setGaeste(e.target.value)}>
              <option value="">Noch offen</option>
              {GAESTE.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Feld>
          <Abstand />
          <Knopf type="submit" disabled={!datum}>
            Weiter
          </Knopf>
          <Fehler text={fehler} />
        </form>
      </section>
    );
  }

  if (seite === "schritt3") {
    return (
      <section className="seite">
        <Kopf zurueck={{ onClick: () => zeige("schritt2") }} />
        <form className="bahn luft" style={{ paddingTop: 8 }} onSubmit={absenden}>
          <SchrittLeiste schritt={3} />
          <Label style={{ marginTop: 14 }}>Schritt 3 von 3</Label>
          <h2 style={{ marginTop: 6 }}>
            Was ist euch <em>wichtig?</em>
          </h2>
          <Feld label="Erzählt uns gern ein, zwei Sätze (optional)">
            <textarea
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              maxLength={2000}
              placeholder="Zum Beispiel: Uns ist die Rede von Jonas’ Bruder wichtig und unser erster Tanz."
            />
          </Feld>
          <Label style={{ marginTop: 26 }}>Wie habt ihr von uns erfahren? (optional)</Label>
          <div className="wahl" role="group" aria-label="Wie habt ihr von uns erfahren">
            {HERKUNFT.map((h) => (
              <button key={h} type="button" className={`chip${herkunft === h ? " an" : ""}`} aria-pressed={herkunft === h} onClick={() => setHerkunft((alt) => (alt === h ? "" : h))}>
                {h}
              </button>
            ))}
          </div>
          <Karte style={{ marginTop: 26 }}>
            <Label>Eure Anfrage</Label>
            <div className="zeilen" style={{ marginTop: 8 }}>
              <div>
                <span>{alleDaten.length > 1 ? "Daten" : "Datum"}</span>
                <span>{alleDaten.map(tagKurz).join(", ")}</span>
              </div>
              <div>
                <span>Wunsch</span>
                <span>{WUENSCHE[paket].kurz}</span>
              </div>
              {auskunft?.auskunft === "frei" && alleDaten.length === 1 && alleDaten[0] === auskunft.datum ? (
                <div>
                  <span>Status</span>
                  <span>Datum frei</span>
                </div>
              ) : null}
              <div>
                <span>Kontakt</span>
                <span>{telefon.trim() ? "WhatsApp und Mail" : "Mail"}</span>
              </div>
            </div>
          </Karte>
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
        </div>
      </section>
    );
  }

  return null;
}
