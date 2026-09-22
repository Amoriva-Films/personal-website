// Kontaktformular der Films-Seite: schickt die Anfrage an uns und eine kurze
// Eingangsbestätigung an das Paar. Beide Mails kommen von der bei Resend
// verifizierten Domain booking@amoriva-films.de. Vorlagen liegen in ./mail.js.
import { mailAnPaar, mailAnUns, mailAlarm } from './mail.js';

const FROM = 'Amoriva Films <booking@amoriva-films.de>';
const AN_UNS = 'mastrogiorgio.nevio@gmail.com';

// Persönliche Empfangsadresse aus dem Amoriva-Dashboard (Formular → Website-Eingang).
// Ist sie nicht gesetzt, läuft alles wie bisher, nur ohne Eintrag im Dashboard.
const AMORIVA_EINGANG = (process.env.AMORIVA_EINGANG_URL || '').trim();
const EINGANG_OK = /^https:\/\/(www\.)?amoriva\.app\/api\/anfragen\/eingang\/ws_[a-f0-9]{24}$/.test(AMORIVA_EINGANG);

/**
 * Schickt die Anfrage zusätzlich in Nevios eigenes Amoriva-Dashboard, wo sie mit
 * der Rückfrage „übernehmen? Ja / Nein" landet.
 *
 * Gibt zurück, ob es geklappt hat. Früher hat diese Funktion Fehler nur ins
 * Protokoll geschrieben und nichts zurückgegeben - damit konnte der Aufrufer
 * nicht unterscheiden, ob der Eintrag gelungen ist. Genau das braucht der
 * Wächter aber, um Nevio zu melden, was fehlt.
 */
async function anAmoriva(daten) {
  if (!EINGANG_OK) {
    return {
      ok: false,
      grund: AMORIVA_EINGANG
        ? 'Die hinterlegte Empfangsadresse sieht nicht wie eine gültige Amoriva-Adresse aus.'
        : 'Es ist keine Empfangsadresse hinterlegt (AMORIVA_EINGANG_URL fehlt).',
      // Ohne hinterlegte Adresse ist das kein Ausfall, sondern der
      // abgeschaltete Zustand. Dafür darf keine Störmeldung rausgehen.
      abgeschaltet: !AMORIVA_EINGANG,
    };
  }
  // Vier Sekunden. Die Gegenstelle antwortet gemessen in 0,3 bis 0,7
  // Sekunden; vier Sekunden sind grosszuegig und begrenzen zugleich,
  // wie lange das Paar im schlimmsten Fall zusaetzlich wartet.
  const abbruch = new AbortController();
  const uhr = setTimeout(() => abbruch.abort(), 4000);
  try {
    const res = await fetch(AMORIVA_EINGANG, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...daten, formular: 'amoriva-films.de' }),
      signal: abbruch.signal,
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Amoriva-Eingang abgelehnt:', res.status, txt.slice(0, 200));
      return { ok: false, grund: `Das Dashboard hat den Eintrag abgelehnt (Status ${res.status}).` };
    }
    return { ok: true };
  } catch (e) {
    const zeitlimit = e?.name === 'AbortError';
    console.error('Amoriva-Eingang nicht erreichbar:', zeitlimit ? 'Zeitlimit' : e);
    return {
      ok: false,
      grund: zeitlimit
        ? 'Das Dashboard hat nicht innerhalb von vier Sekunden geantwortet.'
        : 'Das Dashboard war nicht erreichbar.',
    };
  } finally {
    clearTimeout(uhr);
  }
}

// Einfache Bremse gegen Missbrauch: seit der Eingangsbestätigung geht eine Mail
// auch an die vom Absender eingetippte Adresse. Ohne Bremse könnte jemand damit
// Fremde zumüllen und unsere Absender-Reputation beschädigen. Der Zähler lebt
// im Arbeitsspeicher, das reicht gegen einfache Fluten.
const versuche = new Map();
function zuVieleAnfragen(ip) {
  const jetzt = Date.now();
  const fenster = 10 * 60 * 1000;
  const liste = (versuche.get(ip) || []).filter((t) => jetzt - t < fenster);
  liste.push(jetzt);
  versuche.set(ip, liste);
  if (versuche.size > 500) versuche.clear();
  return liste.length > 5;
}

