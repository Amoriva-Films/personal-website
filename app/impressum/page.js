import Link from 'next/link';

export const metadata = {
  title: 'Impressum | Amoriva Films',
};

const serif = "var(--font-cormorant), Georgia, serif";
const sans  = "'Inter', sans-serif";

export default function Impressum() {
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
          Impressum
        </h1>
        <p style={{
          fontFamily: serif,
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgba(246,241,235,0.35)',
          marginTop: '1rem',
        }}>
          Angaben gemäß § 5 DDG
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '80px 8% 120px',
        background: '#F6F1EB',
      }}>

        <Section title="Angaben gemäß § 5 DDG">
          <p><strong>Amoriva Films</strong></p>
          <p>Inhaber: Nevio Mastrogiorgio</p>
          <p>Grafhorster Str. 16b<br />38458 Velpke<br />Deutschland</p>
        </Section>

        <Divider />

        <Section title="Kontakt">
          <p>Telefon: <a href="tel:015565559747" style={linkStyle}>0155 65559747</a></p>
          <p>E-Mail: <a href="mailto:booking@amoriva-films.de" style={linkStyle}>booking@amoriva-films.de</a></p>
          <p>Website: <a href="https://amoriva-films.de" style={linkStyle}>https://amoriva-films.de</a></p>
        </Section>

        <Divider />

        <Section title="Umsatzsteuer">
          <p>Steuernummer: 13/128/13447</p>
          <p>Kein Ausweis der Umsatzsteuer gemäß § 19 UStG (Kleinunternehmerregelung).</p>
        </Section>

        <Divider />

        <Section title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
          <p>Nevio Mastrogiorgio<br />Grafhorster Str. 16b<br />38458 Velpke</p>
        </Section>

        <Divider />

        <Section title="EU-Streitschlichtung">
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener" style={linkStyle}>
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </Section>

        <Divider />

        <Section title="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </Section>

        <Section title="Haftung für Links">
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </Section>

        <Section title="Urheberrecht">
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: '1.4rem',
        fontWeight: 300,
        color: '#2A1F1B',
        marginBottom: '0.9rem',
        marginTop: '2.4rem',
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: "'Inter', sans-serif",
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
