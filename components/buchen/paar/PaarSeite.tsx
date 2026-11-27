"use client";

import { useCallback, useEffect, useState } from "react";
import { Band, Haken, Karte, Knopf, Kopf, Label, Lade, Abstand, Fehler } from "@/components/buchen/basis/bausteine";
import { KONTAKT } from "@/components/buchen/basis/kontakt";
import { PFADE } from "@/components/buchen/basis/pfade";
import oliveBild from "@/components/buchen/basis/bilder/olive.webp";
import kussBild from "@/components/buchen/basis/bilder/paar-kuss.webp";
import type { PaarSeite as Daten } from "@/lib/films-typen";
import { Unterschrift, type UnterschriftZusatz } from "./Unterschrift";
import { Countdown } from "./Countdown";
import { Fragebogen, FragebogenAufgabe } from "./Fragebogen";
import { Abgabe } from "./Abgabe";
import { Widerruf } from "./Widerruf";

type Ansicht = "seite" | "gebucht" | "angebot" | "vertrag" | "fragebogen" | "rest" | "unterlagen";
type Zustand = { art: "laedt" } | { art: "fehler"; text: string } | { art: "da"; seite: Daten };

async function holen(url: string, body: unknown): Promise<{ seite?: Daten; error?: string }> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
  const json = (await res.json().catch(() => ({}))) as { seite?: Daten; error?: string };
  if (!res.ok) return { error: json.error ?? "Das hat gerade nicht geklappt. Bitte ladet die Seite neu." };
  return json;
}

