/* ------------------------------------------------------------------ *
 * Der Waechter.
 *
 * Laeuft einmal am Tag und prueft, ob die Website noch das tut, wovon
 * das Geschaeft abhaengt: dass eine Anfrage ankommt. Schickt eine Mail
 * NUR, wenn etwas abweicht. Wenn alles laeuft, meldet er sich nie.
 *
 * Das ist Absicht. Eine taegliche "alles in Ordnung"-Mail wird nach
 * einer Woche weggeklickt, ohne gelesen zu werden - und dann faellt
 * auch die eine auf, die etwas sagt, nicht mehr auf.
 *
 * Geprueft wird:
 *   1. Ist der Resend-Schluessel da und gueltig, und ist die Absender-
 *      Domain noch verifiziert?
 *   2. Ist die Amoriva-Empfangsadresse gesetzt, hat sie die richtige
 *      Form, und antwortet die Gegenstelle ueberhaupt?
 *   3. Liefern alle Seiten der Website noch 200?
 *   4. Ist es auffaellig still geworden? (Siehe unten.)
 *
 * Erreichbar nur mit CRON_SECRET im Kopf. Vercel schickt das bei
 * eigenen Cron-Aufrufen automatisch mit, sobald die Variable gesetzt
 * ist. Ohne die Variable antwortet der Waechter grundsaetzlich nicht -
 * ein offener Endpunkt, der Mails verschickt, waere ein Werkzeug fuer
 * Fremde.
 * ------------------------------------------------------------------ */
import { mailWaechter } from '../contact/mail.js';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const FROM = 'Amoriva Films <booking@amoriva-films.de>';
const AN_UNS = 'mastrogiorgio.nevio@gmail.com';
const BASIS = (process.env.WAECHTER_BASIS || 'https://amoriva-films.de').replace(/\/$/, '');

// Nach so vielen Tagen ohne Anfrage meldet sich der Waechter einmal.
const STILLE_TAGE = Number(process.env.WAECHTER_STILLE_TAGE || 14);

const SEITEN = [
  '/', '/leistungen', '/angebote', '/anfrage', '/filme', '/referenzen',
  '/ratgeber',
  '/ratgeber/was-kostet-ein-hochzeitsfilm',
  '/ratgeber/hochzeitsfilmer-wann-buchen',
  '/ratgeber/cinematic-hochzeitsfilm',
  '/ratgeber/same-day-edit-hochzeit',
  '/impressum', '/datenschutz',
];

/** fetch mit Zeitlimit. Ohne das kann eine haengende Gegenstelle den
 *  ganzen Waechter blockieren, bis Vercel ihn abbricht. */
async function hol(url, optionen = {}, ms = 8000) {
  const abbruch = new AbortController();
  const uhr = setTimeout(() => abbruch.abort(), ms);
  try {
    return await fetch(url, { ...optionen, signal: abbruch.signal, cache: 'no-store' });
  } finally {
    clearTimeout(uhr);
  }
}

async function pruefeResend(befunde) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    befunde.push({
      was: 'Der Mailversand ist abgeschaltet',
      text: 'RESEND_API_KEY ist bei Vercel nicht gesetzt. Anfragen über das Formular lösen damit keine Mail aus.',
    });
    return false;
  }
  try {
    const res = await hol('https://api.resend.com/domains', { headers: { Authorization: `Bearer ${key}` } });
    /* 400 gehoert hier dazu: die Abfrage der Domains schickt keinen
       Inhalt mit, den Resend bemaengeln koennte. Ein 400 kann an dieser
       Stelle nur den Schluessel meinen - gemessen antwortet Resend auf
       einen unbrauchbaren Schluessel mit 400 und auf einen zurueck-
       gezogenen mit 401. */
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      befunde.push({
        was: 'Der Resend-Schlüssel wird nicht mehr akzeptiert',
        text: `Resend antwortet mit Status ${res.status}. Der Schlüssel ist abgelaufen oder wurde zurückgezogen. Neuen Schlüssel bei Resend erzeugen und bei Vercel als RESEND_API_KEY eintragen.`,
      });
      return false;
    }
    if (!res.ok) {
      befunde.push({ was: 'Resend antwortet ungewöhnlich', text: `Status ${res.status} bei der Abfrage der Absender-Domains.` });
      return false;
    }
    const daten = await res.json();
    const unsere = (daten?.data || []).find((d) => d?.name === 'amoriva-films.de');
    if (!unsere) {
      befunde.push({
        was: 'Die Absender-Domain fehlt bei Resend',
        text: 'amoriva-films.de ist im Resend-Konto nicht mehr hinterlegt. Ohne sie kann von booking@amoriva-films.de nichts versendet werden.',
      });
    } else if (unsere.status !== 'verified') {
      befunde.push({
        was: 'Die Absender-Domain ist nicht mehr bestätigt',
        text: `amoriva-films.de steht bei Resend auf "${unsere.status}" statt "verified". Meist fehlt ein DNS-Eintrag beim Domain-Anbieter.`,
      });
    }
    return true;
  } catch (e) {
    befunde.push({ was: 'Resend war nicht erreichbar', text: `Die Prüfung brach ab: ${String(e?.message || e).slice(0, 160)}` });
    return false;
  }
}