async function senden(payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify(payload),
  });
  let data = null;
  try { data = await res.json(); } catch { /* keine JSON-Antwort */ }
  return { ok: res.ok, status: res.status, data };
}

/** Kurzer Klartext aus einer Resend-Antwort oder einem geworfenen Fehler. */
function grundAus(ergebnis) {
  if (ergebnis.status === 'rejected') {
    return `Der Mailversand hat abgebrochen: ${String(ergebnis.reason?.message || ergebnis.reason).slice(0, 160)}`;
  }
  const w = ergebnis.value;
  if (w.ok) return '';
  const text = w.data?.message || w.data?.name || 'kein Grund genannt';
  return `Resend hat die Mail abgelehnt (Status ${w.status}): ${String(text).slice(0, 160)}`;
}

/**
 * Die Sofortmeldung an Nevio.
 *
 * Ehrliche Grenze, die man kennen muss: diese Meldung geht denselben Weg
 * wie die Mail, deren Ausfall sie meldet. Wenn Resend insgesamt ausfällt,
 * kommt auch die Meldung nicht an. Deshalb zwei Dinge:
 *
 * 1. Sie wird zweimal versucht. Die meisten Resend-Fehler sind kurze
 *    Aussetzer, und ein zweiter Versuch nach einer Sekunde kommt durch.
 * 2. Sie ist nicht die einzige Absicherung. Wenn der Mailweg bricht, aber
 *    das Dashboard trägt, steht die Anfrage dort - und umgekehrt. Erst
 *    wenn beide Wege gleichzeitig ausfallen, hängt alles an dieser Mail,
 *    und genau dann sagt ihr Betreff auch das.
 */
async function alarmAnNevio({ wege, anfrage, verloren }) {
  const vorlage = mailAlarm({ wege, anfrage, verloren });
  for (let versuch = 1; versuch <= 2; versuch++) {
    try {
      const res = await senden({
        from: FROM,
        to: [AN_UNS],
        reply_to: anfrage?.email || 'booking@amoriva-films.de',
        ...vorlage,
      });
      if (res.ok) return true;
      console.error(`Störmeldung Versuch ${versuch} abgelehnt:`, res.status, JSON.stringify(res.data).slice(0, 200));
    } catch (e) {
      console.error(`Störmeldung Versuch ${versuch} abgebrochen:`, e);
    }
    if (versuch === 1) await new Promise((r) => setTimeout(r, 1000));
  }
  // Letzte Zuflucht: ins Protokoll, vollständig. Die Vercel-Protokolle
  // halten die Anfrage dann noch fest, auch wenn keine Mail rausging.
  console.error('STÖRMELDUNG KAM NICHT RAUS. Anfrage im Klartext:', JSON.stringify(anfrage));
  return false;
}

