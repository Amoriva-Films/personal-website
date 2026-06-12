'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import WhatsApp from '../../components/WhatsApp';

const ease = [0.22, 1, 0.36, 1];

const selectStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #C8BDB5',
  padding: '0.8rem 0',
  fontFamily: "'Inter', sans-serif",
  fontSize: '1rem',
  fontWeight: 300,
  color: '#1A1A1A',
  outline: 'none',
  borderRadius: 0,
  WebkitAppearance: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.5s',
};

export default function InquirePage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const fd = new FormData(e.target);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      hochzeitsdatum: fd.get('Hochzeitsdatum'),
      location: fd.get('Location'),
      nachricht: [
        `Telefon: ${fd.get('Telefon') || 'keine Angabe'}`,
        `Gästeanzahl: ${fd.get('Gaeste') || 'keine Angabe'}`,
        `Budget: ${fd.get('Budget') || 'keine Angabe'}`,
        `\nVision:\n${fd.get('Vision') || 'keine Angabe'}`,
        `\nGefühl:\n${fd.get('Gefuehl') || 'keine Angabe'}`,
      ].join('\n'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.');
      }
    } catch {
      setError('Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.');
    }
    setLoading(false);
  }

  const labelStyle = {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.78rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#3B2F2A',
    fontWeight: 400,
    marginBottom: '0.9rem',
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #C8BDB5',
    padding: '0.8rem 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    fontWeight: 300,
    color: '#1A1A1A',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.5s',
  };

  return (
    <SmoothScroll>
      <Nav />

      <main
        style={{
          padding: 'clamp(120px, 16vw, 200px) 8% clamp(80px, 10vw, 140px)',
          background: '#F6F1EB',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '42% 1fr',
            gap: 'clamp(4rem, 8vw, 10rem)',
            alignItems: 'start',
          }}
          className="inq-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            style={{ position: 'sticky', top: '120px' }}
            className="inq-left"
          >
            <span
              style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 300,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#B79B72',
                marginBottom: '1.6rem',
              }}
            >
              Jetzt anfragen
            </span>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 'clamp(38px, 4.2vw, 62px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.08,
                color: '#3B2F2A',
                marginBottom: '2rem',
                hyphens: 'none',
                wordBreak: 'keep-all',
              }}
            >
              Beginnt mit<br />
              eurer Geschichte.
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                fontWeight: 300,
                lineHeight: 1.88,
                color: '#5E5148',
                maxWidth: '360px',
                marginBottom: '2.8rem',
              }}
            >
              Jede Nachricht wird persönlich gelesen. Erzählt uns von eurer
              Hochzeit, eurer Vision und davon, was euer Film und eure Bilder
              später auslösen sollen.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <a
                href="mailto:booking@amoriva-films.de"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 300,
                  color: '#5E5148',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#3B2F2A'}
                onMouseLeave={e => e.currentTarget.style.color = '#5E5148'}
              >
                booking@amoriva-films.de
              </a>
              <a
                href="tel:015565559747"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 300,
                  color: '#5E5148',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#3B2F2A'}
                onMouseLeave={e => e.currentTarget.style.color = '#5E5148'}
              >
                01556 5559747
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.1, ease }}
          >
            {sent ? (
              <div style={{ paddingTop: '2rem' }}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: 'clamp(28px, 3vw, 42px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#3B2F2A',
                    marginBottom: '1.2rem',
                  }}
                >
                  Vielen Dank.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: '#5E5148',
                  }}
                >
                  Eure Nachricht ist angekommen. Nevio meldet sich persönlich,
                  spätestens am nächsten Tag.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '2.8rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Eure Namen</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Lena & Thomas"
                      required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                      onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>E-Mail Adresse</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="eure@email.de"
                      required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                      onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '2.8rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Telefonnummer</label>
                    <input
                      type="tel"
                      name="Telefon"
                      placeholder="+49 …"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                      onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Hochzeitsdatum</label>
                    <input
                      type="date"
                      name="Hochzeitsdatum"
                      required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                      onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '2.8rem' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Wo findet die Hochzeit statt?</label>
                    <input
                      type="text"
                      name="Location"
                      placeholder="Hamburg, Toskana …"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                      onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Ungefähre Gästeanzahl</label>
                    <select
                      name="Gaeste"
                      style={selectStyle}
                      onChange={e => e.target.style.color = '#1A1A1A'}
                    >
                      <option value="" disabled defaultValue hidden></option>
                      <option>Unter 50 Gäste</option>
                      <option>50 bis 100 Gäste</option>
                      <option>100 bis 150 Gäste</option>
                      <option>Über 150 Gäste</option>
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: '2.8rem' }}>
                  <label style={labelStyle}>Euer Budgetrahmen</label>
                  <select
                    name="Budget"
                    style={selectStyle}
                    onChange={e => e.target.style.color = '#1A1A1A'}
                  >
                    <option value="" disabled defaultValue hidden></option>
                    <option>2.000 bis 3.500 €</option>
                    <option>3.500 bis 5.000 €</option>
                    <option>5.000 bis 7.500 €</option>
                    <option>Über 7.500 €</option>
                  </select>
                </div>

                {/* Vision */}
                <div style={{ marginBottom: '2.8rem' }}>
                  <label style={labelStyle}>Erzählt uns von eurer Vision</label>
                  <textarea
                    name="Vision"
                    rows={4}
                    placeholder="Wie stellt ihr euch euren Tag vor? Was soll festgehalten werden?"
                    style={{ ...inputStyle, resize: 'none', lineHeight: '1.9', minHeight: '84px' }}
                    onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                    onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                  />
                </div>

                {/* Feeling */}
                <div style={{ marginBottom: '3.5rem' }}>
                  <label style={labelStyle}>Was soll euer Film später auslösen?</label>
                  <textarea
                    name="Gefuehl"
                    rows={4}
                    placeholder="Ein Gefühl, eine Stimmung, ein Bild. Beschreibt es so, wie es euch in den Sinn kommt."
                    style={{ ...inputStyle, resize: 'none', lineHeight: '1.9', minHeight: '84px' }}
                    onFocus={e => e.target.style.borderBottomColor = '#3B2F2A'}
                    onBlur={e => e.target.style.borderBottomColor = '#C8BDB5'}
                  />
                </div>

                {error && (
                  <p style={{ color: '#c0392b', fontSize: '0.84rem', marginBottom: '1.5rem' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-outline"
                  style={{ color: '#3B2F2A', borderColor: '#3B2F2A', opacity: loading ? 0.5 : 1 }}
                >
                  {loading ? 'Wird gesendet …' : 'Nachricht senden'}
                </button>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    color: '#5E5148',
                    fontWeight: 300,
                    marginTop: '2rem',
                    lineHeight: 1.8,
                  }}
                >
                  Keine automatische Antwort. Nevio meldet sich persönlich,
                  in der Regel innerhalb von 24 Stunden.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsApp />

      <style>{`
        @media (max-width: 900px) {
          .inq-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .inq-left {
            position: static !important;
            text-align: center;
          }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </SmoothScroll>
  );
}
