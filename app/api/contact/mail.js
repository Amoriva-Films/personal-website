// Mail-Vorlagen des Kontaktformulars. Die Gestaltung folgt der Website:
// Creme #F6F1EB, Text #3B2F2A, Gold #687850, Linie #E7DED3, Logo-Grün #687850,
// Cormorant (Fallback Georgia) für Überschriften, Inter (Fallback Helvetica) für Text.
// Aufbau mit Tabellen und Inline-Styles, damit auch Outlook und Gmail sauber rendern.

/* Kurzfassung fuer Betreffzeilen.

   Eine Betreffzeile darf nach RFC 5322 nicht beliebig lang sein; Resend
   lehnt zu lange ab. Gemessen am 22.09.2026: ein Name mit 3000 Zeichen
   ergab einen Betreff mit 3017 Zeichen, die Benachrichtigung an Nevio
   wurde abgelehnt - und weil die Stoermeldung denselben Namen in ihren
   Betreff schreibt, scheiterte auch sie. Die Anfrage waere still
   verschwunden, obwohl der Waechter genau das verhindern soll. */
export function kurz(v, max = 70) {
  const t = String(v ?? '').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1) + '\u2026' : t;
}

export function esc(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const F = {
  creme: '#F6F1EB', karte: '#FFFFFF', text: '#3B2F2A', weich: '#5E5148',
  gedaempft: '#8A7B6F', gruen: '#687850', linie: '#E7DED3', dunkel: '#2A1F1B', gruen: '#687850',
};
/* In E-Mails gibt es kein next/font: Mailprogramme laden keine
   Schriften nach. Hier MUESSEN echte Namen stehen, und die Kette muss
   mit etwas enden, das jedes Geraet hat. Georgia ist auf Windows, macOS
   und Android vorhanden - die Mail sieht damit ueberall gleich aus,
   auch wenn sie nicht nach Bodoni aussieht. */
const serif = "Georgia, 'Times New Roman', serif";
const sans = "Jost, Futura, Helvetica, Arial, sans-serif";

const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
/** "2027-09-11" wird zu "11. September 2027", alles andere bleibt wie eingegeben. */
export function datumSchoen(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v ?? '').trim());
  if (!m) return v;
  return `${parseInt(m[3], 10)}. ${MONATE[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

function zeile(label, wert, { mehrzeilig = false } = {}) {
  if (!wert) return '';
  const inhalt = mehrzeilig ? esc(wert).replace(/\r?\n/g, '<br>') : esc(wert);
  return `
    <tr>
      <td style="padding:13px 0;border-bottom:1px solid ${F.linie};vertical-align:top;width:120px;font-family:${sans};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:${F.gruen};">${label}</td>
      <td style="padding:13px 0;border-bottom:1px solid ${F.linie};vertical-align:top;font-family:${sans};font-size:15px;line-height:1.7;color:${F.text};">${inhalt}</td>
    </tr>`;
}

function rahmen({ titelZeile, preheader, eyebrow, titel, inhalt }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(titelZeile)}</title>
</head>
<body style="margin:0;padding:0;background:${F.creme};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${F.creme};font-size:1px;line-height:1px;">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${F.creme};">
  <tr><td align="center" style="padding:40px 16px 48px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
      <tr><td align="center" style="padding:6px 0 26px;">
        <div style="font-family:${serif};font-size:16px;letter-spacing:0.30em;text-transform:uppercase;color:${F.gruen};">Amoriva Films</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:16px auto 0;"><tr><td style="width:36px;height:1px;background:${F.gruen};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>
      <tr><td style="background:${F.karte};border:1px solid ${F.linie};padding:46px 44px 42px;">
        <div style="font-family:${sans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gruen};">${esc(eyebrow)}</div>
        <h1 style="margin:14px 0 26px;font-family:${serif};font-size:32px;line-height:1.15;font-weight:400;letter-spacing:0.01em;color:${F.dunkel};">${titel}</h1>
        ${inhalt}
      </td></tr>
      <tr><td align="center" style="padding:30px 20px 0;font-family:${sans};font-size:11px;line-height:1.9;letter-spacing:0.04em;color:${F.gedaempft};">
        Amoriva Films &middot; Wolfsburg, Niedersachsen<br>
        <a href="mailto:booking@amoriva-films.de" style="color:${F.gedaempft};text-decoration:none;">booking@amoriva-films.de</a>
        &middot; <a href="https://www.instagram.com/amorivafilms/" style="color:${F.gedaempft};text-decoration:none;">Instagram @amorivafilms</a><br>
        <a href="https://amoriva-films.de" style="color:${F.gruen};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;font-size:10px;">amoriva-films.de</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const absatz = (t) => `<p style="margin:0 0 18px;font-family:${sans};font-size:15.5px;line-height:1.75;color:${F.text};">${t}</p>`;

/** Eingangsbestätigung an das Paar. Kündigt die persönliche Antwort an, ersetzt sie nicht. */
export function mailAnPaar({ name, hochzeitsdatum, location, nachricht }) {
  // Anrede: bei Paaren ("Laura und Tim", "Laura & Tim") der ganze Name, sonst nur der Vorname.
  const roh = String(name || '').trim();
  const vorname = esc(/\s(und|&|\+)\s|,/i.test(roh) ? roh : (roh.split(/\s+/)[0] || roh));
  const details = [zeile('Datum', datumSchoen(hochzeitsdatum)), zeile('Location', location), zeile('Nachricht', nachricht, { mehrzeilig: true })].join('');
  const inhalt = `
    ${absatz(`Hallo ${vorname},`)}
    ${absatz('schön, dass ihr euch bei uns gemeldet habt. Eure Anfrage ist gerade reingekommen und wir schauen sie uns in Ruhe an.')}
    ${absatz('Nevio meldet sich persönlich bei euch, in der Regel innerhalb von 24 Stunden. Wenn euch bis dahin noch etwas einfällt, antwortet einfach auf diese Mail.')}
    ${details ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 30px;background:${F.creme};">
      <tr><td style="padding:10px 24px 12px;">
        <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:${F.gedaempft};padding:8px 0 4px;">Das habt ihr uns geschickt</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>
      </td></tr>
    </table>` : ''}
    ${absatz(`Wenn ihr mögt, schaut in der Zwischenzeit bei unseren <a href="https://amoriva-films.de/leistungen" style="color:${F.gruen};text-decoration:underline;text-underline-offset:3px;">Leistungen</a> vorbei. So bekommt ihr ein Gefühl dafür, wie wir arbeiten.`)}
    <div style="margin-top:34px;padding-top:26px;border-top:1px solid ${F.linie};">
      <div style="font-family:${sans};font-size:14px;color:${F.weich};margin-bottom:6px;">Bis ganz bald</div>
      <div style="font-family:${serif};font-size:26px;font-style:italic;color:${F.dunkel};line-height:1.2;">Nevio und Danilo</div>
      <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gruen};margin-top:8px;">Amoriva Films</div>
    </div>`;
  return {
    subject: 'Eure Anfrage ist angekommen',
    html: rahmen({
      titelZeile: 'Eure Anfrage ist angekommen',
      preheader: 'Nevio meldet sich persönlich, in der Regel innerhalb von 24 Stunden.',
      eyebrow: 'Eingangsbestätigung',
      titel: 'Eure Anfrage ist<br>angekommen.',
      inhalt,
    }),
  };
}

