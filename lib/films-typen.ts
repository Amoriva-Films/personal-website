// Typen der Buchungsstrecke, kopiert aus Selfmade (~/Downloads/selfmade-code/src/lib/films/**), Stand 27.11.2026.
// Daten und Logik bleiben in Selfmade. Die Website zeigt nur die Seiten und leitet die Aufrufe unter /api/buchen/*
// weiter (app/api/buchen/[...pfad]/route.js). Hier steht nur, was die Komponenten unter components/buchen brauchen.
// Ändert Selfmade die Antworten seiner Schnittstellen, diese Datei mitziehen (Quelle steht jeweils dabei).

// ---- kern/gemeinsam/typen.ts ----

/** Kalendertag als JJJJ-MM-TT (Europe/Berlin). */
export type IsoDatum = string;

/** Die drei Pakete laut Angebots-PDF. */
export type PaketId = "foto" | "film" | "komplett";

// ---- kern/verfuegbarkeit (typen.ts, anfrage.ts) ----

export type OeffentlicheAuskunft = "frei" | "bitte_anfragen";
export type DatumErgebnis = "frei" | "warteliste" | "nicht_verfuegbar" | "vergangen" | "fuer_euch_gehalten";

// ---- oeffentlich.ts ----

export type DatumAuskunft = { datum: IsoDatum; auskunft: OeffentlicheAuskunft };
export type AnfrageDatum = { datum: IsoDatum; ergebnis: DatumErgebnis; wartelistenPlatz: number | null; text: string };
export type AnfrageRueckmeldung = { schluessel: string; vornamen: string; daten: AnfrageDatum[]; text: string };

// ---- shared.ts ----

export type Phase = "anfrage" | "warteliste" | "angebot" | "reserviert" | "vorlaeufig" | "gebucht" | "abgesagt";

// ---- kern/angebot/fortschritt.ts ----

export type SchrittId = "anfrage" | "gespraech" | "angebot" | "vertrag" | "anzahlung";
export type SchrittZustand = "fertig" | "jetzt" | "offen";

export interface Fortschritt {
  schritte: { id: SchrittId; titel: string; zustand: SchrittZustand }[];
  /** Der Schritt, an dem das Paar gerade steht. null, wenn alles erledigt ist. */
  aktuell: SchrittId | null;
  /** Ein Satz fürs Paar: was als Nächstes passiert und bis wann. */
  naechsterSchritt: string;
}

// ---- oeffentlich-paar.ts ----

export type VertragAbschnitt = { titel: string; absaetze: string[] };
export type FahrplanPunkt = { zustand: "ok" | "jetzt" | ""; wann: string; was: string; wie: string };

