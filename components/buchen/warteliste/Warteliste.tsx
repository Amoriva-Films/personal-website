"use client";

import { useCallback, useEffect, useState } from "react";
import { Abstand, Band, Feld, Fehler, Haken, Karte, Knopf, Kopf, Label, Lade } from "@/components/buchen/basis/bausteine";
import { KONTAKT } from "@/components/buchen/basis/kontakt";
import { PFADE } from "@/components/buchen/basis/pfade";
import type { WartelisteAntwort, WartelisteStand, WartelisteTag } from "@/lib/films-typen";

// Warteliste per Klick (Prototyp-Seiten „Rückfrage“, „Tag frei“, „Datum vergeben“, „Absage mit Grund“).
// Der Schlüssel kommt aus dem Fragment der Adresse (#schlüssel oder #schlüssel.raus für den direkten Weg zur Absage),
// geht nur im Body an die Schnittstelle und nie in eine URL.

type Aktion = "stand" | "bleiben" | "raus" | "nehmen";

async function senden(body: Record<string, unknown>): Promise<WartelisteAntwort> {
  try {
    const res = await fetch("/api/buchen/warteliste", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
    return (await res.json()) as WartelisteAntwort;
  } catch {
    return { ok: false, grund: "fehler", meldung: "Keine Verbindung. Versucht es noch einmal." };
  }
}

/** Ganze Seite: liest Schlüssel und Wunsch aus dem Fragment. */
export function WartelisteSeite() {
  const [hash, setHash] = useState<{ schluessel: string; raus: boolean } | null>(null);
  useEffect(() => {
    const lesen = () => {
      const roh = decodeURIComponent(window.location.hash.replace(/^#/, "")).trim();
      const raus = roh.endsWith(".raus");
      setHash({ schluessel: raus ? roh.slice(0, -5) : roh, raus });
    };
    lesen();
    window.addEventListener("hashchange", lesen);
    return () => window.removeEventListener("hashchange", lesen);
  }, []);
  if (!hash) return <Lade label="Einen Moment" titel={<>Wir schauen auf <em>eure Warteliste.</em></>} />;
  return <Warteliste key={hash.schluessel} schluessel={hash.schluessel} rausZuerst={hash.raus} />;
}

function Warteliste({ schluessel, rausZuerst }: { schluessel: string; rausZuerst: boolean }) {
  const [stand, setStand] = useState<WartelisteStand | null>(null);
  const [linkFalsch, setLinkFalsch] = useState(false);
  const [ladeFehler, setLadeFehler] = useState<string | null>(null);
  const [versuch, setVersuch] = useState(0);
  const [fehler, setFehler] = useState<string | null>(null);
  const [beschaeftigt, setBeschaeftigt] = useState<Aktion | null>(null);
  /** Datum, für das gerade die Absage mit Grund offen ist. */
  const [rausFuer, setRausFuer] = useState<string | null>(null);
  const [gruende, setGruende] = useState<string[]>([]);
  const [nachricht, setNachricht] = useState("");
  const [erledigt, setErledigt] = useState<{ aktion: Aktion; datum: string; warAngeboten?: boolean } | null>(null);

  useEffect(() => {
    let weg = false;
    senden({ schluessel, aktion: "stand" }).then((r) => {
      if (weg) return;
      if (r.ok) {
        setStand(r.stand);
        // Link „Sagt uns kurz Bescheid“ aus der Mail: gleich die Absage öffnen, wenn sie eindeutig ist
        const offen = r.stand.tage.filter((t) => t.zustand !== "raus");
        if (rausZuerst && offen.length === 1 && !r.stand.abgesagt) setRausFuer(offen[0].datum);
      } else if (r.grund === "schluessel") setLinkFalsch(true);
      else setLadeFehler(r.meldung || "Das hat gerade nicht geklappt.");
    });
    return () => {
      weg = true;
    };
  }, [schluessel, rausZuerst, versuch]);

  const aktion = useCallback(
    async (art: Exclude<Aktion, "stand">, tag: WartelisteTag) => {
      setBeschaeftigt(art);
      setFehler(null);
      const r = await senden({ schluessel, aktion: art, datum: tag.datum, ...(art === "raus" ? { gruende, nachricht } : {}) });
      setBeschaeftigt(null);
      if (r.ok) {
        setStand(r.stand);
        setErledigt({ aktion: art, datum: tag.datum, warAngeboten: tag.zustand === "angeboten" || tag.zustand === "zugesagt" || tag.zustand === "angenommen" });
        setRausFuer(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (r.grund === "schluessel") return setLinkFalsch(true);
      setFehler(r.meldung);
      if (r.stand) setStand(r.stand);
    },
    [schluessel, gruende, nachricht],
  );

  if (linkFalsch) {
    return (
      <>
        <Kopf />
        <div className="bahn luft seite" style={{ textAlign: "center" }}>
          <Haken art="frage" />
          <h2 style={{ marginTop: 22 }}>
            Dieser Link <em>stimmt nicht.</em>
          </h2>
          <p style={{ marginTop: 14 }}>Schreibt uns kurz per WhatsApp, dann klären wir es zusammen.</p>
          <Abstand />
          <Knopf href={KONTAKT.whatsapp}>WhatsApp schreiben</Knopf>
        </div>
      </>
    );
  }

  if (!stand && ladeFehler) {
    return (
      <>
        <Kopf />
        <div className="bahn luft seite" style={{ textAlign: "center" }}>
          <Haken art="frage" />
          <h2 style={{ marginTop: 22 }}>
            Kurz <em>hängengeblieben.</em>
          </h2>
          <p style={{ marginTop: 14 }}>{ladeFehler}</p>
          <Abstand />
          <Knopf
            art="hell-voll"
            onClick={() => {
              setLadeFehler(null);
              setVersuch((v) => v + 1);
            }}
          >
            Noch einmal
          </Knopf>
        </div>
      </>
    );
  }

  if (!stand) {
    return (
      <>
        <Kopf />
        <Lade label="Einen Moment" titel={<>Wir schauen auf <em>eure Warteliste.</em></>} />
      </>
    );
  }

  // Absage mit Grund (Prototyp „Absage mit einem Klick“)
  const rausTag = rausFuer ? stand.tage.find((t) => t.datum === rausFuer) : undefined;
  if (rausTag) {
    return (
      <>
        <Kopf zurueck={{ onClick: () => setRausFuer(null) }} />
        <div className="bahn luft seite" style={{ paddingTop: 8 }}>
          <Label>{rausTag.datumKurz}</Label>
          <h2 style={{ marginTop: 8 }}>
            Schade, aber <em>verständlich.</em>
          </h2>
          <p style={{ marginTop: 8 }}>Danke für eure Offenheit.</p>
          <p style={{ marginTop: 10 }}>Verratet ihr uns kurz, warum? Das hilft uns sehr.</p>
          <div className="wahl" style={{ marginTop: 16 }}>
            {stand.gruende.map((g) => {
              const an = gruende.includes(g.id);
              return (
                <button
                  key={g.id}
                  type="button"
                  className={`chip${an ? " an" : ""}`}
                  aria-pressed={an}
                  onClick={() => setGruende((alt) => (an ? alt.filter((x) => x !== g.id) : [...alt, g.id]))}
                >
                  {g.text}
                </button>
              );
            })}
          </div>
          <Feld label="Möchtet ihr noch etwas sagen? (optional)">
            <textarea value={nachricht} maxLength={1000} onChange={(e) => setNachricht(e.target.value)} />
          </Feld>
          <Abstand />
          <Knopf beschaeftigt={beschaeftigt === "raus"} disabled={!!beschaeftigt} onClick={() => aktion("raus", rausTag)}>
            Absenden
          </Knopf>
          <Fehler text={fehler} />
        </div>
      </>
    );
  }

  const offen = stand.tage.filter((t) => t.zustand !== "raus");
  const fertigTag = erledigt ? stand.tage.find((t) => t.datum === erledigt.datum) : undefined;

  return (
    <>
      <Kopf />
      <div className="bahn luft seite" style={{ paddingTop: 8 }}>
        {erledigt ? <Bestaetigung erledigt={erledigt} tag={fertigTag} schluessel={schluessel} /> : null}

        {stand.abgesagt && !erledigt ? (
          <div style={{ textAlign: "center" }}>
            <Haken art="frage" zeichnen={false} />
            <h2 style={{ marginTop: 22 }}>
              Ihr habt <em>abgesagt.</em>
            </h2>
            <p style={{ marginTop: 14 }}>Wollt ihr doch wieder dabei sein? Schreibt uns kurz, wir schauen gemeinsam.</p>
            <Abstand />
            <Knopf href={KONTAKT.whatsapp}>WhatsApp schreiben</Knopf>
          </div>
        ) : null}

        {!stand.abgesagt && offen.length === 0 && !erledigt ? (
          <div style={{ textAlign: "center" }}>
            <Haken art="frage" zeichnen={false} />
            <h2 style={{ marginTop: 22 }}>
              Gerade keine <em>Warteliste.</em>
            </h2>
            <p style={{ marginTop: 14 }}>Ihr steht im Moment auf keiner Warteliste. Fragen? Schreibt uns.</p>
            <Abstand />
            <Knopf href={KONTAKT.whatsapp}>WhatsApp schreiben</Knopf>
          </div>
        ) : null}

        {!stand.abgesagt
          ? offen
              .filter((t) => !(erledigt && erledigt.datum === t.datum))
              .map((t, i) => (
                <div key={t.datum} style={{ marginTop: i > 0 || erledigt ? 48 : 0 }}>
                  <TagBlock
                    tag={t}
                    vornamen={stand.vornamen}
                    schluessel={schluessel}
                    beschaeftigt={beschaeftigt}
                    onBleiben={() => aktion("bleiben", t)}
                    onNehmen={() => aktion("nehmen", t)}
                    onRaus={() => {
                      setFehler(null);
                      setRausFuer(t.datum);
                    }}
                  />
                </div>
              ))
          : null}

        <Fehler text={fehler} />
        <p className="leise klein" style={{ marginTop: 40, textAlign: "center" }}>
          Fragen? <a href={KONTAKT.whatsapp} target="_blank" rel="noopener">Schreibt uns per WhatsApp</a>
        </p>
      </div>
    </>
  );
}

function Bestaetigung({ erledigt, tag, schluessel }: { erledigt: { aktion: Aktion; datum: string; warAngeboten?: boolean }; tag?: WartelisteTag; schluessel: string }) {
  const datum = tag?.datumKurz ?? erledigt.datum;
  // Im Fließtext die lange Form („Samstag, 12. Juni 2027“), kurz nur in Überschriften
  const lang = tag?.datumLang ?? datum;
  if (erledigt.aktion === "raus") {
    return (
      <div style={{ textAlign: "center" }}>
        <Haken art="ok" />
        <h2 style={{ marginTop: 22 }}>
          Danke <em>euch.</em>
        </h2>
        <Band grau style={{ marginTop: 18, textAlign: "left" }}>
          Wir wünschen euch einen wunderschönen Tag.{erledigt.warAngeboten ? ` Den ${lang}, geben wir frei.` : ` Für den ${lang}, steht ihr nicht mehr auf unserer Warteliste.`}
        </Band>
        <p className="leise klein" style={{ marginTop: 14 }}>
          Euer Amoriva-Team
        </p>
      </div>
    );
  }
  if (erledigt.aktion === "bleiben") {
    return (
      <div style={{ textAlign: "center" }}>
        <Haken art="ok" />
        <h2 style={{ marginTop: 22 }}>
          Schön, ihr <em>bleibt.</em>
        </h2>
        <Band style={{ marginTop: 18, textAlign: "left" }}>
          {tag?.platz ? (
            <>
              Ihr bleibt für den {lang}, auf <b>Platz {tag.platz}</b>.
            </>
          ) : (
            <>Ihr bleibt für den {lang}, auf unserer Warteliste.</>
          )}{" "}
          Wird der Tag frei, bekommt ihr sofort eine Mail.
        </Band>
        <p className="leise klein" style={{ marginTop: 14 }}>
          Euer Amoriva-Team
        </p>
      </div>
    );
  }
  // nehmen
  const reserviert = tag?.zustand === "angenommen";
  return (
    <div style={{ textAlign: "center" }}>
      <Haken art="ok" />
      <Label style={{ marginTop: 22 }}>{tag?.datumLang ?? datum}</Label>
      <h2 style={{ marginTop: 8 }}>
        Wunderbar, euer Tag ist <em>{reserviert ? "reserviert." : "gehalten."}</em>
      </h2>
      <Band style={{ marginTop: 18, textAlign: "left" }}>
        {reserviert ? (
          <>
            <b>Wir halten ihn bis {tag?.haltenBis} für euch.</b> Schaut euch euer Angebot an, dort könnt ihr auch gleich unterschreiben.
          </>
        ) : (
          <>
            {tag?.haltenBis ? (
              <>
                <b>Wir halten den Tag bis {tag.haltenBis} für euch.</b>{" "}
              </>
            ) : null}
            Euer Angebot schicken wir euch in Kürze per Mail.
          </>
        )}
      </Band>
      {reserviert ? (
        <>
          <Abstand />
          <Knopf art="hell-voll" href={PFADE.paar(schluessel)}>
            Zum Angebot
          </Knopf>
        </>
      ) : null}
      <p className="leise klein" style={{ marginTop: 14 }}>
        Euer Amoriva-Team
      </p>
    </div>
  );
}

function TagBlock({
  tag,
  vornamen,
  schluessel,
  beschaeftigt,
  onBleiben,
  onNehmen,
  onRaus,
}: {
  tag: WartelisteTag;
  vornamen: string;
  schluessel: string;
  beschaeftigt: Aktion | null;
  onBleiben: () => void;
  onNehmen: () => void;
  onRaus: () => void;
}) {
  const rausLink = (text: string) => (
    <p style={{ textAlign: "center", marginTop: 8 }}>
      <button type="button" className="textlink" onClick={onRaus}>
        {text}
      </button>
    </p>
  );

  if (tag.zustand === "angeboten") {
    return (
      <>
        <Haken art="ok" />
        <Label style={{ marginTop: 22 }}>Gute Nachricht</Label>
        <h2 style={{ marginTop: 8 }}>
          Euer Tag ist <em>frei</em> geworden.
        </h2>
        <Band style={{ marginTop: 18 }}>
          <b>
            Wir halten den {tag.datumLang}
            {tag.haltenBis ? `, bis ${tag.haltenBis}` : ""} für euch.
          </b>{" "}
          Wollt ihr ihn haben?
        </Band>
        <Abstand />
        <Knopf art="hell-voll" beschaeftigt={beschaeftigt === "nehmen"} disabled={!!beschaeftigt} onClick={onNehmen}>
          Wir nehmen den Tag
        </Knopf>
        {rausLink("Wir brauchen den Tag nicht mehr")}
      </>
    );
  }

  if (tag.zustand === "zugesagt" || tag.zustand === "angenommen") {
    const reserviert = tag.zustand === "angenommen";
    return (
      <>
        <Label>{tag.datumLang}</Label>
        <h2 style={{ marginTop: 8 }}>
          Euer Tag ist <em>{reserviert ? "reserviert." : "gehalten."}</em>
        </h2>
        <Band style={{ marginTop: 18 }}>
          {reserviert ? (
            <>
              <b>Wir halten ihn{tag.haltenBis ? ` bis ${tag.haltenBis}` : ""} für euch.</b> Auf eurer Seite seht ihr euer Angebot und könnt unterschreiben.
            </>
          ) : (
            <>
              <b>Danke für eure Zusage.</b>
              {tag.haltenBis ? ` Wir halten den Tag bis ${tag.haltenBis} für euch.` : ""} Euer Angebot schicken wir euch in Kürze per Mail.
            </>
          )}
        </Band>
        {reserviert || tag.angebotDa ? (
          <>
            <Abstand />
            <Knopf art="hell-voll" href={PFADE.paar(schluessel)}>
              Zum Angebot
            </Knopf>
          </>
        ) : null}
        {rausLink("Wir brauchen den Tag doch nicht")}
      </>
    );
  }

  if (tag.zustand === "vergeben") {
    // Prototyp „Datum fest vergeben“: ehrlich, mit Hilfe aus dem Netzwerk, ohne Namen
    return (
      <>
        <Label>{vornamen ? `Hallo ${vornamen}` : "Hallo"}</Label>
        <h2 style={{ marginTop: 8 }}>
          Der {tag.datumKurz} ist leider <em>vergeben.</em>
        </h2>
        <p style={{ marginTop: 12 }}>Das tut uns leid. Wir wollen euch trotzdem nicht ohne Hilfe lassen.</p>
        <Karte style={{ marginTop: 18 }}>
          <p className="label">Es muss genau dieser Tag sein?</p>
          <p className="klein" style={{ marginTop: 6 }}>
            Dann empfehlen wir euch gern Kolleginnen und Kollegen, deren Arbeit wir kennen und schätzen. Schreibt uns kurz, dann schicken wir euch Empfehlungen.
          </p>
          <Abstand hoehe={14} />
          <Knopf art="hell" href={KONTAKT.whatsapp}>
            Empfehlungen anfragen
          </Knopf>
        </Karte>
        <Karte>
          <p className="label">Manchmal wird doch noch ein Tag frei</p>
          <p className="klein" style={{ marginTop: 6 }}>
            {tag.platz ? `Ihr steht weiter auf Platz ${tag.platz}. ` : ""}Wird der Tag frei, bekommt ihr sofort eine Mail.
          </p>
          <Abstand hoehe={14} />
          <Knopf beschaeftigt={beschaeftigt === "bleiben"} disabled={!!beschaeftigt} onClick={onBleiben}>
            Wir warten trotzdem weiter
          </Knopf>
        </Karte>
        {rausLink("Wir sind raus")}
      </>
    );
  }

  // wartet (Prototyp „Rückfrage alle 4 Wochen“)
  return (
    <>
      <Label>Warteliste{tag.platz ? ` · Platz ${tag.platz}` : ""}</Label>
      <h2 style={{ marginTop: 8 }}>
        Wartet ihr noch auf den <em>{tag.datumKurz}?</em>
      </h2>
      <p style={{ marginTop: 12 }}>
        Der {tag.datumLang}, ist noch nicht frei geworden.{tag.platz ? ` Ihr seid weiter auf Platz ${tag.platz}.` : ""}
      </p>
      <p style={{ marginTop: 10 }}>Wollt ihr weiter auf der Warteliste bleiben? Ein Klick reicht.</p>
      <Abstand />
      <Knopf art="hell-voll" beschaeftigt={beschaeftigt === "bleiben"} disabled={!!beschaeftigt} onClick={onBleiben}>
        Ja, wir warten weiter
      </Knopf>
      {rausLink("Nein, wir haben uns anders entschieden")}
    </>
  );
}
