/* Weiterleitung der Buchungsstrecke an Selfmade (27.11.2026).

   Die Seiten unter /anfrage rufen /api/buchen/<pfad> auf. Diese Route
   reicht den Aufruf serverseitig an ${FILMS_API_URL}/api/buchen/<pfad>
   weiter und die Antwort unveraendert zurueck. Daten und Logik liegen
   allein in Selfmade.

   - Nur POST und nur die Pfade aus WEGE. Alles andere: 404. Der Eingang
     des alten Kontaktformulars (eingang) ist bewusst nicht dabei: der
     braucht den Token als Bearer und ist nichts fuer den Browser.
   - Mitgeschickt werden content-type, der Inhalt unveraendert (hoechstens
     2 MB, die Unterschrift kommt als PNG-Daten-URL), der Token in
     x-films-weiterleitung und Adresse und Browser des Paares. Selfmade
     glaubt den beiden nur mit passendem Token
     (selfmade-code/src/lib/films/weiterleitung.ts).
   - Zurueck kommen Status, content-type, content-disposition (PDFs) und
     der Inhalt binaer. Nie zwischenspeichern.
   - Faellt Selfmade bei einer Anfrage aus (nicht erreichbar, Zeitlimit,
     Status ab 500), geht die Anfrage per Mail an uns, damit sie nicht
     verloren ist. Nie eine Mail an das Paar aus diesem Weg.
   - Ins Protokoll kommen nur Pfad und Status. Nie Token, Adresse oder
     Inhalt. */
import { isIP } from 'node:net';
import { filmsBasis, filmsToken } from '@/lib/films-weiterleitung';
import { kurz, mailAnPaar, mailAnUns } from '../../contact/mail.js';
import { datumPruefen, istBelegt, rueckmeldung, tagLang, uebergangAktiv } from '@/lib/films-uebergang';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const WEGE = new Set([
  'datum',
  'anfrage',
  'kennenlernen',
  'warteliste',
  'paar',
  'paar/vertrag',
  'paar/vertrag/code',
  'paar/widerruf',
  'paar/fragebogen',
  'paar/abgabe',
  'paar/angebot-pdf',
  'paar/vertrag-pdf',
  'paar/rechnung',
]);

const MAX_BYTES = 2 * 1024 * 1024;
const ZEITLIMIT_MS = 15000;
const OHNE_CACHE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

// Absender wie in app/api/contact/route.js. Empfaenger der Ersatzmail aus
// ANFRAGE_MAIL_AN (bei Vercel setzen, siehe .env.example), sonst unser
// Buchungspostfach.
const FROM = 'Amoriva Films <booking@amoriva-films.de>';
const AN_UNS = (process.env.ANFRAGE_MAIL_AN || '').trim() || 'booking@amoriva-films.de';

const TEXT_ANGEKOMMEN = 'Gerade hakt unsere Buchung. Eure Anfrage ist trotzdem bei uns angekommen, wir melden uns innerhalb von 24 Stunden bei euch.';
const TEXT_HAKT = 'Gerade hakt etwas bei uns. Schreibt uns bitte kurz an booking@amoriva-films.de oder per WhatsApp.';

function json(daten, status) {
  return Response.json(daten, { status, headers: OHNE_CACHE });
}

function protokoll(pfad, status, zusatz = '') {
  console.log(`[buchen] ${pfad} ${status}${zusatz ? ` (${zusatz})` : ''}`);
}

/** Erste Adresse aus x-forwarded-for (bei Vercel das Paar), sonst x-real-ip. Nur echte IP-Adressen. */
function clientIp(request) {
  const kandidaten = [
    (request.headers.get('x-forwarded-for') || '').split(',')[0],
    request.headers.get('x-real-ip') || '',
  ];
  for (const k of kandidaten) {
    const ip = k.trim();
    if (ip && isIP(ip)) return ip;
  }
  return '';
}

/** Liest den Inhalt bis MAX_BYTES. null = zu gross. */
async function inhaltLesen(request) {
  const angabe = Number(request.headers.get('content-length') || 0);
  if (angabe > MAX_BYTES) return null;
  if (!request.body) return new Uint8Array(0);
  const leser = request.body.getReader();
  const teile = [];
  let laenge = 0;
  for (;;) {
    const { done, value } = await leser.read();
    if (done) break;
    laenge += value.byteLength;
    if (laenge > MAX_BYTES) {
      await leser.cancel().catch(() => {});
      return null;
    }
    teile.push(value);
  }
  const alles = new Uint8Array(laenge);
  let stelle = 0;
  for (const t of teile) {
    alles.set(t, stelle);
    stelle += t.byteLength;
  }
  return alles;
}