/** Was die Paar-Seite anzeigt. Enthält keine internen Angaben (Startpreise, Abweichungen, Notizen). */
export type PaarSeite = {
  jetzt: string;
  paar: { name: string; vorname1: string; ort: string; datum: string; datumLang: string; datumKurz: string };
  phase: Phase;
  fortschritt: Fortschritt;
  angebot: null | {
    nummer: string;
    bezeichnung: string;
    paketTitel: string;
    paketUnterzeile: string;
    leistungen: string[];
    positionen: { titel: string; betrag: string }[];
    summe: string;
    anzahlung: string;
    anzahlungBis: string;
    rest: string;
    restBis: string;
    erstelltAm: string;
    gueltigBis: string;
    /** „Dienstag, 1. Dezember, 18 Uhr“, solange der Tag gehalten wird. */
    haltenBis: string | null;
    steuerHinweis: string;
  };
  vertrag: null | { abschnitte: VertragAbschnitt[]; hash: string; entwurf: true };
  /** Warum gerade nicht unterschrieben werden kann. null = es geht. */
  unterschriftGesperrt: string | null;
  unterschrieben: null | { name: string; am: string };
  /** Solange die Widerrufsfrist läuft: Knopf „Vertrag widerrufen“ zeigen (Komponente Widerruf). ISO-Zeitpunkte. */
  widerruf: null | { unterschriebenAm: string; bis: string; bisText: string; name: string };
  /** Vertrag wurde widerrufen. am = „Montag, 30. November, 14:05 Uhr“. */
  widerrufen: null | { am: string };
  anzahlung: null | {
    betrag: string;
    bis: string;
    zweck: string;
    eingegangen: boolean;
    bank: { name: string; iban: string; bic?: string } | null;
    /** GiroCode als SVG-Daten-URL. null ohne Bankdaten oder wenn der Kern den Text nicht bilden kann. */
    qr: string | null;
  };
  /** Restzahlung, sobald der Tag fest ist und ein Angebot da ist. rechnung = es gibt schon eine Restrechnung. */
  rest: null | {
    betrag: string;
    bis: string;
    zweck: string;
    eingegangen: boolean;
    rechnung: boolean;
    bank: { name: string; iban: string; bic?: string } | null;
    qr: string | null;
  };
  /** Uhrzeit der Trauung aus dem Fragebogen („14:00“), sonst null (Countdown dann bis 0 Uhr). */
  trauungUm: string | null;
  /** Countdown bis zur Trauung (sonst Beginn des Hochzeitstags) in Berlin (ISO). null ohne festes Datum oder wenn vorbei. */
  countdownZiel: string | null;
  fahrplan: FahrplanPunkt[];
  /** Bearbeitungsstand ab dem Hochzeitstag: Hochzeit, Sichtung, Schnitt, Abgabe. Nur Anzeige. */
  bearbeitung: null | { satz: string; schritte: FahrplanPunkt[] };
};

// ---- abgabe.ts ----

export type AbgabeFuersPaar = { id: string; titel: string; link: string; datum: IsoDatum | ""; datumText: string; passwortHinweis: string };

// ---- oeffentlich-kennenlernen.ts ----

export type FreieZeit = { start: string; uhrzeit: string };
export type FreierTag = { datum: string; zeiten: FreieZeit[] };
export type TerminAnsicht = { start: string; ende: string; dauerMin: number; aenderbar: boolean; vorbei: boolean };

export type KennenlernenStand = {
  namen: string;
  termin: TerminAnsicht | null;
  tage: FreierTag[];
  /** Kalender gerade nicht lesbar: keine Zeiten anbieten, auf WhatsApp verweisen. */
  kalenderAus: boolean;
};

export type KennenlernenAntwort =
  | { ok: true; stand: KennenlernenStand }
  | { ok: false; grund: "schluessel" | "nicht_frei" | "zu_spaet" | "kein_termin" | "fehler"; meldung: string; stand?: KennenlernenStand };

/** Wert aus Selfmade (oeffentlich-kennenlernen.ts, REGELN.dauerMin): so lange dauert das Kennenlernen in Minuten. */
export const KENNENLERNEN_DAUER_MIN = 20;

// ---- kennenlernen-text.ts (Kopie, gleicher Wortlaut wie Mail und Kalenderdatei in Selfmade) ----

/** Titel des Termins in der Kalenderdatei (.ics). */
export const KENNENLERNEN_KALENDER_TITEL = "Kennenlernen mit Amoriva Films";

/** Satz zum Link des Video-Calls, in Mails und in der Kalenderdatei. */
export const KENNENLERNEN_VIDEO_SATZ = "Den Link zum Video-Call schicken wir euch vorher per WhatsApp oder Mail.";

/** Beschreibung des Termins in der Kalenderdatei (.ics). Reiner Text: Kommas und Semikolons maskiert die .ics-Datei selbst. */
export const kennenlernenKalenderText = (minuten: number) => `Video-Call, ${minuten} Minuten. ${KENNENLERNEN_VIDEO_SATZ}`;

// ---- fragebogen.ts ----

