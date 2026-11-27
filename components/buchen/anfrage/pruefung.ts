import type { PaketId } from "@/lib/films-typen";
import { GAESTE, MAX_DATEN, WUENSCHE } from "./werte";

// Prüfung der Anfrage im Browser, damit Fehler sofort am Feld stehen und nicht erst nach dem Absenden.
// Regeln exakt wie in Selfmade (selfmade-code/src/lib/films/oeffentlich.ts: anfrageFelder, datumPruefenFormat,
// MAIL, MAX_JAHRE_VORAUS). Der Server prüft zusätzlich und bleibt maßgeblich. Ändert sich dort eine Regel, hier
// nachziehen. Die Texte sind kürzer als die Server-Texte, weil sie direkt unter dem Feld stehen.

export type AnfrageEingabe = {
  namen: string;
  email: string;
  telefon: string;
  datum: string;
  weitere: string[];
  paket: PaketId | "";
  ort: string;
  gaeste: string;
  nachricht: string;
};

/** Feld-Schlüssel wie die id der Eingabe im Formular. Weitere Daten heißen wunschdatum-1, wunschdatum-2. */
export type FeldFehler = Record<string, string>;

const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON = /^[+\d][\d\s/()-]{5,}$/;
const MAX_JAHRE_VORAUS = 5;
const LAENGE = { namen: 120, email: 200, telefon: 40, ort: 200, nachricht: 2000 } as const;

/** Wie feldText in Selfmade: Zeilenenden vereinheitlichen, Steuerzeichen raus, trimmen. */
function text(v: string) {
  return v.replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000b-\u001f]/g, "").trim();
}

function istIsoDatum(wert: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(wert)) return false;
  const [j, m, t] = wert.split("-").map(Number) as [number, number, number];
  const d = new Date(Date.UTC(j, m - 1, t));
  return d.getUTCFullYear() === j && d.getUTCMonth() === m - 1 && d.getUTCDate() === t;
}

/** Fehlertext für ein Datum oder null. heute im Format JJJJ-MM-TT (Berlin). */
function datumFehler(wert: string, heute: string): string | null {
  if (!istIsoDatum(wert)) return "Bitte wählt ein gültiges Datum.";
  if (heute && wert <= heute) return "Dieses Datum liegt nicht in der Zukunft.";
  if (heute && Number(wert.slice(0, 4)) > Number(heute.slice(0, 4)) + MAX_JAHRE_VORAUS) return "So weit planen wir noch nicht. Schreibt uns gern direkt.";
  return null;
}

function zuLang(wert: string, max: number) {
  return text(wert).length > max ? `Bitte höchstens ${max} Zeichen.` : null;
}

/** Schritt 1: Wunsch und Datum. */
export function pruefeWunsch(e: AnfrageEingabe, heute: string): FeldFehler {
  const f: FeldFehler = {};
  if (!e.paket || !(e.paket in WUENSCHE)) f.paket = "Bitte wählt, was ihr euch wünscht.";
  if (!e.datum) f.datum = "Bitte wählt euer Hochzeitsdatum.";
  else {
    const d = datumFehler(e.datum, heute);
    if (d) f.datum = d;
  }
  const gesehen = new Set<string>(e.datum ? [e.datum] : []);
  e.weitere.slice(0, MAX_DATEN - 1).forEach((w, i) => {
    if (!w) return;
    const schluessel = `wunschdatum-${i + 1}`;
    const d = datumFehler(w, heute);
    if (d) f[schluessel] = d;
    else if (gesehen.has(w)) f[schluessel] = "Dieses Datum steht schon drin.";
    gesehen.add(w);
  });
  const ort = zuLang(e.ort, LAENGE.ort);
  if (ort) f.ort = ort;
  if (e.gaeste && !(GAESTE as readonly string[]).includes(e.gaeste)) f.gaeste = "Bitte wählt eine der Angaben.";
  return f;
}

/** Schritt 2: wer ihr seid und was euch wichtig ist. */
export function pruefeKontakt(e: AnfrageEingabe): FeldFehler {
  const f: FeldFehler = {};
  const namen = text(e.namen);
  if (namen.length < 2) f.namen = "Bitte tragt eure Vornamen ein.";
  else if (namen.length > LAENGE.namen) f.namen = `Bitte höchstens ${LAENGE.namen} Zeichen.`;
  const email = text(e.email);
  if (!email) f.email = "Bitte tragt eure E-Mail-Adresse ein.";
  else if (email.length > LAENGE.email || !MAIL.test(email)) f.email = "Die E-Mail-Adresse sieht noch nicht richtig aus.";
  const telefon = text(e.telefon);
  if (telefon && (telefon.length > LAENGE.telefon || !TELEFON.test(telefon))) f.telefon = "Die Handynummer sieht noch nicht richtig aus.";
  const nachricht = zuLang(e.nachricht, LAENGE.nachricht);
  if (nachricht) f.nachricht = nachricht;
  return f;
}
