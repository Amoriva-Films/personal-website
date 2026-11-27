"use client";

import { useCallback, useEffect, useState } from "react";
import { Abstand, Band, Fehler, Haken, Karte, Knopf, Kopf, Label, Lade } from "@/components/buchen/basis/bausteine";
import { KONTAKT } from "@/components/buchen/basis/kontakt";
import type { FreierTag, KennenlernenAntwort, KennenlernenStand, TerminAnsicht } from "@/lib/films-typen";

// Kennenlernen wählen, bestätigen, verschieben, absagen. Look wie der Prototyp (Schritt „Danke + Kennenlernen“ und „Termin steht“).
// Der Schlüssel kommt aus dem Fragment der Adresse (#…), geht nur im Body an die Schnittstelle und nie in eine URL.

const TZ = "Europe/Berlin";
const WT_KURZ = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, weekday: "short" });
const LANG = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" });
const WT = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, weekday: "long" });
const TAG = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, day: "numeric" });
const MONAT = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, month: "long" });
const UHR = new Intl.DateTimeFormat("de-DE", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

// Knöpfe bleiben auch bei 375 px in der Karte einzeilig
const EINZEILIG = { whiteSpace: "nowrap", paddingInline: 20 } as const;

const mittag = (datum: string) => new Date(`${datum}T12:00:00Z`);
const tagKnopf = (datum: string) => ({ wt: WT_KURZ.format(mittag(datum)).replace(".", ""), dm: `${datum.slice(8, 10)}.${datum.slice(5, 7)}.` });

async function senden(body: Record<string, string>): Promise<KennenlernenAntwort> {
  try {
    const res = await fetch("/api/buchen/kennenlernen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
    return (await res.json()) as KennenlernenAntwort;
  } catch {
    return { ok: false, grund: "fehler", meldung: "Keine Verbindung. Versucht es bitte gleich noch einmal." };
  }
}

/** Kalenderdatei zum Speichern, im Browser gebaut (keine Mail, kein Server). */
function kalenderDatei(t: TerminAnsicht) {
  const z = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amoriva Films//Kennenlernen//DE",
    "BEGIN:VEVENT",
    `UID:kennenlernen-${z(t.start)}@amoriva-films.de`,
    `DTSTAMP:${z(new Date().toISOString())}`,
    `DTSTART:${z(t.start)}`,
    `DTEND:${z(t.ende)}`,
    "SUMMARY:Kennenlernen mit Amoriva Films",
    `DESCRIPTION:Video-Call\\, ${t.dauerMin} Minuten. Fragen? WhatsApp ${KONTAKT.telefonText}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "kennenlernen-amoriva-films.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/** Ganze Seite: liest den Schlüssel aus dem Fragment. */
export function KennenlernenSeite() {
  const [schluessel, setSchluessel] = useState<string | null>(null);
  useEffect(() => {
    const lesen = () => setSchluessel(decodeURIComponent(window.location.hash.replace(/^#/, "")).trim());
    lesen();
    window.addEventListener("hashchange", lesen);
    return () => window.removeEventListener("hashchange", lesen);
  }, []);
  if (schluessel === null) return <Lade label="Einen Moment" titel={<>Wir schauen in <em>unseren Kalender.</em></>} />;
  return <KennenlernenWahl key={schluessel} schluessel={schluessel} mitKopf />;
}

type Modus = "waehlen" | "steht" | "verschieben" | "absagen";

/** Auswahl und Bestätigung. Einbaubar auch direkt nach der Anfrage (Danke-Seite), dann ohne Kopf. */
export function KennenlernenWahl({ schluessel, mitKopf, ohneGruss }: { schluessel: string; mitKopf?: boolean; ohneGruss?: boolean }) {
  const [stand, setStand] = useState<KennenlernenStand | null>(null);
  const [linkFalsch, setLinkFalsch] = useState(false);
  const [modus, setModus] = useState<Modus>("waehlen");
  const [tag, setTag] = useState<string | null>(null);
  const [zeit, setZeit] = useState<string | null>(null);
  const [beschaeftigt, setBeschaeftigt] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [frisch, setFrisch] = useState(false);
  const [ladeFehler, setLadeFehler] = useState<string | null>(null);
  const [versuch, setVersuch] = useState(0);

  const uebernehmen = useCallback((s: KennenlernenStand, neuerModus?: Modus) => {
    setStand(s);
    setModus(neuerModus ?? (s.termin ? "steht" : "waehlen"));
    const erster = s.tage[0]?.datum ?? null;
    setTag((alt) => (alt && s.tage.some((t) => t.datum === alt) ? alt : erster));
    setZeit(null);
  }, []);

  useEffect(() => {
    let weg = false;
    senden({ schluessel, aktion: "stand" }).then((r) => {
      if (weg) return;
      if (r.ok) uebernehmen(r.stand);
      else if (r.grund === "schluessel") setLinkFalsch(true);
      else if (r.stand) {
        setFehler(r.meldung);
        uebernehmen(r.stand);
      } else setLadeFehler(r.meldung || "Das hat gerade nicht geklappt.");
    });
    return () => {
      weg = true;
    };
  }, [schluessel, uebernehmen, versuch]);

  async function aktion(art: "buchen" | "verschieben" | "absagen") {
    setBeschaeftigt(true);
    setFehler(null);
    const r = await senden({ schluessel, aktion: art, ...(zeit && art !== "absagen" ? { start: zeit } : {}) });
    setBeschaeftigt(false);
    if (r.ok) {
      setFrisch(art !== "absagen");
      uebernehmen(r.stand);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (r.grund === "schluessel") return setLinkFalsch(true);
    setFehler(r.meldung);
    if (r.stand) uebernehmen(r.stand, art === "verschieben" && r.stand.termin ? "verschieben" : undefined);
  }

  const kopf = mitKopf ? <Kopf /> : null;

  if (linkFalsch) {
    return (
      <>
        {kopf}
        <div className="bahn luft seite" style={{ textAlign: "center" }}>
          <Haken art="frage" />
          <h2 style={{ marginTop: 22 }}>Dieser Link <em>stimmt nicht.</em></h2>
          <p style={{ marginTop: 14 }}>Schreibt uns kurz per WhatsApp, dann finden wir zusammen einen Termin.</p>
          <Abstand />
          <Knopf href={KONTAKT.whatsapp}>WhatsApp schreiben</Knopf>
        </div>
      </>
    );
  }

  if (!stand && ladeFehler) {
    return (
      <>
        {kopf}
        <div className="bahn luft seite" style={{ textAlign: "center" }}>
          <Haken art="frage" />
          <h2 style={{ marginTop: 22 }}>Kurz <em>hängengeblieben.</em></h2>
          <p style={{ marginTop: 14 }}>{ladeFehler}</p>
          <Abstand />
          <Knopf
            art="hell-voll"
            onClick={() => {
              setLadeFehler(null);
              setVersuch((v) => v + 1);
            }}
          >
            Nochmal
          </Knopf>
          <Abstand hoehe={12} />
          <Knopf href={KONTAKT.whatsapp}>WhatsApp schreiben</Knopf>
        </div>
      </>
    );
  }

  if (!stand) {
    return (
      <>
        {kopf}
        <Lade label="Einen Moment" titel={<>Wir schauen in <em>unseren Kalender.</em></>} />
      </>
    );
  }

  const t = stand.termin;

  if (t && (modus === "steht" || modus === "absagen")) {
    const s = new Date(t.start);
    return (
      <>
        {kopf}
        <div className="bahn luft seite" style={{ textAlign: "center", paddingTop: mitKopf ? 20 : 48 }}>
          <Haken zeichnen={frisch} />
          <Label style={{ marginTop: 22 }}>{t.vorbei ? "Euer Kennenlernen" : frisch ? "Geschafft" : `Hallo ${stand.namen}`}</Label>
          <h2 style={{ marginTop: 8 }}>
            {t.vorbei ? (
              <>
                Schön, dass wir uns <em>kennen.</em>
              </>
            ) : (
              <>
                Euer Termin <em>steht.</em>
              </>
            )}
          </h2>
          <div className={`termin-karte${frisch ? " rein" : ""}`}>
            <p className="tk-tag">{WT.format(s)}</p>
            <p className="tk-zahl">{TAG.format(s).replace(".", "")}</p>
            <p className="tk-monat">
              {MONAT.format(s)} · {UHR.format(s)} Uhr
            </p>
            <p className="tk-art">Video-Call · {t.dauerMin} Minuten · euer Amoriva-Team</p>
          </div>
          {t.vorbei ? null : (
            <>
              <Knopf art="hell-voll" style={EINZEILIG} onClick={() => kalenderDatei(t)}>
                In euren Kalender
              </Knopf>
              {/* OFFEN: Link zum Video-Call. Ohne Mailversand kommt er per WhatsApp vom Team. */}
              <p className="leise klein" style={{ marginTop: 12 }}>
                Den Link zum Video-Call schicken wir euch vorher per WhatsApp.
              </p>
            </>
          )}
          <Fehler text={fehler} />
          {t.vorbei ? null : t.aenderbar ? (
            modus === "absagen" ? (
              <Karte style={{ marginTop: 30, textAlign: "left" }}>
                <h3>Termin absagen?</h3>
                <p className="klein" style={{ marginTop: 6 }}>
                  Danach könnt ihr hier jederzeit einen neuen aussuchen.
                </p>
                <Abstand hoehe={20} />
                <Knopf beschaeftigt={beschaeftigt} style={EINZEILIG} onClick={() => aktion("absagen")}>
                  Ja, absagen
                </Knopf>
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <button type="button" className="textlink" onClick={() => setModus("steht")}>
                    Nein, Termin bleibt
                  </button>
                </div>
              </Karte>
            ) : (
              <>
                <p className="leise klein" style={{ marginTop: 30 }}>
                  Passt doch nicht? Hebt euch diese Seite auf. Hier könnt ihr bis 12 Stunden vorher verschieben oder absagen.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 4 }}>
                  <button
                    type="button"
                    className="textlink"
                    onClick={() => {
                      setFehler(null);
                      setFrisch(false);
                      setZeit(null);
                      setModus("verschieben");
                    }}
                  >
                    Verschieben
                  </button>
                  <button
                    type="button"
                    className="textlink"
                    onClick={() => {
                      setFehler(null);
                      setFrisch(false);
                      setModus("absagen");
                    }}
                  >
                    Absagen
                  </button>
                </div>
              </>
            )
          ) : (
            <p className="leise klein" style={{ marginTop: 30 }}>
              Kurzfristig etwas dazwischengekommen?{" "}
              <a className="textlink" href={KONTAKT.whatsapp} target="_blank" rel="noopener">
                Schreibt uns per WhatsApp.
              </a>
            </p>
          )}
        </div>
      </>
    );
  }

  // Auswahl (neu oder Verschieben)
  const verschieben = Boolean(t && modus === "verschieben");
  const tagDaten: FreierTag | undefined = stand.tage.find((x) => x.datum === tag);
  const gewaehlt = tagDaten?.zeiten.find((z) => z.start === zeit);

  return (
    <>
      {kopf}
      <div className="bahn luft seite" style={{ paddingTop: 8 }}>
        {ohneGruss ? null : (
          <>
            <Label>{verschieben ? "Neuer Termin" : `Hallo ${stand.namen}`}</Label>
            <h2 style={{ marginTop: 8 }}>
              {verschieben ? (
                <>
                  Wann passt es <em>besser?</em>
                </>
              ) : (
                <>
                  Lernt uns <em>kennen.</em>
                </>
              )}
            </h2>
          </>
        )}
        {verschieben && t ? (
          <Band grau style={{ marginTop: 18 }}>
            Bisher: <b>{LANG.format(new Date(t.start))}, {UHR.format(new Date(t.start))} Uhr</b>. Er bleibt, bis ihr einen neuen bestätigt.
          </Band>
        ) : null}
        <Karte style={{ marginTop: 18 }}>
          <Label>{verschieben ? "Verschieben" : "Wollt ihr uns kennenlernen?"}</Label>
          <h3 style={{ marginTop: 6 }}>{verschieben ? "Sucht euch einen neuen Termin aus." : "Sucht euch einen Termin aus."}</h3>
          <p className="leise klein" style={{ marginTop: 4 }}>
            20 Minuten per Video. Ganz unverbindlich.
          </p>
          {stand.tage.length === 0 ? (
            <>
              <p style={{ marginTop: 22 }}>
                {stand.kalenderAus
                  ? "Gerade kommen wir nicht an unseren Kalender. Schreibt uns kurz per WhatsApp, dann finden wir einen Termin."
                  : "In den nächsten Tagen ist leider alles belegt. Schreibt uns kurz per WhatsApp, dann finden wir einen Termin."}
              </p>
              <Abstand hoehe={20} />
              <a className="knopf voll" style={EINZEILIG} href={KONTAKT.whatsapp} target="_blank" rel="noopener">
                WhatsApp schreiben
              </a>
            </>
          ) : (
            <>
              <Label style={{ marginTop: 22 }}>Tag</Label>
              <div className="tage" role="radiogroup" aria-label="Tag">
                {stand.tage.map((x) => {
                  const k = tagKnopf(x.datum);
                  return (
                    <button
                      key={x.datum}
                      type="button"
                      role="radio"
                      aria-checked={x.datum === tag}
                      aria-label={LANG.format(mittag(x.datum))}
                      className={`tag${x.datum === tag ? " an" : ""}`}
                      onClick={() => {
                        setTag(x.datum);
                        setZeit(null);
                      }}
                    >
                      <small>{k.wt}</small>
                      {k.dm}
                    </button>
                  );
                })}
              </div>
              <Label style={{ marginTop: 30 }}>Uhrzeit</Label>
              <div className="zeiten" role="radiogroup" aria-label="Uhrzeit">
                {(tagDaten?.zeiten ?? []).map((z) => (
                  <button key={z.start} type="button" role="radio" aria-checked={z.start === zeit} className={`zeit${z.start === zeit ? " an" : ""}`} onClick={() => setZeit(z.start)}>
                    {z.uhrzeit}
                  </button>
                ))}
              </div>
              <Abstand />
              <p className="klein" style={{ textAlign: "center", minHeight: "1.6em" }} aria-live="polite">
                {gewaehlt && tag ? `Gewählt: ${LANG.format(mittag(tag))}, ${gewaehlt.uhrzeit} Uhr` : tag ? "Jetzt noch eine Uhrzeit wählen." : "Wählt einen Tag und eine Uhrzeit."}
              </p>
              <Abstand hoehe={12} />
              <Knopf disabled={!gewaehlt} beschaeftigt={beschaeftigt} style={EINZEILIG} onClick={() => aktion(verschieben ? "verschieben" : "buchen")}>
                {verschieben ? "Termin verschieben" : "Termin bestätigen"}
              </Knopf>
              <Fehler text={fehler} />
            </>
          )}
          {verschieben ? (
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button
                type="button"
                className="textlink"
                onClick={() => {
                  setFehler(null);
                  setModus("steht");
                }}
              >
                Abbrechen, Termin bleibt
              </button>
            </div>
          ) : null}
        </Karte>
        {verschieben ? null : (
          <p className="leise klein" style={{ marginTop: 14 }}>
            Lieber später? Wir melden uns sowieso persönlich per WhatsApp bei euch.
          </p>
        )}
      </div>
    </>
  );
}