export type ZeitId = "getting_ready" | "trauung" | "empfang" | "gruppenfotos" | "essen" | "reden" | "tanz" | "ende";
export type OrtId = "ready1" | "ready2" | "trauung" | "feier";
export type TextId = "momente" | "reden" | "ueberraschungen" | "musik" | "nogos" | "sonstiges";

export type FragebogenOrt = { name: string; adresse: string };
/** Weiterer Programmpunkt, zum Beispiel Standesamt am Vormittag, Kuchen, Party. */
export type FragebogenPunkt = { zeit: string; was: string; ort: string };
export type FragebogenKontakt = { name: string; rolle: string; telefon: string };

export type FragebogenAntworten = {
  zeiten: Record<ZeitId, string>;
  weitere: FragebogenPunkt[];
  orte: Record<OrtId, FragebogenOrt>;
  kontakte: FragebogenKontakt[];
  gruppenfotos: string[];
  texte: Record<TextId, string>;
};

export type FragebogenStand = "entwurf" | "eingereicht";

/** Was das Paar sieht. Gruppenfotos nur mit Foto, Musik nur mit Film. Ohne Paket (noch offen) alles. */
export type FragebogenAufbau = {
  zeiten: { id: ZeitId; label: string }[];
  orte: { id: OrtId; label: string; platzhalter: string }[];
  texte: { id: TextId; label: string; platzhalter: string }[];
  gruppenfotos: boolean;
};

export type FragebogenFortschritt = { beantwortet: number; gesamt: number };

/** Was die Paar-Seite für den Fragebogen bekommt. Keine internen Angaben. */
export type FragebogenSeite = {
  vornamen: string;
  datumLang: string;
  aufbau: FragebogenAufbau;
  antworten: FragebogenAntworten;
  stand: FragebogenStand | "neu";
  version: number;
  /** „Dienstag, 1. Dezember, 18 Uhr“ */
  gespeichertAm: string | null;
  eingereichtAm: string | null;
  fortschritt: FragebogenFortschritt;
  /** Was zum Einreichen noch fehlt. */
  fehlt: string[];
  /** Nach dem Hochzeitstag nur noch lesen. */
  nurLesen: boolean;
};

// ---- oeffentlich-warteliste.ts ----

export type WartelisteAktion = "stand" | "bleiben" | "raus" | "nehmen";

/**
 * wartet = steht auf der Liste, vergeben = steht auf der Liste, der Tag ist aber fest gebucht,
 * angeboten = Tag ist frei geworden und wird für das Paar gehalten, zugesagt = Paar hat zugesagt, das Team legt das
 * Angebot an, angenommen = normale Reservierung läuft, raus = steht nicht mehr auf der Liste.
 */
export type WartelisteZustand = "wartet" | "vergeben" | "angeboten" | "zugesagt" | "angenommen" | "raus";

export type WartelisteTag = {
  datum: string;
  /** „Samstag, 19. Juni 2027“ */
  datumLang: string;
  datumKurz: string;
  zustand: WartelisteZustand;
  /** Platz unter den Wartenden (ab 1), nur bei wartet und vergeben. */
  platz: number | null;
  /** „Donnerstag, 3. Dezember, 18 Uhr“: so lange wird der Tag gehalten (angeboten, zugesagt, angenommen). */
  haltenBis: string | null;
  /** Gibt es schon ein Angebot für diesen Tag? Dann zeigt die Seite den Weg zur Paar-Seite. */
  angebotDa: boolean;
};

export type WartelisteStand = {
  vornamen: string;
  abgesagt: boolean;
  tage: WartelisteTag[];
  /** Für die Absage: Gründe wie im Prototyp (Kern ABSAGEGRUENDE). */
  gruende: { id: string; text: string }[];
};

export type WartelisteAntwort =
  | { ok: true; stand: WartelisteStand; erledigt?: { aktion: Exclude<WartelisteAktion, "stand">; datum: string } }
  | { ok: false; grund: "schluessel" | "eingabe" | "fehler"; meldung: string; stand?: WartelisteStand };