async function pruefeAmoriva(befunde) {
  const adresse = (process.env.AMORIVA_EINGANG_URL || '').trim();
  if (!adresse) {
    // Kein Fehler, sondern der abgeschaltete Zustand - aber einer, der
    // leicht übersehen wird, deshalb einmal täglich ein Hinweis.
    befunde.push({
      was: 'Anfragen landen nicht im Dashboard',
      text: 'AMORIVA_EINGANG_URL ist bei Vercel nicht gesetzt. Die Mails kommen weiterhin an, im Amoriva-Dashboard erscheint aber nichts.',
    });
    return;
  }
  if (!/^https:\/\/(www\.)?amoriva\.app\/api\/anfragen\/eingang\/ws_[a-f0-9]{24}$/.test(adresse)) {
    befunde.push({
      was: 'Die Dashboard-Adresse hat die falsche Form',
      text: 'AMORIVA_EINGANG_URL sieht nicht wie eine Amoriva-Empfangsadresse aus. Sie wird deshalb gar nicht erst benutzt. Im Dashboard unter Website-Eingang neu kopieren.',
    });
    return;
  }
  try {
    /* Bewusst GET statt POST: ein POST würde eine Testanfrage im
       Dashboard erzeugen, jeden Tag eine. GET beantwortet die einzige
       Frage, die hier zählt - existiert diese Adresse überhaupt noch?
       405 (falsche Methode) ist dabei die beste Antwort: sie beweist,
       dass die Route da ist. 404 heißt, der Schlüssel ist nicht mehr
       gültig - genau das ist im September schon einmal passiert. */
    const res = await hol(adresse, { method: 'GET' });
    if (res.status === 404) {
      befunde.push({
        was: 'Die Dashboard-Adresse gibt es nicht mehr',
        text: 'Amoriva antwortet mit 404. Der hinterlegte Schlüssel gehört zu einem Konto, das es so nicht mehr gibt. Im Dashboard unter Website-Eingang eine neue Adresse holen und bei Vercel eintragen.',
      });
    } else if (res.status >= 500) {
      befunde.push({
        was: 'Amoriva hat gerade eine Störung',
        text: `Die Empfangsadresse antwortet mit Status ${res.status}. Anfragen kommen per Mail trotzdem an, im Dashboard fehlen sie.`,
      });
    }
  } catch (e) {
    befunde.push({
      was: 'Amoriva war nicht erreichbar',
      text: `Die Empfangsadresse hat nicht geantwortet: ${String(e?.message || e).slice(0, 160)}. Anfragen kommen per Mail trotzdem an.`,
    });
  }
}

