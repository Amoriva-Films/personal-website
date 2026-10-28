import { RechtSeite, RechtAbschnitt } from '@/components/vintage/Rechtliches';

export const metadata = {
  title: 'Datenschutz',
  alternates: { canonical: 'https://amoriva-films.de/datenschutz' },
};

/* Datenschutzerklärung im Vintage-Design (Nevio 26.10.2026). Inhalt unveraendert. */
export default function Datenschutz() {
  return (
    <RechtSeite titel="Datenschutz" unter="Transparenz ist uns wichtig.">
        <RechtAbschnitt titel="1. Verantwortlicher">
          <p>
            Amoriva Films<br />
            Inhaber: Nevio Mastrogiorgio<br />
            Grafhorster Str. 16b, 38458 Velpke<br />
            E-Mail: <a href="mailto:booking@amoriva-films.de">booking@amoriva-films.de</a>
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="2. Datenerfassung beim Besuch der Website">
          <p>Beim Aufrufen dieser Website werden automatisch technische Informationen erfasst (Server-Logfiles):</p>
          <ul>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p>Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="3. Hosting">
          <p>
            Diese Website wird über <strong>Vercel Inc.</strong> gehostet (440 N Barranca Ave #4133, Covina, CA 91723, USA). Beim Besuch der Website werden personenbezogene Daten auf den Servern von Vercel verarbeitet. Weitere Informationen findest du in der{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">
              Datenschutzerklärung von Vercel
            </a>.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="4. Kontaktaufnahme / Anfrageformular">
          <p>
            Wenn du uns über das Kontaktformular oder per E-Mail kontaktierst, werden die von dir übermittelten Daten (Name, E-Mail-Adresse, Hochzeitsdatum, Location, Nachricht) zur Bearbeitung deiner Anfrage gespeichert. Die Daten werden nicht ohne deine Einwilligung an Dritte weitergegeben.
          </p>
          <p>
            Für den Versand dieser E-Mails nutzen wir den Dienst <strong>Resend</strong> (Resend Inc., 2261 Market Street, San Francisco, CA 94114, USA), der seinerseits Amazon SES in der EU-Region Irland für die Zustellung einsetzt. Dabei werden deine E-Mail-Adresse, der Inhalt deiner Anfrage sowie technische Zustellinformationen verarbeitet. Weitere Informationen findest du in der{' '}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener">Datenschutzerklärung von Resend</a>.
          </p>
          <p>
            Direkt nach dem Absenden schicken wir dir automatisch eine kurze Eingangsbestätigung an die von dir angegebene E-Mail-Adresse. Sie bestätigt nur, dass deine Anfrage angekommen ist. Die persönliche Antwort schreiben wir dir danach selbst.
          </p>
          <p>
            Um Missbrauch des Formulars zu verhindern, speichern wir für maximal zehn Minuten, wie oft von einer IP-Adresse abgeschickt wurde. Danach wird dieser Zählwert automatisch verworfen.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="5. Anfrageverwaltung mit Amoriva">
          <p>
            Deine Anfrage wird zusätzlich in <strong>Amoriva</strong> gespeichert, unserer eigenen Software für Hochzeitsdienstleister (Anbieter: Amoriva, Nevio Mastrogiorgio, Grafhorster Str. 16b, 38458 Velpke). Dort verwalten wir eure Anfrage, das Angebot und die weitere Zusammenarbeit an einem Ort, statt in verstreuten E-Mails.
          </p>
          <p>
            Gespeichert werden dieselben Angaben wie oben (Name, E-Mail-Adresse, Hochzeitsdatum, Location, Nachricht). Die Daten liegen auf Servern von <strong>Supabase</strong> in der Europäischen Union (EU-Region Irland) und auf Servern von <strong>Vercel</strong>. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, also die Anbahnung und Durchführung eines Vertrags. Weitere Informationen findest du in der{' '}
            <a href="https://amoriva.app/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung von Amoriva</a>.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="6. Kommunikation über WhatsApp">
          <p>
            Du kannst uns alternativ über WhatsApp kontaktieren. Dabei wird deine Telefonnummer verarbeitet. WhatsApp ist ein Dienst der Meta Platforms Ireland Ltd. Die Nutzung erfolgt freiwillig und auf eigene Verantwortung. Weitere Informationen findest du in der{' '}
            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener">
              Datenschutzerklärung von WhatsApp
            </a>.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="7. Online-Meetings (Zoom / Google Meet)">
          <p>
            Für Kennenlerngespräche nutzen wir Videocall-Dienste. Dabei können Name, E-Mail-Adresse und Kommunikationsdaten verarbeitet werden. Die Nutzung erfolgt auf Basis deiner Einwilligung.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="8. Cookies">
          <p>
            Diese Website setzt <strong>gar keine Cookies</strong> &mdash; weder zur Analyse noch für Werbung, und auch keine technisch notwendigen. Ebenso wird nichts im Speicher deines Browsers abgelegt. Es sind keine Zähldienste, keine Werbenetzwerke und keine Schaltflächen sozialer Netzwerke eingebunden. Die Schriften liegen auf unserem eigenen Server, es wird also auch dafür keine Verbindung zu Dritten aufgebaut. Deshalb gibt es auf dieser Seite auch kein Zustimmungsfenster: Es gibt nichts, dem du zustimmen müsstest.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="9. Deine Rechte">
          <p>Du hast jederzeit das Recht auf:</p>
          <ul>
            <li>Auskunft über deine bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
          <p>
            Zur Ausübung deiner Rechte wende dich an:{' '}
            <a href="mailto:booking@amoriva-films.de">booking@amoriva-films.de</a>
          </p>
          <p>Du hast außerdem das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="10. SSL-Verschlüsselung">
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="11. Speicherdauer">
          <p>
            Deine Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen. Anfragen werden nach Abschluss der Korrespondenz gelöscht, sofern keine gesetzlichen Pflichten entgegenstehen.
          </p>
        </RechtAbschnitt>

        <RechtAbschnitt titel="12. Änderungen dieser Datenschutzerklärung">
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie stets den aktuellen rechtlichen Anforderungen entsprechend zu halten. Stand: Mai 2026.
          </p>
        </RechtAbschnitt>
    </RechtSeite>
  );
}