/** Benachrichtigung an uns. Gleiches Layout wie die Mail an das Paar, nur mit anderen Daten. */
export function mailAnUns({ name, email, hochzeitsdatum, location, nachricht }) {
  const paar = esc(String(name || '').trim());
  const details = [zeile('Paar', name), zeile('E-Mail', email), zeile('Datum', datumSchoen(hochzeitsdatum)), zeile('Location', location), zeile('Nachricht', nachricht, { mehrzeilig: true })].join('');
  const betreffAntwort = encodeURIComponent('Eure Hochzeit mit Amoriva Films');
  const inhalt = `
    ${absatz('Hallo Nevio,')}
    ${absatz(`${paar} haben euch gerade über die Website geschrieben. Hier ist alles auf einen Blick.`)}
    ${absatz('Die Eingangsbestätigung an das Paar ist schon raus. Jetzt bist du dran, in der Regel innerhalb von 24 Stunden.')}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 30px;background:${F.creme};">
      <tr><td style="padding:10px 24px 12px;">
        <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:${F.gedaempft};padding:8px 0 4px;">Das hat das Paar geschickt</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>
      </td></tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background:${F.dunkel};">
        <a href="mailto:${esc(email)}?subject=${betreffAntwort}" style="display:inline-block;padding:15px 30px;font-family:${sans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${F.creme};text-decoration:none;">Jetzt antworten</a>
      </td>
    </tr></table>
    ${absatz(`<span style="font-size:13px;color:${F.gedaempft};">Oder einfach auf diese Mail antworten, die Antwort geht direkt an das Paar.</span>`).replace('margin:0 0 18px', 'margin:18px 0 0')}
    <div style="margin-top:34px;padding-top:26px;border-top:1px solid ${F.linie};">
      <div style="font-family:${sans};font-size:14px;color:${F.weich};margin-bottom:6px;">Automatisch weitergeleitet vom Kontaktformular</div>
      <div style="font-family:${serif};font-size:26px;font-style:italic;color:${F.dunkel};line-height:1.2;">amoriva-films.de</div>
      <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gruen};margin-top:8px;">Amoriva Films</div>
    </div>`;
  return {
    subject: `Neue Anfrage von ${kurz(name) || 'unbekannt'}`,
    html: rahmen({
      titelZeile: `Neue Anfrage von ${name}`,
      preheader: `${name}${location ? ', ' + location : ''}${hochzeitsdatum ? ', ' + datumSchoen(hochzeitsdatum) : ''}`,
      eyebrow: 'Neue Anfrage',
      titel: 'Eine neue Anfrage ist<br>angekommen.',
      inhalt,
    }),
  };
}