// ── Ausfall bei der Anfrage ──────────────────────────────────────────

const PAKETE = { foto: 'Foto', komplett: 'Komplett, Foto und Film', film: 'Film' };

// Bremse fuer den Mailweg, wie im Kontaktformular: hoechstens 5 Mails je
// Adresse in 10 Minuten. Die Mail geht nur an uns, aber ein Ausfall soll
// niemandem erlauben, unser Postfach zu fluten.
const versuche = new Map();
function zuVieleMails(ip) {
  const jetzt = Date.now();
  const liste = (versuche.get(ip || 'unbekannt') || []).filter((t) => jetzt - t < 10 * 60 * 1000);
  liste.push(jetzt);
  versuche.set(ip || 'unbekannt', liste);
  if (versuche.size > 500) versuche.clear();
  return liste.length > 5;
}

const feld = (v, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function resendSenden(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  for (let versuch = 1; versuch <= 2; versuch++) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return true;
      console.error(`[buchen] Ersatzmail Versuch ${versuch} abgelehnt, Status ${res.status}`);
    } catch (e) {
      console.error(`[buchen] Ersatzmail Versuch ${versuch} abgebrochen: ${e?.name || 'Fehler'}`);
    }
    if (versuch === 1) await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/** Schickt die Anfrage per Mail an uns. true = Mail ist raus. */
async function anfrageAlsMail(inhalt, grund, ip) {
  let a = null;
  try {
    a = JSON.parse(new TextDecoder().decode(inhalt));
  } catch {
    return false;
  }
  if (!a || typeof a !== 'object') return false;
  // Verstecktes Feld gegen Bots (Strecke.tsx, „website“): ausgefuellt = kein Mensch
  if (feld(a.website)) return false;
  if (zuVieleMails(ip)) return false;

  const namen = feld(a.namen, 120);
  const email = feld(a.email, 200);
  if (!namen && !email) return false;
  const daten = Array.isArray(a.wunschdaten) ? a.wunschdaten.map((d) => feld(d, 10)).filter(Boolean).slice(0, 3) : [];
  const paket = PAKETE[a.paket] || feld(a.paket, 40);

  const text = [
    `Unsere Buchung war nicht erreichbar (${grund}). Diese Anfrage steht NICHT in Selfmade. Bitte von Hand anlegen und dem Paar innerhalb von 24 Stunden antworten, das haben wir ihm so gesagt.`,
    '',
    `Wunschdaten: ${daten.join(', ') || 'keine Angabe'}`,
    `Wunsch: ${paket || 'keine Angabe'}`,
    `Ort: ${feld(a.ort, 200) || 'keine Angabe'}`,
    `Gäste: ${feld(a.gaeste, 40) || 'keine Angabe'}`,
    `Telefon / WhatsApp: ${feld(a.telefon, 40) || 'keine Angabe'}`,
    `Von uns erfahren über: ${feld(a.herkunft, 60) || 'keine Angabe'}`,
    '',
    `Nachricht:\n${feld(a.nachricht) || 'keine Angabe'}`,
  ].join('\n');

  const vorlage = mailAnUns({
    name: namen || 'Unbekannt',
    email,
    hochzeitsdatum: daten[0] || '',
    location: feld(a.ort, 200),
    telefon: feld(a.telefon, 40),
    gaeste: feld(a.gaeste, 40),
    vision: text,
  });
  return resendSenden({
    from: FROM,
    to: [AN_UNS],
    ...(email ? { reply_to: email } : {}),
    ...vorlage,
    subject: `Von Hand anlegen, Buchung war aus: ${kurz(namen) || 'unbekannt'}${daten[0] ? ` · ${daten[0]}` : ''}`,
  });
}

async function ausfallBeiAnfrage(inhalt, grund, ip) {
  const raus = await anfrageAlsMail(inhalt, grund, ip).catch(() => false);
  protokoll('anfrage', 503, `Ausfall: ${grund}, Ersatzmail ${raus ? 'raus' : 'nicht raus'}`);
  return json({ error: raus ? TEXT_ANGEKOMMEN : TEXT_HAKT }, 503);
}

// ── Übergang ohne Selfmade (FILMS_API_URL leer) ─────────────────────

function lesenJson(inhalt) {
  try {
    const a = JSON.parse(new TextDecoder().decode(inhalt));
    return a && typeof a === 'object' ? a : null;
  } catch {
    return null;
  }
}

async function uebergang(pfad, inhalt, ip) {
  const a = lesenJson(inhalt);
  if (pfad === 'datum') {
    const r = datumPruefen(a?.datum);
    if (r.fehler) {
      protokoll('datum', 400, 'Übergang');
      return json({ error: r.fehler }, 400);
    }
    protokoll('datum', 200, 'Übergang');
    return json({ datum: r.datum, auskunft: istBelegt(r.datum) ? 'bitte_anfragen' : 'frei' }, 200);
  }
  if (pfad !== 'anfrage') {
    protokoll(pfad, 503, 'Übergang');
    return json({ error: TEXT_HAKT }, 503);
  }
  if (!a) return json({ error: 'Das hat nicht geklappt. Versucht es noch einmal.' }, 400);
  const namen = feld(a.namen, 120);
  const email = feld(a.email, 200);
  const daten = [...new Set((Array.isArray(a.wunschdaten) ? a.wunschdaten : []).map((d) => datumPruefen(d).datum).filter(Boolean))].slice(0, 3);
  // Verstecktes Feld gegen Bots: so tun, als waere alles gut, nichts verschicken
  if (feld(a.website)) {
    protokoll('anfrage', 201, 'Übergang, Fangfeld');
    return json(rueckmeldung(namen, daten), 201);
  }
  if (!namen) return json({ error: 'Bitte tragt eure Vornamen ein.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: 'Die E-Mail-Adresse sieht noch nicht richtig aus.' }, 400);
  if (!daten.length) return json({ error: 'Bitte wählt euer Hochzeitsdatum.' }, 400);
  if (zuVieleMails(ip)) return json({ error: 'Ihr habt gerade schon mehrere Anfragen geschickt. Versucht es in ein paar Minuten noch einmal.' }, 429);

  const paket = PAKETE[a.paket] || feld(a.paket, 40);
  const ort = feld(a.ort, 200);
  const telefon = feld(a.telefon, 40);
  const gaeste = feld(a.gaeste, 40);
  const nachricht = feld(a.nachricht);
  const kalender = daten.map((d) => `${tagLang(d)}: ${istBelegt(d) ? 'laut Liste schon belegt, persönlich nachsehen' : 'laut Liste frei'}`).join('\n');
  const vision = [
    `Wunsch: ${paket || 'keine Angabe'}`,
    `Wunschdaten:\n${kalender}`,
    `Von uns erfahren über: ${feld(a.herkunft, 60) || 'keine Angabe'}`,
    '',
    `Nachricht:\n${nachricht || 'keine Angabe'}`,
    '',
    'Über die neue Buchung auf amoriva-films.de/anfrage. Selfmade Films ist noch nicht angeschlossen: bitte von Hand anlegen und dem Paar innerhalb von 24 Stunden antworten (so steht es auf der Danke-Seite).',
  ].join('\n');

  const anUns = mailAnUns({ name: namen, email, hochzeitsdatum: daten[0], location: ort, telefon, gaeste, vision });
  const [uns, paar] = await Promise.all([
    resendSenden({ from: FROM, to: [AN_UNS], reply_to: email, ...anUns, subject: `Neue Anfrage: ${kurz(namen)} · ${daten[0].split('-').reverse().join('.')}` }),
    resendSenden({ from: FROM, to: [email], reply_to: 'booking@amoriva-films.de', ...mailAnPaar({ name: namen, hochzeitsdatum: daten[0], location: ort, nachricht }) }),
  ]);
  if (!uns) {
    protokoll('anfrage', 503, `Übergang, Mail an uns nicht raus, Bestätigung ${paar ? 'raus' : 'nicht raus'}`);
    return json({ error: TEXT_HAKT }, 503);
  }
  protokoll('anfrage', 201, `Übergang, Bestätigung ${paar ? 'raus' : 'nicht raus'}`);
  return json(rueckmeldung(namen, daten), 201);
}

// ── Weiterleitung ────────────────────────────────────────────────────

export async function POST(request, { params }) {
  const pfad = (Array.isArray(params?.pfad) ? params.pfad : []).join('/');
  if (!WEGE.has(pfad)) {
    // Unbekannter Pfad kommt roh vom Besucher: maskiert und gekürzt, damit niemand Zeilen ins Protokoll schmuggelt
    protokoll(JSON.stringify(String(pfad || '-')).slice(0, 80), 404);
    return json({ error: 'Nicht gefunden.' }, 404);
  }

  const inhalt = await inhaltLesen(request).catch(() => undefined);
  if (inhalt === null) {
    protokoll(pfad, 413);
    return json({ error: 'Das war zu viel auf einmal. Bitte versucht es noch einmal.' }, 413);
  }
  if (inhalt === undefined) {
    protokoll(pfad, 400);
    return json({ error: 'Das hat nicht geklappt. Bitte versucht es noch einmal.' }, 400);
  }

  const ip = clientIp(request);
  if (uebergangAktiv()) return uebergang(pfad, inhalt, ip);
  const { basis, grund: basisGrund } = filmsBasis();
  const { token, grund: tokenGrund } = filmsToken();
  if (!basis || !token) {
    // Einrichtung fehlt. Ohne Token wuerde Selfmade alle Paare unter der
    // Adresse von Vercel zaehlen und bei der Unterschrift die falsche
    // Adresse festhalten, darum lieber gar nicht weiterleiten.
    console.error(`[buchen] Einrichtung fehlt: ${basisGrund || tokenGrund}`);
    if (pfad === 'anfrage') return ausfallBeiAnfrage(inhalt, 'Einrichtung fehlt', ip);
    protokoll(pfad, 503, 'Einrichtung fehlt');
    return json({ error: TEXT_HAKT }, 503);
  }

  const koepfe = {
    'content-type': request.headers.get('content-type') || 'application/json',
    'x-films-weiterleitung': token,
  };
  if (ip) koepfe['x-films-client-ip'] = ip;
  const ua = request.headers.get('user-agent');
  if (ua) koepfe['x-films-client-ua'] = ua.slice(0, 500);

  let antwort;
  try {
    antwort = await fetch(`${basis}/api/buchen/${pfad}`, {
      method: 'POST',
      headers: koepfe,
      body: inhalt,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(ZEITLIMIT_MS),
    });
  } catch (e) {
    const zeitlimit = e?.name === 'TimeoutError' || e?.name === 'AbortError';
    const grund = zeitlimit ? 'Zeitlimit' : 'nicht erreichbar';
    if (pfad === 'anfrage') return ausfallBeiAnfrage(inhalt, grund, ip);
    protokoll(pfad, zeitlimit ? 504 : 502, grund);
    return json({ error: TEXT_HAKT }, zeitlimit ? 504 : 502);
  }

  if (pfad === 'anfrage' && antwort.status >= 500) {
    await antwort.body?.cancel().catch(() => {});
    return ausfallBeiAnfrage(inhalt, `Status ${antwort.status}`, ip);
  }

  let daten;
  try {
    daten = await antwort.arrayBuffer();
  } catch {
    if (pfad === 'anfrage') return ausfallBeiAnfrage(inhalt, 'Antwort abgebrochen', ip);
    protokoll(pfad, 502, 'Antwort abgebrochen');
    return json({ error: TEXT_HAKT }, 502);
  }

  const zurueck = new Headers(OHNE_CACHE);
  const art = antwort.headers.get('content-type');
  if (art) zurueck.set('content-type', art);
  const datei = antwort.headers.get('content-disposition');
  if (datei) zurueck.set('content-disposition', datei);
  protokoll(pfad, antwort.status);
  return new Response(daten, { status: antwort.status, headers: zurueck });
}

// Andere Methoden gibt es hier nicht. 404 statt 405, damit niemand an der
// Antwort ablesen kann, welche Wege es gibt.
function nichtGefunden() {
  return json({ error: 'Nicht gefunden.' }, 404);
}
export const GET = nichtGefunden;
export const PUT = nichtGefunden;
export const PATCH = nichtGefunden;
export const DELETE = nichtGefunden;
