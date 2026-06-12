export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, hochzeitsdatum, location, nachricht } = body;

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
        from: 'Amoriva Films <onboarding@resend.dev>',
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

    return Response.json({ ok: true });
  } catch (e) {
    console.error('Contact error:', e);
    return Response.json({ error: 'Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.' }, { status: 500 });
  }
}