/* ------------------------------------------------------------------ *
 * Waechter: Meldungen an Nevio, wenn etwas nicht funktioniert hat.
 *
 * Diese Mails sind bewusst im selben Gewand wie alle anderen. Eine
 * Stoermeldung, die aussieht wie eine Systemmeldung, wird im Postfach
 * uebersehen; eine, die aussieht wie die Anfrage selbst, nicht.
 *
 * Wichtigste Eigenschaft: die vollstaendige Anfrage steht drin. Wenn
 * der Eintrag ins Dashboard bricht, ist diese Mail die einzige Stelle,
 * an der die Anfrage noch existiert. Nevio kann direkt aus ihr heraus
 * antworten, ohne irgendwo nachzusehen.
 * ------------------------------------------------------------------ */

/** Grauer Hinweiskasten. Bewusst ohne Rot: eine Farbe macht die Stoerung
 *  nicht dringender, sie macht die Mail nur lauter. */
function kasten(ueberschrift, zeilenText) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 30px;background:${F.creme};border-left:3px solid ${F.dunkel};">
      <tr><td style="padding:20px 24px;">
        <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:${F.gedaempft};margin-bottom:10px;">${esc(ueberschrift)}</div>
        <div style="font-family:${sans};font-size:15px;line-height:1.7;color:${F.text};">${zeilenText}</div>
      </td></tr>
    </table>`;
}

/**
 * Sofortmeldung: beim Absenden einer Anfrage ist mindestens ein Weg
 * gebrochen. `wege` ist eine Liste aus { name, ok, grund }.
 */
export function mailAlarm({ wege, anfrage, verloren }) {
  const { name, email, hochzeitsdatum, location, nachricht } = anfrage || {};
  const kaputt = wege.filter((w) => !w.ok);

  const liste = kaputt
    .map((w) => `<div style="margin:0 0 8px;"><strong style="font-weight:600;">${esc(w.name)}</strong> &mdash; ${esc(w.grund || 'unbekannter Grund')}</div>`)
    .join('');

  const details = [
    zeile('Paar', name),
    zeile('E-Mail', email),
    zeile('Datum', datumSchoen(hochzeitsdatum)),
    zeile('Location', location),
    zeile('Nachricht', nachricht, { mehrzeilig: true }),
  ].join('');

  const betreffAntwort = encodeURIComponent('Eure Hochzeit mit Amoriva Films');

  /* Zwei sehr verschiedene Lagen, und der Unterschied muss im ersten
     Satz stehen: entweder ist die Anfrage noch irgendwo gespeichert,
     oder diese Mail ist das Einzige, was von ihr uebrig ist. */
  const einstieg = verloren
    ? absatz('diese Mail ist gerade die <strong style="font-weight:600;">einzige Kopie</strong> dieser Anfrage. Weder die normale Benachrichtigung noch der Eintrag im Dashboard hat funktioniert. Bitte antworte von Hand, am besten sofort.')
    : absatz('eine Anfrage ist angekommen, aber nicht auf allen Wegen. Sie ist nicht verloren &mdash; unten steht sie vollstaendig. Ein Weg hat gehakt und sollte nachgesehen werden.');

  const inhalt = `
    ${absatz('Hallo Nevio,')}
    ${einstieg}
    ${kasten('Das hat nicht funktioniert', liste)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 30px;background:${F.creme};">
      <tr><td style="padding:10px 24px 12px;">
        <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:${F.gedaempft};padding:8px 0 4px;">Die vollstaendige Anfrage</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>
      </td></tr>
    </table>
    ${email ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background:${F.dunkel};">
        <a href="mailto:${esc(email)}?subject=${betreffAntwort}" style="display:inline-block;padding:15px 30px;font-family:${sans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${F.creme};text-decoration:none;">Von Hand antworten</a>
      </td>
    </tr></table>` : ''}
    <div style="margin-top:34px;padding-top:26px;border-top:1px solid ${F.linie};">
      <div style="font-family:${sans};font-size:14px;color:${F.weich};margin-bottom:6px;">Automatische Meldung vom Waechter</div>
      <div style="font-family:${serif};font-size:26px;font-style:italic;color:${F.dunkel};line-height:1.2;">amoriva-films.de</div>
      <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gruen};margin-top:8px;">Amoriva Films</div>
    </div>`;

  return {
    subject: verloren
      ? `Anfrage von ${kurz(name) || 'unbekannt'} konnte nicht zugestellt werden`
      : `Anfrage von ${kurz(name) || 'unbekannt'} angekommen, ein Weg hat gehakt`,
    html: rahmen({
      titelZeile: 'Stoerung beim Anfrageformular',
      preheader: verloren
        ? 'Diese Mail ist die einzige Kopie der Anfrage. Bitte von Hand antworten.'
        : 'Die Anfrage ist da, ein Weg hat gehakt.',
      eyebrow: 'Stoerung',
      titel: verloren ? 'Eine Anfrage<br>braucht dich sofort.' : 'Eine Anfrage kam<br>nur halb durch.',
      inhalt,
    }),
  };
}

/**
 * Taegliche Pruefung: nur gesendet, wenn etwas abweicht.
 * `befunde` ist eine Liste aus { was, text }.
 */
export function mailWaechter({ befunde }) {
  const liste = befunde
    .map((b) => `<div style="margin:0 0 10px;"><strong style="font-weight:600;">${esc(b.was)}</strong><br><span style="color:${F.weich};">${esc(b.text)}</span></div>`)
    .join('');

  const inhalt = `
    ${absatz('Hallo Nevio,')}
    ${absatz('die taegliche Pruefung der Website hat etwas gefunden. Solange alles laeuft, kommt diese Mail nicht &mdash; wenn sie da ist, ist wirklich etwas.')}
    ${kasten('Gefunden', liste)}
    ${absatz(`<span style="font-size:13px;color:${F.gedaempft};">Geprueft am ${esc(new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }))} Uhr.</span>`)}
    <div style="margin-top:34px;padding-top:26px;border-top:1px solid ${F.linie};">
      <div style="font-family:${sans};font-size:14px;color:${F.weich};margin-bottom:6px;">Automatische Meldung vom Waechter</div>
      <div style="font-family:${serif};font-size:26px;font-style:italic;color:${F.dunkel};line-height:1.2;">amoriva-films.de</div>
      <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gruen};margin-top:8px;">Amoriva Films</div>
    </div>`;

  return {
    subject: befunde.length === 1
      ? `Waechter: ${befunde[0].was}`
      : `Waechter: ${befunde.length} Punkte zu pruefen`,
    html: rahmen({
      titelZeile: 'Taegliche Pruefung',
      preheader: befunde.map((b) => b.was).join(' · '),
      eyebrow: 'Taegliche Pruefung',
      titel: 'Die Pruefung hat<br>etwas gefunden.',
      inhalt,
    }),
  };
}