function schluesselAusAdresse() {
  return decodeURIComponent(window.location.hash.replace(/^#/, "")).trim();
}

/** Tag fest (vorläufig oder gebucht), dann gibt es Countdown, Fahrplan und Schnellzugriffe. */
const istFest = (s: Daten) => s.phase === "vorlaeufig" || s.phase === "gebucht";

/** Solange die Anzahlung offen ist, landet das Paar zuerst auf der Begrüßung mit der Anzahlung (Prototyp „Gebucht“). */
const startAnsicht = (s: Daten): Ansicht => (istFest(s) && s.anzahlung && !s.anzahlung.eingegangen ? "gebucht" : "seite");

/** Seite des Paares: Fortschritt, Angebot, Vertrag mit Unterschrift, danach Begrüßung, Countdown, Fahrplan und Unterlagen. */
export function PaarSeite() {
  const [zustand, setZustand] = useState<Zustand>({ art: "laedt" });
  const [schluessel, setSchluessel] = useState("");
  const [ansicht, setAnsicht] = useState<Ansicht>("seite");
  const [geradeGebucht, setGeradeGebucht] = useState(false);

  const laden = useCallback(async (s: string) => {
    if (!s) return { art: "fehler" as const, text: "Diesen Link kennen wir nicht. Schreibt uns kurz, dann schicken wir euch den richtigen." };
    const r = await holen("/api/buchen/paar", { schluessel: s }).catch(() => ({ error: "Keine Verbindung. Bitte ladet die Seite neu." }) as { seite?: Daten; error?: string });
    return r.seite ? { art: "da" as const, seite: r.seite } : { art: "fehler" as const, text: r.error ?? "" };
  }, []);

  useEffect(() => {
    let aus = false;
    const los = () => {
      const s = schluesselAusAdresse();
      void laden(s).then((z) => {
        if (aus) return;
        setSchluessel(s);
        setZustand(z);
        setAnsicht(z.art === "da" ? startAnsicht(z.seite) : "seite");
      });
    };
    los();
    window.addEventListener("hashchange", los);
    return () => {
      aus = true;
      window.removeEventListener("hashchange", los);
    };
  }, [laden]);

  const zeige = (a: Ansicht) => {
    setAnsicht(a);
    window.scrollTo({ top: 0 });
  };

  if (zustand.art === "laedt") {
    return (
      <section className="seite mitte">
        <Lade label="Einen Moment" titel="Eure Seite lädt" />
      </section>
    );
  }
  if (zustand.art === "fehler") {
    return (
      <section className="seite">
        <Kopf />
        <div className="bahn luft" style={{ textAlign: "center" }}>
          <Haken art="frage" />
          <p className="klein" style={{ marginTop: 18 }}>{zustand.text}</p>
          <Abstand />
          <Knopf art="hell-voll" href={KONTAKT.whatsapp}>Per WhatsApp schreiben</Knopf>
        </div>
      </section>
    );
  }

  const s = zustand.seite;
  const fest = istFest(s);
  if (ansicht === "angebot" && s.angebot) return <AngebotDoc seite={s} weiter={s.unterschriftGesperrt ? null : () => zeige("vertrag")} zurueck={() => zeige("seite")} />;
  if (ansicht === "vertrag" && s.angebot && s.vertrag && !s.unterschriftGesperrt) {
    return (
      <VertragAnsicht
        seite={s}
        schluessel={schluessel}
        zurueck={() => zeige("angebot")}
        unterschreiben={async (eingabe) => {
          const r = await holen("/api/buchen/paar/vertrag", { schluessel, ...eingabe, textHash: s.vertrag!.hash }).catch(() => ({ error: "Keine Verbindung. Bitte probiert es noch einmal." }) as { seite?: Daten; error?: string });
          if (!r.seite) return r.error ?? "Das hat gerade nicht geklappt.";
          setZustand({ art: "da", seite: r.seite });
          setGeradeGebucht(true);
          zeige(istFest(r.seite) ? "gebucht" : "seite");
          return null;
        }}
      />
    );
  }
  if (ansicht === "fragebogen" && fest) return <Fragebogen schluessel={schluessel} zurueck={() => zeige("seite")} />;
  if (ansicht === "gebucht" && fest) return <Gebucht seite={s} schluessel={schluessel} geradeGebucht={geradeGebucht} zeige={zeige} />;
  if (ansicht === "rest" && s.rest?.rechnung) return <RestAnsicht seite={s} schluessel={schluessel} zurueck={() => zeige("seite")} />;
  if (ansicht === "unterlagen" && fest) return <Unterlagen seite={s} schluessel={schluessel} zurueck={() => zeige("seite")} />;
  return <Uebersicht seite={s} schluessel={schluessel} zeige={zeige} setSeite={(neu) => setZustand({ art: "da", seite: neu })} />;
}

// ---------------------------------------------------------------------------
// Übersicht: Fortschritt, nächster Schritt, nach dem Vertrag Countdown, Fahrplan und Schnellzugriffe
// ---------------------------------------------------------------------------

function Fortschrittsleiste({ seite }: { seite: Daten }) {
  return (
    <ol className="fortschritt" aria-label="Euer Stand">
      {seite.fortschritt.schritte.map((x) => (
        <li key={x.id} className={x.zustand === "offen" ? undefined : x.zustand} aria-current={x.zustand === "jetzt" ? "step" : undefined}>
          {x.titel}
        </li>
      ))}
    </ol>
  );
}

function Liste({ punkte }: { punkte: Daten["fahrplan"] }) {
  return (
    <ol className="fahrplan">
      {punkte.map((x, i) => (
        <li key={i} className={x.zustand || undefined}>
          <span className="pkt" />
          <p className="wann">{x.wann}</p>
          <p className="was">{x.was}</p>
          <p className="wie">{x.wie}</p>
        </li>
      ))}
    </ol>
  );
}

function Uebersicht({ seite: s, schluessel, zeige, setSeite }: { seite: Daten; schluessel: string; zeige: (a: Ansicht) => void; setSeite: (s: Daten) => void }) {
  const fest = istFest(s);
  const nachHochzeit = !!s.bearbeitung;
  return (
    <section className="seite">
      <Kopf rechts="Eure Seite" />
      <div className="bahn" style={{ paddingBottom: 56 }}>
        <Label style={{ textAlign: "center" }}>
          {s.paar.name}
          {s.paar.datumLang ? ` · ${s.paar.datumLang}` : ""}
        </Label>
        <h2 style={{ marginTop: 8, textAlign: "center" }}>
          {nachHochzeit ? (
            <>
              Euer Tag ist im <em>Kasten.</em>
            </>
          ) : fest ? (
            <>
              Bis zu eurem <em>Tag</em>
            </>
          ) : (
            <>
              Schön, dass ihr <em>da seid</em>
            </>
          )}
        </h2>

        {fest && s.countdownZiel ? (
          <>
            <Countdown ziel={s.countdownZiel} />
            <p className="leise klein" style={{ textAlign: "center" }}>
              {s.trauungUm ? `bis zur Trauung um ${s.trauungUm} Uhr` : `bis zu eurem Hochzeitstag${s.paar.ort ? ` in ${s.paar.ort}` : ""}`}
            </p>
          </>
        ) : null}

        <Fortschrittsleiste seite={s} />
        <Band style={{ marginTop: 14 }}>{s.fortschritt.naechsterSchritt}</Band>

        {fest ? <Abgabe schluessel={schluessel} /> : null}

        {s.bearbeitung ? (
          <Karte style={{ marginTop: 22 }}>
            <Label>Euer Bearbeitungsstand</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              {s.bearbeitung.satz}
            </p>
            <Liste punkte={s.bearbeitung.schritte} />
          </Karte>
        ) : null}

        {s.angebot && !fest ? (
          <Karte style={{ marginTop: 22 }}>
            <Label>Euer Angebot</Label>
            <div className="zeilen" style={{ marginTop: 10 }}>
              <div>
                <span>Leistung</span>
                <span>{s.angebot.bezeichnung}</span>
              </div>
              <div>
                <span>Datum</span>
                <span>{s.paar.datumLang}</span>
              </div>
              <div>
                <span>Preis</span>
                <span>{s.angebot.summe}</span>
              </div>
            </div>
            <Abstand hoehe={18} />
            <Knopf art="hell-voll" onClick={() => zeige("angebot")}>
              Angebot ansehen
            </Knopf>
            {!s.unterschriftGesperrt ? (
              <p style={{ textAlign: "center", marginTop: 8 }}>
                <button type="button" className="textlink" onClick={() => zeige("vertrag")}>
                  Direkt zum Vertrag
                </button>
              </p>
            ) : null}
            <PdfLink schluessel={schluessel} art="angebot" text="Angebot als PDF" />
          </Karte>
        ) : null}

        {fest && !nachHochzeit && s.fahrplan.length ? (
          <Karte style={{ marginTop: 22 }}>
            <Label>Euer Fahrplan</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Ihr müsst euch um nichts kümmern. Wir melden uns bei jedem Schritt rechtzeitig per Mail und WhatsApp.
            </p>
            <Liste punkte={s.fahrplan} />
          </Karte>
        ) : null}

        {fest ? <Schnellzugriffe seite={s} schluessel={schluessel} zeige={zeige} /> : null}

        {s.unterschrieben ? (
          <Karte>
            <Label>Vertrag</Label>
            <p className="klein" style={{ marginTop: 8 }}>
              Unterschrieben von {s.unterschrieben.name} am {s.unterschrieben.am}.
            </p>
            {s.angebot ? (
              <p className="leise klein" style={{ marginTop: 4 }}>
                {s.angebot.bezeichnung} · {s.angebot.summe}
              </p>
            ) : null}
          </Karte>
        ) : null}
        {s.widerruf ? <Widerruf schluessel={schluessel} unterschriebenAm={s.widerruf.unterschriebenAm} name={s.widerruf.name} fertig={setSeite} /> : null}

        {s.phase === "warteliste" && schluessel ? (
          <Karte>
            <Label>Eure Warteliste</Label>
            <p className="klein" style={{ marginTop: 6 }}>
              Hier seht ihr euren Platz und sagt uns, ob ihr weiter warten wollt.
            </p>
            <Abstand hoehe={16} />
            <Knopf href={PFADE.warteliste(schluessel)}>Zur Warteliste</Knopf>
          </Karte>
        ) : null}

        {s.widerrufen && !fest ? (
          <Karte>
            <Label>Vertrag</Label>
            <p className="klein" style={{ marginTop: 8 }}>
              Widerrufen am {s.widerrufen.am}.
            </p>
            <PdfLink schluessel={schluessel} art="vertrag" text="Vertrag als PDF" />
          </Karte>
        ) : null}

        {fest && !nachHochzeit ? <Tipp /> : null}

        <FragenKarte />
      </div>
    </section>
  );
}

/** Zeile wie im Prototyp (.aufgabe): Titel, Unterzeile, Pfeil. Ohne onClick nur Anzeige, ohne Pfeil. */
function Zeile({ titel, unter, onClick, beschaeftigt }: { titel: string; unter: string; onClick?: () => void; beschaeftigt?: boolean }) {
  const inhalt = (
    <>
      <div className="was">
        {titel}
        <small>{unter}</small>
      </div>
      {onClick ? (
        <span className="pfeil" aria-hidden="true">
          &#8594;
        </span>
      ) : null}
    </>
  );
  if (!onClick) return <div className="aufgabe">{inhalt}</div>;
  return (
    <button type="button" className="aufgabe" onClick={onClick} aria-busy={beschaeftigt || undefined} disabled={beschaeftigt} style={{ width: "100%", textAlign: "left" }}>
      {inhalt}
    </button>
  );
}

/** Schnellzugriffe wie im Prototyp: Anzahlung (solange offen), Fragebogen, Restzahlung, Vertrag und Rechnungen. */
function Schnellzugriffe({ seite: s, schluessel, zeige }: { seite: Daten; schluessel: string; zeige: (a: Ansicht) => void }) {
  const z = s.anzahlung;
  const r = s.rest;
  return (
    <Karte>
      {z && !z.eingegangen ? <Zeile titel="Anzahlung" unter={`${z.betrag} bis ${z.bis}`} onClick={() => zeige("gebucht")} /> : null}
      <FragebogenAufgabe schluessel={schluessel} oeffnen={() => zeige("fragebogen")} />
      {r ? (
        r.eingegangen ? (
          <Zeile titel="Restzahlung" unter="Eingegangen. Danke euch, alles erledigt." />
        ) : (
          <Zeile titel="Restzahlung" unter={`${r.betrag} bis ${r.bis}`} onClick={r.rechnung ? () => zeige("rest") : undefined} />
        )
      ) : null}
      <Zeile titel="Vertrag und Rechnungen" unter="Alles als PDF" onClick={() => zeige("unterlagen")} />
    </Karte>
  );
}

function Tipp() {
  return (
    <Karte>
      <Label>Ein Tipp vorab</Label>
      <h3 style={{ marginTop: 6 }}>Plant 20 Minuten nur für euch zwei ein.</h3>
      <p className="klein" style={{ marginTop: 6 }}>
        Kurz nach der Trauung, abseits der Gäste. Daraus entstehen fast immer die schönsten Bilder und die ruhigsten Momente im Film.
      </p>
    </Karte>
  );
}

function FragenKarte() {
  return (
    <Karte style={{ textAlign: "center", marginTop: 16 }}>
      <Label>Fragen?</Label>
      <p className="klein" style={{ marginTop: 6 }}>Schreibt uns einfach. Wir antworten meist am selben Tag.</p>
      <Abstand hoehe={16} />
      <Knopf art="hell-voll" href={KONTAKT.whatsapp}>
        Per WhatsApp schreiben
      </Knopf>
      <p style={{ marginTop: 10 }}>
        <a className="textlink" href={`mailto:${KONTAKT.mail}`}>
          oder per Mail
        </a>
      </p>
    </Karte>
  );
}

// ---------------------------------------------------------------------------
// Gebucht: Begrüßung nach der Unterschrift, Anzahlung mit QR-Code, so geht es weiter (Prototyp Abschnitt 7)
// ---------------------------------------------------------------------------

function Gebucht({ seite: s, schluessel, geradeGebucht, zeige }: { seite: Daten; schluessel: string; geradeGebucht: boolean; zeige: (a: Ansicht) => void }) {
  const gebucht = s.phase === "gebucht";
  const anzahlungDa = !!s.anzahlung?.eingegangen;
  return (
    <section className="seite">
      <Kopf rechts="Eure Seite" />
      <div className="bahn" style={{ paddingBottom: 56 }}>
        <div className="bild-kopf">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={kussBild.src} alt="" />
          <div>
            <p className="label" style={{ color: "var(--grau-dunkel)" }}>
              {s.paar.datumLang}
            </p>
            <h2 style={{ marginTop: 6 }}>
              {gebucht ? (
                <>
                  Ihr seid <em>gebucht.</em>
                </>
              ) : (
                <>
                  Euer Vertrag ist <em>unterschrieben.</em>
                </>
              )}
            </h2>
          </div>
        </div>
        <Fortschrittsleiste seite={s} />
        <Karte style={{ marginTop: 14 }}>
          <p>
            {gebucht
              ? "Wir freuen uns riesig auf euren Tag. Euer Datum ist ab jetzt fest für euch eingetragen."
              : geradeGebucht
                ? "Wir freuen uns riesig auf euren Tag. Mit eurer Anzahlung ist euer Datum fest für euch eingetragen."
                : "Schön, dass ihr wieder da seid. Mit eurer Anzahlung ist euer Datum fest für euch eingetragen."}
          </p>
          <p className="leise klein" style={{ marginTop: 8 }}>
            Euer Amoriva-Team
          </p>
        </Karte>
        {s.anzahlung ? <ZahlungKarte titel="Anzahlung" zahlung={s.anzahlung} schluessel={schluessel} art="anzahlung" /> : null}
        <Karte>
          <Label>So geht es weiter</Label>
          <ol className="schritte">
            <li>
              <span className="nr ok">&#10003;</span>
              <span>Vertrag unterschrieben</span>
            </li>
            <li>
              <span className={anzahlungDa ? "nr ok" : "nr"}>{anzahlungDa ? <>&#10003;</> : 2}</span>
              <span>{anzahlungDa ? "Anzahlung eingegangen, danke euch" : "Anzahlung überweisen, den Eingang seht ihr hier auf eurer Seite"}</span>
            </li>
            <li>
              <span className="nr">3</span>
              <span>Fragebogen ausfüllen, wann immer ihr Zeit habt</span>
            </li>
            <li>
              <span className="nr">4</span>
              <span>Etwa 6 Wochen vorher gehen wir euren Tagesablauf gemeinsam durch</span>
            </li>
          </ol>
        </Karte>
        <Tipp />
        <Abstand />
        <Knopf art="hell" onClick={() => zeige("seite")}>
          Zu eurer Seite
        </Knopf>
      </div>
    </section>
  );
}

type Zahlung = {
  betrag: string;
  bis: string;
  zweck: string;
  eingegangen: boolean;
  bank: { name: string; iban: string; bic?: string } | null;
  qr: string | null;
};

/** Karte für Anzahlung oder Rest: Betrag, Frist, Bankdaten, GiroCode und die Rechnung als PDF. */
function ZahlungKarte({ titel, zahlung: z, schluessel, art }: { titel: string; zahlung: Zahlung; schluessel: string; art: "anzahlung" | "rest" }) {
  return (
    <Karte>
      <Label>{titel}</Label>
      {z.eingegangen ? (
        <p className="klein" style={{ marginTop: 8 }}>
          Eingegangen. Danke euch, alles erledigt.
        </p>
      ) : (
        // Zweispaltig nur mit QR-Code, sonst nutzen die Zeilen die ganze Breite
        <div className={z.qr ? "zahlung" : undefined} style={{ marginTop: 10 }}>
          <div className="zeilen">
            <div>
              <span>Betrag</span>
              <b>{z.betrag}</b>
            </div>
            <div>
              <span>Bis</span>
              <span>{z.bis}</span>
            </div>
            {z.bank ? (
              <>
                <div>
                  <span>An</span>
                  <span>{z.bank.name}</span>
                </div>
                <div>
                  <span>IBAN</span>
                  <span>{z.bank.iban}</span>
                </div>
                {z.bank.bic ? (
                  <div>
                    <span>BIC</span>
                    <span>{z.bank.bic}</span>
                  </div>
                ) : null}
              </>
            ) : null}
            {z.zweck ? (
              <div>
                <span>Zweck</span>
                <span>{z.zweck}</span>
              </div>
            ) : null}
          </div>
          {z.qr ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="qr" src={z.qr} alt="QR-Code für die Überweisung" />
              <p className="qr-unter">Mit der Banking-App scannen.</p>
            </div>
          ) : null}
        </div>
      )}
      {!z.eingegangen && !z.bank ? (
        <p className="leise klein" style={{ marginTop: 8 }}>
          Die Bankdaten stehen auf eurer Rechnung.
        </p>
      ) : null}
      {!z.eingegangen ? (
        <>
          <Abstand hoehe={16} />
          <PdfKnopf schluessel={schluessel} art={art} />
        </>
      ) : null}
    </Karte>
  );
}

function RestAnsicht({ seite: s, schluessel, zurueck }: { seite: Daten; schluessel: string; zurueck: () => void }) {
  return (
    <section className="seite">
      <Kopf zurueck={{ onClick: zurueck }} />
      <div className="bahn" style={{ paddingBottom: 56 }}>
        <Label>{s.paar.name}</Label>
        <h2 style={{ marginTop: 6 }}>
          Eure <em>Restzahlung</em>
        </h2>
        <p className="klein" style={{ marginTop: 8 }}>
          Bitte überweist den Rest bis {s.rest!.bis}. Danach ist alles erledigt und wir können uns ganz auf euren Tag freuen.
        </p>
        <div style={{ marginTop: 18 }}>
          <ZahlungKarte titel="Restzahlung" zahlung={s.rest!} schluessel={schluessel} art="rest" />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Vertrag und Rechnungen als PDF. Der Schlüssel geht nur im Body mit, nie in der Adresse.
// ---------------------------------------------------------------------------

type PdfArt = "vertrag" | "angebot" | "anzahlung" | "rest";

const PDF_WEG: Record<PdfArt, { url: string; body: (s: string) => unknown; name: string; fehlt: string }> = {
  angebot: {
    url: "/api/buchen/paar/angebot-pdf",
    body: (schluessel) => ({ schluessel }),
    name: "Angebot.pdf",
    fehlt: "Euer Angebot als PDF bereiten wir gerade vor. Schreibt uns kurz, dann schicken wir es euch.",
  },
  vertrag: {
    url: "/api/buchen/paar/vertrag-pdf",
    body: (schluessel) => ({ schluessel }),
    name: "Vertrag.pdf",
    fehlt: "Euren Vertrag als PDF bereiten wir gerade vor. Schreibt uns kurz, dann schicken wir ihn euch.",
  },
  anzahlung: {
    url: "/api/buchen/paar/rechnung",
    body: (schluessel) => ({ schluessel, art: "anzahlung" }),
    name: "Rechnung-Anzahlung.pdf",
    fehlt: "Eure Rechnung ist noch nicht fertig. Wir schicken sie euch, sobald es so weit ist.",
  },
  rest: {
    url: "/api/buchen/paar/rechnung",
    body: (schluessel) => ({ schluessel, art: "rest" }),
    name: "Rechnung-Rest.pdf",
    fehlt: "Eure Rechnung ist noch nicht fertig. Wir schicken sie euch, sobald es so weit ist.",
  },
};

/** PDF holen und speichern. Gibt einen ruhigen Fehlertext zurück oder null. Eine 404 ohne Text (Route fehlt) bleibt ruhig. */
async function pdfLaden(art: PdfArt, schluessel: string): Promise<string | null> {
  const weg = PDF_WEG[art];
  try {
    const res = await fetch(weg.url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(weg.body(schluessel)), cache: "no-store" });
    if (!res.ok || !(res.headers.get("Content-Type") ?? "").includes("pdf")) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 404) return json.error ?? weg.fehlt;
      return json.error ?? "Das hat gerade nicht geklappt. Bitte probiert es gleich noch einmal.";
    }
    const name = /filename="([^"]+)"/.exec(res.headers.get("Content-Disposition") ?? "")?.[1] ?? weg.name;
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    return null;
  } catch {
    return "Keine Verbindung. Bitte probiert es noch einmal.";
  }
}

