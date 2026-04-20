module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, hochzeitsdatum, location, nachricht } = req.body;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#C4A882;border-bottom:1px solid #eee;padding-bottom:10px;">
        Neue Hochzeitsanfrage – Amoriva Films
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;font-weight:bold;width:160px;">Namen:</td><td>${name || '–'}</td></tr>
        <tr><td style="padding:10px 0;font-weight:bold;">E-Mail:</td><td><a href="mailto:${email}">${email || '–'}</a></td></tr>
        <tr><td style="padding:10px 0;font-weight:bold;">Hochzeitsdatum:</td><td>${hochzeitsdatum || '–'}</td></tr>
        <tr><td style="padding:10px 0;font-weight:bold;">Location:</td><td>${location || '–'}</td></tr>
        <tr><td style="padding:10px 0;font-weight:bold;vertical-align:top;">Nachricht:</td><td>${nachricht || '–'}</td></tr>
      </table>
    </div>
  `;

  const payload = {
    sender: { name: 'Amoriva Films Website', email: 'mastrogiorgio.nevio@gmail.com' },
    to: [
      { email: 'booking@amoriva-films.de' },
      { email: 'mastrogiorgio.nevio@gmail.com' }
    ],
    subject: 'Neue Hochzeitsanfrage von der Website',
    htmlContent: html
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const err = await response.text();
      console.error('Brevo error:', err);
      return res.status(500).json({ success: false, error: err });
    }
  } catch (err) {
    console.error('Function error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
