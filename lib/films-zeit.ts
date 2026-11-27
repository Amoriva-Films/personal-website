// Kalendertage und Uhrzeiten in Europe/Berlin, kopiert aus Selfmade (src/lib/films/kern/angebot/zeit.ts). Keine Funktion liest die Uhr, `jetzt` kommt immer herein.
import type { IsoDatum } from './films-typen'

export const ZEITZONE = 'Europe/Berlin'

const TAG_MS = 86_400_000

const teileFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: ZEITZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

interface BerlinTeile { jahr: number; monat: number; tag: number; stunde: number; minute: number; sekunde: number }

/** Wanduhr in Berlin zu einem Zeitpunkt. */
export function berlinTeile(zeit: Date): BerlinTeile {
  const t: Record<string, number> = {}
  for (const p of teileFormat.formatToParts(zeit)) if (p.type !== 'literal') t[p.type] = Number(p.value)
  return { jahr: t.year ?? 0, monat: t.month ?? 0, tag: t.day ?? 0, stunde: t.hour ?? 0, minute: t.minute ?? 0, sekunde: t.second ?? 0 }
}

const zwei = (n: number) => String(n).padStart(2, '0')

/** Kalendertag in Berlin (JJJJ-MM-TT) zu einem Zeitpunkt. */
export function berlinTag(zeit: Date): IsoDatum {
  const t = berlinTeile(zeit)
  return `${t.jahr}-${zwei(t.monat)}-${zwei(t.tag)}`
}

/** Prüft JJJJ-MM-TT auf Form und echten Kalendertag (kein 31.02.). */
export function istIsoDatum(wert: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(wert)
  if (!m) return false
  const j = Number(m[1]), mo = Number(m[2]), t = Number(m[3])
  const d = new Date(Date.UTC(j, mo - 1, t))
  return d.getUTCFullYear() === j && d.getUTCMonth() === mo - 1 && d.getUTCDate() === t
}

function datumTeile(tag: IsoDatum): [number, number, number] {
  const [j, m, t] = tag.split('-').map(Number)
  return [j ?? 0, m ?? 0, t ?? 0]
}

/** Kalendertage addieren (negativ = zurück). Rechnet rein im Kalender, Zeitumstellung spielt keine Rolle. */
export function tageAddieren(tag: IsoDatum, tage: number): IsoDatum {
  const [j, m, t] = datumTeile(tag)
  const d = new Date(Date.UTC(j, m - 1, t) + tage * TAG_MS)
  return `${d.getUTCFullYear()}-${zwei(d.getUTCMonth() + 1)}-${zwei(d.getUTCDate())}`
}

/** Abstand in Kalendertagen von `a` nach `b` (b minus a). */
export function tageZwischen(a: IsoDatum, b: IsoDatum): number {
  const [ja, ma, ta] = datumTeile(a)
  const [jb, mb, tb] = datumTeile(b)
  return Math.round((Date.UTC(jb, mb - 1, tb) - Date.UTC(ja, ma - 1, ta)) / TAG_MS)
}

/** Zeitpunkt zu einer Berliner Wanduhrzeit an einem Kalendertag (beachtet Sommer- und Winterzeit). */
export function berlinZeitpunkt(tag: IsoDatum, stunde: number, minute = 0): Date {
  const [j, m, t] = datumTeile(tag)
  const wunsch = Date.UTC(j, m - 1, t, stunde, minute)
  // Versatz Berlin gegenüber UTC an der Stelle bestimmen, zweimal, damit der Tag der Umstellung stimmt.
  let ergebnis = wunsch
  for (let i = 0; i < 2; i++) {
    const w = berlinTeile(new Date(ergebnis))
    const alsUtc = Date.UTC(w.jahr, w.monat - 1, w.tag, w.stunde, w.minute, w.sekunde)
    ergebnis = ergebnis + (wunsch - alsUtc)
  }
  return new Date(ergebnis)
}

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function wochentag(tag: IsoDatum): string {
  const [j, m, t] = datumTeile(tag)
  return WOCHENTAGE[new Date(Date.UTC(j, m - 1, t)).getUTCDay()] ?? ''
}

/**
 * Kalendertag auf Deutsch: „Dienstag, 1. Dezember“. Das Jahr steht nur dabei, wenn es nicht das Jahr von `jetzt` ist.
 */
export function tagText(tag: IsoDatum, jetzt: Date): string {
  const [j, m, t] = datumTeile(tag)
  const jahr = j === berlinTeile(jetzt).jahr ? '' : ` ${j}`
  return `${wochentag(tag)}, ${t}. ${MONATE[m - 1] ?? ''}${jahr}`
}

/** Zeitpunkt auf Deutsch in Berliner Zeit: „Dienstag, 1. Dezember, 18 Uhr“ oder „…, 18:30 Uhr“. */
export function zeitpunktText(zeit: Date, jetzt: Date): string {
  const w = berlinTeile(zeit)
  const uhr = w.minute === 0 ? `${w.stunde} Uhr` : `${w.stunde}:${zwei(w.minute)} Uhr`
  return `${tagText(berlinTag(zeit), jetzt)}, ${uhr}`
}

/** Kurzes deutsches Datum: 01.12.2026. */
export function kurzDatum(tag: IsoDatum): string {
  const [j, m, t] = datumTeile(tag)
  return `${zwei(t)}.${zwei(m)}.${j}`
}

export function istGueltigeZeit(d: Date): boolean {
  return d instanceof Date && !Number.isNaN(d.getTime())
}
