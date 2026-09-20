'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';

export default function AnfragePage() {
  const [gesendet, setGesendet] = useState(false);
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState('');

  async function absenden(e) {
    e.preventDefault();
    setLaedt(true);
    setFehler('');

    const fd = new FormData(e.target);
    const daten = {
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
        body: JSON.stringify(daten),
      });
      const antwort = await res.json().catch(() => ({}));
      if (res.ok) setGesendet(true);
      else setFehler(antwort.error || 'Es ist ein Fehler aufgetreten. Bitte versucht es erneut.');
    } catch {
      setFehler('Verbindungsfehler. Bitte prüft eure Internetverbindung oder schreibt uns direkt an booking@amoriva-films.de.');
    }
    setLaedt(false);
  }

  return (
    <>
      <Nav />

      <main className="hell" style={{ minHeight: '100vh' }}>
        <section className="abschnitt-kopf">
          <div className="bahn anfrage-raster">

            {/* Links: worum es geht */}
            <div className="anfrage-links">
              <p className="t-label" style={{ marginBottom: 'var(--luft-3)' }}>Jetzt anfragen</p>
              <h1 className="t-display" style={{ marginBottom: 'var(--luft-3)' }}>
                Beginnt mit eurer Geschichte.
              </h1>
              <p className="t-text t-grau" style={{ marginBottom: 'var(--luft-4)' }}>
                Jede Nachricht wird persönlich gelesen. Erzählt uns von eurer
                Hochzeit, eurer Vision und davon, was euer Film und eure Bilder
                später auslösen sollen.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--luft-1)' }}>
                <a href="mailto:booking@amoriva-films.de" className="t-fein link-fein" style={{ alignSelf: 'flex-start' }}>
                  booking@amoriva-films.de
                </a>
                <a href="tel:+4915565559747" className="t-fein link-fein" style={{ alignSelf: 'flex-start' }}>
                  +49 155 6555 9747
                </a>
              </div>
            </div>

            {/* Rechts: das Formular, ein Feld unter dem anderen */}
            <div>
              {gesendet ? (
                <div>
                  <h2 className="t-gross" style={{ marginBottom: 'var(--luft-2)' }}>Vielen Dank.</h2>
                  <p className="t-text t-grau">
                    Eure Nachricht ist angekommen. Nevio meldet sich persönlich,
                    spätestens am nächsten Tag.
                  </p>
                </div>
              ) : (
                <form onSubmit={absenden} noValidate style={{
                  display: 'flex', flexDirection: 'column', gap: '2.25rem',
                }}>
                  <div>
                    <label className="feld-label" htmlFor="feld-namen">Eure Namen</label>
                    <input className="feld" id="feld-namen" name="name" type="text"
                           placeholder="Lena & Thomas" required autoComplete="name" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-mail">E-Mail Adresse</label>
                    <input className="feld" id="feld-mail" name="email" type="email"
                           placeholder="eure@email.de" required autoComplete="email" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-telefon">Telefonnummer</label>
                    <input className="feld" id="feld-telefon" name="Telefon" type="tel"
                           placeholder="+49 …" autoComplete="tel" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-datum">Hochzeitsdatum</label>
                    <input className="feld" id="feld-datum" name="Hochzeitsdatum" type="date" required />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-ort">Wo findet die Hochzeit statt?</label>
                    <input className="feld" id="feld-ort" name="Location" type="text"
                           placeholder="Hamburg, Toskana …" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-gaeste">Ungefähre Gästeanzahl</label>
                    <select className="feld" id="feld-gaeste" name="Gaeste" defaultValue="">
                      <option value="" disabled>Bitte wählen</option>
                      <option>Unter 50 Gäste</option>
                      <option>50 bis 100 Gäste</option>
                      <option>100 bis 150 Gäste</option>
                      <option>Über 150 Gäste</option>
                    </select>
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-budget">Euer Budgetrahmen</label>
                    <select className="feld" id="feld-budget" name="Budget" defaultValue="">
                      <option value="" disabled>Bitte wählen</option>
                      <option>2.000 bis 3.500 €</option>
                      <option>3.500 bis 5.000 €</option>
                      <option>5.000 bis 7.500 €</option>
                      <option>Über 7.500 €</option>
                    </select>
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-vision">Erzählt uns von eurer Vision</label>
                    <textarea className="feld" id="feld-vision" name="Vision" rows={4}
                              placeholder="Wie stellt ihr euch euren Tag vor? Was soll festgehalten werden?" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-wirkung">Was soll euer Film später auslösen?</label>
                    <textarea className="feld" id="feld-wirkung" name="Gefuehl" rows={4}
                              placeholder="Ein Gefühl, eine Stimmung, ein Bild. Beschreibt es so, wie es euch in den Sinn kommt." />
                  </div>

                  {fehler && (
                    <div className="meldung" role="alert">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                           stroke="var(--tinte)" strokeWidth="1.8" strokeLinecap="round"
                           strokeLinejoin="round" aria-hidden="true"
                           style={{ flexShrink: 0, marginTop: '1px' }}>
                        <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <p>{fehler}</p>
                    </div>
                  )}

                  <div>
                    <button type="submit" disabled={laedt} className="knopf knopf-voll"
                            style={{ opacity: laedt ? 0.55 : 1 }}>
                      {laedt ? 'Wird gesendet …' : 'Nachricht senden'}
                    </button>

                    {/* Hier werden Name, E-Mail, Telefon, Datum, Ort und
                        Budget erhoben. Der Hinweis gehoert an die Stelle,
                        an der die Daten abgeschickt werden. */}
                    <p className="t-fein" style={{ marginTop: 'var(--luft-3)', fontSize: '0.8125rem' }}>
                      Mit dem Absenden schickt ihr uns die angegebenen Daten,
                      damit wir eure Anfrage beantworten können. Mehr dazu in
                      unserer{' '}
                      <Link href="/datenschutz" className="link-fein">Datenschutzerklärung</Link>.
                    </p>

                    <p className="t-fein" style={{ marginTop: 'var(--luft-2)', fontSize: '0.8125rem' }}>
                      Ihr bekommt sofort eine kurze Eingangsbestätigung. Die
                      richtige Antwort schreibt Nevio persönlich, in der Regel
                      innerhalb von 24 Stunden.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsApp />
    </>
  );
}
