import Link from 'next/link';

export const metadata = {
  title: 'Datenschutz | Amoriva Films',
};

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";

const linkStyle = {
  color: '#B79B72',
  textDecoration: 'none',
};

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid rgba(59,47,42,0.12)', margin: '2.8rem 0' }} />;
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '1.6rem' }}>
      <h2 style={{
        fontFamily: serif,
        fontSize: '1.4rem',
        fontWeight: 300,
        color: '#2A1F1B',
        marginBottom: '0.9rem',
        marginTop: '2.4rem',
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: sans,
        fontSize: '0.88rem',
        lineHeight: 1.95,
        color: '#5E5148',
        fontWeight: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}>
        {children}
      </div>
    </div>
  );
}

export default function Datenschutz() {
  return (
    <>
      {/* Header */}
      <div style={{
        background: '#2A1F1B',
        padding: '140px 8% 80px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: sans,
          fontSize: '0.66rem',
          fontWeight: 300,
          letterSpacing: '0.30em',
          textTransform: 'uppercase',
          color: '#B79B72',
          marginBottom: '1.6rem',
        }}>
          Rechtliches
        </p>
        <h1 style={{
          fontFamily: serif,
          fontSize: 'clamp(36px, 5vw, 68px)',
          fontWeight: 300,
          color: '#F6F1EB',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}>
          Datenschutzerklärung
        </h1>
        <p style={{
          fontFamily: serif,
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgba(246,241,235,0.35)',
          marginTop: '1rem',
        }}>
          Transparenz ist uns wichtig.
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '80px 8% 120px',
        background: '#F6F1EB',
      }}>

        <Section title="1. Verantwortlicher">
          <p>
            Amoriva Films<br />
            Inhaber: Nevio Mastrogiorgio<br />
            Grafhorster Str. 16b, 38458 Velpke<br />
            E-Mail: <a href="mailto:booking@amoriva-films.de" style={linkStyle}>booking@amoriva-films.de</a>
          </p>
        </Section>

        <Divider />

        <Section title="2. Datenerfassung beim Besuch der Website">
          <p>Beim Aufrufen dieser Website werden automatisch technische Informationen erfasst (Server-Logfiles):</p>
          <ul style={{ margin: '0.4rem 0 0.4rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p>Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
        </Section>

        <Divider />

        <Section title="3. Hosting">
          <p>
            Diese Website wird über <strong>Vercel Inc.</strong> gehostet (440 N Barranca Ave #4133, Covina, CA 91723, USA). Beim Besuch der Website werden personenbezogene Daten auf den Servern von Vercel verarbeitet. Weitere Informationen findest du in der{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" style={linkStyle}>
              Datenschutzerklärung von Vercel
            </a>.
          </p>
        </Section>

        <Divider />

        <Section title="4. Kontaktaufnahme / Anfrageformular">
          <p>
            Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, werden die von dir übermittelten Daten (Name, E-Mail-Adresse, Hochzeitsdatum, Location, Nachricht) zur Bearbeitung deiner Anfrage gespeichert. Die Daten werden nicht ohne deine Einwilligung an Dritte weitergegeben.
          </p>
          <p>
            Für den Versand dieser E-Mails nutzen wir den Dienst <strong>Resend</strong> (Resend Inc., 2261 Market Street, San Francisco, CA 94114, USA), der seinerseits Amazon SES in der EU-Region Irland für die Zustellung einsetzt. Dabei werden deine E-Mail-Adresse, der Inhalt deiner Anfrage sowie technische Zustellinformationen verarbeitet. Weitere Informationen findest du in der{' '}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener" style={linkStyle}>Datenschutzerklärung von Resend</a>.
          </p>
          <p>
            Direkt nach dem Absenden schicken wir dir automatisch eine kurze Eingangsbestätigung an die von dir angegebene E-Mail-Adresse. Sie bestätigt nur, dass deine Anfrage angekommen ist. Die persönliche Antwort schreiben wir dir danach selbst.
          </p>
          <p>
            Um Missbrauch des Formulars zu verhindern, speichern wir für maximal zehn Minuten, wie oft von einer IP-Adresse abgeschickt wurde. Danach wird dieser Zählwert automatisch verworfen.
          </p>
        </Section>

        <Divider />

        <Section title="5. Anfrageverwaltung mit Amoriva">
          <p>
            Deine Anfrage wird zusätzlich in <strong>Amoriva</strong> gespeichert, unserer eigenen Software für Hochzeitsdienstleister (Anbieter: Amoriva, Nevio Mastrogiorgio, Grafhorster Str. 16b, 38458 Velpke). Dort verwalten wir eure Anfrage, das Angebot und die weitere Zusammenarbeit an einem Ort, statt in verstreuten E-Mails.
          </p>
          <p>
            Gespeichert werden dieselben Angaben wie oben (Name, E-Mail-Adresse, Hochzeitsdatum, Location, Nachricht). Die Daten liegen auf Servern von <strong>Supabase</strong> in der Europäischen Union (Rechenzentrum Frankfurt) und auf Servern von <strong>Vercel</strong>. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, also die Anbahnung und Durchführung eines Vertrags. Weitere Informationen findest du in der{' '}
            <a href="https://amoriva.app/datenschutz" target="_blank" rel="noopener" style={linkStyle}>Datenschutzerklärung von Amoriva</a>.
          </p>
        </Section>

        <Divider />

        <Section title="6. Kommunikation über WhatsApp">
          <p>
            Du kannst uns alternativ über WhatsApp kontaktieren. Dabei wird deine Telefonnummer verarbeitet. WhatsApp ist ein Dienst der Meta Platforms Ireland Ltd. Die Nutzung erfolgt freiwillig und auf eigene Verantwortung. Weitere Informationen findest du in der{' '}
            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener" style={linkStyle}>
              Datenschutzerklärung von WhatsApp
            </a>.
          </p>
        </Section>

        <Divider />

        <Section title="7. Online-Meetings (Zoom / Google Meet)">
          <p>
            Für Kennenlerngespräche nutzen wir Videocall-Dienste. Dabei können Name, E-Mail-Adresse und Kommunikationsdaten verarbeitet werden. Die Nutzung erfolgt auf Basis deiner Einwilligung.
          </p>
        </Section>

        <Divider />

        <Section title="8. Cookies">
          <p>
            Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind. Du kannst Cookies in deinem Browser jederzeit deaktivieren.
          </p>
        </Section>

        <Divider />

        <Section title="9. Deine Rechte">
          <p>Du hast jederzeit das Recht auf:</p>
          <ul style={{ margin: '0.4rem 0 0.4rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <li>Auskunft über deine bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
          <p>
            Zur Ausübung deiner Rechte wende dich an:{' '}
            <a href="mailto:booking@amoriva-films.de" style={linkStyle}>booking@amoriva-films.de</a>
          </p>
          <p>Du hast außerdem das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
        </Section>

        <Divider />

        <Section title="10. SSL-Verschlüsselung">
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
          </p>
        </Section>

        <Divider />

        <Section title="11. Speicherdauer">
          <p>
            Deine Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen. Anfragen werden nach Abschluss der Korrespondenz gelöscht, sofern keine gesetzlichen Pflichten entgegenstehen.
          </p>
        </Section>

        <Divider />

        <Section title="12. Änderungen dieser Datenschutzerklärung">
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie stets den aktuellen rechtlichen Anforderungen entsprechend zu halten. Stand: Mai 2026.
          </p>
        </Section>

        <Divider />

        <div style={{ marginTop: '3rem' }}>
          <Link href="/" style={{
            fontFamily: sans,
            fontSize: '0.72rem',
            fontWeight: 300,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#B79B72',
            textDecoration: 'none',
          }}>
            ← Zurück zur Startseite
          </Link>
        </div>

      </div>
    </>
  );
}
