// Mail-Vorlagen des Kontaktformulars. Die Gestaltung folgt der Website:
// Creme #F6F1EB, Text #3B2F2A, Gold #B79B72, Linie #E7DED3, Logo-Grün #687850,
// Cormorant (Fallback Georgia) für Überschriften, Inter (Fallback Helvetica) für Text.
// Aufbau mit Tabellen und Inline-Styles, damit auch Outlook und Gmail sauber rendern.

export function esc(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const F = {
  creme: '#F6F1EB', karte: '#FFFFFF', text: '#3B2F2A', weich: '#5E5148',
  gedaempft: '#8A7B6F', gold: '#B79B72', linie: '#E7DED3', dunkel: '#2A1F1B', gruen: '#687850',
};
const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sans = "Inter, Helvetica, Arial, sans-serif";

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
      <td style="padding:13px 0;border-bottom:1px solid ${F.linie};vertical-align:top;width:120px;font-family:${sans};font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:${F.gold};">${label}</td>
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
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:16px auto 0;"><tr><td style="width:36px;height:1px;background:${F.gold};font-size:0;line-height:0;">&nbsp;</td></tr></table>
      </td></tr>
      <tr><td style="background:${F.karte};border:1px solid ${F.linie};padding:46px 44px 42px;">
        <div style="font-family:${sans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gold};">${esc(eyebrow)}</div>
        <h1 style="margin:14px 0 26px;font-family:${serif};font-size:32px;line-height:1.15;font-weight:400;letter-spacing:0.01em;color:${F.dunkel};">${titel}</h1>
        ${inhalt}
      </td></tr>
      <tr><td align="center" style="padding:30px 20px 0;font-family:${sans};font-size:11px;line-height:1.9;letter-spacing:0.04em;color:${F.gedaempft};">
        Amoriva Films &middot; Wolfsburg, Niedersachsen<br>
        <a href="mailto:booking@amoriva-films.de" style="color:${F.gedaempft};text-decoration:none;">booking@amoriva-films.de</a>
        &middot; <a href="https://www.instagram.com/amorivafilms/" style="color:${F.gedaempft};text-decoration:none;">Instagram @amorivafilms</a><br>
        <a href="https://amoriva-films.de" style="color:${F.gold};text-decoration:none;letter-spacing:0.12em;text-transform:uppercase;font-size:10px;">amoriva-films.de</a>
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
  const vorname = esc(/\b(und|&|\+)\b|,/i.test(roh) ? roh : (roh.split(/\s+/)[0] || roh));
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
    ${absatz(`Wenn ihr mögt, schaut in der Zwischenzeit bei unseren <a href="https://amoriva-films.de/referenzen" style="color:${F.gold};text-decoration:underline;text-underline-offset:3px;">Filmen</a> vorbei. So bekommt ihr ein Gefühl dafür, wie euer Tag aussehen könnte.`)}
    <div style="margin-top:34px;padding-top:26px;border-top:1px solid ${F.linie};">
      <div style="font-family:${sans};font-size:14px;color:${F.weich};margin-bottom:6px;">Bis ganz bald</div>
      <div style="font-family:${serif};font-size:26px;font-style:italic;color:${F.dunkel};line-height:1.2;">Nevio und Danilo</div>
      <div style="font-family:${sans};font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:${F.gold};margin-top:8px;">Amoriva Films</div>
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

/** Benachrichtigung an uns, mit direktem Antworten-Knopf. */
export function mailAnUns({ name, email, hochzeitsdatum, location, nachricht }) {
  const details = [zeile('Paar', name), zeile('E-Mail', email), zeile('Datum', datumSchoen(hochzeitsdatum)), zeile('Location', location), zeile('Nachricht', nachricht, { mehrzeilig: true })].join('');
  const betreffAntwort = encodeURIComponent('Eure Hochzeit mit Amoriva Films');
  const inhalt = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 30px;">${details}</table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background:${F.dunkel};">
        <a href="mailto:${esc(email)}?subject=${betreffAntwort}" style="display:inline-block;padding:15px 30px;font-family:${sans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${F.creme};text-decoration:none;">Jetzt antworten</a>
      </td>
    </tr></table>
    <p style="margin:18px 0 0;font-family:${sans};font-size:12.5px;line-height:1.7;color:${F.gedaempft};">Oder einfach auf diese Mail antworten, die Antwort geht direkt an das Paar. Die Eingangsbestätigung an das Paar ist schon raus.</p>`;
  return {
    subject: `Neue Anfrage von ${name}`,
    html: rahmen({
      titelZeile: `Neue Anfrage von ${name}`,
      preheader: `${name}${location ? ', ' + location : ''}${hochzeitsdatum ? ', ' + datumSchoen(hochzeitsdatum) : ''}`,
      eyebrow: 'Neue Anfrage',
      titel: esc(name),
      inhalt,
    }),
  };
}
