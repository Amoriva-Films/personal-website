/* Übergang, solange Selfmade Films noch nicht live ist (27.11.2026).

   Ist FILMS_API_URL nicht gesetzt, laeuft die Buchungsstrecke ohne Selfmade:
   - Datum pruefen: gegen content/films-belegt.json (gebuchte und reservierte
     Tage). Steht der Tag dort, sagt die Seite „Fragt uns kurz an“, sonst „frei“.
   - Anfrage: Mail an uns (booking@amoriva-films.de oder ANFRAGE_MAIL_AN) mit
     allen Angaben und wie bisher die Eingangsbestaetigung an das Paar.
     Antwort ohne Schluessel, die Danke-Seite zeigt dann keine Links zur
     Paar-Seite und zum Kennenlernen.
   Sobald FILMS_API_URL und FILMS_EINGANG_TOKEN gesetzt sind, geht alles an
   Selfmade und diese Datei ist ohne Wirkung. */
import belegtDatei from '@/content/films-belegt.json';

const BELEGT = new Set(Array.isArray(belegtDatei?.belegt) ? belegtDatei.belegt : []);

/** true, solange FILMS_API_URL leer ist. Ist sie gesetzt, aber falsch, gilt die normale Fehlerbehandlung der Weiterleitung. */
export function uebergangAktiv() {
  return !(process.env.FILMS_API_URL || '').trim();
}

function heuteBerlin() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());
}

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
export function tagLang(iso) {
  const [j, m, t] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(j, m - 1, t));
  return `${WOCHENTAGE[d.getUTCDay()]}, ${t}. ${MONATE[m - 1]} ${j}`;
}

/** Prueft ein Datum wie Selfmade. { datum } oder { fehler } */
export function datumPruefen(roh) {
  const d = typeof roh === 'string' ? roh.slice(0, 10) : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return { fehler: 'Bitte wählt ein gültiges Datum.' };
  const [j, m, t] = d.split('-').map(Number);
  const echt = new Date(Date.UTC(j, m - 1, t));
  if (echt.getUTCFullYear() !== j || echt.getUTCMonth() !== m - 1 || echt.getUTCDate() !== t) return { fehler: 'Bitte wählt ein gültiges Datum.' };
  if (d <= heuteBerlin()) return { fehler: 'Dieses Datum liegt nicht in der Zukunft. Schaut bitte noch einmal auf euer Datum.' };
  return { datum: d };
}

export function istBelegt(datum) {
  return BELEGT.has(datum);
}

/** Antwort im Format von Selfmade (AnfrageRueckmeldung), ohne Schluessel. */
export function rueckmeldung(vornamen, daten) {
  const liste = daten.map((d) => {
    const belegt = istBelegt(d);
    const text = belegt
      ? `Für ${tagLang(d)}, schauen wir persönlich nach und melden uns innerhalb von 24 Stunden bei euch.`
      : `Der ${tagLang(d)}, ist laut unserem Kalender noch frei. Eine Anfrage hält den Tag noch nicht fest. Wir melden uns innerhalb von 24 Stunden persönlich bei euch.`;
    return { datum: d, ergebnis: belegt ? 'nicht_verfuegbar' : 'frei', wartelistenPlatz: null, text };
  });
  return { schluessel: '', vornamen, daten: liste, text: liste.map((x) => x.text).join(' ') };
}
