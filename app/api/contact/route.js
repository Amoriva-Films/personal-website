// Kontaktformular der Films-Seite: schickt die Anfrage an uns und eine kurze
// Eingangsbestätigung an das Paar. Beide Mails kommen von der bei Resend
// verifizierten Domain booking@amoriva-films.de. Vorlagen liegen in ./mail.js.
import { mailAnPaar, mailAnUns } from './mail.js';

const FROM = 'Amoriva Films <booking@amoriva-films.de>';
const AN_UNS = 'mastrogiorgio.nevio@gmail.com';

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

    // 2) Eingangsbestätigung an das Paar. Bewusst kurz: sie ersetzt die persönliche
    // Antwort nicht, sie kündigt sie an. Schlägt sie fehl, ist die Anfrage trotzdem
    // bei uns, deshalb nur protokollieren.
    try {
      const anPaar = await senden({ from: FROM, to: [email], reply_to: 'booking@amoriva-films.de', ...mailAnPaar({ name, hochzeitsdatum, location, nachricht }) });
      if (!anPaar.ok) console.error('Bestätigung an das Paar abgelehnt:', anPaar.status, JSON.stringify(anPaar.data).slice(0, 300));
    } catch (e) {
      console.error('Bestätigung an das Paar fehlgeschlagen:', e);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact error:', e);
    return Response.json({ error: 'Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
  }
}