async function pruefeSeiten(befunde) {
  const ergebnisse = await Promise.all(
    SEITEN.map(async (pfad) => {
      try {
        const res = await hol(`${BASIS}${pfad}`, { method: 'GET', headers: { 'User-Agent': 'Amoriva-Waechter' } });
        return { pfad, status: res.status };
      } catch (e) {
        return { pfad, status: 0, fehler: String(e?.message || e).slice(0, 80) };
      }
    })
  );
  const kaputt = ergebnisse.filter((e) => e.status !== 200);
  if (kaputt.length === SEITEN.length) {
    befunde.push({
      was: 'Die Website ist nicht erreichbar',
      text: `Keine einzige der ${SEITEN.length} Seiten hat geantwortet. Entweder ist die Seite unten oder die Domain zeigt ins Leere.`,
    });
  } else if (kaputt.length > 0) {
    befunde.push({
      was: kaputt.length === 1 ? 'Eine Seite antwortet nicht mit 200' : `${kaputt.length} Seiten antworten nicht mit 200`,
      text: kaputt.map((k) => `${k.pfad} (${k.status === 0 ? k.fehler || 'keine Antwort' : 'Status ' + k.status})`).join(', '),
    });
  }
  return ergebnisse;
}

/**
 * Stille-Warnung.
 *
 * Braucht keinen eigenen Speicher: Resend weiss selbst, wann zuletzt
 * eine Anfrage-Benachrichtigung rausging. Das ist genau der Zeitpunkt
 * der letzten Anfrage.
 *
 * Gemeldet wird am Tag, an dem die Grenze ueberschritten wird, und
 * danach alle sieben Tage. Nicht taeglich: eine Erinnerung, die jeden
 * Morgen kommt, ist nach drei Tagen Hintergrundrauschen.
 */
async function pruefeStille(befunde) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    const res = await hol('https://api.resend.com/emails', { headers: { Authorization: `Bearer ${key}` } });
    if (!res.ok) return;
    const daten = await res.json();
    const anfragen = (daten?.data || []).filter((m) => String(m?.subject || '').startsWith('Neue Anfrage von'));
    if (anfragen.length === 0) return; // Nichts zu vergleichen, lieber schweigen als raten.

    const letzte = anfragen
      .map((m) => new Date(String(m.created_at).replace(' ', 'T')))
      .filter((d) => !isNaN(d))
      .sort((a, b) => b - a)[0];
    if (!letzte) return;

    const tage = Math.floor((Date.now() - letzte.getTime()) / 86400000);
    if (tage < STILLE_TAGE) return;
    if ((tage - STILLE_TAGE) % 7 !== 0) return;

    befunde.push({
      was: `Seit ${tage} Tagen kam keine Anfrage`,
      text: `Die letzte Anfrage über das Formular war am ${letzte.toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' })}. Alle technischen Prüfungen sind in Ordnung, das Formular funktioniert also. Zur Sicherheit einmal selbst testen: ${BASIS}/anfrage`,
    });
  } catch {
    // Die Stille-Warnung ist die unwichtigste der vier Prüfungen. Wenn
    // sie nicht klappt, darf sie den Rest nicht mitreißen.
  }
}

export async function GET(request) {
  const geheim = process.env.CRON_SECRET;
  if (!geheim) {
    return Response.json({ error: 'CRON_SECRET ist nicht gesetzt. Der Wächter bleibt aus Sicherheitsgründen geschlossen.' }, { status: 503 });
  }
  if (request.headers.get('authorization') !== `Bearer ${geheim}`) {
    return Response.json({ error: 'Nicht berechtigt.' }, { status: 401 });
  }

  const befunde = [];
  const mailGeht = await pruefeResend(befunde);
  await Promise.all([pruefeAmoriva(befunde), pruefeSeiten(befunde)]);
  await pruefeStille(befunde);

  if (befunde.length === 0) {
    return Response.json({ ok: true, befunde: 0, geprueft: SEITEN.length });
  }

  console.error('Wächter-Befunde:', JSON.stringify(befunde));

  if (!mailGeht) {
    // Der Fall, in dem der Wächter nicht melden kann, was er gefunden
    // hat. Bleibt im Protokoll stehen; der Aufruf selbst schlägt fehl,
    // damit Vercel den Cron-Lauf als rot anzeigt.
    return Response.json({ ok: false, befunde, hinweis: 'Keine Mail möglich, Resend meldet sich nicht.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({ from: FROM, to: [AN_UNS], ...mailWaechter({ befunde }) }),
  });

  return Response.json({ ok: res.ok, befunde: befunde.length, gemeldet: res.ok }, { status: res.ok ? 200 : 500 });
}
