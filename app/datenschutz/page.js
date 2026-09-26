import Link from 'next/link';

export const metadata = {
  title: 'Datenschutz',
  alternates: { canonical: 'https://amoriva-films.de/datenschutz' },
};

const serif = "var(--font-display), Georgia, serif";
const sans  = "var(--font-text), system-ui, sans-serif";

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--linie)', marginBlock: 'var(--luft-5)' }} />;
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 'var(--luft-3)' }}>
      <h2 style={{
        fontFamily: serif,
        fontSize: '1.4rem',
        fontWeight: 300,
        color: 'var(--tinte)',
        marginBottom: 'var(--luft-2)',
        marginTop: 'var(--luft-4)',
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: sans,
        fontSize: '0.88rem',
        lineHeight: 1.95,
        color: 'var(--grau-2)',
        fontWeight: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--luft-1)',
      }}>
        {children}
      </div>
    </div>
  );
}

export default function Datenschutz() {
  return (
    <>
      {/* Kopf */}
      <section className="abschnitt-kopf dunkel">
        <div className="bahn">
          <p className="t-label ab-3">Rechtliches</p>
          <h1 className="t-display" style={{ color: 'var(--auf-dunkel)' }}>
            Datenschutzerklärung
          </h1>
          <p className="t-text" style={{ color: 'var(--grau-dunkel)', marginTop: 'var(--luft-3)' }}>
            Transparenz ist uns wichtig.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="abschnitt hell">
        <div className="bahn lesebreite">

        <Section title="1. Verantwortlicher">
          <p>
            Amoriva Films<br />
            Inhaber: Nevio Mastrogiorgio<br />
            Grafhorster Str. 16b, 38458 Velpke<br />
            E-Mail: <a href="mailto:booking@amoriva-films.de" className="rechts-link">booking@amoriva-films.de</a>
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
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" className="rechts-link">
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
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener" className="rechts-link">Datenschutzerklärung von Resend</a>.
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
            Gespeichert werden dieselben Angaben wie oben (Name, E-Mail-Adresse, Hochzeitsdatum, Location, Nachricht). Die Daten liegen auf Servern von <strong>Supabase</strong> in der Europäischen Union (EU-Region Irland) und auf Servern von <strong>Vercel</strong>. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, also die Anbahnung und Durchführung eines Vertrags. Weitere Informationen findest du in der{' '}
            <a href="https://amoriva.app/datenschutz" target="_blank" rel="noopener" className="rechts-link">Datenschutzerklärung von Amoriva</a>.
          </p>
        </Section>

        <Divider />

        <Section title="6. Kommunikation über WhatsApp">
          <p>
            Du kannst uns alternativ über WhatsApp kontaktieren. Dabei wird deine Telefonnummer verarbeitet. WhatsApp ist ein Dienst der Meta Platforms Ireland Ltd. Die Nutzung erfolgt freiwillig und auf eigene Verantwortung. Weitere Informationen findest du in der{' '}
            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener" className="rechts-link">
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
            Diese Website setzt <strong>gar keine Cookies</strong> &mdash; weder zur Analyse noch für Werbung, und auch keine technisch notwendigen. Ebenso wird nichts im Speicher deines Browsers abgelegt. Es sind keine Zähldienste, keine Werbenetzwerke und keine Schaltflächen sozialer Netzwerke eingebunden. Die Schriften liegen auf unserem eigenen Server, es wird also auch dafür keine Verbindung zu Dritten aufgebaut. Deshalb gibt es auf dieser Seite auch kein Zustimmungsfenster: Es gibt nichts, dem du zustimmen müsstest.
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
            <a href="mailto:booking@amoriva-films.de" className="rechts-link">booking@amoriva-films.de</a>
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

        <div style={{ marginTop: 'var(--luft-5)' }}>
          <Link href="/" style={{
            fontFamily: sans,
            fontSize: '0.72rem',
            fontWeight: 300,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            /* War ebenfalls --grau-dunkel auf hellem Grund. */
            color: 'var(--grau-2)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--linie)',
            paddingBottom: '3px',
          }}>
            ← Zurück zur Startseite
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