export async function POST(request) {
  try {
    const body = await request.json();

    /* Eingaben begrenzen, bevor irgendetwas damit passiert.
       Ohne Grenze landet ein 3000 Zeichen langer Name in der
       Betreffzeile, Resend lehnt die Mail ab - und die Stoermeldung
       gleich mit, weil sie denselben Namen traegt. Gemessen am
       22.09.2026. Die Grenzen sind grosszuegig: kein echtes Paar
       schreibt einen Namen mit mehr als 120 Zeichen. */
    const kappen = (v, max) => String(v ?? '').slice(0, max);
    const name           = kappen(body.name, 120);
    const email          = kappen(body.email, 200);
    const hochzeitsdatum = kappen(body.hochzeitsdatum, 40);
    const location       = kappen(body.location, 200);
    const nachricht      = kappen(body.nachricht, 5000);

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unbekannt';
    if (zuVieleAnfragen(ip)) {
      return Response.json({ error: 'Zu viele Anfragen in kurzer Zeit. Bitte versucht es gleich noch einmal oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 429 });
    }

    if (!name) return Response.json({ error: 'Bitte gebt euren Namen an.' }, { status: 400 });
    if (!email) return Response.json({ error: 'Bitte gebt eure E-Mail-Adresse an.' }, { status: 400 });
    if (!email.includes('@') || !email.includes('.')) {
      return Response.json({ error: 'Bitte eine gültige E-Mail-Adresse eingeben.' }, { status: 400 });
    }

    const anfrage = { name, email, hochzeitsdatum, location, nachricht };
    const schluessel = Boolean(process.env.RESEND_API_KEY);
    if (!schluessel) console.error('RESEND_API_KEY ist nicht gesetzt.');

    /* Alle drei Wege gleichzeitig.
     *
     * Vorher lief die Mail an uns zuerst und allein: schlug sie fehl, kehrte
     * die Funktion sofort mit 500 zurück - der Eintrag ins Dashboard wurde
     * dann gar nicht mehr versucht. Ein Aussetzer bei Resend von einer halben
     * Minute hat die Anfrage damit vollständig gelöscht: keine Mail, kein
     * Dashboard-Eintrag, und das Paar sah einen Fehler.
     *
     * Jetzt sind Mail und Dashboard zwei unabhängige Empfangswege. Die
     * Anfrage gilt als angekommen, sobald EINER von beiden trägt. Nur wenn
     * beide gleichzeitig ausfallen, bekommt das Paar einen Fehler zu sehen. */
    const leer = { ok: false, status: 0, data: { message: 'RESEND_API_KEY ist nicht gesetzt.' } };
    const [anUns, dashboard, bestaetigung] = await Promise.allSettled([
      schluessel ? senden({ from: FROM, to: [AN_UNS], reply_to: email, ...mailAnUns(anfrage) }) : Promise.resolve(leer),
      anAmoriva(anfrage),
      schluessel ? senden({ from: FROM, to: [email], reply_to: 'booking@amoriva-films.de', ...mailAnPaar({ name, hochzeitsdatum, location, nachricht }) }) : Promise.resolve(leer),
    ]);

    const dash = dashboard.status === 'fulfilled' ? dashboard.value : { ok: false, grund: 'Der Dashboard-Aufruf hat abgebrochen.' };

    const wege = [
      { name: 'Benachrichtigung an dich', ok: anUns.status === 'fulfilled' && anUns.value.ok, grund: grundAus(anUns) },
      { name: 'Eintrag im Amoriva-Dashboard', ok: dash.ok, grund: dash.grund, abgeschaltet: dash.abgeschaltet },
      { name: 'Eingangsbestätigung an das Paar', ok: bestaetigung.status === 'fulfilled' && bestaetigung.value.ok, grund: grundAus(bestaetigung) },
    ];
    for (const w of wege) if (!w.ok) console.error(`Weg gebrochen - ${w.name}: ${w.grund}`);

    // Ein nicht eingerichtetes Dashboard ist kein Ausfall, sondern der
    // bewusst abgeschaltete Zustand. Sonst käme bei jeder einzelnen
    // Anfrage eine Störmeldung, und eine Meldung, die immer kommt, liest
    // nach zwei Wochen niemand mehr.
    const meldenswert = wege.filter((w) => !w.ok && !w.abgeschaltet);
    const angekommen = wege[0].ok || wege[1].ok;

    if (meldenswert.length > 0) {
      // Fehlschlagen darf auch die Meldung. Sie darf aber niemals eine
      // Anfrage, die angekommen ist, nachträglich in einen Fehler drehen.
      try {
        await alarmAnNevio({ wege: meldenswert, anfrage, verloren: !angekommen });
      } catch (e) {
        console.error('Störmeldung selbst fehlgeschlagen:', e);
      }
    }

    if (!angekommen) {
      return Response.json({ error: 'Eure Anfrage konnte gerade nicht übermittelt werden. Bitte schreibt uns direkt an booking@amoriva-films.de oder ruft an: 0155 6555 9747.' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact error:', e);
    return Response.json({ error: 'Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
  }
}