/** Leiser Textlink für ein PDF (Angebot, Vertrag nach Widerruf). */
function PdfLink({ schluessel, art, text }: { schluessel: string; art: PdfArt; text: string }) {
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  return (
    <>
      <p style={{ textAlign: "center", marginTop: 8 }}>
        <button
          type="button"
          className="textlink"
          disabled={laedt || !schluessel}
          aria-busy={laedt || undefined}
          onClick={async () => {
            setLaedt(true);
            setFehler(await pdfLaden(art, schluessel));
            setLaedt(false);
          }}
        >
          {laedt ? "Einen Moment" : text}
        </button>
      </p>
      <Fehler text={fehler} />
    </>
  );
}

function PdfKnopf({ schluessel, art }: { schluessel: string; art: "anzahlung" | "rest" }) {
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  return (
    <>
      <Knopf
        art="rand"
        beschaeftigt={laedt}
        disabled={laedt || !schluessel}
        onClick={async () => {
          setLaedt(true);
          setFehler(await pdfLaden(art, schluessel));
          setLaedt(false);
        }}
      >
        {art === "rest" ? "Restrechnung herunterladen" : "Rechnung herunterladen"}
      </Knopf>
      <Fehler text={fehler} />
    </>
  );
}

function Unterlagen({ seite: s, schluessel, zurueck }: { seite: Daten; schluessel: string; zurueck: () => void }) {
  const [laedt, setLaedt] = useState<PdfArt | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);
  const laden = async (art: PdfArt) => {
    if (laedt) return;
    setLaedt(art);
    setFehler(await pdfLaden(art, schluessel));
    setLaedt(null);
  };
  const zeilen: { art: PdfArt; titel: string; unter: string }[] = [];
  if (s.unterschrieben) zeilen.push({ art: "vertrag", titel: "Vertrag", unter: `Unterschrieben am ${s.unterschrieben.am}` });
  else if (s.widerrufen) zeilen.push({ art: "vertrag", titel: "Vertrag", unter: `Widerrufen am ${s.widerrufen.am}` });
  if (s.angebot) zeilen.push({ art: "angebot", titel: "Angebot", unter: s.angebot.nummer });
  if (s.anzahlung) zeilen.push({ art: "anzahlung", titel: "Rechnung Anzahlung", unter: `${s.anzahlung.betrag}${s.anzahlung.zweck ? ` · ${s.anzahlung.zweck}` : ""}` });
  if (s.rest?.rechnung) zeilen.push({ art: "rest", titel: "Restrechnung", unter: `${s.rest.betrag}${s.rest.zweck ? ` · ${s.rest.zweck}` : ""}` });
  return (
    <section className="seite">
      <Kopf zurueck={{ onClick: zurueck }} />
      <div className="bahn" style={{ paddingBottom: 56 }}>
        <Label>{s.paar.name}</Label>
        <h2 style={{ marginTop: 6 }}>
          Vertrag und <em>Rechnungen</em>
        </h2>
        <p className="klein" style={{ marginTop: 8 }}>
          Alles als PDF zum Speichern. Ladet es euch am besten einmal herunter.
        </p>
        <Karte style={{ marginTop: 18 }}>
          {zeilen.length ? (
            zeilen.map((z) => <Zeile key={z.art} titel={z.titel} unter={laedt === z.art ? "Einen Moment" : z.unter} beschaeftigt={laedt === z.art} onClick={() => void laden(z.art)} />)
          ) : (
            <p className="klein">Sobald es eure Unterlagen gibt, findet ihr sie hier.</p>
          )}
          <Fehler text={fehler} />
        </Karte>
        {s.rest && !s.rest.rechnung && !s.rest.eingegangen ? (
          <p className="leise klein" style={{ marginTop: 12 }}>
            Die Restrechnung schicken wir euch rechtzeitig vor dem {s.rest.bis}.
          </p>
        ) : null}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Angebot im Design des Angebots-PDF
// ---------------------------------------------------------------------------

function AngebotDoc({ seite: s, weiter, zurueck }: { seite: Daten; weiter: (() => void) | null; zurueck: () => void }) {
  const a = s.angebot!;
  return (
    <section className="seite doc">
      <div className="doc-in">
        <div className="doc-kopf" style={{ position: "relative" }}>
          <button type="button" className="doc-link" onClick={zurueck} style={{ position: "absolute", left: 0, top: -4, minHeight: 44 }}>
            Zurück
          </button>
          <p className="doc-marke">
            AMORIVA<small>FILMS</small>
          </p>
        </div>
        <p className="doc-label" style={{ textAlign: "center", marginTop: 48 }}>
          Hochzeitsfilm und Fotografie
        </p>
        <h1 className="doc-titel">
          Euer <i>Angebot.</i>
        </h1>
        <p className="doc-fuer">für {s.paar.name}</p>
        <span className="doc-strich" />
        <div className="doc-eckdaten">
          <div>
            <p className="doc-klein">Hochzeit</p>
            <p className="doc-wert">
              {s.paar.datumKurz}
              {s.paar.ort ? ` · ${s.paar.ort}` : ""}
            </p>
          </div>
        </div>
        {a.haltenBis ? (
          <div className="doc-halten">
            <b>Wir halten euren Tag bis {a.haltenBis}.</b> Bis dahin bekommt ihn niemand anderes.
          </div>
        ) : null}

        <p className="doc-label" style={{ marginTop: 56 }}>
          Euer Paket
        </p>
        <h2 className="doc-h2">
          {a.paketTitel}
          {a.paketUnterzeile ? (
            <>
              <br />
              <i>{a.paketUnterzeile.toLowerCase()}.</i>
            </>
          ) : null}
        </h2>
        <div className="doc-pakete">
          <div className="doc-paket dunkel an">
            <h3>{a.bezeichnung}</h3>
            <ul>
              {a.leistungen.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div className="preis-zone">
              <p className="preis">{a.summe}</p>
              <p className="notiz">Euer persönlicher Preis</p>
            </div>
          </div>
        </div>
        <div className="doc-zusatz">
          {a.positionen.map((p, i) => (
            <label key={i}>
              <span>{p.titel}</span>
              <span className="linie" />
              <span className="preis">{p.betrag}</span>
            </label>
          ))}
        </div>
        <p className="doc-wunsch">
          <i>Ihr habt noch Wünsche? Schreibt uns, wir setzen sie für euch um.</i>
        </p>
        <p className="doc-klein-text" style={{ textAlign: "center" }}>
          {a.steuerHinweis}
        </p>

        <div className="doc-kontakt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={oliveBild.src} alt="" className="doc-olive" />
          <p className="doc-freuen">
            Wir freuen uns auf <i>euch.</i>
          </p>
          <div className="doc-kontakt-zeilen">
            <span>Telefon</span>
            <a href={KONTAKT.telefon}>{KONTAKT.telefonText}</a>
            <span>Mail</span>
            <a href={`mailto:${KONTAKT.mail}`}>{KONTAKT.mail}</a>
            <span>WhatsApp</span>
            <a href={KONTAKT.whatsapp} target="_blank" rel="noopener">
              Direkt schreiben
            </a>
          </div>
        </div>
        <p className="doc-fusszeile">
          Amoriva Films · Wolfsburg · Angebot {a.nummer} vom {a.erstelltAm}, gültig bis {a.gueltigBis}
        </p>
      </div>
      <div className="doc-leiste">
        <div className="doc-leiste-in">
          <div>
            <p className="doc-klein">{a.bezeichnung}</p>
            <p className="doc-summe">{a.summe}</p>
          </div>
          {weiter ? (
            <button type="button" className="doc-weiter" onClick={weiter}>
              Weiter zum Vertrag
            </button>
          ) : (
            <a className="doc-weiter" href={KONTAKT.whatsapp} target="_blank" rel="noopener">
              Uns schreiben
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Vertrag mit Unterschrift
// ---------------------------------------------------------------------------

export type UnterschriftDaten = { name: string; unterschrift: string; gelesen: boolean; vorzeitigerBeginn: boolean };

function VertragAnsicht({
  seite: s,
  schluessel,
  zurueck,
  unterschreiben,
}: {
  seite: Daten;
  schluessel: string;
  zurueck: () => void;
  /** Bekommt alles aus der Unterschrift: Name, Bild, Häkchen, Anschrift(en) und Code (UnterschriftZusatz). */
  unterschreiben: (e: UnterschriftDaten & UnterschriftZusatz) => Promise<string | null>;
}) {
  const a = s.angebot!;
  const v = s.vertrag!;
  return (
    <section className="seite">
      <Kopf zurueck={{ onClick: zurueck }} />
      <div className="bahn" style={{ paddingBottom: 56 }}>
        <Fortschrittsleiste seite={s} />
        <h2 style={{ marginTop: 14 }}>
          Euer <em>Vertrag</em>
        </h2>
        <Karte style={{ marginTop: 14 }}>
          <div className="zeilen">
            <div>
              <span>Leistung</span>
              <span>{a.bezeichnung}</span>
            </div>
            <div>
              <span>Datum</span>
              <span>{s.paar.datumLang}</span>
            </div>
            {s.paar.ort ? (
              <div>
                <span>Ort</span>
                <span>{s.paar.ort}</span>
              </div>
            ) : null}
            <div>
              <span>Preis</span>
              <span>{a.summe}</span>
            </div>
            <div>
              <span>Anzahlung 30 %</span>
              <span>
                {a.anzahlung}, {a.anzahlungBis}
              </span>
            </div>
            <div>
              <span>Rest</span>
              <span>
                {a.rest}, bis {a.restBis}
              </span>
            </div>
          </div>
          <details style={{ marginTop: 14 }}>
            <summary className="textlink">Ganzen Vertrag lesen</summary>
            <div style={{ marginTop: 10 }}>
              {v.abschnitte.map((x) => (
                <div key={x.titel} style={{ marginTop: 16 }}>
                  <p className="label">{x.titel}</p>
                  {x.absaetze.map((t, i) => (
                    <p key={i} className="klein" style={{ marginTop: 6 }}>
                      {t}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </details>
        </Karte>
        <Unterschrift schluessel={schluessel} unterschreiben={(e) => unterschreiben(e as UnterschriftDaten & UnterschriftZusatz)} />
      </div>
    </section>
  );
}
