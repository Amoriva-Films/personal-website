// Hilfsmittel fuer den Versand.
// esc(): Nutzereingaben werden in HTML-Mails eingesetzt, deshalb Sonderzeichen entschaerfen.
function esc(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Einfache Bremse gegen Missbrauch: seit der Eingangsbestaetigung geht eine Mail
// auch an die vom Absender eingetippte Adresse. Ohne Bremse koennte jemand damit
// Fremde zumuellen und unsere Absender-Reputation beschaedigen. Der Zaehler lebt
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, hochzeitsdatum, location, nachricht } = body;

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unbekannt';
    if (zuVieleAnfragen(ip)) {
      return Response.json({ error: 'Zu viele Anfragen in kurzer Zeit. Bitte versucht es gleich noch einmal oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 429 });
    }

    if (!name) {
      return Response.json({ error: 'Bitte gebt euren Namen an.' }, { status: 400 });
    }
    if (!email) {
      return Response.json({ error: 'Bitte gebt eure E-Mail-Adresse an.' }, { status: 400 });
    }
    if (!email.includes('@') || !email.includes('.')) {
      return Response.json({ error: 'Bitte eine gültige E-Mail-Adresse eingeben.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY ist nicht gesetzt.');
      return Response.json({ error: 'Serverkonfigurationsfehler. Bitte schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // Eigene, bei Resend verifizierte Domain als Absender. Die Testadresse
        // onboarding@resend.dev konnte nur an das eigene Konto zustellen.
        from: 'Amoriva Films <booking@amoriva-films.de>',
        to: ['mastrogiorgio.nevio@gmail.com'],
        reply_to: email,
        subject: `Neue Anfrage von ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #F6F1EB; color: #3B2F2A;">
            <h1 style="font-size: 1.4rem; font-weight: 300; margin-bottom: 32px;">Neue Anfrage · Amoriva Films</h1>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72; width: 140px;">Paar</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72;">E-Mail</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3;"><a href="mailto:${email}" style="color: #B79B72;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72;">Datum</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3;">${hochzeitsdatum || 'keine Angabe'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72;">Location</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E7DED3;">${location || 'keine Angabe'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72; vertical-align: top; padding-top: 20px;">Details</td>
                <td style="padding: 12px 0; padding-top: 20px; line-height: 1.8;">${(nachricht || '').replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', JSON.stringify(data));
      const msg = data?.message || data?.name || 'Unbekannter Fehler';
      return Response.json({
        error: `E-Mail konnte nicht gesendet werden (${msg}). Bitte schreibt uns direkt an booking@amoriva-films.de.`,
      }, { status: 500 });
    }

    // Eingangsbestaetigung an das Paar. Bewusst kurz gehalten: sie ersetzt die
    // persoenliche Antwort nicht, sie kuendigt sie an. Schlaegt sie fehl, ist das
    // nicht schlimm, die Anfrage ist ja schon bei uns angekommen.
    try {
      const zeile = (titel, wert) => (wert
        ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #E7DED3; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #B79B72; width: 130px;">${titel}</td><td style="padding: 10px 0; border-bottom: 1px solid #E7DED3;">${esc(wert)}</td></tr>`
        : '');
      const bRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Amoriva Films <booking@amoriva-films.de>',
          to: [email],
          reply_to: 'booking@amoriva-films.de',
          subject: 'Eure Anfrage ist angekommen',
          html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #F6F1EB; color: #3B2F2A; line-height: 1.8;">
            <h1 style="font-size: 1.4rem; font-weight: 300; margin-bottom: 28px;">Eure Anfrage ist angekommen</h1>
            <p style="margin: 0 0 20px;">Hallo ${esc(name)},</p>
            <p style="margin: 0 0 20px;">schön, dass ihr euch bei uns gemeldet habt. Eure Anfrage ist gerade reingekommen und wir schauen sie uns in Ruhe an.</p>
            <p style="margin: 0 0 28px;">Nevio meldet sich persönlich bei euch, in der Regel innerhalb von 24 Stunden. Wenn euch bis dahin noch etwas einfällt, antwortet einfach auf diese Mail.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              ${zeile('Datum', hochzeitsdatum)}
              ${zeile('Location', location)}
            </table>
            <p style="margin: 0;">Liebe Grüße<br>Amoriva Films</p>
          </div>
        `,
        }),
      });
      if (!bRes.ok) {
        const bTxt = await bRes.text();
        console.error('Bestaetigung an das Paar abgelehnt:', bRes.status, bTxt.slice(0, 300));
      }
    } catch (e) {
      console.error('Bestaetigung an das Paar fehlgeschlagen:', e);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact error:', e);
    return Response.json({ error: 'Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
  }
}
