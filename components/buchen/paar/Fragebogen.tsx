"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Abstand, Band, Fehler, Feld, Haken, Karte, Knopf, Kopf, Label, Lade } from "@/components/buchen/basis/bausteine";
import type { FragebogenAntworten, FragebogenKontakt, FragebogenPunkt, FragebogenSeite, OrtId, TextId, ZeitId } from "@/lib/films-typen";

// Fragebogen des Paares im Look der Buchungsstrecke (Prototyp, Abschnitt „Fragebogen“). Wird auf der Paar-Seite
// geöffnet, erst nach dem Vertrag. Speichert von selbst kurz nach jeder Eingabe, „Abschicken“ meldet ihn uns.
// Zwei Geräte (beide Partner) überschreiben sich nicht still: der Server zählt eine Version mit.

const URL_FRAGEBOGEN = "/api/buchen/paar/fragebogen";
const PAUSE_MS = 1800;

type Antwort = { fragebogen?: FragebogenSeite; error?: string; konflikt?: boolean; status: number };

async function senden(body: Record<string, unknown>, keepalive = false): Promise<Antwort> {
  try {
    const res = await fetch(URL_FRAGEBOGEN, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store", keepalive });
    const json = (await res.json().catch(() => ({}))) as Omit<Antwort, "status">;
    return { ...json, status: res.status, ...(res.ok ? {} : { error: json.error ?? "Das hat gerade nicht geklappt. Probiert es gleich noch einmal." }) };
  } catch {
    return { status: 0, error: "Keine Verbindung. Eure Eingaben sind noch da, wir versuchen es gleich noch einmal." };
  }
}

/** Was im Formular steht. Gruppenfotos als Text (eine Gruppe pro Zeile), leere Zeilen bleiben beim Tippen stehen. */
type Formular = Omit<FragebogenAntworten, "gruppenfotos"> & { gruppenText: string };

const leererKontakt = (): FragebogenKontakt => ({ name: "", rolle: "", telefon: "" });
const leererPunkt = (): FragebogenPunkt => ({ zeit: "", was: "", ort: "" });

function formularAus(f: FragebogenSeite): Formular {
  const { gruppenfotos, ...rest } = f.antworten;
  return {
    ...rest,
    kontakte: rest.kontakte.length ? rest.kontakte : [leererKontakt(), leererKontakt()],
    gruppenText: gruppenfotos.join("\n"),
  };
}

function antwortenAus(f: Formular): FragebogenAntworten {
  const { gruppenText, ...rest } = f;
  return { ...rest, gruppenfotos: gruppenText.split("\n") };
}

type Laden = { art: "laedt" } | { art: "fehler"; text: string } | { art: "da" };
type Speicher = "" | "laeuft" | "gespeichert" | "fehler";

/**
 * Fragebogen fürs Paar. schluessel = Schlüssel aus dem Link (wie PaarSeite ihn liest).
 * zurueck: optional, zeigt „Zurück“ im Kopf und nach „Später weitermachen“ (speichert vorher).
 */
export function Fragebogen({ schluessel, zurueck }: { schluessel: string; zurueck?: () => void }) {
  const [laden, setLaden] = useState<Laden>({ art: "laedt" });
  const [seite, setSeite] = useState<FragebogenSeite | null>(null);
  const [form, setForm] = useState<Formular | null>(null);
  const [speicher, setSpeicher] = useState<Speicher>("");
  const [fehler, setFehler] = useState<string | null>(null);
  const [konflikt, setKonflikt] = useState<FragebogenSeite | null>(null);
  const [geradeAbgeschickt, setGeradeAbgeschickt] = useState(false);

  const formRef = useRef<Formular | null>(null);
  const version = useRef(0);
  const aenderung = useRef(0);
  const gespeichert = useRef(0);
  const konfliktRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Alle Anfragen nacheinander, damit jede die Version der vorigen kennt
  const kette = useRef<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    let aus = false;
    void senden({ schluessel, aktion: "laden" }).then((r) => {
      if (aus) return;
      if (!r.fragebogen) {
        setLaden({ art: "fehler", text: r.error ?? "" });
        return;
      }
      const f = formularAus(r.fragebogen);
      formRef.current = f;
      version.current = r.fragebogen.version;
      setSeite(r.fragebogen);
      setForm(f);
      setLaden({ art: "da" });
    });
    return () => {
      aus = true;
    };
  }, [schluessel]);

  /** Eine Anfrage ausführen. Gibt true zurück, wenn sie geklappt hat. */
  const ausfuehren = useCallback(
    async (aktion: "speichern" | "einreichen"): Promise<boolean> => {
      const f = formRef.current;
      if (!f || konfliktRef.current) return false;
      if (aktion === "speichern" && aenderung.current === gespeichert.current) return true;
      const stand = aenderung.current;
      setSpeicher("laeuft");
      if (aktion === "einreichen") setFehler(null);
      const r = await senden({ schluessel, aktion, antworten: antwortenAus(f), version: version.current });
      if (r.fragebogen && r.status === 200) {
        version.current = r.fragebogen.version;
        gespeichert.current = Math.max(gespeichert.current, stand);
        setSeite(r.fragebogen);
        setSpeicher(aenderung.current === stand ? "gespeichert" : "");
        setFehler(null);
        return true;
      }
      if (r.konflikt && r.fragebogen) {
        konfliktRef.current = true;
        setKonflikt(r.fragebogen);
        setSpeicher("");
        return false;
      }
      setSpeicher("fehler");
      setFehler(r.error ?? null);
      return false;
    },
    [schluessel],
  );

  const einreihen = useCallback(
    (aktion: "speichern" | "einreichen") => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      const p = kette.current.then(() => ausfuehren(aktion));
      kette.current = p.catch(() => false);
      return p;
    },
    [ausfuehren],
  );

  // Beim Verlassen: Ungespeichertes noch losschicken
  useEffect(() => {
    const weg = () => {
      const f = formRef.current;
      if (!f || konfliktRef.current || aenderung.current === gespeichert.current) return;
      void senden({ schluessel, aktion: "speichern", antworten: antwortenAus(f), version: version.current }, true);
    };
    window.addEventListener("pagehide", weg);
    return () => {
      window.removeEventListener("pagehide", weg);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [schluessel]);

  const aendern = (fn: (f: Formular) => Formular) => {
    const alt = formRef.current;
    if (!alt) return;
    const neu = fn(alt);
    formRef.current = neu;
    aenderung.current += 1;
    setForm(neu);
    setSpeicher("");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void einreihen("speichern"), PAUSE_MS);
  };

  if (laden.art === "laedt") return <section className="seite mitte"><Lade label="Fragebogen" titel={<>Einen <em>Moment</em></>} /></section>;
  if (laden.art === "fehler" || !seite || !form) {
    return (
      <section className="seite">
        <Kopf zurueck={zurueck ? { onClick: zurueck } : undefined} />
        <div className="bahn luft" style={{ paddingTop: 8 }}>
          <Label>Fragebogen</Label>
          <Band style={{ marginTop: 14 }}>{laden.art === "fehler" ? laden.text : ""}</Band>
        </div>
      </section>
    );
  }

  const nurLesen = seite.nurLesen;
  const eingereicht = seite.stand === "eingereicht";
  const { beantwortet, gesamt } = seite.fortschritt;
  const rechts = speicher === "laeuft" ? "Speichert" : speicher === "gespeichert" ? "Gespeichert" : undefined;

  /** Speichert, was noch offen ist, und geht zurück zur Paar-Seite (ohne zurueck: nur speichern). */
  const spaeter = async () => {
    await einreihen("speichern");
    zurueck?.();
  };

  const abschicken = async () => {
    if (await einreihen("einreichen")) {
      setGeradeAbgeschickt(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const neuladen = (f: FragebogenSeite) => {
    const neu = formularAus(f);
    formRef.current = neu;
    version.current = f.version;
    aenderung.current = 0;
    gespeichert.current = 0;
    konfliktRef.current = false;
    setForm(neu);
    setSeite(f);
    setKonflikt(null);
    setSpeicher("gespeichert");
  };

  const behalten = (f: FragebogenSeite) => {
    version.current = f.version;
    konfliktRef.current = false;
    setKonflikt(null);
    void einreihen("speichern");
  };

  const zeit = (id: ZeitId, wert: string) => aendern((f) => ({ ...f, zeiten: { ...f.zeiten, [id]: wert } }));
  const ort = (id: OrtId, feld: "name" | "adresse", wert: string) => aendern((f) => ({ ...f, orte: { ...f.orte, [id]: { ...f.orte[id], [feld]: wert } } }));
  const textFeld = (id: TextId, wert: string) => aendern((f) => ({ ...f, texte: { ...f.texte, [id]: wert } }));
  const punkt = (i: number, feld: keyof FragebogenPunkt, wert: string) =>
    aendern((f) => ({ ...f, weitere: f.weitere.map((p, j) => (j === i ? { ...p, [feld]: wert } : p)) }));
  const kontakt = (i: number, feld: keyof FragebogenKontakt, wert: string) =>
    aendern((f) => ({ ...f, kontakte: f.kontakte.map((k, j) => (j === i ? { ...k, [feld]: wert } : k)) }));

  return (
    <section className="seite">
      <Kopf zurueck={zurueck ? { onClick: () => void spaeter() } : undefined} rechts={rechts} />
      <div className="bahn luft" style={{ paddingTop: 8 }}>
        {geradeAbgeschickt ? (
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <Haken />
            <h2 style={{ marginTop: 14 }}>
              Danke <em>euch.</em>
            </h2>
            <p className="klein" style={{ marginTop: 8 }}>
              Euer Fragebogen ist bei uns. Fällt euch noch etwas ein, ergänzt es einfach hier, bis zu eurem Tag.
            </p>
            <p className="leise klein" style={{ marginTop: 6 }}>Euer Amoriva-Team</p>
          </div>
        ) : (
          <>
            <Label>
              Fragebogen · {beantwortet} von {gesamt}
            </Label>
            <div className="balken" aria-hidden="true" style={{ marginTop: 10 }}>
              <i style={{ width: `${gesamt ? Math.round((beantwortet / gesamt) * 100) : 0}%` }} />
            </div>
            <h2 style={{ marginTop: 18 }}>
              Erzählt uns von <em>euch.</em>
            </h2>
            <p className="klein" style={{ marginTop: 8 }}>
              Damit wir euren Tag so festhalten, wie ihr ihn erlebt. Ihr könnt jederzeit unterbrechen, alles wird gespeichert.
            </p>
          </>
        )}

        {nurLesen ? (
          <Band grau style={{ marginTop: 18 }}>
            Euer Tag ist vorbei. Hier seht ihr noch, was ihr uns geschrieben habt.
          </Band>
        ) : eingereicht && !geradeAbgeschickt && seite.eingereichtAm ? (
          <Band grau style={{ marginTop: 18 }}>
            Abgeschickt am {seite.eingereichtAm}. Änderungen speichern wir einfach mit.
          </Band>
        ) : null}

        {konflikt ? (
          <Karte style={{ marginTop: 18 }}>
            <Label>Gerade auch gespeichert</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Auf einem anderen Gerät wurde der Fragebogen inzwischen gespeichert{konflikt.gespeichertAm ? `, zuletzt ${konflikt.gespeichertAm}` : ""}. Was soll gelten?
            </p>
            <div className="mail-knoepfe">
              <Knopf art="hell" onClick={() => neuladen(konflikt)}>
                Den anderen Stand
              </Knopf>
              <Knopf art="hell" onClick={() => behalten(konflikt)}>
                Meine Eingaben hier
              </Knopf>
            </div>
          </Karte>
        ) : null}

        <fieldset disabled={nurLesen} style={{ border: 0, minWidth: 0, marginTop: 26 }}>
          <Karte>
            <Label>Euer Ablauf</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Ungefähre Uhrzeiten reichen völlig. Was es bei euch nicht gibt, lasst ihr einfach leer.
            </p>
            <Paar>
              {seite.aufbau.zeiten.map((z) => (
                <Feld key={z.id} label={z.label}>
                  <input type="time" step={300} value={form.zeiten[z.id]} onChange={(e) => zeit(z.id, e.target.value)} style={{ colorScheme: "dark" }} />
                </Feld>
              ))}
            </Paar>

            <Label style={{ marginTop: 30 }}>Weitere Programmpunkte</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Zum Beispiel Standesamt am Vormittag, Kuchen, Feuerwerk oder Party.
            </p>
            {form.weitere.map((p, i) => (
              <Zeile key={i} weg={nurLesen ? undefined : () => aendern((f) => ({ ...f, weitere: f.weitere.filter((_, j) => j !== i) }))}>
                <Paar>
                  <Feld label="Uhrzeit">
                    <input type="time" step={300} value={p.zeit} onChange={(e) => punkt(i, "zeit", e.target.value)} style={{ colorScheme: "dark" }} />
                  </Feld>
                  <Feld label="Was">
                    <input value={p.was} onChange={(e) => punkt(i, "was", e.target.value)} placeholder="Zum Beispiel: Kuchen" maxLength={120} />
                  </Feld>
                </Paar>
                <Feld label="Wo, falls woanders">
                  <input value={p.ort} onChange={(e) => punkt(i, "ort", e.target.value)} placeholder="Name oder Adresse" maxLength={200} />
                </Feld>
              </Zeile>
            ))}
            {!nurLesen && form.weitere.length < 20 ? (
              <button type="button" className="textlink" style={{ marginTop: 12 }} onClick={() => aendern((f) => ({ ...f, weitere: [...f.weitere, leererPunkt()] }))}>
                Punkt hinzufügen
              </button>
            ) : null}
          </Karte>

          <Karte>
            <Label>Die Orte</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Mit Adresse, damit wir ohne Suchen hinfinden. Den Rest lasst ihr leer.
            </p>
            {seite.aufbau.orte.map((o) => (
              <div key={o.id} style={{ marginTop: 24 }}>
                <p className="label" style={{ color: "var(--ton)" }}>
                  {o.label}
                </p>
                <Feld label="Name" style={{ marginTop: 12 }}>
                  <input value={form.orte[o.id].name} onChange={(e) => ort(o.id, "name", e.target.value)} placeholder={o.platzhalter} maxLength={120} />
                </Feld>
                <Feld label="Adresse" style={{ marginTop: 14 }}>
                  <input value={form.orte[o.id].adresse} onChange={(e) => ort(o.id, "adresse", e.target.value)} placeholder="Straße, PLZ und Ort" autoComplete="off" maxLength={200} />
                </Feld>
              </div>
            ))}
          </Karte>

          <Karte>
            <Label>Eure Menschen am Tag</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Wer weiß Bescheid, wenn ihr gerade keine Zeit habt? Eure Trauzeugen zum Beispiel, bitte mit Telefonnummer.
            </p>
            {form.kontakte.map((k, i) => (
              <Zeile key={i} weg={nurLesen || form.kontakte.length <= 1 ? undefined : () => aendern((f) => ({ ...f, kontakte: f.kontakte.filter((_, j) => j !== i) }))}>
                <Paar>
                  <Feld label="Name">
                    <input value={k.name} onChange={(e) => kontakt(i, "name", e.target.value)} placeholder="Vor- und Nachname" autoComplete="off" maxLength={120} />
                  </Feld>
                  <Feld label="Rolle">
                    <input value={k.rolle} onChange={(e) => kontakt(i, "rolle", e.target.value)} placeholder={i === 0 ? "Zum Beispiel: Trauzeugin" : "Zum Beispiel: Trauzeuge"} maxLength={60} />
                  </Feld>
                </Paar>
                <Feld label="Telefon">
                  <input type="tel" inputMode="tel" value={k.telefon} onChange={(e) => kontakt(i, "telefon", e.target.value)} placeholder="+49 …" autoComplete="off" maxLength={40} />
                </Feld>
              </Zeile>
            ))}
            {!nurLesen && form.kontakte.length < 10 ? (
              <button type="button" className="textlink" style={{ marginTop: 12 }} onClick={() => aendern((f) => ({ ...f, kontakte: [...f.kontakte, leererKontakt()] }))}>
                Person hinzufügen
              </button>
            ) : null}
          </Karte>

          {seite.aufbau.gruppenfotos ? (
            <Karte>
              <Label>Gruppenfotos</Label>
              <Feld label="Eine Gruppe pro Zeile" style={{ marginTop: 12 }}>
                <textarea
                  value={form.gruppenText}
                  onChange={(e) => aendern((f) => ({ ...f, gruppenText: e.target.value }))}
                  placeholder={"Ihr beide mit beiden Familien\nIhr beide mit den Trauzeugen\nAlle Gäste"}
                  rows={6}
                />
              </Feld>
            </Karte>
          ) : null}

          <Karte>
            <Label>Eure Wünsche</Label>
            {seite.aufbau.texte.map((t) => (
              <Feld key={t.id} label={t.label}>
                <textarea value={form.texte[t.id]} onChange={(e) => textFeld(t.id, e.target.value)} placeholder={t.platzhalter} maxLength={2000} />
              </Feld>
            ))}
          </Karte>
        </fieldset>

        {nurLesen ? null : (
          <>
            <Abstand />
            {!eingereicht && seite.fehlt.length ? (
              <p className="leise klein" style={{ marginBottom: 14 }}>
                Zum Abschicken brauchen wir noch: {seite.fehlt.join(", ")}.
              </p>
            ) : null}
            {eingereicht ? (
              <Knopf art="hell-voll" onClick={() => void spaeter()} beschaeftigt={speicher === "laeuft"}>
                Speichern
              </Knopf>
            ) : (
              <>
                <Knopf art="hell-voll" onClick={() => void abschicken()} disabled={!!konflikt} beschaeftigt={speicher === "laeuft"}>
                  Fragebogen abschicken
                </Knopf>
                <Knopf art="hell" onClick={() => void spaeter()} style={{ marginTop: 12 }}>
                  Später weitermachen
                </Knopf>
              </>
            )}
            <Fehler text={fehler} />
          </>
        )}
      </div>
    </section>
  );
}

/** Zwei Felder nebeneinander, auch am Handy (Uhrzeiten, Name und Rolle). */
function Paar({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "0 14px" }}>{children}</div>;
}

/** Eine Zeile aus mehreren Feldern mit Linie darüber und „Entfernen“. */
function Zeile({ children, weg }: { children: ReactNode; weg?: () => void }) {
  return (
    <div style={{ marginTop: 18, paddingTop: 4, borderTop: "1px solid var(--linie)" }}>
      {children}
      {weg ? (
        <button type="button" className="textlink" onClick={weg} style={{ fontSize: 13 }}>
          Entfernen
        </button>
      ) : null}
    </div>
  );
}

/**
 * Zeile für die Übersicht der Paar-Seite wie im Prototyp („Fragebogen, 3 von 8 Fragen beantwortet“ mit Balken).
 * Zeigt nichts, solange der Fragebogen noch nicht freigeschaltet ist (vor dem Vertrag). Gehört in eine Karte.
 */
export function FragebogenAufgabe({ schluessel, oeffnen }: { schluessel: string; oeffnen: () => void }) {
  const [f, setF] = useState<FragebogenSeite | null>(null);
  useEffect(() => {
    let aus = false;
    void senden({ schluessel, aktion: "laden" }).then((r) => {
      if (!aus && r.fragebogen) setF(r.fragebogen);
    });
    return () => {
      aus = true;
    };
  }, [schluessel]);
  if (!f) return null;
  const { beantwortet, gesamt } = f.fortschritt;
  const unter = f.stand === "eingereicht" ? "Abgeschickt, ihr könnt jederzeit ergänzen" : `${beantwortet} von ${gesamt} Fragen beantwortet`;
  return (
    <button type="button" className="aufgabe" onClick={oeffnen} style={{ width: "100%", textAlign: "left" }}>
      <div className="was">
        Fragebogen
        <small>{unter}</small>
        <div className="balken">
          <i style={{ width: `${gesamt ? Math.round((beantwortet / gesamt) * 100) : 0}%` }} />
        </div>
      </div>
      <span className="pfeil" aria-hidden="true">
        &#8594;
      </span>
    </button>
  );
}
