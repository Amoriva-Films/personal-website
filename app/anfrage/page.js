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
  /* Welche Pflichtfelder fehlen, als { feldname: Hinweistext }.
     Nevio am 21.09.2026: "wenn etwas fehlt dann soll er rot
     aufleuchten, was noch fehlt." */
  const [fehlende, setFehlende] = useState({});

  const feldKlasse  = (k) => 'feld' + (fehlende[k] ? ' feld-fehler' : '');
  const labelKlasse = (k) => 'feld-label' + (fehlende[k] ? ' feld-label-fehler' : '');
  const Hinweis = ({ k }) => (fehlende[k]
    ? <span className="feld-hinweis" id={`hinweis-${k}`}>{fehlende[k]}</span>
    : null);

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

    /* Erst pruefen, dann senden. Vorher ging jede unvollstaendige
       Anfrage an den Server und kam als allgemeiner Fehlersatz zurueck -
       man las "es fehlt etwas", aber nicht WAS. Das Formular traegt
       noValidate, die Pruefung des Browsers ist also aus; sie muss hier
       stehen. Der Server prueft weiterhin selbst, das hier ersetzt ihn
       nicht, es kommt ihm nur zuvor.                                  */
    const mangel = {};
    if (!String(daten.name || '').trim()) {
      mangel.name = 'Bitte sagt uns, wie ihr heißt.';
    }
    const mail = String(daten.email || '').trim();
    if (!mail) {
      mangel.email = 'Ohne E-Mail-Adresse können wir euch nicht antworten.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
      mangel.email = 'Diese E-Mail-Adresse sieht nicht richtig aus.';
    }
    if (!String(daten.hochzeitsdatum || '').trim()) {
      mangel.hochzeitsdatum = 'Bitte euer Hochzeitsdatum angeben.';
    }

    if (Object.keys(mangel).length > 0) {
      setFehlende(mangel);
      setFehler(Object.keys(mangel).length === 1
        ? 'Ein Feld fehlt noch. Es ist unten rot markiert.'
        : `${Object.keys(mangel).length} Felder fehlen noch. Sie sind unten rot markiert.`);
      setLaedt(false);
      // Zum ersten fehlenden Feld springen und hineinsetzen: bei einem
      // langen Formular sieht man sonst gar nicht, dass unten etwas rot ist.
      const erstes = { name: 'feld-namen', email: 'feld-mail', hochzeitsdatum: 'feld-datum' }[Object.keys(mangel)[0]];
      const el = document.getElementById(erstes);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
      return;
    }
    setFehlende({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(daten),
      });
      const antwort = await res.json().catch(() => ({}));
      if (res.ok) {
        setGesendet(true);
        /* Auf dem Handy steht der Knopf weit unten. Ohne das Hochrollen
           taeuscht die Bestaetigung: das Formular ist weg, aber man
           sieht nur Leerraum und weiss nicht, ob es geklappt hat. */
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
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
                Jede Nachricht wird persönlich gelesen. Antwort in der Regel
                innerhalb von 24 Stunden.
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
                /* Nevio am 21.09.2026: "Es soll auch eine Benachrichtigung
                   kommen, wenn die die Anfrage absenden."

                   Vorher stand hier nur Text. Der las sich wie ein
                   weiterer Abschnitt der Seite, nicht wie eine Antwort
                   auf das, was man gerade getan hat. Jetzt ein Kasten
                   in Markengruen mit Haken, den role="status" auch
                   Vorlesesoftware ansagt.                            */
                <div>
                  <div className="meldung meldung-erfolg" role="status" style={{ marginBottom: 'var(--luft-4)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="var(--gruen)" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round" aria-hidden="true"
                         style={{ flexShrink: 0, marginTop: '1px' }}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <p>Eure Anfrage ist angekommen.</p>
                  </div>

                  <h2 className="t-gross" style={{ marginBottom: 'var(--luft-2)' }}>Vielen Dank.</h2>
                  <p className="t-text t-grau">
                    Ihr bekommt gleich eine Eingangsbestätigung per E-Mail.
                    Nevio meldet sich persönlich, in der Regel innerhalb von
                    24 Stunden.
                  </p>
                </div>
              ) : (
                /* Lag als eine Kolonne mit neun Feldern und 2,25 rem
                   Abstand untereinander - das war die halbe Seitenlaenge.
                   Jetzt zwei Spalten: kurze Felder teilen sich eine Zeile,
                   die beiden Textfelder laufen ueber die volle Breite. */
                <form onSubmit={absenden} noValidate className="formular-raster">
                  <div>
                    <label className={labelKlasse('name')} htmlFor="feld-namen">Eure Namen</label>
                    <input className={feldKlasse('name')} id="feld-namen" name="name" type="text"
                           placeholder="Lena & Thomas" required autoComplete="name"
                           aria-invalid={Boolean(fehlende.name)}
                           aria-describedby={fehlende.name ? 'hinweis-name' : undefined} />
                    <Hinweis k="name" />
                  </div>

                  <div>
                    <label className={labelKlasse('email')} htmlFor="feld-mail">E-Mail Adresse</label>
                    <input className={feldKlasse('email')} id="feld-mail" name="email" type="email"
                           placeholder="eure@email.de" required autoComplete="email"
                           aria-invalid={Boolean(fehlende.email)}
                           aria-describedby={fehlende.email ? 'hinweis-email' : undefined} />
                    <Hinweis k="email" />
                  </div>

                  <div>
                    <label className="feld-label" htmlFor="feld-telefon">Telefonnummer</label>
                    <input className="feld" id="feld-telefon" name="Telefon" type="tel"
                           placeholder="+49 …" autoComplete="tel" />
                  </div>

                  <div>
                    <label className={labelKlasse('hochzeitsdatum')} htmlFor="feld-datum">Hochzeitsdatum</label>
                    <input className={feldKlasse('hochzeitsdatum')} id="feld-datum" name="Hochzeitsdatum" type="date" required
                           aria-invalid={Boolean(fehlende.hochzeitsdatum)}
                           aria-describedby={fehlende.hochzeitsdatum ? 'hinweis-hochzeitsdatum' : undefined} />
                    <Hinweis k="hochzeitsdatum" />
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
                    {/* Stand vorher als Preisspannen in Euro drin. Nevio am
                        21.09.2026: keine Zahlen. Die Auswahl sagt jetzt
                        dasselbe ueber die Haltung des Paares, ohne dass es
                        eine Zahl zu lesen bekommt, an der es uns misst.
                        Der Feldname "Budget" bleibt, daran haengen die
                        Mail und der Eingang im Amoriva-Dashboard. */}
                    <label className="feld-label" htmlFor="feld-budget">Wie steht ihr zum Budget?</label>
                    <select className="feld" id="feld-budget" name="Budget" defaultValue="">
                      <option value="" disabled>Bitte wählen</option>
                      <option>Wir haben noch keine Vorstellung</option>
                      <option>Wir haben einen festen Rahmen</option>
                      <option>Wir sind flexibel, wenn es passt</option>
                      <option>Qualität geht vor Preis</option>
                    </select>
                  </div>

                  <div className="ganze-zeile">
                    <label className="feld-label" htmlFor="feld-vision">Erzählt uns von eurer Vision</label>
                    <textarea className="feld" id="feld-vision" name="Vision" rows={3}
                              placeholder="Wie stellt ihr euch euren Tag vor? Was soll festgehalten werden?" />
                  </div>

                  {fehler && (
                    <div className="meldung meldung-fehler ganze-zeile" role="alert">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                           stroke="var(--warnung)" strokeWidth="1.8" strokeLinecap="round"
                           strokeLinejoin="round" aria-hidden="true"
                           style={{ flexShrink: 0, marginTop: '1px' }}>
                        <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <p>{fehler}</p>
                    </div>
                  )}

                  <div className="ganze-zeile">
                    <button type="submit" disabled={laedt} className="knopf knopf-voll"
                            style={{ opacity: laedt ? 0.55 : 1 }}>
                      {laedt ? 'Wird gesendet …' : 'Nachricht senden'}
                    </button>

                    {/* Hier werden Name, E-Mail, Telefon, Datum, Ort und
                        Budget erhoben. Der Hinweis gehoert an die Stelle,
                        an der die Daten abgeschickt werden. */}
                    <p className="t-fein" style={{ marginTop: 'var(--luft-3)', fontSize: '0.8125rem' }}>
                      Ihr bekommt sofort eine Eingangsbestätigung, die richtige
                      Antwort schreibt Nevio persönlich. Mit dem Absenden
                      schickt ihr uns die angegebenen Daten, damit wir eure
                      Anfrage beantworten können. Mehr dazu in unserer{' '}
                      <Link href="/datenschutz" className="link-fein">Datenschutzerklärung</Link>.
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
