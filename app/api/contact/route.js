// Kontaktformular der Films-Seite: schickt die Anfrage an uns und eine kurze
// Eingangsbestätigung an das Paar. Beide Mails kommen von der bei Resend
// verifizierten Domain booking@amoriva-films.de. Vorlagen liegen in ./mail.js.
import { mailAnPaar, mailAnUns } from './mail.js';

const FROM = 'Amoriva Films <booking@amoriva-films.de>';
const AN_UNS = 'mastrogiorgio.nevio@gmail.com';

// Persönliche Empfangsadresse aus dem Amoriva-Dashboard (Formular → Website-Eingang).
// Ist sie nicht gesetzt, läuft alles wie bisher, nur ohne Eintrag im Dashboard.
const AMORIVA_EINGANG = (process.env.AMORIVA_EINGANG_URL || '').trim();
const EINGANG_OK = /^https:\/\/(www\.)?amoriva\.app\/api\/anfragen\/eingang\/ws_[a-f0-9]{24}$/.test(AMORIVA_EINGANG);

/**
 * Schickt die Anfrage zusätzlich in Nevios eigenes Amoriva-Dashboard, wo sie mit
 * der Rückfrage „übernehmen? Ja / Nein" landet. Bewusst ohne await im Hauptpfad
 * und mit kurzem Zeitlimit: Wenn Amoriva langsam oder nicht erreichbar ist, darf
 * das die Anfrage des Paares niemals aufhalten. Die E-Mails sind der sichere Weg,
 * das Dashboard die Bequemlichkeit.
 */
async function anAmoriva(daten) {
  if (!EINGANG_OK) {
    if (AMORIVA_EINGANG) console.error('AMORIVA_EINGANG_URL sieht nicht wie eine gültige Empfangsadresse aus.');
    return;
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
    }
  } catch (e) {
    console.error('Amoriva-Eingang nicht erreichbar:', e?.name === 'AbortError' ? 'Zeitlimit' : e);
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, hochzeitsdatum, location, nachricht } = body;

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unbekannt';
    if (zuVieleAnfragen(ip)) {
      return Response.json({ error: 'Zu viele Anfragen in kurzer Zeit. Bitte versucht es gleich noch einmal oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 429 });
    }

    if (!name) return Response.json({ error: 'Bitte gebt euren Namen an.' }, { status: 400 });
    if (!email) return Response.json({ error: 'Bitte gebt eure E-Mail-Adresse an.' }, { status: 400 });
    if (!email.includes('@') || !email.includes('.')) {
      return Response.json({ error: 'Bitte eine gültige E-Mail-Adresse eingeben.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY ist nicht gesetzt.');
      return Response.json({ error: 'Serverkonfigurationsfehler. Bitte schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
    }

    // 1) Anfrage an uns. Antworten gehen per Reply-To direkt an das Paar.
    const anUns = await senden({ from: FROM, to: [AN_UNS], reply_to: email, ...mailAnUns({ name, email, hochzeitsdatum, location, nachricht }) });
    if (!anUns.ok) {
      console.error('Resend error:', JSON.stringify(anUns.data));
      const msg = anUns.data?.message || anUns.data?.name || 'Unbekannter Fehler';
      return Response.json({ error: `E-Mail konnte nicht gesendet werden (${msg}). Bitte schreibt uns direkt an booking@amoriva-films.de.` }, { status: 500 });
    }

    // 2) und 3) laufen nebeneinander: der Eintrag im eigenen Amoriva-Dashboard
    // und die Eingangsbestätigung an das Paar.
    //
    // Beide werden abgewartet, aber gleichzeitig gestartet. Das kostet keine
    // zusätzliche Zeit, weil die langsamere von beiden die Dauer bestimmt und
    // das Dashboard mit unter einer Sekunde ohnehin schneller ist als der
    // Mailversand.
    //
    // Das Abwarten ist wichtig: Vorher lief der Dashboard-Aufruf ohne await
    // nebenher. Auf Vercel wird eine Serverfunktion aber eingefroren, sobald
    // die Antwort raus ist - ein noch laufender Aufruf kann dabei einfach
    // verschwinden. Lokal faellt das nie auf, live schon.
    //
    // Fehlschlagen darf beides: Die Anfrage selbst ist mit Schritt 1 bereits
    // sicher bei uns. Deshalb allSettled und nur protokollieren.
    const [dashboard, bestaetigung] = await Promise.allSettled([
      anAmoriva({ name, email, hochzeitsdatum, location, nachricht }),
      senden({ from: FROM, to: [email], reply_to: 'booking@amoriva-films.de', ...mailAnPaar({ name, hochzeitsdatum, location, nachricht }) }),
    ]);

    if (dashboard.status === 'rejected') {
      console.error('Dashboard-Eintrag fehlgeschlagen:', dashboard.reason);
    }
    if (bestaetigung.status === 'rejected') {
      console.error('Bestätigung an das Paar fehlgeschlagen:', bestaetigung.reason);
    } else if (!bestaetigung.value.ok) {
      console.error('Bestätigung an das Paar abgelehnt:', bestaetigung.value.status, JSON.stringify(bestaetigung.value.data).slice(0, 300));
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact error:', e);
    return Response.json({ error: 'Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
  }
}
